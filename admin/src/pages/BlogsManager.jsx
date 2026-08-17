import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Loader2,
  Sparkles,
  User,
  Clock,
  Tag,
  CheckCircle2,
  Star,
  RotateCcw,
  Calendar,
  Cpu,
  Shield,
  Cloud,
  Database,
  Activity,
  Layers,
  Lock,
  Code,
  Globe,
} from 'lucide-react';
import { getBlogs, createBlog, updateBlog, deleteBlog, uploadMediaFile, restoreDefaultBlogs } from '../api/adminApi';

const defaultBlogTemplates = [
  {
    slug: 'architecting-high-throughput-ai-inference-pipelines',
    title: 'Architecting High-Throughput AI Inference Pipelines in Production',
    subtitle: 'How enterprise teams minimize latency and maximize GPU utilization for real-time LLM inference.',
    excerpt: 'Deploying deep learning models to production requires balancing microsecond latency with massive request concurrency. Learn the architectural principles behind zero-downtime AI serving engines.',
    content: `Building production-ready AI inference engines demands far more than optimizing PyTorch checkpoints. Enterprise engineering teams must orchestrate microservices, handle GPU memory limits, and maintain sub-second response times across high-concurrency workloads.\n\n### Key Architectural Layers:\n1. **Model Quantization & TensorRT**: Compressing 16-bit float models into FP8 or INT8 format without sacrificing clinical or mathematical accuracy.\n2. **Asynchronous Batching**: Grouping independent user prompts into unified GPU execution batches to maximize CUDA core saturation.\n3. **Zero-Trust Microservices**: Encapsulating inference engines inside isolated Docker containers behind Kubernetes API Gateways.\n\nBy separating the control plane from GPU worker nodes, enterprises achieve 99.99% uptime and 4x faster response times even during peak load bursts.`,
    authorName: 'Dr. Aris Vance',
    authorRole: 'Chief AI Architect, Porulon Labs',
    category: 'AI & Machine Learning',
    readTime: '6 min read',
    publishedAt: '2026-08-01',
    icon: 'FiCpu',
    takeaways: [
      'Production-grade architectural patterns tailored for enterprise AI serving teams.',
      'Performance, microsecond latency, and GPU request concurrency analyzed in detail.',
      'Best practices for zero-downtime model serving engines and TensorRT quantization.',
    ],
    clarifications: [
      {
        question: 'How can our engineering team apply the concepts in "Architecting High-Throughput AI Inference Pipelines in Production"?',
        answer: 'Our lead architects recommend starting with a proof-of-concept implementation of the core architectural patterns outlined above, followed by benchtesting throughput and security constraints.',
      },
      {
        question: 'Need technical scoping or custom architectural assistance?',
        answer: 'You can consult directly with our technical architecture team at Porulon for custom scoping, code audits, or system integration.',
      },
    ],
    isFeatured: true,
    order: 1,
  },
  {
    slug: 'zero-trust-cloud-architecture-for-fintech-microservices',
    title: 'Zero-Trust Cloud Architecture for High-Volume Fintech Services',
    subtitle: 'Securing multi-region Kubernetes clusters against modern threat vectors.',
    excerpt: 'Modern financial platforms demand absolute data isolation, continuous compliance auditing, and bank-grade encryption at rest and in transit.',
    content: `Financial technology ecosystems handle millions of sensitive transaction payloads every second. Implementing a robust Zero-Trust architecture ensures every service request is authenticated, authorized, and encrypted before reaching database tiers.\n\n### Core Defense Principles:\n- **Mutual TLS (mTLS)**: Enforcing encrypted service-to-service communication via Istio service mesh proxies.\n- **Automated Compliance Scans**: Running automated SOC 2 and ISO 27001 vulnerability audits inside GitHub Actions CI/CD pipelines.\n- **Least Privilege IAM Policies**: Restricting database connection credentials to microservices with short-lived OAuth 2.0 tokens.`,
    authorName: 'Elena Rostova',
    authorRole: 'VP of Cybersecurity & Infrastructure',
    category: 'Cybersecurity',
    readTime: '5 min read',
    publishedAt: '2026-07-28',
    icon: 'FiShield',
    takeaways: [
      'Bank-grade mutual TLS (mTLS) encryption across multi-region Kubernetes clusters.',
      'Automated SOC 2 and ISO 27001 vulnerability scans integrated into CI/CD pipelines.',
      'Least-privilege IAM policies and short-lived OAuth 2.0 database token rotation.',
    ],
    clarifications: [
      {
        question: 'How do we enforce mTLS across microservices without introducing network latency?',
        answer: 'Implement lightweight eBPF proxies or Istio sidecar proxies optimized for zero-copy socket passing.',
      },
      {
        question: 'Need compliance auditing or vulnerability assessment assistance?',
        answer: 'Our cybersecurity team can perform end-to-end security audits, threat modeling, and zero-trust implementation.',
      },
    ],
    isFeatured: false,
    order: 2,
  },
  {
    slug: 'industrial-iot-telemetry-and-edge-computing-in-smart-factories',
    title: 'Industrial IoT Telemetry & Edge AI in Smart Manufacturing',
    subtitle: 'Connecting physical factory sensors to real-time predictive maintenance engines.',
    excerpt: 'Discover how industrial IoT telemetry combined with micro-controller edge processing detects assembly line bottlenecks before component breakdown.',
    content: `Industry 4.0 relies on sub-millisecond sensor feedback loops to monitor vibration, thermal fluctuation, and power draw across assembly lines. Edge computing nodes process raw telemetry locally, eliminating continuous cloud transfer overhead.\n\n### Technical Stack Overview:\n- **MQTT & OPC-UA Gateways**: Streamlining machine telemetry from PLC controllers to MQTT brokers.\n- **On-Device Micro-Models**: Running lightweight anomaly detection neural networks directly on ESP32 & Raspberry Pi CM4 hardware.\n- **Predictive Maintenance Alerts**: Triggering automated maintenance tickets to field engineers when anomaly thresholds cross 95% certainty.`,
    authorName: 'Karthik Subramanian',
    authorRole: 'Principal IoT Solutions Architect',
    category: 'IoT & Telemetry',
    readTime: '7 min read',
    publishedAt: '2026-07-20',
    icon: 'FiActivity',
    takeaways: [
      'MQTT & OPC-UA telemetry ingestion from industrial PLC assembly line controllers.',
      'Sub-millisecond on-device edge AI micro-models running on ESP32 & Raspberry Pi hardware.',
      'Predictive maintenance alerts triggered when anomaly confidence exceeds 95%.',
    ],
    clarifications: [
      {
        question: 'What hardware protocols are supported for edge gateway telemetry?',
        answer: 'Edge gateways connect via RS-485 Modbus, OPC-UA, and raw MQTT over industrial Ethernet.',
      },
      {
        question: 'Need custom firmware or IoT sensor integration assistance?',
        answer: 'Consult directly with our embedded engineering team for edge gateway development and micro-controller programming.',
      },
    ],
    isFeatured: false,
    order: 3,
  },
  {
    slug: 'nextjs-15-and-micro-frontend-patterns-for-enterprise-web',
    title: 'Next.js & Micro-Frontend Patterns for Scalable Corporate Apps',
    subtitle: 'Building modular, lightning-fast web applications for multi-team engineering organizations.',
    excerpt: 'Learn how micro-frontend architectures combined with server-driven components accelerate feature releases while preserving brand UI consistency.',
    content: `Large corporate engineering organizations often experience bottlenecks when multiple product teams work inside a single monolithic web codebase. Micro-frontend architectures decentralize deployment workflows while enforcing a shared design system.\n\n### Best Practices:\n1. **Shared Design Tokens**: Extracting color palettes, typography, and button components into versioned npm packages.\n2. **Server-Driven Dynamic Sections**: Fetching page section layouts and component schemas dynamically from REST endpoints to enable zero-rebuild content updates.\n3. **Optimized Asset Delivery**: Edge caching static assets and dynamic page bundles across global CDN nodes for sub-second page loads.`,
    authorName: 'Sophia Lin',
    authorRole: 'Lead Full-Stack Architect',
    category: 'Cloud Architecture',
    readTime: '4 min read',
    publishedAt: '2026-07-15',
    icon: 'FiLayers',
    takeaways: [
      'Decentralized multi-team deployment workflows with shared design token packages.',
      'Server-driven component schemas for zero-rebuild content update capabilities.',
      'Global edge CDN caching for sub-second corporate web app performance.',
    ],
    clarifications: [
      {
        question: 'How do micro-frontends maintain brand UI consistency across independent teams?',
        answer: 'Publish a centralized design system package containing versioned tokens and component contracts.',
      },
      {
        question: 'Need micro-frontend architecture or Next.js optimization assistance?',
        answer: 'Our full-stack architecture leads provide technical audits, micro-frontend migration roadmaps, and CDN optimizations.',
      },
    ],
    isFeatured: false,
    order: 4,
  },
];

