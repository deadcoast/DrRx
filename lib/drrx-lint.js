'use strict';

// Shared diagnostics engine: returns issues for given text
// Issue format: { line, start, end, code, message, severity }

function stripCommentQuoteAware(s) {
  let inQuote = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"') {
      // count preceding backslashes to detect escaped quote
      let bs = 0; let j = i - 1;
      while (j >= 0 && s[j] === '\\') { bs++; j--; }
      if (bs % 2 === 0) inQuote = !inQuote;
    }
    if (!inQuote && ch === '#') return s.slice(0, i);
  }
  return s;
}

function lintText(text) {
  const issues = [];
  const lines = text.split(/\r?\n/);
  const depthState = new Map(); // depth -> { seenFile, seenDir, lastNonSpacerKind, lastLineWasSpacer }
  const nm05State = new Map(); // normalized dir name -> { slash: boolean | 'mixed' }
  let rootFound = false;

  const reSpacer = /^(?:  )*\|\s*(?:#.*)?$/;
  const rePrefix = /^(?<indent>(  )*)(?<branch>[+:])?\s*(?<cont>\|)?\s*/;
  const stack = []; // by depth: { contentCol, branch }
  // root-level ordering state (OR.01/OR.04)
  let rootSeenAny = false;
  let rootSeenFile = false;
  let rootFilesEnded = false; // ended by spacer or directory at depth 0

  const push = (line, start, end, message, code, severity = 'error') => {
    issues.push({ line, start, end, message, code, severity });
  };

  const stripComment = stripCommentQuoteAware;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (raw.indexOf('\t') !== -1) push(i, 0, raw.length, 'Tabs are disallowed (SP.01).', 'SP.01');

    if (!rootFound) {
      if (/^\s*$/.test(raw)) continue;
      if (/^\./.test(raw)) {
        rootFound = true;
        if (/^\s+\./.test(raw)) push(i, 0, 1, 'Root must start at column 1 (SP.06).', 'SP.06');
        if (/^[|+:]/.test(raw)) push(i, 0, 1, 'Root cannot have flow markers (FW.12).', 'FW.12');
        continue;
      } else {
        push(i, 0, Math.min(1, raw.length), 'First non-empty line must be root "." (RT.01).', 'RT.01');
        rootFound = true;
      }
    }

    const noComment = stripComment(raw);
    if (/^\s*$/.test(noComment)) continue;

    if (reSpacer.test(noComment)) {
      const m = noComment.match(rePrefix);
      const depth = (m?.groups?.indent?.length || 0) / 2;
      const st = depthState.get(depth) || { seenFile: false, seenDir: false, lastNonSpacerKind: null, lastLineWasSpacer: false };
      if (st.lastLineWasSpacer) push(i, 0, noComment.length, 'Excessive consecutive spacers (VL.07).', 'VL.07', 'warning');
      st.lastLineWasSpacer = true;
      depthState.set(depth, st);
      if (depth === 0 && rootSeenAny) rootFilesEnded = true;

      // VL.05 orphan spacer checks
      let j = i + 1;
      let warned = false;
      while (j < lines.length) {
        const raw2 = lines[j];
        const noComment2 = stripComment(raw2);
        if (/^\s*$/.test(noComment2)) { j++; continue; }
        const pm2 = noComment2.match(rePrefix);
        const depth2 = (pm2?.groups?.indent?.length || 0) / 2;
        if (depth2 !== depth) {
          push(i, 0, noComment.length, 'Orphan spacer with no following directory at same depth (VL.05).', 'VL.05', 'warning');
          warned = true;
        } else {
          const rest2 = noComment2.slice(pm2[0].length);
          if (!/^--\s/.test(rest2)) {
            push(i, 0, noComment.length, 'Spacer should precede a directory block at same depth (VL.05).', 'VL.05', 'warning');
            warned = true;
          }
        }
        break;
      }
      if (!warned && j >= lines.length) push(i, 0, noComment.length, 'Orphan spacer at end of file (VL.05).', 'VL.05', 'warning');
      continue;
    }

    const pm = noComment.match(rePrefix);
    if (!pm) continue;
    const indent = pm.groups?.indent || '';
    const depth = indent.length / 2;
    const branch = pm.groups?.branch || '';
    const rest = noComment.slice(pm[0].length);

    if (/^(?:  )*(?:[+].*[:]|[:].*[+])/.test(noComment)) push(i, 0, 1, 'Only one branch marker per line (FW.07).', 'FW.07');

    let kind = null;
    if (/^--\s/.test(rest)) kind = 'dir';
    else if (/^==\s/.test(rest)) kind = 'file';
    else continue;

    // OR.01/OR.04 enforcement at root depth
    if (depth === 0) {
      rootSeenAny = true;
      if (kind === 'dir') {
        if (!rootFilesEnded) rootFilesEnded = rootSeenFile || true;
        // OR.01: directory appears before root file block completed; if any root-level file later, flag here
        // Lookahead for any later root-level file
        let hasLaterRootFile = false;
        for (let k = i + 1; k < lines.length; k++) {
          const rawk = stripComment(lines[k]);
          if (/^\s*$/.test(rawk) || reSpacer.test(rawk)) continue;
          const pmk = rawk.match(rePrefix);
          if (!pmk) break;
          const depthk = (pmk?.groups?.indent?.length || 0) / 2;
          if (depthk < 0) break;
          if (depthk === 0) {
            const restk = rawk.slice(pmk[0].length);
            if (/^==\s/.test(restk)) { hasLaterRootFile = true; break; }
            if (/^--\s/.test(restk)) break;
          }
          if (depthk > 0) continue;
        }
        if (hasLaterRootFile) push(i, 0, contentCol || 1, 'Root files must appear before any directories (OR.01).', 'OR.01');
      }
      if (kind === 'file') {
        if (rootFilesEnded) push(i, 0, contentCol || 1, 'Root files must be a contiguous block before other entries (OR.04).', 'OR.04');
        rootSeenFile = true;
      }
    }

    // SP.02: if parent used '+', child must place '|' aligned under parent's content column
    const contentCol = pm[0].length; // operator starts here
    const parent = depth > 0 ? stack[depth - 1] : undefined;
    if (parent && parent.branch === '+') {
      const prefixStr = noComment.slice(0, pm[0].length);
      const barIdx = prefixStr.indexOf('|');
      if (barIdx === -1) {
        push(i, 0, contentCol || 1, 'Missing first-child continuity bar under open vein (SP.03).', 'SP.03', 'warning');
      } else if (barIdx !== parent.contentCol) {
        push(i, barIdx, barIdx + 1, 'Child alignment must match parent operator content column (SP.02).', 'SP.02');
      }
    }
    // SP.02: child operator column should be exactly two spaces after parent's content column
    if (parent) {
      const expectedOpCol = parent.contentCol + 2;
      if (contentCol !== expectedOpCol) {
        push(i, 0, contentCol || 1, 'Child operator must be aligned at parent content column + 2 (SP.02).', 'SP.02');
      }
    }

    const st = depthState.get(depth) || { seenFile: false, seenDir: false, lastNonSpacerKind: null, lastLineWasSpacer: false };

    // SP.05
    const mOp = rest.match(/^(--|==)(\s+)(\S+)/);
    if (mOp && mOp[2] !== ' ') push(i, pm[0].length, pm[0].length + mOp[1].length + mOp[2].length, 'Exactly one space required after operator (SP.05).', 'SP.05');

    // OR.02
    if (kind === 'file' && st.seenDir) push(i, 0, 2, 'Files must precede directories within a block (OR.02).', 'OR.02');

    // FW.06
    if (kind === 'dir' && st.lastNonSpacerKind === 'file' && !st.lastLineWasSpacer) push(i, 0, 2, 'Missing spacer `|` before directory following files (FW.06).', 'FW.06');

    st.lastLineWasSpacer = false;
    st.lastNonSpacerKind = kind;
    if (kind === 'file') st.seenFile = true; else st.seenDir = true;
    depthState.set(depth, st);

    // NM.05
    if (kind === 'dir') {
      if (!/^--\s*\"/.test(rest)) {
        const mName = rest.match(/^--\s*(\S+)/);
        if (mName) {
          const token = mName[1];
          const hasSlash = /\/$/.test(token);
          const norm = token.replace(/\/$/, '');
          const prev = nm05State.get(norm);
          if (!prev) nm05State.set(norm, { slash: hasSlash });
          else if (prev.slash !== hasSlash && prev.slash !== 'mixed') {
            prev.slash = 'mixed';
            push(i, pm[0].length, pm[0].length + rest.length, 'Mixed trailing "/" usage for directory name (NM.05).', 'NM.05', 'warning');
          }
        }
      }
    }

    // VL.02: continuity bar presence should reflect sibling existence at same depth
    // Lookahead to next non-empty/non-spacer line at same depth
    {
      const prefixStr = noComment.slice(0, pm[0].length);
      const hasBar = prefixStr.includes('|');
      let hasNextSiblingSameDepth = false;
      for (let k = i + 1; k < lines.length; k++) {
        const rawk = lines[k];
        const clean = stripComment(rawk);
        if (/^\s*$/.test(clean)) continue;
        if (reSpacer.test(clean)) continue;
        const pmk = clean.match(rePrefix);
        if (!pmk) break;
        const depthk = (pmk?.groups?.indent?.length || 0) / 2;
        if (depthk < depth) break;
        if (depthk === depth) { hasNextSiblingSameDepth = true; break; }
        if (depthk > depth) {
          // skip over subtree
          continue;
        }
      }
      if (hasBar && !hasNextSiblingSameDepth) {
        push(i, 0, contentCol || 1, 'Continuity bar present but no following sibling at same depth (VL.02).', 'VL.02', 'warning');
      } else if (!hasBar && hasNextSiblingSameDepth) {
        push(i, 0, contentCol || 1, 'Missing continuity bar despite following sibling at same depth (VL.02).', 'VL.02', 'warning');
      }
    }

    // FW.14
    const afterOp = rest.replace(/^(--|==)\s+\S+\s*/, '');
    if (/\|/.test(afterOp)) push(i, pm[0].length, noComment.length, 'Flow markers limited to prefix or spacer line (FW.14).', 'FW.14');

    // FW.08: if a ':' branch appears at this depth, no later sibling at same depth is allowed
    // We detect ':' in prefix and later scan for a same-depth non-spacer/non-empty line
    const prefix = noComment.slice(0, pm[0].length);
    if (/^[\s]*(?::)\s*\|?\s*$/.test(prefix) || /^[\s]*:\s*/.test(prefix)) {
      // lookahead
      for (let k = i + 1; k < lines.length; k++) {
        const rawk = lines[k];
        const clean = stripComment(rawk);
        if (/^\s*$/.test(clean)) continue;
        const pmk = clean.match(rePrefix);
        if (!pmk) break;
        const depthk = (pmk?.groups?.indent?.length || 0) / 2;
        if (depthk < depth) break; // bubbled up
        if (depthk === depth) {
          const restk = clean.slice(pmk[0].length);
          if (/^(--|==)\s/.test(restk)) {
            push(k, 0, 1, 'No siblings allowed at this depth after a closed (:) branch (FW.08).', 'FW.08');
          }
          break;
        }
      }
    }

    // update stack for this depth
    stack[depth] = { contentCol, branch };
  }

  return issues;
}

module.exports = { lintText };
