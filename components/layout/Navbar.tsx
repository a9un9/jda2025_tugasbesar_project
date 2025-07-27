// components/layout/Navbar.tsx
"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">&nbsp;</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{session?.user?.email}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
