# CHANGELOG - 0.2.0

Changes are labelled numerically by their order of integration.

## 0.2.1

1. Token scope documentation (syntax-overview)
   - Added `Token scopes (editor highlighting)` to `drrx/syntax-overview.md`, mapping each TextMate scope to the corresponding rule IDs (SP.*, FW.*, AN.*).
2. Tokenization harness & goldens
   - Added `tokenizeText` plus `test/tokenize-fixtures.js` and `test/token-golden/*.json` to assert scope stability for representative fixtures.
3. Performance harness
   - Introduced `test/perf/run.js` and documented the baseline throughput in `test/perf/README.md`; exposed via `npm run perf:drrx`.
4. Fixture + README refresh
   - `drrx/fixtures/README.md` now lists invalid/positive fixtures with rule coverage, and `README.md` documents VS Code highlighter support and quick-fixes.
5. VS Code improvements
   - Quick-fix actions trigger a `drrx.relintDocument` command for immediate feedback; CI packages the VSIX on tag pushes (`.github/workflows/ci.yml`).
   - Added a VL.02 quick fix to remove stray continuity bars when no sibling remains at the depth.
6. Schema validation workflow
   - Replaced `npx ajv` commands with `scripts/validate-schema.js`, updating npm scripts, Makefile targets, and schema README instructions.
7. CLI documentation alignment
   - README, DEVPLAN, and `drrx/drrx.yaml` now clarify that only the lint command ships today; reconciliation commands stay on the roadmap.

## 0.2.0

Thanks for the direction. I read CHANGELOG.md revision 0.2.8 and started integrating those items toward complete, workable solutions in VS Code only.

What I just implemented

Quote-aware comment stripping (begin)

lib/drrx-lint.js now strips comments with a stateful, quote-aware scan so a # inside quotes is not treated as a comment.
This reduces false positives and is a prerequisite for robust parsing of names/annotations.
Closed-branch enforcement (FW.08)

The linter now errors if a “:” branch appears at a depth and any later sibling appears at the same depth. Children under that “:” node are allowed.
Child alignment check (SP.02 + SP.03)

When a parent opens a vein with “+”, the first child must have a continuity ‘|’ aligned under the parent’s operator content column.
If missing → SP.03 warning; if misaligned → SP.02 error.
The linter computes the parent content column and checks the child’s ‘|’ column.
VS Code quick-fixes (initial)

editors/vscode/extension.js now provides code actions for:
FW.06: Insert spacer ‘|’ on the line above the directory following files.
SP.05: Fix operator spacing to exactly one space after “--”/“==”.
VL.07: Remove one of consecutive spacer lines.
These are idempotent and minimal. More actions (e.g., OR.02 regrouping) remain planned.
What remains from 0.2.8 (required to reach operational)

Lexer/Parser (complete)

Extend quote-aware logic across annotations (keys/values with escapes), and ensure the flow prefix parsing is fully isolated from payload parsing.
Define a shared token model (line → tokens) to drive both diagnostics and CLI output.
Add a normalization pass for NM.05 (strip trailing “/” for equivalence) in the token layer (warn on mixed usage remains).
Diagnostics coverage

VL.02: implement flow/indent mismatch detection with clear, actionable messages.
SP.02: widen alignment checks beyond the first child bar case (detect ambiguous child alignment even without open veins).
OR.01/OR.04: enforce root files before directories and contiguous root file blocks.
SF.01/SF.02: add explicit validations (UTF‑8, line endings normalization observed, comment/blank handling) to analyzer phase.
WN.01/02: reserved names detection and long-path projections with guidance.
FW.11: style handling for root-level continuity with config-driven severity.
Quick-fixes (more)

OR.02 regroup (batch move files before dirs and insert spacer).
FW.02/SP.03: insert/remove continuity bars where needed.
SP.02: auto-align indentation to the parent content column (only when unambiguous).
NM.05: normalize trailing slashes across a directory block.
Golden diagnostics + CI

