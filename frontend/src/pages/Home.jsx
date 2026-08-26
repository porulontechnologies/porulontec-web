// import SectionBackground from '../components/SectionBackground.jsx';
// import GlowImage from '../components/GlowImage.jsx';

// const clients = [
//   {
//     name: "Client 1",
//     logo: "/images/clients/client1.jpg",
//   },
//   {
//     name: "Client 2",
//     logo: "/images/clients/client2.jpg",
//   },
//   {
//     name: "Client 3",
//     logo: "/images/clients/client3.jpg",
//   },
//   {
//     name: "Client 4",
//     logo: "/images/clients/client4.jpg",
//   },
//   {
//     name: "Client 5",
//     logo: "/images/clients/client5.jpg",
//   },
//   // {
//   //   name: "Client 6",
//   //   logo: "/images/clients/client6.jpg",
//   // },
//   {
//     name: "Client 7",
//     logo: "/images/clients/client7.jpg",
//   },
//   {
//     name: "Client 8",
//     logo: "/images/clients/client8.jpg",
//   },
// ];

// const services = [
//   {
//     title: 'AI & Machine Learning',
//     desc: 'Building predictive engines and cognitive agents that automate decision-making at scale.',
//     points: ['NLP & Computer Vision', 'Generative AI Models'],
//     img: '/images/service-ai.jpg',
//   },
//   {
//     title: 'Cloud Architecture',
//     desc: 'Scalable, cloud-native infrastructures designed for high availability and zero downtime.',
//     points: ['AWS / Azure / GCP', 'Serverless Scaling'],
//     img: '/images/service-cloud.jpg',
//   },
//   {
//     title: 'Full-Stack Dev',
//     desc: 'Modern web and mobile ecosystems built with performance and security as core pillars.',
//     points: ['React & React Native', 'Microservices'],
//     img: '/images/service-fullstack.jpg',
//   },
//   {
//     title: 'Cybersecurity',
//     desc: 'Fortifying your digital assets with advanced threat detection and zero-trust security.',
//     points: ['Threat Monitoring', 'Compliance Audit'],
//     img: '/images/service-cyber.jpg',
//   },
//   {
//     title: 'IoT Ecosystems',
//     desc: 'Connecting the physical world with digital intelligence through smart sensor networks.',
//     points: ['Edge Computing', 'Hardware Integration'],
//     img: '/images/service-iot.jpg',
//   },
//   {
//     title: 'Porulon Academy',
//     desc: 'Upskilling the next generation of engineers with industry-aligned technical training.',
//     points: ['Corporate Training', 'Certification'],
//     img: '/images/service-academy.jpg',
//   },
// ];

// const whyUs = [
//   { icon: 'bolt', title: 'Rapid Deployment', desc: 'From proof-of-concept to production in weeks, not months.' },
//   { icon: 'lock', title: 'Enterprise Security', desc: 'SOC 2 compliant infrastructure and end-to-end encryption.' },
//   { icon: 'groups', title: 'Expert Talent', desc: 'Work directly with senior architects who understand your business logic.' },
// ];

// export default function Home() {
//   return (
//     <main className="relative overflow-hidden">
//       {/* ===== HERO / SECTION 1 ===== */}
//       <section className="relative pt-40 pb-section-sm md:pb-section">
//         <SectionBackground
//           // Drop a real file at /public/videos/hero.mp4 and uncomment to use actual footage:
//           // videoSrc="/videos/hero.mp4"
//           imageSrc="/images/hero-visual.jpg"
//         />
//         <div className="max-w-container mx-auto px-gutter grid lg:grid-cols-2 gap-12 items-center">
//           <div className="relative z-10 animate-fade-up">
//             <span className="inline-block px-4 py-1 rounded-full bg-primary-soft border border-primary-strong/20 text-primary-strong text-xs font-semibold tracking-[0.14em] uppercase mb-6">
//               Pioneering Deep-Tech Excellence
//             </span>
//             <h1 className="text-display-xl-mobile md:text-display-xl mb-6 leading-tight text-text">
//               Intelligent Solutions for a <span className="text-gradient">Smarter Tomorrow</span>
//             </h1>
//             <p className="text-lg text-text-muted mb-10 max-w-xl leading-relaxed">
//               Empowering enterprises with cutting-edge AI, IoT, and Cloud transformation. We bridge
//               the gap between complex engineering and human-centric digital experiences.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <a href="/contact" className="btn-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all">
//                 Get Started <span className="material-symbols-outlined">arrow_forward</span>
//               </a>
//               <a href="/services" className="btn-ghost px-8 py-4 rounded-xl font-bold hover:bg-primary-soft transition-colors">
//                 Explore Services
//               </a>
//               <button className="flex items-center gap-3 text-primary-strong font-bold px-4 py-4 hover:opacity-80 transition-opacity">
//                 <span className="w-12 h-12 rounded-full border border-primary-strong/30 flex items-center justify-center bg-primary-soft">
//                   <span className="material-symbols-outlined">play_arrow</span>
//                 </span>
//                 Watch Video
//               </button>
//             </div>
//           </div>

//           <div className="relative lg:h-[600px] flex items-center justify-center">
//             <div className="relative w-full glass-card rounded-2xl p-6 animate-float">
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex gap-2">
//                   <div className="w-3 h-3 rounded-full bg-red-400/60" />
//                   <div className="w-3 h-3 rounded-full bg-teal/60" />
//                   <div className="w-3 h-3 rounded-full bg-primary-strong/60" />
//                 </div>
//                 <div className="h-2 w-32 bg-text/10 rounded-full" />
//               </div>
//               <div className="grid grid-cols-3 gap-4 mb-8">
//                 <div className="h-24 rounded-xl bg-primary-soft border border-primary-strong/20 p-4">
//                   <div className="h-2 w-10 bg-primary-strong/30 rounded-full mb-4" />
//                   <div className="h-8 w-16 bg-primary-strong/20 rounded-lg" />
//                 </div>
//                 <div className="h-24 rounded-xl bg-teal-soft border border-teal/20 p-4">
//                   <div className="h-2 w-10 bg-teal/30 rounded-full mb-4" />
//                   <div className="h-8 w-16 bg-teal/20 rounded-lg" />
//                 </div>
//                 <div className="h-24 rounded-xl bg-primary-soft border border-primary-strong/20 p-4">
//                   <div className="h-2 w-10 bg-primary-strong/30 rounded-full mb-4" />
//                   <div className="h-8 w-16 bg-primary-strong/20 rounded-lg" />
//                 </div>
//               </div>
//               <div className="h-32 rounded-xl bg-text/5 border border-border relative overflow-hidden">
//                 <div className="absolute inset-0 aurora-blur opacity-50" />
//                 <div className="relative p-4">
//                   <div className="h-2 w-full bg-text/10 rounded-full mb-2" />
//                   <div className="h-2 w-3/4 bg-text/10 rounded-full mb-2" />
//                   <div className="h-2 w-1/2 bg-text/10 rounded-full" />
//                 </div>
//               </div>
//             </div>
//             <div className="absolute inset-0 aurora-blur scale-150 -z-10" />
//           </div>
//         </div>

//         {/* Stats strip */}
//         <div className="max-w-container mx-auto px-gutter mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
//           {[
//             ['15+', 'Projects Delivered'],
//             ['10+', 'Enterprise Clients'],
//             ['99.9%', 'System Uptime'],
//             ['3+', 'Industries Served'],
//           ].map(([n, l]) => (
//             <div key={l} className="glass-card rounded-2xl p-6 text-center">
//               <p className="text-3xl font-extrabold text-gradient">{n}</p>
//               <p className="text-xs uppercase tracking-widest text-text-muted mt-2">{l}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== CLIENT MARQUEE ===== */}
//       <section className="border-y border-border bg-bg-elevated/60 backdrop-blur-sm overflow-hidden">
//         {/* <div className="marquee-track">
//           {[...clients, ...clients].map((c, i) => (
//             <span
//               key={c + i}
//               className="text-text-muted/50 font-extrabold uppercase tracking-widest text-xl px-8 whitespace-nowrap"
//             >
//               {c}
//             </span>
//           ))}
//         </div> */}
//     <div className="marquee">

