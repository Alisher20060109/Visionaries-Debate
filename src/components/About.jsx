import TeamSwiper from "./TeamSwiper";

function About({ t }) {
  const features = [
    { icon: "🎙️", title: t.feat1Title, desc: t.feat1Desc },
    { icon: "🧠", title: t.feat2Title, desc: t.feat2Desc },
    { icon: "🤝", title: t.feat3Title, desc: t.feat3Desc },
    { icon: "🏆", title: t.feat4Title, desc: t.feat4Desc },
  ];
  return (
    <section id="about" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{t.aboutTag}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {t.aboutTitle}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4 text-sm">{t.aboutP1}</p>
            <p className="text-slate-500 leading-relaxed text-sm">{t.aboutP2}</p>
          </div>
          <TeamSwiper />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="group border border-slate-100 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-blue-100">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-wide mb-2">{f.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;