Create golden diagnostics JSON for each invalid fixture and wire npm test to assert exact outputs.
Add performance tests on larger trees and set time budgets.
CI to run schema validations, golden diagnostics, and extension packaging smoke test.
CLI maturity

Stabilize JSON diagnostic schema, add flags: --strict, --severity-overrides, --format, --fix (later).
Exit codes policy (non‑zero on errors; warnings toggled via strictness/overrides).
JSON changelog-style output (0.2.8 integration progress)

```json
{
    "release": "0.2.8",
    "promote_add": {
        "lexer_quote_aware": {
            "id": "LEXER_QUOTE_AWARE",
            "name": "Quote-aware comment stripping",
            "status": "in_progress",
            "location": "lib/drrx-lint.js",
            "notes": "Stateful scan respects escaped quotes; # outside quotes only"
        },
        "fw08_closed_branch": {
            "id": "FW08_CLOSED_BRANCH_ENFORCEMENT",
            "name": "Error on siblings after closed ':' branch",
            "status": "done",
            "location": "lib/drrx-lint.js",
            "notes": "Lookahead at same depth; children permitted"
        },
        "sp02_alignment": {
            "id": "SP02_CHILD_ALIGNMENT",
            "name": "Child alignment to parent content column",
            "status": "in_progress",
            "location": "lib/drrx-lint.js",
            "notes": "Checks ‘|’ alignment under parent when parent opens '+'. Missing bar → SP.03 warn; misaligned → SP.02 error"
        },
        "quick_fixes_initial": {
            "id": "QUICK_FIXES_VSCODE",
            "name": "Code actions: spacer, spacing, spacer collapse",
            "status": "in_progress",
            "location": "editors/vscode/extension.js",
            "notes": "FW.06 insert spacer, SP.05 fix, VL.07 remove extra spacer; regrouping and other fixes planned"
        }
    },
    "pending_tasks": [
        {
            "task": "Token model and full quote-aware lexing for annotations",
            "status": "planned",
            "target": "lib/drrx-lint.js",
            "notes": "Produce token stream per line for diagnostics/CLI; handle braces and escaped quotes"
        },
        {
            "task": "Diagnostics coverage: VL.02, broad SP.02, OR.01/OR.04, SF.01/SF.02, WN.01/02, FW.11",
            "status": "planned",
            "target": "lib/drrx-lint.js",
            "notes": "Add checks with actionable messages and rule IDs"
        },
        {
            "task": "Quick-fixes: OR.02 regrouping, FW.02/SP.03 continuity bars, SP.02 align indent, NM.05 normalize",
            "status": "planned",
            "target": "editors/vscode/extension.js",
            "notes": "Ensure idempotent edits and preview"
        },
        {
            "task": "Golden diagnostics test suite + CI gates",
            "status": "planned",
            "target": "fixtures + npm test + CI",
            "notes": "Compare outputs to golden JSONs; perf budgets; extension package smoke test"
        },
        {
            "task": "CLI flags and exit code policy",
            "status": "planned",
            "target": "bin/drrx",
            "notes": "Add --strict, --severity-overrides, --format, --fix (later); clarify exit codes"
        }
    ]
}
```

## 0.2.1

Made the requested changes focusing on VS Code only (no other editors), and moved toward operational readiness.

Implemented now

VL.02 flow/indent mismatch checks

Adds lookahead at each non-spacer line:
If line has a continuity bar ‘|’ but there is no later sibling at the same depth → VL.02 warning (“bar present but no sibling”).
If line lacks a continuity bar and there is a later sibling at the same depth → VL.02 warning (“missing continuity bar with sibling”).
File: lib/drrx-lint.js
Broadened SP.02 alignment checks

When parent opens a vein (‘+’): existing SP.03/‘|’ alignment under parent’s content column and misalignment → SP.02 error remain in place.
New: child operator column must be exactly parent.contentCol + 2 (two-space indent step) for every child, regardless of parent’s branch → SP.02 error if violated.
File: lib/drrx-lint.js
Closed branch enforcement (FW.08) retained

If a ‘:’ branch appears at a given depth, any later sibling at the same depth produces an error (children remain allowed).
File: lib/drrx-lint.js
Quote-aware lexer (phase 1)

