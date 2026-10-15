import React from 'react';
import { ArrowRight, Sparkles, Code2, Laptop, CalendarCheck, BarChart3, Bot } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { Button } from './ui/Button';

interface HeroProps {
  onViewWorkClick: () => void;
  onHireMeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWorkClick, onHireMeClick }) => {
  const capabilities = [
    { label: "Web UI Design", icon: Laptop },
    { label: "Responsive Websites", icon: Code2 },
    { label: "Booking Systems", icon: CalendarCheck },
    { label: "Dashboard UI", icon: BarChart3 },
    { label: "AI-Powered Web Apps", icon: Bot },
  ];

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden transition-colors"
      aria-label="Hero Section"
    >
      {/* Subtle background ambient gradients (performant compositor blur) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-teal-400/5 dark:from-blue-600/15 dark:via-indigo-600/15 dark:to-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute top-2/3 right-10 w-[350px] h-[220px] bg-gradient-to-br from-emerald-500/5 via-blue-500/10 to-purple-500/5 dark:from-emerald-500/10 dark:via-blue-600/10 dark:to-purple-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero: Typography & Primary Action (Left) + Visual Portrait Frame (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Clean kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-[#131b2e] border border-neutral-200/80 dark:border-[#1e293b] text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Google AI Studio & Modern Web UI Specialist</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-neutral-500 dark:text-neutral-400">Available for hire</span>
            </div>

            {/* SINGLE H1 on Homepage */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.12] mb-6 max-w-2xl text-balance">
              {PROFILE_INFO.headline}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 max-w-xl">
              {PROFILE_INFO.subheading}
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={onViewWorkClick}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                View My Work
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={onHireMeClick}
                className="w-full sm:w-auto"
              >
                Hire Me
              </Button>
            </div>

            {/* Core Capability Badges (Quiet text cards with subtle icons) */}
            <div className="w-full pt-6 border-t border-neutral-200/80 dark:border-[#1e293b]">
              <div className="text-xs uppercase tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 mb-3">
                Core Capabilities
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {capabilities.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div 
                      key={b.label}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#111726] border border-neutral-200/80 dark:border-[#1e293b] text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-2xs hover:border-blue-500/50 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Professional Profile Image Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Outer soft ambient halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-lg opacity-20 dark:opacity-30 transition duration-500"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#111726] border border-neutral-200/90 dark:border-[#1e293b] shadow-xl">
                
                {/* Image Area - Main hero image is NOT lazy-loaded to prevent LCP delay */}
                <div className="relative aspect-square w-full bg-neutral-100 dark:bg-[#171f33] overflow-hidden">
                  <img
                    src={PROFILE_INFO.avatar}
                    alt="Alex Vance, Freelance Web Designer and Developer"
                    width={480}
                    height={480}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Floating Availability Pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#111726]/95 backdrop-blur-md px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-[#1e293b] flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="text-xs">
                        <p className="font-semibold text-neutral-900 dark:text-white">Accepting New Projects</p>
                        <p className="text-neutral-500 dark:text-neutral-400">Fast delivery · 1-3 weeks turnaround</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2026</span>
                  </div>
                </div>

                {/* Sub-card snippet */}
                <div className="p-4 sm:p-5 border-t border-neutral-100 dark:border-[#1e293b] bg-neutral-50/70 dark:bg-[#0e1422]">
                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium text-neutral-900 dark:text-neutral-200">Freelance Web Specialist</span>
                    <span>Austin, TX · Remote Worldwide</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Full-width Metric Strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-neutral-200/70 dark:border-[#1e293b] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tabular-nums">
              8+
            </div>
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">
              Production Websites & Web Apps
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">
              On-Time Project Delivery Rate
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tabular-nums">
              98+
            </div>
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">
              Average Google PageSpeed Score
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono tabular-nums">
              5.0 ★
            </div>
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">
              Client Satisfaction Rating
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
