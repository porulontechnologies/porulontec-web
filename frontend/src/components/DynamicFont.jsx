import { useEffect } from 'react';
import { fetchSiteSettings } from '../api/client.js';

export default function DynamicFont() {
  useEffect(() => {
    let isMounted = true;
    fetchSiteSettings()
      .then((res) => {
        const data = res?.data || res;
        const font = data?.fontFamily;
        if (!isMounted || !font) return;

        // 1. Inject Google Font stylesheet dynamically
        const fontId = 'dynamic-google-font-stylesheet';
        let linkElem = document.getElementById(fontId);
        if (!linkElem) {
          linkElem = document.createElement('link');
          linkElem.id = fontId;
          linkElem.rel = 'stylesheet';
          document.head.appendChild(linkElem);
        }
        const formattedFontName = font.replace(/ /g, '+');
        linkElem.href = `https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@300;400;500;600;700;800;900&display=swap`;

        // 2. Set global CSS font variable on document element
        if (font) {
          document.documentElement.style.setProperty('--global-font', `'${font}', sans-serif`);
        }

        // 3. Inject dynamic primary & secondary color variables
        const primary = data?.primaryColor;
        const secondary = data?.secondaryColor;

        if (primary) {
          const vividLightPrimary = getVividLightColor(primary);
          document.documentElement.style.setProperty('--dyn-primary-dark', primary);
          document.documentElement.style.setProperty('--dyn-primary-light', vividLightPrimary);
          document.documentElement.style.setProperty('--dyn-primary-soft-dark', primary + 'd0');
          document.documentElement.style.setProperty('--dyn-primary-soft-light', vividLightPrimary + '15');
          document.documentElement.style.setProperty('--dyn-glow-dark', primary + '59');
          document.documentElement.style.setProperty('--dyn-glow-light', vividLightPrimary + '35');
        }
        if (secondary) {
          const vividLightSecondary = getVividLightColor(secondary);
          document.documentElement.style.setProperty('--dyn-teal-dark', secondary);
          document.documentElement.style.setProperty('--dyn-teal-light', vividLightSecondary);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}

// Helper to calculate ultra-vivid, high-contrast accent shade for Light Mode
function getVividLightColor(hex) {
  if (!hex || !hex.startsWith('#')) return '#6d28d9';
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Boost saturation to 90% and set lightness to 40% for ultra-vivid punchy light mode contrast
  const vividS = Math.max(s, 0.90);
  const vividL = 0.40;

  const a = vividS * Math.min(vividL, 1 - vividL);
  const f = n => {
    const k = (n + h * 12) % 12;
    const color = vividL - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
