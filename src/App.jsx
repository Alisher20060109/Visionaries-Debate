import { useState, useEffect, useRef } from "react";

/* ─── SVG LOGO ───────────────────────────────────────────────── */
// Har qanday konteyner ichida to'liq egallaydi — padding yo'q
function VLogo({ size = 56 }) {
  return (
    <img
      src="/img/logo.svg"
      alt="Visionaries Logo"
      style={{
        display: "block",
        width: size,
        height: size,
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

/* ─── IMAGE SWIPER ───────────────────────────────────────────── */
// Rasmlarni HEIC dan JPG ga convert qiling: jamo1.jpg ... jamo6.jpg
const TEAM_IMAGES = [
  "/img/jamo1.jpg",
  "/img/jamo2.jpg",
  "/img/jamo3.jpg",
  "/img/jamo4.jpg",
  "/img/jamo5.jpg",
  "/img/jamo6.jpg",
];

function TeamSwiper() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TEAM_IMAGES.length);
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleNav = (idx) => {
    setCurrent((idx + TEAM_IMAGES.length) % TEAM_IMAGES.length);
    startTimer();
  };

  return (
    <div className="relative h-72 hidden md:flex items-center justify-end select-none">
      <div className="absolute top-0 right-8 w-52 h-64 bg-slate-900 rounded-3xl rotate-6 opacity-10" />
      <div className="absolute top-4 right-4 w-52 h-64 bg-slate-800 rounded-3xl rotate-3 opacity-20" />
      <div className="absolute top-8 right-0 w-52 h-64 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
        {TEAM_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Team ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}
        <button
          onClick={() => handleNav(current - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10 text-base leading-none"
        >‹</button>
        <button
          onClick={() => handleNav(current + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10 text-base leading-none"
        >›</button>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {TEAM_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleNav(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ANIMATED COUNTER ──────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const end = parseInt(target) || 0;
        if (end === 0) { setCount(target); return; }
        const step = Math.ceil(end / 40);
        const t = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(t); }
          else setCount(start);
        }, 35);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{typeof target === "string" && isNaN(target) ? target : count}{suffix}</span>;
}

/* ─── FIELD ─────────────────────────────────────────────────── */
function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-slate-900 focus:bg-white transition-all duration-200"
      />
    </div>
  );
}

/* ─── MODAL ─────────────────────────────────────────────────── */
const BOT_TOKEN = "8488160061:AAGb7rjX9oeKLP-RDydXseHgFmMDh3waIIg";
const CHAT_ID = "5744333432";
const LEVELS = ["Beginner (A1)", "Elementary (A2)", "Pre-Intermediate (B1)", "Intermediate (B2)", "Upper-Intermediate (C1)", "Advanced (C2)"];

function Modal({ onClose }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", telegram: "", level: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (Object.values(form).some((v) => !v)) { setError(true); return; }
    setError(false); setLoading(true);
    const text = `🎤 *New Tournament Registration*\n\n👤 *Name:* ${form.firstName} ${form.lastName}\n📞 *Phone:* ${form.phone}\n✈️ *Telegram:* ${form.telegram}\n🌐 *English Level:* ${form.level}`;
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
      });
      const data = await res.json();
      if (data.ok) setSuccess(true);
      else setLoading(false);
    } catch { setLoading(false); }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease]">
        <div className="bg-slate-900 px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl overflow-hidden" style={{ width: 44, height: 44 }}>
              <VLogo size={44} />
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">×</button>
          </div>
          <h3 className="text-white text-2xl font-black tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}>
            TOURNAMENT REGISTRATION
          </h3>
          <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">Visionaries Debate 2025</p>
        </div>

        {success ? (
          <div className="px-8 py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" className="w-10 h-10">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-xl font-black text-slate-900 mb-2">You're Registered!</p>
            <p className="text-sm text-slate-400 leading-relaxed">Your application has been sent.<br />We'll contact you via Telegram soon.</p>
            <button onClick={onClose} className="mt-8 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-black transition-colors">
              Close
            </button>
          </div>
        ) : (
          <div className="px-8 py-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" value={form.firstName} onChange={upd("firstName")} placeholder="John" />
              <Field label="Last Name" value={form.lastName} onChange={upd("lastName")} placeholder="Doe" />
            </div>
            <Field label="Phone Number" value={form.phone} onChange={upd("phone")} placeholder="+998 90 123 4567" type="tel" />
            <Field label="Telegram Username" value={form.telegram} onChange={upd("telegram")} placeholder="@username" />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">English Level</label>
              <select
                value={form.level}
                onChange={upd("level")}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition-all duration-200 appearance-none"
              >
                <option value="">Select your level</option>
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            {error && <p className="text-xs text-red-500 font-semibold">Please fill in all fields before submitting.</p>}
            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black disabled:opacity-40 text-white text-sm font-black uppercase tracking-[0.15em] py-4 rounded-2xl transition-all duration-200 mt-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? "Sending…" : "Submit Registration →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar({ onRegister }) {
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
          {/* Logo — rounded-xl, overflow-hidden, padding yo'q */}
          <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 40, height: 40 }}>
            <VLogo size={40} />
          </div>
          <span
            className={`text-sm font-black uppercase tracking-[0.12em] transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Visionaries Debate
          </span>
        </div>
        <button
          onClick={onRegister}
          className={`text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all duration-200 ${scrolled ? "bg-slate-900 text-white hover:bg-black" : "bg-white text-slate-900 hover:bg-slate-100"}`}
        >
          Register
        </button>
      </div>
    </nav>
  );
}

/* ─── HERO SECTION ───────────────────────────────────────────── */
function Hero({ onRegister }) {
  return (
    <section className="relative min-h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Hero logo — rounded-3xl, overflow-hidden, padding yo'q */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl scale-110" />
            <div className="relative rounded-3xl overflow-hidden border border-white/20" style={{ width: 96, height: 96 }}>
              <VLogo size={96} />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em]">Registration Open</span>
        </div>

        <h1
          className="text-white font-black leading-none mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3.5rem, 12vw, 8rem)", letterSpacing: "0.03em" }}
        >
          VISIONARIES<br />
          <span className="text-white/30">DEBATE</span>
        </h1>

        <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          The first official debate tournament at TCTI Academic Lyceum. Compete, sharpen your thinking, and make your voice heard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRegister}
            className="group bg-white text-slate-900 font-black text-sm uppercase tracking-[0.15em] px-10 py-4 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-100 shadow-lg shadow-black/20"
          >
            Apply Now
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <a
            href="#about"
            className="border border-white/20 text-white/70 font-semibold text-sm uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
        <svg viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="w-4 h-4">
          <polyline points="4 8 10 14 16 8" />
        </svg>
      </div>
    </section>
  );
}

/* ─── STATS ──────────────────────────────────────────────────── */
function Stats() {
  const items = [
    { value: "5", suffix: "+", label: "Sessions Held", desc: "Successful debate sessions since founding" },
    { value: "1", suffix: "st", label: "Tournament", desc: "First ever official competition" },
    { value: "TCTI", suffix: "", label: "Host Institution", desc: "Tashkent Chemical Technology Institute" },
    { value: "100", suffix: "%", label: "English Only", desc: "All rounds conducted in English" },
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

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About() {
  const features = [
    { icon: "🎙️", title: "Public Speaking", desc: "Train your voice, presence, and confidence on stage." },
    { icon: "🧠", title: "Critical Thinking", desc: "Learn to construct solid arguments and dismantle weak ones." },
    { icon: "🤝", title: "Community", desc: "Connect with like-minded students who love ideas." },
    { icon: "🏆", title: "Compete", desc: "Earn recognition in our official ranked tournament." },
  ];
  return (
    <section id="about" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">About Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              WHERE IDEAS<br />CLASH AND<br />MINDS SHARPEN.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4 text-sm">
              Visionaries Debate is a student-led debate club at the Tashkent Chemical Technology Institute Academic Lyceum. We've run five engaging sessions building skills in critical thinking, public speaking, and logical reasoning.
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
              Now we're launching our first official tournament — an exciting step for every student passionate about language and ideas.
            </p>
          </div>
          <TeamSwiper />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="group border border-slate-100 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
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

/* ─── INFO CARDS ─────────────────────────────────────────────── */
function InfoSection() {
  const cards = [
    { bg: "bg-slate-900", textColor: "text-white", subColor: "text-white/40", label: "Format", value: "Debate Tournament", sub: "First official competition", icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-7 h-7"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { bg: "bg-slate-50", textColor: "text-slate-900", subColor: "text-slate-400", label: "Location", value: "TCTI Academic Lyceum", sub: "Tashkent, Uzbekistan", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-slate-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
    { bg: "bg-slate-50", textColor: "text-slate-900", subColor: "text-slate-400", label: "Eligibility", value: "Lyceum Students", sub: "All grades welcome", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-slate-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { bg: "bg-slate-900", textColor: "text-white", subColor: "text-white/40", label: "Language", value: "English Only", sub: "All rounds in English", icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-7 h-7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  ];
  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Tournament Details</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            EVERYTHING YOU NEED TO KNOW
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

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA({ onRegister }) {
  return (
    <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-white/5 rounded-full blur-[100px]" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* CTA logo — rounded-2xl, padding yo'q */}
        <div className="flex justify-center mb-8">
          <div className="rounded-2xl overflow-hidden" style={{ width: 72, height: 72 }}>
            <VLogo size={72} />
          </div>
        </div>
        <h2 className="text-white font-black leading-none mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
          READY TO COMPETE?
        </h2>
        <p className="text-white/50 text-sm md:text-base mb-10 leading-relaxed max-w-lg mx-auto">
          Register now to secure your spot in the Visionaries Debate Tournament 2026. Limited spots available for lyceum students.
        </p>
        <button
          onClick={onRegister}
          className="group inline-flex items-center gap-3 bg-white text-slate-900 font-black text-sm uppercase tracking-[0.15em] px-12 py-5 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-100 shadow-xl shadow-black/30"
        >
          Register Now
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Footer logo — rounded-xl, padding yo'q */}
          <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 36, height: 36 }}>
            <VLogo size={36} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Visionaries Debate
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">TCTI Academic Lyceum</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 uppercase tracking-widest">Tashkent, Uzbekistan · 2026</p>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <Navbar onRegister={() => setModal(true)} />
      <Hero onRegister={() => setModal(true)} />
      <Stats />
      <About />
      <InfoSection />
      <CTA onRegister={() => setModal(true)} />
      <Footer />
      {modal && <Modal onClose={() => setModal(false)} />}
    </>
  );
}