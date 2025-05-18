## Get lastest Patch

```
pnpm script:run getLatestPatchNote
```

This script fetches patch notes from the League of Legends website and save it to the database.

---

## Sync new Champions changes

```
pnpm script:run syncAllChampions patchVersion=<game_version>
```

**Example:** `pnpm script:run syncAllChampions patchVersion=14.1.1`

Every new patch, we run this script to call the ddragon API and download/update all Champions again... this way we keep all Champions up to date.

---

## Get Champion Counters

```
pnpm script:run getChampionCounters patchVersion=<game_version> championSlug=<champion_slug> role=<role> rank=<rank>
```

**Example:** `pnpm script:run getChampionCounters patchVersion=14.1.1 championSlug=ahri role=mid rank=platinum`

This script fetches champion counters from the following sources:

- Mobalytics
- OP.GG
- U.GG

It then creates ChampionMatchup and SourceMatchupStat records for each counter.
It also recalculates the stats for all processed matchups (weightedWinRate and totalMatches).

---

## Recalculate Champion matchup stats (weightedWinRate and totalMatches)

```
pnpm script:run recalculateChampMatchupStats patchVersion=<game_version>
```

**Example:** `pnpm script:run recalculateChampMatchupStats patchVersion=14.1.1`

This script recalculates the stats for all champion matchups
for a specific patch version (weightedWinRate and totalMatches).
