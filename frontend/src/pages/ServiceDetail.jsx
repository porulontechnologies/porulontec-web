import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { renderServiceIcon } from './Services.jsx';
import { fetchServices, fetchServiceBySlug } from '../api/client.js';
import { getCleanMediaUrl } from '../utils/media.js';
import {
  GoArrowRight,
  GoChevronRight,
  GoCheckCircleFill,
  GoShieldCheck,
  GoQuestion,
} from 'react-icons/go';
import { HiOutlineSparkles, HiOutlineChevronDown } from 'react-icons/hi2';

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

export default function ServiceDetail() {
  const { slug } = useParams();
  const [apiService, setApiService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    async function loadData() {
      try {
        const [srv, srvList] = await Promise.all([
          fetchServiceBySlug(slug),
          fetchServices(),
        ]);
        if (srv) {
          setApiService(srv);
        }
        if (Array.isArray(srvList) && srvList.length > 0) {
          setAllServices(srvList);
        }
      } catch (err) {
        console.error('Failed to load service detail:', err);
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
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Service Details...</p>
        </div>
      </main>
    );
  }

  if (!apiService) {
    return <Navigate to="/services" replace />;
  }

  const service = {
    title: apiService.title || 'Service Offering',
    tagline: apiService.kicker || apiService.tagline || apiService.category || '',
    shortDesc: apiService.shortDesc || '',
    desc: apiService.desc || apiService.fullDesc || apiService.shortDesc || '',
    features: Array.isArray(apiService.points)
      ? apiService.points.filter(Boolean)
      : Array.isArray(apiService.features)
      ? apiService.features.filter(Boolean)
      : [],
    icon: apiService.icon || 'AI',
    img: getCleanMediaUrl(apiService.img || apiService.mediaUrl),
  };

  const otherServices = allServices
    .filter((s) => (s.slug ? s.slug !== slug : String(s.id || s._id) !== String(slug)))
    .slice(0, 4)
    .map((s) => ({
      slug: s.slug || s._id || s.id,
      title: s.title || 'Related Capability',
    }));

  const faqs = [
    {
      q: `How long does it take to deploy ${service.title}?`,
      a: `Initial proof-of-concept architectures are typically delivered within 2 to 4 weeks. Production enterprise rollouts with continuous SLA monitoring follow an agile deployment lifecycle.`,
    },
    {
      q: `Can this capability integrate with existing enterprise infrastructure?`,
      a: `Yes. Our solutions are engineered with decoupled APIs and middleware adapters that seamlessly bridge cloud-native engines with existing enterprise ERPs and databases.`,
    },
    {
      q: `What security and compliance standards are enforced?`,
      a: `All implementations comply with SOC 2 Type II, ISO 27001, and GDPR protocols. Data is encrypted in transit (TLS 1.3) and at rest (AES-256).`,
    },
    {
      q: `What post-deployment SLA support is provided?`,
      a: `We provide 24/7 dedicated engineering support, real-time drift monitoring, and guaranteed 99.99% system availability.`,
    },
  ];

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
            <Link to="/services" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors no-underline">
              Services
            </Link>
            <GoChevronRight className="text-slate-400 text-xs" />
            <span className="text-purple-600 dark:text-purple-400 font-extrabold truncate">
              {service.title}
            </span>
          </nav>

          {/* Kicker Tagline Badge (if present) */}
          {service.tagline && (
            <div>
              <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase">
                <HiOutlineSparkles className="text-sm" />
                <span>{service.tagline}</span>
              </span>
            </div>
          )}

          {/* Large Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-slate-950 dark:text-white leading-[1.12] max-w-4xl">
            <FormattedTitle
              title={service.title}
              defaultText={service.title}
              accentClass="text-purple-600 dark:text-purple-400 font-normal"
              highlightWords={2}
            />
          </h1>

          {/* Short Description Narrative */}
          {service.shortDesc && (
            <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed tracking-tight max-w-3xl pt-2">
              {service.shortDesc}
            </p>
          )}

        </div>

        {/* ============================================================ */}
        {/* 2. SHOWCASE IMAGE FRAME */}
        {/* ============================================================ */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-950 min-h-[280px] sm:min-h-[420px] flex items-center justify-center">
          {service.img ? (
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-[320px] sm:h-[460px] object-cover brightness-95"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          {/* Blueprint Graphic Fallback if cover photo is missing */}
          <div className={`${service.img ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414] p-8 flex-col justify-between items-start z-0`}>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-2xl">
              {renderServiceIcon(service.icon || slug)}
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 block mb-1">Porulon Solution Architecture</span>
              <h3 className="text-2xl font-extrabold text-white">{service.title}</h3>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg shadow-md shrink-0">
                {renderServiceIcon(service.icon || slug)}
              </div>
              <span className="text-xs font-bold tracking-wide">{service.title}</span>
            </div>
            
            <span className="text-xs text-slate-300 font-mono hidden sm:inline-block">
              Porulon Enterprise Architecture System
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. FLUID 2-COLUMN ARTICLE LAYOUT (STORY + SIDEBAR) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT STORY COLUMN (8 COLS) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Full Narrative Text */}
            {service.desc && (
              <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal tracking-tight">
                <div className="border-l-2 border-purple-600 dark:border-purple-400 pl-4 py-1">
                  <p className="font-medium text-slate-900 dark:text-slate-100 italic">
                    "{service.desc}"
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Key Capabilities & Technical Features (No Box Clutter) */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-6 pt-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <HiOutlineSparkles className="text-purple-600 dark:text-purple-400" />
                  <span>Key Capabilities & Technical Offerings</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((point, pIdx) => (
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

            {/* Engineering Lifecycle Timeline */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                How We Engineer & Deploy
              </h3>

              <div className="space-y-6 border-l border-slate-200 dark:border-white/10 ml-3 pl-6">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-purple-600/20" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-1">
                    Phase 01 • Discovery & Requirement Mapping
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Strategic Audit & Architecture Blueprint</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    We evaluate your business workflows, database schemas, and compliance constraints to establish a clear technical roadmap.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-purple-600/20" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-1">
                    Phase 02 • Core Engineering & Pipeline Build
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Custom Model Training & Systems Build</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Developing scalable microservices, training custom AI models, and establishing zero-trust security parameters.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-purple-600/20" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 block mb-1">
                    Phase 03 • Production Launch & Operations
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Deployment & 24/7 SLA Operations</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Continuous monitoring, real-time drift detection, and automated scaling backed by guaranteed 99.99% system SLAs.
                  </p>
                </div>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <GoQuestion className="text-purple-600 dark:text-purple-400" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, fIdx) => (
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

          </div>

          {/* RIGHT SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-36">
            
            {/* Consultation Action Box */}
            <div className="p-6 rounded-3xl bg-purple-500/5 dark:bg-purple-950/30 border border-purple-500/20 space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 block">
                Engineering Advisory
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Discuss {service.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Schedule a 1-on-1 technical discovery call to get a custom architecture roadmap and proposal.
              </p>

              <Link
                to="/contact"
                className="btn-primary w-full py-3.5 rounded-full text-xs font-extrabold tracking-wide inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 hover:scale-105 transition-all no-underline"
              >
                <span>Schedule Consultation</span>
                <GoArrowRight className="text-sm" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <GoShieldCheck className="text-purple-600 dark:text-purple-400 text-sm" />
                <span>24-Hour SLA Response Guarantee</span>
              </div>
            </div>

            {/* Related Capabilities from Backend DB */}
            {otherServices.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Explore Related Capabilities
                </h4>

                <div className="space-y-2">
                  {otherServices.map((relS) => (
                    <Link
                      key={relS.slug}
                      to={`/services/${relS.slug}`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 transition-all no-underline"
                    >
                      <span className="truncate max-w-[200px]">{relS.title}</span>
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
