import { useState } from "react";
import T from "../translations";

const BOT_TOKEN = "8488160061:AAGb7rjX9oeKLP-RDydXseHgFmMDh3waIIg";
const CHAT_ID = "8204847451";

export default function Modal({ onClose, lang = "uz" }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const t = (key) => T?.[lang]?.[key] || T?.uz?.[key] || key;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    telegram: "",
    school: "",
    partnerName: "",
    partnerTelegram: "",
    partnerPhone: "",
    partnerSchool: "",
    topics: "",
    confirm: "",
  });

  const change = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "partnerPhone") {
      setForm((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, "").slice(0, 9),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const next = () => setStep((p) => p + 1);
  const prev = () => setStep((p) => p - 1);

  const submit = async () => {
    setLoading(true);

    const text = `
📥 YANGI RO‘YXAT

👤 ${form.firstName} ${form.lastName}
📞 +998${form.phone}
📱 ${form.telegram}
🏫 ${form.school}

🤝 ${form.partnerName}
📞 +998${form.partnerPhone}
📱 ${form.partnerTelegram}
🏫 ${form.partnerSchool}

🧠 ${form.topics}
✅ ${form.confirm}
`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      });

      onClose();
    } catch (error) {
      alert("Xatolik");
    }

    setLoading(false);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md bg-[#07142c]/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0b1835] via-[#0a1d45] to-[#07142c] shadow-[0_20px_80px_rgba(0,0,0,0.45)] text-white"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-white/60 hover:text-white text-xl"
          >
            ✕
          </button>

          <p className="text-xs uppercase tracking-[3px] text-cyan-300 font-semibold">
            Visionaries Debate
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {step}/3 — {t("modalTitle")}
          </h2>

          <div className="w-full h-1 bg-white/10 rounded-full mt-4">
            <div
              className={`h-1 rounded-full bg-cyan-400 transition-all duration-500 ${
                step === 1
                  ? "w-1/3"
                  : step === 2
                  ? "w-2/3"
                  : "w-full"
              }`}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 1 && (
            <>
              <Field label="Ism" name="firstName" value={form.firstName} onChange={change} />
              <Field label="Familiya" name="lastName" value={form.lastName} onChange={change} />
              <PhoneField label="Telefon" name="phone" value={form.phone} onChange={change} />
              <Field label="Telegram" name="telegram" value={form.telegram} onChange={change} />
              <Field label="Maktab" name="school" value={form.school} onChange={change} />
            </>
          )}

          {step === 2 && (
            <>
              <Field label="Sherik Ismi" name="partnerName" value={form.partnerName} onChange={change} />
              <Field label="Sherik Telegram" name="partnerTelegram" value={form.partnerTelegram} onChange={change} />
              <PhoneField label="Sherik Telefon" name="partnerPhone" value={form.partnerPhone} onChange={change} />
              <Field label="Sherik Maktabi" name="partnerSchool" value={form.partnerSchool} onChange={change} />
            </>
          )}

          {step === 3 && (
            <>
              <TextArea
                label="Qaysi mavzularda qulaysiz?"
                name="topics"
                value={form.topics}
                onChange={change}
              />

              <SelectBox
                label="Tasdiq"
                name="confirm"
                value={form.confirm}
                onChange={change}
              />
            </>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {step > 1 ? (
              <button
                onClick={prev}
                className="h-11 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                Orqaga
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={next}
                className="h-11 rounded-xl bg-cyan-400 text-black font-semibold hover:scale-[1.02] transition"
              >
                Davom etish
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={submit}
                className="h-11 rounded-xl bg-cyan-400 text-black font-semibold hover:scale-[1.02] transition"
              >
                {loading ? "..." : "Yuborish"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Field({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
      />
    </div>
  );
}

function PhoneField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-white/70">{label}</label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
          +998
        </span>

        <input
          name={name}
          value={value}
          onChange={onChange}
          maxLength={9}
          className="w-full h-11 pl-16 pr-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
        />
      </div>
    </div>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <textarea
        rows="4"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
      />
    </div>
  );
}

function SelectBox({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-900 outline-none focus:border-cyan-400"
      >
        <option value=""> Aniq bilmayman</option>
        <option value="Ha">Albatta kelaman</option>
        <option value="Yo'q">Yo'q kelmasam kerak</option>
      </select>
    </div>
  );
} 