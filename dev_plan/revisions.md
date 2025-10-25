# REVISIONS

## 0.0.1

- Generate a worked AST JSON example from the “Example DrRx Tree Syntax” and validate against drrx/ast.schema.json:
- Add and update a JSON Schema for the Dr.Rx source annotations subset and a --json format for list --diff
- Add a WN.02 rule for long path support (and link it from the overview)
- Insert back-links from rules to specific sections in syntax-overview.md for faster navigation
- The missing-spacer case CHANGED to be a hard error instead of a formatting warning, flip [FW.06]’s violation guidance accordingly
- Grouping rule (OR.02) to be mandatory instead of recommended (i.e., enforce files-then-spacer-then-dirs as a MUST), I can flip its level and adjust VL.06 accordingly
- The syntax-overview.md file does **NOT** need a 'Rules Quick Links' file **if** the corresponding rules are correctly linked from sytnax-overview.md -> rules.md
- Generate a one-page “UDL Validation Map” that maps rule IDs to editor diagnostics (warning/error) to drive linting

## 0.0.2

- Validate the AST example against ast.schema.json using a CLI validator and include the command you can run locally
- Add a short “schemas/README.md” with pointers and sample JSON for list --diff
- Add a README.md in the ROOT project, ensure it describes the syntax, its purpose, how its used (the drrx tree udl first and foremost, the cli commands are a quality of life feature for power users).
  - Provide a medium sized example of the syntax tree, its correctness will give me a spectrum of your understanding of this project
  - it should explain the DrRx project in a straight forward manner, users should be able to understand what it is, what it does, how it works, how to use it, what problems it solves

## 0.0.3

STANDARDS: `Documents should be created as working scope:
  NOT = ['small', 'example', 'simple', 'snippet', 'examples']
- If you create data under the `NOT` standard above, the requests become redundant for the user, as they will have to redo them again later
- There is FAR to much documentation to be creating examples at this stage
- Produce a “conformance fixture” .drrx and a corresponding list --diff JSON to seed tests
- Add a npm script or Makefile targets for schema validations to streamline local checks

- Sweep for any stale wording that still implies “:” forbids children
- Already updated core spots in rules and overview; scan other examples
- If you’d like the new operational rules called out in a short “What changed” block at the top of rules.md, I can add that too.

- Add an explicit rule to normalize trailing “/” on directory names (name equivalence ignoring trailing “/”) and flag mixed usage as a warning. Currently we document trailing “/” as cosmetic; this would formalize normalization and validation:
  - NM.05: Directory name comparison ignores trailing “/”; formatters may normalize slash usage.
- add NM.05 as above and sweep examples for consistent “/” usage

## 0.0.4

- Generate a second conformance .drrx covering corner cases (quoted names, spacer edge cases, group-order violations) to broaden test coverage
- Begin creating a tasklist to integrate Syntax Highlighting
  - During this process, the documents should be updated accordingly. Getting a Syntax Highlighter to validate the directory tree syntax will provide additional polish and development on the DrRx syntax, which will require the docs to be up to date on the changes
