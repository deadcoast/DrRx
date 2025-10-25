# COMPLETE DIRECTORY TREE - WINDOWS FORMAT

```
.
|   .markdownlint.json
|   AGENTS.md
|   CHANGELOG.md
|   Makefile
|   package-lock.json
|   package.json
|   README.md
|   REVISIONLOG.md
|   skratchpad.js
|   skratchpad.json
|   TODO.json
|
+---.archived-format
|   \---docs
|       |   00-index.md
|       |
|       +---01-concepts
|       |       mental-model.md
|       |       udl-overview.md
|       |       what-is-drrx.md
|       |
|       +---02-quickstart
|       |       dry-run-and-rollback.md
|       |       first-inject.md
|       |       install-windows.md
|       |
|       +---03-udl-spec
|       |       udl-alignment-and-flow.md
|       |       udl-dictionary.md
|       |       udl-examples.md
|       |       udl-grammar-ebnf.md
|       |       udl-linting-guide.md
|       |       udl-spacing-rules.md
|       |
|       +---04-cli
|       |       cli-overview.md
|       |       cmd-adddir-addfile.md
|       |       cmd-del-deldir-delall.md
|       |       cmd-inject.md
|       |       cmd-list-ls.md
|       |       cmd-log-audit-clear.md
|       |       cmd-quicksave.md
|       |       cmd-restore.md
|       |       exit-codes.md
|       |       global-flags.md
|       |
|       +---05-workflows
|       |       auditing-and-change-review.md
|       |       backups-and-quicksave.md
|       |       migration-existing-tree.md
|       |       reconcile-target-dir.md
|       |
|       +---06-recipes
|       |       mixed-code-and-docs.md
|       |       monorepo-slices.md
|       |       python-project-skeleton.md
|       |       template-repo-bootstrap.md
|       |
|       +---07-windows-deep-dive
|       |       junctions-symlinks.md
|       |       long-paths-support.md
|       |       paths-crlf-case.md
|       |       permissions-acls.md
|       |
|       +---08-reference
|       |       ast-json-schema.md
|       |       drrx-conf-schema.md
|       |       error-catalog.md
|       |       logging-format.md
|       |
|       +---09-test-and-quality
|       |       conformance-suite.md
|       |       coverage-strategy.md
|       |       fixtures-and-golden-tests.md
|       |       perf-baselines.md
|       |
|       +---10-project
|       |       architecture.md
|       |       code-of-conduct.md
|       |       contributing.md
|       |       decision-records.md
|       |       roadmap.md
|       |       security-model.md
|       |       style-guide.md
|       |       threat-checklist.md
|       |       versioning-and-changelog.md
|       |
|       \---mockup-directory
|           |   pyproject.toml
|           |
|           \---src
|               |   mockup-directory.drrx
|               |
|               +---python
|               |   |   main.py
|               |   |
|               |   +---commands
|               |   |       drrx-dict.json
|               |   |
|               |   \---modules
|               |           cli_example.py
|               |           commands.py
|               |
|               \---udl
|                   +---directory
|                   |       DirectoryExampleOne.drrx
|                   |       DirectoryExampleTwo.drrx
|                   |
|                   \---file
|                           exampleFile.drrx
|                           exampleFileTwo.drrx
|
+---.github
|   \---workflows
|           ci.yml
|
+---Architecture
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
|   \---REVISIONLOG
|       +---0.0.0
|       |       REVISIONLOG.md
|       |
|       +---0.1.0
|       |       REVISIONLOG.md
|       |
|       +---0.2.0
|       |       REVISIONLOG.md
|       |
|       +---0.3.0
|       |       REVISIONLOG.md
|       |
|       \---MONOLITH
|               REVISIONLOG.md
|
+---bin
|       drrx
|
+---dev_plan
|       phase_1.md
|       phase_2.md
|       phase_3.md
|       phase_4.md
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
+---test
|   |   lint-fixtures.js
|   |
|   \---golden
|           conformance-edge-cases.tree.drrx.json
|           invalid-file-has-child.tree.drrx.json
|           invalid-fw02-missing-continuity.tree.drrx.json
|           invalid-grouping.tree.drrx.json
|           invalid-marker-after-name.tree.drrx.json
|           invalid-missing-spacer.tree.drrx.json
|           invalid-multi-branch.tree.drrx.json
|           invalid-orphan-spacers.tree.drrx.json
|           invalid-root-files-block.tree.drrx.json
|           invalid-root-files-order.tree.drrx.json
|           invalid-root-flow.tree.drrx.json
|           invalid-root-indented.tree.drrx.json
|           invalid-sp03-missing-first-child.tree.drrx.json
|           invalid-tabs.tree.drrx.json
|
\---TODO
    \---0.0.0
        +---0.0.1
        |       TODO.md
        |
        +---0.0.2
        |       TODO.md
        |
        \---0.0.3
                TODO.md 
```
