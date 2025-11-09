/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_STRIPE_PRICE_25: string;
  readonly VITE_STRIPE_PRICE_50: string;
  readonly VITE_STRIPE_PRICE_100: string;
  readonly VITE_STRIPE_PRICE_200: string;
  readonly VITE_STRIPE_PRICE_500: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
