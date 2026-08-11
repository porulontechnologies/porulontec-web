export default function Logo({ className = '', height = 36, size }) {
  const actualHeight = size || height || 36;
  return (
    <a href="/" className={`flex items-center gap-2 group ${className}`} aria-label="Porulon Technologies home">
      <img
        src="/images/logo.png"
        alt="Porulon Technologies Logo"
        style={{ height: `${actualHeight}px` }}
        className="w-auto max-w-[280px] sm:max-w-[360px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </a>
  );
}

