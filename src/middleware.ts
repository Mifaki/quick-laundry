import { NextResponse } from 'next/server';
import getBaseUrl from './shared/usecase/getBaseUrl';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const baseUrl = getBaseUrl();
  const pathname = request.nextUrl.pathname.replace(baseUrl, '').split('?')[0];

  // Direct user to /home
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }
}
