'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function DashboardCarousel() {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      interval={4000}
      showStatus={false}
      className="rounded-lg shadow"
    >
      <div className="bg-blue-100 p-6 h-40 flex items-center justify-center">
        <h2 className="text-lg font-semibold">Tips: Minum air putih 8 gelas sehari!</h2>
      </div>
      <div className="bg-green-100 p-6 h-40 flex items-center justify-center">
        <h2 className="text-lg font-semibold">Jadwal: Dr. Andi tersedia hari Senin-Rabu</h2>
      </div>
      <div className="bg-yellow-100 p-6 h-40 flex items-center justify-center">
        <h2 className="text-lg font-semibold">Info: Vaksinasi dibuka sampai 10 Agustus</h2>
      </div>
    </Carousel>
  );
}
