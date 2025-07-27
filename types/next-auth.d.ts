// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Tambahkan role
    };
  }

  interface User {
    role?: string; // Tambahkan role ke User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
