# TODO - monolith

## 0.0.1

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

## 0.0.2

- M4: Cross-editor coverage, perf baseline, CI gating

---

Validation Status (2025-10-25)

1) Token Spec and Scopes: COMPLETE (VS Code)
   - VS Code token scopes defined in `editors/vscode/syntaxes/drrx.tmLanguage.json` and mapped in `drrx/syntax-overview.md`.
2) Grammar/Highlighter (VS Code): PARTIAL
   - Grammar covers operators, flow prefixes, spacer-only lines, names, annotations, and comments.
   - Needs performance profiling on large fixtures and possible guards for misaligned `|` cases currently enforced by diagnostics.
3) Diagnostics Engine (VS Code): PARTIAL
   - Implemented rules: SP.01, SP.02, SP.05, SP.06; FW.02, FW.06, FW.07, FW.08, FW.10, FW.12, FW.14; OR.01, OR.02, OR.04; VL.02, VL.07; NM.05.
   - Quick-fixes delivered: FW.06 (insert spacer), OR.02 (regroup), SP.05 (normalize spacing), VL.07 (remove spacer), FW.02/SP.03 (insert `|`), VL.02 (remove stray `|`). Normalisation remains TODO.
4) Fixtures and Tests: COMPLETE
   - Diagnostics and token goldens committed under `test/golden/` and `test/token-golden/`; perf harness documented in `test/perf/README.md`.
5) Tooling and CI: PARTIAL
   - `npm test` and schema validation run in CI; VSIX packaging job runs on tags. Marketplace publishing and stricter PR gating still pending.
6) Documentation Sync: PARTIAL
   - README documents highlighter usage; continue keeping `drrx/udl-validation-map.md` and examples aligned with engine behavior.

Plan for Remaining Items
- Token Spec and Scopes
  - Sweep `drrx/syntax-overview.md` and add a short "Token Scopes" subsection aligning names to TextMate scopes; link to rules where needed.
- Grammar/Highlighter (VS Code)
  - Add a perf note and run a large file smoke test; document any patterns tightened to avoid backtracking in `editors/vscode/README.md`.
- Diagnostics Engine
  - Follow up with continuity normalisation quick-fixes and cover remaining warnings with actionable edits.
- Fixtures and Tests
  - Expand regression coverage for mixed warning/error scenarios before enabling additional rules.
- Tooling and CI
  - Tighten CI (fail on golden drift, publish diagnostics artefacts) and prep marketplace publishing workflow when the extension stabilises.
- Documentation Sync
  - Add a "Highlighter Support" section to root `README.md` (install from VSIX, diagnostics settings, quick-fixes list).
  - Keep `drrx/udl-validation-map.md` severities aligned with current engine defaults and document overrides via `drrx.severityOverrides`.

Completion Criteria to Flip to COMPLETE
- All quick-fixes listed present and idempotent; tests green.
- Tokenization goldens maintained; perf baseline refreshed when diagnostics change materially.
- CI workflow running on PR with schema/diagnostics checks and failing on drift.

## 0.0.3

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
