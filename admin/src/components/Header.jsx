import { useState, useEffect } from 'react';
import { getHealth } from '../api/adminApi';
import { Database, ExternalLink, RefreshCw, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header({ title, subtitle }) {
  const [dbStatus, setDbStatus] = useState('checking');
  const { theme, toggleTheme } = useTheme();

  const checkStatus = () => {
    setDbStatus('checking');
    getHealth()
      .then(() => setDbStatus('connected'))
      .catch(() => setDbStatus('disconnected'));
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const isDark = theme === 'dark';

  return (
    <header className={`h-20 backdrop-blur-xl border-b px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 transition-all duration-300 ${
      isDark ? 'bg-[#0f1420]/90 border-[#1e293b]' : 'bg-white/90 border-slate-200 shadow-2xs'
    }`}>
      <div>
        <h2 className={`text-lg sm:text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-xs font-medium tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* DB Connection Status Badge */}
        <button
          onClick={checkStatus}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold ${
            isDark ? 'bg-[#182030] border-[#26334d] hover:border-purple-500/40' : 'bg-slate-100 border-slate-300 hover:border-slate-400'
          }`}
          title="Click to refresh PostgreSQL connection status"
        >
          <Database className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>DB:</span>
          {dbStatus === 'connected' && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Connected
            </span>
          )}
          {dbStatus === 'disconnected' && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Offline / Standby
            </span>
          )}
          {dbStatus === 'checking' && (
            <RefreshCw className="w-3 h-3 text-purple-400 animate-spin" />
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
            isDark 
              ? 'bg-[#182030] border-[#26334d] text-amber-400 hover:bg-[#202b40]' 
              : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
          }`}
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>

        {/* Live Site External Link */}
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-md shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all duration-200 no-underline"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
