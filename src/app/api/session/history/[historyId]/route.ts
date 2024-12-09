import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { laundryMachines, orders, sessions } from '@/server/db/schema';

export async function GET(req: Request, context: { params: { historyId: string } }) {
  try {
    const { historyId } = context.params;

    if (!historyId) {
      return NextResponse.json(
        {
          message: 'Order ID is required',
          error: 'Invalid request',
        },
        { status: 400 }
      );
    }

    const orderDetails = await db
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
        createdAt: orders.createdAt,
      })
      .from(orders)
      .innerJoin(sessions, sql`${orders.sessionID} = ${sessions.id}`)
      .innerJoin(laundryMachines, sql`${sessions.laundryMachineId} = ${laundryMachines.id}`)
      .where(sql`${orders.id} = ${historyId}`)
      .limit(1);

    if (orderDetails.length === 0) {
      return NextResponse.json(
        {
          message: 'Order not found',
          error: 'Invalid historyId',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Order retrieved successfully',
        data: orderDetails[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return NextResponse.json(
      {
        message: 'Error retrieving order',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
