# UDL Validation Map

This map ties rule IDs to suggested editor diagnostics. Use it to drive linting and live highlighting.

- Errors
  - [SP.01] Two-space indentation
  - [SP.02] Child alignment to parent content column (when structure ambiguous)
  - [FW.06] Missing File→Directory spacer bar
  - [FW.07] Multiple branch markers on one line
  - [FW.08] Closed directory has children
  - [FW.10] Files never have children
  - [VL.01] Core parse errors (unknown operator, missing name, tabs, unbalanced quotes/braces, duplicate sibling)
  - [OR.02] Files before directories within a block (enforced)

- Warnings
  - [SP.03] First-child bar under open vein missing
  - [FW.02] Missing `|` when siblings remain
  - [FW.03] Open directory with no children (dangling)
  - [FW.11] Root-level continuity style
  - [VL.02] Flow/indent mismatch; inconsistent trailing `/`; reserved names
  - [VL.05] Orphan spacer bar
  - [WN.02] Long path projection exceeds limits

- Infos (optional)
  - [OR.03] Stable ordering among files/dirs
  - [EX.05] File content defaults and sourcing behavior

Implementation notes
- Flow spacer bars (`|`) are semantically neutral; parsers should accept them without yielding AST nodes.
- Indentation is authoritative when markers conflict; emit a warning but do not change the derived structure ([VL.03]).
- Provide quick-fix code actions: insert spacer bar ([FW.06]), group files then dirs ([OR.02]), insert/remove `|` for continuity ([FW.02], [SP.03]).

