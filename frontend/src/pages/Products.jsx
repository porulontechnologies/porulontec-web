import { useState, useEffect, useRef } from 'react';
import GlowImage from '../components/GlowImage.jsx';
import { fetchSections } from '../api/client.js';
import { useContactModal } from '../contexts/ContactModalContext.jsx';
import { getCleanMediaUrl } from '../utils/media.js';
import { GoArrowRight, GoCheck } from 'react-icons/go';
import {
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiOutlineCloud,
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlineShieldCheck,
  HiOutlineCommandLine,
  HiOutlineGlobeAlt,
  HiOutlineDevicePhoneMobile,
  HiOutlineCircleStack,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineStar,
  HiOutlineLockClosed,
  HiOutlineLightBulb,
} from 'react-icons/hi2';

function FormattedTitle({ title, defaultText, accentClass = "text-gradient font-light", highlightWords = 2 }) {
  const text = title || defaultText;
  if (!text) return null;

  const words = text.trim().split(/\s+/);
  if (words.length <= highlightWords) {
    return <span className={accentClass}>{text}</span>;
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

// Dynamic React Icon Renderer for Tech Stack Categories & Items
function renderTechIcon(iconKey) {
  if (!iconKey) return <HiOutlineBolt className="text-xl text-purple-400" />;
  
  const key = String(iconKey).trim().toLowerCase();

  switch (key) {
    case 'ai':
    case 'robot':
    case 'bot':
    case 'sparkles':
    case '🤖':
      return <HiOutlineSparkles className="text-xl text-purple-400" />;
    case 'cpu':
    case 'chip':
    case 'hardware':
      return <HiOutlineCpuChip className="text-xl text-indigo-400" />;
    case 'cloud':
    case 'aws':
    case 'k8s':
    case '☁️':
      return <HiOutlineCloud className="text-xl text-cyan-400" />;
    case 'code':
    case 'fullstack':
    case 'dev':
    case '⚡':
      return <HiOutlineCodeBracket className="text-xl text-emerald-400" />;
    case 'server':
    case 'backend':
    case 'infra':
      return <HiOutlineServerStack className="text-xl text-blue-400" />;
    case 'security':
    case 'cyber':
    case 'shield':
    case 'lock':
      return <HiOutlineShieldCheck className="text-xl text-amber-400" />;
    case 'terminal':
    case 'cli':
    case 'devops':
      return <HiOutlineCommandLine className="text-xl text-rose-400" />;
    case 'database':
    case 'db':
    case 'sql':
      return <HiOutlineCircleStack className="text-xl text-teal-400" />;
    case 'mobile':
    case 'app':
      return <HiOutlineDevicePhoneMobile className="text-xl text-pink-400" />;
    case 'web':
    case 'globe':
    case 'api':
      return <HiOutlineGlobeAlt className="text-xl text-sky-400" />;
    default:
      if (iconKey.length <= 4 && /\p{Extended_Pictographic}/u.test(iconKey)) {
        return <span className="text-xl">{iconKey}</span>;
      }
      return <HiOutlineBolt className="text-xl text-purple-400" />;
  }
}

// Count-Up Animation Hooks for Section 1 Live Impact Counters
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

function parseStatValue(rawVal) {
  if (!rawVal) return { prefix: '', number: 0, suffix: '', isNumeric: false };
  const str = String(rawVal).trim();
  const match = str.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  if (match) {
    const num = parseFloat(match[2]);
    if (!isNaN(num)) {
      return {
        prefix: match[1] || '',
        number: num,
        suffix: match[3] || '',
        isNumeric: true
      };
    }
  }
  return { prefix: '', number: 0, suffix: str, isNumeric: false };
}

function StatCounterItem({ rawValue, label, delay = 0 }) {
  const parsed = parseStatValue(rawValue);
  const [ref, inView] = useInViewOnce();
  const animatedNum = useCountUp(inView && parsed.isNumeric ? parsed.number : 0, 1800, delay);

  return (
    <div ref={ref} className="glass-card rounded-2xl p-5 border border-border/50 text-center shadow-xs hover:border-primary-strong/40 transition-all">
      <span className="text-2xl sm:text-3xl font-light text-gradient block mb-1 tabular-nums">
        {parsed.isNumeric ? (
          <>
            {parsed.prefix}
            {parsed.number % 1 !== 0 ? animatedNum.toFixed(1) : animatedNum}
            {parsed.suffix}
          </>
        ) : (
          rawValue
        )}
      </span>
      <span className="text-xs text-slate-800 dark:text-slate-300 font-medium tracking-tight uppercase block leading-tight">{label}</span>
    </div>
  );
}

// Vibrant Unique Brand Color Palettes for Section 2 Running Marquee Brands
const BRAND_GRADIENT_PALETTES = [
  'from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300',
  'from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-300',
  'from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-300',
  'from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-300',
  'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-300',
  'from-rose-600 to-red-500 dark:from-rose-400 dark:to-red-300',
];

// Fallback Section 3: Flagship Products Data
const defaultProducts = [
  {
    id: 'prod-1',
    title: 'Porulon AI Document Engine',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    tagline: 'Intelligent document parsing, OCR & predictive classification.',
    desc: 'An enterprise-grade document processing suite powered by LLMs and deep learning OCR that automates invoice extraction, contract auditing, and compliance checks with 99.4% accuracy.',
    features: ['Instant Multilingual OCR Parsing', 'LLM-Powered Contract Auditing', 'REST API & Webhook Integration'],
    tech: ['Python AI', 'PyTorch', 'FastAPI', 'React', 'Docker'],
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'prod-2',
    title: 'Porulon SmartFactory IoT Hub',
    category: 'iot',
    categoryLabel: 'Industrial IoT',
    tagline: 'Real-time telemetry, sensor mesh & predictive maintenance.',
    desc: 'End-to-end telemetry platform connecting 1,000+ edge microcontrollers across manufacturing plants, offering real-time anomaly alerts and automated machine health diagnostics.',
    features: ['Edge Sensor Telemetry Aggregation', 'Predictive Equipment Breakdown Alerts', 'Time-Series Data Analytics'],
    tech: ['MQTT', 'Node.js', 'React', 'TimeScaleDB', 'Grafana'],
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'prod-3',
    title: 'Porulon Multi-Cloud K8s Scaling Suite',
    category: 'cloud',
    categoryLabel: 'Cloud Platforms',
    tagline: 'Automated cluster orchestration & cost optimization platform.',
    desc: 'Native Kubernetes management suite that orchestrates workloads across AWS, GCP, and Azure while automatically resizing GPU/CPU nodes to cut cloud bill spending by up to 60%.',
    features: ['Cross-Cloud Cluster Sync', 'Auto GPU Compute Scaling', 'FinOps Cost Audit Dashboard'],
    tech: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Go'],
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'prod-4',
    title: 'Porulon Zero-Trust Cyber Sentinel',
    category: 'cyber',
    categoryLabel: 'Cybersecurity',
    tagline: 'AI threat detection pipeline & continuous compliance auditing.',
    desc: 'Next-generation SIEM platform that ingests millions of network log events per second, utilizing AI threat scoring to neutralize zero-day vulnerabilities in real time.',
    features: ['Real-Time Network Anomaly Scoring', 'Continuous HIPAA & SOC2 Auditing', 'Automated Incident Mitigation'],
    tech: ['ElasticSearch', 'Python AI', 'Go', 'Kubernetes', 'CyberSec'],
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
  },
];

// Fallback Section 4: Delivered Client Projects Data
const defaultClientProjects = [
  {
    id: 'proj-1',
    client: 'GlobalLogistics Corp (Asia-Pacific)',
    title: 'AI Fleet Route Optimization & Automated Dispatch Platform',
    industry: 'Logistics & Supply Chain',
    desc: 'Architected and deployed a real-time AI dispatch system for 10,000+ delivery vehicles across 6 countries, reducing fuel costs by 22% and improving delivery speed by 35%.',
    impact: ['22% Fuel Savings', '10,000+ Vehicles Managed', 'Sub-second Route Calculation'],
  },
  {
    id: 'proj-2',
    client: 'MedHealth Diagnostics Network',
    title: 'HIPAA-Certified Medical Imaging Scanner & Diagnostic Cloud',
    industry: 'Healthcare Tech',
    desc: 'Engineered a cloud-native radiological imaging portal serving 50+ hospital networks with automated AI lesion detection and instant doctor reporting.',
    impact: ['98.7% Diagnostic Accuracy', '50+ Hospital Networks', 'HIPAA & GDPR Certified'],
  },
  {
    id: 'proj-3',
    client: 'Apex Banking & Financial Services',
    title: 'Omnichannel Microservices Core & Mobile Banking Platform',
    industry: 'FinTech & Banking',
    desc: 'Re-architected legacy banking core into modern cloud microservices handling 1.5 million daily transactions with zero downtime and sub-second payment settlement.',
    impact: ['1.5M Daily Transactions', '99.999% High Availability', 'Zero Payment Lag'],
  },
  {
    id: 'proj-4',
    client: 'AutoSmart Robotics Manufacturing',
    title: 'Industrial IoT Telemetry Hub & Autonomous Factory Control',
    industry: 'Smart Manufacturing',
    desc: 'Integrated custom sensor hardware and SCADA dashboards for automated assembly line monitoring, enabling zero-touch machine maintenance.',
    impact: ['500+ Factory Sensors', 'Zero Unplanned Downtime', 'Real-Time SCADA Sync'],
  },
];

// Fallback Section 5: Production Tech Stack Data
const defaultTechStack = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Frameworks',
    icon: 'ai',
    desc: 'Deep neural networks, LLM orchestration, model training, computer vision, and high-throughput inference.',
    tech: ['PyTorch', 'TensorFlow', 'OpenAI APIs', 'FastAPI', 'Ray', 'OpenCV'],
    gradient: 'from-purple-600 via-indigo-500 to-purple-300',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & Infrastructure Systems',
    icon: 'cloud',
    desc: 'Elastic cluster orchestration, zero-trust cloud VPC, Infrastructure as Code, and real-time metric telemetry.',
    tech: ['Kubernetes', 'Docker', 'AWS', 'Google Cloud', 'Terraform', 'Grafana'],
    gradient: 'from-blue-600 via-cyan-500 to-sky-300',
  },
  {
    id: 'fullstack-web',
    title: 'Full-Stack & Mobile Engineering',
    icon: 'code',
    desc: 'High-concurrency web applications, cross-platform mobile apps, reactive APIs, and low-latency database caching.',
    tech: ['React', 'Next.js', 'Node.js', 'Go', 'PostgreSQL', 'Redis'],
    gradient: 'from-emerald-600 via-teal-500 to-emerald-300',
  },
];

