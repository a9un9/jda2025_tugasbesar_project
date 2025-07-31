'use client'

import { useState } from 'react'

interface Pasien {
  id: string
  name: string
  nik: string
  phone?: string
  address?: string
  gender?: string
}

export default function AutocompletePasien({
  onSelect,
}: {
  onSelect: (pasien: Pasien) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Pasien[]>([])

  const handleSearch = async (q: string) => {
    setQuery(q)
    if (q.length < 2) return
    const res = await fetch(`/api/pasiens/search?q=${q}`)
    const data = await res.json()
    setResults(data)
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari Pasien..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded max-h-60 overflow-y-auto shadow">
          {results.map((pasien) => (
            <li
              key={pasien.id}
              onClick={() => {
                onSelect({
                  id: pasien.id,
                  name: pasien.name || '',
                  nik: pasien.nik || '',
                  phone: pasien.phone || '',
                  address: pasien.address || '',
                  gender: pasien.gender || '',
                })
                setQuery(pasien.name)
                setResults([])
              }}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {pasien.name} - {pasien.nik}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
