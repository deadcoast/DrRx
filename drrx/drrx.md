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
    :-- src/                      # new directory line, the close_vein(`:`) operator indicates the end of a vein / hierarchical flow
      +-- python/                 # open_vein operator(`+`) indicates the beginning of a new directory(`--`) with the given name, allowing the vein operator(`|`) to continue flow to files
      | +== main.py                # open_file operator(`+`) is spaced ONCE to lineup with the end of its parent directory operator (`--`)
      | :== test.py                # close_vein operator(`:`) indicates the ending of the above operator's vein flow and a file is created with the given name
      ...
  ```

### Example DrRx Tree Syntax

```drrx
.                                # Root directory indicator
:== .drrx.conf.yaml              # File operation indicator in the root directory, root files are always at the top of the syntax tree
:== pyproject.toml                
|                                # Vein flow operator connecting the root directory(and its files) to directory(`drrx/`) and its files(`src/`)
:-- drrx/                       
  :-- src/                       # `:` indicates closed flow operator, so no more Vein Flow Operators(`|`) are required to connect anything below it
    +-- python/                  # `+` indicates open flow operator, so a new Vein Flow Operator(`|`) is required to connect anything below it
    | :== main.py                # `:==` indicates file operation indicator, so two spaces are made, and a new file is created with the given name
    | |
    | +-- commands/             
    | | :== drrx-dict.json       
    | |                          # vein flow operator(`|`) is always required to seperate files from directories
    | +-- modules/               # `+` indicates open flow operator, so a new Vein Flow Operator(`|`) is required to connect anything below it
    |   +== cli_example.py     
    |   :== commands.py       
    |
    :-- udl/
      +-- directory/
      | +== DirectoryExampleOne.drrx
      | :== DirectoryExampleTwo.drrx
      |
      :-- file/
        +== exampleFile.drrx
        :== exampleFileTwo.drrx
```

---

## RULES

### SPACING AND INDENTATION

[SP.01] - Always double spaced for hierachal flow.
            - UNLESS: Vein(`|`) flow operator is open(`+`), then only one space is required for hierarchical flow alignment.

- Example:

  ```drrx
  :-- drrx/
  | :== main.py
  | +-- commands/
  |   :== drrx-dict.json
  ```

[SP.02] - A new line must always adhere to the hierarchical alignment of the previous lines operator.

- Example:

  ```drrx
  :-- drrx/ # This is a new directory line
    :-- src/ # begins with `:` hierarchally alights with the above operator(:--) ending character (-)
      +-- python/ #  the vein operator(`+`) indicates the beginning of a new directory(`--`) with the given name
      | :== main.py # This is a new file line, the vein operator`:==` indicates the ending of flow and a file is created with the given name
  ```

- `.`: Root directory indicator.
- `==`: File operation indicator.
- `--`: Directory flow indicator.

### FLOW OPERATORS

[FL.01] - The file operation indicator is always `==`

- `|`: Vein('Acts as the hierarchal flow / structure between directories and files')
- `:`: `close flow` operator indicates the end of a Vein / hierarchical flow.
- `+`: `open flow` operator indicates the beginning of a flow(new directory or Vein).
[FW.01] - The Vein flow operator is always `|`

#### ROOT OPERATOR

[RT.01] - The root directory indicator is always `.`

#### DIRECTORY OPERATOR

[DR.01] - The directory operation indicator is always `--`
