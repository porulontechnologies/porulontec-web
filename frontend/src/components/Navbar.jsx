import { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { fetchServices, fetchTraining } from '../api/client.js';
import { GoChevronDown, GoChevronUp, GoArrowRight } from 'react-icons/go';
import { TbWorld } from 'react-icons/tb';
import { HiCheck, HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';

const servicesMenu = [
  {
    id: '#01',
    label: 'AI Software Solutions',
    desc: 'Intelligent document processing & predictive analytics.',
    href: '/services/ai-solutions',
    shortCode: 'AI',
    cardBg: 'bg-[#f5f3ff] dark:bg-[#130f26]/90 hover:bg-[#ede9fe] dark:hover:bg-[#1a1433] border-0',
    glowBg: 'from-purple-500/30 via-indigo-500/20 to-pink-500/20',
    iconBg: 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30',
  },
  {
    id: '#02',
    label: 'Machine Learning Platforms',
    desc: 'Real-time ML pipelines for data-driven decisions.',
    href: '/services/ml-platforms',
    shortCode: 'ML',
    cardBg: 'bg-[#ecfdf5] dark:bg-[#0d211a]/90 hover:bg-[#d1fae5] dark:hover:bg-[#122e24] border-0',
    glowBg: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/20',
    iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30',
  },
  {
    id: '#03',
    label: 'IoT Automation',
    desc: 'Connected hardware for manufacturing & enterprise.',
    href: '/services/iot-automation',
    shortCode: 'IoT',
    cardBg: 'bg-[#fffbeb] dark:bg-[#261e0d]/90 hover:bg-[#fef3c7] dark:hover:bg-[#332812] border-0',
    glowBg: 'from-amber-500/30 via-orange-500/20 to-yellow-500/20',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
  },
  {
    id: '#04',
    label: 'Full-Stack Web & Mobile',
    desc: 'End-to-end UX for consumer and enterprise apps.',
    href: '/services/full-stack-development',
    shortCode: 'Web',
    cardBg: 'bg-[#fff1f2] dark:bg-[#260f17]/90 hover:bg-[#ffe4e6] dark:hover:bg-[#33141f] border-0',
    glowBg: 'from-pink-500/30 via-rose-500/20 to-purple-500/20',
    iconBg: 'bg-gradient-to-br from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30',
  },
  {
    id: '#05',
    label: 'Cybersecurity Solutions',
    desc: 'Compliance, threat detection & vulnerability assessment.',
    href: '/services/cybersecurity',
    shortCode: 'Sec',
    cardBg: 'bg-[#ecfeff] dark:bg-[#0c2329]/90 hover:bg-[#cffaff] dark:hover:bg-[#113139] border-0',
    glowBg: 'from-cyan-500/30 via-blue-500/20 to-indigo-500/20',
    iconBg: 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30',
  },
  {
    id: '#06',
    label: 'Cloud-Based Systems',
    desc: 'Scalable cloud architecture for Azure, AWS & GCP.',
    href: '/services/cloud-systems',
    shortCode: 'Cld',
    cardBg: 'bg-[#faf5ff] dark:bg-[#1a0f2e]/90 hover:bg-[#f3e8ff] dark:hover:bg-[#23143e] border-0',
    glowBg: 'from-indigo-500/30 via-blue-500/20 to-purple-500/20',
    iconBg: 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30',
  },
  {
    id: '#07',
    label: 'R&D Consultancy',
    desc: 'Research-led innovation strategy and execution.',
    href: '/services/rd-consultancy',
    shortCode: 'R&D',
    cardBg: 'bg-[#fff7ed] dark:bg-[#26150c]/90 hover:bg-[#ffedd5] dark:hover:bg-[#331c10] border-0',
    glowBg: 'from-orange-500/30 via-amber-500/20 to-red-500/20',
    iconBg: 'bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30',
  },
  {
    id: '#08',
    label: 'Data Engineering',
    desc: 'Pipeline design, warehousing & real-time analytics.',
    href: '/services/data-engineering',
    shortCode: 'Data',
    cardBg: 'bg-[#f0fdf4] dark:bg-[#0c2415]/90 hover:bg-[#dcfce7] dark:hover:bg-[#11311d] border-0',
    glowBg: 'from-teal-500/30 via-emerald-500/20 to-green-500/20',
    iconBg: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-cyan-500/30',
  },
];

const trainingMenu = [
  {
    id: '#01',
    label: 'AI & ML Training',
    desc: 'Hands-on courses in applied machine learning & LLMs.',
    href: '/training/ai-ml',
    shortCode: 'AI',
    cardBg: 'bg-[#f5f3ff] dark:bg-[#130f26]/90 hover:bg-[#ede9fe] dark:hover:bg-[#1a1433] border-0',
    glowBg: 'from-purple-500/30 via-indigo-500/20 to-pink-500/20',
    iconBg: 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30',
  },
  {
    id: '#02',
    label: 'Cybersecurity Bootcamp',
    desc: 'Ethical hacking, pen-testing & threat defense.',
    href: '/training/cybersecurity',
    shortCode: 'Sec',
    cardBg: 'bg-[#ecfeff] dark:bg-[#0c2329]/90 hover:bg-[#cffaff] dark:hover:bg-[#113139] border-0',
    glowBg: 'from-cyan-500/30 via-blue-500/20 to-indigo-500/20',
    iconBg: 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30',
  },
  {
    id: '#03',
    label: 'IoT Engineering',
    desc: 'Embedded systems & connected device development.',
    href: '/training/iot',
    shortCode: 'IoT',
    cardBg: 'bg-[#fffbeb] dark:bg-[#261e0d]/90 hover:bg-[#fef3c7] dark:hover:bg-[#332812] border-0',
    glowBg: 'from-amber-500/30 via-orange-500/20 to-yellow-500/20',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
  },
  {
    id: '#04',
    label: 'Full-Stack Engineering',
    desc: 'Industry-aligned full-stack bootcamp & mentoring.',
    href: '/training/full-stack',
    shortCode: 'Web',
    cardBg: 'bg-[#fff1f2] dark:bg-[#260f17]/90 hover:bg-[#ffe4e6] dark:hover:bg-[#33141f] border-0',
    glowBg: 'from-pink-500/30 via-rose-500/20 to-purple-500/20',
    iconBg: 'bg-gradient-to-br from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30',
  },
];

const languages = [
  { label: 'English', code: 'EN', flag: '🇺🇸' },
  { label: 'Spanish', code: 'ES', flag: '🇪🇸' },
  { label: 'French', code: 'FR', flag: '🇫🇷' },
  { label: 'German', code: 'DE', flag: '🇩🇪' },
  { label: 'Tamil', code: 'TA', flag: '🇮🇳' },
];

function getShortCode(title = '', fallback = 'AI') {
  const t = title.toLowerCase();
  if (t.includes('ai') || t.includes('artificial')) return 'AI';
  if (t.includes('machine') || t.includes('ml')) return 'ML';
  if (t.includes('iot') || t.includes('hardware')) return 'IoT';
  if (t.includes('web') || t.includes('full-stack') || t.includes('mobile')) return 'Web';
  if (t.includes('cyber') || t.includes('security')) return 'Sec';
  if (t.includes('cloud')) return 'Cld';
  if (t.includes('r&d') || t.includes('research')) return 'R&D';
  if (t.includes('data')) return 'Data';
  return fallback;
}

function NavDropdown({ label, items = [], isOpen, onOpen, onClose }) {
  const location = useLocation();
  const safeItems = Array.isArray(items) ? items : [];
  const isActive = safeItems.some(item => location.pathname === item.href);

  // Dynamic collapse-proof grid layout calculation based on item count
  const getGridCols = (count) => {
    if (count === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <div className="relative static lg:static" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        className={`group relative flex items-center gap-1 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.08em] transition-all py-5 ${
          isOpen || isActive
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
        }`}
        onClick={onOpen}
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        {isOpen ? (
          <GoChevronUp className="text-[12px] text-purple-600 dark:text-purple-400 transition-transform duration-200" />
        ) : (
          <GoChevronDown className="text-[12px] text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-transform duration-200" />
        )}
      </button>

      {/* Floating Mega Dropdown Container (Collapse-Proof & Resilient Architecture) */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 top-[66px] w-[calc(100vw-2.5rem)] max-w-[1180px] max-h-[78vh] overflow-y-auto no-scrollbar bg-white/98 dark:bg-[#0b0914]/98 backdrop-blur-3xl border-0 rounded-[28px] shadow-2xl dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] z-50 transition-all duration-300 ease-out origin-top p-5 sm:p-6 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' : 'opacity-0 -translate-y-2 pointer-events-none scale-[0.98]'
        }`}
      >
        <div className={`grid gap-3.5 sm:gap-4 auto-rows-fr ${getGridCols(safeItems.length)}`}>
          {safeItems.map((item, idx) => {
            const glowBg = item.glowBg || 'from-purple-500/30 via-indigo-500/20 to-pink-500/20';

            return (
              <Link
                key={item.id || item.href || idx}
                to={item.href || '#'}
                onClick={onClose}
                className={`group relative overflow-hidden rounded-[20px] p-4 sm:p-4.5 flex flex-col justify-between h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-0 ${item.cardBg}`}
              >
                {/* Ambient Glowing Gradient Illustration Backdrop */}
                <div
                  className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${glowBg} blur-xl opacity-40 group-hover:opacity-90 group-hover:scale-150 transition-all duration-500 pointer-events-none`}
                />

                {/* Top Section: Icon Badge + Title + Description */}
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Top Row: Square Icon Box */}
                  <div className="mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-[11px] transition-transform group-hover:scale-110 shadow-xs ${item.iconBg}`}>
                      {item.shortCode || getShortCode(item.label || item.title)}
                    </div>
                  </div>

                  {/* Card Title */}
                  <h4 className="text-[13.5px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-1">
                    {item.label || item.title || 'Capability'}
                  </h4>

                  {/* Card Short Description */}
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-normal line-clamp-2">
                    {item.desc || item.shortDesc || 'Enterprise solutions architected for high performance.'}
                  </p>
                </div>

                {/* Bottom Action Indicator */}
                <div className="relative z-10 flex items-center justify-between text-[10.5px] font-extrabold text-purple-700 dark:text-purple-300 opacity-90 group-hover:opacity-100 transition-all duration-200 mt-3 border-0 shrink-0">
                  <span>Explore Solution</span>
                  <GoArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [dbServices, setDbServices] = useState([]);
  const [dbTraining, setDbTraining] = useState([]);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    async function loadDbData() {
      try {
        const [srvData, trData] = await Promise.all([
          fetchServices(),
          fetchTraining(),
        ]);
        if (Array.isArray(srvData) && srvData.length > 0) {
          setDbServices(srvData);
        }
        if (Array.isArray(trData) && trData.length > 0) {
          setDbTraining(trData);
        }
      } catch (err) {
        console.error('Failed to fetch DB data in Navbar:', err);
      }
    }
    loadDbData();
  }, []);

  const ICON_GRADIENT_PALETTES = [
    'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30',
    'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30',
    'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
    'bg-gradient-to-br from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30',
    'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30',
    'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30',
    'bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30',
    'bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-cyan-500/30',
  ];

  const dynamicServicesMenu = (dbServices && dbServices.length > 0)
    ? dbServices.map((item, idx) => {
        const fallback = servicesMenu[idx % servicesMenu.length] || servicesMenu[0];
        const itemSlug = item.slug || item._id || item.id || `service-${idx + 1}`;
        const itemTitle = item.title || fallback.label;
        const iconBg = (item.iconBg && !item.iconBg.includes('bg-white') && !item.iconBg.includes('bg-slate') && !item.iconBg.includes('bg-emerald-50') && !item.iconBg.includes('bg-gray'))
          ? item.iconBg
          : ICON_GRADIENT_PALETTES[idx % ICON_GRADIENT_PALETTES.length];

        return {
          id: `#0${idx + 1}`,
          label: itemTitle,
          desc: item.shortDesc || item.desc || fallback.desc,
          href: `/services/${itemSlug}`,
          shortCode: getShortCode(itemTitle, fallback.shortCode),
          cardBg: fallback.cardBg,
          glowBg: fallback.glowBg,
          iconBg: iconBg,
        };
      })
    : servicesMenu;

  const dynamicTrainingMenu = (dbTraining && dbTraining.length > 0)
    ? dbTraining.map((item, idx) => {
        const fallback = trainingMenu[idx % trainingMenu.length] || trainingMenu[0];
        const itemSlug = item.slug || item._id || item.id || `track-${idx + 1}`;
        const itemTitle = item.title || fallback.label;
        return {
          id: `#0${idx + 1}`,
          label: itemTitle,
          desc: item.shortDesc || item.desc || fallback.desc,
          href: `/training/${itemSlug}`,
          shortCode: getShortCode(itemTitle, fallback.shortCode),
          cardBg: fallback.cardBg,
          glowBg: fallback.glowBg,
          iconBg: fallback.iconBg,
        };
      })
    : trainingMenu;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  const open = (key) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const close = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
      {/* Fullscreen Backdrop Blur Overlay when dropdown is active */}
      <div
        className={`fixed inset-0 bg-slate-950/20 dark:bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpenMenu(null)}
      />

      {/* Header Container */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white dark:bg-[#07050e] shadow-md border-b border-slate-200/80 dark:border-slate-800/60 py-0'
            : 'bg-white dark:bg-[#07050e] border-b border-slate-100 dark:border-slate-800/40 py-0'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" aria-label="Porulon Tech Home">
              <Logo height={54} />
            </Link>
          </div>

          {/* Center: Desktop Clean Architecture Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <Link
              to="/"
              className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.08em] transition-colors py-5 ${
                location.pathname === '/'
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              HOME
            </Link>

            {/* SERVICES Mega Dropdown */}
            <NavDropdown
              label="SERVICES"
              items={dynamicServicesMenu}
              isOpen={openMenu === 'services'}
              onOpen={() => open('services')}
              onClose={close}
            />

            <Link
              to="/industries"
              className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.08em] transition-colors py-5 ${
                location.pathname === '/industries'
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              INDUSTRIES
            </Link>

            {/* PRODUCTS Link */}
            <Link
              to="/products"
              className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.08em] transition-colors py-5 ${
                location.pathname === '/products' || location.pathname === '/projects'
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              PRODUCTS
            </Link>

            {/* TRAINING Mega Dropdown */}
            <NavDropdown
              label="TRAINING"
              items={dynamicTrainingMenu}
              isOpen={openMenu === 'training'}
              onOpen={() => open('training')}
              onClose={close}
            />

            <Link
              to="/about"
              className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.08em] transition-colors py-5 ${
                location.pathname === '/about'
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              ABOUT
            </Link>

            <Link
              to="/blog"
              className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.08em] transition-colors py-5 ${
                location.pathname.startsWith('/blog')
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              BLOGS
            </Link>
          </nav>

          {/* Right: Glass Capsule for Language & Theme Toggle + Premium Contact Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
              {/* Compact Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="h-8 px-3 rounded-full bg-white dark:bg-[#151226] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition-all duration-200"
                  aria-label="Language selector"
                  title="Change language"
                >
                  <TbWorld className="text-[14px] text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="uppercase">{selectedLang.code}</span>
                  {langOpen ? (
                    <GoChevronUp className="text-[10px] text-purple-600 dark:text-purple-400 shrink-0" />
                  ) : (
                    <GoChevronDown className="text-[10px] text-slate-400 shrink-0" />
                  )}
                </button>

                {langOpen && (
                  <div className="absolute right-0 top-full mt-2.5 w-40 bg-white/95 dark:bg-[#0b0914]/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-1.5 z-50 animate-fade-in">
                    {languages.map((lang) => {
                      const isSelected = selectedLang.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                            isSelected
                              ? 'text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-sm">{lang.flag}</span>
                            <span>{lang.label}</span>
                          </span>
                          {isSelected && <HiCheck className="text-sm text-purple-600 dark:text-purple-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Single Icon Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Premium Contact Us Button */}
            <Link
              to="/contactus"
              className="hidden sm:inline-flex items-center justify-center h-9 px-5.5 sm:px-6 ml-2 sm:ml-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11.5px] xl:text-[12px] font-extrabold uppercase tracking-[0.08em] shadow-md shadow-purple-600/25 hover:shadow-purple-600/45 hover:scale-[1.03] active:scale-95 transition-all duration-200 gap-2 shrink-0"
            >
              <span>CONTACT US</span>
              <GoArrowRight className="text-sm transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="lg:hidden w-8.5 h-8.5 flex items-center justify-center rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-colors shrink-0"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <HiOutlineXMark className="text-lg" /> : <HiOutlineBars3 className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 border-t border-slate-200/40 dark:border-slate-800/40 ${
            mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-5 py-5 flex flex-col gap-3.5 bg-white/95 dark:bg-[#07050e]/95 backdrop-blur-2xl max-h-[80vh] overflow-y-auto">
            <Link
              to="/"
              className={`text-xs font-bold uppercase tracking-wider py-1 transition-colors ${
                location.pathname === '/' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              HOME
            </Link>

            {/* Accordion: SERVICES */}
            <details className="group">
              <summary className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 cursor-pointer list-none py-1">
                <span>SERVICES</span>
                <GoChevronDown className="text-sm text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 pl-2 flex flex-col gap-2 border-l-2 border-purple-500/20">
                {dynamicServicesMenu.map((s) => (
                  <Link
                    key={s.id || s.label}
                    to={s.href}
                    className={`p-3 rounded-2xl flex items-center gap-3 border-0 ${s.cardBg}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${s.iconBg}`}>
                      {s.shortCode}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                        {s.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </details>

            <Link
              to="/industries"
              className={`text-xs font-bold uppercase tracking-wider py-1 transition-colors ${
                location.pathname === '/industries' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              INDUSTRIES
            </Link>

            <Link
              to="/products"
              className={`text-xs font-bold uppercase tracking-wider py-1 transition-colors ${
                location.pathname === '/products' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              PROJECTS
            </Link>

            {/* Accordion: TRAINING */}
            <details className="group">
              <summary className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 cursor-pointer list-none py-1">
                <span>TRAINING</span>
                <GoChevronDown className="text-sm text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 pl-2 flex flex-col gap-2 border-l-2 border-purple-500/20">
                {dynamicTrainingMenu.map((s) => (
                  <Link
                    key={s.id || s.label}
                    to={s.href}
                    className={`p-3 rounded-2xl flex items-center gap-3 border-0 ${s.cardBg}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${s.iconBg}`}>
                      {s.shortCode}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                        {s.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </details>

            <Link
              to="/about"
              className={`text-xs font-bold uppercase tracking-wider py-1 transition-colors ${
                location.pathname === '/about' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              ABOUT
            </Link>

            <Link
              to="/blog"
              className={`text-xs font-bold uppercase tracking-wider py-1 transition-colors ${
                location.pathname.startsWith('/blog') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              BLOGS
            </Link>

            <Link
              to="/contactus"
              className={`text-xs font-bold uppercase tracking-wider py-1 transition-colors ${
                location.pathname === '/contact' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
