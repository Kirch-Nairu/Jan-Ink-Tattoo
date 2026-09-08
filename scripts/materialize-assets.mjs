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
    if (entry.isFile() && (entry.name.includes(".b64") || entry.name.endsWith(".json"))) {
      files.push(absolute);
    }
  }

  return files;
}

const sources = (await walk(encodedRoot)).sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true }),
);

const b64Sources = sources.filter((source) => source.includes(".b64"));
const jsonSources = sources.filter((source) => source.endsWith(".json"));

const grouped = new Map();
for (const source of b64Sources) {
  const relative = path.relative(encodedRoot, source);
  const logical = relative.replace(/\.b64(?:\.\d+)?$/, "");
  const list = grouped.get(logical) ?? [];
  list.push(source);
  grouped.set(logical, list);
}

const assets = new Map();

for (const [relative, parts] of grouped) {
  const encodedParts = await Promise.all(parts.map((source) => readFile(source, "utf8")));
  assets.set(relative, encodedParts.join("").replace(/\s+/g, ""));
}

for (const source of jsonSources) {
  const payload = JSON.parse(await readFile(source, "utf8"));
  for (const [relative, encoded] of Object.entries(payload)) {
    if (typeof encoded !== "string") continue;
    assets.set(relative, encoded.replace(/\s+/g, ""));
  }
}

for (const [relative, encoded] of assets) {
  const target = path.join(outputRoot, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(encoded, "base64"));
}

console.log(`[jan-ink] materialized ${assets.size} portfolio image assets`);
