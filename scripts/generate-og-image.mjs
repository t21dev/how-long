import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, '../public/og-image.svg');
const outPath = resolve(__dirname, '../public/og-image.png');

const svg = readFileSync(svgPath);

await sharp(svg, { density: 150 })
  .resize(1200, 630)
  .png()
  .toFile(outPath);

console.log('Generated og-image.png (1200x630)');
