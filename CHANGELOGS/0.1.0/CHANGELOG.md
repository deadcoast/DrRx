# CHANGELOG - 0.1.0

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

What I added

AST example + validation

Added a worked AST JSON from your “Example DrRx Tree Syntax”
drrx/examples/ast-example.json
Validate locally:
Node (AJV): npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json
Python (jsonschema): python -m jsonschema -i drrx/examples/ast-example.json drrx/ast.schema.json
Schemas + README

Annotations schema: drrx/annotations.schema.json
List --diff schema: drrx/list-diff.schema.json
Schemas README with pointers, validation commands, and a sample list --diff JSON:
drrx/schemas/README.md
Rules changes (severity and back-links)

WN.02 (long path support): added and linked from overview (syntax-overview.md: path length bullet now references WN.02)
FW.06 (file→dir spacer) is now a hard error if missing; added explicit back-links to overview:
drrx/rules.md: FW.06 references “Flow and Indentation Rules” and “Conformance Examples”
OR.02 (files-then-spacer-then-dirs) upgraded to MUST; VL.06 adjusted to error
Added direct section links in rules.md wherever helpful
UDL Validation Map

One-pager mapping rule IDs to editor diagnostics:
drrx/udl-validation-map.md
Errors include: SP.01, SP.02 (ambiguous), FW.06, FW.07, FW.08, FW.10, VL.01, OR.02
Warnings include: SP.03, FW.02, FW.03, FW.11, VL.02, VL.05, WN.02
CLI doc tweak for JSON output

Updated list command to reference the new list-diff schema and mention --json output:
drrx/drrx.yaml: list → “Supports --json output (see drrx/list-diff.schema.json)”
Root README

README.md with a clear summary, why it helps, how it works, medium-sized correct syntax example, usage with CLI, and validation commands.
Key links and anchors maintained

Overview references:
File→Directory spacer documented and linked to [FW.06].
Grouping convention (files first, spacer, then dirs) linked to [OR.02].
Path length references [WN.02].
Formal grammar accepts flow_spacer lines; parser checklist mentions skipping them.
Rules back-links to overview:
FW.06, FW.09, OR.02, VL.* now point to named sections and examples in syntax-overview.md using GitHub anchors.
Commands you can run locally

Validate AST example against schema:
Node: npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json
Python: python -m jsonschema -i drrx/examples/ast-example.json drrx/ast.schema.json
Validate list --diff JSON:
npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d path/to/list-diff.json
Files touched

Added: README.md
Added: drrx/examples/ast-example.json
Added: drrx/annotations.schema.json
Added: drrx/list-diff.schema.json
Added: drrx/schemas/README.md
Added: drrx/udl-validation-map.md
Updated: drrx/drrx.yaml (list --json reference)
Updated: drrx/syntax-overview.md (WN.02 reference, spacer/grouping notes already present)
Updated: drrx/rules.md (severity flips, back-links, FW.*and OR.* expansions)

In the README example, the line “| +-- features/” should be “| :-- features/” because the features directory is the last sibling at that depth under src, even though it has children. I fixed README.md accordingly.

Important: I also corrected our formal semantics to match your design — “+” and “:” control sibling continuity (open/close vein) at the current depth; they do not prohibit or imply children. Specifically:

“+” means more siblings will follow at the same depth later.
“:” means no more siblings at that depth will follow after this node’s subtree.
Whether a node has children is determined by indentation and subsequent lines, not by “+”/“:”.
What I updated to align with your syntax

README example fix

README.md: replaced “| +-- features/” with “| :-- features/”.
Rules (normative) adjusted and expanded

FW.04 now states “Use ‘:’ when no more siblings follow” (not “no children”).
FW.08 now states “Closed branch correctness” (no later siblings at same depth after a ‘:’ branch; children are allowed).
New rules that make UDL operational and unambiguous:
SP.05 Single-space operator separation (exactly one space after “--”/“==”)
SP.06 No indentation on root line (“.” must be at column 1)
FW.12 No flow markers on the root line
FW.13 File branch markers control siblings only; files never have children
FW.14 Flow markers limited to prefix or standalone “|” lines (not after name)
FW.15 Spacer lines carry no annotations (only optional comments)
VL.07 Excessive spacer lines (warn on consecutive spacers)
Severity updates requested earlier remain:
FW.06 File→Directory spacer is a Hard error when missing.
OR.02 Files-then-spacer-then-dirs is MUST; VL.06 grouping violations are Hard errors.
Back-links in rules to overview sections to aid navigation are present.
Overview (syntax-overview.md) aligned

Flow operators dictionary for “:” updated: “Closes sibling continuity at the current depth; children allowed.”
§3 “Closing flow” updated to sibling semantics; files’ “+”/“:” control only sibling continuity.
Path-length bullet links to [WN.02] in rules.
Grammar supports spacer-only “|” lines (semantically neutral).
Additional rules now defined (operationally important)

