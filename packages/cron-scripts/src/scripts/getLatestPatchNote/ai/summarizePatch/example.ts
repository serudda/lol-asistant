import dedent from 'dedent';

export const getExample = (): string => {
  return dedent`
  🔹 Champions

  **Brand**
  - **Passive – Blaze**
  - Damage cap vs non-epic monsters: 7.5 / 15 / 22.5 ⇒ 10 / 20 / 30  
  - Explosion Damage cap: 250 / 325 / 400 / 475 ⇒ 270 / 355 / 440 / 525

  **Darius**
  - **Base Stats**
    - Armor: 39 ⇒ 37
  - **E – Apprehend**
    - Cooldown: 24–14 ⇒ 26–16

  **Gwen**
  - **Q – Snip Snip**
    - Final Snip Damage: 70–170 (+35% AP) ⇒ 60–160 (+35% AP)
  - **W – Hallowed Mist**
    - Resists: 25 (+5% AP) ⇒ 22 (+7% AP)

  ---

  🔹 Items

  **Catalyst of Aeons**
  - Build Path: Ruby + Sapphire + 600g ⇒ 2x Ruby + Sapphire + 200g  
  - Mana: 300 ⇒ 375  
  - Eternity effect (mana from damage): 7% ⇒ 10%

  **Rod of Ages**
  - Eternity effect (mana from damage): 7% ⇒ 10%

  **Umbral Glaive**
  - Cost: 2600g ⇒ 2500g  
  - AD: 50 ⇒ 55  
  - Blackout Cooldown: 50s ⇒ 90s

  ---

  🔹 Game Mechanics and Systems

  **Fountain Healing**
  - Max HP regen: 10.4% ⇒ 8%  
  - Max MP regen: 12.4% ⇒ 10%  
  - Missing HP/MP (early game): 6% ⇒ 16%  
  - Missing HP/MP (late game): 12% ⇒ 16%

  **Homeguard Speed**
  - Early-game: 75% ⇒ 65%  
  - 14–40 min scaling: 75–150% ⇒ 65–150%

  **Lane Swap Detection**
  - Mid-lane detection zone reduced — no longer overlaps most of Raptor Pit

  ---

  🔹 Significant Gameplay Interactions or Important Bug Fixes

  - **Yone E**: No longer cleanses CC — retains debuffs during return
  - **Shen Q**: Now applies flat structure damage — better split push
  - **Singed Q**: Can no longer execute Tryndamere during ult
  - **Naafiri R**: Fixed terrain snap bug
  - **Viego**: Fixed possession bug with Mel W
  - **Sylas/Zeri R**: Fixed cooldown interaction
  `;
};
