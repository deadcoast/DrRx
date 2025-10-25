# DrRx Phase 3 - Documentation Suite Plan MOC

## Goals & Audiences

### Goals
- Make the UDL unambiguous
- Make the CLI predictable
- Make operations safe
- New users reach "first successful inject" in <10 minutes
- Power users can script/automate confidently
- Contributors can extend parser/CLI without regressions

### Audiences
- Users: Author `.drrx`, run CLI
- Operators: Backup/restore/audit
- Contributors: Parser, AST, commands
- Reviewers: Security/UX

## Top-Level Documentation Layout

### Core Documentation Structure
```
docs/
├── 00-index.md                    # Main entry point
├── 01-concepts/                   # Core concepts
├── 02-quickstart/                 # Getting started
├── 03-udl-spec/                   # UDL specification
├── 04-cli/                        # CLI commands
├── 05-workflows/                  # Operational workflows
├── 06-recipes/                    # Practical examples
├── 07-windows-deep-dive/          # Windows-specific topics
├── 08-reference/                  # Technical reference
├── 09-test-and-quality/           # Testing and QA
└── 10-project/                    # Project management
```

## Minimum Viable Content

### 00-index.md
- Purpose: One-page map of the documentation
- Links: Quickstart and UDL Spec
- Clear: "Start here" guidance

### 01-concepts/
- [what-is-drrx.md](../01-concepts/what-is-drrx.md)
  - Problem statement
  - "Single source of truth for directories"
- [mental-model.md](../01-concepts/mental-model.md)
  - Source-of-truth (spec) ↔ reconciler (CLI) ↔ target (FS)
  - Idempotence & determinism
- [udl-overview.md](../01-concepts/udl-overview.md)
  - Symbols (`.`, `--`, `==`, `+`, `:`, `|`)
  - One canonical diagram

### 02-quickstart/
- [install-windows.md](../02-quickstart/install-windows.md)
  - Supported Windows versions
  - PowerShell prerequisites
  - Optional long-path enablement
- [first-inject.md](../02-quickstart/first-inject.md)
  - Create minimal `.drrx`
  - Run `drrx inject --dry-run`
  - Apply and verify with `drrx list`
- [dry-run-and-rollback.md](../02-quickstart/dry-run-and-rollback.md)
  - Using `--dry-run`
  - `quicksave` and `restore` safety loop

### 03-udl-spec/
- [udl-dictionary.md](../03-udl-spec/udl-dictionary.md)
  - Exact definitions for all operators
  - One-liners + non-ambiguous examples
- [udl-spacing-rules.md](../03-udl-spec/udl-spacing-rules.md)
  - [SP.01], [SP.02] with pass/fail visual examples
- [udl-grammar-ebnf.md](../03-udl-spec/udl-grammar-ebnf.md)
  - Formal grammar (see sample below)
- [udl-alignment-and-flow.md](../03-udl-spec/udl-alignment-and-flow.md)
  - Alignment to terminal chars
  - Vein continuity with `|`
  - Open/close semantics
- [udl-linting-guide.md](../03-udl-spec/udl-linting-guide.md)
  - Common mistakes
  - Linter rules
  - Auto-fix suggestions
- [udl-examples.md](../03-udl-spec/udl-examples.md)
  - Canonical trees (small→medium→large)
  - Mixed directories/files

### 04-cli/
- [cli-overview.md](../04-cli/cli-overview.md)
  - Command structure
  - Config discovery
  - Environment assumptions
- [cmd-inject.md](../04-cli/cmd-inject.md)
  - Behavior matrix (create/update/delete)
  - `--file|--dir|--all|--force|--dry-run`
  - Safety guarantees
- [cmd-list-ls.md](../04-cli/cmd-list-ls.md)
  - Output shapes (tree/flat)
  - Filtering options
- [cmd-restore.md](../04-cli/cmd-restore.md)
  - Sources (`quicksave` snapshots)
  - Restore targets
  - Dry-run restore
- [cmd-del-deldir-delall.md](../04-cli/cmd-del-deldir-delall.md)
- [cmd-adddir-addfile.md](../04-cli/cmd-adddir-addfile.md)
- [cmd-log-audit-clear.md](../04-cli/cmd-log-audit-clear.md)
- [cmd-quicksave.md](../04-cli/cmd-quicksave.md)
- [global-flags.md](../04-cli/global-flags.md)
- [exit-codes.md](../04-cli/exit-codes.md)

### 05-workflows/
- [reconcile-target-dir.md](../05-workflows/reconcile-target-dir.md)
  - How diffs are computed
  - Precedence rules (spec vs target)
  - Conflict handling
- [backups-and-quicksave.md](../05-workflows/backups-and-quicksave.md)
  - Where snapshots live
  - Naming conventions
  - Retention policies
- [auditing-and-change-review.md](../05-workflows/auditing-and-change-review.md)
  - Audit log format
  - How to diff between runs
- [migration-existing-tree.md](../05-workflows/migration-existing-tree.md)
  - Ingest existing directory into `.drrx`
  - Order: scan → normalize → emit UDL → review → inject

### 06-recipes/
- [python-project-skeleton.md](../06-recipes/python-project-skeleton.md)
- [mixed-code-and-docs.md](../06-recipes/mixed-code-and-docs.md)
- [monorepo-slices.md](../06-recipes/monorepo-slices.md)
- [template-repo-bootstrap.md](../06-recipes/template-repo-bootstrap.md)

### 07-windows-deep-dive/
- [paths-crlf-case.md](../07-windows-deep-dive/paths-crlf-case.md)
  - Path separators, CRLF vs LF handling
  - Case sensitivity realities on Windows
