import io,sys,shutil,re
src='src/App.tsx'
bak=src+'.bak.fix'
shutil.copyfile(src,bak)
text=open(src,'r',encoding='utf-8').read()

# Найдём начало и конец проблемного блока по сигнатурам
start_re = re.compile(r'const handleDonateOnce = \(\) => \{', re.M)
end_re = re.compile(r'// ------------------------- end Stripe helpers', re.M)

m1 = start_re.search(text)
m2 = end_re.search(text)
if not m1 or not m2:
    print("Не могу найти ожидаемые маркеры блока. Покажи первые 380 строк файла.")
    sys.exit(2)

start = m1.start()
end = m2.start()

new_block = r"""
const handleDonateOnce = () => {
  const val = (oneTimeInput || "").toString().trim();
  if (!val) { alert("Please enter an amount for one-time donation."); return; }
  const cleaned = val.replace(/\$/g, "").replace(/,/g, "");
  const num = Number(cleaned);
  if (!Number.isFinite(num) || num <= 0) { alert("Enter a valid numeric amount."); return; }
  const cents = Math.round(num * 100);

  openStripeInNewTab(() =>
    createCheckoutSession({
      mode: "payment",
      amount: cents,
    })
  );
};

const handleDonateMonthly = (priceId?: string) => {
  const pid = priceId || selectedPriceId;
  if (!pid) { alert("No subscription price selected."); return; }

  openStripeInNewTab(() =>
    createCheckoutSession({
      mode: "subscription",
      price_id: pid,
    })
  );
};
"""

new_text = text[:start] + new_block + "\n\n" + text[end:]
open(src,'w',encoding='utf-8').write(new_text)
print("Готово. Оригинал сохранён как", bak)
