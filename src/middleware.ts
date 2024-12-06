import { NextRequest, NextResponse } from 'next/server';
import getBaseUrl from './shared/usecase/getBaseUrl';

export async function middleware(request: NextRequest) {
  const baseUrl = getBaseUrl();
  const pathname = request.nextUrl.pathname.replace(baseUrl, '').split('?')[0];

  // Direct user to /home
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }
}
