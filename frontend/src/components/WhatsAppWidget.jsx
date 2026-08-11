import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppWidget() {
  const [isHidden, setIsHidden] = useState(false);
  const phoneNumber = '919791882387';
  const defaultMessage = encodeURIComponent(
    'Hello Porulon Technologies! I would like to know more about your AI solutions and services.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  if (isHidden) return null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="fixed bottom-6 right-6 z-50 font-sans">
      <div className="relative group flex items-center gap-2">
        {/* Tooltip Badge on hover */}
        <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-slate-900/95 dark:bg-[#0e0c1f]/95 text-white text-xs font-light px-3 py-1.5 rounded-xl shadow-xl border border-white/10 whitespace-nowrap">
          Chat on WhatsApp
        </div>

        {/* Close / Dismiss X Button Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsHidden(true);
          }}
          title="Hide WhatsApp Widget"
          aria-label="Hide WhatsApp Widget"
          className="absolute -top-1.5 -right-1.5 z-20 w-5 h-5 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-red-500 border border-white/20 flex items-center justify-center text-[10px] font-bold shadow-md transition-all cursor-pointer opacity-90 group-hover:opacity-100"
        >
          ✕
        </button>

        {/* WhatsApp Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Porulon Technologies"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <FaWhatsapp className="text-3xl text-white" />
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none -z-10" />
        </a>
      </div>
    </div>
  );
}
