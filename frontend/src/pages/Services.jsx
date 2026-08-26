import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchSections, fetchServices } from '../api/client.js';
import { useContactModal } from '../contexts/ContactModalContext.jsx';
import { getCleanMediaUrl } from '../utils/media.js';
import { GoArrowRight, GoCheck } from 'react-icons/go';
import {
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiOutlineRadio,
  HiOutlineDevicePhoneMobile,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineCloud,
  HiOutlineLightBulb,
  HiOutlineAcademicCap,
  HiOutlineBanknotes,
  HiOutlineTruck,
  HiOutlineShoppingCart,
  HiOutlineBuildingOffice2,
} from 'react-icons/hi2';

function FormattedTitle({ title, defaultText, accentClass = "text-purple-600 dark:text-purple-400 font-normal", highlightWords = 2 }) {
  const text = title || defaultText;
  if (!text) return null;

  const words = text.trim().split(/\s+/);
  if (words.length <= 1) {
    return <span>{text}</span>;
  }

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

function StatCounterItem({ rawValue, label, delay = 0 }) {
  const [ref, inView] = useInViewOnce();
  const numericVal = parseFloat(rawValue) || 0;
  const suffix = rawValue ? String(rawValue).replace(/[0-9.]/g, '') : '';
  const animatedCount = useCountUp(inView ? numericVal : 0, 1800, delay);

  return (
    <div
      ref={ref}
      className="p-5 rounded-2xl bg-white/80 dark:bg-[#100d28]/75 backdrop-blur-xl border border-slate-200/50 dark:border-purple-500/10 text-center space-y-1 shadow-sm hover:border-purple-500/30 transition-all"
    >
      <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight tabular-nums">
        {animatedCount}{suffix}
      </div>
      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-tight">
        {label}
      </div>
    </div>
  );
}

export const renderServiceIcon = (iconOrKey) => {
  const key = String(iconOrKey || '').toLowerCase();
  if (key.includes('ai') || key.includes('smart_toy') || key.includes('sparkle')) return <HiOutlineSparkles className="text-2xl text-purple-400" />;
  if (key.includes('ml') || key.includes('chip') || key.includes('intelligence')) return <HiOutlineCpuChip className="text-2xl text-indigo-400" />;
  if (key.includes('iot') || key.includes('radio') || key.includes('sensor')) return <HiOutlineRadio className="text-2xl text-amber-400" />;
  if (key.includes('web') || key.includes('mobile') || key.includes('device') || key.includes('full-stack')) return <HiOutlineDevicePhoneMobile className="text-2xl text-cyan-400" />;
  if (key.includes('sec') || key.includes('shield') || key.includes('lock')) return <HiOutlineShieldCheck className="text-2xl text-emerald-400" />;
  if (key.includes('auto') || key.includes('bolt') || key.includes('tree')) return <HiOutlineBolt className="text-2xl text-purple-500" />;
  if (key.includes('cloud')) return <HiOutlineCloud className="text-2xl text-sky-400" />;
  if (key.includes('bulb') || key.includes('light') || key.includes('consult')) return <HiOutlineLightBulb className="text-2xl text-yellow-400" />;
  return <HiOutlineSparkles className="text-2xl text-purple-400" />;
};

const defaultServices = [
  {
    slug: 'ai-solutions',
    title: 'AI Software Solutions',
    tagline: 'Enterprise AI Workflows',
    shortDesc: 'Custom LLM integration, computer vision, and cognitive agents designed to automate complex business workflows.',
    desc: 'We design and deploy enterprise-grade AI models that transform raw data into predictive intelligence and autonomous decision-making systems.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    icon: 'HiOutlineSparkles',
    features: ['Custom LLM Fine-Tuning', 'Computer Vision & OCR', 'Autonomous Decision Agents'],
  },
  {
    slug: 'ml-platforms',
    title: 'Machine Learning Platforms',
    tagline: 'Predictive Intelligence',
    shortDesc: 'End-to-end MLOps pipelines, data engineering, and custom neural networks built for real-time inference.',
    desc: 'From data cleansing to continuous model retraining in production, our MLOps pipelines ensure high accuracy and zero drift.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    icon: 'HiOutlineCpuChip',
    features: ['Real-Time Neural Inference', 'Automated MLOps Pipelines', 'Predictive Anomaly Scoring'],
  },
  {
    slug: 'iot-automation',
    title: 'IoT Automation & Smart Solutions',
    tagline: 'Smart Edge Architecture',
    shortDesc: 'Embedded firmware, hardware sensor integration, and real-time edge computing for Industry 4.0.',
    desc: 'Connect factory hardware and physical assets to cloud intelligence with sub-second latency telemetry and predictive maintenance.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    icon: 'HiOutlineRadio',
    features: ['Sub-Second Telemetry Sync', 'Edge Sensor Mesh Integration', 'SCADA Hardware Dashboards'],
  },
  {
    slug: 'full-stack-development',
    title: 'Full-Stack Web & Mobile Apps',
    tagline: 'Cloud-Native Apps',
    shortDesc: 'High-performance React, Node.js, and cloud-native applications built with micro-frontend architectures.',
    desc: 'Bespoke web platforms and cross-platform mobile apps engineered for high traffic concurrency, security, and sub-second render speeds.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    icon: 'HiOutlineDevicePhoneMobile',
    features: ['Reactive Microservices API', 'Cross-Platform React Native', 'Sub-Second Render Speeds'],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity Solutions',
    tagline: 'SOC 2 & ISO Protocols',
    shortDesc: 'Zero-trust architecture, threat detection, penetration testing, and continuous compliance hardening.',
    desc: 'Comprehensive security audits, automated threat detection engines, and compliance management for SOC 2, ISO 27001, and HIPAA.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    icon: 'HiOutlineShieldCheck',
    features: ['Zero-Trust Cloud Mesh', 'SOC 2 & ISO 27001 Readiness', 'Penetration Audits & SIEM'],
  },
  {
    slug: 'cloud-systems',
    title: 'Cloud-Based Systems',
    tagline: 'Multi-Cloud Resilience',
    shortDesc: 'AWS, Azure, and GCP cloud-native migrations, Kubernetes orchestration, and automated CI/CD pipelines.',
    desc: 'Zero-downtime deployments, infrastructure as code (IaC), and automated cloud cost optimization.',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    icon: 'HiOutlineCloud',
    features: ['Cross-Cloud Cluster Scaling', 'Infrastructure as Code (IaC)', 'FinOps Cloud Bill Optimization'],
  },
];

const defaultProcessSteps = [
  { n: '01', title: 'Discovery & Strategic Audit', desc: 'We analyze your enterprise objectives, data assets, and infrastructure bottlenecks to architect high-impact engineering roadmaps.' },
  { n: '02', title: 'System Architecture & Prototyping', desc: 'Our principal architects design a bespoke blueprint, selecting optimal algorithms, cloud VPCs, and reactive APIs.' },
  { n: '03', title: 'Agile Engineering & CI/CD Sprint', desc: 'Iterative sprint development with bi-weekly live staging demos ensures continuous feedback and battle-tested code.' },
  { n: '04', title: 'Production Deployment & SLA Scale', desc: 'Zero-downtime deployment with 24/7 automated metric monitoring, SOC 2 compliance, and ongoing scaling.' },
];

export default function Services() {
  const { openModal } = useContactModal();

  const handleContactClick = (e, link) => {
    if (link === '/contactus' || link === '/contactus/') {
      e.preventDefault();
      openModal();
    }
  };

  const [dbSections, setDbSections] = useState(null);
  const [apiServices, setApiServices] = useState([]);

  useEffect(() => {
    fetchSections('services')
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
        console.error('Failed to fetch services sections:', err);
        setDbSections({});
      });

    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiServices(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch services list:', err);
      });
  }, []);

  const heroSec = dbSections?.services_hero;
  const gridSec = dbSections?.services_grid;
  const processSec = dbSections?.services_process;
  const ctaSec = dbSections?.services_cta;

  const hasPageConfig = dbSections && Object.keys(dbSections).length > 0;

  const isSecVisible = (sec) => {
    if (sec) {
      if (sec.isActive === false || sec.visible === false || sec.enabled === false || sec.isArchived === true) {
        return false;
      }
    }
    return true;
  };

  const showHero = isSecVisible(heroSec);
  const showGrid = isSecVisible(gridSec);
  const showProcess = isSecVisible(processSec);
  const showCta = isSecVisible(ctaSec);

  const bgMediaUrl = getCleanMediaUrl(heroSec?.mediaUrl);
  const isVideo = bgMediaUrl && (
    bgMediaUrl.endsWith('.mp4') || bgMediaUrl.endsWith('.webm') || bgMediaUrl.endsWith('.mov')
  );

  // Direct Backend API Sync for Services List
  const displayServices = (apiServices && apiServices.length > 0)
    ? apiServices.map((item, idx) => ({
        slug: item.slug || item._id || item.id || `service-${idx + 1}`,
        title: item.title || 'Service Capability',
        tagline: item.kicker || item.tagline || item.category || '',
        shortDesc: item.shortDesc || item.desc || '',
        fullDesc: item.desc || item.fullDesc || '',
        img: getCleanMediaUrl(item.img || item.mediaUrl),
        icon: item.icon || 'HiOutlineSparkles',
        features: Array.isArray(item.points) ? item.points : (Array.isArray(item.features) ? item.features : []),
      }))
    : (gridSec?.items !== undefined && Array.isArray(gridSec.items) && gridSec.items.length > 0)
    ? gridSec.items.map((item, idx) => ({
        slug: item.slug || `service-${idx + 1}`,
        title: item.title || item.name || 'Service Capability',
        tagline: item.tagline || item.category || '',
        shortDesc: item.shortDesc || item.desc || '',
        fullDesc: item.fullDesc || item.desc || '',
        img: getCleanMediaUrl(item.img || item.mediaUrl),
        icon: item.icon || 'HiOutlineSparkles',
        features: Array.isArray(item.features) ? item.features : (Array.isArray(item.points) ? item.points : []),
      }))
    : defaultServices;

  const displayProcessSteps = (processSec?.items !== undefined && Array.isArray(processSec.items) && processSec.items.length > 0)
    ? processSec.items.map((item, idx) => ({
        n: item.n || item.step || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
        title: item.title || item.name || 'Process Step',
        desc: item.desc || '',
      }))
    : defaultProcessSteps;

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans">
      
      {/* ============================================================ */}
      {/* SECTION 1: HERO BANNER & VALUE PROPOSITION (INDUSTRIES EXACT MATCH) */}
      {/* ============================================================ */}
      {showHero && (
        <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          
          {/* Background Media (Video or Photo in Light & Dark Themes) or Ambient Aurora Glow */}
          {bgMediaUrl ? (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {isVideo ? (
                <video
                  src={bgMediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-opacity duration-500"
                />
              ) : (
                <img
                  src={bgMediaUrl}
                  alt="Services Hero Background"
                  className="w-full h-full object-cover object-right md:object-center opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-transform duration-1000"
                />
              )}
              {/* High Contrast Dark Overlay matching Industries page */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-transparent" />
            </div>
          ) : (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] aurora-blur opacity-30 pointer-events-none" />
          )}

          {/* Top & Bottom Seamless Blending Fade Gradients (Soft, Light & Line-Free) */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg via-bg/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none z-10" />

          {/* Soft ambient glow behind left content */}
          <div className="absolute -left-20 top-1/3 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[120px] pointer-events-none z-10" />

          <div className="max-w-container mx-auto px-gutter text-center relative z-20 space-y-8">
            
            {/* Kicker Chip (High Contrast Brightness in Light & Dark Modes) */}
            <div>
              <span className="inline-block px-5 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-md text-purple-300 text-xs font-extrabold tracking-[0.18em] uppercase shadow-2xs">
                {heroSec?.kicker || 'Enterprise Capability Matrix'}
              </span>
            </div>

            {/* Main Headline Title (White Text for 100% Visibility in Both Light & Dark Themes) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white max-w-5xl mx-auto leading-[1.15] drop-shadow-md">
              <FormattedTitle
                title={heroSec?.title}
                defaultText="Engineering High-Scale Digital Services & Systems"
                accentClass="text-purple-400 font-normal"
                highlightWords={2}
              />
            </h1>

            {/* Subtitle Description (Bright Slate-200 Text for 100% Visibility) */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed tracking-tight">
              {heroSec?.subtitle ||
                'Comprehensive technology services spanning Artificial Intelligence, Cloud infrastructure, full-stack development, cybersecurity, automation, and technical academy training.'}
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {(heroSec?.buttons?.length ? heroSec.buttons : [
                { label: 'Explore Service Capabilities', link: '#services-grid' },
                { label: 'Schedule Consultation', link: '/contactus' }
              ]).map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.link || "/contactus"}
                  onClick={(e) => handleContactClick(e, btn.link || "/contactus")}
                  className={
                    idx === 0
                      ? "group no-underline px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/35 hover:shadow-purple-600/55 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2"
                      : "no-underline px-8 py-4 rounded-full bg-white/90 dark:bg-white/15 backdrop-blur-md text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm tracking-wide hover:border-purple-500/60 transition-all duration-300 border border-slate-300 dark:border-white/30 hover:scale-[1.03] active:scale-95 flex items-center gap-2 shadow-md"
                  }
                >
                  <span>{btn.label}</span>
                  {idx === 0 && <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />}
                </a>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 2: SPECIALIZED ENGINEERING EXPERTISE GRID */}
      {/* ============================================================ */}
      {showGrid && (
        <section id="services-grid" className="py-12 md:py-16 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                {gridSec?.kicker || 'Engineering Expertise'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mb-4">
                <FormattedTitle
                  title={gridSec?.title}
                  defaultText="Explore Our Service Capabilities"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {gridSec?.subtitle && (
                <p className="text-text-muted text-sm sm:text-base font-light tracking-tight">
                  {gridSec.subtitle}
                </p>
              )}
            </div>

            {/* 3-Column Bento Grid (Blog-Style Card Signature Redesign) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {displayServices.map((s, i) => {
                const cardSlug = s.slug || defaultServices[i]?.slug || `service-${i + 1}`;
                const rawMedia = s.img || s.mediaUrl;
                const coverImg = getCleanMediaUrl(rawMedia);

                return (
                  <Link
                    key={cardSlug || i}
                    to={`/services/${cardSlug}`}
                    className="rounded-3xl overflow-hidden group flex flex-col glass-card bg-white/95 dark:bg-[#0c091d]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 relative p-0 shadow-xl hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(124,58,237,0.25)] transition-all duration-500 no-underline"
                  >
                    {/* Top Cover Image Frame (100% Pure - No Overlapping Text) */}
                    <div className="overflow-hidden relative w-full h-52 sm:h-56 bg-slate-950 flex items-center justify-center">
                      {coverImg ? (
                        <img
                          src={coverImg}
                          alt={s.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 relative z-10"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}

                      {/* Resilient Blueprint Vector Graphic fallback */}
                      <div className={`${coverImg ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414] p-6 flex-col justify-between items-start z-0`}>
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                          {renderServiceIcon(s.icon || cardSlug)}
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">Porulon Solution</span>
                      </div>
                    </div>

                    {/* Card Internal Body (Clean Refined Architecture) */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                      <div className="space-y-3">
                        {/* Uppercase Category Tagline Kicker (Below Image) */}
                        {s.tagline && (
                          <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                            {s.tagline}
                          </div>
                        )}

                        {/* Card Title */}
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {s.title}
                        </h3>

                        {/* Short Description */}
                        {s.shortDesc && (
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed line-clamp-2">
                            {s.shortDesc}
                          </p>
                        )}

                        {/* Clean Bullet Points (Redesigned Structure - No Box Outlines) */}
                        {(s.features || s.points) && (s.features || s.points).length > 0 && (
                          <ul className="pt-2 space-y-2 list-none p-0 m-0">
                            {(s.features || s.points).slice(0, 3).map((feat, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug"
                              >
                                <span className="w-4 h-4 rounded-full bg-purple-500/15 dark:bg-purple-500/25 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                  ✓
                                </span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Perfected CTA Button (Underline & Left Icon Block Removed) */}
                      <div className="pt-5 flex items-center justify-end">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-md shadow-purple-600/25 group-hover:shadow-purple-600/45 group-hover:scale-[1.03] transition-all duration-300">
                          <span>Explore Solution</span>
                          <GoArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 3: AGILE DELIVERY PROCESS MATRIX */}
      {/* ============================================================ */}
      {showProcess && (
        <section className="py-12 md:py-16 relative overflow-hidden">
          {/* Ambient Tech Circuit Background */}
          <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="max-w-container mx-auto px-gutter relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                {processSec?.kicker || 'Our Agile Process'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mb-4">
                <FormattedTitle
                  title={processSec?.title}
                  defaultText="How We Deliver Results"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {processSec?.subtitle && (
                <p className="text-text-muted text-sm sm:text-base font-light tracking-tight">
                  {processSec.subtitle}
                </p>
              )}
            </div>

            {/* 4-Column Constellation Architecture Process Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {displayProcessSteps.map((p, i) => (
                <div
                  key={p.n || i}
                  className="group relative space-y-4 flex flex-col justify-between"
                >
                  {/* Pure Top Gradient Line: Short (w-16) unhovered -> Expands across top (w-full) on hover */}
                  <div
                    className="h-1 w-16 group-hover:w-full bg-gradient-to-r from-[#2e0854] via-[#7c3aed] to-[#c4b5fd] rounded-full transition-all duration-700 ease-out mb-4"
                  />

                  <div className="space-y-3">
                    <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent tracking-tight block">
                      {p.n}
                    </span>

                    <h3 className="text-xl font-bold text-text tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors leading-snug">
                      {p.title}
                    </h3>

                    {p.desc && (
                      <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-light tracking-tight">
                        {p.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 4: HIGH-IMPACT INNOVATION CTA BANNER */}
      {/* ============================================================ */}
      {showCta && (
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            
            <div className="glass-card rounded-3xl md:rounded-[32px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border border-primary-strong/20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] aurora-blur opacity-25 pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase inline-block">
                  {ctaSec?.kicker || 'Start Your Innovation Journey'}
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-text tracking-tight leading-tight">
                  <FormattedTitle
                    title={ctaSec?.title}
                    defaultText="Ready to Transform Your Business With AI?"
                    accentClass="text-gradient font-light"
                    highlightWords={2}
                  />
                </h2>

                <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto leading-relaxed font-light tracking-tight">
                  {ctaSec?.subtitle ||
                    'Whether you are launching a new AI engine or upgrading legacy systems, our principal engineers are ready to build solutions built for scale.'}
                </p>

                {/* Resilient Responsive Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  {(ctaSec?.buttons && ctaSec.buttons.length > 0
                    ? ctaSec.buttons
                    : [
                        { label: 'Start Your Project', link: '/contactus' },
                        { label: 'Talk to Our Team', link: '/contactus' },
                      ]
                  ).map((btn, bIdx) => (
                    <a
                      key={bIdx}
                      href={btn.link || '/contactus'}
                      onClick={(e) => handleContactClick(e, btn.link || '/contactus')}
                      className={
                        bIdx === 0
                          ? 'group btn-primary px-8 py-3.5 rounded-full font-semibold tracking-tight text-xs sm:text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/25 inline-flex items-center gap-2 no-underline'
                          : 'btn-ghost px-8 py-3.5 rounded-full font-semibold tracking-tight text-xs sm:text-sm hover:bg-purple-500/10 transition-colors border border-slate-300 dark:border-purple-500/20 no-underline'
                      }
                    >
                      <span>{btn.label}</span>
                      {bIdx === 0 && (
                        <GoArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                      )}
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
