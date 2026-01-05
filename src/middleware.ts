import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/cart', '/checkout'];

const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;


    const hasRefreshToken = request.cookies.has('refreshToken');

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && hasRefreshToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isProtectedRoute && !hasRefreshToken) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/cart',
        '/checkout',
        '/auth/login',
        '/auth/register',
    ],
};
