import Navbar from "@/components/landing/Navbar";
import DashboardCarousel from '@/components/layout/DashboardCarousel';
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-28 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Selamat Datang di <span className="text-teal-600">Klinik Sehat Tentrem</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aplikasi manajemen klinik digital yang memudahkan Anda dalam mengelola data pasien, jadwal dokter, obat, dan laporan keuangan secara efisien dan aman.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/login"
              className="px-6 py-3 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 border border-teal-600 text-teal-600 rounded-xl hover:bg-teal-50 transition"
            >
              Daftar
            </Link>
          </div>

          <img
            src="/images/undraw_medicine_hqqg.svg"
            alt="Ilustrasi Klinik"
            className="mt-10 mx-auto max-h-72"
          />
        </div>
      </main>
    </>
  );
}
