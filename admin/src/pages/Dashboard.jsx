import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getServices, getTraining, getSections, getContactMessages, getBlogs } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { Cpu, GraduationCap, Layers, Mail, Plus, ExternalLink, Activity, Database, CheckCircle2, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [stats, setStats] = useState({
    services: 0,
    training: 0,
    sections: 0,
    messages: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getServices(),
      getTraining(),
      getSections(),
      getContactMessages(),
      getBlogs(),
    ]).then(([srvRes, trnRes, secRes, msgRes, blgRes]) => {
      setStats({
        services: srvRes.status === 'fulfilled' && Array.isArray(srvRes.value?.data) ? srvRes.value.data.length : 0,
        training: trnRes.status === 'fulfilled' && Array.isArray(trnRes.value?.data) ? trnRes.value.data.length : 0,
        sections: secRes.status === 'fulfilled' && Array.isArray(secRes.value?.data) ? secRes.value.data.length : 0,
        messages: msgRes.status === 'fulfilled' && Array.isArray(msgRes.value?.data) ? msgRes.value.data.length : 0,
        blogs: blgRes.status === 'fulfilled' && Array.isArray(blgRes.value?.data) ? blgRes.value.data.length : 0,
      });
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'Active Services', count: stats.services, icon: Cpu, color: 'from-purple-600 to-indigo-600', link: '/services', subtitle: 'Synced with Navbar & Pages' },
    { label: 'Training Programs', count: stats.training, icon: GraduationCap, color: 'from-indigo-600 to-blue-600', link: '/training', subtitle: 'Synced with Navbar & Pages' },
    { label: 'Dynamic Page Sections', count: stats.sections, icon: Layers, color: 'from-emerald-600 to-teal-600', link: '/sections', subtitle: 'Page Content Builder' },
    { label: 'Blog Articles', count: stats.blogs, icon: FileText, color: 'from-amber-600 to-orange-600', link: '/blogs', subtitle: 'News & Insights' },
    { label: 'Customer Inquiries', count: stats.messages, icon: Mail, color: 'from-pink-600 to-rose-600', link: '/messages', subtitle: 'Inbound Messages' },
  ];

  return (
    <div className={`flex-1 min-h-screen transition-colors ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header title="Executive Control Hub" subtitle="High-level metrics, active offerings, and page management" />

      <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isDark 
            ? 'bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-[#121824] border-purple-500/30' 
            : 'bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-purple-200'
        }`}>
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-[11px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> System Operational
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Porulon Enterprise Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Manage all services, training courses, page layouts, blog articles, and customer inquiries with real-time PostgreSQL synchronization.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 shrink-0">
            <Link
              to="/services"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-purple-600/30 transition"
            >
              <Cpu className="w-4 h-4" />
              <span>Manage Services</span>
            </Link>
            <Link
              to="/training"
              className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-2xl border border-white/20 backdrop-blur-md transition"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Manage Training</span>
            </Link>
          </div>
        </div>

        {/* Stats Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.label}
                to={c.link}
                className={`group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 transform hover:-translate-y-1 ${
                  isDark ? 'bg-[#121824] border-[#1f293d] hover:border-purple-500/40 hover:shadow-lg' : 'bg-white border-slate-200 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </div>
                <div className="text-3xl font-extrabold tracking-tight">{loading ? '...' : c.count}</div>
                <div className="text-xs font-bold mt-1 text-slate-200">{c.label}</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">{c.subtitle}</div>
              </Link>
            );
          })}
        </div>

        {/* Architecture & Dynamic Sync Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-3xl border p-6 ${
            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h3 className="text-base font-extrabold mb-4 flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-purple-400" />
              <span>Database & System Architecture</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className={`flex justify-between items-center p-3 rounded-2xl border ${
                isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-slate-400 font-medium">Database System:</span>
                <span className="font-mono text-purple-400 font-bold">PostgreSQL (porulonstack)</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-2xl border ${
                isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-slate-400 font-medium">ORM Engine:</span>
                <span className="font-mono text-emerald-400 font-bold">Sequelize v6</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-2xl border ${
                isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-slate-400 font-medium">API Endpoints:</span>
                <span className="font-mono text-blue-400 font-bold">http://localhost:5000/api</span>
              </div>
            </div>
          </div>

          <div className={`rounded-3xl border p-6 ${
            isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h3 className="text-base font-extrabold mb-4 flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-emerald-400" />
              <span>Interlinked Sync Guarantees</span>
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 font-medium">
                  <strong>Services Interlinking:</strong> Navbar Dropdown + Services Page Cards + Detail Page (`/services/:slug`) sync automatically on create/edit.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 font-medium">
                  <strong>Training Interlinking:</strong> Navbar Training Dropdown + Training Tracks Grid + Detail Page (`/training/:slug`) sync automatically on create/edit.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 font-medium">
                  <strong>Live Preview Cards:</strong> Visual side-by-side card & dropdown preview in Admin editors before saving changes.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