// Fallback Section 6: Client Testimonials
const defaultTestimonials = [
  {
    name: 'Dr. Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'MedHealth Diagnostics',
    quote: 'Porulon Technologies delivered our AI diagnostic cloud platform ahead of schedule. Their engineering precision, HIPAA compliance adherence, and system stability exceeded our highest expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Elena Rostova',
    role: 'VP of Engineering',
    company: 'GlobalLogistics Corp',
    quote: 'The AI fleet optimization engine developed by Porulon transformed our logistics workflow. We saw an immediate 22% reduction in fuel consumption across 10,000 active delivery vehicles.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Head of Digital Solutions',
    company: 'Apex Financial Tech',
    quote: 'Porulon’s microservices architecture replaced our legacy banking core smoothly. We now process 1.5M transactions daily with zero downtime and sub-second payment settlement.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  },
];

export default function Products() {
  const { openModal } = useContactModal();

  const handleContactClick = (e, link) => {
    if (link === '/contactus' || link === '/contactus/') {
      e.preventDefault();
      openModal();
    }
  };

  const [dbSections, setDbSections] = useState(null);

  // Fetch Section Settings Dynamically from Backend DB
  useEffect(() => {
    let isMounted = true;
    fetchSections('projects')
      .then((data) => {
        if (!isMounted) return;
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
      .catch(() => {
        if (isMounted) setDbSections({});
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const heroSec = dbSections?.projects_hero;
  const trustSec = dbSections?.projects_trust_bar;
  const gridSec = dbSections?.projects_grid;
  const clientSec = dbSections?.projects_client_stories;
  const techSec = dbSections?.projects_tech_stack;
  const testiSec = dbSections?.projects_testimonials;
  const secSec = dbSections?.projects_security;
  const ctaSec = dbSections?.projects_cta;

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
  const showTrust = isSecVisible(trustSec);
  const showGrid = isSecVisible(gridSec);
  const showClientStories = isSecVisible(clientSec);
  const showTechStack = isSecVisible(techSec);
  const showTestimonials = isSecVisible(testiSec);
  const showCta = isSecVisible(ctaSec);

  // Background Media Parsing for Section 1 Hero Banner
  const bgMediaUrl = getCleanMediaUrl(heroSec?.mediaUrl || heroSec?.heroMedia);
  const isVideo = bgMediaUrl && (
    bgMediaUrl.toLowerCase().endsWith('.mp4') ||
    bgMediaUrl.toLowerCase().endsWith('.webm') ||
    bgMediaUrl.toLowerCase().endsWith('.mkv') ||
    bgMediaUrl.toLowerCase().endsWith('.mov')
  );

  // Dynamic Product Items from DB (Direct Admin Sync — ZERO fallback data when DB items array exists!)
  const displayProducts = (gridSec?.items !== undefined && Array.isArray(gridSec.items))
    ? gridSec.items.map((item, idx) => ({
        id: item._id || item.slug || `prod-${idx}`,
        title: item.title || item.name || '',
        category: (item.category || item.categoryLabel || '').trim(),
        categoryLabel: item.categoryLabel || item.category || '',
        tagline: item.tagline || item.shortDesc || '',
        desc: item.desc || item.fullDesc || item.excerpt || '',
        features: Array.isArray(item.features) ? item.features : (Array.isArray(item.points) ? item.points : []),
        tech: Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : []),
        img: getCleanMediaUrl(item.img || item.mediaUrl),
      }))
    : defaultProducts;

  // Dynamic Client Projects from DB (Direct Admin Sync — ZERO fallback data when DB items array exists!)
  const displayClientProjects = (clientSec?.items !== undefined && Array.isArray(clientSec.items))
    ? clientSec.items.map((item, idx) => ({
        id: item._id || `proj-${idx}`,
        client: item.client || item.badge || '',
        title: item.title || item.name || '',
        industry: item.industry || item.category || '',
        desc: item.desc || item.fullDesc || '',
        impact: Array.isArray(item.impact) ? item.impact : (Array.isArray(item.points) ? item.points : []),
      }))
    : defaultClientProjects;

  // Dynamic Tech Stack Categories from DB (Direct Admin Sync — ZERO fallback data when DB items array exists!)
  const displayTechStack = (techSec?.items !== undefined && Array.isArray(techSec.items))
    ? techSec.items.map((item, idx) => {
        const defaultGradients = [
          'from-purple-600 via-indigo-500 to-purple-300',
          'from-blue-600 via-cyan-500 to-sky-300',
          'from-emerald-600 via-teal-500 to-emerald-300',
          'from-amber-600 via-orange-500 to-amber-300',
          'from-rose-600 via-pink-500 to-rose-300',
        ];
        return {
          id: item._id || item.id || `tech-${idx}`,
          title: item.title || item.name || '',
          icon: item.icon || 'ai',
          desc: item.desc || item.fullDesc || '',
          gradient: item.gradient || defaultGradients[idx % defaultGradients.length],
          tech: Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : (Array.isArray(item.points) ? item.points : [])),
        };
      })
    : defaultTechStack;

  // Dynamic Testimonials from DB (Direct Admin Sync — ZERO fallback data when DB items array exists!)
  const displayTestimonials = (testiSec?.items !== undefined && Array.isArray(testiSec.items))
    ? testiSec.items.map((item, idx) => ({
        name: item.name || item.author || '',
        role: item.role || item.title || '',
        company: item.company || '',
        quote: item.quote || item.desc || item.content || '',
        rating: item.rating || 5,
        avatar: getCleanMediaUrl(item.avatar || item.mediaUrl || item.img),
      }))
    : defaultTestimonials;

  // Marquee Track Data for Section 2 (Guaranteed collapse-proof continuous track)
  const rawTrustItems = (trustSec?.items && trustSec.items.length > 0)
    ? trustSec.items
    : [
        { title: 'MedHealth Diagnostics Network' },
        { title: 'GlobalLogistics AP' },
        { title: 'Apex Banking Core' },
        { title: 'AutoSmart Robotics' },
        { title: 'CloudScale Networks' },
        { title: 'FinTech Sentinel' },
      ];

  let trustMarqueeItems = [...rawTrustItems];
  while (trustMarqueeItems.length > 0 && trustMarqueeItems.length < 12) {
    trustMarqueeItems = [...trustMarqueeItems, ...rawTrustItems];
  }

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans">
      
      {/* ============================================================ */}
      {/* SECTION 1: HERO BANNER & VALUE PROPOSITION */}
      {/* ============================================================ */}
      {showHero && (
        <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          
          {/* Background Media (Ultra-High Visibility Photo/Video in Light & Dark Themes) or Ambient Aurora Glow */}
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
                  alt="Products Hero Background"
                  className="w-full h-full object-cover object-right md:object-center opacity-95 sm:opacity-100 brightness-115 contrast-105 scale-105 transition-transform duration-1000"
                />
              )}
              {/* High Contrast Dark Overlay matching Industries page */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-transparent" />
            </div>
          ) : (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] aurora-blur opacity-25 pointer-events-none" />
          )}

          {/* Top & Bottom Seamless Blending Fade Gradients (Soft, Light & Line-Free) */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg via-bg/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none z-10" />

          {/* Soft ambient glow behind left content */}
          <div className="absolute -left-20 top-1/3 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[120px] pointer-events-none z-10" />

          <div className="max-w-container mx-auto px-gutter text-center relative z-20">
            
            {/* Kicker Chip */}
            <span className="inline-block px-5 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-md text-purple-300 text-xs font-extrabold tracking-[0.18em] uppercase mb-5 shadow-2xs">
              {heroSec?.kicker || 'Enterprise Products & Client Engineering'}
            </span>

            {/* Main Headline Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white max-w-5xl mx-auto mb-6 leading-[1.15] drop-shadow-md">
              <FormattedTitle
                title={heroSec?.title}
                defaultText="Engineering Flagship Digital Products & Client Solutions"
                accentClass="text-purple-400 font-normal"
                highlightWords={2}
              />
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed tracking-tight mb-12">
              {heroSec?.subtitle ||
                'Explore Porulon’s proprietary AI engines, IoT platforms, multi-cloud suites, and real-world enterprise projects delivered for leading global organizations.'}
            </p>

            {/* Resilient Responsive Metric Counters Grid (Flex-wrap prevents ANY layout collapse!) */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-5xl mx-auto">
              {(heroSec?.stats && heroSec.stats.length > 0 ? heroSec.stats : [
                { label: 'Products & Projects', value: '120+' },
                { label: 'System Uptime SLA', value: '99.9%' },
                { label: 'Industry Verticals', value: '15+' },
                { label: 'Client Value Created', value: '$45M+' },
              ]).map((st, sIdx) => (
                <div key={sIdx} className="flex-1 min-w-[140px] max-w-[220px]">
                  <StatCounterItem
                    rawValue={st.value}
                    label={st.label}
                    delay={sIdx * 150}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 2: CLIENT TRUST MARQUEE TICKER (MULTI-COLOR UNIQUE BRAND TEXT) */}
      {/* ============================================================ */}
      {showTrust && (
        <section className="py-10 bg-transparent relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter text-center space-y-6">
            <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase block">
              {trustSec?.kicker || 'Trusted by Engineering Leaders & Global Client Brands'}
            </span>

            {/* Smooth Infinite Running Marquee Track (Multi-Color Distinct Brand Names) */}
            <div className="relative overflow-hidden w-full py-4">
              {/* Gradient Mask Edge Blending */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg via-bg/85 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg via-bg/85 to-transparent z-10 pointer-events-none" />

              <div className="marquee flex items-center gap-14">
                {trustMarqueeItems.map((tr, tIdx) => {
                  const colorGradient = BRAND_GRADIENT_PALETTES[tIdx % BRAND_GRADIENT_PALETTES.length];
                  return (
                    <span
                      key={tIdx}
                      className={`text-base sm:text-lg md:text-xl font-extrabold tracking-wider uppercase whitespace-nowrap bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent opacity-95 hover:opacity-100 hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer`}
                    >
                      {tr.title || tr.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 3: FLAGSHIP PRODUCTS SHOWCASE GRID (COLLAPSE-PROOF & CLEAN) */}
      {/* ============================================================ */}
      {showGrid && (
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              {gridSec?.kicker && (
                <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                  {gridSec.kicker}
                </span>
              )}
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mb-4">
                <FormattedTitle
                  title={gridSec?.title}
                  defaultText="Our Flagship Software Products"
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

            {/* Product Cards Grid (COLLAPSE-PROOF GLASS CARDS WITH FLUID SHEEN SWEEP) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {displayProducts.map((prod, pIdx) => {
                const hasPhoto = Boolean(prod.img);
                return (
                  <div
                    key={prod.id || pIdx}
                    className="group relative rounded-3xl flex flex-col justify-between hover:-translate-y-1.5 shadow-lg shadow-purple-900/5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)] bg-white/85 dark:bg-[#100d28]/75 backdrop-blur-xl transition-all duration-500 overflow-hidden border border-slate-200/50 dark:border-purple-500/10 hover:border-purple-500/30 cursor-pointer"
                  >
                    {/* Fluid Glass Reflection Sheen Sweep Effect on Hover */}
                    <div className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-purple-400/10 to-transparent transition-transform duration-1000 ease-in-out z-20" />

                    {/* Full Cover Product Media Header (ZERO PADDING, NO OVERLAPPED TEXT) */}
                    {hasPhoto && (
                      <div className="w-full h-56 sm:h-64 overflow-hidden relative bg-slate-950">
                        <img
                          src={prod.img}
                          alt={prod.title || 'Product Cover'}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}

                    {/* Card Body Content (Clean Padding below the full cover photo) */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4 relative z-10">
                      
                      <div className="space-y-3 flex-1">
                        {/* Category Tag Badge */}
                        {prod.categoryLabel && (
                          <div>
                            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-purple-600/15 text-purple-800 dark:text-purple-300">
                              {prod.categoryLabel}
                            </span>
                          </div>
                        )}

                        {prod.title && (
                          <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors leading-snug">
                            {prod.title}
                          </h3>
                        )}

                        {prod.tagline && (
                          <p className="text-xs font-semibold text-amber-500 dark:text-amber-400 tracking-tight">
                            {prod.tagline}
                          </p>
                        )}

                        {prod.desc && (
                          <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-light tracking-tight">
                            {prod.desc}
                          </p>
                        )}

                        {/* Feature Bullet Points */}
                        {prod.features && prod.features.length > 0 && (
                          <div className="space-y-2 pt-2">
                            {prod.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2 text-xs font-light text-text tracking-tight">
                                <HiOutlineCheckCircle className="text-emerald-500 text-base shrink-0 group-hover:scale-110 transition-transform" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Tech Stack & Action Button */}
                      <div className="pt-2 space-y-4">
                        {prod.tech && prod.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {prod.tech.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 group-hover:border-purple-500/40 group-hover:bg-purple-500/15 transition-all"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="pt-1">
                          <a
                            href="/contactus"
                            onClick={(e) => handleContactClick(e, "/contactus")}
                            className="btn-primary w-full py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-tight inline-flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 no-underline"
                          >
                            <span>Explore Product & Request Demo</span>
                            <GoArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 4: DELIVERED CLIENT PROJECTS SHOWCASE (ULTRA-EXECUTIVE CASE STUDY DESIGN) */}
      {/* ============================================================ */}
      {showClientStories && (
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                {clientSec?.kicker || 'Proven Client Track Record'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mb-4">
                <FormattedTitle
                  title={clientSec?.title}
                  defaultText="Featured Client Projects & Engineering"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {clientSec?.subtitle && (
                <p className="text-text-muted text-sm sm:text-base font-light tracking-tight">
                  {clientSec.subtitle}
                </p>
              )}
            </div>

            {/* Client Projects Grid (Ultra-Executive Case Study Cards, 100% Direct Admin Sync, No Harsh Borders) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {displayClientProjects.map((proj, pIdx) => (
                <div
                  key={proj.id || pIdx}
                  className="group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg shadow-purple-900/5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)] bg-white/85 dark:bg-[#100d28]/75 backdrop-blur-xl transition-all duration-500 overflow-hidden border border-slate-200/50 dark:border-purple-500/10 hover:border-purple-500/30 cursor-pointer"
                >
                  {/* Fluid Sheen Reflection Sweep Effect */}
                  <div className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-purple-400/10 to-transparent transition-transform duration-1000 ease-in-out z-20" />

                  <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-3">
                      {/* Header Badges Row: Industry Badge & Client Name */}
                      {(proj.industry || proj.client) && (
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          {proj.industry && (
                            <span className="px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[11px] font-bold tracking-tight uppercase">
                              {proj.industry}
                            </span>
                          )}
                          {proj.client && (
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-tight">
                              {proj.client}
                            </span>
                          )}
                        </div>
                      )}

                      {proj.title && (
                        <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors leading-snug pt-1">
                          {proj.title}
                        </h3>
                      )}

                      {proj.desc && (
                        <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-light tracking-tight">
                          {proj.desc}
                        </p>
                      )}
                    </div>

                    {/* Verified Business Impact Badges */}
                    {proj.impact && proj.impact.length > 0 && (
                      <div className="pt-4 space-y-3">
                        <span className="text-[11px] uppercase tracking-wider text-text-muted font-bold block">
                          Verified Business Impact:
                        </span>

                        <div className="flex flex-wrap gap-2">
                          {proj.impact.map((imp, iIdx) => (
                            <span
                              key={iIdx}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-tight flex items-center gap-1.5 group-hover:border-emerald-500/40 transition-all"
                            >
                              <GoCheck className="text-emerald-500 text-sm shrink-0" />
                              <span>{imp}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 5: PRODUCTION TECH STACK ARCHITECTURE (PURE EXPANDING GRADIENT LINE ONLY - NO BG TRACK) */}
      {/* ============================================================ */}
      {showTechStack && (
        <section className="py-12 md:py-16 relative overflow-hidden">
          {/* Ambient Tech Circuit Guidelines Background */}
          <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="max-w-container mx-auto px-gutter relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                {techSec?.kicker || 'Engineering Backbone'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mb-4">
                <FormattedTitle
                  title={techSec?.title}
                  defaultText="Production Tech Stack Architecture"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {techSec?.subtitle && (
                <p className="text-text-muted text-sm sm:text-base font-light tracking-tight">
                  {techSec.subtitle}
                </p>
              )}
            </div>

            {/* Futuristic Constellation Columns with Pure Expanding Line (Guaranteed 100% Visible Top Line for ALL columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 items-start">
              {displayTechStack.map((item, tIdx) => {
                const inlineGradients = [
                  'linear-gradient(90deg, #a855f7 0%, #6366f1 50%, #c084fc 100%)', // Card 1: Vivid Purple/Indigo
                  'linear-gradient(90deg, #3b82f6 0%, #06b6d4 50%, #38bdf8 100%)', // Card 2: Vivid Blue/Cyan
                  'linear-gradient(90deg, #10b981 0%, #14b8a6 50%, #34d399 100%)', // Card 3: Vivid Emerald/Teal
                  'linear-gradient(90deg, #f59e0b 0%, #f97316 50%, #fbbf24 100%)', // Card 4: Vivid Amber/Orange
                  'linear-gradient(90deg, #f43f5e 0%, #ec4899 50%, #fb7185 100%)', // Card 5: Vivid Rose/Pink
                ];
                const currentInlineGradient = inlineGradients[tIdx % inlineGradients.length];

                return (
                  <div key={item.id || tIdx} className="group relative space-y-6">
                    
                    {/* Pure Top Gradient Line: Short (w-20) unhovered -> Expands across top (w-full) on hover */}
                    {/* 100% Guaranteed cross-browser glowing linear gradient for EVERY single card */}
                    <div
                      style={{ background: currentInlineGradient }}
                      className="h-1.5 w-20 group-hover:w-full rounded-full transition-all duration-700 ease-out mb-6 shadow-md shadow-purple-500/20"
                    />

                    {/* Category Title & Dynamic React Icon */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          {renderTechIcon(item.icon)}
                        </div>
                        {item.title && (
                          <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors leading-snug">
                            {item.title}
                          </h3>
                        )}
                      </div>

                      {item.desc && (
                        <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-light tracking-tight">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {/* Interactive Floating Tech Pills Cloud */}
                    {item.tech && item.tech.length > 0 && (
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-2.5">
                          {item.tech.map((t, i) => (
                            <div
                              key={i}
                              className="group/pill relative px-4 py-2 rounded-2xl bg-white/70 dark:bg-purple-950/30 text-slate-800 dark:text-purple-200 border border-slate-200/60 dark:border-purple-500/20 text-xs sm:text-sm font-semibold tracking-tight shadow-xs hover:border-purple-500/50 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover/pill:bg-white transition-colors" />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 6: CLIENT TESTIMONIALS (EXECUTIVE CARDS, ZERO FALLBACK, 100% ADMIN SYNC) */}
      {/* ============================================================ */}
      {showTestimonials && (
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter space-y-12">
            
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                {testiSec?.kicker || 'Verified Executive Feedback'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-text tracking-tight mb-4">
                <FormattedTitle
                  title={testiSec?.title}
                  defaultText="What Executive Leaders Say"
                  accentClass="text-gradient font-light"
                  highlightWords={2}
                />
              </h2>
              {testiSec?.subtitle && (
                <p className="text-text-muted text-sm sm:text-base font-light tracking-tight">
                  {testiSec.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {displayTestimonials.map((t, tIdx) => {
                const hasAvatar = Boolean(t.avatar);
                return (
                  <div
                    key={t.id || tIdx}
                    className="group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg shadow-purple-900/5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)] bg-white/85 dark:bg-[#100d28]/75 backdrop-blur-xl transition-all duration-500 overflow-hidden border border-slate-200/50 dark:border-purple-500/10 hover:border-purple-500/30 cursor-pointer"
                  >
                    {/* Fluid Glass Reflection Sheen Sweep Effect */}
                    <div className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-purple-400/10 to-transparent transition-transform duration-1000 ease-in-out z-20" />

                    <div className="space-y-4 flex-1 flex flex-col justify-between relative z-10">
                      <div className="space-y-4">
                        {/* Star Rating Badges */}
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <HiOutlineStar key={i} className="fill-amber-400 text-sm" />
                          ))}
                        </div>

                        {t.quote && (
                          <p className="text-xs sm:text-sm text-text leading-relaxed font-light tracking-tight italic">
                            "{t.quote}"
                          </p>
                        )}
                      </div>

                      {/* Executive Author Header */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-11 h-11 rounded-full bg-purple-600/15 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center overflow-hidden shrink-0 border border-purple-500/20">
                          {hasAvatar ? (
                            <img src={t.avatar} alt={t.name || 'Author'} className="w-full h-full object-cover" />
                          ) : (
                            <span>{(t.name || 'E').charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          {t.name && (
                            <h4 className="text-xs sm:text-sm font-bold text-text tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                              {t.name}
                            </h4>
                          )}
                          {(t.role || t.company) && (
                            <span className="text-[11px] text-text-muted font-light tracking-tight block">
                              {t.role}{t.role && t.company ? ' • ' : ''}
                              {t.company && <strong className="text-purple-600 dark:text-purple-400 font-semibold">{t.company}</strong>}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 8: HIGH-IMPACT CONSULTATION & DEMO CTA */}
      {/* ============================================================ */}
      {showCta && (
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            <div className="glass-card rounded-3xl md:rounded-[32px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border border-primary-strong/20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] aurora-blur opacity-25 pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase mb-3 inline-block">
                  {ctaSec?.kicker || 'Launch Your Solution'}
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-text tracking-tight mb-4 leading-tight">
                  <FormattedTitle
                    title={ctaSec?.title}
                    defaultText="Ready to Deploy Our Products?"
                    accentClass="text-gradient font-light"
                    highlightWords={1}
                  />
                </h2>

                <p className="text-sm sm:text-base text-text-muted mb-8 max-w-xl mx-auto leading-relaxed font-light tracking-tight">
                  {ctaSec?.subtitle ||
                    'Schedule a live product demonstration or consult with our solution architects to design your enterprise software strategy.'}
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
                  {((ctaSec?.buttons !== undefined && Array.isArray(ctaSec.buttons))
                    ? ctaSec.buttons
                    : [
                        { label: 'Schedule Live Demo', link: '/contactus' },
                        { label: 'Request Product Proposal', link: '/contactus' },
                      ]
                  ).map((btn, bIdx) => (
                    <a
                      key={bIdx}
                      href={btn.link || '/contactus'}
                      onClick={(e) => handleContactClick(e, btn.link || '/contactus')}
                      className={
                        bIdx === 0
                          ? 'group btn-primary px-8 py-3.5 rounded-full font-light tracking-tight text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-strong/25 inline-flex items-center gap-2'
                          : 'btn-ghost px-8 py-3.5 rounded-full font-light tracking-tight text-sm sm:text-base hover:bg-primary-soft transition-colors border border-border/50'
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
