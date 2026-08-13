import { useState, useEffect } from 'react';
import SectionBackground from '../components/SectionBackground.jsx';
import { getCleanMediaUrl } from '../utils/media.js';
import { fetchSections, submitContactInquiry } from '../api/client.js';
import { GoArrowRight } from 'react-icons/go';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlinePaperAirplane,
  HiCheckCircle,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
  HiOutlineAcademicCap,
  HiOutlineLockClosed,
} from 'react-icons/hi2';

function FormattedTitle({ title, defaultText, accentClass = "text-gradient font-light", highlightWords = 2 }) {
  const text = title || defaultText;
  if (!text) return null;

  const words = text.trim().split(' ');
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

const ICON_MAP = {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
};

function renderDynamicIcon(iconName, fallbackIcon) {
  if (!iconName) return fallbackIcon;
  const Comp = ICON_MAP[iconName];
  if (Comp) return <Comp className="text-xl" />;
  return fallbackIcon;
}

const DEFAULT_CONTACT_HERO_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop';

export default function Contact() {
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedTopic, setSelectedTopic] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;
    fetchSections('contact')
      .then((data) => {
        if (isMounted) {
          setSections(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching contact sections:', err);
        if (isMounted) {
          setSections([]);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getSec = (key) => sections?.find((s) => s.sectionKey === key && s.isActive && !s.isArchived);

  const heroSec = getSec('contact_hero');
  const infoSec = getSec('contact_info');
  const formSec = getSec('contact_form');

  const isSecVisible = (sec) => {
    if (sec) {
      if (sec.isActive === false || sec.visible === false || sec.enabled === false || sec.isArchived === true) {
        return false;
      }
    }
    return true;
  };

  const showHero = isSecVisible(heroSec);
  const showInfo = isSecVisible(infoSec);
  const showForm = isSecVisible(formSec);

  // Defaults fallback
  const heroKicker = heroSec?.kicker || 'Contact Porulon';
  const heroTitle = heroSec?.title || "Let's Talk About Your Next Project";
  const heroSubtitle = heroSec?.subtitle || 'Whether you need an enterprise AI platform, cloud architecture, operational automation, or strategic consultancy, our engineering directors are ready to assist.';
  const heroMediaUrl = getCleanMediaUrl(heroSec?.mediaUrl) || DEFAULT_CONTACT_HERO_IMAGE;
  const heroBadges = heroSec?.points && heroSec.points.length > 0
    ? heroSec.points
    : ['Direct Support', 'Enterprise SLA', 'Global Reach'];

  const infoKicker = infoSec?.kicker || 'CONNECT & VISIT';
  const infoTitle = infoSec?.title || 'Direct Channels & Global HQ';
  const infoMapHeader = infoSec?.subtitle || 'Coimbatore HQ • Keeranatham CHIL SEZ IT Park';
  const infoMapUrl = infoSec?.content || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.0397397115257!2d76.99902397479613!3d11.110416252944882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7541fa58c0d%3A0x3ee79f1864250ea9!2sKumaran%20Nagar%20Keeranatham!5e0!3m2!1sen!2sin!4v1774456441458!5m2!1sen!2sin';

  const defaultInfoCards = [
    {
      icon: 'HiOutlineEnvelope',
      title: 'Email Direct',
      lines: ['info@porulontech.com'],
      sub: 'General & Proposal Requests',
      href: 'mailto:info@porulontech.com',
    },
    {
      icon: 'HiOutlinePhone',
      title: 'Sales & General Support',
      lines: ['Sales: +91 63851 86664', 'General: +91 90470 99277', 'Tel: +91 422 714 1668'],
      sub: 'Mon-Fri, 9AM-6PM IST',
      href: 'tel:+916385186664',
    },
    {
      icon: 'HiOutlineMapPin',
      title: 'Coimbatore HQ',
      lines: ['7/42, Kumaran Nagar, Keeranatham'],
      sub: 'Coimbatore 641035, TN',
      href: 'https://www.google.com/maps?q=Kumaran+Nagar+Keeranatham+Coimbatore',
    },
    {
      icon: 'HiOutlineClock',
      title: '24h SLA Guarantee',
      lines: ['Within 24 Business Hours'],
      sub: 'Architect-Led Response',
      href: null,
    },
  ];

  const rawInfoCards = infoSec?.items && infoSec.items.length > 0 ? infoSec.items : defaultInfoCards;
  const infoCards = rawInfoCards.map((c) => {
    let linesArr = [];
    if (Array.isArray(c.lines)) {
      linesArr = c.lines;
    } else if (c.desc) {
      linesArr = c.desc.split('|').map((s) => s.trim());
    } else {
      linesArr = [c.title];
    }
    return {
      ...c,
      lines: linesArr,
    };
  });

  const formKicker = formSec?.kicker || 'INQUIRY & CONSULTATION';
  const formTitle = formSec?.title || 'Send Us A Message';

  const defaultSecurityPerks = [
    {
      icon: 'HiOutlineLockClosed',
      title: '100% NDA Protection',
      desc: 'Your proprietary datasets, technical specs, and AI models remain strictly confidential under mutual NDA.',
    },
    {
      icon: 'HiOutlineClock',
      title: '24-Hour SLA Response',
      desc: 'Our principal solutions architects review and respond within 1 business day with actionable technical feedback.',
    },
    {
      icon: 'HiOutlineShieldCheck',
      title: 'Enterprise Security Audit',
      desc: 'Custom microservices and zero-trust security pipelines built for high-scale enterprise environments.',
    },
  ];

  const securityPerks = formSec?.items && formSec.items.length > 0 ? formSec.items : defaultSecurityPerks;

  const defaultTopics = [
    { id: 'ai-ml', label: 'AI & Machine Learning', icon: <HiOutlineCpuChip className="text-sm" /> },
    { id: 'cloud', label: 'Cloud Architecture', icon: <HiOutlineGlobeAlt className="text-sm" /> },
    { id: 'academy', label: 'Academy Programs', icon: <HiOutlineAcademicCap className="text-sm" /> },
    { id: 'general', label: 'General Inquiry', icon: <HiOutlineChatBubbleLeftRight className="text-sm" /> },
  ];

  const topicList = formSec?.points && formSec.points.length > 0
    ? formSec.points.map((tp, idx) => ({
        id: typeof tp === 'string' ? tp.toLowerCase().replace(/[^a-z0-9]/g, '-') : `topic-${idx}`,
        label: typeof tp === 'string' ? tp : tp.label || 'Inquiry',
        icon: idx === 0 ? <HiOutlineCpuChip className="text-sm" /> : idx === 1 ? <HiOutlineGlobeAlt className="text-sm" /> : idx === 2 ? <HiOutlineAcademicCap className="text-sm" /> : <HiOutlineChatBubbleLeftRight className="text-sm" />,
      }))
    : defaultTopics;

  // Keep selectedTopic empty by default so placeholder displays until user selects

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('submitting');
    try {
      await submitContactInquiry({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        company: form.company,
        interest: selectedTopic,
        message: `${form.subject ? 'Subject: ' + form.subject + '\n\n' : ''}${form.message}`,
      });
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An error occurred. Please try again.' });
      setStatus('idle');
    }
  };

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans">
      
      {/* ===== 1. HERO SECTION (1-TO-1 MATCH WITH INDUSTRIES HERO VIEWHEIGHT & SHADOWS) ===== */}
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
                  alt="Contact Banner"
                  className="w-full h-full object-cover object-right md:object-center opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-transform duration-1000"
                />
              );
            })()}
            {/* High Contrast Dark Overlay so White Text is 100% Crystal Clear */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-transparent" />
            
            {/* Top & Bottom seamless blending gradients */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg via-bg/40 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none z-10" />

            {/* Soft ambient glow behind left content */}
            <div className="absolute -left-20 top-1/3 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[120px] pointer-events-none z-10" />
          </div>

          {/* Content Container */}
          <div className="max-w-container mx-auto px-gutter relative z-20 w-full">
            <div className="max-w-2xl text-left" data-aos="fade-right">
              {/* Optional Top Kicker Chip */}
              {heroKicker && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-purple-300 text-xs font-extrabold tracking-[0.18em] uppercase mb-6 shadow-sm">
                  <HiOutlineChatBubbleLeftRight className="text-sm text-purple-400" />
                  <span>{heroKicker}</span>
                </div>
              )}

              {/* Main Headline Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white mb-6 leading-[1.12] drop-shadow-md">
                <FormattedTitle
                  title={heroTitle}
                  defaultText="Let's Talk About Your Next Project"
                  accentClass="text-purple-400 font-normal"
                  highlightWords={2}
                />
              </h1>

              {/* Optional Subtitle Description */}
              {heroSubtitle && (
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal tracking-tight mb-8 max-w-xl">
                  {heroSubtitle}
                </p>
              )}

              {/* Optional Dynamic Action Buttons from Backend */}
              {heroSec?.buttons && heroSec.buttons.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {heroSec.buttons.map((btn, idx) => (
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
              )}

              {/* Quick Contact Trust Badges (Zero-Collapse Auto-Wrapping Glassmorphism Chips) */}
              {heroBadges && heroBadges.length > 0 && (
                <div className="flex flex-wrap items-center gap-3.5 pt-2 max-w-2xl">
                  {heroBadges.map((badgeText, bIdx) => (
                    <div
                      key={bIdx}
                      className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 dark:bg-white/[0.07] backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-purple-400/50 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20 hover:scale-[1.03] cursor-default"
                    >
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-500/25 to-indigo-500/25 border border-purple-400/30 flex items-center justify-center shrink-0 text-purple-300 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                        {bIdx === 0 ? (
                          <HiOutlineEnvelope className="text-sm" />
                        ) : bIdx === 1 ? (
                          <HiOutlineShieldCheck className="text-sm" />
                        ) : bIdx === 2 ? (
                          <HiOutlineGlobeAlt className="text-sm" />
                        ) : (
                          <HiOutlineSparkles className="text-sm" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-sm">
                        {badgeText}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== 2. REDESIGNED SECTION 2: COMPACT HIGH-CONTRAST CHANNELS & LOCATION HUB ===== */}
      {showInfo && (
        <section className="py-10 md:py-14 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10 space-y-8">
            
            {/* Header Title (Clean Header Without Underline Border) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2" data-aos="fade-up">
              <div>
                {infoKicker && (
                  <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase block mb-1">
                    {infoKicker}
                  </span>
                )}
                {infoTitle && (
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-text tracking-tight">
                    <FormattedTitle
                      title={infoTitle}
                      defaultText="Direct Channels & Global HQ"
                      accentClass="text-purple-600 dark:text-purple-400 font-extrabold"
                      highlightWords={2}
                    />
                  </h2>
                )}
              </div>
              {infoSec?.subtitle && (
                <p className="text-xs sm:text-sm text-text-muted font-medium max-w-md leading-relaxed">
                  {infoSec.subtitle}
                </p>
              )}
            </div>

            {/* Direct Info Cards Grid (Dynamic Backend Binding - Zero Collapse Safe) */}
            {infoCards && infoCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
                {infoCards.map((c, i) => {
                  const Wrapper = c.href ? 'a' : 'div';
                  return (
                    <Wrapper
                      key={i}
                      {...(c.href ? { href: c.href, target: '_blank', rel: 'noreferrer' } : {})}
                      className="group p-4 rounded-2xl border border-purple-500/15 dark:border-purple-500/20 bg-bg/60 backdrop-blur-md flex items-center gap-3.5 hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all">
                        {renderDynamicIcon(c.icon, <HiOutlineEnvelope className="text-xl" />)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-xs font-extrabold text-text truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {c.title}
                          </h3>
                          {c.href && <GoArrowRight className="text-xs text-text-muted group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-transform group-hover:translate-x-0.5" />}
                        </div>
                        {c.lines && c.lines.length > 0 && (
                          <p className="text-xs text-text font-bold truncate mt-0.5">
                            {c.lines[0]}
                          </p>
                        )}
                        {c.sub && (
                          <p className="text-[10.5px] text-text-muted truncate font-normal mt-0.5">
                            {c.sub}
                          </p>
                        )}
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            )}

            {/* Sleek Location Frame */}
            {infoMapUrl && (
              <div className="rounded-2xl overflow-hidden border border-purple-500/15 dark:border-purple-500/20 bg-bg/50 shadow-xl relative" data-aos="fade-up">
                <div className="flex items-center justify-between px-4 py-2.5 bg-purple-500/5 dark:bg-white/[0.04] border-b border-purple-500/10 text-xs font-bold">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <HiOutlineMapPin className="text-base" />
                    <span>{infoMapHeader}</span>
                  </div>
                  <span className="text-text-muted text-[11px] font-medium hidden sm:inline">Coimbatore, Tamil Nadu • 641035</span>
                </div>

                <div className="relative h-[300px] sm:h-[340px] w-full">
                  <iframe
                    title="Porulon Technologies office location"
                    src={infoMapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <a
                    href="https://www.google.com/maps?q=Kumaran+Nagar+Keeranatham+Coimbatore"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-bg/95 backdrop-blur-md text-text text-xs font-extrabold border border-purple-500/20 shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 group cursor-pointer"
                  >
                    <HiOutlineMapPin className="text-purple-600 dark:text-purple-400 text-sm" />
                    <span>Open Maps</span>
                    <GoArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                  </a>
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ===== 3. REDESIGNED SECTION 3: SLEEK COMPACT CONTACT COMMAND CENTER ===== */}
      {showForm && (
        <section className="py-10 md:py-14 relative overflow-hidden bg-purple-950/5 dark:bg-[#07070d] border-t border-purple-500/10">
          <div className="max-w-container mx-auto px-gutter relative z-10 space-y-8">
            
            {/* Header Title */}
            <div className="text-center max-w-xl mx-auto space-y-2" data-aos="fade-up">
              <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase">
                {formKicker}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-text tracking-tight">
                <FormattedTitle
                  title={formTitle}
                  defaultText="Send Us A Message"
                  accentClass="text-purple-600 dark:text-purple-400 font-extrabold"
                  highlightWords={1}
                />
              </h2>
            </div>

            {/* Split Screen 12 Columns Grid */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (5 Cols): Borderless Image with Ultra-Clean Floating Glass Panel */}
              <div className="lg:col-span-5 space-y-6" data-aos="fade-right">
                
                {/* Borderless Image Container with Clean Floating Glass Trust Panel */}
                {(() => {
                  const mediaSrc = getCleanMediaUrl(formSec?.mediaUrl);
                  const isVideo = mediaSrc && (mediaSrc.toLowerCase().endsWith('.mp4') || mediaSrc.toLowerCase().endsWith('.webm'));

                  return (
                    <div className="relative pb-2 pr-2 sm:pr-4">
                      {/* 1. Borderless Main Image Box */}
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group">
                        {mediaSrc ? (
                          isVideo ? (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              src={mediaSrc}
                              className="w-full h-[380px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                            />
                          ) : (
                            <img
                              src={mediaSrc}
                              alt="Porulon Advisory Team"
                              className="w-full h-[380px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                            />
                          )
                        ) : (
                          <div className="w-full h-[380px] sm:h-[440px] bg-gradient-to-br from-purple-950/80 via-slate-900 to-indigo-950/90 flex items-center justify-center p-6 text-center">
                            <div className="space-y-2">
                              <HiOutlineShieldCheck className="text-5xl text-purple-400 mx-auto animate-pulse" />
                              <span className="text-xs font-bold text-white uppercase tracking-widest block">Enterprise Security & Quality Hub</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
                      </div>

                      {/* 2. Sleek Translucent Glass Panel (Background Image Lightly Visible Through Glass - No Solid White BG!) */}
                      {securityPerks && securityPerks.length > 0 && (
                        <div className="absolute -bottom-2 -right-1 sm:-bottom-3 sm:-right-3 z-20 max-w-[270px] sm:max-w-[300px] p-3.5 sm:p-4 rounded-2xl bg-white/20 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/15 shadow-2xl space-y-2.5 pointer-events-auto hover:bg-white/30 dark:hover:bg-black/50 transition-all duration-300">
                          {securityPerks.map((sp, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-xl bg-purple-500/20 dark:bg-purple-500/30 border border-purple-400/40 text-purple-300 flex items-center justify-center font-bold shrink-0 shadow-sm mt-0.5">
                                {renderDynamicIcon(sp.icon, <HiOutlineShieldCheck className="text-sm text-purple-300" />)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-extrabold text-[11px] sm:text-xs text-white tracking-tight leading-tight drop-shadow-sm">
                                  {sp.title}
                                </h3>
                                <p className="text-[10px] sm:text-[10.5px] text-slate-200 leading-tight font-normal mt-0.5 line-clamp-1">
                                  {sp.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Direct Escalation Box (With Clean Margin Gap Below Floating Card) */}
                <div className="p-5 rounded-2xl border border-purple-500/15 dark:border-purple-500/20 bg-gradient-to-r from-purple-950/20 to-bg flex items-center justify-between gap-3 text-xs mt-8 sm:mt-10">
                  <div>
                    <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                      NEED IMMEDIATE RESPONSE?
                    </span>
                    <p className="text-text font-bold mt-0.5">Sales: +91 63851 86664 | General: +91 90470 99277 | info@porulontech.com</p>
                  </div>
                  <a
                    href="mailto:info@porulontech.com"
                    className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-[11px] shrink-0 transition cursor-pointer"
                  >
                    Email Sales
                  </a>
                </div>
              </div>

              {/* Right Column (7 Cols): Compact Interactive Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-purple-500/15 dark:border-purple-500/20 bg-bg/70 backdrop-blur-xl shadow-xl space-y-4"
                data-aos="fade-left"
              >
                {errors.form && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl text-center">
                    {errors.form}
                  </div>
                )}
                {/* Project Area Dropdown Field */}
                {topicList.length > 0 && (
                  <div>
                    <label htmlFor="projectArea" className="block text-[11px] font-extrabold uppercase tracking-wider text-text mb-1">
                      Project Area / Interest
                    </label>
                    <div className="relative">
                      <select
                        id="projectArea"
                        name="projectArea"
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className={`w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border border-slate-300/80 dark:border-purple-500/20 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-medium appearance-none cursor-pointer pr-10 ${
                          !selectedTopic ? 'text-text-muted/70' : 'text-text'
                        }`}
                      >
                        <option value="" disabled className="bg-bg text-text-muted font-normal">
                          Select Project Area
                        </option>
                        {topicList.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-bg text-text py-1 font-medium">
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="firstName" className="block text-[11px] font-extrabold uppercase tracking-wider text-text mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      className={`w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border ${errors.firstName ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/80 dark:border-purple-500/20 focus:ring-purple-500/40 focus:border-purple-500'} px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium`}
                      placeholder="Jane"
                    />
                      {errors.firstName && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[11px] font-extrabold uppercase tracking-wider text-text mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className={`w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border ${errors.lastName ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/80 dark:border-purple-500/20 focus:ring-purple-500/40 focus:border-purple-500'} px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium`}
                      placeholder="Doe"
                    />
                      {errors.lastName && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Work Email & Company */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="email" className="block text-[11px] font-extrabold uppercase tracking-wider text-text mb-1">
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border ${errors.email ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/80 dark:border-purple-500/20 focus:ring-purple-500/40 focus:border-purple-500'} px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium`}
                      placeholder="jane@company.com"
                    />
                      {errors.email && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-[11px] font-extrabold uppercase tracking-wider text-text mb-1">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border border-slate-300/80 dark:border-purple-500/20 px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-medium"
                      placeholder="Company Inc."
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-[11px] font-extrabold uppercase tracking-wider text-text mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border ${errors.subject ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/80 dark:border-purple-500/20 focus:ring-purple-500/40 focus:border-purple-500'} px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium`}
                    placeholder="Tell us what you need..."
                  />
                      {errors.subject && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[11px] font-extrabold uppercase tracking-wider text-text mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border ${errors.message ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/80 dark:border-purple-500/20 focus:ring-purple-500/40 focus:border-purple-500'} px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all resize-none font-medium`}
                    placeholder="Share a bit about your project requirements or goals..."
                  />
                  {errors.message && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs hover:opacity-90 transition-all duration-300 shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
                  >
                    {status === 'sent' ? (
                      <>
                        <HiCheckCircle className="text-lg text-emerald-300" />
                        <span>Inquiry Sent Successfully!</span>
                      </>
                    ) : status === 'submitting' ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <HiOutlinePaperAirplane className="text-xs group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>

          </div>
        </section>
      )}

    </main>
  );
}