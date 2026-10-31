import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Language, User } from '../types';
import { translations } from '../data/translations';
import { generateSampleReceiptBase64 } from '../utils/receiptGenerator';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  Zap, 
  Clock, 
  Smartphone,
  UploadCloud,
  FileImage,
  Sparkles,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Eye
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  user: User;
  onRequireAuth: () => void;
  onPaymentSuccess: (paymentData: {
    transactionId: string;
    utrNumber: string;
    paidAt: string;
    amount: number;
    paymentMethod: string;
  }) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  user,
  onRequireAuth,
  onPaymentSuccess
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'screenshot' | 'manual'>('screenshot');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer

  // Screenshot upload state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isVerifyingAI, setIsVerifyingAI] = useState(false);
  const [verificationStep, setVerificationStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [aiResultDetails, setAiResultDetails] = useState<any | null>(null);

  const upiId = "applern10@upi";
  const payeeName = "AppLern Education";
  const amount = "10";
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=AppLern%20Enrollment%20Fee`;

  // Generate crisp QR code on mount
  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(upiDeepLink, {
        width: 260,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error("QR Code Error:", err));
      
      setTimeLeft(600);
      setError(null);
      setAiResultDetails(null);
    }
  }, [isOpen, upiDeepLink]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timeLeft]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Handle file selection from local device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please select an image file (PNG, JPG, or WebP).");
      return;
    }

    setImageFileName(file.name);
    setError(null);
    setAiResultDetails(null);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
    };
    reader.readAsDataURL(file);
  };

  // Load one of the realistic test receipts
  const handleLoadSampleReceipt = async (type: 'valid_10' | 'wrong_amount' | 'duplicate_utr') => {
    setError(null);
    setAiResultDetails(null);
    const sample = await generateSampleReceiptBase64(type);
    setSelectedImage(sample);
    if (type === 'valid_10') setImageFileName('GPay_Payment_Rs10_Success.jpg');
    if (type === 'wrong_amount') setImageFileName('PhonePe_Receipt_Rs50_WrongAmount.jpg');
    if (type === 'duplicate_utr') setImageFileName('Paytm_AlreadyClaimed_DuplicateUTR.jpg');
  };

  // Perform Gemini AI OCR Screenshot Verification
  const handleVerifyScreenshot = async () => {
    if (!user.isLoggedIn) {
      onRequireAuth();
      return;
    }

    if (!selectedImage) {
      setError("Please upload or select a payment screenshot first.");
      return;
    }

    setError(null);
    setAiResultDetails(null);
    setIsVerifyingAI(true);
    setVerificationStep("Scanning screenshot with Gemini AI OCR...");

    try {
      // Small simulated pipeline status updates for rich UX
      setTimeout(() => setVerificationStep("Checking Amount matches ₹10..."), 400);
      setTimeout(() => setVerificationStep("Verifying transaction timestamp recency..."), 800);
      setTimeout(() => setVerificationStep("Checking UTR uniqueness across registry..."), 1200);

      const response = await fetch('/api/verify-screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: 'image/jpeg',
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsVerifyingAI(false);
        setError(data.error || "Verification failed. Please check the receipt details.");
        if (data.details) {
          setAiResultDetails(data.details);
        }
        return;
      }

      // Verification Succeeded!
      setIsVerifyingAI(false);
      setVerificationStep("Payment Verified! Unlocking access...");

      setTimeout(() => {
        onPaymentSuccess({
          transactionId: data.transactionId,
          utrNumber: data.utrNumber,
          paidAt: data.verifiedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          amount: 10,
          paymentMethod: 'UPI (AI Verified)'
        });
        onClose();
      }, 500);

    } catch (err: any) {
      setIsVerifyingAI(false);
      setError("Failed to connect to verification server. Please try again.");
    }
  };

  // Verify Manual UTR entry
  const handleVerifyManualUtr = async () => {
    if (!user.isLoggedIn) {
      onRequireAuth();
      return;
    }

    const code = utrNumber.trim();
    if (!code) {
      setError("Please enter the 12-digit UTR/UPI Reference number.");
      return;
    }

    if (code.length < 8) {
      setError("Please enter a valid 12-digit UPI reference / UTR number.");
      return;
    }

    setError(null);
    setIsVerifyingAI(true);
    setVerificationStep("Checking UTR uniqueness with banking registry...");

    try {
      const response = await fetch('/api/verify-manual-utr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          utrNumber: code,
          userEmail: user.email,
        }),
      });

      const data = await response.json();
      setIsVerifyingAI(false);

      if (!response.ok || !data.success) {
        setError(data.error || "UTR verification failed.");
        return;
      }

      onPaymentSuccess({
        transactionId: data.transactionId,
        utrNumber: data.utrNumber,
        paidAt: data.verifiedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        amount: 10,
        paymentMethod: 'UPI'
      });
      onClose();

    } catch (err: any) {
      setIsVerifyingAI(false);
      setError("Verification failed. Please check your network and try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 my-6 overflow-hidden max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                {t.paymentModalTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pay ₹10 via UPI • Instant AI Screenshot or UTR Verification
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4 pt-3">
          
          {/* Sign-In Required Alert */}
          {!user.isLoggedIn && (
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Please sign in with your Gmail first to link your verified payment.</span>
              </div>
              <button
                onClick={onRequireAuth}
                className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Price Bar & Timer */}
          <div className="flex items-center justify-between bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t.amountLabel}</div>
              <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">
                ₹10.00 <span className="text-xs font-normal text-slate-400">INR</span>
              </div>
            </div>

            {/* Micro UPI Copy */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-300 font-semibold">{upiId}</span>
              <button
                onClick={handleCopyUPI}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-200 transition-colors flex items-center gap-1"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUpi ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3 text-amber-400" />
                Valid for
              </div>
              <div className="text-xs font-mono font-bold text-amber-300">
                {formatTimer(timeLeft)}
              </div>
            </div>
          </div>

          {/* Collapsible / Compact QR Code Box */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
              {qrDataUrl && (
                <img 
                  src={qrDataUrl} 
                  alt="AppLern UPI QR Code" 
                  className="w-28 h-28 object-contain rounded-lg"
                />
              )}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Scan with GPay, PhonePe, Paytm, or BHIM</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Pay ₹10 to <strong className="text-slate-200 font-mono">applern10@upi</strong>. Once completed, upload the screenshot below for instant automated AI unlocking!
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start">
                <a
                  href={upiDeepLink}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold transition-colors"
                >
                  <span>Open in UPI App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Verification Method Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => { setActiveTab('screenshot'); setError(null); }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'screenshot'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{t.tabUploadScreenshot}</span>
            </button>

            <button
              onClick={() => { setActiveTab('manual'); setError(null); }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'manual'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{t.tabManualUtr}</span>
            </button>
          </div>

          {/* TAB 1: AI Screenshot Verification (OCR) */}
          {activeTab === 'screenshot' && (
            <div className="space-y-3.5">
              
              {/* Dropzone / Upload Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                  selectedImage
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : 'border-slate-700 hover:border-indigo-500/60 bg-slate-950/40 hover:bg-slate-950/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedImage ? (
                  <div className="flex items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedImage}
                        alt="Selected payment screenshot"
                        className="w-14 h-14 rounded-xl object-cover border border-emerald-500/50 shadow-md"
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="truncate max-w-[200px]">{imageFileName || 'payment_screenshot.jpg'}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Ready for Gemini AI OCR analysis
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setImageFileName('');
                        setAiResultDetails(null);
                        setError(null);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5 py-2">
                    <div className="w-10 h-10 mx-auto rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">
                      {t.uploadBoxTitle}
                    </div>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                      {t.uploadBoxSubtitle}
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Receipts Chips for 1-Click Interactive Testing */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.trySampleReceipts}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleLoadSampleReceipt('valid_10')}
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Valid ₹10 GPay (Pass)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoadSampleReceipt('wrong_amount')}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    title="Simulate amount mismatch rejection (₹50 instead of ₹10)"
                  >
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    <span>Wrong Amount ₹50 (Fails)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoadSampleReceipt('duplicate_utr')}
                    className="px-2.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    title="Simulate duplicate UTR rejection"
                  >
                    <XCircle className="w-3 h-3 text-rose-400" />
                    <span>Duplicate UTR (Fails)</span>
                  </button>
                </div>
              </div>

              {/* AI Verification Action Button */}
              <button
                type="button"
                onClick={handleVerifyScreenshot}
                disabled={isVerifyingAI || !selectedImage}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isVerifyingAI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span className="truncate">{verificationStep || t.verifyingBtn}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Verify Screenshot with AI & Unlock Course</span>
                  </>
                )}
              </button>

            </div>
          )}

          {/* TAB 2: Manual UTR Entry */}
          {activeTab === 'manual' && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.utrInputLabel}
                </label>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                  placeholder={t.utrPlaceholder}
                  maxLength={16}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyManualUtr}
                disabled={isVerifyingAI || !utrNumber}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isVerifyingAI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Checking UTR Uniqueness...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Verify UTR & Unlock</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Error Message Box */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-rose-300">Verification Rejected</div>
                <div className="leading-relaxed">{error}</div>
                {aiResultDetails && (
                  <div className="mt-2 pt-2 border-t border-rose-500/30 text-[11px] font-mono text-rose-300/80">
                    Extracted Amount: ₹{aiResultDetails.amount ?? 'N/A'} • Status: {aiResultDetails.isSuccessfulStatus ? 'Paid' : 'Unconfirmed'}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Guarantee */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Automated 24/7 AI verification • Instant unlock guaranteed</span>
        </div>

      </div>
    </div>
  );
};
