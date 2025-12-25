import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");
  const isProtectedPage = request.nextUrl.pathname.startsWith("/palace");

  // Redirect to login if accessing protected pages without token
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if accessing auth pages with token
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/palace/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/palace/:path*", "/login", "/signup"],
};
