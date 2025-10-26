SCHEMA_VALIDATOR=node scripts/validate-schema.js

.PHONY: validate-ast validate-diff validate-all

validate-ast:
	$(SCHEMA_VALIDATOR) drrx/ast.schema.json drrx/examples/ast-example.json

validate-diff:
	$(SCHEMA_VALIDATOR) drrx/list-diff.schema.json drrx/fixtures/conformance.list-diff.json

validate-all: validate-ast validate-diff
