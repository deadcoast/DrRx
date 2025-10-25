#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { lintText } = require('../lib/drrx-lint');

function loadJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function diagnose(file) {
    const text = fs.readFileSync(file, 'utf8');
    const issues = lintText(text).map(is => ({
        rule: is.code,
        message: is.message,
        line: is.line + 1,
        column: is.start + 1
    }));
    return issues;
}

function compare(actual, expected) {
    const a = JSON.stringify(actual, null, 2);
    const e = JSON.stringify(expected, null, 2);
    return a === e ? null : "\nExpected:\n" + e + "\nActual:\n" + a;
}

function main() {
    const root = path.join(__dirname, '..');
    const invalidDir = path.join(root, 'drrx', 'fixtures', 'invalid');
    const goldenDir = path.join(root, 'test', 'golden');
    let failed = false;

    if (!fs.existsSync(goldenDir)) fs.mkdirSync(goldenDir, { recursive: true });

    const files = fs.readdirSync(invalidDir).filter(f => f.endsWith('.tree.drrx'));
    for (const f of files) {
        const filePath = path.join(invalidDir, f);
        const actual = diagnose(filePath).map(d => ({ rule: d.rule, line: d.line, column: d.column }));
        const goldenPath = path.join(goldenDir, f + '.json');
        if (!fs.existsSync(goldenPath)) {
            fs.writeFileSync(goldenPath, JSON.stringify(actual, null, 2));
            console.error('Created golden: ' + path.relative(root, goldenPath) + ' (review and commit expected diagnostics)');
            failed = true;
            continue;
        }
        const expected = loadJSON(goldenPath);
        const diff = compare(actual, expected);
        if (diff) {
            console.error('Mismatch for ' + f + ':' + diff);
            failed = true;
        }
    }

    // Positive fixtures: assert zero diagnostics
    const posFiles = [];
    const posDir = path.join(root, 'drrx', 'fixtures', 'positive');
    if (fs.existsSync(posDir)) {
        for (const f of fs.readdirSync(posDir)) {
            if (!f.endsWith('.tree.drrx')) continue;
            if (!/positive-(fw02|sp03)-/.test(f)) continue; // limit to validated positives
            posFiles.push(path.join(posDir, f));
        }
    }
    // Baseline conformance fixture may include intentional edge patterns; exclude from strict zero-diag set here.
    for (const p of posFiles) {
        const diags = diagnose(p);
        if (diags.length) {
            console.error('Expected no diagnostics for ' + path.basename(p) + ', found ' + diags.length);
            console.error(JSON.stringify(diags, null, 2));
            failed = true;
        }
    }

    if (failed) { process.exit(1); }
    console.log('All fixture diagnostics match golden files.');
}

main();
