import { useState, useEffect, useRef } from 'react';
import SectionBackground from '../components/SectionBackground.jsx';
import GlowImage from '../components/GlowImage.jsx';
import { GoArrowRight } from 'react-icons/go';
import { fetchSections } from '../api/client.js';
import { getCleanMediaUrl } from '../utils/media.js';

function FormattedTitle({ title, defaultText, accentClass = "text-gradient font-normal", highlightWords = 2 }) {
  if (!title) {
    const parts = defaultText.split(' ');
    const mainText = parts.slice(0, parts.length - highlightWords).join(' ');
    const accentText = parts.slice(parts.length - highlightWords).join(' ');
    return (
      <>
        {mainText}{' '}
        <span className={accentClass}>{accentText}</span>
      </>
    );
  }
  const cleanTitle = title.trim();
  const words = cleanTitle.split(/\s+/);
  if (words.length <= highlightWords) {
    return <span className={accentClass}>{cleanTitle}</span>;
  }
  const mainWords = words.slice(0, words.length - highlightWords).join(' ');
  const accentWords = words.slice(words.length - highlightWords).join(' ');
  return (
    <>
      {mainWords}{' '}
      <span className={accentClass}>{accentWords}</span>
    </>
  );
}

function useCountUp(target, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    let raf, start;
    const timeout = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(
          target % 1 !== 0
            ? +(target * eased).toFixed(1)
            : Math.floor(target * eased)
        );
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);
  return value;
}

function useInViewOnce() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function StatCounter({ target, suffix, label, delay = 0 }) {
  const [ref, inView] = useInViewOnce();
  const count = useCountUp(inView ? target : 0, 1800, delay);

  return (
    <div ref={ref}>
      <div className="text-2xl sm:text-3xl font-light text-gradient tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs text-text-muted font-light mt-0.5">{label}</div>
    </div>
  );
}

import {
  HiOutlineHeart,
  HiOutlineBanknotes,
  HiOutlineBuildingOffice2,
  HiOutlineShoppingCart,
  HiOutlineTruck,
  HiOutlineBuildingOffice,
  HiOutlineSun,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineFilm,
  HiOutlineBuildingLibrary,
  HiCheckCircle,
} from 'react-icons/hi2';

const INDUSTRY_ICONS_MAP = {
  HiOutlineHeart: <HiOutlineHeart className="text-2xl" />,
  HiOutlineBanknotes: <HiOutlineBanknotes className="text-2xl" />,
  HiOutlineTruck: <HiOutlineTruck className="text-2xl" />,
  HiOutlineShoppingCart: <HiOutlineShoppingCart className="text-2xl" />,
  HiOutlineBuildingOffice2: <HiOutlineBuildingOffice2 className="text-2xl" />,
  HiOutlineShieldCheck: <HiOutlineShieldCheck className="text-2xl" />,
  HiOutlineSun: <HiOutlineSun className="text-2xl" />,
  HiOutlineAcademicCap: <HiOutlineAcademicCap className="text-2xl" />,
  HiOutlineBolt: <HiOutlineBolt className="text-2xl" />,
  HiOutlineFilm: <HiOutlineFilm className="text-2xl" />,
  HiOutlineBuildingLibrary: <HiOutlineBuildingLibrary className="text-2xl" />,
};

const renderIndustryIcon = (ind) => {
  if (typeof ind === 'object' && ind.icon && INDUSTRY_ICONS_MAP[ind.icon]) {
    return INDUSTRY_ICONS_MAP[ind.icon];
  }
  const name = typeof ind === 'string' ? ind : (ind.title || ind.name || '');
  if (name.includes('Health')) return <HiOutlineHeart className="text-2xl" />;
  if (name.includes('Finan') || name.includes('Bank')) return <HiOutlineBanknotes className="text-2xl" />;
  if (name.includes('Supply') || name.includes('Logistics')) return <HiOutlineTruck className="text-2xl" />;
  if (name.includes('Retail') || name.includes('Commerce')) return <HiOutlineShoppingCart className="text-2xl" />;
  if (name.includes('Manufacturing')) return <HiOutlineBuildingOffice2 className="text-2xl" />;
  if (name.includes('Defense') || name.includes('Aerospace')) return <HiOutlineShieldCheck className="text-2xl" />;
  if (name.includes('Energy')) return <HiOutlineBolt className="text-2xl" />;
  if (name.includes('Media')) return <HiOutlineFilm className="text-2xl" />;
  if (name.includes('Government')) return <HiOutlineBuildingLibrary className="text-2xl" />;
  return <HiOutlineBuildingOffice className="text-2xl" />;
};

