import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";

/**
 * D1 schema for the admin panel.
 *
 * SQLite conventions used throughout, per D1's type system:
 *  - timestamps are INTEGER unix milliseconds (SQLite has no date type)
 *  - booleans are INTEGER 0/1 (SQLite has no boolean type)
 *  - structured content is TEXT holding JSON, validated with Zod on the way in
 *    and on the way out, so a bad row can never reach a page as `any`
 *  - binary files never live here — they go to R2 and we store the key. D1 rows
 *    are capped at 1 MB and its export mishandles BLOBs.
 */

/* ------------------------------------------------------------------ auth ---- */

/**
 * Roles are deliberately coarse:
 *  - editor:   create and edit drafts, submit for review
 *  - approver: everything an editor can do, plus publish and unpublish
 *  - admin:    everything, plus managing users and site settings
 *
 * Enforced server-side in every action. Hiding a button is not a permission.
 */
export const USER_ROLES = ["editor", "approver", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    role: text("role", { enum: USER_ROLES }).notNull().default("editor"),

    /**
     * PBKDF2-SHA-256 via WebCrypto — bcrypt/argon2 native modules are not
     * available in the Workers runtime. Salt and iteration count are stored per
     * user so the work factor can be raised later without invalidating existing
     * passwords (see verifyPassword's rehash path).
     */
    passwordHash: text("password_hash").notNull(),
    passwordSalt: text("password_salt").notNull(),
    passwordIterations: integer("password_iterations").notNull(),

    /** Deactivating beats deleting: it preserves authorship on past revisions. */
    isActive: integer("is_active").notNull().default(1),
    mustChangePassword: integer("must_change_password").notNull().default(0),

    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    lastLoginAt: integer("last_login_at"),
  },
  (table) => [
    // Emails are stored lower-cased so this unique index is also a case-
    // insensitive guard against duplicate accounts.
    uniqueIndex("users_email_unique").on(table.email),
  ],
);

/**
 * Server-side sessions.
 *
 * `id` is a SHA-256 hash of the random token held in the cookie, never the token
 * itself — a leaked database dump then contains no usable sessions. Sessions are
 * revocable (deactivating a user or a "sign out everywhere" action deletes rows),
 * which is the main reason for not using stateless JWTs here.
 */
export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: integer("created_at").notNull(),
    expiresAt: integer("expires_at").notNull(),
    lastSeenAt: integer("last_seen_at").notNull(),
    /** Recorded for the audit trail, not for authorisation decisions. */
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
  },
  (table) => [
    index("sessions_user_idx").on(table.userId),
    index("sessions_expires_idx").on(table.expiresAt),
  ],
);

/**
 * Login throttling. One row per attempt, keyed by email and by IP separately so
 * neither a single account nor a single address can be hammered.
 */
