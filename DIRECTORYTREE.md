# COMPLETE DIRECTORY TREE - WINDOWS FORMAT

> Windows Terminal Command: `cmd /c "tree /F /A"`                                                                                                                  pwsh  15:22:49 

```
.
|   .markdownlint.json
|   AGENTS.md
|   CHANGELOG.md
|   DIRECTORYTREE.md
|   Makefile
|   package-lock.json
|   package.json
|   README.md
|   REVISIONLOG.md
|   skratchpad.js
|   skratchpad.json
|   TODO.json
|
+---.github
|   \---workflows
|           ci.yml
|
+---bin
|       drrx
|
+---docs
|   +---CHANGELOGS
|   |   +---0.0.0
|   |   |       CHANGELOG.md
|   |   |
|   |   +---0.1.0
|   |   |       CHANGELOG.md
|   |   |
|   |   +---0.2.0
|   |   |       CHANGELOG.md
|   |   |
|   |   +---0.3.0
|   |   |       CHANGELOG.md
|   |   |
|   |   +---0.4.0
|   |   \---monolith
|   |           CHANGELOG.md
|   |
|   +---DEVPLAN
|   |       phase_1.md
|   |       phase_2.md
|   |       phase_3.md
|   |       phase_4.md
|   |
|   +---REVISIONLOG
|   |   +---0.0.0
|   |   |       REVISIONLOG.md
|   |   |
|   |   +---0.1.0
|   |   |       REVISIONLOG.md
|   |   |
|   |   +---0.2.0
|   |   |       REVISIONLOG.md
|   |   |
|   |   +---0.3.0
|   |   |       REVISIONLOG.md
|   |   |
|   |   \---MONOLITH
|   |           REVISIONLOG.md
|   |
|   \---TODO
|       \---0.0.0
|           +---0.0.1
|           |       TODO.md
|           |
|           +---0.0.2
|           |       TODO.md
|           |
|           \---0.0.3
|                   TODO.md
|
+---drrx
|   |   annotations.schema.json
|   |   ast.schema.json
|   |   drrx.yaml
|   |   list-diff.schema.json
|   |   rules.md
|   |   syntax-overview.md
|   |   udl-validation-map.md
|   |
|   +---examples
|   |       ast-example.json
|   |
|   +---fixtures
|   |   |   conformance.list-diff.json
|   |   |   conformance.tree.drrx
|   |   |   README.md
|   |   |
|   |   +---invalid
|   |   |       conformance-edge-cases.tree.drrx
|   |   |       invalid-file-has-child.tree.drrx
|   |   |       invalid-fw02-missing-continuity.tree.drrx
|   |   |       invalid-grouping.tree.drrx
|   |   |       invalid-marker-after-name.tree.drrx
|   |   |       invalid-missing-spacer.tree.drrx
|   |   |       invalid-multi-branch.tree.drrx
|   |   |       invalid-orphan-spacers.tree.drrx
|   |   |       invalid-root-files-block.tree.drrx
|   |   |       invalid-root-files-order.tree.drrx
|   |   |       invalid-root-flow.tree.drrx
|   |   |       invalid-root-indented.tree.drrx
|   |   |       invalid-sp03-missing-first-child.tree.drrx
|   |   |       invalid-tabs.tree.drrx
|   |   |
|   |   +---positive
|   |   |       positive-combined-ok.tree.drrx
|   |   |       positive-deep-mixed-ok.tree.drrx
|   |   |       positive-fw02-continuity-ok.tree.drrx
|   |   |       positive-quoted-annot-trailing-ok.tree.drrx
|   |   |       positive-root-mixed-with-spacers-ok.tree.drrx
|   |   |       positive-sp03-first-child-ok.tree.drrx
|   |   |
|   |   \---quickfix
|   |           or02-multiblock.tree.drrx
|   |
|   \---schemas
|           README.md
|
+---editors
|   \---vscode
|       |   extension.js
|       |   language-configuration.json
|       |   package.json
|       |   README.md
|       |
|       \---syntaxes
|               drrx.tmLanguage.json
|
+---lib
|       drrx-lint.js
|
+---src
\---test
    |   lint-fixtures.js
    |
    \---golden
            conformance-edge-cases.tree.drrx.json
            invalid-file-has-child.tree.drrx.json
            invalid-fw02-missing-continuity.tree.drrx.json
            invalid-grouping.tree.drrx.json
            invalid-marker-after-name.tree.drrx.json
            invalid-missing-spacer.tree.drrx.json
            invalid-multi-branch.tree.drrx.json
            invalid-orphan-spacers.tree.drrx.json
            invalid-root-files-block.tree.drrx.json
            invalid-root-files-order.tree.drrx.json
            invalid-root-flow.tree.drrx.json
            invalid-root-indented.tree.drrx.json
            invalid-sp03-missing-first-child.tree.drrx.json
            invalid-tabs.tree.drrx.json
```
