# Contributing

Thanks for helping make Perfboard Designer better. Bug reports, ideas, new parts and pull requests
are all welcome.

## Find something to do

- Browse the [issues](https://github.com/MaurerKrisztian/perfboard-designer/issues). Ones labelled
  **good first issue** are small and self-contained.
- Found a bug or have an idea? Open an issue first for anything bigger than a small fix, so we can
  agree on the approach before you spend time on it.

## Run it

You need Node.js 16 or newer (22 or newer for the MCP server in `mcp/`).

```bash
npm install
npm run start     # http://localhost:3000/app/ is the editor
```

## Before you open a pull request

- **Read [ARCHITECTURE.md](ARCHITECTURE.md)** for the part you're changing. It explains how the
  editor is built and where new code goes.
- **Check it in the browser.** There are no automated tests yet. [docs/testing-with-agents.md](docs/testing-with-agents.md) shows how to open a known
  board and read back what the editor holds.
- **Run `npm run lint` and `npm run build`.** Both must pass. Lint also enforces which folders may
  import which. If it stops an import, move the code to the right place rather than silencing it.
- **Update the user guide** (`guide/index.html`) if your change alters how something is used: a
  tool, shortcut, menu or panel.
- **Keep old project files opening.** A change to the file format needs a new version number and
  an upgrade path in the reader.

## Adding a part

Usually one entry with a `category` in the right definitions file in `src/parts/` is all it
takes. The catalog, search, nets and AI server pick it up from there. Please link the datasheet
you took the pinout from in your pull request.

## Pull requests

- One change per pull request, kept as small as it can be.
- Say what you changed and how you checked it. Add a screenshot for anything visible.
- Commit messages follow the existing style: `feat: …`, `fix: …`, `docs: …`.

By contributing, you agree that your work is released under the project's ISC license.
