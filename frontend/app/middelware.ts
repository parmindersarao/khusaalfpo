import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "hi", "pa"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    const currentLocale = pathname.split("/")[1];
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", currentLocale, { maxAge: 31536000 });
    return response;
  }

  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;
  return NextResponse.redirect(new URL(`/${savedLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
