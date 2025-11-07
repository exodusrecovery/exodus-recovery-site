// src/pages/DonateSuccess.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function DonateSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-3xl mb-6">
          ✓
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Спасибо за пожертвование!</h1>
        <p className="mt-4 text-lg text-slate-600">
          Платёж успешно завершён. На email придёт квитанция от Stripe.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-[#2d2846] hover:bg-[#231e39] text-white px-6 py-3 font-semibold shadow"
          >
            На главную
          </Link>
          <a
            href="mailto:info@exodusrecovery.org"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-white"
          >
            Нужна помощь?
          </a>
        </div>
      </div>
    </div>
  );
}