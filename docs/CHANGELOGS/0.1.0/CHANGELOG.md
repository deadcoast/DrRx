# CHANGELOG - 0.1.0

## 0.1.0

“| :-- features/” is the right continuity marker since it’s the last sibling at that depth; children under features are still allowed. I also aligned the formal semantics so “+”/“:” control sibling continuity at a depth (not whether children exist).

What I added

Second conformance fixture (.drrx)

drrx/fixtures/conformance-edge-cases.tree.drrx
Covers:
Quoted names and escapes: "Read Me.txt", "note "draft".txt"
Reserved Windows name case: "NUL.txt" (expected WN.01 diagnostic)
Spacer edge cases: orphan spacer, consecutive spacers, missing spacer before a directory (FW.06)
Group-order violations: directory before files in a block (OR.02)
Continuity rule use: closing siblings with “:” while still allowing children
Makefile targets for validations

Makefile
validate-ast: validates the AST example against ast.schema.json
validate-diff: validates conformance.list-diff.json against list-diff.schema.json (and annotations schema)
validate-all: runs both
Seed list --diff JSON fixture

drrx/fixtures/conformance.list-diff.json
Matches drrx/list-diff.schema.json and exercises create/change/delete cases
TODO: Syntax Highlighting scope plan (VS Code focus)

TODO.md
Complete tasklist for:
Token scopes, tmLanguage (VS Code), diagnostics engine mapping rules to IDs
Fixtures/golden tests, performance baselines
Quick-fixes (insert spacer, regroup files/dirs, adjust continuity bars)
CI integration, documentation sync
Additional operational rules and wording fixes

drrx/rules.md
FW.04 now: “:” closes sibling continuity at depth (children allowed)
FW.08 now: no further siblings at the same depth after a “:” branch; children permitted
SP.05: exactly one space between operator and name (MUST)
SP.06: no indentation on root “.” (MUST)
FW.12: no flow markers on root line (MUST)
FW.13: file “+”/“:” control siblings; files never have children (MUST)
FW.14: flow markers only in prefix or standalone “|” (MUST)
FW.15: spacer lines cannot carry annotations (MUST)
VL.07: warn on consecutive spacer lines
NM.05: trailing slash equivalence (warn on mixed usage; formatters may normalize)
Schema and overview alignment

drrx/ast.schema.json: flow flag descriptions updated:
open: “open vein; first child places ‘|’”
close: “close sibling continuity at this depth”
drrx/syntax-overview.md:
“:” semantics updated in dictionary and §3; minimal example comments updated
WN.02 reference added to path-length bullet
Grammar already supports flow_spacer and checks
Conformance fixtures now available

Baseline: drrx/fixtures/conformance.tree.drrx
Edge cases: drrx/fixtures/conformance-edge-cases.tree.drrx
Seed diff: drrx/fixtures/conformance.list-diff.json
Local validation

make validate-ast
make validate-diff
make validate-all
Or run the underlying AJV commands:
npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json
npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d drrx/fixtures/conformance.list-diff.json

## 0.1.1

Fixed the README example: “| +-- features/” → “| :-- features/” because “:” closes sibling continuity at that depth while still allowing children.

What I added

Negative fixtures set (for diagnostics engine)

drrx/fixtures/invalid/invalid-missing-spacer.tree.drrx — FW.06 error
drrx/fixtures/invalid/invalid-grouping.tree.drrx — OR.02 error
drrx/fixtures/invalid/invalid-multi-branch.tree.drrx — FW.07 error
drrx/fixtures/invalid/invalid-tabs.tree.drrx — SP.01 error (tab), and root rule (SP.06)
drrx/fixtures/invalid/invalid-marker-after-name.tree.drrx — FW.14 error (marker after name)
drrx/fixtures/invalid/invalid-root-flow.tree.drrx — FW.12 error (flow on root)
drrx/fixtures/invalid/invalid-root-indented.tree.drrx — SP.06 error (root not at column 1)
drrx/fixtures/invalid/invalid-file-has-child.tree.drrx — FW.10 error (file with child)
drrx/fixtures/invalid/invalid-orphan-spacers.tree.drrx — VL.07 warning (consecutive spacer), FW.06 error (spacer before a file block)
These are designed for the diagnostics engine to exercise each rule with a clear expected rule ID noted in comments.
Edge-case positive fixture

drrx/fixtures/conformance-edge-cases.tree.drrx
Quoted names and escapes, spacer edge cases (with inline EXPECTED comments), grouping violations region, missing spacer cases, reserved name case (WN.01). This broadens coverage for both parser and UDL diagnostics.
Makefile validation targets

