# Directory Remedy [Dr.Rx] Syntax

## DICTIONARY

STRUCTURE OPERATORS (see [RT.01](rules.md#RT.01), [DR.01](rules.md#DR.01), [FI.01](rules.md#FI.01)):

- `.`: root_directory — Indicates the root directory of the managed tree. Must be the first non-empty, non-comment line.
- `--`: directory — Declares a directory node. The token is followed by a space and a directory name, optionally ending with `/` for readability.
- `==`: file — Declares a file node. The token is followed by a space and a file name.

FLOW OPERATORS (see [FW.*](rules.md#FW.01)):

- `|`: vein — Draws a vertical continuation line to connect siblings/children. Required wherever a parent’s flow remains open.
- `+`: open_vein — Opens/continues flow from the current node so children may follow. Paired with `|` on subsequent lines under the same column.
- `:`: close_vein — Closes sibling continuity at the current depth; after this node’s subtree, no more siblings follow at this depth (children of this node are allowed).
  - Grouping convention: within a directory, list files first, insert a spacer `|` line, then list subdirectories (see [OR.02](rules.md#OR.02)).
  - File→Directory spacer — After a file at depth N, when a directory sibling follows at the same depth, insert a standalone `|` line at depth N to visually separate groups (see [FW.06](rules.md#FW.06)).

OTHER TOKENS (see [NM.*](rules.md#NM.01), [WN.02](rules.md#WN.02), [CM.*](rules.md#CM.01)):

- `#`: comment — Begins an inline comment; parser ignores from `#` to end-of-line when not inside a quoted name.
- `"..."`: quoted_name — Allows spaces and special characters in names. Use `\"` to escape quotes inside.
- `\`: escape — Escape character within quoted names.

Minimal examples:

  ```drrx
  .                 # Root directory indicator
  +-- python/       # `+` opens vein under `python/`
  | :== main.py     # `:` file, no further siblings at this depth
  ```

  ```drrx
  :-- drrx/
    :-- src/                # close flow: no more under `drrx/` after this subtree
      +-- python/
      | +== main.py         # `+` under `python/` allows a sibling after this file
      | :== test.py         # `:` ends the open vein under `python/`
  ```

### Example DrRx Tree Syntax

```drrx
.                                # Root directory indicator
+== .drrx.conf.yaml              # File operation indicator in the root directory, root files are always at the top of the syntax tree
+== pyproject.toml                
|                                # Vein flow operator connecting the root directory(and its files) to directory(`drrx/`) and its files(`src/`)
:-- drrx/                       
  :-- src/                       # `:` indicates closed flow operator, so no more Vein Flow Operators(`|`) required to connect anything below 
    +-- python/                  # `+` indicates open flow operator, so a new Vein Flow Operator(`|`) is required to connect anything below it
    | +== main.py                # `:==` indicates file operation indicator, two spaces are made, new file is created with the given name
    | |
    | +-- commands/             
    | | :== drrx-dict.json       
    | |                          # vein flow operator(`|`) is always required to separate files from directories
    | +-- modules/               # `+` indicates open flow operator, so a new Vein Flow Operator(`|`) is required to connect anything below it
    |   +== cli_example.py     
    |   :== commands.py       
    |
    +-- udl/
      +-- directory/
      | +== DirectoryExampleOne.drrx
      | :== DirectoryExampleTwo.drrx
      |
      +-- file/
        +== exampleFile.drrx
        :== exampleFileTwo.drrx
```

--

## RULES

### SPACING AND INDENTATION

[SP.01] - Indentation step is two spaces per tree depth.
            - Exception: When a parent line uses `+` (open_vein), the immediate child line places a single space before `|` to align the `|` under the column immediately after the parent's operator.

- Example:

  ```drrx
  :-- drrx/
  | +== main.py
  | |
  | +-- commands/
  |   :== drrx-dict.json
  ```

[SP.02] - A new line must always adhere to the hierarchical alignment of the previous line’s operator end-column. The first visible token on a child line MUST align with the column of its parent’s trailing operator character.

- Example:

  ```drrx
  :-- drrx/ # This is a new directory line, there is no new files or folders to flow too, so `:` is used to indicate
    :-- src/ # begins with `:` hierarchally alights with the above directory operator(`--`) ending character (`-`)
      +-- python/ #  the open_vein (`+`) indicates the beginning of a new directory (`--`) with the given name
      | :== main.py # This is a new file line, the vein operator`:` indicates the ending of flow and a file is created with the given name
  ```

- `.`: Root directory indicator.
- `==`: File operation indicator.
- `--`: Directory flow indicator.

### FLOW OPERATORS

[FW.01] - The file operation indicator is always `==`

- `|`: `vein` = 'Acts as the hierarchal flow / structure between directories and files'
- `:`: `close_vein` = 'operator indicates the end of a Vein / hierarchical flow'
- `+`: `open_vein` =  'operator indicates the beginning of a flow(new directory or Vein)'

[FW.02] - The Vein flow operator is always `|`. It MUST appear on any line where a sibling follows later at the same depth.

- File→Directory spacer (see [FW.06](rules.md#FW.06)):
  - After a file at depth N, when a directory sibling follows at the same depth, insert a standalone `|` line at depth N to visually separate files from directories. This spacer is semantically neutral and improves readability.
  - Example:

    ```drrx
    | :-- mockup-directory/
    |   | :== pyproject.toml
    |   |
    |   :-- src/
    |     :== mockup-directory.drrx
    |     |
    |     :-- python/
    |       | :== main.py
    |       |
    ```

#### ROOT OPERATOR

[RT.01] - The root directory indicator is always `.`

#### DIRECTORY OPERATOR

[DR.01] - The directory operation indicator is always `--`

---

## COMPLETE SPECIFICATION

The following section formalizes the Dr.Rx tree syntax for reliable parsing, authoring, and tooling.

### 1. Source File Structure

- Encoding: UTF-8. Line endings: CRLF or LF accepted; normalized during parsing.
- The first non-empty, non-comment line MUST be the root operator `.`.
- Lines may contain an inline comment starting with `#` (outside quoted names).
- Blank lines are allowed anywhere; they do not affect structure.

### 2. Line Forms (Terminals)

- Root line: `.` optionally followed by comment.
- Directory line: `[flow_prefix] -- <name>[/] [annotations] [# comment]`
- File line: `[flow_prefix] == <name> [annotations] [# comment]`

Where:

- `flow_prefix` is a combination of indentation spaces and optional `+`, `:`, and `|` tokens used to depict connectivity (see §3).
- `<name>` is either an unquoted identifier (no spaces, no `#`, not starting with `.` or operator tokens) or a quoted name `"..."` supporting spaces and special characters. Trailing `/` is allowed only for directories as a visual hint; it is ignored semantically.
- `annotations` are optional structured hints enclosed in `{}` (see §6). If unused, omit entirely.

### 3. Flow and Indentation Rules

- Depth/indentation:
  - Each tree depth increases the indentation by exactly two spaces relative to its parent content column.
  - The content column for a node is the position of the first `-` in `--` (directory) or first `=` in `==` (file).
- Opening flow (`+`):
  - A line that introduces children uses `+` before its operator to indicate that a continuation `|` will be present beneath it.
  - The immediate next child line at greater depth must align a `|` under the parent’s content column and then continue with its own operator.
- Continuing flow (`|`):
  - Use `|` on any line at a given depth if there remains at least one more sibling later at that depth.
  - Omit `|` if the current line is the last at its depth and no further siblings will appear.
- File→Directory spacer (`|`):
  - When a file at depth N is followed by a directory sibling at depth N, insert a dedicated spacer line consisting only of a properly indented `|` to separate file and directory blocks (see [FW.06](rules.md#FW.06)).
  - The spacer line is semantically neutral; parsers MUST accept and ignore it structurally.
- Closing flow (`:`):
  - Use `:` to signal that after this node’s subtree, no further siblings will follow at the same depth. Children of the `:` node are permitted.
  - On file lines, `+`/`:` control sibling continuity only; files never have children.

Illustrative depth alignment:

```drrx
.                    # depth 0 (col 1)
+-- app/             # depth 1 opens flow; children expected
| +== README.md      # depth 2 child; `|` continues because another sibling follows
| :== LICENSE        # last child at depth 2; closes flow
```

Parsing heuristic (robust mode):

- Indentation determines parent/child. Flow tokens (`+`, `:`, `|`) are validated against expected continuity but do not override indentation-derived structure.
- When indentation and flow markers conflict, indentation wins; record a validation warning (see §8).

### 4. Naming, Quoting, and Windows Rules

- Unquoted names may include: letters, digits, `_`, `-`, `.`, and no spaces.
- Quoted names `"..."` may include spaces and any character except `"` unless escaped as `\"`.
- Prohibited names (Windows): `CON`, `PRN`, `AUX`, `NUL`, `COM1`..`COM9`, `LPT1`..`LPT9` (case-insensitive) and names ending with `.` or space.
 - Path length: support extended-length paths via `\\?\` internally; authors should avoid designs that exceed 260 characters unless the runtime enables long paths (see [WN.02](rules.md#WN.02)).
- Case: Windows file system comparisons are case-insensitive by default; semantic matching should be case-insensitive unless configured otherwise.

### 5. Comments and Whitespace

- Comments start with `#` and extend to end-of-line. Inside quoted names, `#` is literal.
- Tabs are disallowed; use spaces only. If tabs are encountered, the parser must error or normalize to spaces under a strictness setting.
- Trailing spaces are ignored.

### 6. Annotations (Optional Extension)

Annotations allow per-node metadata to guide tooling. Syntax: `{ key: value; key2: value2 }` placed after the name.

Supported keys (initial set):

- `state`: `present` | `absent` — desired presence. Default: `present`.
- `source`: `inline` | `template:<id>` | `url:<https>` — source of contents for files or directory templates.
- `mode`: `file` | `dir` — explicit node kind override; rarely needed.
- `ignore`: `true` — parser records node but executor ignores it.
- `attrs`: arbitrary string for user-defined attributes.

Examples:

```drrx
:-- build/ { state: absent }   # directory should be removed if present
+== "+ notes.txt" { ignore: true; attrs: "scratch" }
```

### 7. Formal Grammar (EBNF-ish)

```
file          := ws* root_line (nl line | nl)*
root_line     := '.' ws* comment?
line          := (dir_line | file_line | flow_spacer | comment_only | empty)
dir_line      := flow_prefix ws* '--' ws+ name slash_opt? ws* annotations? ws* comment?
file_line     := flow_prefix ws* '==' ws+ name ws* annotations? ws* comment?
flow_spacer   := spacer_prefix ws* comment?    # standalone vein line (see FW.06)
spacer_prefix := indent '|'                   
flow_prefix   := indent (('+'|':') ws*)? ('|' ws*)?
indent        := (two_sp)*           # two spaces per depth; tabs invalid
name          := quoted | unquoted
quoted        := '"' ( [^"\\] | '\\' . )* '"'
unquoted      := [A-Za-z0-9._-]+     # no spaces or '#' or operator starts
slash_opt     := '/'?
annotations   := '{' (key ':' value (';' key ':' value)*)? '}'
key           := unquoted
value         := quoted | unquoted
comment       := '#' [^\n\r]*
empty         := ws*                 # blank line
comment_only  := ws* comment
ws            := ' '
two_sp        := '  '
nl            := ('\n' | '\r\n')
```

### 8. Validation Rules and Errors

Hard errors (reject file):

- Missing root line `.` at top of file.
- Tab characters in indentation.
- Unknown operator sequence (not one of `--`, `==`).
- Name missing after operator.
- Unbalanced quotes in names or annotations.
- Duplicate sibling names with same kind (file vs dir) at the same depth.

Soft validations (warnings):

- Flow markers (`+`, `:`, `|`) inconsistent with indentation-derived structure.
- Trailing `/` used on files or omitted on directories inconsistently.
- Reserved Windows names encountered (tooling may auto-escape or map).

### 9. Execution Semantics (Mapping to FS)

- Directories (`--`): ensure existence when `state: present`; remove when `state: absent`.
- Files (`==`): ensure existence; contents sourced according to `source` if provided; otherwise leave empty or unchanged depending on command.
- Idempotence: applying the same Dr.Rx file multiple times must converge to the same FS state.
- Reconciliation: unspecified files/dirs in the target are left untouched unless an executor mode requests prune.

Suggested command mappings (informative; see CLI design):

- `inject`: parse and apply desired state to a target directory; honor `state`.
- `restore`: re-apply last saved desired state snapshot.
- `adddir`/`addfile`: read from FS and append nodes into Dr.Rx at a specified path.
- `del`/`deldir`/`delall`: mutate FS and optionally annotate Dr.Rx with `state: absent`.

### 10. Conformance Examples

Multiple children and sibling continuation:

```drrx
.
+-- src/
| +== main.py
| +== util.py
| :== __init__.py
:-- docs/
  :== overview.md
```

Quoted names and reserved names avoidance:

```drrx
.
+-- "Project Files"/
| :== "Read Me.txt"
:-- out/ { state: absent }
```

No-children directory, last at depth:

```drrx
.
+-- build/
| :== manifest.json
:-- dist/           # no `|` because `dist/` is last at depth 0
```

File→Directory spacer lines within a section:

```drrx
| +-- 08-reference/
| | +== ast-json-schema.md 
| | +== drrx-conf-schema.md
| | +== error-catalog.md
| | :== logging-format.md
| |
| +-- 09-test-and-quality/
| | +== conformance-suite.md
| | +== coverage-strategy.md
| | +== fixtures-and-golden-tests.md
| | :== perf-baselines.md
| |
```

### 11. UDL/Lexing Hints (for Editors)

- Operators: `.` `--` `==` `+` `:` `|` — distinct scopes for coloring.
- Names: unquoted identifiers; quoted strings with escapes.
- Comments: `#...` to end-of-line.
- Annotations: brace blocks `{...}` with key/value highlighting.
- Errors: flag tabs, unknown tokens, and misaligned `|` vs indentation.
- Spacer lines: allow standalone `|` lines as a distinct scope to improve readability.

### 12. Reserved and Future Extensions

- `@include "file.drrx"` directive to splice subtrees (reserved; not implemented here).
- `~` prefix for optional nodes that do not fail reconciliation if missing.
- Content hashes for files: `hash: sha256:...` in annotations.

---

## Minimal Parser Checklist

- Lex lines
  - Strip CRLF/LF; keep 1-based line numbers.
  - Split off comments starting `#` unless inside quotes.
  - Error on tabs in indentation; normalize spaces.
- Detect root
  - First non-empty, non-comment must be `.`; else error [RT.01].
- Tokenize line
  - Measure indentation (count of two-space steps) to compute depth.
  - Read optional `+` or `:` then optional `|` in prefix; record as flow flags.
  - Parse operator: `--` (dir) or `==` (file); else error.
  - Parse name: quoted or unquoted; handle escapes (`\"`).
  - Optional `/` after dir name is cosmetic.
  - Parse optional annotations `{ key: value; ... }`.
  - Standalone `|` (flow spacer) lines: recognize and skip; they do not yield nodes.
- Build tree
  - Maintain a stack by depth; attach current node as child of last node at depth-1.
  - On decreased depth, pop stack until parent depth matches.
  - Validate duplicate sibling names (case-insensitive on Windows).
- Validate
  - Hard errors: tabs, missing name, unbalanced quotes, unknown operator, duplicate sibling.
  - Warnings: flow/indent mismatch; reserved names; inconsistent trailing `/`; dangling `+` with no children; orphan spacer `|` with no following directory at depth; grouping violations when files/dirs interleave.
- Emit AST (see `drrx/ast.schema.json`)
  - Include node kind, name, depth, position, flow flags, annotations, children.
  - Optionally compute `path` per node.
- Reconciliation plan (for executor)
  - Present dirs/files: ensure exist; create as needed.
  - Absent state: remove.
  - Unspecified nodes: leave unless prune mode.

## windows tree vs drrx tree

### WINDOWS TREE

cli_command: `cmd /c "tree /F /A"`

```
Folder PATH listing
Volume serial number is EA05-8835
C:.
|   .markdownlint.json
|   
+---.scripts
|       dir_gen.py
|       
+---docs
|   |   00-index.md
|   |   
|   +---01-concepts
|   |       mental-model.md
|   |       udl-overview.md
|   |       what-is-drrx.md
|   |       
|   +---02-quickstart
|   |       dry-run-and-rollback.md
|   |       first-inject.md
|   |       install-windows.md
|   |
|   +---03-udl-spec
|   |       udl-alignment-and-flow.md
|   |       udl-dictionary.md
|   |       udl-examples.md
|   |       udl-grammar-ebnf.md
|   |       udl-linting-guide.md
|   |       udl-spacing-rules.md
|   |
|   +---04-cli
|   |       cli-overview.md
|   |       cmd-adddir-addfile.md
|   |       cmd-del-deldir-delall.md
|   |       cmd-inject.md
|   |       cmd-list-ls.md
|   |       cmd-log-audit-clear.md
|   |       cmd-quicksave.md
|   |       cmd-restore.md
|   |       exit-codes.md
|   |       global-flags.md
|   |
|   +---05-workflows
|   |       auditing-and-change-review.md
|   |       backups-and-quicksave.md
|   |       migration-existing-tree.md
|   |       reconcile-target-dir.md
|   |
|   +---06-recipes
|   |       mixed-code-and-docs.md
|   |       monorepo-slices.md
|   |       python-project-skeleton.md
|   |       template-repo-bootstrap.md
|   |
|   +---07-windows-deep-dive
|   |       junctions-symlinks.md
|   |       long-paths-support.md
|   |       paths-crlf-case.md
|   |       permissions-acls.md
|   |
|   +---08-reference
|   |       ast-json-schema.md
|   |       drrx-conf-schema.md
|   |       error-catalog.md
|   |       logging-format.md
|   |
|   +---09-test-and-quality
|   |       conformance-suite.md
|   |       coverage-strategy.md
|   |       fixtures-and-golden-tests.md
|   |       perf-baselines.md
|   |
|   +---10-project
|   |       architecture.md
|   |       code-of-conduct.md
|   |       contributing.md
|   |       decision-records.md
|   |       roadmap.md
|   |       security-model.md
|   |       style-guide.md
|   |       threat-checklist.md
|   |       versioning-and-changelog.md
|   |
|   +---dev_plan
|   |       phase_1.md
|   |       phase_2.md
|   |       phase_3.md
|   |       phase_4.md
|   |
|   \---mockup-directory
|       |   pyproject.toml
|       |
|       \---src
|           |   mockup-directory.drrx
|           |
|           +---python
|           |   |   main.py
|           |   |
|           |   +---commands
|           |   |       drrx-dict.json
|           |   |
|           |   \---modules
|           |           commands.py
|           |
|           \---udl
|               +---directory
|               |       DirectoryExampleOne.drrx
|               |       DirectoryExampleTwo.drrx
|               |
|               \---file
|                       exampleFile.drrx
|                       exampleFileTwo.drrx
|
\---drrx
        drrx.md
        drrx.yaml
```

### DrRx Syntax Style Tree

```text
.
| :== markdownlint.json
|    
+-- .scripts/
| :== dir_gen.py
|       
+-- docs/
| +== 00-index.md
| |   
| +-- 01-concepts/
| | +== mental-model.md
| | +== udl-overview.md
| | :== what-is-drrx.md
| |       
| +-- 02-quickstart/
| | +== dry-run-and-rollback.md
| | +== first-inject.md
| | :== install-windows.md
| |
| +-- 03-udl-spec/
| | +== udl-alignment-and-flow.md
| | +== udl-dictionary.md
| | +== udl-examples.md
| | +== udl-grammar-ebnf.md
| | +== udl-linting-guide.md
| | :== udl-spacing-rules.md
| |
| +-- 04-cli/
| | +== cli-overview.md
| | +== cmd-adddir-addfile.md
| | +== cmd-del-deldir-delall.md
| | +== cmd-inject.md
| | +== cmd-list-ls.md
| | +== cmd-log-audit-clear.md
| | +== cmd-quicksave.md
| | +== cmd-restore.md
| | +== exit-codes.md
| | :== global-flags.md
| |
| +-- 05-workflows/
| | +== auditing-and-change-review.md
| | +== backups-and-quicksave.md
| | +== migration-existing-tree.md
| | :== reconcile-target-dir.md
| |
| +-- 06-recipes/
| | +== mixed-code-and-docs.md
| | +== monorepo-slices.md
| | +== python-project-skeleton.md
| | :== template-repo-bootstrap.md
| |
| +-- 07-windows-deep-dive/
| |  +== junctions-symlinks.md
| |  +== long-paths-support.md
| |  +== paths-crlf-case.md
| |  :== permissions-acls.md
| |
| +-- 08-reference/
| | +== ast-json-schema.md
| | +== drrx-conf-schema.md
| | +== error-catalog.md
| | :== logging-format.md
| |
| +-- 09-test-and-quality/
| | +== conformance-suite.md
| | +== coverage-strategy.md
| | +== fixtures-and-golden-tests.md
| | :== perf-baselines.md
| |
| +-- 10-project/
| | +== architecture.md
| | +== code-of-conduct.md
| | +== contributing.md
| | +== decision-records.md
| | +== roadmap.md
| | +== security-model.md
| | +== style-guide.md
| | +== threat-checklist.md
| | :== versioning-and-changelog.md
| |
| +-- dev_plan/
| | +== phase_1.md
| | +== phase_2.md
| | +== phase_3.md
| | :== phase_4.md
| |
| :-- mockup-directory/
|   | :== pyproject.toml
|   |
|   :-- src/
|     :== mockup-directory.drrx
|     |
|     :-- python/
|       | :== main.py
|       |
|       +-- commands/
|       | :== drrx-dict.json
|       |  
|       :-- modules/
|         | +== cli_example.py
|         | :== commands.py
|         |
|         :-- udl/
|           :-- directory/
|           | +== DirectoryExampleOne.drrx
|           | :== DirectoryExampleTwo.drrx
|           |
|           :-- file/
|             +== exampleFile.drrx
|             :== exampleFileTwo.drrx
|
+-- drrx/
  +== drrx.md
  :== drrx.yaml
```
