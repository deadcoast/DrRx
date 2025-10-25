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
