import { clerkMiddleware, createRouteMatcher, ClerkMiddlewareAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserRoleFromDB } from './lib/auth/getUserRoleFromDB';

const isAdminRoute = createRouteMatcher(['/dashboard/admin(.*)']);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req) => {
  if (!isAdminRoute(req)) return;

  const userId = auth().userId; 

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const role = await getUserRoleFromDB(userId);

  if (role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
