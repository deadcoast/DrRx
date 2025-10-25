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

Centralize rules and reduce duplication, while keeping the syntax easy to learn and implement.

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

Redesigned rules.md into a clean, normative rule catalog with stable tags and rewired syntax-overview.md to link to it using GitHub-friendly anchors.

What Changed

Rewrote rules.md with a standard structure and non-duplicative content.

Clear categories with stable IDs and anchors: SP, FW, RT/DR/FI, NM/WN, CM, AN, VL, EX.
Each rule now has: title + normative level, summary, details, violations, references.
Added a compact index at the top so links like rules.md#SP.01 work.
Kept only normative content here; examples/grammar stay in syntax-overview.md.
Simplified syntax-overview.md cheat sheet into link-only quick links.

Replaced the categorized list with a minimal links block to rules.md (no duplication).
Existing dictionary sections now point to rules (STRUCTURE OPERATORS → RT/DR/FI; FLOW OPERATORS → FW; OTHER TOKENS → NM/CM).
Files Updated

drrx/rules.md:1
New layout, standardized tags, preserved IDs:
Indentation & Alignment: [SP.01] two-space depth; [SP.02] child alignment; [SP.03] first-child ‘|’ under open vein; [SP.04] blank lines.
Flow: [FW.01] vein tokens | + :; [FW.02] | when siblings remain; [FW.03] + when children follow; [FW.04] : when no children; [FW.05] visual separation via |.
Operators: [RT.01] root .; [DR.01] directory --; [FI.01] file ==.
Names/Windows: [NM.01–NM.04], [WN.01].
Comments: [CM.01–CM.02].
Annotations: [AN.01–AN.02].
Validation: [VL.01–VL.03].
Execution: [EX.01–EX.04].
drrx/syntax-overview.md:272
“RULES CHEATSHEET” now shows link-only quick links to rules.md.
Earlier dictionary headings link to rules: STRUCTURE OPERATORS → [RT.01]/[DR.01]/[FI.01]; FLOW OPERATORS → [FW.]; OTHER TOKENS → [NM.]/[CM.*].
Linking and GitHub Anchors

Every rule has an explicit anchor, e.g., <a id="SP.01"></a> so links rules.md#SP.01 resolve on GitHub.
All quick links in syntax-overview.md point to existing anchors (verified for SP, FW, RT/DR/FI, NM/WN, CM, AN, VL, EX).
Why this fixes the confusion

Deduplicates logic: syntax-overview.md holds the narrative, examples, and grammar; rules.md holds only normative, enforceable rules.
Stable, predictable tagging (TAG.ID) and a clear rule “card” structure make it easy to implement in parser, linter, and CLI.
If you want, I can:

## 0.0.5

What changed

Added a new MUST rule for file→directory spacer lines:
rules.md: [FW.06] (drrx/rules.md:82)
Summary: when a file at depth N is followed by a directory sibling at depth N, insert a standalone | line at depth N to visually separate file and directory blocks. Semantically neutral; parsers accept/ignore it structurally.
Extended the overview to define and exemplify spacer lines:
Dictionary → FLOW OPERATORS: explicitly documents spacer usage with an example (drrx/syntax-overview.md:11–16, and new bullet immediately after).
Flow rules (§3): adds the spacer requirement and clarifies it is semantically neutral (drrx/syntax-overview.md:170–176).
Conformance examples: added both spacer examples you provided (drrx/syntax-overview.md:296–317).
Updated the formal grammar to accept spacer-only lines:
New production flow_spacer and spacer_prefix; these lines are semantically neutral (drrx/syntax-overview.md:214–233).
Parser checklist: added instruction to recognize and skip spacer-only | lines (drrx/syntax-overview.md:361).
UDL hints: note to highlight standalone | spacer lines (drrx/syntax-overview.md:340–344).
Key rule additions and links

[FW.06] File→Directory spacer bar (MUST): drrx/rules.md:82
Overview flow rules reference: drrx/syntax-overview.md:170–176
Spacer documented in dictionary: drrx/syntax-overview.md:11–16 (with new bullet and example directly under FLOW OPERATORS)
Grammar support for spacer-only lines: drrx/syntax-overview.md:214–233
Conformance examples with spacers:
mockup-directory example: drrx/syntax-overview.md:120–132
08-reference / 09-test-and-quality example: drrx/syntax-overview.md:304–317
Rationale

The spacer rule reduces visual clutter and gives breathing room between files and folders without changing structure.
By making spacers semantically neutral and adding them to the grammar, your DSL stays strict while enabling a clean layout editors can lint/format.

## 0.0.6

