interface ImportMetaEnv {
  VITE_STRIPE_PUBLISHABLE_KEY?: string;
  VITE_STRIPE_PRICE_25?: string;
  VITE_STRIPE_PRICE_50?: string;
  VITE_STRIPE_PRICE_100?: string;
  VITE_STRIPE_PRICE_200?: string;
  VITE_STRIPE_PRICE_500?: string;
  // добавь другие VITE_ переменные если нужно
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
