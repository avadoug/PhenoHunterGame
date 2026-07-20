# Known limitations and recommended roadmap

This release deliberately completes the Quick Hunt MVP before expanding scope.

## Current limitations

- Career Mode, rival breeders, cloud accounts, online leaderboards, and daily tournaments are roadmap surfaces rather than playable modes.
- Persistence is device-local. Clearing browser storage removes saves unless the player exported them.
- Procedural CSS portraits communicate phenotype variation without a large illustrated asset library.
- Browser-generated audio is intentionally restrained and depends on user interaction and Web Audio support.
- Offline caching begins after a successful online visit; a first visit always requires a connection.

## Recommended future features

1. Career Mode with company identity, equipment unlocks, preservation contracts, and multi-generation selection pressure.
2. Rival breeders who use the same simulation rules and can outperform the player.
3. Daily and community seeds with signed, shareable results.
4. Cloud save synchronization behind an explicit account option.
5. Expanded pedigree visualization, competitions, preservation mode, and advanced trait mapping.

These additions should reuse the deterministic engine and versioned save contract rather than weakening the completed core hunt.
