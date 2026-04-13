import VLogo from "./VLogo";

function Hero({ onRegister, t }) {
  return (
    <section className="relative min-h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative pb-15 ">
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl scale-110" />
            <div className="relative rounded-3xl overflow-hidden border border-white/20" style={{ width: 150, height: 150 }}>
              <VLogo size={150} />
            </div>
          </div>
        </div>

       <a
            href="#about"
            className="border border-white/20 text-white/70 bg-white/20 font-semibold pt-5 text-lg uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200"
          >
            {t.heroLearn}
          </a>

        <h1
          className="text-white font-black pt-15 leading-none mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3.5rem, 12vw, 8rem)", letterSpacing: "0.03em" }}
        >
          {t.heroTitle1}<br />
          <span className="text-white/30">{t.heroTitle2}</span>
        </h1>

        <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {t.heroDesc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRegister}
            className="group bg-white text-slate-900 font-black text-sm uppercase tracking-[0.15em] px-10 py-4 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-100 shadow-lg shadow-black/20"
          >
            {t.heroApply}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-linear-to-b from-transparent to-white/30" />
        <svg viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="w-4 h-4">
          <polyline points="4 8 10 14 16 8" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;