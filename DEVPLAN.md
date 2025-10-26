# DEV PLAN MONOLITH

# DrRx Phase 1 - Core Concepts

## Overview

name: “directory remedy”, “DrRx”, and “drrx”.

* Goal: Manage a real Windows directory from a single authoritative DrRx spec file written in a strict UDL (tree) syntax.
* UDL core:

  * Entities: `.` (root), `--` (directory op), `==` (file op).
  * Flow: `+` opens a vein (new branch), `:` closes flow, `|` carries the vein vertically between parent/children.
  * Layout rules: Double-space for hierarchical steps; when a vein is open (`+`), child alignment can use one space. New lines must align to the terminal character of the prior operator as shown in examples. Root files appear first; then directories; veins explicitly connect files/directories.
* Authoring intent: Human-readable, strict, unambiguous tree that can be parsed to create/update the real filesystem exactly as declared.
* CLI intent (`drrx` / `drrxm`): Treat the DrRx spec as the source of truth and provide commands to:

  * inject (initialize/apply spec to target dir; supports `--file`, `--dir`, `--all`, `--force`, `--dry-run`)
  * list / ls, restore, del/deldir/delall, adddir, addfile
  * utilities: help (h), log (l), audit (a), clear (c), quicksave (qs)
* Operating model: Deterministic reconciliation between the DrRx spec and the target directory, with dry-run and logging/auditing.

## Core Components

### UDL (Universal Directory Language) Core
* Entities:
  * `.` (root)
  * `--` (directory operation)
  * `==` (file operation)
* Flow Control:
  * `+` opens a vein (new branch)
  * `:` closes flow
  * `|` carries the vein vertically between parent/children

### Layout Rules
* Double-space for hierarchical steps
* When a vein is open (`+`), child alignment can use one space
* New lines must align to the terminal character of the prior operator
* Root files appear first; then directories
* Veins explicitly connect files/directories

### Authoring Intent
* Human-readable, strict, unambiguous tree
* Can be parsed to create/update the real filesystem exactly as declared

## CLI Intent ("drrx" / "drrxm")

### Commands
* inject: Initialize/apply spec to target dir
  * Supports `--file`, `--dir`, `--all`, `--force`, `--dry-run`
* list / ls: Display current state
* restore: Restore from backup
* del/deldir/delall: Delete operations
* adddir: Add directory
* addfile: Add file

### Utilities
* help (h): Show help
* log (l): View logs
* audit (a): Audit changes
* clear (c): Clear logs
* quicksave (qs): Create backup

## Operating Model
* Deterministic reconciliation between the DrRx spec and the target directory
* Dry-run and logging/auditing capabilities
* Source of truth approach with safety mechanisms

* Name: "directory remedy", "DrRx", and "drrx"
* Goal: Manage a real Windows directory from a single authoritative DrRx spec file written in a strict UDL (tree) syntax.
* UDL core:
  * Entities: `.` (root), `--` (directory op), `==` (file op).
  * Flow: `+` opens a vein (new branch), `:` closes flow, `|` carries the vein vertically between parent/children.
  * Layout rules: Double-space for hierarchical steps; when a vein is open (`+`), child alignment can use one space. New lines must align to the terminal character of the prior operator as shown in examples. Root files appear first; then directories; veins explicitly connect files/directories.
* Authoring intent: Human-readable, strict, unambiguous tree that can be parsed to create/update the real filesystem exactly as declared.
* CLI intent ("drrx" / "drrxm"): Treat the DrRx spec as the source of truth and provide commands to:
  * commands:
    * inject (initialize/apply spec to target dir; supports `--file`, `--dir`, `--all`, `--force`, `--dry-run`)
    * list / ls, restore, del/deldir/delall, adddir, addfile
  * utilities:
    * help (h)
    * log (l)
    * audit (a)
    * clear (c)
    * quicksave (qs)
* Operating model: Deterministic reconciliation between the DrRx spec and the target directory, with dry-run and logging/auditing.

## Related Documentation
* [Phase 2 - Implementation Details](docs/DEVPLAN/phase_2.md)
* [Phase 3 - Documentation Suite Plan](docs/DEVPLAN/phase_3.md)
* [UDL Overview](../01-concepts/udl-overview.md)
* [Mental Model](../01-concepts/mental-model.md)
* [What is DrRx](../01-concepts/what-is-drrx.md)

# DrRx Phase 2 - Implementation Details

## Documentation Hub Structure

### Main Index
* [Quickstart › First Inject](../02-quickstart/first-inject.md)
* [UDL Spec › Dictionary](../03-udl-spec/udl-dictionary.md)
* [UDL Spec › Spacing Rules](../03-udl-spec/udl-spacing-rules.md)
* [UDL Spec › Grammar (EBNF)](../03-udl-spec/udl-grammar-ebnf.md)
* [CLI › inject](../04-cli/cmd-inject.md)
* [CLI › restore](../04-cli/cmd-restore.md)
* [CLI › list/ls](../04-cli/cmd-list-ls.md)
* [Workflows › Reconcile target dir](../05-workflows/reconcile-target-dir.md)
* [Reference › Error Catalog](../08-reference/error-catalog.md)
* [Project › Security Model](../10-project/security-model.md)
* [Project › Versioning & Changelog](../10-project/versioning-and-changelog.md)

## Quickstart Guides

### Installation
* [Install Windows](../02-quickstart/install-windows.md)
  * Windows 10 (22H2+) or 11
  * PowerShell 7+
  * Optional: Enable long paths
  * Installation steps and verification

### First Steps
* [First Inject](../02-quickstart/first-inject.md)
  * Create minimal `.drrx` example
  * Dry-run process
  * Apply changes
  * Verify results
  * Rollback procedures

* [Dry-run and Rollback](../02-quickstart/dry-run-and-rollback.md)
  * Safety procedures
  * Using `--dry-run`
  * `quicksave` and `restore` workflow

## UDL Specification

### Core Documentation
* [UDL Dictionary](../03-udl-spec/udl-dictionary.md)
  * Operators: `.`, `--`, `==`
  * Flow markers: `+`, `:`, `|`
  * Naming rules and constraints

* [Spacing Rules](../03-udl-spec/udl-spacing-rules.md)
  * [SP.01] Hierarchy spacing
  * [SP.02] Alignment to terminal character
  * Pass/fail examples

* [Grammar (EBNF)](../03-udl-spec/udl-grammar-ebnf.md)
  * Formal grammar definition
  * Semantics and flow control
  * Token definitions

* [Alignment and Flow](../03-udl-spec/udl-alignment-and-flow.md)
  * Vein continuity with `|`
  * Open/close semantics
  * Alignment rules

* [Linting Guide](../03-udl-spec/udl-linting-guide.md)
  * Common mistakes
  * Linter rules
  * Auto-fix suggestions

* [Examples](../03-udl-spec/udl-examples.md)
  * Canonical trees (small→medium→large)
  * Mixed directories/files examples

## CLI Commands

### Core Commands
* [CLI Overview](../04-cli/cli-overview.md)
  * Command structure
  * Config discovery
  * Environment assumptions

* [cmd-inject](../04-cli/cmd-inject.md)
  * Synopsis and options
  * Behavior matrix (create/update/delete)
  * Safety guarantees
  * Exit codes and examples

* [cmd-list-ls](../04-cli/cmd-list-ls.md)
  * Output shapes (tree/flat)
  * Filtering options
  * Display modes

* [cmd-restore](../04-cli/cmd-restore.md)
  * Sources (quicksave snapshots)
  * Restore targets
  * Dry-run restore

### Utility Commands
* [cmd-del-deldir-delall](../04-cli/cmd-del-deldir-delall.md)
* [cmd-adddir-addfile](../04-cli/cmd-adddir-addfile.md)
* [cmd-log-audit-clear](../04-cli/cmd-log-audit-clear.md)
* [cmd-quicksave](../04-cli/cmd-quicksave.md)
* [global-flags](../04-cli/global-flags.md)
* [exit-codes](../04-cli/exit-codes.md)

