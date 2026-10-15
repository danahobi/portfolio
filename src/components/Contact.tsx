import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Facebook
} from 'lucide-react';
import { PROFILE_INFO, SERVICES } from '../data/portfolioData';
import { SectionHeader } from './ui/SectionHeader';
import { Button } from './ui/Button';

interface ContactProps {
  initialService?: string;
  initialBudget?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialService, initialBudget }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'Business Website Design',
    budget: initialBudget || '$500 - $1,000',
    details: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update formData when props change
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budget: initialBudget }));
    }
  }, [initialService, initialBudget]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and a few details about your project.');
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('submitting');
    
    // Simulate network submission
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Business Website Design',
      budget: '$500 - $1,000',
      details: '',
    });
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-neutral-100/60 dark:bg-[#0e1422] border-y border-neutral-200/80 dark:border-[#1e293b] transition-colors" aria-label="Contact Section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          kicker="Let's Build Something Great"
          title="Start Your Project Today"
          description="Have a website idea, need a booking system, or want to redesign your current site? Send me a message and I'll get back to you within 24 hours with a free estimate and proposed timeline."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Direct Reach */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-[#111726] rounded-2xl p-7 border border-neutral-200/90 dark:border-[#1e293b] shadow-2xs space-y-6">
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                Direct Contact Channels
              </h3>

              {/* Email Card */}
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#171f33] hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-neutral-200/80 dark:border-[#1e293b] transition-colors group focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Direct Email</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {PROFILE_INFO.email}
                  </span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={PROFILE_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#171f33] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-neutral-200/80 dark:border-[#1e293b] transition-colors group focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block">WhatsApp Chat</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {PROFILE_INFO.phone}
                  </span>
                </div>
              </a>

              {/* Social Channels List */}
              <div className="pt-4 border-t border-neutral-100 dark:border-[#1e293b]">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-3">
                  Professional Profiles
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={PROFILE_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-[#171f33] hover:bg-neutral-200 dark:hover:bg-[#202b44] text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PROFILE_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-[#171f33] hover:bg-neutral-200 dark:hover:bg-[#202b44] text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PROFILE_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-[#171f33] hover:bg-neutral-200 dark:hover:bg-[#202b44] text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Facebook className="w-4 h-4 text-blue-500" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

              {/* Response guarantee */}
              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold block text-blue-700 dark:text-blue-300 mb-1">
                  ⚡ 24-Hour Response Guarantee
                </span>
                I review every project brief personally and prepare a clear timeline breakdown before taking any deposit.
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#111726] rounded-2xl p-7 sm:p-9 border border-neutral-200/90 dark:border-[#1e293b] shadow-sm">
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-950 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. I've received your request for <strong>{formData.service}</strong>. I'll review your details and send you a detailed reply at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleReset}
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Project Request Form">
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-6">
                    Tell Me About Your Project
                  </h3>

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 flex items-start gap-3 text-xs text-red-700 dark:text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#171f33] border border-neutral-200 dark:border-[#1e293b] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#171f33] border border-neutral-200 dark:border-[#1e293b] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#171f33] border border-neutral-200 dark:border-[#1e293b] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#171f33] border border-neutral-200 dark:border-[#1e293b] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Other Custom Web Project">Other Custom Web Project</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Dropdown */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#171f33] border border-neutral-200 dark:border-[#1e293b] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    >
                      <option value="Under $500">Under $500 (Basic Landing Page / Fixes)</option>
                      <option value="$500 - $1,000">$500 - $1,000 (Standard Business Website)</option>
                      <option value="$1,000 - $2,500">$1,000 - $2,500 (Booking System / Custom Portal)</option>
                      <option value="$2,500+">$2,500+ (Comprehensive Web App / SaaS UI)</option>
                      <option value="Flexible / Not Sure Yet">Flexible / Discuss during call</option>
                    </select>
                  </div>

                  {/* Project Details Textarea */}
                  <div>
                    <label htmlFor="details" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Project Details & Goals <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={4}
                      required
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Tell me about your business, what problem this website should solve, any websites you like, and your preferred deadline..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#171f33] border border-neutral-200 dark:border-[#1e293b] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-y"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'submitting'}
                    icon={status === 'submitting' ? undefined : <Send className="w-4 h-4" />}
                    className="w-full"
                  >
                    {status === 'submitting' ? 'Sending Your Request...' : 'Send Project Request'}
                  </Button>

                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500 text-center">
                    Your information is 100% confidential. No spam or newsletters ever.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