Added a lot more normative rules beyond the single spacer item, so the UDL/editor and parser have clear, enforceable guidance. I also wired the links so GitHub anchors resolve cleanly.

What I added and where

New ordering/grouping rules (OR.*)

OR.01 Root files before directories (MUST)
OR.02 Files before directories within a block; spacer line in between (SHOULD)
OR.03 Stable ordering among files/dirs (SHOULD)
OR.04 Contiguous root files block before any directories (MUST)
File: drrx/rules.md:OR.01–OR.04
Expanded flow rules (FW.*)

FW.06 File→Directory spacer bar (MUST) — already added, kept as MUST
FW.07 Exactly one branch marker per line; ‘+’ and ‘:’ mutually exclusive (MUST)
FW.08 Closed directory (‘:’) has no children (MUST)
FW.09 Open directory (‘+’) should have children (SHOULD)
FW.10 Files never have children; ‘+’/‘:’ on files control sibling continuity only (MUST)
FW.11 Root-level continuity via ‘|’ is stylistic (SHOULD)
File: drrx/rules.md:FW.06–FW.11
Additional validations (VL.*)

VL.04 Dangling branch markers: ‘+’ with no child = warning; ‘:’ with children = error
VL.05 Orphan spacer ‘|’ when no following directory sibling = warning
VL.06 Grouping violations (files interleaved with dirs when policy enforces OR.02) = warning
File: drrx/rules.md:VL.04–VL.06
Overview updated to reflect and reference rules

Dictionary headers now link to rules
STRUCTURE OPERATORS → [RT.01], [DR.01], [FI.01]
FLOW OPERATORS → [FW.*] + explicit “Grouping convention” note linking to [OR.02]
OTHER TOKENS → [NM.], [CM.]
File: drrx/syntax-overview.md:5, 11, 17
Flow section (§3) adds the spacer semantics (neutral to structure; parsers MUST accept/ignore structurally) and references [FW.06]
File: drrx/syntax-overview.md:170–176
Formal grammar now accepts standalone spacer ‘|’ lines
Added productions flow_spacer and spacer_prefix; they do not yield nodes
File: drrx/syntax-overview.md:214–233
Parser checklist updated to explicitly ignore spacer lines and to warn on grouping/flow issues
File: drrx/syntax-overview.md:359–361 (recognize spacer), 367–368 (new warnings)
Conformance examples include your provided spacer examples
File→Directory spacer examples inserted
File: drrx/syntax-overview.md:304–317
How this supports UDL and the application

Clear structural vs. stylistic separation:
Structural MUSTs: indentation, operator use, no children under files, closed dir cannot have children, root file ordering.
Stylistic SHOULDs: show ‘|’ when siblings remain, use spacer lines, group files before directories, maintain stable sort.
Grammar explicitly models spacer lines so a highlighter and parser treat them correctly.
Validation rules tell an editor/linter what to flag as error vs. warning, enabling formatting assists (auto-inserting/cleaning spacers, prompting when ‘+’ lacks children, etc.).
Links preserved (GitHub anchors)

rules.md uses explicit anchors like <a id="FW.06"></a>, so links rules.md#FW.06 resolve on GitHub.
syntax-overview.md now links to those anchors in the dictionary and flow sections.

## 0.0.7

Missing or under-specified areas I identified

Source file properties
Encoding and line endings acceptance/normalization are stated in the overview but had no tagged rule.
Inline comments and blank lines behavior is defined in the overview but not tagged beyond CM.*.
Windows long paths
Path length and extended-length prefix are mentioned in the overview but weren’t codified with a rule/ID.
Annotations semantics (beyond “keys exist”)
mode override behavior (when to trust mode vs implicit type).
ignore semantics (parser vs executor behavior).
File content defaults
Without source annotation, behavior for existing vs. newly created files was stated in the overview but not tagged.
New rules added to rules.md

SF — Source File
[SF.01] Encoding and line endings (MUST): UTF-8; CRLF/LF accepted and normalized. drrx/rules.md:SF.01
[SF.02] Inline comments and blanks (MUST): Comment/blank lines must not affect structure. drrx/rules.md:SF.02
WN — Windows
[WN.02] Long paths and extended-length prefix (SHOULD): Support \?\ where permitted; warn for projected long paths. drrx/rules.md:WN.02
AN — Annotations
[AN.03] Mode override semantics (MUST): mode: file|dir overrides implicit detection; conflict handling. drrx/rules.md:AN.03
[AN.04] Ignore semantics (MUST): ignore: true is parsed but executor must not modify the node/subtree. drrx/rules.md:AN.04
EX — Execution
[EX.05] File contents sourcing and defaults (SHOULD): No source → leave existing content; create empty on new files. With source → materialize. drrx/rules.md:EX.05
Already present and mapped

