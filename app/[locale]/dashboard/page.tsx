// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Jumlah Pasien</p>
          <p className="text-xl font-bold">120</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Jumlah Dokter</p>
          <p className="text-xl font-bold">20</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Konsultasi Hari Ini</p>
          <p className="text-xl font-bold">15</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Akun Terverifikasi</p>
          <p className="text-xl font-bold">98%</p>
        </div>
      </div>
    </div>
  );
}
