// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, CalendarDays, Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-teal-600">
          Klinik Full Senyum
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-teal-600">
            <Home className="w-4 h-4" />
            Beranda
          </Link>

          <Link href="/jadwal_dokter" className="flex items-center gap-2 text-gray-700 hover:text-teal-600">
            <CalendarDays className="w-4 h-4" />
            Jadwal Dokter
          </Link>

          <Link href="/kontak" className="flex items-center gap-2 text-gray-700 hover:text-teal-600">
            <Phone className="w-4 h-4" />
            Kontak
          </Link>
          <Link href="/login" className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700">
            Masuk
          </Link>
          {/* <Link
            href="/register"
            className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700"
          >
            Daftar
          </Link> */}
        </nav>
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <Link href="/" className="text-gray-700 hover:text-teal-600">
              Beranda
            </Link>
            {/* <Link href="/login" className="text-gray-700 hover:text-teal-600">
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 text-center"
            >
              Daftar
            </Link> */}
          </div>
        </div>
      )}
    </header>
  );
}
