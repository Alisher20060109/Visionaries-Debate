import { useState } from "react";
import VLogo from "./VLogo";
import Field from "./Field";

const BOT_TOKEN = "8649114899:AAFFcZ4gEQRI27kssnLhQt1aDxoijJ70nx4";
const CHAT_ID = "8204847451";
const LEVELS = ["Beginner (A1)", "Elementary (A2)", "Pre-Intermediate (B1)", "Intermediate (B2)", "Upper-Intermediate (C1)", "Advanced (C2)"];

function Modal({ onClose, t }) {
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
            {t.modalTitle}
          </h3>
          <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">{t.modalSub}</p>
        </div>

        {success ? (
          <div className="px-8 py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" className="w-10 h-10">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-xl font-black text-slate-900 mb-2">{t.successTitle}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{t.successDesc.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
            <button onClick={onClose} className="mt-8 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-black transition-colors">
              {t.closeBtn}
            </button>
          </div>
        ) : (
          <div className="px-8 py-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label={t.firstName} value={form.firstName} onChange={upd("firstName")} placeholder="John" />
              <Field label={t.lastName} value={form.lastName} onChange={upd("lastName")} placeholder="Doe" />
            </div>
            <Field label={t.phone} value={form.phone} onChange={upd("phone")} placeholder="+998 90 123 4567" type="tel" />
            <Field label={t.telegram} value={form.telegram} onChange={upd("telegram")} placeholder="@username" />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{t.level}</label>
              <select
                value={form.level}
                onChange={upd("level")}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition-all duration-200 appearance-none"
              >
                <option value="">{t.levelPlaceholder}</option>
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            {error && <p className="text-xs text-red-500 font-semibold">{t.errorMsg}</p>}
            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black disabled:opacity-40 text-white text-sm font-black uppercase tracking-[0.15em] py-4 rounded-2xl transition-all duration-200 mt-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? t.sendingBtn : t.submitBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;