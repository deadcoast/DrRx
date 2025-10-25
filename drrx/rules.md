# Dr.Rx Rules (Authoritative)

This document is the single source of truth for normative rules. It is designed for GitHub linking from `syntax-overview.md` and tooling. Links use stable anchors such as `rules.md#SP.01`.

Rule format:
- [TAG.ID] Title — Normative level (MUST/SHOULD/MAY)
  - Summary: one-sentence normative requirement.
  - Details: clarifying notes that do not redefine the rule.
  - Violations: error class and guidance.
  - References: cross-links to `syntax-overview.md` sections.

Index
- SP — Indentation & Alignment: [SP.01](#SP.01), [SP.02](#SP.02), [SP.03](#SP.03), [SP.04](#SP.04)
 - FW — Flow Markers: [FW.01](#FW.01), [FW.02](#FW.02), [FW.03](#FW.03), [FW.04](#FW.04), [FW.05](#FW.05), [FW.06](#FW.06), [FW.07](#FW.07), [FW.08](#FW.08), [FW.09](#FW.09), [FW.10](#FW.10), [FW.11](#FW.11)
- RT/DR/FI — Core Operators: [RT.01](#RT.01), [DR.01](#DR.01), [FI.01](#FI.01)
- NM/WN — Names & Windows: [NM.01](#NM.01), [NM.02](#NM.02), [NM.03](#NM.03), [NM.04](#NM.04), [WN.01](#WN.01)
- CM — Comments: [CM.01](#CM.01), [CM.02](#CM.02)
- AN — Annotations: [AN.01](#AN.01), [AN.02](#AN.02)
- VL — Validation: [VL.01](#VL.01), [VL.02](#VL.02), [VL.03](#VL.03)
- EX — Execution: [EX.01](#EX.01), [EX.02](#EX.02), [EX.03](#EX.03), [EX.04](#EX.04)
- OR — Ordering & Grouping: [OR.01](#OR.01), [OR.02](#OR.02), [OR.03](#OR.03), [OR.04](#OR.04)
 - SF — Source File: [SF.01](#SF.01), [SF.02](#SF.02)

---

## SP — Indentation & Alignment

<a id="SP.01"></a>
[SP.01] Two-space indentation (MUST)
- Summary: Each tree depth increases indentation by exactly two spaces; tabs are invalid.
- Details: The parser MUST treat tabs as a hard error in strict mode; tools MAY auto-convert tabs to spaces in non-strict modes.
- Violations: Hard error (see [VL.01](#VL.01)).
- References: syntax-overview.md §3 Flow and Indentation Rules.

<a id="SP.02"></a>
[SP.02] Child alignment to parent content column (MUST)
- Summary: The first visible token on a child line aligns with the column of the parent’s operator content (first `-` of `--` or first `=` of `==`).
- Details: This enforces visual and structural clarity across editors.
- Violations: Hard error if structure becomes ambiguous; otherwise warning.
- References: syntax-overview.md §3.

<a id="SP.03"></a>
[SP.03] Open-vein vertical bar on first child (MUST)
- Summary: If a parent line opens flow with `+`, the immediate child line at greater depth places a `|` aligned under the parent’s content column.
- Details: The `|` indicates continuation and separates subsequent siblings.
- Violations: Warning; indentation still determines structure (see [VL.03](#VL.03)).
- References: syntax-overview.md §3.

<a id="SP.04"></a>
[SP.04] Blank lines are structure-neutral (MAY)
- Summary: Blank lines MAY appear anywhere and do not affect tree structure.
- Details: Tools SHOULD preserve or normalize blank lines but MUST NOT change semantics.
- Violations: None.
- References: syntax-overview.md §1 Source File Structure.

---

## FW — Flow Markers

<a id="FW.01"></a>
[FW.01] Vein markers and branch control (MUST)
- Summary: Flow is depicted using `|` (continue), `+` (open), and `:` (close) before an operator.
- Details: These markers are present in the flow prefix; they MUST be interpreted as hints consistent with indentation.
- Violations: Inconsistencies are warnings; indentation is authoritative (see [VL.03](#VL.03)).
- References: syntax-overview.md §2 Line Forms, §3 Flow and Indentation Rules.

<a id="FW.02"></a>
[FW.02] Use `|` when siblings remain (SHOULD)
- Summary: At a given depth, a line SHOULD include `|` if another sibling appears later at that depth; omit if last.
- Details: Aids readability; does not change tree structure.
- Violations: Warning at most.
- References: syntax-overview.md §3.

<a id="FW.03"></a>
[FW.03] Use `+` when children follow (MUST)
- Summary: A node that will have children MUST use `+` in its flow prefix.
- Details: Signals that the immediate child at greater depth will place `|` (see [SP.03](#SP.03)).
- Violations: Warning; indentation still binds parent/child.
- References: syntax-overview.md §3.

<a id="FW.04"></a>
[FW.04] Use `:` when no children follow (SHOULD)
- Summary: A node with no children SHOULD use `:` to close its branch.
- Details: Improves clarity for leaf nodes, both files and directories.
- Violations: None or warning depending on strictness.
- References: syntax-overview.md §3.

<a id="FW.05"></a>
[FW.05] Vertical separation via `|` (SHOULD)
- Summary: Under an open vein, child lines SHOULD include `|` to visually separate directories and files and maintain continuity.
- Details: This mirrors the examples and Windows tree style for readability.
- Violations: Warning only.
- References: syntax-overview.md examples (DrRx Tree Syntax sample).

<a id="FW.06"></a>
[FW.06] File→Directory spacer bar (MUST)
- Summary: When a file at depth N is followed by a directory sibling at the same depth, insert a standalone `|` line at depth N to visually separate the file block from the upcoming directory block.
- Details: The spacer line contains only the properly aligned `|` (vein) and optional comment; it is semantically neutral (does not alter the tree) and improves scanability.
- Violations: Hard error if the spacer is missing when a file is immediately followed by a directory at the same depth. Formatters MAY auto-insert; linters MUST report.
- References: [syntax-overview.md §3 Flow and Indentation Rules](syntax-overview.md#3-flow-and-indentation-rules), [Conformance Examples](syntax-overview.md#10-conformance-examples).

<a id="FW.07"></a>
[FW.07] Exactly one branch marker per line (MUST)
- Summary: A line’s flow prefix MAY contain either `+` or `:` (mutually exclusive), optionally followed by `|` if siblings remain; multiple `+`/`:` markers on the same line are invalid.
- Details: The order is `[+|:]? '|'?` in the flow prefix; anything else is an error.
- Violations: Hard error.
- References: syntax-overview.md §2 Line Forms.

<a id="FW.08"></a>
[FW.08] Closed directory has no children (MUST)
- Summary: A directory declared with `:` MUST NOT have children.
- Details: If children are present at greater depth after a `:` directory line, this is invalid structure.
- Violations: Hard error.
- References: syntax-overview.md §3.

<a id="FW.09"></a>
[FW.09] Open directory must have children (SHOULD)
- Summary: A directory declared with `+` SHOULD be followed by at least one child line at greater depth.
- Details: If none is present, emit a warning for dangling open branch.
- Violations: Warning (see [VL.04](#VL.04)).
- References: [syntax-overview.md §3 Flow and Indentation Rules](syntax-overview.md#3-flow-and-indentation-rules).

<a id="FW.10"></a>
[FW.10] Files never have children (MUST)
- Summary: No node may appear at a greater depth as a child of a file.
- Details: `+` or `:` before a file indicates sibling continuity only; it does not imply children.
- Violations: Hard error if any node appears at depth N+1 directly under a file.
- References: syntax-overview.md §2, §3.

<a id="FW.11"></a>
[FW.11] Root-level continuity (SHOULD)
- Summary: At root depth, use `|` to indicate remaining root-level siblings; omit on last root item.
- Details: Mirrors the style used in examples to aid scanability.
- Violations: Warning at most.
- References: syntax-overview.md examples at top-level.

---

## RT/DR/FI — Core Operators

<a id="RT.01"></a>
[RT.01] Root line (MUST)
- Summary: The first non-empty, non-comment line MUST be a single `.`.
- Details: Only one root is allowed per file.
- Violations: Hard error (see [VL.01](#VL.01)).
- References: syntax-overview.md §1.

<a id="DR.01"></a>
[DR.01] Directory operator `--` (MUST)
- Summary: A directory line uses `--` followed by a name; optional trailing `/` is cosmetic.
- Details: Directory nodes may have children.
- Violations: Hard error if operator missing or name absent.
- References: syntax-overview.md §2.

<a id="FI.01"></a>
[FI.01] File operator `==` (MUST)
- Summary: A file line uses `==` followed by a name; files have no children.
- Details: Files may carry annotations for contents/source.
- Violations: Hard error if operator missing or name absent.
- References: syntax-overview.md §2.

---

## NM/WN — Names & Windows

<a id="NM.01"></a>
[NM.01] Unquoted names (MUST)
- Summary: Unquoted names match `[A-Za-z0-9._-]+`; spaces and `#` are not allowed.
- Details: Names MUST NOT begin with operator characters.
- Violations: Hard error.
- References: syntax-overview.md §2, §4.

<a id="NM.02"></a>
[NM.02] Quoted names and escapes (MUST)
- Summary: Use `"..."` for names with spaces/specials; escape `"` as `\"` inside.
- Details: `#` is literal inside quotes.
- Violations: Hard error on unbalanced quotes.
- References: syntax-overview.md §4.

<a id="NM.03"></a>
[NM.03] Trailing slash on directories (MAY)
- Summary: A trailing `/` after directory names is allowed and ignored semantically.
- Details: Tools MAY normalize by removing it on write.
- Violations: None.
- References: syntax-overview.md §2.

<a id="NM.04"></a>
[NM.04] Case-insensitive comparison on Windows (MUST)
- Summary: Name equality at the same depth is case-insensitive on Windows.
- Details: Duplicate detection MUST honor FS semantics.
- Violations: Hard error on duplicate siblings (see [VL.01](#VL.01)).
- References: syntax-overview.md §4.

<a id="WN.01"></a>
[WN.01] Windows reserved names and endings (MUST)
- Summary: Disallow reserved names (CON, PRN, AUX, NUL, COM1–9, LPT1–9) and names ending with dot or space.
- Details: Tools MAY auto-suggest quoting or mapping.
- Violations: Warning or error based on strictness.
- References: syntax-overview.md §4.

<a id="WN.02"></a>
[WN.02] Long paths and extended-length prefix (SHOULD)
- Summary: Implementations SHOULD support Windows extended-length paths via `\\\\?\\` to exceed MAX_PATH where the environment permits.
- Details: Authors SHOULD avoid designs that exceed 260 characters unless long paths are enabled; tools MAY warn when projected paths exceed limits.
- Violations: Warning; executor MAY fail at runtime if environment disallows long paths.
- References: syntax-overview.md §4 (Path length note).

---

## CM — Comments

<a id="CM.01"></a>
[CM.01] Comment start (MUST)
- Summary: `#` begins a comment unless inside a quoted name.
- Details: Comments extend to end-of-line.
- Violations: None.
- References: syntax-overview.md §5.

<a id="CM.02"></a>
[CM.02] Whitespace handling (SHOULD)
- Summary: Trailing spaces are ignored; comment-only lines are allowed.
- Details: Tools SHOULD trim trailing spaces.
- Violations: None.
- References: syntax-overview.md §5.

---

## AN — Annotations

<a id="AN.01"></a>
[AN.01] Annotation block (MAY)
- Summary: `{ key: value; ... }` MAY follow a name to attach metadata.
- Details: Keys are simple identifiers; values may be quoted or unquoted.
- Violations: Hard error on unbalanced braces.
- References: syntax-overview.md §6.

<a id="AN.02"></a>
[AN.02] Supported keys (SHOULD)
- Summary: Recognized keys include `state`, `source`, `mode`, `ignore`, `attrs`; unknown keys are preserved.
- Details: `state: present|absent`; `source: inline|template:<id>|url:https://...`.
- Violations: None (tooling-specific).
- References: syntax-overview.md §6; drrx.yaml semantics.

<a id="AN.03"></a>
[AN.03] Mode override semantics (MUST)
- Summary: When `mode: file|dir` is present, the declared kind MUST override implicit detection.
- Details: Use sparingly; intended for edge cases. Executors MUST treat mismatched declarations as an error if the FS state conflicts under strict mode.
- Violations: Hard error in strict mode; warning otherwise.
- References: syntax-overview.md §6.

<a id="AN.04"></a>
[AN.04] Ignore semantics (MUST)
- Summary: When `ignore: true` is present, the executor MUST NOT modify the corresponding FS node or its subtree during apply/restore.
- Details: Parsers still include the node in the AST; diff tools SHOULD display it as ignored.
- Violations: Warning if the executor would otherwise mutate; operations should be skipped.
- References: syntax-overview.md §6.

---

## VL — Validation

<a id="VL.01"></a>
[VL.01] Hard errors (MUST)
- Summary: Missing root; tabs; unknown operator; missing name; unbalanced quotes/braces; duplicate sibling (same kind).
- Details: Parsing MUST stop on hard errors in strict or default modes.
- Violations: Error; report position and code.
- References: syntax-overview.md §8; ast.schema.json diagnostics.

<a id="VL.02"></a>
[VL.02] Warnings (SHOULD)
- Summary: Flow/indent mismatch; inconsistent trailing `/`; reserved names.
- Details: Execution MAY proceed; log diagnostics.
- Violations: Warning.
- References: syntax-overview.md §8.

<a id="VL.03"></a>
[VL.03] Indentation is authoritative (MUST)
- Summary: When flow markers and indentation conflict, indentation determines structure; record a warning.
- Details: Prevents accidental structural changes due to styling.
- Violations: Warning; do not reflow tree.
- References: syntax-overview.md §3, §8.

<a id="VL.04"></a>
[VL.04] Dangling branch markers (SHOULD)
- Summary: A `+` with no deeper child or a `:` followed by deeper children MUST be flagged.
- Details: `+` without child is a warning; `:` with child is a hard error (see [FW.08](#FW.08)).
- Violations: Warning/Error as above.
- References: syntax-overview.md §3.

<a id="VL.05"></a>
[VL.05] Orphan spacer lines (SHOULD)
- Summary: A spacer `|` line with no subsequent directory sibling at the same depth SHOULD be flagged.
- Details: Allows formatters to clean up unnecessary spacers.
- Violations: Warning.
- References: syntax-overview.md §3 (spacer behavior).

<a id="VL.06"></a>
[VL.06] Grouping violations (MUST)
- Summary: Interleaving files and directories within a block violates [OR.02](#OR.02).
- Details: Files MUST be contiguous and precede directories, separated by a required spacer `|` line.
- Violations: Hard error.
- References: [syntax-overview.md Conformance Examples](syntax-overview.md#10-conformance-examples).

---

## EX — Execution

<a id="EX.01"></a>
[EX.01] Ensure present (MUST)
- Summary: Nodes without `state: absent` MUST be ensured present on apply/restore.
- Details: Create directories/files as needed.
- Violations: Report failures; do not silently skip.
- References: drrx.yaml `inject`, `restore`.

<a id="EX.02"></a>
[EX.02] Remove absent (MUST)
- Summary: Nodes with `state: absent` MUST be removed on apply/restore.
- Details: Applies to both files and directories; order respects dependencies.
- Violations: Report failure; continue if safe.
- References: drrx.yaml `inject`, `restore`.

<a id="EX.03"></a>
[EX.03] Do not prune unspecified (MUST NOT)
- Summary: Unspecified FS nodes MUST NOT be removed unless an explicit prune mode is enabled.
- Details: Use `--prune` to permit removal of undeclared nodes.
- Violations: Treat accidental prune as error.
- References: drrx.yaml `--prune`.

<a id="EX.04"></a>
[EX.04] Idempotent apply and dry-run (MUST)
- Summary: Repeated application MUST converge; `--dry-run` MUST not modify FS.
- Details: Snapshotting SHOULD capture the applied AST for audit.
- Violations: Error if side effects occur during dry-run.
- References: drrx.yaml `--dry-run`, `--snapshot`.

<a id="EX.05"></a>
[EX.05] File contents sourcing and defaults (SHOULD)
- Summary: Without a `source` annotation, executors SHOULD leave existing file contents unchanged; when creating a new file without `source`, create an empty file.
- Details: With `source`, executors SHOULD materialize contents from `inline`, `template:<id>`, or `url:` as configured.
- Violations: Warning if contents differ unexpectedly in strict content modes; otherwise informational.
- References: syntax-overview.md §9 (Execution Semantics: Files).

---

## OR — Ordering & Grouping

<a id="OR.01"></a>
[OR.01] Root files before directories (MUST)
- Summary: Files at root depth MUST appear before any directories and be contiguous after the root `.` line.
- Details: Matches examples where root config files lead before project folders.
- Violations: Warning or error depending on strictness.
- References: syntax-overview.md top example.

<a id="OR.02"></a>
[OR.02] Files before directories within a block (MUST)
- Summary: Within any directory’s children, list file nodes first, then insert a spacer `|` line, then list directory nodes.
- Details: Enhances scanability and keeps sibling types grouped; this ordering is required for conformance.
- Violations: Hard error (see [VL.06](#VL.06)).
- References: [syntax-overview.md Conformance Examples](syntax-overview.md#10-conformance-examples).

<a id="OR.03"></a>
[OR.03] Stable ordering among files/dirs (SHOULD)
- Summary: Maintain a stable sort order for files (e.g., lexicographic) and directories within their groups.
- Details: Tooling MAY auto-sort in format mode.
- Violations: None; policy-dependent warning.
- References: syntax-overview.md examples imply alphabetical order.

<a id="OR.04"></a>
[OR.04] Contiguous root files block (MUST)
- Summary: Root-level files MUST be a single contiguous block directly under the root before any spacer or directory entries.
- Details: Avoids ambiguous reading and matches implementation assumptions.
- Violations: Hard error in strict mode; warning otherwise.
- References: syntax-overview.md top example.

---

## SF — Source File

<a id="SF.01"></a>
[SF.01] Encoding and line endings (MUST)
- Summary: Source files MUST be UTF-8 encoded; both CRLF and LF line endings are accepted and normalized during parsing.
- Details: Mixed line endings SHOULD be normalized; BOM is discouraged.
- Violations: Warning if non-UTF-8 or mixed endings detected; error in strict mode.
- References: syntax-overview.md §1 Source File Structure.

<a id="SF.02"></a>
[SF.02] Inline comments and blanks (MUST)
- Summary: Inline comments beginning with `#` (outside quoted names) and blank lines MAY appear anywhere and MUST NOT affect structure.
- Details: Comments extend to end-of-line; trailing spaces are ignored (see [CM.02](#CM.02)).
- Violations: None.
- References: syntax-overview.md §1, §5.

References
- Full syntax and grammar: `drrx/syntax-overview.md`
- CLI behavior: `drrx/drrx.yaml`
