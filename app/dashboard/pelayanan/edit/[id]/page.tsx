'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditPeriksaPage() {
  const { id } = useParams()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/periksa/${id}`)
      const result = await res.json()
      setData(result)
    }
    if (id) fetchData()
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/periksa/${id}`, { method: 'PUT' })
      if (res.ok) {
        alert('Status pemeriksaan diperbarui.')
        router.push('/dashboard/pelayanan')
      } else {
        alert('Gagal memperbarui status')
      }
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  if (!data) return <div>Memuat data pemeriksaan ...</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Periksa Pasien</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Nama:</strong> {data.pasien?.name}</p>
        <p><strong>Dokter:</strong> {data.dokter?.dokterName}</p>
        <p><strong>Keluhan:</strong> {data.keluhan}</p>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${
            loading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? 'Memproses...' : 'Tandai Sudah Diperiksa'}
        </button>
      </div>
    </div>
  )
}
