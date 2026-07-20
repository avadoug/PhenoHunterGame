# Content expansion guide

Content is data-driven and does not need to be buried in UI components.

## Add parent genetics

Add an entry in `data/parents.ts` with a unique slug, fictional identity, lineage, stability, tendencies, strengths, weakness, recessive, breeding value, visual color, and trait overrides. Keep names original and avoid real breeder intellectual property.

## Add goals or events

`data/gameContent.ts` contains weighted project goals and strategic events. A goal maps trait keys to signed weights. An event supplies choices and optional resource or population modifiers. Every event choice should express a real tradeoff and remain abstract rather than instructional.

## Add traits

Extend `TraitKey` and `TraitSet` in `types/game.ts`, provide defaults for every parent, add the trait to inheritance and visibility rules, then expose it only at the correct stage. Add deterministic tests before changing save schema.

## Add modes

Build new modes on top of the pure reducer instead of forking UI state. Career progression, rivals, daily seeds, and preservation lines should provide their own setup inputs and content data while reusing the population, visibility, save, and comparison systems.
