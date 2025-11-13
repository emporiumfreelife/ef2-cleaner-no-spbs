// scripts/gen-types.js
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', 'src', 'lib', 'database.types.ts');
const tmpPath = outPath + '.tmp';

const projectId = 'fygquntvxuxmlnmtezvx'; // Your project ID
const schema = 'public';

const res = spawnSync('npx', [
  'supabase', 'gen', 'types', 'typescript',
  '--project-id', projectId, '--schema', schema
], { encoding: 'utf8' });

if (res.status !== 0) {
  console.error('supabase gen types failed:\n', res.stderr || res.stdout);
  process.exit(res.status || 1);
}

let out = res.stdout || '';

// Fix common HTML-escaped entities
out = out.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// Minimal sanity checks
if (!out.includes('export type') && !out.includes('export interface')) {
  console.error('Generated output looks invalid, aborting write.');
  process.exit(2);
}

// Ensure directory exists
fs.mkdirSync(path.dirname(outPath), { recursive: true });

// Write atomically
fs.writeFileSync(tmpPath, out, 'utf8');
fs.renameSync(tmpPath, outPath);

console.log('Generated types written to', outPath);
