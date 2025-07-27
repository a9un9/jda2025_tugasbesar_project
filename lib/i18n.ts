export const locales = ['en', 'id'] as const;
export const defaultLocale = 'id';

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const safe = locale ?? defaultLocale;
  return { messages: (await import(`../locales/${safe}.json`)).default, locale: safe };
});

export async function getMessages(locale: string) {
  const safe = locale ?? defaultLocale;
  const messages = (await import(`../locales/${safe}.json`)).default;
  return messages;
}
