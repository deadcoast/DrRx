#!/usr/bin/env node
'use strict';

const path = require('path');
const { lintText } = require(path.join(__dirname, '..', '..', 'lib', 'drrx-lint'));

const DEFAULT_LINES = 50000;

function parseArgs(argv) {
  const opts = { lines: DEFAULT_LINES };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--lines=')) {
      const value = Number(arg.slice('--lines='.length));
      if (!Number.isNaN(value) && value > 0) opts.lines = Math.floor(value);
    } else if (arg === '--lines') {
      const next = Number(argv[i + 1]);
      if (!Number.isNaN(next) && next > 0) {
        opts.lines = Math.floor(next);
        i++;
      }
    }
  }
  return opts;
}

function leftPad(num, width) {
  const s = String(num);
  return s.length >= width ? s : '0'.repeat(width - s.length) + s;
}

function buildSyntheticTree(targetLines) {
  const lines = [];
  lines.push('.');
  lines.push('+== README-0000.md');
  lines.push('| :== LICENSE-0000.md');
  lines.push('|');

  const blocksNeeded = Math.max(1, Math.ceil((targetLines - 3) / 10));

  for (let i = 0; i < blocksNeeded; i++) {
    const pad = leftPad(i, 5);
    const isLast = i === blocksNeeded - 1;
    const prefix = isLast ? ':' : '+';
    lines.push(`${prefix} -- bundle-${pad}/`);
    lines.push(`  |+== bundle-${pad}-file-a.txt`);
    lines.push(`    :== bundle-${pad}-file-b.txt`);
    lines.push(`  | +-- bundle-${pad}-lib/`);
    lines.push(`  | |+== bundle-${pad}-lib-util.js`);
    lines.push(`  |   :== bundle-${pad}-lib-core.js`);
    lines.push(`  | :-- bundle-${pad}-tests/`);
    lines.push(`      |+== bundle-${pad}-tests-a.spec`);
    lines.push(`      :== bundle-${pad}-tests-b.spec`);
    if (!isLast) lines.push('|');
  }

  return { text: lines.join('\n'), blocks: blocksNeeded };
}

function formatNumber(num, fraction = 2) {
  return num.toFixed(fraction);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const { text: synthetic, blocks } = buildSyntheticTree(opts.lines);
  const lineCount = synthetic.split(/\r?\n/).length;

  const start = process.hrtime.bigint();
  const diagnostics = lintText(synthetic);
  const durationNs = process.hrtime.bigint() - start;

  const durationMs = Number(durationNs) / 1e6;
  const linesPerSecond = (lineCount * 1e9) / Number(durationNs || 1n);

  console.log('[drrx-perf] targetLines=%d actualLines=%d blocks=%d', opts.lines, lineCount, blocks);
  console.log('[drrx-perf] elapsed=%sms throughput=%s lines/sec', formatNumber(durationMs), formatNumber(linesPerSecond, 0));
  console.log('[drrx-perf] diagnostics=%d', diagnostics.length);

  if (diagnostics.length) {
    console.error('[drrx-perf] unexpected diagnostics detected.');
    process.exit(1);
  }
}

main();
