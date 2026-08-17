import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getSiteSettings, updateSiteSettings, uploadMediaFile } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { Settings, Save, Check, Globe, Building, Phone, Mail, MapPin, Share2, Upload, Loader2, Eye, Type, Search, Sparkles, Palette } from 'lucide-react';
import { GOOGLE_FONTS_LIST } from '../data/googleFonts.js';
import { COLOR_THEME_PRESETS } from '../data/colorPresets.js';

export default function SettingsManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [settings, setSettings] = useState({
    siteName: 'Porulon Technologies',
    tagline: 'Engineering Intelligent Futures',
    logoUrl: '',
    logoText: 'Porulon',
    logoSubtext: 'Technologies',
    fontFamily: 'Plus Jakarta Sans',
    contactPhone: '+1 (555) 019-2834',
    contactEmail: 'hello@porulon.tech',
    contactAddress: '100 Innovation Way, Tech District, CA 94107',
    whatsappNumber: '+15550192834',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      facebook: '',
    },
    footerText: 'Engineering intelligent futures through custom AI solutions, ML platforms, and enterprise automation.',
    copyrightText: 'Porulon Technologies Inc. All rights reserved.',
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchFont, setSearchFont] = useState('');
  const [fontCategory, setFontCategory] = useState('All');
  const [searchTheme, setSearchTheme] = useState('');
  const [themeCategory, setThemeCategory] = useState('All');
  const [visibleThemeCount, setVisibleThemeCount] = useState(30);

  useEffect(() => {
    getSiteSettings()
      .then((res) => {
        if (res.data) setSettings(prev => ({ ...prev, ...res.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Dynamically load Google Font in Admin for instant typography live preview
  useEffect(() => {
    const font = settings.fontFamily || 'Plus Jakarta Sans';
    const fontId = 'admin-google-font-preview';
    let linkElem = document.getElementById(fontId);
    if (!linkElem) {
      linkElem = document.createElement('link');
      linkElem.id = fontId;
      linkElem.rel = 'stylesheet';
      document.head.appendChild(linkElem);
    }
    const formattedFont = font.replace(/ /g, '+');
    linkElem.href = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@300;400;500;600;700;800&display=swap`;
  }, [settings.fontFamily]);

  const filteredFonts = GOOGLE_FONTS_LIST.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchFont.toLowerCase());
    const matchesCat = fontCategory === 'All' || f.category === fontCategory;
    return matchesSearch && matchesCat;
  });

  const filteredThemes = COLOR_THEME_PRESETS.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTheme.toLowerCase()) ||
                          t.primary.toLowerCase().includes(searchTheme.toLowerCase()) ||
                          t.secondary.toLowerCase().includes(searchTheme.toLowerCase());
    const matchesCat = themeCategory === 'All' || t.category === themeCategory;
    return matchesSearch && matchesCat;
  });

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMediaFile(file);
      const url = res.data.fileUrl || res.data.url;
      setSettings(prev => ({ ...prev, logoUrl: url }));
    } catch (err) {
      alert('Failed to upload logo photo: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSiteSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to update settings: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={`flex-1 min-h-screen transition-colors ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header title="Site Settings & Global Branding" subtitle="Configure logo text, contact details, social channels, and footer copy" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Simple & Neat Top Action Bar */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <h1 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Website Branding & Global Settings
          </h1>
          <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Configure brand name, logo photo, contact details, and footer copy
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Settings saved successfully! Frontend Navbar & Footer updated live.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`rounded-3xl border p-6 md:p-8 space-y-6 shadow-2xl ${
          isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
        }`}>
          {/* Section 1: Branding & Identity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-500/10 pb-2">
              <h3 className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                <Building className="w-4 h-4" />
                <span>1. Company Branding & Logo Photo</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-400">Updates Header Navbar & Footer Logo live</span>
            </div>

            {/* Logo Photo Upload & URL Field */}
            <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-200'}`}>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-100">Company Logo Photo / Image Asset</label>
              <p className="text-[11px] text-slate-400">Upload a custom PNG/SVG logo photo or paste a URL below. When saved, it renders live in top Navbar & Footer.</p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={settings.logoUrl || ''}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  placeholder="e.g. /images/logo.png or uploaded image URL"
                  className={`flex-1 rounded-xl px-3.5 py-2.5 text-xs font-mono border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-purple-400' : 'bg-white border-slate-300 text-purple-700 font-bold'}`}
                />
                <label className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shrink-0 transition shadow-xs">
                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  <span>Upload Logo Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
                </label>
              </div>

              {/* Logo Live Preview */}
              <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-300'}`}>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span>Logo Live Rendering Preview:</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0c081e] border border-purple-500/20">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo Preview" className="h-9 w-auto max-w-[240px] object-contain" />
                  ) : (
                    <img src="/images/logo.png" alt="Logo Preview" className="h-9 w-auto max-w-[240px] object-contain" />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Company Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Company Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Logo Main Brand Text (Fallback)</label>
                <input
                  type="text"
                  value={settings.logoText}
                  onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Logo Subtext (Fallback)</label>
                <input
                  type="text"
                  value={settings.logoSubtext}
                  onChange={(e) => setSettings({ ...settings, logoSubtext: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
            </div>
          </div>

            {/* Section 2: Global Website Typography & 500+ Google Fonts */}
            <div className="space-y-4 pt-4 border-t border-slate-500/10">
              <div className="flex items-center justify-between border-b border-slate-500/10 pb-2">
                <h3 className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                  <Type className="w-4 h-4" />
                  <span>2. Global Website Typography & 500+ Google Fonts</span>
                </h3>
                <span className={`px-3 py-1 rounded-full border font-mono text-[11px] font-bold shrink-0 ${
                  isDark ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-100 border-purple-300 text-purple-800'
                }`}>
                  Selected: {settings.fontFamily || 'Plus Jakarta Sans'}
                </span>
              </div>

              {/* 500+ Google Fonts Selector & Live Typography Preview Card */}
              <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[11px] text-slate-400">Select any Google Font below. When saved, it dynamically changes the font of the entire live website.</p>

                {/* Search & Category Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={searchFont}
                      onChange={(e) => setSearchFont(e.target.value)}
                      placeholder="Search 500+ Google Fonts (e.g. Poppins, Outfit, Inter, Space Grotesk...)"
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-slate-100' : 'bg-white border-slate-300'}`}
                    />
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
                    {['All', 'Sans-Serif', 'Serif', 'Display', 'Monospace', 'Handwriting'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFontCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition whitespace-nowrap ${
                          fontCategory === cat
                            ? 'bg-purple-600 text-white'
                            : isDark
                            ? 'bg-[#0f172a] text-slate-400 hover:text-white'
                            : 'bg-white border border-slate-300 text-slate-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selector Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Select Font Family ({filteredFonts.length} fonts found):</label>
                  <select
                    value={settings.fontFamily || 'Plus Jakarta Sans'}
                    onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                    className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold border transition ${
                      isDark ? 'bg-[#0f172a] border-[#222d42] text-purple-400' : 'bg-white border-slate-300 text-purple-700'
                    }`}
                  >
                    {filteredFonts.map((f, idx) => (
                      <option key={`${f.name}-${idx}`} value={f.name}>
                        {f.name} ({f.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live Typography Preview Card */}
                <div className={`p-5 rounded-xl border space-y-2 transition-all ${
                  isDark ? 'bg-[#0f172a] border-purple-500/20' : 'bg-white border-purple-500/20 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-500/10 pb-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-purple-400">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span>Live Typography Preview (Font: {settings.fontFamily || 'Plus Jakarta Sans'})</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Active Live Render</span>
                  </div>

                  <div style={{ fontFamily: `'${settings.fontFamily || 'Plus Jakarta Sans'}', sans-serif` }} className="space-y-1.5 pt-1">
                    <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                      {settings.siteName || 'Porulon Technologies'} — {settings.tagline || 'Engineering Intelligent Futures'}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Architecting enterprise AI, cloud systems, and intelligent software ecosystems that accelerate digital transformation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Global Website 500+ Color Themes & Palette Picker */}
            <div className="space-y-4 pt-4 border-t border-slate-500/10">
              <div className="flex items-center justify-between border-b border-slate-500/10 pb-2">
                <h3 className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                  <Palette className="w-4 h-4" />
                  <span>3. Global Website 500+ Color Themes & Palette Picker</span>
                </h3>
                <span className={`px-3 py-1 rounded-full border font-mono text-[11px] font-bold shrink-0 flex items-center gap-1.5 ${
                  isDark ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-100 border-purple-300 text-purple-800'
                }`}>
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: settings.primaryColor || '#7c3aed' }}></span>
                  <span>Active: {settings.themePreset || 'Quantum Violet'}</span>
                </span>
              </div>

              {/* 500+ Color Themes & Custom Color Wheel Picker Card */}
              <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-200'}`}>

              {/* 500+ Theme Search Bar & Category Filter Pills */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTheme}
                    onChange={(e) => setSearchTheme(e.target.value)}
                    placeholder="Search 500+ Color Themes (e.g. Violet, Cyber, Emerald, Amber, Cobalt, Gold...)"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${isDark ? 'bg-[#0f172a] border-[#222d42] text-slate-100' : 'bg-white border-slate-300'}`}
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
                  {['All', 'Violet & Purple', 'Blue & Cyan', 'Green & Emerald', 'Amber & Gold', 'Red & Coral', 'Indigo & Tech', 'Neon & Cyber', 'Pastel & Minimal'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setThemeCategory(cat); setVisibleThemeCount(30); }}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition whitespace-nowrap ${
                        themeCategory === cat
                          ? 'bg-purple-600 text-white'
                          : isDark
                          ? 'bg-[#0f172a] text-slate-400 hover:text-white'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 pt-1">
                <span>Showing {Math.min(visibleThemeCount, filteredThemes.length)} of {filteredThemes.length} Color Themes</span>
                {filteredThemes.length > visibleThemeCount && (
                  <button
                    type="button"
                    onClick={() => setVisibleThemeCount(prev => prev + 50)}
                    className="text-purple-400 hover:underline cursor-pointer"
                  >
                    + Load More Themes
                  </button>
                )}
              </div>

              {/* Theme Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5 max-h-[360px] overflow-y-auto p-1 border rounded-xl border-slate-500/10">
                {filteredThemes.slice(0, visibleThemeCount).map((preset) => {
                  const isSelected = settings.primaryColor?.toLowerCase() === preset.primary.toLowerCase();
                  return (
                    <button
                      key={`${preset.id}-${preset.name}`}
                      type="button"
                      onClick={() => setSettings(prev => ({ ...prev, primaryColor: preset.primary, secondaryColor: preset.secondary, themePreset: preset.name }))}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500/15 shadow-md scale-[1.02]'
                          : isDark
                          ? 'bg-[#0f172a] border-[#222d42] hover:border-slate-600'
                          : 'bg-white border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-xs" style={{ backgroundColor: preset.primary }}></span>
                        <span className="w-3 h-3 rounded-full border border-white/20 shrink-0 shadow-xs" style={{ backgroundColor: preset.secondary }}></span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10.5px] font-extrabold truncate text-slate-900 dark:text-slate-100">{preset.name}</div>
                        <div className="text-[9px] text-slate-400 truncate">{preset.badge || preset.primary}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Wheel Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-300'}`}>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-slate-100">Primary Brand Accent Color</label>
                    <p className="text-[10px] text-slate-400">Buttons, glows, active links & highlights</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.primaryColor || '#7c3aed'}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value, themePreset: 'Custom Palette' })}
                      className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor || '#7c3aed'}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value, themePreset: 'Custom Palette' })}
                      className={`w-20 rounded-lg px-2 py-1 text-xs font-mono font-bold border text-center ${isDark ? 'bg-[#1a2233] border-[#222d42] text-purple-400' : 'bg-slate-50 border-slate-300 text-purple-700'}`}
                    />
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-300'}`}>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-slate-100">Secondary Accent Color</label>
                    <p className="text-[10px] text-slate-400">Teal badges, chips & secondary accents</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.secondaryColor || '#3cddc7'}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value, themePreset: 'Custom Palette' })}
                      className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor || '#3cddc7'}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value, themePreset: 'Custom Palette' })}
                      className={`w-20 rounded-lg px-2 py-1 text-xs font-mono font-bold border text-center ${isDark ? 'bg-[#1a2233] border-[#222d42] text-teal-400' : 'bg-slate-50 border-slate-300 text-teal-700'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Dual Mode Live Rendering Color Preview Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Dark Mode Preview */}
                <div className="p-4 rounded-xl bg-[#050505] border border-white/10 space-y-2.5 text-slate-100">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>🌙 Dark Theme Live Rendering</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor || '#7c3aed' }}></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm" style={{ backgroundColor: settings.primaryColor || '#7c3aed' }}>
                      Primary Action Button
                    </button>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold border" style={{ color: settings.secondaryColor || '#3cddc7', backgroundColor: (settings.secondaryColor || '#3cddc7') + '15', borderColor: (settings.secondaryColor || '#3cddc7') + '30' }}>
                      Teal Badge
                    </span>
                  </div>
                </div>

                {/* Light Mode Preview */}
                <div className="p-4 rounded-xl bg-[#f8f7fb] border border-slate-300 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                    <span>☀️ Light Theme Live Rendering (Vivid Pop)</span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: settings.primaryColor || '#7c3aed' }}></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-md transition" style={{ backgroundColor: settings.primaryColor || '#7c3aed' }}>
                      Vivid Accent Button
                    </button>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold border" style={{ color: settings.secondaryColor || '#0d9488', backgroundColor: (settings.secondaryColor || '#0d9488') + '15', borderColor: (settings.secondaryColor || '#0d9488') + '30' }}>
                      Bright Teal Chip
                    </span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-extrabold text-[#0f172a] bg-slate-200 border border-slate-300">
                      Slate Navy Text
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Contact Channels & Footer Get In Touch */}
          <div className="space-y-4 pt-4 border-t border-slate-500/10">
            <h3 className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
              <Phone className="w-4 h-4" />
              <span>4. Contact Details & Address</span>
            </h3>
            <p className="text-[11px] text-slate-400">Configure phone numbers, email, and address displayed in the Footer "Get In Touch" column & Contact pages.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Sales Phone</label>
                <input
                  type="text"
                  value={settings.salesPhone || ''}
                  onChange={(e) => setSettings({ ...settings, salesPhone: e.target.value })}
                  placeholder="e.g. +91 90470 99277"
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">General Phone</label>
                <input
                  type="text"
                  value={settings.generalPhone || ''}
                  onChange={(e) => setSettings({ ...settings, generalPhone: e.target.value })}
                  placeholder="e.g. +91 90470 99277"
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Landline / Telephone</label>
                <input
                  type="text"
                  value={settings.telephoneNumber || ''}
                  onChange={(e) => setSettings({ ...settings, telephoneNumber: e.target.value })}
                  placeholder="e.g. +91 422 714 1668"
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  placeholder="info@porulontech.com"
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">WhatsApp Mobile Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="+919047099277"
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Global HQ Address</label>
              <input
                type="text"
                value={settings.contactAddress || ''}
                onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                placeholder="Porulon Technologies, Coimbatore, Tamil Nadu, India"
                className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>

            {/* Social Links Sub-Section */}
            <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-200'}`}>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Footer Social Media Icons & Channels</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={settings.socialLinks?.linkedin || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), linkedin: e.target.value } })}
                    placeholder="https://linkedin.com/company/porulon-technologies"
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border ${isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Facebook Page URL</label>
                  <input
                    type="text"
                    value={settings.socialLinks?.facebook || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), facebook: e.target.value } })}
                    placeholder="https://facebook.com/share/..."
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border ${isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Instagram Profile URL</label>
                  <input
                    type="text"
                    value={settings.socialLinks?.instagram || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), instagram: e.target.value } })}
                    placeholder="https://instagram.com/porulon_technologies"
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border ${isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">X (Twitter) Profile URL</label>
                  <input
                    type="text"
                    value={settings.socialLinks?.twitter || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), twitter: e.target.value } })}
                    placeholder="https://x.com/porulontech"
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border ${isDark ? 'bg-[#0f172a] border-[#222d42]' : 'bg-white border-slate-300'}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Footer Copy & Newsletter */}
          <div className="space-y-4 pt-4 border-t border-slate-500/10">
            <h3 className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
              <Globe className="w-4 h-4" />
              <span>5. Footer Copy, Newsletter & Copyright</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Newsletter Box Heading</label>
                <input
                  type="text"
                  value={settings.newsletterHeading || 'Stay Updated'}
                  onChange={(e) => setSettings({ ...settings, newsletterHeading: e.target.value })}
                  placeholder="e.g. STAY UPDATED"
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Footer Copyright Notice Line</label>
                <input
                  type="text"
                  value={settings.copyrightText || ''}
                  onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
                  placeholder="© 2026 Porulon Technologies Pvt. Ltd. All rights reserved."
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Footer Left Summary Bio Paragraph</label>
              <textarea
                rows={3}
                value={settings.footerText || ''}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                placeholder="Architecting enterprise AI, cloud systems, and intelligent software ecosystems that accelerate digital transformation."
                className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-500/10 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>Save Global Settings</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
