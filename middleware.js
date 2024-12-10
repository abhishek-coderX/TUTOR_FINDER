import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Mark the function as async
export async function middleware(request) {
  const session = await getKindeServerSession();
  const isAuthenticated = await session.isAuthenticated(); // Assuming isAuthenticated is a function

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/api/auth/login?post_login_redirect-url=/", request.url));
  }

  // Proceed to the next middleware or request handler if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: '/details/:path*',
};
