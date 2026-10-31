import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Modern App Icon Concept: Smartphone + Web Tag + Rupee Badge */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 transition-transform duration-300 hover:scale-105`}>
        <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
          {/* Subtle grid pattern inside icon */}
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:6px_6px] opacity-30" />
          
          {/* Tech Code & Device Symbol */}
          <div className="relative flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-pink-300">
            <span className="font-mono text-indigo-400">&lt;</span>
            <span className="font-sans font-extrabold tracking-tighter mx-0.5">AL</span>
            <span className="font-mono text-pink-400">&gt;</span>
          </div>

          {/* Micro ₹10 badge on top corner */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[9px] font-black px-1 rounded-bl-md rounded-tr-md shadow-sm">
            ₹10
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white ${textSizes[size]}`}>
            App<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Lern</span>
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-sm shadow-amber-500/20">
            ₹10
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-400 tracking-wide mt-0.5">
            App & Web Mastery
          </span>
        )}
      </div>
    </div>
  );
};
