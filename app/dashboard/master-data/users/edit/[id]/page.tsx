'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import UserForm from '@/components/users/UserForm'
import { User } from '@prisma/client'

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

  if (loading) return <p>Loading...</p>
  if (!user) return <p>User tidak ditemukan.</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Pengguna</h1>
      {/* <div className="bg-white shadow-md p-6 rounded-xl"> */}
        <UserForm user={user} onSuccess={() => router.push('/dashboard/master-data/users')} />
      {/* </div> */}
    </div>
  )
}