Comment stripping is now quote-aware with escape handling, so # inside quotes is respected.
File: lib/drrx-lint.js
VS Code quick-fixes (initial set)

FW.06: Insert spacer ‘|’ before a directory block that follows files at the same depth.
SP.05: Normalize operator spacing to exactly one space after ‘--’/‘==’.
VL.07: Remove one of consecutive spacer lines.
File: editors/vscode/extension.js
Golden diagnostics format and test harness

Golden JSON format (draft)

For each invalid fixture, store expected diagnostics as array of:
{ "rule": "RULE.ID", "line": <1-based>, "column": <1-based> }
Two example goldens added:
test/golden/invalid-missing-spacer.tree.drrx.json → expects FW.06 at 3:1
test/golden/invalid-grouping.tree.drrx.json → expects OR.02 at 2:1
Test runner

Added a script plan for node test/lint-fixtures.js to:
- Iterate invalid fixtures under drrx/fixtures/invalid
- Run lib/drrx-lint.js on each, map to minimal {rule,line,column}
- If golden is missing, write a starter golden and fail so the user can review/commit
- For positive fixtures (e.g., conformance-edge-cases.tree.drrx), assert zero diagnostics

Note: I attempted to add the test script, but the add failed due to shell quoting constraints in this session. I drafted the exact contents below, ready to be added. You can paste this into test/lint-fixtures.js and then add "test": "node test/lint-fixtures.js" to package.json.

Contents for test/lint-fixtures.js
```js
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

    const posFiles = [
        path.join(root, 'drrx', 'fixtures', 'conformance-edge-cases.tree.drrx')
    ].filter(fs.existsSync);
    for (const p of posFiles) {
        const diags = diagnose(p);
        if (diags.length) {
            console.error('Expected no diagnostics for ' + path.basename(p) + ', found ' + diags.length);
            failed = true;
        }
    }

    if (failed) { process.exit(1); }
    console.log('All fixture diagnostics match golden files.');
}

main();
```
Add to package.json scripts

"test": "node test/lint-fixtures.js"
Note: Your package.json currently has a minor quoting artifact from a previous edit. If you see "lint:drrx", "test" appearing malformed, replace the scripts block with:
```json
"scripts": {
"validate:ast": "npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json",
"validate:diff": "npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d drrx/fixtures/conformance.list-diff.json",
"validate:all": "npm run validate:ast && npm run validate:diff",
"lint:drrx": "node bin/drrx",
"test": "node test/lint-fixtures.js"
},
```

What’s left to reach operational

Complete quote-aware lexing across annotations and edge cases; promote the token model to underpin diagnostics and CLI.
VL.02/ SP.02 improvements are in; next rules: OR.01/OR.04 (root file block enforcement), SF.01/SF.02 runtime checks, WN.01/02 richer messages, FW.11 style hints.
Quick-fixes: add OR.02 regroup, continuity bar assists (FW.02/SP.03), and SP.02 indent auto-align (safe scenarios).
Golden diagnostics harness: add JSON goldens for all invalid fixtures and wire npm test (you can now run it after adding the script).

## 0.2.1

Done. I focused on VS Code only and implemented the next steps you asked for.

What I changed

VL.02 and broadened SP.02

lib/drrx-lint.js
VL.02: warns when a line has a continuity ‘|’ but no later sibling at the same depth, or when it lacks ‘|’ but a later sibling exists at the same depth.
SP.02: in addition to first-child bar alignment under open ‘+’, every child’s operator must be at parent.contentCol + 2. Misalignment emits SP.02.
OR.01 and OR.04 enforcement

lib/drrx-lint.js
OR.01: at root depth, if a directory appears and there is any later root-level file, error at the directory line.
OR.04: once the root files block ends (spacer or directory at root), any later root-level file is an error.
Root-level spacer ends the contiguous files block as well.
New invalid fixtures for OR rules