## Workflows

### Core Workflows
* [Reconcile Target Directory](../05-workflows/reconcile-target-dir.md)
  * Diff computation
  * Precedence rules (spec vs target)
  * Conflict handling

* [Backups and Quicksave](../05-workflows/backups-and-quicksave.md)
  * Snapshot locations
  * Naming conventions
  * Retention policies

* [Auditing and Change Review](../05-workflows/auditing-and-change-review.md)
  * Audit log format
  * Diff between runs
  * Change tracking

* [Migration Existing Tree](../05-workflows/migration-existing-tree.md)
  * Ingest existing directory
  * Normalize structure
  * Emit UDL
  * Review and inject process

## Recipes

### Practical Examples
* [Python Project Skeleton](../06-recipes/python-project-skeleton.md)
* [Mixed Code and Docs](../06-recipes/mixed-code-and-docs.md)
* [Monorepo Slices](../06-recipes/monorepo-slices.md)
* [Template Repo Bootstrap](../06-recipes/template-repo-bootstrap.md)

## Windows Deep Dive

### Platform-Specific Topics
* [Paths, CRLF, Case](../07-windows-deep-dive/paths-crlf-case.md)
  * Path separators
  * CRLF vs LF handling
  * Case sensitivity on Windows

* [Junctions and Symlinks](../07-windows-deep-dive/junctions-symlinks.md)
  * How DrRx treats them
  * Create/ignore/validate strategies

* [Permissions and ACLs](../07-windows-deep-dive/permissions-acls.md)
  * Running elevated
  * Handling denies
  * Permission management

* [Long Paths Support](../07-windows-deep-dive/long-paths-support.md)
  * Enabling long paths
  * Behavior without support
  * Configuration options

## Reference

### Technical Reference
* [AST JSON Schema](../08-reference/ast-json-schema.md)
  * JSON Schema for parser AST
  * Node types: Root, Dir, File, Vein, FlowPrefix, SpacingMeta

* [DrRx Conf Schema](../08-reference/drrx-conf-schema.md)
  * Machine-readable schema for `.drrx.conf.yaml`

* [Error Catalog](../08-reference/error-catalog.md)
  * Error IDs, messages, causes
  * Remediation steps
  * Examples for each error type

* [Logging Format](../08-reference/logging-format.md)
  * Log levels and fields
  * Sample log lines
  * Structured logging format

## Test and Quality

### Quality Assurance
* [Conformance Suite](../09-test-and-quality/conformance-suite.md)
  * Running corpus of `.drrx` files
  * Grammar and semantics validation
  * Version compatibility

* [Fixtures and Golden Tests](../09-test-and-quality/fixtures-and-golden-tests.md)
  * Directory fixtures
  * Expected AST outputs
  * Expected filesystem results

* [Coverage Strategy](../09-test-and-quality/coverage-strategy.md)
  * Parser coverage
  * Reconciler coverage
  * CLI surface coverage
  * Mutation tests for safety toggles

* [Performance Baselines](../09-test-and-quality/perf-baselines.md)
  * Large trees (10k nodes) targets
  * Timing benchmarks
  * Performance regression detection

## Project Management

### Project Documentation
* [Roadmap](../10-project/roadmap.md)
  * Short, Mid, Long term goals
  * Linter, formatter, symlink strategy
  * Non-Windows support (future)

* [Versioning and Changelog](../10-project/versioning-and-changelog.md)
  * SemVer for CLI and UDL grammar
  * Changelog template
  * Version management

* [Security Model](../10-project/security-model.md)
  * Destructive ops require `--force`
  * Sandboxing considerations
  * Path traversal prevention
  * Dry-run-first guidance

* [Threat Checklist](../10-project/threat-checklist.md)
  * Mis-specified root
  * Accidental deletes
  * Privilege escalation
  * Malicious spec injection

### Development
* [Contributing](../10-project/contributing.md)
  * How to add commands
  * Grammar change protocol
  * Test expectations

* [Code of Conduct](../10-project/code-of-conduct.md)
  * Standard code of conduct

* [Style Guide](../10-project/style-guide.md)
  * Writing style (no ambiguity, show pass/fail)
  * Code style pointers

* [Architecture](../10-project/architecture.md)
  * High-level diagram
  * Lexer → Parser → AST → Planner (diff) → Executor → Reporter

* [Decision Records](../10-project/decision-records.md)
  * ADR template
  * Initial ADRs (choose `|` as vein connector, Windows-first)

## Related Documentation
* [Phase 1 - Core Concepts](docs/DEVPLAN/phase_1.md)
* [Phase 3 - Documentation Suite Plan](docs/DEVPLAN/phase_3.md)

## 0) Goals & Audiences

* Goals: Make the UDL unambiguous, the CLI predictable, and ops safe. New users reach “first successful inject” in <10 minutes; power users can script/automate confidently; contributors can extend parser/CLI without regressions.
* Audiences: (a) Users (author .drrx, run CLI), (b) Operators (backup/restore/audit), (c) Contributors (parser, AST, commands), (d) Reviewers (security/UX).

---

## 1) Top-Level Docs Layout (filenames + purpose)

```
docs/
  00-index.md
  01-concepts/
    what-is-drrx.md
    mental-model.md
    udl-overview.md
  02-quickstart/
    install-windows.md
    first-inject.md
    dry-run-and-rollback.md
  03-udl-spec/
    udl-dictionary.md
    udl-spacing-rules.md
    udl-grammar-ebnf.md
    udl-alignment-and-flow.md
    udl-linting-guide.md
    udl-examples.md
  04-cli/
    cli-overview.md
    cmd-inject.md
    cmd-list-ls.md
    cmd-restore.md
    cmd-del-deldir-delall.md
    cmd-adddir-addfile.md
    cmd-log-audit-clear.md
    cmd-quicksave.md
    global-flags.md
    exit-codes.md
  05-workflows/
    reconcile-target-dir.md
    backups-and-quicksave.md
    auditing-and-change-review.md
    migration-existing-tree.md
  06-recipes/
    python-project-skeleton.md
    mixed-code-and-docs.md
    monorepo-slices.md
    template-repo-bootstrap.md
  07-windows-deep-dive/
    paths-crlf-case.md
    junctions-symlinks.md
    permissions-acls.md
    long-paths-support.md
  08-reference/
    ast-json-schema.md
    drrx-conf-schema.md
    error-catalog.md
    logging-format.md
  09-test-and-quality/
    conformance-suite.md
    fixtures-and-golden-tests.md
    coverage-strategy.md
    perf-baselines.md
  10-project/
    roadmap.md
    versioning-and-changelog.md
    security-model.md
    threat-checklist.md
    contributing.md
    code-of-conduct.md
    style-guide.md
    architecture.md
    decision-records.md
```

---

## 2) Minimum Viable Content (per file)

### 00-index.md

* Purpose: One-page map of the documentation. Links to Quickstart and UDL Spec. Clear “Start here”.

### 01-concepts/*

* what-is-drrx.md: Problem statement; “single source of truth for directories.”
* mental-model.md: Source-of-truth (spec) ↔ reconciler (CLI) ↔ target (FS). Idempotence & determinism.
* udl-overview.md: Symbols (`.`, `--`, `==`, `+`, `:`, `|`) with one canonical diagram.

### 02-quickstart/*

* install-windows.md: Supported Windows versions; PowerShell prerequisites; optional long-path enablement.
* first-inject.md: Create a minimal `.drrx`; run `drrx inject --dry-run`; apply; verify with `drrx list`.
* dry-run-and-rollback.md: Using `--dry-run`, `quicksave`, and `restore` safety loop.

### 03-udl-spec/*

