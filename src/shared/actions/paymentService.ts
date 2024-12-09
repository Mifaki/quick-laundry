'use server';

import { env } from '@/env';
import { IPaymentPayloadRoot, IPaymentResponseRoot } from '../models/paymentinterfaces';
import { ClientError } from '../usecase/clientError';

const baseURL = env.BASE_API_URL;

export async function createOrder(
  payload: IPaymentPayloadRoot
): Promise<IPaymentResponseRoot | any> {
  try {
    const response = await fetch(`${baseURL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await ClientError.create(response);
      throw error;
    }

    const data: Omit<IPaymentResponseRoot, 'success'> = await response.json();

    return {
      ...data,
      success: true,
    };
  } catch (error) {
    if (error instanceof ClientError) {
      return {
        success: false,
        message: error.message,
        code: error.code,
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred',
      code: 500,
    };
  }
}
