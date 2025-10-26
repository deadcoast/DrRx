# Directory Remedy – Fixtures

This directory holds the fixture corpus used by `test/lint-fixtures.js` and `test/tokenize-fixtures.js`. Invalid fixtures should surface the listed rule IDs (see matching JSON in `test/golden/`). Positive fixtures must lint cleanly and serve as living documentation for supported syntax.

## Invalid fixtures (diagnostics expected)

| File | Rule(s) | Focus |
| --- | --- | --- |
| conformance-edge-cases.tree.drrx | FW.02 | Missing continuity bar case used to validate quick-fix coverage for edge flow scenarios. |
| invalid-file-has-child.tree.drrx | FW.10 | Demonstrates that files cannot own children at deeper indentation levels. |
| invalid-fw02-missing-continuity.tree.drrx | SP.03, FW.02 | Exercises missing first-child bar and follow-on continuity bar warnings. |
| invalid-grouping.tree.drrx | OR.02 | Directories after files without regrouping/spacer. |
| invalid-marker-after-name.tree.drrx | FW.14 | Flow marker appended after the operator/name payload. |
| invalid-missing-spacer.tree.drrx | FW.06 | File→directory boundary without the required spacer `|` line. |
| invalid-multi-branch.tree.drrx | FW.07 | Multiple branch markers on a single line. |
| invalid-orphan-spacers.tree.drrx | VL.07, FW.06 | Consecutive spacers and a spacer placed before a file sibling. |
| invalid-root-files-block.tree.drrx | OR.04 | Root file block split by intervening entries. |
| invalid-root-files-order.tree.drrx | OR.01, OR.04 | Root directories appearing before files and breaking the contiguous file block. |
| invalid-root-flow.tree.drrx | FW.12 | Flow markers present on the root line. |
| invalid-root-indented.tree.drrx | SP.06 | Root `.` indented away from column 1. |
| invalid-sp03-missing-first-child.tree.drrx | SP.03, FW.02 | Parent uses `+` but the first child omits or misplaces the continuity bar. |
| invalid-tabs.tree.drrx | SP.01, SP.06 | Tabs in indentation and non-zero root column. |

## Positive fixtures (conformance)

| File | Focus |
| --- | --- |
| conformance.tree.drrx | Baseline structure: root file block, spacers, nested directories with balanced `+`/`:` usage. |
| positive-combined-ok.tree.drrx | Root files plus nested directories, showcasing inline vs spacer continuity. |
| positive-deep-mixed-ok.tree.drrx | Deeply nested veins with alternating `+`/`:` branches and spacer placement. |
| positive-fw02-continuity-ok.tree.drrx | Continuity-heavy tree that exercises `|` alignment across multiple depths. |
| positive-quoted-annot-trailing-ok.tree.drrx | Quoted names, annotations, and directory trailing slashes in combination. |
| positive-root-mixed-with-spacers-ok.tree.drrx | Mixed root files/directories with spacer demarcations. |
| positive-sp03-first-child-ok.tree.drrx | Explicit validation for first-child bars under open veins. |

> Tip: when adding fixtures, update the corresponding `test/golden/*.json` (diagnostics) and `test/token-golden/*.json` (token scopes) via `npm test` so CI keeps the expectations synchronized.