Structural and tokenization

SP.05: exactly one space after operator before the name.
SP.06: root “.” has no indentation.
FW.12: no flow markers on the root line.
FW.14: “| + :” only in prefix or as a pure spacer line.
FW.15: spacer line cannot carry annotations (comment allowed).
Continuity and grouping

FW.13: “+”/“:” on files affect sibling continuity only (files never have children).
FW.06 (MUST): spacer “|” is required between file group and following directory group at same depth.
OR.02 (MUST): within a block, files must be contiguous and precede directories with a spacer in between.
VL.07: warn on consecutive spacers.
Windows semantics

WN.02 (SHOULD): long-path support with \?; warn when projected paths exceed limits.
Annotations + execution

AN.03 (MUST): mode: file|dir overrides implicit detection (strict handling).
AN.04 (MUST): ignore: true means executor doesn’t modify the node/subtree.
EX.05 (SHOULD): file content defaults; no source → preserve if exists, empty on new; with source → materialize.

## 0.0.9

Correction: in the README medium example the line “| +-- features/” must be “| :-- features/” because features is the last sibling at that depth. I fixed README.md accordingly and aligned the formal rule: “+”/“:” control sibling continuity, not whether a node has children.

What I added and updated

Conformance fixtures

drrx/fixtures/conformance.tree.drrx: Working-scope .drrx syntax fixture that adheres to strict rules (files-then-spacer-then-dirs, required spacers, correct +/: usage).
drrx/fixtures/conformance.list-diff.json: Seed “list --diff” JSON aligned to drrx/list-diff.schema.json for tests.
Validation targets

Makefile: validate-ast, validate-diff, validate-all targets using AJV (npx ajv). This streamlines local schema checks.
Rules (new and revised)

FW.04 now defines “:” as closing sibling continuity at the current depth (children are allowed).
FW.08 now prohibits more siblings at the same depth after a “:” branch; children under that node are fine.
SP.05 Single-space operator separation (MUST) — exactly one space after “--”/“==”.
SP.06 No indentation on root line (MUST).
FW.12 No flow markers on the root line (MUST).
FW.13 File branch markers control siblings; files never have children (MUST).
FW.14 Flow markers limited to prefix or standalone “|” (MUST).
FW.15 Spacer lines carry no annotations (MUST).
VL.07 Excessive spacer lines (warn).
NM.05 Directory trailing slash equivalence (SHOULD) — comparisons ignore a trailing “/”; warn on mixed use; formatters may normalize.
Overview and schema alignment

drrx/syntax-overview.md: Updated “:” semantics in both the dictionary and §3 “Flow and Indentation Rules,” and clarified the minimal example comments (“no further siblings”).
drrx/ast.schema.json: Updated flow flags descriptions
open: “open vein; first child places a ‘|’”
close: “close sibling continuity at this depth”
Overview still references [WN.02] (long paths), [FW.06] (spacer rule), and [OR.02] (grouping).
Schemas and CLI

drrx/annotations.schema.json (already added), drrx/list-diff.schema.json (already added).
drrx/schemas/README.md has validation commands and a sample list --diff document.
drrx/drrx.yaml: list command now references the JSON output schema.
Run local validations

Validate AST example:
npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json
Validate list --diff:
npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d drrx/fixtures/conformance.list-diff.json
Or use Make:
make validate-ast
make validate-diff
make validate-all
Swept and corrected “:” semantics

Updated core dictionary and §3 flow rules to state “:” closes sibling continuity, not children.
Adjusted schema and a minimal example comment to avoid implying “:” forbids children.
Kept needed mentions of “files have no children” and “dangling + with no children” as they are correct in context.
NM.05 added and usage consistency

Rule added: trailing slash is cosmetic; comparisons ignore it; warn on mixed use at same path.
Current fixtures/examples use trailing slashes consistently on directories. If you want hard normalization (always strip or always keep “/”), I can add a formatter guideline.

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
TODO: Syntax Highlighting scope plan

TODO.md
Complete tasklist for:
Token scopes, tmLanguage (VS Code), diagnostics engine mapping rules to IDs
Notepad++ UDL definition
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
Token and scope mapping, TextMate grammar work, diagnostics engine (rule-to-diagnostic mappings), quick-fixes, Notepad++ UDL, optional Sublime/JetBrains support, fixtures/golden tests, perf baselines, CI gating, doc sync.
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
Token scopes, tmLanguage, diagnostics engine mapping rule IDs (errors vs warnings), quick-fixes (insert spacer FW.06, regroup OR.02, fix spacing SP.05, etc.), Notepad++ UDL, optional Sublime/JetBrains, fixtures/golden tests, perf gate, CI gating, docs sync.
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
