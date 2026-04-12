import { useState, useEffect, useRef } from "react";

const LANG_LABELS = { uz: "O'z", ru: "Рус", en: "Eng" };

function LangSwitcher({ lang, setLang, scrolled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const textCls = scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/80 hover:text-white";
  const dropBg = "bg-white border border-slate-200 shadow-lg";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors duration-200 ${textCls}`}
        style={{ minWidth: 80 }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16, flexShrink: 0 }}>
          <circle cx="10" cy="10" r="8" />
          <path d="M10 2a12 12 0 0 1 3 8 12 12 0 0 1-3 8A12 12 0 0 1 7 10a12 12 0 0 1 3-8z" />
          <line x1="2" y1="10" x2="18" y2="10" />
        </svg>
        <span className="text-xs font-bold tracking-wide" style={{ width: 28, textAlign: "left" }}>
          {LANG_LABELS[lang]}
        </span>
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 11, height: 11, flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <polyline points="2 4 6 8 10 4" />
        </svg>
      </button>

      {open && (
        <div className={`absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50 ${dropBg}`} style={{ minWidth: 100 }}>
          {Object.entries(LANG_LABELS).map(([code, label]) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wide transition-colors duration-150 ${
                lang === code
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LangSwitcher;