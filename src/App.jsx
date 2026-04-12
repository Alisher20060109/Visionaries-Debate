import { useState } from "react";
import T from "./translations";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import InfoSection from "./components/InfoSection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

export default function App() {
  const [modal, setModal] = useState(false);
  const [lang, setLang] = useState("uz");
  const t = T[lang];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <Navbar onRegister={() => setModal(true)} lang={lang} setLang={setLang} t={t} />
      <Hero onRegister={() => setModal(true)} t={t} />
      <Stats t={t} />
       <InfoSection t={t} />
      <About t={t} />
     
      <CTA onRegister={() => setModal(true)} t={t} />
      <Footer t={t} />
      {modal && <Modal onClose={() => setModal(false)} t={t} />}
    </>
  );
}  