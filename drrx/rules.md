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
- FW — Flow Markers: [FW.01](#FW.01), [FW.02](#FW.02), [FW.03](#FW.03), [FW.04](#FW.04), [FW.05](#FW.05)
- RT/DR/FI — Core Operators: [RT.01](#RT.01), [DR.01](#DR.01), [FI.01](#FI.01)
- NM/WN — Names & Windows: [NM.01](#NM.01), [NM.02](#NM.02), [NM.03](#NM.03), [NM.04](#NM.04), [WN.01](#WN.01)
- CM — Comments: [CM.01](#CM.01), [CM.02](#CM.02)
- AN — Annotations: [AN.01](#AN.01), [AN.02](#AN.02)
- VL — Validation: [VL.01](#VL.01), [VL.02](#VL.02), [VL.03](#VL.03)
- EX — Execution: [EX.01](#EX.01), [EX.02](#EX.02), [EX.03](#EX.03), [EX.04](#EX.04)

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

---

References
- Full syntax and grammar: `drrx/syntax-overview.md`
- CLI behavior: `drrx/drrx.yaml`
