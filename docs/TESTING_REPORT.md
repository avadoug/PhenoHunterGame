# Testing report and quality scorecard

Release verification completed on July 20, 2026. The same source passed the standard Next.js/Vercel build and the secondary vinext deployment build.

## Automated coverage

- Deterministic replay of an identical cross and seed
- F1/F2 population differentiation
- Full Quick Hunt: cull, clone, flower event, harvest, cure, all sensory tests, keeper, name, F2, Hall of Fame
- Impossible-state guards, including advancement prerequisites and the last active plant
- Save-schema validation and corrupted shape rejection
- Strict TypeScript, ESLint, and production compilation

## Manual design checks

- Keyboard focus and labelled controls
- Reduced-motion behavior
- Non-color status communication
- Confirmation and one-step undo for culling
- 320 px, 375 px, tablet, desktop, and large desktop CSS breakpoints
- Touch targets, modal containment, responsive one-panel mobile navigation
- Local autosave, three manual slots, import/export, and offline revisit cache

## Release scorecard

| Category | Score | Evidence |
| --- | ---: | --- |
| Visual polish | 9/10 | A unified bio-electric art system, procedural phenotype silhouettes, stage animation, restrained effects, and a purpose-built social card replace starter and placeholder visuals. |
| Interface clarity | 9/10 | Persistent phase objective, stage rail, context-sensitive dock, locked-action explanations, confirmation, undo, and textual hidden/known states keep the next decision explicit. |
| Responsiveness | 9/10 | Layout changes from three-region desktop to one-panel mobile navigation; dedicated 1180, 900, 600, 360, and 320-safe rules prevent shrink-only behavior. |
| Gameplay depth | 9/10 | A full run includes parent/goal selection, 12-plant uncertainty, culling, scarce clones, five flower weeks, event tradeoffs, harvest/cure modifiers, five tests, naming, and lineage choice. |
| Genetic believability | 8/10 | Parent weighting, stability, hybrid vigor, F2 segregation, mutation, stage confidence, and linkage drag create breeder-flavored outcomes without claiming scientific precision. |
| Decision quality | 9/10 | Goal fit competes with stability, resources, hidden information, sensory identity, and linked weaknesses; the engine never auto-selects the keeper. |
| Replayability | 9/10 | Reproducible shared seeds, 24 parents, 11 goals, varied events, hidden outliers, and different F2/backcross records produce meaningfully different hunts. |
| Accessibility | 9/10 | Keyboard focus, labelled controls, non-color cues, reduced motion, scalable UI, large mobile targets, modal focus/escape handling, mute/volume, and glossary are implemented. |
| Performance | 9/10 | The release is statically prerendered, uses CSS procedural art and browser audio, avoids a runtime API/database, and completes optimized compilation without warnings. |
| Stability | 9/10 | Lint, strict TypeScript, five engine suites, full-loop automation, guard tests, production HTTP smoke checks, clean-install resolution, and both builds pass. |
| Audio feedback | 8/10 | Optional Web Audio hum and restrained action/reveal/keeper cues work without media assets and fail safely when Web Audio is unavailable. |
| Sense of discovery | 9/10 | Stage-sealed traits, rarity withheld until testing, sensory prose, contradictory tradeoffs, naming, keeper reveal, achievements, and Hall of Fame create a complete payoff. |

## Final release evidence

- `npm run check`: passed (ESLint, five deterministic tests, strict TypeScript through Next, optimized production build)
- `npm run build:sites`: passed (Cloudflare-compatible secondary build)
- HTTP smoke checks: `/`, `/manifest.webmanifest`, `/sw.js`, and `/og.png` all returned `200`
- Production dependency audit: zero known vulnerabilities
- Clean install resolution: `npm ci --dry-run` passed with the committed lockfile
- Two deterministic populations and two generation modes were exercised; identical seeds replayed exactly while F2 output differed from F1
