'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PasienForm from '@/components/pasiens/PasienForm'
import type { Pasien } from '@prisma/client'
import { Loader2 } from 'lucide-react'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [pasien, setDoktor] = useState<Pasien | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/pasiens/${id}`)
        const data = await res.json()
        setDoktor(data)
      } catch (err) {
        console.error('Failed to fetch pasien:', err)
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
        <p className="text-muted-foreground text-sm">Memuat data pasien...</p>
      </div>
    )
  }

  if (!pasien) return <p>Pasien tidak ditemukan.</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ubah Pasien</h1>
      <PasienForm pasien={pasien} onSuccess={() => router.push('/dashboard/master-data/pasiens')} />
    </div>
  )
}
