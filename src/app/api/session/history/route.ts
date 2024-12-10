import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/server/db';
import { laundryMachines, orders, sessions } from '@/server/db/schema';

export async function GET(req: NextRequest) {
  try {
    const allOrders = await db
      .select({
        orderId: orders.id,
        price: orders.price,
        quantity: orders.quantity,
        sessionId: sessions.id,
        sessionStart: sessions.sessionStart,
        sessionEnd: sessions.sessionEnd,
        sessionDate: sessions.date,
        machineId: laundryMachines.id,
        machineName: laundryMachines.name,
      })
      .from(orders)
      .innerJoin(sessions, sql`${orders.sessionID} = ${sessions.id}`)
      .innerJoin(laundryMachines, sql`${sessions.laundryMachineId} = ${laundryMachines.id}`)
      .orderBy(sql`${orders.createdAt}`);

    return NextResponse.json(
      {
        message: 'Orders retrieved successfully',
        data: allOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        message: 'Error retrieving orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
