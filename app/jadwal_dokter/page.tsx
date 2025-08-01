
import Navbar from "@/components/landing/Navbar";

export default function JadwalDokterPage() {
  return (
    <>
    <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-28 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <img
            src="/images/undraw_under-construction_c2y1.svg"
            alt="Ilustrasi Klinik"
            className="mt-10 mx-auto max-h-72"
          />
          <p className="text-xl font-semibold text-red-500 mt-4">Coming Soon</p>
          <p className="text-sm mt-2 text-gray-600">
            Sedang disiapkan dengan penuh cinta dan bug 🤓💔
          </p>
        </div>
      </main>
    </>
  );
}
