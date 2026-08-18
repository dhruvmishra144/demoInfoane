import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export { schema };
export type Db = DrizzleD1Database<typeof schema>;

/**
 * Drizzle client over the D1 binding.
 *
 * Two variants because the adapter exposes bindings differently depending on
 * where you are:
 *  - `getDb()` — synchronous, for route handlers and server actions.
 *  - `getDbAsync()` — required anywhere that runs during static generation.
 *
 * Using Drizzle rather than hand-written SQL is a security decision as much as an
 * ergonomic one: every value is bound as a parameter, so string interpolation —
 * the usual route to SQL injection in D1 code — never enters the picture.
 */
export function getDb(): Db {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    throw new Error(
      "D1 binding `DB` is missing. Check wrangler.jsonc, and run `npm run db:migrate` for local development.",
    );
  }
  return drizzle(env.DB, { schema });
}

export async function getDbAsync(): Promise<Db> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 binding `DB` is missing during static generation.");
  }
  return drizzle(env.DB, { schema });
}

/** Config for the ImageKit account holding editor uploads. */
export function getImageKitConfig(): {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
} {
  const { env } = getCloudflareContext();
  const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = env;
  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    throw new Error(
      "ImageKit env vars are missing. Check wrangler.jsonc `vars` and set the " +
        "IMAGEKIT_PRIVATE_KEY secret with `npx wrangler secret put IMAGEKIT_PRIVATE_KEY`.",
    );
  }
  return {
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  };
}

/**
 * Uploads a file to ImageKit via its REST API.
 *
 * Using the raw HTTP API rather than the `imagekit` npm SDK: that SDK expects
 * Node's `http`/`form-data` internals, which don't exist in the Workers
 * runtime even with `nodejs_compat`. `fetch` + `FormData` is what Workers
 * actually supports, and it's all the upload endpoint needs.
 */
export async function uploadMedia(
  file: Blob,
  fileName: string,
): Promise<{ fileId: string; url: string }> {
  const { privateKey } = getImageKitConfig();

  const form = new FormData();
  form.set("file", file, fileName);
  form.set("fileName", fileName);
  form.set("useUniqueFileName", "true");

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      // ImageKit auth is HTTP Basic with the private key as the username and
      // an empty password.
      Authorization: `Basic ${btoa(`${privateKey}:`)}`,
    },
    body: form,
  });

  if (!response.ok) {
    throw new Error(`ImageKit upload failed: ${response.status} ${await response.text()}`);
  }

  const result = (await response.json()) as { fileId: string; url: string };
  return { fileId: result.fileId, url: result.url };
}