* udl-dictionary.md: Exact definitions for all operators; one-liners + non-ambiguous examples.
* udl-spacing-rules.md: [SP.01], [SP.02] with pass/fail visual examples.
* udl-grammar-ebnf.md: Formal grammar (see sample below).
* udl-alignment-and-flow.md: Alignment to terminal chars; vein continuity with `|`; open/close semantics.
* udl-linting-guide.md: Common mistakes; linter rules; auto-fix suggestions (if any).
* udl-examples.md: Canonical trees (small→medium→large), including mixed directories/files.

Sample EBNF (to include & expand):

```ebnf
Document        = RootHeader , RootFiles? , Vein? , Directories? ;
RootHeader      = "." ;
RootFiles       = { RootFileLine } ;
RootFileLine    = ":" , "==" , SP , FileName , EOL ;
Vein            = "|" , EOL ;
Directories     = { DirectoryBlock } ;

DirectoryBlock  = FlowPrefix , "--" , SP , DirName , "/" , EOL , Children? ;
FlowPrefix      = ":" | "+" ;
Children        = ( VeinChildren | ClosedChildren ) ;
VeinChildren    = "|" , SP? , ( FileLine | DirectoryBlock ) , { "|" , SP? , ( FileLine | DirectoryBlock ) } ;
ClosedChildren  = SP* , ( FileLine | DirectoryBlock ) , { SP* , ( FileLine | DirectoryBlock ) } ;

FileLine        = FlowPrefix , "==" , SP , FileName , EOL ;

SP              = " " ;
EOL             = "\r\n" | "\n" ;
FileName        = NameChars ;
DirName         = NameChars ;
NameChars       = ? any valid file/directory name chars excluding separators ? ;
```

### 04-cli/*

* cli-overview.md: Command structure; config discovery; environment assumptions.
* cmd-inject.md: Behavior matrix (create/update/delete), `--file|--dir|--all|--force|--dry-run`; safety guarantees.
* cmd-list-ls.md: Output shapes (tree/flat); filtering.
* cmd-restore.md: Sources (`quicksave` snapshots), restore targets, dry-run restore.
* cmd-del*/ add* / log / audit / clear / quicksave / global-flags.md / exit-codes.md: Each with synopsis, options table, examples, and return codes.

Example per-command skeleton:

````markdown
# drrx inject

Synopsis:

```ps1
drrx inject --file <file> | --dir <dir> | --all <dir> [--force] [--dry-run]
```

Description:

- Applies the current `.drrx` spec to the target, reconciling differences deterministically.

Options:

| Option | Alias | Required | Description |
|---|---|---:|---|
| `--file <file>` | `--cow` | no | Inject a single file path declared in spec |
| `--dir <dir>`   | `--barn`| no | Inject a directory and its tree |
| `--all <dir>`   | `--farm`| no | Inject recursively from root |
| `--force`       |        | no | Allow destructive changes (see Safety) |
| `--dry-run`     |        | no | Show actions without applying |

Safety:

- No destructive ops without `--force`. See Security Model.

Examples:

- …

Exit codes:

- `0` success; `10` validation error; `20` parse error; `30` fs-permission; `40` conflict; `50` unknown.
````

### 05-workflows/*

* [Reconcile Target Directory](../05-workflows/reconcile-target-dir.md)
  * How diffs are computed
  * Precedence rules (spec vs target)
  * Conflict handling

* [Backups and Quicksave](../05-workflows/backups-and-quicksave.md)
  * Where snapshots live
  * Naming
  * Retention

* [Auditing and Change Review](../05-workflows/auditing-and-change-review.md)
  * Audit log format
  * How to diff between runs

* [Migration Existing Tree](../05-workflows/migration-existing-tree.md)
  * Ingest an existing directory into a `.drrx` (order: scan → normalize → emit UDL → review → inject)

### 06-recipes/*

* [Python Project Skeleton](../06-recipes/python-project-skeleton.md)
  * Python project layout
  * Monorepo packages
  * Docs + code split
  * Asset trees

* [Mixed Code and Docs](../06-recipes/mixed-code-and-docs.md)
  * Python project layout
  * Monorepo packages
  * Docs + code split
  * Asset trees

### 07-windows-deep-dive/*

* [Paths, CRLF, Case](../07-windows-deep-dive/paths-crlf-case.md)
  * Path separators
  * CRLF vs LF handling
  * Case sensitivity realities on Windows

* [Junctions and Symlinks](../07-windows-deep-dive/junctions-symlinks.md)
  * How DrRx treats them (create? ignore? validate?)

* [Permissions and ACLs](../07-windows-deep-dive/permissions-acls.md)
  * Running elevated? Handling denies

* [Long Paths Support](../07-windows-deep-dive/long-paths-support.md)
  * Enabling long paths
  * Behavior without it

### 08-reference/*

* [AST JSON Schema](../08-reference/ast-json-schema.md)
  * JSON Schema for the parser AST (node types: Root, Dir, File, Vein, FlowPrefix, SpacingMeta)

* [DrRx Conf Schema](../08-reference/drrx-conf-schema.md)
  * Machine-readable schema for `.drrx.conf.yaml` (if applicable)

* [Error Catalog](../08-reference/error-catalog.md)
  * IDs, messages, cause, remediation, examples

* [Logging Format](../08-reference/logging-format.md)
  * Log levels, fields, sample lines

Sample Error Catalog row:

| ID          | Name            | When                 | Message                         | Remediation                                     |
| ----------- | --------------- | -------------------- | ------------------------------- | ----------------------------------------------- |
| E-PARSE-001 | UnexpectedToken | token not in grammar | `Unexpected token ':' at col 3` | Check [udl-grammar-ebnf.md] and alignment rules |

### 09-test-and-quality/*

* [Conformance Suite](../09-test-and-quality/conformance-suite.md)
  * How to run a corpus of `.drrx` files to ensure grammar + semantics across versions

* [Fixtures and Golden Tests](../09-test-and-quality/fixtures-and-golden-tests.md)
  * Directory fixtures → expected AST → expected fs result

* [Coverage Strategy](../09-test-and-quality/coverage-strategy.md)
  * Parser, reconciler, CLI surface
  * Mutation tests for safety toggles

* [Performance Baselines](../09-test-and-quality/perf-baselines.md)
  * Large trees (10k nodes) targets & timing

### 10-project/*

* [Roadmap](../10-project/roadmap.md)
  * Short, Mid, Long—e.g., linter, formatter, symlink strategy, non-Windows support (future)

* [Versioning and Changelog](../10-project/versioning-and-changelog.md)
  * SemVer; categories; keep a `CHANGELOG.md` with a strict template.

* [Security Model](../10-project/security-model.md)
  * Destructive ops require `--force`; sandboxing; path traversal prevention; dry-run-first guidance.

* [Threat Checklist](../10-project/threat-checklist.md)
  * Mis-specified root, accidental deletes, privilege escalation, malicious spec injection.

* [Contributing](../10-project/contributing.md)
  * How to add a command, grammar change protocol, test expectations.

* [Code of Conduct](../10-project/code-of-conduct.md)
  * Standard.

---

## 3) Canonical Templates (drop-in)

### 3.1 Doc Page Template

```md
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

### 3.2 ADR Template (`/docs/10-project/decision-records/ADR-YYYYMMDD-<slug>.md`)

```md
# ADR: <Decision title>

- Status: Proposed | Accepted | Superseded
- Context: <Problem, constraints>
- Decision: <What we chose and why>
- Consequences: <Trade-offs, risks>
- Alternatives: <Briefly list>
- Links: <PRs, issues, specs>
```

### 3.3 Changelog Entry Template

```md
## [x.y.z] - 2025-10-24
### Added
- …

### Changed
- …

### Fixed
- …

