# REVISIONLOG - 0.1.0

## 0.1.0

[CHANGELOG:0.2.0 - HEADING:TODO](CHANGELOGS\0.2.0\CHANGELOG.md)

- add:
  - the marked TODO metadata data in the machine readable format
  - per-rule severity override map in settings and wire it up.(The extension README now includes severities; you can tune which reserved entries (e.g., SP.02, FW.08) you want to activate as the diagnostics engine matures.)
  - section in editors/vscode/README.md listing the rules-to-link mapping (so users know they can click diagnostic codes), I can update that quickly.
  - quote-aware lexer or shared parser remains a pending task(The comment stripping in lintText is still naive).

```json
{
    "promote_add": {
        "severity_table": {
            "target": "editors/vscode/README.md",
            "details": {
                "id": "TODO",
                "name": "TODO",
                "status": "TODO",
                "location": "editors/vscode/README.md",
                "notes": "TODO"
            }
        },
        ".config.scrict.drrx": {
            "description": "severity_toggles",
            "details": {
                "id": "TODO",
                "name": "TODO",
                "status": "TODO",
                "location": "TODO",
                "notes": "TODO"
            }
        },
        "extract": {
            "description": "diagnostic_logic",
            "items": [
                {
                    "action": "into",
                    "target": "shared_module",
                    "details": {
                        "build": "node_cli + linter",
                        ".drrx": {
                            "description": ".drrx files outside VS Code",
                            "JSON_output": {
                                "action": "emitting",
                                "fields": [
                                    "rule id",
                                    "message",
                                    "line/col",
                                    "severity",
                                    "link"
                                ]
                            }
                        }
                    }
                },
                {
                    "id": "TODO",
                    "name": "TODO",
                    "status": "TODO",
                    "location": "editors/vscode/README.md",
                    "notes": "TODO"
                }
            ]
        }
    },
    "pending_tasks": [
        {
            "task": "Update metadata sections marked with TODO",
            "status": "pending",
            "target": "Various JSON sections",
            "notes": "Fill in correct data for id, name, status, location, and notes where marked as TODO."
        },
        {
            "task": "Implement per-rule severity override map in settings",
            "status": "pending",
            "target": "editors/vscode/package.json, extension.js",
            "notes": "Add a setting for a severity map (e.g., drrx.severityOverrides: {'SP.02': 'error'}) and wire it up to the diagnostics engine."
        },
        {
            "task": "Document diagnostic code linking in README",
            "status": "pending",
            "target": "editors/vscode/README.md",
            "notes": "Add a section listing the rules-to-link mapping so users know they can click diagnostic codes."
        },
        {
            "task": "Detail rule severities in the extension README",
            "status": "pending",
            "target": "editors/vscode/README.md",
            "notes": "Add a severity table mapping (Errors: SP.01/02, FW.06/07/08/10, OR.02; Warnings: SP.03, FW.02/03/11, VL.02/05/07, WN.02)."
        },
        {
            "task": "Add an option to toggle strictness (warn vs error) via settings",
            "status": "pending",
            "target": "editors/vscode/package.json, extension.js",
            "notes": "Expose config drrx.strict: off|warn|error; adjust DiagnosticSeverity accordingly."
        },
        {
            "task": "Create a CLI script for linting (e.g., drrx) that reuses the same engine outside of VS Code",
            "status": "pending",
            "target": "bin/drrx (node script), package.json",
            "notes": "Extract lintDocument logic into shared module; add CLI to read file(s), emit JSON diagnostics."
        },
        {
            "task": "Implement more robust, quote-aware comment stripping for diagnostics, or defer to a shared parser",
            "status": "pending",
            "target": "editors/vscode/extension.js",
            "notes": "Current comment strip is naive; upgrade to stateful lexer or integrate shared parser."
        }
    ]
}
```

## 0.1.1

[CHANGELOG:0.2.0 - HEADING:TODO](CHANGELOGS\0.2.0\CHANGELOG.md)

