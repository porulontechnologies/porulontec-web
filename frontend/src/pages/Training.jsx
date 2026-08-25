import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlowImage from '../components/GlowImage.jsx';
import { trainingPrograms } from '../data/training.js';
import { fetchSections, fetchTraining } from '../api/client.js';
import { useContactModal } from '../contexts/ContactModalContext.jsx';
import { getCleanMediaUrl } from '../utils/media.js';
import { GoArrowRight } from 'react-icons/go';
import {
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineRadio,
  HiOutlineDevicePhoneMobile,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineWrenchScrewdriver,
  HiOutlineBriefcase,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlinePlus,
  HiOutlineMinus,
} from 'react-icons/hi2';

const COURSE_FALLBACK_IMAGES = {
  'ai-ml': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  'cybersecurity': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
  'iot': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
  'full-stack': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
};

export const getCleanTrackImage = (img, slug) => {
  if (img && !img.includes('/images/service-')) {
    const cleaned = getCleanMediaUrl(img);
    if (cleaned) return cleaned;
  }
  return COURSE_FALLBACK_IMAGES[slug] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
};

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

export const renderTrainingIcon = (iconOrSlug, customClass = '') => {
  const key = (iconOrSlug || '').toLowerCase();
  const iconClass = customClass || 'text-2xl text-purple-600 dark:text-purple-400';

  if (key.includes('ai') || key.includes('sparkles')) {
    return <HiOutlineSparkles className={iconClass} />;
  }
  if (key.includes('cyber') || key.includes('shield') || key.includes('sec')) {
    return <HiOutlineShieldCheck className={iconClass} />;
  }
  if (key.includes('iot') || key.includes('radio')) {
    return <HiOutlineRadio className={iconClass} />;
  }
  if (key.includes('full') || key.includes('mobile') || key.includes('stack')) {
    return <HiOutlineDevicePhoneMobile className={iconClass} />;
  }
  if (key.includes('user') || key.includes('group') || key.includes('mentor')) {
    return <HiOutlineUserGroup className={iconClass} />;
  }
  if (key.includes('cap') || key.includes('certif') || key.includes('academic')) {
    return <HiOutlineAcademicCap className={iconClass} />;
  }
  if (key.includes('wrench') || key.includes('tool') || key.includes('project')) {
    return <HiOutlineWrenchScrewdriver className={iconClass} />;
  }
  if (key.includes('brief') || key.includes('career') || key.includes('job')) {
    return <HiOutlineBriefcase className={iconClass} />;
  }
  return <HiOutlineAcademicCap className={iconClass} />;
};

const defaultHighlights = [
  { icon: 'HiOutlineUserGroup', title: 'Mentor-Led Training', desc: 'Learn directly from principal AI, cybersecurity, and cloud engineers active in enterprise projects.' },
  { icon: 'HiOutlineAcademicCap', title: 'Recognized Certification', desc: 'Earn a verified technical mastery certificate upon completing hands-on program milestones.' },
  { icon: 'HiOutlineWrenchScrewdriver', title: 'Portfolio Project Building', desc: 'Engineer production-ready, high-throughput software applications for your portfolio.' },
  { icon: 'HiOutlineBriefcase', title: 'Career & Placement Support', desc: 'Resume audits, technical mock interviews, and direct referral opportunities for top graduates.' },
];

const defaultProcessSteps = [
  { step: '01', title: 'Foundational Deep-Dive & Core Concepts', desc: 'Master core principles, algorithmic foundations, and industry tooling under practitioner guidance.' },
  { step: '02', title: 'Advanced Architecture & Microservices', desc: 'Design scalable systems, zero-trust security pipelines, and high-throughput backend APIs.' },
  { step: '03', title: 'Applied Production Capstone Sprint', desc: 'Engineer an end-to-end, portfolio-grade technical application solving a real-world enterprise challenge.' },
  { step: '04', title: 'Code Audit, Certification & Career Prep', desc: 'Undergo rigorous code reviews, receive technical certification, and access career placement support.' },
];

const defaultFaqs = [
  { q: 'Who are these training tracks designed for?', a: 'Our programs cater to computer science students, working developers, and technology professionals seeking to master enterprise AI, cybersecurity, IoT, and full-stack engineering.' },
  { q: 'What is the format and duration of the cohorts?', a: 'Classes are offered in hybrid and live interactive online formats, typically spanning 8 to 12 weeks with flexible weekend or evening schedules.' },
  { q: 'Do participants receive hands-on project experience?', a: 'Yes! Every track includes a capstone engineering project where you build, deploy, and showcase real production software.' },
  { q: 'Is there career placement assistance provided?', a: 'Top-performing graduates receive resume optimization, technical interview prep, and direct referral connections to Porulon client partner networks.' },
];

