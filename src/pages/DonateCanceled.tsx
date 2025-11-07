// src/pages/DonateCanceled.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function DonateCanceled() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-3xl mb-6">
          !
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Оплата отменена</h1>
        <p className="mt-4 text-lg text-slate-600">
          Вы вернулись со страницы оплаты. Попробуйте ещё раз — платёж не был списан.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-[#2d2846] hover:bg-[#231e39] text-white px-6 py-3 font-semibold shadow"
          >
            На главную
          </Link>
          <a
            href="/#support"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-white"
          >
            Вернуться к пожертвованию
          </a>
        </div>
      </div>
    </div>
  );
}