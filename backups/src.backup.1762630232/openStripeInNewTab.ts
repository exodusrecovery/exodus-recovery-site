export async function openStripeInNewTab(createSession: () => Promise<{url?: string}>) {
  let popup = null;
  try {
    popup = window.open("", "_blank", "noopener,noreferrer");
  } catch (e) {
    popup = null;
  }

  try {
    const session = await createSession();
    const url = session && session.url;
    if (!url) {
      if (popup) try { popup.close(); } catch(_) {}
      throw new Error("Не получили URL для оплаты.");
    }

    if (popup) {
      try {
        popup.location.href = url;
        try { popup.focus(); } catch(_) {}
        return;
      } catch (e) {
        // fallback below
      }
    }

    // Попап был заблокирован или не удалось навигировать — открыть новую вкладку
    try {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    } catch (e) {
      if (popup) try { popup.close(); } catch(_) {}
      alert("Не удалось автоматически открыть окно оплаты. Разрешите всплывающие окна для сайта. Ссылка: " + url);
    }
  } catch (err) {
    if (popup) try { popup.close(); } catch(_) {}
    console.error("openStripeInNewTab error:", err);
    alert("Ошибка при подготовке оплаты: " + (err && err.message ? err.message : String(err)));
  }
}
