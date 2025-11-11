/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZOHO_SMTP_HOST: string;
  readonly VITE_ZOHO_SMTP_PORT: string;
  readonly VITE_ZOHO_SMTP_USER: string;
  readonly VITE_ZOHO_SMTP_PASS: string;
  readonly VITE_CONTACT_TO_EMAIL: string;
  readonly VITE_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
