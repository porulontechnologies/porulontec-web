import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DOMAIN = 'https://porulontech.com';

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Clean and normalize pathname (strip trailing slash unless it is root '/')
    let cleanPath = pathname || '/';
    if (cleanPath !== '/' && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.replace(/\/+$/, '');
    }

    const canonicalUrl = `${DOMAIN}${cleanPath}`;

    // Find existing canonical tag or create a new one in head
    let linkElement = document.querySelector("link[rel='canonical']");
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
}