export default function Training() {
  const { openModal } = useContactModal();

  const handleContactClick = (e, link) => {
    if (link === '/contactus' || link === '/contactus/') {
      e.preventDefault();
      openModal();
    }
  };

  const [dbSections, setDbSections] = useState(null);
  const [apiTraining, setApiTraining] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchSections('training')
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
        console.error('Failed to fetch training sections:', err);
        setDbSections({});
      });

    fetchTraining()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiTraining(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch training programs list:', err);
      });
  }, []);

  const heroSec = dbSections?.training_hero;
  const tracksSec = dbSections?.training_tracks;
  const whyUsSec = dbSections?.training_why_us;
  const processSec = dbSections?.training_process;
  const faqSec = dbSections?.training_faq;
  const ctaSec = dbSections?.training_cta;

  const hasPageConfig = dbSections && Object.keys(dbSections).length > 0;

  const isSecVisible = (sec) => {
    if (sec) {
      if (sec.isActive === false || sec.visible === false || sec.enabled === false || sec.isArchived === true) {
        return false;
      }
      return true;
    }
    return true;
  };

  const showHero = isSecVisible(heroSec);
  const showTracks = isSecVisible(tracksSec);
  const showWhyUs = isSecVisible(whyUsSec);
  const showProcess = isSecVisible(processSec);
  const showFaq = isSecVisible(faqSec);
  const showCta = isSecVisible(ctaSec);

  const displayTracks = (apiTraining && apiTraining.length > 0)
    ? apiTraining.map((item, idx) => ({
        slug: item.slug || item._id || item.id || `track-${idx + 1}`,
        title: item.title || 'Training Program',
        kicker: item.kicker || 'Practitioner Cohort',
        shortDesc: item.shortDesc || item.desc || '',
        duration: item.duration || '12 Weeks',
        level: item.level || 'Beginner to Advanced',
        img: getCleanTrackImage(item.img || item.mediaUrl, item.slug),
        icon: item.icon || item.slug || 'HiOutlineAcademicCap',
        points: Array.isArray(item.points) ? item.points : ['Practitioner Mentorship', 'Capstone Building', 'Verified Certificate'],
      }))
    : (tracksSec?.items && tracksSec.items.length > 0)
    ? tracksSec.items.map((item, idx) => ({
        slug: item.slug || trainingPrograms[idx]?.slug || `track-${idx + 1}`,
        title: item.title || item.name || trainingPrograms[idx]?.title || 'Training Program',
        kicker: item.kicker || trainingPrograms[idx]?.kicker || 'Practitioner Cohort',
        shortDesc: item.shortDesc || item.desc || trainingPrograms[idx]?.shortDesc || '',
        duration: item.duration || trainingPrograms[idx]?.duration || '12 Weeks',
        level: item.level || trainingPrograms[idx]?.level || 'Beginner to Advanced',
        img: getCleanTrackImage(item.img || item.mediaUrl, item.slug),
        icon: item.icon || trainingPrograms[idx]?.slug || 'HiOutlineAcademicCap',
        points: Array.isArray(item.points) ? item.points : (trainingPrograms[idx]?.points || ['Practitioner Mentorship', 'Capstone Building', 'Verified Certificate']),
      }))
    : trainingPrograms.map(t => ({
        ...t,
        kicker: t.kicker || 'Practitioner Cohort',
        img: getCleanTrackImage(t.img, t.slug),
        points: Array.isArray(t.points) ? t.points : ['Practitioner Mentorship', 'Capstone Building', 'Verified Certificate'],
      }));

  const displayHighlights = (whyUsSec?.items && whyUsSec.items.length > 0)
    ? whyUsSec.items.map((item, idx) => ({
        icon: item.icon || defaultHighlights[idx % defaultHighlights.length]?.icon || 'HiOutlineAcademicCap',
        title: item.title || item.name || `Highlight ${idx + 1}`,
        desc: item.desc || item.subtitle || '',
        badge: item.badge || item.kicker || '',
      }))
    : defaultHighlights;

  const displaySteps = (processSec?.items && processSec.items.length > 0)
    ? processSec.items.map((item, idx) => ({
        step: item.n || item.step || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
        title: item.title || item.name || `Phase ${idx + 1}`,
        desc: item.desc || item.subtitle || '',
        badge: item.badge || item.kicker || '',
      }))
    : defaultProcessSteps;

  const displayFaqs = (faqSec?.items && faqSec.items.length > 0)
    ? faqSec.items.map((item) => ({
        q: item.q || item.question || item.title || '',
        a: item.a || item.answer || item.desc || '',
      }))
    : defaultFaqs;

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans">
      
      {/* ===== HERO SECTION ===== */}
      {showHero && (
        <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          
          {/* Background Media (Video or Photo in Light & Dark Themes) or Ambient Aurora Glow */}
          {(() => {
            const bgMediaUrl = getCleanMediaUrl(heroSec?.mediaUrl);
            const lower = (bgMediaUrl || '').toLowerCase();
            const isVideo = bgMediaUrl && (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov') || lower.endsWith('.ogg'));

            if (bgMediaUrl) {
              return (
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
                      alt="Training Hero Background"
                      className="w-full h-full object-cover object-right md:object-center opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-transform duration-1000"
                    />
                  )}
                  {/* High Contrast Dark Overlay so White Text is 100% Crystal Clear in both Light and Dark Themes */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-transparent" />
                </div>
              );
            }

            return (
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] aurora-blur opacity-30 pointer-events-none" />
            );
          })()}

          {/* Top & Bottom Seamless Blending Fade Gradients */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg via-bg/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none z-10" />

          {/* Soft ambient glow behind left content */}
          <div className="absolute -left-20 top-1/3 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[120px] pointer-events-none z-10" />

          <div className="max-w-container mx-auto px-gutter text-center relative z-20 space-y-8" data-aos="fade-up">
            
            {/* Kicker Chip */}
            {heroSec?.kicker && (
              <div>
                <span className="inline-block px-5 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-md text-purple-300 text-xs font-extrabold tracking-[0.18em] uppercase shadow-2xs">
                  {heroSec.kicker}
                </span>
              </div>
            )}

            {/* Main Headline Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white max-w-5xl mx-auto leading-[1.15] drop-shadow-md">
              <FormattedTitle
                title={heroSec?.title}
                defaultText="Industry-Ready Skills Taught By Practitioners"
                accentClass="text-purple-400 font-normal"
                highlightWords={2}
              />
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed tracking-tight">
              {heroSec?.subtitle ||
                'Hands-on, mentor-led technical training programs in AI & ML, Cybersecurity, IoT, and Full-Stack Development — built to bridge the gap between academic theory and enterprise engineering.'}
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {(heroSec?.buttons?.length ? heroSec.buttons : [
                { label: 'Explore Training Tracks', link: '#training-grid' },
                { label: 'Talk to Our Team', link: '/contactus' }
              ]).map((btn, bIdx) => (
                <a
                  key={bIdx}
                  href={btn.link || '#training-grid'}
                  onClick={(e) => handleContactClick(e, btn.link || '#training-grid')}
                  className={
                    bIdx === 0
                      ? 'group no-underline px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/35 hover:shadow-purple-600/55 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2'
                      : 'no-underline px-8 py-3.5 rounded-full bg-white/90 dark:bg-white/15 backdrop-blur-md text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm tracking-wide hover:border-purple-500/60 transition-all duration-300 border border-slate-300 dark:border-white/30 hover:scale-[1.03] active:scale-95 flex items-center gap-2 shadow-md'
                  }
                >
                  <span>{btn.label}</span>
                  {bIdx === 0 && (
                    <GoArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                  )}
                </a>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ===== 1. PROGRAMS BENTO GRID ===== */}
      {showTracks && (
        <section id="training-grid" className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14" data-aos="fade-up">
              <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase">
                {tracksSec?.kicker || 'Curriculum Tracks'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-slate-900 dark:text-text tracking-tight mt-3">
                <FormattedTitle
                  title={tracksSec?.title}
                  defaultText="Explore Technical Training Tracks"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {tracksSec?.subtitle && (
                <p className="text-slate-600 dark:text-text-muted text-sm sm:text-base mt-4 font-normal tracking-tight">
                  {tracksSec.subtitle}
                </p>
              )}
            </div>

            {/* Bento Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {displayTracks.map((t, i) => (
                <Link
                  key={t.slug}
                  to={`/training/${t.slug}`}
                  className="glass-card rounded-3xl overflow-hidden group flex flex-col hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)] transition-all duration-300 border border-slate-200/80 dark:border-purple-500/20"
                  data-aos="fade-up"
                  data-aos-delay={(i % 2) * 90}
                >
                  {/* Ambient Card Image Header */}
                  {t.img && (
                    <div className="overflow-hidden relative h-56 bg-slate-900 shrink-0">
                      <GlowImage
                        src={t.img}
                        alt={t.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        rounded="rounded-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1a] via-black/40 to-transparent" />
                      
                      {/* Floating Glowing Icon Box */}
                      <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                        {renderTrainingIcon(t.icon || t.slug, "text-2xl text-purple-300")}
                      </div>

                      {/* Duration Badge */}
                      {t.duration && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold bg-black/75 text-purple-300 backdrop-blur-md border border-purple-500/30 shadow-sm">
                            {t.duration}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Content Body */}
                  <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-3">
                      {t.kicker && (
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                          <span>{t.kicker}</span>
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-text tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t.title}</h3>
                      <p className="text-slate-600 dark:text-text-muted text-xs sm:text-sm leading-relaxed font-normal tracking-tight line-clamp-2">{t.shortDesc}</p>

                      {/* Feature Bullet Points */}
                      {Array.isArray(t.points) && t.points.length > 0 && (
                        <div className="pt-2 space-y-2">
                          {t.points.slice(0, 3).map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-text-muted font-medium tracking-tight">
                              <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                                ✓
                              </span>
                              <span className="truncate">{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Stats & Action Link */}
                    <div className="pt-4  border-slate-200/60 dark:border-purple-500/10 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-text-muted font-medium tracking-tight">
                        {t.duration && (
                          <span className="flex items-center gap-1.5">
                            <HiOutlineClock className="text-purple-600 dark:text-purple-400" />
                            <span>{t.duration}</span>
                          </span>
                        )}
                        {t.level && (
                          <span className="flex items-center gap-1.5">
                            <HiOutlineChartBar className="text-purple-600 dark:text-purple-400" />
                            <span>{t.level}</span>
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-extrabold text-xs sm:text-sm tracking-tight group-hover:translate-x-1 transition-transform">
                        <span>Explore Track</span>
                        <GoArrowRight className="text-base" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 2. WHY TRAIN WITH US ===== */}
      {showWhyUs && (
        <section className="py-16 md:py-24 relative overflow-hidden bg-purple-950/5 dark:bg-purple-950/10 border-y border-purple-500/10">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
              <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase">
                {whyUsSec?.kicker || 'Why Porulon Training'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-slate-900 dark:text-text tracking-tight mt-3">
                <FormattedTitle
                  title={whyUsSec?.title}
                  defaultText="Learning Built For Real Careers"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {whyUsSec?.subtitle && (
                <p className="text-slate-600 dark:text-text-muted text-sm sm:text-base mt-4 font-normal tracking-tight">
                  {whyUsSec.subtitle}
                </p>
              )}
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${
              displayHighlights.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-6 md:gap-8`}>
              {displayHighlights.map((h, i) => (
                <div
                  key={h.title || i}
                  className="glass-card rounded-3xl p-7 sm:p-8 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)] transition-all duration-300 border border-slate-200/80 dark:border-purple-500/20 group flex flex-col justify-between h-full"
                  data-aos="fade-up"
                  data-aos-delay={(i % 4) * 90}
                >
                  <div>
                    {/* Glowing Icon Avatar Box */}
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-300 shadow-md shrink-0">
                      {renderTrainingIcon(h.icon, "text-2xl text-purple-600 dark:text-purple-300 group-hover:text-white transition-colors duration-300")}
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-text mb-3 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {h.title}
                    </h3>
                    <p className="text-slate-600 dark:text-text-muted text-xs sm:text-sm leading-relaxed font-normal tracking-tight">
                      {h.desc}
                    </p>
                  </div>

                  {h.badge && (
                    <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-purple-500/10">
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                        {h.badge}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 3. AGILE CURRICULUM METHODOLOGY TIMELINE ===== */}
      {showProcess && (
        <section className="py-16 md:py-24 relative overflow-hidden bg-purple-950/15 dark:bg-purple-950/25 border-b border-purple-500/10">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
              <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase">
                {processSec?.kicker || 'Structured Learning Journey'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-slate-900 dark:text-text tracking-tight mt-3">
                <FormattedTitle
                  title={processSec?.title}
                  defaultText="Our 4-Phase Applied Methodology"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {processSec?.subtitle && (
                <p className="text-slate-600 dark:text-text-muted text-sm sm:text-base mt-4 font-normal tracking-tight">
                  {processSec.subtitle}
                </p>
              )}
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${
              displaySteps.length <= 3 ? `lg:grid-cols-${displaySteps.length}` : 'lg:grid-cols-4'
            } gap-6 md:gap-8`}>
              {displaySteps.map((s, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-7 sm:p-8 relative group hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)] transition-all duration-300 border border-slate-200/80 dark:border-purple-500/20 flex flex-col justify-between h-full overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={(idx % 4) * 90}
                >
                  {/* Subtle Background Watermark Number */}
                  <span className="text-6xl font-extrabold text-purple-500/10 dark:text-purple-400/10 font-mono absolute top-4 right-4 pointer-events-none group-hover:text-purple-500/20 transition-colors select-none">
                    {s.step}
                  </span>

                  <div>
                    {/* Glowing Step Avatar Badge */}
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 flex items-center justify-center font-mono font-extrabold text-lg text-purple-600 dark:text-purple-300 group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-all duration-300 shadow-md shrink-0 mb-6">
                      {s.step}
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-text mb-3 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-slate-600 dark:text-text-muted text-xs sm:text-sm leading-relaxed font-normal tracking-tight">
                      {s.desc}
                    </p>
                  </div>

                  {s.badge && (
                    <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-purple-500/10">
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                        {s.badge}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 4. FREQUENTLY ASKED QUESTIONS (FAQS) ACCORDION ===== */}
      {showFaq && displayFaqs.length > 0 && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
              <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase">
                {faqSec?.kicker || 'Training Inquiries'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-slate-900 dark:text-text tracking-tight mt-3">
                <FormattedTitle
                  title={faqSec?.title}
                  defaultText="Frequently Asked Questions"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {faqSec?.subtitle && (
                <p className="text-slate-600 dark:text-text-muted text-sm sm:text-base mt-4 font-normal tracking-tight">
                  {faqSec.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4" data-aos="fade-up">
              {displayFaqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="glass-card rounded-2xl border border-slate-200/80 dark:border-purple-500/20 hover:border-purple-500/50 overflow-hidden transition-all duration-300 shadow-xs group"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-text text-sm sm:text-base tracking-tight hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                        {isOpen ? <HiOutlineMinus className="w-4 h-4" /> : <HiOutlinePlus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-text-muted leading-relaxed font-normal tracking-tight border-t border-slate-200/60 dark:border-purple-500/10 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== 5. FINAL CTA ===== */}
      {showCta && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            <div className="glass-card rounded-3xl md:rounded-[32px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border border-purple-500/20 dark:border-purple-500/30 shadow-[0_20px_50px_rgba(124,58,237,0.15)]" data-aos="zoom-in">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] aurora-blur opacity-30 pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                
                {ctaSec?.kicker && (
                  <div>
                    <span className="inline-block px-5 py-1.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-extrabold tracking-[0.18em] uppercase shadow-2xs">
                      {ctaSec.kicker}
                    </span>
                  </div>
                )}

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-slate-900 dark:text-text tracking-tight leading-tight">
                  <FormattedTitle
                    title={ctaSec?.title}
                    defaultText="Ready to Upskill Your Team?"
                    accentClass="text-gradient font-light"
                    highlightWords={2}
                  />
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-text-muted max-w-xl mx-auto leading-relaxed font-normal tracking-tight">
                  {ctaSec?.subtitle ||
                    'Explore our upcoming training cohorts or reach out to discuss custom corporate upskilling for your engineering team.'}
                </p>

                {/* Flexible Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  {(ctaSec?.buttons && ctaSec.buttons.length > 0
                    ? ctaSec.buttons
                    : [
                        { label: 'Enroll Now', link: '/contactus' },
                        { label: 'Talk to Our Team', link: '/contactus' },
                      ]
                  ).map((btn, bIdx) => (
                    <a
                      key={bIdx}
                      href={btn.link || '/contactus'}
                      onClick={(e) => handleContactClick(e, btn.link || '/contactus')}
                      className={
                        bIdx === 0
                          ? 'group no-underline px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/35 hover:shadow-purple-600/55 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2'
                          : 'no-underline px-8 py-3.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm tracking-wide hover:border-purple-500/60 transition-all duration-300 border border-slate-300 dark:border-white/20 hover:scale-[1.03] active:scale-95 flex items-center gap-2 shadow-md'
                      }
                    >
                      <span>{btn.label}</span>
                      {bIdx === 0 && (
                        <GoArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
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
