import { useState, useEffect, useRef } from "react";
import GlowImage from '../components/GlowImage.jsx';
import { fetchSections } from '../api/client.js';
import { useContactModal } from '../contexts/ContactModalContext.jsx';
import { getCleanMediaUrl } from '../utils/media.js';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';
import {
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineHandRaised,
  HiOutlineGlobeAlt,
  HiOutlineCalendar,
  HiOutlineRocketLaunch,
  HiOutlineBuildingOffice2,
  HiOutlineAcademicCap,
  HiOutlineCpuChip,
  HiCheckCircle,
} from 'react-icons/hi2';

function FormattedTitle({ title, defaultText, accentClass = "text-purple-600 dark:text-purple-400 font-normal", highlightWords = 2 }) {
  const text = title || defaultText;
  if (!text) return null;

  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return text;

  const count = Math.min(highlightWords, words.length - 1);
  const mainWords = words.slice(0, words.length - count).join(' ');
  const accentWords = words.slice(words.length - count).join(' ');

  return (
    <>
      {mainWords}{' '}
      <span className={accentClass}>{accentWords}</span>
    </>
  );
}

export const renderAboutIcon = (iconName, customClass) => {
  const iconCls = customClass || "text-xl text-white drop-shadow-xs";
  switch (iconName) {
    case 'HiOutlineRocketLaunch':
      return <HiOutlineRocketLaunch className={iconCls} />;
    case 'HiOutlineBuildingOffice2':
      return <HiOutlineBuildingOffice2 className={iconCls} />;
    case 'HiOutlineGlobeAlt':
      return <HiOutlineGlobeAlt className={iconCls} />;
    case 'HiOutlineAcademicCap':
      return <HiOutlineAcademicCap className={iconCls} />;
    case 'HiOutlineShieldCheck':
      return <HiOutlineShieldCheck className={iconCls} />;
    case 'HiOutlineCpuChip':
      return <HiOutlineCpuChip className={iconCls} />;
    case 'HiOutlineSparkles':
      return <HiOutlineSparkles className={iconCls} />;
    case 'HiOutlineLightBulb':
      return <HiOutlineLightBulb className={iconCls} />;
    case 'HiOutlineUsers':
      return <HiOutlineUsers className={iconCls} />;
    case 'HiOutlineHandRaised':
      return <HiOutlineHandRaised className={iconCls} />;
    default:
      return <HiOutlineSparkles className={iconCls} />;
  }
};

function useCountUp(target, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target && target !== 0) return;
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
    if (!el) {
      setInView(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
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
      <div className="text-xs text-slate-900 dark:text-slate-200 font-normal mt-0.5">{label}</div>
    </div>
  );
}

const defaultStats = [
  { n: '15+', l: 'Projects Delivered', icon: 'HiOutlineRocketLaunch' },
  { n: '10+', l: 'Enterprise Clients', icon: 'HiOutlineBuildingOffice2' },
  { n: '3+', l: 'Industries Served', icon: 'HiOutlineGlobeAlt' },
  { n: '500+', l: 'Students Trained', icon: 'HiOutlineAcademicCap' },
  { n: '99.9%', l: 'System Uptime', icon: 'HiOutlineShieldCheck' },
  { n: '10+', l: 'AI/ML Engineers', icon: 'HiOutlineCpuChip' },
];

const defaultValues = [
  { icon: 'HiOutlineSparkles', title: 'Mission-Driven', desc: 'We build technology that solves real problems and delivers measurable business outcomes for every client.' },
  { icon: 'HiOutlineLightBulb', title: 'Innovation First', desc: 'Continuous R&D ensures our solutions leverage the latest advancements in AI, ML, and automation.' },
  { icon: 'HiOutlineUsers', title: 'People-Centric', desc: 'From training young minds to empowering enterprise teams, people are at the heart of everything we do.' },
  { icon: 'HiOutlineShieldCheck', title: 'Trusted & Secure', desc: 'Enterprise-grade security and compliance standards protect your data and operations at every layer.' },
  { icon: 'HiOutlineHandRaised', title: 'Client Partnership', desc: "We view every engagement as a long-term partnership, aligning our success with our clients' growth." },
  { icon: 'HiOutlineGlobeAlt', title: 'Global Perspective', desc: 'We serve diverse industries worldwide, bringing cross-sector insights to every solution we build.' },
];

