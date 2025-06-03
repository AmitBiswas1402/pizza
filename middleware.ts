import {
  clerkMiddleware,
  createRouteMatcher,
  ClerkMiddlewareAuth,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signin(.*)"]);
const isAdminRoute = createRouteMatcher(["/dashboard/admin(.*)"]);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // console.log("userId:", userId);
  // console.log("sessionClaims:", sessionClaims);

  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  if (isAdminRoute(req)) {
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    // console.log("role:", role);

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