### Security
- …
```

---

## 4) Style & Quality Gates

* Zero-Ambiguity Rule: Every operator has at least one pass and one fail example.
* Single Source Rule: UDL grammar → generated linter rules → CLI behavior; no divergence.
* Docs CI (later): Validate code blocks compile/run where applicable; link checker; schema validation for examples.

---

## 5) Acceptance Criteria (when this suite is “complete”)

1. A new user can install, author a minimal `.drrx`, dry-run, inject, list, quicksave, and restore—only from 00→02.
2. UDL is fully specified with grammar, spacing, alignment, and at least 10 canonical examples with pass/fail.
3. Every CLI command has a page with synopsis, options table, safety notes, examples, and exit codes.
4. Error Catalog covers all parse/validate/exec errors referenced by examples.
5. Conformance Suite doc includes how to run fixtures + expected outputs.
6. Security Model and Windows deep-dives exist and are cross-linked from risky commands (`--force`).

---

## 6) Immediate Next Steps (suggested order)

1. Draft 02-quickstart (install, first inject, dry-run/rollback).
2. Lock 03-udl-spec (dictionary, spacing, grammar, alignment) with pass/fail blocks.
3. Write 04-cli pages for `inject`, `restore`, `list/ls`, `quicksave` (the critical path).
4. Publish 08-reference/error-catalog.md and use IDs in all examples.
5. Add 05-workflows/reconcile-target-dir.md to explain deterministic planning.
6. Add 10-project/versioning-and-changelog.md + security-model.md.

---

# DrRx Phase 3 - Documentation Suite Plan MOC

## Goals & Audiences

### Goals
* Make the UDL unambiguous
* Make the CLI predictable
* Make operations safe
* New users reach "first successful inject" in <10 minutes
* Power users can script/automate confidently
* Contributors can extend parser/CLI without regressions

### Audiences
* Users: Author `.drrx`, run CLI
* Operators: Backup/restore/audit
* Contributors: Parser, AST, commands
* Reviewers: Security/UX

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
* Purpose: One-page map of the documentation
* Links: Quickstart and UDL Spec
* Clear: "Start here" guidance

### 01-concepts/
* [what-is-drrx.md](../01-concepts/what-is-drrx.md)
  * Problem statement
  * "Single source of truth for directories"
* [mental-model.md](../01-concepts/mental-model.md)
  * Source-of-truth (spec) ↔ reconciler (CLI) ↔ target (FS)
  * Idempotence & determinism
* [udl-overview.md](../01-concepts/udl-overview.md)
  * Symbols (`.`, `--`, `==`, `+`, `:`, `|`)
  * One canonical diagram

### 02-quickstart/
* [install-windows.md](../02-quickstart/install-windows.md)
  * Supported Windows versions
  * PowerShell prerequisites
  * Optional long-path enablement
* [first-inject.md](../02-quickstart/first-inject.md)
  * Create minimal `.drrx`
  * Run `drrx inject --dry-run`
  * Apply and verify with `drrx list`
* [dry-run-and-rollback.md](../02-quickstart/dry-run-and-rollback.md)
  * Using `--dry-run`
  * `quicksave` and `restore` safety loop

### 03-udl-spec/
* [udl-dictionary.md](../03-udl-spec/udl-dictionary.md)
  * Exact definitions for all operators
  * One-liners + non-ambiguous examples
* [udl-spacing-rules.md](../03-udl-spec/udl-spacing-rules.md)
  * [SP.01], [SP.02] with pass/fail visual examples
* [udl-grammar-ebnf.md](../03-udl-spec/udl-grammar-ebnf.md)
  * Formal grammar (see sample below)
* [udl-alignment-and-flow.md](../03-udl-spec/udl-alignment-and-flow.md)
  * Alignment to terminal chars
  * Vein continuity with `|`
  * Open/close semantics
* [udl-linting-guide.md](../03-udl-spec/udl-linting-guide.md)
  * Common mistakes
  * Linter rules
  * Auto-fix suggestions
* [udl-examples.md](../03-udl-spec/udl-examples.md)
  * Canonical trees (small→medium→large)
  * Mixed directories/files

### 04-cli/
* [cli-overview.md](../04-cli/cli-overview.md)
  * Command structure
  * Config discovery
  * Environment assumptions
* [cmd-inject.md](../04-cli/cmd-inject.md)
  * Behavior matrix (create/update/delete)
  * `--file|--dir|--all|--force|--dry-run`
  * Safety guarantees
* [cmd-list-ls.md](../04-cli/cmd-list-ls.md)
  * Output shapes (tree/flat)
  * Filtering options
* [cmd-restore.md](../04-cli/cmd-restore.md)
  * Sources (`quicksave` snapshots)
  * Restore targets
  * Dry-run restore
* [cmd-del-deldir-delall.md](../04-cli/cmd-del-deldir-delall.md)
* [cmd-adddir-addfile.md](../04-cli/cmd-adddir-addfile.md)
* [cmd-log-audit-clear.md](../04-cli/cmd-log-audit-clear.md)
* [cmd-quicksave.md](../04-cli/cmd-quicksave.md)
* [global-flags.md](../04-cli/global-flags.md)
* [exit-codes.md](../04-cli/exit-codes.md)

### 05-workflows/
* [reconcile-target-dir.md](../05-workflows/reconcile-target-dir.md)
  * How diffs are computed
  * Precedence rules (spec vs target)
  * Conflict handling
* [backups-and-quicksave.md](../05-workflows/backups-and-quicksave.md)
  * Where snapshots live
  * Naming conventions
  * Retention policies
* [auditing-and-change-review.md](../05-workflows/auditing-and-change-review.md)
  * Audit log format
  * How to diff between runs
* [migration-existing-tree.md](../05-workflows/migration-existing-tree.md)
  * Ingest existing directory into `.drrx`
  * Order: scan → normalize → emit UDL → review → inject

### 06-recipes/
* [python-project-skeleton.md](../06-recipes/python-project-skeleton.md)
* [mixed-code-and-docs.md](../06-recipes/mixed-code-and-docs.md)
* [monorepo-slices.md](../06-recipes/monorepo-slices.md)
* [template-repo-bootstrap.md](../06-recipes/template-repo-bootstrap.md)

### 07-windows-deep-dive/
* [paths-crlf-case.md](../07-windows-deep-dive/paths-crlf-case.md)
  * Path separators, CRLF vs LF handling
  * Case sensitivity realities on Windows
* [junctions-symlinks.md](../07-windows-deep-dive/junctions-symlinks.md)
  * How DrRx treats them (create? ignore? validate?)
* [permissions-acls.md](../07-windows-deep-dive/permissions-acls.md)
  * Running elevated? Handling denies
* [long-paths-support.md](../07-windows-deep-dive/long-paths-support.md)
  * Enabling long paths
  * Behavior without it

### 08-reference/
* [ast-json-schema.md](../08-reference/ast-json-schema.md)
  * JSON Schema for parser AST
  * Node types: Root, Dir, File, Vein, FlowPrefix, SpacingMeta
* [drrx-conf-schema.md](../08-reference/drrx-conf-schema.md)
  * Machine-readable schema for `.drrx.conf.yaml`
* [error-catalog.md](../08-reference/error-catalog.md)
  * IDs, messages, cause, remediation, examples
* [logging-format.md](../08-reference/logging-format.md)
  * Log levels, fields, sample lines

### 09-test-and-quality/
* [conformance-suite.md](../09-test-and-quality/conformance-suite.md)
  * How to run corpus of `.drrx` files
  * Grammar + semantics across versions
* [fixtures-and-golden-tests.md](../09-test-and-quality/fixtures-and-golden-tests.md)
  * Directory fixtures → expected AST → expected fs result
* [coverage-strategy.md](../09-test-and-quality/coverage-strategy.md)
  * Parser, reconciler, CLI surface
  * Mutation tests for safety toggles
* [perf-baselines.md](../09-test-and-quality/perf-baselines.md)
  * Large trees (10k nodes) targets & timing

### 10-project/
* [roadmap.md](../10-project/roadmap.md)
  * Short, Mid, Long term goals
  * Linter, formatter, symlink strategy
  * Non-Windows support (future)
* [versioning-and-changelog.md](../10-project/versioning-and-changelog.md)
  * SemVer
  * Categories
  * Keep `CHANGELOG.md` with strict template
* [security-model.md](../10-project/security-model.md)
  * Destructive ops require `--force`
  * Sandboxing
  * Path traversal prevention
  * Dry-run-first guidance
* [threat-checklist.md](../10-project/threat-checklist.md)
  * Mis-specified root
  * Accidental deletes
  * Privilege escalation
  * Malicious spec injection
* [contributing.md](../10-project/contributing.md)
  * How to add command
  * Grammar change protocol
  * Test expectations
* [code-of-conduct.md](../10-project/code-of-conduct.md)
  * Standard code of conduct
* [style-guide.md](../10-project/style-guide.md)
  * Writing style (no ambiguity, show pass/fail)
  * Code style pointers
* [architecture.md](../10-project/architecture.md)
  * High-level diagram
  * Lexer → Parser → AST → Planner (diff) → Executor → Reporter
* [decision-records.md](../10-project/decision-records.md)
  * ADR template & initial ADRs
  * Choose `|` as vein connector
  * Windows-first approach

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
* Zero-Ambiguity Rule: Every operator has at least one pass and one fail example
* Single Source Rule: UDL grammar → generated linter rules → CLI behavior; no divergence
* Docs CI (later): Validate code blocks compile/run where applicable; link checker; schema validation for examples

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
* [Phase 1 - Core Concepts](docs/DEVPLAN/phase_1.md)
* [Phase 2 - Implementation Details](docs/DEVPLAN/phase_2.md)

* Quickstart: install + “first inject” with minimal `.drrx`, dry-run → apply → verify → rollback.
* UDL Spec core: dictionary, spacing/alignment pass/fail, formal EBNF grammar with semantics notes.
* CLI pages: `inject`, `restore`, `list/ls` with synopsis/options/exit codes/examples.
* Workflow: reconcile plan (precedence rules, plan phases, dry-run).
* Reference: starter Error Catalog with concrete IDs/messages/remediation.
* Project: Security Model + Versioning/Changelog template.

## [docs/00-index.md](../00-index.md)

Directory Remedy (DrRx) – Documentation Hub

* Start here: [Quickstart › First Inject](#docs02-quickstartfirst-injectmd)
* UDL Spec: [Dictionary](#docs03-udl-specudl-dictionarymd) • [Spacing Rules](#docs03-udl-specudl-spacing-rulesmd) • [Grammar (EBNF)](#docs03-udl-specudl-grammar-ebnfmd)
* CLI: [inject](#docs04-clicmd-injectmd) • [restore](#docs04-clicmd-restoremd) • [list/ls](#docs04-clicmd-list-lsmd)
* Workflows: [Reconcile target dir](#docs05-workflowsreconcile-target-dirmd)
* Reference: [Error Catalog](#docs08-referenceerror-catalogmd)
* Project: [Security Model](#docs10-projectsecurity-modelmd) • [Versioning & Changelog](#docs10-projectversioning-and-changelogmd)

---

## [docs/02-quickstart/install-windows.md](../02-quickstart/install-windows.md)

## Purpose

Install prerequisites and verify your environment on Windows.

## Requirements

* Windows 10 (22H2+) or 11
* PowerShell 7+
* Optional: Enable long paths

## Steps

1. Confirm PowerShell

   ```pwsh
   $PSVersionTable.PSVersion
   ```
2. Enable long paths (optional but recommended)

   * Local Group Policy or registry (`EnableWin32LongPaths = 1`).
3. Install DrRx (placeholder)

   * `pipx install drrx` *or* `pip install drrx` (update when packaging is ready).
4. Check

   ```pwsh
   drrx --help
   ```

---

## [docs/02-quickstart/first-inject.md](../02-quickstart/first-inject.md)

## Outcome

Create a minimal `.drrx`, dry-run it, apply, and verify.

## Minimal `.drrx` example

```drrx
.                  
:== README.md      
|                  
+-- src/           
| :== main.py      
:-- tests/         
  :== test_main.py
