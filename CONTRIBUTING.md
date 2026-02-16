# Contributing to Calligraph

Read the [README](./README.md) before getting started.

Before opening a PR, search [existing issues](https://github.com/raphaelsalaja/calligraph/issues) and [pull requests](https://github.com/raphaelsalaja/calligraph/pulls) for anything related.

## Developing

- The development branch is `main`.
- All pull requests should be opened against `main`.

### Setup

1. Clone the repository:

   ```sh
   gh repo clone raphaelsalaja/calligraph
   ```

2. Create a new branch:

   ```sh
   git checkout -b my-branch
   ```

3. Install dependencies:

   ```sh
   pnpm install
   ```

4. Start developing:

   ```sh
   pnpm dev
   ```

   This starts Turborepo in watch mode — the library rebuilds on changes and the demo site hot-reloads.

5. When your changes are finished, commit them:

   ```sh
   git add .
   git commit -m "feat: describe your changes"
   ```

6. Open a pull request:

   ```sh
   gh pr create
   ```

## Repository Structure

| Path                   | Description          |
| ---------------------- | -------------------- |
| `packages/calligraph/` | The library package  |
| `apps/web/`            | Next.js demo site    |

The library is intentionally a **single-file package** — `packages/calligraph/src/index.tsx`. Keep it that way unless there is a strong reason to split.

## Linting

This project uses [Biome](https://biomejs.dev) for linting and formatting.

```sh
pnpm lint
```

Linting runs automatically on pre-commit via [Husky](https://typicode.github.io/husky). CI will also catch anything that slips through.

We recommend installing the [Biome extension for VS Code](https://marketplace.visualstudio.com/items?itemName=biomejs.biome).

## Commit Convention

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org) specification, enforced by [commitlint](https://commitlint.js.org). Examples:

```
feat: add duration prop
fix: correct LCS alignment for repeated characters
docs: update usage examples
chore: bump motion to v12.1
```

## Changesets

We use [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

If your PR changes the public API or fixes a bug, add a changeset:

```sh
pnpm changeset
```

Follow the prompts to describe your change and select a semver bump. The generated markdown file should be committed with your PR.

If your change is internal (CI, docs, dev tooling), you do not need a changeset.

## Pull Requests

- Keep PRs focused — one feature or fix per PR.
- Link related issues in the description.
- Make sure `pnpm lint` and `pnpm build` pass before requesting review.
- Add a changeset if applicable.