- [junctions-symlinks.md](../07-windows-deep-dive/junctions-symlinks.md)
  - How DrRx treats them (create? ignore? validate?)
- [permissions-acls.md](../07-windows-deep-dive/permissions-acls.md)
  - Running elevated? Handling denies
- [long-paths-support.md](../07-windows-deep-dive/long-paths-support.md)
  - Enabling long paths
  - Behavior without it

### 08-reference/
- [ast-json-schema.md](../08-reference/ast-json-schema.md)
  - JSON Schema for parser AST
  - Node types: Root, Dir, File, Vein, FlowPrefix, SpacingMeta
- [drrx-conf-schema.md](../08-reference/drrx-conf-schema.md)
  - Machine-readable schema for `.drrx.conf.yaml`
- [error-catalog.md](../08-reference/error-catalog.md)
  - IDs, messages, cause, remediation, examples
- [logging-format.md](../08-reference/logging-format.md)
  - Log levels, fields, sample lines

### 09-test-and-quality/
- [conformance-suite.md](../09-test-and-quality/conformance-suite.md)
  - How to run corpus of `.drrx` files
  - Grammar + semantics across versions
- [fixtures-and-golden-tests.md](../09-test-and-quality/fixtures-and-golden-tests.md)
  - Directory fixtures → expected AST → expected fs result
- [coverage-strategy.md](../09-test-and-quality/coverage-strategy.md)
  - Parser, reconciler, CLI surface
  - Mutation tests for safety toggles
- [perf-baselines.md](../09-test-and-quality/perf-baselines.md)
  - Large trees (10k nodes) targets & timing

### 10-project/
- [roadmap.md](../10-project/roadmap.md)
  - Short, Mid, Long term goals
  - Linter, formatter, symlink strategy
  - Non-Windows support (future)
- [versioning-and-changelog.md](../10-project/versioning-and-changelog.md)
  - SemVer
  - Categories
  - Keep `CHANGELOG.md` with strict template
- [security-model.md](../10-project/security-model.md)
  - Destructive ops require `--force`
  - Sandboxing
  - Path traversal prevention
  - Dry-run-first guidance
- [threat-checklist.md](../10-project/threat-checklist.md)
  - Mis-specified root
  - Accidental deletes
  - Privilege escalation
  - Malicious spec injection
- [contributing.md](../10-project/contributing.md)
  - How to add command
  - Grammar change protocol
  - Test expectations
- [code-of-conduct.md](../10-project/code-of-conduct.md)
  - Standard code of conduct
- [style-guide.md](../10-project/style-guide.md)
  - Writing style (no ambiguity, show pass/fail)
  - Code style pointers
- [architecture.md](../10-project/architecture.md)
  - High-level diagram
  - Lexer → Parser → AST → Planner (diff) → Executor → Reporter
- [decision-records.md](../10-project/decision-records.md)
  - ADR template & initial ADRs
  - Choose `|` as vein connector
  - Windows-first approach

## Canonical Templates

### Doc Page Template
```markdown
# <Title>

## Purpose
<One paragraph – what this page guarantees.>

## Outcome
<What the reader can do after reading.>

## Definitions
<Bullets if needed. Link to glossary.>

## Procedure / Rules / API
<Step-by-step or spec with examples.>

## Examples
<Pass/Fail blocks, before/after.>

## Troubleshooting
<Common errors mapped to Error Catalog IDs.>

## References
<Internal links to related pages.>
```

### ADR Template
```markdown
# ADR: <Decision title>

- Status: Proposed | Accepted | Superseded
- Context: <Problem, constraints>
- Decision: <What we chose and why>
- Consequences: <Trade-offs, risks>
- Alternatives: <Briefly list>
- Links: <PRs, issues, specs>
```

### Changelog Entry Template
```markdown
## [x.y.z] - YYYY-MM-DD
### Added
- …

### Changed
- …

### Fixed
- …

### Security
- …
```

## Style & Quality Gates

### Core Principles
- Zero-Ambiguity Rule: Every operator has at least one pass and one fail example
- Single Source Rule: UDL grammar → generated linter rules → CLI behavior; no divergence
- Docs CI (later): Validate code blocks compile/run where applicable; link checker; schema validation for examples

## Acceptance Criteria

### When Complete
1. New user can install, author minimal `.drrx`, dry-run, inject, list, quicksave, and restore—only from 00→02
2. UDL is fully specified with grammar, spacing, alignment, and at least 10 canonical examples with pass/fail
3. Every CLI command has a page with synopsis, options table, safety notes, examples, and exit codes
4. Error Catalog covers all parse/validate/exec errors referenced by examples
5. Conformance Suite doc includes how to run fixtures + expected outputs
6. Security Model and Windows deep-dives exist and are cross-linked from risky commands (`--force`)

## Order of Next Steps

### Implementation Priority
1. Draft 02-quickstart (install, first inject, dry-run/rollback)
2. Lock 03-udl-spec (dictionary, spacing, grammar, alignment) with pass/fail blocks
3. Write 04-cli pages for `inject`, `restore`, `list/ls`, `quicksave` (critical path)
4. Publish 08-reference/error-catalog.md and use IDs in all examples
5. Add 05-workflows/reconcile-target-dir.md to explain deterministic planning
6. Add 10-project/versioning-and-changelog.md + security-model.md

## Related Documentation
- [Phase 1 - Core Concepts](./phase_1.md)
- [Phase 2 - Implementation Details](./phase_2.md)