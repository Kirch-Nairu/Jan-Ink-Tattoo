import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceFiles = [
  path.join(root, "data", "portfolio.ts"),
  path.join(root, "components", "JanInkSite.tsx"),
];

const refs = new Set();
for (const sourceFile of sourceFiles) {
  const source = await readFile(sourceFile, "utf8");
  for (const match of source.matchAll(/\/images\/[A-Za-z0-9_./-]+\.webp/g)) {
    refs.add(match[0]);
  }
}

if (refs.size === 0) {
  throw new Error("No WebP image references found in portfolio/component sources.");
}

for (const ref of refs) {
  const absolute = path.join(root, "public", ref.replace(/^\//, ""));
  await access(absolute);
  const bytes = await readFile(absolute);
  const riff = bytes.subarray(0, 4).toString("ascii");
  const webp = bytes.subarray(8, 12).toString("ascii");
  if (riff !== "RIFF" || webp !== "WEBP") {
    throw new Error(`Invalid WebP asset: ${ref}`);
  }
}

console.log(`[jan-ink] verified ${refs.size} referenced WebP assets`);
