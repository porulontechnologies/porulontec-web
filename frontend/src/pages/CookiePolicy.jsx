import React from 'react';
import SectionBackground from '../components/SectionBackground.jsx';
import { HiOutlineShieldCheck, HiOutlineAdjustmentsHorizontal, HiOutlineInformationCircle } from 'react-icons/hi2';

export default function CookiePolicy() {
  const lastUpdated = 'August 12, 2026';

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden font-sans pt-28 sm:pt-36 pb-20 sm:pb-28">
      <SectionBackground variant="mesh" />

      <div className="max-w-4xl mx-auto px-gutter relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold tracking-wider uppercase mb-4">
            <HiOutlineShieldCheck className="text-base" /> Privacy & Cookies
          </span>
          <h1 className="text-3xl sm:text-5xl font-extralight text-text tracking-tight mb-4">
            Cookie <span className="text-gradient font-light">Policy</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto font-light">
            How Porulon Technologies uses cookies and similar tracking technologies to enhance your browsing experience.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Card */}
        <div className="p-8 sm:p-12 rounded-3xl border border-purple-500/15 dark:border-purple-500/20 bg-bg/70 backdrop-blur-xl shadow-xl space-y-8 text-sm text-text-muted leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineInformationCircle className="text-purple-600 dark:text-purple-400" /> 1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, recognize return users, and provide aggregated analytics to site owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">2. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                <h3 className="font-bold text-text mb-1">A. Essential Cookies (Strictly Necessary)</h3>
                <p className="text-xs sm:text-sm">
                  Required for core platform functionality, such as theme preferences (Dark/Light mode), security tokens, and maintaining form session state when using our contact or consultation modals.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                <h3 className="font-bold text-text mb-1">B. Analytical & Performance Cookies</h3>
                <p className="text-xs sm:text-sm">
                  Help us understand how visitors interact with our pages, which services or training tracks generate interest, and measure page load speed to optimize performance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                <h3 className="font-bold text-text mb-1">C. Functional & Preference Cookies</h3>
                <p className="text-xs sm:text-sm">
                  Enable enhanced features such as remembering your interactive search modal queries or AI chat assistant interaction history during your browsing session.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
              <HiOutlineAdjustmentsHorizontal className="text-purple-600 dark:text-purple-400" /> 3. Managing Your Cookie Preferences
            </h2>
            <p>
              Most web browsers allow you to control or disable cookies through their settings preferences. Note that disabling essential cookies may impact your ability to use certain interactive features on porulontech.com.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Google Chrome:</strong> Settings $\rightarrow$ Privacy and Security $\rightarrow$ Cookies and other site data.</li>
              <li><strong>Mozilla Firefox:</strong> Options $\rightarrow$ Privacy & Security $\rightarrow$ Cookies and Site Data.</li>
              <li><strong>Apple Safari:</strong> Preferences $\rightarrow$ Privacy $\rightarrow$ Block all cookies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text">4. Questions & Contact</h2>
            <p>
              If you have any questions regarding our use of cookies, feel free to get in touch:
            </p>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs sm:text-sm space-y-1">
              <p><strong>Porulon Technologies</strong></p>
              <p>Email: <a href="mailto:info@porulontech.com" className="text-purple-600 dark:text-purple-400 hover:underline">info@porulontech.com</a></p>
              <p>Sales: +91 63851 86664 | General: +91 90470 99277 | Telephone: +91 422 714 1668</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