//         {[...clients, ...clients].map((client, index) => (

//             <div
//                 key={index}
//                 className="
//                 group
//                 flex
//                 items-center
//                 justify-center
//                 w-[200px]
//                 h-[100px]
//                 mx-5
//                 shrink-0
//                 rounded-2xl
               
//             "
//             >

//                 <img
//                     src={client.logo}
//                     alt={client.name}
//                     className="
//                     max-h-12
//                     max-w-[120px]
//                     object-contain
//                     duration-500
//                 "
//                 />

//             </div>

//         ))}

//     </div>
//       </section>

//       {/* ===== ABOUT PREVIEW ===== */}
//       <section className="py-section-sm md:py-section">
//         <div className="max-w-container mx-auto px-gutter grid lg:grid-cols-2 gap-12 items-center">
//           <div className="relative group">
//             <GlowImage
//               src="/images/about-team.jpg"
//               alt="Porulon Technologies team collaborating"
//               className="aspect-[4/3]"
//               rounded="rounded-2xl"
//             />
//             <div className="absolute -bottom-8 -right-8 hidden md:block w-60 h-60 glass-card rounded-2xl p-6 rotate-3 group-hover:rotate-0 transition-transform">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 rounded-lg bg-primary-soft text-primary-strong">
//                   <span className="material-symbols-outlined">verified</span>
//                 </div>
//                 <span className="font-bold text-text">Quality First</span>
//               </div>
//               <p className="text-text-muted text-sm">
//                 Engineering standards that meet the highest global benchmarks for reliability.
//               </p>
//             </div>
//           </div>

//           <div className="lg:pl-8">
//             <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase">About Us</span>
//             <h2 className="text-headline-lg text-text mt-4 mb-8">
//               Redefining Tech <br />
//               <span className="text-primary-strong">Consultancy</span>
//             </h2>
//             <p className="text-lg text-text-muted mb-8 leading-relaxed">
//               Porulon Technologies is a forward-thinking technology company specializing in AI, ML,
//               and automation-based software solutions. Beyond software, we shape the future through
//               consultancy, research, and training programs that prepare young minds for the careers
//               of tomorrow.
//             </p>
//             <div className="grid grid-cols-2 gap-8 mb-10">
//               <div>
//                 <h3 className="text-metric-stat text-primary-strong mb-1">15+</h3>
//                 <p className="text-xs uppercase tracking-widest text-text-muted">Global Projects</p>
//               </div>
//               <div>
//                 <h3 className="text-metric-stat text-teal mb-1">10+</h3>
//                 <p className="text-xs uppercase tracking-widest text-text-muted">Enterprise Clients</p>
//               </div>
//             </div>
//             <a href="/about" className="group inline-flex items-center gap-2 text-primary-strong font-bold">
//               Learn More About Our Mission
//               <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
//                 arrow_forward
//               </span>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ===== FEATURED SERVICES ===== */}
//       <section className="py-section-sm md:py-section bg-bg-elevated relative overflow-hidden">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] aurora-blur opacity-20 -z-0" />
//         <div className="max-w-container mx-auto px-gutter relative z-10">
//           <div className="text-center mb-16">
//             <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase">
//               What We Excel At
//             </span>
//             <h2 className="text-headline-lg text-text mt-4">
//               Full-Spectrum Technical <span className="text-gradient">Capabilities</span>
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map((s) => (
//               <div key={s.title} className="glass-card rounded-2xl p-8 group">
//                 <GlowImage src={s.img} alt={s.title} className="h-48 mb-6" rounded="rounded-xl" />
//                 <h3 className="text-headline-sm text-text mb-3">{s.title}</h3>
//                 <p className="text-text-muted mb-6">{s.desc}</p>
//                 <ul className="space-y-2 text-sm text-text-muted/90">
//                   {s.points.map((p) => (
//                     <li key={p} className="flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 rounded-full bg-primary-strong" /> {p}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <a href="/services" className="btn-ghost inline-block px-8 py-3 rounded-full font-bold hover:bg-primary-soft transition-colors">
//               View All Services
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ===== INDUSTRIES BENTO ===== */}
//       <section className="py-section-sm md:py-section">
//         <div className="max-w-container mx-auto px-gutter">
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//             <div>
//               <span className="text-teal text-xs font-semibold tracking-[0.2em] uppercase">Global Impact</span>
//               <h2 className="text-headline-lg text-text mt-4">
//                 Industries We <span className="text-gradient">Empower</span>
//               </h2>
//             </div>
//             <p className="text-text-muted max-w-md">
//               Our solutions are built to tackle the unique challenges of high-stakes industries,
//               ensuring security and efficiency.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[720px]">
//             <div className="md:col-span-2 md:row-span-2 glass-card rounded-3xl relative overflow-hidden p-10 flex flex-col justify-end group min-h-[320px]">
//               <img
//                 src="/images/industry-healthcare.jpg"
//                 alt="Healthcare technology"
//                 className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
//               <div className="relative z-10">
//                 <h3 className="text-3xl font-bold text-text mb-3">Healthcare</h3>
//                 <p className="text-text-muted max-w-sm mb-4">
//                   AI-driven diagnostics and patient data security for the next era of medicine.
//                 </p>
//                 <span className="material-symbols-outlined text-4xl text-primary-strong">health_metrics</span>
//               </div>
//             </div>

//             <div className="md:col-span-2 glass-card rounded-3xl relative overflow-hidden p-8 flex items-center group min-h-[220px]">
//               <img
//                 src="/images/industry-finance.jpg"
//                 alt="Finance technology"
//                 className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-bg to-transparent" />
//               <div className="relative z-10">
//                 <h3 className="text-headline-sm text-text mb-2">Finance & Fintech</h3>
//                 <p className="text-text-muted text-sm max-w-xs">
//                   Secure transaction protocols and real-time fraud detection systems.
//                 </p>
//               </div>
//             </div>

//             <div className="glass-card rounded-3xl relative overflow-hidden p-8 flex flex-col justify-center items-center text-center group min-h-[180px]">
//               <span className="material-symbols-outlined text-4xl text-teal mb-4">factory</span>
//               <h3 className="text-xl font-bold text-text">Manufacturing</h3>
//             </div>
//             <div className="glass-card rounded-3xl relative overflow-hidden p-8 flex flex-col justify-center items-center text-center group min-h-[180px]">
//               <span className="material-symbols-outlined text-4xl text-primary-strong mb-4">shopping_cart</span>
//               <h3 className="text-xl font-bold text-text">E-Commerce</h3>
//             </div>
//           </div>

//           <div className="text-center mt-10">
//             <a href="/industries" className="text-primary-strong font-bold hover:underline">
//               +7 More Industries
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ===== STATS ===== */}
//       <section className="py-16">
//         <div className="max-w-container mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           {[
//             ['99.9%', 'Uptime Guaranteed', 'Enterprise-grade reliability for all deployed systems.'],
//             ['24/7', 'Technical Support', 'Global response teams dedicated to your success.'],
//             ['10x', 'Faster Deployment', 'Agile workflows that bring products to market rapidly.'],
//           ].map(([n, t, d], i) => (
//             <div key={t} className={`p-8 ${i === 1 ? 'md:border-x border-border' : ''}`}>
//               <h4 className="text-metric-stat text-gradient mb-2">{n}</h4>
//               <p className="text-headline-sm font-bold text-text">{t}</p>
//               <p className="text-text-muted mt-2">{d}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== WHY CHOOSE US ===== */}
//       <section className="py-section-sm md:py-section bg-bg-elevated">
//         <div className="max-w-container mx-auto px-gutter grid lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-headline-lg text-text mb-8">
//               Why Enterprise Leaders <span className="text-primary-strong">Choose Porulon</span>
//             </h2>
//             <div className="space-y-6">
//               {whyUs.map((w) => (
//                 <div key={w.title} className="flex gap-6 group">
//                   <div className="w-16 h-16 shrink-0 rounded-2xl glass-card flex items-center justify-center text-primary-strong group-hover:bg-primary-soft transition-colors">
//                     <span className="material-symbols-outlined text-3xl">{w.icon}</span>
//                   </div>
//                   <div>
//                     <h3 className="text-headline-sm text-text mb-2">{w.title}</h3>
//                     <p className="text-text-muted">{w.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="relative flex items-center justify-center py-10">
//             <div className="aspect-square w-full max-w-sm rounded-full border border-border absolute animate-spin-slow" />
//             <div className="aspect-square w-[86%] max-w-sm rounded-full border border-primary-strong/20 absolute animate-spin-reverse-slow" />
//             <div className="relative aspect-square w-[70%] max-w-xs rounded-full overflow-hidden glow-frame border border-border">
//               <img src="/images/why-choose-orb.jpg" alt="AI intelligence visualization" className="w-full h-full object-cover" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FINAL CTA ===== */}
//       <section className="py-section-sm md:py-section">
//         <div className="max-w-container mx-auto px-gutter">
//           <div className="glass-card rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
//             <div className="absolute inset-0 aurora-blur opacity-30" />
//             <div className="relative z-10">
//               <h2 className="text-display-xl-mobile md:text-display-xl mb-8 text-text">
//                 Ready to Build the <span className="text-gradient">Future?</span>
//               </h2>
//               <p className="text-lg text-text-muted mb-12 max-w-2xl mx-auto">
//                 Join the ranks of leading enterprises already leveraging Porulon's technical
//                 excellence to scale their operations.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-6 justify-center">
//                 <a href="/contact" className="btn-primary px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
//                   Start Your Project
//                 </a>
//                 <a href="/contact" className="btn-ghost px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary-soft transition-colors">
//                   Talk to an Expert
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
import { useState, useEffect, useRef } from 'react';
import { PiDotOutlineFill } from 'react-icons/pi';
import { GoArrowLeft, GoArrowRight, GoPlus } from 'react-icons/go';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { CiLock } from 'react-icons/ci';
import { SlPeople, SlRocket } from 'react-icons/sl';
import { 
  FiShield, FiCheckCircle, FiCpu, FiAward, FiGlobe, 
  FiZap, FiLock, FiUsers, FiStar 
} from 'react-icons/fi';
import { HiOutlineSparkles, HiMiniShieldCheck } from 'react-icons/hi2';