const defaultHeroSlides = [
  {
    kicker: 'About Porulon Technologies',
    title: 'Where Deep Tech Meets A Human-Centric Mindset',
    subtitle: 'We design, engineer, and deploy high-concurrency AI engines, cloud microservices, and smart hardware telemetry for global enterprise leaders.',
    mediaUrl: '',
    buttons: [
      { label: 'Explore Our Story', link: '#our-story' },
      { label: 'Contact Leadership', link: '/contactus' }
    ]
  },
  {
    kicker: 'AI Engineering & Innovation',
    title: 'Empowering Businesses With Autonomous Intelligence',
    subtitle: 'From bespoke neural network training to zero-trust cloud infrastructure, our principal architects build mission-critical digital systems.',
    mediaUrl: '',
    buttons: [
      { label: 'View Capabilities', link: '/services' },
      { label: 'Talk to an Expert', link: '/contactus' }
    ]
  },
  {
    kicker: 'Academy & Talent Mentorship',
    title: 'Cultivating The Next Generation Of Deep Tech Leaders',
    subtitle: 'Our mentor-led technical bootcamps bridge the gap between academic theory and enterprise engineering excellence.',
    mediaUrl: '',
    buttons: [
      { label: 'Explore Academy', link: '/training' },
      { label: 'Enroll In Cohort', link: '/contactus' }
    ]
  }
];

