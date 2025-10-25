const vscode = require('vscode');
const { lintText } = require('../../lib/drrx-lint');
/**
 * Code actions for common quick-fixable diagnostics.
 */
class DrrxCodeActionProvider {
  provideCodeActions(document, range, context) {
    const fixes = [];
    for (const d of context.diagnostics) {
      if (typeof d.code === 'object') {
        // unwrap {value, target}
      }
      const code = typeof d.code === 'object' ? d.code.value : d.code;
      if (code === 'FW.06') {
        // insert spacer '|' on the line before the directory diagnostic
        const line = d.range.start.line;
        const indent = document.lineAt(line).text.match(/^(\s*)/)[1] || '';
        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(line, 0), `${indent}|\n`);
        const action = new vscode.CodeAction('Insert spacer | (FW.06)', vscode.CodeActionKind.QuickFix);
        action.edit = edit;
        action.diagnostics = [d];
        fixes.push(action);
      } else if (code === 'SP.05') {
        // normalize to single space after operator by collapsing spaces in diagnostic range
        const text = document.getText(d.range);
        const fixed = text.replace(/(--|==)(\s+)(\S+)/, (_m, op, _sp, name) => `${op} ${name}`);
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, d.range, fixed);
        const action = new vscode.CodeAction('Fix operator spacing (SP.05)', vscode.CodeActionKind.QuickFix);
        action.edit = edit;
        action.diagnostics = [d];
        fixes.push(action);
      } else if (code === 'VL.07') {
        // remove one of consecutive spacers
        const edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(d.range.start.line, 0, d.range.start.line + 1, 0));
        const action = new vscode.CodeAction('Remove extra spacer line (VL.07)', vscode.CodeActionKind.QuickFix);
        action.edit = edit;
        action.diagnostics = [d];
        fixes.push(action);
      }
    }
    return fixes;
  }
}

function activate(context) {
  const diagnostics = vscode.languages.createDiagnosticCollection('drrx');
  context.subscriptions.push(diagnostics);

  const runLint = (doc) => {
    if (!doc || doc.languageId !== 'drrx') return;
    const diags = lintDocument(doc);
    diagnostics.set(doc.uri, diags);
  };

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(runLint),
    vscode.workspace.onDidChangeTextDocument(e => runLint(e.document)),
    vscode.workspace.onDidSaveTextDocument(runLint)
  );

  const lintCmd = vscode.commands.registerCommand('drrx.lint', () => {
    const doc = vscode.window.activeTextEditor?.document;
    if (!doc) return;
    runLint(doc);
    vscode.window.showInformationMessage('Dr.Rx lint: diagnostics updated.');
  });
  context.subscriptions.push(lintCmd);

  // initial
  if (vscode.window.activeTextEditor) runLint(vscode.window.activeTextEditor.document);

  // register code actions
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider('drrx', new DrrxCodeActionProvider(), {
      providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
    })
  );
}

function lintDocument(doc) {
  const diags = [];
  const text = doc.getText();
  const lines = text.split(/\r?\n/);

  const makeRange = (line, start, end) => new vscode.Range(line, start, line, Math.max(start + 1, end));
  const rulesUriFor = (code) => {
    try {
      const wf = vscode.workspace.workspaceFolders?.[0]?.uri;
      if (!wf) return undefined;
      const uri = vscode.Uri.joinPath(wf, 'drrx', 'rules.md');
      return uri.with({ fragment: code });
    } catch { return undefined; }
  };
  const pushDiag = (line, start, end, message, code, severity = vscode.DiagnosticSeverity.Error) => {
    const d = new vscode.Diagnostic(makeRange(line, start, end), message, severity);
    const target = rulesUriFor(code);
    d.code = target ? { value: code, target } : code;
    diags.push(d);
  };
  // Get strictness setting
  const cfg = vscode.workspace.getConfiguration('drrx');
  const strict = cfg.get('strict', 'error');
  const overrides = cfg.get('severityOverrides', {}); // 'off' | 'warn' | 'error'

  const issues = lintText(text);
  for (const is of issues) {
    if (strict === 'off') continue;
    let severity = (is.severity === 'warning') ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Error;
    if (strict === 'warn') severity = vscode.DiagnosticSeverity.Warning;
    const ov = overrides[is.code];
    if (ov === 'off') continue;
    if (ov === 'warn') severity = vscode.DiagnosticSeverity.Warning;
    if (ov === 'error') severity = vscode.DiagnosticSeverity.Error;
    pushDiag(is.line, is.start, is.end, is.message, is.code, severity);
  }

  return diags;
}

function deactivate() {}

module.exports = { activate, deactivate };
