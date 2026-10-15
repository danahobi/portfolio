import React from 'react';
import { X, Download, Printer, CheckCircle2, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate downloadable text/markdown resume
    const resumeText = `# Alex Vance - Freelance Web Designer & Developer
Austin, TX / Remote Worldwide | ${PROFILE_INFO.email} | ${PROFILE_INFO.phone}

## Summary
Freelance frontend developer & UI designer crafting modern, high-converting websites, appointment booking portals, and SaaS dashboards with Google AI Studio, React, TypeScript, and Tailwind CSS.

## Core Technical Skills
- Frontend: React, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
- Prototyping & AI: Google AI Studio, Figma, Gemini API
- Backend & Databases: Node.js, Express, Firebase Firestore, Supabase, PostgreSQL
- Tooling: Git, GitHub, Vite, Vercel, Netlify

## Featured Client Deliverables
- BrightSmile Dental Clinic: Real-time booking portal reducing no-shows by 38%
- UrbanEats Restaurant: Digital menu & instant table reservation platform
- HomeNest Real Estate: High-end property listing app with faceted search
- TaskFlow Dashboard: Modern SaaS analytics console with interactive visualizations

## Work Experience
Freelance Web Designer & Developer (2022 - Present)
- Delivered 20+ responsive web projects for small businesses and clinics.
- Maintained a 100% on-time delivery record with average PageSpeed scores over 95.

## Education
B.S. in Computer Science / Interactive Media Design
`;

    const blob = new Blob([resumeText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Alex_Vance_Resume.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">Curriculum Vitae (CV)</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium">Updated 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Print CV"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer text-xs font-medium flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.MD)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-sm text-neutral-700 dark:text-neutral-300">
          
          {/* Header Info */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <h2 id="resume-title" className="text-2xl font-bold text-neutral-950 dark:text-white">
              {PROFILE_INFO.name}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium mt-0.5">
              {PROFILE_INFO.title}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              <span>{PROFILE_INFO.location}</span>
              <span>·</span>
              <span>{PROFILE_INFO.email}</span>
              <span>·</span>
              <span>{PROFILE_INFO.phone}</span>
            </div>
          </div>

          {/* About section */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
              Professional Summary
            </h3>
            <p className="leading-relaxed">
              Freelance web designer and developer specializing in creating high-performance, conversion-oriented websites and modern web app interfaces using Google AI Studio, React, TypeScript, and Tailwind CSS. Proven track record in rapid prototyping, clean code architectures, and user-centric booking workflows.
            </p>
          </div>

          {/* Quick Skills */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-blue-500" />
              <span>Technical Competencies</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                <span className="font-semibold block text-neutral-900 dark:text-white mb-1">Frontend & UI</span>
                <span className="text-neutral-600 dark:text-neutral-400">React, TypeScript, Tailwind CSS, Responsive Design, WCAG AA Accessibility, Motion, Component Systems</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                <span className="font-semibold block text-neutral-900 dark:text-white mb-1">AI & Development Tools</span>
                <span className="text-neutral-600 dark:text-neutral-400">Google AI Studio, Git, GitHub, Vite, Firebase, Supabase, REST APIs, Vercel & Netlify Deployment</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>Selected Project Milestones</span>
            </h3>
            <div className="space-y-4">
              <div className="relative pl-4 border-l-2 border-blue-500">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Healthcare Booking Portals</h4>
                  <span className="text-xs text-neutral-500 font-mono">2025 – Present</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Engineered automated appointment scheduling systems for dental clinics and wellness centers, featuring automated confirmation SMS/emails and patient intake forms.
                </p>
              </div>

              <div className="relative pl-4 border-l-2 border-neutral-300 dark:border-neutral-700">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">High-Impact Business & Hospitality Websites</h4>
                  <span className="text-xs text-neutral-500 font-mono">2024 – Present</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Built modern websites for restaurants, real estate brokerages, and local services resulting in an average 40%+ increase in qualified customer inquiries.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>Education & Certifications</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Bachelor of Science in Interactive Media & Computer Science · Certified Frontend Developer & UX Specialist
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
