'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ObatForm from '@/components/obats/ObatForm'
import type { Obat } from '@prisma/client'
import { Loader2 } from 'lucide-react'

export default function EditObatPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [obat, setDoktor] = useState<Obat | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchObat = async () => {
      try {
        const res = await fetch(`/api/obats/${id}`)
        const data = await res.json()
        setDoktor(data)
      } catch (err) {
        console.error('Failed to fetch obat:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchObat()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-sm">Memuat data obat...</p>
      </div>
    )
  }

  if (!obat) return <p>Obat tidak ditemukan.</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ubah Obat</h1>
      <ObatForm obat={obat} onSuccess={() => router.push('/dashboard/master-data/obats')} />
    </div>
  )
}
