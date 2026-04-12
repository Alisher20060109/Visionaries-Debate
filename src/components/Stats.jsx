import Counter from "./Counter";

function Stats({ t }) {
  const items = [
    { value: "5", suffix: "+", label: t.stat1Label, desc: t.stat1Desc },
    { value: "1", suffix: `${t.orin}`, label: t.stat2Label, desc: t.stat2Desc },
    { value: `${t.tkti}`, suffix: "", label: t.stat3Label, desc: t.stat3Desc },
    { value: "100", suffix: "%", label: t.stat4Label, desc: t.stat4Desc },
  ];
  return (
    <section className="bg-white border-b border-slate-100 py-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-slate-100">
        {items.map((s, i) => (
          <div key={i} className="px-8 py-8 text-center">
            <p className="text-4xl font-black text-slate-900 leading-none mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              <Counter target={s.value} suffix={s.suffix} />
            </p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-xs text-slate-400 leading-snug hidden md:block">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;