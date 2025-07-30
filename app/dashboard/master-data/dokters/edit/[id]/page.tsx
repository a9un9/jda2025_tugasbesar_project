'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DokterForm from '@/components/dokters/DokterForm'
import type { Dokter } from '@prisma/client'
import { Loader2 } from 'lucide-react'

export default function EditDokterPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [dokter, setDoktor] = useState<Dokter | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchDokter = async () => {
      try {
        const res = await fetch(`/api/dokters/${id}`)
        const data = await res.json()
        setDoktor(data)
      } catch (err) {
        console.error('Failed to fetch dokter:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDokter()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-sm">Memuat data dokter...</p>
      </div>
    )
  }

  if (!dokter) return <p>Dokter tidak ditemukan.</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ubah Dokter</h1>
      <DokterForm dokter={dokter} onSuccess={() => router.push('/dashboard/master-data/dokters')} />
    </div>
  )
}
