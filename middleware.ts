import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

// Protected routes that require authentication
const protectedRoutes = ["/portal", "/portal/", "/api/"];
// Public routes that should redirect to dashboard if authenticated
// const publicRoutes = ["/login", "/signup", "/"]

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  // const isPublicRoute = publicRoutes.some((route) => path === route)

  // Get the session cookie
  const cookie = (await cookies()).get("session")?.value;
  // Decrypt and verify the session
  const session = await decrypt(cookie);

  // Redirect to login if accessing a protected route without authentication
  if (isProtectedRoute && !session?.userId) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing a public route while authenticated
  // if (isPublicRoute && session?.userId) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url))
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
