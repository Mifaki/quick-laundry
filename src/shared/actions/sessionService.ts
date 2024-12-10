'use server';

import { env } from '@/env';
import type { IAllSessionBookResponseRoot } from '../models/sessionInterface';
import { ClientError } from '../usecase/clientError';

const baseURL = env.BASE_API_URL;

export async function getAllAvailableSession(): Promise<IAllSessionBookResponseRoot | any> {
  try {
    const response = await fetch(`${baseURL}/session/book`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const error = await ClientError.create(response);
      throw error;
    }

    const data: Omit<IAllSessionBookResponseRoot, 'success'> = await response.json();

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
