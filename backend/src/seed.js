import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB, sequelize } from './config/db.js';
import User from './models/User.js';
import SiteSetting from './models/SiteSetting.js';
import Service from './models/Service.js';
import Training from './models/Training.js';
import Section from './models/Section.js';
import Media from './models/Media.js';

const initialServices = [
  {
    slug: 'ai-solutions',
    kicker: 'Custom intelligence, built for your business',
    title: 'AI-Powered Software Solutions',
    shortDesc: 'Intelligent document processing to predictive analytics.',
    desc: 'We design and develop bespoke AI applications that solve your most complex business challenges. From intelligent document processing and natural language interfaces to predictive analytics and computer vision systems.',
    points: [
      'Custom NLP and conversational AI systems',
      'Predictive analytics and forecasting models',
      'Computer vision for quality control and inspection',
      'Intelligent document processing and extraction',
      'AI-powered recommendation engines',
    ],
    img: '/images/service-ai.jpg',
    icon: 'smart_toy',
    order: 1,
  },
  {
    slug: 'ml-platforms',
    kicker: 'From raw data to actionable intelligence',
    title: 'Machine Learning Platforms',
    shortDesc: 'End-to-end ML pipelines for data-driven decisions.',
    desc: 'Our end-to-end ML platforms empower your data science teams with robust pipelines for data ingestion, feature engineering, model training, deployment, and continuous monitoring.',
    points: [
      'Automated ML pipeline orchestration',
      'Feature stores and data versioning',
      'Model registry and experiment tracking',
      'Real-time and batch inference engines',
    ],
    img: '/images/service-cloud.jpg',
    icon: 'network_intelligence',
    order: 2,
  },
  {
    slug: 'iot-automation',
    kicker: 'Connected systems, intelligent decisions',
    title: 'IoT Automation & Smart Solutions',
    shortDesc: 'Connected devices for manufacturing & enterprise.',
    desc: 'Transform your enterprise with Industrial IoT solutions featuring intelligent device automation, real-time monitoring, edge computing, and predictive maintenance.',
    points: [
      'Edge computing and intelligent orchestration',
      'Connected device network design and management',
      'Predictive maintenance with ML models',
    ],
    img: '/images/service-iot.jpg',
    icon: 'sensors',
    order: 3,
  },
  {
    slug: 'full-stack-development',
    kicker: 'Scalable applications across all platforms',
    title: 'Full-Stack Web & Mobile Apps',
    shortDesc: 'Scalable web and cross-platform mobile apps.',
    desc: 'Build powerful web and mobile applications with cutting-edge technology. From responsive web apps using React to native iOS and Android apps and cross-platform solutions.',
    points: [
      'Full-stack web development (React, Node.js, etc.)',
      'Native iOS and Android app development',
      'Cross-platform mobile solutions (React Native, Flutter)',
    ],
    img: '/images/service-fullstack.jpg',
    icon: 'devices',
    order: 4,
  },
];

const initialTraining = [
  {
    slug: 'ai-ml',
    kicker: 'Hands-on, mentor-led applied learning',
    title: 'AI & ML Training',
    shortDesc: 'Hands-on courses in applied machine learning.',
    desc: 'Our AI & ML training program takes learners from foundational concepts to production-ready skills.',
    points: ['Python for data science', 'Supervised & Deep Learning', 'Model Deployment MLOps', 'Capstone Project'],
    duration: '12 weeks',
    format: 'Live online / on-campus',
    level: 'Beginner to Intermediate',
    img: '/images/service-ai.jpg',
    icon: 'psychology',
    order: 1,
  },
  {
    slug: 'cybersecurity',
    kicker: 'Ethical hacking & compliance, taught right',
    title: 'Cybersecurity Training',
    shortDesc: 'Ethical hacking, pen-testing & compliance.',
    desc: 'Build in-demand security skills with our cybersecurity training track covering ethical hacking and compliance.',
    points: ['Network security fundamentals', 'Penetration testing labs', 'Compliance frameworks (GDPR, HIPAA)', 'Incident response'],
    duration: '10 weeks',
    format: 'Live online / on-campus',
    level: 'Beginner to Intermediate',
    img: '/images/service-cyber.jpg',
    icon: 'security',
    order: 2,
  },
];

