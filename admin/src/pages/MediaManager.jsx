import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getMedia, uploadMedia, deleteMedia } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { Image as ImageIcon, Upload, Trash2, Copy, Check, Video, File, Loader2 } from 'lucide-react';

export default function MediaManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const loadMedia = () => {
    setLoading(true);
    getMedia()
      .then((res) => setMedia(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      await uploadMedia(formData);
      loadMedia();
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this media asset?')) {
      try {
        await deleteMedia(id);
        loadMedia();
      } catch (err) {
        alert('Failed to delete media asset: ' + err.message);
      }
    }
  };

  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`flex-1 min-h-screen transition-colors ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header title="Media & Uploads Library" subtitle="Manage static image uploads, videos, and media assets" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Banner Action Bar */}
        <div className={`p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
          isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-extrabold text-xs mb-2">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Asset Library</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Media Assets ({media.length})</h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Upload banner videos, service cover photos, and team imagery.
            </p>
          </div>

          <label className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition shrink-0">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{uploading ? 'Uploading Asset...' : 'Upload File from PC'}</span>
            <input type="file" onChange={handleFileUpload} accept="image/*,video/*" className="hidden" disabled={uploading} />
          </label>
        </div>

        {/* Media Grid Cards */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400">Loading media library...</p>
          </div>
        ) : media.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'}`}>
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold">No media assets uploaded yet</h3>
            <p className="text-xs text-slate-400 mt-1">Click "Upload File from PC" to store your first image or video.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((m) => {
              const mId = m._id || m.id;
              const isVid = m.mimetype?.startsWith('video') || m.url?.endsWith('.mp4') || m.url?.endsWith('.webm');
              const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
              const serverHost = apiBase.replace(/\/api\/?$/, '');
              const srcUrl = m.url.startsWith('http') 
                ? m.url 
                : `${serverHost}${m.url.startsWith('/') ? '' : '/'}${m.url}`;

              return (
                <div key={mId} className={`group rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                  isDark ? 'bg-[#121824] border-[#1f293d] hover:border-purple-500/40' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="relative aspect-video bg-black/50 overflow-hidden flex items-center justify-center">
                    {isVid ? (
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video src={srcUrl} className="w-full h-full object-cover opacity-80" muted controls={false} />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-600 text-white flex items-center gap-1">
                          <Video className="w-3 h-3" /> VIDEO
                        </span>
                      </div>
                    ) : (
                      <img
                        src={srcUrl}
                        alt={m.originalName || 'Media'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${serverHost}/images/service-ai.jpg`;
                        }}
                      />
                    )}
                  </div>

                  <div className="p-3 space-y-2">
                    <p className="text-xs font-bold truncate text-white" title={m.originalName || m.url}>
                      {m.originalName || m.filename || 'Media Asset'}
                    </p>
                    <p className="text-[10px] font-mono text-purple-400 truncate" title={m.url}>
                      {m.url}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-500/10">
                      <button
                        onClick={() => copyUrl(m.url, mId)}
                        className="text-[10px] font-extrabold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        {copiedId === mId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === mId ? 'Copied!' : 'Copy Path'}</span>
                      </button>

                      <button
                        onClick={() => handleDelete(mId)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
