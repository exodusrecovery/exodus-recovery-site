import ContactForm from "@/components/ContactForm";

export default function App(): React.ReactElement {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>Exodus Recovery Website</h1>
      <p>Временный App, чтобы проект собирался без ошибок.</p>

      <ContactForm />
    </div>
  );
}