export default function About() {
  const { openModal } = useContactModal();

  const handleContactClick = (e, link) => {
    if (link === '/contactus' || link === '/contactus/') {
      e.preventDefault();
      openModal();
    }
  };

  const [dbSections, setDbSections] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchSections('about')
      .then((data) => {
        if (data && Array.isArray(data)) {
          const secMap = {};

          data.forEach((s) => {
            if (s.sectionKey) {
              secMap[s.sectionKey] = s;
            }
          });

          setDbSections(secMap);
        } else {
          setDbSections({});
        }

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to fetch about sections:', err);
        setDbSections({});
        setIsLoaded(true);
      });
  }, []);

  const heroSec = dbSections?.about_hero;
  const storySec = dbSections?.about_story;
  const statsSec = dbSections?.about_stats;
  const valuesSec = dbSections?.about_values;
  const ctaSec = dbSections?.about_cta;

  const hasPageConfig = dbSections && Object.keys(dbSections).length > 0;

  const isSecVisible = (sec) => {
    if (sec) {
      if (sec.isActive === false || sec.visible === false || sec.enabled === false || sec.isArchived === true) {
        return false;
      }
      return true;
    }
    if (hasPageConfig) return false;
    return true;
  };

  const showHero = isSecVisible(heroSec);
  const showStory = isSecVisible(storySec);
  const showStats = isSecVisible(statsSec);
  const showValues = isSecVisible(valuesSec);
  const showCta = isSecVisible(ctaSec);

  // Process Hero Slides
  const heroSlides = (heroSec?.slides && heroSec.slides.length > 0)
    ? heroSec.slides
    : (heroSec?.items && heroSec.items.length > 0)
    ? heroSec.items.map(item => ({
        kicker: item.kicker || heroSec?.kicker || 'About Porulon Technologies',
        title: item.title || item.name || heroSec?.title || 'Where Deep Tech Meets A Human-Centric Mindset',
        subtitle: item.subtitle || item.desc || heroSec?.subtitle || 'We design, engineer, and deploy high-concurrency AI engines...',
        mediaUrl: item.mediaUrl || item.img || heroSec?.mediaUrl || '',
        buttons: item.buttons?.length ? item.buttons : heroSec?.buttons?.length ? heroSec.buttons : [{ label: 'Explore Our Story', link: '#our-story' }]
      }))
    : defaultHeroSlides;

  // Auto-Slide Timer for Hero Carousel (6 seconds)
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const activeSlideData = heroSlides[currentSlide] || heroSlides[0] || {};

  const displayStats = (statsSec?.items && statsSec.items.length > 0)
    ? statsSec.items.map((item, idx) => ({
        n: item.n || item.value || defaultStats[idx]?.n || '0',
        l: item.l || item.label || defaultStats[idx]?.l || 'Stat',
        icon: item.icon || defaultStats[idx]?.icon || 'HiOutlineSparkles',
      }))
    : defaultStats;

  const displayValues = (valuesSec?.items && valuesSec.items.length > 0)
    ? valuesSec.items.map((item, idx) => ({
        icon: item.icon || defaultValues[idx]?.icon || 'HiOutlineSparkles',
        title: item.title || item.name || defaultValues[idx]?.title || 'Value',
        desc: item.desc || defaultValues[idx]?.desc || '',
      }))
    : defaultValues;

  const heroMetrics = (heroSec?.stats && heroSec.stats.length > 0)
    ? heroSec.stats
    : (heroSec?.items && heroSec.items.length > 0)
    ? heroSec.items
    : [
        { n: '15+', l: 'Projects Delivered' },
        { n: '10+', l: 'Enterprise Clients' },
        { n: '500+', l: 'Students Trained' },
        { n: '99.9%', l: 'System Uptime' },
      ];

  return (
    <main className="relative overflow-hidden font-sans">
      {/* ===== SECTION 1 — HERO CAROUSEL SECTION ===== */}
      {showHero && (
        <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 md:pt-40 pb-24 md:pb-32 overflow-hidden bg-[#070512]">
          {/* Background Media & Ambient Veils (Auto-sliding Slides & Collapse-Proof Fallback) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {(() => {
              const slideMedia = getCleanMediaUrl(activeSlideData.mediaUrl);
              if (!slideMedia) {
                return (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414]">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
                  </div>
                );
              }
              const lower = slideMedia.toLowerCase();
              const isVideo = lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov');

              if (isVideo) {
                return (
                  <video
                    key={slideMedia}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-opacity duration-700"
                  >
                    <source src={slideMedia} />
                  </video>
                );
              }
              return (
                <img
                  key={slideMedia}
                  src={slideMedia}
                  alt={activeSlideData.title || "About Hero Background"}
                  onError={(e) => { e.target.style.display = 'none'; }}
                  className="w-full h-full object-cover object-right md:object-center opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-transform duration-1000"
                />
              );
            })()}

            {/* Soft Translucent Glass Overlay for Ultra-Bright Media Visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-transparent dark:from-[#070512]/85 dark:via-[#070512]/60 dark:to-transparent" />
            
            {/* Top & Bottom Seamless Blending Gradients */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg via-bg/70 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg via-bg/70 to-transparent pointer-events-none z-10" />

            {/* Soft Ambient Glow */}
            <div className="absolute -left-20 top-1/3 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[120px] pointer-events-none z-10" />
          </div>

          {/* Slide Content Container (100% Collapse-Proof Layout) */}
          <div className="max-w-container mx-auto px-gutter relative z-20 w-full">
            <div className="max-w-2xl text-left" data-aos="fade-right">
              {/* Slide Kicker Badge (Skip if empty) */}
              {(activeSlideData.kicker || heroSec?.kicker) && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 backdrop-blur-md border border-purple-500/40 text-purple-700 dark:text-purple-300 text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase mb-4 shadow-sm">
                  <HiOutlineSparkles className="text-sm text-purple-600 dark:text-purple-400" />
                  <span>{activeSlideData.kicker || heroSec?.kicker}</span>
                </div>
              )}

              {/* Slide Main Headline Title (Never Collapses) */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.12] drop-shadow-sm">
                <FormattedTitle
                  title={activeSlideData.title || heroSec?.title}
                  defaultText="Where Deep Tech Meets A Human-Centric Mindset"
                  accentClass="text-purple-600 dark:text-purple-400 font-normal"
                  highlightWords={2}
                />
              </h1>

              {/* Slide Subtitle Description (Skip if empty) */}
              {(activeSlideData.subtitle || heroSec?.subtitle) && (
                <p className="text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed font-normal tracking-tight mb-8 max-w-xl">
                  {activeSlideData.subtitle || heroSec?.subtitle}
                </p>
              )}

              {/* Action Buttons (Collapse-Proof Flex Wrap) */}
              {((activeSlideData.buttons?.length ? activeSlideData.buttons : heroSec?.buttons?.length ? heroSec.buttons : [])).length > 0 && (
                <div className="flex flex-wrap items-center gap-4">
                  {((activeSlideData.buttons?.length ? activeSlideData.buttons : heroSec?.buttons?.length ? heroSec.buttons : [])).map((btn, idx) => (
                    <a
                      key={idx}
                      href={btn.link || "/contactus"}
                      onClick={(e) => handleContactClick(e, btn.link || "/contactus")}
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
              )}

              {/* Quick Metrics (Animated Counters - Skip if empty) */}
              {heroMetrics?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-2 max-w-xl">
                  {heroMetrics.map((st, idx) => {
                    const numStr = String(st.n || st.value || st.number || '0');
                    const valNum = parseFloat(numStr) || (idx === 0 ? 15 : idx === 1 ? 10 : idx === 2 ? 500 : 99.9);
                    const suffixStr = numStr.replace(/[0-9.]/g, '') || '%';
                    return (
                      <StatCounter
                        key={idx}
                        target={valNum}
                        suffix={suffixStr}
                        label={st.l || st.label}
                        delay={100 + idx * 120}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </section>
      )}

      {/* ===== SECTION 2 — OUR STORY & JOURNEY ===== */}
      {showStory && (
        <section id="our-story" className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="glass-card bg-white/80 dark:bg-[#0c091d]/85 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 border border-slate-200/80 dark:border-white/10 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Side: Story Details (Skip empty items cleanly) */}
                <div data-aos="fade-right">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-2xs">
                    {storySec?.kicker || 'Our Journey & Conviction'}
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-text tracking-tight mt-2 mb-6 leading-tight">
                    <FormattedTitle
                      title={storySec?.title}
                      defaultText="Built On One Clear Conviction"
                      accentClass="text-gradient font-normal"
                      highlightWords={2}
                    />
                  </h2>
                  
                  <div className="text-base text-text-muted leading-relaxed font-light mb-6 space-y-3 text-pretty">
                    {(storySec?.subtitle || 'Porulon Technologies was founded with a clear conviction: that the transformative power of Artificial Intelligence and Machine Learning should be accessible to businesses of every size.')
                      .split(/\n\n|\n/)
                      .filter(Boolean)
                      .map((para, pIdx) => (
                        <p key={pIdx} className="leading-relaxed font-light text-pretty">
                          {para.trim()}
                        </p>
                      ))}
                  </div>

                  {storySec?.content && (
                    <div className="text-base text-text-muted leading-relaxed font-light mb-8 space-y-3 text-pretty">
                      {storySec.content
                        .split(/\n\n|\n/)
                        .filter(Boolean)
                        .map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed font-light text-pretty">
                            {para.trim()}
                          </p>
                        ))}
                    </div>
                  )}

                  {/* Key Milestone Chips */}
                  <div className="grid sm:grid-cols-3 gap-3 pt-2 mb-8">
                    {((storySec?.points && storySec.points.length > 0) ? storySec.points : ['Bespoke AI Models', 'Enterprise Automation', 'Academy Programs']).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.05] border border-slate-200/50 dark:border-white/10 hover:border-purple-500/40 transition-colors">
                        <HiCheckCircle className="text-purple-600 dark:text-purple-400 text-lg shrink-0" />
                        <span className="text-xs font-medium text-text truncate">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Optional Action Button */}
                  {storySec?.buttons?.length > 0 ? (
                    storySec.buttons.map((btn, bIdx) => (
                      <a
                        key={bIdx}
                        href={btn.link || "/contactus"}
                        onClick={(e) => handleContactClick(e, btn.link || "/contactus")}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/30 hover:scale-105 transition-all no-underline"
                      >
                        <span>{btn.label}</span>
                        <GoArrowRight className="text-base" />
                      </a>
                    ))
                  ) : (
                    <a
                      href="/contactus"
                      onClick={(e) => handleContactClick(e, "/contactus")}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/30 hover:scale-105 transition-all no-underline"
                    >
                      <span>Talk to Leadership</span>
                      <GoArrowRight className="text-base" />
                    </a>
                  )}
                </div>

                {/* Right Side: Media Frame with 3D Hover & Fallback Blueprint Card */}
                <div className="relative group" data-aos="fade-left">
                  <div className="absolute -inset-4 bg-purple-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
                  
                  {/* Locked Height Frame — 100% Collapse-Proof for any image ratio/size */}
                  <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/15 w-full h-[320px] sm:h-[380px] md:h-[440px] bg-slate-950 flex items-center justify-center">
                    {getCleanMediaUrl(storySec?.mediaUrl) ? (
                      <GlowImage
                        src={getCleanMediaUrl(storySec?.mediaUrl)}
                        alt="Porulon Technologies team"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        rounded="rounded-none"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}

                    {/* Resilient 3D Vector Blueprint Graphic if Image is absent/failed */}
                    <div className={`${getCleanMediaUrl(storySec?.mediaUrl) ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414] p-8 flex-col justify-between items-start z-0`}>
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <HiOutlineBuildingOffice2 className="text-3xl" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 block mb-1">Corporate Blueprint</span>
                        <h4 className="text-xl font-light text-white tracking-tight">Porulon Innovation Studio</h4>
                      </div>
                      <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 rounded-full" />
                    </div>
                  </div>

                  {/* Glass Floating Overlap Badge Card (100% DB-driven, Visible on all screens) */}
                  {(storySec?.badgeTitle || storySec?.badgeSubtitle || storySec?.items?.[0]?.title) && (
                    <div className="absolute -bottom-5 sm:-bottom-6 left-4 sm:left-6 md:-left-6 z-20 flex items-center gap-3.5 sm:gap-4 bg-white/95 dark:bg-[#0c091d]/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(124,58,237,0.25)] border border-slate-200/90 dark:border-purple-500/30 group-hover:-translate-y-1.5 transition-all duration-300 max-w-[90%] sm:max-w-xs">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/40 border border-white/20">
                        {renderAboutIcon(storySec?.badgeIcon || 'HiOutlineCalendar', "text-xl sm:text-2xl text-white drop-shadow-xs")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm tracking-tight truncate">
                          {storySec?.badgeTitle || storySec?.items?.[0]?.title || 'Established 2026'}
                        </div>
                        <div className="text-text-muted text-[11px] sm:text-xs font-light mt-0.5 leading-snug line-clamp-2">
                          {storySec?.badgeSubtitle || storySec?.items?.[0]?.subtitle || storySec?.items?.[0]?.desc || 'Delivering Intelligent Solutions'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 3 — PROVEN TRACK RECORD STATS ===== */}
      {showStats && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
              <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2.5 shadow-2xs">
                {statsSec?.kicker || 'Proven Track Record'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mt-2">
                <FormattedTitle
                  title={statsSec?.title}
                  defaultText="Impact In Numbers"
                  accentClass="text-gradient font-normal"
                  highlightWords={2}
                />
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
                {statsSec?.subtitle || 'Quantifiable engineering performance across high-stakes client deployments.'}
              </p>
            </div>

            {/* Sleek Horizontal 6-Column Grid Metric Cards with 3D Shimmer Sweep Effect */}
            {displayStats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
                {displayStats.map((s, i) => {
                  const rawNum = String(s.n || s.value || '0');
                  const valNum = parseFloat(rawNum) || 0;
                  const suffixStr = rawNum.replace(/[0-9.]/g, '') || '%';

                  return (
                    <div
                      key={s.l || i}
                      className="rounded-2xl overflow-hidden group flex flex-col justify-between glass-card bg-white/80 dark:bg-[#0c091d]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 relative p-5 sm:p-6 shadow-lg hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(124,58,237,0.25)] transition-all duration-300"
                      data-aos="fade-up"
                      data-aos-delay={(i % 6) * 60}
                    >
                      {/* Ambient Glow Orb */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-purple-500/20 dark:bg-purple-500/30 blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none z-0" />

                      {/* 3D Shimmer Sweep Overlay Effect */}
                      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden z-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
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

                      {/* 100% Brightly Visible Icon Badge */}
                      <div className="relative z-10 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center text-lg shadow-lg shadow-purple-600/35 border border-white/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                          {renderAboutIcon(s.icon, "text-xl text-white drop-shadow-xs")}
                        </div>
                      </div>

                      {/* Animated Stat Counter */}
                      <div className="relative z-10">
                        <StatCounter
                          target={valNum}
                          suffix={suffixStr}
                          label={s.l || s.label}
                          delay={i * 80}
                        />
                      </div>

                      {/* Bottom Gradient Border Sweep */}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-400 transition-all duration-500 group-hover:w-full" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== SECTION 4 — OUR CORE VALUES ===== */}
      {showValues && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
              <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2.5 shadow-2xs">
                {valuesSec?.kicker || 'Our Values'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mt-2">
                <FormattedTitle
                  title={valuesSec?.title}
                  defaultText="The Principles That Guide Everything We Build"
                  accentClass="text-gradient font-normal"
                  highlightWords={3}
                />
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
                {valuesSec?.subtitle || 'Core engineering ethics and client-first principles driving our innovation.'}
              </p>
            </div>

            {/* Bento Glass Cards with 3D Shimmer Sweep Effect (100% Collapse-Proof Layout) */}
            {displayValues.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayValues.map((v, i) => (
                  <div
                    key={v.title || i}
                    className="rounded-3xl overflow-hidden group flex flex-col justify-between glass-card bg-white/80 dark:bg-[#0c091d]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 relative p-8 shadow-xl hover:-translate-y-2.5 hover:shadow-[0_25px_60px_rgba(124,58,237,0.25)] transition-all duration-500 min-h-[220px]"
                    data-aos="fade-up"
                    data-aos-delay={(i % 3) * 80}
                  >
                    {/* Subtle Ambient Glow Orb */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/20 dark:bg-purple-500/30 blur-2xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none z-0" />

                    {/* Dynamic 3D Blink / Shimmer Sweep Overlay Effect */}
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

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center text-2xl shadow-xl shadow-purple-600/35 border border-white/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 mb-6 shrink-0">
                        {renderAboutIcon(v.icon, "text-2xl text-white drop-shadow-xs")}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {v.title || "Core Principle"}
                      </h3>
                      {v.desc && (
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm font-light tracking-tight">
                          {v.desc}
                        </p>
                      )}
                    </div>

                    {/* Bottom Gradient Border Sweep */}
                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-400 transition-all duration-500 group-hover:w-full" />
                  </div>
                ))}
              </div>
            )}

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

      {/* ===== SECTION 5 — CAREERS & CULTURE CTA ===== */}
      {showCta && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="glass-card bg-white/70 dark:bg-[#0b0914]/80 backdrop-blur-2xl rounded-3xl md:rounded-[36px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border border-purple-500/20 shadow-2xl" data-aos="zoom-in">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] aurora-blur opacity-25 pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-2xs">
                  {ctaSec?.kicker || 'Careers & Culture'}
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight mb-4 leading-tight">
                  <FormattedTitle
                    title={ctaSec?.title}
                    defaultText="Shape The Future Of Intelligent Tech"
                    accentClass="text-gradient font-normal"
                    highlightWords={2}
                  />
                </h2>

                <p className="text-sm sm:text-base text-text-muted mb-8 max-w-xl mx-auto leading-relaxed font-light tracking-tight">
                  {ctaSec?.subtitle || "Whether you're looking to transform your enterprise infrastructure or build your technical career, we'd love to connect."}
                </p>

                {/* Action Buttons (100% DB-driven flex container, skip if empty) */}
                {(ctaSec?.buttons && ctaSec.buttons.length > 0 ? ctaSec.buttons : (isLoaded ? [] : [
                  { label: 'Explore Careers', link: '/contactus' },
                  { label: 'Contact Talent Team', link: '/contactus' }
                ])).length > 0 && (
                  <div className="flex flex-wrap gap-4 justify-center items-center mb-10">
                    {(ctaSec?.buttons && ctaSec.buttons.length > 0 ? ctaSec.buttons : (isLoaded ? [] : [
                      { label: 'Explore Careers', link: '/contactus' },
                      { label: 'Contact Talent Team', link: '/contactus' }
                    ])).map((btn, bIdx) => (
                      <a
                        key={bIdx}
                        href={btn.link || '/contactus'}
                        onClick={(e) => handleContactClick(e, btn.link || '/contactus')}
                        className={
                          bIdx === 0
                            ? 'group no-underline px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2'
                            : 'no-underline px-8 py-3.5 rounded-full glass-card text-text font-bold text-xs sm:text-sm tracking-wide hover:border-purple-500/50 transition-all border border-slate-200 dark:border-white/10 hover:scale-105 flex items-center gap-2'
                        }
                      >
                        <span>{btn.label}</span>
                        {bIdx === 0 && (
                          <GoArrowRight className="group-hover:translate-x-1 transition-transform text-base" />
                        )}
                      </a>
                    ))}
                  </div>
                )}

                {/* Perks Highlights Bar (100% DB-driven grid, skip if empty) */}
                {(ctaSec?.points && ctaSec.points.length > 0 ? ctaSec.points : (isLoaded ? [] : [
                  'Cutting-Edge R&D Projects', 'Continuous Learning & Mentorship', 'Global Impact & Hybrid Work'
                ])).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200/40 dark:border-white/10">
                    {(ctaSec?.points && ctaSec.points.length > 0 ? ctaSec.points : (isLoaded ? [] : [
                      'Cutting-Edge R&D Projects', 'Continuous Learning & Mentorship', 'Global Impact & Hybrid Work'
                    ])).map((perk, pkIdx) => (
                      <div key={pkIdx} className="flex items-center justify-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <HiCheckCircle className="text-purple-600 dark:text-purple-400 text-base shrink-0" />
                        <span className="truncate">{perk}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}