const industries = [
  {
    title: 'Healthcare & MedTech',
    category: 'Finance & Health',
    tagline: 'AI diagnostics, patient analytics & workflow automation',
    desc: 'From medical imaging analysis to drug discovery and patient outcome prediction, our healthcare AI solutions improve clinical accuracy and enable personalized medicine at scale.',
    points: ['Medical image analysis', 'Clinical decision support', 'Risk stratification', 'Drug interaction AI'],
    img: '/images/industry-healthcare.jpg',
    icon: 'HiOutlineHeart',
  },
  {
    title: 'Finance & Banking',
    category: 'Finance & Health',
    tagline: 'Fraud detection, risk modeling & algorithmic trading',
    desc: 'Our financial AI platforms process millions of transactions in real-time, identifying patterns invisible to human analysts while ensuring strict compliance with regulations.',
    points: ['Real-time fraud detection', 'Credit risk modeling', 'Algorithmic trading', 'Compliance automation'],
    img: '/images/industry-finance.jpg',
    icon: 'HiOutlineBanknotes',
  },
  {
    title: 'Supply Chain & Logistics',
    category: 'Operations & Logistics',
    tagline: 'Predictive routing, demand forecasting & warehouse IoT',
    desc: 'End-to-end supply chain visibility powered by machine learning algorithms that optimize inventory levels, predict delivery delays, and automate warehouse operations.',
    points: ['Demand forecasting', 'Dynamic route optimization', 'Warehouse automation', 'Fleet telemetry AI'],
    img: '/images/industry-supplychain.jpg',
    icon: 'HiOutlineTruck',
  },
  {
    title: 'Retail & E-Commerce',
    category: 'Digital & Security',
    tagline: 'Personalization engines, dynamic pricing & visual search',
    desc: 'Deliver individualized shopping experiences to millions of users simultaneously with real-time recommendation engines, automated inventory sync, and intelligent pricing.',
    points: ['Hyper-personalization', 'Dynamic price optimization', 'Visual product search', 'Automated support bots'],
    img: '/images/industry-ecommerence.png',
    icon: 'HiOutlineShoppingCart',
  },
  {
    title: 'Smart Manufacturing',
    category: 'Operations & Logistics',
    tagline: 'Predictive maintenance, computer vision QA & digital twins',
    desc: 'Transform factory operations with Industry 4.0 IoT sensors and computer vision models that detect assembly defects in milliseconds and prevent unscheduled downtime.',
    points: ['Predictive maintenance', 'Visual defect inspection', 'Yield optimization', 'Supply chain twin'],
    img: '/images/industry-manufacturing.png',
    icon: 'HiOutlineBuildingOffice2',
  },
  {
    title: 'Aerospace & Defense',
    category: 'Digital & Security',
    tagline: 'Mission critical analytics, autonomous flight & air-gap security',
    desc: 'High-reliability software architectures engineered to meet strict military-grade security compliance, autonomous telemetry analysis, and air-gapped system isolation.',
    points: ['Autonomous systems', 'Mission analytics', 'Air-gapped security', 'Telemetry diagnostics'],
    img: '/images/service-cyber.jpg',
    icon: 'HiOutlineShieldCheck',
  },
];

