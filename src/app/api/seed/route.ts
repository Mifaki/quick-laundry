import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from '@/env';
import { db } from '@/server/db';
import { generateSessionsForNextDay, seedLaundryMachines } from '@/server/db/schema';

export async function POST(req: NextRequest) {
  if (env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Seeding is not allowed in production' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== env.SEED_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await seedLaundryMachines(db);
    await generateSessionsForNextDay(db);

    return NextResponse.json({ message: 'Database seeded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      {
        message: 'Error seeding database',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