const initialSections = [
  {
    page: 'home',
    sectionKey: 'hero',
    kicker: 'AI Engineering & Digital Solutions',
    title: 'Building Enterprise AI Systems, Cloud Applications, & Hardware Automation',
    subtitle: 'From custom machine learning models to high-throughput cloud infrastructure and smart IoT hardware.',
    mediaUrl: '/videos/hero2.mp4',
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
    mediaUrl: '/images/about-team.jpg',
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
      { name: 'AI & Machine Learning', title: 'AI & Machine Learning', desc: 'Custom AI models, natural language processing, predictive analytics, and automated decision engines.', img: '/images/service-ai.jpg' },
      { name: 'Cloud Infrastructure & Scalability', title: 'Cloud Infrastructure & Scalability', desc: 'High-availability microservices architectures, Kubernetes orchestration, and serverless deployments.', img: '/images/service-cloud.jpg' },
      { name: 'Enterprise Fullstack Web Apps', title: 'Enterprise Fullstack Web Apps', desc: 'High-performance React/Node web platforms, real-time dashboards, and micro-frontend design systems.', img: '/images/service-fullstack.jpg' },
      { name: 'Cybersecurity & Auditing', title: 'Cybersecurity & Auditing', desc: 'Zero-trust security models, vulnerability assessments, penetration testing, and compliance hardening.', img: '/images/service-cyber.jpg' },
      { name: 'Smart IoT & Embedded Hardware', title: 'Smart IoT & Embedded Hardware', desc: 'Custom IoT telemetry, industrial sensor integrations, edge computing, and real-time microcontroller firmware.', img: '/images/service-iot.jpg' },
      { name: 'Mobile App Ecosystems', title: 'Mobile App Ecosystems', desc: 'Cross-platform iOS and Android mobile solutions with offline sync and native performance.', img: '/images/service-mobile.jpg' },
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
      { index: '01', title: 'Healthcare & Life Sciences', tag: 'Health Tech', desc: 'AI-driven diagnostics, predictive health models, and HIPAA-compliant data security.', img: '/images/industry-healthcare.jpg', color: '#38bdf8' },
      { index: '02', title: 'Finance & Banking', tag: 'Fintech & Web3', desc: 'High-frequency trading architectures, real-time fraud detection, and zero-trust encryption.', img: '/images/industry-finance.jpg', color: '#818cf8' },
      { index: '03', title: 'Smart Manufacturing', tag: 'Industry 4.0', desc: 'Predictive telemetry, smart IoT sensor networks, and automated robotic control pipelines.', img: '/images/industry-manufacturing.png', color: '#f59e0b' },
      { index: '04', title: 'E-Commerce & Retail', tag: 'Retail Tech', desc: 'Hyper-personalized recommendation engines, instant checkout microservices, and inventory sync.', img: '/images/industry-ecommerence.png', color: '#ec4899' },
      { index: '05', title: 'Cybersecurity & Defense', tag: 'Defense Tech', desc: 'Zero-trust network architectures, threat intelligence feeds, and air-gapped data vaults.', img: '/images/service-cyber.jpg', color: '#10b981' },
      { index: '06', title: 'Cloud & Enterprise SaaS', tag: 'SaaS Platforms', desc: 'Multi-tenant SaaS architectures, usage-based billing engines, and SLA monitoring.', img: '/images/service-cloud.jpg', color: '#a855f7' },
    ],
  },
  {
    page: 'home',
    sectionKey: 'why_choose_us',
    kicker: 'Our Edge',
    title: 'Why Enterprise Leaders Choose Us',
    subtitle: 'We combine deep technical mastery with agile execution to deliver mission-critical software.',
    mediaUrl: '/videos/ai-video.mp4',
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
    sectionKey: 'services_hero',
    kicker: 'Next-Gen Engineering & Intelligence',
    title: 'Transforming Enterprises with AI, Cloud, and Smart IoT',
    subtitle: 'From predictive intelligence to high-throughput cloud infrastructure, we engineer mission-critical solutions.',
    mediaUrl: '/images/hero-visual.jpg',
    layoutStyle: 'hero',
    order: 1,
    buttons: [{ label: 'Discuss Your Project', link: '/contact' }],
  },
  {
    page: 'services',
    sectionKey: 'services_process',
    kicker: 'Our Methodology',
    title: 'How We Build Enterprise-Grade Software',
    subtitle: 'A structured, agile development process from discovery to production scale.',
    layoutStyle: 'steps',
    order: 3,
  },
  {
    page: 'services',
    sectionKey: 'services_cta',
    kicker: 'Start Today',
    title: 'Ready to Accelerate Your Enterprise Roadmap?',
    subtitle: 'Partner with our senior software architects to engineer scalable, production-ready solutions.',
    layoutStyle: 'banner',
    order: 4,
    buttons: [{ label: 'Schedule Architecture Consultation', link: '/contact' }],
  },
  {
    page: 'training',
    sectionKey: 'training_hero',
    kicker: 'Porulon Academy',
    title: 'Master Enterprise AI, Cybersecurity, and Cloud Engineering',
    subtitle: 'Hands-on, practitioner-led engineering cohorts designed for developers and tech teams.',
    mediaUrl: '/images/service-academy.jpg',
    layoutStyle: 'hero',
    order: 1,
    buttons: [{ label: 'Explore Programs', link: '#tracks' }],
  },
  {
    page: 'training',
    sectionKey: 'training_why_us',
    kicker: 'Why Choose Us',
    title: 'Why Engineers Choose Porulon Academy',
    subtitle: 'Direct practitioner mentorship, production capstone building, and industry-standard certification.',
    layoutStyle: 'grid',
    order: 2,
  },
  {
    page: 'training',
    sectionKey: 'training_process',
    kicker: 'Learning Path',
    title: 'The Cohort Learning Journey',
    subtitle: 'A proven step-by-step path from core foundations to production-grade deployment.',
    layoutStyle: 'steps',
    order: 3,
  },
  {
    page: 'training',
    sectionKey: 'training_faq',
    kicker: 'Frequently Asked Questions',
    title: 'Got Questions? We Have Answers',
    subtitle: 'Everything you need to know about our training programs, cohort format, and career support.',
    layoutStyle: 'faq',
    order: 4,
  },
  {
    page: 'training',
    sectionKey: 'training_cta',
    kicker: 'Level Up',
    title: 'Ready to Accelerate Your Tech Career?',
    subtitle: 'Join upcoming engineering cohorts led by industry principal architects.',
    layoutStyle: 'banner',
    order: 5,
    buttons: [{ label: 'Apply for Next Cohort', link: '/contact' }],
  },
];

