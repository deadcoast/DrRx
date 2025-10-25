# Directory Remedy [Dr.Rx] Syntax

## DICTIONARY

STRUCTURE OPERATORS:

- `.`: root_directory == 'Indicates the root directory of the project.'
- `==`: file == 'Indicates the operation of a file.'
- `--`: directory == 'Indicates the operation of a directory.'

FLOW OPERATORS:

- `|`: vein == 'Acts as the hierarchal flow / structure between directories and files'
- `:`: close_vein == 'Indicates the end of a vein / hierarchical flow.'
- `+`: open_vein == 'Indicates the beginning of a flow(new directory or vein).'

Example:

  ```drrx
  .             # Root directory indicator
  +-- python/   # This is a new directory line, the open_vein operator(`+`) indicates the beginning of a new directory(`--`) with the given name
  ```

Example:

  ```drrx
  :-- drrx/                       
    :-- src/                       # new directory line, the open_vein(`+`) operator indicates the start of a vein / hierarchical flow
      +-- python/                  # open_vein allows the vein operator(`|`) to continue flow to children files below
      | +== main.py                # open_file operator(`+`) is spaced ONCE to lineup with the end of its parent directory operator (`--`)
      | :== test.py                # close_vein operator(`:`) indicates the ending of the above operator's vein flow
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
    | |                          # vein flow operator(`|`) is always required to seperate files from directories
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

[SP.01] - Always double spaced for hierachal flow.
            - UNLESS: Vein(`|`) flow operator is open(`+`), then only one space is required for hierarchical flow alignment.

- Example:

  ```drrx
  :-- drrx/
  | +== main.py
  | |
  | +-- commands/
  |   :== drrx-dict.json
  ```

[SP.02] - A new line must always adhere to the hierarchical alignment of the previous lines operator.

- Example:

  ```drrx
  :-- drrx/ # This is a new directory line, there is no new files or folders to flow too, so `:` is used to indicate
    :-- src/ # begins with `:` hierarchally alights with the above directory operator(`--`) ending character (`-`)
      +-- python/ #  the vein operator(`+`) indicates the beginning of a new directory(`--`) with the given name
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

[FW.02] - The Vein flow operator is always `|`

#### ROOT OPERATOR

[RT.01] - The root directory indicator is always `.`

#### DIRECTORY OPERATOR

[DR.01] - The directory operation indicator is always `--`

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
| +--04-cli/
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
+--drrx/
  +== drrx.md
  :== drrx.yaml
```
