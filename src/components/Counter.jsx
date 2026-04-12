import { useState, useEffect, useRef } from "react";

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

export default Counter;