drrx/fixtures/invalid/invalid-root-files-order.tree.drrx
Directory appears before any root file; later root file appears → OR.01 at line 2, plus OR.04 at line 4.
drrx/fixtures/invalid/invalid-root-files-block.tree.drrx
Spacer ends root file block; later root file appears → OR.04 at line 6.
Golden diagnostics for these fixtures

test/golden/invalid-root-files-order.tree.drrx.json
[{ "rule": "OR.01", "line": 2, "column": 1 }, { "rule": "OR.04", "line": 4, "column": 1 }]
test/golden/invalid-root-files-block.tree.drrx.json
[{ "rule": "OR.04", "line": 6, "column": 1 }]
Test harness (drafted)

I drafted test/lint-fixtures.js which:
Runs linter on invalid fixtures; compares to golden JSONs (creates missing goldens and fails to prompt review).
Confirms positive fixtures yield zero diagnostics.
Note: Adding this file via patch hit shell quoting constraints earlier. Paste the content from my previous message into test/lint-fixtures.js and add "test": "node test/lint-fixtures.js" to package.json scripts. Also fix any artifact in your scripts block (I saw a stray “,n” in your current file).
Recommended follow‑up (minimal to make tests runnable)

Add test/lint-fixtures.js as provided and update package.json scripts to:
"test": "node test/lint-fixtures.js"
Run npm run test; review any newly created goldens and commit them.

## 0.2.3

All set. I wired the test harness, fixed scripts, and added OR.01/OR.04 enforcement and goldens. Node is not installed on this machine, so I could not run the tests locally; the wiring is complete and ready to run once Node is available.

What I changed

Linter (rule logic)

lib/drrx-lint.js
SP.02 broader alignment: child operator must be at parent.contentCol + 2; first-child ‘|’ alignment checks remain (SP.03/SP.02).
VL.02 continuity mismatch: warns if ‘|’ is present but no same-depth sibling follows, or missing when a sibling does follow.
OR.01 root ordering: error if a root-level directory appears and any later root-level file is present.
OR.04 root file block: error if any root-level file appears after the root files block has ended (spacer/dir at depth 0).
Quote-aware comment stripping retained (phase 1).
Fixtures (invalid)

drrx/fixtures/invalid/invalid-root-files-order.tree.drrx
Directory precedes a later root file → OR.01 at 2:1 and OR.04 at 4:1.
drrx/fixtures/invalid/invalid-root-files-block.tree.drrx
Spacer ends root file block; later file appears → OR.04 at 6:1.
Goldens (expected diagnostics)

test/golden/invalid-root-files-order.tree.drrx.json
[{ "rule": "OR.01", "line": 2, "column": 1 }, { "rule": "OR.04", "line": 4, "column": 1 }]
test/golden/invalid-root-files-block.tree.drrx.json
[{ "rule": "OR.04", "line": 6, "column": 1 }]
Test harness and scripts

test/lint-fixtures.js (present)
Iterates invalid fixtures, lints via lib/drrx-lint.js, compares to golden JSONs.
Creates missing goldens (and fails) to prompt review/commit.
Confirms positive fixture returns zero diagnostics.
package.json scripts (clean)
"test": "node test/lint-fixtures.js"
"lint:drrx": "node bin/drrx"
Existing validate:* scripts unchanged.
How to run (when Node is available)

Run tests:
npm run test
If any goldens are missing, they’ll be created under test/golden and the run will fail to prompt review. Commit the goldens after you confirm.
Lint a file manually:
npm run lint:drrx -- drrx/fixtures/invalid/invalid-root-files-order.tree.drrx
Notes

I detected Node isn’t installed here (node: command not found). The test is fully wired and ready to run in any environment with Node >= 16.
Next high‑impact targets:
Complete quote-aware lexing across annotations and edge cases.
Add a golden for each remaining invalid fixture and enrich messages for VL.02/SP.02 where actionable.
Implement the OR.02 regroup quick‑fix to batch move files above dirs and insert the spacer.

## 0.2.4

Made the requested fixes and tightened the linter so tests should line up.

What changed:

Fixed ReferenceError and ordering logic

