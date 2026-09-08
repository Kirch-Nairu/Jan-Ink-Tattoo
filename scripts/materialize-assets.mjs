import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const encodedRoot = path.join(root, "assets", "encoded");
const outputRoot = path.join(root, "public", "images");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    if (entry.isFile() && entry.name.endsWith(".b64")) files.push(absolute);
  }

  return files;
}

const files = (await walk(encodedRoot)).sort((a, b) => a.localeCompare(b));
let count = 0;

for (const source of files) {
  const relative = path.relative(encodedRoot, source).replace(/\.b64$/, "");
  const target = path.join(outputRoot, relative);
  const encoded = (await readFile(source, "utf8")).trim();

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(encoded, "base64"));
  count += 1;
}

console.log(`[jan-ink] materialized ${count} portfolio image assets`);
