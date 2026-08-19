"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb, schema, uploadMedia, deleteMedia } from "@/server/db";
import { requireRole, getClientIp } from "@/server/auth/guards";
import { writeAudit } from "@/server/auth/audit";

const MAX_BYTES = 8 * 1024 * 1024;

export type MediaActionState = { error: string } | undefined;

/** Uploads to ImageKit, then records the result in `media_assets`. */
export async function uploadMediaAction(
  _previous: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  const user = await requireRole("editor");

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file to upload." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "File is too large — 8MB maximum." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are supported." };
  }

  const altText = String(formData.get("altText") ?? "").trim() || null;

  const uploaded = await uploadMedia(file, file.name);

  const db = getDb();
  const id = crypto.randomUUID();

  await db.insert(schema.mediaAssets).values({
    id,
    key: uploaded.fileId,
    url: uploaded.url,
    filename: uploaded.name,
    contentType: file.type,
    sizeBytes: uploaded.size,
    width: uploaded.width,
    height: uploaded.height,
    altText,
    uploadedBy: user.id,
    createdAt: Date.now(),
  });

  await writeAudit({
    actorId: user.id,
    action: "media.uploaded",
    targetType: "media",
    targetId: id,
    detail: { filename: uploaded.name },
    ipAddress: await getClientIp(),
  });

  redirect("/admin/media");
}

/** Removes the ImageKit file and its `media_assets` row. */
export async function deleteMediaAction(id: string): Promise<{ error: string } | void> {
  const user = await requireRole("editor");
  const db = getDb();

  const rows = await db
    .select()
    .from(schema.mediaAssets)
    .where(eq(schema.mediaAssets.id, id))
    .limit(1);
  const asset = rows[0];
  if (!asset) return { error: "That asset no longer exists." };

  await deleteMedia(asset.key);
  await db.delete(schema.mediaAssets).where(eq(schema.mediaAssets.id, id));

  await writeAudit({
    actorId: user.id,
    action: "media.deleted",
    targetType: "media",
    targetId: id,
    detail: { filename: asset.filename },
    ipAddress: await getClientIp(),
  });
}

/**
 * Alt text is required before an image can go on a public page (enforced by
 * the picker filtering assets without one, not by a DB constraint) — this is
 * the inline editor for setting it after upload.
 */
export async function updateAltTextAction(
  id: string,
  altText: string,
): Promise<{ error: string } | void> {
  await requireRole("editor");
  const db = getDb();

  await db
    .update(schema.mediaAssets)
    .set({ altText: altText.trim() || null })
    .where(eq(schema.mediaAssets.id, id));
}
