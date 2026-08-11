import Training from '../models/Training.js';
import { sequelize } from '../config/db.js';
import { Op } from 'sequelize';

const defaultTraining = [
  {
    slug: 'ai-ml',
    kicker: 'Hands-on, mentor-led applied learning',
    title: 'AI & Machine Learning BootCamp',
    shortDesc: 'Hands-on courses in applied machine learning, neural networks & LLMs.',
    desc: 'Our AI & ML training program takes learners from foundational concepts to production-ready skills. Through project-based learning, participants build real models, deploy them, and learn the end-to-end lifecycle of applied machine learning used by our own engineering teams.',
    points: [
      'Python for data science and ML fundamentals',
      'Supervised, unsupervised & deep learning',
      'Model deployment and MLOps basics',
      'Natural language processing and computer vision',
      'Capstone project with real-world dataset',
      'Certification on completion',
    ],
    processSteps: [
      { phase: 'Phase 01 • Core Foundations', title: 'Python & Data Science Fundamentals', desc: 'Master NumPy, Pandas, Scikit-Learn, and algorithmic data preprocessing.' },
      { phase: 'Phase 02 • Deep Learning', title: 'Neural Networks & LLMs Sprint', desc: 'Build PyTorch models, fine-tune open-weights LLMs, and construct RAG pipelines.' },
      { phase: 'Phase 03 • MLOps Launch', title: 'Production Model Deployment & Audit', desc: 'Deploy microservices to Kubernetes with automated model drift monitoring.' },
    ],
    faqs: [
      { q: 'What are the prerequisites for the AI & ML track?', a: 'Basic programming knowledge in Python or any object-oriented language is recommended.' },
      { q: 'Will I build a real portfolio project?', a: 'Yes! Every participant builds and deploys an end-to-end capstone ML application.' },
      { q: 'Is certification provided upon completion?', a: 'Graduates receive a verified technical certificate after completing all capstone code audits.' },
    ],
    duration: '12 weeks',
    format: 'Live online / on-campus',
    level: 'Beginner to Advanced',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    icon: 'HiOutlineSparkles',
    order: 1,
  },
  {
    slug: 'cybersecurity',
    kicker: 'Ethical hacking & threat defense',
    title: 'Cybersecurity & Ethical Hacking',
    shortDesc: 'Ethical hacking, pen-testing & zero-trust threat defense.',
    desc: 'Build in-demand security skills with our cybersecurity training track covering ethical hacking, penetration testing, and regulatory compliance. Learners work in simulated environments to identify and remediate real vulnerabilities.',
    points: [
      'Network security and threat fundamentals',
      'Ethical hacking and penetration testing labs',
      'Vulnerability assessment methodology',
      'Compliance frameworks (GDPR, HIPAA, PCI-DSS)',
      'Incident response simulation exercises',
      'Certification on completion',
    ],
    processSteps: [
      { phase: 'Phase 01 • Reconnaissance', title: 'Network Audit & Penetration Labs', desc: 'Master Wireshark, Nmap, Metasploit, and vulnerability assessment frameworks.' },
      { phase: 'Phase 02 • Security Ops', title: 'Zero-Trust Architecture & SIEM', desc: 'Implement SIEM logging, endpoint defense, and cloud security compliance.' },
      { phase: 'Phase 03 • Red Team Defense', title: 'Live Red/Blue Team Simulation', desc: 'Engage in live adversary simulations and produce technical remediation reports.' },
    ],
    faqs: [
      { q: 'Is hands-on lab access provided?', a: 'Yes, learners receive dedicated virtual lab environments to practice ethical penetration testing.' },
      { q: 'Does this track prepare me for industry certs?', a: 'Curriculum aligns with CEH, CompTIA Security+, and CISSP core competencies.' },
    ],
    duration: '10 weeks',
    format: 'Live online / on-campus',
    level: 'Beginner to Advanced',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    icon: 'HiOutlineShieldCheck',
    order: 2,
  },
  {
    slug: 'iot',
    kicker: 'Embedded systems for connected tech',
    title: 'Smart IoT & Sensor Engineering',
    shortDesc: 'Embedded systems, microcontrollers and connected-device engineering.',
    desc: 'Our IoT training program covers embedded systems design, sensor networks, and connected-device engineering. Learners build and deploy working IoT prototypes, gaining practical experience with the same tools used in our client projects.',
    points: [
      'Embedded systems and microcontroller programming',
      'Sensor networks and edge computing basics',
      'IoT communication protocols (MQTT, CoAP)',
      'Cloud integration for connected devices',
      'Hands-on hardware prototyping labs',
      'Certification on completion',
    ],
    processSteps: [
      { phase: 'Phase 01 • Hardware Interfacing', title: 'Microcontroller & Sensor Wiring', desc: 'Program ESP32/STM32 microcontrollers and interface analog/digital telemetry sensors.' },
      { phase: 'Phase 02 • Telemetry Pipelines', title: 'MQTT Protocol & Cloud Telemetry', desc: 'Stream real-time sensor payloads over MQTT into AWS IoT Core and InfluxDB.' },
      { phase: 'Phase 03 • Edge Analytics', title: 'Edge AI & Enclosure Assembly', desc: 'Deploy TinyML models onto edge hardware for real-time anomaly detection.' },
    ],
    faqs: [
      { q: 'Are hardware kits provided for labs?', a: 'Physical lab kits or virtual simulator tools are provided for all enrolled students.' },
      { q: 'What protocols are taught in this track?', a: 'MQTT, CoAP, HTTP/REST, BLE, and LoRaWAN protocols are covered in depth.' },
    ],
    duration: '8 weeks',
    format: 'On-campus (lab-based)',
    level: 'Beginner to Advanced',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    icon: 'HiOutlineRadio',
    order: 3,
  },
  {
    slug: 'full-stack',
    kicker: 'Industry-aligned, job-ready curriculum',
    title: 'Full-Stack Software Engineering',
    shortDesc: 'Industry-aligned full-stack web and mobile development bootcamp.',
    desc: 'A comprehensive, industry-aligned bootcamp that takes learners from front-end fundamentals to deploying full production applications. Graduates leave with a portfolio of real projects and the skills to contribute to a development team from day one.',
    points: [
      'Modern front-end development (React, Tailwind)',
      'Back-end APIs with Node.js and databases',
      'Version control, testing, and CI/CD basics',
      'Cloud deployment fundamentals',
      'Team-based capstone project',
      'Certification on completion',
    ],
    processSteps: [
      { phase: 'Phase 01 • Frontend Mastery', title: 'Modern React & Design Tokens', desc: 'Build responsive web apps with React, TailwindCSS, and state management.' },
      { phase: 'Phase 02 • Backend Architecture', title: 'Node.js REST APIs & PostgreSQL', desc: 'Design relational database schemas, authentication APIs, and Redis caching layers.' },
      { phase: 'Phase 03 • Production Launch', title: 'Docker, CI/CD & Deployment', desc: 'Containerize microservices with Docker and establish zero-downtime GitHub Actions pipelines.' },
    ],
    faqs: [
      { q: 'What tech stack is taught in this bootcamp?', a: 'We focus on React, Node.js, Express, PostgreSQL/MongoDB, TailwindCSS, and Docker.' },
      { q: 'Is career placement support included?', a: 'Graduates receive 1-on-1 resume reviews, mock interviews, and job referral connections.' },
    ],
    duration: '16 weeks',
    format: 'Live online / on-campus',
    level: 'Beginner to Advanced',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    icon: 'HiOutlineDevicePhoneMobile',
    order: 4,
  },
];

