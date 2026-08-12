import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingAssistant from './components/FloatingAssistant.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Industries from './pages/Industries.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Training from './pages/Training.jsx';
import TrainingDetail from './pages/TrainingDetail.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Products from './pages/Products.jsx';
import { ContactModalProvider } from './contexts/ContactModalContext.jsx';
import ContactModal from './components/ContactModal.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration on refresh so page always starts at top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top on page load / refresh / route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
}

function PlaceholderPage({ title }) {
  return (
    <main className="min-h-[70vh] flex items-center justify-center pt-40 pb-24 px-gutter">
      <div className="text-center max-w-lg">
        <span className="text-primary-strong text-xs font-semibold tracking-[0.2em] uppercase">
          Coming Soon
        </span>
        <h1 className="text-headline-lg text-text mt-4">{title}</h1>
        <p className="text-text-muted mt-4">
          This page follows the same Navbar / Footer shell as the homepage — build it out next
          using the same GlowImage and SectionBackground components.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);
  return (
    <ContactModalProvider>
      <div className="min-h-screen bg-bg text-text">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/products" element={<Products />} />
        <Route path="/projects" element={<Navigate to="/products" replace />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/:slug" element={<TrainingDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/blogs" element={<Navigate to="/blog" replace />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/academy" element={<Navigate to="/training" replace />} />
        <Route path="/academy/:slug" element={<Navigate to="/training" replace />} />
        <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="/terms-of-service" element={<PlaceholderPage title="Terms of Service" />} />
        <Route path="/cookie-policy" element={<PlaceholderPage title="Cookie Policy" />} />
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Routes>
      <FloatingAssistant />
      <Footer />
      <ContactModal />
    </div>
    </ContactModalProvider>
  );
}
