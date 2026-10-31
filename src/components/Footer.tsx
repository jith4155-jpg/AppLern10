import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Heart, Smartphone, Globe, Mail } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onLanguageChange, onScrollTo }) => {
  const t = translations[currentLang];

  const langs: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'hi', name: 'हिंदी' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering India to build software, websites, and mobile applications for just ₹10. No barrier, no jargon, 100% practical.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>NPCI UPI Verified Merchant</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-white transition-colors">
                  Welcome Orientation
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('curriculum')} className="hover:text-white transition-colors">
                  7-Day Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('community')} className="hover:text-white transition-colors">
                  WhatsApp & Telegram VIP
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('why10')} className="hover:text-white transition-colors">
                  Why ₹10?
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* 5 Indian Languages Switcher */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-400" />
              Supported Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    currentLang === l.code
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Switch anytime to view the complete curriculum and classes in your preferred native language.
            </p>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Student Helpdesk
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Have questions regarding payment or need batch support?
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>support@applern10.edu</span>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              ⚡ Instant enrollment verification active 24x7 via automated UPI gateway.
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AppLern ₹10 Education. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for future app developers across India.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
