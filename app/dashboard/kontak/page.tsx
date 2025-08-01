'use client';
import KontakTable from "@/components/kontak/KontakTable";

export default function PelayananPage() {
  return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Data Pesan</h1>
        <KontakTable />
      </div>
  );
}
