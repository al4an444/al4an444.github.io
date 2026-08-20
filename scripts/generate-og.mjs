// Generates the social preview card (public/og.png, 1200x630).
// Brutalist: pure black, pure white, one red. The card carries the same diagram
// as the site — the authenticatedMatcher falling through two empty slots into
// the Subject DN — because the preview should show the finding, not a job title.
//
// NOTE ON TYPE: sharp rasterises SVG text with fonts installed on the machine
// running this script, so the site's Archivo is not available here. The card
// asks for a heavy system stack (Arial Black / Impact) which approximates it.
// Re-run and LOOK at the PNG after changing anything.
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;

const BG = '#000000';
const FG = '#ffffff';
const DATA = '#8a8a8a';
const DIM = '#555555';
const ALERT = '#ff3b30'; // spent once, on the terminus

const DISPLAY = "Arial Black, Impact, Haettenschweiler, 'Segoe UI', sans-serif";
const MONO = "Consolas, 'DejaVu Sans Mono', monospace";

// Diagram geometry, right half.
const LX = 700;
const EX = 1120;
const J1 = 810;
const J2 = 950;
const L1 = 208;
const L2 = 300;
const L3 = 392;

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- Matches the hero: the name, with the discipline small underneath. -->
  <g font-family="${DISPLAY}" fill="${FG}" font-size="118" letter-spacing="-3">
    <text x="70" y="250">ALAN</text>
    <text x="70" y="362">ORTEGA</text>
  </g>
  <text x="70" y="412" font-family="${MONO}" font-size="21" fill="${FG}" letter-spacing="4">CYBERSECURITY</text>

  <!-- The diagram -->
  <g>
    <line x1="${LX}" y1="${L1}" x2="${EX}" y2="${L1}" stroke="#333333" stroke-width="3"/>
    <line x1="${LX}" y1="${L2}" x2="${EX}" y2="${L2}" stroke="#333333" stroke-width="3"/>
    <line x1="${LX}" y1="${L3}" x2="${EX}" y2="${L3}" stroke="#333333" stroke-width="3"/>

    <line x1="${J1}" y1="${L1}" x2="${EX - 34}" y2="${L1}" stroke="${DIM}" stroke-width="3" stroke-dasharray="3 12"/>
    <line x1="${J2}" y1="${L2}" x2="${EX - 34}" y2="${L2}" stroke="${DIM}" stroke-width="3" stroke-dasharray="3 12"/>
    <rect x="${EX - 26}" y="${L1 - 13}" width="26" height="26" fill="none" stroke="${DIM}" stroke-width="3"/>
    <rect x="${EX - 26}" y="${L2 - 13}" width="26" height="26" fill="none" stroke="${DIM}" stroke-width="3"/>

    <path d="M ${LX} ${L1} H ${J1} V ${L2} H ${J2} V ${L3} H ${EX}" fill="none" stroke="${FG}" stroke-width="8" stroke-linecap="square"/>
    <rect x="${EX - 26}" y="${L3 - 15}" width="30" height="30" fill="${ALERT}"/>
  </g>

  <g font-family="${MONO}" font-size="17" fill="${DATA}" letter-spacing="2.5">
    <text x="${LX}" y="${L1 - 26}">URI SAN</text>
    <text x="${LX}" y="${L2 - 26}">DNS SAN</text>
    <text x="${LX}" y="${L3 - 26}">SUBJECT DN</text>
  </g>

  <!-- Foot -->
  <line x1="70" y1="516" x2="${W - 70}" y2="516" stroke="${FG}" stroke-width="3"/>
  <g font-family="${MONO}" font-size="19" letter-spacing="2.5">
    <text x="70" y="562" fill="${FG}">GRPC-GO · CVSS 7.5 · FIXED IN v1.81.1</text>
    <text x="${W - 70}" y="562" fill="${DATA}" text-anchor="end">SECURITY RESEARCHER</text>
    <text x="${W - 70}" y="594" fill="${DATA}" text-anchor="end">al4an444.github.io</text>
  </g>
</svg>`);

await sharp(svg).png().toFile('public/og.png');
console.log('wrote public/og.png');
