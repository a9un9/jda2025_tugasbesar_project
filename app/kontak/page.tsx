'use client'

import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from "@/components/landing/Navbar";
import { useState } from 'react';

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState('');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/kontak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setNotif('Pesan berhasil dikirim!');
      setForm({ nama: '', email: '', pesan: '' });
    } else {
      setNotif('Gagal mengirim pesan.');
    }
    setLoading(false);
  };


  return (
      <>
      <Navbar />
        <main className="min-h-screen px-4 py-10 bg-white text-gray-800">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Kontak Kami</h1>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Info Kontak */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                  <p>
                    Jl. Kesehatan No. 123<br />
                    Kota Sehat, Indonesia
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal-600 mt-1" />
                  <p>+62 812 3456 7890</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal-600 mt-1" />
                  <p>info@kliniksehat.id</p>
                </div>
              </div>

              {/* Form Kontak */}
              <form className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    name="nama"
                    placeholder="Nama lengkap"
                    value={form.nama}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    name="email"
                    placeholder="Email aktif"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pesan</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    name="pesan"
                    rows={4}
                    placeholder="Tulis pesan Anda di sini..."
                    value={form.pesan}
                    onChange={handleChange}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  disabled={loading}
                >
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
                {notif && <p className="mt-4 text-sm text-green-600">{notif}</p>}
              </form>
            </div>
          </div>
        </main>
      </>
  );
}
