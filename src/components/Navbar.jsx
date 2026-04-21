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
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Left */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="rounded-xl overflow-hidden shrink-0"
            style={{ width: 36, height: 36 }}
          >
            <VLogo size={36} />
          </div>

          <div className="min-w-0">
            <span
              className={`block truncate font-black uppercase tracking-[0.1em] transition-colors ${
                scrolled ? "text-slate-900" : "text-white"
              } text-[11px] sm:text-sm`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <span className="hidden sm:inline">Visionaries Debate</span>
              <span className="sm:hidden">Visionaries</span>
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="scale-90 sm:scale-100 origin-right">
            <LangSwitcher lang={lang} setLang={setLang} scrolled={scrolled} />
          </div>

          <button
            onClick={onRegister}
            className={`whitespace-nowrap text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 ${
              scrolled
                ? "bg-slate-900 text-white hover:bg-black"
                : "bg-white text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span className="hidden sm:inline">{t.navRegister}</span>
            <span className="sm:hidden">Register</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;