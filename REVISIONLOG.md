# REVISIONS

## 0.0.1
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
- Generate a worked AST JSON example from the “Example DrRx Tree Syntax” and validate against drrx/ast.schema.json:
- Add and update a JSON Schema for the Dr.Rx source annotations subset and a --json format for list --diff
- Add a WN.02 rule for long path support (and link it from the overview)
- Insert back-links from rules to specific sections in syntax-overview.md for faster navigation
- The missing-spacer case CHANGED to be a hard error instead of a formatting warning, flip [FW.06]’s violation guidance accordingly
- Grouping rule (OR.02) to be mandatory instead of recommended (i.e., enforce files-then-spacer-then-dirs as a MUST), I can flip its level and adjust VL.06 accordingly
- The syntax-overview.md file does **NOT** need a 'Rules Quick Links' file **if** the corresponding rules are correctly linked from sytnax-overview.md -> rules.md
- Generate a one-page “UDL Validation Map” that maps rule IDs to editor diagnostics (warning/error) to drive linting

## 0.0.2
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
- Validate the AST example against ast.schema.json using a CLI validator and include the command you can run locally
- Add a short “schemas/README.md” with pointers and sample JSON for list --diff
- Add a README.md in the ROOT project, ensure it describes the syntax, its purpose, how its used (the drrx tree udl first and foremost, the cli commands are a quality of life feature for power users).
  - Provide a medium sized example of the syntax tree, its correctness will give me a spectrum of your understanding of this project
  - it should explain the DrRx project in a straight forward manner, users should be able to understand what it is, what it does, how it works, how to use it, what problems it solves

