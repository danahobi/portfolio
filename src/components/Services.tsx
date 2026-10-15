import React from 'react';
import { 
  Briefcase, 
  Rocket, 
  Calendar, 
  ShoppingBag, 
  LayoutDashboard, 
  RefreshCw, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { Service } from '../types';
import { SectionHeader } from './ui/SectionHeader';

interface ServicesProps {
  onRequestService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onRequestService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return Briefcase;
      case 'Rocket':
        return Rocket;
      case 'Calendar':
        return Calendar;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'LayoutDashboard':
        return LayoutDashboard;
      case 'RefreshCw':
      default:
        return RefreshCw;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 transition-colors" aria-label="Services Offered">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          kicker="Capabilities & Offerings"
          title="Services Tailored for Growing Businesses"
          description="From high-impact marketing pages to specialized booking platforms and SaaS dashboards, I deliver production-ready web experiences engineered for speed, conversions, and long-term usability."
          action={
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              All plans include mobile optimization & 30-day post-launch warranty
            </span>
          }
        />

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service: Service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="group relative bg-white dark:bg-[#111726] rounded-2xl p-7 border border-neutral-200/90 dark:border-[#1e293b] shadow-2xs hover:shadow-lg hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-[#1a233a] text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-8">
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Request Button */}
                <div className="pt-4 border-t border-neutral-100 dark:border-[#1e293b]">
                  <button
                    onClick={() => onRequestService(service.title)}
                    className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-100 dark:bg-[#171f33] hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-neutral-800 dark:text-neutral-200 text-xs font-semibold tracking-wide transition-all cursor-pointer group-hover:border-transparent active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
