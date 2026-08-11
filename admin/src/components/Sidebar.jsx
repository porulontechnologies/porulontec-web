import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Cpu, 
  GraduationCap,
  FileText,
  Mail, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard },
        { label: 'Dynamic Sections', path: '/sections', icon: Layers, badge: 'Page Builder' },
      ],
    },
    {
      group: 'Core Offerings',
      items: [
        { label: 'Services Manager', path: '/services', icon: Cpu, badge: 'Navbar Synced' },
        { label: 'Training Courses', path: '/training', icon: GraduationCap, badge: 'Navbar Synced' },
      ],
    },
    {
      group: 'Content & Media',
      items: [
        { label: 'Blog Articles', path: '/blogs', icon: FileText },
        { label: 'Contact Messages', path: '/messages', icon: Mail },
        { label: 'Media Library', path: '/media', icon: ImageIcon },
      ],
    },
    {
      group: 'System',
      items: [
        { label: 'Site Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className={`w-64 border-r flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 z-30 ${
      isDark ? 'bg-[#0f1420] border-[#1e293b]' : 'bg-white border-slate-200'
    }`}>
      <div className="overflow-y-auto no-scrollbar">
        {/* Brand Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDark ? 'border-[#1e293b]' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center font-extrabold text-white text-base shadow-md shadow-purple-600/30 border border-white/20">
              P
            </div>
            <div>
              <h1 className={`font-extrabold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Porulon Stack
              </h1>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">
                Admin Control Hub
              </span>
            </div>
          </div>
        </div>

        {/* Nav Category Groups */}
        <div className="p-3.5 space-y-6">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1.5">
              <span className={`px-3 text-[10px] font-extrabold uppercase tracking-widest block ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {grp.group}
              </span>

              <div className="space-y-1">
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? isDark
                              ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-xs'
                              : 'bg-purple-50 text-purple-700 border border-purple-200 font-extrabold shadow-2xs'
                            : isDark
                              ? 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-purple-500 transition-transform group-hover:scale-110" />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                          isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className={`p-4 border-t ${
        isDark ? 'border-[#1e293b] bg-[#0b0e17]' : 'border-slate-200 bg-slate-50/80'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {user?.name || 'Admin Principal'}
              </div>
              <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {user?.email || 'admin@porulon.com'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            title="Logout from Admin Portal"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
