import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Facebook,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { SectionHeader } from './ui/SectionHeader';
import { Button } from './ui/Button';
import { MessengerIcon } from './icons/MessengerIcon';

interface ContactProps {
  initialService?: string;
  initialBudget?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialService, initialBudget }) => {
  const { profile, services } = usePortfolioData();
  const messengerLink = profile.messengerUrl || profile.socials?.messenger || 'https://m.me/happyperson.dev';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'Website Design & Development',
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
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Website Design & Development',
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
          description="Have a website idea, need a booking system, or want to redesign your current site? Message me on Messenger for the fastest reply, or fill out the project form."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Direct Reach */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-[#111726] rounded-3xl p-6 sm:p-7 border border-neutral-200/90 dark:border-[#1e293b] shadow-2xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl overflow-hidden bg-blue-600 border border-blue-400/30 shrink-0">
                  <img
                    src={profile.avatar}
                    alt={`${profile.brandName} mascot`}
                    width={44}
                    height={44}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                      Direct Studio Channels
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                    Direct reply from {profile.name}
                  </span>
                </div>
              </div>

              {/* 1. PRIMARY CONTACT METHOD: Facebook Messenger */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 dark:from-blue-600/20 dark:via-indigo-900/15 dark:to-cyan-900/15 border-2 border-blue-500/60 dark:border-blue-500/50 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-2xs">
                    <Sparkles className="w-3 h-3 text-cyan-200" />
                    <span>Primary Contact Method</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Fastest Response
                  </span>
                </div>

                <h4 className="text-sm font-bold text-neutral-950 dark:text-white mb-1">
                  Facebook Messenger
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-3.5 leading-relaxed">
                  The quickest way to reach me for project discussions, design reviews, and instant estimates.
                </p>

                {/* Prominent Message on Messenger Button */}
                <a
                  href={messengerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0084FF] via-[#0072F5] to-[#0062E0] hover:from-[#0074E8] hover:to-[#0052C8] shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group cursor-pointer"
                  aria-label="Message on Facebook Messenger"
                >
                  <MessengerIcon className="w-5 h-5 fill-white shrink-0" />
                  <span>Message on Messenger</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* 2. SECONDARY CONTACT METHOD: WhatsApp (Placed Lower) */}
              <a
                href={profile.socials?.whatsapp || `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#171f33] hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 border border-neutral-200/80 dark:border-[#1e293b] transition-colors group focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">WhatsApp Chat</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">Secondary</span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate block">
                    {profile.phone}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600 transition-colors shrink-0" />
              </a>

              {/* 3. EMAIL BACKUP: Professional Backup Contact Method */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#171f33] hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-neutral-200/80 dark:border-[#1e293b] transition-colors group focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Email Inquiry</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">Professional Backup</span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate block">
                    {profile.email}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-600 transition-colors shrink-0" />
              </a>

              {/* Social Channels List */}
              <div className="pt-3 border-t border-neutral-100 dark:border-[#1e293b]">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-2.5">
                  Profiles & Channels
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={messengerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-medium transition-colors"
                  >
                    <MessengerIcon className="w-3.5 h-3.5 fill-current" />
                    <span>Messenger</span>
                  </a>
                  <a
                    href={profile.socials?.facebook || 'https://facebook.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-[#171f33] hover:bg-neutral-200 dark:hover:bg-[#202b44] text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-500" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={profile.socials?.github || 'https://github.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-[#171f33] hover:bg-neutral-200 dark:hover:bg-[#202b44] text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.socials?.linkedin || 'https://linkedin.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-[#171f33] hover:bg-neutral-200 dark:hover:bg-[#202b44] text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Response guarantee */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold block text-blue-700 dark:text-blue-300 mb-0.5">
                  ⚡ 24-Hour Response Guarantee
                </span>
                For fastest answers, click <strong>Message on Messenger</strong> above. I review every project brief personally!
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#111726] rounded-3xl p-6 sm:p-9 border border-neutral-200/90 dark:border-[#1e293b] shadow-sm">
              
              {status === 'success' ? (
                <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. I've received your request for <strong>{formData.service}</strong>.
                    </p>
                  </div>

                  {/* Faster Reply Messenger Callout as requested */}
                  <div className="max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 dark:from-blue-600/20 dark:via-indigo-950/40 dark:to-cyan-950/30 border border-blue-500/40 text-left space-y-3 shadow-xs">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
                      <MessengerIcon className="w-5 h-5 fill-current shrink-0" />
                      <span>Speed Up Your Project Reply</span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                      Thanks! For a faster reply, please also send your project details on Messenger.
                    </p>

                    <a
                      href={messengerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0084FF] to-[#0062E0] hover:from-[#0074E8] hover:to-[#0052C8] shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      <MessengerIcon className="w-4 h-4 fill-white" />
                      <span>Continue on Messenger</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                    </a>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleReset}
                      className="text-xs"
                    >
                      Send Another Message
                    </Button>
                  </div>
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
                        {(services && services.length > 0 ? services : []).map((s) => (
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
