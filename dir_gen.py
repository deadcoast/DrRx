import os

def create_docs_structure():
    """
    Generates the specified documentation directory structure
    and creates empty markdown files within it.
    """
    # A list of all the file paths to be created.
    file_paths = [
        "docs/00-index.md",
        "docs/01-concepts/what-is-drrx.md",
        "docs/01-concepts/mental-model.md",
        "docs/01-concepts/udl-overview.md",
        "docs/02-quickstart/install-windows.md",
        "docs/02-quickstart/first-inject.md",
        "docs/02-quickstart/dry-run-and-rollback.md",
        "docs/03-udl-spec/udl-dictionary.md",
        "docs/03-udl-spec/udl-spacing-rules.md",
        "docs/03-udl-spec/udl-grammar-ebnf.md",
        "docs/03-udl-spec/udl-alignment-and-flow.md",
        "docs/03-udl-spec/udl-linting-guide.md",
        "docs/03-udl-spec/udl-examples.md",
        "docs/04-cli/cli-overview.md",
        "docs/04-cli/cmd-inject.md",
        "docs/04-cli/cmd-list-ls.md",
        "docs/04-cli/cmd-restore.md",
        "docs/04-cli/cmd-del-deldir-delall.md",
        "docs/04-cli/cmd-adddir-addfile.md",
        "docs/04-cli/cmd-log-audit-clear.md",
        "docs/04-cli/cmd-quicksave.md",
        "docs/04-cli/global-flags.md",
        "docs/04-cli/exit-codes.md",
        "docs/05-workflows/reconcile-target-dir.md",
        "docs/05-workflows/backups-and-quicksave.md",
        "docs/05-workflows/auditing-and-change-review.md",
        "docs/05-workflows/migration-existing-tree.md",
        "docs/06-recipes/python-project-skeleton.md",
        "docs/06-recipes/mixed-code-and-docs.md",
        "docs/06-recipes/monorepo-slices.md",
        "docs/06-recipes/template-repo-bootstrap.md",
        "docs/07-windows-deep-dive/paths-crlf-case.md",
        "docs/07-windows-deep-dive/junctions-symlinks.md",
        "docs/07-windows-deep-dive/permissions-acls.md",
        "docs/07-windows-deep-dive/long-paths-support.md",
        "docs/08-reference/ast-json-schema.md",
        "docs/08-reference/drrx-conf-schema.md",
        "docs/08-reference/error-catalog.md",
        "docs/08-reference/logging-format.md",
        "docs/09-test-and-quality/conformance-suite.md",
        "docs/09-test-and-quality/fixtures-and-golden-tests.md",
        "docs/09-test-and-quality/coverage-strategy.md",
        "docs/09-test-and-quality/perf-baselines.md",
        "docs/10-project/roadmap.md",
        "docs/10-project/versioning-and-changelog.md",
        "docs/10-project/security-model.md",
        "docs/10-project/threat-checklist.md",
        "docs/10-project/contributing.md",
        "docs/10-project/code-of-conduct.md",
        "docs/10-project/style-guide.md",
        "docs/10-project/architecture.md",
        "docs/10-project/decision-records.md"
    ]

    print("Generating documentation structure...")

    # Loop through each file path in the list
    for path in file_paths:
        try:
            # Ensure the parent directory for the file exists.
            parent_dir = os.path.dirname(path)
            
            # Create parent directory if it's not empty (i.e., not the root)
            if parent_dir:
                # exist_ok=True prevents an error if the directory already exists
                os.makedirs(parent_dir, exist_ok=True)

            # Create the empty file.
            with open(path, 'w') as f:
                pass  # 'pass' does nothing, resulting in an empty file

            print(f"  Created: {path}")

        except OSError as e:
            print(f"Error creating {path}: {e}")

    print("\n✅ Directory structure created successfully!")


# This makes the script runnable from the command line
if __name__ == "__main__":
    create_docs_structure()