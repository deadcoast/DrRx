# DrRx Phase 2 - Implementation Details MOC

## Documentation Hub Structure

### Main Index
- [Quickstart › First Inject](../02-quickstart/first-inject.md)
- [UDL Spec › Dictionary](../03-udl-spec/udl-dictionary.md)
- [UDL Spec › Spacing Rules](../03-udl-spec/udl-spacing-rules.md)
- [UDL Spec › Grammar (EBNF)](../03-udl-spec/udl-grammar-ebnf.md)
- [CLI › inject](../04-cli/cmd-inject.md)
- [CLI › restore](../04-cli/cmd-restore.md)
- [CLI › list/ls](../04-cli/cmd-list-ls.md)
- [Workflows › Reconcile target dir](../05-workflows/reconcile-target-dir.md)
- [Reference › Error Catalog](../08-reference/error-catalog.md)
- [Project › Security Model](../10-project/security-model.md)
- [Project › Versioning & Changelog](../10-project/versioning-and-changelog.md)

## Quickstart Guides

### Installation
- [Install Windows](../02-quickstart/install-windows.md)
  - Windows 10 (22H2+) or 11
  - PowerShell 7+
  - Optional: Enable long paths
  - Installation steps and verification

### First Steps
- [First Inject](../02-quickstart/first-inject.md)
  - Create minimal `.drrx` example
  - Dry-run process
  - Apply changes
  - Verify results
  - Rollback procedures

- [Dry-run and Rollback](../02-quickstart/dry-run-and-rollback.md)
  - Safety procedures
  - Using `--dry-run`
  - `quicksave` and `restore` workflow

## UDL Specification

### Core Documentation
- [UDL Dictionary](../03-udl-spec/udl-dictionary.md)
  - Operators: `.`, `--`, `==`
  - Flow markers: `+`, `:`, `|`
  - Naming rules and constraints

- [Spacing Rules](../03-udl-spec/udl-spacing-rules.md)
  - [SP.01] Hierarchy spacing
  - [SP.02] Alignment to terminal character
  - Pass/fail examples

- [Grammar (EBNF)](../03-udl-spec/udl-grammar-ebnf.md)
  - Formal grammar definition
  - Semantics and flow control
  - Token definitions

- [Alignment and Flow](../03-udl-spec/udl-alignment-and-flow.md)
  - Vein continuity with `|`
  - Open/close semantics
  - Alignment rules

- [Linting Guide](../03-udl-spec/udl-linting-guide.md)
  - Common mistakes
  - Linter rules
  - Auto-fix suggestions

- [Examples](../03-udl-spec/udl-examples.md)
  - Canonical trees (small→medium→large)
  - Mixed directories/files examples

## CLI Commands

### Core Commands
- [CLI Overview](../04-cli/cli-overview.md)
  - Command structure
  - Config discovery
  - Environment assumptions

- [cmd-inject](../04-cli/cmd-inject.md)
  - Synopsis and options
  - Behavior matrix (create/update/delete)
  - Safety guarantees
  - Exit codes and examples

- [cmd-list-ls](../04-cli/cmd-list-ls.md)
  - Output shapes (tree/flat)
  - Filtering options
  - Display modes

- [cmd-restore](../04-cli/cmd-restore.md)
  - Sources (quicksave snapshots)
  - Restore targets
  - Dry-run restore

### Utility Commands
- [cmd-del-deldir-delall](../04-cli/cmd-del-deldir-delall.md)
- [cmd-adddir-addfile](../04-cli/cmd-adddir-addfile.md)
- [cmd-log-audit-clear](../04-cli/cmd-log-audit-clear.md)
- [cmd-quicksave](../04-cli/cmd-quicksave.md)
- [global-flags](../04-cli/global-flags.md)
- [exit-codes](../04-cli/exit-codes.md)

## Workflows

### Core Workflows
- [Reconcile Target Directory](../05-workflows/reconcile-target-dir.md)
  - Diff computation
  - Precedence rules (spec vs target)
  - Conflict handling

- [Backups and Quicksave](../05-workflows/backups-and-quicksave.md)
  - Snapshot locations
  - Naming conventions
  - Retention policies

