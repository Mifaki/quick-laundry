'use server';

import { env } from '@/env';
import { IDetailOrder } from '../models/detailorderInterface';

const baseUrl = env.BASE_API_URL;

export async function getHistory(): Promise<IDetailOrder[]> {
  const response = await fetch(`${baseUrl}/session/history`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch history: ${response.statusText}`);
  }

  const result = await response.json();
  if (!result || !Array.isArray(result.data)) {
    console.error('Unexpected API response:', result);
    throw new Error('Invalid response format: expected "data" to be an array');
  }

  return result.data as IDetailOrder[];
}
