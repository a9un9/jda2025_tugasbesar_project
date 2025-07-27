'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { toast } from 'sonner'

type Props = {
  user?: User
  onSuccess?: () => void
}

type UserFormData = {
  name: string
  email: string
  password?: string
  role: string
}

export default function UserForm({ user, onSuccess }: Props) {
  const [form, setForm] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: '', // kosongkan saat edit
        role: user.role.toLowerCase(),
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const bodyToSend: UserFormData = {
      ...form,
      role: form.role.toUpperCase(),
    }

    // Hapus password jika kosong (saat update)
    if (user && !form.password) {
      delete bodyToSend.password
    }

    try {
      const res = await fetch(`/api/users${user?.id ? `/${user.id}` : ''}`, {
        method: user?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok) {
        toast.success(user?.id ? 'Pengguna berhasil diubah.' : 'Pengguna berhasil ditambahkan.');
        router.push('/dashboard/master-data/users');
      } else {
        toast.error('Gagal menyimpan data.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyimpan.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Nama</label>
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

      {/* Saat tambah user baru */}
      {!user && (
        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            value={form.password || ''}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-[300px] p-2 border rounded"
            required
          />
        </div>
      )}

      {/* Saat edit user */}
      {user && (
        <div>
          <label className="block font-semibold">Password (opsional)</label>
          <input
            type="password"
            value={form.password || ''}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-[300px] p-2 border rounded"
            placeholder="Kosongkan jika tidak ingin mengubah"
          />
        </div>
      )}

      <div>
        <label className="block font-semibold">Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-[300px] p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="dokter">Dokter</option>
          <option value="perawat">Perawat</option>
        </select>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => router.push('/dashboard/master-data/users')}
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
