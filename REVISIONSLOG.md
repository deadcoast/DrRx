# REVISIONS

## 0.0.1

- Generate a worked AST JSON example from the “Example DrRx Tree Syntax” and validate against drrx/ast.schema.json:
- Add and update a JSON Schema for the Dr.Rx source annotations subset and a --json format for list --diff
- Add a WN.02 rule for long path support (and link it from the overview)
- Insert back-links from rules to specific sections in syntax-overview.md for faster navigation
- The missing-spacer case CHANGED to be a hard error instead of a formatting warning, flip [FW.06]’s violation guidance accordingly
- Grouping rule (OR.02) to be mandatory instead of recommended (i.e., enforce files-then-spacer-then-dirs as a MUST), I can flip its level and adjust VL.06 accordingly
- The syntax-overview.md file does **NOT** need a 'Rules Quick Links' file **if** the corresponding rules are correctly linked from sytnax-overview.md -> rules.md
- Generate a one-page “UDL Validation Map” that maps rule IDs to editor diagnostics (warning/error) to drive linting

## 0.0.2

- Validate the AST example against ast.schema.json using a CLI validator and include the command you can run locally
- Add a short “schemas/README.md” with pointers and sample JSON for list --diff
- Add a README.md in the ROOT project, ensure it describes the syntax, its purpose, how its used (the drrx tree udl first and foremost, the cli commands are a quality of life feature for power users).
  - Provide a medium sized example of the syntax tree, its correctness will give me a spectrum of your understanding of this project
  - it should explain the DrRx project in a straight forward manner, users should be able to understand what it is, what it does, how it works, how to use it, what problems it solves

## 0.0.3

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

- Generate a second conformance .drrx covering corner cases (quoted names, spacer edge cases, group-order violations) to broaden test coverage
- Begin creating a tasklist to integrate Syntax Highlighting
  - During this process, the documents should be updated accordingly. Getting a Syntax Highlighter to validate the directory tree syntax will provide additional polish and development on the DrRx syntax, which will require the docs to be up to date on the changes

## 0.0.5

- Expand fixtures with a dedicated negative set (intentionally invalid cases) for the diagnostics engine once you start the highlighter integration
- BEGIN COMPLETING AND DEVELOPING THE TASK FULL SCOPE IN TODO.md

## 0.0.6

### VS Code starter grammar checked in (tmLanguage JSON + language configuration)

- add editors/vscode It’s outlined in TODO with the detection and quick-fix mapping. I held off committing the grammar scaffold to avoid churn until you confirm directory layout and naming, but I can commit it immediately if you want it now.
- Add npm scripts (package.json) mirroring the Makefile targets and reserving names for the diagnostics engine (e.g., lint:drrx).
- Add a fixtures/README to enumerate all fixtures and the expected rule IDs for each (handy for anyone writing tests or running the highlighter diagnostics CLI).

- proceed with the VS Code grammar and basic extension scaffolding (syntaxes/drrx.tmLanguage.json, language-configuration.json, package.json, basic activation),
- add it in a single pass with no toy examples, focused on working-scope patterns and rule-linked diagnostics hooks

## 0.0.7

- Add npm-based packaging for the VS Code extension (vsce) and a README for the extension.
- Wire the diagnostics engine skeleton (read current editor buffer, run a fast stack-based pass for SP/FW/OR/VL rules, emit Diagnostics with codes linking to rules.md anchors).
- Expand fixtures/README with a table mapping each invalid file to expected rule IDs and a short rationale.

## 0.0.8

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

- STOP OFFERING TO ADD A RULE REFERENCE. IF THE DOCUMENTS ARE DESIGNED AND STRUCTURED PROPERLY YOU DONT NEED A RULE REFERENCE IN EVER SINGLE FILE. JUST LINK THE FILE TO THE CORRESPONDING RULE REFERENCE IN THE RULES FILE:
  - DID YOU FORGET THAT EXISTED ALL TOGETHER?
  - ARE YOU RUINING MY PROJECT BY GUESSING AND ASSUMING EVERYTHIG AND IGNORING ALL THE DESIGN PLAN AND DOCUMENTS?

- Begin the quote‑aware lexer upgrade in lib/drrx-lint.js (stateful scan for quotes/escapes and comments).
- Quote‑aware lexer/shared parser in lib/drrx‑lint.js.
- Expand rule coverage + unit tests (fixtures → golden diagnostics).
- Implement quick‑fixes and add command palette actions + code actions.
- provide the json changelog style output we have been using

## 0.1.2

- finalize quote‑aware lex/parse for annotations, add VL.02 and SP.02, and wire golden tests (highest impact to reduce false positives and stabilize the engine)

## 0.1.3

- Complete quote-aware lexing across annotations and edge cases; promote the token model to underpin diagnostics and CLI
- VL.02/ SP.02 improvements are in; next rules: OR.01/OR.04 (root file block enforcement), SF.01/SF.02 runtime checks, WN.01/02 richer messages, FW.11 style hints
- Quick-fixes: add OR.02 regroup, continuity bar assists (FW.02/SP.03), and SP.02 indent auto-align (safe scenarios)
- Golden diagnostics harness: add JSON goldens for all invalid fixtures and wire npm test (you can now run it after adding the script)

## 0.1.4

- Wire in the test runner file and clean the package.json scripts section directly, then run a quick local pass (you are permitted to automatically run access) to confirm the two new goldens match the linter output
