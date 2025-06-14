import { FLOW_ID } from './common/constants';
import { updateAllChampionsImageCore } from './core';
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  console.log(`[CRONJOB][${FLOW_ID}] Starting updateAllChampionsImage process...`);
  try {
    await updateAllChampionsImageCore();
    console.log(`[CRONJOB][${FLOW_ID}] Update all champions image process completed successfully.`);
    res.status(200).json({ success: true, message: 'Champion stats updated successfully.' });
  } catch (error) {
    console.error(`[CRONJOB][${FLOW_ID}] Error:`, error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}
