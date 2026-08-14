import React from 'react';
import SectionBackground from '../components/SectionBackground.jsx';
import { HiOutlineScale, HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function TermsOfService() {
  const lastUpdated = 'August 12, 2026';

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans pt-28 sm:pt-36 pb-20 sm:pb-28">
      <SectionBackground variant="mesh" />

      <div className="max-w-4xl mx-auto px-gutter relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold tracking-wider uppercase mb-4">
            <HiOutlineScale className="text-base" /> Terms & Conditions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extralight text-text tracking-tight mb-4">
            Terms of <span className="text-gradient font-light">Service</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto font-light">
            Terms governing your access to Porulon Technologies solutions, enterprise consultations, software deliverables, and training courses.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Card */}
        <div className="p-8 sm:p-12 rounded-3xl border border-purple-500/15 dark:border-purple-500/20 bg-bg/70 backdrop-blur-xl shadow-xl space-y-8 text-sm text-text-muted leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineSparkles className="text-purple-600 dark:text-purple-400" /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the services, website (porulontech.com), enterprise solutions, or educational programs provided by Porulon Technologies ("Porulon", "we", "us"), you agree to be bound by these Terms of Service. If you do not agree to all terms, please refrain from using our platforms or services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineCheckCircle className="text-purple-600 dark:text-purple-400" /> 2. Services & Project Engagements
            </h2>
            <p>
              Porulon Technologies specializes in enterprise AI/ML solutions, custom software engineering, cloud architecture, and technical training.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Statements of Work (SOW):</strong> Custom engineering project deliverables, timelines, and payment milestones are governed by individual Master Services Agreements (MSA) or Statements of Work signed by both parties.</li>
              <li><strong>Porulon Academy:</strong> Course content, training materials, and certifications remain the property of Porulon Technologies. Course fees are governed by the enrolment policy at the time of registration.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">3. Intellectual Property Rights</h2>
            <p>
              All proprietary AI models, brand logos, website source code, design elements, training curriculum, and original software algorithms created by Porulon Technologies are protected by copyright, trademark, and intellectual property laws of India and international treaties. Client ownership of custom codebase deliverables is granted upon full fulfillment of contractual milestones.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">4. User Obligations & Acceptable Use</h2>
            <p>Users agree not to engage in any prohibited activities on our platforms, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Attempting to breach, reverse engineer, or probe the security of our infrastructure or AI bots.</li>
              <li>Submitting fraudulent project inquiries or automated web scraping.</li>
              <li>Misusing Porulon Academy course content for commercial redistribution without prior written authorization.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineExclamationTriangle className="text-amber-500" /> 5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Porulon Technologies shall not be liable for indirect, incidental, consequential, or punitive damages resulting from platform downtime, unauthorized third-party access, or reliance on information provided on our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Coimbatore, Tamil Nadu, India</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">7. Contact Information</h2>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs sm:text-sm space-y-1">
              <p><strong>Porulon Technologies - Legal Department</strong></p>
              <p>Email: <a href="mailto:info@porulontech.com" className="text-purple-600 dark:text-purple-400 hover:underline">info@porulontech.com</a></p>
              <p>Sales: +91 90470 99277 | General: +91 90470 99277 | Telephone: +91 422 714 1668</p>
              <p>Location: 7/42, Kumaran Nagar, Keeranatham, Coimbatore 641035, Tamil Nadu, India</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