Indentation and alignment: [SP.01]–[SP.04]
Flow markers and structure: [FW.01]–[FW.05], plus new
[FW.06] File→Directory spacer (MUST)
[FW.07] Exactly one branch marker per line (MUST)
[FW.08] Closed directory has no children (MUST)
[FW.09] Open directory should have children (SHOULD)
[FW.10] Files never have children (MUST)
[FW.11] Root-level continuity (SHOULD)
Operators: [RT.01], [DR.01], [FI.01]
Names/Windows: [NM.01]–[NM.04], [WN.01], now [WN.02]
Comments: [CM.01], [CM.02]
Annotations: [AN.01], [AN.02], now [AN.03], [AN.04]
Validation: [VL.01]–[VL.03], plus
[VL.04] Dangling branch markers
[VL.05] Orphan spacer lines
[VL.06] Grouping violations
Execution: [EX.01]–[EX.04], now [EX.05]
Ordering/Grouping: [OR.01]–[OR.04]
Where the overview was updated to reflect rules

Flow operators dictionary now references the File→Directory spacer and grouping convention (links to FW.06 and OR.02).
Flow and Indentation Rules (§3) explicitly define spacer semantics as neutral and required for readability.
Formal Grammar accepts spacer-only lines (flow_spacer).
Parser Checklist calls out ignoring spacer-only lines and warns for grouping/flow anomalies.

## 0.0.7

Changes made

Rules

New categories and rules added to close gaps:
SF — Source File: SF.01 (encoding/line endings), SF.02 (comments/blanks are structure-neutral)
WN — Windows: WN.02 (long paths via \?)
AN — Annotations: AN.03 (mode override semantics), AN.04 (ignore semantics)
EX — Execution: EX.05 (file content sourcing/defaults)
Flow/ordering severity updates:
FW.06 (file→dir spacer) changed to Hard error when missing; linked to overview sections
OR.02 (files-then-spacer-then-dirs) upgraded to MUST; VL.06 now Hard error when interleaved
Added FW.07 (single branch marker per line), FW.08 (closed dir has no children), FW.09 (open dir should have children), FW.10 (files never have children), FW.11 (root continuity style)
Back-links inserted from rules to overview anchors where useful
Examples: syntax-overview.md#3-flow-and-indentation-rules, #10-conformance-examples
File: drrx/rules.md
Overview

Linked overview bullets to new rules
Path length bullet now references [WN.02]
OTHER TOKENS header includes [WN.02]
FLOW OPERATORS and §3 already reference [FW.06] and grouping [OR.02]
Formal grammar extended to support spacer-only lines (flow_spacer)
Conformance examples include your spacer examples
Parser checklist mentions skipping spacer-only lines and expands warning classes
File: drrx/syntax-overview.md
Schemas and examples

AST example (worked) from “Example DrRx Tree Syntax”:
File: drrx/examples/ast-example.json
Matches ast.schema.json (root, nodes, depths, positions, flow flags, children). You can validate with any JSON Schema validator compatible with draft 2020-12.
Annotations JSON Schema:
File: drrx/annotations.schema.json
Defines state/source/mode/ignore/attrs
List --diff JSON Schema:
File: drrx/list-diff.schema.json
Entries contain path, kind, status, desired (with annotations), actual fs attributes, and diff
CLI docs updated to mention the --json format and schema:
drrx/drrx.yaml: list command description and --json option reference list-diff.schema.json
UDL Validation Map

New one-page mapping of rule IDs to diagnostics severity for editor tooling:
Errors: SP.01, SP.02 (ambiguous), FW.06, FW.07, FW.08, FW.10, VL.01, OR.02
Warnings: SP.03, FW.02, FW.03, FW.11, VL.02, VL.05, WN.02
Infos: OR.03, EX.05
File: drrx/udl-validation-map.md
Notes on linking

GitHub-style anchors are used consistently:
In rules.md we added explicit <a id="..."> anchors for each rule.
In syntax-overview.md we link to those anchors (e.g., rules.md#WN.02, rules.md#FW.06).
References in rules now point to overview section anchors (e.g., syntax-overview.md#3-flow-and-indentation-rules).
Validation guidance

Missing spacer between file and following directory at the same depth is now a hard error (FW.06).
Grouping (OR.02) is mandatory: files must be contiguous, followed by a spacer ‘|’, then directories; violations are errors (VL.06).
Spacer-only lines are semantically neutral and supported by the grammar; parsers should not emit AST nodes for them but should include diagnostics when orphaned (VL.05).

## 0.0.8
