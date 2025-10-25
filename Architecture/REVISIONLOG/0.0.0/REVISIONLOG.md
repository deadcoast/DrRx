# REVISIONS

## 0.0.1

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

- Generate a worked AST JSON example from the “Example DrRx Tree Syntax” and validate against drrx/ast.schema.json:
- Add and update a JSON Schema for the Dr.Rx source annotations subset and a --json format for list --diff
- Add a WN.02 rule for long path support (and link it from the overview)
- Insert back-links from rules to specific sections in syntax-overview.md for faster navigation
- The missing-spacer case CHANGED to be a hard error instead of a formatting warning, flip [FW.06]’s violation guidance accordingly
- Grouping rule (OR.02) to be mandatory instead of recommended (i.e., enforce files-then-spacer-then-dirs as a MUST), I can flip its level and adjust VL.06 accordingly
- The syntax-overview.md file does **NOT** need a 'Rules Quick Links' file **if** the corresponding rules are correctly linked from sytnax-overview.md -> rules.md
- Generate a one-page “UDL Validation Map” that maps rule IDs to editor diagnostics (warning/error) to drive linting

## 0.0.2

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

- Validate the AST example against ast.schema.json using a CLI validator and include the command you can run locally
- Add a short “schemas/README.md” with pointers and sample JSON for list --diff
- Add a README.md in the ROOT project, ensure it describes the syntax, its purpose, how its used (the drrx tree udl first and foremost, the cli commands are a quality of life feature for power users).
  - Provide a medium sized example of the syntax tree, its correctness will give me a spectrum of your understanding of this project
  - it should explain the DrRx project in a straight forward manner, users should be able to understand what it is, what it does, how it works, how to use it, what problems it solves

## 0.0.3

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

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

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

- Generate a second conformance .drrx covering corner cases (quoted names, spacer edge cases, group-order violations) to broaden test coverage
- Begin creating a tasklist to integrate Syntax Highlighting
  - During this process, the documents should be updated accordingly. Getting a Syntax Highlighter to validate the directory tree syntax will provide additional polish and development on the DrRx syntax, which will require the docs to be up to date on the changes

## 0.0.5

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

- Expand fixtures with a dedicated negative set (intentionally invalid cases) for the diagnostics engine once you start the highlighter integration
- BEGIN COMPLETING AND DEVELOPING THE TASK FULL SCOPE IN TODO.md

## 0.0.6

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

### VS Code starter grammar checked in (tmLanguage JSON + language configuration)

- add editors/vscode It’s outlined in TODO with the detection and quick-fix mapping. I held off committing the grammar scaffold to avoid churn until you confirm directory layout and naming, but I can commit it immediately if you want it now.
- Add npm scripts (package.json) mirroring the Makefile targets and reserving names for the diagnostics engine (e.g., lint:drrx).
- Add a fixtures/README to enumerate all fixtures and the expected rule IDs for each (handy for anyone writing tests or running the highlighter diagnostics CLI).

- proceed with the VS Code grammar and basic extension scaffolding (syntaxes/drrx.tmLanguage.json, language-configuration.json, package.json, basic activation),
- add it in a single pass with no toy examples, focused on working-scope patterns and rule-linked diagnostics hooks

## 0.0.7

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

- Add npm-based packaging for the VS Code extension (vsce) and a README for the extension.
- Wire the diagnostics engine skeleton (read current editor buffer, run a fast stack-based pass for SP/FW/OR/VL rules, emit Diagnostics with codes linking to rules.md anchors).
- Expand fixtures/README with a table mapping each invalid file to expected rule IDs and a short rationale.

## 0.0.8

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

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

[CHANGELOG:0.1.0 - HEADING:TODO](CHANGELOGS\0.1.0\CHANGELOG.md)

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
