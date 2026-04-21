import { useEffect, useState } from "react";
import VLogo from "./VLogo";

function CTA({ onRegister, t }) {
  const [logoSize, setLogoSize] = useState(72);

  useEffect(() => {
    const updateLogoSize = () => {
      if (window.innerWidth < 640) {
        setLogoSize(52);
      } else if (window.innerWidth < 768) {
        setLogoSize(62);
      } else {
        setLogoSize(72);
      }
    };

    updateLogoSize();
    window.addEventListener("resize", updateLogoSize);
    return () => window.removeEventListener("resize", updateLogoSize);
  }, []);

  return (
    <section className="bg-slate-900 py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[180px] sm:w-[380px] sm:h-[220px] md:w-[500px] md:h-[300px] bg-white/5 rounded-full blur-[80px] sm:blur-[90px] md:blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className="rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ width: logoSize, height: logoSize }}
          >
            <VLogo size={logoSize} />
          </div>
        </div>

        <h2
          className="text-white font-black leading-none mb-4 sm:mb-5 md:mb-6"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(2rem, 8vw, 5rem)",
          }}
        >
          {t.ctaTitle}
        </h2>

        <p className="text-white/50 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed max-w-xs sm:max-w-md md:max-w-lg mx-auto px-1 sm:px-0">
          {t.ctaDesc}
        </p>

        <button
          onClick={onRegister}
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-white text-slate-900 font-black text-xs sm:text-sm uppercase tracking-[0.15em] px-6 sm:px-10 md:px-12 py-4 sm:py-5 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-100 shadow-xl shadow-black/30"
        >
          {t.ctaBtn}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
}

export default CTA;