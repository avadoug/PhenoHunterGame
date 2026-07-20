# Contributing

1. Create a focused branch.
2. Preserve deterministic behavior: the same seed and decisions must produce the same result.
3. Keep game rules in `engine/`, content in `data/`, and rendering in `components/`.
4. Avoid real-world cultivation procedure and real breeder intellectual property.
5. Keep keyboard, touch, reduced-motion, readable contrast, and non-color status cues intact.
6. Run `npm run check` before opening a pull request.

New user-visible behavior should include a test or a clear testing note. Changes to persisted state require a schema migration plan rather than silently reusing version `1`.
