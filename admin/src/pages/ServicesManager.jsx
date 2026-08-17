import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getServices, createService, updateService, deleteService, uploadMediaFile } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Loader2,
  ExternalLink,
  Layers,
  Search,
  Eye,
  ArrowRight,
  Cpu,
  Radio,
  Smartphone,
  Lock,
  Server,
  Zap,
  CheckCircle,
  Copy,
  Check,
  HelpCircle,
  Clock,
  BookOpen,
  X,
} from 'lucide-react';

const SERVICE_FALLBACK_IMAGES = {
  'ai-solutions': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  'ml-platforms': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  'iot-automation': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
  'full-stack-web-mobile': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  'cybersecurity-compliance': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
  'cloud-devops-infrastructure': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
};

const ICON_OPTIONS = [
  { key: 'HiOutlineSparkles', label: '✨ Artificial Intelligence (Sparkles)' },
  { key: 'HiOutlineCpu', label: '🧠 Machine Learning & Data (CPU)' },
  { key: 'HiOutlineRadio', label: '📡 Smart IoT & Automation (Radio)' },
  { key: 'HiOutlineDevicePhoneMobile', label: '📱 Full-Stack Web & Mobile (Mobile)' },
  { key: 'HiOutlineShieldCheck', label: '🛡️ Cybersecurity & Risk (Shield)' },
  { key: 'HiOutlineServer', label: '☁️ Cloud & DevOps Infrastructure (Server)' },
  { key: 'HiOutlineBolt', label: '⚡ Intelligent Automation (Bolt)' },
];

const getCleanImage = (img, slug) => {
  if (!img || img === '/images/service-ai.jpg' || img === '/images/service-ml.jpg' || img === '/images/service-iot.jpg') {
    return SERVICE_FALLBACK_IMAGES[slug] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
  }
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:') || img.startsWith('/uploads/')) {
    return img;
  }
  return SERVICE_FALLBACK_IMAGES[slug] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
};

const renderIconComponent = (iconKey) => {
  const k = (iconKey || '').toLowerCase();
  if (k.includes('ml') || k.includes('cpu')) return <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
  if (k.includes('iot') || k.includes('radio')) return <Radio className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
  if (k.includes('full') || k.includes('mobile') || k.includes('dev')) return <Smartphone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
  if (k.includes('sec') || k.includes('shield') || k.includes('lock')) return <Lock className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
  if (k.includes('cloud') || k.includes('server')) return <Server className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
  if (k.includes('bolt') || k.includes('auto')) return <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
  return <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
};

