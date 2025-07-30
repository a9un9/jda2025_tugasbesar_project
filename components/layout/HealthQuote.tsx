import Image from 'next/image';

export default function HealthQuote() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">"Kesehatan adalah investasi terbaik."</h3>
        <p className="text-gray-600">Rawat tubuhmu seperti kamu merawat hal yang paling kamu cintai.</p>
      </div>
      <div className="flex-1 mt-4 md:mt-0 md:ml-6">
        <Image
          src="/images/undraw_medical-care_7m9g.svg"
          alt="Health Illustration"
          width={300}
          height={200}
        />
      </div>
    </div>
  );
}
