import VLogo from "./VLogo";
import {
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer({ t }) {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        
       

        {/* Center - Social + Location */}
        <div className="flex  items-center justify-center gap-6 sm:gap-5">
          {/* Location */}
          <a
            href="https://www.google.com/maps/place/41%C2%B021'46.8%22N+69%C2%B017'39.2%22E/@41.3628704,69.2920787,16.44z/data=!4m4!3m3!8m2!3d41.363004!4d69.294217?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-green-600 transition text-sm sm:text-base text-center"
          >
            <FaMapMarkerAlt size={18} className="shrink-0" />
            <span className="text-xs sm:text-sm">{t.tkti}</span>
          </a>

          <a
            href="https://t.me/visionariesdebate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-500 transition"
          >
            <FaTelegram size={22} />
          </a>

          <a
            href="https://www.instagram.com/visionaries_debate/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-pink-500 transition"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href="https://www.youtube.com/@VISIONARIESDEBATE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-red-500 transition"
          >
            <FaYoutube size={23} />
          </a>
        </div>

        {/* Right */}
        <p className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-[0.18em] text-center">
          Toshkent 2026
        </p>
      </div>
    </footer>
  );
}

export default Footer;