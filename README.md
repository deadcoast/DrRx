<!-- calls: agent-guide -> AGENTS.md -->
# Dr.Rx — Directory Remedy

Dr.Rx is a strict, tree syntax (UDL) for managing Windows directory — files, folders, and their groupings — and a set of tooling patterns to reconcile a real directory with that declaration.

- Syntax overview: `drrx/syntax-overview.md`
- Normative rules: `drrx/rules.md`
- CLI design: `drrx/drrx.yaml`
- Schemas and examples: `drrx/ast.schema.json`, `drrx/annotations.schema.json`, `drrx/list-diff.schema.json`, `drrx/examples/ast-example.json`, `drrx/schemas/README.md`
- UDL validation map (for editors): `drrx/udl-validation-map.md`

## What It Does

- Declare a directory structure in a `.drrx` file using a compact tree layout.
- Keep files clearly separated from directories using flow markers and spacer bars.
- Reconcile a real directory to the declared structure in an idempotent, auditable way.
- Offer linting/UDL feedback in editors based on strict rules.

## Why It Helps

- Single source of truth for a project’s on-disk layout.
- Code reviewable changes to folder/file structure.
- Safe, repeatable apply/restore with dry-run and diff.
- Clean cognition: unambiguous flow markers and spacing conventions.

## The Syntax at a Glance

- `.` root; `--` directory; `==` file
- `+` open flow (children follow); `:` close flow (no children); `|` continuity
- Required spacer `|` between a file block and a following directory block at the same depth (see FW.06)
- Files first, then spacer `|`, then directories within a block (see OR.02)

## Medium Example

```drrx
.                                  # root
+== .drrx.conf.yaml
+== README.md
|                                    # spacer between root files and next directory
:-- app/                             # closed: no children shown under app
+-- src/                             # open: children follow
| +== main.py                        # files first in a block
| +== util.py
| :== __init__.py
| |                                  # spacer before subdirectories
| +-- modules/
| | +== mod_a.py
| | :== mod_b.py
| |
| :-- features/
|   +== feat_one.py
|   :== feat_two.py
|
+-- docs/
| :== overview.md
| |                                  # spacer before subdirectories
| :-- guides/                        # closed: no children under guides
|
:-- build/                           # closed: no children under build
```

This example demonstrates:
- Root files before directories, with a spacer `|` before the first directory.
- Within `src/`, files are contiguous and precede directories, separated by a spacer `|`.
- Closed directories (`:`) have no children.
- Spacer `|` lines improve scanability and are required between file and directory groups.

## How It Works

- The parser reads indentation (two spaces per depth) and flow markers to build an AST (see `drrx/ast.schema.json`).
- Validation applies strict rules (see `drrx/rules.md`) and produces diagnostics for editors.
- The executor reconciles a target directory to the desired state (present/absent), honoring annotations (e.g., `source`, `ignore`).

## Using the CLI (optional)

- Inject (apply declaration to FS):
  - `drrx inject --file C:\\path\\tree.drrx --dir C:\\target --dry-run`
- List & diff:
  - `drrx list --file C:\\path\\tree.drrx --dir C:\\target --diff --json`
- Restore from snapshot:
  - `drrx restore --dir C:\\target --snapshot .drrx.last.json`

See `drrx/drrx.yaml` for full command and option semantics.

## Validate Artifacts

- AST example validation (Node):
  - `npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json`
- AST example validation (Python):
  - `python -m jsonschema -i drrx/examples/ast-example.json drrx/ast.schema.json`
- List --diff JSON validation:
  - `npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d path/to/list-diff.json`

## Learn More

- Deep dive into operators and rules: `drrx/syntax-overview.md`, `drrx/rules.md`
- Editor integration and diagnostics: `drrx/udl-validation-map.md`
- Schemas and samples: `drrx/schemas/README.md`
