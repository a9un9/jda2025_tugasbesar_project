'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, ShieldCheck, AlertCircle, Plus } from 'lucide-react';
import { toast } from 'sonner'

interface Pasien {
  id: string;
  nik: string;
  name: string;
  gender: string;
  email: string;
  address: string;
  phone: string;
}

export default function PasienTable() {
  const [pasiens, setPasiens] = useState<Pasien[]>([]);
  const [filteredPasiens, setFilteredPasiens] = useState<Pasien[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pasiensPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    fetchPasiens();
  }, []);

  useEffect(() => {
    filterAndPaginatePasiens();
  }, [search, pasiens, currentPage]);

  const fetchPasiens = async () => {
    setLoading(true);
    const res = await fetch('/api/pasiens');
    const data = await res.json();
    setPasiens(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus data ini?')) return;
    // await fetch(`/api/pasiens/${id}`, { method: 'DELETE' });
    // fetchPasiens();
    try {
      const res = await fetch(`/api/pasiens/${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (res.ok && json.success) {
        toast.success('Pasien berhasil dihapus.');
        fetchPasiens();
      } else {
        toast.error('Gagal menghapus pasien.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus.');
      console.error(error);
    }
  };

  const handleVerify = async (id: string) => {
    if (!confirm('Yakin ingin verifikasi pasien ini?')) return;
    await fetch(`/api/pasiens/${id}`, {
      method: 'PATCH',
    });
    fetchPasiens();
  };

  const filterAndPaginatePasiens = () => {
    const filtered = pasiens.filter((u) =>
      `${u.nik} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    );
    const startIndex = (currentPage - 1) * pasiensPerPage;
    const endIndex = startIndex + pasiensPerPage;
    setFilteredPasiens(filtered.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(
    pasiens.filter((u) =>
      `${u.nik} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    ).length / pasiensPerPage
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
          onClick={() => router.push('/dashboard/master-data/pasiens/add')}
          className="ml-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <Plus size={18} /> Tambah Pasien
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-2 border">No</th>
              <th className="p-2 border">NIK</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Jenis kelamin</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: pasiensPerPage }).map((_, i) => (
                  <tr key={i}>
                    {[...Array(8)].map((_, j) => (
                      <td key={j} className="p-2 border">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                      </td>
                    ))}
                  </tr>
                )) : filteredPasiens.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    Data tidak ditemukan.
                  </td>
                </tr>
              )
              : filteredPasiens.map((u, i) => (
                  <tr key={u.id} className="text-center">
                    <td className="p-2 border">
                      {(currentPage - 1) * pasiensPerPage + i + 1}
                    </td>
                    <td className="p-2 border">{u.nik}</td>
                    <td className="p-2 border">{u.name}</td>
                    <td className="p-2 border">{u.gender}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">{u.address}</td>
                    <td className="p-2 border">{u.phone}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/dashboard/master-data/pasiens/edit/${u.id}`)
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
