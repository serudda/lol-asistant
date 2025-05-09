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
