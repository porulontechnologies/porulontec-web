import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getSiteSettings, updateSiteSettings } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { Settings, Save, Check, Globe, Building, Phone, Mail, MapPin, Share2 } from 'lucide-react';

export default function SettingsManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [settings, setSettings] = useState({
    siteName: 'Porulon Technologies',
    tagline: 'Engineering Intelligent Futures',
    logoText: 'Porulon',
    logoSubtext: 'Technologies',
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

  useEffect(() => {
    getSiteSettings()
      .then((res) => {
        if (res.data) setSettings(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
        {/* Banner Action Bar */}
        <div className={`p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
          isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-extrabold text-xs mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Global Platform Configuration</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Website Branding & Contact Info</h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Changes here apply live to Navbar, Footer, and Contact details across the site.
            </p>
          </div>
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
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2 border-b border-slate-500/10 pb-2">
              <Building className="w-4 h-4" />
              <span>1. Company Branding & Logo</span>
            </h3>

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
                <label className="block text-xs font-bold mb-1">Logo Main Brand Text</label>
                <input
                  type="text"
                  value={settings.logoText}
                  onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Logo Subtext</label>
                <input
                  type="text"
                  value={settings.logoSubtext}
                  onChange={(e) => setSettings({ ...settings, logoSubtext: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Channels */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2 border-b border-slate-500/10 pb-2">
              <Phone className="w-4 h-4" />
              <span>2. Contact Details & Address</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Global HQ Address</label>
              <input
                type="text"
                value={settings.contactAddress}
                onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>
          </div>

          {/* Section 3: Footer Copy */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2 border-b border-slate-500/10 pb-2">
              <Globe className="w-4 h-4" />
              <span>3. Footer Copy & Copyright</span>
            </h3>

            <div>
              <label className="block text-xs font-bold mb-1">Footer Summary Paragraph</label>
              <textarea
                rows={3}
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className={`w-full rounded-xl px-4 py-2.5 text-xs font-medium border ${isDark ? 'bg-[#1a2233] border-[#222d42]' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Copyright Line</label>
              <input
                type="text"
                value={settings.copyrightText}
                onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
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
