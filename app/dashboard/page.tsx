'use client';

import { useEffect, useState } from 'react';
import DashboardCarousel from '@/components/layout/DashboardCarousel';
import HealthQuote from '@/components/layout/HealthQuote';

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    pasien: 0,
    dokter: 0,
    konsultasi: 0,
    verifikasi: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch('/api/dashboard/summary');
      const data = await res.json();
      setSummary(data);
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Carousel Section */}
      <DashboardCarousel />

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Jumlah Pasien</p>
          <p className="text-xl font-bold">{summary.pasien}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Jumlah Dokter</p>
          <p className="text-xl font-bold">{summary.dokter}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Konsultasi Hari Ini</p>
          <p className="text-xl font-bold">{summary.konsultasi}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Akun Terverifikasi</p>
          <p className="text-xl font-bold">{summary.verifikasi}</p>
        </div>
      </div>

      {/* Health Quote + SVG */}
      <HealthQuote />
    </div>
  );
}
