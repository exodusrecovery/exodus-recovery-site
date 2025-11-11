import React from "react";
import ContactForm from "@/components/ContactForm";

export default function App(): React.ReactElement {
  return (
    <div style={{ padding: 24 }}>
      <h1>Temporary App</h1>
      <p>Временный рабочий компонент — рендерим ContactForm.</p>
      <ContactForm />
    </div>
  );
}