Makefile
validate-ast: npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json
validate-diff: npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d drrx/fixtures/conformance.list-diff.json
validate-all: runs both
TODO scope for Syntax Highlighting (complete plan)

TODO.md now includes a full, structured scope:
Token and scope mapping, TextMate grammar work, diagnostics engine (rule-to-diagnostic mappings), quick-fixes, fixtures/golden tests, perf baselines, CI gating, doc sync.
Acceptance milestones M1–M4.
Specific quick-fixes to implement (insert spacer FW.06, regroup OR.02, fix operator spacing SP.05, etc.).
Rules and docs alignment (operational changes)

README example fixed per your note.
Rules and overview semantics updated so “:” closes sibling continuity, not children.
drrx/rules.md
FW.04 “Use ‘:’ when no more siblings follow” (children allowed)
FW.08 “Closed branch correctness” (no later siblings at the same depth after a ‘:’ branch)
New implementation-critical rules:
SP.05: single space after operator (MUST)
SP.06: no indentation on root (MUST)
FW.12: no flow markers on root (MUST)
FW.13: on files, “+”/“:” control siblings only; files never have children (MUST)
FW.14: “| + :” limited to prefix or standalone spacer (MUST)
FW.15: spacer lines cannot carry annotations (MUST)
VL.07: warn on consecutive spacer lines (SHOULD)
NM.05: trailing slash equivalence (SHOULD)
drrx/syntax-overview.md
Dictionary and §3 updated with the corrected “:” semantics.
Minimal example comments updated (“no further siblings at this depth”).
Path-length bullet now links to [WN.02].
Full-scope plan started

The Syntax Highlighting scope in TODO.md is now comprehensive, with:
Grammar tokenization and scopes
Diagnostics engine plan with exact rule severities (errors vs warnings) and quick-fix templates
Cross-editor support outline
Fixtures and golden tests strategy
CI and release steps
Documentation synchronization requirements with concrete file references

## 0.1.2

Implemented the VS Code starter grammar and expanded fixtures, plus added project scripts to streamline validation.

What I added

VS Code extension scaffolding

