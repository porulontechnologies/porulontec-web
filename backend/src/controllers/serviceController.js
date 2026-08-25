import Service from '../models/Service.js';
import { sequelize } from '../config/db.js';

const defaultServices = [
  {
    slug: 'ai-solutions',
    kicker: 'Custom intelligence, built for your business',
    title: 'AI-Powered Software Solutions',
    shortDesc: 'Intelligent document processing to predictive analytics.',
    desc: 'We design and develop bespoke AI applications that solve your most complex business challenges. From intelligent document processing and natural language interfaces to predictive analytics and computer vision systems, our solutions are crafted to integrate seamlessly into your existing workflows.',
    points: [
      'Custom NLP and conversational AI systems',
      'Predictive analytics and forecasting models',
      'Computer vision for quality control and inspection',
      'Intelligent document processing and extraction',
      'AI-powered recommendation engines',
      'Anomaly detection and real-time alerting',
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
    desc: 'Our end-to-end ML platforms empower your data science teams with robust pipelines for data ingestion, feature engineering, model training, deployment, and continuous monitoring. We build scalable infrastructure that turns your data into your most valuable strategic asset.',
    points: [
      'Automated ML pipeline orchestration',
      'Feature stores and data versioning',
      'Model registry and experiment tracking',
      'Real-time and batch inference engines',
      'Model monitoring and drift detection',
      'A/B testing and champion-challenger frameworks',
    ],
    img: '/images/service-ai.jpg',
    icon: 'network_intelligence',
    order: 2,
  },
  {
    slug: 'iot-automation',
    kicker: 'Connected systems, intelligent decisions',
    title: 'IoT Automation & Smart Solutions',
    shortDesc: 'Connected devices for manufacturing & enterprise.',
    desc: 'Transform your enterprise with Industrial IoT solutions featuring intelligent device automation, real-time monitoring, edge computing, and predictive maintenance. Deploy thousands of connected devices and automate complex workflows with confidence across smart factories, logistics, and connected infrastructure.',
    points: [
      'Edge computing and intelligent orchestration',
      'Connected device network design and management',
      'Predictive maintenance with ML models',
      'Real-time analytics and smart dashboards',
      'Autonomous workflow automation',
      'Enterprise-grade device security and compliance',
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
    desc: 'Build powerful web and mobile applications with cutting-edge technology. From responsive web apps using React and Vue to native iOS and Android apps and cross-platform solutions with React Native, we deliver scalable, secure, and high-performance applications tailored to your business needs.',
    points: [
      'Full-stack web development (React, Node.js, etc.)',
      'Native iOS and Android app development',
      'Cross-platform mobile solutions (React Native, Flutter)',
      'Real-time applications with WebSocket infrastructure',
      'E-commerce and SaaS platform development',
      'Responsive design and advanced UX/UI implementation',
    ],
    img: '/images/service-cloud.jpg',
    icon: 'devices',
    order: 4,
  },
  {
    slug: 'cybersecurity',
    kicker: 'Protect your assets, ensure compliance',
    title: 'Cybersecurity Solutions',
    shortDesc: 'Compliance, vulnerability assessment & threat mitigation.',
    desc: 'Comprehensive cybersecurity services including penetration testing, vulnerability assessments, compliance management (GDPR, HIPAA, PCI-DSS), 24/7 threat detection, and incident response. Safeguard your enterprise data with end-to-end security strategies and proactive threat mitigation.',
    points: [
      'Vulnerability assessment and penetration testing',
      'Security compliance and regulatory audit',
      'Threat detection and 24/7 monitoring',
      'Security architecture and design review',
      'Incident response and recovery planning',
      'Employee security awareness training',
    ],
    img: '/images/service-cyber.jpg',
    icon: 'shield_lock',
    order: 5,
  },
  {
    slug: 'automation',
    kicker: 'Eliminate bottlenecks, amplify efficiency',
    title: 'Process Automation',
    shortDesc: 'RPA and AI-driven workflow orchestration.',
    desc: 'We combine Robotic Process Automation (RPA) with AI-driven orchestration to automate complex business processes end-to-end. Our solutions reduce manual effort by up to 80%, minimize errors, and free your teams to focus on high-value strategic work.',
    points: [
      'Intelligent workflow orchestration',
      'RPA bot design and deployment',
      'Document-centric process automation',
      'AI-enhanced decision routing',
      'Integration with enterprise systems (ERP, CRM)',
      'Process mining and optimization analytics',
    ],
    img: '/images/service-ai.jpg',
    icon: 'account_tree',
    order: 6,
  },
  {
    slug: 'cloud-systems',
    kicker: 'Resilient cloud infrastructure',
    title: 'Cloud Systems & DevOps',
    shortDesc: 'Multi-cloud orchestration & microservices.',
    desc: 'Architect and manage resilient cloud infrastructure with microservices, serverless architectures, automated CI/CD pipelines, and continuous optimization across AWS, Azure, and Google Cloud.',
    points: [
      'Cloud-native architecture (AWS, Azure, GCP)',
      'Containerization and Kubernetes orchestration',
      'Serverless application development',
      'DevOps and automated CI/CD pipelines',
      'Cloud migration and legacy modernization',
      'Cloud cost optimization and performance tuning',
    ],
    img: '/images/service-cloud.jpg',
    icon: 'cloud_queue',
    order: 7,
  },
  {
    slug: 'consultancy',
    kicker: 'Strategic technology advisory',
    title: 'Technology & AI Consultancy',
    shortDesc: 'Strategic advisory for digital transformation.',
    desc: 'Partner with senior technology consultants to navigate digital transformation, evaluate emerging AI capabilities, design enterprise software architecture, and build actionable technology roadmaps.',
    points: [
      'AI strategy and feasibility assessment',
      'Enterprise software architecture review',
      'Digital transformation roadmap design',
      'Technology stack evaluation and selection',
      'Vendor selection and technical due diligence',
      'CTO-as-a-Service and technical leadership',
    ],
    img: '/images/service-ai.jpg',
    icon: 'lightbulb',
    order: 8,
  },
];

const seedDefaultServices = async () => {
  try {
    const count = await Service.count();
    if (count === 0) {
      await Service.bulkCreate(defaultServices);
    }
  } catch (err) {
    console.error('Error seeding default services:', err);
  }
};

const mapService = (srv) => {
  if (!srv) return null;
  const plain = srv.toJSON ? srv.toJSON() : srv;
  return { ...plain, _id: plain.id };
};

export const getServices = async (req, res) => {
  try {
    await seedDefaultServices();
    const services = await Service.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return res.json(services.map(mapService));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    await seedDefaultServices();
    const slugParam = req.params.slug;
    if (!slugParam) {
      return res.status(400).json({ message: 'Slug parameter is required' });
    }
    let service = await Service.findOne({ where: { slug: slugParam } });
    if (!service) {
      service = await Service.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('slug')),
          slugParam.toLowerCase()
        ),
      });
    }
    if (!service && !isNaN(Number(slugParam))) {
      service = await Service.findByPk(Number(slugParam));
    }
    if (service) {
      return res.json(mapService(service));
    }
    return res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.title && payload.title.length > 100) {
      payload.title = payload.title.substring(0, 100);
    }
    if (payload.kicker && payload.kicker.length > 100) {
      payload.kicker = payload.kicker.substring(0, 100);
    }
    const service = await Service.create(payload);
    return res.status(201).json(mapService(service));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    const payload = { ...req.body };
    if (payload.title && payload.title.length > 100) {
      payload.title = payload.title.substring(0, 100);
    }
    if (payload.kicker && payload.kicker.length > 100) {
      payload.kicker = payload.kicker.substring(0, 100);
    }
    await service.update(payload);
    return res.json(mapService(service));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.destroy();
    return res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
