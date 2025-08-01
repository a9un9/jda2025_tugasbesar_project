'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke monitoring service kalau perlu
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <img
        src="/images/undraw_under-construction_c2y1.svg"
        alt="Ilustrasi Klinik"
        className="mt-10 mx-auto max-h-72"
      />
      <p className="text-xl font-semibold text-red-500 mt-4">Coming Soon</p>
      <p className="text-sm mt-2 text-gray-600">
        Sedang disiapkan dengan penuh cinta dan bug 🤓💔
      </p>
    </main>
  );
}
