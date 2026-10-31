import React from 'react';
import { User, Language } from '../types';
import { X, Award, Download, CheckCircle, Sparkles, Printer } from 'lucide-react';
import { Logo } from './Logo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  currentLang: Language;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certId = user.paymentDetails?.transactionId 
    ? `AL10-${user.paymentDetails.transactionId.replace(/[^A-Z0-9]/g, '').slice(-8)}`
    : `AL10-${Math.floor(100000 + Math.random() * 900000)}`;

  const issueDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 my-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Official Certificate of Completion</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Printable Certificate Design */}
        <div className="mt-6 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-4 border-double border-amber-500/40 relative shadow-2xl text-center overflow-hidden">
          
          {/* Subtle watermark background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-9xl font-black">APPLERN</span>
          </div>

          {/* Corner flourish borders */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

          {/* Top Logo */}
          <div className="flex justify-center mb-4">
            <Logo size="md" showTagline={false} />
          </div>

          <div className="text-xs uppercase tracking-[0.3em] font-extrabold text-amber-400 mb-1">
            National Initiative for Accessible Code Education
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide mb-4">
            Certificate of Achievement
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 italic mb-2">
            This is proudly presented to
          </p>

          <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-pink-300 my-3 font-serif underline decoration-amber-400/40 decoration-1">
            {user.name || "Enrolled Scholar"}
          </div>

          <p className="text-xs text-slate-400 font-mono mb-4">
            ({user.email})
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            For successfully completing the comprehensive 6-month curriculum of <strong className="text-white font-semibold">AppLern ₹10</strong>, covering fundamental client-server architectures, HTML5/CSS design, interactive JavaScript logic, Progressive Web Apps (PWA), and AI-accelerated application development.
          </p>

          {/* Bottom Verification & Signatures */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs text-slate-400">
            <div className="text-left">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Issue Date</div>
              <div className="font-semibold text-slate-200">{issueDate}</div>
              <div className="text-[10px] text-slate-500 mt-1">Verification ID:</div>
              <div className="font-mono text-amber-400 font-bold">{certId}</div>
            </div>

            {/* Gold Seal Badge */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-0.5 shadow-xl shadow-amber-500/20">
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-[8px] font-black uppercase tracking-tighter">VERIFIED</span>
                  <span className="text-[7px] text-slate-400">₹10 MASTER</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-base text-white">AppLern Academic Board</div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Authorized Mentor & Director</div>
              <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle className="w-3 h-3" />
                <span>Verified Credential</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
