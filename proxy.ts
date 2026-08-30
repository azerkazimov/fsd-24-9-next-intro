import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing)


export default async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const isAuthenticated = !!session; // true pr false

    if (pathname.startsWith("/auth") && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // admin protected routes
    if (pathname.startsWith("/admin") && !isAuthenticated) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // admin without localization (uses root layout, not [locale]/layout)
    if (pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
  };