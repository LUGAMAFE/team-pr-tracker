# team-pr-tracker

A small web app for tracking who is reviewing what across a development team — which pull
requests are waiting, who they are assigned to, and what came back from each revision.

Built to answer a question standups keep re-asking: *is this PR actually blocked, or is it
just waiting on someone?*

## Stack

| Package | Stack |
| --- | --- |
| `packages/backend` | Express 4, Mongoose 7 (MongoDB) |
| `packages/frontend` | React 18, Vite 4, MUI 5 |

The repository is a Yarn workspaces monorepo wired with Lerna and Nx, with CI in
`.github/workflows/checks.yml`.

## Domain

Three models carry the whole thing:

| Model | Is |
| --- | --- |
| `reviewer` | A team member who reviews |
| `candidate` | Something queued for review |
| `revision` | One pass a reviewer made over a candidate |

The API exposes `reviewers` and `candidates`; the frontend is organized around the
reviewer view.

## Running it

```sh
yarn install
cp packages/backend/.env.example packages/backend/.env   # point it at your MongoDB

yarn workspace backend dev     # API
yarn workspace frontend dev    # Vite dev server
```

## Status

Not actively maintained. It is public because the idea held up: the review bottleneck in a
team is a people-and-queue problem before it is a tooling problem. That thread continued
into [Kensa](https://github.com/loopcrack-org/kensa-app), which reviews pull requests with
AI agents instead of tracking who has not gotten to them yet.
