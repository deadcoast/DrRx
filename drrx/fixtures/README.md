# Directory Remendy - Dr.Rx - Fixtures

This directory contains working-scope fixtures for conformance and diagnostics. Invalid fixtures include inline comments with expected rule IDs.

Negative fixtures map

| File | Expected rule(s) | Rationale |
| -    | -                | -         |
| invalid-missing-spacer.tree.drrx    | FW.06        | Directory sibling follows file block at same depth without a spacer (`\|`) line. |
| invalid-grouping.tree.drrx          | OR.02        | Directory appears before files within a block; files must precede directories with a spacer. |
| invalid-multi-branch.tree.drrx      | FW.07        | Multiple branch markers (`+` and `:`) used on same line. |
| invalid-tabs.tree.drrx              | SP.01, SP.06 | Tabs are disallowed; root must start at column 1. |
| invalid-marker-after-name.tree.drrx | FW.14        | Flow marker `\|` appears after operator/name; markers allowed only in prefix or as standalone spacer. |
| invalid-root-flow.tree.drrx         | FW.12        | Root line may not include flow markers. |
| invalid-root-indented.tree.drrx     | SP.06        | Root `.` must be at column 1 with no indentation. |
| invalid-file-has-child.tree.drrx    | FW.10        | Files never have children; increased indentation after a file is invalid. |
| invalid-orphan-spacers.tree.drrx    | VL.07, FW.06 | Consecutive spacers (excess) and spacer preceding a file rather than a directory block. |

Positive fixtures

- conformance.tree.drrx — Baseline strict structure (grouping, required spacers, continuity) and children under `:` branches.
- conformance-edge-cases.tree.drrx — Quoted names/escapes, reserved names, spacer edges, and a violations section for quick-fix flows.
