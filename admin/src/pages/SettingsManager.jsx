import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getSiteSettings, updateSiteSettings, uploadMediaFile } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { Settings, Save, Check, Globe, Building, Phone, Mail, MapPin, Share2, Upload, Loader2, Eye } from 'lucide-react';

export default function SettingsManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [settings, setSettings] = useState({
    siteName: 'Porulon Technologies',
    tagline: 'Engineering Intelligent Futures',
    logoUrl: '',
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
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getSiteSettings()
      .then((res) => {
        if (res.data) setSettings(prev => ({ ...prev, ...res.data }));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2">
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

          {/* Section 2: Contact Channels & Footer Get In Touch */}
          <div className="space-y-4 pt-4 border-t border-slate-500/10">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>2. Contact Details & Footer "Get In Touch"</span>
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

          {/* Section 3: Footer Copy & Newsletter */}
          <div className="space-y-4 pt-4 border-t border-slate-500/10">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>3. Footer Copy, Newsletter & Copyright</span>
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