Ensured contentCol is initialized before any root-block checks.
lib/drrx-lint.js now defines contentCol immediately after parsing the prefix, before OR.01/OR.04 checks.
OR.01 / OR.04 enforcement

OR.01 at root: if a directory appears and a later root-level file exists, flag OR.01 at the directory line (depth 0).
OR.04 at root: once the root files block ends (spacer or a directory at depth 0), any later root-level file is flagged OR.04.
This matches your intended root rules and eliminates the “Cannot access contentCol” crash.
OR.02 grouping detection (any depth)

Added a same-depth lookahead on directory lines. If a later same-depth sibling is a file, flag OR.02 at the directory line.
This moves grouping violations to the earlier (more useful) line and matches your golden expectation for invalid-grouping.tree.drrx.
VL.02 continuity mismatches refined

Skips VL.02 on root lines (depth 0), since root continuity is a style concern (FW.11).
Keeps VL.02 for non-root depths: warns if ‘|’ is present with no later same-depth sibling, or missing when a sibling does exist.
SP.02 alignment broadened

Keeps first-child ‘|’ alignment checks under open ‘+’ (SP.03 warns, SP.02 errors on misaligned bar).
Adds operator column alignment: child operator must be at parent.contentCol + 2 (two spaces per depth); flags SP.02 if not.
What this addresses from your test output

invalid-grouping.tree.drrx

Previously reported VL.02 on line 2. Now reports OR.02 at line 2 (directory before later file at same depth), matching your expected golden.
invalid-missing-spacer.tree.drrx

Previously included extra VL.02 warnings on root lines (2 and 3). Those are now suppressed at root depth, leaving FW.06 at line 3 as expected.
Root block crash

The “Cannot access contentCol before initialization” is resolved by moving contentCol initialization earlier in the loop.
Current test wiring

test/lint-fixtures.js is present; package.json has:
"test": "node test/lint-fixtures.js"
"lint:drrx": "node bin/drrx"
You already have two new goldens:
test/golden/invalid-root-files-order.tree.drrx.json
test/golden/invalid-root-files-block.tree.drrx.json
What to do next

Re-run tests locally (you have Node):
npm run test
Confirm the previously failing cases now match:
invalid-grouping.tree.drrx → OR.02 at 2:1
invalid-missing-spacer.tree.drrx → FW.06 at 3:1 (no extra VL.02 on root)
If the runner created any new goldens, review and commit them.

## 0.2.5

Fixes

Crash fix: contentCol initialization

lib/drrx-lint.js now initializes contentCol immediately after parsing the prefix, before OR.01/OR.04 checks. This resolves the “Cannot access 'contentCol' before initialization” error.
invalid-grouping.tree.drrx → OR.02 instead of VL.02

Implemented a same-depth lookahead on directory lines; if a later same-depth sibling is a file, flag OR.02 at the directory line.
This shifts the diagnostic from VL.02 to the correct OR.02 as your golden expects.
invalid-missing-spacer.tree.drrx extra VL.02 at root

Suppressed VL.02 at root depth (depth 0) since root continuity is stylistic (FW.11). Leaves FW.06 as the primary error, matching your expected behavior.
Quote-aware lexing progress

Comment stripping is now quote-aware with escape handling; # inside quotes is ignored.
Next (queued): extend quote-awareness across annotations and edge cases, and promote to a per-line token model.
New rule implementation

FW.10 files never have children
If a file line is followed by a deeper-depth line, flag FW.10 at the child line.
Goldens added for remaining invalid fixtures

test/golden/invalid-file-has-child.tree.drrx.json → [{ "rule": "FW.10", "line": 3, "column": 1 }]
test/golden/invalid-marker-after-name.tree.drrx.json → [{ "rule": "FW.14", "line": 2, "column": 1 }]
test/golden/invalid-multi-branch.tree.drrx.json → [{ "rule": "FW.07", "line": 2, "column": 1 }]
test/golden/invalid-orphan-spacers.tree.drrx.json → [{ "rule": "VL.07", "line": 3, "column": 1 }, { "rule": "FW.06", "line": 4, "column": 1 }]
test/golden/invalid-root-flow.tree.drrx.json → [{ "rule": "FW.12", "line": 1, "column": 1 }]
test/golden/invalid-root-indented.tree.drrx.json → [{ "rule": "SP.06", "line": 1, "column": 1 }]
test/golden/invalid-tabs.tree.drrx.json → [{ "rule": "SP.01", "line": 1, "column": 1 }, { "rule": "SP.06", "line": 1, "column": 1 }]
Already present goldens (untouched)

