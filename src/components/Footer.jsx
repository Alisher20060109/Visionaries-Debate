import VLogo from "./VLogo";
import { FaInstagram, FaYoutube, FaTelegram, FaMapMarkerAlt } from "react-icons/fa";

function Footer({ t }) {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className="rounded-xl overflow-hidden shrink-0"
            style={{ width: 36, height: 36 }}
          >
            <VLogo size={36} />
          </div>
          <div>
            <p
              className="text-xs font-black uppercase tracking-widest text-slate-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Visionaries Debate
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              {t.footerSub}
            </p>
          </div>
        </div>

        {/* Center - Social + Location */}
        <div className="flex items-center gap-5 flex-wrap justify-center">
          
          {/* Location */}
          <a
            href="https://www.google.com/maps/place/41%C2%B021'46.8%22N+69%C2%B017'39.2%22E/@41.3628704,69.2920787,16.44z/data=!4m4!3m3!8m2!3d41.363004!4d69.294217?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-green-600 transition text-[16px]"
          >
            <FaMapMarkerAlt size={22} />
            {t.tkti}
          </a>
          <a
            href="https://t.me/visionariesdebate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-500 transition"
          >
            <FaTelegram size={24} />
          </a>

          {/* Social */}
          <a
            href="https://www.instagram.com/visionaries_debate/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-pink-500 transition"
          >
            <FaInstagram size={27} />
          </a>

          <a
            href="https://www.youtube.com/@VISIONARIESDEBATE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-red-500 transition"
          >
            <FaYoutube size={26} />
          </a>

          
        </div>

        {/* Right */}
        <p className="text-xs text-slate-300 uppercase tracking-widest">
          Toshkent  2026
        </p>
      </div>
    </footer>
  );
}

export default Footer;