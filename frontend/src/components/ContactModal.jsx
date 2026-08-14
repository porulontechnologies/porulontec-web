import { useState, useEffect } from 'react';
import { useContactModal } from '../contexts/ContactModalContext';
import { submitContactInquiry } from '../api/client.js';
import { HiCheckCircle, HiOutlinePaperAirplane, HiXMark } from 'react-icons/hi2';

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  // Reset form when modal closes/opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name Validation
    if (!form.name.trim()) {
      newErrors.name = 'Full Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Full Name must be at least 2 characters';
    }

    // 2. Work Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email.trim()) {
      newErrors.email = 'Work Email is required';
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com)';
    }

    // 3. Phone Number Validation
    const rawDigits = form.phone.replace(/\D/g, '');
    const phoneFormatRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!phoneFormatRegex.test(form.phone.trim()) || rawDigits.length < 10 || rawDigits.length > 13) {
      newErrors.phone = 'Please enter a valid 10-digit phone number (e.g. +91 98765 43210)';
    }

    // 4. Company Validation
    if (!form.company.trim()) {
      newErrors.company = 'Company Name is required';
    } else if (form.company.trim().length < 2) {
      newErrors.company = 'Company Name must be at least 2 characters';
    }

    // 5. Message Validation
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    try {
      await submitContactInquiry({
        name: form.name.trim(),
        email: form.email,
        phone: form.phone,
        company: form.company,
        interest: 'general',
        message: form.message,
      });
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
      setErrors({});
      setTimeout(() => {
        setStatus('idle');
      }, 3500);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An error occurred. Please try again.' });
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal Content - Bright Design */}
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in duration-300"
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-20"
        >
          <HiXMark className="text-xl" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Let's Talk About Your <span className="text-purple-600">Project</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Fill out the form below and our team will get back to you shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-xl text-center">
                {errors.form}
              </div>
            )}
            <div>
              <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                id="modal-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-xl bg-slate-50 border ${errors.name ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 focus:ring-purple-500/50 focus:border-purple-500'} px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium`}
                placeholder="Jane Doe"
              />
              {errors.name && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.name}</p>}
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Work Email
                </label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl bg-slate-50 border ${errors.email ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 focus:ring-purple-500/50 focus:border-purple-500'} px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium`}
                  placeholder="jane@company.com"
                />
                {errors.email && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full rounded-xl bg-slate-50 border ${errors.phone ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 focus:ring-purple-500/50 focus:border-purple-500'} px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="modal-company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Company
              </label>
              <input
                id="modal-company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                className={`w-full rounded-xl bg-slate-50 border ${errors.company ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 focus:ring-purple-500/50 focus:border-purple-500'} px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium`}
                placeholder="Company Inc."
              />
              {errors.company && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.company}</p>}
            </div>

            <div>
              <label htmlFor="modal-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                id="modal-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={`w-full rounded-xl bg-slate-50 border ${errors.message ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 focus:ring-purple-500/50 focus:border-purple-500'} px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none font-medium`}
                placeholder="Share a bit about your project requirements..."
              />
              {errors.message && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.message}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:shadow-none"
              >
                {status === 'sent' ? (
                  <>
                    <HiCheckCircle className="text-xl text-emerald-300" />
                    <span>Inquiry Sent Successfully!</span>
                  </>
                ) : status === 'submitting' ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <HiOutlinePaperAirplane className="text-sm group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
