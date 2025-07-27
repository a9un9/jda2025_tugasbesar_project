"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const t = useTranslations("login");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Proses login di sini...
    console.log(form);
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder={t("email")}
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder={t("password")}
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {t("submit")}
        </button>
      </form>
      <p className="mt-4">
        <Link href="/register" className="text-blue-600 underline">
          {t("registerLink")}
        </Link>
      </p>
    </div>
  );
}
