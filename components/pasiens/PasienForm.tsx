'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Pasien } from '@prisma/client'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

type Props = {
  pasien?: Pasien
  onSuccess?: () => void
}

type PasienFormData = {
  nik: string
  name: string
  email: string
  address: string
  phone: string
}

export default function UserForm({ pasien, onSuccess }: Props) {
  const [form, setForm] = useState<PasienFormData>({
    nik: '',
    name: '',
    email: '',
    address: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (pasien) {
      setForm({
        nik: pasien.nik ?? '',
        address: pasien.address ?? '',
        name: pasien.name ?? '',
        email: pasien.email ?? '',
        phone: pasien.phone ?? '',
      })
    }
  }, [pasien])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const bodyToSend = {
      ...form,
      updatedBy: session?.user?.name || "Anonymous",
    };

    try {
      const res = await fetch(`/api/pasiens${pasien?.id ? `/${pasien.id}` : ''}`, {
        method: pasien?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok) {
        toast.success(pasien?.id ? 'Pasien berhasil diubah.' : 'Pasien berhasil ditambahkan.')
        if (onSuccess) onSuccess()
        router.push('/dashboard/master-data/pasiens')
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
        <label className="block font-semibold">NIK</label>
        <input
          type="text"
          value={form.nik}
          onChange={(e) => setForm({ ...form, nik: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Nama pasien</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
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
        <label className="block font-semibold">Alamat</label>
        <textarea
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-[300px] p-2 border rounded"
          rows={4}
          placeholder="Masukkan alamat pasien..."
        ></textarea>
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
          onClick={() => router.push('/dashboard/master-data/pasiens')}
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
