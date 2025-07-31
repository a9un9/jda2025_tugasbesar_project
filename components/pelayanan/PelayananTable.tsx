'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Stethoscope, ClipboardCheck } from 'lucide-react'

export default function RawatJalanPage() {
  const [data, setData] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/pelayanan')
      const result = await res.json()
      setData(result)
    }
    fetchData()
  }, [])

  async function handlePeriksa(id: string) {
    router.push(`/dashboard/pelayanan/edit/${id}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pelayanan Rawat Jalan</h1>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nama Pasien</th>
              <th className="p-2 border">Dokter</th>
              <th className="p-2 border">Poli</th>
              <th className="p-2 border">Keluhan</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rj: any) => (
              <tr key={rj.id}>
                <td className="p-2 border">{rj.pasien.name}</td>
                <td className="p-2 border">{rj.dokter.dokterName}</td>
                <td className="p-2 border">{rj.poliklinik.nama}</td>
                <td className="p-2 border">{rj.keluhan}</td>
                <td className="p-2 border text-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePeriksa(rj.id)}
                    title="Periksa Pasien"
                    className="hover:bg-green-100 transition"
                  >
                    <Stethoscope className="w-4 h-4 text-green-600 hover:text-green-800" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
