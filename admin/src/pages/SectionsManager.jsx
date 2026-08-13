import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getSections, getArchivedSections, restoreArchivedSection, permanentDeleteSection, createSection, updateSection, deleteSection, uploadMediaFile, restoreDefaultSections } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, X, RotateCcw,
  Home, Building2, Cpu, GraduationCap, Info, Mail, Video, Image as ImageIcon,
  Sparkles, Layers, ArrowUpRight, CheckCircle2, Zap, Rocket, ShieldCheck, Megaphone, Star,
  FileText, Tag, Upload, Loader2, MapPin, MessageSquare
} from 'lucide-react';

import { 
  SiPostgresql, SiNodedotjs, SiMongodb, SiTypescript, SiReact, 
  SiCss, SiHtml5, SiTailwindcss, SiRaspberrypi, SiPython, 
  SiDocker, SiKubernetes, SiFigma, SiGit
} from 'react-icons/si';
import { CiLock, CiGlobe, CiMedal } from 'react-icons/ci';
import { SlPeople, SlRocket, SlGraph } from 'react-icons/sl';
import { AiOutlineThunderbolt, AiOutlineSafetyCertificate, AiOutlineBulb } from 'react-icons/ai';
import { 
  FiShield, FiCheckCircle, FiCpu, FiGlobe, FiCloud, 
  FiCode, FiHardDrive, FiHeart, FiDollarSign, FiPackage, 
  FiZap, FiAward, FiUsers, FiLock, FiStar
} from 'react-icons/fi';

import { 
  HiOutlineHeart, HiOutlineBanknotes, HiOutlineTruck, HiOutlineShoppingCart,
  HiOutlineBuildingOffice2, HiOutlineShieldCheck, HiOutlineSun, HiOutlineAcademicCap,
  HiOutlineBolt, HiOutlineFilm, HiOutlineBuildingLibrary,
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineClock,
  HiOutlineGlobeAlt, HiOutlineLockClosed, HiOutlineSparkles, HiOutlineCpuChip,
  HiOutlineRadio, HiOutlineDevicePhoneMobile, HiOutlineRocketLaunch,
  HiOutlineLightBulb, HiOutlineUsers, HiOutlineHandRaised, HiOutlineUserGroup,
  HiOutlineWrenchScrewdriver, HiOutlineBriefcase, HiOutlineChatBubbleLeftRight,
  HiOutlineCloud
} from 'react-icons/hi2';

