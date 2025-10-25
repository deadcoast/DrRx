# TODO - 0.1.0

- M4: Cross-editor coverage, perf baseline, CI gating

---

Validation Status (2025-10-25)

1) Token Spec and Scopes: IN PROGRESS
   - VS Code token scopes defined in `editors/vscode/syntaxes/drrx.tmLanguage.json` (complete for VS Code).
   - Normative references in `drrx/syntax-overview.md` pending review/updates when scopes change.
2) Grammar/Highlighter (VS Code/TextMate): PARTIAL
   - Grammar exists and highlights core tokens; tabs are enforced via diagnostics, not grammar; misaligned `|` flagged by diagnostics (SP.02), not grammar.
   - Large-fixture perf pass not yet run/documented.
3) Diagnostics Engine (VS Code): PARTIAL
   - Implemented rules: SP.01, SP.02, SP.05, SP.06; FW.06, FW.07, FW.08, FW.10, FW.12, FW.14; OR.01, OR.02, OR.04; VL.02, VL.07; NM.05; links to `rules.md` active.
   - Quick-fixes implemented: FW.06 (insert spacer), OR.02 (comprehensive regroup), SP.05 (normalize operator spacing), VL.07 (remove extra spacer).
   - Missing quick-fixes: continuity insert/remove for FW.02/SP.03.
4) Notepad++ UDL: INCOMPLETE (not started).
5) Sublime/JetBrains (optional): INCOMPLETE (not started).
6) Fixtures and Tests: PARTIAL
   - Conformance and invalid fixtures present; goldens for diagnostics in `test/golden/` complete and green.
   - Tokenization goldens and perf baselines not added.
7) Tooling and CI: PARTIAL
   - NPM scripts present (`lint:drrx`, `validate:*`); Makefile present. CI workflows and VS Code marketplace publish flow not set up.
8) Documentation Sync: PARTIAL
   - `drrx/udl-validation-map.md` present; README references editor integration; a dedicated "Highlighter Support" section and scope notes are pending.

Plan for Remaining Items
- Token Spec and Scopes
  - Sweep `drrx/syntax-overview.md` and add a short "Token Scopes" subsection aligning names to TextMate scopes; link to rules where needed.
- Grammar/Highlighter (VS Code)
  - Add a perf note and run a large file smoke test; document any patterns tightened to avoid backtracking in `editors/vscode/README.md`.
- Diagnostics Engine
  - Add continuity quick-fixes: FW.02 (insert `|`) and SP.03 (insert first-child `|` under `+`). Wire to rule IDs and ensure idempotence.
- Notepad++ UDL
  - Create `editors/notepad++/drrx.udl.xml` with operators as keywords, `#` comments, `{}` and quotes as delimiters; include README outlining setup and limitations.
- Sublime/JetBrains (optional)
  - Port grammar to `editors/sublime/drrx.sublime-syntax`; for JetBrains, document a minimal inspection profile for SP.01/02, FW.06, OR.02.
- Fixtures and Tests
  - Add tokenization snapshots: `test/token-golden/*.json` produced by a simple tokenizer pass for representative fixtures.
  - Add a perf harness (Node) to time lint over a synthetic 50k-line .drrx and record baseline in `test/perf/README.md`.
- Tooling and CI
  - Add GitHub Actions workflow: run `npm ci`, `npm run test`, `npm run validate:all` on PRs; upload goldens as artifacts on failure.
  - Add `editors/vscode` packaging job (tagged releases only) with `vsce package` and build artifact.
- Documentation Sync
  - Add a "Highlighter Support" section to root `README.md` (install from VSIX, diagnostics settings, quick-fixes list).
  - Keep `drrx/udl-validation-map.md` severities aligned with current engine defaults and document overrides via `drrx.severityOverrides`.

Completion Criteria to Flip to COMPLETE
- All quick-fixes listed present and idempotent; tests green.
- Tokenization goldens added; perf baseline captured and documented.
- Notepad++ UDL committed with README.
- CI workflow running on PR with schema/diagnostics checks.
