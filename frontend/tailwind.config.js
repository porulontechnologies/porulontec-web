/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        surface: 'var(--surface)',
        'surface-glass': 'var(--surface-glass)',
        'surface-low': 'var(--surface-low)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        'primary-soft': 'var(--primary-soft)',
        'primary-strong': 'var(--primary-strong)',
        teal: 'var(--teal)',
        'teal-soft': 'var(--teal-soft)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        geist: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'sans-serif'],
        hero: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '80px', letterSpacing: '-0.03em', fontWeight: '200' }],
        'display-xl-mobile': ['38px', { lineHeight: '44px', letterSpacing: '-0.015em', fontWeight: '200' }],
        'headline-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.015em', fontWeight: '200' }],
        'headline-sm': ['24px', { lineHeight: '32px', letterSpacing: '-0.015em', fontWeight: '300' }],
        'metric-stat': ['52px', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '200' }],
        'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '0.14em', fontWeight: '400' }],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        section: '120px',
        'section-sm': '72px',
        gutter: '24px',
      },
      boxShadow: {
        glow: '0 0 40px var(--glow)',
        'glow-lg': '0 0 80px var(--glow)',
        'glow-sm': '0 0 20px var(--glow)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse-slow': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.55, filter: 'blur(60px)' },
          '50%': { opacity: 0.9, filter: 'blur(80px)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(3%,-4%) scale(1.08)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse-slow 15s linear infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.4,0,0.2,1) both',
        drift: 'drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
