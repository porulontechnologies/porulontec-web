import { Op } from 'sequelize';
import Section from '../models/Section.js';

const cleanUrl = (url) => {
  if (!url) return '';
  return String(url).trim();
};

const mapSection = (sec) => {
  if (!sec) return null;
  const plain = sec.toJSON ? sec.toJSON() : sec;
  if (plain.mediaUrl) {
    plain.mediaUrl = cleanUrl(plain.mediaUrl);
  }
  if (Array.isArray(plain.items)) {
    plain.items = plain.items.map((it) => ({
      ...it,
      img: cleanUrl(it.img || it.mediaUrl),
      mediaUrl: cleanUrl(it.mediaUrl || it.img),
    }));
  }
  if (Array.isArray(plain.slides)) {
    plain.slides = plain.slides.map((sl) => ({
      ...sl,
      mediaUrl: cleanUrl(sl.mediaUrl || sl.img),
    }));
  }
  return { ...plain, _id: plain.id };
};

export const getSectionsByPage = async (req, res) => {
  try {
    const { page } = req.query;

    if (page === 'training' || !page || page === 'contact') {
      const existingTrainingProcess = await Section.findOne({ where: { page: 'training', sectionKey: 'training_process' } });
      if (!existingTrainingProcess) {
        await Section.create({
          page: 'training',
          sectionKey: 'training_process',
          kicker: 'Structured Learning Journey',
          title: 'Our 4-Phase Applied Methodology',
          subtitle: 'A structured, practitioner-led roadmap to turn foundational knowledge into enterprise software mastery.',
          layoutStyle: 'grid',
          order: 4,
          items: [
            { n: '01', title: 'Foundational Deep-Dive & Core Concepts', desc: 'Master core principles, algorithmic foundations, and industry tooling under practitioner guidance.' },
            { n: '02', title: 'Advanced Architecture & Microservices', desc: 'Design scalable systems, zero-trust security pipelines, and high-throughput backend APIs.' },
            { n: '03', title: 'Applied Production Capstone Sprint', desc: 'Engineer an end-to-end, portfolio-grade technical application solving a real-world enterprise challenge.' },
            { n: '04', title: 'Code Audit, Certification & Career Prep', desc: 'Undergo rigorous code reviews, receive technical certification, and access career placement support.' },
          ],
        });
      }

      const existingTrainingFaq = await Section.findOne({ where: { page: 'training', sectionKey: 'training_faq' } });
      if (!existingTrainingFaq) {
        await Section.create({
          page: 'training',
          sectionKey: 'training_faq',
          kicker: 'Training Inquiries',
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about cohort schedules, prerequisites, certifications, and career support.',
          layoutStyle: 'faq',
          order: 5,
          items: [
            { q: 'Who are these training tracks designed for?', a: 'Our programs cater to computer science students, working developers, and technology professionals seeking to master enterprise AI, cybersecurity, IoT, and full-stack engineering.' },
            { q: 'What is the format and duration of the cohorts?', a: 'Classes are offered in hybrid and live interactive online formats, typically spanning 8 to 12 weeks with flexible weekend or evening schedules.' },
            { q: 'Do participants receive hands-on project experience?', a: 'Yes! Every track includes a capstone engineering project where you build, deploy, and showcase real production software.' },
            { q: 'Is there career placement assistance provided?', a: 'Top-performing graduates receive resume optimization, technical interview prep, and direct referral connections to Porulon client partner networks.' },
          ],
        });
      }

      const existingContactHero = await Section.findOne({ where: { page: 'contact', sectionKey: 'contact_hero' } });
      if (!existingContactHero) {
        await Section.create({
          page: 'contact',
          sectionKey: 'contact_hero',
          kicker: 'Contact Porulon',
          title: "Let's Talk About Your Next Project",
          subtitle: 'Whether you need an enterprise AI platform, cloud architecture, operational automation, or strategic consultancy, our engineering directors are ready to assist.',
          mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop',
          layoutStyle: 'hero',
          order: 1,
          points: ['Direct Support', 'Enterprise SLA', 'Global Reach'],
        });
      } else if (!existingContactHero.mediaUrl) {
        await existingContactHero.update({ mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop' });
      }

      const existingContactInfo = await Section.findOne({ where: { page: 'contact', sectionKey: 'contact_info' } });
      if (!existingContactInfo) {
        await Section.create({
          page: 'contact',
          sectionKey: 'contact_info',
          kicker: 'CONNECT & VISIT',
          title: 'Direct Channels & Global HQ',
          subtitle: 'Coimbatore HQ • Keeranatham CHIL SEZ IT Park',
          content: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.0397397115257!2d76.99902397479613!3d11.110416252944882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7541fa58c0d%3A0x3ee79f1864250ea9!2sKumaran%20Nagar%20Keeranatham!5e0!3m2!1sen!2sin!4v1774456441458!5m2!1sen!2sin',
          layoutStyle: 'grid',
          order: 2,
          items: [
            { icon: 'HiOutlineEnvelope', title: 'Email Direct', desc: 'info@porulontech.com', sub: 'General & Proposal Requests', href: 'mailto:info@porulontech.com' },
            { icon: 'HiOutlinePhone', title: 'Sales & HR Phone', desc: 'Sales: +91 97918 82387 | HR: +91 99005 59922', sub: 'Mon-Fri, 9AM-6PM IST', href: 'tel:+919791882387' },
            { icon: 'HiOutlineMapPin', title: 'Coimbatore HQ', desc: '7/42, Kumaran Nagar, Keeranatham, Coimbatore 641035, TN', sub: 'CHIL SEZ IT Park Hub', href: 'https://www.google.com/maps?q=Kumaran+Nagar+Keeranatham+Coimbatore' },
            { icon: 'HiOutlineClock', title: '24h SLA Guarantee', desc: 'Within 24 Business Hours', sub: 'Architect-Led Response', href: '' },
          ],
        });
      }

      const existingContactForm = await Section.findOne({ where: { page: 'contact', sectionKey: 'contact_form' } });
      if (!existingContactForm) {
        await Section.create({
          page: 'contact',
          sectionKey: 'contact_form',
          kicker: 'INQUIRY & CONSULTATION',
          title: 'Send Us A Message',
          subtitle: 'Share your project requirements or goals and our technical leads will get back to you.',
          mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
          layoutStyle: 'split',
          order: 3,
          items: [
            { icon: 'HiOutlineLockClosed', title: '100% NDA Protection', desc: 'Your proprietary datasets, technical specs, and AI models remain strictly confidential under mutual NDA.' },
            { icon: 'HiOutlineClock', title: '24-Hour SLA Response', desc: 'Our principal solutions architects review and respond within 1 business day with actionable technical feedback.' },
            { icon: 'HiOutlineShieldCheck', title: 'Enterprise Security Audit', desc: 'Custom microservices and zero-trust security pipelines built for high-scale enterprise environments.' },
          ],
          points: ['AI & Machine Learning', 'Cloud Architecture', 'Academy Programs', 'General Inquiry'],
        });
      } else if (!existingContactForm.mediaUrl) {
        await existingContactForm.update({ mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop' });
      }
    }

    const where = {
      isActive: true,
      isArchived: { [Op.ne]: true },
    };
    if (page) where.page = page;

    const sections = await Section.findAll({
      where,
      order: [['updatedAt', 'DESC'], ['order', 'ASC']],
    });

    const uniqueMap = new Map();
    sections.forEach((sec) => {
      const key = sec.sectionKey || sec.id;
      if (key && !uniqueMap.has(key)) {
        uniqueMap.set(key, sec);
      }
    });

    return res.json(Array.from(uniqueMap.values()).map(mapSection));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllSections = async (req, res) => {
  try {
    const existingTrainingProcess = await Section.findOne({ where: { page: 'training', sectionKey: 'training_process' } });
    if (!existingTrainingProcess) {
      await Section.create({
        page: 'training',
        sectionKey: 'training_process',
        kicker: 'Structured Learning Journey',
        title: 'Our 4-Phase Applied Methodology',
        subtitle: 'A structured, practitioner-led roadmap to turn foundational knowledge into enterprise software mastery.',
        layoutStyle: 'grid',
        order: 4,
        items: [
          { n: '01', title: 'Foundational Deep-Dive & Core Concepts', desc: 'Master core principles, algorithmic foundations, and industry tooling under practitioner guidance.' },
          { n: '02', title: 'Advanced Architecture & Microservices', desc: 'Design scalable systems, zero-trust security pipelines, and high-throughput backend APIs.' },
          { n: '03', title: 'Applied Production Capstone Sprint', desc: 'Engineer an end-to-end, portfolio-grade technical application solving a real-world enterprise challenge.' },
          { n: '04', title: 'Code Audit, Certification & Career Prep', desc: 'Undergo rigorous code reviews, receive technical certification, and access career placement support.' },
        ],
      });
    }

    const existingTrainingFaq = await Section.findOne({ where: { page: 'training', sectionKey: 'training_faq' } });
    if (!existingTrainingFaq) {
      await Section.create({
        page: 'training',
        sectionKey: 'training_faq',
        kicker: 'Training Inquiries',
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about cohort schedules, prerequisites, certifications, and career support.',
        layoutStyle: 'faq',
        order: 5,
        items: [
          { q: 'Who are these training tracks designed for?', a: 'Our programs cater to computer science students, working developers, and technology professionals seeking to master enterprise AI, cybersecurity, IoT, and full-stack engineering.' },
          { q: 'What is the format and duration of the cohorts?', a: 'Classes are offered in hybrid and live interactive online formats, typically spanning 8 to 12 weeks with flexible weekend or evening schedules.' },
          { q: 'Do participants receive hands-on project experience?', a: 'Yes! Every track includes a capstone engineering project where you build, deploy, and showcase real production software.' },
          { q: 'Is there career placement assistance provided?', a: 'Top-performing graduates receive resume optimization, technical interview prep, and direct referral connections to Porulon client partner networks.' },
        ],
      });
    }

    const existingContactHero = await Section.findOne({ where: { page: 'contact', sectionKey: 'contact_hero' } });
    if (!existingContactHero) {
      await Section.create({
        page: 'contact',
        sectionKey: 'contact_hero',
        kicker: 'Contact Porulon',
        title: "Let's Talk About Your Next Project",
        subtitle: 'Whether you need an enterprise AI platform, cloud architecture, operational automation, or strategic consultancy, our engineering directors are ready to assist.',
        mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop',
        layoutStyle: 'hero',
        order: 1,
        points: ['Direct Support', 'Enterprise SLA', 'Global Reach'],
      });
    } else if (!existingContactHero.mediaUrl) {
      await existingContactHero.update({ mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop' });
    }

    const existingContactInfo = await Section.findOne({ where: { page: 'contact', sectionKey: 'contact_info' } });
    if (!existingContactInfo) {
      await Section.create({
        page: 'contact',
        sectionKey: 'contact_info',
        kicker: 'CONNECT & VISIT',
        title: 'Direct Channels & Global HQ',
        subtitle: 'Coimbatore HQ • Keeranatham CHIL SEZ IT Park',
        content: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.0397397115257!2d76.99902397479613!3d11.110416252944882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7541fa58c0d%3A0x3ee79f1864250ea9!2sKumaran%20Nagar%20Keeranatham!5e0!3m2!1sen!2sin!4v1774456441458!5m2!1sen!2sin',
        layoutStyle: 'grid',
        order: 2,
        items: [
          { icon: 'HiOutlineEnvelope', title: 'Email Direct', desc: 'info@porulontech.com', sub: 'General & Proposal Requests', href: 'mailto:info@porulontech.com' },
          { icon: 'HiOutlinePhone', title: 'Sales & HR Phone', desc: 'Sales: +91 97918 82387 | HR: +91 99005 59922', sub: 'Mon-Fri, 9AM-6PM IST', href: 'tel:+919791882387' },
          { icon: 'HiOutlineMapPin', title: 'Coimbatore HQ', desc: '7/42, Kumaran Nagar, Keeranatham, Coimbatore 641035, TN', sub: 'CHIL SEZ IT Park Hub', href: 'https://www.google.com/maps?q=Kumaran+Nagar+Keeranatham+Coimbatore' },
          { icon: 'HiOutlineClock', title: '24h SLA Guarantee', desc: 'Within 24 Business Hours', sub: 'Architect-Led Response', href: '' },
        ],
      });
    }

    const existingContactForm = await Section.findOne({ where: { page: 'contact', sectionKey: 'contact_form' } });
    if (!existingContactForm) {
      await Section.create({
        page: 'contact',
        sectionKey: 'contact_form',
        kicker: 'INQUIRY & CONSULTATION',
        title: 'Send Us A Message',
        subtitle: 'Share your project requirements or goals and our technical leads will get back to you.',
        mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
        layoutStyle: 'split',
        order: 3,
        items: [
          { icon: 'HiOutlineLockClosed', title: '100% NDA Protection', desc: 'Your proprietary datasets, technical specs, and AI models remain strictly confidential under mutual NDA.' },
          { icon: 'HiOutlineClock', title: '24-Hour SLA Response', desc: 'Our principal solutions architects review and respond within 1 business day with actionable technical feedback.' },
          { icon: 'HiOutlineShieldCheck', title: 'Enterprise Security Audit', desc: 'Custom microservices and zero-trust security pipelines built for high-scale enterprise environments.' },
        ],
        points: ['AI & Machine Learning', 'Cloud Architecture', 'Academy Programs', 'General Inquiry'],
      });
    } else if (!existingContactForm.mediaUrl) {
      await existingContactForm.update({ mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop' });
    }

    const sections = await Section.findAll({
      where: { isArchived: { [Op.ne]: true } },
      order: [['updatedAt', 'DESC'], ['order', 'ASC']],
    });

    const uniqueMap = new Map();
    sections.forEach((sec) => {
      const key = sec.sectionKey || sec.id;
      if (key && !uniqueMap.has(key)) {
        uniqueMap.set(key, sec);
      }
    });

    return res.json(Array.from(uniqueMap.values()).map(mapSection));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getArchivedSections = async (req, res) => {
  try {
    const archived = await Section.findAll({
      where: { isArchived: true },
      order: [['archivedAt', 'DESC']],
    });
    return res.json(archived.map(mapSection));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSection = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.title && payload.title.length > 100) {
      payload.title = payload.title.substring(0, 100);
    }
    if (payload.kicker && payload.kicker.length > 100) {
      payload.kicker = payload.kicker.substring(0, 100);
    }
    if (payload.badge && payload.badge.length > 100) {
      payload.badge = payload.badge.substring(0, 100);
    }
    if (payload.badgeTitle && payload.badgeTitle.length > 100) {
      payload.badgeTitle = payload.badgeTitle.substring(0, 100);
    }
    const section = await Section.create(payload);
    return res.status(201).json(mapSection(section));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    const payload = { ...req.body };
    if (payload.title && payload.title.length > 100) {
      payload.title = payload.title.substring(0, 100);
    }
    if (payload.kicker && payload.kicker.length > 100) {
      payload.kicker = payload.kicker.substring(0, 100);
    }
    if (payload.badge && payload.badge.length > 100) {
      payload.badge = payload.badge.substring(0, 100);
    }
    if (payload.badgeTitle && payload.badgeTitle.length > 100) {
      payload.badgeTitle = payload.badgeTitle.substring(0, 100);
    }

    await section.update(payload);

    if (section.sectionKey) {
      await Section.update(payload, {
        where: { sectionKey: section.sectionKey }
      });
    }

    return res.json(mapSection(section));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    await section.update({ isArchived: true, archivedAt: new Date() });
    return res.json({ message: 'Section moved to Trash Bin successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const restoreSection = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    await section.update({ isArchived: false, archivedAt: null });
    return res.json({ message: 'Section restored from Trash Bin successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const permanentDeleteSection = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    await section.destroy();
    return res.json({ message: 'Section permanently deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const restoreDefaults = async (req, res) => {
  try {
    const { page = 'home' } = req.body;
    
    const homeSections = [
      {
        page: 'home',
        sectionKey: 'hero',
        kicker: 'AI Engineering & Digital Solutions',
        title: 'Building Enterprise AI Systems, Cloud Applications, & Hardware Automation',
        subtitle: 'From custom machine learning models to high-throughput cloud infrastructure and smart IoT hardware.',
        mediaUrl: '',
        layoutStyle: 'hero',
        order: 1,
        buttons: [
          { label: 'Start Your Project', link: '/contact', variant: 'primary' },
          { label: 'Talk to an Expert', link: '/contact', variant: 'ghost' },
        ],
      },
      {
        page: 'home',
        sectionKey: 'tech_stacks_marquee',
        kicker: 'Tech Stack & Core Capabilities',
        title: 'Engineered with Industry-Leading Technologies',
        subtitle: 'Our battle-tested stack powers resilient enterprise architectures.',
        layoutStyle: 'marquee',
        order: 2,
        items: [
          { name: 'PostgreSQL', icon: 'SiPostgresql' },
          { name: 'Node.js', icon: 'SiNodedotjs' },
          { name: 'MongoDB', icon: 'SiMongodb' },
          { name: 'TypeScript', icon: 'SiTypescript' },
          { name: 'React', icon: 'SiReact' },
          { name: 'CSS', icon: 'SiCss' },
          { name: 'HTML5', icon: 'SiHtml5' },
          { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
          { name: 'Embedded Systems', icon: 'SiRaspberrypi' },
        ],
      },
      {
        page: 'home',
        sectionKey: 'about_preview',
        kicker: 'About Porulon',
        title: 'Bridging Complex Engineering & Digital Transformation',
        subtitle: 'Porulon Technologies is an enterprise innovation studio specializing in AI engineering, cloud scalability, and IoT systems.',
        mediaUrl: '',
        layoutStyle: 'split',
        order: 3,
        buttons: [{ label: 'Learn More About Our Mission', link: '/about', variant: 'primary' }],
      },
      {
        page: 'home',
        sectionKey: 'featured_services',
        kicker: 'Full-Spectrum Capabilities',
        title: 'Full-Spectrum Technical Capabilities',
        subtitle: 'Comprehensive technology solutions tailored to accelerate enterprise growth.',
        layoutStyle: 'carousel3d',
        order: 4,
        items: [
          { name: 'AI & Machine Learning', title: 'AI & Machine Learning', desc: 'Custom AI models, natural language processing, predictive analytics, and automated decision engines.', img: '' },
          { name: 'Cloud Infrastructure & Scalability', title: 'Cloud Infrastructure & Scalability', desc: 'High-availability microservices architectures, Kubernetes orchestration, and serverless deployments.', img: '' },
          { name: 'Enterprise Fullstack Web Apps', title: 'Enterprise Fullstack Web Apps', desc: 'High-performance React/Node web platforms, real-time dashboards, and micro-frontend design systems.', img: '' },
          { name: 'Cybersecurity & Auditing', title: 'Cybersecurity & Auditing', desc: 'Zero-trust security models, vulnerability assessments, penetration testing, and compliance hardening.', img: '' },
          { name: 'Smart IoT & Embedded Hardware', title: 'Smart IoT & Embedded Hardware', desc: 'Custom IoT telemetry, industrial sensor integrations, edge computing, and real-time microcontroller firmware.', img: '' },
          { name: 'Mobile App Ecosystems', title: 'Mobile App Ecosystems', desc: 'Cross-platform iOS and Android mobile solutions with offline sync and native performance.', img: '' },
        ],
      },
      {
        page: 'home',
        sectionKey: 'industries_carousel',
        kicker: 'Industry Focus',
        title: 'Industries We Empower',
        subtitle: 'Domain-specific software architectures engineered for highly regulated and high-scale sectors.',
        layoutStyle: 'carousel',
        order: 5,
        items: [
          { index: '01', title: 'Healthcare & Life Sciences', tag: 'Health Tech', desc: 'AI-driven diagnostics, predictive health models, and HIPAA-compliant data security.', img: '', color: '#38bdf8' },
          { index: '02', title: 'Finance & Banking', tag: 'Fintech & Web3', desc: 'High-frequency trading architectures, real-time fraud detection, and zero-trust encryption.', img: '', color: '#818cf8' },
          { index: '03', title: 'Smart Manufacturing', tag: 'Industry 4.0', desc: 'Predictive telemetry, smart IoT sensor networks, and automated robotic control pipelines.', img: '', color: '#f59e0b' },
          { index: '04', title: 'E-Commerce & Retail', tag: 'Retail Tech', desc: 'Hyper-personalized recommendation engines, instant checkout microservices, and inventory sync.', img: '', color: '#ec4899' },
          { index: '05', title: 'Cybersecurity & Defense', tag: 'Defense Tech', desc: 'Zero-trust network architectures, threat intelligence feeds, and air-gapped data vaults.', img: '', color: '#10b981' },
          { index: '06', title: 'Cloud & Enterprise SaaS', tag: 'SaaS Platforms', desc: 'Multi-tenant SaaS architectures, usage-based billing engines, and SLA monitoring.', img: '', color: '#a855f7' },
        ],
      },
      {
        page: 'home',
        sectionKey: 'why_choose_us',
        kicker: 'Our Edge',
        title: 'Why Enterprise Leaders Choose Us',
        subtitle: 'We combine deep technical mastery with agile execution to deliver mission-critical software.',
        mediaUrl: '',
        layoutStyle: 'grid',
        order: 6,
        items: [
          { title: '3x Faster Time-to-Market', badge: '3x Faster Delivery', desc: 'Rapid prototype-to-production pipelines backed by automated testing and CI/CD mastery.' },
          { title: 'SOC 2 & ISO Standards', badge: 'Bank-Grade Security', desc: 'Zero-trust architecture ensuring data protection, compliance, and end-to-end encryption.' },
          { title: 'Senior Technical Leadership', badge: 'Senior Architects', desc: 'Direct engagement with principal architects who take full accountability for your codebase.' },
        ],
      },
      {
        page: 'home',
        sectionKey: 'final_cta',
        kicker: 'Start Your Digital Transformation',
        title: 'Ready to Build the Future?',
        subtitle: "Join leading enterprise partners already leveraging Porulon's engineering mastery, AI innovation, and cloud scalability.",
        layoutStyle: 'banner',
        order: 7,
        buttons: [
          { label: 'Start Your Project', link: '/contact' },
          { label: 'Talk to an Expert', link: '/contact' },
        ],
      },
    ];

    const industriesSections = [
      {
        page: 'industries',
        sectionKey: 'industries_hero',
        kicker: 'Cross-Sector Solutions',
        title: 'Transforming Every Sector With Intelligent Technology',
        subtitle: 'Our AI and automation platforms are purpose-built to solve high-impact challenges, regulatory constraints, and operational bottlenecks across global enterprise sectors.',
        mediaUrl: '',
        layoutStyle: 'hero',
        order: 1,
        stats: [
          { label: 'Sectors Served', value: '12+' },
          { label: 'Uptime & Reliability', value: '99.9%' },
          { label: 'Custom AI Models', value: '100%' },
        ],
        buttons: [
          { label: 'Explore Industries', link: '#industries-list' },
          { label: 'Schedule Consultation', link: '/contact' },
        ],
      },
      {
        page: 'industries',
        sectionKey: 'industries_grid',
        kicker: 'Target Markets',
        title: 'Industries We Empower',
        subtitle: 'Domain-specific software architectures engineered for highly regulated and high-scale sectors.',
        layoutStyle: 'grid',
        order: 2,
        items: [
          {
            title: 'Healthcare',
            name: 'Healthcare',
            category: 'Finance & Health',
            tagline: 'AI diagnostics, patient analytics & workflow automation',
            desc: 'From medical imaging analysis to drug discovery and patient outcome prediction, our healthcare AI solutions improve clinical accuracy.',
            points: ['Medical image analysis', 'Clinical decision support', 'Risk stratification', 'Drug interaction AI'],
            img: '',
            icon: 'HiOutlineHeart',
          },
          {
            title: 'Finance & Banking',
            name: 'Finance & Banking',
            category: 'Finance & Health',
            tagline: 'Fraud detection, risk modeling & algorithmic trading',
            desc: 'Our financial AI platforms process millions of transactions in real-time, identifying patterns invisible to human analysts.',
            points: ['Real-time fraud detection', 'Credit risk modeling', 'Algorithmic trading', 'Compliance automation'],
            img: '',
            icon: 'HiOutlineBanknotes',
          },
          {
            title: 'Supply Chain & Logistics',
            name: 'Supply Chain & Logistics',
            category: 'Operations & Logistics',
            tagline: 'Predictive routing, demand forecasting & warehouse IoT',
            desc: 'End-to-end supply chain visibility powered by machine learning algorithms that optimize inventory levels and predict delivery delays.',
            points: ['Demand forecasting', 'Dynamic route optimization', 'Warehouse automation', 'Fleet telemetry AI'],
            img: '',
            icon: 'HiOutlineTruck',
          },
          {
            title: 'Retail & E-Commerce',
            name: 'Retail & E-Commerce',
            category: 'Digital & Security',
            tagline: 'Personalization engines, dynamic pricing & visual search',
            desc: 'Deliver individualized shopping experiences to millions of users simultaneously with real-time recommendation systems.',
            points: ['Hyper-personalization', 'Dynamic price optimization', 'Visual product search', 'Automated support bots'],
            img: '',
            icon: 'HiOutlineShoppingCart',
          },
          {
            title: 'Smart Manufacturing',
            name: 'Smart Manufacturing',
            category: 'Operations & Logistics',
            tagline: 'Predictive maintenance, computer vision QA & digital twins',
            desc: 'Transform factory operations with Industry 4.0 IoT sensors and computer vision models that detect defects in milliseconds.',
            points: ['Predictive maintenance', 'Visual defect inspection', 'Yield optimization', 'Supply chain twin'],
            img: '',
            icon: 'HiOutlineBuildingOffice2',
          },
          {
            title: 'Aerospace & Defense',
            name: 'Aerospace & Defense',
            category: 'Operations & Logistics',
            tagline: 'Mission critical analytics, autonomous flight & air-gap security',
            desc: 'High-reliability software architectures engineered to meet strict military-grade security compliance and zero-trust telemetry.',
            points: ['Autonomous systems', 'Mission analytics', 'Air-gapped security', 'Telemetry diagnostics'],
            img: '',
            icon: 'HiOutlineShieldCheck',
          },
        ],
      },
      {
        page: 'industries',
        sectionKey: 'industries_cta',
        kicker: 'Custom Architectural Engagements',
        title: "Don't See Your Industry?",
        subtitle: 'Our AI and engineering capabilities span bespoke enterprise domains. Connect with our technical directors to build custom AI architectures for your niche sector.',
        layoutStyle: 'banner',
        order: 3,
        buttons: [
          { label: 'Talk to Our Team', link: '/contact' },
          { label: 'View Our Services', link: '/services' },
        ],
      },
    ];

    const servicesSections = [
      {
        page: 'services',
        sectionKey: 'services_hero',
        kicker: 'Our Core Capabilities',
        title: 'AI, IoT, Web, Mobile & Cybersecurity Solutions',
        subtitle: 'Comprehensive technology services spanning Artificial Intelligence, Cloud infrastructure, full-stack development, cybersecurity, automation, and technical academy training.',
        mediaUrl: '',
        layoutStyle: 'hero',
        order: 1,
        buttons: [
          { label: 'Explore Services', link: '#services-grid' },
          { label: 'Talk to Our Team', link: '/contact' }
        ],
      },
      {
        page: 'services',
        sectionKey: 'services_grid',
        kicker: 'Engineering Expertise',
        title: 'Explore Our Services',
        subtitle: 'Specialized enterprise technology capabilities built to accelerate digital transformation.',
        layoutStyle: 'grid',
        order: 2,
        items: [
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
        ],
      },
      {
        page: 'services',
        sectionKey: 'services_process',
        kicker: 'Our Agile Process',
        title: 'How We Deliver Results',
        subtitle: 'A battle-tested methodology ensuring every intelligent application is delivered on schedule with maximum enterprise value.',
        layoutStyle: 'grid',
        order: 3,
        items: [
          { n: '01', title: 'Discovery', desc: 'We start by understanding your business objectives, data landscape, and technical environment to identify high-impact opportunities.' },
          { n: '02', title: 'Design & Architecture', desc: 'Our architects craft a tailored solution blueprint, selecting optimal algorithms, infrastructure, and integration APIs.' },
          { n: '03', title: 'Build & Iterate', desc: 'Agile development with bi-weekly demos ensures the solution evolves with continuous feedback and real-world testing.' },
          { n: '04', title: 'Deploy & Scale', desc: 'Production deployment with 24/7 monitoring, ongoing optimization, and dedicated enterprise support.' },
        ],
      },
      {
        page: 'services',
        sectionKey: 'services_cta',
        kicker: 'Start Your Innovation Journey',
        title: 'Ready to Transform Your Business With AI?',
        subtitle: 'Whether you are launching a new AI engine or upgrading legacy systems, our principal engineers are ready to build solutions built for scale.',
        layoutStyle: 'banner',
        order: 4,
        buttons: [
          { label: 'Start Your Project', link: '/contact' },
          { label: 'Talk to Our Team', link: '/contact' },
        ],
      },
    ];

    const trainingSections = [
      {
        page: 'training',
        sectionKey: 'training_hero',
        kicker: 'Porulon Academy',
        title: 'Industry-Ready Skills, Taught By Practitioners',
        subtitle: 'Hands-on, mentor-led technical training programs in AI & ML, Cybersecurity, IoT, and Full-Stack Development — built to bridge the gap between academic theory and enterprise engineering.',
        mediaUrl: '',
        layoutStyle: 'hero',
        order: 1,
        buttons: [
          { label: 'Explore Tracks', link: '#training-grid' },
          { label: 'Talk to Our Team', link: '/contact' },
        ],
      },
      {
        page: 'training',
        sectionKey: 'training_tracks',
        kicker: 'Curriculum Tracks',
        title: 'Explore Our Training Tracks',
        subtitle: 'Hands-on bootcamps engineered to build production-grade software portfolios.',
        layoutStyle: 'grid',
        order: 2,
        items: [
          {
            slug: 'ai-ml',
            title: 'AI & Machine Learning Engineering',
            shortDesc: 'Master Python, PyTorch, Scikit-Learn, and MLOps. Build predictive models, neural networks, and generative AI apps.',
            duration: '12 Weeks',
            level: 'Intermediate to Advanced',
            img: '',
            icon: 'HiOutlineSparkles',
          },
          {
            slug: 'cybersecurity',
            title: 'Cybersecurity & Zero-Trust Defense',
            shortDesc: 'Learn network security, ethical hacking, SOC monitoring, penetration testing, and ISO compliance.',
            duration: '10 Weeks',
            level: 'Beginner to Advanced',
            img: '',
            icon: 'HiOutlineShieldCheck',
          },
          {
            slug: 'iot',
            title: 'IoT & Industrial Automation',
            shortDesc: 'Hands-on embedded C/C++, Raspberry Pi, ESP32, sensor telemetry, and MQTT cloud integration.',
            duration: '8 Weeks',
            level: 'All Levels',
            img: '',
            icon: 'HiOutlineRadio',
          },
          {
            slug: 'full-stack',
            title: 'Full-Stack Web & Mobile Development',
            shortDesc: 'Master React, Node.js, Express, PostgreSQL, and React Native. Build full-stack enterprise web & mobile applications.',
            duration: '14 Weeks',
            level: 'Beginner to Advanced',
            img: '',
            icon: 'HiOutlineDevicePhoneMobile',
          },
        ],
      },
      {
        page: 'training',
        sectionKey: 'training_why_us',
        kicker: 'Why Porulon Training',
        title: 'Learning Built For Real Careers',
        subtitle: 'A battle-tested training environment that prepares engineers for top-tier technology roles.',
        layoutStyle: 'grid',
        order: 3,
        items: [
          { title: 'Mentor-Led', desc: 'Learn directly from principal AI, cybersecurity, and cloud engineers.', icon: 'HiOutlineUserGroup' },
          { title: 'Certification', desc: 'Earn a recognized certificate of technical mastery upon completion.', icon: 'HiOutlineAcademicCap' },
          { title: 'Project-Based', desc: 'Build production-ready, portfolio-grade AI software applications.', icon: 'HiOutlineWrenchScrewdriver' },
          { title: 'Career Support', desc: 'Placement assistance and resume reviews for top-performing engineers.', icon: 'HiOutlineBriefcase' },
        ],
      },
      {
        page: 'training',
        sectionKey: 'training_process',
        kicker: 'Structured Learning Journey',
        title: 'Our 4-Phase Applied Methodology',
        subtitle: 'A structured, practitioner-led roadmap to turn foundational knowledge into enterprise software mastery.',
        layoutStyle: 'grid',
        order: 4,
        items: [
          { n: '01', title: 'Foundational Deep-Dive & Core Concepts', desc: 'Master core principles, algorithmic foundations, and industry tooling under practitioner guidance.' },
          { n: '02', title: 'Advanced Architecture & Microservices', desc: 'Design scalable systems, zero-trust security pipelines, and high-throughput backend APIs.' },
          { n: '03', title: 'Applied Production Capstone Sprint', desc: 'Engineer an end-to-end, portfolio-grade technical application solving a real-world enterprise challenge.' },
          { n: '04', title: 'Code Audit, Certification & Career Prep', desc: 'Undergo rigorous code reviews, receive technical certification, and access career placement support.' },
        ],
      },
      {
        page: 'training',
        sectionKey: 'training_faq',
        kicker: 'Training Inquiries',
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about cohort schedules, prerequisites, certifications, and career support.',
        layoutStyle: 'faq',
        order: 5,
        items: [
          { q: 'Who are these training tracks designed for?', a: 'Our programs cater to computer science students, working developers, and technology professionals seeking to master enterprise AI, cybersecurity, IoT, and full-stack engineering.' },
          { q: 'What is the format and duration of the cohorts?', a: 'Classes are offered in hybrid and live interactive online formats, typically spanning 8 to 12 weeks with flexible weekend or evening schedules.' },
          { q: 'Do participants receive hands-on project experience?', a: 'Yes! Every track includes a capstone engineering project where you build, deploy, and showcase real production software.' },
          { q: 'Is there career placement assistance provided?', a: 'Top-performing graduates receive resume optimization, technical interview prep, and direct referral connections to Porulon client partner networks.' },
        ],
      },
      {
        page: 'training',
        sectionKey: 'training_cta',
        kicker: 'Accelerate Your Career',
        title: 'Ready to Upskill?',
        subtitle: 'Explore our upcoming training cohorts or reach out to discuss custom corporate upskilling for your engineering team.',
        layoutStyle: 'banner',
        order: 6,
        buttons: [
          { label: 'Enroll Now', link: '/contact' },
          { label: 'Talk to Our Team', link: '/contact' },
        ],
      },
    ];

    const aboutSections = [
      {
        page: 'about',
        sectionKey: 'about_hero',
        kicker: 'About Porulon Technologies',
        title: 'Where Deep Tech Meets A Human-Centric Mindset',
        subtitle: 'We are a forward-thinking technology company specializing in AI, Machine Learning, and automation-based software solutions. Our mission is to optimize enterprise processes, enhance operational efficiency, and train the next generation of tech leaders.',
        mediaUrl: '',
        layoutStyle: 'hero',
        order: 1,
        buttons: [
          { label: 'Explore Our Story', link: '#our-story' },
          { label: 'Contact Leadership', link: '/contact' },
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
          { n: '99.9%', l: 'System Uptime' },
        ],
      },
      {
        page: 'about',
        sectionKey: 'about_story',
        kicker: 'Our Journey & Conviction',
        title: 'Built On One Clear Conviction',
        subtitle: 'Porulon Technologies was founded with a clear conviction: that the transformative power of Artificial Intelligence and Machine Learning should be accessible to businesses of every size.',
        content: 'We specialize in designing, developing, and deploying AI, ML, and automation-based software solutions and cloud-based systems.',
        badgeTitle: 'Established 2026',
        badgeSubtitle: 'Delivering Intelligent Solutions',
        mediaUrl: '',
        layoutStyle: 'split',
        order: 2,
        points: [
          'Bespoke AI Models',
          'Enterprise Automation',
          'Academy Programs',
        ],
      },
      {
        page: 'about',
        sectionKey: 'about_stats',
        kicker: 'Proven Track Record',
        title: 'Impact In Numbers',
        subtitle: 'Quantifiable engineering performance across high-stakes client deployments.',
        layoutStyle: 'grid',
        order: 3,
        items: [
          { n: '15+', l: 'Projects Delivered', icon: 'HiOutlineRocketLaunch' },
          { n: '10+', l: 'Enterprise Clients', icon: 'HiOutlineBuildingOffice2' },
          { n: '3+', l: 'Industries Served', icon: 'HiOutlineGlobeAlt' },
          { n: '500+', l: 'Students Trained', icon: 'HiOutlineAcademicCap' },
          { n: '99.9%', l: 'System Uptime', icon: 'HiOutlineShieldCheck' },
          { n: '10+', l: 'AI/ML Engineers', icon: 'HiOutlineCpuChip' },
        ],
      },
      {
        page: 'about',
        sectionKey: 'about_values',
        kicker: 'Our Values',
        title: 'The Principles That Guide Everything We Build',
        subtitle: 'Core engineering ethics and client-first principles driving our innovation.',
        layoutStyle: 'grid',
        order: 4,
        items: [
          { icon: 'HiOutlineSparkles', title: 'Mission-Driven', desc: 'We build technology that solves real problems and delivers measurable business outcomes for every client.' },
          { icon: 'HiOutlineLightBulb', title: 'Innovation First', desc: 'Continuous R&D ensures our solutions leverage the latest advancements in AI, ML, and automation.' },
          { icon: 'HiOutlineUsers', title: 'People-Centric', desc: 'From training young minds to empowering enterprise teams, people are at the heart of everything we do.' },
          { icon: 'HiOutlineShieldCheck', title: 'Trusted & Secure', desc: 'Enterprise-grade security and compliance standards protect your data and operations at every layer.' },
          { icon: 'HiOutlineHandRaised', title: 'Client Partnership', desc: "We view every engagement as a long-term partnership, aligning our success with our clients' growth." },
          { icon: 'HiOutlineGlobeAlt', title: 'Global Perspective', desc: 'We serve diverse industries worldwide, bringing cross-sector insights to every solution we build.' },
        ],
      },
      {
        page: 'about',
        sectionKey: 'about_cta',
        kicker: 'Careers & Culture',
        title: 'Shape The Future Of Intelligent Tech',
        subtitle: 'We are always looking for visionary engineers, researchers, and thinkers passionate about solving complex enterprise challenges and building the future of AI.',
        layoutStyle: 'banner',
        order: 5,
        buttons: [
          { label: 'Explore Careers', link: '/contact' },
          { label: 'Contact Talent Team', link: '/contact' },
        ],
        points: [
          'Cutting-Edge R&D Projects',
          'Continuous Learning & Mentorship',
          'Global Impact & Hybrid Work',
        ],
      },
    ];

    const contactSections = [
      {
        page: 'contact',
        sectionKey: 'contact_hero',
        kicker: 'Contact Porulon',
        title: "Let's Talk About Your Next Project",
        subtitle: 'Whether you need an enterprise AI platform, cloud architecture, operational automation, or strategic consultancy, our engineering directors are ready to assist.',
        mediaUrl: '',
        layoutStyle: 'hero',
        order: 1,
        points: [
          'Direct Support',
          'Enterprise SLA',
          'Global Reach',
        ],
      },
      {
        page: 'contact',
        sectionKey: 'contact_info',
        kicker: 'Connect & Visit',
        title: 'Direct Channels & Global HQ',
        subtitle: 'Coimbatore HQ • Keeranatham IT Hub',
        content: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.0397397115257!2d76.99902397479613!3d11.110416252944882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7541fa58c0d%3A0x3ee79f1864250ea9!2sKumaran%20Nagar%20Keeranatham!5e0!3m2!1sen!2sin!4v1774456441458!5m2!1sen!2sin',
        layoutStyle: 'grid',
        order: 2,
        items: [
          {
            icon: 'HiOutlineEnvelope',
            title: 'Email Us',
            desc: 'info@porulontech.com',
            sub: 'For general inquiries, quotes & proposals',
            actionText: 'Send Email',
            href: 'mailto:info@porulontech.com',
          },
          {
            icon: 'HiOutlinePhone',
            title: 'Call Sales & HR',
            desc: 'Sales: +91 97918 82387 | HR: +91 99005 59922',
            sub: 'Mon to Fri, 9:00 AM – 6:00 PM IST',
            actionText: 'Call Direct',
            href: 'tel:+919791882387',
          },
          {
            icon: 'HiOutlineMapPin',
            title: 'Corporate Headquarters',
            desc: 'Porulon Technologies Pvt. Ltd., 7/42, Kumaran Nagar, Keeranatham, Coimbatore, Tamil Nadu 641035',
            sub: 'CHIL SEZ IT Park Hub',
            actionText: 'Get Directions',
            href: 'https://www.google.com/maps?q=Kumaran+Nagar+Keeranatham+Coimbatore',
          },
          {
            icon: 'HiOutlineClock',
            title: 'SLA Response Guarantee',
            desc: 'Within 24 Business Hours',
            sub: 'Dedicated project managers respond promptly',
            actionText: '24h SLA Guarantee',
            href: '',
          },
          {
            icon: 'HiOutlineGlobeAlt',
            title: 'Global Remote Delivery',
            desc: 'Serving Clients Worldwide',
            sub: 'Seamless multi-timezone agile collaboration',
            actionText: 'Global Operations',
            href: '',
          },
        ],
      },
      {
        page: 'contact',
        sectionKey: 'contact_form',
        kicker: 'Get In Touch',
        title: 'Send Us A Message',
        subtitle: 'Share your project requirements or goals and our technical leads will get back to you.',
        layoutStyle: 'split',
        order: 3,
        items: [
          {
            icon: 'HiOutlineLockClosed',
            title: '100% NDA Protected Consultation',
            desc: 'Your proprietary data, AI roadmap, and technical specs remain completely confidential.',
          },
          {
            icon: 'HiOutlineClock',
            title: '24-Hour SLA Response',
            desc: 'Our senior technical leads and solution architects respond within 1 business day.',
          },
          {
            icon: 'HiOutlineShieldCheck',
            title: 'Enterprise Architecture Guarantee',
            desc: 'Tailored AI models, cloud infrastructure, and zero-trust security engineered for scale.',
          },
        ],
        points: [
          'AI & Machine Learning',
          'Cloud Architecture',
          'Academy Programs',
          'General Inquiry',
        ],
      },
    ];

    const blogSections = [
      {
        page: 'blog',
        sectionKey: 'blog_hero',
        kicker: 'Porulon Insights & Engineering',
        title: 'Thought Leadership In Deep Tech & Enterprise AI',
        subtitle: 'In-depth architectural guides, research papers, and technical analysis authored by Porulon principal engineers and researchers.',
        mediaUrl: '',
        layoutStyle: 'hero',
        order: 1,
        points: ['Architecture Case Studies', 'AI & ML Benchmarks', 'Zero-Trust Cloud'],
      },
      {
        page: 'blog',
        sectionKey: 'blog_grid',
        kicker: 'Latest Articles',
        title: 'Explore Technical Publications',
        subtitle: 'Search and filter our latest engineering deep-dives across AI, Cloud, Cybersecurity, and IoT.',
        layoutStyle: 'grid',
        order: 2,
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
      },
      {
        page: 'blog',
        sectionKey: 'blog_cta',
        kicker: 'Stay Informed',
        title: 'Subscribe To Technical Insights',
        subtitle: 'Get our latest architectural whitepapers and enterprise AI benchmarks delivered to your inbox.',
        layoutStyle: 'banner',
        order: 3,
        buttons: [
          { label: 'Subscribe Newsletter', link: '/contact' },
          { label: 'Talk to Our Team', link: '/contact' },
        ],
      },
    ];

    const projectsSections = [
      {
        page: 'projects',
        sectionKey: 'projects_hero',
        kicker: 'Enterprise Products & Client Engineering',
        title: 'Engineering Flagship Digital Products & Client Solutions',
        subtitle: 'Explore Porulon’s proprietary AI engines, IoT platforms, multi-cloud suites, and real-world enterprise projects delivered for leading global organizations.',
        layoutStyle: 'hero',
        order: 1,
        stats: [
          { label: 'Products & Projects', value: '120+' },
          { label: 'System Uptime SLA', value: '99.9%' },
          { label: 'Industry Verticals', value: '15+' },
          { label: 'Client Value Created', value: '$45M+' },
        ],
      },
      {
        page: 'projects',
        sectionKey: 'projects_trust_bar',
        kicker: 'Trusted by Engineering Leaders & Global Client Brands',
        title: 'Client Trust & Partner Brands',
        layoutStyle: 'marquee',
        order: 2,
        items: [
          { title: 'MedHealth Network', icon: 'HiOutlineBuildingOffice2' },
          { title: 'GlobalLogistics AP', icon: 'HiOutlineChartBar' },
          { title: 'Apex FinTech', icon: 'HiOutlineShieldCheck' },
          { title: 'AutoSmart Robotics', icon: 'HiOutlineCpuChip' },
          { title: 'CloudScale SaaS', icon: 'HiOutlineCloud' },
        ],
      },
      {
        page: 'projects',
        sectionKey: 'projects_grid',
        kicker: 'Proprietary Enterprise Software',
        title: 'Our Flagship Software Products',
        subtitle: 'Explore ready-to-deploy enterprise platforms built for high performance, scalability, and seamless integration.',
        layoutStyle: 'grid',
        order: 3,
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
            mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
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
            mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
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
            mediaUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
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
            mediaUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
          },
        ],
      },
      {
        page: 'projects',
        sectionKey: 'projects_client_stories',
        kicker: 'Proven Client Track Record',
        title: 'Featured Client Projects & Engineering',
        subtitle: 'Real-world custom software platforms engineered and delivered for enterprise client partners.',
        layoutStyle: 'grid',
        order: 4,
        items: [
          {
            client: 'GlobalLogistics Corp (Asia-Pacific)',
            title: 'AI Fleet Route Optimization & Automated Dispatch Platform',
            industry: 'Logistics & Supply Chain',
            desc: 'Architected and deployed a real-time AI dispatch system for 10,000+ delivery vehicles across 6 countries, reducing fuel costs by 22% and improving delivery speed by 35%.',
            impact: ['22% Fuel Savings', '10,000+ Vehicles Managed', 'Sub-second Route Calculation'],
          },
          {
            client: 'MedHealth Diagnostics Network',
            title: 'HIPAA-Certified Medical Imaging Scanner & Diagnostic Cloud',
            industry: 'Healthcare Tech',
            desc: 'Engineered a cloud-native radiological imaging portal serving 50+ hospital networks with automated AI lesion detection and instant doctor reporting.',
            impact: ['98.7% Diagnostic Accuracy', '50+ Hospital Networks', 'HIPAA & GDPR Certified'],
          },
          {
            client: 'Apex Banking & Financial Services',
            title: 'Omnichannel Microservices Core & Mobile Banking Platform',
            industry: 'FinTech & Banking',
            desc: 'Re-architected legacy banking core into modern cloud microservices handling 1.5 million daily transactions with zero downtime and sub-second payment settlement.',
            impact: ['1.5M Daily Transactions', '99.999% High Availability', 'Zero Payment Lag'],
          },
          {
            client: 'AutoSmart Robotics Manufacturing',
            title: 'Industrial IoT Telemetry Hub & Autonomous Factory Control',
            industry: 'Smart Manufacturing',
            desc: 'Integrated custom sensor hardware and SCADA dashboards for automated assembly line monitoring, enabling zero-touch machine maintenance.',
            impact: ['500+ Factory Sensors', 'Zero Unplanned Downtime', 'Real-Time SCADA Sync'],
          },
        ],
      },
      {
        page: 'projects',
        sectionKey: 'projects_tech_stack',
        kicker: 'Engineering Backbone',
        title: 'Production Tech Stack Architecture',
        subtitle: 'We build with battle-tested frameworks, modern cloud microservices, and AI pipelines.',
        layoutStyle: 'grid',
        order: 5,
      },
      {
        page: 'projects',
        sectionKey: 'projects_testimonials',
        kicker: 'Verified Executive Feedback',
        title: 'What Executive Leaders Say',
        layoutStyle: 'grid',
        order: 6,
        items: [
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
        ],
      },
      {
        page: 'projects',
        sectionKey: 'projects_security',
        kicker: 'Enterprise Governance',
        title: 'Built With Zero-Trust & Global Standards',
        layoutStyle: 'grid',
        order: 7,
      },
      {
        page: 'projects',
        sectionKey: 'projects_cta',
        kicker: 'Launch Your Solution',
        title: 'Ready to Deploy Our Products?',
        subtitle: 'Schedule a live product demonstration or consult with our solution architects to design your enterprise software strategy.',
        layoutStyle: 'banner',
        order: 8,
        buttons: [
          { label: 'Schedule Live Demo', link: '/contact' },
          { label: 'Request Product Proposal', link: '/contact' },
        ],
      },
    ];

    const targetList = (page === 'projects' || page === 'products') ? projectsSections : page === 'blog' ? blogSections : page === 'contact' ? contactSections : page === 'about' ? aboutSections : page === 'training' ? trainingSections : page === 'services' ? servicesSections : page === 'industries' ? industriesSections : homeSections;

    for (const secData of targetList) {
      const existing = await Section.findOne({
        where: { page: secData.page, sectionKey: secData.sectionKey },
      });
      if (existing) {
        await existing.update({ ...secData, isArchived: false, archivedAt: null });
      } else {
        await Section.create(secData);
      }
    }
    return res.json({ message: `Default sections for ${page} restored successfully` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