export default function ServicesManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSlug, setCopiedSlug] = useState('');
  const [inlineNotice, setInlineNotice] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    slug: '',
    kicker: '',
    title: '',
    shortDesc: '',
    desc: '',
    points: '',
    processSteps: '',
    faqs: '',
    icon: 'HiOutlineSparkles',
    img: '',
    order: 1,
  });

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await getServices();
      setServices(res.data || []);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const DEFAULT_SERVICE_STEPS = [
    { phase: 'Phase 01 • Discovery', title: 'Strategic Requirement Blueprint', desc: 'Evaluate workflows, data pipelines, and technical feasibility.' },
    { phase: 'Phase 02 • Build', title: 'Custom Engineering & Security', desc: 'Develop microservices with zero-downtime CI/CD pipelines.' },
    { phase: 'Phase 03 • Deploy', title: 'Production Launch & Enterprise SLA', desc: 'Production monitoring and guaranteed 99.99% availability.' }
  ];

  const DEFAULT_SERVICE_FAQS = [
    { q: 'How long does implementation take?', a: 'Initial proof of concept is delivered in 2 to 4 weeks.' },
    { q: 'Can this service integrate with legacy IT?', a: 'Yes, via decoupled REST APIs and middleware adapters.' }
  ];

  const parsePoints = (val) => {
    if (Array.isArray(val) && val.length > 0) return val;
    if (typeof val === 'string' && val.trim()) return val.split('\n').map(p => p.trim()).filter(Boolean);
    return [
      'Custom system architecture & LLM models',
      'Predictive analytics & forecasting',
      'Real-time telemetry and 24/7 SLA'
    ];
  };

  const parseSteps = (val) => {
    if (Array.isArray(val) && val.length > 0) {
      return val.map((s, idx) => {
        if (typeof s === 'string') {
          const parts = s.split('|').map(p => p.trim());
          return { phase: parts[0] || `Phase 0${idx + 1} • Audit`, title: parts[1] || parts[0] || '', desc: parts[2] || '' };
        }
        return { phase: s.phase || s.step || `Phase 0${idx + 1} • Audit`, title: s.title || s.name || '', desc: s.desc || s.description || '' };
      });
    }
    if (typeof val === 'string' && val.trim()) {
      const lines = val.split('\n').filter(Boolean);
      if (lines.length > 0) {
        return lines.map((line, idx) => {
          const parts = line.split('|').map(p => p.trim());
          if (parts.length >= 3) return { phase: parts[0], title: parts[1], desc: parts[2] };
          if (parts.length === 2) return { phase: parts[0], title: parts[1], desc: '' };
          return { phase: `Phase 0${idx + 1} • Audit`, title: parts[0], desc: '' };
        });
      }
    }
    return [...DEFAULT_SERVICE_STEPS];
  };

  const parseFaqs = (val) => {
    if (Array.isArray(val) && val.length > 0) {
      return val.map(f => {
        if (typeof f === 'string') {
          const parts = f.split('|').map(p => p.trim());
          return { q: parts[0] || '', a: parts[1] || '' };
        }
        return { q: f.q || f.question || '', a: f.a || f.answer || '' };
      });
    }
    if (typeof val === 'string' && val.trim()) {
      const lines = val.split('\n').filter(Boolean);
      if (lines.length > 0) {
        return lines.map(line => {
          const parts = line.split('|').map(p => p.trim());
          return { q: parts[0] || '', a: parts[1] || '' };
        });
      }
    }
    return [...DEFAULT_SERVICE_FAQS];
  };

  const handleEdit = (service) => {
    setEditing(service);
    setFormData({
      slug: service.slug || '',
      kicker: service.kicker || '',
      title: service.title || '',
      shortDesc: service.shortDesc || '',
      desc: service.desc || '',
      points: parsePoints(service.points),
      processSteps: parseSteps(service.processSteps),
      faqs: parseFaqs(service.faqs),
      icon: service.icon || 'HiOutlineSparkles',
      img: service.img || '',
      order: service.order || 1,
    });
    setInlineNotice({ type: '', message: '' });
  };

  const handleCreateNew = () => {
    setEditing({ _id: null });
    setFormData({
      slug: 'custom-service-' + Date.now().toString().slice(-4),
      kicker: 'Custom Enterprise Capability',
      title: 'New Service Capability',
      shortDesc: 'Short summary for cards and navbar dropdown menu...',
      desc: 'Full detailed narrative overview of the service offering for the detail page...',
      points: [
        'Custom system architecture & LLM models',
        'Predictive analytics & forecasting',
        'Real-time telemetry and 24/7 SLA'
      ],
      processSteps: [
        { phase: 'Phase 01 • Discovery', title: 'Strategic Requirement Blueprint', desc: 'Evaluate workflows and technical feasibility.' },
        { phase: 'Phase 02 • Build', title: 'Custom Engineering & Security', desc: 'Develop microservices with zero-downtime CI/CD.' },
        { phase: 'Phase 03 • Deploy', title: 'Production Launch & SLA', desc: 'Production monitoring and guaranteed 99.99% availability.' }
      ],
      faqs: [
        { q: 'How long does implementation take?', a: 'Initial proof of concept is delivered in 2 to 4 weeks.' },
        { q: 'Can this service integrate with legacy IT?', a: 'Yes, via decoupled REST APIs and middleware adapters.' }
      ],
      icon: 'HiOutlineSparkles',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
      order: services.length + 1,
    });
    setInlineNotice({ type: '', message: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setInlineNotice({ type: '', message: '' });

    if (formData.title && formData.title.length > 100) {
      setInlineNotice({
        type: 'error',
        message: '⚠️ Title cannot exceed 100 characters!',
      });
      return;
    }

    const payload = {
      ...formData,
      points: (formData.points || []).filter(p => typeof p === 'string' && p.trim()),
      processSteps: (formData.processSteps || []).filter(s => s.title?.trim() || s.phase?.trim()),
      faqs: (formData.faqs || []).filter(f => f.q?.trim() || f.a?.trim()),
    };

    try {
      const id = editing?._id || editing?.id;
      if (id) {
        await updateService(id, payload);
        setInlineNotice({ type: 'success', message: '✓ Service updated successfully!' });
      } else {
        await createService(payload);
        setInlineNotice({ type: 'success', message: '✓ New service created!' });
      }
      setEditing(null);
      loadServices();
    } catch (err) {
      setInlineNotice({
        type: 'error',
        message: 'Failed to save service: ' + (err.response?.data?.message || err.message),
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service? It will be removed from Navbar dropdown, Services page, and Detail routes.')) return;
    try {
      await deleteService(id);
      loadServices();
    } catch (err) {
      alert('Failed to delete service: ' + err.message);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMediaFile(file);
      if (res.data?.url) {
        setFormData({ ...formData, img: res.data.url });
      }
    } catch (err) {
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCopySlug = (slug) => {
    navigator.clipboard.writeText(slug);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(''), 2000);
  };

  const filteredServices = services.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      (s.title || '').toLowerCase().includes(q) ||
      (s.slug || '').toLowerCase().includes(q) ||
      (s.kicker || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900 font-sans'}`}>
      <Header title="Services & Capabilities Manager" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Simple & Neat Top Action Bar */}
        <div className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
          isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <div>
            <h1 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Services & Capabilities ({services.length})
            </h1>
            <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Manage technology offerings, feature checkmarks, and live detail routes
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-full flex items-center gap-2 shadow-xs transition shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Service</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search services by title or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border ${
                isDark ? 'bg-[#1e293b] border-[#334155] text-slate-100 placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Showing {filteredServices.length} of {services.length} service capabilities
          </span>
        </div>

        {/* Services Cards Grid - EXACT MATCH to TrainingManager card layout (2-Column Grid) */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600 dark:text-purple-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-white border-slate-200'}`}>
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold">No services found</h3>
            <p className="text-xs text-slate-400 mt-1">Click "Create New Service" to create your first technology capability card.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => {
              const srvId = service._id || service.id;
              const pointsArr = Array.isArray(service.points) ? service.points : [];
              const stepsCount = (Array.isArray(service.processSteps) ? service.processSteps : []).length;
              const faqsCount = (Array.isArray(service.faqs) ? service.faqs : []).length;

              return (
                <div
                  key={srvId}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-xl ${
                    isDark ? 'bg-[#1a2233] border-[#222d42] text-slate-100 hover:border-purple-500/40' : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-purple-500/40'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Header Row: Icon Avatar + Title + Slug + Edit/Delete Actions */}
                    <div className="flex items-start justify-between gap-3 pb-1">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs">
                          {renderIconComponent(service.icon)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-950 dark:text-white truncate">
                              {service.title}
                            </h3>
                            <button
                              type="button"
                              onClick={() => handleCopySlug(service.slug)}
                              className="p-1 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition"
                              title="Copy URL Slug"
                            >
                              {copiedSlug === service.slug ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 block truncate">
                            /services/{service.slug}
                          </span>
                        </div>
                      </div>

                      {/* Action Pill Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEdit(service)}
                          className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-600 text-purple-700 dark:text-purple-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                          title="Edit Service Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(srvId)}
                          className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white transition cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Kicker Chip Badge */}
                    {service.kicker && (
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold text-purple-700 dark:text-purple-300 bg-purple-500/10 border border-purple-500/20 uppercase tracking-wider">
                          <span>{service.kicker}</span>
                        </span>
                      </div>
                    )}

                    {/* Short Description Text */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
                      {service.shortDesc || service.desc}
                    </p>

                    {/* Feature Checkmark Bullets */}
                    {pointsArr.length > 0 && (
                      <div className="pt-1 space-y-2">
                        {pointsArr.slice(0, 3).map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-200">
                            <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                              ✓
                            </span>
                            <span className="truncate">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Content Count Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        ✓ {pointsArr.length} Feature Bullets
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                        ⚡ {stepsCount} Timeline Phases
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        ❓ {faqsCount} Service FAQs
                      </span>
                    </div>

                  </div>

                  {/* Footer Bar: Preview Link */}
                  <div className="pt-2 flex items-center justify-between text-xs font-bold">
                    <a
                      href={`/services/${service.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-500 no-underline"
                    >
                      <span>Preview Live Detail Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Form Editor */}
        {editing && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
              isDark ? 'bg-[#0f172a] border-purple-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              {/* Sticky Modal Header */}
              <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
                isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className={`text-base font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {editing._id || editing.id ? `Edit Service: ${formData.title || 'Untitled'}` : 'Create New Service Capability'}
                    </h2>
                    <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Configure core metadata, narrative overview, feature bullets, engineering lifecycle, and FAQs
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-500/10 transition cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {inlineNotice.message && (
                  <div className={`p-4 rounded-2xl text-xs font-extrabold ${
                    inlineNotice.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {inlineNotice.message}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Form Inputs (7 Cols) */}
                  <form id="service-form" onSubmit={handleSave} className="lg:col-span-7 space-y-6">
                    {/* 1. Core Metadata Card */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-slate-50 border-slate-200 shadow-2xs'
                    }`}>
                      <div className="flex items-center gap-2 border-b pb-3 border-slate-200/20 dark:border-[#1f2a3e]">
                        <Layers className="w-4 h-4 text-purple-500" />
                        <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                          1. Core Service Metadata
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-extrabold mb-1.5 text-slate-700 dark:text-slate-300">Service Title *</label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            maxLength={100}
                            placeholder="e.g. AI-Powered Software Solutions"
                            required
                            className={`w-full h-10 rounded-xl px-3.5 text-xs font-semibold border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-extrabold mb-1.5 text-slate-700 dark:text-slate-300">URL Slug *</label>
                          <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                            className={`w-full h-10 rounded-xl px-3.5 text-xs font-mono border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-purple-400' : 'bg-white border-slate-300 text-purple-700 font-bold'}`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-extrabold mb-1.5 text-slate-700 dark:text-slate-300">Tagline / Kicker Subtitle</label>
                          <input
                            type="text"
                            value={formData.kicker}
                            onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                            maxLength={100}
                            placeholder="e.g. Custom Intelligence Built For Business"
                            className={`w-full h-10 rounded-xl px-3.5 text-xs font-medium border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold mb-1.5 text-slate-700 dark:text-slate-300">Icon Style</label>
                          <select
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            className={`w-full h-10 rounded-xl px-3.5 text-xs font-semibold border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-slate-200' : 'bg-white border-slate-300 text-slate-900'}`}
                          >
                            {ICON_OPTIONS.map(opt => (
                              <option key={opt.key} value={opt.key}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 2. Narrative Overview Card */}
                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-slate-50 border-slate-200 shadow-2xs'
                    }`}>
                      <div className="flex items-center gap-2 border-b pb-3 border-slate-200/20 dark:border-[#1f2a3e]">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                          2. Narrative Overview
                        </h3>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold mb-1.5 text-slate-700 dark:text-slate-300">Short Summary (for Navbar & Bento Cards)</label>
                        <input
                          type="text"
                          value={formData.shortDesc}
                          onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                          placeholder="Intelligent document processing to predictive analytics..."
                          required
                          className={`w-full h-10 rounded-xl px-3.5 text-xs font-medium border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold mb-1.5 text-slate-700 dark:text-slate-300">Full Detailed Narrative (for Live Detail Page)</label>
                        <textarea
                          rows={3}
                          value={formData.desc}
                          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                          placeholder="We engineer bespoke artificial intelligence, natural language processing, and automated decision engines..."
                          required
                          className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                    </div>

                    {/* 3. Dynamic Lists: Bullets, Lifecycle & FAQs */}
                    <div className={`p-5 rounded-2xl border space-y-6 ${
                      isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-slate-50 border-slate-200 shadow-2xs'
                    }`}>
                      <div className="flex items-center gap-2 border-b pb-3 border-slate-200/20 dark:border-[#1f2a3e]">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          3. Feature Bullets, Timeline & FAQs
                        </h3>
                      </div>

                      {/* Feature Checkmark Bullets Editor */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                            Feature Checkmark Bullets ({formData.points?.length || 0})
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, points: [...(prev.points || []), ''] }))}
                            className="px-3 py-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-full flex items-center gap-1.5 border border-emerald-500/20 transition cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Bullet</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {formData.points?.map((pt, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black shrink-0">
                                ✓
                              </span>
                              <input
                                type="text"
                                value={pt}
                                onChange={(e) => {
                                  const updated = [...formData.points];
                                  updated[index] = e.target.value;
                                  setFormData({ ...formData, points: updated });
                                }}
                                placeholder="e.g. Custom LLM architecture & AI engines"
                                className={`flex-1 h-9 rounded-xl px-3 text-xs font-medium border ${
                                  isDark ? 'bg-[#0f172a] border-[#222d42] text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                                }`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = formData.points.filter((_, i) => i !== index);
                                  setFormData({ ...formData, points: updated });
                                }}
                                className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer shrink-0"
                                title="Remove bullet"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Engineering Lifecycle Timeline Editor */}
                      <div className="space-y-3 pt-4 border-t border-slate-200/20 dark:border-[#1f2a3e]">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                            Engineering Lifecycle Timeline ({formData.processSteps?.length || 0} Phases)
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              processSteps: [...(prev.processSteps || []), { phase: `Phase 0${(prev.processSteps?.length || 0) + 1} • Audit`, title: '', desc: '' }]
                            }))}
                            className="px-3 py-1.5 text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 rounded-full flex items-center gap-1.5 border border-purple-500/20 transition cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Step</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {formData.processSteps?.map((step, index) => (
                            <div key={index} className={`p-3.5 rounded-2xl border space-y-2.5 ${
                              isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-200 shadow-2xs'
                            }`}>
                              <div className="flex items-center justify-between gap-2">
                                <input
                                  type="text"
                                  value={step.phase || ''}
                                  onChange={(e) => {
                                    const updated = [...formData.processSteps];
                                    updated[index] = { ...updated[index], phase: e.target.value };
                                    setFormData({ ...formData, processSteps: updated });
                                  }}
                                  placeholder="Phase (e.g. Phase 01 • Discovery)"
                                  className={`w-1/3 h-9 rounded-xl px-3 text-xs font-extrabold border ${
                                    isDark ? 'bg-[#131927] border-[#222d42] text-purple-400' : 'bg-slate-50 border-slate-300 text-purple-700'
                                  }`}
                                />
                                <input
                                  type="text"
                                  value={step.title || ''}
                                  onChange={(e) => {
                                    const updated = [...formData.processSteps];
                                    updated[index] = { ...updated[index], title: e.target.value };
                                    setFormData({ ...formData, processSteps: updated });
                                  }}
                                  placeholder="Title (e.g. Strategic Requirement Blueprint)"
                                  className={`flex-1 h-9 rounded-xl px-3 text-xs font-bold border ${
                                    isDark ? 'bg-[#131927] border-[#222d42] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = formData.processSteps.filter((_, i) => i !== index);
                                    setFormData({ ...formData, processSteps: updated });
                                  }}
                                  className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer shrink-0"
                                  title="Remove Step"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={step.desc || ''}
                                onChange={(e) => {
                                  const updated = [...formData.processSteps];
                                  updated[index] = { ...updated[index], desc: e.target.value };
                                  setFormData({ ...formData, processSteps: updated });
                                }}
                                placeholder="Detailed explanation of what occurs during this phase..."
                                className={`w-full rounded-xl px-3 py-2 text-xs font-medium border ${
                                  isDark ? 'bg-[#131927] border-[#222d42] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Frequently Asked Questions Editor */}
                      <div className="space-y-3 pt-4 border-t border-slate-200/20 dark:border-[#1f2a3e]">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                            <span>Frequently Asked Questions ({formData.faqs?.length || 0})</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              faqs: [...(prev.faqs || []), { q: '', a: '' }]
                            }))}
                            className="px-3 py-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-full flex items-center gap-1.5 border border-amber-500/20 transition cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add FAQ</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {formData.faqs?.map((faq, index) => (
                            <div key={index} className={`p-3.5 rounded-2xl border space-y-2.5 ${
                              isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-200 shadow-2xs'
                            }`}>
                              <div className="flex items-center justify-between gap-2">
                                <input
                                  type="text"
                                  value={faq.q || ''}
                                  onChange={(e) => {
                                    const updated = [...formData.faqs];
                                    updated[index] = { ...updated[index], q: e.target.value };
                                    setFormData({ ...formData, faqs: updated });
                                  }}
                                  placeholder="Question? (e.g. How long does implementation take?)"
                                  className={`flex-1 h-9 rounded-xl px-3 text-xs font-extrabold border ${
                                    isDark ? 'bg-[#131927] border-[#222d42] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = formData.faqs.filter((_, i) => i !== index);
                                    setFormData({ ...formData, faqs: updated });
                                  }}
                                  className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer shrink-0"
                                  title="Remove FAQ"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={faq.a || ''}
                                onChange={(e) => {
                                  const updated = [...formData.faqs];
                                  updated[index] = { ...updated[index], a: e.target.value };
                                  setFormData({ ...formData, faqs: updated });
                                }}
                                placeholder="Answer explanation..."
                                className={`w-full rounded-xl px-3 py-2 text-xs font-medium border ${
                                  isDark ? 'bg-[#131927] border-[#222d42] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. Cover Image Asset Card */}
                    <div className={`p-5 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-slate-50 border-slate-200 shadow-2xs'
                    }`}>
                      <div className="flex items-center gap-2 border-b pb-3 border-slate-200/20 dark:border-[#1f2a3e]">
                        <Upload className="w-4 h-4 text-indigo-400" />
                        <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>
                          4. Cover Photo & Media Asset URL
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={formData.img}
                          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                          placeholder="Paste image URL or click Upload"
                          className={`w-full h-10 rounded-xl px-3.5 text-xs font-mono border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                        <label className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shrink-0 transition shadow-xs">
                          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                          <span>Upload Photo</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
                        </label>
                      </div>
                    </div>
                  </form>

                  {/* Live Preview Sidebar (5 Cols) */}
                  <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-0">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-500">
                      <Eye className="w-4 h-4" />
                      <span>Live Preview</span>
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 shadow-xl ${
                      isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                          {renderIconComponent(formData.icon)}
                        </div>
                        <div>
                          <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{formData.title || 'Service Title'}</h4>
                          <span className="text-xs font-mono font-bold text-purple-500">/services/{formData.slug || 'slug'}</span>
                        </div>
                      </div>

                      {formData.kicker && (
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                          {formData.kicker}
                        </span>
                      )}

                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {formData.shortDesc || 'Short description summary...'}
                      </p>

                      {formData.points?.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-200/20 dark:border-[#1f2a3e]">
                          {formData.points.slice(0, 3).map((pt, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-medium">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Modal Footer */}
              <div className={`px-6 py-4 border-t flex items-center justify-end gap-3 shrink-0 ${
                isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="service-form"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold rounded-full shadow-sm shadow-purple-600/30 transition cursor-pointer"
                >
                  Save Service Offering
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
