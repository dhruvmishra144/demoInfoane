#!/usr/bin/env node
/**
 * Fails if any [PLACEHOLDER] is left in the content or config files.
 *
 * Wire this into CI (or a pre-deploy step) so a half-filled homepage cannot
 * reach production — placeholder text in a title tag or in JSON-LD gets indexed
 * fast and is slow to live down.
 *
 * Usage: npm run check:placeholders
 */

import { readFile, readdir } from "node:fs/promises";
import { join, extname } from "node:path";

/**
 * Only the two authored-content files are scanned. Every placeholder lives in
 * one of them by design — the components read from these, so there is nothing
 * to fill in inside the JSX.
 */
const ROOTS = ["src/config", "src/content"];
const EXTS = new Set([".ts", ".tsx"]);

// A placeholder is a bracketed run containing a letter or digit — digits matter
// because "[2] weeks" and "[30] minutes" are placeholders too. Bracket groups
// containing a double quote are array literals (["React", …]), not placeholders.
const PLACEHOLDER = /\[[^\]"\n]*[A-Za-z0-9][^\]"\n]*\]/g;
// Skip TS syntax that survives the above: string[], arr[i], obj[key].
const IGNORE = /^\[\s*\]$|^\[[a-z][A-Za-z0-9_]*\]$/;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (EXTS.has(extname(entry.name))) yield path;
  }
}

const findings = [];

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const text = await readFile(file, "utf8");
    text.split("\n").forEach((line, index) => {
      // Skip comment lines: the guidance in them legitimately uses brackets.
      const trimmed = line.trim();
      if (trimmed.startsWith("*") || trimmed.startsWith("//") || trimmed.startsWith("/*")) {
        return;
      }
      for (const match of line.match(PLACEHOLDER) ?? []) {
        if (IGNORE.test(match)) continue;
        findings.push({ file, line: index + 1, match, text: trimmed.slice(0, 90) });
      }
    });
  }
}

if (findings.length === 0) {
  console.log("✓ No placeholders left.");
  process.exit(0);
}

console.error(`✗ ${findings.length} placeholder(s) still need real content:\n`);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  ${f.match}`);
}
console.error("\nFill these in (start with src/config/site.ts), then re-run.");
process.exit(1);