- [Auditing and Change Review](../05-workflows/auditing-and-change-review.md)
  - Audit log format
  - Diff between runs
  - Change tracking

- [Migration Existing Tree](../05-workflows/migration-existing-tree.md)
  - Ingest existing directory
  - Normalize structure
  - Emit UDL
  - Review and inject process

## Recipes

### Practical Examples
- [Python Project Skeleton](../06-recipes/python-project-skeleton.md)
- [Mixed Code and Docs](../06-recipes/mixed-code-and-docs.md)
- [Monorepo Slices](../06-recipes/monorepo-slices.md)
- [Template Repo Bootstrap](../06-recipes/template-repo-bootstrap.md)

## Windows Deep Dive

### Platform-Specific Topics
- [Paths, CRLF, Case](../07-windows-deep-dive/paths-crlf-case.md)
  - Path separators
  - CRLF vs LF handling
  - Case sensitivity on Windows

- [Junctions and Symlinks](../07-windows-deep-dive/junctions-symlinks.md)
  - How DrRx treats them
  - Create/ignore/validate strategies

- [Permissions and ACLs](../07-windows-deep-dive/permissions-acls.md)
  - Running elevated
  - Handling denies
  - Permission management

- [Long Paths Support](../07-windows-deep-dive/long-paths-support.md)
  - Enabling long paths
  - Behavior without support
  - Configuration options

## Reference

### Technical Reference
- [AST JSON Schema](../08-reference/ast-json-schema.md)
  - JSON Schema for parser AST
  - Node types: Root, Dir, File, Vein, FlowPrefix, SpacingMeta

- [DrRx Conf Schema](../08-reference/drrx-conf-schema.md)
  - Machine-readable schema for `.drrx.conf.yaml`

- [Error Catalog](../08-reference/error-catalog.md)
  - Error IDs, messages, causes
  - Remediation steps
  - Examples for each error type

- [Logging Format](../08-reference/logging-format.md)
  - Log levels and fields
  - Sample log lines
  - Structured logging format

## Test and Quality

### Quality Assurance
- [Conformance Suite](../09-test-and-quality/conformance-suite.md)
  - Running corpus of `.drrx` files
  - Grammar and semantics validation
  - Version compatibility

- [Fixtures and Golden Tests](../09-test-and-quality/fixtures-and-golden-tests.md)
  - Directory fixtures
  - Expected AST outputs
  - Expected filesystem results

- [Coverage Strategy](../09-test-and-quality/coverage-strategy.md)
  - Parser coverage
  - Reconciler coverage
  - CLI surface coverage
  - Mutation tests for safety toggles

- [Performance Baselines](../09-test-and-quality/perf-baselines.md)
  - Large trees (10k nodes) targets
  - Timing benchmarks
  - Performance regression detection

## Project Management

### Project Documentation
- [Roadmap](../10-project/roadmap.md)
  - Short, Mid, Long term goals
  - Linter, formatter, symlink strategy
  - Non-Windows support (future)

- [Versioning and Changelog](../10-project/versioning-and-changelog.md)
  - SemVer for CLI and UDL grammar
  - Changelog template
  - Version management

- [Security Model](../10-project/security-model.md)
  - Destructive ops require `--force`
  - Sandboxing considerations
  - Path traversal prevention
  - Dry-run-first guidance

- [Threat Checklist](../10-project/threat-checklist.md)
  - Mis-specified root
  - Accidental deletes
  - Privilege escalation
  - Malicious spec injection

### Development
- [Contributing](../10-project/contributing.md)
  - How to add commands
  - Grammar change protocol
  - Test expectations

- [Code of Conduct](../10-project/code-of-conduct.md)
  - Standard code of conduct

- [Style Guide](../10-project/style-guide.md)
  - Writing style (no ambiguity, show pass/fail)
  - Code style pointers

- [Architecture](../10-project/architecture.md)
  - High-level diagram
  - Lexer → Parser → AST → Planner (diff) → Executor → Reporter

- [Decision Records](../10-project/decision-records.md)
  - ADR template
  - Initial ADRs (choose `|` as vein connector, Windows-first)

## Related Documentation
- [Phase 1 - Core Concepts](./phase_1.md)
- [Phase 3 - Documentation Suite Plan](./phase_3.md)
