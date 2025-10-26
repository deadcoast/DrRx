# TODO – 0.0.3 (Working Scope)

Objective
- Reconcile 0.0.1/0.0.2 plans with what is actually integrated now, and close the remaining gaps needed for a solid, editor‑focused Dr.Rx integration.

Validated integrations (current repo)
- VS Code: TextMate grammar present (`editors/vscode/syntaxes/drrx.tmLanguage.json`), language configuration, activation, diagnostics engine with rule‑linked codes and quick‑fixes (FW.06, SP.05, VL.07, OR.02, FW.02, SP.03).
- Linter: Quote‑aware comment stripping, name parsing, basic annotations parsing; root precedence (OR.01/02/04) tuned; SP.02 alignment tightened; VL.02/FW.02 continuity split on file lines; goldens green.
- CLI: `bin/drrx` emits JSON diagnostics (rule, message, line/col, severity, link).
- CI: GitHub Actions workflow runs tests and schema validations.
- Docs: UDL Validation Map present; overview includes continuity vs spacer guidance with links to FW.02/SP.03/VL.02.
- Fixtures: Extensive invalid and positive suites; zero‑diag positive set enforced by test harness.

Items missing or stale vs. [TODO - 0.0.1](TODO\0.0.1\TODO.md) + [TODO - 0.0.2](TODO\0.0.2\TODO.md)

Planned work (0.0.3)
1) Token Scopes Note (overview): Token scopes section in `drrx/syntax-overview.md` not written.
   - Add a concise “Token Scopes” subsection to `drrx/syntax-overview.md` mapping tokens to grammar scopes used in `drrx.tmLanguage.json`.
   - Cross‑link to rules only where helpful (no duplicated rule content).
   - Status: ✅ Added `Token scopes (editor highlighting)` section that maps each scope to the corresponding rule references (`drrx/syntax-overview.md:25`).

2) Tokenization Goldens: Tokenization goldens absent (only diagnostics goldens exist).
   - Add a fast tokenizer in `lib/` (or reuse existing prefix parser) to output per-line token kinds for fixtures.
   - Generate `test/token-golden/*.json` for a representative subset (1–2 positive, 2–3 invalid) and assert exact match in a new test step.
   - Status: ✅ Added `tokenizeText` helper in `lib/drrx-lint.js` with scope-aligned tokens, introduced `test/tokenize-fixtures.js`, and recorded goldens under `test/token-golden/*.json`; `npm test` now validates diagnostics and tokens.

3) Perf Harness + Baseline: Perf harness/baseline not captured (no large-file timing or budget docs).
   - Add `test/perf/run.js` to lint a synthetic 50k-line tree; capture total time and per-line throughput.
   - Document baseline and target in `test/perf/README.md`; wire an npm script `perf:drrx` (non-blocking in CI).
   - Status: ✅ Added `test/perf/run.js` synthetic harness (`npm run perf:drrx`) and documented the current baseline in `test/perf/README.md` (50,003 lines in ~47.6 ms ≈ 1.05 M lines/sec).

4) Fixtures README refresh: Fixtures README is stale (still references conformance-edge-cases as positive; it’s now in invalid with a golden).
   - Update `drrx/fixtures/README.md` to reflect current positive/invalid sets and rule IDs.
   - Add a brief table for the positive suite describing what each validates (continuity, quoted names, annotations, trailing slashes).
   - Status: ✅ Refreshed `drrx/fixtures/README.md` with full invalid/positive tables, corrected naming, and cross-linked focuses plus golden expectations.

5) README – Highlighter Support: README lacks a short “Highlighter Support” section (install VSIX, settings, quick-fixes list).
   - Add a section to the root `README.md` covering: how to install the VSIX locally, settings (`drrx.strict`, `drrx.severityOverrides`), and available quick-fixes.
   - Status: ✅ Added a `Highlighter Support (VS Code)` section in `README.md` with VSIX packaging/install steps, settings, and the current quick-fix roster.

6) VS Code packaging: VS Code packaging/publish flow is not part of CI (local `vsce package` only; no marketplace release pipeline).
   - Add a GitHub Actions job (on tag) to run `vsce package` and upload the VSIX as a release asset.
   - Status: ✅ Extended `.github/workflows/ci.yml` to package on `v*` tags, create a release, and attach the generated VSIX.

7) Editor feedback loop: Diagnostics engine doesn’t re-lint after code actions (nice-to-have feedback loop).
   - After applying a code action, trigger a re-lint of the active document to confirm diagnostics clear.
   - Status: ✅ Code actions now attach a `drrx.relintDocument` command that re-runs linting after edits (see `editors/vscode/extension.js`).

Acceptance criteria
- All tests and diagnostics goldens remain green; positive fixtures retain zero‑diagnostics.
- New tokenization goldens added and validated.
- Perf script runs locally with a recorded baseline and README notes.
- Updated `drrx/fixtures/README.md` accurately lists invalid/positive fixtures and their focus.
- README contains a clear “Highlighter Support” section.
- (Optional) Tagged builds produce a VSIX artifact via CI.
