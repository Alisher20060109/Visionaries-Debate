function InfoSection({ t }) {
  const cards = [
    {
      bg: "bg-slate-900", textColor: "text-white", subColor: "text-white/40",
      label: t.card1Label, value: t.card1Value, sub: t.card1Sub,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-7 h-7">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
   {
      bg: "bg-slate-50", textColor: "text-slate-900", subColor: "text-slate-400", 
      label: t.card4Label, value: t.card4Value, sub: t.card4Sub,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
    },
    {
      bg: "bg-slate-50", textColor: "text-slate-900", subColor: "text-slate-400",
      label: t.card3Label, value: t.card3Value, sub: t.card3Sub,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-slate-600">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    
     {
      bg: "bg-slate-900", textColor: "text-white", subColor: "text-white/40",
      label: t.card2Label, value: t.card2Value, sub: t.card2Sub,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-slate-600">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-blue-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{t.infoTag}</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {t.infoTitle}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <div key={i} className={`${c.bg} rounded-3xl p-7 border border-slate-200`}>
              <div className="mb-5">{c.icon}</div>
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${c.subColor}`}>{c.label}</p>
              <p className={`text-lg font-black leading-tight mb-1 ${c.textColor}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{c.value}</p>
              <p className={`text-xs ${c.subColor}`}>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;