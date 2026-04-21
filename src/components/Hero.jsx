import { useEffect, useState } from "react";
import VLogo from "./VLogo";

function Hero({ onRegister, t }) {
  const [logoSize, setLogoSize] = useState(150);

  useEffect(() => {
    const updateLogoSize = () => {
      if (window.innerWidth < 640) {
        setLogoSize(96);
      } else if (window.innerWidth < 768) {
        setLogoSize(120);
      } else {
        setLogoSize(150);
      }
    };

    updateLogoSize();
    window.addEventListener("resize", updateLogoSize);
    return () => window.removeEventListener("resize", updateLogoSize);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-16">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-70 sm:w-[420px] sm:h-[420px] md:w-[600px] md:h-[600px] bg-white/5 rounded-full blur-[90px] sm:blur-[110px] md:blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative pb-8 sm:pb-12 md:pb-15">
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl scale-110" />
            <div
              className="relative rounded-3xl overflow-hidden border border-white/20 flex items-center justify-center"
              style={{ width: logoSize, height: logoSize }}
            >
              <VLogo size={logoSize} />
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="inline-block border border-white/20 text-white/70 bg-white/20 font-semibold text-sm sm:text-base md:text-lg uppercase tracking-[0.18em] px-5 sm:px-7 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-2xl hover:bg-white/10 transition-all duration-200"
        >
          {t.heroLearn}
        </a>

        <h1
          className="text-white font-black pt-8 sm:pt-10 md:pt-15 leading-none mb-4 sm:mb-5 md:mb-6"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.8rem, 11vw, 8rem)",
            letterSpacing: "0.03em",
          }}
        >
          {t.heroTitle1}
          <br />
          <span className="text-white/30">{t.heroTitle2}</span>
        </h1>

        <p
          className="text-white/50 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-9 md:mb-10 leading-relaxed px-1 sm:px-0"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.heroDesc}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            onClick={onRegister}
            className="group w-full sm:w-auto bg-white text-slate-900 font-black text-xs sm:text-sm uppercase tracking-[0.15em] px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-100 shadow-lg shadow-black/20"
          >
            {t.heroApply}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 sm:h-10 bg-linear-to-b from-transparent to-white/30" />
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          className="w-4 h-4"
        >
          <polyline points="4 8 10 14 16 8" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;