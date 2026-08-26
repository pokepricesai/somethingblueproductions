/**
 * One-shot favicon generator.
 *
 * Reads the genuine Something Blue artwork from public/brand/favicon-source.svg
 * and writes all Next.js App Router icon files.
 *
 *   src/app/icon.svg            – vector for modern browsers
 *   src/app/apple-icon.png      – 180×180 for iOS home screen
 *   src/app/favicon.ico         – multi-size ICO (16/32/48) for legacy
 *   public/brand/icon-192.png   – referenced by manifest (Android/PWA)
 *   public/brand/icon-512.png   – referenced by manifest + Google Search
 *
 * NOTE: We deliberately do NOT emit src/app/icon.png alongside icon.svg —
 * Next.js's icon file convention resolves both to a single "icon" slot,
 * which produces served-bytes-vs-declared-MIME mismatches.
 *
 * Transparency is preserved in every output.
 * Run: `node scripts/generate-favicons.mjs`
 */
import sharp from 'sharp';
import { readFile, writeFile, copyFile, mkdir } from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'public/brand/favicon-source.svg');
const APP = path.join(ROOT, 'src/app');
const PUB_BRAND = path.join(ROOT, 'public/brand');

const svg = await readFile(SRC);

async function rasterise(size) {
  return sharp(svg, { density: Math.max(300, size * 2) })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Assemble a multi-size ICO from PNG buffers. Format spec: ICO header +
 *  directory entries + embedded PNG data. Windows Vista+ / all modern
 *  browsers accept PNG-in-ICO. */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);           // reserved
  header.writeUInt16LE(1, 2);           // 1 = ICO
  header.writeUInt16LE(count, 4);       // image count

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const images = [];

  pngBuffers.forEach((png, i) => {
    // Extract width/height from the PNG buffer (bytes 16–24, big-endian).
    const w = png.readUInt32BE(16);
    const h = png.readUInt32BE(20);
    const base = i * 16;
    dir[base + 0] = w >= 256 ? 0 : w;    // 0 means 256
    dir[base + 1] = h >= 256 ? 0 : h;
    dir[base + 2] = 0;                    // palette count
    dir[base + 3] = 0;                    // reserved
    dir.writeUInt16LE(1, base + 4);       // color planes
    dir.writeUInt16LE(32, base + 6);      // bits per pixel
    dir.writeUInt32LE(png.length, base + 8);   // image data size
    dir.writeUInt32LE(offset, base + 12);      // image data offset
    images.push(png);
    offset += png.length;
  });

  return Buffer.concat([header, dir, ...images]);
}

await mkdir(PUB_BRAND, { recursive: true });

// 1. SVG copy — served by Next.js App Router as /icon.svg
await copyFile(SRC, path.join(APP, 'icon.svg'));
console.log('✓ src/app/icon.svg');

// 2. Apple touch icon (iOS home screen)
await writeFile(path.join(APP, 'apple-icon.png'), await rasterise(180));
console.log('✓ src/app/apple-icon.png (180×180)');

// 3. Multi-size favicon.ico (16/32/48)
const ico = buildIco([
  await rasterise(16),
  await rasterise(32),
  await rasterise(48),
]);
await writeFile(path.join(APP, 'favicon.ico'), ico);
console.log('✓ src/app/favicon.ico (16 + 32 + 48)');

// 4. Manifest-referenced PNGs (Android home screen / PWA / Google Search)
await writeFile(path.join(PUB_BRAND, 'icon-192.png'), await rasterise(192));
await writeFile(path.join(PUB_BRAND, 'icon-512.png'), await rasterise(512));
console.log('✓ public/brand/icon-192.png');
console.log('✓ public/brand/icon-512.png');
