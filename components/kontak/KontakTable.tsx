'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, ShieldCheck, AlertCircle, Plus, Eye } from 'lucide-react';
import { toast } from 'sonner'
import { format } from 'date-fns';


interface Kontak {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  createdAt: string;
  status_pesan: number;
}

export default function KontakTable() {
  const [kontaks, setKontaks] = useState<Kontak[]>([]);
  const [filteredKontaks, setFilteredKontaks] = useState<Kontak[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const kontaksPerPage = 5;
  const router = useRouter();
  

  useEffect(() => {
    fetchKontaks();
  }, []);

  useEffect(() => {
    filterAndPaginateKontaks();
  }, [search, kontaks, currentPage]);

  const fetchKontaks = async () => {
    setLoading(true);
    const res = await fetch('/api/kontak');
    const data = await res.json();
    setKontaks(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus data ini?')) return;
    // await fetch(`/api/kontak/${id}`, { method: 'DELETE' });
    // fetchKontaks();
    try {
      const res = await fetch(`/api/kontak/${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (res.ok && json.success) {
        toast.success('Kontak berhasil dihapus.');
        fetchKontaks();
      } else {
        toast.error('Gagal menghapus pasien.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus.');
      console.error(error);
    }
  };

  const handleVerify = async (id: string) => {
    if (!confirm('Yakin ingin verifikasi kontak ini?')) return;
    await fetch(`/api/kontak/${id}`, {
      method: 'PATCH',
    });
    fetchKontaks();
  };

  const filterAndPaginateKontaks = () => {
    const filtered = kontaks.filter((u) =>
      `${u.nama} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    );
    const startIndex = (currentPage - 1) * kontaksPerPage;
    const endIndex = startIndex + kontaksPerPage;
    setFilteredKontaks(filtered.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(
    kontaks.filter((u) =>
      `${u.nama} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    ).length / kontaksPerPage
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
        {/* <button
          onClick={() => router.push('/dashboard/kontak/add')}
          className="ml-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <Plus size={18} /> Tambah Kontak
        </button> */}
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-2 border">No</th>
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Isi pesan</th>
              <th className="p-2 border">Status pesan</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: kontaksPerPage }).map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="p-2 border">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                      </td>
                    ))}
                  </tr>
                )) : filteredKontaks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    Data tidak ditemukan.
                  </td>
                </tr>
              )
              : filteredKontaks.map((u, i) => (
                  <tr key={u.id} className="text-center">
                    <td className="p-2 border">
                      {(currentPage - 1) * kontaksPerPage + i + 1}
                    </td>
                    <td className="p-2 border">
                      {format(new Date(u.createdAt), 'dd-MM-yyyy')}
                    </td>
                    <td className="p-2 border">{u.nama}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">{u.pesan}</td>
                    <td className="p-2 border">
                      {u.status_pesan === 1 ? (
                        <span className="text-red-600 font-semibold">Belum dibalas</span>
                      ) : u.status_pesan === 2 ? (
                        <span className="text-green-600">Sudah dibalas</span>
                      ) : (
                        <span className="text-gray-500">Tidak Diketahui</span>
                      )}
                    </td>
                    <td className="p-2 border">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/dashboard/kontak/edit/${u.id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                          title="Balas"
                        >
                          <Eye size={20} />
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
