import { getCleanMediaUrl } from '../utils/media.js';

export default function GlowImage({ src, alt = '', className = '', imgClassName = '', rounded = 'rounded-2xl' }) {
  const finalSrc = getCleanMediaUrl(src);
  if (!finalSrc) return null;

  return (
    <div className={`glow-frame ${rounded} overflow-hidden ${className}`}>
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${rounded} ${imgClassName}`}
      />
    </div>
  );
}
