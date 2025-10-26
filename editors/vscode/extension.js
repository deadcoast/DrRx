const vscode = require('vscode');
const { lintText } = require('../../lib/drrx-lint');
/**
 * Code actions for common quick-fixable diagnostics.
 */
class DrrxCodeActionProvider {
  provideCodeActions(document, range, context) {
    const fixes = [];
    const attachRelint = (action) => {
      action.command = {
        command: 'drrx.relintDocument',
        title: 'Re-run Dr.Rx lint',
        arguments: [document.uri]
      };
    };
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
        attachRelint(action);
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
        attachRelint(action);
        fixes.push(action);
      } else if (code === 'VL.07') {
        // remove one of consecutive spacers
        const edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(d.range.start.line, 0, d.range.start.line + 1, 0));
        const action = new vscode.CodeAction('Remove extra spacer line (VL.07)', vscode.CodeActionKind.QuickFix);
        action.edit = edit;
        action.diagnostics = [d];
        attachRelint(action);
        fixes.push(action);
      } else if (code === 'SP.03' || code === 'FW.02') {
        // Insert continuity '|' in prefix. For SP.03, align under parent's content column; for FW.02, align sensibly.
        const line = d.range.start.line;
        const text = document.lineAt(line).text;
        function parsePrefix(s) {
          let i = 0; while (s.slice(i, i + 2) === '  ') i += 2; const indentLen = i;
          let branch = '', hasCont = false;
          for (let pass = 0; pass < 2; pass++) { while (s[i] === ' ') i++; const ch = s[i]; if ((ch === '+' || ch === ':') && !branch) { branch = ch; i++; continue; } if (ch === '|' && !hasCont) { hasCont = true; i++; continue; } break; }
          while (s[i] === ' ') i++;
          return { len: i, indentLen, branch, hasCont };
        }
        function findParentContentCol(lineIdx) {
          // Walk up to find previous non-empty, non-spacer at depth-1; return its content column and branch
          const cur = parsePrefix(document.lineAt(lineIdx).text);
          const curDepth = (cur.indentLen || 0) / 2;
          for (let p = lineIdx - 1; p >= 0; p--) {
            const raw = document.lineAt(p).text;
            if (/^\s*$/.test(raw)) continue;
            if (/^(?:  )*\|\s*(?:#.*)?$/.test(raw)) continue;
            const pr = parsePrefix(raw);
            const depth = (pr.indentLen || 0) / 2;
            if (depth === curDepth - 1) return { col: pr.len, branch: pr.branch };
            if (depth < curDepth - 1) break;
          }
          return null;
        }
        const pfx = parsePrefix(text);
        if (pfx.hasCont) {
          // Already has a bar; skip duplicate fix
        } else {
          let insertCol = pfx.len; // default: end of prefix
          if (code === 'SP.03') {
            const parent = findParentContentCol(line);
            if (parent && parent.branch === '+') insertCol = parent.col;
          } else if (code === 'FW.02') {
            // Try to align with parent '+' if present; else leave at end of prefix
            const parent = findParentContentCol(line);
            if (parent && parent.branch === '+') insertCol = parent.col;
          }
          const before = text.slice(0, insertCol);
          const after = text.slice(insertCol);
          const fixedLine = before + '|' + after;
          const edit = new vscode.WorkspaceEdit();
          const fullRange = new vscode.Range(line, 0, line, text.length);
          edit.replace(document.uri, fullRange, fixedLine);
          const title = code === 'SP.03' ? 'Insert first-child continuity | (SP.03)' : 'Insert continuity | (FW.02)';
          const action = new vscode.CodeAction(title, vscode.CodeActionKind.QuickFix);
          action.edit = edit;
          action.diagnostics = [d];
          attachRelint(action);
          fixes.push(action);
        }
      } else if (code === 'OR.02') {
        // Comprehensive regroup: at this depth, move ALL file segments above directories,
        // ensure a single spacer at this depth between them, preserve attached subtrees/comments.
        const text = document.getText();
        const lines = text.split(/\r?\n/);
        const dirLine = d.range.start.line;
        const reSpacer = /^(?:  )*\|\s*(?:#.*)?$/;

        function parsePrefix(s) {
          let i = 0; while (s.slice(i, i + 2) === '  ') i += 2; const indentLen = i;
          let branch = '', hasCont = false;
          for (let pass = 0; pass < 2; pass++) { while (s[i] === ' ') i++; const ch = s[i]; if ((ch === '+' || ch === ':') && !branch) { branch = ch; i++; continue; } if (ch === '|' && !hasCont) { hasCont = true; i++; continue; } break; }
          while (s[i] === ' ') i++;
          return { len: i, indentLen, branch, hasCont };
        }
        function classifyAt(line) {
          if (line < 0 || line >= lines.length) return { kind: 'eof' };
          const raw = lines[line];
          if (/^\s*$/.test(raw)) return { kind: 'blank' };
          if (reSpacer.test(raw)) { const p = parsePrefix(raw); return { kind: 'spacer', depth: (p.indentLen || 0) / 2 }; }
          const p = parsePrefix(raw);
          const depth = (p.indentLen || 0) / 2;
          const rest = raw.slice(p.len);
          if (/^==\s/.test(rest)) return { kind: 'file', depth };
          if (/^--\s/.test(rest)) return { kind: 'dir', depth };
          return { kind: 'other', depth };
        }
        function depthOf(raw) { const p = parsePrefix(raw); return (p.indentLen || 0) / 2; }

        const here = classifyAt(dirLine);
        if (here.kind !== 'dir' && here.kind !== 'file') return [];
        const D = here.depth;

        // Find same-depth sibling block boundaries [B..E]
        let B = dirLine;
        for (let i = dirLine - 1; i >= 0; i--) {
          const c = classifyAt(i);
          if (c.kind === 'blank') { continue; }
          if (typeof c.depth === 'number' && c.depth >= 0 && c.depth < D) { B = i + 1; break; }
          B = i;
        }
        let E = dirLine;
        for (let i = dirLine + 1; i < lines.length; i++) {
          const c = classifyAt(i);
          if (c.kind === 'blank') { continue; }
          if (typeof c.depth === 'number' && c.depth >= 0 && c.depth < D) { E = i - 1; break; }
          E = i;
        }

        // Collect top-level segments at depth D (with subtrees and interstitial non-top-level lines)
        const starts = [];
        for (let i = B; i <= E; i++) {
          const c = classifyAt(i);
          if ((c.kind === 'file' || c.kind === 'dir' || c.kind === 'spacer') && c.depth === D) starts.push(i);
        }
        if (!starts.length) return [];

        const segments = [];
        for (let si = 0; si < starts.length; si++) {
          const s = starts[si];
          const k = classifyAt(s);
          let t = s + 1;
          // end when next same-or-shallower top-level at depth D appears
          while (t <= E) {
            const ck = classifyAt(t);
            if ((ck.kind === 'file' || ck.kind === 'dir' || ck.kind === 'spacer') && typeof ck.depth === 'number' && ck.depth <= D) break;
            t++;
          }
          segments.push({ kind: k.kind, from: s, to: t - 1 });
        }

        const fileSegs = segments.filter(s => s.kind === 'file');
        const dirSegs = segments.filter(s => s.kind === 'dir');
        if (!dirSegs.length || !fileSegs.length) return [];

        const before = lines.slice(0, B);
        const after = lines.slice(E + 1);
        const within = [];
        // Leading non-top-level lines before first segment
        if (B < segments[0].from) within.push(...lines.slice(B, segments[0].from));
        // Helper to push a segment block
        const pushSeg = (seg) => { within.push(...lines.slice(seg.from, seg.to + 1)); };

        // Emit all file segments in order
        for (const s of fileSegs) pushSeg(s);
        // Ensure exactly one spacer between files and dirs at depth D
        const spacerLine = '  '.repeat(D) + '|';
        within.push(spacerLine);
        // Emit all dir segments in order
        for (const s of dirSegs) pushSeg(s);
        // Trailing non-top-level lines after last segment
        if (segments[segments.length - 1].to < E) within.push(...lines.slice(segments[segments.length - 1].to + 1, E + 1));

        // Compose final
        const finalLines = before.concat(within, after);
        // Normalize spacers: collapse multiple consecutive depth-D spacers into one
        const normalized = [];
        for (let i = 0; i < finalLines.length; i++) {
          const raw = finalLines[i];
          if (reSpacer.test(raw) && depthOf(raw) === D) {
            if (normalized.length && reSpacer.test(normalized[normalized.length - 1]) && depthOf(normalized[normalized.length - 1]) === D) continue;
          }
          normalized.push(raw);
        }

        const finalText = normalized.join('\n');
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
        edit.replace(document.uri, fullRange, finalText);
        const action = new vscode.CodeAction('Regroup files above dirs (comprehensive) (OR.02)', vscode.CodeActionKind.QuickFix);
        action.edit = edit;
        action.diagnostics = [d];
        attachRelint(action);
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

  const relintCmd = vscode.commands.registerCommand('drrx.relintDocument', async (uri) => {
    try {
      if (uri) {
        const doc = await vscode.workspace.openTextDocument(uri);
        runLint(doc);
        return;
      }
      const active = vscode.window.activeTextEditor?.document;
      if (active) runLint(active);
    } catch (err) {
      console.error('Dr.Rx relint command failed', err);
    }
  });
  context.subscriptions.push(relintCmd);

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
