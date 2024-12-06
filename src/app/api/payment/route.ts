import { NextRequest, NextResponse } from 'next/server';
import MidtransService from '@/shared/actions/rootpaymentservice';
import { IPaymentItem } from '@/shared/models/paymentinterfaces';

export async function POST(req: NextRequest) {
  try {
    const data: IPaymentItem[] = await req.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Invalid payment items' }, { status: 400 });
    }

    const token = await MidtransService.createTransactionToken(data);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Payment Transaction Error:', error);

    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
