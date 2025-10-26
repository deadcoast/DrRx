#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { tokenizeText } = require('../lib/drrx-lint');

const root = path.join(__dirname, '..');
const fixturesRoot = path.join(root, 'drrx', 'fixtures');
const goldenDir = path.join(root, 'test', 'token-golden');

const fixtureList = [
  { dir: 'positive', file: 'positive-combined-ok.tree.drrx' },
  { dir: 'positive', file: 'positive-quoted-annot-trailing-ok.tree.drrx' },
  { dir: 'invalid', file: 'invalid-missing-spacer.tree.drrx' },
  { dir: 'invalid', file: 'invalid-root-files-order.tree.drrx' },
  { dir: 'invalid', file: 'invalid-tabs.tree.drrx' }
];

function tokensForFixture(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  return tokenizeText(text);
}

function ensureGoldenDir() {
  if (!fs.existsSync(goldenDir)) fs.mkdirSync(goldenDir, { recursive: true });
}

function compareJSON(actual, expected) {
  const a = JSON.stringify(actual, null, 2);
  const e = JSON.stringify(expected, null, 2);
  return a === e ? null : '\nExpected:\n' + e + '\nActual:\n' + a;
}

function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function main() {
  ensureGoldenDir();
  let failed = false;

  for (const entry of fixtureList) {
    const filePath = path.join(fixturesRoot, entry.dir, entry.file);
    if (!fs.existsSync(filePath)) {
      console.error('Fixture missing: ' + path.relative(root, filePath));
      failed = true;
      continue;
    }
    const actual = tokensForFixture(filePath);
    const goldenPath = path.join(goldenDir, entry.file + '.json');
    if (!fs.existsSync(goldenPath)) {
      fs.writeFileSync(goldenPath, JSON.stringify(actual, null, 2));
      console.error('Created token golden: ' + path.relative(root, goldenPath) + ' (review and commit expected output).');
      failed = true;
      continue;
    }
    const expected = loadJSON(goldenPath);
    const diff = compareJSON(actual, expected);
    if (diff) {
      console.error('Token mismatch for ' + entry.file + ':' + diff);
      failed = true;
    }
  }

  if (failed) process.exit(1);
  console.log('All token fixtures match golden files.');
}

main();