export default function Industries() {
  const [dbSections, setDbSections] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchSections('industries')
      .then((data) => {
        if (data && Array.isArray(data)) {
          const secMap = {};
          data.forEach((s) => {
            if (s.sectionKey) secMap[s.sectionKey] = s;
          });
          setDbSections(secMap);
        } else {
          setDbSections({});
        }
      })
      .catch((err) => {
        console.error('Failed to fetch industries sections:', err);
        setDbSections({});
      });
  }, []);

  const heroSec = dbSections?.industries_hero;
  const gridSec = dbSections?.industries_grid;
  const ctaSec = dbSections?.industries_cta;

  const isLoaded = dbSections !== null;
  const showHero = !isLoaded || !!heroSec;
  const showGrid = !isLoaded || !!gridSec;
  const showCta = !isLoaded || !!ctaSec;

  const displayIndustriesList = (gridSec?.items && gridSec.items.length > 0)
    ? gridSec.items.map((item) => ({
        title: item.title || item.name || 'Industry',
        category: item.category || '',
        tagline: item.tagline || '',
        desc: item.desc || '',
        points: item.points?.length ? item.points : [],
        img: (item.img && item.img.trim()) ? item.img : (item.mediaUrl && item.mediaUrl.trim()) ? item.mediaUrl : null,
        icon: item.icon,
        ctaText: item.ctaText || 'Discuss Solution',
        ctaLink: item.ctaLink || '/contact',
      }))
    : isLoaded
    ? []
    : industries;

  const categories = ['All', ...new Set(displayIndustriesList.map(i => i.category || 'General'))];

  const filteredIndustries = activeCategory === 'All'
    ? displayIndustriesList
    : displayIndustriesList.filter((ind) => ind.category === activeCategory);

  return (
    <main className="relative overflow-hidden font-sans">
      {/* ===== HERO SECTION ===== */}
      {showHero && (
        <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          {/* Background Image/Video & Ambient Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {(() => {
              const fullUrl = getCleanMediaUrl(heroSec?.mediaUrl);
              if (!fullUrl) return <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19] via-[#111827] to-[#0b0f19]" />;
              const lower = fullUrl.toLowerCase();
              const isVideo = lower.endsWith('.mp4') || lower.endsWith('.webm');

              if (isVideo) {
                return (
                  <video
                    key={fullUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-opacity duration-500"
                  >
                    <source src={fullUrl} />
                  </video>
                );
              }
              return (
                <img
                  src={fullUrl}
                  alt="Industry Banner"
                  className="w-full h-full object-cover object-right md:object-center opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-transform duration-1000"
                />
              );
            })()}
            {/* High Contrast Dark Overlay so White Text is 100% Crystal Clear in both Light and Dark Themes */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-transparent" />
            
            {/* Top & Bottom seamless blending gradients (Soft, Light & Line-Free) */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg via-bg/40 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none z-10" />

            {/* Soft ambient glow behind left content */}
            <div className="absolute -left-20 top-1/3 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[120px] pointer-events-none z-10" />
          </div>

          {/* Content Container (Left Aligned with Bright High-Contrast Text) */}
          <div className="max-w-container mx-auto px-gutter relative z-20 w-full">
            <div className="max-w-2xl text-left" data-aos="fade-right">
              {/* Kicker Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase mb-4 shadow-sm">
                <HiOutlineBuildingOffice2 className="text-sm text-purple-400" />
                <span>{heroSec?.badge || heroSec?.kicker || "Cross-Sector Solutions"}</span>
              </div>

              {/* Main Headline Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white mb-5 leading-[1.12] drop-shadow-md">
                <FormattedTitle
                  title={heroSec?.title}
                  defaultText="Transforming Every Sector With Intelligent Technology"
                  accentClass="text-purple-400 font-normal"
                  highlightWords={2}
                />
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal tracking-tight mb-8 max-w-xl">
                {heroSec?.subtitle || "Our AI and automation platforms are purpose-built to solve high-impact challenges, regulatory constraints, and operational bottlenecks across global enterprise sectors."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {(heroSec?.buttons?.length ? heroSec.buttons : [
                  { label: 'Explore Industries', link: '#industries-list' },
                  { label: 'Schedule Consultation', link: '/contact' }
                ]).map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.link || "/contact"}
                    className={
                      idx === 0
                        ? "group no-underline px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/35 hover:shadow-purple-600/55 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2"
                        : "no-underline px-7 py-3.5 rounded-full bg-white/90 dark:bg-white/15 backdrop-blur-md text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm tracking-wide hover:border-purple-500/60 transition-all duration-300 border border-slate-300 dark:border-white/30 hover:scale-[1.03] active:scale-95 flex items-center gap-2 shadow-md"
                    }
                  >
                    <span>{btn.label}</span>
                    {idx === 0 && <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />}
                  </a>
                ))}
              </div>

              {/* Quick Metrics (Animated Counters - Clean Line-Less Floating Proportions) */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-2 max-w-lg">
                {(heroSec?.stats?.length ? heroSec.stats : [
                  { label: "Sectors Served", value: "12+" },
                  { label: "Uptime & Reliability", value: "99.9%" },
                  { label: "Custom AI Models", value: "100%" }
                ]).map((st, idx) => {
                  const valNum = parseFloat(st.value) || (idx === 0 ? 12 : idx === 1 ? 99.9 : 100);
                  const suffixStr = st.value ? String(st.value).replace(/[0-9.]/g, '') : '%';
                  return (
                    <StatCounter
                      key={idx}
                      target={valNum}
                      suffix={suffixStr || '%'}
                      label={st.label}
                      delay={100 + idx * 150}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== INDUSTRIES GRID SHOWCASE ===== */}
      {showGrid && (
        <section id="industries-list" className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12" data-aos="fade-up">
              <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2.5 shadow-2xs">
                {gridSec?.kicker || "Target Markets"}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-text tracking-tight mt-2">
                <FormattedTitle
                  title={gridSec?.title}
                  defaultText="Industries We Empower"
                  accentClass="text-gradient font-normal"
                  highlightWords={2}
                />
              </h2>
              {gridSec?.subtitle && (
                <p className="text-text-muted text-xs sm:text-sm mt-3 max-w-xl mx-auto font-light leading-relaxed">
                  {gridSec.subtitle}
                </p>
              )}
            </div>

            {/* Category Filter Pills */}
            {/* <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                      isActive
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30 scale-105'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div> */}

            {/* 3-Column Glass Bento Grid with Home Page 3D Card Effects & Blink Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredIndustries.map((ind, i) => {
                const mediaPath = getCleanMediaUrl(ind.img || ind.mediaUrl);
                return (
                  <div
                    key={ind.title || i}
                    className="rounded-3xl overflow-hidden group flex flex-col justify-between glass-card bg-white/80 dark:bg-[#0c091d]/85 backdrop-blur-xl relative shadow-xl hover:-translate-y-2.5 hover:shadow-[0_25px_60px_rgba(124,58,237,0.25)] transition-all duration-500"
                    data-aos="fade-up"
                    data-aos-delay={(i % 3) * 80}
                  >
                    {/* Subtle Ambient Glow Orb (Matching Home Page 3D Card Effect) */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/20 dark:bg-purple-500/30 blur-2xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none z-0" />

                    {/* Dynamic 3D Blink / Shimmer Sweep Overlay (Exact Home Page Effect) */}
                    <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(120deg, transparent 30%, rgba(124,58,237,0.18) 50%, transparent 70%)",
                          backgroundSize: "200% 200%",
                          animation: "shineSweep 3.5s ease-in-out infinite",
                        }}
                      />
                    </div>

                    {/* Card Content Container */}
                    <div className="relative z-10">
                      {/* Uniform Header Banner (Image if available, Ambient Glass Vector if no image) */}
                      <div className="overflow-hidden relative h-44 sm:h-48 bg-slate-950">
                        {mediaPath ? (
                          <img
                            src={mediaPath}
                            alt={ind.title}
                            className="w-full h-full object-cover group-hover:scale-105 brightness-95 group-hover:brightness-105 transition-transform duration-700 relative z-10"
                            onError={(e) => {
                              // If image fails to load, hide image element so underlying ambient banner shows
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : null}

                        {/* Ambient Glass Graphic Vector Banner (Shows if no image or image fails) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/35 via-indigo-950/50 to-[#0c091d] p-5 flex flex-col justify-between items-start z-0">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 shadow-sm">
                            {renderIndustryIcon(ind)}
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-400/80 block mb-0.5">Enterprise Architecture</span>
                            <h4 className="text-sm font-medium text-white/90 tracking-tight">{ind.title}</h4>
                          </div>
                        </div>

                        {/* Dark Gradient Overlay for text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c091d] via-transparent to-transparent z-10 opacity-90 pointer-events-none" />
                        
                        {/* Category Badge Pill */}
                        {ind.category && (
                          <span className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white shadow-sm">
                            {ind.category}
                          </span>
                        )}
                      </div>

                      {/* Overlapping Floating 3D Icon Badge (Always perfectly aligned at -mt-7) */}
                      <div className="-mt-7 ml-6 flex items-center justify-between pr-6 relative z-20">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center text-xl shadow-xl shadow-purple-600/35 border border-white/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                          {renderIndustryIcon(ind)}
                        </div>
                      </div>

                      {/* Clean Content Body */}
                      <div className="p-6 pt-3 flex flex-col">
                        <div className="mb-2.5">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {ind.title}
                          </h3>
                          {ind.tagline && (
                            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 tracking-tight mt-0.5 line-clamp-1">
                              {ind.tagline}
                            </p>
                          )}
                        </div>

                        {ind.desc && (
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm font-light tracking-tight line-clamp-3 mb-4">
                            {ind.desc}
                          </p>
                        )}

                        {/* Bullet Chips Grid (Collapsible if empty) */}
                        {ind.points?.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-4 pt-3">
                            {ind.points.map((p, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 font-medium bg-slate-100/80 dark:bg-white/5 px-2.5 py-1.5 rounded-xl"
                              >
                                <HiCheckCircle className="text-purple-600 dark:text-purple-400 text-sm shrink-0" />
                                <span className="truncate">{p}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Action Link Footer (Anchored at Bottom for Perfect Vertical Alignment) */}
                    <div className="px-6 pb-6 pt-0 relative z-10">
                      <a
                        href={ind.ctaLink || '/contact'}
                        className="pt-1 flex items-center justify-between group/link no-underline"
                      >
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400 transition-colors">
                          {ind.ctaText || 'Discuss Solution'}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover/link:bg-purple-600 group-hover/link:text-white transition-all duration-300 shadow-sm">
                          <GoArrowRight className="text-xs group-hover/link:translate-x-0.5 transition-transform" />
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <style>{`
              @keyframes shineSweep {
                0% { background-position: -100% -100%; }
                50% { background-position: 200% 200%; }
                100% { background-position: -100% -100%; }
              }
            `}</style>
          </div>
        </section>
      )}

      {/* ===== DON'T SEE YOUR INDUSTRY CTA ===== */}
      {showCta && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="glass-card bg-white/70 dark:bg-[#0b0914]/80 backdrop-blur-2xl rounded-3xl md:rounded-[36px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border border-purple-500/20 shadow-2xl" data-aos="zoom-in">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] aurora-blur opacity-25 pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto">
                {(ctaSec?.kicker || "Custom Architectural Engagements") && (
                  <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-2xs">
                    {ctaSec?.kicker || "Custom Architectural Engagements"}
                  </span>
                )}

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight mb-4 leading-tight">
                  <FormattedTitle
                    title={ctaSec?.title}
                    defaultText="Don't See Your Industry?"
                    accentClass="text-gradient font-normal"
                    highlightWords={2}
                  />
                </h2>

                <p className="text-sm sm:text-base text-text-muted mb-8 max-w-xl mx-auto leading-relaxed font-light tracking-tight">
                  {ctaSec?.subtitle || "Our AI and engineering capabilities span bespoke enterprise domains. Connect with our technical directors to build custom AI architectures for your niche sector."}
                </p>

                <div className="flex flex-wrap gap-4 justify-center items-center">
                  {(ctaSec?.buttons?.length ? ctaSec.buttons : [
                    { label: "Talk to Our Team", link: "/contact" },
                    { label: "View Our Services", link: "/services" }
                  ]).map((btn, idx) => (
                    <a
                      key={idx}
                      href={btn.link || "/contact"}
                      className={
                        idx === 0
                          ? "group px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 no-underline"
                          : "px-8 py-3.5 rounded-full glass-card text-text font-bold text-xs sm:text-sm tracking-wide hover:border-purple-500/50 transition-all duration-300 border border-slate-200 dark:border-white/10 hover:scale-105 active:scale-95 flex items-center gap-2 no-underline"
                      }
                    >
                      <span>{btn.label || "Learn More"}</span>
                      {idx === 0 && <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
