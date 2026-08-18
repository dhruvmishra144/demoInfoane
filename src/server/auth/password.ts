/**
 * Password hashing.
 *
 * PBKDF2-HMAC-SHA-256 via WebCrypto. bcrypt and argon2 are native modules and do
 * not run in the Workers runtime; an argon2 WASM build is possible but adds bundle
 * weight and a supply-chain dependency for a login form. PBKDF2 is the pragmatic
 * choice here and is implemented natively by workerd.
 *
 * The iteration count is stored per user, so it can be raised later and existing
 * passwords transparently upgrade on next sign-in (see `needsRehash`).
 */

/**
 * OWASP's current guidance for PBKDF2-HMAC-SHA-256 is 600,000 iterations. This is
 * deliberately lower.
 *
 * The constraint is Workers CPU time: hashing is real CPU work, and the Workers
 * free plan allows ~10ms per invocation, which even 100k iterations exceeds. At
 * 300k this needs the Workers Paid plan (default 30s CPU limit) — comfortable, but
 * worth verifying against your plan once deployed.
 *
 * If you move auth somewhere with more CPU headroom, raise this: it is one
 * constant, and existing users re-hash on their next successful sign-in.
 */
export const PBKDF2_ITERATIONS = 300_000;

const KEY_LENGTH_BITS = 256;
const SALT_BYTES = 16;

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function derive(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    key,
    KEY_LENGTH_BITS,
  );

  return toHex(bits);
}

export type PasswordRecord = {
  passwordHash: string;
  passwordSalt: string;
  passwordIterations: number;
};

/** Hashes a new password with a fresh random salt. */
export async function hashPassword(password: string): Promise<PasswordRecord> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const passwordHash = await derive(password, salt, PBKDF2_ITERATIONS);

  return {
    passwordHash,
    passwordSalt: toHex(salt.buffer as ArrayBuffer),
    passwordIterations: PBKDF2_ITERATIONS,
  };
}

/**
 * Constant-time string comparison.
 *
 * A plain `===` on hashes leaks, through timing, how many leading characters
 * matched. The window is small over a network but it costs nothing to close.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Verifies a password against a stored record. */
export async function verifyPassword(
  password: string,
  record: PasswordRecord,
): Promise<boolean> {
  const candidate = await derive(
    password,
    fromHex(record.passwordSalt),
    record.passwordIterations,
  );
  return timingSafeEqual(candidate, record.passwordHash);
}

/** True when a stored password was hashed with a now-outdated work factor. */
export function needsRehash(record: PasswordRecord): boolean {
  return record.passwordIterations < PBKDF2_ITERATIONS;
}

/**
 * Burns roughly the same CPU as a real verification, for sign-in attempts against
 * an address that has no account. Without this, "unknown email" returns measurably
 * faster than "wrong password", which hands an attacker a way to enumerate who has
 * an account.
 */
export async function fakeVerify(): Promise<void> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  await derive("timing-equalisation", salt, PBKDF2_ITERATIONS);
}

/**
 * Password policy.
 *
 * Length is the requirement that actually correlates with strength; composition
 * rules mostly push people towards `Password1!`. NIST's guidance is to check
 * length and screen against common passwords rather than mandate character
 * classes.
 */
const COMMON_PASSWORDS = new Set([
  "password",
  "password1",
  "password123",
  "12345678",
  "123456789",
  "qwerty123",
  "letmein1",
  "welcome1",
  "admin123",
  "infotech",
  "infotech123",
]);

export function validatePasswordStrength(password: string): string | null {
  if (password.length < 12) return "Use at least 12 characters.";
  if (password.length > 200) return "Must be 200 characters or fewer.";
  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    return "That password is too common. Choose something less guessable.";
  }
  if (/^(.)\1+$/.test(password)) return "Cannot be a single repeated character.";
  return null;
}
