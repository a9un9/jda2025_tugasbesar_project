// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, defaultLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validasi locale
  const messages = await getMessages(locale);
  if (!messages) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
