'use client';

import DokterTable from '@/components/dokters/DokterTable';

export default function DoktersPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Dokter</h1>
      <DokterTable />
    </div>
  );
}
