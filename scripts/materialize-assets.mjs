import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const encodedDir = path.join(root, "assets", "encoded");
const outputRoot = path.join(root, "public", "images");

const parts = (await readdir(encodedDir))
  .filter((name) => name.endsWith(".json"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let count = 0;

for (const part of parts) {
  const source = JSON.parse(await readFile(path.join(encodedDir, part), "utf8"));

  for (const [relativePath, encoded] of Object.entries(source)) {
    const target = path.join(outputRoot, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(encoded, "base64"));
    count += 1;
  }
}

console.log(`[jan-ink] materialized ${count} portfolio image assets`);