editors/vscode/syntaxes/drrx.tmLanguage.json
Highlights: flow prefix tokens +/ :/ |, standalone spacer | lines, operators -- and ==, quoted/unquoted names, annotations block { ... }, and flags invalid spacing after operators (starter check).
editors/vscode/language-configuration.json
Defines line comments (#) and auto-closing pairs for quotes/braces.
editors/vscode/package.json
Contributes DrRx language (.drrx, .tree.drrx), registers grammar, config. Activation on onLanguage:drrx (and room to expand with a lint command).
editors/vscode/extension.js
Minimal activation + placeholder diagnostics collection and lint command (drrx.lint) to hook future rule-based diagnostics.
Root npm scripts (no installs required)

package.json
validate:ast, validate:diff, validate:all use npx ajv for schema checks.
lint:drrx placeholder script to be replaced by diagnostics engine.
Negative diagnostics fixtures (to seed highlighter/engine tests)

drrx/fixtures/invalid/invalid-missing-spacer.tree.drrx — FW.06
drrx/fixtures/invalid/invalid-grouping.tree.drrx — OR.02
drrx/fixtures/invalid/invalid-multi-branch.tree.drrx — FW.07
drrx/fixtures/invalid/invalid-tabs.tree.drrx — SP.01 (and SP.06)
drrx/fixtures/invalid/invalid-marker-after-name.tree.drrx — FW.14
drrx/fixtures/invalid/invalid-root-flow.tree.drrx — FW.12
drrx/fixtures/invalid/invalid-root-indented.tree.drrx — SP.06
drrx/fixtures/invalid/invalid-file-has-child.tree.drrx — FW.10
drrx/fixtures/invalid/invalid-orphan-spacers.tree.drrx — VL.07 and FW.06
Edge-case conformance fixture

drrx/fixtures/conformance-edge-cases.tree.drrx
Quoted names + escapes, spacer anomalies, grouping violations section (useful for a “quick-fix” test), reserved-name scenario (WN.01).
Fixtures overview

drrx/fixtures/README.md (short working-scope note on conformance vs. diagnostics sets; invalid fixtures include inline comments with rule IDs).
README example fix

README.md uses “| :-- features/” to close sibling continuity while allowing children under features. Acknowledged this logic and aligned rules/overview language.
Rule and schema alignment (operational)

Rules
FW.04: “:” closes sibling continuity at depth; children allowed.
FW.08: no later siblings permitted at same depth after a “:” branch (children okay).
SP.05: exactly one space after operator (MUST).
SP.06: root has no indentation (MUST).
FW.12: no flow markers on root line (MUST).
FW.13: file “+”/“:” control siblings only; files never have children (MUST).
FW.14: flow markers limited to prefix or standalone spacer (MUST).
FW.15: spacer lines do not carry annotations (MUST).
NM.05: trailing slash equivalence for directories (warn on mixed use).
VL.07: warn on consecutive spacer lines.
Overview and AST schema
drrx/syntax-overview.md updated for “:” semantics in dictionary and §3.
drrx/ast.schema.json flow.close description updated to “close sibling continuity”.
How to validate locally

Validate AST example:
npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json
Validate list --diff:
npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d drrx/fixtures/conformance.list-diff.json
Or using npm scripts:
npm run validate:ast
npm run validate:diff
npm run validate:all
Syntax Highlighter scope (started)

TODO.md now contains a complete plan:
Token scopes, tmLanguage, diagnostics engine mapping rule IDs (errors vs warnings), quick-fixes (insert spacer FW.06, regroup OR.02, fix spacing SP.05, etc.), fixtures/golden tests, perf gate, CI gating, docs sync (VS Code focus only).
Notes

I kept the VS Code extension minimal to avoid churn; it’s ready to be extended with a diagnostics engine. The command drrx.lint is registered but currently a placeholder.

## 0.1.3

Added the VS Code starter grammar and extension scaffolding, expanded fixtures with a negative set, and wired initial diagnostics + packaging.

What’s in place

VS Code extension (starter)

editors/vscode/syntaxes/drrx.tmLanguage.json
Highlights flow prefix tokens (+, :, |), standalone spacer | lines, operators (--, ==), quoted/unquoted names, annotations, and flags invalid extra spacing after operators.
editors/vscode/language-configuration.json
Line comments (#) and auto-closing pairs configured.
editors/vscode/package.json
Contributes the DrRx language (.drrx, .tree.drrx), grammar, config; activation on onLanguage:drrx and command drrx.lint.
Packaging script with vsce devDependency; run from editors/vscode with npm run package.
editors/vscode/extension.js
Diagnostics engine skeleton:
Listens to open/change/save and a drrx.lint command.
Fast pass for key rules with line-based checks:
SP.01: tabs disallowed (error)
SP.06: root must be at column 1 (error)
FW.12: no flow markers on root line (error)
FW.07: only one branch marker per prefix line (error)
FW.06: missing spacer before a directory after files at the same depth (error)
OR.02: files must precede directories within a block (error)
FW.14: markers only allowed in prefix or as standalone spacer (error)
Stores diagnostics with rule code (e.g., FW.06) for linkable mapping to rules.md in future iterations.
Root npm scripts (for repo)

package.json
validate:ast, validate:diff, validate:all via npx ajv.
lint:drrx placeholder script (ready to point at a CLI for diagnostics).
Fixtures (updated and expanded)

Positive
drrx/fixtures/conformance-edge-cases.tree.drrx (broader coverage)
Negative (diagnostics)
drrx/fixtures/invalid/invalid-missing-spacer.tree.drrx (FW.06)
drrx/fixtures/invalid/invalid-grouping.tree.drrx (OR.02)
drrx/fixtures/invalid/invalid-multi-branch.tree.drrx (FW.07)
drrx/fixtures/invalid/invalid-tabs.tree.drrx (SP.01, SP.06)
drrx/fixtures/invalid/invalid-marker-after-name.tree.drrx (FW.14)
drrx/fixtures/invalid/invalid-root-flow.tree.drrx (FW.12)
drrx/fixtures/invalid/invalid-root-indented.tree.drrx (SP.06)
drrx/fixtures/invalid/invalid-file-has-child.tree.drrx (FW.10)
drrx/fixtures/invalid/invalid-orphan-spacers.tree.drrx (VL.07, FW.06)
Fixtures README with a table mapping invalid files to expected rule IDs and rationale:
drrx/fixtures/README.md
README fix (acknowledged)

Corrected “| +-- features/” to “| :-- features/” in README.md and aligned rule semantics.
How to package and test the extension

Packaging (from editors/vscode):
npm install
npm run package (produces a .vsix; requires vsce which is included as a devDependency)
Run in dev:
Open repo in VS Code, F5 to launch Extension Development Host
Use Command Palette “Dr.Rx: Lint Current Document” or let the on-change events run
Validation commands

AST example:
npm run validate:ast
list --diff JSON:
npm run validate:diff
All:
npm run validate:all

## 0.1.4

> machine-readable revision plan for:
>> the diagnostics engine
>> including what I’ve already implemented and what’s next
```json
{
    "diagnostics_engine": {
        "promote_add": {
            "rule_checks": [
                {
                    "id": "SP.05",
                    "name": "single-space after operator",
                    "status": "implemented",
                    "location": "editors/vscode/extension.js",
                    "notes": "Checks exactly one space after -- or == before name; errors if >1 space or tabs."
                },
                {
                    "id": "NM.05",
                    "name": "trailing slash equivalence",
                    "status": "implemented",
                    "location": "editors/vscode/extension.js",
                    "notes": "Warns on mixed trailing slash usage for same directory name within the file."
                },
                {
                    "id": "VL.05",
                    "name": "orphan spacer",
                    "status": "implemented",
                    "location": "editors/vscode/extension.js",
                    "notes": "Warns if spacer | not followed by a same-depth directory block; includes EOF and depth-change cases."
                }
            ]
        },
        "additional_tasks": [
            {
                "task": "Create clickable links in diagnostic messages to rules.md#<ID>",
                "status": "implemented",
                "location": "editors/vscode/extension.js",
                "notes": "Diagnostics use code={ value, target } pointing to workspace drrx/rules.md#<ID>."
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
                "task": "Implement a linkification helper in extension.js so clicking on (FW.06) opens rules.md#FW.06 in the default browser",
                "status": "implemented",
                "location": "editors/vscode/extension.js",
                "notes": "rulesUriFor() builds a file URI with fragment; VS Code opens the local rules.md anchor."
            },
            {
                "task": "Implement more robust, quote-aware comment stripping for diagnostics, or defer to a shared parser",
                "status": "pending",
                "target": "editors/vscode/extension.js",
                "notes": "Current comment strip is naive; upgrade to stateful lexer or integrate shared parser."
            }
        ]
    }
}
```

VS Code starter grammar + extension scaffolding:

Grammar: editors/vscode/syntaxes/drrx.tmLanguage.json
Language config: editors/vscode/language-configuration.json
Extension: editors/vscode/package.json, editors/vscode/extension.js
Packaging script: editors/vscode/package.json (vsce devDependency; npm run package)
Extension README: editors/vscode/README.md
Diagnostics engine skeleton (live in VS Code)

On open/change/save or drrx.lint command.
Errors checked: SP.01 tabs, SP.06 root col 1, FW.12 root flow, FW.07 multi-branch, FW.06 missing spacer, OR.02 grouping, FW.14 marker after name.
Newly added checks (above): SP.05, NM.05, VL.05.
Diagnostic code links to local rules.md anchors (clickable).
Fixtures and docs

Negative fixtures set: drrx/fixtures/invalid/*.tree.drrx (mapped in drrx/fixtures/README.md).
Edge-case positive fixture.
Root scripts for schema validation: package.json (validate:ast, validate:diff, validate:all).

## 0.1.5

Completed:
- added severities to the VS Code README,
- added strictness toggles,
- extracted a shared diagnostics engine with a Node CLI
- machine-readable format for quick indexing.

What I implemented

Severity table in extension README

File: editors/vscode/README.md:1
Added a “Severities” section with:
Errors (default): SP.01, SP.02 (reserved), SP.06, FW.06, FW.07, FW.08 (reserved), FW.10, FW.12, FW.14, OR.02
Warnings: SP.03, FW.02, FW.03, FW.11, VL.02, VL.05, VL.07, WN.02
Strictness setting details
Strictness setting (warn vs error, plus off)

File: editors/vscode/package.json:17
Contributed configuration drrx.strict with enum off|warn|error (default: error)
File: editors/vscode/extension.js: reads drrx.strict and maps diagnostics:
off → suppress all
warn → all findings downgraded to warnings
error → default severities (warnings remain warnings)
Extracted diagnostics logic to a shared module

File: lib/drrx-lint.js
Function lintText(text) → issues array with {line, start, end, code, message, severity}
Checks now include:
SP.01 tabs (error)
SP.06 root at column 1 (error)
RT.01 root required first (error)
FW.12 no flow markers on root (error)
FW.07 only one branch marker per line (error)
SP.05 exactly one space after operator (error)
OR.02 files precede directories (error)
FW.06 missing spacer before a directory after files (error)
NM.05 mixed trailing slash usage (warning)
VL.05 orphan spacer (various cases; warning)
VL.07 consecutive spacers (warning)
FW.14 flow markers after operator/name (error)
File: editors/vscode/extension.js now wraps lintText(text) into VS Code Diagnostics and embeds clickable links to rules.md#<ID> with code={value,target}.
Node CLI linter

File: bin/drrx
Usage: drrx <file1.drrx> [file2.drrx ...]
Emits JSON: [{ file, diagnostics: [{ rule, message, line, column, severity, link }] }]
Uses the shared lintText from lib/drrx-lint.js
File: package.json
scripts.lint:drrx → node bin/drrx
bin mapping: “drrx”: “bin/drrx”
Fixtures updates

Expanded fixtures README with a table mapping each invalid fixture → expected rules and rationale:
File: drrx/fixtures/README.md
Already present

VS Code starter grammar + extension scaffolding (earlier pass), Makefile targets for schema validation, positive/negative fixtures, and rule/overview alignment around “:” semantics (closes sibling continuity, not children).
How to use

In VS Code

Settings → search “Dr.Rx: Strict” and set to off|warn|error.
Command Palette → “Dr.Rx: Lint Current Document” or rely on on-change/on-open triggers.
On CLI

npm run lint:drrx -- path/to/file.drrx
Or run drrx path/to/file.drrx (after npm link or via npx if published later)
Validation of schemas remains via:
```bash
npm run validate:ast
npm run validate:diff
npm run validate:all
```

> Machine-readable changes summary
```json
{
    "promote_add": {
        "severity_table": {
            "target": "editors/vscode/README.md",
            "details": {
                "id": "SEVERITY_TABLE",
                "name": "Add severity mapping",
                "status": "done",
                "location": "editors/vscode/README.md",
                "notes": "Errors and Warnings listed; strictness section added"
            }
        },
        ".config.strict.drrx": {
            "description": "severity_toggles",
            "details": {
                "id": "STRICT_CONFIG",
                "name": "Add drrx.strict setting",
                "status": "done",
                "location": "editors/vscode/package.json, editors/vscode/extension.js",
                "notes": "Values off|warn|error; applied in lint mapping"
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
                        },
                        "status": "done",
                        "location": "lib/drrx-lint.js, bin/drrx, package.json"
                    }
                }
            ]
        }
    },
    "pending_tasks": [
        {
            "task": "Implement quote-aware comment stripping or shared parser integration",
            "status": "pending",
            "target": "lib/drrx-lint.js / editors/vscode/extension.js",
            "notes": "Upgrade lexer; improve accuracy for comments inside quotes"
        }
    ]
}
```

## 0.1.6

Implemented:[per‑rule severity overrides, documented clickable diagnostic codes, filled the machine‑readable metadata, and noted the quote‑aware lexer work as pending]

What Changed:

VS Code settings: per‑rule overrides

editors/vscode/package.json
Added configuration property drrx.severityOverrides: object map of rule ID → "off" | "warn" | "error". Default {}.
editors/vscode/extension.js
Reads drrx.strict and drrx.severityOverrides.
Severity mapping:
strict=off → skip all diagnostics
strict=warn → make all diagnostics warnings
strict=error → default severities
Per‑rule override applied last:
'off' → suppress the rule
'warn' → warning
'error' → error
README (extension): severities and linkable codes

editors/vscode/README.md
Added “Severities” section (Errors and Warnings) plus Strictness.
Added “Diagnostic Codes and Links” section showing that codes are clickable and mapping examples:
FW.06 → rules.md#FW.06
OR.02 → rules.md#OR.02
SP.05 → rules.md#SP.05
NM.05 → rules.md#NM.05
Shared diagnostics engine + CLI (from previous step, wired now)

lib/drrx-lint.js: returns issues with rule id, message, line/col, severity.
bin/drrx: Node CLI to lint .drrx files and emit JSON diagnostics {file, diagnostics: [...]}
package.json: scripts.lint:drrx runs node bin/drrx; bin mapping {"drrx":"bin/drrx"}.
REVISIONSLOG machine‑readable metadata updated

REVISIONSLOG.md:0.0.9
Filled “severity_table” details with concrete id/name/status/location/notes.
Corrected key to ".config.strict.drrx" and filled details for strict + overrides (done).
“extract” block: marked shared module + CLI as done with locations, and added DOC_LINK_CODES “done” for README updates.
Updated pending_tasks: severity table and strictness tasks marked done; link docs done; quote‑aware lexer remains pending.
How to use per‑rule overrides

In VS Code settings (JSON):
"drrx.strict": "error" | "warn" | "off"
"drrx.severityOverrides": { "SP.02": "error", "FW.08": "warn", "WN.02": "off" }
Overrides take precedence after global strictness (strict=off still disables all).
Open items (kept pending)

Quote‑aware comment stripping (or shared parser integration) to avoid misclassifying # inside quoted names/annotations.

```json
{
    "promote_add": {
        "severity_table": {
            "target": "editors/vscode/README.md",
            "details": {
                "id": "SEVERITY_TABLE_VSCODE_README",
                "name": "Add severity mapping to VS Code README",
                "status": "done",
                "location": "editors/vscode/README.md",
                "notes": "Added Errors/Warnings lists, Strictness section, and guidance"
            }
        },
        ".config.strict.drrx": {
            "description": "severity_toggles",
            "details": {
                "id": "STRICT_AND_OVERRIDES",
                "name": "Add drrx.strict and drrx.severityOverrides settings",
                "status": "done",
                "location": "editors/vscode/package.json; editors/vscode/extension.js",
                "notes": "Global strictness (off|warn|error) and per‑rule overrides wired to diagnostics"
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
                        },
                        "status": "done",
                        "location": "lib/drrx-lint.js; bin/drrx; editors/vscode/extension.js",
                        "notes": "VS Code uses shared engine; CLI emits JSON diagnostics"
                    }
                },
                {
                    "id": "DOC_LINK_CODES",
                    "name": "Document diagnostic code linking",
                    "status": "done",
                    "location": "editors/vscode/README.md",
                    "notes": "Added 'Diagnostic Codes and Links' section with examples"
                }
            ]
        }
    },
    "pending_tasks": [
        {
            "task": "Implement more robust, quote-aware comment stripping for diagnostics, or integrate a shared parser",
            "status": "pending",
            "target": "lib/drrx-lint.js; editors/vscode/extension.js",
            "notes": "Current comment strip is naive; upgrade to stateful lexer or shared parser"
        }
    ]
}
```

## 0.1.7

```json
{
    "release": "0.1.1",
    "policy": {
        "linking": {
            "id": "DOC_LINK_POLICY",
            "name": "Single-source rules linking",
            "status": "enforced",
            "location": "docs across repo",
            "notes": "Do not add stand-alone rule reference sections to each doc; link to drrx/rules.md anchors only."
        }
    },
    "promote_add": {
        "lexer_upgrade": {
            "id": "LEXER_QUOTE_AWARE",
            "name": "Quote-aware lexer / shared parser",
            "status": "in_progress",
            "location": "lib/drrx-lint.js",
            "notes": "Implement stateful scan: quoted strings with escapes, comment stripping outside quotes, flow-prefix parsing stability. Target: eliminate false positives from # inside quotes."
        },
        "coverage_and_tests": {
            "id": "RULE_COVERAGE_TESTS",
            "name": "Expand rule coverage + golden diagnostics",
            "status": "planned",
            "location": "drrx/fixtures (golden sets); test harness TBD",
            "notes": "Broaden checks beyond current SP/FW/OR/NM/VL subset; define golden outputs for each invalid fixture to gate regressions."
        },
        "quick_fixes_and_actions": {
            "id": "QUICK_FIXES_VSCODE",
            "name": "Quick-fixes and code actions",
            "status": "planned",
            "location": "editors/vscode/extension.js",
            "notes": "Code actions: insert spacer (FW.06), regroup files/dirs (OR.02), enforce single-space after operator (SP.05), collapse excessive spacers (VL.07). Expose via command palette and lightbulb."
        }
    },
    "done": [
        {
            "id": "SEVERITY_TABLE_VSCODE_README",
            "name": "Severity mapping in VS Code README",
            "status": "done",
            "location": "editors/vscode/README.md",
            "notes": "Errors/Warnings and Strictness documented, plus code-to-rule link behavior."
        },
        {
            "id": "STRICT_AND_OVERRIDES",
            "name": "Strictness and per-rule overrides",
            "status": "done",
            "location": "editors/vscode/package.json; editors/vscode/extension.js",
            "notes": "drrx.strict (off|warn|error) and drrx.severityOverrides wired to diagnostics."
        },
        {
            "id": "SHARED_ENGINE_AND_CLI",
            "name": "Shared diagnostics engine + CLI",
            "status": "done",
            "location": "lib/drrx-lint.js; bin/drrx; package.json",
            "notes": "CLI emits JSON {rule, message, line, column, severity, link} for .drrx files."
        },
        {
            "id": "DOC_LINK_CODES",
            "name": "Diagnostic code linking documentation",
            "status": "done",
            "location": "editors/vscode/README.md",
            "notes": "Users can click codes to open rules.md#<ID>."
        }
    ],
    "pending_tasks": [
        {
            "task": "Quote-aware lexer/shared parser integration",
            "status": "in_progress",
            "target": "lib/drrx-lint.js",
            "notes": "Stateful lexer to handle quotes/escapes/comments; reduces false positives."
        },
        {
            "task": "Expand rule coverage + golden diagnostics",
            "status": "planned",
            "target": "fixtures + test harness",
            "notes": "Define golden outputs for each invalid fixture and add missing rule checks."
        },
        {
            "task": "Implement quick-fixes and code actions",
            "status": "planned",
            "target": "editors/vscode/extension.js",
            "notes": "FW.06 spacer insertion, OR.02 regrouping, SP.05 spacing fix, VL.07 spacer collapse."
        }
    ]
}
```

## 0.1.8

Acknowledged. I’ve begun the changes and kept linking to the canonical rules only (no extra rule references sprinkled around).

Summary of work just done

Quote‑aware lexer (started)

lib/drrx-lint.js now strips comments with a stateful scan: # is ignored inside quoted strings with escapes.
All downstream parsing in the linter uses this quote‑aware strip.
Additional rule coverage

FW.08: If a “:” branch appears at a depth, the linter now errors on any later sibling at that same depth (children are still allowed).
Existing checks retained: SP.01, SP.05, SP.06, RT.01, FW.06, FW.07, FW.12, FW.14, OR.02, NM.05, VL.05, VL.07.
VS Code quick‑fixes and code actions (initial)

editors/vscode/extension.js registers a CodeActionProvider:
FW.06 “Insert spacer |” quick‑fix adds a spacer line before a directory following files at the same depth.
SP.05 “Fix operator spacing” normalizes to one space after “--”/“==”.
VL.07 “Remove extra spacer line” deletes a consecutive spacer.
These are minimal and focused; regrouping (OR.02) remains planned.
JSON changelog-style output
```json
{
    "release": "0.1.2",
    "policy": {
        "linking": {
            "id": "DOC_LINK_POLICY",
            "name": "Single-source rules linking",
            "status": "enforced",
            "location": "docs across repo",
            "notes": "Only link to drrx/rules.md anchors; no duplicate rule summaries elsewhere."
        }
    },
    "promote_add": {
        "lexer_upgrade": {
            "id": "LEXER_QUOTE_AWARE",
            "name": "Quote-aware lexer / comment stripping",
            "status": "in_progress",
            "location": "lib/drrx-lint.js",
            "notes": "Stateful scan for quotes with escapes; # outside quotes treated as comment; reduces false positives."
        },
        "fw08_enforcement": {
            "id": "FW08_CLOSED_BRANCH_ENFORCEMENT",
            "name": "Error on siblings after closed ':' branch",
            "status": "done",
            "location": "lib/drrx-lint.js",
            "notes": "Lookahead at same depth; children remain allowed."
        },
        "quick_fixes_and_actions": {
            "id": "QUICK_FIXES_VSCODE",
            "name": "Code actions for common fixes",
            "status": "in_progress",
            "location": "editors/vscode/extension.js",
            "notes": "Adds quick-fixes for FW.06 insert spacer, SP.05 spacing, VL.07 collapse spacer; regrouping (OR.02) planned."
        }
    },
    "done": [
        {
            "id": "SEVERITY_TABLE_VSCODE_README",
            "name": "Severity mapping in VS Code README",
            "status": "done",
            "location": "editors/vscode/README.md",
            "notes": "Errors/Warnings and Strictness documented; Diagnostic Codes and Links section present."
        },
        {
            "id": "STRICT_AND_OVERRIDES",
            "name": "Strictness and per-rule overrides",
            "status": "done",
            "location": "editors/vscode/package.json; editors/vscode/extension.js",
            "notes": "drrx.strict (off|warn|error) and drrx.severityOverrides applied to diagnostics."
        },
        {
            "id": "SHARED_ENGINE_AND_CLI",
            "name": "Shared diagnostics engine + CLI",
            "status": "done",
            "location": "lib/drrx-lint.js; bin/drrx; package.json",
            "notes": "CLI emits JSON diagnostics for .drrx files: rule, message, line/column, severity, link."
        }
    ],
    "pending_tasks": [
        {
            "task": "Complete quote-aware lexer/shared parser",
            "status": "in_progress",
            "target": "lib/drrx-lint.js",
            "notes": "Extend to handle quoted names fully across annotations and edge cases; consider shared parser for robust tokenization."
        },
        {
            "task": "Expand rule coverage + golden diagnostics",
            "status": "planned",
            "target": "fixtures + test harness",
            "notes": "Define golden outputs for each invalid fixture to gate regressions; broaden checks (VL.02, SP.02 if feasible)."
        },
        {
            "task": "Add more quick-fixes and code actions",
            "status": "planned",
            "target": "editors/vscode/extension.js",
            "notes": "Implement regrouping for OR.02; add ‘insert/remove continuity |’ assists; consider multi-edit actions."
        }
    ]
}
```

Notes:
Quote-aware lexing is now the default for comment stripping; further parser hardening can follow.

## 0.1.9

What is required to reach an operational state (no repeats of what’s done).

Operational Gaps To Address

### Lexer/Parser

- Implement quote‑aware, stateful lexing for names and annotations (escaped quotes, nested braces, inline comments outside quotes).
- Normalize flow prefix parsing (indent depth, branch token, continuity bar) independent of line payload.
- Add a normalization pass for directory names (NM.05) to prevent mixed trailing “/” usage in results.
- Define an internal AST token model (line → tokens) to be shared by both VS Code diagnostics and CLI.
- Rule Coverage (Diagnostics)

- Add VL.02: flow/indent mismatch with robust detection and actionable messages.
- Add SP.02: ambiguous child alignment detection (where possible without full parse recovery).
- Add OR.01/OR.04: root file block ordering checks and contiguous block enforcement.
- Expand SF.01/SF.02 enforcement (UTF‑8, line‑ending normalization, comment/blank handling).
- Add more Windows validations: reserved names discovery in context (WN.01) and long‑path projections (WN.02) with clear guidance.
- Add consistent handling for FW.11 root continuity (treat as style; optionally elevated via overrides).
- Quick‑Fixes (VS Code)

- OR.02 regrouping: move file lines above directory group and insert a spacer (batch edit).
- FW.02/ SP.03: insert/remove continuity bars ‘|’ (sibling continuity, first‑child bar).
- NM.05: toggle trailing “/” normalization for a directory group.
- VL.02: auto‑align child indentation to parent content column (when unambiguous).
- Guard all code‑actions with idempotence checks and preview diffs.
- Test Harness & Golden Diagnostics

### Create a golden diagnostics suite

- each invalid fixture → expected JSON (code, message, line/col).
- Wire “npm test” to run the shared linter against fixtures and compare outputs.
- Add positive (conformance) fixtures into golden “no diagnostics” assertions.
- Add perf tests on large trees and set baseline budgets for lint latency.

### CI & Quality Gates

- CI pipeline:
  - run schema validation,
  - linter golden tests,
  - VS Code extension package dry‑run

- Gate PRs on golden diagnostics stability and formatting checks (no tabs, LF/CRLF normalization).

### CLI & API Maturity

- Stabilize JSON diagnostics schema for CLI (rule, message, line, column, severity, link).
- Add exit codes policy (non‑zero on errors vs warnings toggle).
- Add flags: “—strict”, “—severity-overrides <json>”, “—format json|text”, “—fix” (when quick‑fixes are available in CLI).

### Performance & Robustness

- Bound per‑line complexity; avoid quadratic scans (especially over very long lines).
- Fuzz tests for malformed lines: unmatched quotes, partial annotations, mixed tokens.
Documentation & Governance

- Keep docs linking to the canonical rules only; do not replicate rule references across files.
- Add a diagnostics configurability section (strict + overrides) to the extension docs’ settings (already partially there; expand with examples).
- Expand UDL Validation Map to reflect new/changed severities and code‑actions availability.
- Additions To TODO.md (Augment Scope)

### Lexer/Parser Epic

- Quote‑aware lexing for names/annotations.
- Flow prefix normalization and token model.
- AST token stream output shared by VS Code/CLI.
- Diagnostics Coverage Epic

- implement_enhancements:['VL.02', 'SP.02', 'OR.01/OR.04', 'SF.01/SF.02', 'WN.01/0']
- Add consistent style hints for FW.11 with config‑driven severity.

### Quick‑Fixes Epic

- OR.02 regroup (batch edit).
- FW.02/SP.03 continuity bars add/remove.
- SP.02 align child indentation.
- NM.05 trailing “/” normalization.
- Testing/CI Epic

- Golden diagnostics harness and fixtures table.
- Perf baselines and per‑commit gating.
- Extension packaging smoke test in CI.

### CLI Epic

- Diagnostics schema stabilization; flags for strictness and overrides.
- Optional “—fix” to apply safe quick‑fixes headlessly.

### Acceptance Criteria For “Operational”

#### Lexer/Parser

Quote‑aware, deterministic tokenization; comments never break quoted content; flow prefix parsed consistently.
Diagnostics

All core rules enforced with stable IDs and complete coverage; no obvious false positives from quotes/comments.
Quick‑Fixes

Critical rules (FW.06, OR.02, SP.05, VL.07, FW.02/SP.03) have reliable, idempotent code‑actions.
Tests/CI

Golden diagnostics comparisons pass for all fixtures; perf within agreed budgets; package build OK.
CLI

JSON output documented and stable; strictness/overrides honored; exit codes policy in place.
Docs

Settings and usage documented; only link to rules.md for rule details (no duplication).
This plan avoids duplication and promotes the work from the current alpha into an operational, test‑gated, maintainable state.
