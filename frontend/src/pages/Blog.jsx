import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlowImage from '../components/GlowImage.jsx';
import { fetchSections, fetchBlogs } from '../api/client.js';
import { getCleanMediaUrl } from '../utils/media.js';
import { GoArrowRight, GoSearch } from 'react-icons/go';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineSparkles, HiOutlineBookOpen } from 'react-icons/hi2';

const formatDate = (iso) => {
  if (!iso) return '';
  const parsed = new Date(iso);
  if (isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

function FormattedTitle({ title, defaultText, accentClass = 'text-purple-300 dark:text-purple-400 font-normal', highlightWords = 1 }) {
  const text = title || defaultText;
  if (!text) return null;

  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return text;

  const count = Math.min(highlightWords, words.length - 1);
  const mainWords = words.slice(0, words.length - count).join(' ');
  const accentWords = words.slice(words.length - count).join(' ');

  return (
    <>
      {mainWords}{' '}
      <span className={accentClass}>{accentWords}</span>
    </>
  );
}

export default function Blog() {
  const [sections, setSections] = useState([]);
  const [dbBlogs, setDbBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [secData, blogData] = await Promise.all([
          fetchSections('blog'),
          fetchBlogs(),
        ]);
        setSections(secData || []);
        setDbBlogs(blogData || []);
      } catch (err) {
        console.error('Failed to load blog page data:', err);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []);

  const getSec = (key) => sections.find((s) => s.sectionKey === key && s.isActive !== false);
  const heroSec = getSec('blog_hero');
  const gridSec = getSec('blog_grid');
  const ctaSec = getSec('blog_cta');

  const hasPageConfig = sections !== null && sections.length > 0;

  const isSecVisible = (sec) => {
    if (sec) {
      if (sec.isActive === false || sec.visible === false || sec.enabled === false || sec.isArchived === true) {
        return false;
      }
      return true;
    }
    if (hasPageConfig) return false;
    return true;
  };

  const showHero = isSecVisible(heroSec);
  const showGrid = isSecVisible(gridSec);
  const showCta = isSecVisible(ctaSec);

  const heroMediaSrc = getCleanMediaUrl(heroSec?.mediaUrl);

  // Strictly dynamic database blogs managed via Admin Panel BlogsManager
  const allPosts = useMemo(() => {
    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map((b) => ({
        id: b.id || b._id,
        slug: b.slug,
        title: b.title,
        subtitle: b.subtitle || '',
        category: b.category || '',
        excerpt: b.excerpt || '',
        date: b.publishedAt || formatDate(b.createdAt) || '',
        readTime: b.readTime || '',
        img: getCleanMediaUrl(b.coverImage || b.mediaUrl),
        author: b.authorName || '',
        authorAvatar: getCleanMediaUrl(b.authorAvatar),
        authorRole: b.authorRole || '',
        tags: Array.isArray(b.tags) ? b.tags : [],
        content: b.content || '',
        isFeatured: b.isFeatured,
      }));
    }
    if (gridSec && Array.isArray(gridSec.items) && gridSec.items.length > 0) {
      return gridSec.items.map((item, idx) => ({
        slug: item.slug || `article-${idx}`,
        title: item.title || item.name || '',
        category: item.category || '',
        excerpt: item.excerpt || item.desc || '',
        date: item.date || item.publishedAt || '',
        readTime: item.readTime || '',
        img: getCleanMediaUrl(item.img || item.mediaUrl || item.coverImage),
        author: item.author || item.authorName || '',
        authorAvatar: getCleanMediaUrl(item.authorAvatar),
        authorRole: item.authorRole || '',
        tags: Array.isArray(item.tags) ? item.tags : [],
        content: item.content || item.excerpt || item.desc || '',
      }));
    }
    return [];
  }, [gridSec, dbBlogs]);

  const categories = useMemo(() => {
    const articleCats = Array.from(
      new Set(allPosts.map((p) => p.category).filter(Boolean))
    );
    return ['All', ...articleCats.filter((c) => c !== 'All')];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts
      .filter((p) => activeCategory === 'All' || p.category === activeCategory)
      .filter((p) =>
        query.trim() === ''
          ? true
          : (p.title + ' ' + (p.excerpt || '')).toLowerCase().includes(query.trim().toLowerCase())
      );
  }, [allPosts, activeCategory, query]);

  return (
    <main className="relative overflow-hidden font-sans">
      {/* ===== SECTION 1 — HERO BANNER WITH ORGANIC CURVED WAVE ===== */}
      {showHero && (
        <section aria-label="Blog Hero Banner" className="relative min-h-[44vh] sm:min-h-[50vh] md:min-h-[52vh] flex items-center justify-center pt-28 sm:pt-36 md:pt-40 pb-24 sm:pb-32 overflow-hidden bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#1d4ed8] dark:from-[#080a1c] dark:via-[#101738] dark:to-[#060814]">
          {/* Background Image / Video & Ambient Veils (Vivid Image & Collapse-Proof Backdrop) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {heroMediaSrc ? (
              heroMediaSrc.toLowerCase().endsWith('.mp4') || heroMediaSrc.toLowerCase().endsWith('.webm') ? (
                <video
                  key={heroMediaSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center brightness-115 contrast-105 scale-105 transition-opacity duration-700 opacity-95 sm:opacity-100"
                >
                  <source src={heroMediaSrc} />
                </video>
              ) : (
                <img
                  key={heroMediaSrc}
                  src={heroMediaSrc}
                  alt="Blogs Banner Background"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  className="w-full h-full object-cover object-center brightness-115 contrast-105 scale-105 transition-transform duration-1000 opacity-95 sm:opacity-100"
                />
              )
            ) : (
              /* Ambient Dark Blue/Purple Gradient Backdrop if image is absent/removed */
              <div className="absolute inset-0 bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#1d3557] dark:from-[#090b1e] dark:via-[#121b40] dark:to-[#070914]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/25 rounded-full blur-[140px]" />
              </div>
            )}

            {/* Soft Translucent Overlay for Text Contrast & High Image Visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 dark:from-[#070512]/75 dark:via-[#070512]/45 dark:to-[#070512]/90 z-10" />
          </div>

          {/* Centered Clean Hero Content (100% DB-driven Title & Subtitle) */}
          <div className="max-w-container mx-auto px-gutter relative z-20 w-full text-center">
            <div className="max-w-3xl mx-auto space-y-4" data-aos="fade-up">
              {/* Minimal Headline Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight text-white tracking-tight leading-tight sm:leading-none drop-shadow-md break-words">
                <FormattedTitle
                  title={(heroSec?.title && heroSec.title !== 'Thought Leadership In Deep Tech & Enterprise AI') ? heroSec.title : 'The Blogs'}
                  defaultText="The Blogs"
                  accentClass="text-purple-300 dark:text-purple-400 font-normal"
                  highlightWords={1}
                />
              </h1>

              {/* Subtitle Description (100% DB-driven) */}
              <p className="text-base sm:text-lg text-slate-100 dark:text-slate-200 font-light tracking-tight max-w-xl mx-auto leading-relaxed opacity-95 drop-shadow-xs">
                {heroSec?.subtitle || 'Grow your career and drive innovation for clients in leading industries'}
              </p>
            </div>
          </div>

          {/* Organic Curved Wave Bottom Divider (Vivid Edge Mask) */}
          <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden leading-none">
            <svg
              className="relative block w-full h-16 sm:h-24 md:h-28 text-bg dark:text-bg"
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C320,120 420,10 720,55 C1020,100 1180,20 1440,65 L1440,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </section>
      )}

      {/* ===== SECTION 2 — ARTICLE POSTS GRID ===== */}
      <section className="pt-8 sm:pt-12 pb-16 md:pb-24 relative overflow-hidden">
        <div className="max-w-container mx-auto px-gutter relative z-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-3xl max-w-xl mx-auto p-8" data-aos="fade-up">
              <p className="text-text-muted text-sm sm:text-base font-light tracking-tight">
                No articles match your search query. Try another keyword or select "All".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {filteredPosts.map((post, i) => (
                <Link
                  key={post.slug || i}
                  to={`/blog/${post.slug}`}
                  className="rounded-3xl overflow-hidden group flex flex-col h-full glass-card bg-white/90 dark:bg-[#0c091d]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 relative p-0 shadow-xl hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(124,58,237,0.25)] transition-all duration-500 no-underline cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={(i % 3) * 80}
                >
                  {/* Article Cover Image Frame (Fixed Height matching reference screenshot) */}
                  <div className="overflow-hidden relative w-full h-52 sm:h-56 bg-slate-950 flex items-center justify-center shrink-0">
                    {post.img ? (
                      <GlowImage
                        src={post.img}
                        alt={post.title || 'Blog Article'}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        rounded="rounded-none"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}

                    {/* Resilient Blueprint Vector Graphic if image is missing */}
                    <div className={`${post.img ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414] p-6 flex-col justify-between items-start z-0`}>
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                        <HiOutlineBookOpen className="text-xl" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">Porulon Article</span>
                    </div>
                  </div>

                  {/* Card Internal Content Details (Clean, Underline-Free Layout) */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Sub-kicker / Category Tag Above Title */}
                      {post.category && (
                        <div className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2 tracking-tight">
                          {post.category}
                        </div>
                      )}

                      {/* Main Article Headline Title */}
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt / Description Paragraph */}
                      {post.excerpt && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light tracking-tight line-clamp-3 mb-5">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Author Avatar, Date Footer Bar & Bottom-Right Arrow Button (Underline Removed) */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      {/* Left: Avatar Circle + Author Name & Date */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md overflow-hidden border border-white/20">
                          {post.authorAvatar ? (
                            <img src={getCleanMediaUrl(post.authorAvatar)} alt={post.author || 'Author'} className="w-full h-full object-cover" />
                          ) : (
                            <span>{String(post.author || 'P').charAt(0).toUpperCase()}</span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-amber-500 dark:text-amber-400 block truncate">
                            {post.author || 'Porulon Author'}
                          </span>
                          {post.date && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal block tracking-tight">
                              {formatDate(post.date)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Bottom-Right Arrow Button (Clickable indicator to Blog Details) */}
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs group-hover:scale-110">
                        <GoArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== SECTION 4 — NEWSLETTER / CONTACT CTA ===== */}
      {showCta && (
        <section aria-label="Newsletter and Contact CTA" className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-container mx-auto px-gutter relative z-10">
            <div
              className="glass-card bg-white/85 dark:bg-[#0b0914]/90 backdrop-blur-2xl rounded-3xl md:rounded-[36px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border border-purple-500/25 shadow-2xl"
              data-aos="zoom-in"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] aurora-blur opacity-25 pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                {/* Optional Kicker Badge */}
                {ctaSec?.kicker && (
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-extrabold tracking-[0.2em] uppercase shadow-xs">
                      {ctaSec.kicker}
                    </span>
                  </div>
                )}

                {/* Headline Title (Collapse-Proof) */}
                {(ctaSec?.title || !isLoaded) && (
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight leading-tight break-words">
                    <FormattedTitle
                      title={ctaSec?.title}
                      defaultText="Stay Ahead In Deep Tech & AI"
                      accentClass="text-gradient font-normal"
                      highlightWords={2}
                    />
                  </h2>
                )}

                {/* Subtitle Description (Collapse-Proof) */}
                {(ctaSec?.subtitle || (!isLoaded && !ctaSec)) && (
                  <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto leading-relaxed font-light tracking-tight opacity-90 break-words">
                    {ctaSec?.subtitle || 'No spam, just practical engineering perspectives whenever we publish something worth reading.'}
                  </p>
                )}

                {/* Action Buttons (100% Dynamic & Collapse-Proof) */}
                {((ctaSec?.buttons && ctaSec.buttons.length > 0 ? ctaSec.buttons : (isLoaded && ctaSec ? [] : [
                  { label: 'Talk to Our Team', link: '/contact' }
                ]))).length > 0 && (
                  <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
                    {((ctaSec?.buttons && ctaSec.buttons.length > 0 ? ctaSec.buttons : (isLoaded && ctaSec ? [] : [
                      { label: 'Talk to Our Team', link: '/contact' }
                    ]))).map((btn, bIdx) => (
                      <a
                        key={bIdx}
                        href={btn.link || '/contact'}
                        className="group no-underline px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                      >
                        <span>{btn.label || 'Talk to Our Team'}</span>
                        <GoArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
