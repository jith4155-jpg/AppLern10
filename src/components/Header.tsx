import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language, User } from '../types';
import { translations } from '../data/translations';
import { Globe, LogOut, CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';
import { useAppSettings } from '../hooks/useAppSettings';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  user: User;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAdminPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  user,
  onOpenAuth,
  onLogout,
  onOpenAdminPortal
}) => {
  const { settings } = useAppSettings();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[currentLang];

  const languages: { code: Language; label: string; native: string; flag: string }[] = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🌴' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🏛️' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🚩' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  ];

  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* App Name & Logo */}
        <Logo size="md" showTagline={true} />

        {/* Right Section: Language Toggle + Gmail Login */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Multi-Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-indigo-500/50 text-xs sm:text-sm font-medium text-slate-200 transition-all shadow-sm"
              title="Select Language / ഭാഷ തിരഞ്ഞെടുക്കുക"
            >
              <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="font-semibold text-white">{currentLangObj.native}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setLangMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl py-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    5 Languages
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors text-left ${
                        currentLang === lang.code
                          ? 'bg-indigo-600/20 text-indigo-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <div className="text-sm font-semibold">{lang.native}</div>
                          <div className="text-[11px] text-slate-400">{lang.label}</div>
                        </div>
                      </div>
                      {currentLang === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Admin Approval Portal Trigger */}
          {onOpenAdminPortal && (
            <button
              onClick={onOpenAdminPortal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold transition-all shadow-sm"
              title="Admin Payment Approval Portal"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          )}

          {/* User Auth Section */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* User Token Display */}
              {user.userTokenNumber && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest shadow-inner">
                  <span className="text-indigo-500/60 hidden sm:inline">Token</span>
                  <span className="text-white">#{user.userTokenNumber}</span>
                </div>
              )}

              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-7 h-7 rounded-full border border-indigo-500/50 object-cover"
                />
                <div className="hidden sm:flex flex-col">
                  <span className="text-[11px] font-bold text-white max-w-[100px] truncate leading-tight">
                    {user.name === 'Learner' ? (settings.profilePlaceholder || user.name) : user.name}
                  </span>
                  {user.isPaid && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold text-emerald-400 uppercase tracking-tighter">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Pro Access
                    </span>
                  )}
                </div>
                <div className="w-px h-6 bg-slate-800 mx-1 hidden sm:block" />
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all"
                  title={t.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
            >
              {/* Google G Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{t.loginWithGmail}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