```

## Dry-run first

```pwsh
# assume you are inside the target directory
Get-Content .\.drrx | Out-Host    # sanity check

drrx inject --all . --dry-run
```

Expected: a plan (create README.md, create src/main.py, tests/test_main.py, create directories as needed). No FS changes.

## Apply

```pwsh
drrx inject --all .
```

## Verify

```pwsh
drrx list --dir .
```

## Rollback (if needed)

```pwsh
drrx quicksave
# after later changes
drrx restore --dir . --dry-run
# then
drrx restore --dir .
```

---

## [docs/03-udl-spec/udl-dictionary.md](../03-udl-spec/udl-dictionary.md)

## Operators

* `.` — root: declares root of the spec; root files appear first.
* `--` — directory op: introduces a directory name (must end with `/`).
* `==` — file op: introduces a file name (no trailing `/`).

## Flow Markers

* `+` — open flow: begin a new branch; children beneath must be carried by `|`.
* `:` — close flow: end/terminate flow at this line.
* `|` — vein: vertical connector that carries open flow through subsequent child lines.

## Notes

* Names must be valid Windows path elements for the active volume; `..` and reserved names are invalid.
* Root files list precedes directories; this guarantees deterministic planning.

---

## [docs/03-udl-spec/udl-spacing-rules.md](../03-udl-spec/udl-spacing-rules.md)

## [SP.01] Hierarchy spacing

* Default double-space per level.
* If the parent used open flow (`+`), immediate children may align with single space continuation to the vein end.

### PASS

```drrx
:-- drrx/
| :== main.py
| +-- commands/
|   :== drrx-dict.json
```

### FAIL (misaligned child)

```drrx
:-- drrx/
| :== main.py
| +-- commands/
 :== drrx-dict.json   # not aligned to preceding operator end
```

## [SP.02] Align to the terminal character of the prior operator

* A child line’s first non-space must align to the final char of the parent operator token.

### PASS

```drrx
:-- src/
  +-- python/
  | :== main.py
```

### FAIL (off-by-one)

```drrx
:-- src/
 +-- python/
 | :== main.py   # alignment drift
```

---

## [docs/03-udl-spec/udl-grammar-ebnf.md](../03-udl-spec/udl-grammar-ebnf.md)

```ebnf
Document        = RootHeader , RootPart* ;
RootHeader      = "." , EOL? ;
RootPart        = RootFileLine | Vein | DirectoryBlock ;

RootFileLine    = ":" , "==" , SP , FileName , EOL ;
Vein            = "|" , EOL ;

DirectoryBlock  = FlowPrefix , "--" , SP , DirName , "/" , EOL , Children? ;
FlowPrefix      = ":" | "+" ;

Children        = VeinChildren | ClosedChildren ;
VeinChildren    = { "|" , SP? , ( FileLine | DirectoryBlock ) } ;
ClosedChildren  = { SP+ , ( FileLine | DirectoryBlock ) } ;

FileLine        = FlowPrefix , "==" , SP , FileName , EOL ;

