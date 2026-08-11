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

  const parseSteps = (str) => {
    if (!str || typeof str !== 'string') return Array.isArray(str) ? str : [];
    return str.split('\n').filter(Boolean).map(line => {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 3) return { phase: parts[0], title: parts[1], desc: parts[2] };
      if (parts.length === 2) return { phase: 'Phase', title: parts[0], desc: parts[1] };
      return { phase: 'Phase', title: parts[0], desc: '' };
    });
  };

  const parseFaqs = (str) => {
    if (!str || typeof str !== 'string') return Array.isArray(str) ? str : [];
    return str.split('\n').filter(Boolean).map(line => {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 2) return { q: parts[0], a: parts[1] };
      return { q: parts[0], a: '' };
    });
  };

  const handleEdit = (service) => {
    setEditing(service);
    const stepsStr = Array.isArray(service.processSteps)
      ? service.processSteps.map(s => `${s.phase || ''} | ${s.title || ''} | ${s.desc || ''}`).join('\n')
      : service.processSteps || '';
    const faqsStr = Array.isArray(service.faqs)
      ? service.faqs.map(f => `${f.q || ''} | ${f.a || ''}`).join('\n')
      : service.faqs || '';

    setFormData({
      slug: service.slug || '',
      kicker: service.kicker || '',
      title: service.title || '',
      shortDesc: service.shortDesc || '',
      desc: service.desc || '',
      points: Array.isArray(service.points) ? service.points.join('\n') : service.points || '',
      processSteps: stepsStr,
      faqs: faqsStr,
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
      points: 'Custom system architecture & LLM models\nPredictive analytics & forecasting\nReal-time telemetry and 24/7 SLA',
      processSteps: 'Phase 01 • Discovery | Strategic Requirement Blueprint | Evaluate workflows and technical feasibility.\nPhase 02 • Build | Custom Engineering & Zero-Trust Security | Develop microservices with zero-downtime CI/CD.\nPhase 03 • Deploy | Production Launch & Enterprise SLA | Production monitoring and guaranteed 99.99% availability.',
      faqs: 'How long does implementation take? | Initial proof of concept is delivered in 2 to 4 weeks.\nCan this service integrate with legacy IT? | Yes, via decoupled REST APIs and middleware adapters.',
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
      points: typeof formData.points === 'string'
        ? formData.points.split('\n').map((p) => p.trim()).filter(Boolean)
        : formData.points,
      processSteps: parseSteps(formData.processSteps),
      faqs: parseFaqs(formData.faqs),
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
        
        {/* Top Header Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl ${
          isDark ? 'bg-gradient-to-r from-purple-950/40 via-[#181132] to-[#0f172a] border-purple-500/20' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                Database Sync Control Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Manage Services & Capabilities ({services.length})
            </h1>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Create, edit, and organize technology offerings, checkmark features, engineering timelines, and service-specific FAQs.
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-lg shadow-purple-600/30 shrink-0 transition hover:scale-105 active:scale-95 cursor-pointer"
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
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-500/10">
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
                  <div className="pt-3 border-t border-slate-500/10 flex items-center justify-between text-xs font-bold">
                    <a
                      href={`/services/${service.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:underline"
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
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className={`w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border p-6 md:p-8 shadow-2xl ${
              isDark ? 'bg-[#0f172a] border-purple-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex justify-between items-center pb-4 border-b border-slate-500/10 mb-6">
                <div>
                  <h2 className="text-lg font-extrabold flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-5 h-5" />
                    <span>{editing._id || editing.id ? 'Edit Service Capability' : 'Add New Service Capability'}</span>
                  </h2>
                  <p className="text-xs text-slate-400">All changes synchronize across the frontend Navbar dropdown and detail routes.</p>
                </div>
                <button onClick={() => setEditing(null)} className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition cursor-pointer">✕ Close</button>
              </div>

              {inlineNotice.message && (
                <div className={`p-4 rounded-2xl mb-4 text-xs font-bold ${
                  inlineNotice.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {inlineNotice.message}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Input Columns (7 Cols) */}
                <form onSubmit={handleSave} className="lg:col-span-7 space-y-4">
                  {/* Basic Metadata */}
                  <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>1. Core Service Metadata</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold mb-1">Service Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          maxLength={100}
                          placeholder="e.g. AI-Powered Software Solutions"
                          required
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-semibold border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">URL Slug (e.g. ai-solutions)</label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          required
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold mb-1">Kicker Subtitle / Tagline</label>
                        <input
                          type="text"
                          value={formData.kicker}
                          onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                          maxLength={100}
                          placeholder="e.g. Custom Intelligence Built For Business"
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                        />
                      </div>

                      {/* React Icon Selector Dropdown */}
                      <div>
                        <label className="block text-xs font-bold mb-1">React Icon Style</label>
                        <select
                          value={formData.icon}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                          className={`w-full rounded-xl px-3.5 py-2 text-xs font-semibold border ${isDark ? 'bg-[#1a2233] border-[#222d42] text-slate-200' : 'bg-slate-50 border-slate-300'}`}
                        >
                          {ICON_OPTIONS.map(opt => (
                            <option key={opt.key} value={opt.key}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Narrative Descriptions */}
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-700/50 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>2. Narrative Overview</span>
                    </span>

                    <div>
                      <label className="block text-xs font-bold mb-1">Short Summary (for Navbar Dropdown & Bento Grid)</label>
                      <input
                        type="text"
                        value={formData.shortDesc}
                        onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                        placeholder="Intelligent document processing to predictive analytics..."
                        required
                        className={`w-full rounded-xl px-3.5 py-2 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Full Detailed Narrative (for `/services/:slug`)</label>
                      <textarea
                        rows={3}
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        placeholder="We engineer bespoke artificial intelligence, natural language processing, and automated decision engines..."
                        required
                        className={`w-full rounded-xl px-3.5 py-2 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                      />
                    </div>
                  </div>

                  {/* 3. FEATURE POINTS & ENGINEERING PROCESS */}
                  <div className="p-4.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>3. FEATURE POINTS & ENGINEERING PROCESS</span>
                    </span>

                    <div>
                      <label className="block text-xs font-bold mb-1">Feature Checkmark Bullets (One point per line)</label>
                      <textarea
                        rows={4}
                        value={formData.points}
                        onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                        placeholder="Custom NLP and conversational AI systems&#10;Predictive analytics and forecasting models&#10;Computer vision for quality control and inspection"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Engineering Lifecycle Timeline (Format: Phase | Title | Description)</label>
                      <textarea
                        rows={4}
                        value={formData.processSteps}
                        onChange={(e) => setFormData({ ...formData, processSteps: e.target.value })}
                        placeholder="Phase 01 • Audit | Discovery & Blueprint | Strategic requirement mapping and architecture setup&#10;Phase 02 • Build | Core Pipeline | Custom model training and microservices development&#10;Phase 03 • Deploy | Production Launch | 24/7 SLA monitoring and cloud scaling"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono border ${isDark ? 'bg-[#1a2233] border-[#222d42] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Frequently Asked Questions (Format: Question ? | Answer)</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.faqs}
                        onChange={(e) => setFormData({ ...formData, faqs: e.target.value })}
                        placeholder="How long does implementation take? | Initial proof of concept is delivered in 2 to 4 weeks.&#10;Can it integrate with legacy IT? | Yes via REST APIs and middleware adapters."
                        className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono border ${isDark ? 'bg-[#1a2233] border-[#222d42] text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                      />
                    </div>
                  </div>

                  {/* 4. Cover Photo Asset */}
                  <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>4. Cover Photo & Media Asset URL</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.img}
                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                        placeholder="Paste Unsplash image URL or click Upload"
                        className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                      />
                      <label className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                        {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>Upload Photo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-500/10">
                    <button type="button" onClick={() => setEditing(null)} className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold rounded-xl shadow-lg hover:opacity-90 transition cursor-pointer">Save Service Offering</button>
                  </div>
                </form>

                {/* Live Preview Column (5 Cols) */}
                <div className="lg:col-span-5 space-y-4 sticky top-6">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-purple-400">
                    <Eye className="w-4 h-4" />
                    <span>Real-Time Live Preview</span>
                  </div>

                  {/* 1. Navbar Dropdown Item Live Preview */}
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 block">
                      1. Navbar Dropdown Menu Preview
                    </span>
                    <div className="p-3 rounded-xl bg-[#0b0914] border border-purple-500/20 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center text-sm shrink-0">
                        {renderIconComponent(formData.icon)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">{formData.title || 'Service Title'}</h4>
                          <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{formData.shortDesc || 'Short description...'}</p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Clean Text Card Live Preview */}
                  <div className="p-5 rounded-3xl bg-[#0b0914] border border-purple-500/30 space-y-3.5 shadow-2xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 block">
                      2. Clean Service Card Live Preview
                    </span>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold">
                            {renderIconComponent(formData.icon)}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white leading-tight">{formData.title || 'Service Title'}</h4>
                            <span className="text-[10px] font-mono text-purple-400 font-bold block">/services/{formData.slug || 'service'}</span>
                          </div>
                        </div>
                      </div>

                      {formData.kicker && (
                        <div className="inline-flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          <span>{formData.kicker}</span>
                        </div>
                      )}
                      
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{formData.shortDesc || 'Short description...'}</p>

                      {/* Clean Bullet List Preview */}
                      {(formData.points ? (typeof formData.points === 'string' ? formData.points.split('\n').filter(Boolean) : formData.points) : []).length > 0 && (
                        <div className="pt-2 space-y-1.5">
                          {(typeof formData.points === 'string' ? formData.points.split('\n').filter(Boolean) : formData.points).slice(0, 3).map((pt, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                              <span className="w-3.5 h-3.5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[9px] font-bold shrink-0">
                                ✓
                              </span>
                              <span className="truncate">{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Button Preview */}
                      <div className="pt-3 flex justify-end">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-[10px]">
                          <span>Live Route</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
