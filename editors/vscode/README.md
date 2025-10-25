# Dr.Rx VS Code Extension (Starter)

Provides syntax highlighting for Dr.Rx `.drrx` directory tree files using a TextMate grammar. A diagnostics engine is planned (see `drrx/udl-validation-map.md`).

Install (development)
- Open this repository folder in VS Code.
- Press F5 to launch an Extension Development Host.

Packaging
- From `editors/vscode` folder run:
  - `npm install`
  - `npm run package`  (requires `vsce`, provided as a devDependency)

Contributions
- Language: `drrx` (`.drrx`, `.tree.drrx`)
- Grammar: `syntaxes/drrx.tmLanguage.json`
- Language configuration: `language-configuration.json`
- Activation: `onLanguage:drrx` and command `drrx.lint`

Next steps
- Implement diagnostics (SP/FW/OR/VL rules) with links to `drrx/rules.md`.
- Add quick-fixes: insert spacer (FW.06), regroup files/dirs (OR.02), fix spacing (SP.05), remove excessive spacers (VL.07).

## Severities

Errors (default strictness)
- SP.01 Tabs disallowed
- SP.02 Child alignment ambiguous (reserved)
- SP.06 Root must start at column 1
- FW.06 Missing spacer before directory following files
- FW.07 Multiple branch markers on one line
- FW.08 Closed branch followed by sibling at same depth (reserved)
- FW.10 Files never have children
- FW.12 No flow markers on root line
- FW.14 Flow markers only in prefix or as spacer lines
- OR.02 Files must precede directories within a block

Warnings
- SP.03 Missing first-child `|` under open vein (style)
- FW.02 Missing continuity `|` when siblings remain (style)
- FW.03 Open directory with no children (dangling)
- FW.11 Root-level continuity bar style
- VL.02 Flow/indent mismatch; inconsistent trailing `/`; reserved names
- VL.05 Orphan spacer
- VL.07 Excessive consecutive spacers
- WN.02 Long-path projection warnings

Strictness
- Configure `drrx.strict` (off | warn | error) in settings.
- `off`: suppress diagnostics; `warn`: all diagnostics as warnings; `error`: default severities.

## Diagnostic Codes and Links

Diagnostic messages include a code like (FW.06). Clicking the code opens the corresponding rule in drrx/rules.md.

Examples
- FW.06 → rules.md#FW.06 (Required spacer between files and following directory)
- OR.02 → rules.md#OR.02 (Files before directories within a block)
- SP.05 → rules.md#SP.05 (Single-space after operator)
- NM.05 → rules.md#NM.05 (Trailing slash equivalence)
