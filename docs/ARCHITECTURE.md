# Architecture and genetic simulation

## Runtime architecture

The app is a strict TypeScript Next.js 16 client game with no server-owned state. React renders the interface, while gameplay logic remains in pure engine modules. Vercel can build it as a normal Next.js project; a separate `build:sites` target preserves the bundled Sites/Cloudflare output path.

The reducer in `engine/game.ts` is the only authority for stage transitions and failure guards. `engine/genetics.ts` owns population generation, goal scoring, rarity, trait visibility, and naming. `lib/save.ts` wraps every persisted state in a versioned envelope and rejects invalid imports.

## Deterministic randomization

The run seed, both parent IDs, and generation type feed a small deterministic PRNG. The same inputs reproduce the same initial population. Player decisions then deterministically change that state. A random seed is only generated when the player requests one.

## Inheritance model

Each offspring trait starts with a randomized contribution from both fictional parents, then applies:

- parental stability, which narrows or widens variation;
- hybrid vigor on early growth and branching;
- wider segregation in F2 populations;
- low-probability mutations;
- linked tradeoffs such as aroma with softer stems or dense flower with lower mold resistance;
- strategic harvest, cure, and event modifiers.

The model is intentionally breeder-flavored rather than a claim of scientific accuracy. A plant’s rarity rewards a coherent, goal-aligned combination with breeding value and occasional novelty—not a row of perfect scores.

## Visibility model

Seedlings expose only early growth. Vegetation adds structure and cloning. Flower reveals timing, output, color, resin, and risk in stages. Sensory and effect values remain sealed until their tests. The UI asks the engine for visible keys, so hidden information is enforced consistently across plant cards, the inspector, and comparison mode.
