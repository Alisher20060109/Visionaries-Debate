import { useState } from "react";

const BOT_TOKEN = "8488160061:AAGb7rjX9oeKLP-RDydXseHgFmMDh3waIIg";
const CHAT_ID = "8204847451";

export default function Modal({ onClose }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    telegram: "",
    school: "",
  });

  const change = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((prev) => ({
        ...prev,
        phone: value.replace(/\D/g, "").slice(0, 9),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    // 🔴 VALIDATSIYA
    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.telegram ||
      !form.school
    ) {
      alert("Iltimos barcha maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);

    const text = `
📥 YANGI RO‘YXAT

👤 Ism: ${form.firstName} ${form.lastName}
📞 Telefon: +998${form.phone}
📱 Telegram: @${form.telegram}
🏫 Maktab: ${form.school}
`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
          }),
        }
      );

      if (!res.ok) throw new Error("Yuborishda xatolik");

      alert("Yuborildi ✅");
      onClose();
    } catch (error) {
      alert("Xatolik ❌");
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
        className="w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-[#0b1835] text-white"
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-white/60 hover:text-white text-xl"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold text-center">
            Ma’lumotlarni to‘ldiring
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6">
          <Field label="Ism" name="firstName" value={form.firstName} onChange={change} />
          <Field label="Familiya" name="lastName" value={form.lastName} onChange={change} />
          <PhoneField label="Telefon" name="phone" value={form.phone} onChange={change} />
          <Field label="Telegram username" name="telegram" value={form.telegram} onChange={change} />
          <Field label="Maktab" name="school" value={form.school} onChange={change} />

          <button
            disabled={loading}
            onClick={submit}
            className="w-full h-11 mt-4 rounded-xl bg-cyan-400 text-black font-semibold"
          >
            {loading ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUTLAR */

function Field({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
      />
    </div>
  );
}

function PhoneField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
          +998
        </span>
        <input
          name={name}
          value={value}
          onChange={onChange}
          maxLength={9}
          className="w-full h-11 pl-16 pr-4 rounded-xl bg-white/5 border border-white/10 text-white"
        />
      </div>
    </div>
  );
}