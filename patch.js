cat > patch.js <<'JS'
const fs = require('fs');
const p = 'src/App.tsx';
if (!fs.existsSync(p)) {
  console.error('File not found:', p);
  process.exit(2);
}
const backup = p + '.bak.' + Date.now();
fs.copyFileSync(p, backup);
let s = fs.readFileSync(p, 'utf8');

const re = /const\s+handleDonateOnce\s*=\s*\([\s\S]*?\}\s*;\s*const\s+handleDonateMonthly\s*=\s*\([\s\S]*?\}\s*;/s;

const replacement = `const handleDonateOnce = () => {
  const val = (oneTimeInput || "").toString().trim();
  if (!val) { alert("Please enter an amount for one-time donation."); return; }
  const cleaned = val.replace(/\\$/g, "").replace(/,/g, "");
  const num = Number(cleaned);
  if (!Number.isFinite(num) || num <= 0) { alert("Enter a valid numeric amount."); return; }
  const cents = Math.round(num * 100);
  openStripeInNewTab(() => createCheckoutSession({ mode: "payment", amount: cents }));
};

const handleDonateMonthly = (priceId?: string) => {
  const pid = priceId || selectedPriceId;
  if (!pid) { alert("No subscription price selected."); return; }
  openStripeInNewTab(() => createCheckoutSession({ mode: "subscription", price_id: pid }));
};`;

if (!re.test(s)) {
  console.error('Pattern not found — functions may be different or already edited. Aborting. Backup created at', backup);
  process.exit(3);
}

s = s.replace(re, replacement);
fs.writeFileSync(p, s, 'utf8');
console.log('Patched', p);
console.log('Backup saved as', backup);
JS