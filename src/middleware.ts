import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('ACCESS_TOKEN');
  console.log(token);
  const allowedPaths = [
    '/post',
    '/signup',
    '/terms',
    '/guide',
    '/login',
    '/mungdogdiarymung',
  ];

  const isAllowed = allowedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  const isRootPath = req.nextUrl.pathname === '/';

  if (!token && !isAllowed && !isRootPath) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
