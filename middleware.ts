import { clerkMiddleware, createRouteMatcher, ClerkMiddlewareAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(["/", "/sign.in(.*)"]);

const isAdminRoute = createRouteMatcher(['/dashboard/admin(.*)']);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if(isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = ("/", req.url);
    return NextResponse.redirect(url);
  }
  
  if(!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