SP              = " " ;
EOL             = "\r\n" | "\n" ;
FileName        = NameChars ;
DirName         = NameChars ;
NameChars       = ? valid Windows filename chars excluding separators and reserved names ? ;
```

Semantics:

* `+` requires subsequent `|`-prefixed children until flow is closed.
* `:` terminates flow; children under a `:` block do not require `|` unless another `+` occurs.

---

## [docs/04-cli/cli-overview.md](../04-cli/cli-overview.md)

* Command: `drrx` (alias: `drrxm`)
* Principle: Reconcile a target directory to match the source-of-truth `.drrx` spec.
* Safety: All destructive ops require `--force`. Prefer `--dry-run` first.

---

## [docs/04-cli/cmd-inject.md](../04-cli/cmd-inject.md)

## Synopsis

```pwsh
drrx inject --file <file> | --dir <dir> | --all <dir> [--force] [--dry-run]
```

## Description

Reads `.drrx` in the working directory (or discovered via `--dir`) and computes a plan to synchronize the target with the spec.

## Options

| Option          | Alias    | Required | Description                                     |
| --------------- | -------- | -------: | ----------------------------------------------- |
| `--file <file>` | `--cow`  |       no | Inject only the specified file path from spec   |
| `--dir <dir>`   | `--barn` |       no | Inject a directory branch from spec             |
| `--all <dir>`   | `--farm` |       no | Inject entire spec into target directory        |
| `--force`       |          |       no | Permit destructive changes (deletes/overwrites) |
| `--dry-run`     |          |       no | Print plan only                                 |

## Behavior

* Validates grammar → builds AST → plans actions (create/update/delete) → executes.
* Without `--force`, deletes and overwrites are suppressed and reported.

## Exit Codes

* `0` OK; `10` validation error; `20` parse error; `30` fs permission; `40` conflict; `50` unknown.

## Examples

```pwsh
# full apply
drrx inject --all .
# dry-run only
drrx inject --all . --dry-run
# branch-only
drrx inject --dir .\src
```

---

## [docs/04-cli/cmd-restore.md](../04-cli/cmd-restore.md)

### Synopsis

```pwsh
drrx restore --dir <dir> [--force] [--dry-run]
```

### Description

Restores files/directories from the most recent `quicksave` snapshot for `<dir>`.

### Notes

* Snapshots are versioned and timestamped; see Backups & Quicksave.

### Exit Codes

Same as `inject`.

---

## [docs/04-cli/cmd-list-ls.md](../04-cli/cmd-list-ls.md)

### Synopsis

```pwsh
drrx list --dir <dir>
drrx ls   --dir <dir>
```

### Description

Display the current target tree and status relative to `.drrx` (planned).

### Modes (future)

* `--format tree|flat`
* `--only missing|extra|diff`

---

## [docs/05-workflows/reconcile-target-dir.md](../05-workflows/reconcile-target-dir.md)

### Overview

The reconciler computes desired state from the `.drrx` AST and compares it with observed state (filesystem). It outputs an ordered plan.

#### Precedence Rules

1. The spec is authoritative.
2. Files present on disk but not in the spec are extras → either ignored or deleted (with `--force`).
3. Name clashes resolve to the spec’s type (file vs directory) with a conflict unless `--force`.

#### Plan Phases

1. Create missing directories/files.
2. Modify files when content policy allows (future: hashing/templating).
3. Delete extras (only with `--force`).

#### Dry-run

Always prints the plan; no filesystem writes.

---

## [docs/08-reference/error-catalog.md](../08-reference/error-catalog.md)

| ID          | Name                  | When                                             | Example Message                       | Remediation                                    |
| ----------- | --------------------- | ------------------------------------------------ | ------------------------------------- | ---------------------------------------------- |
| E-PARSE-001 | UnexpectedToken       | token not in grammar                             | `Unexpected token ':' at col 3`       | Check EBNF and spacing rules                   |
| E-PARSE-002 | MisalignedChild       | child not aligned to parent terminal             | `Child misaligned under :-- src/`     | See [SP.02] examples                           |
| E-VALID-010 | InvalidName           | invalid Windows path element                     | `Reserved name 'CON' under src/`      | Rename per Windows rules                       |
| E-PLAN-020  | TypeConflict          | spec says file, FS has directory (or vice versa) | `Type conflict at path 'docs'`        | Fix spec or target; use `--force` if replacing |
| E-EXEC-030  | PermissionDenied      | filesystem write denied                          | `ACL prevents write at 'C:\proj\src'` | Elevate or adjust ACL                          |
| E-SAFE-040  | DestructiveSuppressed | delete/overwrite without `--force`               | `Delete suppressed: tests/old/`       | Re-run with `--force` after review             |

---

## [docs/10-project/security-model.md](../10-project/security-model.md)

### Principles

* Dry-run-first: all docs and examples prefer `--dry-run` before apply.
* Least destruction: no deletes/overwrites without explicit `--force`.
* Path hygiene: reject `..`, absolute path escapes, and reserved device names.

## Threats & Mitigations

* Spec injection: Validate `.drrx` strictly; signed specs (future).
* Privilege escalation: Detect and refuse operations outside target root.
* Malicious deletes: Destructive ops gated by `--force` and plan preview.

---

## [docs/10-project/versioning-and-changelog.md](../10-project/versioning-and-changelog.md)

### Versioning

* SemVer for CLI and UDL grammar. Grammar-breaking changes bump major.

### Changelog Template

```md
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

# DrRx Phase 4 - Documentation Hub

## docs/00-index.md

Directory Remedy (DrRx) – Documentation Hub