export const loginAttempts = sqliteTable(
  "login_attempts",
  {
    id: text("id").primaryKey(),
    /** "email:someone@example.com" or "ip:203.0.113.4" */
    scope: text("scope").notNull(),
    succeeded: integer("succeeded").notNull().default(0),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [index("login_attempts_scope_idx").on(table.scope, table.createdAt)],
);

/* --------------------------------------------------------------- content ---- */

/**
 * Collections the admin panel manages. Adding one means adding a Zod schema and
 * an editor form — the storage and the whole draft/approval workflow are shared.
 */
export const COLLECTIONS = [
  "service",
  "industry",
  "caseStudy",
  "testimonial",
  "faq",
  "pillar",
  "engagementModel",
  "page",
  "settings",
  "process",
  "techStack",
  "navMenu",
] as const;
export type Collection = (typeof COLLECTIONS)[number];

export const CONTENT_STATUSES = ["draft", "in_review", "published", "archived"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

/**
 * One row per piece of content. The row itself holds no copy — it is the stable
 * identity (collection + slug) plus pointers to the published and working
 * revisions. That separation is what makes "edit safely while something else is
 * live" possible without a second set of columns per field.
 */
export const contentItems = sqliteTable(
  "content_items",
  {
    id: text("id").primaryKey(),
    collection: text("collection", { enum: COLLECTIONS }).notNull(),
    /** URL segment for routable collections; a stable key for the rest. */
    slug: text("slug").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),

    /** The revision the public site renders. NULL means never published. */
    publishedRevisionId: text("published_revision_id"),
    /** The revision editors are working on. NULL means no unpublished changes. */
    draftRevisionId: text("draft_revision_id"),

    status: text("status", { enum: CONTENT_STATUSES }).notNull().default("draft"),

    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  },
  (table) => [
    uniqueIndex("content_items_collection_slug_unique").on(table.collection, table.slug),
    // The public read path filters on exactly these three, in this order.
    index("content_items_collection_status_idx").on(
      table.collection,
      table.status,
      table.sortOrder,
    ),
  ],
);

/**
 * Immutable content versions. Editing never overwrites — it appends. That gives
 * the approval workflow something concrete to approve, an audit trail of who
 * changed what, and a one-row rollback.
 */
export const contentRevisions = sqliteTable(
  "content_revisions",
  {
    id: text("id").primaryKey(),
    itemId: text("item_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),

    /** The content itself: JSON, shape validated per collection by Zod. */
    data: text("data").notNull(),

    status: text("status", { enum: CONTENT_STATUSES }).notNull().default("draft"),
    /** Editor's note to the reviewer, and the reviewer's reply on rejection. */
    note: text("note"),

    createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: integer("created_at").notNull(),
    submittedAt: integer("submitted_at"),
    reviewedBy: text("reviewed_by").references(() => users.id, { onDelete: "set null" }),
    reviewedAt: integer("reviewed_at"),
    publishedAt: integer("published_at"),
  },
  (table) => [
    index("content_revisions_item_idx").on(table.itemId, table.createdAt),
    index("content_revisions_status_idx").on(table.status),
  ],
);

/* ----------------------------------------------------------------- media ---- */

/** Metadata for files uploaded to ImageKit. The bytes live in ImageKit, not here. */
export const mediaAssets = sqliteTable(
  "media_assets",
  {
    id: text("id").primaryKey(),
    /** ImageKit file ID — used to delete the file. */
    key: text("key").notNull(),
    /** ImageKit's delivery URL, captured at upload time rather than rebuilt later. */
    url: text("url").notNull(),
    filename: text("filename").notNull(),
    contentType: text("content_type").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    width: integer("width"),
    height: integer("height"),
    /** Required before an image may be used on a public page. */
    altText: text("alt_text"),
    uploadedBy: text("uploaded_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [uniqueIndex("media_assets_key_unique").on(table.key)],
);

/* ------------------------------------------------------------- audit log ---- */

/**
 * Append-only record of every privileged action: sign-ins, content transitions,
 * user changes. With a custom-built admin panel this is the only way to answer
 * "who published that, and when" after the fact.
 */
export const auditLog = sqliteTable(
  "audit_log",
  {
    id: text("id").primaryKey(),
    actorId: text("actor_id").references(() => users.id, { onDelete: "set null" }),
    /** e.g. "user.login", "content.publish", "user.role_changed" */
    action: text("action").notNull(),
    /** "content_item" | "user" | "media" | "session" */
    targetType: text("target_type"),
    targetId: text("target_id"),
    /** Small JSON blob of contextual detail. Never store secrets here. */
    detail: text("detail"),
    ipAddress: text("ip_address"),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    index("audit_log_created_idx").on(table.createdAt),
    index("audit_log_actor_idx").on(table.actorId),
  ],
);

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type ContentItem = typeof contentItems.$inferSelect;
export type ContentRevision = typeof contentRevisions.$inferSelect;
export type MediaAsset = typeof mediaAssets.$inferSelect;