- STOP OFFERING TO ADD A RULE REFERENCE. IF THE DOCUMENTS ARE DESIGNED AND STRUCTURED PROPERLY YOU DONT NEED A RULE REFERENCE IN EVER SINGLE FILE. JUST LINK THE FILE TO THE CORRESPONDING RULE REFERENCE IN THE RULES FILE:
  - DID YOU FORGET THAT EXISTED ALL TOGETHER?
  - ARE YOU RUINING MY PROJECT BY GUESSING AND ASSUMING EVERYTHIG AND IGNORING ALL THE DESIGN PLAN AND DOCUMENTS?

- Begin the quote‑aware lexer upgrade in lib/drrx-lint.js (stateful scan for quotes/escapes and comments).
- Quote‑aware lexer/shared parser in lib/drrx‑lint.js.
- Expand rule coverage + unit tests (fixtures → golden diagnostics).
- Implement quick‑fixes and add command palette actions + code actions.
- provide the json changelog style output we have been using

## 0.1.2

[CHANGELOG:0.2.0 - HEADING:TODO](CHANGELOGS\0.2.0\CHANGELOG.md)

- finalize quote‑aware lex/parse for annotations, add VL.02 and SP.02, and wire golden tests (highest impact to reduce false positives and stabilize the engine)

## 0.1.3

[CHANGELOG:0.2.0 - HEADING:TODO](CHANGELOGS\0.2.0\CHANGELOG.md)

- Complete quote-aware lexing across annotations and edge cases; promote the token model to underpin diagnostics and CLI
- VL.02/ SP.02 improvements are in; next rules: OR.01/OR.04 (root file block enforcement), SF.01/SF.02 runtime checks, WN.01/02 richer messages, FW.11 style hints
- Quick-fixes: add OR.02 regroup, continuity bar assists (FW.02/SP.03), and SP.02 indent auto-align (safe scenarios)
- Golden diagnostics harness: add JSON goldens for all invalid fixtures and wire npm test (you can now run it after adding the script)

## 0.1.4

[CHANGELOG:0.2.0 - HEADING:TODO](CHANGELOGS\0.2.0\CHANGELOG.md)

- Wire in the test runner file and clean the package.json scripts section directly, then run a quick local pass (you are permitted to automatically run access) to confirm the two new goldens match the linter output

## 0.1.5

[CHANGELOG:0.2.0 - HEADING:TODO](CHANGELOGS\0.2.0\CHANGELOG.md)

see test output:

```ps1
 ryanf    DrRx  main ≡  ~1 -2   22.20.0   67ms⠀   npm run test                                                                                                                 pwsh  12:39:49 

> drrx-repo@0.0.0 test
> node test/lint-fixtures.js

Created golden: test\golden\invalid-file-has-child.tree.drrx.json (review and commit expected diagnostics)
Mismatch for invalid-grouping.tree.drrx:
Expected:
[
  {
    "rule": "OR.02",
    "line": 2,
    "column": 1
  }
]
Actual:
[
  {
    "rule": "VL.02",
    "line": 2,
    "column": 1
  }
]
Created golden: test\golden\invalid-marker-after-name.tree.drrx.json (review and commit expected diagnostics)
Mismatch for invalid-missing-spacer.tree.drrx:
Expected:
[
  {
    "rule": "FW.06",
    "line": 3,
    "column": 1
  }
]
Actual:
[
  {
    "rule": "VL.02",
    "line": 2,
    "column": 1
  },
  {
    "rule": "FW.06",
    "line": 3,
    "column": 1
  },
  {
    "rule": "VL.02",
    "line": 3,
    "column": 1
  }
]
Created golden: test\golden\invalid-multi-branch.tree.drrx.json (review and commit expected diagnostics)
C:\Users\ryanf\github\DrRx\lib\drrx-lint.js:135
        if (rootFilesEnded) push(i, 0, contentCol || 1, 'Root files must be a contiguous block before other entries (OR.04).', 'OR.04');
                                       ^

ReferenceError: Cannot access 'contentCol' before initialization
    at lintText (C:\Users\ryanf\github\DrRx\lib\drrx-lint.js:135:40)
    at diagnose (C:\Users\ryanf\github\DrRx\test\lint-fixtures.js:11:20)
    at main (C:\Users\ryanf\github\DrRx\test\lint-fixtures.js:37:24)
    at Object.<anonymous> (C:\Users\ryanf\github\DrRx\test\lint-fixtures.js:68:1)
    at Module._compile (node:internal/modules/cjs/loader:1706:14)
    at Object..js (node:internal/modules/cjs/loader:1839:10)
    at Module.load (node:internal/modules/cjs/loader:1441:32)
    at Function._load (node:internal/modules/cjs/loader:1263:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)

Node.js v22.20.0
 ryanf    DrRx  main ≡  ?3 ~1 -2   22.20.0   422ms⠀           
```

