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

- Quickstart: install + “first inject” with minimal `.drrx`, dry-run → apply → verify → rollback.
- UDL Spec core: dictionary, spacing/alignment pass/fail, formal EBNF grammar with semantics notes.
- CLI pages: `inject`, `restore`, `list/ls` with synopsis/options/exit codes/examples.
- Workflow: reconcile plan (precedence rules, plan phases, dry-run).
- Reference: starter Error Catalog with concrete IDs/messages/remediation.
- Project: Security Model + Versioning/Changelog template.

## [docs/00-index.md](../00-index.md)

Directory Remedy (DrRx) – Documentation Hub

- Start here: [Quickstart › First Inject](#docs02-quickstartfirst-injectmd)
- UDL Spec: [Dictionary](#docs03-udl-specudl-dictionarymd) • [Spacing Rules](#docs03-udl-specudl-spacing-rulesmd) • [Grammar (EBNF)](#docs03-udl-specudl-grammar-ebnfmd)
- CLI: [inject](#docs04-clicmd-injectmd) • [restore](#docs04-clicmd-restoremd) • [list/ls](#docs04-clicmd-list-lsmd)
- Workflows: [Reconcile target dir](#docs05-workflowsreconcile-target-dirmd)
- Reference: [Error Catalog](#docs08-referenceerror-catalogmd)
- Project: [Security Model](#docs10-projectsecurity-modelmd) • [Versioning & Changelog](#docs10-projectversioning-and-changelogmd)

---

## [docs/02-quickstart/install-windows.md](../02-quickstart/install-windows.md)

## Purpose

Install prerequisites and verify your environment on Windows.

## Requirements

- Windows 10 (22H2+) or 11
- PowerShell 7+
- Optional: Enable long paths

## Steps

1. Confirm PowerShell

   ```pwsh
   $PSVersionTable.PSVersion
   ```
2. Enable long paths (optional but recommended)

   - Local Group Policy or registry (`EnableWin32LongPaths = 1`).
3. Install DrRx (placeholder)

   - `pipx install drrx` *or* `pip install drrx` (update when packaging is ready).
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

- `.` — root: declares root of the spec; root files appear first.
- `--` — directory op: introduces a directory name (must end with `/`).
- `==` — file op: introduces a file name (no trailing `/`).

## Flow Markers

- `+` — open flow: begin a new branch; children beneath must be carried by `|`.
- `:` — close flow: end/terminate flow at this line.
- `|` — vein: vertical connector that carries open flow through subsequent child lines.

## Notes

- Names must be valid Windows path elements for the active volume; `..` and reserved names are invalid.
- Root files list precedes directories; this guarantees deterministic planning.

---

## [docs/03-udl-spec/udl-spacing-rules.md](../03-udl-spec/udl-spacing-rules.md)

## [SP.01] Hierarchy spacing

- Default double-space per level.
- If the parent used open flow (`+`), immediate children may align with single space continuation to the vein end.

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

- A child line’s first non-space must align to the final char of the parent operator token.

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

- `+` requires subsequent `|`-prefixed children until flow is closed.
- `:` terminates flow; children under a `:` block do not require `|` unless another `+` occurs.

---

## [docs/04-cli/cli-overview.md](../04-cli/cli-overview.md)

- Command: `drrx` (alias: `drrxm`)
- Principle: Reconcile a target directory to match the source-of-truth `.drrx` spec.
- Safety: All destructive ops require `--force`. Prefer `--dry-run` first.

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

- Validates grammar → builds AST → plans actions (create/update/delete) → executes.
- Without `--force`, deletes and overwrites are suppressed and reported.

## Exit Codes

- `0` OK; `10` validation error; `20` parse error; `30` fs permission; `40` conflict; `50` unknown.

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

- Snapshots are versioned and timestamped; see Backups & Quicksave.

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

- `--format tree|flat`
- `--only missing|extra|diff`

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

- Dry-run-first: all docs and examples prefer `--dry-run` before apply.
- Least destruction: no deletes/overwrites without explicit `--force`.
- Path hygiene: reject `..`, absolute path escapes, and reserved device names.

## Threats & Mitigations

- Spec injection: Validate `.drrx` strictly; signed specs (future).
- Privilege escalation: Detect and refuse operations outside target root.
- Malicious deletes: Destructive ops gated by `--force` and plan preview.

---

## [docs/10-project/versioning-and-changelog.md](../10-project/versioning-and-changelog.md)

### Versioning

- SemVer for CLI and UDL grammar. Grammar-breaking changes bump major.

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
