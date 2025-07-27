"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => switchLanguage("id")} disabled={locale === "id"}>
        🇮🇩 ID
      </button>
      <button onClick={() => switchLanguage("en")} disabled={locale === "en"}>
        🇺🇸 EN
      </button>
    </div>
  );
}
