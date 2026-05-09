/**
 * Download assets from the original source site
 * Run: node scripts/download-assets.mjs
 */

import { createWriteStream, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://portfolio-thanhlong.vercel.app';

const ASSETS = [
  // Background / profile
  ['/background/actor.png', 'public/background/actor.png'],
  ['/background/favicon.ico', 'public/background/favicon.ico'],
  // SEO
  ['/opengraph-image.png', 'public/seo/opengraph-image.png'],
  ['/favicon.ico', 'public/seo/favicon.ico'],
  // Social icons
  ['/icons-social/linkedin.svg', 'public/icons-social/linkedin.svg'],
  ['/icons-social/gmail.svg', 'public/icons-social/gmail.svg'],
  // Software icons
  ['/icons-software/github.svg', 'public/icons-software/github.svg'],
  ['/icons-software/postman.svg', 'public/icons-software/postman.svg'],
  // Framework icons
  ['/icons-framework/nextjs.svg', 'public/icons-framework/nextjs.svg'],
  ['/icons-framework/tailwindcss.svg', 'public/icons-framework/tailwindcss.svg'],
  ['/icons-framework/flutter.svg', 'public/icons-framework/flutter.svg'],
  ['/icons-framework/expressjs.svg', 'public/icons-framework/expressjs.svg'],
  // Language icons
  ['/icons-language/typescript.svg', 'public/icons-language/typescript.svg'],
  ['/icons-language/javascript.svg', 'public/icons-language/javascript.svg'],
  ['/icons-language/html5.svg', 'public/icons-language/html5.svg'],
  ['/icons-language/css.svg', 'public/icons-language/css.svg'],
  ['/icons-language/dart.svg', 'public/icons-language/dart.svg'],
  ['/icons-language/java.svg', 'public/icons-language/java.svg'],
  ['/icons-language/csharp.svg', 'public/icons-language/csharp.svg'],
  // Library icons
  ['/icons-library/react.svg', 'public/icons-library/react.svg'],
  ['/icons-library/shadcn-ui.svg', 'public/icons-library/shadcn-ui.svg'],
  ['/icons-library/nodejs.svg', 'public/icons-library/nodejs.svg'],
  ['/icons-library/tanstack.svg', 'public/icons-library/tanstack.svg'],
  ['/icons-library/jwt.svg', 'public/icons-library/jwt.svg'],
  // Database icons
  ['/icons-database/firebase.svg', 'public/icons-database/firebase.svg'],
  ['/icons-database/mongodb.svg', 'public/icons-database/mongodb.svg'],
  ['/icons-database/sql-server.svg', 'public/icons-database/sql-server.svg'],
  // Design icons
  ['/icons-design/figma.svg', 'public/icons-design/figma.svg'],
];

async function download(src, dest) {
  const fullDest = join(ROOT, dest);
  mkdirSync(dirname(fullDest), { recursive: true });
  const res = await fetch(BASE + src);
  if (!res.ok) { console.error(`  ✗ ${src} → ${res.status}`); return; }
  const buf = await res.arrayBuffer();
  const { writeFileSync } = await import('node:fs');
  writeFileSync(fullDest, Buffer.from(buf));
  console.log(`  ✓ ${dest}`);
}

// Batch downloads 4 at a time
console.log(`Downloading ${ASSETS.length} assets...`);
for (let i = 0; i < ASSETS.length; i += 4) {
  await Promise.all(ASSETS.slice(i, i + 4).map(([src, dest]) => download(src, dest)));
}
console.log('Done.');