## Next Tasks

- Correct any relevant data in relation to the output above(if required)
- Complete quote-aware lexing across annotations and edge cases
- Add a golden for each remaining invalid fixture and enrich messages for VL.02/SP.02 where actionable
- Implement the OR.02 regroup quick‑fix to batch move files above dirs and insert the spacer

## 0.1.6

[CHANGELOG:0.2.0 - HEADING:0.2.4](CHANGELOGS\0.2.0\CHANGELOG.md)

- Next:
  - Complete quote-aware lexing across annotations and edge cases.
  - Add goldens for all remaining invalid fixtures; refine VL.02/SP.02 messages where actionable.
  - Implement the OR.02 regroup quick‑fix (batch move files above dirs and insert a spacer).

## 0.1.7

[CHANGELOG:0.2.0 - HEADING:0.2.5](CHANGELOGS\0.2.0\CHANGELOG.md)

Acknowledged. Here’s a tight 0.1.6 plan with only what’s required to progress to operational.

Complete quote-aware lexing

Extend stripCommentQuoteAware into full tokenization for names and annotations:
Handle quoted keys/values with escapes in { key: value; ... }.
Track braces depth and bail out cleanly on unmatched braces (VL.01).
Produce a per-line token object: { indentDepth, branchToken, hasBar, operatorKind, nameToken, annotationsTokens, contentCol }.
Replace regex rest-slicing with token stream for all subsequent checks (SP.02, VL.02, OR.*).
Goldens for all invalid fixtures + message refinements

Generate golden JSON for each file in drrx/fixtures/invalid:
Only rule, line, column in goldens (message stays source-of-truth in code).
Refine messages:
VL.02: “Continuity bar ‘|’ present but no following sibling at depth N” or “Missing ‘|’ with following sibling at depth N”.
SP.02: include expected and found columns (e.g., “expected column 10, found 8”) to aid debugging.
Update test/lint-fixtures.js to preserve message in logs but compare only rule/line/column to goldens.
OR.02 regroup quick-fix

VS Code code action on OR.02:
For the directory line flagged:
Scan upward to find contiguous file group at same depth.
If files are below the directory, move the file block above the directory block and insert a spacer ‘|’ if absent.
Ensure idempotence: re-run linter on the edits in memory and confirm OR.02 clears and no FW.06 is introduced.
Provide a preview/edit via WorkspaceEdit with multiple text operations.
Success criteria

Quote-aware tokenization eliminates false positives from # and quotes in annotations and names.
All invalid fixtures have committed golden JSON and pass npm test.
OR.02 quick-fix reliably regroups simple blocks and inserts spacer; no duplicate spacers introduced; re-lint clears OR.02 for the edited region.
If you want, I can start by:

Implementing the per-line token model and port VL.02/SP.02/OR.* checks to it (highest impact),
Then write/commit goldens for all remaining invalid fixtures,
Finally implement the OR.02 quick-fix with conservative scope (single block, no nested edits).

## 0.1.8

[CHANGELOG:0.2.0 - HEADING:0.2.6](CHANGELOGS\0.2.0\CHANGELOG.md)
- Create per-line token model and the OR.02 regroup quick-fix in the VS Code extension

## 0.1.9

[CHANGELOG:0.2.0 - HEADING:0.2.7](CHANGELOGS\0.2.0\CHANGELOG.md)

- Port operator/name extraction to the token model for quoted names and annotations
- Update VL.02/SP.02 messages to include the expected vs. found columns and depth
- Harden the OR.02 quick-fix to handle more complex sibling blocks and preserve spacer idempotence