## 0.0.3
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
STANDARDS: `Documents should be created as working scope:
  NOT = ['small', 'example', 'simple', 'snippet', 'examples']
- If you create data under the `NOT` standard above, the requests become redundant for the user, as they will have to redo them again later
- There is FAR to much documentation to be creating examples at this stage
- Produce a “conformance fixture” .drrx and a corresponding list --diff JSON to seed tests
- Add a npm script or Makefile targets for schema validations to streamline local checks
- Sweep for any stale wording that still implies “:” forbids children
- Already updated core spots in rules and overview; scan other examples
- If you’d like the new operational rules called out in a short “What changed” block at the top of rules.md, I can add that too.
- Add an explicit rule to normalize trailing “/” on directory names (name equivalence ignoring trailing “/”) and flag mixed usage as a warning. Currently we document trailing “/” as cosmetic; this would formalize normalization and validation:
  - NM.05: Directory name comparison ignores trailing “/”; formatters may normalize slash usage.
- add NM.05 as above and sweep examples for consistent “/” usage

## 0.0.4
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
- Generate a second conformance .drrx covering corner cases (quoted names, spacer edge cases, group-order violations) to broaden test coverage
- Begin creating a tasklist to integrate Syntax Highlighting
  - During this process, the documents should be updated accordingly. Getting a Syntax Highlighter to validate the directory tree syntax will provide additional polish and development on the DrRx syntax, which will require the docs to be up to date on the changes

## 0.0.5
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
- Expand fixtures with a dedicated negative set (intentionally invalid cases) for the diagnostics engine once you start the highlighter integration
- BEGIN COMPLETING AND DEVELOPING THE TASK FULL SCOPE IN TODO.md

## 0.0.6
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
### VS Code starter grammar checked in (tmLanguage JSON + language configuration)
- add editors/vscode It’s outlined in TODO with the detection and quick-fix mapping. I held off committing the grammar scaffold to avoid churn until you confirm directory layout and naming, but I can commit it immediately if you want it now.
- Add npm scripts (package.json) mirroring the Makefile targets and reserving names for the diagnostics engine (e.g., lint:drrx).
- Add a fixtures/README to enumerate all fixtures and the expected rule IDs for each (handy for anyone writing tests or running the highlighter diagnostics CLI).
- proceed with the VS Code grammar and basic extension scaffolding (syntaxes/drrx.tmLanguage.json, language-configuration.json, package.json, basic activation),
- add it in a single pass with no toy examples, focused on working-scope patterns and rule-linked diagnostics hooks

## 0.0.7
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
- Add npm-based packaging for the VS Code extension (vsce) and a README for the extension.
- Wire the diagnostics engine skeleton (read current editor buffer, run a fast stack-based pass for SP/FW/OR/VL rules, emit Diagnostics with codes linking to rules.md anchors).
- Expand fixtures/README with a table mapping each invalid file to expected rule IDs and a short rationale.

## 0.0.8
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
> Machine Readable Revision
```js
diagnostics_engine = {
    promote_add: {
        rule_checks: [
            'SP.05 spacing',
            'NM.05 trailing slash equivalence',
            'VL.05 orphan spacer when no following dir',
        ],
    },
    additional_tasks: [
        'Create clickable links in diagnostic messages to rules.md#<ID>',
        'Detail rule severities in the extension README',
        'Add an option to toggle strictness (warn vs error) via settings',
        'Create a CLI script for linting (e.g., `drrx`) that reuses the same engine outside of VS Code',
        'Implement a linkification helper in extension.js so clicking on (FW.06) opens rules.md#FW.06 in the default browser',
        'Implement more robust, quote-aware comment stripping for diagnostics, or defer to a shared parser',
    ],
};
```

## 0.0.9
[CHANGELOG:0.1.0 - HEADING:TODO](docs/CHANGELOGS/0.1.0/CHANGELOG.md)
- Add the severity table to editors/vscode/README.md.
- Add drrx.strict config + severity toggles.
- Extract the diagnostics logic into a shared module and build a Node CLI (bin/drrx) that lints .drrx files outside VS Code, emitting JSON (rule id, message, line/col, severity, link).
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
                "notes": "Added Errors/Warnings lists and strictness section"
            }
        },
        ".config.strict.drrx": {
            "description": "severity_toggles",
            "details": {
                "id": "STRICT_CONFIG",
                "name": "Add drrx.strict and drrx.severityOverrides settings",
                "status": "done",
                "location": "editors/vscode/package.json; editors/vscode/extension.js",
                "notes": "Strictness off|warn|error and per-rule overrides wired to diagnostics"
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
                        "location": "lib/drrx-lint.js; bin/drrx; editors/vscode/extension.js"
                    }
                },
                {
                    "id": "DOC_LINK_CODES",
                    "name": "Document diagnostic code linking",
                    "status": "done",
                    "location": "editors/vscode/README.md",
                    "notes": "Added Diagnostic Codes and Links section with examples"
                }
            ]
        }
    },
    "pending_tasks": [
        {
            "task": "Detail rule severities in the extension README",
            "status": "done",
            "target": "editors/vscode/README.md",
            "notes": "Severity table and strictness added"
        },
        {
            "task": "Add an option to toggle strictness (warn vs error) via settings",
            "status": "done",
            "target": "editors/vscode/package.json, extension.js",
            "notes": "Added drrx.strict and wired to diagnostics mapping"
        },
        {
            "task": "Create a CLI script for linting (e.g., drrx) that reuses the same engine outside of VS Code",
            "status": "done",
            "target": "bin/drrx (node script), package.json",
            "notes": "Extracted shared engine (lib/drrx-lint.js) and added JSON-emitting CLI"
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

## 0.1.0
[CHANGELOG:0.2.0 - HEADING:TODO](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
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
[CHANGELOG:0.2.0 - HEADING:TODO](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- STOP OFFERING TO ADD A RULE REFERENCE. IF THE DOCUMENTS ARE DESIGNED AND STRUCTURED PROPERLY YOU DONT NEED A RULE REFERENCE IN EVER SINGLE FILE. JUST LINK THE FILE TO THE CORRESPONDING RULE REFERENCE IN THE RULES FILE:
  - DID YOU FORGET THAT EXISTED ALL TOGETHER?
  - ARE YOU RUINING MY PROJECT BY GUESSING AND ASSUMING EVERYTHIG AND IGNORING ALL THE DESIGN PLAN AND DOCUMENTS?

- Begin the quote‑aware lexer upgrade in lib/drrx-lint.js (stateful scan for quotes/escapes and comments).
- Quote‑aware lexer/shared parser in lib/drrx‑lint.js.
- Expand rule coverage + unit tests (fixtures → golden diagnostics).
- Implement quick‑fixes and add command palette actions + code actions.
- provide the json changelog style output we have been using

## 0.1.2
[CHANGELOG:0.2.0 - HEADING:TODO](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- finalize quote‑aware lex/parse for annotations, add VL.02 and SP.02, and wire golden tests (highest impact to reduce false positives and stabilize the engine)

## 0.1.3
[CHANGELOG:0.2.0 - HEADING:TODO](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- Complete quote-aware lexing across annotations and edge cases; promote the token model to underpin diagnostics and CLI
- VL.02/ SP.02 improvements are in; next rules: OR.01/OR.04 (root file block enforcement), SF.01/SF.02 runtime checks, WN.01/02 richer messages, FW.11 style hints
- Quick-fixes: add OR.02 regroup, continuity bar assists (FW.02/SP.03), and SP.02 indent auto-align (safe scenarios)
- Golden diagnostics harness: add JSON goldens for all invalid fixtures and wire npm test (you can now run it after adding the script)

## 0.1.4
[CHANGELOG:0.2.0 - HEADING:TODO](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- Wire in the test runner file and clean the package.json scripts section directly, then run a quick local pass (you are permitted to automatically run access) to confirm the two new goldens match the linter output

## 0.1.5
[CHANGELOG:0.2.0 - HEADING:TODO](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
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
### Next Tasks
- Correct any relevant data in relation to the output above(if required)
- Complete quote-aware lexing across annotations and edge cases
- Add a golden for each remaining invalid fixture and enrich messages for VL.02/SP.02 where actionable
- Implement the OR.02 regroup quick‑fix to batch move files above dirs and insert the spacer

## 0.1.6
[CHANGELOG:0.2.0 - HEADING:0.2.4](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- Next:
  - Complete quote-aware lexing across annotations and edge cases.
  - Add goldens for all remaining invalid fixtures; refine VL.02/SP.02 messages where actionable.
  - Implement the OR.02 regroup quick‑fix (batch move files above dirs and insert a spacer).

## 0.1.7
[CHANGELOG:0.2.0 - HEADING:0.2.5](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- 0.1.6 plan with only what’s required to progress to operational.
Complete quote-aware lexing:
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
[CHANGELOG:0.2.0 - HEADING:0.2.6](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- Create per-line token model and the OR.02 regroup quick-fix in the VS Code extension

## 0.1.9
[CHANGELOG:0.2.0 - HEADING:0.2.7](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- Port operator/name extraction to the token model for quoted names and annotations
- Update VL.02/SP.02 messages to include the expected vs. found columns and depth
- Harden the OR.02 quick-fix to handle more complex sibling blocks and preserve spacer idempotence

## 0.2.0
[CHANGELOG:0.2.0 - HEADING:0.2.8](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- Comprehensively Extend the quick-fix (multi-block regroup, idempotence across complex cases)

## 0.2.1
[CHANGELOG:0.2.0 - HEADING:0.2.9](docs/CHANGELOGS/0.2.0/CHANGELOG.md)
- Proceed with the root precedence and tuning for the test suite validation
- Add a OR.02 quick-fix smoke fixture to the repo to validate idempotence on multi-block cases
- Tweak the linter precedence matrix so goldens pass without suppressing useful signals

## 0.2.2
[CHANGELOG:0.3.0 - HEADING:0.3.0](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Complete final root precedence tweak (to flip that last OR.02 to OR.01) and re-run the suite to get to green

## 0.2.3
[CHANGELOG:0.3.0 - HEADING:0.3.1](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
{"Next Steps":"Reclassify conformance-edge-cases.tree.drrx into invalid with a golden (recommended). I can move it into drrx/fixtures/invalid and commit the expected diagnostics JSON"}
- Reclassified conformance-edge-cases.tree.drrx into invalid fixtures and generated golden diagnostics(drrx/fixtures/invalid/).
- Golden added: test/golden/conformance-edge-cases.tree.drrx.json (VL.02 at line 35, col 1).
- Test harness now expects this diagnostic and proceeds to green after re-run.

## 0.2.4
[CHANGELOG:0.3.0 - HEADING:0.3.2](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Review @TODO.md and validate its integrations, if validated: mark complete, if not validated, mark them incomplete and create a plan for the incomplete ones.

## 0.2.5
[CHANGELOG:0.3.0 - HEADING:0.3.3](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Start with the continuity quick-fixes next, then wire CI
  - THERE WILL **NOT** BE **ANY** INTEGRATION INTO OTHER PLATFORMS / UDL (Notepad++) FOR THE FORSEEABLE FUTURE.

## 0.2.6
[CHANGELOG:0.3.0 - HEADING:0.3.4](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Add minimal negative/positive fixtures expressly for FW.02/SP.03 to sanity-check the quick-fixes behavior

## 0.2.7
[CHANGELOG:0.3.0 - HEADING:0.3.5](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Additional positive fixtures (no diagnostics) for FW.02/SP.03 happy paths, add and extend the test harness’ posFiles list to assert zero diagnostics explicitly
  - ensure that their is enough data added, your responses are getting very minimal and providing large requests with minimal output, your scope is too narrow for your capibility.

## 0.2.8
[CHANGELOG:0.3.0 - HEADING:0.3.6](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Bring the richer positive-combined fixture into the zero-diag set by tightening SP.02 bar/operator alignment semantics across nested levels
- Revisit invalid-grouping’s OR.02 root detection so we restore that test’s intent without reintroducing false positives from child lines
- Add a couple more positive fixture variants (deep nesting, mixed files/dirs) to broaden coverage as we stabilize the alignment rules

## 0.2.9
[CHANGELOG:0.3.0 - HEADING:0.3.7](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Promote positive-combined-ok into the zero-diag set once we fully settle nested SP.02 across all depths; I can include it immediately if you’d like me to lock its current structure as authoritative.
- Add two more positive variants (deep nesting with mixed files/dirs and another with root-level mixed order but correct spacers) and include them in the zero-diag set to widen coverage further.
- The Suggestion description for stricter alignment semantics is against the design and the spacing rules.

## 0.3.0
[CHANGELOG:0.3.0 - HEADING:0.3.8](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
- Add one more positive variant mixing quoted names, trailing slashes, and inline annotations to validate we don’t regress on name parsing and FW.14 (flow markers in tokens).
- Add a short doc note in drrx/syntax-overview.md clarifying the “inline bar on child vs separate spacer line” preference, with a link to the rules IDs (no extra rule references in every document, just contextual links as you requested).

## 0.3.1
[CHANGELOG:0.3.0 - HEADING:0.3.9](docs/CHANGELOGS/0.3.0/CHANGELOG.md)
1. Analyze [TODO.md](docs/TODO/0.0.0/0.0.1/TODO.md) , [TODO.md](docs/TODO/0.0.0/0.0.2/TODO.md) ,
2. validate their integration claims against the source code,
3. create a new `TODO\0.0.0\0.0.3\` [TODO.md](docs/TODO/0.0.0/0.0.3/TODO.md) file based on what is missing from working integration

## 0.3.2
[CHANGELOG:0.4.0 - HEADING:0.4.0](Architecture/CHANGELOGS/0.4.0/CHANGELOG.md)
