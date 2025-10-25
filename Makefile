AJV=npx ajv

.PHONY: validate-ast validate-diff validate-all

validate-ast:
	$(AJV) -s drrx/ast.schema.json -d drrx/examples/ast-example.json

validate-diff:
	$(AJV) -s drrx/list-diff.schema.json -r drrx/annotations.schema.json -d drrx/fixtures/conformance.list-diff.json

validate-all: validate-ast validate-diff

