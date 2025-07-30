'use client';

import PoliklinikTable from '@/components/polikliniks/PoliklinikTable';

export default function PolikliniksPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Poliklinik</h1>
      <PoliklinikTable />
    </div>
  );
}