const renderArticleIcon = (iconName) => {
  switch (iconName) {
    case 'FiShield': return <Shield className="w-3.5 h-3.5 text-cyan-500" />;
    case 'FiCloud': return <Cloud className="w-3.5 h-3.5 text-sky-500" />;
    case 'FiDatabase': return <Database className="w-3.5 h-3.5 text-indigo-500" />;
    case 'FiActivity': return <Activity className="w-3.5 h-3.5 text-emerald-500" />;
    case 'FiLayers': return <Layers className="w-3.5 h-3.5 text-purple-500" />;
    case 'FiLock': return <Lock className="w-3.5 h-3.5 text-amber-500" />;
    case 'FiCode': return <Code className="w-3.5 h-3.5 text-rose-500" />;
    case 'FiGlobe': return <Globe className="w-3.5 h-3.5 text-blue-500" />;
    case 'FiCpu':
    default: return <Cpu className="w-3.5 h-3.5 text-purple-500" />;
  }
};

export default function BlogsManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [inlineNotice, setInlineNotice] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    content: '',
    authorName: 'Porulon Engineering',
    authorRole: 'Technical Architecture Team',
    authorAvatar: '',
    category: 'AI & Machine Learning',
    coverImage: '',
    icon: 'FiCpu',
    readTime: '5 min read',
    publishedAt: new Date().toISOString().split('T')[0],
    tags: 'AI, Engineering, Architecture',
    takeaways: [],
    clarifications: [],
    isFeatured: false,
    isActive: true,
    order: 0,
  });

  const getCleanMediaValue = (val) => {
    if (!val) return '';
    const str = String(val).trim();
    if (str.startsWith('/images/') || str.startsWith('/videos/')) {
      return '';
    }
    return str;
  };

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await getBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditing(blog);
    const matched = defaultBlogTemplates.find(b => b.slug === blog.slug) || defaultBlogTemplates[0];

    const initialTakeaways = (Array.isArray(blog.takeaways) && blog.takeaways.length > 0)
      ? blog.takeaways
      : (matched.takeaways || [
          'Production-grade architectural patterns tailored for enterprise engineering teams.',
          'Performance, scalability, and security considerations analyzed in detail.',
          'Best practices for implementing scalable infrastructure and software design.',
        ]);

    const initialClarifications = (Array.isArray(blog.clarifications) && blog.clarifications.length > 0)
      ? blog.clarifications
      : (matched.clarifications || [
          {
            question: `How can our engineering team apply the concepts in "${blog.title || 'this publication'}"?`,
            answer: 'Our lead architects recommend starting with a proof-of-concept implementation of the core architectural patterns outlined above, followed by benchtesting throughput and security constraints.',
          },
          {
            question: 'Need technical scoping or custom architectural assistance?',
            answer: 'You can consult directly with our technical architecture team at Porulon for custom scoping, code audits, or system integration.',
          },
        ]);

    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      subtitle: blog.subtitle || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      authorName: blog.authorName || 'Porulon Engineering',
      authorRole: blog.authorRole || 'Technical Architecture Team',
      authorAvatar: getCleanMediaValue(blog.authorAvatar || ''),
      authorBio: blog.authorBio || '',
      category: blog.category || 'AI & Machine Learning',
      coverImage: getCleanMediaValue(blog.coverImage || ''),
      icon: blog.icon || 'FiCpu',
      readTime: blog.readTime || '5 min read',
      publishedAt: blog.publishedAt || new Date().toISOString().split('T')[0],
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || 'AI, Engineering, Architecture'),
      takeaways: initialTakeaways,
      clarifications: initialClarifications,
      isFeatured: blog.isFeatured ?? false,
      isActive: blog.isActive ?? true,
      order: blog.order || 0,
    });
    setInlineNotice({ type: '', message: '' });
  };

  const handleCreateNew = () => {
    setEditing({ _id: null });
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      excerpt: '',
      content: '',
      authorName: 'Porulon Engineering',
      authorRole: 'Technical Architecture Team',
      authorAvatar: '',
      authorBio: '',
      category: 'AI & Machine Learning',
      coverImage: '',
      icon: 'FiCpu',
      readTime: '5 min read',
      publishedAt: new Date().toISOString().split('T')[0],
      tags: 'AI, Engineering, Architecture',
      takeaways: [
        'Production-grade architectural patterns tailored for enterprise engineering teams.',
        'Performance, scalability, and security considerations analyzed in detail.',
        'Best practices for implementing scalable infrastructure and software design.',
      ],
      clarifications: [
        {
          question: 'How can our engineering team apply these architectural concepts in production?',
          answer: 'Our lead architects recommend starting with a proof-of-concept implementation of the core architectural patterns outlined above, followed by benchtesting throughput and security constraints.',
        },
        {
          question: 'Need technical scoping or custom architectural assistance?',
          answer: 'You can consult directly with our technical architecture team at Porulon for custom scoping, code audits, or system integration.',
        },
      ],
      isFeatured: false,
      isActive: true,
      order: blogs.length + 1,
    });
    setInlineNotice({ type: '', message: '' });
  };

  const handleRestoreSingleArticleDefault = () => {
    if (!window.confirm('Reset this article fields to its original factory default content?')) return;
    const matched = defaultBlogTemplates.find(b => b.slug === editing?.slug) || defaultBlogTemplates[0];
    setFormData({
      title: matched.title,
      slug: matched.slug,
      subtitle: matched.subtitle || '',
      excerpt: matched.excerpt,
      content: matched.content,
      authorName: matched.authorName,
      authorRole: matched.authorRole,
      category: matched.category,
      coverImage: '',
      icon: matched.icon || 'FiCpu',
      readTime: matched.readTime,
      publishedAt: matched.publishedAt || new Date().toISOString().split('T')[0],
      tags: 'AI, Engineering, Architecture',
      takeaways: matched.takeaways,
      clarifications: matched.clarifications,
      isFeatured: matched.isFeatured || false,
      isActive: true,
      order: matched.order || 1,
    });
    setInlineNotice({ type: 'success', message: '✓ Article fields reset to default content!' });
  };

  const addTakeaway = () => {
    setFormData(prev => ({
      ...prev,
      takeaways: [...(prev.takeaways || []), 'New key technical takeaway principle...'],
    }));
  };

  const updateTakeaway = (index, val) => {
    setFormData(prev => {
      const updated = [...(prev.takeaways || [])];
      updated[index] = val;
      return { ...prev, takeaways: updated };
    });
  };

  const removeTakeaway = (index) => {
    setFormData(prev => ({
      ...prev,
      takeaways: (prev.takeaways || []).filter((_, i) => i !== index),
    }));
  };

  const addClarification = () => {
    setFormData(prev => ({
      ...prev,
      clarifications: [
        ...(prev.clarifications || []),
        {
          question: 'Q: Technical architectural clarification question?',
          answer: 'Detailed engineering guidance or architectural recommendation...',
        },
      ],
    }));
  };

  const updateClarification = (index, field, val) => {
    setFormData(prev => {
      const updated = [...(prev.clarifications || [])];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, clarifications: updated };
    });
  };

  const removeClarification = (index) => {
    setFormData(prev => ({
      ...prev,
      clarifications: (prev.clarifications || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setInlineNotice({ type: '', message: '' });

    if (formData.title && formData.title.length > 100) {
      setInlineNotice({
        type: 'error',
        message: '⚠️ Validation Failed: Article title cannot exceed 100 characters!',
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : formData.tags,
      };

      if (editing._id || editing.id) {
        await updateBlog(editing.id || editing._id, payload);
        setInlineNotice({ type: 'success', message: '✓ Article updated successfully!' });
      } else {
        await createBlog(payload);
        setInlineNotice({ type: 'success', message: '✓ New article created successfully!' });
      }
      setEditing(null);
      loadBlogs();
    } catch (err) {
      setInlineNotice({
        type: 'error',
        message: 'Failed to save article: ' + (err.response?.data?.message || err.message),
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;
    try {
      await deleteBlog(id);
      loadBlogs();
    } catch (err) {
      alert('Failed to delete blog: ' + err.message);
    }
  };

  const toggleActive = async (blog) => {
    try {
      await updateBlog(blog.id || blog._id, { ...blog, isActive: !blog.isActive });
      loadBlogs();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMediaFile(file);
      if (res.data?.url) {
        setFormData((prev) => ({ ...prev, coverImage: res.data.url }));
      }
    } catch (err) {
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarFileUpload = async (file) => {
    if (!file) return;
    setAvatarUploading(true);
    try {
      const res = await uploadMediaFile(file);
      if (res.data?.url) {
        setFormData((prev) => ({ ...prev, authorAvatar: res.data.url }));
      }
    } catch (err) {
      alert('Failed to upload avatar: ' + err.message);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleRestoreDefaults = async () => {
    if (!window.confirm('Restore factory default blog articles? This will reset blog articles to the original set.')) return;
    try {
      setLoading(true);
      await restoreDefaultBlogs();
      setInlineNotice({ type: 'success', message: '✓ Factory default blog articles successfully restored!' });
      loadBlogs();
    } catch (err) {
      setInlineNotice({ type: 'error', message: 'Failed to restore default articles: ' + (err.response?.data?.message || err.message) });
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Header title="Blog Articles Manager" subtitle="Publish, edit, and manage technical insights and articles for the website" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Simple & Neat Top Action Bar */}
        <div className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
          isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <div>
            <h1 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Blog & Technical Articles ({blogs.length})
            </h1>
            <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Publish AI research papers, cloud tutorials, and engineering articles
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold text-xs rounded-full border border-purple-500/20 transition"
              title="Restore default articles"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Defaults</span>
            </button>

            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-full shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400">Loading blog articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border space-y-4 ${isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'}`}>
            <FileText className="w-12 h-12 text-slate-400 mx-auto opacity-40" />
            <div>
              <h3 className="text-base font-bold">No blog articles in database</h3>
              <p className="text-xs text-slate-400 mt-1">You deleted all articles or no articles were found. Click below to recover factory defaults.</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestoreDefaults}
                className="px-5 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recover All Default Articles</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id || blog._id}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20 uppercase">
                      {renderArticleIcon(blog.icon)}
                      <span>{blog.category}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold line-clamp-2">{blog.title}</h3>
                  <p className={`text-xs line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{blog.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-400 pt-2">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#7c3aed]" />
                      <span>{blog.authorName}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{blog.publishedAt || '2026-08-01'}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3">
                  <button
                    onClick={() => toggleActive(blog)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                      blog.isActive
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}
                  >
                    {blog.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{blog.isActive ? 'Active' : 'Draft'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition"
                      title="Edit Article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id || blog._id)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form Editor */}
        {editing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 md:p-8 shadow-2xl ${
              isDark ? 'bg-[#121824] border-[#1f293d] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex justify-between items-center pb-4 border-b border-slate-500/10 mb-6">
                <h2 className="text-lg font-bold">{editing._id || editing.id ? 'Edit Article' : 'New Article'}</h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestoreSingleArticleDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold text-xs rounded-xl border border-amber-500/20 transition"
                    title="Reset article fields to factory default content"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Article Content</span>
                  </button>
                  <button onClick={() => setEditing(null)} className="p-2 text-slate-400 hover:text-white">✕</button>
                </div>
              </div>

              {inlineNotice.message && (
                <div className={`p-4 rounded-xl mb-4 text-xs font-semibold ${
                  inlineNotice.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {inlineNotice.message}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Article Title (Max 100 chars)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    maxLength={100}
                    required
                    className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    >
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Cloud Architecture">Cloud Architecture</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="IoT & Telemetry">IoT & Telemetry</option>
                      <option value="Engineering News">Engineering News</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Publication Date</label>
                    <input
                      type="date"
                      value={formData.publishedAt || ''}
                      onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Article Icon</label>
                    <select
                      value={formData.icon || 'FiCpu'}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    >
                      <option value="FiCpu">💻 AI Processing</option>
                      <option value="FiShield">🛡️ Security & Zero-Trust</option>
                      <option value="FiCloud">☁️ Cloud Infrastructure</option>
                      <option value="FiDatabase">🗄️ Database & Storage</option>
                      <option value="FiActivity">📈 Industrial IoT</option>
                      <option value="FiLayers">🥞 Micro-Frontends</option>
                      <option value="FiLock">🔒 Encryption & IAM</option>
                      <option value="FiCode">🧑‍💻 Software Code</option>
                      <option value="FiGlobe">🌐 Global Distributed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Short Excerpt / Summary</label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                    className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Full Article Content (Markdown / Text)</label>
                  <textarea
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Author Name</label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder="e.g. Dr. Aris Vance"
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Author Role</label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                      placeholder="e.g. Chief AI Architect"
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    />
                  </div>
                </div>

                {/* Author Avatar Photo Uploader */}
                <div>
                  <label className="block text-xs font-bold text-[#7c3aed] mb-1">Author Avatar Photo (Upload or Paste URL)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={getCleanMediaValue(formData.authorAvatar)}
                      onChange={(e) => setFormData({ ...formData, authorAvatar: e.target.value })}
                      placeholder="Upload author avatar from PC or paste image URL"
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    />
                    <label className="px-4 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition">
                      {avatarUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleAvatarFileUpload(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>

                {/* About Author Bio Description Field */}
                <div>
                  <label className="block text-xs font-bold text-[#7c3aed] mb-1">
                    About Author Bio Paragraph (Displayed in "About Author" Card)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.authorBio || ''}
                    onChange={(e) => setFormData({ ...formData, authorBio: e.target.value })}
                    placeholder="Enter author background, experience, or bio paragraph displayed inside the About Author box..."
                    className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Article Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="AI, PyTorch, MLOps"
                    className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                  />
                </div>

                {/* Key Technical Takeaways Section */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#161d2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#7c3aed]">Key Technical Takeaways</h4>
                      <p className="text-[11px] text-slate-400">Bullet points displayed inside Executive Scope & Summary</p>
                    </div>
                    <button
                      type="button"
                      onClick={addTakeaway}
                      className="flex items-center gap-1 px-3 py-1 bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white rounded-lg text-xs font-bold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Takeaway</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(formData.takeaways || []).map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 w-4">{idx + 1}.</span>
                        <input
                          type="text"
                          value={t}
                          onChange={(e) => updateTakeaway(idx, e.target.value)}
                          className={`flex-1 rounded-xl px-3 py-2 text-xs font-medium border ${isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-300'}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeTakeaway(idx)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition"
                          title="Delete Takeaway"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publication Technical Clarifications Section */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#161d2c] border-[#1f293d]' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-sky-400">Publication Technical Clarifications (Q&A)</h4>
                      <p className="text-[11px] text-slate-400">Question and Answer pairs for technical guidance</p>
                    </div>
                    <button
                      type="button"
                      onClick={addClarification}
                      className="flex items-center gap-1 px-3 py-1 bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white rounded-lg text-xs font-bold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Q&A Pair</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(formData.clarifications || []).map((c, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border space-y-2 relative ${isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-sky-400">Q&A Pair #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeClarification(idx)}
                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition"
                            title="Delete Q&A Pair"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={c.question}
                          onChange={(e) => updateClarification(idx, 'question', e.target.value)}
                          placeholder="Question..."
                          className={`w-full rounded-xl px-3 py-2 text-xs font-bold border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                        />
                        <textarea
                          rows={2}
                          value={c.answer}
                          onChange={(e) => updateClarification(idx, 'answer', e.target.value)}
                          placeholder="Answer / Technical recommendation..."
                          className={`w-full rounded-xl px-3 py-2 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Cover Image Upload</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={getCleanMediaValue(formData.coverImage)}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="Upload cover image from PC or paste URL"
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#1f293d]' : 'bg-slate-50 border-slate-300'}`}
                    />
                    <label className="px-4 py-2.5 bg-[#7c3aed] text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 accent-[#7c3aed]"
                    />
                    <span>Active / Published</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-500/10">
                  <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 text-xs font-bold text-slate-400">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] text-white text-xs font-bold rounded-xl shadow-md">Save Article</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
