import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { generateSessionsForNextDay } from '@/server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    await generateSessionsForNextDay(db);
    res.status(200).json({ message: 'Sessions generated successfully' });
  } catch (error) {
    console.error('Failed to generate sessions:', error);
    res.status(500).json({ message: 'Failed to generate sessions' });
  }
}
