import { FLOW_ID } from './common/constants';
import { getLatestPatchNoteCore } from './core';
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  console.log(`[CRONJOB][${FLOW_ID}] Starting getLatestPatchNote process...`);
  try {
    await getLatestPatchNoteCore();
    console.log(`[CRONJOB][${FLOW_ID}] Patch note processed successfully.`);
    res.status(200).json({ success: true, message: 'Patch note processed successfully.' });
  } catch (error) {
    console.error(`[CRONJOB][${FLOW_ID}] Error:`, error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}
