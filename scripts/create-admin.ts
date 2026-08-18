/**
 * Creates or updates an admin user.
 *
 *   npx tsx scripts/create-admin.ts                 # prompts, applies to local D1
 *   npx tsx scripts/create-admin.ts --remote        # applies to production D1
 *
 * The password is read from a hidden prompt, or from the ADMIN_PASSWORD
 * environment variable for non-interactive use. It is never taken as a command
 * line argument: argv is visible to other processes on the machine and lands in
 * shell history.
 *
 * The hash is computed here and only the hash is sent to D1 — the plaintext never
 * touches a file, a log or the database. The generated SQL is written to a
 * gitignored temporary file, applied, then deleted.
 *
 * Node's WebCrypto is used with exactly the same parameters as the Workers runtime
 * (src/server/auth/password.ts), so a hash made here verifies there.
 */

import { webcrypto } from "node:crypto";
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { createInterface } from "node:readline";
import { validatePasswordStrength } from "../src/server/auth/password";

const PBKDF2_ITERATIONS = 300_000;
const DB_NAME = "infotech-content";
const TEMP_FILE = "drizzle/.create-admin.sql";

const remote = process.argv.includes("--remote");

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password: string) {
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const key = await webcrypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await webcrypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    256,
  );
  return {
    passwordHash: toHex(bits),
    passwordSalt: toHex(salt.buffer as ArrayBuffer),
    passwordIterations: PBKDF2_ITERATIONS,
  };
}

function ask(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/** Reads without echoing, so the password is not left on screen. */
function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(question);
    const stdin = process.stdin;
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    // Control characters as escapes, not literals, so they survive copy/paste
    // and are legible in review.
    const ENTER = ["\r", "\n"];
    const CTRL_C = "\u0003";
    const CTRL_D = "\u0004";
    const BACKSPACE = ["\u007f", "\b"];

    let value = "";
    const onData = (char: string) => {
      if (ENTER.includes(char) || char === CTRL_D) {
        stdin.setRawMode?.(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        process.stdout.write("\n");
        resolve(value);
        return;
      }
      if (char === CTRL_C) {
        stdin.setRawMode?.(false);
        process.stdout.write("\n");
        process.exit(1);
      }
      if (BACKSPACE.includes(char)) {
        value = value.slice(0, -1);
        return;
      }
      value += char;
    };

    stdin.on("data", onData);
  });
}

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

async function main() {
  console.log(`Creating an admin user in the ${remote ? "REMOTE" : "local"} database.\n`);

  const email = (process.env.ADMIN_EMAIL ?? (await ask("Email: "))).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("That does not look like an email address.");
    process.exit(1);
  }

  const name = (process.env.ADMIN_NAME ?? (await ask("Full name: "))).trim();
  if (!name) {
    console.error("A name is required.");
    process.exit(1);
  }

  let password = process.env.ADMIN_PASSWORD ?? "";
  if (!password) {
    password = await askHidden("Password (hidden): ");
    const again = await askHidden("Confirm password: ");
    if (password !== again) {
      console.error("Passwords do not match.");
      process.exit(1);
    }
  }

  const weakness = validatePasswordStrength(password);
  if (weakness) {
    console.error(`Password rejected: ${weakness}`);
    process.exit(1);
  }

  const record = await hashPassword(password);
  const now = Date.now();
  const id = webcrypto.randomUUID();

  /**
   * Upsert on email, so re-running this resets an existing admin's password
   * rather than failing on the unique index.
   */
  const sql = `
INSERT INTO users (id, email, name, role, password_hash, password_salt, password_iterations, is_active, must_change_password, created_at, updated_at, last_login_at)
VALUES (${sqlString(id)}, ${sqlString(email)}, ${sqlString(name)}, 'admin', ${sqlString(record.passwordHash)}, ${sqlString(record.passwordSalt)}, ${record.passwordIterations}, 1, 0, ${now}, ${now}, NULL)
ON CONFLICT(email) DO UPDATE SET
  name = excluded.name,
  role = 'admin',
  password_hash = excluded.password_hash,
  password_salt = excluded.password_salt,
  password_iterations = excluded.password_iterations,
  is_active = 1,
  must_change_password = 0,
  updated_at = ${now};

-- Any existing sessions for this account are revoked, since the password changed.
DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE email = ${sqlString(email)});
`.trim();

  writeFileSync(TEMP_FILE, sql, "utf8");

  try {
    execFileSync(
      "npx",
      [
        "wrangler",
        "d1",
        "execute",
        DB_NAME,
        remote ? "--remote" : "--local",
        `--file=${TEMP_FILE}`,
      ],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    console.log(`\n✓ Admin user ${email} is ready (${remote ? "remote" : "local"}).`);
    console.log("  Sign in at /admin/login");
  } catch (error) {
    console.error("\n✗ Failed to apply. Wrangler output:");
    const err = error as { stdout?: Buffer; stderr?: Buffer };
    console.error(err.stderr?.toString() ?? err.stdout?.toString() ?? String(error));
    process.exitCode = 1;
  } finally {
    // The file contains a hash rather than a password, but there is no reason to
    // leave it lying around.
    try {
      unlinkSync(TEMP_FILE);
    } catch {
      /* already gone */
    }
  }
}

void main();
