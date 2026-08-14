import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { trainingPrograms, getTrainingBySlug } from '../data/training.js';
import { renderTrainingIcon, getCleanTrackImage } from './Training.jsx';
import { useContactModal } from '../contexts/ContactModalContext.jsx';
import { fetchTraining, fetchTrainingBySlug } from '../api/client.js';
import {
  GoArrowRight,
  GoChevronRight,
  GoCheckCircleFill,
  GoShieldCheck,
  GoQuestion,
} from 'react-icons/go';
import {
  HiOutlineSparkles,
  HiOutlineChevronDown,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
} from 'react-icons/hi2';

function FormattedTitle({ title, defaultText, accentClass = "text-purple-600 dark:text-purple-400 font-normal", highlightWords = 2 }) {
  const text = title || defaultText;
  if (!text) return null;

  const words = text.trim().split(/\s+/);
  if (words.length <= 1) {
    return <span>{text}</span>;
  }

  const count = Math.min(highlightWords, words.length - 1);
  const normalPart = words.slice(0, words.length - count).join(' ');
  const accentPart = words.slice(words.length - count).join(' ');

  return (
    <>
      {normalPart} <span className={accentClass}>{accentPart}</span>
    </>
  );
}

export default function TrainingDetail() {
  const { openModal } = useContactModal();

  const handleContactClick = (e, link) => {
    if (link === '/contact') {
      e.preventDefault();
      openModal();
    }
  };

  const { slug } = useParams();
  const [apiProgram, setApiProgram] = useState(null);
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    async function loadData() {
      try {
        const [prog, progList] = await Promise.all([
          fetchTrainingBySlug(slug),
          fetchTraining(),
        ]);

        if (prog) {
          setApiProgram(prog);
        } else {
          const staticProg = getTrainingBySlug(slug);
          if (staticProg) setApiProgram(staticProg);
        }

        if (Array.isArray(progList) && progList.length > 0) {
          setAllPrograms(progList);
        } else {
          setAllPrograms(trainingPrograms);
        }
      } catch (err) {
        console.error('Failed to load training program detail:', err);
        const staticProg = getTrainingBySlug(slug);
        if (staticProg) setApiProgram(staticProg);
        setAllPrograms(trainingPrograms);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-40 pb-24 px-gutter">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Program Details...</p>
        </div>
      </main>
    );
  }

  if (!apiProgram) {
    return <Navigate to="/training" replace />;
  }

  const program = {
    title: apiProgram.title || 'Training Program',
    kicker: apiProgram.kicker || 'Practitioner Cohort Track',
    shortDesc: apiProgram.shortDesc || apiProgram.desc || '',
    desc: apiProgram.desc || apiProgram.fullDesc || apiProgram.shortDesc || '',
    duration: apiProgram.duration || '12 Weeks',
    format: apiProgram.format || 'Hybrid / Live Online',
    level: apiProgram.level || 'Beginner to Advanced',
    points: Array.isArray(apiProgram.points) && apiProgram.points.length > 0
      ? apiProgram.points.filter(Boolean)
      : [
          'Mentor-Led Live Interactive Sessions',
          'Production-Grade Portfolio Capstone Project',
          'Industry Recognized Technical Certification',
          'Career & Resume Audit Support',
        ],
    processSteps: Array.isArray(apiProgram.processSteps) && apiProgram.processSteps.length > 0
      ? apiProgram.processSteps
      : [
          { phase: 'Phase 01 • Core Foundations', title: 'Foundational Deep-Dive & Tooling', desc: 'Master core language syntax, algorithmic patterns, and industry software development environments.' },
          { phase: 'Phase 02 • Enterprise Architecture', title: 'Scalable Systems & Microservices', desc: 'Engineer REST APIs, zero-trust security pipelines, and high-throughput backend models.' },
          { phase: 'Phase 03 • Capstone & Certification', title: 'Production Launch & Career Review', desc: 'Deploy your capstone software application, undergo peer code audits, and receive technical certification.' },
        ],
    faqs: Array.isArray(apiProgram.faqs) && apiProgram.faqs.length > 0
      ? apiProgram.faqs
      : [
          { q: `What are the prerequisites for ${apiProgram.title || 'this track'}?`, a: 'Basic programming concepts are helpful, though our introductory modules cover essential foundational syntax and tooling.' },
          { q: 'What is the format and weekly schedule of the cohorts?', a: 'Classes combine live interactive online lectures with hands-on weekend lab sessions tailored for students and working professionals.' },
          { q: 'Will participants build real portfolio projects?', a: 'Yes! Every track requires building and deploying a production capstone project that you can feature on your resume.' },
          { q: 'Is career placement support provided?', a: 'Top graduates receive resume optimization, mock technical interviews, and direct referral opportunities across Porulon hiring partner networks.' },
        ],
    img: getCleanTrackImage(apiProgram.img || apiProgram.mediaUrl, apiProgram.slug),
    icon: apiProgram.icon || apiProgram.slug || 'HiOutlineAcademicCap',
    slug: apiProgram.slug || slug,
  };

  const otherPrograms = allPrograms
    .filter((t) => (t.slug ? t.slug !== slug : String(t.id || t._id) !== String(slug)))
    .slice(0, 4)
    .map((t) => ({
      slug: t.slug || t._id || t.id,
      title: t.title || 'Related Track',
    }));

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative font-sans pt-28 sm:pt-36 pb-20">
      
      <div className="max-w-container mx-auto px-gutter">
        
        {/* ============================================================ */}
        {/* 1. SEAMLESS EDITORIAL HEADER */}
        {/* ============================================================ */}
        <div className="space-y-4 mb-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors no-underline">
              Home
            </Link>
            <GoChevronRight className="text-slate-400 text-xs" />
            <Link to="/training" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors no-underline">
              Training
            </Link>
            <GoChevronRight className="text-slate-400 text-xs" />
            <span className="text-purple-600 dark:text-purple-400 font-extrabold truncate">
              {program.title}
            </span>
          </nav>

          {/* Kicker Tagline Badge */}
          {program.kicker && (
            <div>
              <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase">
                <HiOutlineSparkles className="text-sm" />
                <span>{program.kicker}</span>
              </span>
            </div>
          )}

          {/* Large Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-slate-950 dark:text-white leading-[1.12] max-w-4xl">
            <FormattedTitle
              title={program.title}
              defaultText={program.title}
              accentClass="text-purple-600 dark:text-purple-400 font-normal"
              highlightWords={2}
            />
          </h1>

          {/* Short Description Narrative */}
          {program.shortDesc && (
            <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed tracking-tight max-w-3xl pt-2">
              {program.shortDesc}
            </p>
          )}

        </div>

        {/* ============================================================ */}
        {/* 2. SHOWCASE IMAGE FRAME */}
        {/* ============================================================ */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-950 min-h-[280px] sm:min-h-[420px] flex items-center justify-center">
          {program.img ? (
            <img
              src={program.img}
              alt={program.title}
              className="w-full h-[320px] sm:h-[460px] object-cover brightness-95"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          {/* Blueprint Graphic Fallback if cover photo is missing */}
          <div className={`${program.img ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414] p-8 flex-col justify-between items-start z-0`}>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-2xl">
              {renderTrainingIcon(program.icon || slug)}
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 block mb-1">Porulon Academy Architecture</span>
              <h3 className="text-2xl font-extrabold text-white">{program.title}</h3>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between text-white z-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg shadow-md shrink-0">
                {renderTrainingIcon(program.icon || slug, "text-xl text-white")}
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wide">{program.title}</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-300 font-mono">
              <span className="hidden sm:inline-block">Duration: <strong className="text-purple-300">{program.duration}</strong></span>
              <span className="hidden md:inline-block">•</span>
              <span className="hidden sm:inline-block">Format: <strong className="text-purple-300">{program.format}</strong></span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. FLUID 2-COLUMN ARTICLE LAYOUT (STORY + SIDEBAR) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT STORY COLUMN (8 COLS) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Full Narrative Text */}
            {program.desc && (
              <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal tracking-tight">
                <div className="border-l-2 border-purple-600 dark:border-purple-400 pl-4 py-1">
                  <p className="font-medium text-slate-900 dark:text-slate-100 italic">
                    "{program.desc}"
                  </p>
                </div>
              </div>
            )}

            {/* Quick Specs Highlight Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-purple-500/5 dark:bg-purple-950/30 border border-purple-500/10 dark:border-purple-500/20 text-center">
                <HiOutlineClock className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-1.5" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-extrabold mb-0.5">Program Duration</p>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{program.duration}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/5 dark:bg-purple-950/30 border border-purple-500/10 dark:border-purple-500/20 text-center">
                <HiOutlineAcademicCap className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-1.5" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-extrabold mb-0.5">Learning Format</p>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{program.format}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/5 dark:bg-purple-950/30 border border-purple-500/10 dark:border-purple-500/20 text-center">
                <HiOutlineChartBar className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-1.5" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-extrabold mb-0.5">Skill Level</p>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{program.level}</p>
              </div>
            </div>

            {/* Dynamic Key Modules & Learning Outcomes */}
            {program.points && program.points.length > 0 && (
              <div className="space-y-6 pt-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <HiOutlineSparkles className="text-purple-600 dark:text-purple-400" />
                  <span>Curriculum Modules & Outcomes</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-500/5 dark:bg-purple-950/30 border border-purple-500/10 dark:border-purple-500/20">
                      <GoCheckCircleFill className="text-purple-600 dark:text-purple-400 text-lg shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                          {point}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Lifecycle Progression */}
            {program.processSteps && program.processSteps.length > 0 && (
              <div className="space-y-6 pt-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Curriculum Progression Timeline
                </h3>

                <div className="space-y-6 border-l border-slate-200 dark:border-white/10 ml-3 pl-6">
                  {program.processSteps.map((step, sIdx) => (
                    <div key={sIdx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-purple-600/20" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-1">
                        {step.phase || `Phase 0${sIdx + 1}`}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            {program.faqs && program.faqs.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <GoQuestion className="text-purple-600 dark:text-purple-400" />
                  <span>Frequently Asked Questions</span>
                </h3>

                <div className="space-y-3">
                  {program.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="border-b border-slate-200 dark:border-white/10 pb-3">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                        className="w-full text-left py-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <HiOutlineChevronDown
                          className={`text-base text-purple-600 dark:text-purple-400 shrink-0 transition-transform duration-300 ${
                            activeFaq === fIdx ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {activeFaq === fIdx && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-2">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-36">
            
            {/* Enrollment Action Box */}
            <div className="p-6 rounded-3xl bg-purple-500/5 dark:bg-purple-950/30 border border-purple-500/20 space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 block">
                Academic Enrollment
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Enroll in {program.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect with our academic directors to reserve your seat in the upcoming cohort or request custom corporate group training.
              </p>

              <a
                href="/contact"
                onClick={(e) => handleContactClick(e, '/contact')}
                className="btn-primary w-full py-3.5 rounded-full text-xs font-extrabold tracking-wide inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 hover:scale-105 transition-all no-underline"
              >
                <span>Enquire Now</span>
                <GoArrowRight className="text-sm" />
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <GoShieldCheck className="text-purple-600 dark:text-purple-400 text-sm" />
                <span>24-Hour Academic Response Guarantee</span>
              </div>
            </div>

            {/* Related Curriculum Tracks from Backend DB */}
            {otherPrograms.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Explore Other Training Tracks
                </h4>

                <div className="space-y-2">
                  {otherPrograms.map((relP) => (
                    <Link
                      key={relP.slug}
                      to={`/training/${relP.slug}`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 transition-all no-underline"
                    >
                      <span className="truncate max-w-[200px]">{relP.title}</span>
                      <GoArrowRight className="text-sm text-slate-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}
