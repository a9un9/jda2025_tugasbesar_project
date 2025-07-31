'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dokter } from '@prisma/client'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

type Props = {
  dokter?: Dokter
  onSuccess?: () => void
}

type DokterFormData = {
  dokterKode: string
  dokterTipe: string
  dokterName: string
  email: string
  phone: string
}

export default function UserForm({ dokter, onSuccess }: Props) {
  const [form, setForm] = useState<DokterFormData>({
    dokterKode: '',
    dokterTipe: '',
    dokterName: '',
    email: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (dokter) {
      setForm({
        dokterKode: dokter.dokterKode ?? '',
        dokterTipe: dokter.dokterTipe ?? '',
        dokterName: dokter.dokterName ?? '',
        email: dokter.email ?? '',
        phone: dokter.phone ?? '',
      })
    }
  }, [dokter])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const bodyToSend = {
      ...form,
      updatedBy: session?.user?.name || "Anonymous",
    };

    try {
      const res = await fetch(`/api/dokters${dokter?.id ? `/${dokter.id}` : ''}`, {
        method: dokter?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok) {
        toast.success(dokter?.id ? 'Dokter berhasil diubah.' : 'Dokter berhasil ditambahkan.')
        if (onSuccess) onSuccess()
        router.push('/dashboard/master-data/dokters')
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
        <label className="block font-semibold">Kode dokter</label>
        <input
          type="text"
          value={form.dokterKode}
          onChange={(e) => setForm({ ...form, dokterKode: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Nama dokter</label>
        <input
          type="text"
          value={form.dokterName}
          onChange={(e) => setForm({ ...form, dokterName: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Tipe Dokter</label>
        <select
          value={form.dokterTipe}
          onChange={(e) => setForm({ ...form, dokterTipe: e.target.value })}
          className="w-[300px] p-2 border rounded"
        >
          <option value="">Pilih</option>
          <option value="dokter">Dokter</option>
          <option value="perawat">Perawat</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Telpon</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => router.push('/dashboard/master-data/dokters')}
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
