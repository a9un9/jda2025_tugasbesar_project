'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Obat } from '@prisma/client'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

type Props = {
  obat?: Obat
  onSuccess?: () => void
}

type ObatFormData = {
  kode: string
  nama: string
  satuan: string
  harga: number
  keterangan: string
}

export default function UserForm({ obat, onSuccess }: Props) {
  const [form, setForm] = useState<ObatFormData>({
    kode: '',
    nama: '',
    satuan: '',
    harga: 0,
    keterangan: '',
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (obat) {
      setForm({
        kode: obat.kode ?? '',
        nama: obat.nama ?? '',
        satuan: obat.satuan ?? '',
        harga: Number(obat.harga) ?? 0,
        keterangan: obat.keterangan ?? '',
      })
    }
  }, [obat])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const bodyToSend = {
      ...form,
      updatedBy: session?.user?.name || "Anonymous",
    };

    try {
      const res = await fetch(`/api/obats${obat?.id ? `/${obat.id}` : ''}`, {
        method: obat?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok) {
        toast.success(obat?.id ? 'Obat berhasil diubah.' : 'Obat berhasil ditambahkan.')
        if (onSuccess) onSuccess()
        router.push('/dashboard/master-data/obats')
      } else {
        const data = await res.json();
        console.error('❌ Response Error:', data);
        toast.error(data.error || 'Gagal menyimpan data.');
      }
    } catch (error) {
      console.error('❌ Catch Error:', error)
      toast.error('Terjadi kesalahan saat menyimpan.')
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Kode</label>
        <input
          type="text"
          value={form.kode}
          onChange={(e) => setForm({ ...form, kode: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Nama obat</label>
        <input
          type="text"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Satuan</label>
        <input
          type="text"
          value={form.satuan}
          onChange={(e) => setForm({ ...form, satuan: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Harga</label>
        <input
          type="number"
          step="0.01"
          value={form.harga}
          onChange={(e) =>
            setForm({ ...form, harga: parseFloat(e.target.value) || 0 })
          }
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Keterangan</label>
        <textarea
          value={form.keterangan}
          onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
          className="w-[300px] p-2 border rounded"
          rows={4}
          placeholder="Masukkan keterangan ..."
        ></textarea>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => router.push('/dashboard/master-data/obats')}
          type="button"
          className="border border-red-300 text-red-700 px-4 py-2 rounded hover:bg-red-100 transition"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}
