// Generates the social preview card (public/og.png, 1200x630) in the site's
// "ink on paper" palette, echoing the Plotter Field: a faint field of ink
// traces with one green thread running through it.
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;

// A faint field of near-vertical traces down the right third of the card.
const field = [];
for (let i = 0; i < 9; i++) {
  const x = 830 + i * 42;
  const bow = (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 8);
  field.push(
    `<path d="M${x} 70 C${x + bow} 220 ${x - bow} 400 ${x} 560" stroke="#16241d" stroke-opacity="0.10" stroke-width="2"/>`
  );
}

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#f8fbf9"/>
  <g fill="none" stroke-linecap="round">
    ${field.join('\n    ')}
    <path d="M1010 60 C930 190 1090 400 1010 570" stroke="#1f9d6b" stroke-opacity="0.9" stroke-width="6"/>
  </g>
  <g font-family="Segoe UI, Arial, Helvetica, sans-serif">
    <text x="90" y="250" font-size="108" font-weight="700" fill="#16241d" letter-spacing="-3">Alan Ortega</text>
    <text x="90" y="318" font-size="42" font-weight="400" fill="#526056">Security Researcher</text>
    <rect x="90" y="372" width="86" height="6" rx="3" fill="#1f9d6b"/>
    <text x="90" y="466" font-size="27" font-weight="600" fill="#0f6b47" font-family="Consolas, monospace">Google · Microsoft · NVIDIA</text>
    <text x="90" y="536" font-size="24" font-weight="400" fill="#64756b" font-family="Consolas, monospace">al4an444.github.io</text>
  </g>
</svg>`);

await sharp(svg).png().toFile('public/og.png');
console.log('wrote public/og.png');
