import { random, round, sumBy } from 'lodash';
import Midtrans, { TransactionResponse } from 'midtrans-client';
import { env } from '@/env';
import { IMidtransPaymentParameter, IPaymentItem } from '../models/paymentinterfaces';

class MidtransService {
  private snap: Midtrans.Snap;

  constructor() {
    this.validateEnvironmentVariables();

    this.snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    });
  }

  private validateEnvironmentVariables() {
    const requiredEnvVars = ['MIDTRANS_SERVER_KEY', 'NEXT_PUBLIC_MIDTRANS_CLIENT_KEY'];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }
  }

  /**
   * Prepare payment items for Midtrans transaction
   * @param items
   * @returns
   */
  private preparePaymentItems(items: IPaymentItem[]): IPaymentItem[] {
    if (items.length === 0) {
      throw new Error('No payment items provided');
    }

    return items.map((item) => ({
      ...item,
      price: round(parseFloat(item.price.toString()), 2),
      key: item.id,
    }));
  }

  /**
   * Create Midtrans transaction token
   * @param items Payment items
   * @returns Midtrans transaction token
   */
  async createTransaction(items: IPaymentItem[]): Promise<TransactionResponse> {
    const processedItems = this.preparePaymentItems(items);

    const grossAmount = sumBy(processedItems, (item: IPaymentItem) => item.price * item.quantity);

    const parameter: IMidtransPaymentParameter = {
      item_details: processedItems,
      transaction_details: {
        order_id: random(100000, 999999),
        gross_amount: grossAmount,
      },
    };

    try {
      return await this.snap.createTransaction(parameter);
    } catch (error) {
      console.error('Midtrans Transaction Token Creation Failed', error);
      throw new Error('Failed to create Midtrans transaction token');
    }
  }
}

export default new MidtransService();
