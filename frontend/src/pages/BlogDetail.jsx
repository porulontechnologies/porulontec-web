import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlowImage from '../components/GlowImage.jsx';
import { fetchBlogBySlug, fetchSections, fetchBlogs } from '../api/client.js';
import { useContactModal } from '../contexts/ContactModalContext.jsx';
import { GoArrowRight, GoArrowLeft, GoCopy, GoCheck } from 'react-icons/go';
import { HiOutlineClock, HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineQuestionMarkCircle, HiOutlineBookOpen } from 'react-icons/hi2';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const formatDate = (iso) => {
  if (!iso) return '';
  const parsed = new Date(iso);
  if (isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const resolveMediaUrl = (url) => {
  if (!url) return '';
  const str = String(url).trim();
  if (!str) return '';
  if (str.startsWith('/uploads/')) {
    const apiBase = import.meta.env.VITE_API_URL || '/api';
    const serverHost = apiBase.replace(/\/api\/?$/, '');
    return `${serverHost}${str}`;
  }
  return str;
};

function FormattedBlockContent({ content, excerpt, subtitle }) {
  let rawText = '';
  if (Array.isArray(content)) {
    rawText = content.map((c) => (typeof c === 'string' ? c : c.text || '')).join('\n\n');
  } else if (content) {
    rawText = String(content);
  }

  const blocks = rawText ? rawText.split(/\n\s*\n/) : [];

  return (
    <div className="space-y-5">
      {/* Excerpt Lead Box */}
      {(excerpt || subtitle) && (
        <div className="p-4 rounded-xl bg-purple-500/10 border-l-4 border-purple-600 dark:border-purple-400 mb-5">
          <p className="text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-200 leading-relaxed tracking-tight">
            {excerpt || subtitle}
          </p>
        </div>
      )}

      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Sub-headings (###)
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mt-6 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-purple-600 dark:bg-purple-400" />
              <span>{trimmed.replace(/^###\s*/, '')}</span>
            </h3>
          );
        }
        // Major Headings (## or #)
        if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight pb-2 border-b border-slate-200 dark:border-white/10 mt-8 mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-purple-600 shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
              <span>{trimmed.replace(/^#+\s*/, '')}</span>
            </h2>
          );
        }

        // Blockquotes
        if (trimmed.startsWith('>')) {
          const quoteText = trimmed.replace(/^>\s*/, '');
          return (
            <blockquote key={idx} className="p-4 rounded-2xl border-l-4 border-purple-600 bg-purple-500/10 my-5 text-xs sm:text-sm italic font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              "{quoteText}"
            </blockquote>
          );
        }

        // Bullet Lists
        if (trimmed.includes('\n- ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));
          return (
            <ul key={idx} className="space-y-2 my-4 pl-5 list-disc text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed tracking-tight">
              {items.map((item, i) => (
                <li key={i}>
                  {item.replace(/^[-*]\s*/, '')}
                </li>
              ))}
            </ul>
          );
        }

        // Code Blocks
        if (trimmed.startsWith('```')) {
          const codeContent = trimmed.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '');
          return (
            <div key={idx} className="p-4 rounded-2xl bg-[#0c0a1a] border border-purple-500/30 my-5 font-mono text-xs text-purple-200 overflow-x-auto shadow-inner">
              <pre><code>{codeContent}</code></pre>
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal tracking-tight mb-4">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogDetail() {
  const { openModal } = useContactModal();

  const handleContactClick = (e, link) => {
    if (link === '/contactus' || link === '/contactus/') {
      e.preventDefault();
      openModal();
    }
  };

  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        let currentPost = null;

        // 1. Try DB fetch by slug
        try {
          const dbBlog = await fetchBlogBySlug(slug);
          if (dbBlog) {
            currentPost = {
              slug: dbBlog.slug,
              title: dbBlog.title,
              subtitle: dbBlog.subtitle || '',
              category: dbBlog.category || '',
              excerpt: dbBlog.excerpt || '',
              date: dbBlog.publishedAt || formatDate(dbBlog.createdAt) || '',
              readTime: dbBlog.readTime || '',
              img: resolveMediaUrl(dbBlog.coverImage || dbBlog.mediaUrl),
              author: dbBlog.authorName || '',
              authorAvatar: resolveMediaUrl(dbBlog.authorAvatar),
              authorRole: dbBlog.authorRole || '',
              authorBio: dbBlog.authorBio || '',
              tags: Array.isArray(dbBlog.tags) ? dbBlog.tags : [],
              takeaways: Array.isArray(dbBlog.takeaways) ? dbBlog.takeaways : [],
              clarifications: Array.isArray(dbBlog.clarifications) ? dbBlog.clarifications : [],
              content: dbBlog.content || dbBlog.excerpt || '',
            };
          }
        } catch (e) {
          console.warn('DB slug lookup failed:', e);
        }

        // 2. Check Sections Manager grid items if DB lookup yielded null
        if (!currentPost) {
          try {
            const secData = await fetchSections('blog');
            const gridSec = (secData || []).find((s) => s.sectionKey === 'blog_grid');
            if (gridSec && Array.isArray(gridSec.items)) {
              const foundItem = gridSec.items.find(
                (it) => it.slug === slug || (it.title && it.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
              );
              if (foundItem) {
                currentPost = {
                  slug: foundItem.slug || slug,
                  title: foundItem.title || foundItem.name || '',
                  subtitle: foundItem.subtitle || foundItem.excerpt || '',
                  category: foundItem.category || '',
                  excerpt: foundItem.excerpt || foundItem.desc || '',
                  date: foundItem.date || foundItem.publishedAt || '',
                  readTime: foundItem.readTime || '',
                  img: resolveMediaUrl(foundItem.img || foundItem.mediaUrl || foundItem.coverImage),
                  author: foundItem.author || foundItem.authorName || '',
                  authorAvatar: resolveMediaUrl(foundItem.authorAvatar),
                  authorRole: foundItem.authorRole || '',
                  authorBio: foundItem.authorBio || '',
                  tags: Array.isArray(foundItem.tags) ? foundItem.tags : [],
                  takeaways: Array.isArray(foundItem.takeaways) ? foundItem.takeaways : [],
                  clarifications: Array.isArray(foundItem.clarifications) ? foundItem.clarifications : [],
                  content: foundItem.content || foundItem.excerpt || foundItem.desc || '',
                };
              }
            }
          } catch (e) {
            console.warn('Section items lookup failed:', e);
          }
        }

        setPost(currentPost);

        // Fetch recent blogs for sidebar strictly from database
        try {
          const dbBlogsRes = await fetchBlogs().catch(() => []);
          const combinedRecent = (dbBlogsRes || []).map((b) => ({
            slug: b.slug,
            title: b.title,
            img: resolveMediaUrl(b.coverImage || b.mediaUrl),
          }));

          const filteredRecent = combinedRecent
            .filter((b) => b.slug !== slug)
            .slice(0, 2);

          setRecentBlogs(filteredRecent);
        } catch (e) {
          console.warn('Failed to load recent blogs:', e);
        }
      } catch (err) {
        console.error('Failed to fetch blog article:', err);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-purple-300 uppercase tracking-widest font-bold">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center pt-32 pb-20">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Article Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">The requested article could not be found in the database.</p>
          <Link to="/blog" className="px-6 py-2 bg-purple-600 text-white rounded-full text-xs font-bold inline-block">Return to Blog</Link>
        </div>
      </main>
    );
  }

  const authorBioDisplay = post.authorBio || '';

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans bg-slate-50 dark:bg-[#060413] min-h-screen">
      
      {/* ===== TOP BREADCRUMB HEADER (Exact Match to Image 3) ===== */}
      <section className="pt-28 sm:pt-32 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 flex items-center gap-2 font-normal tracking-tight">
            <Link to="/blog" className="text-slate-700 dark:text-slate-200 font-bold hover:text-purple-600 dark:hover:text-purple-400 transition-colors no-underline">
              Blogs
            </Link>
            <span className="text-slate-400 dark:text-slate-500 font-bold">»</span>
            <span className="text-slate-900 dark:text-white font-extrabold line-clamp-1">
              {post.title}
            </span>
          </nav>
        </div>
      </section>

      {/* ===== MAIN 2-COLUMN CONTAINER (Left Main Article Content + Right Sidebar) ===== */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">

            {/* ============================================================ */}
            {/* LEFT MAIN ARTICLE CONTENT COLUMN (8 Cols) */}
            {/* ============================================================ */}
            <div className="lg:col-span-8 space-y-6">

              {/* Single Unified Main Article Glass Card Container (Image on top, text directly underneath inside 1 card) */}
              <div className="glass-card rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#0c091d]/95 backdrop-blur-2xl overflow-hidden space-y-0">
                
                {/* 1. Top Cover Image Frame inside the card */}
                <div className="w-full bg-slate-950 relative overflow-hidden">
                  {post.img ? (
                    <GlowImage
                      src={post.img}
                      alt={post.title}
                      className="w-full h-64 sm:h-80 md:h-[440px] object-cover object-center"
                      rounded="rounded-none"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Resilient Blueprint Banner Fallback if Cover Image is missing or broken */}
                  <div className={`${post.img ? 'hidden' : 'flex'} w-full h-64 sm:h-80 md:h-[440px] bg-gradient-to-br from-[#0c081e] via-[#150f32] to-[#070414] p-8 flex-col justify-center items-center text-center space-y-3 z-0`}>
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg">
                      <HiOutlineBookOpen className="text-2xl" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400">Porulon Engineering Publication</span>
                    <h3 className="text-sm sm:text-base font-bold text-white max-w-md line-clamp-2">{post.title}</h3>
                  </div>
                </div>

                {/* 2. Article Text & Paragraph Content (Directly under image inside same card) */}
                <div className="p-6 sm:p-8 md:p-10 space-y-6">
                  <FormattedBlockContent content={post.content} excerpt={post.excerpt} subtitle={post.subtitle} />

                  {/* Closing Tagline Callout */}
                  <div className="pt-5 border-t border-slate-200/60 dark:border-white/10">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                      Want more AI tools, tricks, and custom solutions? Hit up <span className="text-purple-600 dark:text-purple-400 font-extrabold">Porulon Technologies</span> – we got all the services to keep your 2026 game strong.
                    </p>
                  </div>

                  {/* 3. Bottom Meta Info & Social Share Bar */}
                  <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <HiOutlineClock className="text-purple-600 dark:text-purple-400 text-base" />
                      <span>Posted on {formatDate(post.date)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 dark:text-slate-300 font-extrabold">Share |</span>

                      {/* Facebook Share Button */}
                      <button
                        type="button"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                        className="w-7 h-7 rounded bg-[#3b5998] hover:opacity-90 text-white flex items-center justify-center transition shadow-xs"
                        title="Share on Facebook"
                      >
                        <FaFacebookF className="text-xs" />
                      </button>

                      {/* X / Twitter Share Button */}
                      <button
                        type="button"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                        className="w-7 h-7 rounded bg-black hover:bg-slate-900 text-white flex items-center justify-center transition shadow-xs"
                        title="Share on X (Twitter)"
                      >
                        <FaXTwitter className="text-xs" />
                      </button>

                      {/* WhatsApp Share Button */}
                      <button
                        type="button"
                        onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`, '_blank')}
                        className="w-7 h-7 rounded-full bg-[#25D366] hover:opacity-90 text-white flex items-center justify-center transition shadow-xs"
                        title="Share on WhatsApp"
                      >
                        <FaWhatsapp className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT SIDEBAR COLUMN (4 Cols) */}
            {/* ============================================================ */}
            <div className="lg:col-span-4 space-y-6">

              {/* 1. About Author Box */}
              {(post.author || authorBioDisplay || post.authorAvatar) && (
                <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/90 dark:bg-[#0c091d]/90 backdrop-blur-xl">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-4">
                    About Author
                  </h3>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/40 bg-purple-600/20 flex items-center justify-center text-amber-500 font-bold text-lg shrink-0 shadow-sm">
                      {post.authorAvatar ? (
                        <img src={post.authorAvatar} alt={post.author || 'Author'} className="w-full h-full object-cover" />
                      ) : (
                        <span>{post.author ? post.author.charAt(0).toUpperCase() : 'P'}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-extrabold text-amber-500 dark:text-amber-400 truncate">
                        {post.author || 'Porulon Author'}
                      </h4>
                      {post.authorRole && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block truncate">
                          {post.authorRole}
                        </span>
                      )}
                    </div>
                  </div>

                  {authorBioDisplay && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal break-words">
                      {authorBioDisplay}
                    </p>
                  )}
                </div>
              )}

              {/* 2. Recently Posted Blogs Box */}
              {recentBlogs && recentBlogs.length > 0 && (
                <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/90 dark:bg-[#0c091d]/90 backdrop-blur-xl space-y-4">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-3">
                    Recently posted blogs
                  </h3>

                  <div className="space-y-4">
                    {recentBlogs.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#120d2b] border border-slate-200/70 dark:border-white/10 flex items-center gap-3.5 hover:border-purple-500/40 transition-all duration-300 shadow-xs"
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-white/10">
                          {b.img ? (
                            <img src={b.img} alt={b.title || 'Recent Blog'} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center text-purple-300 text-xs font-bold">
                              Porulon
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                            {b.title}
                          </h4>
                          <Link
                            to={`/blog/${b.slug}`}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition inline-block shadow-xs no-underline"
                          >
                            Read blog
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ===== EXECUTIVE SCOPE SUMMARY & TECHNICAL CLARIFICATIONS ===== */}
      <section className="py-6 sm:py-8 bg-gradient-to-b from-slate-100/70 via-slate-50 to-white dark:from-[#060414] dark:via-[#09071c] dark:to-[#05030f] relative overflow-hidden">
        
        {/* Ambient Background Orbs */}
        <div className="absolute top-5 left-1/4 w-80 h-80 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">

          {/* 1. EXECUTIVE SCOPE & SUMMARY CARD */}
          <div className="relative rounded-3xl p-6 sm:p-8 border border-purple-500/30 dark:border-purple-500/30 bg-white/95 dark:bg-[#0c091d]/95 backdrop-blur-2xl shadow-xl space-y-6 overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
            
            {/* Subtle Top Glowing Line Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500" />

            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
                  <HiOutlineSparkles className="text-xl" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Executive Scope & <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">Technical Summary</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                    Key architectural metrics, author attribution, and core executive takeaways.
                  </p>
                </div>
              </div>

              <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
                Verified Publication
              </span>
            </div>

            {/* 3 Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Metric Card 1: Domain */}
              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-[#140f30]/90 border border-slate-200 dark:border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-300 flex items-center justify-center text-lg font-bold shrink-0">
                  🏷️
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-0.5">
                    Primary Domain
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Metric Card 2: Author */}
              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-[#140f30]/90 border border-slate-200 dark:border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-lg font-bold shrink-0">
                  ✍️
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-0.5">
                    Authored By
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-500 dark:text-amber-400">
                    {post.author}
                  </span>
                </div>
              </div>

              {/* Metric Card 3: Read Time */}
              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-[#140f30]/90 border border-slate-200 dark:border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-lg font-bold shrink-0">
                  ⏱️
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-0.5">
                    Reading Estimate
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                    {post.readTime}
                  </span>
                </div>
              </div>

            </div>

            {/* Key Takeaways Sub-block */}
            {post.takeaways && post.takeaways.length > 0 && (
              <div className="pt-4 space-y-3">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <HiOutlineCheckCircle className="text-emerald-500 text-lg" />
                  <span>Key Technical Takeaways</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {post.takeaways.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs font-semibold text-slate-800 dark:text-slate-100 leading-relaxed flex items-start gap-2.5 shadow-xs hover:border-emerald-500/50 transition-all duration-300"
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-extrabold shrink-0 mt-0.5 shadow-xs">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* 2. TECHNICAL CLARIFICATIONS & FAQS CARD */}
          {post.clarifications && post.clarifications.length > 0 && (
            <div className="relative rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c091d]/95 backdrop-blur-2xl shadow-xl space-y-6 overflow-hidden">
              
              {/* Header Title */}
              <div className="flex items-center gap-3 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
                  <HiOutlineQuestionMarkCircle className="text-xl" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Technical Clarifications & <span className="text-purple-600 dark:text-purple-400">Expert Q&A</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                    Direct engineering answers to technical implementation questions.
                  </p>
                </div>
              </div>

              {/* Q&A Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.clarifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 dark:bg-[#140f30]/90 border border-slate-200 dark:border-white/15 space-y-3 hover:border-purple-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group"
                  >
                    {/* Left Accent Neon Bar */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-purple-600 to-indigo-600 group-hover:w-2 transition-all duration-300" />

                    <div className="flex items-start gap-3 pl-2">
                      <span className="w-6 h-6 rounded-lg bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        0{idx + 1}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-950 dark:text-white leading-snug">
                        {item.question}
                      </h4>
                    </div>

                    <div className="pl-2 pt-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed bg-purple-50/80 dark:bg-[#1b153c] p-4 rounded-xl border border-purple-200/80 dark:border-white/10 shadow-xs">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Navigation Back Link */}
          <div className="flex justify-between items-center text-xs pt-2">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-extrabold hover:-translate-x-1 transition-transform no-underline"
            >
              <GoArrowLeft className="text-base" />
              <span>Back to All Articles</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold"
            >
              {copied ? <GoCheck className="text-emerald-500 text-base" /> : <GoCopy className="text-base" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ===== ARCHITECTURAL ASSISTANCE CTA ===== */}
      <section className="py-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl p-8 sm:p-12 text-center border border-purple-500/40 shadow-2xl bg-gradient-to-br from-[#1b143f] via-[#2a175e] to-[#0d0926] text-white relative overflow-hidden group">
            {/* Glowing Orbs */}
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight relative z-10">
              Need Architectural Assistance For <span className="text-purple-300">Your Project?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mb-6 max-w-xl mx-auto leading-relaxed font-medium relative z-10">
              Consult with our principal engineers and solution architects to design, scale, or audit your enterprise tech stack.
            </p>
            <a
              href="/contactus"
              onClick={(e) => handleContactClick(e, '/contactus')}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full text-xs sm:text-sm font-extrabold inline-flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-purple-600/40 no-underline relative z-10"
            >
              <span>Schedule Architecture Consultation</span>
              <GoArrowRight />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
