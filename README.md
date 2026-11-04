# Arrow Adventure QA

Independent GitHub Pages target for manually selected Arrow Adventure commits.

QA site: https://mirpkered.github.io/arrow-adventure-qa/

## Deploy a candidate

From the `mirpkered/arrow-adventure-qa` repository, open **Actions → Deploy QA candidate → Run workflow** and enter the full 40-character commit SHA from the public `mirpkered/arrow-adventure` repository. The workflow checks out that exact commit, runs `npm ci`, `npm test`, `npm run typecheck`, and a production build with `/arrow-adventure-qa/` as the base path. Only after every validation succeeds does it deploy to this repository's Pages site.

The QA page shows a small QA badge with the source commit prefix. `qa-deployment.json` in the deployed artifact contains the full source SHA, source repository, and workflow run URL. Re-run the workflow with an earlier SHA to roll QA back to that candidate.

This repository uses manual `workflow_dispatch` only. It has no production credentials or connection to the production Pages workflow. Production remains in `mirpkered/arrow-adventure`, where reviewed releases reach `main` through the normal release approval process.