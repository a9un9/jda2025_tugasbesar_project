// app/[locale]/page.tsx
'use client';
import { useTranslations } from 'next-intl';

export default function Landing() {
  const t = useTranslations('landing');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>{t('title')}</h1>
    </div>
  );
}
