import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Users, 
  Video, 
  Layout, 
  Clock, 
  MessageCircleQuestion,
  TrendingDown,
  ChevronRight
} from 'lucide-react';

interface LoginGateProps {
  currentLang: Language;
  onOpenAuth: () => void;
}

export const LoginGate: React.FC<LoginGateProps> = ({ currentLang, onOpenAuth }) => {
  const tEn = translations.en;
  const tMl = translations.ml;

  const highlights = [
    {
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      titleEn: tEn.highlightAgeTitle,
      descEn: tEn.highlightAgeDesc,
      titleMl: tMl.highlightAgeTitle,
      descMl: tMl.highlightAgeDesc
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      titleEn: tEn.highlightNoLaptopTitle,
      descEn: tEn.highlightNoLaptopDesc,
      titleMl: tMl.highlightNoLaptopTitle,
      descMl: tMl.highlightNoLaptopDesc
    },
    {
      icon: <Video className="w-5 h-5 text-amber-400" />,
      titleEn: tEn.highlightDeliveryTitle,
      descEn: tEn.highlightDeliveryDesc,
      titleMl: tMl.highlightDeliveryTitle,
      descMl: tMl.highlightDeliveryDesc
    },
    {
      icon: <Layout className="w-5 h-5 text-blue-400" />,
      titleEn: tEn.highlightBuildTitle,
      descEn: tEn.highlightBuildDesc,
      titleMl: tMl.highlightBuildTitle,
      descMl: tMl.highlightBuildDesc
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-400" />,
      titleEn: tEn.highlightSupportTitle,
      descEn: tEn.highlightSupportDesc,
      titleMl: tMl.highlightSupportTitle,
      descMl: tMl.highlightSupportDesc
    },
    {
      icon: <MessageCircleQuestion className="w-5 h-5 text-rose-400" />,
      titleEn: tEn.highlightDoubtTitle,
      descEn: tEn.highlightDoubtDesc,
      titleMl: tMl.highlightDoubtTitle,
      descMl: tMl.highlightDoubtDesc
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 animate-in fade-in duration-700 bg-slate-950 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Top Header */}
        <div className="text-center space-y-4">
          <Logo size="lg" showTagline={true} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Official National Tech Initiative</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden relative">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -ml-32 -mb-32" />

          <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-10">
            
            {/* Title Section */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                    {tMl.loginGateTitle.split('₹10')[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500">₹10 Only</span>
                  </h1>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-300">
                    {tEn.loginGateTitle.split('₹10')[0]}
                    <span className="text-amber-400">₹10 Only</span>
                  </h2>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-400 text-xs sm:text-sm lg:text-base max-w-3xl mx-auto leading-relaxed font-medium">
                    {tMl.loginGateAffordability}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm lg:text-base max-w-3xl mx-auto leading-relaxed font-medium italic">
                    {tEn.loginGateAffordability}
                  </p>
                </div>
              </div>

              {/* Affordability Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-bold shadow-lg">
                <TrendingDown className="w-5 h-5" />
                <span>99.9% More Affordable than Market Courses (₹20,000–₹45,000)</span>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group p-5 rounded-[2rem] bg-slate-950/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all hover:bg-slate-900/80"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="space-y-0.5">
                        <h3 className="text-white font-black text-sm sm:text-base flex items-center gap-2">
                          {item.titleMl}
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                        </h3>
                        <h4 className="text-slate-300 font-bold text-xs sm:text-sm">
                          {item.titleEn}
                        </h4>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
                          {item.descMl}
                        </p>
                        <p className="text-slate-500 text-[10px] sm:text-[11px] leading-relaxed italic">
                          {item.descEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Login Action Area */}
            <div className="pt-4 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto min-w-[300px] flex items-center justify-center gap-4 px-8 py-5 rounded-[1.5rem] bg-white hover:bg-slate-100 text-slate-950 font-black text-lg transition-all shadow-2xl hover:shadow-white/20 active:scale-95 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="leading-tight">{translations[currentLang].loginWithGmail}</span>
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Secure Google Auth</span>
                  </div>
                </button>
                
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Secure 256-bit Encryption • Instant Access</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Language & Support Indicators */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
          {['Malayalam', 'Tamil', 'Kannada', 'Hindi', 'English'].map((lang, idx) => (
            <span key={idx} className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-default group">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/30 group-hover:bg-indigo-500 transition-colors" />
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
