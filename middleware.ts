import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  req.headers.set("cache-control", "no-store");

  const isAuth = !!token;
  const userRole = token?.role;

  const publicPaths = ["/", "/login", "/register", "/verify-otp", "/request-otp"];

  if (!isAuth && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // === Role-based access ===
  if (isAuth) {
    if (userRole === "ADMIN") {
      // ADMIN boleh ke mana saja
      return NextResponse.next();
    }

    // DOKTER hanya boleh ke /dashboard dan /dokter/*
    if (userRole === "DOKTER") {
      if (pathname.startsWith("/dokter") || pathname.startsWith("/dashboard")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // PERAWAT hanya boleh ke /dashboard/*
    if (userRole === "PERAWAT") {
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Role lainnya langsung redirect
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/dokter/:path*",
    "/login",
    "/register",
    "/verify-otp",
    "/request-otp",
    "/",
  ],
};
