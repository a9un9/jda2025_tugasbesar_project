'use client';

import PasienTable from '@/components/pasiens/PasienTable';

export default function PasiensPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Pasien</h1>
      <PasienTable />
    </div>
  );
}