const ADVANTAGE_ICONS_MAP = {
  AiOutlineThunderbolt: <AiOutlineThunderbolt className="text-xl sm:text-2xl" />,
  CiLock: <CiLock className="text-xl sm:text-2xl" />,
  SlPeople: <SlPeople className="text-xl sm:text-2xl" />,
  SlRocket: <SlRocket className="text-xl sm:text-2xl" />,
  FiShield: <FiShield className="text-xl sm:text-2xl" />,
  FiCheckCircle: <FiCheckCircle className="text-xl sm:text-2xl" />,
  FiCpu: <FiCpu className="text-xl sm:text-2xl" />,
  FiAward: <FiAward className="text-xl sm:text-2xl" />,
  FiGlobe: <FiGlobe className="text-xl sm:text-2xl" />,
  FiZap: <FiZap className="text-xl sm:text-2xl" />,
  FiLock: <FiLock className="text-xl sm:text-2xl" />,
  FiUsers: <FiUsers className="text-xl sm:text-2xl" />,
  FiStar: <FiStar className="text-xl sm:text-2xl" />,
};

const getAdvantageIcon = (iconKey, fallbackIdx = 0) => {
  if (iconKey && ADVANTAGE_ICONS_MAP[iconKey]) {
    return ADVANTAGE_ICONS_MAP[iconKey];
  }
  const fallbacks = [
    <AiOutlineThunderbolt className="text-xl sm:text-2xl" />,
    <CiLock className="text-xl sm:text-2xl" />,
    <SlPeople className="text-xl sm:text-2xl" />,
  ];
  return fallbacks[fallbackIdx % fallbacks.length];
};
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { useContactModal } from '../contexts/ContactModalContext.jsx';
import { fetchSections } from '../api/client.js';
import { getCleanMediaUrl } from '../utils/media.js';
import {
  SiPostgresql,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiReact,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiTailwindcss,
  SiRaspberrypi,
} from 'react-icons/si';

const ICON_MAP = {
  SiPostgresql: <SiPostgresql className="w-12 h-12 md:w-14 md:h-14 text-[#4169E1] shrink-0" />,
  SiNodedotjs: <SiNodedotjs className="w-12 h-12 md:w-14 md:h-14 text-[#5FA04E] shrink-0" />,
  SiMongodb: <SiMongodb className="w-12 h-12 md:w-14 md:h-14 text-[#00A35C] shrink-0" />,
  SiTypescript: <SiTypescript className="w-12 h-12 md:w-14 md:h-14 text-[#3178C6] shrink-0" />,
  SiReact: <SiReact className="w-12 h-12 md:w-14 md:h-14 text-[#149ECA] shrink-0" />,
  SiCss: <SiCss className="w-12 h-12 md:w-14 md:h-14 text-[#1572B6] shrink-0" />,
  SiHtml5: <SiHtml5 className="w-12 h-12 md:w-14 md:h-14 text-[#E34F26] shrink-0" />,
  SiTailwindcss: <SiTailwindcss className="w-12 h-12 md:w-14 md:h-14 text-[#38BDF8] shrink-0" />,
  SiRaspberrypi: <SiRaspberrypi className="w-12 h-12 md:w-14 md:h-14 text-[#A22846] shrink-0" />,
};

const getTechIcon = (item) => {
  if (item.icon && ICON_MAP[item.icon]) return ICON_MAP[item.icon];
  const name = (item.name || item.title || '').toLowerCase();
  if (name.includes('postgres')) return ICON_MAP.SiPostgresql;
  if (name.includes('node')) return ICON_MAP.SiNodedotjs;
  if (name.includes('mongo')) return ICON_MAP.SiMongodb;
  if (name.includes('type')) return ICON_MAP.SiTypescript;
  if (name.includes('react')) return ICON_MAP.SiReact;
  if (name.includes('css')) return ICON_MAP.SiCss;
  if (name.includes('html')) return ICON_MAP.SiHtml5;
  if (name.includes('tailwind')) return ICON_MAP.SiTailwindcss;
  if (name.includes('embedded') || name.includes('raspberry')) return ICON_MAP.SiRaspberrypi;
  return <SiReact className="w-12 h-12 md:w-14 md:h-14 text-[#7c3aed] shrink-0" />;
};

