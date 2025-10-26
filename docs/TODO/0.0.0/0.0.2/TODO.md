# TODO - 0.1.0

- M4: Cross-editor coverage, perf baseline, CI gating

---

Validation Status (2025-10-25)

1) Token Spec and Scopes: COMPLETE (VS Code)
   - VS Code token scopes defined in `editors/vscode/syntaxes/drrx.tmLanguage.json`.
   - Normative scope mapping captured in `drrx/syntax-overview.md` (update as scopes change).
2) Grammar/Highlighter (VS Code): PARTIAL
   - Grammar covers core tokens and spacer lines; additional profiling on very large trees and guardrails for misaligned `|` remain TODO.
3) Diagnostics Engine (VS Code): PARTIAL
   - Current rules: SP.01, SP.02, SP.05, SP.06; FW.02, FW.06, FW.07, FW.08, FW.10, FW.12, FW.14; OR.01, OR.02, OR.04; VL.02, VL.07; NM.05.
   - Quick-fixes delivered: FW.06 (insert spacer), OR.02 (regroup block), SP.05 (normalize operator spacing), VL.07 (remove extra spacer), FW.02/SP.03 (insert continuity bar), VL.02 (remove stray continuity bar). Normalisation scenarios still outstanding.
4) Fixtures and Tests: COMPLETE
   - Diagnostics goldens under `test/golden/`, token goldens under `test/token-golden/`, perf baseline documented in `test/perf/README.md`.
5) Tooling and CI: PARTIAL
   - `npm test` + schema validation run in CI; VSIX packaging attached on tags. Marketplace publishing and stricter PR gating still pending.
6) Documentation Sync: PARTIAL
   - README now documents highlighter support; continue keeping `drrx/udl-validation-map.md` and examples aligned with engine behavior.

Plan for Remaining Items
- Token Spec and Scopes
  - Sweep `drrx/syntax-overview.md` and add a short "Token Scopes" subsection aligning names to TextMate scopes; link to rules where needed.
- Grammar/Highlighter (VS Code)
  - Add a perf note and run a large file smoke test; document any patterns tightened to avoid backtracking in `editors/vscode/README.md`.
- Diagnostics Engine
  - Follow up with continuity normalisation flows and cover remaining warnings (FW.03, FW.11) with actionable guidance.
- Fixtures and Tests
  - Add tokenization snapshots: `test/token-golden/*.json` produced by a simple tokenizer pass for representative fixtures.
  - Add a perf harness (Node) to time lint over a synthetic 50k-line .drrx and record baseline in `test/perf/README.md`.
- Tooling and CI
  - Add GitHub Actions workflow: run `npm ci`, `npm run test`, `npm run validate:all` on PRs; upload goldens as artifacts on failure.
  - Add `editors/vscode` packaging job (tagged releases only) with `vsce package` and build artifact.
- Documentation Sync
  - Add a "Highlighter Support" section to root `README.md` (install from VSIX, diagnostics settings, quick-fixes list).
  - Keep `drrx/udl-validation-map.md` severities aligned with current engine defaults and document overrides via `drrx.severityOverrides`.

Remaining Focus
- Harden VS Code grammar against misalignment edge cases and profile on large fixtures.
- Extend diagnostics quick-fixes to handle continuity normalisation and remaining warnings.
- Add regression fixtures for new rules before broadening diagnostics coverage.
- Tighten CI gating (mark golden drift as failures, prep marketplace publishing when ready).

Completion Criteria to Flip to COMPLETE
- All quick-fixes listed present and idempotent; tests green.
- Tokenization goldens maintained; perf baseline updated when rules evolve.
- CI workflow running on PR with schema/diagnostics checks and failing on drift.
