import { useEffect, useRef, useState } from 'react';
import { MdSearch, MdSecurity, MdSearchOff } from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';
import { SiMusicbrainz } from 'react-icons/si';
import { HiMiniSignal } from 'react-icons/hi2';
import { LuMonitorSmartphone } from 'react-icons/lu';
import { IoMdCloudOutline, IoIosMail } from 'react-icons/io';
import { TbWorld, TbTrendingUp } from 'react-icons/tb';
import { IoCloseCircle } from 'react-icons/io5';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const searchIndex = [
  // Services
  { category: 'Services', title: 'AI Software Solutions', desc: 'Intelligent document processing to predictive analytics.', href: '/services/ai-solutions', icon: <RiRobot2Line className="text-[20px]" /> },
  { category: 'Services', title: 'Machine Learning Platforms', desc: 'End-to-end ML pipelines for data-driven decisions.', href: '/services/ml-platforms', icon: <SiMusicbrainz className="text-[20px]" /> },
  { category: 'Services', title: 'IoT Automation & Smart Solutions', desc: 'Connected devices for manufacturing & enterprise.', href: '/services/iot-automation', icon: <HiMiniSignal className="text-[20px]" /> },
  { category: 'Services', title: 'Full-Stack Web & Mobile Apps', desc: 'Scalable web and cross-platform mobile apps.', href: '/services/full-stack-development', icon: <LuMonitorSmartphone className="text-[20px]" /> },
  { category: 'Services', title: 'Cybersecurity Solutions', desc: 'Compliance, vulnerability assessment & threat mitigation.', href: '/services/cybersecurity', icon: <MdSecurity className="text-[20px]" /> },
  { category: 'Services', title: 'Cloud-Based Systems', desc: 'Scalable cloud architecture for AI/ML workloads.', href: '/services/cloud-systems', icon: <IoMdCloudOutline className="text-[20px]" /> },
  
  // Training / Academy
  { category: 'Training & Academy', title: 'AI & ML Training', desc: 'Hands-on courses in applied machine learning.', href: '/academy/ai-ml', icon: <SiMusicbrainz className="text-[20px]" /> },
  { category: 'Training & Academy', title: 'Cybersecurity Training', desc: 'Ethical hacking, pen-testing & compliance.', href: '/academy/cybersecurity', icon: <MdSecurity className="text-[20px]" /> },
  { category: 'Training & Academy', title: 'IoT Training', desc: 'Embedded systems and connected-device engineering.', href: '/academy/iot', icon: <HiMiniSignal className="text-[20px]" /> },
  { category: 'Training & Academy', title: 'Full-Stack Bootcamp', desc: 'Industry-aligned full-stack development program.', href: '/academy/full-stack', icon: <LuMonitorSmartphone className="text-[20px]" /> },

  // Pages
  { category: 'Pages', title: 'About Porulon', desc: 'Our mission, team, and global deep-tech capabilities.', href: '/about', icon: <TbWorld className="text-[20px]" /> },
  { category: 'Pages', title: 'Industries We Serve', desc: 'Healthcare, Finance, Manufacturing, and E-Commerce.', href: '/industries', icon: <HiMiniSignal className="text-[20px]" /> },
  { category: 'Pages', title: 'Careers & Hiring', desc: 'Join our team of senior architects and researchers.', href: '/careers', icon: <LuMonitorSmartphone className="text-[20px]" /> },
  { category: 'Pages', title: 'Contact Us', desc: 'Get in touch with our enterprise technology team.', href: '/contact', icon: <IoIosMail className="text-[20px]" /> },
];

const popularTags = ['AI Solutions', 'Cybersecurity', 'Cloud Systems', 'IoT Training', 'Full-Stack Bootcamp', 'ML Platforms', 'R&D Consultancy', 'Careers'];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const tagsScrollRef = useRef(null);

  const scrollTags = (direction) => {
    if (tagsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      tagsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredResults = query.trim()
    ? searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-4 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Spotlight Command Modal with Sleek Border-Radius */}
      <div className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 animate-scale-up">
        {/* Top Search Input Header with Rounded Border-Radius */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2.5 bg-white border border-slate-200/90 rounded-2xl px-3.5 py-2.5 shadow-xs focus-within:border-primary-strong/60 focus-within:ring-2 focus-within:ring-primary-strong/20 transition-all">
            <MdSearch className="text-[22px] text-primary-strong shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI solutions, training, pages..."
              className="w-full text-sm font-medium text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none tracking-tight"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
              >
                <IoCloseCircle className="text-[18px]" />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2 py-0.5 rounded-lg transition-colors shrink-0"
            >
              <span>ESC</span>
            </button>
          </div>
        </div>

        {/* Search Content Body */}
        <div className="max-h-[55vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === '' ? (
            <div>
              {/* Popular Tags Horizontal Carousel with Chevron Buttons */}
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
                  Popular Searches
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollTags('left')}
                    aria-label="Scroll left"
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-primary-soft text-slate-600 hover:text-primary-strong flex items-center justify-center shrink-0 transition-colors shadow-2xs"
                  >
                    <GoChevronLeft className="text-sm" />
                  </button>

                  <div
                    ref={tagsScrollRef}
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5 flex-1"
                  >
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-xs font-medium text-slate-700 bg-slate-100/90 hover:bg-primary-soft hover:text-primary-strong px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 tracking-tight shrink-0 whitespace-nowrap border border-slate-200/50"
                      >
                        <TbTrendingUp className="text-[14px] text-primary-strong shrink-0" />
                        <span>{tag}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollTags('right')}
                    aria-label="Scroll right"
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-primary-soft text-slate-600 hover:text-primary-strong flex items-center justify-center shrink-0 transition-colors shadow-2xs"
                  >
                    <GoChevronRight className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2.5">
                  Quick Navigation
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {searchIndex.slice(0, 4).map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary-strong flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-slate-800 group-hover:text-primary-strong truncate tracking-tight">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate tracking-tight font-light">{item.category}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2 px-1">
                {filteredResults.length} Result{filteredResults.length > 1 ? 's' : ''} Found
              </p>
              {filteredResults.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-purple-50/60 border border-transparent hover:border-purple-100 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100/70 text-primary-strong flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary-strong group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-primary-strong transition-colors truncate tracking-tight">
                        {item.title}
                      </span>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 group-hover:bg-purple-100 group-hover:text-primary-strong px-2 py-0.5 rounded-md shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-light tracking-tight">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MdSearchOff className="text-3xl text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No results found for "{query}"</p>
              <p className="text-[11px] text-slate-400 mt-1 font-light">Try searching for keywords like "AI", "Cloud", "Academy", or "Security".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
