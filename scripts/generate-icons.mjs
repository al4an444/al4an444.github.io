// Generates PWA icons from the favicon design. Run: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// rx > 0 → rounded corners (purpose "any"); rx = 0 → full-bleed square
// (maskable / apple-touch). `inset` shrinks the glyph toward the centre so
// maskable icons keep everything inside the 80% safe zone.
const icon = (rx, inset = 0) => {
  const s = 1 - inset * 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${rx}" fill="#f8fbf9"/>
  <g transform="translate(${512 * inset} ${512 * inset}) scale(${s})" fill="none" stroke-linecap="round">
    <g stroke="#16241d" stroke-opacity="0.10" stroke-width="14">
      <path d="M120 132 C120 228 128 300 128 380"/>
      <path d="M182 118 C182 220 192 300 192 392"/>
      <path d="M330 118 C330 220 320 300 320 392"/>
      <path d="M392 132 C392 228 384 300 384 380"/>
    </g>
    <path d="M256 96 C180 180 332 332 256 416" stroke="#1f9d6b" stroke-width="44"/>
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
