import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [distPath, candidateSha, runUrl] = process.argv.slice(2);
if (!distPath || !/^[0-9a-f]{40}$/.test(candidateSha ?? '') || !/^https:\/\/github\.com\//.test(runUrl ?? '')) {
  throw new Error('Usage: node stamp-qa-build.mjs <dist> <full-source-sha> <workflow-run-url>');
}

const absoluteDist = path.resolve(distPath);
const indexPath = path.join(absoluteDist, 'index.html');
const html = await readFile(indexPath, 'utf8');
if (!html.includes('</body>')) throw new Error('Built index.html has no closing body tag');
const badge = `<meta name="qa-source-commit" content="${candidateSha}"><meta name="qa-workflow-run" content="${runUrl}"><style>#arrow-adventure-qa-badge{position:fixed;z-index:99999;right:9px;bottom:9px;padding:5px 8px;border:1px solid #e7c45f;border-radius:9px;background:#111c3cE8;color:#fff;font:500 11px/1.2 system-ui,sans-serif;letter-spacing:.02em;box-shadow:0 2px 8px #0003}#arrow-adventure-qa-badge a{color:#ffe28a;text-decoration:none}</style><div id="arrow-adventure-qa-badge" role="note" aria-label="QA build ${candidateSha}">QA · <a href="${runUrl}" title="View deployment run">${candidateSha.slice(0, 12)}</a></div>`;
await writeFile(indexPath, html.replace('</body>', `${badge}</body>`));
await writeFile(path.join(absoluteDist, 'qa-deployment.json'), `${JSON.stringify({ environment: 'qa', sourceRepository: 'mirpkered/arrow-adventure', sourceCommit: candidateSha, workflowRun: runUrl }, null, 2)}\n`);