const REACT_ICONS_MAP = {
  SiPostgresql: { name: 'PostgreSQL (Si)', icon: <SiPostgresql className="w-5 h-5 text-[#4169E1]" /> },
  SiNodedotjs: { name: 'Node.js (Si)', icon: <SiNodedotjs className="w-5 h-5 text-[#5FA04E]" /> },
  SiMongodb: { name: 'MongoDB (Si)', icon: <SiMongodb className="w-5 h-5 text-[#00A35C]" /> },
  SiTypescript: { name: 'TypeScript (Si)', icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" /> },
  SiReact: { name: 'React (Si)', icon: <SiReact className="w-5 h-5 text-[#149ECA]" /> },
  SiCss: { name: 'CSS3 (Si)', icon: <SiCss className="w-5 h-5 text-[#1572B6]" /> },
  SiHtml5: { name: 'HTML5 (Si)', icon: <SiHtml5 className="w-5 h-5 text-[#E34F26]" /> },
  SiTailwindcss: { name: 'Tailwind CSS (Si)', icon: <SiTailwindcss className="w-5 h-5 text-[#38BDF8]" /> },
  SiRaspberrypi: { name: 'Raspberry Pi / Embedded (Si)', icon: <SiRaspberrypi className="w-5 h-5 text-[#A22846]" /> },
  SiPython: { name: 'Python (Si)', icon: <SiPython className="w-5 h-5 text-[#3776AB]" /> },
  SiDocker: { name: 'Docker (Si)', icon: <SiDocker className="w-5 h-5 text-[#2496ED]" /> },
  SiKubernetes: { name: 'Kubernetes (Si)', icon: <SiKubernetes className="w-5 h-5 text-[#326CE5]" /> },
  
  CiLock: { name: 'Lock / Security (Ci)', icon: <CiLock className="w-5 h-5 text-indigo-500" /> },
  SlPeople: { name: 'People / Team (Sl)', icon: <SlPeople className="w-5 h-5 text-purple-500" /> },
  AiOutlineThunderbolt: { name: 'Thunderbolt / Speed (Ai)', icon: <AiOutlineThunderbolt className="w-5 h-5 text-amber-500" /> },
  
  FiShield: { name: 'Shield / Defense (Fi)', icon: <FiShield className="w-5 h-5 text-cyan-500" /> },
  FiCheckCircle: { name: 'Check Circle (Fi)', icon: <FiCheckCircle className="w-5 h-5 text-emerald-500" /> },
  FiCpu: { name: 'CPU / Processing (Fi)', icon: <FiCpu className="w-5 h-5 text-purple-500" /> },
  FiCloud: { name: 'Cloud Infrastructure (Fi)', icon: <FiCloud className="w-5 h-5 text-blue-500" /> },
  FiCode: { name: 'Code / Web Dev (Fi)', icon: <FiCode className="w-5 h-5 text-emerald-500" /> },
  FiHardDrive: { name: 'IoT / Hardware (Fi)', icon: <FiHardDrive className="w-5 h-5 text-rose-500" /> },
  FiHeart: { name: 'Healthcare (Fi)', icon: <FiHeart className="w-5 h-5 text-pink-500" /> },
  FiDollarSign: { name: 'Fintech (Fi)', icon: <FiDollarSign className="w-5 h-5 text-amber-500" /> },
  FiPackage: { name: 'Manufacturing (Fi)', icon: <FiPackage className="w-5 h-5 text-orange-500" /> },
  FiZap: { name: 'Fast Delivery (Fi)', icon: <FiZap className="w-5 h-5 text-yellow-500" /> },
  FiAward: { name: 'Quality Award (Fi)', icon: <FiAward className="w-5 h-5 text-purple-500" /> },

  HiOutlineEnvelope: { name: 'Email / Envelope (Hi2)', icon: <HiOutlineEnvelope className="w-5 h-5 text-indigo-500" /> },
  HiOutlinePhone: { name: 'Phone / Call (Hi2)', icon: <HiOutlinePhone className="w-5 h-5 text-emerald-500" /> },
  HiOutlineMapPin: { name: 'Map Pin / HQ Address (Hi2)', icon: <HiOutlineMapPin className="w-5 h-5 text-rose-500" /> },
  HiOutlineClock: { name: 'Clock / SLA Response (Hi2)', icon: <HiOutlineClock className="w-5 h-5 text-amber-500" /> },
  HiOutlineGlobeAlt: { name: 'Globe / Remote Delivery (Hi2)', icon: <HiOutlineGlobeAlt className="w-5 h-5 text-cyan-500" /> },
  HiOutlineLockClosed: { name: 'Lock / NDA Protection (Hi2)', icon: <HiOutlineLockClosed className="w-5 h-5 text-purple-500" /> },
  HiOutlineSparkles: { name: 'Sparkles / AI Solutions (Hi2)', icon: <HiOutlineSparkles className="w-5 h-5 text-amber-400" /> },
  HiOutlineCpuChip: { name: 'CPU / Machine Learning (Hi2)', icon: <HiOutlineCpuChip className="w-5 h-5 text-purple-500" /> },
  HiOutlineRadio: { name: 'Radio / Smart IoT (Hi2)', icon: <HiOutlineRadio className="w-5 h-5 text-blue-500" /> },
  HiOutlineDevicePhoneMobile: { name: 'Mobile / Full-Stack (Hi2)', icon: <HiOutlineDevicePhoneMobile className="w-5 h-5 text-cyan-500" /> },
  HiOutlineRocketLaunch: { name: 'Rocket Launch (Hi2)', icon: <HiOutlineRocketLaunch className="w-5 h-5 text-indigo-500" /> },
  HiOutlineLightBulb: { name: 'Innovation Lightbulb (Hi2)', icon: <HiOutlineLightBulb className="w-5 h-5 text-amber-400" /> },
  HiOutlineUsers: { name: 'Users / People-Centric (Hi2)', icon: <HiOutlineUsers className="w-5 h-5 text-blue-500" /> },
  HiOutlineHandRaised: { name: 'Handshake / Partnership (Hi2)', icon: <HiOutlineHandRaised className="w-5 h-5 text-emerald-500" /> },
  HiOutlineUserGroup: { name: 'User Group / Mentors (Hi2)', icon: <HiOutlineUserGroup className="w-5 h-5 text-purple-500" /> },
  HiOutlineWrenchScrewdriver: { name: 'Wrench & Screwdriver (Hi2)', icon: <HiOutlineWrenchScrewdriver className="w-5 h-5 text-slate-500" /> },
  HiOutlineBriefcase: { name: 'Briefcase / Careers (Hi2)', icon: <HiOutlineBriefcase className="w-5 h-5 text-amber-600" /> },
  HiOutlineChatBubbleLeftRight: { name: 'Chat / Inquiry (Hi2)', icon: <HiOutlineChatBubbleLeftRight className="w-5 h-5 text-indigo-500" /> },
  HiOutlineCloud: { name: 'Cloud Infrastructure (Hi2)', icon: <HiOutlineCloud className="w-5 h-5 text-blue-500" /> },

  HiOutlineHeart: { name: 'Healthcare (Hi2)', icon: <HiOutlineHeart className="w-5 h-5 text-pink-500" /> },
  HiOutlineBanknotes: { name: 'Finance & Banking (Hi2)', icon: <HiOutlineBanknotes className="w-5 h-5 text-emerald-500" /> },
  HiOutlineTruck: { name: 'Logistics & Transport (Hi2)', icon: <HiOutlineTruck className="w-5 h-5 text-blue-500" /> },
  HiOutlineShoppingCart: { name: 'Retail & E-Commerce (Hi2)', icon: <HiOutlineShoppingCart className="w-5 h-5 text-purple-500" /> },
  HiOutlineBuildingOffice2: { name: 'Smart Manufacturing (Hi2)', icon: <HiOutlineBuildingOffice2 className="w-5 h-5 text-amber-500" /> },
  HiOutlineShieldCheck: { name: 'Cybersecurity & Defense (Hi2)', icon: <HiOutlineShieldCheck className="w-5 h-5 text-cyan-500" /> },
  HiOutlineSun: { name: 'Clean Energy & Solar (Hi2)', icon: <HiOutlineSun className="w-5 h-5 text-yellow-500" /> },
  HiOutlineAcademicCap: { name: 'EdTech & Education (Hi2)', icon: <HiOutlineAcademicCap className="w-5 h-5 text-indigo-500" /> },
  HiOutlineBolt: { name: 'Energy & Utilities (Hi2)', icon: <HiOutlineBolt className="w-5 h-5 text-amber-500" /> },
  HiOutlineFilm: { name: 'Media & Entertainment (Hi2)', icon: <HiOutlineFilm className="w-5 h-5 text-rose-500" /> },
  HiOutlineBuildingLibrary: { name: 'Government & Public Sector (Hi2)', icon: <HiOutlineBuildingLibrary className="w-5 h-5 text-slate-500" /> },
};

const RenderReactIcon = ({ iconKey, className = "w-5 h-5 text-[#7c3aed]" }) => {
  if (iconKey && REACT_ICONS_MAP[iconKey]) {
    return REACT_ICONS_MAP[iconKey].icon;
  }
  return <FiZap className={className} />;
};

// Friendly visual guide mapping for human clients
const SECTION_GUIDES = {
  hero: {
    icon: Video,
    label: 'Hero Header Background Video',
    desc: 'Controls the full-width background video playing at the very top of the Home Page.',
    tag: 'Hero Video'
  },
  tech_stacks_marquee: {
    icon: Zap,
    label: 'Tech Stack & Capabilities Marquee',
    desc: 'Continuous marquee scrolling across the screen displaying tech stack icons (React, Node.js, MongoDB, etc.).',
    tag: 'Marquee Bar'
  },
  about_preview: {
    icon: Info,
    label: 'About Porulon Preview',
    desc: 'Company overview section with team photo, mission text, and project counters.',
    tag: 'About Section'
  },
  featured_services: {
    icon: Rocket,
    label: 'Featured Services 3D Carousel',
    desc: '3D spinning carousel showing your core service cards with images, titles, and descriptions.',
    tag: '3D Carousel'
  },
  industries_carousel: {
    icon: Building2,
    label: 'Industries Showcase Carousel',
    desc: 'Horizontal scroll cards displaying sectors (Healthcare, Fintech, Smart Manufacturing, E-Commerce, etc.).',
    tag: 'Industry Cards'
  },
  why_choose_us: {
    icon: ShieldCheck,
    label: 'Why Choose Us Advantages',
    desc: '3 Advantage cards (3x Faster Delivery, SOC 2 Security, Senior Architects) over background video.',
    tag: 'Advantage Cards'
  },
  final_cta: {
    icon: Megaphone,
    label: 'Bottom Call-To-Action Banner',
    desc: 'Bottom section asking visitors "Ready to Build the Future?" with Start Project & Expert buttons.',
    tag: 'CTA Banner'
  },
  industries_hero: {
    icon: Building2,
    label: 'Industries Hero Banner',
    desc: 'Top header section on Industries Page with banner image/video, title, metrics counters, and consultation buttons.',
    tag: 'Hero Banner'
  },
  industries_grid: {
    icon: Layers,
    label: 'Industries Sector Cards Grid',
    desc: 'Grid of target market industry cards (Healthcare, Fintech, Manufacturing, etc.) with React icons, chips, and images.',
    tag: 'Grid Cards'
  },
  industries_cta: {
    icon: Megaphone,
    label: 'Custom Engagement CTA Banner',
    desc: 'Bottom CTA section asking visitors "Don\'t See Your Industry?" with Talk to Team & View Services buttons.',
    tag: 'CTA Banner'
  },
  services_hero: {
    icon: Cpu,
    label: 'Services Hero Banner',
    desc: 'Top header section on Services Page with background banner image, core capabilities kicker, title, and description.',
    tag: 'Hero Banner'
  },
  services_grid: {
    icon: Layers,
    label: 'Engineering Expertise Services Grid',
    desc: 'Grid of specialized service capability cards (AI, ML, IoT, Full-Stack, Cybersecurity, Cloud) with React icons and custom images.',
    tag: 'Grid Cards'
  },
  services_process: {
    icon: Zap,
    label: 'Our Agile Delivery Process',
    desc: '4-step methodology cards (Discovery, Design & Architecture, Build & Iterate, Deploy & Scale).',
    tag: 'Process Steps'
  },
  services_cta: {
    icon: Megaphone,
    label: 'Start Your Innovation Journey CTA',
    desc: 'Bottom CTA section asking visitors "Ready to Transform Your Business With AI?" with action buttons.',
    tag: 'CTA Banner'
  },
  training_hero: {
    icon: GraduationCap,
    label: 'Training Hero Banner',
    desc: 'Top header section on Training Page with background image/video, title, kicker, and action buttons.',
    tag: 'Hero Banner'
  },
  training_tracks: {
    icon: Layers,
    label: 'Curriculum Training Tracks Grid',
    desc: 'Grid of training track bootcamps (AI & ML, Cybersecurity, IoT, Full-Stack) with duration, level, and image.',
    tag: 'Tracks Grid'
  },
  training_why_us: {
    icon: ShieldCheck,
    label: 'Why Porulon Training Highlights',
    desc: 'Highlight cards (Mentor-Led, Certification, Project-Based, Career Support) with titles and descriptions.',
    tag: 'Highlights Grid'
  },
  training_process: {
    icon: Zap,
    label: 'Our 4-Phase Applied Learning Methodology',
    desc: '4-phase curriculum delivery timeline steps (Foundational Core, Advanced Architecture, Applied Capstone Sprint, Certification & Placement).',
    tag: 'Process Steps'
  },
  training_faq: {
    icon: MessageSquare,
    label: 'Training Frequently Asked Questions (FAQs)',
    desc: 'Interactive FAQ accordion for training cohorts, prerequisites, certificates, and corporate upskilling.',
    tag: 'FAQs Accordion'
  },
  training_cta: {
    icon: Megaphone,
    label: 'Accelerate Your Career CTA Banner',
    desc: 'Bottom CTA section asking visitors "Ready to Upskill?" with Enroll Now and Talk to Team buttons.',
    tag: 'CTA Banner'
  },
  about_hero: {
    icon: Info,
    label: 'About Hero Banner',
    desc: 'Top header section on About Page with background image/video, title, kicker, metrics counters, and action buttons.',
    tag: 'Hero Banner'
  },
  about_story: {
    icon: Sparkles,
    label: 'Our Story & Journey',
    desc: 'Company journey section with custom team photo, story paragraphs, and milestone chips.',
    tag: 'Story Section'
  },
  about_stats: {
    icon: Zap,
    label: 'Proven Track Record Stats',
    desc: 'Grid of 6 quantifiable engineering impact metric cards.',
    tag: 'Stats Grid'
  },
  about_values: {
    icon: ShieldCheck,
    label: 'Our Core Values',
    desc: 'Grid of 6 core company value cards with React icon selectors.',
    tag: 'Values Grid'
  },
  about_cta: {
    icon: Megaphone,
    label: 'Careers & Culture CTA Banner',
    desc: 'Bottom CTA section asking visitors "Shape The Future Of Intelligent Tech" with action buttons.',
    tag: 'CTA Banner'
  },
  contact_hero: {
    icon: Mail,
    label: 'Contact Hero Banner',
    desc: 'Top header section of the Contact page with title, subtitle, optional background media, and contact badges.',
    tag: 'Hero Banner'
  },
  contact_info: {
    icon: MapPin,
    label: 'Direct Channels & Global HQ',
    desc: 'Info cards (Email, Phone, HQ Address, SLA) and interactive Google Maps embed section.',
    tag: 'Info & Map'
  },
  contact_form: {
    icon: MessageSquare,
    label: 'Send Message Form & Security Perks',
    desc: 'Interactive contact form with topic chips and left NDA & security guarantee cards.',
    tag: 'Message Form'
  },
  blog_hero: {
    icon: FileText,
    label: 'Blog Hero Banner',
    desc: 'Top header section of the Blog Page with kicker, title, subtitle, and badges.',
    tag: 'Hero Banner'
  },
  blog_grid: {
    icon: Layers,
    label: 'Blog Articles Showcase Grid',
    desc: 'Main section displaying category filter chips and responsive article cards.',
    tag: 'Grid Section'
  },
  blog_cta: {
    icon: Megaphone,
    label: 'Newsletter & Technical Insights CTA',
    desc: 'Bottom CTA section asking visitors to subscribe or contact engineering leads.',
    tag: 'CTA Banner'
  },
  projects_hero: {
    icon: Rocket,
    label: 'Products Hero Banner',
    desc: 'Top header section of the Products page with title, subtitle, kicker, and live metrics.',
    tag: 'Hero Banner'
  },
  projects_trust_bar: {
    icon: ShieldCheck,
    label: 'Client Trust & Partner Brands Marquee',
    desc: 'Infinite running marquee ticker displaying trusted client brand names with multi-color typography.',
    tag: 'Marquee Ticker'
  },
  projects_grid: {
    icon: Layers,
    label: 'Flagship Software Products Grid',
    desc: 'Main section showcasing proprietary SaaS products with tech stack pills, demo buttons, and badges.',
    tag: 'Products Grid'
  },
  projects_client_stories: {
    icon: Building2,
    label: 'Delivered Client Projects Showcase',
    desc: 'Section displaying real client projects, custom software implementations, and verified business impact metrics.',
    tag: 'Client Projects'
  },
  projects_tech_stack: {
    icon: Zap,
    label: 'Production Tech Stack Architecture',
    desc: 'Interactive tabbed architecture matrix displaying frameworks, cloud infrastructure, and database systems.',
    tag: 'Tech Stack'
  },
  projects_testimonials: {
    icon: Star,
    label: 'Executive Client Testimonials',
    desc: 'Section showing verified feedback quotes from CTOs, VPs, and engineering partners.',
    tag: 'Testimonials'
  },
  projects_cta: {
    icon: Megaphone,
    label: 'Products Consultation & Demo CTA',
    desc: 'Bottom CTA section offering live product demo scheduling and custom proposal requests.',
    tag: 'CTA Banner'
  }
};

export default function SectionsManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [sections, setSections] = useState([]);
  const [archivedSections, setArchivedSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [inlineNotice, setInlineNotice] = useState({ type: '', message: '' });
  const [mediaError, setMediaError] = useState('');

  const getCleanMediaValue = (val) => {
    if (!val) return '';
    return String(val).trim();
  };

  const handleFileUpload = async (file, onComplete, fileTypeReq = null) => {
    if (!file) return;
    setInlineNotice({ type: '', message: '' });
    setMediaError('');

    if (fileTypeReq === 'video' && !file.type.startsWith('video/')) {
      setMediaError('⚠️ Invalid File Type: This section accepts ONLY video files (.mp4, .webm). Please upload a valid video.');
      return;
    }
    if (fileTypeReq === 'image' && !file.type.startsWith('image/')) {
      setMediaError('⚠️ Invalid File Type: This section accepts ONLY image files (.jpg, .png, .webp). Videos are not allowed here.');
      return;
    }

    setUploading(true);
    try {
      const res = await uploadMediaFile(file);
      if (res.data?.url) {
        onComplete(res.data.url);
        setMediaError('');
        setInlineNotice({
          type: 'success',
          message: '✓ File uploaded successfully!',
        });
      }
    } catch (err) {
      setMediaError('⚠️ Upload Failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleRestoreSectionDefaults = () => {
    const key = formData.sectionKey;
    let restoredData = {};

    if (key === 'hero') {
      restoredData = { mediaUrl: '/videos/hero2.mp4' };
    } else if (key === 'tech_stacks_marquee') {
      restoredData = {
        kicker: 'Tech Stack We Use',
        title: 'Tech Stack We Use',
        items: [
          { name: 'PostgreSQL', title: 'PostgreSQL', icon: 'SiPostgresql' },
          { name: 'Node.js', title: 'Node.js', icon: 'SiNodedotjs' },
          { name: 'MongoDB', title: 'MongoDB', icon: 'SiMongodb' },
          { name: 'TypeScript', title: 'TypeScript', icon: 'SiTypescript' },
          { name: 'React', title: 'React', icon: 'SiReact' },
          { name: 'CSS', title: 'CSS', icon: 'SiCss' },
          { name: 'HTML5', title: 'HTML5', icon: 'SiHtml5' },
          { name: 'Tailwind CSS', title: 'Tailwind CSS', icon: 'SiTailwindcss' },
          { name: 'Embedded Systems', title: 'Embedded Systems', icon: 'SiRaspberrypi' },
        ]
      };
    } else if (key === 'about_preview') {
      restoredData = {
        kicker: 'About Us',
        title: 'Redefining Tech Consultancy',
        subtitle: 'Porulon Technologies is a forward-thinking IT and engineering solutions company dedicated to driving digital transformation. We blend cutting-edge technology with domain expertise to deliver robust, scalable software, embedded systems, and enterprise solutions tailored to modern global challenges.',
        badge: 'Quality First',
        content: 'Engineering standards that meet the highest global benchmarks.',
        mediaUrl: '/images/about-team.jpg',
        stats: [
          { label: 'Global Projects Delivered', value: '15+' },
          { label: 'Client Satisfaction', value: '99%' },
          { label: 'Uptime Reliability', value: '99.9%' }
        ]
      };
    } else if (key === 'featured_services') {
      restoredData = {
        kicker: 'What We Excel At',
        title: 'Full-Spectrum Technical Capabilities',
        items: [
          {
            title: 'AI & Machine Learning',
            name: 'AI & Machine Learning',
            img: '/images/ai.png',
            mediaUrl: '/images/ai.png',
            icon: 'FiCpu',
            desc: 'Custom neural networks, computer vision, predictive analytics, and LLM fine-tuning tailored to enterprise data pipelines.'
          },
          {
            title: 'Cloud & DevOps Architecture',
            name: 'Cloud & DevOps Architecture',
            img: '/images/cloud.png',
            mediaUrl: '/images/cloud.png',
            icon: 'FiCloud',
            desc: 'AWS, Azure & GCP cloud-native infrastructure, Kubernetes orchestration, zero-downtime CI/CD pipelines, and cost optimization.'
          },
          {
            title: 'Custom Web & Mobile Apps',
            name: 'Custom Web & Mobile Apps',
            img: '/images/web.png',
            mediaUrl: '/images/web.png',
            icon: 'FiCode',
            desc: 'Next.js, React, Node.js, and React Native platforms built for high throughput, seamless UX, and enterprise-grade security.'
          },
          {
            title: 'IoT & Embedded Engineering',
            name: 'IoT & Embedded Engineering',
            img: '/images/iot.png',
            mediaUrl: '/images/iot.png',
            icon: 'FiHardDrive',
            desc: 'Firmware development, microcontroller integration, sensor networks, and edge computing for industrial automation.'
          }
        ]
      };
    } else if (key === 'industries_carousel') {
      restoredData = {
        kicker: 'Global Impact',
        title: 'Industries We Empower',
        items: [
          {
            title: 'Healthcare & Biotech',
            name: 'Healthcare & Biotech',
            badge: 'Healthcare',
            tag: 'Healthcare',
            img: '/images/healthcare.png',
            mediaUrl: '/images/healthcare.png',
            icon: 'FiHeart',
            desc: 'HIPAA-compliant telemetry platforms, AI diagnostics, and hospital management ecosystems.'
          },
          {
            title: 'Fintech & Banking',
            name: 'Fintech & Banking',
            badge: 'Fintech',
            tag: 'Fintech',
            img: '/images/fintech.png',
            mediaUrl: '/images/fintech.png',
            icon: 'FiDollarSign',
            desc: 'High-frequency trading engines, fraud detection microservices, and secure payment gateway integrations.'
          },
          {
            title: 'Manufacturing & Industry 4.0',
            name: 'Manufacturing & Industry 4.0',
            badge: 'Industrial',
            tag: 'Industrial',
            img: '/images/manufacturing.png',
            mediaUrl: '/images/manufacturing.png',
            icon: 'FiPackage',
            desc: 'Predictive maintenance algorithms, smart factory IoT telemetry, and real-time inventory tracking.'
          }
        ]
      };
    } else if (key === 'why_choose_us') {
      restoredData = {
        title: 'Engineered for Excellence, Built for Scale',
        subtitle: "We don't just write code — we architect high-throughput ecosystems designed for zero-downtime reliability and enterprise growth.",
        mediaUrl: '/videos/ai-video.mp4',
        items: [
          {
            title: 'Rapid Engineering Velocity',
            name: 'Rapid Engineering Velocity',
            tag: '3x Faster Delivery',
            badge: '3x Faster Delivery',
            icon: 'AiOutlineThunderbolt',
            desc: 'Modular architecture and automated CI/CD pipelines ensure rapid release cycles without sacrificing reliability.'
          },
          {
            title: 'Enterprise-Grade Security',
            name: 'Enterprise-Grade Security',
            tag: 'Bank-Grade Protection',
            badge: 'Bank-Grade Protection',
            icon: 'CiLock',
            desc: 'End-to-end encryption, SOC2 readiness, zero-trust protocols, and stringent compliance baked into every layer.'
          },
          {
            title: 'Senior-Only Talent Pool',
            name: 'Senior-Only Talent Pool',
            tag: 'Top 2% Engineers',
            badge: 'Top 2% Engineers',
            icon: 'SlPeople',
            desc: 'Direct collaboration with seasoned architects and domain experts with proven track records in high-stakes systems.'
          }
        ]
      };
    } else if (key === 'final_cta') {
      restoredData = {
        kicker: 'Start Your Digital Transformation',
        title: 'Ready to Build the Future?',
        subtitle: "Join leading enterprise partners already leveraging Porulon's engineering mastery, AI innovation, and cloud scalability.",
        buttons: [
          { label: 'Start Your Project', link: '/contact' },
          { label: 'Talk to an Expert', link: '/contact' }
        ]
      };
    } else if (key === 'industries_hero') {
      restoredData = {
        kicker: 'Cross-Sector Solutions',
        badge: 'Cross-Sector Solutions',
        title: 'Transforming Every Sector With Intelligent Technology',
        subtitle: 'Our AI and automation platforms are purpose-built to solve high-impact challenges, regulatory constraints, and operational bottlenecks across global enterprise sectors.',
        mediaUrl: '/images/industry-banner.png',
        stats: [
          { label: 'Sectors Served', value: '12+' },
          { label: 'Uptime & Reliability', value: '99.9%' },
          { label: 'Custom AI Models', value: '100%' }
        ],
        buttons: [
          { label: 'Explore Industries', link: '#industries-list' },
          { label: 'Schedule Consultation', link: '/contact' }
        ]
      };
    } else if (key === 'industries_grid') {
      restoredData = {
        kicker: 'Target Markets',
        title: 'Industries We Empower',
        subtitle: 'Domain-specific software architectures engineered for highly regulated and high-scale sectors.',
        items: [
          {
            title: 'Healthcare',
            name: 'Healthcare',
            category: 'Finance & Health',
            tagline: 'AI diagnostics, patient analytics & workflow automation',
            desc: 'From medical imaging analysis to drug discovery and patient outcome prediction, our healthcare AI solutions improve clinical accuracy.',
            points: ['Medical image analysis', 'Clinical decision support', 'Risk stratification', 'Drug interaction AI'],
            img: '/images/industry-healthcare.jpg',
            mediaUrl: '/images/industry-healthcare.jpg',
            icon: 'HiOutlineHeart'
          },
          {
            title: 'Finance & Banking',
            name: 'Finance & Banking',
            category: 'Finance & Health',
            tagline: 'Fraud detection, risk modeling & algorithmic trading',
            desc: 'Our financial AI platforms process millions of transactions in real-time, identifying patterns invisible to human analysts.',
            points: ['Real-time fraud detection', 'Credit risk modeling', 'Algorithmic trading', 'Compliance automation'],
            img: '/images/industry-finance.jpg',
            mediaUrl: '/images/industry-finance.jpg',
            icon: 'HiOutlineBanknotes'
          },
          {
            title: 'Supply Chain & Logistics',
            name: 'Supply Chain & Logistics',
            category: 'Operations & Logistics',
            tagline: 'Route optimization, demand forecasting & warehouse AI',
            desc: 'Dynamic route optimization and autonomous supply chain monitoring that reduce fuel consumption and transit delays.',
            points: ['Dynamic route planning', 'Demand forecasting', 'Warehouse automation', 'Predictive ETA'],
            img: '/images/industry-logistics.jpg',
            mediaUrl: '/images/industry-logistics.jpg',
            icon: 'HiOutlineTruck'
          },
          {
            title: 'Retail & E-Commerce',
            name: 'Retail & E-Commerce',
            category: 'Operations & Logistics',
            tagline: 'Personalization engines, inventory prediction & search AI',
            desc: 'Hyper-personalized shopping experiences that drive conversions and optimize inventory levels across global channels.',
            points: ['Visual search engines', 'Personalized recommendations', 'Dynamic pricing AI', 'Inventory optimization'],
            img: '/images/industry-ecommerce.jpg',
            mediaUrl: '/images/industry-ecommerce.jpg',
            icon: 'HiOutlineShoppingCart'
          },
          {
            title: 'Smart Manufacturing',
            name: 'Smart Manufacturing',
            category: 'Digital & Security',
            tagline: 'Predictive maintenance, quality control & digital twins',
            desc: 'IoT sensor telemetry and computer vision algorithms that detect assembly line defects before products leave the factory.',
            points: ['Predictive maintenance', 'Computer vision inspection', 'Digital twin modeling', 'Yield optimization'],
            img: '/images/industry-manufacturing.jpg',
            mediaUrl: '/images/industry-manufacturing.jpg',
            icon: 'HiOutlineBuildingOffice2'
          },
          {
            title: 'Cybersecurity & Defense',
            name: 'Cybersecurity & Defense',
            category: 'Digital & Security',
            tagline: 'Zero-trust architecture, threat detection & compliance',
            desc: 'Military-grade encryption, automated vulnerability scanners, and continuous compliance monitoring for enterprise perimeters.',
            points: ['Zero-trust access control', 'Real-time threat monitoring', 'SOC 2 & ISO 27001 readiness', 'Automated patching'],
            img: '/images/industry-security.jpg',
            mediaUrl: '/images/industry-security.jpg',
            icon: 'HiOutlineShieldCheck'
          }
        ]
      };
    } else if (key === 'industries_cta') {
      restoredData = {
        kicker: 'Custom Architectural Engagements',
        title: "Don't See Your Industry?",
        subtitle: 'Our AI and engineering capabilities span bespoke enterprise domains. Contact our solutions architecture team to discuss custom integrations.',
        buttons: [
          { label: 'Talk to Our Team', link: '/contact' },
          { label: 'View Our Services', link: '/services' }
        ]
      };
    } else if (key === 'services_hero') {
      restoredData = {
        kicker: 'Our Core Capabilities',
        title: 'AI, IoT, Web, Mobile & Cybersecurity Solutions',
        subtitle: 'Comprehensive technology services spanning Artificial Intelligence, Cloud infrastructure, full-stack development, cybersecurity, automation, and technical academy training.',
        mediaUrl: '/images/service-ai.jpg',
        buttons: [
          { label: 'Explore Services', link: '#services-grid' },
          { label: 'Talk to Our Team', link: '/contact' }
        ]
      };
    } else if (key === 'services_grid') {
      restoredData = {
        kicker: 'Engineering Expertise',
        title: 'Explore Our Services',
        subtitle: 'Specialized enterprise technology capabilities built to accelerate digital transformation.',
        items: [
          {
            slug: 'ai-solutions',
            title: 'Artificial Intelligence & Smart Agents',
            shortDesc: 'Custom LLM integration, computer vision, and cognitive agents designed to automate complex business workflows.',
            fullDesc: 'We design and deploy enterprise-grade AI models that transform raw data into predictive intelligence and autonomous decision-making systems.',
            img: '/images/service-ai.jpg',
            mediaUrl: '/images/service-ai.jpg',
            icon: 'HiOutlineSparkles'
          },
          {
            slug: 'ml-platforms',
            title: 'Machine Learning & Predictive Analytics',
            shortDesc: 'End-to-end MLOps pipelines, data engineering, and custom neural networks built for real-time inference.',
            fullDesc: 'From data cleansing to continuous model retraining in production, our MLOps pipelines ensure high accuracy and zero drift.',
            img: '/images/service-cloud.jpg',
            mediaUrl: '/images/service-cloud.jpg',
            icon: 'HiOutlineCpuChip'
          },
          {
            slug: 'iot-automation',
            title: 'Smart IoT & Industrial Telemetry',
            shortDesc: 'Embedded firmware, hardware sensor integration, and real-time edge computing for Industry 4.0.',
            fullDesc: 'Connect factory hardware and physical assets to cloud intelligence with sub-second latency telemetry and predictive maintenance.',
            img: '/images/service-iot.jpg',
            mediaUrl: '/images/service-iot.jpg',
            icon: 'HiOutlineRadio'
          },
          {
            slug: 'full-stack-development',
            title: 'Full-Stack Web & Mobile Engineering',
            shortDesc: 'High-performance React, Node.js, and cloud-native applications built with micro-frontend architectures.',
            fullDesc: 'Bespoke web platforms and cross-platform mobile apps engineered for high traffic concurrency, security, and sub-second render speeds.',
            img: '/images/service-fullstack.jpg',
            mediaUrl: '/images/service-fullstack.jpg',
            icon: 'HiOutlineDevicePhoneMobile'
          },
          {
            slug: 'cybersecurity',
            title: 'Enterprise Cybersecurity & Auditing',
            shortDesc: 'Zero-trust architecture, threat detection, penetration testing, and continuous compliance hardening.',
            fullDesc: 'Comprehensive security audits, automated threat detection engines, and compliance management for SOC 2, ISO 27001, and HIPAA.',
            img: '/images/service-cyber.jpg',
            mediaUrl: '/images/service-cyber.jpg',
            icon: 'HiOutlineShieldCheck'
          },
          {
            slug: 'cloud-systems',
            title: 'Cloud Infrastructure & DevOps',
            shortDesc: 'AWS, Azure, and GCP cloud-native migrations, Kubernetes orchestration, and automated CI/CD pipelines.',
            fullDesc: 'Zero-downtime deployments, infrastructure as code (IaC), and automated cloud cost optimization.',
            img: '/images/cloud.png',
            mediaUrl: '/images/cloud.png',
            icon: 'HiOutlineCloud'
          }
        ]
      };
    } else if (key === 'services_process') {
      restoredData = {
        kicker: 'Our Agile Process',
        title: 'How We Deliver Results',
        subtitle: 'A battle-tested methodology ensuring every intelligent application is delivered on schedule with maximum enterprise value.',
        items: [
          { n: '01', title: 'Discovery', desc: 'We start by understanding your business objectives, data landscape, and technical environment to identify high-impact opportunities.' },
          { n: '02', title: 'Design & Architecture', desc: 'Our architects craft a tailored solution blueprint, selecting optimal algorithms, infrastructure, and integration APIs.' },
          { n: '03', title: 'Build & Iterate', desc: 'Agile development with bi-weekly demos ensures the solution evolves with continuous feedback and real-world testing.' },
          { n: '04', title: 'Deploy & Scale', desc: 'Production deployment with 24/7 monitoring, ongoing optimization, and dedicated enterprise support.' }
        ]
      };
    } else if (key === 'services_cta') {
      restoredData = {
        kicker: 'Start Your Innovation Journey',
        title: 'Ready to Transform Your Business With AI?',
        subtitle: 'Whether you are launching a new AI engine or upgrading legacy systems, our principal engineers are ready to build solutions built for scale.',
        buttons: [
          { label: 'Start Your Project', link: '/contact' },
          { label: 'Talk to Our Team', link: '/contact' }
        ]
      };
    } else if (key === 'training_hero') {
      restoredData = {
        kicker: 'Porulon Academy',
        badge: 'Porulon Academy',
        title: 'Industry-Ready Skills, Taught By Practitioners',
        subtitle: 'Hands-on, mentor-led technical training programs in AI & ML, Cybersecurity, IoT, and Full-Stack Development — built to bridge the gap between academic theory and enterprise engineering.',
        mediaUrl: '',
        buttons: [
          { label: 'Explore Tracks', link: '#training-grid' },
          { label: 'Talk to Our Team', link: '/contact' }
        ]
      };
    } else if (key === 'training_tracks') {
      restoredData = {
        kicker: 'Curriculum Tracks',
        title: 'Explore Our Training Tracks',
        subtitle: 'Hands-on bootcamps engineered to build production-grade software portfolios.',
        items: [
          {
            slug: 'ai-ml',
            title: 'AI & Machine Learning Engineering',
            shortDesc: 'Master Python, PyTorch, Scikit-Learn, and MLOps. Build predictive models, neural networks, and generative AI apps.',
            duration: '12 Weeks',
            level: 'Intermediate to Advanced',
            img: '',
            icon: 'HiOutlineSparkles'
          },
          {
            slug: 'cybersecurity',
            title: 'Cybersecurity & Zero-Trust Defense',
            shortDesc: 'Learn network security, ethical hacking, SOC monitoring, penetration testing, and ISO compliance.',
            duration: '10 Weeks',
            level: 'Beginner to Advanced',
            img: '',
            icon: 'HiOutlineShieldCheck'
          },
          {
            slug: 'iot',
            title: 'IoT & Industrial Automation',
            shortDesc: 'Hands-on embedded C/C++, Raspberry Pi, ESP32, sensor telemetry, and MQTT cloud integration.',
            duration: '8 Weeks',
            level: 'All Levels',
            img: '',
            icon: 'HiOutlineRadio'
          },
          {
            slug: 'full-stack',
            title: 'Full-Stack Web & Mobile Development',
            shortDesc: 'Master React, Node.js, Express, PostgreSQL, and React Native. Build full-stack enterprise web & mobile applications.',
            duration: '14 Weeks',
            level: 'Beginner to Advanced',
            img: '',
            icon: 'HiOutlineDevicePhoneMobile'
          }
        ]
      };
    } else if (key === 'training_why_us') {
      restoredData = {
        kicker: 'Why Porulon Training',
        title: 'Learning Built For Real Careers',
        subtitle: 'A battle-tested training environment that prepares engineers for top-tier technology roles.',
        items: [
          { title: 'Mentor-Led', desc: 'Learn directly from principal AI, cybersecurity, and cloud engineers.', icon: 'HiOutlineUserGroup' },
          { title: 'Certification', desc: 'Earn a recognized certificate of technical mastery upon completion.', icon: 'HiOutlineAcademicCap' },
          { title: 'Project-Based', desc: 'Build production-ready, portfolio-grade AI software applications.', icon: 'HiOutlineWrenchScrewdriver' },
          { title: 'Career Support', desc: 'Placement assistance and resume reviews for top-performing engineers.', icon: 'HiOutlineBriefcase' }
        ]
      };
    } else if (key === 'training_process') {
      restoredData = {
        kicker: 'Structured Learning Journey',
        title: 'Our 4-Phase Applied Methodology',
        subtitle: 'A structured, practitioner-led roadmap to turn foundational knowledge into enterprise software mastery.',
        items: [
          { n: '01', title: 'Foundational Deep-Dive & Core Concepts', desc: 'Master core principles, algorithmic foundations, and industry tooling under practitioner guidance.' },
          { n: '02', title: 'Advanced Architecture & Microservices', desc: 'Design scalable systems, zero-trust security pipelines, and high-throughput backend APIs.' },
          { n: '03', title: 'Applied Production Capstone Sprint', desc: 'Engineer an end-to-end, portfolio-grade technical application solving a real-world enterprise challenge.' },
          { n: '04', title: 'Code Audit, Certification & Career Prep', desc: 'Undergo rigorous code reviews, receive technical certification, and access career placement support.' }
        ]
      };
    } else if (key === 'training_faq') {
      restoredData = {
        kicker: 'Training Inquiries',
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about cohort schedules, prerequisites, certifications, and career support.',
        items: [
          { q: 'Who are these training tracks designed for?', a: 'Our programs cater to computer science students, working developers, and technology professionals seeking to master enterprise AI, cybersecurity, IoT, and full-stack engineering.' },
          { q: 'What is the format and duration of the cohorts?', a: 'Classes are offered in hybrid and live interactive online formats, typically spanning 8 to 12 weeks with flexible weekend or evening schedules.' },
          { q: 'Do participants receive hands-on project experience?', a: 'Yes! Every track includes a capstone engineering project where you build, deploy, and showcase real production software.' },
          { q: 'Is there career placement assistance provided?', a: 'Top-performing graduates receive resume optimization, technical interview prep, and direct referral connections to Porulon client partner networks.' }
        ]
      };
    } else if (key === 'training_cta') {
      restoredData = {
        kicker: 'Accelerate Your Career',
        title: 'Ready to Upskill?',
        subtitle: 'Explore our upcoming training cohorts or reach out to discuss custom corporate upskilling for your engineering team.',
        buttons: [
          { label: 'Enroll Now', link: '/contact' },
          { label: 'Talk to Our Team', link: '/contact' }
        ]
      };
    } else if (key === 'about_hero') {
      restoredData = {
        kicker: 'About Porulon Technologies',
        title: 'Where Deep Tech Meets A Human-Centric Mindset',
        subtitle: 'We are a forward-thinking technology company specializing in AI, Machine Learning, and automation-based software solutions. Our mission is to optimize enterprise processes, enhance operational efficiency, and train the next generation of tech leaders.',
        mediaUrl: '',
        buttons: [
          { label: 'Explore Our Story', link: '#our-story' },
          { label: 'Contact Leadership', link: '/contact' }
        ],
        slides: [
          {
            kicker: 'About Porulon Technologies',
            title: 'Where Deep Tech Meets A Human-Centric Mindset',
            subtitle: 'We design, engineer, and deploy high-concurrency AI engines, cloud microservices, and smart hardware telemetry for global enterprise leaders.',
            mediaUrl: '',
            buttons: [
              { label: 'Explore Our Story', link: '#our-story' },
              { label: 'Contact Leadership', link: '/contact' }
            ]
          },
          {
            kicker: 'AI Engineering & Innovation',
            title: 'Empowering Businesses With Autonomous Intelligence',
            subtitle: 'From bespoke neural network training to zero-trust cloud infrastructure, our principal architects build mission-critical digital systems.',
            mediaUrl: '',
            buttons: [
              { label: 'View Capabilities', link: '/services' },
              { label: 'Talk to an Expert', link: '/contact' }
            ]
          },
          {
            kicker: 'Academy & Talent Mentorship',
            title: 'Cultivating The Next Generation Of Deep Tech Leaders',
            subtitle: 'Our mentor-led technical bootcamps bridge the gap between academic theory and enterprise engineering excellence.',
            mediaUrl: '',
            buttons: [
              { label: 'Explore Academy', link: '/training' },
              { label: 'Enroll In Cohort', link: '/contact' }
            ]
          }
        ],
        stats: [
          { n: '15+', l: 'Projects Delivered' },
          { n: '10+', l: 'Enterprise Clients' },
          { n: '500+', l: 'Students Trained' },
          { n: '99.9%', l: 'System Uptime' }
        ]
      };
    } else if (key === 'about_story') {
      restoredData = {
        kicker: 'Our Journey & Conviction',
        title: 'Built On One Clear Conviction',
        subtitle: 'Porulon Technologies was founded with a clear conviction: that the transformative power of Artificial Intelligence and Machine Learning should be accessible to businesses of every size.',
        content: 'We specialize in designing, developing, and deploying AI, ML, and automation-based software solutions and cloud-based systems.',
        mediaUrl: '',
        points: [
          'Bespoke AI Models',
          'Enterprise Automation',
          'Academy Programs'
        ]
      };
    } else if (key === 'about_stats') {
      restoredData = {
        kicker: 'Proven Track Record',
        title: 'Impact In Numbers',
        subtitle: 'Quantifiable engineering performance across high-stakes client deployments.',
        items: [
          { n: '15+', l: 'Projects Delivered', icon: 'HiOutlineRocketLaunch' },
          { n: '10+', l: 'Enterprise Clients', icon: 'HiOutlineBuildingOffice2' },
          { n: '3+', l: 'Industries Served', icon: 'HiOutlineGlobeAlt' },
          { n: '500+', l: 'Students Trained', icon: 'HiOutlineAcademicCap' },
          { n: '99.9%', l: 'System Uptime', icon: 'HiOutlineShieldCheck' },
          { n: '10+', l: 'AI/ML Engineers', icon: 'HiOutlineCpuChip' }
        ]
      };
    } else if (key === 'about_values') {
      restoredData = {
        kicker: 'Our Values',
        title: 'The Principles That Guide Everything We Build',
        subtitle: 'Core engineering ethics and client-first principles driving our innovation.',
        items: [
          { icon: 'HiOutlineSparkles', title: 'Mission-Driven', desc: 'We build technology that solves real problems and delivers measurable business outcomes for every client.' },
          { icon: 'HiOutlineLightBulb', title: 'Innovation First', desc: 'Continuous R&D ensures our solutions leverage the latest advancements in AI, ML, and automation.' },
          { icon: 'HiOutlineUsers', title: 'People-Centric', desc: 'From training young minds to empowering enterprise teams, people are at the heart of everything we do.' },
          { icon: 'HiOutlineShieldCheck', title: 'Trusted & Secure', desc: 'Enterprise-grade security and compliance standards protect your data and operations at every layer.' },
          { icon: 'HiOutlineHandRaised', title: 'Client Partnership', desc: "We view every engagement as a long-term partnership, aligning our success with our clients' growth." },
          { icon: 'HiOutlineGlobeAlt', title: 'Global Perspective', desc: 'We serve diverse industries worldwide, bringing cross-sector insights to every solution we build.' }
        ]
      };
    } else if (key === 'about_cta') {
      restoredData = {
        kicker: 'Careers & Culture',
        title: 'Shape The Future Of Intelligent Tech',
        subtitle: 'We are always looking for visionary engineers, researchers, and thinkers passionate about solving complex enterprise challenges and building the future of AI.',
        buttons: [
          { label: 'Explore Careers', link: '/contact' },
          { label: 'Contact Talent Team', link: '/contact' }
        ]
      };
    } else if (key === 'contact_hero') {
      restoredData = {
        kicker: 'Contact Porulon',
        title: "Let's Talk About Your Next Project",
        subtitle: 'Whether you need an enterprise AI platform, cloud architecture, operational automation, or strategic consultancy, our engineering directors are ready to assist.',
        mediaUrl: '',
        points: ['Direct Support', 'Enterprise SLA', 'Global Reach']
      };
    } else if (key === 'contact_info') {
      restoredData = {
        kicker: 'Connect & Visit',
        title: 'Direct Channels & Global HQ',
        subtitle: 'Coimbatore HQ • Keeranatham IT Hub',
        content: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.0397397115257!2d76.99902397479613!3d11.110416252944882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7541fa58c0d%3A0x3ee79f1864250ea9!2sKumaran%20Nagar%20Keeranatham!5e0!3m2!1sen!2sin!4v1774456441458!5m2!1sen!2sin',
        items: [
          {
            icon: 'HiOutlineEnvelope',
            title: 'Email Us',
            desc: 'info@porulontech.com',
            sub: 'For general inquiries, quotes & proposals',
            actionText: 'Send Email',
            href: 'mailto:info@porulontech.com'
          },
          {
            icon: 'HiOutlinePhone',
            title: 'Call Sales & HR',
            desc: 'Sales: +91 97918 82387 | HR: +91 99005 59922',
            sub: 'Mon to Fri, 9:00 AM – 6:00 PM IST',
            actionText: 'Call Direct',
            href: 'tel:+919791882387'
          },
          {
            icon: 'HiOutlineMapPin',
            title: 'Corporate Headquarters',
            desc: 'Porulon Technologies Pvt. Ltd., 7/42, Kumaran Nagar, Keeranatham, Coimbatore, Tamil Nadu 641035',
            sub: 'CHIL SEZ IT Park Hub',
            actionText: 'Get Directions',
            href: 'https://www.google.com/maps?q=Kumaran+Nagar+Keeranatham+Coimbatore'
          },
          {
            icon: 'HiOutlineClock',
            title: 'SLA Response Guarantee',
            desc: 'Within 24 Business Hours',
            sub: 'Dedicated project managers respond promptly',
            actionText: '24h SLA Guarantee',
            href: ''
          },
          {
            icon: 'HiOutlineGlobeAlt',
            title: 'Global Remote Delivery',
            desc: 'Serving Clients Worldwide',
            sub: 'Seamless multi-timezone agile collaboration',
            actionText: 'Global Operations',
            href: ''
          }
        ]
      };
    } else if (key === 'contact_form') {
      restoredData = {
        kicker: 'Get In Touch',
        title: 'Send Us A Message',
        subtitle: 'Share your project requirements or goals and our technical leads will get back to you.',
        items: [
          {
            icon: 'HiOutlineLockClosed',
            title: '100% NDA Protected Consultation',
            desc: 'Your proprietary data, AI roadmap, and technical specs remain completely confidential.'
          },
          {
            icon: 'HiOutlineClock',
            title: '24-Hour SLA Response',
            desc: 'Our senior technical leads and solution architects respond within 1 business day.'
          },
          {
            icon: 'HiOutlineShieldCheck',
            title: 'Enterprise Architecture Guarantee',
            desc: 'Tailored AI models, cloud infrastructure, and zero-trust security engineered for scale.'
          }
        ],
        points: [
          'AI & Machine Learning',
          'Cloud Architecture',
          'Academy Programs',
          'General Inquiry'
        ]
      };
    } else if (key === 'blog_hero') {
      restoredData = {
        kicker: 'Porulon Insights & Engineering',
        title: 'Thought Leadership In Deep Tech & Enterprise AI',
        subtitle: 'In-depth architectural guides, research papers, and technical analysis authored by Porulon principal engineers and researchers.',
        mediaUrl: '',
        points: ['Architecture Case Studies', 'AI & ML Benchmarks', 'Zero-Trust Cloud']
      };
    } else if (key === 'blog_grid') {
      restoredData = {
        kicker: 'Latest Articles',
        title: 'Explore Technical Publications',
        subtitle: 'Search and filter our latest engineering deep-dives across AI, Cloud, Cybersecurity, and IoT.',
        points: ['All', 'AI & Machine Learning', 'Cloud Architecture', 'Cybersecurity', 'IoT & Telemetry'],
        items: [
          {
            slug: 'zero-trust-cloud-architecture-for-fintech-microservices',
            title: 'Zero-Trust Cloud Architecture for High-Volume Fintech Services',
            category: 'Cybersecurity',
            excerpt: 'Modern financial platforms demand absolute data isolation, continuous compliance auditing, and bank-grade encryption at rest and in transit.',
            readTime: '5 min read',
            img: '/images/service-security.jpg',
            mediaUrl: '/images/service-security.jpg',
          },
          {
            slug: 'industrial-iot-telemetry-and-edge-computing-in-smart-factories',
            title: 'Industrial IoT Telemetry & Edge AI in Smart Manufacturing',
            category: 'IoT & Telemetry',
            excerpt: 'Discover how industrial IoT telemetry combined with micro-controller edge processing detects assembly line bottlenecks before component breakdown.',
            readTime: '7 min read',
            img: '/images/service-iot.jpg',
            mediaUrl: '/images/service-iot.jpg',
          },
          {
            slug: 'nextjs-15-and-micro-frontend-patterns-for-enterprise-web',
            title: 'Next.js & Micro-Frontend Patterns for Scalable Corporate Apps',
            category: 'Cloud Architecture',
            excerpt: 'Learn how micro-frontend architectures combined with server-driven components accelerate feature releases while preserving brand UI consistency.',
            readTime: '4 min read',
            img: '/images/service-ai.jpg',
            mediaUrl: '/images/service-ai.jpg',
          },
        ],
      };
    } else if (key === 'blog_cta') {
      restoredData = {
        kicker: 'Stay Informed',
        title: 'Subscribe To Technical Insights',
        subtitle: 'Get our latest architectural whitepapers and enterprise AI benchmarks delivered to your inbox.',
        buttons: [
          { label: 'Subscribe Newsletter', link: '/contact' },
          { label: 'Talk to Our Team', link: '/contact' }
        ]
      };
    } else if (key === 'projects_hero') {
      restoredData = {
        kicker: 'Enterprise Products & Client Engineering',
        title: 'Engineering Flagship Digital Products & Client Solutions',
        subtitle: 'Explore Porulon’s proprietary AI engines, IoT platforms, multi-cloud suites, and real-world enterprise projects delivered for leading global organizations.',
        stats: [
          { label: 'Products & Projects', value: '120+' },
          { label: 'System Uptime SLA', value: '99.9%' },
          { label: 'Industry Verticals', value: '15+' },
          { label: 'Client Value Created', value: '$45M+' }
        ]
      };
    } else if (key === 'projects_trust_bar') {
      restoredData = {
        kicker: 'Trusted by Engineering Leaders & Global Client Brands',
        title: 'Client Trust & Partner Brands',
        items: [
          { title: 'MedHealth Network', icon: 'HiOutlineBuildingOffice2' },
          { title: 'GlobalLogistics AP', icon: 'HiOutlineChartBar' },
          { title: 'Apex FinTech', icon: 'HiOutlineShieldCheck' },
          { title: 'AutoSmart Robotics', icon: 'HiOutlineCpuChip' },
          { title: 'CloudScale SaaS', icon: 'HiOutlineCloud' }
        ]
      };
    } else if (key === 'projects_grid') {
      restoredData = {
        kicker: 'Proprietary Enterprise Software',
        title: 'Our Flagship Software Products',
        subtitle: 'Explore ready-to-deploy enterprise platforms built for high performance, scalability, and seamless integration.',
        points: ['All Products & Solutions', 'AI & Automation', 'IoT & Smart Edge', 'Cloud Platforms', 'Cybersecurity'],
        items: [
          {
            slug: 'porulon-ai-document-engine',
            title: 'Porulon AI Document Engine',
            category: 'AI & Automation',
            badge: 'Flagship SaaS',
            tagline: 'Intelligent document parsing, OCR & predictive classification.',
            desc: 'An enterprise-grade document processing suite powered by LLMs and deep learning OCR that automates invoice extraction, contract auditing, and compliance checks with 99.4% accuracy.',
            metrics: '85% Efficiency Boost',
            features: ['Instant Multilingual OCR Parsing', 'LLM-Powered Contract Auditing', 'REST API & Webhook Integration'],
            tech: ['Python AI', 'PyTorch', 'FastAPI', 'React', 'Docker'],
            img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
            mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
          },
          {
            slug: 'porulon-smartfactory-iot-hub',
            title: 'Porulon SmartFactory IoT Hub',
            category: 'IoT & Smart Edge',
            badge: 'Industrial IoT',
            tagline: 'Real-time telemetry, sensor mesh & predictive maintenance.',
            desc: 'End-to-end telemetry platform connecting 1,000+ edge microcontrollers across manufacturing plants, offering real-time anomaly alerts and automated machine health diagnostics.',
            metrics: '99.9% Sensor Uptime',
            features: ['Edge Sensor Telemetry Aggregation', 'Predictive Equipment Breakdown Alerts', 'Time-Series Data Analytics'],
            tech: ['MQTT', 'Node.js', 'React', 'TimeScaleDB', 'Grafana'],
            img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
            mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop'
          },
          {
            slug: 'porulon-multi-cloud-k8s-scaling-suite',
            title: 'Porulon Multi-Cloud K8s Scaling Suite',
            category: 'Cloud Platforms',
            badge: 'DevOps & Cloud',
            tagline: 'Automated cluster orchestration & cost optimization platform.',
            desc: 'Native Kubernetes management suite that orchestrates workloads across AWS, GCP, and Azure while automatically resizing GPU/CPU nodes to cut cloud bill spending by up to 60%.',
            metrics: '60% Cloud Cost Savings',
            features: ['Cross-Cloud Cluster Sync', 'Auto GPU Compute Scaling', 'FinOps Cost Audit Dashboard'],
            tech: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Go'],
            img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
            mediaUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop'
          },
          {
            slug: 'porulon-zero-trust-cyber-sentinel',
            title: 'Porulon Zero-Trust Cyber Sentinel',
            category: 'Cybersecurity',
            badge: 'Enterprise Security',
            tagline: 'AI threat detection pipeline & continuous compliance auditing.',
            desc: 'Next-generation SIEM platform that ingests millions of network log events per second, utilizing AI threat scoring to neutralize zero-day vulnerabilities in real time.',
            metrics: '0 Breach Guarantee',
            features: ['Real-Time Network Anomaly Scoring', 'Continuous HIPAA & SOC2 Auditing', 'Automated Incident Mitigation'],
            tech: ['ElasticSearch', 'Python AI', 'Go', 'Kubernetes', 'CyberSec'],
            img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
            mediaUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop'
          }
        ]
      };
    } else if (key === 'projects_client_stories') {
      restoredData = {
        kicker: 'Proven Client Track Record',
        title: 'Featured Client Projects & Engineering',
        subtitle: 'Real-world custom software platforms engineered and delivered for enterprise client partners.',
        items: [
          {
            client: 'GlobalLogistics Corp (Asia-Pacific)',
            title: 'AI Fleet Route Optimization & Automated Dispatch Platform',
            industry: 'Logistics & Supply Chain',
            desc: 'Architected and deployed a real-time AI dispatch system for 10,000+ delivery vehicles across 6 countries, reducing fuel costs by 22% and improving delivery speed by 35%.',
            impact: ['22% Fuel Savings', '10,000+ Vehicles Managed', 'Sub-second Route Calculation']
          },
          {
            client: 'MedHealth Diagnostics Network',
            title: 'HIPAA-Certified Medical Imaging Scanner & Diagnostic Cloud',
            industry: 'Healthcare Tech',
            desc: 'Engineered a cloud-native radiological imaging portal serving 50+ hospital networks with automated AI lesion detection and instant doctor reporting.',
            impact: ['98.7% Diagnostic Accuracy', '50+ Hospital Networks', 'HIPAA & GDPR Certified']
          },
          {
            client: 'Apex Banking & Financial Services',
            title: 'Omnichannel Microservices Core & Mobile Banking Platform',
            industry: 'FinTech & Banking',
            desc: 'Re-architected legacy banking core into modern cloud microservices handling 1.5 million daily transactions with zero downtime and sub-second payment settlement.',
            impact: ['1.5M Daily Transactions', '99.999% High Availability', 'Zero Payment Lag']
          },
          {
            client: 'AutoSmart Robotics Manufacturing',
            title: 'Industrial IoT Telemetry Hub & Autonomous Factory Control',
            industry: 'Smart Manufacturing',
            desc: 'Integrated custom sensor hardware and SCADA dashboards for automated assembly line monitoring, enabling zero-touch machine maintenance.',
            impact: ['500+ Factory Sensors', 'Zero Unplanned Downtime', 'Real-Time SCADA Sync']
          }
        ]
      };
    } else if (key === 'projects_tech_stack') {
      restoredData = {
        kicker: 'Engineering Backbone',
        title: 'Production Tech Stack Architecture',
        subtitle: 'We build with battle-tested frameworks, modern cloud microservices, and AI pipelines.'
      };
    } else if (key === 'projects_testimonials') {
      restoredData = {
        kicker: 'Verified Executive Feedback',
        title: 'What Executive Leaders Say',
        items: [
          {
            name: 'Dr. Marcus Vance',
            role: 'Chief Technology Officer',
            company: 'MedHealth Diagnostics',
            quote: 'Porulon Technologies delivered our AI diagnostic cloud platform ahead of schedule. Their engineering precision, HIPAA compliance adherence, and system stability exceeded our highest expectations.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
          },
          {
            name: 'Elena Rostova',
            role: 'VP of Engineering',
            company: 'GlobalLogistics Corp',
            quote: 'The AI fleet optimization engine developed by Porulon transformed our logistics workflow. We saw an immediate 22% reduction in fuel consumption across 10,000 active delivery vehicles.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop'
          },
          {
            name: 'Rajesh Kumar',
            role: 'Head of Digital Solutions',
            company: 'Apex Financial Tech',
            quote: 'Porulon’s microservices architecture replaced our legacy banking core smoothly. We now process 1.5M transactions daily with zero downtime and sub-second payment settlement.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
          }
        ]
      };
    } else if (key === 'projects_security') {
      restoredData = {
        kicker: 'Enterprise Governance',
        title: 'Built With Zero-Trust & Global Standards'
      };
    } else if (key === 'projects_cta') {
      restoredData = {
        kicker: 'Launch Your Solution',
        title: 'Ready to Deploy Our Products?',
        subtitle: 'Schedule a live product demonstration or consult with our solution architects to design your enterprise software strategy.',
        buttons: [
          { label: 'Schedule Live Demo', link: '/contact' },
          { label: 'Request Product Proposal', link: '/contact' }
        ]
      };
    }

    setMediaError('');
    setFormData(prev => ({ ...prev, ...restoredData }));
    setInlineNotice({ type: 'success', message: '✓ Restored factory default content for this section!' });
    setTimeout(() => {
      setInlineNotice({ type: '', message: '' });
    }, 3000);
  };

  // Form State for Section Editor
  const [formData, setFormData] = useState({
    page: 'home',
    sectionKey: '',
    kicker: '',
    title: '',
    badge: '',
    subtitle: '',
    content: '',
    mediaUrl: '',
    secondaryMediaUrl: '',
    layoutStyle: 'grid',
    order: 0,
    isActive: true,
    points: [],
    buttons: [],
    items: [],
    stats: [],
    badgeTitle: '',
    badgeSubtitle: '',
  });

  const loadSections = async (targetTab = 'home') => {
    setLoading(true);
    try {
      const res = await getSections();
      let allSecs = res.data || [];
      
      const pageSecs = allSecs.filter(s => (s.page || 'home') === targetTab);
      const existingKeys = new Set(pageSecs.map(s => s.sectionKey));
      
      const REQUIRED_KEYS_MAP = {
        home: ['hero', 'tech_stacks_marquee', 'about_preview', 'featured_services', 'industries_carousel', 'why_choose_us', 'final_cta'],
        industries: ['industries_hero', 'industries_grid', 'industries_cta'],
        services: ['services_hero', 'services_grid', 'services_process', 'services_cta'],
        training: ['training_hero', 'training_tracks', 'training_why_us', 'training_process', 'training_faq', 'training_cta'],
        about: ['about_hero', 'about_story', 'about_stats', 'about_values', 'about_cta'],
        contact: ['contact_hero', 'contact_info', 'contact_form'],
        blog: ['blog_hero', 'blog_grid', 'blog_cta'],
        projects: ['projects_hero', 'projects_trust_bar', 'projects_grid', 'projects_client_stories', 'projects_tech_stack', 'projects_testimonials', 'projects_cta'],
      };

      const requiredKeys = REQUIRED_KEYS_MAP[targetTab] || [];
      const isMissingRequiredSections = requiredKeys.length > 0
        ? requiredKeys.some(key => !existingKeys.has(key))
        : pageSecs.length === 0;

      if (isMissingRequiredSections && REQUIRED_KEYS_MAP[targetTab]) {
        await restoreDefaultSections(targetTab);
        const res2 = await getSections();
        allSecs = res2.data || [];
      }
      setSections(allSecs);
    } catch (err) {
      console.error('Error fetching sections:', err);
    } finally {
      setLoading(false);
    }

    try {
      const resArchived = await getArchivedSections();
      setArchivedSections(resArchived.data || []);
    } catch (err) {
      console.error('Error fetching archived sections:', err);
    }
  };

  useEffect(() => {
    loadSections(activeTab);
  }, [activeTab]);

  const getDeduplicatedSections = (list) => {
    if (!Array.isArray(list)) return [];
    const seen = new Set();
    return list.filter((s) => {
      const key = s.sectionKey || s._id || s.id;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const uniqueSections = getDeduplicatedSections(sections);

  const pageTabs = [
    { id: 'home', label: 'Home Page', icon: Home, count: uniqueSections.filter(s => (s.page || 'home') === 'home').length },
    { id: 'industries', label: 'Industries Page', icon: Building2, count: uniqueSections.filter(s => s.page === 'industries').length },
    { id: 'services', label: 'Services Page', icon: Cpu, count: uniqueSections.filter(s => s.page === 'services').length },
    { id: 'projects', label: 'Products Page', icon: Layers, count: uniqueSections.filter(s => (s.page === 'projects' || s.page === 'products') && s.sectionKey !== 'projects_security').length },
    { id: 'training', label: 'Training Page', icon: GraduationCap, count: uniqueSections.filter(s => s.page === 'training').length },
    { id: 'about', label: 'About Page', icon: Info, count: uniqueSections.filter(s => s.page === 'about').length },
    { id: 'contact', label: 'Contact Page', icon: Mail, count: uniqueSections.filter(s => s.page === 'contact').length },
    { id: 'blog', label: 'Blog Page', icon: FileText, count: uniqueSections.filter(s => s.page === 'blog').length },
    { id: 'trash', label: 'Trash Bin (Recover Deleted)', icon: Trash2, count: archivedSections.length },
  ];

  const SECTION_ORDER_MAP = {
    // Home Page
    hero: 1,
    tech_stacks_marquee: 2,
    about_preview: 3,
    featured_services: 4,
    industries_carousel: 5,
    why_choose_us: 6,
    final_cta: 7,

    // Industries Page
    industries_hero: 1,
    industries_grid: 2,
    industries_cta: 3,

    // Services Page
    services_hero: 1,
    services_grid: 2,
    services_process: 3,
    services_cta: 4,

    // Products Page
    projects_hero: 1,
    projects_trust_bar: 2,
    projects_grid: 3,
    projects_client_stories: 4,
    projects_tech_stack: 5,
    projects_testimonials: 6,
    projects_cta: 7,

    // Training Page
    training_hero: 1,
    training_tracks: 2,
    training_why_us: 3,
    training_process: 4,
    training_faq: 5,
    training_cta: 6,

    // About Page
    about_hero: 1,
    about_story: 2,
    about_stats: 3,
    about_values: 4,
    about_cta: 5,

    // Contact Page
    contact_hero: 1,
    contact_info: 2,
    contact_form: 3,

    // Blog Page
    blog_hero: 1,
    blog_grid: 2,
    blog_cta: 3,
  };

  const getSectionOrder = (sec) => {
    if (sec && sec.sectionKey && SECTION_ORDER_MAP[sec.sectionKey] !== undefined) {
      return SECTION_ORDER_MAP[sec.sectionKey];
    }
    return (sec && sec.order) ? Number(sec.order) : 99;
  };

  const currentTabSections = uniqueSections
    .filter((s) => {
      if (activeTab === 'projects') return (s.page === 'projects' || s.page === 'products') && s.sectionKey !== 'projects_security';
      return (s.page || 'home') === activeTab && s.sectionKey !== 'projects_security';
    })
    .sort((a, b) => getSectionOrder(a) - getSectionOrder(b));

  const handleEdit = (sec) => {
    setEditing(sec);
    setInlineNotice({ type: '', message: '' });
    setMediaError('');
    const cleanMediaUrl = sec.mediaUrl || '';

    setFormData({
      page: sec.page || activeTab,
      sectionKey: sec.sectionKey || '',
      kicker: sec.kicker || '',
      title: sec.title || '',
      badge: sec.badge || (sec.sectionKey === 'about_preview' ? 'Quality First' : ''),
      subtitle: sec.subtitle || '',
      content: sec.content || (sec.sectionKey === 'about_preview' ? 'Engineering standards that meet the highest global benchmarks for reliability.' : ''),
      mediaUrl: cleanMediaUrl,
      secondaryMediaUrl: sec.secondaryMediaUrl || '',
      layoutStyle: sec.layoutStyle || 'grid',
      order: sec.order || 0,
      isActive: sec.isActive ?? true,
      points: sec.points?.length ? sec.points : [],
      buttons: sec.buttons?.length ? sec.buttons : (sec.sectionKey === 'projects_cta' ? [{ label: 'Schedule Live Demo', link: '/contact' }, { label: 'Request Product Proposal', link: '/contact' }] : sec.sectionKey === 'about_preview' ? [{ label: 'Learn More About Our Mission', link: '/about' }] : sec.sectionKey === 'final_cta' ? [{ label: 'Start Your Project', link: '/contact' }, { label: 'Talk to an Expert', link: '/contact' }] : []),
      items: (sec.items && Array.isArray(sec.items) && sec.items.length > 0) ? sec.items : (sec.sectionKey === 'services_grid' ? [
        {
          slug: 'ai-solutions',
          title: 'Artificial Intelligence & Smart Agents',
          tagline: 'Enterprise AI & Cognitive Automation',
          shortDesc: 'Custom LLM integration, computer vision, and cognitive agents designed to automate complex business workflows.',
          desc: 'We design and deploy enterprise-grade AI models that transform raw data into predictive intelligence and autonomous decision-making systems.',
          img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
          icon: 'HiOutlineSparkles',
          features: ['Custom LLM Fine-Tuning', 'Computer Vision & OCR', 'Autonomous Decision Agents'],
        },
        {
          slug: 'ml-platforms',
          title: 'Machine Learning & Predictive Analytics',
          tagline: 'High-Throughput MLOps & Data Pipelines',
          shortDesc: 'End-to-end MLOps pipelines, data engineering, and custom neural networks built for real-time inference.',
          desc: 'From data cleansing to continuous model retraining in production, our MLOps pipelines ensure high accuracy and zero drift.',
          img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
          icon: 'HiOutlineCpuChip',
          features: ['Real-Time Neural Inference', 'Automated MLOps Pipelines', 'Predictive Anomaly Scoring'],
        },
        {
          slug: 'iot-automation',
          title: 'Smart IoT & Industrial Telemetry',
          tagline: 'Industry 4.0 Edge Hardware Telemetry',
          shortDesc: 'Embedded firmware, hardware sensor integration, and real-time edge computing for Industry 4.0.',
          desc: 'Connect factory hardware and physical assets to cloud intelligence with sub-second latency telemetry and predictive maintenance.',
          img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
          icon: 'HiOutlineRadio',
          features: ['Sub-Second Telemetry Sync', 'Edge Sensor Mesh Integration', 'SCADA Hardware Dashboards'],
        },
        {
          slug: 'full-stack-development',
          title: 'Full-Stack Web & Mobile Engineering',
          tagline: 'High-Scale Reactive Microservices',
          shortDesc: 'High-performance React, Node.js, and cloud-native applications built with micro-frontend architectures.',
          desc: 'Bespoke web platforms and cross-platform mobile apps engineered for high traffic concurrency, security, and sub-second render speeds.',
          img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
          icon: 'HiOutlineDevicePhoneMobile',
          features: ['Reactive Microservices API', 'Cross-Platform React Native', 'Sub-Second Render Speeds'],
        },
        {
          slug: 'cybersecurity',
          title: 'Enterprise Cybersecurity & Auditing',
          tagline: 'Zero-Trust Architecture & Threat Hardening',
          shortDesc: 'Zero-trust architecture, threat detection, penetration testing, and continuous compliance hardening.',
          desc: 'Comprehensive security audits, automated threat detection engines, and compliance management for SOC 2, ISO 27001, and HIPAA.',
          img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
          icon: 'HiOutlineShieldCheck',
          features: ['Zero-Trust Cloud Mesh', 'SOC 2 & ISO 27001 Readiness', 'Penetration Audits & SIEM'],
        },
        {
          slug: 'cloud-systems',
          title: 'Cloud Infrastructure & DevOps',
          tagline: 'Kubernetes Cluster Auto-Scaling',
          shortDesc: 'AWS, Azure, and GCP cloud-native migrations, Kubernetes orchestration, and automated CI/CD pipelines.',
          desc: 'Zero-downtime deployments, infrastructure as code (IaC), and automated cloud cost optimization.',
          img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
          icon: 'HiOutlineCloud',
          features: ['Cross-Cloud Cluster Scaling', 'Infrastructure as Code (IaC)', 'FinOps Cloud Bill Optimization'],
        },
      ] : sec.sectionKey === 'services_process' ? [
        { n: '01', title: 'Discovery & Strategic Audit', desc: 'We analyze your enterprise objectives, data assets, and infrastructure bottlenecks to architect high-impact engineering roadmaps.' },
        { n: '02', title: 'System Architecture & Prototyping', desc: 'Our principal architects design a bespoke blueprint, selecting optimal algorithms, cloud VPCs, and reactive APIs.' },
        { n: '03', title: 'Agile Engineering & CI/CD Sprint', desc: 'Iterative sprint development with bi-weekly live staging demos ensures continuous feedback and battle-tested code.' },
        { n: '04', title: 'Production Deployment & SLA Scale', desc: 'Zero-downtime deployment with 24/7 automated metric monitoring, SOC 2 compliance, and ongoing scaling.' },
      ] : sec.sectionKey === 'projects_testimonials' ? [
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
      ] : sec.sectionKey === 'projects_tech_stack' ? [
        {
          id: 'tech-1',
          title: 'AI & Machine Learning Frameworks',
          icon: '🤖',
          desc: 'Deep neural networks, LLM orchestration, model training, computer vision, and high-throughput inference.',
          gradient: 'from-purple-500 to-indigo-600',
          tech: ['PyTorch', 'TensorFlow', 'OpenAI APIs', 'FastAPI', 'Ray', 'OpenCV'],
        },
        {
          id: 'tech-2',
          title: 'Cloud & Infrastructure Systems',
          icon: '☁️',
          desc: 'Elastic cluster orchestration, zero-trust cloud VPC, Infrastructure as Code, and real-time metric telemetry.',
          gradient: 'from-cyan-500 to-blue-600',
          tech: ['Kubernetes', 'Docker', 'AWS', 'Google Cloud', 'Terraform', 'Grafana'],
        },
        {
          id: 'tech-3',
          title: 'Full-Stack & Mobile Engineering',
          icon: '⚡',
          desc: 'High-concurrency web applications, cross-platform mobile apps, reactive APIs, and low-latency database caching.',
          gradient: 'from-emerald-500 to-teal-600',
          tech: ['React', 'Next.js', 'Node.js', 'Go', 'PostgreSQL', 'Redis'],
        },
      ] : sec.sectionKey === 'projects_client_stories' ? [
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
      ] : sec.sectionKey === 'projects_grid' ? [
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
      ] : sec.sectionKey === 'featured_services' ? [
        { name: 'AI & Machine Learning', title: 'AI & Machine Learning', desc: 'Custom ML models, neural networks, predictive analytics, and automated decision systems tailored for complex workflows.', img: '/images/ai.png', points: ['Neural Networks', 'Predictive Analytics', 'NLP & Computer Vision'] },
        { name: 'Cloud Infrastructure', title: 'Cloud Infrastructure', desc: 'Scalable cloud architectures, serverless deployments, Kubernetes orchestration, and multi-cloud management.', img: '/images/cloud.png', points: ['AWS / Azure / GCP', 'Kubernetes Orchestration', 'Zero-Downtime Migration'] },
        { name: 'Cybersecurity & Auditing', title: 'Cybersecurity & Auditing', desc: 'Comprehensive security audits, vulnerability assessments, zero-trust architecture, and compliance implementation.', img: '/images/security.png', points: ['Penetration Testing', 'Zero-Trust Frameworks', 'SOC2 / ISO27001 Readiness'] },
        { name: 'Full-Stack Software', title: 'Full-Stack Software Development', desc: 'Modern web & mobile applications built with React, Node.js, and high-performance microservices.', img: '/images/web.png', points: ['React & Next.js Apps', 'REST & GraphQL APIs', 'High-Scale DB Design'] },
        { name: 'Embedded & IoT Systems', title: 'Embedded & IoT Systems', desc: 'Hardware-level firmware, microcontrollers, Raspberry Pi integration, and real-time edge computing solutions.', img: '/images/iot.png', points: ['Firmware Development', 'MQTT & Edge Gateway', 'Sensor Integration'] }
      ] : sec.sectionKey === 'industries_carousel' ? [
        { name: 'Smart Healthcare', title: 'Smart Healthcare & MedTech', tag: 'HEALTHCARE', desc: 'HIPAA-compliant telemetry systems, medical image processing AI, and patient monitoring software.', img: '/images/health.jpg' },
        { name: 'Fintech & Banking', title: 'Fintech & Digital Banking', tag: 'FINANCIAL SERVICES', desc: 'High-frequency transaction engines, automated fraud detection models, and banking integration APIs.', img: '/images/fintech.jpg' },
        { name: 'Smart Manufacturing', title: 'Smart Manufacturing & Industry 4.0', tag: 'MANUFACTURING', desc: 'Predictive maintenance sensors, automated assembly line vision, and real-time factory analytics.', img: '/images/manufacturing.jpg' },
        { name: 'Automotive & Mobility', title: 'Automotive & Smart Mobility', tag: 'AUTOMOTIVE', desc: 'Connected vehicle telemetry, EV battery management software, and fleet tracking systems.', img: '/images/automotive.jpg' }
      ] : sec.sectionKey === 'blog_grid' ? ((sec.items && sec.items.length >= 3) ? sec.items : [
        {
          slug: 'the-ultimate-guide-to-ai-tools-2026',
          title: 'The Ultimate Guide to AI Tools That Actually Work in 2026 (No Cap)',
          name: 'The Ultimate Guide to AI Tools That Actually Work in 2026 (No Cap)',
          category: 'AI & Machine Learning',
          excerpt: 'AI in 2026 is like your hype squad for life and work. Choose wisely, let it handle the heavy lifting, and focus on the stuff that really matters. Hey fam! Devika here, and if you’ve been scrolling through endless AI hype thinking...',
          desc: 'AI in 2026 is like your hype squad for life and work. Choose wisely, let it handle the heavy lifting, and focus on the stuff that really matters. Hey fam! Devika here, and if you’ve been scrolling through endless AI hype thinking...',
          author: 'Devika',
          authorName: 'Devika',
          date: 'Apr 03, 2026',
          publishedAt: 'Apr 03, 2026',
          readTime: '6 min read',
          img: '/images/service-ai.jpg',
          mediaUrl: '/images/service-ai.jpg',
          authorAvatar: '',
        },
        {
          slug: 'crafting-responsive-web-designs',
          title: 'Crafting Responsive Web Designs for Seamless Development',
          name: 'Crafting Responsive Web Designs for Seamless Development',
          category: 'Web Development',
          excerpt: "It's not surprising that mobile Internet use has been on the rise in the past few years. Despite the evidence, most businesses' websites need to be mobile-friendly. It not only causes frust...",
          desc: "It's not surprising that mobile Internet use has been on the rise in the past few years. Despite the evidence, most businesses' websites need to be mobile-friendly. It not only causes frust...",
          author: 'Sena',
          authorName: 'Sena',
          date: 'Apr 24, 2024',
          publishedAt: 'Apr 24, 2024',
          readTime: '5 min read',
          img: '/images/service-fullstack.jpg',
          mediaUrl: '/images/service-fullstack.jpg',
          authorAvatar: '',
        },
        {
          slug: 'strategic-keyword-selection-seo',
          title: 'Strategic Keyword Selection for Effective SEO',
          name: 'Strategic Keyword Selection for Effective SEO',
          category: 'Digital Marketing',
          excerpt: 'What customer is in need becomes the resource of a business, so finding the right search query in a search engine for it will provide a chance of converting the traffic into leads. Optimizing conte ...',
          desc: 'What customer is in need becomes the resource of a business, so finding the right search query in a search engine for it will provide a chance of converting the traffic into leads. Optimizing conte ...',
          author: 'Sena',
          authorName: 'Sena',
          date: 'Feb 17, 2024',
          publishedAt: 'Feb 17, 2024',
          readTime: '4 min read',
          img: '/images/service-cybersecurity.jpg',
          mediaUrl: '/images/service-cybersecurity.jpg',
          authorAvatar: '',
        },
      ]) : []),
      badgeTitle: sec.badgeTitle || (sec.sectionKey === 'about_story' ? 'Established 2026' : ''),
      badgeSubtitle: sec.badgeSubtitle || (sec.sectionKey === 'about_story' ? 'Delivering Intelligent Solutions' : ''),
      stats: sec.stats?.length ? sec.stats : (sec.sectionKey === 'about_hero' ? [{ n: '15+', l: 'Projects Delivered' }, { n: '10+', l: 'Enterprise Clients' }, { n: '500+', l: 'Students Trained' }, { n: '99.9%', l: 'System Uptime' }] : sec.sectionKey === 'about_preview' ? [{ label: 'Global Projects', value: '15+' }, { label: 'Enterprise Clients', value: '10+' }] : []),
      slides: sec.slides?.length ? sec.slides : (sec.sectionKey === 'about_hero' ? [
        {
          kicker: sec.kicker || 'About Porulon Technologies',
          title: sec.title || 'Where Deep Tech Meets A Human-Centric Mindset',
          subtitle: sec.subtitle || 'We design, engineer, and deploy high-concurrency AI engines, cloud microservices, and smart hardware telemetry for global enterprise leaders.',
          mediaUrl: sec.mediaUrl || '',
          buttons: sec.buttons?.length ? sec.buttons : [{ label: 'Explore Our Story', link: '#our-story' }, { label: 'Contact Leadership', link: '/contact' }]
        },
        {
          kicker: 'AI Engineering & Innovation',
          title: 'Empowering Businesses With Autonomous Intelligence',
          subtitle: 'From bespoke neural network training to zero-trust cloud infrastructure, our principal architects build mission-critical digital systems.',
          mediaUrl: '',
          buttons: [{ label: 'View Capabilities', link: '/services' }, { label: 'Talk to an Expert', link: '/contact' }]
        },
        {
          kicker: 'Academy & Talent Mentorship',
          title: 'Cultivating The Next Generation Of Deep Tech Leaders',
          subtitle: 'Our mentor-led technical bootcamps bridge the gap between academic theory and enterprise engineering excellence.',
          mediaUrl: '',
          buttons: [{ label: 'Explore Academy', link: '/training' }, { label: 'Enroll In Cohort', link: '/contact' }]
        }
      ] : []),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setInlineNotice({ type: '', message: '' });

    // 1st Rule Validation: Section 1 (Hero Video) MUST HAVE A VIDEO & CANNOT BE EMPTY OR AN IMAGE
    if (formData.sectionKey === 'hero') {
      const url = (formData.mediaUrl || '').trim();
      if (!url) {
        setInlineNotice({
          type: 'error',
          message: '⚠️ Validation Failed: Background Video is required for Section 1 (Hero). Please upload a video or paste a video URL.',
        });
        return;
      }
      const lower = url.toLowerCase();
      if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.gif')) {
        setInlineNotice({
          type: 'error',
          message: '⚠️ Validation Failed: Section 1 (Hero) accepts ONLY video files (.mp4, .webm). Images are not allowed here!',
        });
        return;
      }
    }

    // 3rd Rule Validation: Section 3 (About Preview) MUST BE AN IMAGE & CANNOT BE A VIDEO
    if (formData.sectionKey === 'about_preview') {
      const url = (formData.mediaUrl || '').trim().toLowerCase();
      if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mkv') || url.endsWith('.avi') || url.endsWith('.mov')) {
        setInlineNotice({
          type: 'error',
          message: '⚠️ Validation Failed: Section 3 (About) accepts ONLY image files (.jpg, .png, .webp). Videos are not allowed here!',
        });
        return;
      }
    }

    // 4th & 5th Rule Validation: Section 4 & 5 Cards MUST BE IMAGES ONLY & CANNOT BE VIDEOS
    if (formData.sectionKey === 'featured_services' || formData.sectionKey === 'industries_carousel') {
      const hasVideo = formData.items?.some(item => {
        const url = (item.img || item.mediaUrl || '').trim().toLowerCase();
        return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mkv') || url.endsWith('.avi') || url.endsWith('.mov');
      });
      if (hasVideo) {
        const secName = formData.sectionKey === 'featured_services' ? 'Section 4 (Featured Services)' : 'Section 5 (Industries Showcase Carousel)';
        setInlineNotice({
          type: 'error',
          message: `⚠️ Validation Failed: ${secName} card images accept ONLY image files (.jpg, .png, .webp). Videos are not allowed here!`,
        });
        return;
      }
    }

    // 250 Character Limit Validation for Headline Title, Top Kicker, and Badge Chips
    if (formData.title && formData.title.length > 250) {
      setInlineNotice({
        type: 'error',
        message: '⚠️ Validation Failed: Section Headline Title cannot exceed 250 characters!',
      });
      return;
    }
    if (formData.kicker && formData.kicker.length > 250) {
      setInlineNotice({
        type: 'error',
        message: '⚠️ Validation Failed: Top Kicker cannot exceed 250 characters!',
      });
      return;
    }
    if (formData.badge && formData.badge.length > 250) {
      setInlineNotice({
        type: 'error',
        message: '⚠️ Validation Failed: Badge Chip cannot exceed 250 characters!',
      });
      return;
    }
    if (formData.badgeTitle && formData.badgeTitle.length > 250) {
      setInlineNotice({
        type: 'error',
        message: '⚠️ Validation Failed: Badge Chip Title cannot exceed 250 characters!',
      });
      return;
    }

    try {
      // Clean blank/empty array items before sending to backend
      const cleanedSlides = formData.slides?.filter(s => s.title?.trim() || s.subtitle?.trim() || s.kicker?.trim() || s.mediaUrl?.trim()) || [];
      
      const cleanedData = {
        ...formData,
        slides: cleanedSlides,
        kicker: (formData.sectionKey === 'about_hero' && cleanedSlides.length > 0) ? (cleanedSlides[0].kicker || formData.kicker) : formData.kicker,
        title: (formData.sectionKey === 'about_hero' && cleanedSlides.length > 0) ? (cleanedSlides[0].title || formData.title) : formData.title,
        subtitle: (formData.sectionKey === 'about_hero' && cleanedSlides.length > 0) ? (cleanedSlides[0].subtitle || formData.subtitle) : formData.subtitle,
        mediaUrl: (formData.sectionKey === 'about_hero' && cleanedSlides.length > 0) ? (cleanedSlides[0].mediaUrl || formData.mediaUrl) : formData.mediaUrl,
        buttons: (formData.sectionKey === 'about_hero' && cleanedSlides.length > 0 && cleanedSlides[0].buttons?.length) ? cleanedSlides[0].buttons : (formData.buttons?.filter(b => b.label?.trim() || b.link?.trim()) || []),
        stats: formData.stats?.filter(s => s.label?.trim() || s.value?.trim() || s.n?.trim() || s.l?.trim()) || [],
        items: formData.items?.filter(i => i.title?.trim() || i.name?.trim() || i.client?.trim() || i.desc?.trim() || i.icon?.trim() || i.img?.trim() || i.industry?.trim()) || [],
        points: formData.points?.filter(p => typeof p === 'string' && p.trim()) || [],
      };

      const id = editing?._id || editing?.id;
      if (id) {
        await updateSection(id, cleanedData);
      } else {
        await createSection(cleanedData);
      }
      setEditing(null);
      loadSections(activeTab);
      setInlineNotice({
        type: 'success',
        message: '✓ Section saved successfully! Live site updated.',
      });
      setTimeout(() => {
        setInlineNotice({ type: '', message: '' });
      }, 3000);
    } catch (err) {
      setInlineNotice({
        type: 'error',
        message: 'Failed to save section changes: ' + (err.response?.data?.message || err.message),
      });
    }
  };

  const handleDelete = async (secOrId) => {
    try {
      const id = typeof secOrId === 'object' ? (secOrId._id || secOrId.id) : secOrId;
      await deleteSection(id);
      loadSections(activeTab);
      setInlineNotice({
        type: 'success',
        message: '✓ Section deleted! It has been removed from the live website output and moved to the Trash Bin.',
      });
      setTimeout(() => {
        setInlineNotice({ type: '', message: '' });
      }, 4000);
    } catch (err) {
      setInlineNotice({
        type: 'error',
        message: 'Failed to delete section: ' + (err.response?.data?.message || err.message),
      });
    }
  };

  const toggleActive = async (sec) => {
    const id = sec._id || sec.id;
    await updateSection(id, { ...sec, isActive: !sec.isActive });
    loadSections(activeTab);
  };

  // Helper State & Array Modifiers
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (key, defaultObj) => {
    setFormData(prev => ({ ...prev, [key]: [...(prev[key] || []), defaultObj] }));
  };

  const removeArrayItem = (key, index) => {
    setFormData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  const updateArrayField = (key, index, field, value) => {
    setFormData(prev => {
      const copy = [...(prev[key] || [])];
      if (typeof copy[index] === 'object') {
        copy[index] = { ...copy[index], [field]: value };
      } else {
        copy[index] = value;
      }
      return { ...prev, [key]: copy };
    });
  };

  return (
    <div className={`flex-1 min-h-screen pb-16 transition-colors ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header title="Dynamic Page Sections Manager" subtitle="Manage layout content, hero media, and section blocks across all site pages" />

      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Banner Action Bar */}
        <div className={`p-6 rounded-3xl border shadow-xl transition-all ${
          isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-extrabold text-xs mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Page Layout Builder</span>
              </div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Website Page Content & Layout Builder
              </h1>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Select a page tab below to manage hero banners, grid cards, CTA banners, and custom sections.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === 'projects' && (
                <button
                  onClick={async () => {
                    try {
                      await restoreDefaultSections('projects');
                      await loadSections('projects');
                      alert('✓ All Products Page reference sections successfully loaded into database!');
                    } catch (err) {
                      alert('Failed to load default sections: ' + (err.response?.data?.message || err.message));
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-purple-600/15 hover:bg-purple-600/30 text-purple-300 font-extrabold text-xs rounded-xl border border-purple-500/30 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Products Defaults</span>
                </button>
              )}

              <button
                onClick={() => {
                  setEditing({ _id: null });
                  setFormData({
                    page: activeTab,
                    sectionKey: `custom_${Date.now()}`,
                    kicker: 'Section Kicker',
                    title: 'New Section Title',
                    subtitle: 'Section Subtitle Description',
                    content: '',
                    mediaUrl: '',
                    secondaryMediaUrl: '',
                    layoutStyle: 'grid',
                    order: currentTabSections.length + 1,
                    isActive: true,
                    points: [],
                    buttons: [],
                    items: [],
                    stats: [],
                  });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Section</span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Category Navigation Tabs */}
        <div className={`flex items-center gap-2 p-2 rounded-2xl border overflow-x-auto ${
          isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          {pageTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-[#1a2233]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDark ? 'bg-[#1a2233] text-purple-400' : 'bg-slate-100 text-purple-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trash Bin View */}
        {activeTab === 'trash' ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isDark ? 'bg-[#1a2233]/60 border-[#1f293d] text-slate-300' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Trash2 className="w-4 h-4 text-amber-500" />
                <span>Trash Bin Archive — Sections deleted days, weeks, or months ago are safely stored here. Click "Restore Section" anytime to bring them back live.</span>
              </div>
            </div>

            {archivedSections.length === 0 ? (
              <div className={`p-12 text-center rounded-2xl border ${
                isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <Trash2 className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
                <h3 className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Trash Bin is Empty
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  No deleted sections found. Any section you delete in the future will appear here for easy recovery.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {archivedSections.map((sec) => (
                  <div
                    key={sec._id}
                    className={`rounded-2xl border p-5 transition-all ${
                      isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">
                            {sec.page} page
                          </span>
                          <h3 className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            {sec.title || sec.sectionKey}
                          </h3>
                        </div>
                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Archived on: {new Date(sec.archivedAt || sec.updatedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={async () => {
                            try {
                              await restoreArchivedSection(sec._id);
                              loadSections();
                              alert('Section successfully restored to live site!');
                            } catch (err) {
                              alert('Failed to restore section: ' + (err.response?.data?.message || err.message));
                            }
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restore Section to Live Site</span>
                        </button>

                        <button
                          onClick={async () => {
                            if (window.confirm('Permanently delete this section from database? This cannot be undone.')) {
                              try {
                                await permanentDeleteSection(sec._id);
                                loadSections();
                              } catch (err) {
                                alert('Failed to permanently delete: ' + (err.response?.data?.message || err.message));
                              }
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition"
                          title="Permanently Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Loading section data...</p>
          </div>
        ) : currentTabSections.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border ${
            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
            <h3 className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              No sections created for {pageTabs.find(t => t.id === activeTab)?.label}
            </h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Click "Add Custom Section" to configure dynamic content.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {currentTabSections.map((sec, idx) => {
              const secId = sec._id || sec.id;
              const guide = SECTION_GUIDES[sec.sectionKey] || {
                label: sec.title || sec.sectionKey,
                tag: 'Custom Section'
              };
              const GuideIcon = guide.icon || Layers;
              const isActive = sec.isActive ?? true;

              return (
                <div
                  key={secId || idx}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-300 hover:shadow-xl ${
                    isDark 
                      ? 'bg-[#1a2233] border-[#222d42] text-slate-100 hover:border-purple-500/40' 
                      : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-purple-500/40'
                  }`}
                >
                  {/* Card Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-500/10">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <GuideIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 uppercase tracking-widest">
                            #{getSectionOrder(sec)} {guide.tag || 'Block'}
                          </span>
                          <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                            key: {sec.sectionKey}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-950 dark:text-white mt-0.5 truncate">
                          {guide.label}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {/* Active Status Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleActive(sec)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 hover:bg-slate-500/20'
                        }`}
                        title={isActive ? 'Click to hide section on live site' : 'Click to activate section on live site'}
                      >
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 dark:bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
                        <span>{isActive ? 'Live Active' : 'Hidden (Draft)'}</span>
                      </button>

                      <button
                        onClick={() => handleEdit(sec)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-md shadow-purple-600/30 transition hover:scale-105 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Section</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete "${guide.label}" section? It will be removed from the live website output and moved to the Trash Bin.`)) {
                            handleDelete(secId);
                          }
                        }}
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white transition cursor-pointer"
                        title="Delete section from live website output"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Structural Section Snippet & Features Preview */}
                  <div className="space-y-2.5 pt-1">
                    {/* Kicker Chip Badge */}
                    {sec.kicker && (
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold text-purple-700 dark:text-purple-300 bg-purple-500/10 border border-purple-500/20 uppercase tracking-wider">
                          <span>{sec.kicker}</span>
                        </span>
                      </div>
                    )}

                    {/* Headline & Description */}
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white leading-snug">
                        {sec.title || guide.label}
                      </h4>
                      {(sec.subtitle || guide.desc) && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
                          {sec.subtitle || guide.desc}
                        </p>
                      )}
                    </div>

                    {/* Structure Tags & Metrics Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 font-bold text-slate-500 dark:text-slate-400">
                      {sec.mediaUrl && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1">
                          🖼️ Media Attached
                        </span>
                      )}
                      {Array.isArray(sec.items) && sec.items.length > 0 && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5" /> {sec.items.length} Sub-Items / Cards
                        </span>
                      )}
                      {Array.isArray(sec.buttons) && sec.buttons.length > 0 && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <ArrowUpRight className="w-3.5 h-3.5" /> {sec.buttons.length} Action Buttons
                        </span>
                      )}
                      {Array.isArray(sec.stats) && sec.stats.length > 0 && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          📊 {sec.stats.length} Stats Counters
                        </span>
                      )}
                      {Array.isArray(sec.slides) && sec.slides.length > 0 && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] bg-pink-500/10 text-pink-700 dark:text-pink-400 border border-pink-500/20 flex items-center gap-1">
                          🎞️ {sec.slides.length} Hero Slides
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tailored Section Editor Modal */}
        {editing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 md:p-8 shadow-2xl transition-colors ${
              isDark ? 'bg-[#121824] border-[#1f293d] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex justify-between items-center pb-4 border-b border-slate-500/10 mb-6">
                <div>
                  <h2 className="text-lg font-bold">
                    Edit {SECTION_GUIDES[formData.sectionKey]?.label || formData.sectionKey || 'Section'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRestoreSectionDefaults}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 flex items-center gap-1.5 transition"
                    title="Restore factory default content for this section"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-500/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-5">

                {/* Sleek Inline Notice Banner (No Popup Alert) */}
                {inlineNotice.message && (
                  <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    inlineNotice.type === 'error'
                      ? isDark ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
                      : isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}>
                    <div className="flex items-center gap-2.5 text-xs font-semibold">
                      <span>{inlineNotice.message}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInlineNotice({ type: '', message: '' })}
                      className="p-1 rounded-lg hover:bg-black/10 text-slate-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 1. HERO SECTION: SHOW ONLY BACKGROUND VIDEO URL */}
                {/* ============================================================ */}
                {/* 1. HERO SECTION: FULL EDIT & REMOVE CONTROLS */}
                {/* ============================================================ */}
                {formData.sectionKey === 'hero' && (
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker Tagline (Badge Chip)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker || ''}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Pioneering Deep-Tech Excellence (Leave blank to remove)"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Main Hero Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Building Enterprise AI Systems, Cloud Applications..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Subtitle / Description Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="From custom machine learning models to high-throughput cloud infrastructure..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Hero Background Video / Image Uploader */}
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-purple-50/50 border-purple-200'
                    }`}>
                      <label className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                        <Video className="w-4 h-4" />
                        <span>Hero Background Video / Image (Optional)</span>
                      </label>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Upload a background video (.mp4) or image. If empty, the aurora gradient fallback background will be shown.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No video uploaded — Click Upload Video or enter URL"
                          className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-mono border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-purple-400' : 'bg-white border-slate-300 text-purple-700'
                          }`}
                        />
                        <label className="w-full sm:w-auto px-4 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>{uploading ? 'Uploading...' : 'Upload Video'}</span>
                          <input
                            type="file"
                            accept="video/*,image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                  setFormData(prev => ({ ...prev, mediaUrl: uploadedUrl }));
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                      {mediaError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center justify-between">
                          <span>{mediaError}</span>
                          <button type="button" onClick={() => setMediaError('')} className="p-1 rounded-lg hover:bg-black/10 text-red-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Hero Action Buttons Array Editor */}
                    <div className={`p-4 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-bold">Hero Action Buttons</h3>
                          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Configure call-to-action buttons (e.g., "Get Started", "Explore Services")
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                          className="px-3 py-1.5 bg-[#7c3aed] text-white rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-[#6d28d9] transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Button</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {(formData.buttons && formData.buttons.length > 0 ? formData.buttons : [
                          { label: 'Get Started', link: '/contact' },
                          { label: 'Explore Services', link: '/services' }
                        ]).map((btn, idx) => (
                          <div key={idx} className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center gap-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
                          }`}>
                            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Button Label</label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', idx, 'label', e.target.value)}
                                  placeholder="Get Started"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Button Link Target</label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', idx, 'link', e.target.value)}
                                  placeholder="/contact or /services"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('buttons', idx)}
                              className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition shrink-0 cursor-pointer"
                              title="Delete Button"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* PRODUCTS HERO BANNER SECTION FORM EDITOR */}
                {/* ============================================================ */}
                {formData.sectionKey === 'projects_hero' && (
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker Tagline (Badge Chip)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker || ''}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Enterprise Products & Client Engineering"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Main Hero Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Engineering Flagship Digital Products & Client Solutions"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Subtitle / Description Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Explore Porulon’s proprietary AI engines, IoT platforms..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Hero Background Photo / Video Uploader */}
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-purple-50/50 border-purple-200'
                    }`}>
                      <label className="block text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                        <Video className="w-4 h-4" />
                        <span>Hero Background Image or Video (Optional)</span>
                      </label>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Upload a background video (.mp4) or image (.jpg, .png). If empty, no background media box will be shown and the design remains clean!
                      </p>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No media uploaded — Click Upload or enter URL"
                          className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-mono border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="w-full sm:w-auto px-4 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                  setFormData(prev => ({ ...prev, mediaUrl: uploadedUrl }));
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Live Impact Counters Array Editor */}
                    <div className={`p-4 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-bold">Hero Live Metric Counters</h3>
                          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Configure live animated impact counters (e.g., 120+, 99.9%, 15+, $45M+)
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addArrayItem('stats', { value: '100+', label: 'New Metric' })}
                          className="px-3 py-1.5 bg-[#7c3aed] text-white rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-[#6d28d9] transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Counter</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(formData.stats && formData.stats.length > 0 ? formData.stats : [
                          { label: 'Products & Projects', value: '120+' },
                          { label: 'System Uptime SLA', value: '99.9%' },
                          { label: 'Industry Verticals', value: '15+' },
                          { label: 'Client Value Created', value: '$45M+' },
                        ]).map((st, idx) => (
                          <div key={idx} className={`p-3 rounded-xl border space-y-2 relative ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-purple-400">Counter #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('stats', idx)}
                                className="p-1 text-slate-400 hover:text-red-500 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Value (Count Target)</label>
                              <input
                                type="text"
                                value={st.value || ''}
                                onChange={(e) => updateArrayField('stats', idx, 'value', e.target.value)}
                                placeholder="120+"
                                className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Metric Label</label>
                              <input
                                type="text"
                                value={st.label || ''}
                                onChange={(e) => updateArrayField('stats', idx, 'label', e.target.value)}
                                placeholder="Products & Projects"
                                className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* PRODUCTS SECTION 3: FLAGSHIP PRODUCTS SHOWCASE GRID FORM EDITOR */}
                {/* ============================================================ */}
                {formData.sectionKey === 'projects_grid' && (
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Section Kicker Badge
                      </label>
                      <input
                        type="text"
                        value={formData.kicker || ''}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Proprietary Enterprise Software"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Our Flagship Software Products"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Explore ready-to-deploy enterprise platforms built for high performance..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Products Cards Array Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-purple-400">Software Product Cards ({(formData.items || []).length})</h3>
                          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Add, edit or remove SaaS product cards shown on the website grid
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', {
                            title: 'New Enterprise Product',
                            category: 'AI & Automation',
                            categoryLabel: 'AI & Automation',
                            badge: 'Flagship SaaS',
                            metrics: '99% Efficiency',
                            tagline: 'Short high-impact tagline',
                            desc: 'Full product description text...',
                            img: ''
                          })}
                          className="px-3 py-1.5 bg-[#7c3aed] text-white rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-[#6d28d9] transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Product</span>
                        </button>
                      </div>

                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                        {(formData.items && formData.items.length > 0 ? formData.items : []).map((item, idx) => (
                          <div key={idx} className={`p-4 rounded-2xl border space-y-3 relative ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex items-center justify-between pb-2 border-b border-slate-500/10">
                              <span className="text-xs font-bold text-purple-400">Product #{idx + 1}: {item.title || 'Untitled Product'}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', idx)}
                                className="p-1 text-slate-400 hover:text-red-500 transition"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Product Title</label>
                                <input
                                  type="text"
                                  value={item.title || item.name || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'title', e.target.value);
                                    updateArrayField('items', idx, 'name', e.target.value);
                                  }}
                                  placeholder="Porulon AI Document Engine"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Category (e.g. AI & Automation, IoT, Cloud, Cyber)</label>
                                <input
                                  type="text"
                                  value={item.category || item.categoryLabel || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'category', e.target.value);
                                    updateArrayField('items', idx, 'categoryLabel', e.target.value);
                                  }}
                                  placeholder="AI & Automation"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Short Tagline</label>
                              <input
                                type="text"
                                value={item.tagline || item.shortDesc || ''}
                                onChange={(e) => updateArrayField('items', idx, 'tagline', e.target.value)}
                                placeholder="Intelligent document parsing, OCR & predictive classification"
                                className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Full Description</label>
                              <textarea
                                rows={2}
                                value={item.desc || item.fullDesc || ''}
                                onChange={(e) => updateArrayField('items', idx, 'desc', e.target.value)}
                                placeholder="An enterprise-grade document processing suite..."
                                className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                              />
                            </div>

                            {/* Feature Bullet Points Array (+ Add Feature Point, Delete) */}
                            <div className={`p-3 rounded-xl border space-y-2 ${
                              isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                            }`}>
                              <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                  <span>✅ Feature Bullet Points ({(Array.isArray(item.features) ? item.features : (Array.isArray(item.points) ? item.points : [])).length})</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentFeats = Array.isArray(item.features) ? item.features : (Array.isArray(item.points) ? item.points : []);
                                    updateArrayField('items', idx, 'features', [...currentFeats, 'New Feature Point']);
                                  }}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                                >
                                  <Plus className="w-3 h-3" /> Add Feature
                                </button>
                              </div>
                              <div className="space-y-1.5">
                                {(Array.isArray(item.features) ? item.features : (Array.isArray(item.points) ? item.points : [])).map((feat, fIdx) => (
                                  <div key={fIdx} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={feat || ''}
                                      onChange={(e) => {
                                        const currentFeats = [...(Array.isArray(item.features) ? item.features : (Array.isArray(item.points) ? item.points : []))];
                                        currentFeats[fIdx] = e.target.value;
                                        updateArrayField('items', idx, 'features', currentFeats);
                                      }}
                                      placeholder="Instant Multilingual OCR Parsing"
                                      className={`w-full rounded-lg px-2.5 py-1 text-xs border ${
                                        isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                      }`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentFeats = (Array.isArray(item.features) ? item.features : (Array.isArray(item.points) ? item.points : [])).filter((_, i) => i !== fIdx);
                                        updateArrayField('items', idx, 'features', currentFeats);
                                      }}
                                      className="p-1 text-slate-400 hover:text-red-500 transition shrink-0"
                                      title="Delete Feature Point"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tech Stack Pills Array (+ Add Tech Pill, Delete) */}
                            <div className={`p-3 rounded-xl border space-y-2 ${
                              isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                            }`}>
                              <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
                                  <span>⚡ Tech Stack Pills ({(Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : [])).length})</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentTech = Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : []);
                                    updateArrayField('items', idx, 'tech', [...currentTech, 'React']);
                                  }}
                                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                                >
                                  <Plus className="w-3 h-3" /> Add Tech Pill
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {(Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : [])).map((tVal, tIdx) => (
                                  <div key={tIdx} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-white border-slate-200'
                                  }`}>
                                    <input
                                      type="text"
                                      value={tVal || ''}
                                      onChange={(e) => {
                                        const currentTech = [...(Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : []))];
                                        currentTech[tIdx] = e.target.value;
                                        updateArrayField('items', idx, 'tech', currentTech);
                                      }}
                                      placeholder="React"
                                      className={`w-20 bg-transparent text-xs font-semibold border-none focus:outline-none ${
                                        isDark ? 'text-purple-300' : 'text-purple-700'
                                      }`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentTech = (Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : [])).filter((_, i) => i !== tIdx);
                                        updateArrayField('items', idx, 'tech', currentTech);
                                      }}
                                      className="text-slate-400 hover:text-red-400 transition"
                                      title="Delete Tech Pill"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Product Photo Uploader (Optional - No fallback image will be shown if empty) */}
                            <div className={`p-3 rounded-xl border space-y-2 ${
                              isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-purple-50/40 border-purple-200'
                            }`}>
                              <label className="block text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span>Product Cover Photo (Optional — Empty if none uploaded)</span>
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={getCleanMediaValue(item.img || item.mediaUrl)}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'img', e.target.value);
                                    updateArrayField('items', idx, 'mediaUrl', e.target.value);
                                  }}
                                  placeholder="No image uploaded — Click Upload or enter URL"
                                  className={`w-full flex-1 rounded-lg px-3 py-1.5 text-xs font-mono border ${
                                    isDark ? 'bg-[#121824] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                                <label className="px-3 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition">
                                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                                  <span>Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files?.[0]) {
                                        handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                          updateArrayField('items', idx, 'img', uploadedUrl);
                                          updateArrayField('items', idx, 'mediaUrl', uploadedUrl);
                                        }, 'image');
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* SECTION 4: DELIVERED CLIENT PROJECTS SHOWCASE (projects_client_stories) */}
                {/* ============================================================ */}
                {formData.sectionKey === 'projects_client_stories' && (
                  <div className="space-y-6">
                    {/* Header Controls */}
                    <div className={`p-4 rounded-xl border space-y-4 ${
                      isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Section Header Settings
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Section Kicker</label>
                          <input
                            type="text"
                            value={formData.kicker || ''}
                            onChange={(e) => handleChange('kicker', e.target.value)}
                            placeholder="Proven Client Track Record"
                            className={`w-full rounded-lg px-3 py-2 text-xs border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Section Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Featured Client Projects & Engineering"
                            className={`w-full rounded-lg px-3 py-2 text-xs font-bold border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Subtitle Description</label>
                        <textarea
                          rows={2}
                          value={formData.subtitle || ''}
                          onChange={(e) => handleChange('subtitle', e.target.value)}
                          placeholder="Real-world custom software platforms engineered and delivered for enterprise client partners."
                          className={`w-full rounded-lg px-3 py-2 text-xs border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Client Projects List Editor */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <span>Delivered Client Projects ({(formData.items || []).length})</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [
                              ...(formData.items || []),
                              {
                                id: `proj-${Date.now()}`,
                                client: 'Enterprise Client',
                                title: 'Custom Digital Platform',
                                industry: 'FinTech / SaaS',
                                desc: 'Delivered end-to-end cloud platform with 99.9% uptime.',
                                impact: ['High Scalability', 'Zero Downtime'],
                              },
                            ];
                            handleChange('items', newItems);
                          }}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Client Project
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(formData.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border space-y-4 relative ${
                              isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between border-b pb-2 border-slate-700/50">
                              <span className="text-xs font-bold text-amber-400">
                                Project #{idx + 1}: {item.client || item.title || 'Client Project'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', idx)}
                                className="p-1 text-slate-400 hover:text-red-500 transition"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Partner Name</label>
                                <input
                                  type="text"
                                  value={item.client || item.badge || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'client', e.target.value);
                                    updateArrayField('items', idx, 'badge', e.target.value);
                                  }}
                                  placeholder="GlobalLogistics Corp (Asia-Pacific)"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Industry Badge Category</label>
                                <input
                                  type="text"
                                  value={item.industry || item.category || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'industry', e.target.value);
                                    updateArrayField('items', idx, 'category', e.target.value);
                                  }}
                                  placeholder="Logistics & Supply Chain"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Project Title</label>
                              <input
                                type="text"
                                value={item.title || item.name || ''}
                                onChange={(e) => {
                                  updateArrayField('items', idx, 'title', e.target.value);
                                  updateArrayField('items', idx, 'name', e.target.value);
                                }}
                                placeholder="AI Fleet Route Optimization & Automated Dispatch Platform"
                                className={`w-full rounded-lg px-3 py-1.5 text-xs font-bold border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                }`}
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Full Description</label>
                              <textarea
                                rows={2}
                                value={item.desc || item.fullDesc || ''}
                                onChange={(e) => updateArrayField('items', idx, 'desc', e.target.value)}
                                placeholder="Architected and deployed a real-time AI dispatch system..."
                                className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                }`}
                              />
                            </div>

                            {/* Impact Badges Array (+ Add Impact Badge, Delete) */}
                            <div className={`p-3 rounded-xl border space-y-2 ${
                              isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
                            }`}>
                              <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                  <span>🚀 Verified Impact Badges ({(Array.isArray(item.impact) ? item.impact : (Array.isArray(item.points) ? item.points : [])).length})</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentImpact = Array.isArray(item.impact) ? item.impact : (Array.isArray(item.points) ? item.points : []);
                                    updateArrayField('items', idx, 'impact', [...currentImpact, '20% Efficiency Gain']);
                                  }}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                                >
                                  <Plus className="w-3 h-3" /> Add Impact Badge
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {(Array.isArray(item.impact) ? item.impact : (Array.isArray(item.points) ? item.points : [])).map((impVal, iIdx) => (
                                  <div key={iIdx} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                                  }`}>
                                    <input
                                      type="text"
                                      value={impVal || ''}
                                      onChange={(e) => {
                                        const currentImpact = [...(Array.isArray(item.impact) ? item.impact : (Array.isArray(item.points) ? item.points : []))];
                                        currentImpact[iIdx] = e.target.value;
                                        updateArrayField('items', idx, 'impact', currentImpact);
                                      }}
                                      placeholder="22% Fuel Savings"
                                      className={`w-36 bg-transparent text-xs font-semibold border-none focus:outline-none ${
                                        isDark ? 'text-emerald-300' : 'text-emerald-700'
                                      }`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentImpact = (Array.isArray(item.impact) ? item.impact : (Array.isArray(item.points) ? item.points : [])).filter((_, i) => i !== iIdx);
                                        updateArrayField('items', idx, 'impact', currentImpact);
                                      }}
                                      className="text-slate-400 hover:text-red-400 transition"
                                      title="Delete Impact Badge"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* SECTION 5: PRODUCTION TECH STACK ARCHITECTURE (projects_tech_stack) */}
                {/* ============================================================ */}
                {formData.sectionKey === 'projects_tech_stack' && (
                  <div className="space-y-6">
                    {/* Header Controls */}
                    <div className={`p-4 rounded-xl border space-y-4 ${
                      isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Section Header Settings
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Section Kicker</label>
                          <input
                            type="text"
                            value={formData.kicker || ''}
                            onChange={(e) => handleChange('kicker', e.target.value)}
                            placeholder="Engineering Backbone"
                            className={`w-full rounded-lg px-3 py-2 text-xs border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Section Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Production Tech Stack Architecture"
                            className={`w-full rounded-lg px-3 py-2 text-xs font-bold border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Subtitle Description</label>
                        <textarea
                          rows={2}
                          value={formData.subtitle || ''}
                          onChange={(e) => handleChange('subtitle', e.target.value)}
                          placeholder="We build with battle-tested frameworks, modern cloud microservices, and AI pipelines."
                          className={`w-full rounded-lg px-3 py-2 text-xs border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Tech Stack Cards List Editor */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <span>Tech Stack Categories ({(formData.items || []).length})</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [
                              ...(formData.items || []),
                              {
                                id: `tech-cat-${Date.now()}`,
                                title: 'New Tech Category',
                                icon: '⚡',
                                desc: 'Short description of this technology stack.',
                                tech: ['React', 'Node.js', 'Python'],
                              },
                            ];
                            handleChange('items', newItems);
                          }}
                          className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Tech Category Card
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(formData.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border space-y-4 relative ${
                              isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between border-b pb-2 border-slate-700/50">
                              <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                                <span>{item.icon || '⚡'}</span>
                                <span>Category #{idx + 1}: {item.title || item.name || 'Tech Category'}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', idx)}
                                className="p-1 text-slate-400 hover:text-red-500 transition"
                                title="Delete Category Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="sm:col-span-2">
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Category Title</label>
                                <input
                                  type="text"
                                  value={item.title || item.name || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'title', e.target.value);
                                    updateArrayField('items', idx, 'name', e.target.value);
                                  }}
                                  placeholder="AI & Machine Learning Frameworks"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-bold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">React Icon Key</label>
                                <select
                                  value={item.icon || 'ai'}
                                  onChange={(e) => updateArrayField('items', idx, 'icon', e.target.value)}
                                  className={`w-full rounded-lg px-2 py-1.5 text-xs font-semibold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                >
                                  <option value="ai">✨ AI & Neural (Sparkles)</option>
                                  <option value="cloud">☁️ Cloud & K8s (Cloud)</option>
                                  <option value="code">⚡ Full-Stack Code (Bracket)</option>
                                  <option value="server">🖥️ Microservices Server</option>
                                  <option value="security">🛡️ Zero-Trust Security</option>
                                  <option value="database">💾 Database & Caching</option>
                                  <option value="mobile">📱 Mobile Apps</option>
                                  <option value="web">🌐 Web & APIs</option>
                                  <option value="terminal">💻 Terminal & DevOps</option>
                                </select>
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Accent Color Style</label>
                                <select
                                  value={item.gradient || 'from-purple-500 to-indigo-600'}
                                  onChange={(e) => updateArrayField('items', idx, 'gradient', e.target.value)}
                                  className={`w-full rounded-lg px-2 py-1.5 text-xs font-semibold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                >
                                  <option value="from-purple-500 to-indigo-600">💜 Purple Neon</option>
                                  <option value="from-cyan-500 to-blue-600">🩵 Cyber Cyan</option>
                                  <option value="from-emerald-500 to-teal-600">💚 Emerald Tech</option>
                                  <option value="from-amber-500 to-orange-600">🧡 Amber Flame</option>
                                  <option value="from-rose-500 to-pink-600">🩷 Rose Pink</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Description</label>
                              <textarea
                                rows={2}
                                value={item.desc || item.fullDesc || ''}
                                onChange={(e) => updateArrayField('items', idx, 'desc', e.target.value)}
                                placeholder="Deep neural networks, LLM orchestration, FastAPI & computer vision."
                                className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                }`}
                              />
                            </div>

                            {/* Tech Stack Pills Array (+ Add Tech Pill, Delete) */}
                            <div className={`p-3 rounded-xl border space-y-2 ${
                              isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
                            }`}>
                              <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
                                  <span>⚡ Tech Stack Pills ({(Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : (Array.isArray(item.points) ? item.points : []))).length})</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentTech = Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : (Array.isArray(item.points) ? item.points : []));
                                    updateArrayField('items', idx, 'tech', [...currentTech, 'React']);
                                  }}
                                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                                >
                                  <Plus className="w-3 h-3" /> Add Tech Pill
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {(Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : (Array.isArray(item.points) ? item.points : []))).map((tVal, tIdx) => (
                                  <div key={tIdx} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                                  }`}>
                                    <input
                                      type="text"
                                      value={tVal || ''}
                                      onChange={(e) => {
                                        const currentTech = [...(Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : (Array.isArray(item.points) ? item.points : [])))];
                                        currentTech[tIdx] = e.target.value;
                                        updateArrayField('items', idx, 'tech', currentTech);
                                      }}
                                      placeholder="PyTorch"
                                      className={`w-28 bg-transparent text-xs font-semibold border-none focus:outline-none ${
                                        isDark ? 'text-purple-300' : 'text-purple-700'
                                      }`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentTech = (Array.isArray(item.tech) ? item.tech : (Array.isArray(item.techStack) ? item.techStack : (Array.isArray(item.points) ? item.points : []))).filter((_, i) => i !== tIdx);
                                        updateArrayField('items', idx, 'tech', currentTech);
                                      }}
                                      className="text-slate-400 hover:text-red-400 transition"
                                      title="Delete Tech Pill"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* SECTION 6: CLIENT TESTIMONIALS (projects_testimonials) */}
                {/* ============================================================ */}
                {formData.sectionKey === 'projects_testimonials' && (
                  <div className="space-y-6">
                    {/* Header Controls */}
                    <div className={`p-4 rounded-xl border space-y-4 ${
                      isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Section Header Settings
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Section Kicker</label>
                          <input
                            type="text"
                            value={formData.kicker || ''}
                            onChange={(e) => handleChange('kicker', e.target.value)}
                            placeholder="Verified Executive Feedback"
                            className={`w-full rounded-lg px-3 py-2 text-xs border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Section Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="What Executive Leaders Say"
                            className={`w-full rounded-lg px-3 py-2 text-xs font-bold border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Cards List Editor */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <span>Executive Testimonials ({(formData.items || []).length})</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [
                              ...(formData.items || []),
                              {
                                id: `testi-${Date.now()}`,
                                name: 'Executive Leader',
                                role: 'Chief Technology Officer',
                                company: 'Global Enterprise',
                                quote: 'Porulon Technologies delivered our cloud platform ahead of schedule with exceptional quality.',
                                rating: 5,
                                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
                              },
                            ];
                            handleChange('items', newItems);
                          }}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Testimonial Card
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(formData.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border space-y-4 relative ${
                              isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between border-b pb-2 border-slate-700/50">
                              <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                                <span>⭐</span>
                                <span>Testimonial #{idx + 1}: {item.name || item.author || 'Executive'} ({item.company || 'Company'})</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', idx)}
                                className="p-1 text-slate-400 hover:text-red-500 transition"
                                title="Delete Testimonial"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Executive Name</label>
                                <input
                                  type="text"
                                  value={item.name || item.author || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'name', e.target.value);
                                    updateArrayField('items', idx, 'author', e.target.value);
                                  }}
                                  placeholder="Dr. Marcus Vance"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-bold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Job Role / Title</label>
                                <input
                                  type="text"
                                  value={item.role || item.title || ''}
                                  onChange={(e) => updateArrayField('items', idx, 'role', e.target.value)}
                                  placeholder="Chief Technology Officer"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Company Name</label>
                                <input
                                  type="text"
                                  value={item.company || ''}
                                  onChange={(e) => updateArrayField('items', idx, 'company', e.target.value)}
                                  placeholder="MedHealth Diagnostics"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="sm:col-span-3">
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Testimonial Quote</label>
                                <textarea
                                  rows={2}
                                  value={item.quote || item.desc || item.content || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'quote', e.target.value);
                                    updateArrayField('items', idx, 'desc', e.target.value);
                                  }}
                                  placeholder="Porulon Technologies delivered our AI diagnostic cloud platform ahead of schedule..."
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Star Rating</label>
                                <select
                                  value={item.rating || 5}
                                  onChange={(e) => updateArrayField('items', idx, 'rating', Number(e.target.value))}
                                  className={`w-full rounded-lg px-2 py-2 text-xs font-bold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                >
                                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                                </select>
                              </div>
                            </div>

                            {/* Avatar Photo URL & Upload Button */}
                            <div>
                              <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Avatar Image / Photo URL</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={getCleanMediaValue(item.avatar || item.img || item.mediaUrl || '')}
                                  onChange={(e) => {
                                    updateArrayField('items', idx, 'avatar', e.target.value);
                                    updateArrayField('items', idx, 'img', e.target.value);
                                  }}
                                  placeholder="https://images.unsplash.com/... or click Upload"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-mono border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                                <label className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition">
                                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                                  <span>Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files?.[0]) {
                                        handleFileUpload(e.target.files[0], (url) => {
                                          updateArrayField('items', idx, 'avatar', url);
                                          updateArrayField('items', idx, 'img', url);
                                        });
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* SECTION 8: HIGH-IMPACT CONSULTATION & DEMO CTA (projects_cta) */}
                {/* ============================================================ */}
                {formData.sectionKey === 'projects_cta' && (
                  <div className="space-y-6">
                    {/* Header Controls */}
                    <div className={`p-4 rounded-xl border space-y-4 ${
                      isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        Call-To-Action Content Settings
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Section Kicker</label>
                          <input
                            type="text"
                            value={formData.kicker || ''}
                            onChange={(e) => handleChange('kicker', e.target.value)}
                            placeholder="Launch Your Solution"
                            className={`w-full rounded-lg px-3 py-2 text-xs border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Headline Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Ready to Deploy Our Products?"
                            className={`w-full rounded-lg px-3 py-2 text-xs font-bold border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Subtitle Description</label>
                        <textarea
                          rows={2}
                          value={formData.subtitle || ''}
                          onChange={(e) => handleChange('subtitle', e.target.value)}
                          placeholder="Schedule a live product demonstration or consult with our solution architects..."
                          className={`w-full rounded-lg px-3 py-2 text-xs border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Action Buttons Editor */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <span>Call To Action Buttons ({(formData.buttons || []).length})</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newBtns = [
                              ...(formData.buttons || []),
                              { label: 'New Action Button', link: '/contact' },
                            ];
                            handleChange('buttons', newBtns);
                          }}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Action Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(formData.buttons || []).map((btn, bIdx) => (
                          <div
                            key={bIdx}
                            className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center gap-3 ${
                              isDark ? 'bg-[#151c2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <span className="text-xs font-bold text-purple-400 shrink-0">
                              Button #{bIdx + 1}
                            </span>

                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Button Label</label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => {
                                    const updated = [...(formData.buttons || [])];
                                    updated[bIdx] = { ...updated[bIdx], label: e.target.value };
                                    handleChange('buttons', updated);
                                  }}
                                  placeholder="Schedule Live Demo"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-bold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Target Link</label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => {
                                    const updated = [...(formData.buttons || [])];
                                    updated[bIdx] = { ...updated[bIdx], link: e.target.value };
                                    handleChange('buttons', updated);
                                  }}
                                  placeholder="/contact"
                                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-mono border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-white' : 'bg-white border-slate-200 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = (formData.buttons || []).filter((_, i) => i !== bIdx);
                                handleChange('buttons', updated);
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-500 transition shrink-0"
                              title="Delete Button"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 2. TECH STACK MARQUEE SECTION: SHOW TITLE & TECH LIST */}
                {/* ============================================================ */}
                {formData.sectionKey === 'tech_stacks_marquee' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Marquee Section Header Text
                      </label>
                      <input
                        type="text"
                        value={formData.kicker || formData.title}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value, title: e.target.value })}
                        placeholder="Tech Stack We Use"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Section Background Video / Image Uploader */}
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-purple-50/50 border-purple-200'
                    }`}>
                      <label className="block text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                        <Video className="w-4 h-4" />
                        <span>Section Background Video / Image (Optional)</span>
                      </label>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Upload a custom background video (.mp4) or image (.jpg, .png) for the Tech Stack section. Leave blank to display the clean default background.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No background media uploaded — Click Upload or enter URL"
                          className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-mono border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="w-full sm:w-auto px-4 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                  setFormData(prev => ({ ...prev, mediaUrl: uploadedUrl }));
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                      {mediaError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center justify-between">
                          <span>{mediaError}</span>
                          <button type="button" onClick={() => setMediaError('')} className="p-1 rounded-lg hover:bg-black/10 text-red-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/80 border-[#1f293d]' : 'bg-slate-50 border-slate-200 shadow-xs'
                    }`}>
                      <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-500/10">
                        <div>
                          <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                            <Sparkles className="w-4 h-4" />
                            <span>Tech Stack Items ({formData.items.length})</span>
                          </h4>
                          <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Manage technologies shown in the scrolling marquee.
                          </p>
                        </div>
                      </div>

                      {formData.items.length === 0 ? (
                        <div className="text-center py-6">
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            No tech items remaining. Click "Restore Defaults" to reset the default list.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5 max-h-80 overflow-y-auto no-scrollbar pr-1">
                          {formData.items.map((item, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                              isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                            }`}>
                              <span className="w-6 h-6 rounded-md bg-[#7c3aed]/10 text-[#7c3aed] text-[10px] font-bold flex items-center justify-center shrink-0">
                                #{i + 1}
                              </span>

                              <div className="flex-1">
                                <input
                                  type="text"
                                  placeholder="Technology Name (e.g. React, PostgreSQL)"
                                  value={item.name || item.title || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', i, 'name', e.target.value);
                                    updateArrayField('items', i, 'title', e.target.value);
                                  }}
                                  className={`w-full rounded-lg px-3 py-2 text-xs font-semibold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div className="w-52 shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                  <RenderReactIcon iconKey={item.icon || 'SiReact'} />
                                </div>
                                <select
                                  value={item.icon || 'SiReact'}
                                  onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                  className={`w-full rounded-lg px-2 py-2 text-xs font-medium border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                >
                                  {Object.keys(REACT_ICONS_MAP).filter(k => k.startsWith('Si')).map(k => (
                                    <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                  ))}
                                </select>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition shrink-0"
                                title="Delete Tech Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 3. ABOUT PREVIEW SECTION: IMAGE ONLY, OVERLAP TEXT & STATS */}
                {/* ============================================================ */}
                {formData.sectionKey === 'about_preview' && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker Badge
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="About Us"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Redefining Tech Consultancy"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Porulon Technologies is a forward-thinking..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Image Only Upload Container */}
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-purple-50/50 border-purple-200'
                    }`}>
                      <label className="block text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                        <ImageIcon className="w-4 h-4" />
                        <span>Team & Mission Photo (Image Only Required)</span>
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No photo uploaded — Click Upload Photo or enter URL"
                          className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-mono border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="w-full sm:w-auto px-4 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                  setFormData(prev => ({ ...prev, mediaUrl: uploadedUrl }));
                                }, 'image');
                              }
                            }}
                          />
                        </label>
                      </div>
                      {mediaError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center justify-between">
                          <span>{mediaError}</span>
                          <button type="button" onClick={() => setMediaError('')} className="p-1 rounded-lg hover:bg-black/10 text-red-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Overlapping Badge Text on Left Image */}
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className="text-xs font-bold text-[#7c3aed]">Image Overlap Card (Left Side Badge)</h4>
                      <div>
                        <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Badge Title
                        </label>
                        <input
                          type="text"
                          value={formData.badge}
                          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                          placeholder="Quality First"
                          className={`w-full rounded-xl px-3 py-2 text-xs font-medium border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Badge Description
                        </label>
                        <input
                          type="text"
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          placeholder="Engineering standards that meet the highest global benchmarks..."
                          className={`w-full rounded-xl px-3 py-2 text-xs font-medium border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Project Counters / Stats below Description */}
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-[#7c3aed]">Project Counters & Stats</h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('stats', { label: 'New Metric', value: '10+' })}
                          className="px-3 py-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition"
                        >
                          <Plus className="w-3 h-3" /> Add Counter
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.stats.map((st, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <input
                              type="text"
                              placeholder="Value (e.g. 15+)"
                              value={st.value || ''}
                              onChange={(e) => updateArrayField('stats', i, 'value', e.target.value)}
                              className={`w-28 rounded-lg px-3 py-2 text-xs font-bold border ${
                                isDark ? 'bg-[#121824] border-[#1f293d] text-purple-400' : 'bg-white border-slate-300 text-purple-700'
                              }`}
                            />
                            <input
                              type="text"
                              placeholder="Label (e.g. Global Projects)"
                              value={st.label || ''}
                              onChange={(e) => updateArrayField('stats', i, 'label', e.target.value)}
                              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium border ${
                                isDark ? 'bg-[#121824] border-[#1f293d] text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('stats', i)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 4. FEATURED SERVICES & 5. INDUSTRIES CAROUSEL */}
                {/* ============================================================ */}
                {(formData.sectionKey === 'featured_services' || formData.sectionKey === 'industries_carousel') && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker Badge
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder={formData.sectionKey === 'featured_services' ? 'What We Excel At' : 'Global Impact'}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder={formData.sectionKey === 'featured_services' ? 'Full-Spectrum Technical Capabilities' : 'Industries We Empower'}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-cyan-600">
                          <Sparkles className="w-4 h-4" />
                          <span>{formData.sectionKey === 'featured_services' ? 'Service Cards List' : 'Industry Sector Cards List'}</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', { title: '', name: '', desc: '', tag: '' })}
                          className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Card Item
                        </button>
                      </div>

                      <div className="space-y-4 max-h-72 overflow-y-auto no-scrollbar pr-1">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-2xl border space-y-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-300'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-cyan-600">Card Item #{i + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-slate-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Card Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="Title (e.g. AI & Machine Learning)"
                                  value={item.title || item.name || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', i, 'title', e.target.value);
                                    updateArrayField('items', i, 'name', e.target.value);
                                  }}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              {formData.sectionKey === 'industries_carousel' && (
                                <div>
                                  <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    Industry Tag / Badge
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Tag (e.g. Healthcare, Fintech)"
                                    value={item.tag || item.badge || ''}
                                    onChange={(e) => updateArrayField('items', i, 'tag', e.target.value)}
                                    className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  />
                                </div>
                              )}
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Card Description Text
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Description text..."
                                value={item.desc || ''}
                                onChange={(e) => updateArrayField('items', i, 'desc', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>

                            {/* Card Cover Image Uploader (Image Only) */}
                            <div className={`p-3 rounded-xl border space-y-2.5 ${
                              isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-cyan-50/50 border-cyan-200'
                            }`}>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-bold flex items-center gap-1.5 text-cyan-600 mb-1">
                                    <ImageIcon className="w-3.5 h-3.5" /> <span>Card Photo (Image Only)</span>
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      placeholder="No image uploaded — Click Upload or enter URL"
                                      value={getCleanMediaValue(item.img || item.mediaUrl)}
                                      onChange={(e) => {
                                        updateArrayField('items', i, 'img', e.target.value);
                                        updateArrayField('items', i, 'mediaUrl', e.target.value);
                                      }}
                                      className={`w-full flex-1 rounded-lg px-2.5 py-1.5 text-xs font-mono border ${
                                        isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                                      }`}
                                    />
                                    <label className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition">
                                      {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                                      <span>Upload</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          if (e.target.files?.[0]) {
                                            handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                              updateArrayField('items', i, 'img', uploadedUrl);
                                              updateArrayField('items', i, 'mediaUrl', uploadedUrl);
                                            }, 'image');
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold flex items-center gap-1.5 text-purple-600 mb-1">
                                    <span>⚛️ React Icon Badge</span>
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                      <RenderReactIcon iconKey={item.icon || (formData.sectionKey === 'featured_services' ? 'FiCpu' : 'FiHeart')} />
                                    </div>
                                    <select
                                      value={item.icon || (formData.sectionKey === 'featured_services' ? 'FiCpu' : 'FiHeart')}
                                      onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                      className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium border ${
                                        isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                                      }`}
                                    >
                                      {Object.keys(REACT_ICONS_MAP).filter(k => k.startsWith('Fi') || k.startsWith('Si')).map(k => (
                                        <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {mediaError && (
                                <div className="mt-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center justify-between">
                                  <span>{mediaError}</span>
                                  <button type="button" onClick={() => setMediaError('')} className="p-1 rounded-lg hover:bg-black/10 text-red-400">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 6. WHY CHOOSE US SECTION: TITLE, SUBTITLE, VIDEO, ADVANTAGES */}
                {/* ============================================================ */}
                {formData.sectionKey === 'why_choose_us' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        📌 Section Main Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Why Enterprise Leaders Choose Us"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        📝 Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="We combine deep technical mastery with agile execution..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-blue-50/50 border-blue-200'
                    }`}>
                      <label className={`block text-xs font-bold flex items-center gap-2 text-blue-600`}>
                        <Video className="w-4 h-4" />
                        <span>Ambient Background Media (Image or Video Allowed)</span>
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No media uploaded — Click Upload or enter URL"
                          className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-mono border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                  setFormData(prev => ({ ...prev, mediaUrl: uploadedUrl }));
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                      {mediaError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center justify-between">
                          <span>{mediaError}</span>
                          <button type="button" onClick={() => setMediaError('')} className="p-1 rounded-lg hover:bg-black/10 text-red-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-cyan-600">
                          <Sparkles className="w-4 h-4" />
                          <span>🌟 Advantage Cards List (3 Advantage Cards)</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', { title: '', tag: '', desc: '' })}
                          className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Advantage Card
                        </button>
                      </div>

                      <div className="space-y-4 max-h-64 overflow-y-auto no-scrollbar pr-1">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-2xl border space-y-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-300'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-cyan-600">Advantage Card #{i + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-slate-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Advantage Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="Title (e.g. Rapid Engineering)"
                                  value={item.title || item.name || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', i, 'title', e.target.value);
                                    updateArrayField('items', i, 'name', e.target.value);
                                  }}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Tag / Badge
                                </label>
                                <input
                                  type="text"
                                  placeholder="Tag (e.g. 3x Faster Delivery)"
                                  value={item.tag || item.badge || ''}
                                  onChange={(e) => updateArrayField('items', i, 'tag', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>

                            {/* React Icon Selector */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  <span>⚛️ Advantage React Icon</span>
                                </label>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                    <RenderReactIcon iconKey={item.icon || 'AiOutlineThunderbolt'} />
                                  </div>
                                  <select
                                    value={item.icon || 'AiOutlineThunderbolt'}
                                    onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                    className={`w-full rounded-xl px-3 py-2 text-xs border font-medium ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  >
                                    <option value="AiOutlineThunderbolt">⚡ Thunderbolt / Speed (AiOutlineThunderbolt)</option>
                                    <option value="CiLock">🔒 Lock / Security (CiLock)</option>
                                    <option value="SlPeople">👥 People / Senior Team (SlPeople)</option>
                                    <option value="FiShield">🛡️ Shield / Defense (FiShield)</option>
                                    <option value="FiCheckCircle">✅ Check Circle / Quality (FiCheckCircle)</option>
                                    <option value="FiCpu">💻 CPU / AI Systems (FiCpu)</option>
                                    <option value="FiAward">🏆 Award / Excellence (FiAward)</option>
                                    <option value="FiGlobe">🌐 Global Network (FiGlobe)</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Advantage Description Text
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Advantage description text..."
                                value={item.desc || ''}
                                onChange={(e) => updateArrayField('items', i, 'desc', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 7. FINAL CTA BANNER SECTION: KICKER, TITLE, SUBTITLE, BUTTONS */}
                {/* ============================================================ */}
                {formData.sectionKey === 'final_cta' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        🏷️ Top Kicker (e.g. Start Your Digital Transformation)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Start Your Digital Transformation"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        📌 Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Ready to Build the Future?"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        📝 Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Join leading enterprise partners..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ArrowUpRight className="w-4 h-4" />
                          <span>Action Buttons List</span>
                        </h4>
                        {formData.buttons.length < 2 && (
                          <button
                            type="button"
                            onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                            className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Button
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3.5 rounded-xl border space-y-2.5 transition-all ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Button #{bIdx + 1} ({bIdx === 0 ? 'Primary' : 'Secondary'})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('buttons', bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete this Button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Text Label
                                </label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                                  placeholder="e.g. Start Your Project"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Target Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                                  placeholder="e.g. /contact"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 8. INDUSTRIES HERO BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'industries_hero' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker Badge (e.g. Cross-Sector Solutions)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker || formData.badge || ''}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value, badge: e.target.value })}
                        placeholder="Cross-Sector Solutions"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Transforming Every Sector With Intelligent Technology"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Our AI and automation platforms are purpose-built..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-purple-50/50 border-purple-200'
                    }`}>
                      <label className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                        <ImageIcon className="w-4 h-4" />
                        <span>Background Banner Media (Photo or Video)</span>
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No media uploaded — Click Upload Media or enter URL"
                          className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-mono border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="w-full sm:w-auto px-4 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                  setFormData(prev => ({ ...prev, mediaUrl: uploadedUrl }));
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                      {mediaError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center justify-between">
                          <span>{mediaError}</span>
                          <button type="button" onClick={() => setMediaError('')} className="p-1 rounded-lg hover:bg-black/10 text-red-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons List Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ArrowUpRight className="w-4 h-4" />
                          <span>Action Buttons List ({formData.buttons.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Button #{bIdx + 1} ({bIdx === 0 ? 'Primary' : 'Secondary'})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('buttons', bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete this Button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Text Label
                                </label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                                  placeholder="e.g. Explore Industries"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Target Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                                  placeholder="e.g. #industries-list or /contact"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics / Counters Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <Sparkles className="w-4 h-4" />
                          <span>Metrics & Stats Counters ({formData.stats.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('stats', { label: 'New Metric', value: '100%' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Metric
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.stats.map((st, sIdx) => (
                          <div key={sIdx} className={`p-3 rounded-xl border space-y-2 flex items-center gap-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="w-32">
                              <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Value (Number)</label>
                              <input
                                type="text"
                                value={st.value || ''}
                                onChange={(e) => updateArrayField('stats', sIdx, 'value', e.target.value)}
                                placeholder="12+"
                                className={`w-full rounded-lg px-3 py-1.5 text-xs font-bold border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                                }`}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Label / Description</label>
                              <input
                                type="text"
                                value={st.label || ''}
                                onChange={(e) => updateArrayField('stats', sIdx, 'label', e.target.value)}
                                placeholder="Sectors Served"
                                className={`w-full rounded-lg px-3 py-1.5 text-xs font-medium border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                                }`}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('stats', sIdx)}
                              className="p-1 text-slate-400 hover:text-red-500 mt-4"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 9. INDUSTRIES GRID SECTION (SECTOR CARDS & REACT ICONS) */}
                {/* ============================================================ */}
                {formData.sectionKey === 'industries_grid' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Target Markets)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Target Markets"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Industries We Empower"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Domain-specific software architectures engineered for highly regulated and high-scale sectors."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Live Category Filter Pills Summary */}
                    <div className={`p-4 rounded-2xl border space-y-2 ${
                      isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-purple-50/50 border-purple-200'
                    }`}>
                      <label className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                        <Sparkles className="w-4 h-4" />
                        <span>Live Filter Category Pills Bar</span>
                      </label>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Category filter pills on the live website (e.g. <span className="font-bold">All</span>, <span className="font-bold">Finance & Health</span>, <span className="font-bold">Operations & Logistics</span>, <span className="font-bold">Digital & Security</span>) are automatically updated from the Category field inside each industry card below.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7c3aed] text-white">All</span>
                        {[...new Set((formData.items || []).map(it => it.category || 'Finance & Health'))].map((cat, cIdx) => (
                          <span key={cIdx} className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                          }`}>
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-purple-600">
                          <Layers className="w-4 h-4" />
                          <span>Industry Cards List ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', {
                            title: 'New Industry',
                            category: 'Finance & Health',
                            tagline: 'Custom Tagline',
                            desc: 'Industry description text...',
                            img: '/images/industry-healthcare.jpg',
                            icon: 'HiOutlineHeart',
                            points: ['Feature Point 1', 'Feature Point 2']
                          })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Industry Card
                        </button>
                      </div>

                      <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar pr-1">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-2xl border space-y-3.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-300 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">Industry Card #{i + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Industry Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Industry Title / Name
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Healthcare"
                                  value={item.title || item.name || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', i, 'title', e.target.value);
                                    updateArrayField('items', i, 'name', e.target.value);
                                  }}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border font-semibold ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Category Filter Pill
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Finance & Health"
                                  value={item.category || ''}
                                  onChange={(e) => updateArrayField('items', i, 'category', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Tagline / Highlight
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. AI diagnostics, patient analytics & workflow automation"
                                value={item.tagline || ''}
                                onChange={(e) => updateArrayField('items', i, 'tagline', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Card Description Text
                              </label>
                              <textarea
                                rows={2}
                                placeholder="From medical imaging analysis to drug discovery..."
                                value={item.desc || ''}
                                onChange={(e) => updateArrayField('items', i, 'desc', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {/* Photo Uploader */}
                              <div>
                                <label className="block text-[11px] font-bold text-cyan-600 mb-1">Cover Photo (Image Only)</label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={getCleanMediaValue(item.img || item.mediaUrl)}
                                    onChange={(e) => {
                                      updateArrayField('items', i, 'img', e.target.value);
                                      updateArrayField('items', i, 'mediaUrl', e.target.value);
                                    }}
                                    placeholder="No image uploaded — Click Upload or enter URL"
                                    className={`w-full rounded-lg px-2.5 py-1.5 text-xs font-mono border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'
                                    }`}
                                  />
                                  <label className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition">
                                    {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                                    <span>Upload</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                          handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                            updateArrayField('items', i, 'img', uploadedUrl);
                                            updateArrayField('items', i, 'mediaUrl', uploadedUrl);
                                          }, 'image');
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>

                              {/* React Icon Dropdown Selector */}
                              <div>
                                <label className="block text-[11px] font-bold text-purple-600 mb-1">React Icon Badge</label>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                    <RenderReactIcon iconKey={item.icon || 'HiOutlineHeart'} />
                                  </div>
                                  <select
                                    value={item.icon || 'HiOutlineHeart'}
                                    onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                    className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  >
                                    {Object.keys(REACT_ICONS_MAP).map(k => (
                                      <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Bullet Feature Chips Array Editor */}
                            <div className={`p-3.5 rounded-xl border space-y-2.5 ${
                              isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-purple-50/50 border-purple-200'
                            }`}>
                              <div className="flex justify-between items-center">
                                <label className="text-[11px] font-bold flex items-center gap-1.5 text-[#7c3aed]">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Bullet Feature Chips (Pills List) ({item.points?.length || 0})</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentPoints = [...(item.points || [])];
                                    currentPoints.push('New Feature Point');
                                    updateArrayField('items', i, 'points', currentPoints);
                                  }}
                                  className="px-2.5 py-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                                >
                                  <Plus className="w-3 h-3" /> Add Feature Chip
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {(item.points || []).map((pt, ptIdx) => (
                                  <div key={ptIdx} className="flex items-center gap-1.5">
                                    <input
                                      type="text"
                                      value={pt}
                                      onChange={(e) => {
                                        const currentPoints = [...(item.points || [])];
                                        currentPoints[ptIdx] = e.target.value;
                                        updateArrayField('items', i, 'points', currentPoints);
                                      }}
                                      placeholder="Feature pill text..."
                                      className={`w-full flex-1 rounded-lg px-2.5 py-1.5 text-xs border ${
                                        isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                                      }`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentPoints = (item.points || []).filter((_, pI) => pI !== ptIdx);
                                        updateArrayField('items', i, 'points', currentPoints);
                                      }}
                                      className="p-1 text-slate-400 hover:text-red-500 rounded-md shrink-0"
                                      title="Remove Feature Chip"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Discuss Solution CTA Label & Link */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Bottom CTA Button Text
                                </label>
                                <input
                                  type="text"
                                  placeholder="Discuss Solution"
                                  value={item.ctaText || 'Discuss Solution'}
                                  onChange={(e) => updateArrayField('items', i, 'ctaText', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Bottom CTA Target Link
                                </label>
                                <input
                                  type="text"
                                  placeholder="/contact"
                                  value={item.ctaLink || '/contact'}
                                  onChange={(e) => updateArrayField('items', i, 'ctaLink', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 10. INDUSTRIES CTA BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'industries_cta' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Custom Architectural Engagements)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Custom Architectural Engagements"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Don't See Your Industry?"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Our AI and engineering capabilities span bespoke enterprise domains..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ArrowUpRight className="w-4 h-4" />
                          <span>Action Buttons List ({formData.buttons.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Button #{bIdx + 1} ({bIdx === 0 ? 'Primary' : 'Secondary'})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('buttons', bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete this Button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Text Label
                                </label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                                  placeholder="e.g. Talk to Our Team"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Target Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                                  placeholder="e.g. /contact"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 11. SERVICES HERO SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'services_hero' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Our Core Capabilities)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Our Core Capabilities"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="AI, IoT, Web, Mobile & Cybersecurity Solutions"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Comprehensive technology services spanning Artificial Intelligence, Cloud infrastructure..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Photo or Video Uploader */}
                    <div>
                      <label className="block text-xs font-bold text-cyan-500 mb-1">
                        Hero Background Media (Photo or Video)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No media uploaded — Click Upload or enter URL"
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => setFormData({ ...formData, mediaUrl: url }));
                              }
                            }}
                          />
                        </label>
                      </div>
                      {mediaError && (
                        <p className="text-red-500 font-semibold text-xs mt-1.5 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                          {mediaError}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ArrowUpRight className="w-4 h-4" />
                          <span>Hero Action Buttons ({formData.buttons.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Button #{bIdx + 1} ({bIdx === 0 ? 'Primary' : 'Secondary'})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('buttons', bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete this Button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Text
                                </label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Target Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 12. SERVICES GRID SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'services_grid' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Engineering Expertise)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Engineering Expertise"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Explore Our Services"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description Text
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Specialized enterprise technology capabilities built to accelerate digital transformation."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Services Manager Database Notice */}
                    <div className={`p-4.5 rounded-2xl border space-y-2 ${
                      isDark ? 'bg-purple-950/30 border-purple-800/40 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>Database Dynamic Services Synchronization</span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">
                        Individual service capability cards (titles, descriptions, feature bullet points, engineering lifecycle steps, FAQs, and cover images) are directly managed in the <strong>Services Manager</strong> page for 100% database synchronization across the website and navbar dropdowns!
                      </p>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 13. SERVICES & TRAINING PROCESS SECTION */}
                {/* ============================================================ */}
                {(formData.sectionKey === 'services_process' || formData.sectionKey === 'training_process') && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Our Agile Process)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Our Agile Process"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="How We Deliver Results"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="A battle-tested methodology ensuring every intelligent application is delivered..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Process Steps List Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-cyan-500">
                          <Zap className="w-4 h-4" />
                          <span>Agile Process Steps List ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', { n: `0${formData.items.length + 1}`, title: 'New Step', desc: 'Step details...' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Process Step
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.items.map((step, sIdx) => (
                          <div key={sIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Step #{sIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', sIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Process Step"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Step Number (e.g. 01)
                                </label>
                                <input
                                  type="text"
                                  value={step.n || step.step || `0${sIdx + 1}`}
                                  onChange={(e) => {
                                    updateArrayField('items', sIdx, 'n', e.target.value);
                                    updateArrayField('items', sIdx, 'step', e.target.value);
                                  }}
                                  className={`w-full rounded-xl px-3 py-2 text-xs font-mono font-bold border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Step Title
                                </label>
                                <input
                                  type="text"
                                  value={step.title || step.name || ''}
                                  onChange={(e) => updateArrayField('items', sIdx, 'title', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border font-semibold ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Step Description
                              </label>
                              <textarea
                                rows={2}
                                value={step.desc || ''}
                                onChange={(e) => updateArrayField('items', sIdx, 'desc', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 14. SERVICES CTA BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'services_cta' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Start Your Innovation Journey)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Start Your Innovation Journey"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Ready to Transform Your Business With AI?"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Whether you are launching a new AI engine or upgrading legacy systems..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ArrowUpRight className="w-4 h-4" />
                          <span>Action Buttons List ({formData.buttons.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Button #{bIdx + 1} ({bIdx === 0 ? 'Primary' : 'Secondary'})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('buttons', bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete this Button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Text Label
                                </label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                                  placeholder="e.g. Start Your Project"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Target Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                                  placeholder="e.g. /contact"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 15. TRAINING HERO BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'training_hero' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Porulon Training)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Porulon Training"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Industry-Ready Skills, Taught By Practitioners"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Hands-on, mentor-led technical training programs in AI & ML, Cybersecurity..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Photo or Video Uploader */}
                    <div>
                      <label className="block text-xs font-bold text-cyan-500 mb-1">
                        Hero Background Media (Photo or Video)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No media uploaded — Click Upload or enter URL"
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => setFormData({ ...formData, mediaUrl: url }));
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 16. TRAINING TRACKS GRID SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'training_tracks' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Curriculum Tracks)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Curriculum Tracks"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Explore Our Training Tracks"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Hands-on bootcamps engineered to build production-grade software portfolios."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Training Manager Database Notice */}
                    <div className={`p-4.5 rounded-2xl border space-y-2 ${
                      isDark ? 'bg-purple-950/30 border-purple-800/40 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>Database Dynamic Training Courses Synchronization</span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">
                        Individual training course cards (titles, descriptions, feature bullet points, duration, skill level, and cover images) are directly managed in the <strong>Training Manager</strong> page for 100% database synchronization across the website, training grid, and navbar dropdowns!
                      </p>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 17. TRAINING WHY US HIGHLIGHTS SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'training_why_us' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Why Porulon Training)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Why Porulon Training"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Learning Built For Real Careers"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="A battle-tested training environment that prepares engineers..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Array of Highlight Cards */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Training Highlight Cards ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', {
                            title: 'New Highlight',
                            desc: 'Highlight card description...',
                            icon: 'HiOutlineAcademicCap'
                          })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Highlight Card
                        </button>
                      </div>

                      <div className="space-y-4">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-xl border space-y-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center border-b border-slate-500/10 pb-2">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Highlight Card #{i + 1}: {item.title || 'Untitled'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-[#ef4444] hover:text-red-600 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Highlight Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Highlight Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="Mentor-Led"
                                  value={item.title || ''}
                                  onChange={(e) => updateArrayField('items', i, 'title', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              {/* React Icon Dropdown Selector */}
                              <div>
                                <label className="block text-[11px] font-bold text-purple-600 mb-1">React Icon Selector</label>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                    <RenderReactIcon iconKey={item.icon || 'HiOutlineAcademicCap'} />
                                  </div>
                                  <select
                                    value={item.icon || 'HiOutlineAcademicCap'}
                                    onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                    className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  >
                                    {Object.keys(REACT_ICONS_MAP).map(k => (
                                      <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Card Description
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Learn directly from principal AI, cybersecurity, and cloud engineers..."
                                value={item.desc || ''}
                                onChange={(e) => updateArrayField('items', i, 'desc', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 17.5. TRAINING FAQ ACCORDION SECTION */}
                {/* ============================================================ */}
                {(formData.sectionKey === 'training_faq' || formData.sectionKey.includes('faq')) && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Training Inquiries)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Training Inquiries"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Frequently Asked Questions"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Everything you need to know about cohort schedules..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* FAQ Items Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <MessageSquare className="w-4 h-4" />
                          <span>FAQ Accordion Questions ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', { q: 'New Question?', a: 'Answer explanation text...' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add FAQ Question
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.items.map((faq, fIdx) => (
                          <div key={fIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Question #{fIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', fIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete FAQ Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Question Title / Prompt
                              </label>
                              <input
                                type="text"
                                value={faq.q || faq.question || faq.title || ''}
                                onChange={(e) => {
                                  updateArrayField('items', fIdx, 'q', e.target.value);
                                  updateArrayField('items', fIdx, 'question', e.target.value);
                                }}
                                placeholder="e.g. Who are these training tracks designed for?"
                                className={`w-full rounded-xl px-3 py-2 text-xs font-bold border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Answer Explanation
                              </label>
                              <textarea
                                rows={2}
                                value={faq.a || faq.answer || faq.desc || ''}
                                onChange={(e) => {
                                  updateArrayField('items', fIdx, 'a', e.target.value);
                                  updateArrayField('items', fIdx, 'answer', e.target.value);
                                }}
                                placeholder="Enter detailed answer response..."
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 18. TRAINING CTA BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'training_cta' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Accelerate Your Career)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Accelerate Your Career"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Ready to Upskill?"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Explore our upcoming training cohorts or reach out to discuss custom corporate upskilling..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Action Buttons Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ArrowUpRight className="w-4 h-4" />
                          <span>Action Buttons ({formData.buttons.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Button #{bIdx + 1} ({bIdx === 0 ? 'Primary' : 'Secondary'})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('buttons', bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete this Button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Text Label
                                </label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                                  placeholder="e.g. Enroll Now"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Target Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                                  placeholder="e.g. /contact"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 19. ABOUT HERO CAROUSEL SLIDES SECTION (EACH SLIDE INDIVIDUALLY EDITABLE) */}
                {/* ============================================================ */}
                {formData.sectionKey === 'about_hero' && (
                  <div className="space-y-6">
                    {/* Header Banner */}
                    <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                      isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-purple-50 border-purple-200'
                    }`}>
                      <div>
                        <h4 className="text-sm font-bold flex items-center gap-2 text-[#7c3aed]">
                          <Video className="w-4 h-4" />
                          <span>Hero Carousel Slides ({(formData.slides || []).length} Slides)</span>
                        </h4>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Each slide auto-transitions on the live site with its own background photo/video, text, and action buttons.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const currentSlides = formData.slides || [];
                          const newSlide = {
                            kicker: 'About Porulon Technologies',
                            title: 'New Hero Slide Title',
                            subtitle: 'Enter description text for this new slide...',
                            mediaUrl: '',
                            buttons: [
                              { label: 'Explore Our Story', link: '#our-story' }
                            ]
                          };
                          setFormData({ ...formData, slides: [...currentSlides, newSlide] });
                        }}
                        className="px-4 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm shrink-0"
                      >
                        <Plus className="w-4 h-4" /> Add New Hero Slide
                      </button>
                    </div>

                    {/* Slides List — Render Slide #1, Slide #2, Slide #3... */}
                    <div className="space-y-5">
                      {(formData.slides || []).map((slide, sIdx) => (
                        <div key={sIdx} className={`p-5 rounded-2xl border space-y-4 shadow-sm ${
                          isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-purple-200'
                        }`}>
                          <div className="flex justify-between items-center border-b border-slate-500/10 pb-3">
                            <span className="text-xs font-extrabold text-[#7c3aed] uppercase tracking-wider flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-[#7c3aed] flex items-center justify-center text-[11px] font-bold">
                                {sIdx + 1}
                              </span>
                              <span>Slide #{sIdx + 1} {sIdx === 0 ? '(First Active Slide)' : ''}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedSlides = (formData.slides || []).filter((_, idx) => idx !== sIdx);
                                setFormData({ ...formData, slides: updatedSlides });
                              }}
                              className="px-2.5 py-1 text-xs text-[#ef4444] hover:text-white hover:bg-red-500/90 rounded-lg transition flex items-center gap-1 font-semibold"
                              title="Delete this Slide"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete Slide
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Slide #{sIdx + 1} Kicker Badge
                              </label>
                              <input
                                type="text"
                                placeholder="About Porulon Technologies"
                                value={slide.kicker || ''}
                                onChange={(e) => {
                                  const updated = [...(formData.slides || [])];
                                  updated[sIdx] = { ...updated[sIdx], kicker: e.target.value };
                                  setFormData({ ...formData, slides: updated });
                                }}
                                className={`w-full rounded-xl px-3.5 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'
                                }`}
                              />
                            </div>
                            <div>
                              <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Slide #{sIdx + 1} Headline Title
                              </label>
                              <input
                                type="text"
                                placeholder="Where Deep Tech Meets A Human-Centric Mindset"
                                value={slide.title || ''}
                                onChange={(e) => {
                                  const updated = [...(formData.slides || [])];
                                  updated[sIdx] = { ...updated[sIdx], title: e.target.value };
                                  setFormData({ ...formData, slides: updated });
                                }}
                                className={`w-full rounded-xl px-3.5 py-2 text-xs border font-semibold ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                                }`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Slide #{sIdx + 1} Subtitle Description
                            </label>
                            <textarea
                              rows={2}
                              placeholder="We design, engineer, and deploy high-concurrency AI engines..."
                              value={slide.subtitle || ''}
                              onChange={(e) => {
                                const updated = [...(formData.slides || [])];
                                updated[sIdx] = { ...updated[sIdx], subtitle: e.target.value };
                                setFormData({ ...formData, slides: updated });
                              }}
                              className={`w-full rounded-xl px-3.5 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>

                          {/* Background Media Uploader for this specific slide */}
                          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#1a2233]/40 border-[#1f293d]' : 'bg-purple-50/40 border-purple-200/60'}`}>
                            <label className="block text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                              Slide #{sIdx + 1} Background Media (Photo or Video)
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={getCleanMediaValue(slide.mediaUrl)}
                                onChange={(e) => {
                                  const updated = [...(formData.slides || [])];
                                  updated[sIdx] = { ...updated[sIdx], mediaUrl: e.target.value };
                                  setFormData({ ...formData, slides: updated });
                                }}
                                placeholder="No photo or video uploaded — Click Upload or enter URL"
                                className={`w-full rounded-lg px-3 py-2 text-xs font-mono border ${
                                  isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-900'
                                }`}
                              />
                              <label className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                <span>Upload Media</span>
                                <input
                                  type="file"
                                  accept="image/*,video/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      handleFileUpload(e.target.files[0], (uploadedUrl) => {
                                        const updated = [...(formData.slides || [])];
                                        updated[sIdx] = { ...updated[sIdx], mediaUrl: uploadedUrl };
                                        setFormData({ ...formData, slides: updated });
                                      });
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          {/* Action Buttons for this specific slide */}
                          <div className="pt-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[11px] font-bold text-[#7c3aed]">
                                Slide #{sIdx + 1} Action Buttons ({slide.buttons?.length || 0})
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(formData.slides || [])];
                                  const currentBtns = updated[sIdx].buttons || [];
                                  updated[sIdx] = {
                                    ...updated[sIdx],
                                    buttons: [...currentBtns, { label: 'New Button', link: '/contact' }]
                                  };
                                  setFormData({ ...formData, slides: updated });
                                }}
                                className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                              >
                                <Plus className="w-3 h-3" /> Add Button
                              </button>
                            </div>

                            <div className="space-y-2">
                              {(slide.buttons || []).map((btn, bIdx) => (
                                <div key={bIdx} className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                                }`}>
                                  <input
                                    type="text"
                                    placeholder="Label (e.g. Explore Our Story)"
                                    value={btn.label || ''}
                                    onChange={(e) => {
                                      const updated = [...(formData.slides || [])];
                                      const btns = [...(updated[sIdx].buttons || [])];
                                      btns[bIdx] = { ...btns[bIdx], label: e.target.value };
                                      updated[sIdx] = { ...updated[sIdx], buttons: btns };
                                      setFormData({ ...formData, slides: updated });
                                    }}
                                    className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs border ${
                                      isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                                    }`}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Link (e.g. #our-story or /contact)"
                                    value={btn.link || ''}
                                    onChange={(e) => {
                                      const updated = [...(formData.slides || [])];
                                      const btns = [...(updated[sIdx].buttons || [])];
                                      btns[bIdx] = { ...btns[bIdx], link: e.target.value };
                                      updated[sIdx] = { ...updated[sIdx], buttons: btns };
                                      setFormData({ ...formData, slides: updated });
                                    }}
                                    className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs border ${
                                      isDark ? 'bg-[#121824] border-[#1f293d] text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                                    }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...(formData.slides || [])];
                                      const btns = (updated[sIdx].buttons || []).filter((_, idx) => idx !== bIdx);
                                      updated[sIdx] = { ...updated[sIdx], buttons: btns };
                                      setFormData({ ...formData, slides: updated });
                                    }}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded-lg"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Integrated Stat Metric Counters Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <Zap className="w-4 h-4" />
                          <span>Hero Metric Counters ({formData.stats.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('stats', { n: '100+', l: 'New Metric' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Metric
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {formData.stats.map((st, sIdx) => (
                          <div key={sIdx} className={`p-3 rounded-xl border space-y-2 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] font-bold text-[#7c3aed]">Metric #{sIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('stats', sIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Metric"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Number (15+)"
                                value={st.n || st.value || ''}
                                onChange={(e) => {
                                  updateArrayField('stats', sIdx, 'n', e.target.value);
                                  updateArrayField('stats', sIdx, 'value', e.target.value);
                                }}
                                className={`w-full rounded-lg px-2.5 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                              <input
                                type="text"
                                placeholder="Label (Projects Delivered)"
                                value={st.l || st.label || ''}
                                onChange={(e) => {
                                  updateArrayField('stats', sIdx, 'l', e.target.value);
                                  updateArrayField('stats', sIdx, 'label', e.target.value);
                                }}
                                className={`w-full rounded-lg px-2.5 py-1.5 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 20. ABOUT STORY & JOURNEY SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'about_story' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Our Journey & Conviction)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Our Journey & Conviction"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Main Story Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Built On One Clear Conviction"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Story Paragraph 1 (Subtitle)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Porulon Technologies was founded with a clear conviction..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Story Paragraph 2 (Content)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="We specialize in designing, developing, and deploying AI, ML, and automation-based software solutions..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Floating Overlap Image Badge Editor */}
                    <div className={`p-4 rounded-xl border space-y-3 ${
                      isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                    }`}>
                      <h4 className="text-xs font-bold text-[#7c3aed]">Image Floating Overlap Badge</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Badge Main Text (e.g. Established 2026)
                          </label>
                          <input
                            type="text"
                            value={formData.badgeTitle || ''}
                            onChange={(e) => setFormData({ ...formData, badgeTitle: e.target.value })}
                            placeholder="Established 2026"
                            className={`w-full rounded-xl px-3 py-2 text-xs border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Badge Subtitle (e.g. Delivering Intelligent Solutions)
                          </label>
                          <input
                            type="text"
                            value={formData.badgeSubtitle || ''}
                            onChange={(e) => setFormData({ ...formData, badgeSubtitle: e.target.value })}
                            placeholder="Delivering Intelligent Solutions"
                            className={`w-full rounded-xl px-3 py-2 text-xs border ${
                              isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Story Photo Uploader */}
                    <div>
                      <label className="block text-xs font-bold text-cyan-500 mb-1">
                        Story Side Photo (Image Only)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No image uploaded — Click Upload or enter URL"
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => setFormData({ ...formData, mediaUrl: url }), 'image');
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Key Milestone Chips */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Milestone Chips ({formData.points.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('points', 'New Milestone Chip')}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Chip
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={pt}
                              onChange={(e) => updateArrayField('points', pIdx, null, e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('points', pIdx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                              title="Delete Chip"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 21. ABOUT PROVEN TRACK RECORD STATS SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'about_stats' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Proven Track Record)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Proven Track Record"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Impact In Numbers"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Quantifiable engineering performance across high-stakes client deployments."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Array of Impact Metric Cards */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <Zap className="w-4 h-4" />
                          <span>Impact Metric Cards ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', {
                            n: '100+',
                            l: 'New Impact Metric',
                            icon: 'HiOutlineRocketLaunch'
                          })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Metric Card
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-xl border space-y-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center border-b border-slate-500/10 pb-2">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Metric #{i + 1}: {item.l || item.label || 'Untitled'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-[#ef4444] hover:text-red-600 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Metric Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Number Value (15+)
                                </label>
                                <input
                                  type="text"
                                  placeholder="15+"
                                  value={item.n || item.value || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', i, 'n', e.target.value);
                                    updateArrayField('items', i, 'value', e.target.value);
                                  }}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Label Text
                                </label>
                                <input
                                  type="text"
                                  placeholder="Projects Delivered"
                                  value={item.l || item.label || ''}
                                  onChange={(e) => {
                                    updateArrayField('items', i, 'l', e.target.value);
                                    updateArrayField('items', i, 'label', e.target.value);
                                  }}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              {/* React Icon Dropdown Selector */}
                              <div>
                                <label className="block text-[11px] font-bold text-purple-600 mb-1">React Icon Selector</label>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                    <RenderReactIcon iconKey={item.icon || 'HiOutlineRocketLaunch'} />
                                  </div>
                                  <select
                                    value={item.icon || 'HiOutlineRocketLaunch'}
                                    onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                    className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  >
                                    {Object.keys(REACT_ICONS_MAP).map(k => (
                                      <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 22. ABOUT OUR VALUES SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'about_values' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Our Values)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Our Values"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="The Principles That Guide Everything We Build"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Core engineering ethics and client-first principles driving our innovation."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Array of Core Value Cards */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Core Value Cards ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', {
                            title: 'New Value',
                            desc: 'Core principle description...',
                            icon: 'HiOutlineSparkles'
                          })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Value Card
                        </button>
                      </div>

                      <div className="space-y-4">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-xl border space-y-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center border-b border-slate-500/10 pb-2">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Value Card #{i + 1}: {item.title || 'Untitled Value'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-[#ef4444] hover:text-red-600 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Value Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Value Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="Mission-Driven"
                                  value={item.title || ''}
                                  onChange={(e) => updateArrayField('items', i, 'title', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              {/* React Icon Dropdown Selector */}
                              <div>
                                <label className="block text-[11px] font-bold text-purple-600 mb-1">React Icon Selector</label>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                    <RenderReactIcon iconKey={item.icon || 'HiOutlineSparkles'} />
                                  </div>
                                  <select
                                    value={item.icon || 'HiOutlineSparkles'}
                                    onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                    className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  >
                                    {Object.keys(REACT_ICONS_MAP).map(k => (
                                      <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Card Description
                              </label>
                              <textarea
                                rows={2}
                                placeholder="We build technology that solves real problems..."
                                value={item.desc || ''}
                                onChange={(e) => updateArrayField('items', i, 'desc', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 23. ABOUT CAREERS & CULTURE CTA BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'about_cta' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Careers & Culture)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Careers & Culture"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Shape The Future Of Intelligent Tech"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-[#ffffff]' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="We are always looking for visionary engineers, researchers, and thinkers..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Action Buttons Editor */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ArrowUpRight className="w-4 h-4" />
                          <span>Action Buttons ({formData.buttons.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'New Button', link: '/contact' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3.5 rounded-xl border space-y-2.5 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Button #{bIdx + 1} ({bIdx === 0 ? 'Primary' : 'Secondary'})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('buttons', bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete this Button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Text Label
                                </label>
                                <input
                                  type="text"
                                  value={btn.label || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                                  placeholder="e.g. Explore Careers"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Button Target Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={btn.link || ''}
                                  onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                                  placeholder="e.g. /contact"
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Perks Highlights Bar Chips */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Perks Highlights Chips ({formData.points.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('points', 'New Perk Highlight')}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Perk Chip
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.points.map((perk, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={perk}
                              onChange={(e) => updateArrayField('points', pIdx, null, e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('points', pIdx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                              title="Delete Perk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 23B. BLOG ARTICLES SHOWCASE GRID SECTION (DATABASE SYNCHRONIZATION NOTICE ONLY) */}
                {/* ============================================================ */}
                {formData.sectionKey === 'blog_grid' && (
                  <div className="space-y-4">
                    <div className={`p-5 sm:p-6 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-purple-950/25 border-purple-800/40 text-purple-200' : 'bg-purple-50/70 border-purple-200 text-purple-900'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-purple-600 dark:text-purple-300">
                        <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>Database Dynamic Blog Articles Synchronization</span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed font-normal">
                        Individual blog article cards (titles, excerpts, categories, cover images, authors, takeaways, and full content) are directly managed in the <strong>Blogs Manager</strong> page for 100% database synchronization across the website and blog grid!
                      </p>
                      <div className="pt-2">
                        <a
                          href="/blogs"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-sm no-underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Go to Blogs Manager</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 24. CONTACT HERO HEADER BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'contact_hero' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Contact Porulon)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Contact Porulon"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Let's Talk About Your Next Project"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Hero Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Whether you need an enterprise AI platform, cloud architecture..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Photo or Video Uploader & Presets */}
                    <div>
                      <label className="block text-xs font-bold text-cyan-500 mb-1">
                        Hero Background Media (Photo or Video URL)
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No media uploaded — Click Upload, paste URL, or select preset below"
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => setFormData({ ...formData, mediaUrl: url }));
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* 1-Click Quick Background Presets */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-semibold text-slate-400">1-Click Presets:</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop' })}
                          className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 rounded-lg text-[11px] font-bold transition"
                        >
                          📷 Tech Data Network
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop' })}
                          className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 rounded-lg text-[11px] font-bold transition"
                        >
                          📷 Corporate Office
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mediaUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop' })}
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 rounded-lg text-[11px] font-bold transition"
                        >
                          📷 Dark AI Hub
                        </button>
                      </div>
                    </div>

                    {/* Quick Contact Badges Chips */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Quick Contact Badges ({formData.points.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('points', 'New Contact Badge')}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Badge
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.points.map((badge, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={badge}
                              onChange={(e) => updateArrayField('points', bIdx, null, e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('points', bIdx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                              title="Delete Badge"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 25. CONTACT DIRECT CHANNELS & GLOBAL HQ MAP SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'contact_info' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Connect & Visit)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Connect & Visit"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Direct Channels & Global HQ"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Google Maps Overlay Subtitle / Location Header
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Coimbatore HQ • Keeranatham IT Hub"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Google Maps Embed Iframe URL
                      </label>
                      <textarea
                        rows={2}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-mono border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Array of Info Cards */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <Mail className="w-4 h-4" />
                          <span>Direct Info Cards ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', {
                            title: 'New Channel',
                            desc: 'info@porulontech.com',
                            sub: 'Support hours...',
                            icon: 'HiOutlineEnvelope',
                            href: 'mailto:info@porulontech.com'
                          })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Info Card
                        </button>
                      </div>

                      <div className="max-h-[360px] overflow-y-auto space-y-4 pr-1.5 custom-scrollbar">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-xl border space-y-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center border-b border-slate-500/10 pb-2">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Info Card #{i + 1}: {item.title || 'Untitled Card'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-[#ef4444] hover:text-red-600 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Info Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Card Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="Email Us"
                                  value={item.title || ''}
                                  onChange={(e) => updateArrayField('items', i, 'title', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              {/* React Icon Dropdown Selector */}
                              <div>
                                <label className="block text-[11px] font-bold text-purple-600 mb-1">React Icon Selector</label>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                    <RenderReactIcon iconKey={item.icon || 'HiOutlineEnvelope'} />
                                  </div>
                                  <select
                                    value={item.icon || 'HiOutlineEnvelope'}
                                    onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                    className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  >
                                    {Object.keys(REACT_ICONS_MAP).map(k => (
                                      <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Contact Info Text / Address
                                </label>
                                <input
                                  type="text"
                                  placeholder="info@porulontech.com"
                                  value={item.desc || (Array.isArray(item.lines) ? item.lines.join(' | ') : '')}
                                  onChange={(e) => updateArrayField('items', i, 'desc', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Sub-Note / Hours
                                </label>
                                <input
                                  type="text"
                                  placeholder="For general inquiries, quotes..."
                                  value={item.sub || ''}
                                  onChange={(e) => updateArrayField('items', i, 'sub', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Click Link / Target URL (e.g. mailto:..., tel:..., or map link)
                              </label>
                              <input
                                type="text"
                                placeholder="mailto:info@porulontech.com"
                                value={item.href || ''}
                                onChange={(e) => updateArrayField('items', i, 'href', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 26. CONTACT MESSAGE FORM & SECURITY PERKS SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'contact_form' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Get In Touch)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Get In Touch"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Send Us A Message"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Share your project requirements or goals..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Left Column Featured Image / Media Uploader */}
                    <div>
                      <label className="block text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
                        Left Column Featured Media (Photo or Video URL - Like Homepage About Section)
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={getCleanMediaValue(formData.mediaUrl)}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="No image uploaded — Click Upload, paste URL, or select preset below"
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => setFormData({ ...formData, mediaUrl: url }));
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* 1-Click Quick Presets */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-semibold text-slate-400">1-Click Presets:</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop' })}
                          className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 rounded-lg text-[11px] font-bold transition cursor-pointer"
                        >
                          📷 Corporate Team
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop' })}
                          className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 rounded-lg text-[11px] font-bold transition cursor-pointer"
                        >
                          📷 Tech Operations
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mediaUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop' })}
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 rounded-lg text-[11px] font-bold transition cursor-pointer"
                        >
                          📷 Executive Advisory
                        </button>
                      </div>
                    </div>

                    {/* Array of Left Security & NDA Cards */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Left NDA & Security Cards ({formData.items.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('items', {
                            title: 'New Security Guarantee',
                            desc: 'Guarantee description...',
                            icon: 'HiOutlineLockClosed'
                          })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Guarantee Card
                        </button>
                      </div>

                      <div className="max-h-[360px] overflow-y-auto space-y-4 pr-1.5 custom-scrollbar">
                        {formData.items.map((item, i) => (
                          <div key={i} className={`p-4 rounded-xl border space-y-3 ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <div className="flex justify-between items-center border-b border-slate-500/10 pb-2">
                              <span className="text-xs font-bold text-[#7c3aed]">
                                Guarantee #{i + 1}: {item.title || 'Untitled'}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('items', i)}
                                className="p-1 text-[#ef4444] hover:text-red-600 hover:bg-red-500/10 rounded-lg transition"
                                title="Delete Guarantee Card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="100% NDA Protected Consultation"
                                  value={item.title || ''}
                                  onChange={(e) => updateArrayField('items', i, 'title', e.target.value)}
                                  className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                    isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                  }`}
                                />
                              </div>

                              {/* React Icon Dropdown Selector */}
                              <div>
                                <label className="block text-[11px] font-bold text-purple-600 mb-1">React Icon Selector</label>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                                    <RenderReactIcon iconKey={item.icon || 'HiOutlineLockClosed'} />
                                  </div>
                                  <select
                                    value={item.icon || 'HiOutlineLockClosed'}
                                    onChange={(e) => updateArrayField('items', i, 'icon', e.target.value)}
                                    className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium border ${
                                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                    }`}
                                  >
                                    {Object.keys(REACT_ICONS_MAP).map(k => (
                                      <option key={k} value={k}>{REACT_ICONS_MAP[k].name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Description
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Your proprietary data remains completely confidential..."
                                value={item.desc || ''}
                                onChange={(e) => updateArrayField('items', i, 'desc', e.target.value)}
                                className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                  isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Topic Selector Chips */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Form Topic Selector Chips ({formData.points.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('points', 'New Topic Option')}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Topic Chip
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.points.map((tp, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={typeof tp === 'string' ? tp : tp.label || ''}
                              onChange={(e) => updateArrayField('points', pIdx, null, e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('points', pIdx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                              title="Delete Topic Chip"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 27. BLOG HERO BANNER SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'blog_hero' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Porulon Insights)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Porulon Insights"
                        maxLength={100}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="The Blog"
                        maxLength={100}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Perspectives on AI, cybersecurity, cloud, and full-stack engineering..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-cyan-500 mb-1">
                        Hero Background Media (Photo or Video URL)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={formData.mediaUrl || ''}
                          onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                          placeholder="/images/blog-banner.png or click Upload"
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${
                            isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => setFormData({ ...formData, mediaUrl: url }));
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Quick Feature Chips */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Hero Quick Feature Chips ({formData.points.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('points', 'New Feature Chip')}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Chip
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.points.map((badge, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={badge}
                              onChange={(e) => updateArrayField('points', bIdx, null, e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('points', bIdx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                              title="Delete Chip"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 28. BLOG ARTICLES SHOWCASE GRID SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'blog_grid' && (
                  <div className="space-y-5">

                    {/* Category Filter Chips */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <Layers className="w-4 h-4" />
                          <span>Category Filter Chips ({formData.points.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('points', 'New Category')}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Category Chip
                        </button>
                      </div>

                      <div className="space-y-2">
                        {formData.points.map((cat, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={cat}
                              onChange={(e) => updateArrayField('points', cIdx, null, e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('points', cIdx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 29. BLOG NEWSLETTER & TECHNICAL INSIGHTS CTA SECTION */}
                {/* ============================================================ */}
                {formData.sectionKey === 'blog_cta' && (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Top Kicker (e.g. Stay In The Loop)
                      </label>
                      <input
                        type="text"
                        value={formData.kicker}
                        onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                        placeholder="Stay In The Loop"
                        maxLength={100}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Section Main Headline Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Get New Articles In Your Inbox"
                        maxLength={100}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="No spam, just practical engineering perspectives..."
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* CTA Buttons */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#1a2233]/60 border-[#1f293d]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                        <h4 className="text-xs font-bold flex items-center gap-2 text-[#7c3aed]">
                          <Megaphone className="w-4 h-4" />
                          <span>Action Buttons ({formData.buttons.length})</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => addArrayItem('buttons', { label: 'Talk to Our Team', link: '/contact' })}
                          className="px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Button
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.buttons.map((btn, bIdx) => (
                          <div key={bIdx} className={`p-3 rounded-xl border flex flex-col sm:flex-row gap-3 items-center ${
                            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                          }`}>
                            <input
                              type="text"
                              placeholder="Button Label (e.g. Talk to Our Team)"
                              value={btn.label || ''}
                              onChange={(e) => updateArrayField('buttons', bIdx, 'label', e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <input
                              type="text"
                              placeholder="Link URL (e.g. /contact)"
                              value={btn.link || ''}
                              onChange={(e) => updateArrayField('buttons', bIdx, 'link', e.target.value)}
                              className={`w-full rounded-xl px-3 py-2 text-xs border ${
                                isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('buttons', bIdx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition shrink-0"
                              title="Delete Button"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================ */}
                {/* 30. OTHER / CUSTOM SECTIONS */}
                {/* ============================================================ */}
                {!['hero', 'tech_stacks_marquee', 'about_preview', 'featured_services', 'industries_carousel', 'why_choose_us', 'final_cta', 'industries_hero', 'industries_grid', 'industries_cta', 'services_hero', 'services_grid', 'services_process', 'services_cta', 'training_hero', 'training_tracks', 'training_why_us', 'training_process', 'training_faq', 'training_cta', 'about_hero', 'about_story', 'about_stats', 'about_values', 'about_cta', 'contact_hero', 'contact_info', 'contact_form', 'blog_hero', 'blog_grid', 'blog_cta', 'projects_hero', 'projects_trust_bar', 'projects_grid', 'projects_client_stories', 'projects_tech_stack', 'projects_testimonials', 'projects_cta'].includes(formData.sectionKey) && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Section Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className={`w-full rounded-xl px-4 py-2.5 text-xs border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Subtitle Description</label>
                      <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Image or Video URL</label>
                      <input
                        type="text"
                        value={getCleanMediaValue(formData.mediaUrl)}
                        onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                        placeholder="No media uploaded — Click Upload or enter URL"
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-mono border ${
                          isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Form Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-500/10">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold border ${
                      isDark ? 'bg-[#1a2233] border-[#1f293d] text-slate-300 hover:bg-[#232d42]' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 transition"
                  >
                    Save & Update Live Site
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
