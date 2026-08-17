import { useEffect, useState } from 'react';
import { fetchSiteSettings } from '../api/client.js';
import { getCleanMediaUrl } from '../utils/media.js';

export default function Logo({ className = '', height = 36, size }) {
  const actualHeight = size || height || 36;
  const [logoUrl, setLogoUrl] = useState('');
  const [logoText, setLogoText] = useState('Porulon');

  useEffect(() => {
    let isMounted = true;
    fetchSiteSettings()
      .then((res) => {
        const data = res?.data || res;
        if (isMounted && data) {
          if (data.logoUrl) setLogoUrl(getCleanMediaUrl(data.logoUrl));
          if (data.logoText) setLogoText(data.logoText);
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <a href="/" className={`flex items-center gap-2 group no-underline ${className}`} aria-label="Porulon Technologies home">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={logoText ? `${logoText} Logo` : 'Porulon Technologies Logo'}
          style={{ height: `${actualHeight}px` }}
          className="w-auto max-w-[280px] sm:max-w-[360px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
          }}
        />
      ) : null}

      <img
        src="/images/logo.png"
        alt="Porulon Technologies Logo"
        style={{ height: `${actualHeight}px`, display: logoUrl ? 'none' : 'block' }}
        className="w-auto max-w-[280px] sm:max-w-[360px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </a>
  );
}

