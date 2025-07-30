'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Poliklinik } from '@prisma/client'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

type Props = {
  poliklinik?: Poliklinik
  onSuccess?: () => void
}

type PoliklinikFormData = {
  kode: string
  nama: string
}

export default function UserForm({ poliklinik, onSuccess }: Props) {
  const [form, setForm] = useState<PoliklinikFormData>({
    kode: '',
    nama: '',
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (poliklinik) {
      setForm({
        kode: poliklinik.kode ?? '',
        nama: poliklinik.nama ?? '',
      })
    }
  }, [poliklinik])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const bodyToSend = {
      ...form,
      updatedBy: session?.user?.name || "Anonymous",
    };

    try {
      const res = await fetch(`/api/polikliniks${poliklinik?.id ? `/${poliklinik.id}` : ''}`, {
        method: poliklinik?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok) {
        toast.success(poliklinik?.id ? 'Poliklinik berhasil diubah.' : 'Poliklinik berhasil ditambahkan.')
        if (onSuccess) onSuccess()
        router.push('/dashboard/master-data/polikliniks')
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
        <label className="block font-semibold">Nama poliklinik</label>
        <input
          type="text"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => router.push('/dashboard/master-data/polikliniks')}
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
