'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, ShieldCheck, AlertCircle, Plus } from 'lucide-react';
import { toast } from 'sonner'

interface Dokter {
  id: string;
  dokterKode: string;
  dokterName: string;
  dokterTipe: string;
  email: string;
  phone: string;
}

export default function DokterTable() {
  const [dokters, setDokters] = useState<Dokter[]>([]);
  const [filteredDokters, setFilteredDokters] = useState<Dokter[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const doktersPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    fetchDokters();
  }, []);

  useEffect(() => {
    filterAndPaginateDokters();
  }, [search, dokters, currentPage]);

  const fetchDokters = async () => {
    setLoading(true);
    const res = await fetch('/api/dokters');
    const data = await res.json();
    setDokters(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus data ini?')) return;
    // await fetch(`/api/dokters/${id}`, { method: 'DELETE' });
    // fetchDokters();
    try {
      const res = await fetch(`/api/dokters/${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (res.ok && json.success) {
        toast.success('Pengguna berhasil dihapus.');
        fetchDokters();
      } else {
        toast.error('Gagal menghapus pengguna.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus.');
      console.error(error);
    }
  };

  const handleVerify = async (id: string) => {
    if (!confirm('Yakin ingin verifikasi pengguna ini?')) return;
    await fetch(`/api/dokters/${id}`, {
      method: 'PATCH',
    });
    fetchDokters();
  };

  const filterAndPaginateDokters = () => {
    const filtered = dokters.filter((u) =>
      `${u.dokterKode} ${u.dokterName}`.toLowerCase().includes(search.toLowerCase())
    );
    const startIndex = (currentPage - 1) * doktersPerPage;
    const endIndex = startIndex + doktersPerPage;
    setFilteredDokters(filtered.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(
    dokters.filter((u) =>
      `${u.dokterKode} ${u.dokterName}`.toLowerCase().includes(search.toLowerCase())
    ).length / doktersPerPage
  );

  return (
    <div>
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        {/* Pencarian */}
        <input
          type="text"
          placeholder="Cari nama atau email..."
          className="px-3 py-2 border rounded w-full max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset ke halaman 1 jika mencari
          }}
        />

        {/* Tombol Tambah */}
        <button
          onClick={() => router.push('/dashboard/master-data/dokters/add')}
          className="ml-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <Plus size={18} /> Tambah Dokter
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-2 border">No</th>
              <th className="p-2 border">Kode</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Tipe</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: doktersPerPage }).map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="p-2 border">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                      </td>
                    ))}
                  </tr>
                )) : filteredDokters.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    Data tidak ditemukan.
                  </td>
                </tr>
              )
              : filteredDokters.map((u, i) => (
                  <tr key={u.id} className="text-center">
                    <td className="p-2 border">
                      {(currentPage - 1) * doktersPerPage + i + 1}
                    </td>
                    <td className="p-2 border">{u.dokterKode}</td>
                    <td className="p-2 border">{u.dokterName}</td>
                    <td className="p-2 border">{u.dokterTipe}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">{u.phone}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/dashboard/master-data/dokters/edit/${u.id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                          title="Ubah"
                        >
                          <Edit size={20} />
                        </button>

                        <button
                          onClick={() => handleDelete(u.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Hapus"
                        >
                          <Trash2 size={20} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4 items-center">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </button>
          <span>
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}
