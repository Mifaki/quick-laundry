import { format } from 'date-fns';
import { and, eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/server/db';
import { orders, sessions } from '@/server/db/schema';
import MidtransService from '@/shared/actions/rootpaymentservice';
import type { IPaymentPayloadRoot } from '@/shared/models/paymentinterfaces';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as IPaymentPayloadRoot;

    if (!data?.price || data.quantity <= 0) {
      return NextResponse.json({ error: 'Invalid payment details' }, { status: 400 });
    }

    const paymentItems = [
      {
        id: Number(data.laundryMachineId),
        name: `Laundry Service for ${data.session}`,
        price: data.price,
        quantity: data.quantity,
      },
    ];

    const { token, redirect_url } = await MidtransService.createTransaction(paymentItems);

    if (!token) {
      return NextResponse.json({ error: 'Failed to generate payment token' }, { status: 400 });
    }

    if (!redirect_url) {
      return NextResponse.json({ error: 'Failed to generate payment URL' }, { status: 400 });
    }

    const formattedDate = format(new Date(data.date), 'yyyy-MM-dd');

    const matchingSession = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sql`DATE(${sessions.date})`, formattedDate),
          eq(sessions.laundryMachineId, Number(data.laundryMachineId)),
          eq(sessions.sessionStart, data.session)
        )
      )
      .limit(1);

    if (!matchingSession.length) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const order = {
      id: token,
      price: data.price,
      quantity: data.quantity,
      sessionID: matchingSession[0]!.id,
    };

    if (!order.id) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 500 });
    }

    await db.transaction(async (tx) => {
      await tx.insert(orders).values(order);
      await tx
        .update(sessions)
        .set({ isBooked: 1 })
        .where(and(eq(sessions.id, matchingSession[0]!.id), eq(sessions.isBooked, 0)));
    });

    return NextResponse.json(
      {
        message: 'Sessions retrieved successfully',
        data: {
          token: token,
          redirect_url: redirect_url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment Transaction Error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
