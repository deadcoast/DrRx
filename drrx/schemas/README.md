# Dr.Rx Schemas

This folder collects JSON Schemas and examples to validate artifacts produced or consumed by Dr.Rx tooling.

- AST schema: `drrx/ast.schema.json`
- Annotations schema: `drrx/annotations.schema.json`
- List --diff output schema: `drrx/list-diff.schema.json`
- AST example: `drrx/examples/ast-example.json`

## Validate Locally

Using Node.js (built-in Dr.Rx validator):

- Validate the AST example:
  - `npm run validate:ast` *(or `node scripts/validate-schema.js drrx/ast.schema.json drrx/examples/ast-example.json`)*
- Validate a list --diff JSON (includes annotation refs automatically):
  - `npm run validate:diff` *(or `node scripts/validate-schema.js drrx/list-diff.schema.json drrx/fixtures/conformance.list-diff.json`)*

Using Python (jsonschema):

- Install:
  - `pip install jsonschema`
- Validate the AST example:
  - `python -m jsonschema -i drrx/examples/ast-example.json drrx/ast.schema.json`

Note: For `list-diff.schema.json`, if your validator does not auto-resolve `$ref` to `drrx/annotations.schema.json`, supply it explicitly or pre-bundle schemas (the bundled Node script handles this automatically).

## Sample list --diff JSON

This document conforms to `drrx/list-diff.schema.json` and references annotation semantics in `drrx/annotations.schema.json`.

```
{
  "target": "C:\\projects\\demo",
  "drrxFile": "C:\\projects\\demo\\tree.drrx",
  "entries": [
    {
      "path": "src",
      "kind": "dir",
      "status": "present",
      "desired": { "state": "present" },
      "actual": { "exists": true }
    },
    {
      "path": "src\\main.py",
      "kind": "file",
      "status": "create",
      "desired": {
        "state": "present",
        "annotations": { "source": "inline" }
      },
      "actual": { "exists": false },
      "diff": { "changeType": "add", "notes": "will create new file" }
    },
    {
      "path": "build",
      "kind": "dir",
      "status": "delete",
      "desired": { "state": "absent" },
      "actual": { "exists": true },
      "diff": { "changeType": "remove" }
    }
  ]
}
```
