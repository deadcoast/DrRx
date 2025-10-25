# Repository Guidelines

## Project Scope & Architecture
Dr.Rx is a Windows-aware directory remedy framework: the `.drrx` UDL declares an authoritative tree, the CLI reconciles that spec with the real filesystem, and the schemas plus rules keep everything auditable. Authoritative behavior lives in `drrx/drrx.yaml` (command semantics), `drrx/rules.md` (normative IDs), and `drrx/syntax-overview.md` (grammar and examples). Editor integrations map diagnostics through `drrx/udl-validation-map.md`. Keep these documents consistent; changes to syntax, annotations, or reconciliation must update all three.

## Project Structure & Module Organization
`bin/drrx` is the CLI entrypoint; it wraps `lib/drrx-lint.js`, which houses the shared lint engine. Parser fixtures, schemas, and normative assets live under `drrx/`. Invalid specification samples are under `drrx/fixtures/invalid`, positive conformance samples under `drrx/fixtures`. Golden diagnostics for the linter reside in `test/golden`. Use `src/` for incubating runtime modules or reconciliation planners before promoting them into `lib/`. Keep CHANGELOG entries in `CHANGELOGS/*/CHANGELOG.md` aligned with released rule IDs.

## Build, Test, and Development Commands
Install once with `npm install`. Everyday loop:
```bash
npm test              # run lint-fixture harness; creates/compares goldens
npm run validate:ast  # ajv validation for AST schema + example
npm run validate:diff # ajv validation for list/diff schema
make validate-all     # convenience target for both ajv passes
```
When `npm test` reports a created or mismatched golden, inspect `test/golden/*.json`, adjust fixtures or lint output, and rerun before committing.

## Coding Style & Naming Conventions
JavaScript code follows the existing Node style: two-space indentation, single quotes, explicit semicolons, and pure helpers where possible. Keep executable shims in `bin/` with a shebang; reusable logic belongs in `lib/`. Modules and fixtures adopt descriptive, kebab-cased names (`drrx-lint`, `conformance-edge-cases`). Emit diagnostics using stable rule IDs (`FW.06`, `OR.04`) so editor maps remain accurate. Specs and schemas stay in Markdown or JSON; prefer double-quoted JSON with sorted keys when practical.

## Testing & Fixtures
Negative cases: add `.tree.drrx` files to `drrx/fixtures/invalid`, then run `npm test` to regenerate or verify the matching JSON under `test/golden/`. Positive cases (e.g., `drrx/fixtures/conformance-edge-cases.tree.drrx`) must lint cleanly; treat new positives as smoke tests for syntax expansions. Schema or CLI surface changes demand updated fixtures plus `npm run validate:ast` and `npm run validate:diff`. Capture any reconciliation scenarios in `drrx/examples/` and reference them from README when useful.

## Commit & Pull Request Guidelines
History mixes conventional prefixes (`feat(docs): …`) with imperative subjects (`Add …`). Mirror that style, keep commits focused, and cite affected rule IDs, schemas, or fixtures in the message body. Pull requests should: 1) link the motivating issue or changelog entry, 2) summarize behavioral impact on directories/CLI, 3) list verification commands executed (`npm test`, `make validate-all`), and 4) attach CLI output or screenshots when diagnostics change. Update `CHANGELOGS/0.0.0_monolith/CHANGELOG.md` whenever rules or commands evolve.
