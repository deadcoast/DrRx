# Dr.Rx Schemas

This folder collects JSON Schemas and examples to validate artifacts produced or consumed by Dr.Rx tooling.

- AST schema: `drrx/ast.schema.json`
- Annotations schema: `drrx/annotations.schema.json`
- List --diff output schema: `drrx/list-diff.schema.json`
- AST example: `drrx/examples/ast-example.json`

## Validate Locally

Using Node.js (AJV CLI):

- Install once (local project install):
  - `npm install --save-dev ajv-cli`
- Validate the AST example:
  - `npx ajv -s drrx/ast.schema.json -d drrx/examples/ast-example.json`
- Validate a list --diff JSON (include referenced schema for annotations):
  - `npx ajv -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d path/to/list-diff.json`

Using Python (jsonschema):

- Install:
  - `pip install jsonschema`
- Validate the AST example:
  - `python -m jsonschema -i drrx/examples/ast-example.json drrx/ast.schema.json`

Note: For `list-diff.schema.json`, if your validator does not auto-resolve `$ref` to `drrx/annotations.schema.json`, supply it explicitly (AJV `-r` flag as shown above), or pre-bundle schemas.

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
