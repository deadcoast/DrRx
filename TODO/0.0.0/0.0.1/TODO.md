# Syntax Highlighting Integration — Complete Scope Tasklist

Goals
- Provide first-class UDL/grammar with validation for Dr.Rx syntax across major editors.
- Surface rule-tagged diagnostics (IDs from `drrx/rules.md`) with quick-fixes.
- Keep docs and schemas in lockstep with the highlighter/linter.

Deliverables
- VS Code extension (diagnostics engine)
- JetBrains (plugin or simple inspection profile, optional)
- CI validations and release packaging

Tasks
1) Token Spec and Scopes
   - Finalize tokens and scopes: `.` `--` `==` `+` `:` `|`, quoted names, inline comments `#...`, annotations `{ key: value; ... }`.
   - Map tokens to consistent scopes per editor (operators, names, comments, annotations, spacer lines).
   - Add normative references in `drrx/syntax-overview.md` when scopes change.

2) Grammar/Highlighter (VS Code/TextMate)
   - Author `syntaxes/drrx.tmLanguage.json`: patterns for operators, flow prefix, spacer-only `|`, quoted/unquoted names, annotations, comments.
   - Disallow tabs; flag invalid tokens; highlight misaligned `|` per SP.02.
   - Test on large fixtures; ensure performance and no catastrophic backtracking.

3) Diagnostics Engine (VS Code)
   - Implement structural pass (indent-based stack) to derive tree and validate rules:
     - Errors: SP.01, SP.02 (ambiguous), FW.06, FW.07, FW.08, FW.10, OR.02, VL.01.
     - Warnings: SP.03, FW.02, FW.03, FW.11, VL.02, VL.05, VL.07, WN.02.
   - Surface diagnostics with code = rule ID; link to `drrx/rules.md#<ID>`.
   - Provide quick fixes:
     - Insert spacer (`|`) (FW.06), insert/remove continuity `|` (FW.02/SP.03), regroup files/dirs (OR.02), fix operator spacing (SP.05), remove extra spacers (VL.07).

4) Fixtures and Tests
   - Use conformance fixtures:
     - `drrx/fixtures/conformance.tree.drrx` (baseline)
     - `drrx/fixtures/conformance-edge-cases.tree.drrx` (quoted names, spacer edges, grouping violations, missing spacers, reserved names)
   - Add golden snapshots for tokenization and diagnostics.
   - Add perf test on large synthetic trees; set baseline budgets.

5) Tooling and CI
   - Add npm scripts: `lint:drrx`, `validate:ast`, `validate:diff` (wrap AJV and diagnostics engine).
   - Integrate Makefile targets with npm (optional); run in CI on PRs.
   - Publish VS Code extension (marketplace metadata, versioning, changelog).

6) Documentation Sync
   - Update `drrx/syntax-overview.md` and `drrx/rules.md` on any token/rule changes resulting from highlighter feedback.
   - Keep `drrx/udl-validation-map.md` aligned with actual diagnostics severities.
   - Add a “Highlighter Support” section in README with install/use instructions.

Milestones
- M1: Token spec + basic highlighting
- M2: Diagnostics for hard errors (FW.06, OR.02, SP.01/02, FW.07/08/10)
- M3: Quick fixes and formatting assists (spacers, grouping, continuity bars)

- M4: Cross-editor coverage, perf baseline, CI gating

---
