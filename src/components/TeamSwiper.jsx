import { useState, useEffect, useRef } from "react";

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

export default TeamSwiper;