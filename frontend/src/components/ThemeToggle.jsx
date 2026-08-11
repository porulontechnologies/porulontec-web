import { useTheme } from '../context/ThemeContext.jsx';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark and light theme"
      aria-pressed={isDark}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-[#151226] border border-slate-200/80 dark:border-slate-800 shadow-xs text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200 active:scale-90 shrink-0 ${className}`}
    >
      {isDark ? (
        <IoSunnyOutline className="text-[16px] text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <IoMoonOutline className="text-[15px] text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}




