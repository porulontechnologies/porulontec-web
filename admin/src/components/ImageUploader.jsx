import React, { useState, useRef } from 'react';
import { HiOutlinePhoto, HiOutlineCloudArrowUp, HiOutlineXMark } from 'react-icons/hi2';

export default function ImageUploader({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef(null);

  // Resolve display URL — uploaded files are served from backend via proxy
  const getDisplayUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http') || url.startsWith('data:')) return url;
    // Relative /uploads/... path — serve via Vite proxy -> backend
    return url;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      setError('Only image files are allowed (jpg, png, gif, webp, svg)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    // Show local blob preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Use Vite proxy (/api/upload) — avoids CORS preflight entirely
      const res = await fetch('/api/upload', {
        method: 'POST',
        // DO NOT set Content-Type manually — browser sets multipart boundary automatically
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Upload failed');
      }

      const data = await res.json();
      // data.url is like /uploads/image-1234567890.png — served by backend
      setPreview(data.url);
      onChange(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed — using local preview only. Image URL will be a blob and not persisted.');
      // Keep local blob preview but pass blob URL to parent
      onChange(localUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview('');
    onChange('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={getDisplayUrl(preview)}
            alt="Preview"
            className="h-28 w-auto max-w-xs rounded-xl object-cover border border-slate-700"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          >
            <HiOutlineXMark className="text-xs" />
          </button>
        </div>
      )}

      {/* Controls Row */}
      <div className="flex gap-2 flex-wrap items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-600/30 text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
        >
          <HiOutlineCloudArrowUp className="text-base" />
          {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload Image'}
        </button>

        {/* Paste URL fallback */}
        <input
          type="text"
          placeholder="Or paste image URL here..."
          value={preview.startsWith('blob:') ? '' : (preview || '')}
          onChange={(e) => {
            const v = e.target.value;
            setPreview(v);
            onChange(v);
          }}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Hidden file picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Status messages */}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <HiOutlinePhoto className="text-sm shrink-0" /> {error}
        </p>
      )}
      {uploading && (
        <p className="text-xs text-sky-400 animate-pulse">⏳ Uploading image to server...</p>
      )}
    </div>
  );
}
