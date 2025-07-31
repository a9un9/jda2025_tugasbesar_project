'use client'

import { useEffect, useState } from 'react'
import AutocompletePasien from '@/components/registrasi_rajal/AutocompletePasien'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'
import { Calendar } from "lucide-react"; 

export default function RegistrasiForm() {
  const [tipePasien, setTipePasien] = useState<'baru' | 'lama'>('baru')
  const [form, setForm] = useState<any>({
    nik: '',
    name: '',
    jenis_kelamin: '',
    phone: '',
    address: '',
    keluhan: '',
    pasienId: '',
    poliId: '',
    dokterKode: '',
    gender: '', // tambahkan ini agar tidak undefined
    tanggal: dayjs().format('YYYY-MM-DD'),
  })
  const [poli, setPoli] = useState([])
  const [dokter, setDokter] = useState([])
  const [error, setError] = useState("")

  type HasilRegistrasi = {
    pasien?: {
      name: string;
    };
    poli?: {
      nama: string;
    };
    dokter?: {
      dokterName: string;
    };
  };

  const [hasil, setHasil] = useState<HasilRegistrasi | null>(null)

  useEffect(() => {
    fetch('/api/polikliniks').then(res => res.json()).then(setPoli)
    fetch('/api/dokters').then(res => res.json()).then(setDokter)
    setForm({ ...form, tanggal: dayjs().format("YYYY-MM-DD") });
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")     // Reset error sebelum submit
    setHasil(null)   // Reset hasil sebelum submit

    const res = await fetch('/api/registrasi_rajal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tipePasien }),
    })

    const data = await res.json()

    if (!res.ok) {
      // Jika respons gagal, tampilkan error dari server
      setError(data.error || 'Terjadi kesalahan saat registrasi.')
      return
    }

    // Jika berhasil, reset form dan tampilkan hasil
    setHasil(data)
    setForm({
      name: '',
      address: '',
      phone: '',
      pasienId: '',
      keluhan: '',
      poliId: '',
      dokterKode: '',
      gender: '',
      nik: '',
    })
  }

  const handleSelectPasien = (pasien: any) => {
    setForm({
      ...form,
      pasienId: pasien.id || '',
      name: pasien.name || '',
      nik: pasien.nik || '',
      phone: pasien.phone || '',
      gender: pasien.gender || '',  // Ubah ini
      address: pasien.address || '',
    });
  };


  return (
    
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Registrasi Rawat Jalan</h2>

      {hasil && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h3 className="font-bold">Registrasi Berhasil</h3>
          <p>Nama: {hasil.pasien?.name}</p>
          <p>Poli: {hasil.poli?.nama}</p>
          <p>Dokter: {hasil.dokter?.dokterName}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <h3 className="font-bold">Gagal Registrasi</h3>
          <p>{error}</p>
        </div>
      )}

      <div className="mb-4">
        <label className="mr-4">
          <input type="radio" name="tipe" checked={tipePasien === 'baru'} onChange={() => setTipePasien('baru')} /> Pasien Baru
        </label>
        <label>
          <input type="radio" name="tipe" checked={tipePasien === 'lama'} onChange={() => setTipePasien('lama')} /> Pasien Lama
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {tipePasien === 'lama' && (
          <AutocompletePasien onSelect={handleSelectPasien} />
        )}

        <input
          type="text"
          placeholder="NIK"
          value={form.nik}
          disabled={tipePasien === 'lama'}
          onChange={(e) => setForm({ ...form, nik: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Nama"
          // value={form.name}
          value={form.name || ""}
          disabled={tipePasien === 'lama'}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="No. HP"
          value={form.phone}
          disabled={tipePasien === 'lama'}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          disabled={tipePasien === 'lama'}
          className="w-[180px] p-2 border rounded"
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>

        <textarea
          placeholder="Alamat"
          required
          value={form.address}
          disabled={tipePasien === 'lama'}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Keluhan"
          required
          value={form.keluhan}
          onChange={(e) => setForm({ ...form, keluhan: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <div className="relative w-[150px]">
          <DatePicker
            selected={
              form.tanggal
                ? new Date(form.tanggal)
                : new Date() // tampilkan hari ini jika kosong
            }
            onChange={(date) =>
              setForm({
                ...form,
                tanggal: dayjs(date).format("YYYY-MM-DD"),
              })
            }
            dateFormat="dd-MM-yyyy"
            className="w-full p-2 border rounded pr-10"
          />
          <Calendar className="absolute right-2 top-2.5 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>

        <select
          value={form.poliId}
          onChange={(e) => setForm({ ...form, poliId: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Poli</option>
          {poli.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.nama}
            </option>
          ))}
        </select>
        <select
          value={form.dokterKode}
          onChange={(e) => setForm({ ...form, dokterKode: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Dokter</option>
          {dokter.map((d: any) => (
            <option key={d.dokterKode} value={d.dokterKode}>
              {d.dokterName}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  )
}