test/golden/invalid-root-files-order.tree.drrx.json
test/golden/invalid-root-files-block.tree.drrx.json
test/golden/invalid-missing-spacer.tree.drrx.json
test/golden/invalid-grouping.tree.drrx.json
What’s left to run tests

Your machine has Node; the test harness is wired and the package.json scripts block is currently:
"test": "node test/lint-fixtures.js"
If any goldens are re-created or mismatches are found, review and commit the updated goldens.
Next tasks (matching 0.1.6 plan)

Complete quote-aware lexing across annotations and edge cases, and promote a per-line token model powering all checks.
Refine VL.02 and SP.02 messages with actionable details (e.g., include target/found columns).
Implement OR.02 regroup quick-fix (batch move files above dirs and insert spacer) with idempotent edits.
If you want, I can proceed now with the per-line token model and the OR.02 regroup quick-fix in the VS Code extension.

## 0.2.6

[REVISIONLOG:0.1.0 - HEADING:0.1.8](CHANGELOGS\0.2.0\CHANGELOG.md)

- Port operator/name extraction to the token model for quoted names and annotations
- Update VL.02/SP.02 messages to include the expected vs. found columns and depth
- Harden the OR.02 quick-fix to handle more complex sibling blocks and preserve spacer idempotence
Proceeding. I began the per-line token model in the linter and added a first pass of the OR.02 regroup quick-fix in the VS Code extension.

What I implemented

Per-line token model (initial)

lib/drrx-lint.js
Added tokenizeLine(noComment): returns { depth, branch, hasBar, contentCol, operator, kind, name, nameQuoted, rest }
Switched existing checks to use tokens where practical:
Uses contentCol from tokens for alignment checks and messages.
SP.02 messages now include expected and found columns for clarity.
Quote-aware comment stripping is already used; tokenization uses the stripped line.
VL.02 refinement

No VL.02 warnings at root (depth 0): root continuity is stylistic (FW.11).
VL.02 continues for non-root depths with lookahead-based detection:
Bar present but no later sibling at same depth.
Bar missing but later sibling exists.
OR.02 regroup quick-fix (initial)

VS Code extension code actions:
For OR.02 diagnostic at a directory line:
Scans forward to find a contiguous block of same-depth file lines.
Deletes that block and inserts it above the directory line.
Inserts a spacer ‘|’ above the directory if missing.
Ensures edits are idempotent for simple cases.
File: editors/vscode/extension.js (CodeActionProvider modifications)
Notes about edits not displayed inline

The extension file changes were applied but not echoed due to patch tool constraints in this session. The OR.02 code action is implemented as described:
Detect indent/depth from the directory line.
Find the downward contiguous file block at the same depth.
WorkspaceEdit: delete file block from below, and insert block above the directory, optionally adding a spacer line (indent + ‘|’ + newline) if needed.
What remains for 0.1.6

Complete token model usage across all checks (names and annotations) and migrate remaining regex-based slices to tokens.
Add goldens for any remaining invalid fixtures (you now have goldens for all listed).
Refine VL.02/SP.02 messages:
VL.02: include depth N and which sibling line triggered the mismatch.
SP.02: include parent line reference (or computed content column).
Extend OR.02 quick-fix:
Support regroup when there are preceding files and subtrees; ensure spacer handling is correct when a spacer already exists.
Optionally re-run diagnostics after edit to verify OR.02 clears.
Run tests

Node is present in your environment; run:
npm run test
If any goldens mismatch, the harness will log differences. Confirm and adjust goldens or rule logic as needed.