const seedDefaultTraining = async () => {
  try {
    const count = await Training.count();
    if (count === 0) {
      await Training.bulkCreate(defaultTraining);
    } else {
      // Bulk update any old legacy static paths like /images/service-ai.jpg to crisp Unsplash URLs
      await Training.update(
        { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop' },
        { where: { img: { [Op.like]: '%service-ai.jpg%' } } }
      );
      await Training.update(
        { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop' },
        { where: { img: { [Op.like]: '%service-cyber.jpg%' } } }
      );
      await Training.update(
        { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop' },
        { where: { img: { [Op.like]: '%service-iot.jpg%' } } }
      );
      await Training.update(
        { img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop' },
        { where: { img: { [Op.like]: '%service-cloud.jpg%' } } }
      );
    }
  } catch (err) {
    console.error('Error seeding default training:', err);
  }
};

const mapTraining = (tr) => {
  if (!tr) return null;
  const plain = tr.toJSON ? tr.toJSON() : tr;
  return { ...plain, _id: plain.id };
};

export const getTrainingPrograms = async (req, res) => {
  try {
    await seedDefaultTraining();
    const programs = await Training.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return res.json(programs.map(mapTraining));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTrainingBySlug = async (req, res) => {
  try {
    await seedDefaultTraining();
    const slugParam = req.params.slug;
    if (!slugParam) {
      return res.status(400).json({ message: 'Slug parameter is required' });
    }
    let program = await Training.findOne({ where: { slug: slugParam } });
    if (!program) {
      program = await Training.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('slug')),
          slugParam.toLowerCase()
        ),
      });
    }
    if (!program && !isNaN(Number(slugParam))) {
      program = await Training.findByPk(Number(slugParam));
    }
    if (program) {
      return res.json(mapTraining(program));
    }
    return res.status(404).json({ message: 'Training program not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTraining = async (req, res) => {
  try {
    const program = await Training.create(req.body);
    return res.status(201).json(mapTraining(program));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateTraining = async (req, res) => {
  try {
    const program = await Training.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Training program not found' });
    }
    await program.update(req.body);
    return res.json(mapTraining(program));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const program = await Training.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Training program not found' });
    }
    await program.destroy();
    return res.json({ message: 'Training program deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
