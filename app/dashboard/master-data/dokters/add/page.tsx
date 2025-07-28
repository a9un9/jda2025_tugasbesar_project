'use client';

import DokterForm from '@/components/dokters/DokterForm';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AddDokterPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300); // opsional: delay agar transisi smooth

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-sm">Memuat halaman...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Doktor</h1>
      <DokterForm />
    </div>
  );
}