* Start here: [Quickstart › First Inject](#docs02-quickstartfirst-injectmd)
* UDL Spec: [Dictionary](#docs03-udl-specudl-dictionarymd) • [Spacing Rules](#docs03-udl-specudl-spacing-rulesmd) • [Grammar (EBNF)](#docs03-udl-specudl-grammar-ebnfmd)
* CLI: [inject](#docs04-clicmd-injectmd) • [restore](#docs04-clicmd-restoremd) • [list/ls](#docs04-clicmd-list-lsmd)
* Workflows: [Reconcile target dir](#docs05-workflowsreconcile-target-dirmd)
* Reference: [Error Catalog](#docs08-referenceerror-catalogmd)
* Project: [Security Model](#docs10-projectsecurity-modelmd) • [Versioning & Changelog](#docs10-projectversioning-and-changelogmd)

---

## docs/02-quickstart/install-windows.md

### Purpose

Install prerequisites and verify your environment on Windows.

### Requirements

* Windows 10 (22H2+) or 11
* PowerShell 7+
* Optional: Enable long paths

### Steps

1. Confirm PowerShell

   ```pwsh
   $PSVersionTable.PSVersion
   ```
2. Enable long paths (optional but recommended)

   * Local Group Policy or registry (`EnableWin32LongPaths = 1`).
3. Install DrRx (placeholder)

   * `pipx install drrx` *or* `pip install drrx` (update when packaging is ready).
4. Check

   ```pwsh
   drrx --help
   ```

---

## docs/02-quickstart/first-inject.md

### Outcome

Create a minimal `.drrx`, dry-run it, apply, and verify.

### Minimal `.drrx` example

```drrx
.                  
:== README.md      
|                  
+-- src/           
| :== main.py      
:-- tests/         
  :== test_main.py
```

### Dry-run first

```pwsh
# assume you are inside the target directory
Get-Content .\.drrx | Out-Host    # sanity check

drrx inject --all . --dry-run
```

Expected: a plan (create README.md, create src/main.py, tests/test_main.py, create directories as needed). No FS changes.

### Apply

```pwsh
drrx inject --all .
```

### Verify

```pwsh
drrx list --dir .
```

### Rollback (if needed)

```pwsh
drrx quicksave
# after later changes
drrx restore --dir . --dry-run
# then
drrx restore --dir .
```

---

## docs/03-udl-spec/udl-dictionary.md

### Operators

* `.` — root: declares root of the spec; root files appear first.
* `--` — directory op: introduces a directory name (must end with `/`).
* `==` — file op: introduces a file name (no trailing `/`).

### Flow Markers

* `+` — open flow: begin a new branch; children beneath must be carried by `|`.
* `:` — close flow: end/terminate flow at this line.
* `|` — vein: vertical connector that carries open flow through subsequent child lines.

### Notes

* Names must be valid Windows path elements for the active volume; `..` and reserved names are invalid.
* Root files list precedes directories; this guarantees deterministic planning.

---

## docs/03-udl-spec/udl-spacing-rules.md

### [SP.01] Hierarchy spacing

* Default double-space per level.
* If the parent used open flow (`+`), immediate children may align with single space continuation to the vein end.

### PASS

```drrx
:-- drrx/
| :== main.py
| +-- commands/
|   :== drrx-dict.json
```

### FAIL (misaligned child)

```drrx
:-- drrx/
| :== main.py
| +-- commands/
 :== drrx-dict.json   # not aligned to preceding operator end
```

### [SP.02] Align to the terminal character of the prior operator

* A child line’s first non-space must align to the final char of the parent operator token.

### PASS

```drrx
:-- src/
  +-- python/
  | :== main.py
```

### FAIL (off-by-one)

```drrx
:-- src/
 +-- python/
 | :== main.py   # alignment drift
```

---

## docs/03-udl-spec/udl-grammar-ebnf.md

```ebnf
Document        = RootHeader , RootPart* ;
RootHeader      = "." , EOL? ;
RootPart        = RootFileLine | Vein | DirectoryBlock ;

RootFileLine    = ":" , "==" , SP , FileName , EOL ;
Vein            = "|" , EOL ;

DirectoryBlock  = FlowPrefix , "--" , SP , DirName , "/" , EOL , Children? ;
FlowPrefix      = ":" | "+" ;

Children        = VeinChildren | ClosedChildren ;
VeinChildren    = { "|" , SP? , ( FileLine | DirectoryBlock ) } ;
ClosedChildren  = { SP+ , ( FileLine | DirectoryBlock ) } ;

FileLine        = FlowPrefix , "==" , SP , FileName , EOL ;

SP              = " " ;
EOL             = "\r\n" | "\n" ;
FileName        = NameChars ;
DirName         = NameChars ;
NameChars       = ? valid Windows filename chars excluding separators and reserved names ? ;
```

Semantics:

* `+` requires subsequent `|`-prefixed children until flow is closed.
* `:` terminates flow; children under a `:` block do not require `|` unless another `+` occurs.

---

## docs/04-cli/cli-overview.md

* Command: `drrx` (alias: `drrxm`)
* Principle: Reconcile a target directory to match the source-of-truth `.drrx` spec.
* Safety: All destructive ops require `--force`. Prefer `--dry-run` first.

---

## docs/04-cli/cmd-inject.md

### Synopsis

```pwsh
drrx inject --file <file> | --dir <dir> | --all <dir> [--force] [--dry-run]
```

### Description

Reads `.drrx` in the working directory (or discovered via `--dir`) and computes a plan to synchronize the target with the spec.

### Options

| Option          | Alias    | Required | Description                                     |
| --------------- | -------- | -------: | ----------------------------------------------- |
| `--file <file>` | `--cow`  |       no | Inject only the specified file path from spec   |
| `--dir <dir>`   | `--barn` |       no | Inject a directory branch from spec             |
| `--all <dir>`   | `--farm` |       no | Inject entire spec into target directory        |
| `--force`       |          |       no | Permit destructive changes (deletes/overwrites) |
| `--dry-run`     |          |       no | Print plan only                                 |

### Behavior

* Validates grammar → builds AST → plans actions (create/update/delete) → executes.
* Without `--force`, deletes and overwrites are suppressed and reported.

## Exit Codes

* `0` OK; `10` validation error; `20` parse error; `30` fs permission; `40` conflict; `50` unknown.

## Examples

```pwsh
# full apply
drrx inject --all .
# dry-run only
drrx inject --all . --dry-run
# branch-only
drrx inject --dir .\src
```

---

## docs/04-cli/cmd-restore.md

### Synopsis

```pwsh
drrx restore --dir <dir> [--force] [--dry-run]
```

### Description

Restores files/directories from the most recent `quicksave` snapshot for `<dir>`.

### Notes

* Snapshots are versioned and timestamped; see Backups & Quicksave.

### Exit Codes

Same as `inject`.

---

## docs/04-cli/cmd-list-ls.md

### Synopsis

```pwsh
drrx list --dir <dir>
drrx ls   --dir <dir>
```

### Description

Display the current target tree and status relative to `.drrx` (planned).

### Modes (future)

* `--format tree|flat`
* `--only missing|extra|diff`

---

## docs/05-workflows/reconcile-target-dir.md

### Overview

The reconciler computes desired state from the `.drrx` AST and compares it with observed state (filesystem). It outputs an ordered plan.

### Precedence Rules

1. The spec is authoritative.
2. Files present on disk but not in the spec are extras → either ignored or deleted (with `--force`).
3. Name clashes resolve to the spec’s type (file vs directory) with a conflict unless `--force`.

### Plan Phases

1. Create missing directories/files.
2. Modify files when content policy allows (future: hashing/templating).
3. Delete extras (only with `--force`).

### Dry-run

Always prints the plan; no filesystem writes.

---

## docs/08-reference/error-catalog.md

| ID          | Name                  | When                                             | Example Message                       | Remediation                                    |
| ----------- | --------------------- | ------------------------------------------------ | ------------------------------------- | ---------------------------------------------- |
| E-PARSE-001 | UnexpectedToken       | token not in grammar                             | `Unexpected token ':' at col 3`       | Check EBNF and spacing rules                   |
| E-PARSE-002 | MisalignedChild       | child not aligned to parent terminal             | `Child misaligned under :-- src/`     | See [SP.02] examples                           |
| E-VALID-010 | InvalidName           | invalid Windows path element                     | `Reserved name 'CON' under src/`      | Rename per Windows rules                       |
| E-PLAN-020  | TypeConflict          | spec says file, FS has directory (or vice versa) | `Type conflict at path 'docs'`        | Fix spec or target; use `--force` if replacing |
| E-EXEC-030  | PermissionDenied      | filesystem write denied                          | `ACL prevents write at 'C:\proj\src'` | Elevate or adjust ACL                          |
| E-SAFE-040  | DestructiveSuppressed | delete/overwrite without `--force`               | `Delete suppressed: tests/old/`       | Re-run with `--force` after review             |

---

## docs/10-project/security-model.md

### Principles

* Dry-run-first: all docs and examples prefer `--dry-run` before apply.
* Least destruction: no deletes/overwrites without explicit `--force`.
* Path hygiene: reject `..`, absolute path escapes, and reserved device names.

### Threats & Mitigations

* Spec injection: Validate `.drrx` strictly; signed specs (future).
* Privilege escalation: Detect and refuse operations outside target root.
* Malicious deletes: Destructive ops gated by `--force` and plan preview.

---

## docs/10-project/versioning-and-changelog.md

### Versioning

* SemVer for CLI and UDL grammar. Grammar-breaking changes bump major.

### Changelog Template

```md
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

---

## docs/03-udl-spec/udl-linting-guide.md

### Purpose

Define concrete lint rules for `.drrx` files with rule IDs, severities, examples, and suggested auto-fixes.

### Lint Rule Index

| ID          | Name                | Severity | Detects                                                 | Auto-fix                                                |          |                                                |
| ----------- | ------------------- | -------- | ------------------------------------------------------- | ------------------------------------------------------- | -------- | ---------------------------------------------- |
| L-ALIGN-001 | MisalignedChild     | error    | Child not aligned to parent operator terminal ([SP.02]) | compute correct indent and reflow line                  |          |                                                |
| L-SPACE-002 | BadHierarchySpacing | warn     | Double-space vs single-space misuse ([SP.01])           | normalize indentation based on parent flow (`+` vs `:`) |          |                                                |
| L-FLOW-003  | MissingVeinCarrier  | error    | Children under `+` missing `                            | ` carrier                                               | insert ` | `lines or convert parent`+`→`:` if no children |
| L-FLOW-004  | StrayVein           | error    | `                                                       | ` present where no open flow exists                     | drop `   | `or change ancestor`:`→`+`                     |
| L-DIR-005   | DirMissingSlash     | error    | Directory line `-- name` without trailing `/`           | append `/`                                              |          |                                                |
| L-FILE-006  | FileHasSlash        | error    | File line `== name/` has trailing `/`                   | remove `/`                                              |          |                                                |
| L-ROOT-007  | RootFilesOrder      | warn     | Root files not grouped at top                           | move root `:==` block before first directory            |          |                                                |
| L-NAME-008  | InvalidName         | error    | Windows-reserved or invalid path element                | suggest alternative, escape, or rename                  |          |                                                |
| L-DUP-009   | DuplicateSibling    | error    | Two nodes with same name/type under one parent          | rename or merge                                         |          |                                                |
| L-FLOW-010  | InconsistentPrefix  | warn     | Mixed `+`/`:` usage producing redundant veins           | simplify to minimal `+` usage                           |          |                                                |

### Rule Details & Examples

#### L-ALIGN-001 — MisalignedChild (error)

Detects: child line’s first non-space not aligned to final char of parent operator.

> Fail

```drrx
:-- src/
 +-- python/
 | :== main.py
```

> Pass

```drrx
:-- src/
  +-- python/
  | :== main.py
```

Auto-fix: re-indent child lines to the computed column.

---

#### L-FLOW-003 — MissingVeinCarrier (error)

Detects: parent uses `+` but immediate children are not carried by `|`.

> Fail

```drrx
+-- src/
  :== main.py
```

> Pass

```drrx
+-- src/
| :== main.py
```

Auto-fix: insert `|` before each child or convert parent to `:--` when branch is terminal.

---

#### L-DIR-005 — DirMissingSlash (error)

Detects: directory declaration lacks trailing `/`.

> Fail

```
:-- src
```

> Pass

```
:-- src/
```

Auto-fix: append `/`.

---

#### L-ROOT-007 — RootFilesOrder (warn)

Detects: root `:==` files placed after first directory.

> Fail

```drrx
.
:-- drrx/
:== pyproject.toml
```

> Pass

```drrx
.
:== pyproject.toml
| 
:-- drrx/
```

Auto-fix: move all root files block above first directory.

---

#### Error Mapping (Lint → Parse/Plan)

| Lint ID     | Likely Runtime Error                   |    |
| ----------- | -------------------------------------- | -- |
| L-ALIGN-001 | E-PARSE-002 MisalignedChild            |    |
| L-FLOW-003  | E-PARSE-001 UnexpectedToken (missing ` | `) |
| L-DIR-005   | E-VALID-010 InvalidName/TypeConflict   |    |
| L-DUP-009   | E-PLAN-020 TypeConflict                |    |

---

## docs/09-test-and-quality/conformance-suite.md

### Purpose

Guarantee grammar + semantics stability across versions by running a public corpus of `.drrx` fixtures and verifying AST + plan + (optional) filesystem results.

### Repository Layout (tests)

```
conformance/
  fixtures/
    pass/
      small-basic.drrx
      deep-veins.drrx
      windows-names.drrx
    fail/
      misaligned-child.drrx
      missing-vein.drrx
      bad-dir-slash.drrx
  expected/
    ast/
      small-basic.json
      deep-veins.json
    plan/
      small-basic.plan.json
      deep-veins.plan.json
  scripts/
    run.ps1
  README.md
```

### What is Verified

1. Parse: `.drrx` → AST equals expected JSON (stable schema).
2. Plan: AST → action plan equals expected (ordered, idempotent).
3. Exec (optional): Apply to temp dir; resulting tree matches expected manifest.

### AST JSON Schema (excerpt)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "DrRxAST",
  "type": "object",
  "properties": {
    "type": { "const": "Document" },
    "root": { "$ref": "#/definitions/Node" }
  },
  "definitions": {
    "Node": {
      "type": "object",
      "properties": {
        "kind": { "enum": ["Root", "Dir", "File", "Vein"] },
        "name": { "type": "string" },
        "flow": { "enum": ["open", "close", null] },
        "children": { "type": "array", "items": { "$ref": "#/definitions/Node" } }
      },
      "required": ["kind"]
    }
  },
  "required": ["type", "root"]
}
```

### Golden Plan Format (excerpt)

```json
{
  "version": 1,
  "actions": [
    { "op": "mkdir", "path": "src" },
    { "op": "write", "path": "README.md", "mode": "create" },
    { "op": "touch", "path": "src/main.py" }
  ]
}
```

### Runner (`conformance/scripts/run.ps1` outline)

```powershell
param(
  [switch]$Exec
)

$root = Join-Path $PSScriptRoot '..'
$fixtures = Get-ChildItem (Join-Path $root 'fixtures/pass') -Filter *.drrx

foreach ($f in $fixtures) {
  $ast = drrx parse --file $f.FullName --json
  Compare-Json $ast (Get-Content (Join-Path $root 'expected/ast' ($f.BaseName + '.json')) -Raw)

  $plan = drrx plan --file $f.FullName --json
  Compare-Json $plan (Get-Content (Join-Path $root 'expected/plan' ($f.BaseName + '.plan.json')) -Raw)

  if ($Exec) {
    $tmp = New-Item -ItemType Directory -Force (Join-Path $env:TEMP ("drrx-" + [guid]::NewGuid()))
    drrx inject --all $tmp --dry-run | Out-Null
    drrx inject --all $tmp | Out-Null
    # TODO: verify tree matches manifest
    Remove-Item $tmp -Recurse -Force
  }
}
```

### Policies

* No fixture changes without a changelog entry.
* Grammar-affecting changes bump major version.
* Every bug fixed adds a regression fixture.

---

## docs/07-windows-deep-dive/paths-crlf-case.md

### Path Separators & Normalization

* Internally normalize to `\` on Windows. Accept `/` in spec but emit normalized paths.
* Reject `..` path elements and absolute drive escapes.

### CRLF vs LF

* Parser tolerant of `
  ` and `
  `. When writing files, preserve existing line endings unless an explicit policy changes them (future).

### Case Sensitivity

* Windows is case-insensitive by default; treat names case-insensitively when reconciling.
* Detect case-only conflicts and warn: `L-NAME-011 CaseOnlyDiff` (warn) → plan chooses canonical casing from spec.

---

## docs/07-windows-deep-dive/junctions-symlinks.md

### Policy (v1)

* Read: treat symlinks/junctions as opaque directory/file entries; do not traverse across link boundaries unless `--follow-links` is provided (future).
* Write: DrRx does not create symlinks/junctions in v1.

### Risks

* Infinite recursion if following links; plan must detect cycles.
* Privilege requirements for creating symlinks.

### Lint hooks

* L-LINK-012 (warn): spec path matches typical link directories (`node_modules`, `.venv`) → recommend ignoring or pinning policy.

---

## docs/07-windows-deep-dive/permissions-acls.md

### Execution Model

* CLI inherits current user token; no elevation performed by DrRx.

### Common Failures

* `E-EXEC-030 PermissionDenied` on system-protected paths.
* `E-EXEC-031 ReadOnlyFile` when overwriting without clearing attribute.

### Guidance

* Use developer locations (e.g., within user profile) for initial tests.
* For org paths, coordinate with IT to ensure ACL write permission.

---

## docs/07-windows-deep-dive/long-paths-support.md

### Background

* Legacy MAX_PATH (260 chars) limits deep trees.

### Enabling Long Paths

* Group Policy: Computer Configuration → Administrative Templates → System → Filesystem → Enable Win32 long paths = Enabled.
* Registry (requires reboot):

  * `HKLM\SYSTEM\CurrentControlSet\Control\FileSystem` → `EnableWin32LongPaths=1` (DWORD)

### DrRx Behavior

* Detect long-path support at runtime; warn if disabled and a plan includes paths > 260.
* Lint rule: L-PATH-013 LongPathRisk (warn) with count of affected nodes.

---
