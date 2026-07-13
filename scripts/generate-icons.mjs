// Generates PWA icons from the favicon design. Run: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// rx > 0 → rounded corners (purpose "any"); rx = 0 → full-bleed square
// (maskable / apple-touch). `inset` shrinks the glyph toward the centre so
// maskable icons keep everything inside the 80% safe zone.
const icon = (rx, inset = 0) => {
  const s = 1 - inset * 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${rx}" fill="#0a0d12"/>
  <g transform="translate(${512 * inset} ${512 * inset}) scale(${s})">
    <polyline points="150,170 240,256 150,342" fill="none" stroke="#6ea2ff" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="272" y="324" width="110" height="30" rx="15" fill="#6ea2ff"/>
  </g>
</svg>`);
};

await mkdir('public/icons', { recursive: true });

const jobs = [
  { svg: icon(96), size: 192, out: 'public/icons/icon-192.png' },
  { svg: icon(96), size: 512, out: 'public/icons/icon-512.png' },
  { svg: icon(0, 0.08), size: 512, out: 'public/icons/icon-maskable-512.png' },
  { svg: icon(0), size: 180, out: 'public/icons/apple-touch-icon.png' },
];

for (const { svg, size, out } of jobs) {
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log('wrote', out);
}
