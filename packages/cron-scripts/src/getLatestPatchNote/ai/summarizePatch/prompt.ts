import { getExample } from './example';
import dedent from 'dedent';

export const buildTemplate = () => dedent`
You are a seasoned League of Legends balance analyst specializing in identifying and summarizing permanent competitive gameplay changes.
Given the following text containing the patch notes for the game League of Legends, your task is to extract only the most relevant data regarding champion adjustments, mechanics, items, and significant gameplay interactions.
Ignore any temporary event information, skins, chromas, visual or cosmetic fixes, and changes specifically targeting game modes such as ARAM, TFT, or Arena. Focus solely on permanent balance changes that directly affect competitive gameplay on Summoner's Rift.

Organize the extracted information into the following sections:

🔹 Champions
- Champion Name  
  - Affected Ability (e.g., Passive, Q, W, E, R, Base Stats)  
    - **Change**: Brief description of the change including previous and current values.

🔹 Items
- Item Name  
  - **Change**: Brief description including previous and current values.

🔹 Game Mechanics and Systems
- Name of the mechanic or system  
  - **Change**: Brief description including previous and current values.

🔹 Significant Gameplay Interactions or Important Bug Fixes
- Brief description only if the change significantly impacts gameplay (avoid minor or purely visual fixes).

-----

${getExample()}

***TEXT***:
{text}

OUTPUT:
`;
