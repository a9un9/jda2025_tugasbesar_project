'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import UserForm from '@/components/users/UserForm'
import type { User } from '@prisma/client'
import { Loader2 } from 'lucide-react'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`)
        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error('Failed to fetch user:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-sm">Memuat data pengguna...</p>
      </div>
    )
  }

  if (!user) return <p>User tidak ditemukan.</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ubah User</h1>
      <UserForm user={user} onSuccess={() => router.push('/dashboard/master-data/users')} />
    </div>
  )
}
