// lib/i18n.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'id'] as const;
export const defaultLocale = 'id';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale ?? defaultLocale;
  return {
    messages: (await import(`../locales/${safeLocale}.json`)).default,
    locale: safeLocale,
  };
});

export async function getMessages(locale: string) {
  const safeLocale = locales.includes(locale as any) ? locale : defaultLocale;
  const messages = (await import(`../locales/${safeLocale}.json`)).default;
  return messages;
}
