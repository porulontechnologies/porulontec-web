import React from 'react';
import SectionBackground from '../components/SectionBackground.jsx';
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineEye, HiOutlineDocumentText } from 'react-icons/hi2';

export default function PrivacyPolicy() {
  const lastUpdated = 'August 12, 2026';

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans pt-28 sm:pt-36 pb-20 sm:pb-28">
      <SectionBackground variant="mesh" />

      <div className="max-w-4xl mx-auto px-gutter relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold tracking-wider uppercase mb-4">
            <HiOutlineShieldCheck className="text-base" /> Legal & Governance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extralight text-text tracking-tight mb-4">
            Privacy <span className="text-gradient font-light">Policy</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto font-light">
            How Porulon Technologies collects, uses, protects, and handles your personal and enterprise data.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Card */}
        <div className="p-8 sm:p-12 rounded-3xl border border-purple-500/15 dark:border-purple-500/20 bg-bg/70 backdrop-blur-xl shadow-xl space-y-8 text-sm text-text-muted leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineDocumentText className="text-purple-600 dark:text-purple-400" /> 1. Overview & Scope
            </h2>
            <p>
              Porulon Technologies ("Porulon", "we", "us", or "our"), headquartered in Coimbatore, Tamil Nadu, India, is committed to safeguarding your privacy. This Privacy Policy applies to our website (porulontech.com), enterprise software platforms, AI/ML consultation services, and educational programs offered under Porulon Academy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineEye className="text-purple-600 dark:text-purple-400" /> 2. Data We Collect
            </h2>
            <p>We may collect information directly from you when you interact with our website or services:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Contact Information:</strong> Full name, business email address, phone number, company name, and job title when submitting inquiries or booking consultations.</li>
              <li><strong>Technical & Usage Data:</strong> IP address, browser type, operating system, referrer URL, and interaction metrics gathered automatically via standard cookies and analytics tools.</li>
              <li><strong>Educational Enrolment Data:</strong> Contact details, educational background, and resume submissions for Porulon Academy courses.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineLockClosed className="text-purple-600 dark:text-purple-400" /> 3. How We Use Your Information
            </h2>
            <p>We utilize the collected information strictly for legitimate business operations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Responding to project quotes, technical proposals, and consultation requests.</li>
              <li>Processing student admissions and communications for Porulon Academy programs.</li>
              <li>Improving web platform performance, user experience, and AI chat assistant capabilities.</li>
              <li>Ensuring platform security, fraud prevention, and compliance with applicable legal requirements in India.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">4. Data Sharing & Confidentiality</h2>
            <p>
              Porulon Technologies strictly does <strong>not sell or rent</strong> your personal data to third parties. We may share data only under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>With vetted cloud hosting and infrastructure partners (e.g. cloud servers, email delivery nodes) bound by strict confidentiality agreements.</li>
              <li>When required by applicable statutory law or judicial order from government authorities in India.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">5. Security & Protection</h2>
            <p>
              We implement industry-standard technical measures including TLS encryption, zero-trust access controls, and regular vulnerability audits to protect your data against unauthorized access, loss, or alteration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">6. Contact Our Privacy Team</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to exercise your data access/deletion rights, please contact us:
            </p>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs sm:text-sm space-y-1">
              <p><strong>Porulon Technologies</strong></p>
              <p>Email: <a href="mailto:info@porulontech.com" className="text-purple-600 dark:text-purple-400 hover:underline">info@porulontech.com</a></p>
              <p>Sales: +91 63851 86664 | General: +91 90470 99277 | Telephone: +91 422 714 1668</p>
              <p>Address: 7/42, Kumaran Nagar, Keeranatham, Coimbatore 641035, Tamil Nadu, India</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
