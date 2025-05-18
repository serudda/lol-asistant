// import { LoLChampionRole } from '@lol-assistant/db';

import { LoLChampionRole } from '../../utils/api';

// ---------------------------------------------------------------------------
// SVG definitions
// ---------------------------------------------------------------------------

const MID_ICON = (
  <>
    <path
      fill="currentColor"
      fillOpacity="0.5"
      d="M4 4h10.546l-2.91 2.91H6.909v4.726L4 14.546V4Zm16 16H9.455l2.909-2.91h4.728v-4.726L20 9.454V20Z"
    />
    <path fill="currentColor" d="M17.09 4H20v2.91L6.91 20H4v-2.91L17.09 4Z" />
  </>
);

const ADC_ICON = (
  <>
    <path fill="currentColor" fillOpacity="0.5" d="M4 17.818V4h13.818l-2.91 2.91h-8v8L4 17.817Z" />
    <path fill="currentColor" d="M20 20H6.182l2.909-2.91h8v-8L20 6.183V20Z" />
    <path fill="currentColor" fillOpacity="0.5" d="M9.819 14.181h4.364V9.818H9.82v4.363Z" />
  </>
);

const JUNGLE_ICON = (
  <>
    <path
      fill="currentColor"
      d="m12.285 21-5.642-5.905c-.143-2.42-1-4.482-2.643-6.191 2.715 1.78 4.357 3.344 4.929 4.767C8.643 9.261 7.786 5.704 6.429 3c3.928 5.478 5.928 9.676 6.07 12.522.144 2.845.07 4.695-.214 5.478Zm2.215-2.846c.214-4.482 2-7.897 5.5-10.173-1.715 2.56-2.428 4.98-2.285 7.327L14.5 18.154Zm-.928-4.91-.93-3.84c1-2.064 2.643-4.198 4.858-6.262-1.571 2.846-2.5 5.123-2.928 6.76-.358 1.707-.715 2.774-1 3.343Z"
    />
  </>
);

const SUPPORT_ICON = (
  <>
    <path
      fill="currentColor"
      d="m11.965 20 2.757-2.327-2.757-7.128-2.827 7.128L11.965 20Zm-3.746-6.546 2.12-4-1.908-1.818H2l5.583 2.546-1.413 1.382 2.05 1.89Zm7.49 0-2.048-4 1.909-1.818H22l-5.583 2.546 1.414 1.382-2.12 1.89h-.001Zm-3.815-5.09 2.828-2.91L13.308 4H10.48L9.067 5.382l2.827 2.982Z"
    />
  </>
);

const TOP_ICON = (
  <>
    <path fill="currentColor" d="M4 17.818V4h13.818l-2.91 2.91h-8v8L4 17.817Z" />
    <path fill="currentColor" fillOpacity="0.5" d="M20 20H6.182l2.909-2.91h8v-8L20 6.183V20Z" />
    <path fill="currentColor" fillOpacity="0.5" d="M9.819 14.181h4.364V9.818H9.82v4.363Z" />
  </>
);

export const ICON_PATHS: Record<LoLChampionRole, React.ReactNode | null> = {
  [LoLChampionRole.top]: TOP_ICON,
  [LoLChampionRole.jungle]: JUNGLE_ICON,
  [LoLChampionRole.mid]: MID_ICON,
  [LoLChampionRole.adc]: ADC_ICON,
  [LoLChampionRole.support]: SUPPORT_ICON,
};
