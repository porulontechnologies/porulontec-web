export const blogCategories = [
  'All',
  'AI & Machine Learning',
  'Cloud Architecture',
  'Cybersecurity',
  'IoT & Telemetry',
];

export const blogPosts = [
  {
    slug: 'architecting-high-throughput-ai-inference-pipelines',
    title: 'Architecting High-Throughput AI Inference Pipelines in Production',
    category: 'AI & Machine Learning',
    excerpt: 'Deploying deep learning models to production requires balancing microsecond latency with massive request concurrency. Learn the architectural principles behind zero-downtime AI engines.',
    date: '2026-08-01',
    readTime: '6 min read',
    img: '/images/service-ai.jpg',
    author: 'Dr. Aris Vance',
    authorRole: 'Chief AI Architect',
    tags: ['AI', 'PyTorch', 'MLOps', 'Inference'],
    content: [
      {
        type: 'h2',
        text: 'Building Production-Grade AI Inference Engines'
      },
      {
        type: 'p',
        text: 'Deploying deep learning models to production demands far more than optimizing PyTorch checkpoints. Enterprise engineering teams must orchestrate microservices, handle GPU memory limits, and maintain sub-second response times across high-concurrency workloads.'
      },
      {
        type: 'h2',
        text: 'Key Architectural Layers'
      },
      {
        type: 'p',
        text: '1. Model Quantization & TensorRT: Compressing 16-bit float models into FP8 or INT8 format without sacrificing clinical or mathematical accuracy.\n2. Asynchronous Batching: Grouping independent user prompts into unified GPU execution batches to maximize CUDA core saturation.\n3. Zero-Trust Microservices: Encapsulating inference engines inside isolated Docker containers behind Kubernetes API Gateways.'
      },
      {
        type: 'p',
        text: 'By separating the control plane from GPU worker nodes, enterprises achieve 99.99% uptime and 4x faster response times even during peak load bursts.'
      }
    ]
  },
  {
    slug: 'zero-trust-cloud-architecture-for-fintech-microservices',
    title: 'Zero-Trust Cloud Architecture for High-Volume Fintech Services',
    category: 'Cybersecurity',
    excerpt: 'Modern financial platforms demand absolute data isolation, continuous compliance auditing, and bank-grade encryption at rest and in transit.',
    date: '2026-07-28',
    readTime: '5 min read',
    img: '/images/service-cyber.jpg',
    author: 'Elena Rostova',
    authorRole: 'VP of Infrastructure',
    tags: ['Fintech', 'Cybersecurity', 'ZeroTrust', 'AWS'],
    content: [
      {
        type: 'h2',
        text: 'Securing Financial Telemetry in Real Time'
      },
      {
        type: 'p',
        text: 'Financial technology ecosystems handle millions of sensitive transaction payloads every second. Implementing a robust Zero-Trust architecture ensures every service request is authenticated, authorized, and encrypted before reaching database tiers.'
      },
      {
        type: 'h2',
        text: 'Core Defense Principles'
      },
      {
        type: 'p',
        text: '• Mutual TLS (mTLS): Enforcing encrypted service-to-service communication via Istio service mesh proxies.\n• Automated Compliance Scans: Running automated SOC 2 and ISO 27001 vulnerability audits inside GitHub Actions CI/CD pipelines.\n• Least Privilege IAM Policies: Restricting database connection credentials to microservices with short-lived OAuth 2.0 tokens.'
      }
    ]
  },
  {
    slug: 'industrial-iot-telemetry-and-edge-computing-in-smart-factories',
    title: 'Industrial IoT Telemetry & Edge AI in Smart Manufacturing',
    category: 'IoT & Telemetry',
    excerpt: 'Discover how industrial IoT telemetry combined with micro-controller edge processing detects assembly line bottlenecks before component breakdown.',
    date: '2026-07-20',
    readTime: '7 min read',
    img: '/images/service-iot.jpg',
    author: 'Karthik Subramanian',
    authorRole: 'Principal IoT Solutions Architect',
    tags: ['IoT', 'Industry4.0', 'EdgeAI', 'MQTT'],
    content: [
      {
        type: 'h2',
        text: 'Sub-Millisecond Telemetry Feedback Loops'
      },
      {
        type: 'p',
        text: 'Industry 4.0 relies on sub-millisecond sensor feedback loops to monitor vibration, thermal fluctuation, and power draw across assembly lines. Edge computing nodes process raw telemetry locally, eliminating continuous cloud transfer overhead.'
      },
      {
        type: 'h2',
        text: 'On-Device Edge Computing'
      },
      {
        type: 'p',
        text: '• MQTT & OPC-UA Gateways: Streamlining machine telemetry from PLC controllers to MQTT brokers.\n• On-Device Micro-Models: Running lightweight anomaly detection neural networks directly on ESP32 & Raspberry Pi CM4 hardware.\n• Predictive Maintenance Alerts: Triggering automated maintenance tickets to field engineers when anomaly thresholds cross 95% certainty.'
      }
    ]
  },
  {
    slug: 'nextjs-15-and-micro-frontend-patterns-for-enterprise-web',
    title: 'Next.js & Micro-Frontend Patterns for Scalable Corporate Apps',
    category: 'Cloud Architecture',
    excerpt: 'Learn how micro-frontend architectures combined with server-driven components accelerate feature releases while preserving brand UI consistency.',
    date: '2026-07-15',
    readTime: '4 min read',
    img: '/images/service-cloud.jpg',
    author: 'Sophia Lin',
    authorRole: 'Lead Full-Stack Architect',
    tags: ['Next.js', 'React', 'Frontend', 'Architecture'],
    content: [
      {
        type: 'h2',
        text: 'Decentralizing Corporate Codebases'
      },
      {
        type: 'p',
        text: 'Large corporate engineering organizations often experience bottlenecks when multiple product teams work inside a single monolithic web codebase. Micro-frontend architectures decentralize deployment workflows while enforcing a shared design system.'
      },
      {
        type: 'h2',
        text: 'Best Practices'
      },
      {
        type: 'p',
        text: '1. Shared Design Tokens: Extracting color palettes, typography, and button components into versioned npm packages.\n2. Server-Driven Dynamic Sections: Fetching page section layouts and component schemas dynamically from REST endpoints to enable zero-rebuild content updates.\n3. Optimized Asset Delivery: Edge caching static assets and dynamic page bundles across global CDN nodes for sub-second page loads.'
      }
    ]
  }
];

export const getBlogBySlug = (slug) => {
  return blogPosts.find((p) => p.slug === slug);
};

export const getRelatedPosts = (currentPost, limit = 3) => {
  return blogPosts.filter((p) => p.slug !== currentPost?.slug).slice(0, limit);
};