const techStacks = [
  { name: "PostgreSQL", icon: <SiPostgresql className="w-12 h-12 md:w-14 md:h-14 text-[#4169E1] shrink-0" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-12 h-12 md:w-14 md:h-14 text-[#5FA04E] shrink-0" /> },
  { name: "MongoDB", icon: <SiMongodb className="w-12 h-12 md:w-14 md:h-14 text-[#00A35C] shrink-0" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-12 h-12 md:w-14 md:h-14 text-[#3178C6] shrink-0" /> },
  { name: "React", icon: <SiReact className="w-12 h-12 md:w-14 md:h-14 text-[#149ECA] shrink-0" /> },
  { name: "CSS", icon: <SiCss className="w-12 h-12 md:w-14 md:h-14 text-[#1572B6] shrink-0" /> },
  { name: "HTML5", icon: <SiHtml5 className="w-12 h-12 md:w-14 md:h-14 text-[#E34F26] shrink-0" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="w-12 h-12 md:w-14 md:h-14 text-[#38BDF8] shrink-0" /> },
  { name: "Embedded Systems", icon: <SiRaspberrypi className="w-12 h-12 md:w-14 md:h-14 text-[#A22846] shrink-0" /> },
];

const services = [
  { title: 'AI & Machine Learning', desc: 'Building predictive engines and cognitive agents that automate decision-making at scale.', points: ['Predictive ML & NLP Engines', 'Generative AI & LLM Models'], img: '/images/service-ai.jpg' },
  { title: 'Cloud Architecture', desc: 'Scalable, cloud-native infrastructures designed for high availability and zero downtime.', points: ['Multi-Cloud Infrastructure', 'Serverless Auto-Scaling'], img: '/images/service-cloud.jpg' },
  { title: 'Full-Stack Dev', desc: 'Modern web and mobile ecosystems built with performance and security as core pillars.', points: ['High-Performance React & Node', 'Microservices & REST APIs'], img: '/images/service-fullstack.jpg' },
  { title: 'Cybersecurity', desc: 'Fortifying your digital assets with advanced threat detection and zero-trust security.', points: ['Zero-Trust Threat Defense', 'SOC 2 Compliance & Audit'], img: '/images/service-cyber.jpg' },
  { title: 'IoT Ecosystems', desc: 'Connecting the physical world with digital intelligence through smart sensor networks.', points: ['Edge Computing Telemetry', 'Smart Hardware Sensor Sync'], img: '/images/service-iot.jpg' },
  { title: 'Porulon Academy', desc: 'Upskilling the next generation of engineers with industry-aligned technical training.', points: ['Corporate Engineering Upskilling', 'Industry Standard Certification'], img: '/images/service-academy.jpg' },
];

const whyUs = [
  {
    icon: <AiOutlineThunderbolt className="text-xl sm:text-2xl" />,
    tag: '3x Faster Delivery',
    title: 'Rapid Engineering & Scalability',
    desc: 'Accelerate time-to-market with production-ready architectures, agile microservices, and continuous delivery pipelines.'
  },
  {
    icon: <CiLock className="text-xl sm:text-2xl" />,
    tag: 'Zero-Trust Security',
    title: 'Enterprise Security & Compliance',
    desc: 'Bank-grade end-to-end encryption, SOC 2 / ISO standard protocols, and proactive automated threat monitoring.'
  },
  {
    icon: <SlPeople className="text-xl sm:text-2xl" />,
    tag: 'Top 1% Senior Engineers',
    title: 'Dedicated Senior Architects',
    desc: 'Direct collaboration with domain-specialized AI, ML, Cloud, and Full-Stack principal architects tailored to your roadmap.'
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'Projects Delivered' },
  { value: 10, suffix: '+', label: 'Enterprise Clients' },
  { value: 99.9, suffix: '%', label: 'System Uptime', decimals: 1 },
  { value: 3, suffix: '+', label: 'Industries Served' },
];

function AnimatedStat({ value, suffix, label, decimals = 0, duration = 1800 }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let rafId;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, value, duration]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 text-center">
      <p className="text-3xl font-extrabold text-gradient tabular-nums">
        {formatted}
        {suffix}
      </p>
      <p className="text-xs uppercase tracking-widest text-text-muted mt-2">{label}</p>
    </div>
  );
}

function CountUpInline({ value, suffix = '+', label, colorClass = 'text-primary-strong', decimals = 0, duration = 1800 }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let rafId;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, value, duration]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <div ref={ref}>
      <h3 className={`text-metric-stat ${colorClass} mb-1 tabular-nums`}>
        {formatted}
        {suffix}
      </h3>
      <p className="text-xs uppercase tracking-widest text-text-muted">{label}</p>
    </div>
  );
}

function MotionStatCard({ targetNum, suffix, rawText, title, desc, index }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    if (typeof targetNum !== 'number') return;

    let startTime;
    let animationFrame;
    const duration = 1800;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * targetNum);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(targetNum);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, targetNum]);

  const displayVal = typeof targetNum === 'number'
    ? (targetNum % 1 !== 0 ? count.toFixed(1) : Math.round(count).toString()) + (suffix || '')
    : rawText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.35, once: false }}
      transition={{
        type: "spring",
        bounce: 0.35,
        duration: 0.8,
        delay: index * 0.15,
      }}
      onViewportEnter={() => setHasStarted(true)}
      className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:shadow-[0_12px_35px_rgba(124,58,237,0.25)] hover:-translate-y-1 transition-all duration-500 text-center flex flex-col justify-center items-center"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-primary-strong/10 rounded-full blur-2xl group-hover:bg-primary-strong/25 transition-all duration-500 pointer-events-none" />
      <h4 className="text-4xl md:text-5xl font-extrabold text-gradient mb-2 tabular-nums tracking-tight">
        {displayVal}
      </h4>
      <p className="text-xl font-bold text-text mb-2">{title}</p>
      <p className="text-text-muted text-sm leading-relaxed max-w-xs">{desc}</p>
    </motion.div>
  );
}

