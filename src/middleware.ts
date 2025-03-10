import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isDownloadApiRoute = createRouteMatcher(["/api/download(.*)"]);

const isAdmin = (userId: string | null) => {
  if (!userId) return false;

  const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(",") || [];
  return ADMIN_USER_IDS.includes(userId);
};

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  // Handle admin routes
  if (isAdminRoute(req)) {
    if (!userId || !isAdmin(userId)) {
      return NextResponse.redirect(new URL("/store", req.url));
    }
  }

  // Handle download API routes
  if (isDownloadApiRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

// Clerk's recommended config
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
