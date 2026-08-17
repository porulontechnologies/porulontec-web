import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHealth } from '../api/adminApi';
import { RefreshCw, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header({ title, subtitle }) {
  const [dbStatus, setDbStatus] = useState('checking');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

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

  // Common pill button style for uniform height, shape & alignment
  const pillBaseClass = `h-9 px-4 rounded-full border flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-2xs ${
    isDark 
      ? 'bg-[#131927] border-[#222f46] text-slate-200 hover:border-purple-500/40 hover:bg-[#182032]' 
      : 'bg-slate-100/90 border-slate-200/90 text-slate-800 hover:bg-slate-200/70 hover:border-slate-300'
  }`;

  return (
    <header className={`h-20 backdrop-blur-xl  px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19]/90 border-[#1f2a3e]' : 'bg-white/90 border-slate-200/80 shadow-2xs'
    }`}>
      {/* Left: Website Plus Jakarta Sans Font Heading */}
      <div className="flex flex-col justify-center">
        <h2 className={`font-display text-xl sm:text-2xl font-black tracking-tight leading-tight ${
          isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-xs font-medium tracking-tight mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: Perfectly Aligned Uniform Pill Buttons (Matching Height & Pill Style) */}
      <div className="flex items-center gap-3">
        {/* 1. DB Status Pill Button */}
        <button
          onClick={checkStatus}
          className={pillBaseClass}
          title="Click to refresh PostgreSQL connection status"
        >
          {dbStatus === 'connected' && (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-500 font-extrabold">DB Active</span>
            </>
          )}
          {dbStatus === 'disconnected' && (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-amber-500 font-extrabold">Offline</span>
            </>
          )}
          {dbStatus === 'checking' && (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span className="text-purple-400 font-extrabold">Checking</span>
            </>
          )}
        </button>

        {/* 2. Theme Switcher Pill Button */}
        <button
          onClick={toggleTheme}
          className={pillBaseClass}
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* 3. Notifications Pill Button (Navigates to /messages) */}
        <button
          onClick={() => navigate('/messages')}
          className={pillBaseClass}
          title="Click to view Customer Messages & Inquiries"
        >
          <div className="relative flex items-center justify-center">
            <Bell className="w-4 h-4 text-purple-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          </div>
          <span>Notifications</span>
        </button>
      </div>
    </header>
  );
}
