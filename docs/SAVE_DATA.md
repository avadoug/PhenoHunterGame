# Save data

Save schema version: `1`.

Autosave, three manual slots, the Hall of Fame, and settings use browser storage. A save contains the complete reducer state: run inputs, population, stage, resources, tests, event history, notes, keeper record, achievements, and Hall of Fame.

Exports are JSON envelopes with:

- `schemaVersion`
- `label`
- `savedAt`
- `state`

Imports are parsed defensively and must pass `validateGameState`. Invalid JSON, an unsupported schema, empty populations, or malformed core fields are rejected without replacing the current game. Deleting a manual slot requires confirmation. Cloud saves can later implement the same envelope contract without changing engine state.
