# Phenohunter: The Lost Keeper

A complete, browser-based fictional plant genetics strategy game. Quick Hunt takes a player from parent selection through a deterministic 12-plant population, stage-based selection, a random garden event, sensory evaluation, keeper naming, and an F2 or backcross record.

The game is entertainment for adults. It contains abstract, fictional game systems—not real-world cultivation guidance.

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Progress autosaves locally in the browser.

## Verify the release

```bash
npm run check
```

This runs lint, deterministic engine tests, a complete automated Quick Hunt, failure guards, save validation, strict TypeScript compilation, and the production build.

## Deploy through GitHub and Vercel

1. Create an empty GitHub repository.
2. From this project folder, commit the source and push it to that repository.
3. In Vercel, choose **Add New → Project**, import the GitHub repository, and leave the detected framework as **Next.js**.
4. Deploy. No database, secret, or environment variable is required.

`vercel.json` pins the safe install and build commands. The game uses local browser persistence, so forks and preview deployments work without external infrastructure.

## Project map

- `app/` — Next.js entry point, metadata, and global art direction
- `components/game/` — full game shell and accessible interaction surfaces
- `components/plants/` — procedural phenotype renderer
- `data/` — parent genetics, goals, events, tutorial content, glossary
- `engine/` — deterministic randomization, inheritance, trait visibility, state machine
- `hooks/` — lightweight browser-safe audio
- `lib/` — versioned autosave/manual save/import/export layer
- `types/` — strict shared game types
- `tests/` — deterministic, full-loop, failure, and save-schema tests
- `docs/` — game rules, architecture, content expansion, saves, QA, limitations

## Documentation

- [Game rules](docs/GAME_RULES.md)
- [Architecture and genetics](docs/ARCHITECTURE.md)
- [Save data](docs/SAVE_DATA.md)
- [Content expansion guide](docs/CONTENT_GUIDE.md)
- [Testing report and quality scorecard](docs/TESTING_REPORT.md)
- [Known limitations and roadmap](docs/KNOWN_LIMITATIONS.md)
- [Contributing](docs/CONTRIBUTING.md)

## License and content note

All cultivar names, breeders, locations, and genetic lines in the game are fictional. The Discord community link is optional and non-blocking. Before publishing a public fork, choose and add the license that fits your project.
