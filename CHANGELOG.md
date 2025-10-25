# CHANGELOG

Changes are labelled numerically by their order of integration.

## 0.0.1

Synced CLI Semantics

Updated drrx/drrx.yaml:3 to align command behaviors with the spec: idempotent apply, explicit absent-state handling, prune mode, strictness, and snapshotting.
Key updates:
inject honors { state: absent }, does not prune unspecified nodes unless --prune, supports --strict, --dry-run, and --snapshot (see drrx/drrx.yaml:10–34).
list can diff desired vs. actual, output JSON (see drrx/drrx.yaml:35–46).
restore re-applies snapshot or Dr.Rx, removes nodes with absent state (see drrx/drrx.yaml:47–64).
del subcommands can mark nodes as { state: absent } via --mark (see drrx/drrx.yaml:67–82).
adddir/addfile respect quoting rules and set state/source annotations (see drrx/drrx.yaml:83–100).
Logging/audit clarified; quicksave writes AST snapshot JSON (see drrx/drrx.yaml:101–116).
AST JSON Schema

Added drrx/ast.schema.json defining a clean AST aligned with the formal grammar:
Root with children, per-node kind (dir|file), name, depth, position.
Flow flags (open, close, continue) preserved as observed; annotations object matches spec.
Optional path, and top-level warnings/errors diagnostics.
File: drrx/ast.schema.json:1
Rules Cheatsheet

Completed compact, ID-tagged cheatsheet for quick reference in drrx/drrx.md:309:
[RT.01] root rule; [SP.01]/[SP.02] indentation/align; [FW.01]/[FW.02] operators and flow; [NM.01]/[NM.02] naming/quoting; [WN.01] Windows names; [CM.01] comments; [AN.01] annotations; [VL.01]/[VL.02] validation; [EX.01]/[EX.02] execution/idempotence.
Parser Checklist

Added a minimal, actionable implementation checklist in drrx/drrx.md:328:
Lexing, root detection, tokenization (indent/flow/operator/name/annotations), stack-based tree build, validations, AST emission, reconciliation plan hints.
Notes

YAML aliases normalized for --all to not carry a placeholder (see drrx/drrx.yaml:20–22, drrx/drrx.yaml:54–56).
The AST schema is draft 2020-12; if you prefer an explicit version field (e.g., "1.0"), I can lock it and add examples.
Next Steps

## 0.0.2

Expanded and categorized with relevant IDs under Indentation, Flow_Operators, Operators, Names, Comments, Annotations, Validation, Execution.
Location: drrx/drrx.md:309 plus categorized block at drrx/drrx.md:327.
Example IDs: [SP.01–SP.04], [FW.01–FW.05], [RT.01], [DR.01], [FI.01], [NM.01–NM.04], [CM.01–CM.02], [AN.01–AN.02], [VL.01–VL.03], [EX.01–EX.04].
CLI Semantics Synced

Updated to match spec and execution semantics (state: absent drives removal; no prune unless requested; idempotent; strictness and snapshotting):
inject — drrx/drrx.yaml:10
list — drrx/drrx.yaml:35
restore — drrx/drrx.yaml:47
del (+ --mark) — drrx/drrx.yaml:67
adddir/addfile — drrx/drrx.yaml:83
quicksave — drrx/drrx.yaml:113
AST JSON Schema

New file drrx/ast.schema.json:1:
Root and node structure with kind (dir|file), name, depth, position, flow flags, annotations, children, optional path.
Top-level warnings/errors diagnostics.
Parser Checklist

Added a concise, stepwise checklist for implementation (lexing → root detection → tokenization → tree build → validation → AST emission → reconciliation).
Location: drrx/drrx.md:328.
Notes

## 0.0.3

Here’s what I did to centralize rules and reduce duplication, while keeping the syntax easy to learn and implement.

Rules Catalog

Created the authoritative rules file at drrx/rules.md:1.
Organized by categories with stable IDs and HTML anchors for deep links:
Indentation and Alignment: [SP.01]–[SP.04]
Flow Operators: [FW.01]–[FW.05]
Core Operators: [RT.01], [DR.01], [FI.01]
Names and Windows: [NM.01]–[NM.04], [WN.01]
Comments: [CM.01]–[CM.02]
Annotations: [AN.01]–[AN.02]
Validation: [VL.01]–[VL.03]
Execution: [EX.01]–[EX.04]
Each rule has a short description and rationale/notes where helpful, plus anchors like <a id="SP.01"></a> so links like rules.md#SP.01 work reliably.
Syntax Overview Polished

Renamed and used as the concise front door: drrx/syntax-overview.md.
Linked sections to the rules file to avoid repeating logic:
Dictionary headings now reference rules: see [RT.01], [DR.01], [FI.01] and [FW.], [NM.], [CM.*] (drrx/syntax-overview.md:STRUCTURE OPERATORS/FLOW OPERATORS/OTHER TOKENS).
Added a “RULES OVERVIEW” index that links directly to rules.md IDs for each category (drrx/syntax-overview.md: just above the “Complete Specification” section).
Kept core examples and the complete spec/grammar in the overview to support parser development, while referencing rules for authoritative definitions.
AST Schema and CLI

AST JSON Schema at drrx/ast.schema.json stays aligned with the grammar and rules; no change required for this task.
CLI semantics in drrx/drrx.yaml already synced with the rules (state: absent drives removal, prune only with flag, idempotence, strictness, snapshots).
What changed, exactly

drrx/rules.md:1: New, filled with categorized rules and anchors for deep linking.
drrx/syntax-overview.md:
STRUCTURE OPERATORS now links to [RT.01], [DR.01], [FI.01].
FLOW OPERATORS heading now links to [FW.*].
OTHER TOKENS links to [NM.], [CM.].
Added “RULES OVERVIEW” section that links out to all rule IDs instead of repeating the logic inline.
Notes

The overview still contains examples and the full “Complete Specification,” including formal grammar — this supports implementers without needing to jump back and forth constantly, while rules logic is centralized in rules.md.

## 0.0.4