async function seedData() {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error(`❌ Could not connect to PostgreSQL!`);
      process.exit(1);
    }

    // Sync PostgreSQL Tables automatically
    await sequelize.sync({ alter: true });
    console.log(`[PostgreSQL] Sequelize Models Synced Successfully`);

    // Seed Admin User safely
    const existingUser = await User.findOne({ where: { email: 'admin@porulon.com' } });
    if (!existingUser) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@porulon.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log(`[Seed] Admin user created in PostgreSQL: admin@porulon.com / admin123`);
    } else {
      console.log(`[Seed] Admin user already exists in PostgreSQL (preserved)`);
    }

    // Seed Site Settings safely
    const existingSettings = await SiteSetting.findOne();
    if (!existingSettings) {
      await SiteSetting.create({});
      console.log(`[Seed] Default Site Settings created in PostgreSQL`);
    } else {
      console.log(`[Seed] Site Settings preserved`);
    }

    // Seed Services safely
    for (const serviceData of initialServices) {
      const existingSrv = await Service.findOne({ where: { title: serviceData.title } });
      if (!existingSrv) {
        await Service.create(serviceData);
      }
    }
    console.log(`[Seed] Services check complete`);

    // Seed Training Programs safely
    for (const trainingData of initialTraining) {
      const existingTr = await Training.findOne({ where: { title: trainingData.title } });
      if (!existingTr) {
        await Training.create(trainingData);
      }
    }
    console.log(`[Seed] Training Programs check complete`);

    // Seed Sections safely
    for (const secData of initialSections) {
      const existingSec = await Section.findOne({ where: { sectionKey: secData.sectionKey, page: secData.page } });
      if (!existingSec) {
        await Section.create(secData);
      } else if (secData.sectionKey === 'industries_carousel' && existingSec.items?.length < 6) {
        await existingSec.update({ items: secData.items });
      }
    }
    console.log(`[Seed] Dynamic Home Sections check complete (all 6 industry cards synced)`);

    console.log(`\n✅ PostgreSQL Database Sync Completed Successfully!`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ PostgreSQL Seeding failed: ${error.message}`);
    process.exit(1);
  }
}

seedData();
