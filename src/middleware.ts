import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/cart', '/checkout'];

const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const hasRefreshToken = request.cookies.has('refreshToken');
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Allow access to auth pages always to permit re-login
    // We remove the redirect-away-from-auth-if-has-token logic
    // because the token might be existing but invalid (causing the loop the user saw)

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
