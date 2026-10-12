// Starts `next dev` without the local Cloudflare Workers runtime.
// A script rather than `CF_SKIP_BINDINGS=1 next dev` so it works the same in
// PowerShell, cmd and bash.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");

const child = spawn(process.execPath, [nextBin, "dev", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, CF_SKIP_BINDINGS: "1" },
});
child.on("exit", (code) => process.exit(code ?? 0));
