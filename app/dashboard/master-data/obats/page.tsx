'use client';

import ObatTable from '@/components/obats/ObatTable';

export default function ObatsPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Obat</h1>
      <ObatTable />
    </div>
  );
}
