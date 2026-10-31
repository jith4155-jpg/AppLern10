import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language, User } from '../types';
import { translations } from '../data/translations';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  ArrowRight, 
  Play, 
  MessageCircle, 
  Send, 
  Download,
  Lock,
  Unlock,
  Receipt
} from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  user: User;
  onGoToClasses: () => void;
  onGoToCommunity: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  user,
  onGoToClasses,
  onGoToCommunity
}) => {
  const t = translations[currentLang];

  useEffect(() => {
    if (isOpen) {
      // Fire festive celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const payment = user.paymentDetails;

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Verified & Enrolled
          </span>

          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {t.paymentSuccessTitle}
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-sm mx-auto">
            {t.paymentSuccessSubtitle}
          </p>
        </div>

        {/* Unlocked Confirmation Card */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-sm">
            <Unlock className="w-4 h-4 text-emerald-400" />
            <span>All Daily Classes & Community Groups Unlocked!</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.congratsMessage}
          </p>
        </div>

        {/* Official Receipt Box */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-indigo-400" />
              Tax Invoice / Payment Receipt
            </span>
            <span className="text-emerald-400 font-bold">PAID ₹10.00</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-slate-300">
            <div>
              <span className="text-slate-500">Student Email:</span>
              <div className="font-semibold text-white truncate">{user.email}</div>
            </div>
            <div>
              <span className="text-slate-500">Transaction ID:</span>
              <div className="font-mono font-bold text-indigo-300 truncate">
                {payment?.transactionId || 'UPI-VERIFIED-9821'}
              </div>
            </div>
            <div>
              <span className="text-slate-500">UTR Reference:</span>
              <div className="font-mono font-semibold text-slate-200">
                {payment?.utrNumber || '430129841234'}
              </div>
            </div>
            <div>
              <span className="text-slate-500">Date & Time:</span>
              <div className="text-slate-200 font-medium">
                {payment?.paidAt || 'Just Now'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="mt-6 space-y-2.5">
          {/* Start Learning */}
          <button
            onClick={() => {
              onClose();
              onGoToClasses();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t.accessNowBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Join VIP WhatsApp & Telegram */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="https://chat.whatsapp.com/invite/applern10vip"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="py-3 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Join WhatsApp VIP</span>
            </a>

            <a
              href="https://t.me/applern10community"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="py-3 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>Join Telegram</span>
            </a>
          </div>

          <button
            onClick={handlePrintReceipt}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print / Save Payment Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};
