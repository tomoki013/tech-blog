#!/usr/bin/env node
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

// 50 KB gzip budget for total client-side JS
const BUDGET_BYTES = 50 * 1024;

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.name.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}

const distDir = "./dist";
const jsFiles = walkDir(distDir);

let totalRaw = 0;
let totalGzip = 0;
const fileSizes = [];

for (const file of jsFiles) {
  const content = readFileSync(file);
  const gzipped = gzipSync(content);
  totalRaw += content.length;
  totalGzip += gzipped.length;
  fileSizes.push({
    file: file.replace(`${distDir.replace("./", "")}/`, "").replace(`${distDir}/`, ""),
    raw: content.length,
    gzip: gzipped.length,
  });
}

fileSizes.sort((a, b) => b.gzip - a.gzip);

const fmt = (bytes) => `${(bytes / 1024).toFixed(2)} KB`;

console.log("--- JavaScript Budget Check ---");
console.log(`JS files found: ${jsFiles.length}`);
console.log(`Total raw:      ${fmt(totalRaw)}`);
console.log(`Total gzip:     ${fmt(totalGzip)}`);
console.log(`Budget:         ${fmt(BUDGET_BYTES)}`);

if (fileSizes.length > 0) {
  console.log("\nLargest JS files (by gzip):");
  for (const f of fileSizes.slice(0, 10)) {
    console.log(`  ${f.file}: ${fmt(f.gzip)} (raw: ${fmt(f.raw)})`);
  }
}

if (totalGzip > BUDGET_BYTES) {
  console.error(`\nFAIL: Total gzip JS ${fmt(totalGzip)} exceeds budget of ${fmt(BUDGET_BYTES)}`);
  process.exit(1);
} else {
  console.log(`\nPASS: Total gzip JS ${fmt(totalGzip)} within budget of ${fmt(BUDGET_BYTES)}`);
}
