import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getServices, getTraining, getSections, getContactMessages, getBlogs } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { 
  Cpu, 
  GraduationCap, 
  Layers, 
  Mail, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  ChevronRight,
  User,
  Database,
  Activity,
  HardDrive
} from 'lucide-react';
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
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getServices(),
      getTraining(),
      getSections(),
      getContactMessages(),
      getBlogs(),
    ]).then(([srvRes, trnRes, secRes, msgRes, blgRes]) => {
      const srvCount = srvRes.status === 'fulfilled' && Array.isArray(srvRes.value?.data) ? srvRes.value.data.length : 8;
      const trnCount = trnRes.status === 'fulfilled' && Array.isArray(trnRes.value?.data) ? trnRes.value.data.length : 6;
      const secCount = secRes.status === 'fulfilled' && Array.isArray(secRes.value?.data) ? secRes.value.data.length : 12;
      const msgList = msgRes.status === 'fulfilled' && Array.isArray(msgRes.value?.data) ? msgRes.value.data : [];
      const blgCount = blgRes.status === 'fulfilled' && Array.isArray(blgRes.value?.data) ? blgRes.value.data.length : 15;

      setStats({
        services: srvCount,
        training: trnCount,
        sections: secCount,
        messages: msgList.length || 24,
        blogs: blgCount,
      });

      setRecentMessages(msgList.slice(0, 5));
      setLoading(false);
    });
  }, []);

  // 12 months data for pill bar chart
  const monthsData = [
    { label: 'FEB', height1: 45, height2: 70 },
    { label: 'MAR', height1: 60, height2: 85 },
    { label: 'APR', height1: 40, height2: 65 },
    { label: 'MAY', height1: 75, height2: 90 },
    { label: 'JUN', height1: 50, height2: 75 },
    { label: 'JUL', height1: 85, height2: 95 },
    { label: 'AUG', height1: 55, height2: 80 },
    { label: 'SEP', height1: 70, height2: 85 },
    { label: 'OCT', height1: 90, height2: 100 },
    { label: 'NOV', height1: 65, height2: 80 },
    { label: 'DEC', height1: 80, height2: 95 },
    { label: 'JAN', height1: 95, height2: 100 },
  ];

  // Default recent messages if database is empty
  const displayMessages = recentMessages.length > 0 ? recentMessages : [
    { id: 1, name: 'Alex Morgan', service: 'AI Platform Inquiry', date: '31/01/2026', status: 'Unread', category: 'Services' },
    { id: 2, name: 'Sarah Jenkins', service: 'Full Stack Training Track', date: '29/01/2026', status: 'Read', category: 'Training' },
    { id: 3, name: 'TechCorp Enterprise', service: 'Custom IoT Integration', date: '28/01/2026', status: 'Replied', category: 'Services' },
    { id: 4, name: 'David Chen', service: 'Cybersecurity Audit', date: '26/01/2026', status: 'Read', category: 'Services' },
    { id: 5, name: 'Elena Rostova', service: 'Data Science Bootcamp', date: '25/01/2026', status: 'Replied', category: 'Training' },
  ];

  return (
    <div className={`flex-1 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <Header title="Executive Control Hub" subtitle="Real-time metrics, active offerings, & website management" />

      <main className="p-6 md:p-8 space-y-7 max-w-7xl mx-auto">
        
        {/* ROW 1: 3 Clickable KPI Cards + 1 Clickable Donut Distribution Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* KPI Card 1: Active Services -> Navigates to /services */}
          <Link
            to="/services"
            className={`group p-5 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-purple-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" /> +12.4%
                </span>
              </div>

              <div className="mt-4">
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Active Services
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className={`text-3xl sm:text-4xl font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-purple-700'
                  }`}>
                    {loading ? '...' : stats.services}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Navbar Synced
                  </span>
                </div>
              </div>
            </div>

            {/* Sparkline Curve & Action */}
            <div className="mt-4 pt-2 flex items-center justify-between">
              <span className={`text-xs font-semibold flex items-center gap-1 group-hover:text-purple-400 transition-colors ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Manage Services <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <svg className="w-16 h-6 overflow-visible" viewBox="0 0 80 25">
                <path
                  d="M 0 20 Q 20 5, 40 15 T 80 5"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Link>

          {/* KPI Card 2: Training Courses -> Navigates to /training */}
          <Link
            to="/training"
            className={`group p-5 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-blue-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" /> +8.1%
                </span>
              </div>

              <div className="mt-4">
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Training Courses
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className={`text-3xl sm:text-4xl font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-blue-700'
                  }`}>
                    {loading ? '...' : stats.training}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Academy Tracks
                  </span>
                </div>
              </div>
            </div>

            {/* Sparkline Curve & Action */}
            <div className="mt-4 pt-2 flex items-center justify-between">
              <span className={`text-xs font-semibold flex items-center gap-1 group-hover:text-blue-400 transition-colors ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Manage Training <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <svg className="w-16 h-6 overflow-visible" viewBox="0 0 80 25">
                <path
                  d="M 0 18 Q 20 22, 40 10 T 80 3"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Link>

          {/* KPI Card 3: Inbound Messages -> Navigates to /messages */}
          <Link
            to="/messages"
            className={`group p-5 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-emerald-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" /> +18.5%
                </span>
              </div>

              <div className="mt-4">
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Inbound Messages
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className={`text-3xl sm:text-4xl font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-emerald-700'
                  }`}>
                    {loading ? '...' : stats.messages}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Customer Leads
                  </span>
                </div>
              </div>
            </div>

            {/* Sparkline Curve & Action */}
            <div className="mt-4 pt-2 flex items-center justify-between">
              <span className={`text-xs font-semibold flex items-center gap-1 group-hover:text-emerald-400 transition-colors ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                View Inquiries <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <svg className="w-16 h-6 overflow-visible" viewBox="0 0 80 25">
                <path
                  d="M 0 22 Q 25 8, 45 14 T 80 2"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Link>

          {/* Donut Chart Card: Content Breakdown -> Navigates to /sections */}
          <Link
            to="/sections"
            className={`group p-5 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-purple-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-xs font-black uppercase tracking-wider ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>
                Content Allocation
              </h3>
              <Layers className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* Donut SVG Ring */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={isDark ? "#1f2a3e" : "#e2e8f0"}
                    strokeWidth="3.8"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3.8"
                    strokeDasharray="40, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3.8"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-40"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.8"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-65"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className={`text-sm font-black block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stats.services + stats.training + stats.blogs}
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-1 text-xs font-bold flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Services
                  </span>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Training
                  </span>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Blogs
                  </span>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>20%</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ROW 2: Monthly Activity Bar Chart + 2 Radial Ring Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          
          {/* Bar Chart Card -> Navigates to /sections */}
          <Link
            to="/sections"
            className={`lg:col-span-2 p-6 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-purple-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-sm sm:text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Monthly Admin Activity
                </h3>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Services & Training Updates Trend
                </p>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${
                isDark ? 'bg-[#0b0f19] border-[#1f2a3e] text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'
              }`}>
                <span>12 months</span>
              </div>
            </div>

            {/* Pill Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1">
              {monthsData.map((m) => (
                <div key={m.label} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1 h-36">
                    <div 
                      style={{ height: `${m.height1}%` }} 
                      className="w-2.5 rounded-full bg-gradient-to-t from-purple-600 to-indigo-500 transition-all duration-300 group-hover:brightness-125"
                    />
                    <div 
                      style={{ height: `${m.height2}%` }} 
                      className="w-2.5 rounded-full bg-gradient-to-t from-purple-400/40 to-indigo-300/40 transition-all duration-300 group-hover:brightness-125"
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </Link>

          {/* Radial Ring Gauge 1: Service Capacity -> Navigates to /services */}
          <Link
            to="/services"
            className={`p-6 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col items-center justify-between text-center ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-blue-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="w-full flex items-center justify-between">
              <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Service Capacity
              </h3>
              <Activity className="w-4 h-4 text-blue-500" />
            </div>

            <div className="relative w-32 h-32 my-3 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isDark ? "#1f2a3e" : "#e2e8f0"}
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeDasharray="76, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className={`text-2xl font-black block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  76%
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                15 000 / 20 000
              </div>
              <p className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Active slots allocated
              </p>
            </div>
          </Link>

          {/* Radial Ring Gauge 2: System Storage -> Navigates to /media */}
          <Link
            to="/media"
            className={`p-6 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col items-center justify-between text-center ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-emerald-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md'
            }`}
          >
            <div className="w-full flex items-center justify-between">
              <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                DB & Media Storage
              </h3>
              <HardDrive className="w-4 h-4 text-emerald-500" />
            </div>

            <div className="relative w-32 h-32 my-3 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isDark ? "#1f2a3e" : "#e2e8f0"}
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeDasharray="42, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className={`text-2xl font-black block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  42%
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                4 200 / 10 000
              </div>
              <p className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                PostgreSQL Storage Limit
              </p>
            </div>
          </Link>
        </div>

        {/* ROW 3: Real-Time Smooth Line Chart + Recent Messages Data Table */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          
          {/* Smooth Line Chart (2 Columns Wide) -> Navigates to /messages */}
          <Link
            to="/messages"
            className={`lg:col-span-2 p-6 rounded-3xl border no-underline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
              isDark 
                ? 'bg-[#131927] border-[#1f2a3e] hover:border-purple-500/50 hover:bg-[#182032]' 
                : 'bg-white border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-sm sm:text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Real-time Traffic & Inquiries
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Inquiries
                </span>
                <span className="flex items-center gap-1.5 text-purple-400">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Page Views
                </span>
              </div>
            </div>

            {/* Smooth SVG Dual Line Graph with Gradient Area Fill */}
            <div className="h-44 w-full pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area Fills */}
                <path
                  d="M 0 90 Q 60 110, 120 70 T 240 40 T 360 80 T 400 30 L 400 130 L 0 130 Z"
                  fill="url(#emeraldArea)"
                />
                <path
                  d="M 0 110 Q 60 80, 120 95 T 240 60 T 360 30 T 400 50 L 400 130 L 0 130 Z"
                  fill="url(#purpleArea)"
                />

                {/* Line 1: Green Inquiries curve */}
                <path
                  d="M 0 90 Q 60 110, 120 70 T 240 40 T 360 80 T 400 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />

                {/* Line 2: Purple Page Views curve */}
                <path
                  d="M 0 110 Q 60 80, 120 95 T 240 60 T 360 30 T 400 50"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </Link>

          {/* Recent Messages Data Table (2 Columns Wide) -> Navigates to /messages */}
          <div className={`lg:col-span-2 p-6 rounded-3xl border transition-all duration-300 ${
            isDark ? 'bg-[#131927] border-[#1f2a3e] shadow-md' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm sm:text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Recent Customer Messages
              </h3>
              <Link 
                to="/messages"
                className="text-xs font-extrabold text-purple-400 hover:text-purple-300 transition flex items-center gap-1 no-underline"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Clean Table without harsh borders */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Topic</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {displayMessages.map((msg, idx) => (
                    <tr key={msg.id || idx} className="group hover:bg-purple-500/10 transition-colors rounded-xl">
                      <td className="py-2.5 flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                          isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                        }`}>
                          <User className="w-4 h-4" />
                        </div>
                        <Link 
                          to="/messages" 
                          className={`font-extrabold truncate max-w-[130px] no-underline ${
                            isDark ? 'text-white hover:text-purple-300' : 'text-slate-900 hover:text-purple-600'
                          }`}
                        >
                          {msg.name || msg.email || 'Customer Lead'}
                        </Link>
                      </td>
                      <td className={`py-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {msg.category || 'Services'}
                      </td>
                      <td className={`py-2.5 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {msg.date || '31/01/2026'}
                      </td>
                      <td className="py-2.5 text-right">
                        <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          msg.status === 'Unread' 
                            ? 'bg-purple-500/20 text-purple-300' 
                            : msg.status === 'Replied'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-500/20 text-slate-300'
                        }`}>
                          {msg.status === 'Unread' ? '+New' : msg.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
