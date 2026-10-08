import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

/**
 * Editorial Design Tokens per docs/DESIGN_SYSTEM.md and src/styles/global.css:
 * base-100: #161310 (warm dark ink)
 * base-200: #1d1916 (elevated dark surface)
 * base-300: #322e2a (hairline border)
 * base-content: #ebe7df (warm paper ink)
 * accent: #aaa7f4 (violet hue 285)
 * secondary: #a59f96 (muted warm grey)
 */
const SVG_FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <rect width="100" height="100" rx="22" fill="#161310"/>
  <rect x="2" y="2" width="96" height="96" rx="20" fill="none" stroke="#322e2a" stroke-width="2"/>
  <text x="50" y="66" font-family="'Instrument Serif', Georgia, 'Times New Roman', serif" font-size="52" font-style="normal" font-weight="400" fill="#ebe7df" text-anchor="middle" letter-spacing="-1">SL</text>
  <circle cx="78" cy="34" r="4" fill="#aaa7f4"/>
</svg>
`;

/**
 * Packs multiple PNG buffers into a valid Windows ICO format.
 * @param {Array<{ width: number, height: number, buffer: Buffer }>} images
 * @returns {Buffer}
 */
function packIco(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved (0)
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width (0 means 256)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Color palette (0 = no palette)
    entry.writeUInt8(0, 3); // Reserved (0)
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset to image data
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((img) => img.buffer)]);
}

async function generate() {
  console.log('✨ [Favicon Generator] Generating editorial favicon and app icon assets...');

  // 1. Write public/favicon.svg
  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, SVG_FAVICON, 'utf-8');
  console.log('✅ Generated public/favicon.svg');

  const svgBuffer = Buffer.from(SVG_FAVICON);

  // 2. Generate Apple Touch Icon (180x180)
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(svgBuffer).resize(180, 180).png({ compressionLevel: 9 }).toFile(appleTouchPath);
  console.log('✅ Generated public/apple-touch-icon.png (180x180)');

  // 3. Generate Android Chrome Icons (192x192 and 512x512)
  const icon192Path = path.join(publicDir, 'icon-192.png');
  await sharp(svgBuffer).resize(192, 192).png({ compressionLevel: 9 }).toFile(icon192Path);
  console.log('✅ Generated public/icon-192.png (192x192)');

  const icon512Path = path.join(publicDir, 'icon-512.png');
  await sharp(svgBuffer).resize(512, 512).png({ compressionLevel: 9 }).toFile(icon512Path);
  console.log('✅ Generated public/icon-512.png (512x512)');

  // 4. Generate Multi-Resolution favicon.ico (16x16, 32x32, 48x48)
  const [png16, png32, png48] = await Promise.all([
    sharp(svgBuffer).resize(16, 16).png().toBuffer(),
    sharp(svgBuffer).resize(32, 32).png().toBuffer(),
    sharp(svgBuffer).resize(48, 48).png().toBuffer(),
  ]);

  const icoBuffer = packIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  const icoPath = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  console.log('✅ Generated public/favicon.ico (multi-resolution 16x16, 32x32, 48x48)');

  console.log('🎉 All favicon assets regenerated successfully!');
}

generate().catch((err) => {
  console.error('❌ Favicon generation error:', err);
  process.exit(1);
});