function Carousel3D({ services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const total = services.length || 1;
  const angleStep = 360 / total;
  const radius = 380;

  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const lastScrollTime = useRef(0);

  const rotateTo = (newIndex) => {
    if (isSpinning) return;
    setIsSpinning(true);
    setActiveIndex((newIndex + total) % total);
    setTimeout(() => setIsSpinning(false), 900);
  };

  const handleCardClick = (index) => {
    if (isSpinning) return;
    if (index === activeIndex) {
      rotateTo(activeIndex + 1);
    } else {
      rotateTo(index);
    }
  };

  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 250) return;

    if (Math.abs(e.deltaX) > 10 || Math.abs(e.deltaY) > 10) {
      const direction = (e.deltaX > 0 || e.deltaY > 0) ? 1 : -1;
      rotateTo(activeIndex + direction);
      lastScrollTime.current = now;
    }
  };

  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (dragStartX.current === null) return;
    const diffX = dragStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diffX) > 25) {
      if (diffX > 0) {
        rotateTo(activeIndex + 1);
      } else {
        rotateTo(activeIndex - 1);
      }
    }
    dragStartX.current = null;
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const diffX = dragStartX.current - e.clientX;

    if (Math.abs(diffX) > 25) {
      if (diffX > 0) {
        rotateTo(activeIndex + 1);
      } else {
        rotateTo(activeIndex - 1);
      }
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative mx-auto flex items-center justify-center select-none touch-pan-y cursor-grab active:cursor-grabbing"
      style={{ height: "480px", perspective: "1600px" }}
    >
      <button
        onClick={() => rotateTo(activeIndex - 1)}
        aria-label="Previous service"
        className="absolute left-2 sm:left-6 z-30 w-11 h-11 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-text hover:bg-purple-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl border border-slate-200/80 dark:border-white/10"
      >
        <GoArrowLeft className="text-xl" />
      </button>

      <button
        onClick={() => rotateTo(activeIndex + 1)}
        aria-label="Next service"
        className="absolute right-2 sm:right-6 z-30 w-11 h-11 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-text hover:bg-purple-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl border border-slate-200/80 dark:border-white/10"
      >
        <GoArrowRight className="text-xl" />
      </button>

      <div
        className="absolute bottom-2 left-1/2 w-[360px] h-[50px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.08) 55%, transparent 75%)",
          filter: "blur(14px)",
          opacity: isSpinning ? 0.95 : 0.75,
          transform: `translateX(-50%) scale(${isSpinning ? 1.1 : 1})`,
        }}
      />

      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${-activeIndex * angleStep}deg)`,
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {services.map((s, index) => {
          const rotation = index * angleStep;
          const isActive = index === activeIndex;
          const imgUrl = getCleanMediaUrl(s.img || s.mediaUrl);

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={`absolute top-1/2 left-1/2 rounded-2xl p-4 sm:p-4.5 cursor-pointer flex flex-col justify-between backdrop-blur-xl transition-all duration-500 ${
                isActive
                  ? "bg-white/95 dark:bg-[#110c26]/90 border border-slate-200/90 dark:border-purple-500/40 shadow-2xl shadow-purple-500/15"
                  : "bg-white/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 shadow-lg opacity-40 dark:opacity-30 blur-[1px]"
              }`}
              style={{
                width: "310px",
                height: "365px",
                marginLeft: "-155px",
                marginTop: "-182.5px",
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg) translateZ(${radius}px) scale(${isActive ? 1 : 0.92})`,
              }}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden z-1">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 30%, rgba(124,58,237,0.12) 50%, transparent 70%)",
                      backgroundSize: "200% 200%",
                      animation: "shineSweep 2.5s ease-in-out infinite",
                    }}
                  />
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="h-36 sm:h-40 w-full mb-2.5 rounded-xl overflow-hidden relative bg-slate-100 dark:bg-slate-900/80 shrink-0 flex items-center justify-center border border-slate-200/50 dark:border-white/10 shadow-xs">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={s.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-50 to-slate-100 dark:from-purple-950/70 dark:via-indigo-950/50 dark:to-slate-950/90 p-4 flex flex-col items-center justify-center text-center ${
                      imgUrl ? 'hidden' : 'flex'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-1">
                      <HiMiniShieldCheck className="text-xl" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-purple-700 dark:text-purple-300/80">Porulon Service</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-[17px] font-semibold text-slate-900 dark:text-white tracking-tight mb-1 leading-snug line-clamp-1">
                    {s.title || 'Service Title'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs mb-2 leading-relaxed font-light tracking-tight line-clamp-2">
                    {s.desc || 'Cutting-edge enterprise technical solutions engineered for scale and performance.'}
                  </p>
                </div>

                <ul className="space-y-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-light tracking-tight border-none">
                  {(s.points?.length > 0
                    ? s.points
                    : ['Enterprise Systems Architecture', '24/7 High-Availability Monitoring']
                  ).slice(0, 3).map((p, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-1.5 font-light line-clamp-1">
                      <PiDotOutlineFill className="text-purple-600 dark:text-purple-400 text-sm shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
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
  );
}

const industriesCarouselData = [
  {
    index: '01',
    title: 'Healthcare & Life Sciences',
    tag: 'Health Tech',
    desc: 'AI-driven diagnostics, predictive health models, and HIPAA-compliant patient data security for next-gen care.',
    img: '/images/industry-healthcare.jpg',
    color: '#38bdf8',
  },
  {
    index: '02',
    title: 'Finance & Banking',
    tag: 'Fintech & Web3',
    desc: 'High-frequency trading architectures, real-time fraud detection systems, and zero-trust transaction encryption.',
    img: '/images/industry-finance.jpg',
    color: '#818cf8',
  },
  {
    index: '03',
    title: 'Smart Manufacturing',
    tag: 'Industry 4.0',
    desc: 'Predictive telemetry, smart IoT sensor networks, and automated robotic control pipelines for modern factories.',
    img: '/images/industry-manufacturing.png',
    color: '#f59e0b',
  },
  {
    index: '04',
    title: 'E-Commerce & Retail',
    tag: 'Retail Tech',
    desc: 'Hyper-personalized recommendation engines, instant checkout microservices, and dynamic inventory sync.',
    img: '/images/industry-ecommerence.png',
    color: '#ec4899',
  },
  {
    index: '05',
    title: 'Cybersecurity & Defense',
    tag: 'Zero-Trust',
    desc: 'Automated threat hunting, zero-trust cloud perimeters, and SOC 2 compliant security architectures.',
    img: '/images/service-cyber.jpg',
    color: '#10b981',
  },
  {
    index: '06',
    title: 'Cloud & Enterprise SaaS',
    tag: 'Cloud-Native',
    desc: 'Multi-cloud orchestration, serverless microservices, and continuous high-availability deployments.',
    img: '/images/service-cloud.jpg',
    color: '#a855f7',
  },
];

function IndustriesCarousel({ section }) {
  const scrollRef = useRef(null);

  const displayItems = section?.items?.length ? section.items.map((item, idx) => ({
    index: `0${idx + 1}`,
    title: item.title || item.name || (industriesCarouselData[idx % industriesCarouselData.length]?.title),
    tag: item.tag || item.badge || (industriesCarouselData[idx % industriesCarouselData.length]?.tag) || 'Industry',
    desc: item.desc || (industriesCarouselData[idx % industriesCarouselData.length]?.desc),
    img: getCleanMediaUrl(item.img || item.mediaUrl) || (industriesCarouselData[idx % industriesCarouselData.length]?.img),
    color: industriesCarouselData[idx % industriesCarouselData.length]?.color || '#818cf8',
  })) : industriesCarouselData;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -330 : 330;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const rawKicker = (section?.kicker || '').trim();
  const rawTitle = (section?.title || section?.name || '').trim();
  const isDuplicate = rawKicker.toLowerCase() === rawTitle.toLowerCase();
  const kicker = isDuplicate ? null : (rawKicker || "Global Impact");
  const title = rawTitle || "Industries We Empower";

  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-container mx-auto px-gutter">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-6">
          <div>
            {kicker && (
              <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2.5 shadow-2xs">
                {kicker}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-text leading-[1.18]">
                <FormattedTitle title={title} defaultText="Industries We Empower" accentClass="text-gradient font-normal" highlightWords={2} />
              </h2>
            )}
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-text hover:bg-purple-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md border border-white/10"
            >
              <GoArrowLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-text hover:bg-purple-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md border border-white/10"
            >
              <GoArrowRight className="text-xl" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2 px-1 -mx-1"
          style={{ scrollBehavior: 'smooth' }}
        >
          {displayItems.map((ind, idx) => {
            const imgUrl = getCleanMediaUrl(ind.img || ind.mediaUrl);

            return (
              <div
                key={idx}
                className="w-[270px] sm:w-[290px] h-[390px] sm:h-[410px] shrink-0 snap-start rounded-3xl relative overflow-hidden group glass-card flex flex-col justify-between p-5 sm:p-6 shadow-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500"
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={ind.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                <div
                  className={`absolute inset-0 bg-gradient-to-br from-purple-950/90 via-slate-950 to-indigo-950 p-6 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                    imgUrl ? 'hidden' : 'flex'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2.5 shadow-lg">
                    <HiMiniShieldCheck className="text-2xl" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-purple-300/80">Porulon Industry</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 pointer-events-none group-hover:via-slate-950/50 transition-all duration-500 z-1" />

                <div
                  className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-1"
                  style={{ backgroundColor: ind.color }}
                />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-mono tracking-widest text-white/90 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 shadow-sm">
                    {ind.index}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/10 text-white/95 backdrop-blur-md border border-white/15 shadow-sm">
                    {ind.tag}
                  </span>
                </div>

                <div className="relative z-10 space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-light text-white tracking-tight leading-snug">
                    {ind.title}
                  </h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light tracking-tight pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        {ind.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-[4px] w-0 group-hover:w-full transition-all duration-500 ease-out z-10"
                  style={{
                    backgroundColor: ind.color,
                    boxShadow: `0 0 12px ${ind.color}`,
                  }}
                />
              </div>
            );
          })}

          <a
            href="/industries"
            className="w-[270px] sm:w-[290px] h-[390px] sm:h-[410px] shrink-0 snap-start rounded-3xl border-2 border-dashed border-purple-500/40 hover:border-purple-500 bg-white/5 dark:bg-white/[0.03] backdrop-blur-md flex flex-col items-center justify-center text-center p-5 sm:p-6 hover:bg-purple-500/10 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
              <GoPlus className="text-2xl" />
            </div>
            <span className="text-xl sm:text-2xl font-light text-text mb-1.5 tracking-tight">+7 More</span>
            <p className="text-text-muted text-xs sm:text-sm font-light tracking-tight max-w-[200px] leading-relaxed mb-5">
              Discover specialized solutions built for Telecom, Automotive, Defense & more.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
              Explore All Industries <GoArrowRight className="text-base" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function FormattedTitle({ title, defaultText, accentClass = "text-gradient font-light", highlightWords = 1 }) {
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

export default function Home() {
  const { openModal } = useContactModal();

  const handleContactClick = (e, link) => {
    if (link === '/contactus' || link === '/contactus/') {
      e.preventDefault();
      openModal();
    }
  };

  const [dbSections, setDbSections] = useState(null);

  useEffect(() => {
    fetchSections('home')
      .then((data) => {
        const secMap = {};
        if (data && Array.isArray(data)) {
          data.forEach((s) => {
            if (s.sectionKey && !s.isArchived) secMap[s.sectionKey] = s;
          });
        }
        setDbSections(secMap);
      })
      .catch((err) => console.error('Failed to fetch sections:', err));
  }, []);

  const heroSec = dbSections?.hero;
  const marqueeSec = dbSections?.tech_stacks_marquee || dbSections?.tech_stacks;
  const aboutSec = dbSections?.about_preview;
  const servicesSec = dbSections?.featured_services;
  const industriesSec = dbSections?.industries_carousel;
  const whyUsSec = dbSections?.why_choose_us;
  const ctaSec = dbSections?.final_cta;

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
  const showMarquee = isSecVisible(marqueeSec);
  const showAbout = isSecVisible(aboutSec);
  const showServices = isSecVisible(servicesSec);
  const showIndustries = isSecVisible(industriesSec);
  const showWhyUs = isSecVisible(whyUsSec);
  const showCta = isSecVisible(ctaSec);

  const activeTechItems = (marqueeSec?.items && marqueeSec.items.length > 0)
    ? marqueeSec.items.map(item => ({
        name: item.name || item.title || 'Tech',
        icon: getTechIcon(item),
      }))
    : techStacks;

  const displayMarquee = activeTechItems.length > 0
    ? Array(Math.max(4, Math.ceil(16 / activeTechItems.length))).fill(activeTechItems).flat()
    : techStacks;

  const displayServices = servicesSec?.items?.length ? servicesSec.items.map((item, idx) => ({
    title: item.title || item.name || (services[idx]?.title) || 'Service',
    desc: item.desc || (services[idx]?.desc) || '',
    img: item.img || item.mediaUrl || (services[idx]?.img) || '/images/ai.png',
    points: item.points?.length ? item.points : (services[idx]?.points || ['Enterprise Systems Architecture', '24/7 Monitoring']),
  })) : services;
  const displayWhyUs = whyUsSec?.items?.length ? whyUsSec.items.map((item, idx) => ({
    icon: getAdvantageIcon(item.icon, idx),
    tag: item.tag || item.badge || 'Feature',
    title: item.title || item.name,
    desc: item.desc
  })) : whyUs;

  return (
    <main className="relative overflow-hidden font-sans">
      {/* ===== HERO SECTION WITH RESILIENT BACKEND-SAFE VIDEO / MEDIA BG ===== */}
      {showHero && (
        <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden pt-16 sm:pt-20 flex items-center justify-center">
          {/* Ambient Video / Image / Fallback Background Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
            {(() => {
              const mediaUrl = getCleanMediaUrl(heroSec?.mediaUrl);
              if (!mediaUrl) {
                return (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0f0923] to-[#050505] flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] aurora-blur opacity-30 pointer-events-none" />
                  </div>
                );
              }
              const lower = mediaUrl.toLowerCase();
              const isVideo = lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov') || lower.endsWith('.ogg') || lower.includes('/videos/');

              if (isVideo) {
                return (
                  <video
                    src={mediaUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center scale-105 pointer-events-none"
                  />
                );
              }

              return (
                <img
                  src={mediaUrl}
                  alt="Hero Background"
                  className="w-full h-full object-cover object-center scale-105 pointer-events-none"
                />
              );
            })()}
            {/* Subtle overlay for high contrast text readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] z-1" />
          </div>

          {/* Hero Content Overlay (Reduced top margin, refined compact typography) */}
          <div className="max-w-container mx-auto px-gutter relative z-10 pt-6 sm:pt-10 pb-16 sm:pb-22 text-center flex flex-col items-center justify-center" data-aos="fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase mb-5 shadow-sm backdrop-blur-md">
              {heroSec?.kicker || 'Pioneering Deep-Tech Excellence'}
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto mb-5 leading-[1.18]">
              <FormattedTitle
                title={heroSec?.title}
                defaultText="Building Enterprise AI Systems, Cloud Applications, & Hardware Automation"
                accentClass="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent font-normal drop-shadow-sm"
                highlightWords={6}
              />
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl mx-auto mb-8 leading-relaxed font-light tracking-tight">
              {heroSec?.subtitle ||
                'From custom machine learning models to high-throughput cloud infrastructure and smart IoT hardware.'}
            </p>
            
            {/* Action Buttons (Dynamic Admin Panel Map with Fallback) */}
            <div className="flex flex-wrap gap-3.5 justify-center items-center">
              {(heroSec?.buttons && heroSec.buttons.length > 0
                ? heroSec.buttons
                : [
                    { label: 'Get Started', link: '/contactus', primary: true },
                    { label: 'Explore Services', link: '/services', primary: false },
                  ]
              ).map((btn, bIdx) => (
                <a
                  key={bIdx}
                  href={btn.link || btn.href || '/contactus'}
                  onClick={(e) => handleContactClick(e, btn.link || btn.href || '/contactus')}
                  className={
                    bIdx === 0
                      ? 'group px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2'
                      : 'px-7 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm tracking-wide backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2'
                  }
                >
                  <span>{btn.label || btn.name || 'Learn More'}</span>
                  {bIdx === 0 && <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TECH STACKS & CAPABILITIES MARQUEE ===== */}
      {showMarquee && (
        <section className="relative overflow-hidden py-10 md:py-14 bg-transparent">
          {/* Requirement: Ambient Video or Image Background in Tech Stack Section */}
          {(() => {
            const bgMediaUrl = getCleanMediaUrl(marqueeSec?.mediaUrl);
            if (!bgMediaUrl) return null;

            const lower = bgMediaUrl.toLowerCase();
            const isImage = lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.gif') || lower.endsWith('.svg');

            return (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
                {isImage ? (
                  <img
                    src={bgMediaUrl}
                    alt="Tech Stack Ambient Background"
                    className="w-full h-full object-cover opacity-90 sm:opacity-95 dark:opacity-90 brightness-110 contrast-110 transition-opacity duration-500"
                  />
                ) : (
                  <video
                    key={bgMediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-90 sm:opacity-95 dark:opacity-90 brightness-110 contrast-110 transition-opacity duration-500"
                  >
                    <source src={bgMediaUrl} />
                  </video>
                )}
                {/* Dual-Theme Translucent Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/10 dark:from-[#070512]/35 dark:via-[#070512]/50 dark:to-[#070512]/35" />
                {/* Top Soft Edge Blend Mask */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-bg via-bg/70 to-transparent pointer-events-none z-10" />
                {/* Bottom Soft Edge Blend Mask */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg via-bg/70 to-transparent pointer-events-none z-10" />
              </div>
            );
          })()}

          <div className="relative z-10">
            {/* Header (Resilient & Duplicate-Proof with Vibrant Color Accent) */}
            {(() => {
              const rawKicker = (marqueeSec?.kicker || '').trim();
              const rawTitle = (marqueeSec?.title || marqueeSec?.name || '').trim();

              // Prevent duplicate text if kicker and title match in backend data
              const isDuplicate = rawKicker.toLowerCase() === rawTitle.toLowerCase();
              const kicker = isDuplicate ? null : rawKicker;
              const title = rawTitle || "Tech Stack & Core Capabilities";

              if (!kicker && !title) return null;

              return (
                <div className="text-center mb-8 md:mb-10 max-w-3xl mx-auto px-gutter">
                  {kicker && (
                    <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2.5 shadow-2xs">
                      {kicker}
                    </span>
                  )}
                  {title && (
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-text">
                      <FormattedTitle
                        title={title}
                        defaultText="Tech Stack & Core Capabilities"
                        accentClass="text-gradient font-normal"
                        highlightWords={2}
                      />
                    </h2>
                  )}
                </div>
              );
            })()}

            {/* Marquee Track Container with Gradient Edge Masking */}
            <div className="relative w-full overflow-hidden flex items-center">
              {/* Left Edge Gradient Fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-bg via-bg/80 to-transparent z-10" />
              {/* Right Edge Gradient Fade */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-bg via-bg/80 to-transparent z-10" />

              {/* Continuous Animated Marquee Track (Icons floating cleanly without white boxes) */}
              <div className="marquee-track flex items-center gap-12 sm:gap-16 w-max py-3">
                {displayMarquee.map((tech, index) => (
                  <div
                    key={index}
                    title={tech.name}
                    className="group flex items-center justify-center shrink-0 hover:scale-125 transition-transform duration-300 cursor-pointer"
                  >
                    {tech.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ABOUT PREVIEW SECTION ===== */}
      {showAbout && (
        <section className="py-12 md:py-16 relative overflow-hidden bg-transparent">
          <div className="max-w-container mx-auto px-gutter grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column: Edge-to-Edge Clear Image without Borders */}
            <div className="relative group">
              {(() => {
                const imageSrc = getCleanMediaUrl(aboutSec?.mediaUrl) || "/images/about-team.jpg";
                return (
                  <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-slate-950/80 flex items-center justify-center">
                    <img
                      src={imageSrc}
                      alt={aboutSec?.title || "Porulon Technologies team collaborating"}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback Graphic Card if image is missing */}
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414] p-6 sm:p-8 flex-col justify-between items-start">
                      <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <HiMiniShieldCheck className="text-2xl" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-1">Enterprise Engineering</span>
                        <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight">Porulon Consultancy & AI Labs</h4>
                      </div>
                      <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 rounded-full" />
                    </div>
                  </div>
                );
              })()}

              {/* Floating Verified Quality Badge (Clean & Subtle) */}
              <div className="absolute -bottom-5 -right-5 hidden md:block w-60 bg-white/95 dark:bg-[#120d2b]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl rotate-1 group-hover:rotate-0 transition-transform duration-500 border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-2 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400">
                    <HiMiniShieldCheck className="text-lg" />
                  </div>
                  <span className="font-semibold text-xs text-text tracking-tight">{aboutSec?.badge || "Quality First"}</span>
                </div>
                <p className="text-text-muted text-[11px] font-light tracking-tight leading-relaxed">
                  {aboutSec?.content || "Engineering standards meeting highest benchmarks."}
                </p>
              </div>
            </div>

            {/* Right Column: Clean Content & Metrics (No Borders) */}
            <div className="lg:pl-2 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-2xs">
                {aboutSec?.kicker || "About Us"}
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-text leading-[1.18] mb-4">
                <FormattedTitle
                  title={aboutSec?.title}
                  defaultText="Redefining Tech Consultancy & Software Engineering"
                  accentClass="text-gradient font-normal"
                  highlightWords={2}
                />
              </h2>

              {/* Structured Clean Paragraph Formatting */}
              <div className="text-sm sm:text-base text-text-muted mb-6 leading-relaxed font-light tracking-tight space-y-3 text-pretty">
                {(aboutSec?.subtitle ||
                  "Porulon Technologies is an engineering and technology solutions company helping organizations transform complex ideas into secure, scalable, and intelligent digital solutions. We bridge the gap between embedded systems, cybersecurity, AI, cloud computing, software engineering, and digital transformation to build technology that delivers real-world impact.\n\nFrom embedded systems and IoT security to AI-powered applications, cloud solutions, cybersecurity, LMS platforms, and enterprise software development, our multidisciplinary expertise enables businesses and institutions to innovate faster and operate smarter.\n\nWe specialize in end-to-end technology solutions, combining hardware engineering, firmware development, application software, cloud infrastructure, cybersecurity, and AI to solve complex technical challenges."
                )
                  .split(/\n\n|\n/)
                  .filter(Boolean)
                  .map((para, pIdx) => (
                    <p key={pIdx} className="leading-relaxed font-light text-pretty">
                      {para.trim()}
                    </p>
                  ))}
              </div>

              {/* Dynamic Stats Grid (No Top Border Line) */}
              <div className="grid grid-cols-2 gap-5 sm:gap-6 mb-6">
                {aboutSec?.stats?.length > 0 ? (
                  aboutSec.stats.map((st, i) => {
                    const valNum = parseFloat(st.value) || (i === 0 ? 15 : 10);
                    const suffixStr = st.value ? String(st.value).replace(/[0-9.]/g, '') : '+';
                    return (
                      <CountUpInline
                        key={i}
                        value={valNum}
                        suffix={suffixStr || '+'}
                        label={st.label || (i === 0 ? 'Global Projects' : 'Enterprise Clients')}
                        colorClass="text-gradient font-normal"
                      />
                    );
                  })
                ) : (
                  <>
                    <CountUpInline value={15} suffix="+" label="Global Projects" colorClass="text-gradient font-normal" />
                    <CountUpInline value={10} suffix="+" label="Enterprise Clients" colorClass="text-gradient font-normal" />
                  </>
                )}
              </div>

              {/* Action Link Button */}
              <div>
                <a
                  href={aboutSec?.buttons?.[0]?.link || "/about"}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>{aboutSec?.buttons?.[0]?.label || "Learn More About Our Mission"}</span>
                  <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURED SERVICES — 3D SPINNING CAROUSEL ===== */}
      {showServices && (
        <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] aurora-blur opacity-20 -z-0 pointer-events-none" />
          <div className="max-w-container mx-auto px-gutter relative z-10">
            {/* Header (Resilient & Duplicate-Proof) */}
            {(() => {
              const rawKicker = (servicesSec?.kicker || '').trim();
              const rawTitle = (servicesSec?.title || servicesSec?.name || '').trim();
              const isDuplicate = rawKicker.toLowerCase() === rawTitle.toLowerCase();
              const kicker = isDuplicate ? null : (rawKicker || "What We Excel At");
              const title = rawTitle || "Full-Spectrum Technical Capabilities";

              if (!kicker && !title) return null;

              return (
                <div className="text-center mb-8 md:mb-12">
                  {kicker && (
                    <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2.5 shadow-2xs">
                      {kicker}
                    </span>
                  )}
                  {title && (
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-text leading-[1.18]">
                      <FormattedTitle
                        title={title}
                        defaultText="Full-Spectrum Technical Capabilities"
                        accentClass="text-gradient font-normal"
                        highlightWords={2}
                      />
                    </h2>
                  )}
                </div>
              );
            })()}

            {/* 3D Spinning Carousel */}
            <Carousel3D services={displayServices} />

            {/* Bottom Action Button */}
            <div className="text-center mt-8 md:mt-10">
              <a
                href="/services"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>View All Services</span>
                <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ===== INDUSTRIES CAROUSEL ===== */}
      {showIndustries && <IndustriesCarousel section={industriesSec} />}

      {/* ===== WHY CHOOSE US ===== */}
      {showWhyUs && (
        <section className="py-24 md:py-36 min-h-[90vh] lg:min-h-screen flex flex-col justify-center items-center bg-transparent relative overflow-hidden">
          {/* Full Section Ambient Image or Video Background with Dual-Theme Visibility */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full min-h-full">
            {(() => {
              const fullUrl = getCleanMediaUrl(whyUsSec?.mediaUrl);
              if (!fullUrl) return (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-cyan-500/5 dark:from-purple-950/20 dark:via-slate-950/40 dark:to-indigo-950/30" />
              );

              const lower = fullUrl.toLowerCase();
              const isImage = lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.gif') || lower.endsWith('.svg');

              if (isImage) {
                return (
                  <img
                    src={fullUrl}
                    alt="Why Choose Us Background"
                    className="w-full h-full object-cover opacity-65 dark:opacity-45 brightness-105 contrast-110 saturate-110 scale-110 transition-opacity duration-500"
                  />
                );
              }
              return (
                <video
                  key={fullUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-70 dark:opacity-50 brightness-105 contrast-110 saturate-110 scale-110 transition-opacity duration-500"
                >
                  <source src={fullUrl} />
                </video>
              );
            })()}
            {/* Dual-Theme Adaptive Overlay: Vivid Translucent Glass Veil in Light Mode, Deep Obsidian in Dark Mode */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/45 to-white/30 dark:from-[#080511]/80 dark:via-[#080511]/92 dark:to-[#080511]/80 backdrop-blur-[0.5px]" />
            
            {/* Top & Bottom Seamless Edge Blend Masks (Eliminates Hard Cutoff Lines) */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-bg via-bg/70 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-bg via-bg/70 to-transparent pointer-events-none z-10" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] aurora-blur opacity-40 pointer-events-none" />
          </div>

          <div className="max-w-container mx-auto px-gutter relative z-10 w-full flex flex-col items-center justify-center">
            {/* Resilient Section Header (Sleek Compact Size & Balanced Alignment) */}
            {(() => {
              const rawKicker = (whyUsSec?.kicker || '').trim();
              const rawTitle = (whyUsSec?.title || whyUsSec?.name || '').trim();
              const isDuplicate = rawKicker.toLowerCase() === rawTitle.toLowerCase();
              const kicker = isDuplicate ? null : (rawKicker || "Why Choose Us");
              const title = rawTitle || "Why Enterprise Leaders Choose Us";
              const subtitle = whyUsSec?.subtitle || whyUsSec?.desc || "We combine deep technical mastery with agile execution to deliver scalable, AI-enabled software solutions built for long-term strategic growth.";

              if (!kicker && !title) return null;

              return (
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                  {kicker && (
                    <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 text-[11px] font-bold tracking-[0.18em] uppercase mb-2.5 shadow-2xs">
                      {kicker}
                    </span>
                  )}
                  {title && (
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-light tracking-tight text-text leading-[1.2] max-w-2xl mx-auto">
                      <FormattedTitle
                        title={title}
                        defaultText="Why Enterprise Leaders Choose Us"
                        accentClass="text-gradient font-normal"
                        highlightWords={2}
                      />
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-light tracking-tight max-w-lg mx-auto">
                      {subtitle}
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Advanced Bento Glass Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-container mx-auto w-full">
              {displayWhyUs.map((w, idx) => (
                <div
                  key={w.title || idx}
                  className="glass-card rounded-2xl p-6 sm:p-7 relative overflow-hidden group shadow-xl backdrop-blur-xl bg-white/90 dark:bg-[#110c26]/85 border border-slate-200/90 dark:border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Subtle Corner Glow Accent on Hover */}
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                  <div className="relative z-10">
                    {/* Top Row: Icon Container & Tag Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
                        {w.icon}
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 shadow-xs">
                        {w.tag || 'Advantage'}
                      </span>
                    </div>

                    {/* Card Title & Description */}
                    <h3 className="text-lg sm:text-xl font-normal tracking-tight text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {w.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light tracking-tight">
                      {w.desc}
                    </p>
                  </div>

                  {/* Bottom Animated Purple Gradient Accent Line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out z-10" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FINAL CTA ===== */}
      {showCta && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter">
            <div className="glass-card rounded-3xl md:rounded-[36px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border border-purple-500/20 shadow-2xl backdrop-blur-2xl bg-white/85 dark:bg-[#0f0924]/85 hover:border-purple-500/40 transition-all duration-500">
              {/* Background Ambient Glow & Beam Accents */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] aurora-blur opacity-35 pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                {(() => {
                  const rawKicker = (ctaSec?.kicker || '').trim();
                  const rawTitle = (ctaSec?.title || ctaSec?.name || '').trim();
                  const isDuplicate = rawKicker.toLowerCase() === rawTitle.toLowerCase();
                  const kicker = isDuplicate ? null : (rawKicker || "Start Your Digital Transformation");
                  const title = rawTitle || "Ready to Build the Future?";
                  const subtitle = ctaSec?.subtitle || ctaSec?.desc || "Join leading enterprise partners already leveraging Porulon's engineering mastery, AI innovation, and cloud scalability.";

                  const validButtons = (ctaSec?.buttons?.length ? ctaSec.buttons.filter(b => b?.label?.trim()) : null) || [
                    { label: "Start Your Project", link: "/contactus" },
                    { label: "Talk to an Expert", link: "/contactus" }
                  ];

                  return (
                    <>
                      {kicker && (
                        <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 text-[11px] font-bold tracking-[0.18em] uppercase mb-3 shadow-2xs">
                          {kicker}
                        </span>
                      )}
                      {title && (
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-text leading-[1.18] max-w-2xl mx-auto mb-4">
                          <FormattedTitle title={title} defaultText="Ready to Build the Future?" accentClass="text-gradient font-normal" highlightWords={2} />
                        </h2>
                      )}
                      {subtitle && (
                        <p className="text-xs sm:text-sm text-text-muted mb-8 max-w-xl mx-auto leading-relaxed font-light tracking-tight">
                          {subtitle}
                        </p>
                      )}
                      {validButtons.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          {validButtons.map((btn, idx) => (
                            <a
                              key={idx}
                              href={btn.link || "/contactus"}
                              onClick={(e) => handleContactClick(e, btn.link || "/contactus")}
                              className={
                                idx === 0
                                  ? "group btn-primary px-7 py-3.5 rounded-full font-semibold tracking-tight text-xs sm:text-sm text-white hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/25 inline-flex items-center gap-2"
                                  : "group px-7 py-3.5 rounded-full font-semibold tracking-tight text-xs sm:text-sm bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 text-purple-600 dark:text-purple-300 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                              }
                            >
                              <span>{btn.label}</span>
                              <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}