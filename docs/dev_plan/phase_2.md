# DrRx Phase 2 - Implementation Details

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

## 0) Goals & Audiences

- Goals: Make the UDL unambiguous, the CLI predictable, and ops safe. New users reach “first successful inject” in <10 minutes; power users can script/automate confidently; contributors can extend parser/CLI without regressions.
- Audiences: (a) Users (author .drrx, run CLI), (b) Operators (backup/restore/audit), (c) Contributors (parser, AST, commands), (d) Reviewers (security/UX).

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

- Purpose: One-page map of the documentation. Links to Quickstart and UDL Spec. Clear “Start here”.

### 01-concepts/*

- what-is-drrx.md: Problem statement; “single source of truth for directories.”
- mental-model.md: Source-of-truth (spec) ↔ reconciler (CLI) ↔ target (FS). Idempotence & determinism.
- udl-overview.md: Symbols (`.`, `--`, `==`, `+`, `:`, `|`) with one canonical diagram.

### 02-quickstart/*

- install-windows.md: Supported Windows versions; PowerShell prerequisites; optional long-path enablement.
- first-inject.md: Create a minimal `.drrx`; run `drrx inject --dry-run`; apply; verify with `drrx list`.
- dry-run-and-rollback.md: Using `--dry-run`, `quicksave`, and `restore` safety loop.

### 03-udl-spec/*

- udl-dictionary.md: Exact definitions for all operators; one-liners + non-ambiguous examples.
- udl-spacing-rules.md: [SP.01], [SP.02] with pass/fail visual examples.
- udl-grammar-ebnf.md: Formal grammar (see sample below).
- udl-alignment-and-flow.md: Alignment to terminal chars; vein continuity with `|`; open/close semantics.
- udl-linting-guide.md: Common mistakes; linter rules; auto-fix suggestions (if any).
- udl-examples.md: Canonical trees (small→medium→large), including mixed directories/files.

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

- cli-overview.md: Command structure; config discovery; environment assumptions.
- cmd-inject.md: Behavior matrix (create/update/delete), `--file|--dir|--all|--force|--dry-run`; safety guarantees.
- cmd-list-ls.md: Output shapes (tree/flat); filtering.
- cmd-restore.md: Sources (`quicksave` snapshots), restore targets, dry-run restore.
- cmd-del*/ add* / log / audit / clear / quicksave / global-flags.md / exit-codes.md: Each with synopsis, options table, examples, and return codes.

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

- [Reconcile Target Directory](../05-workflows/reconcile-target-dir.md)
  - How diffs are computed
  - Precedence rules (spec vs target)
  - Conflict handling

- [Backups and Quicksave](../05-workflows/backups-and-quicksave.md)
  - Where snapshots live
  - Naming
  - Retention

- [Auditing and Change Review](../05-workflows/auditing-and-change-review.md)
  - Audit log format
  - How to diff between runs

- [Migration Existing Tree](../05-workflows/migration-existing-tree.md)
  - Ingest an existing directory into a `.drrx` (order: scan → normalize → emit UDL → review → inject)

### 06-recipes/*

- [Python Project Skeleton](../06-recipes/python-project-skeleton.md)
  - Python project layout
  - Monorepo packages
  - Docs + code split
  - Asset trees

- [Mixed Code and Docs](../06-recipes/mixed-code-and-docs.md)
  - Python project layout
  - Monorepo packages
  - Docs + code split
  - Asset trees

### 07-windows-deep-dive/*

- [Paths, CRLF, Case](../07-windows-deep-dive/paths-crlf-case.md)
  - Path separators
  - CRLF vs LF handling
  - Case sensitivity realities on Windows

- [Junctions and Symlinks](../07-windows-deep-dive/junctions-symlinks.md)
  - How DrRx treats them (create? ignore? validate?)

- [Permissions and ACLs](../07-windows-deep-dive/permissions-acls.md)
  - Running elevated? Handling denies

- [Long Paths Support](../07-windows-deep-dive/long-paths-support.md)
  - Enabling long paths
  - Behavior without it

### 08-reference/*

- [AST JSON Schema](../08-reference/ast-json-schema.md)
  - JSON Schema for the parser AST (node types: Root, Dir, File, Vein, FlowPrefix, SpacingMeta)

- [DrRx Conf Schema](../08-reference/drrx-conf-schema.md)
  - Machine-readable schema for `.drrx.conf.yaml` (if applicable)

- [Error Catalog](../08-reference/error-catalog.md)
  - IDs, messages, cause, remediation, examples

- [Logging Format](../08-reference/logging-format.md)
  - Log levels, fields, sample lines

Sample Error Catalog row:

| ID          | Name            | When                 | Message                         | Remediation                                     |
| ----------- | --------------- | -------------------- | ------------------------------- | ----------------------------------------------- |
| E-PARSE-001 | UnexpectedToken | token not in grammar | `Unexpected token ':' at col 3` | Check [udl-grammar-ebnf.md] and alignment rules |

### 09-test-and-quality/*

- [Conformance Suite](../09-test-and-quality/conformance-suite.md)
  - How to run a corpus of `.drrx` files to ensure grammar + semantics across versions

- [Fixtures and Golden Tests](../09-test-and-quality/fixtures-and-golden-tests.md)
  - Directory fixtures → expected AST → expected fs result

- [Coverage Strategy](../09-test-and-quality/coverage-strategy.md)
  - Parser, reconciler, CLI surface
  - Mutation tests for safety toggles

- [Performance Baselines](../09-test-and-quality/perf-baselines.md)
  - Large trees (10k nodes) targets & timing

### 10-project/*

- [Roadmap](../10-project/roadmap.md)
  - Short, Mid, Long—e.g., linter, formatter, symlink strategy, non-Windows support (future)

- [Versioning and Changelog](../10-project/versioning-and-changelog.md)
  - SemVer; categories; keep a `CHANGELOG.md` with a strict template.

- [Security Model](../10-project/security-model.md)
  - Destructive ops require `--force`; sandboxing; path traversal prevention; dry-run-first guidance.

- [Threat Checklist](../10-project/threat-checklist.md)
  - Mis-specified root, accidental deletes, privilege escalation, malicious spec injection.

- [Contributing](../10-project/contributing.md)
  - How to add a command, grammar change protocol, test expectations.

- [Code of Conduct](../10-project/code-of-conduct.md)
  - Standard.

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

- Zero-Ambiguity Rule: Every operator has at least one pass and one fail example.
- Single Source Rule: UDL grammar → generated linter rules → CLI behavior; no divergence.
- Docs CI (later): Validate code blocks compile/run where applicable; link checker; schema validation for examples.

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

If this structure works for you, I’ll proceed to PHASE_3 by stubbing the highest-value pages (Quickstart, UDL Spec core, CLI inject/restore) in your preferred style and tone.
