const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SRC = 'node_modules/bootstrap-icons/font/bootstrap-icons.css';
const OUT = 'app/bootstrap-icons.subset.css';

if (!fs.existsSync(SRC)) {
  console.error('bootstrap-icons css not found at', SRC);
  process.exit(1);
}

// Collect every icon actually referenced in source.
const used = new Set();
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(p); continue; }
    if (!/\.(tsx?|jsx?|css)$/.test(entry.name)) continue;
    const s = fs.readFileSync(p, 'utf8');
    for (const m of s.matchAll(/\bbi-([a-z0-9-]+)/g)) used.add(m[1]);
  }
};
['components', 'app', 'content', 'lib'].forEach((d) => fs.existsSync(d) && walk(d));

const src = fs.readFileSync(SRC, 'utf8');

// Keep everything up to the first glyph rule: @font-face and the .bi base class.
const firstGlyph = src.search(/\.bi-[a-z0-9-]+::before/);
let preamble = src.slice(0, firstGlyph);
// The stylesheet now lives in app/, not node_modules, so the relative font path
// no longer resolves. Point at the copy in public/ and drop the legacy .woff
// fallback - every browser able to run this site supports woff2.
preamble = preamble.replace(/src:[^;]*;/, 'src: url("/fonts/bootstrap-icons.woff2") format("woff2");');

// Keep only glyph rules whose name is used.
const glyphs = [...src.matchAll(/\.bi-([a-z0-9-]+)::before\s*\{[^}]*\}/g)];
const kept = glyphs.filter((g) => used.has(g[1]));

const header = `/* Bootstrap Icons — SUBSET, generated.
   ---------------------------------------------------------------------------
   The full stylesheet declares ${glyphs.length} glyph rules. This site uses
   ${used.size}. Shipping the rest cost roughly 100KB of CSS on every page for
   icons that are never rendered.

   REGENERATE after adding an icon:
     node scripts/subset-bootstrap-icons.js
   The build fails loudly if a referenced icon is missing from this file, so a
   forgotten regeneration cannot ship silently as a blank glyph.

   Do not hand-edit. */\n\n`;

fs.writeFileSync(OUT, header + preamble + kept.map((g) => g[0]).join('\n') + '\n');

const before = Buffer.byteLength(src);
const after = fs.statSync(OUT).size;
console.log(`glyph rules: ${glyphs.length} -> ${kept.length}`);
console.log(`css bytes:   ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);

const missing = [...used].filter((u) => !glyphs.some((g) => g[1] === u));
if (missing.length) console.log('NOT FOUND in bootstrap-icons (check spelling):', missing.join(', '));
