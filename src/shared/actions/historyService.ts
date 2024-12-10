'use server';

import { env } from '@/env';

const baseUrl = env.BASE_API_URL;

export async function getHistory() {
  try {
    const response = await fetch(`${baseUrl}/session/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
