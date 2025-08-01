'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Kontak } from '@prisma/client'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

type Props = {
  kontak?: Kontak
  onSuccess?: () => void
}

type KontakFormData = {
  nama: string
  email: string
  pesan: string
  balasan: string
}

export default function UserForm({ kontak, onSuccess }: Props) {
  const [form, setForm] = useState<KontakFormData>({
    nama: '',
    email: '',
    pesan: '',
    balasan: '',
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (kontak) {
      setForm({
        nama: kontak.nama ?? '',
        pesan: kontak.pesan ?? '',
        email: kontak.email ?? '',
        balasan: 'Terima kasih telah berkunjung di klinik full senyum',
      })
    }
  }, [kontak])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const bodyToSend = {
      ...form,
      updatedBy: session?.user?.name || "Anonymous",
    };

    try {
      const res = await fetch(`/api/kontak${kontak?.id ? `/${kontak.id}` : ''}`, {
        method: kontak?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok) {
        toast.success(kontak?.id ? 'Kontak berhasil diubah.' : 'Kontak berhasil ditambahkan.')
        if (onSuccess) onSuccess()
        router.push('/dashboard/kontak')
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
        <label className="block font-semibold">Nama</label>
        <input
          type="text" disabled
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email" disabled
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-[300px] p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Isi Pesan</label>
        <textarea
          value={form.pesan} disabled
          onChange={(e) => setForm({ ...form, pesan: e.target.value })}
          className="w-[500px] p-2 border rounded"
          rows={4}
          placeholder="Masukkan isi pesan ..."
        ></textarea>
      </div>

      <div>
        <label className="block font-semibold">Balas Pesan</label>
        <textarea
          value={form.balasan}
          onChange={(e) => setForm({ ...form, balasan: e.target.value })}
          className="w-[500px] p-2 border rounded"
          rows={4}
          placeholder="Masukkan balasan ..."
        ></textarea>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => router.push('/dashboard/kontak')}
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
