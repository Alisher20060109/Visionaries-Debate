import { useState, useEffect } from "react";
import VLogo from "./VLogo";
import LangSwitcher from "./LangSwitcher";

function Navbar({ onRegister, lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-100" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl overflow-hidden shrink-0" style={{ width: 40, height: 40 }}>
            <VLogo size={40} />
          </div>
          <span
            className={`text-sm font-black uppercase tracking-[0.12em] transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Visionaries Debate
          </span>
        </div>
        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} scrolled={scrolled} />
          <button
            onClick={onRegister}
            className={`text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all duration-200 ${scrolled ? "bg-slate-900 text-white hover:bg-black" : "bg-white text-slate-900 hover:bg-slate-100"}`}
          >
            {t.navRegister}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;