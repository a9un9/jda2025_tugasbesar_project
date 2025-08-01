'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import KontakForm from '@/components/kontak/KontakForm'
import type { Kontak } from '@prisma/client'
import { Loader2 } from 'lucide-react'

export default function EditKontakPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [kontak, setDoktor] = useState<Kontak | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchKontak = async () => {
      try {
        const res = await fetch(`/api/kontak/${id}`)
        const data = await res.json()
        setDoktor(data)
      } catch (err) {
        console.error('Failed to fetch kontak:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchKontak()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-sm">Memuat data pesan...</p>
      </div>
    )
  }

  if (!kontak) return <p>Kontak tidak ditemukan.</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Balas Pesan</h1>
      <KontakForm kontak={kontak} onSuccess={() => router.push('/dashboard/kontak')} />
    </div>
  )
}
