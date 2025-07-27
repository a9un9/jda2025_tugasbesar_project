import createIntlMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  // localePrefix: 'as-needed'
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Langsung lanjutkan jika path hanya "/en" atau "/id"
  if (locales.includes(pathname.slice(1) as any)) {
    return intlMiddleware(req);
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url)
    );
  }

  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const currentLocale = req.nextUrl.locale ?? defaultLocale;

  const publicPaths = ["/login", "/register", "/verify-otp", "/request-otp"];
  const isPublicPath = publicPaths.some(
    (p) => pathname === `/${currentLocale}${p}`
  );

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.url));
  }

  const isAuthPage = ["/login", "/register"].includes(
    pathname.replace(`/${currentLocale}`, "")
  );

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/dashboard`, req.url)
    );
  }

  return intlMiddleware(req);
}

// export const config = {
//   matcher: ["/((?!_next|_vercel|.*\\..*|api).*)"],
// };
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
