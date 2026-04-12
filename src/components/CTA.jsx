import VLogo from "./VLogo";

function CTA({ onRegister, t }) {
  return (
    <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-white/5 rounded-full blur-[100px]" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="rounded-2xl overflow-hidden" style={{ width: 72, height: 72 }}>
            <VLogo size={72} />
          </div>
        </div>
        <h2 className="text-white font-black leading-none mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
          {t.ctaTitle}
        </h2>
        <p className="text-white/50 text-sm md:text-base mb-10 leading-relaxed max-w-lg mx-auto">
          {t.ctaDesc}
        </p>
        <button
          onClick={onRegister}
          className="group inline-flex items-center gap-3 bg-white text-slate-900 font-black text-sm uppercase tracking-[0.15em] px-12 py-5 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-100 shadow-xl shadow-black/30"
        >
          {t.ctaBtn}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
}

export default CTA;