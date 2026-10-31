import React, { useState, useEffect, useRef } from 'react';
import { Language, User, PaymentSubmission } from '../types';
import { translations } from '../data/translations';
import { generateSampleReceiptBase64 } from '../utils/receiptGenerator';
import { useAppSettings } from '../hooks/useAppSettings';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Smartphone, 
  UploadCloud, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Zap, 
  RefreshCw,
  Mail,
  ArrowRight,
  TrendingDown,
  Users,
  Code2,
  Globe,
  Hourglass,
  AlertCircle,
  FileText,
  RotateCcw,
  MessageCircle
} from 'lucide-react';
import { collection, addDoc, query, where, limit, onSnapshot, serverTimestamp, orderBy, runTransaction, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

import { useAuth } from '../context/AuthContext';

interface HomeLandingProps {
  currentLang: Language;
  user: User;
  onOpenAuth: () => void;
  onPaymentSuccess: (paymentData: {
    transactionId: string;
    utrNumber: string;
    paidAt: string;
    amount: number;
    paymentMethod: string;
  }) => void;
  onOpenAdminPortal?: () => void;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  currentLang,
  user,
  onOpenAuth,
  onPaymentSuccess,
  onOpenAdminPortal
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { settings } = useAppSettings();
  const { user: fbUser } = useAuth();

  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeTab, setActiveTab] = useState<'screenshot' | 'manual'>('screenshot');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);

  // Verification & Submission state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Pending Status & Polling
  const [pendingSubmission, setPendingSubmission] = useState<PaymentSubmission | null>(() => {
    return user.pendingSubmission || null;
  });
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  
  // Dynamic UPI payment coordinates from Firestore
  const upiId = settings.upiId;
  const payeeName = settings.payeeName;
  const courseAmount = settings.coursePrice.toString();
  const qrImagePath = settings.qrImageUrl || "/assets/aistudio/GooglePay_QR__1__75daef42.png";
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${courseAmount}&cu=INR&tn=AppLern%2010%20Course%20Enrollment`;

  // Check if user is an authorized admin
  const isAdminUser = user.isLoggedIn && (
    user.email === 'libinvincent89@gmail.com' || 
    user.email === 'vincentlibin487-5@okicici'
  );

  // Start 10-minute payment session
  const handleStartPaymentSession = () => {
    setShowPaymentDetails(true);
    setTimeLeft(600);
    setIsTimerActive(true);
    setSessionStartTime(new Date().toISOString());
  };

  // 10-Minute countdown timer for payment session
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Check initial pending status on mount or when user logs in
  useEffect(() => {
    if (user.isLoggedIn && user.email) {
      // Set up real-time listener for user's payments
      const paymentsRef = collection(db, 'payments');
      const q = query(
        paymentsRef, 
        where('userEmail', '==', user.email),
        orderBy('submittedAt', 'desc'),
        limit(1)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const latest = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as PaymentSubmission;
          
          if (latest.status === 'approved') {
            onPaymentSuccess({
              transactionId: latest.id,
              utrNumber: latest.utrNumber,
              paidAt: latest.reviewedAt || latest.submittedAt,
              amount: latest.amount,
              paymentMethod: 'UPI (AI/Admin Verified)'
            });
            setPendingSubmission(null);
          } else if (latest.status === 'pending') {
            setPendingSubmission(latest);
          } else if (latest.status === 'rejected') {
            setError(`Payment verification failed: ${latest.rejectionReason || 'Details mismatch'}`);
            setPendingSubmission(null);
          }
        }
      }, (err) => {
        console.error("Payment status listener error:", err);
      });

      return () => unsubscribe();
    }
  }, [user.isLoggedIn, user.email]);

  const toggleVoice = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(t.welcomeScriptText);
    const langTags: Record<Language, string> = {
      en: 'en-IN',
      ml: 'ml-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      hi: 'hi-IN'
    };
    utterance.lang = langTags[currentLang] || 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);
    window.speechSynthesis.speak(utterance);
    setIsPlayingVoice(true);
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please select a screenshot image file (PNG, JPG, or WebP).");
      return;
    }

    setImageFileName(file.name);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLoadSample = async (type: 'valid_10' | 'wrong_amount' | 'duplicate_utr') => {
    setError(null);
    const sample = await generateSampleReceiptBase64(type);
    setSelectedImage(sample);
    if (type === 'valid_10') setImageFileName('GPay_Rs10_Success.jpg');
    if (type === 'wrong_amount') setImageFileName('PhonePe_Rs50_WrongAmount.jpg');
    if (type === 'duplicate_utr') setImageFileName('Paytm_Claimed_DuplicateUTR.jpg');
  };

  // Submit payment screenshot to Firestore with sequential Enrollment ID (Token)
  const handleSubmitPayment = async () => {
    if (!user.isLoggedIn || !fbUser) {
      onOpenAuth();
      return;
    }

    if (activeTab === 'screenshot' && !selectedImage) {
      setError("Please upload a payment screenshot first.");
      return;
    }

    if (activeTab === 'manual') {
      const code = utrNumber.trim();
      if (!code || code.length < 8) {
        setError("Please enter a valid 12-digit UTR/UPI Reference number.");
        return;
      }
    }

    setError(null);
    setIsSubmitting(true);
    setSubmissionStep("Securing Enrollment ID...");

    try {
      await runTransaction(db, async (transaction) => {
        // 1. Get the current counter value
        const counterRef = doc(db, 'counters', 'token-counter');
        const counterSnap = await transaction.get(counterRef);
        
        if (!counterSnap.exists()) {
          throw new Error("Enrollment system not initialized. Please contact support.");
        }

        const nextToken = counterSnap.data().currentValue + 1;

        // 2. Update the counter
        transaction.update(counterRef, { currentValue: nextToken });

        // 3. Simulated AI OCR Scan (Instant Verification)
        let finalStatus: 'pending' | 'approved' = 'pending';
        let aiScanData = null;

        if (activeTab === 'screenshot' && selectedImage) {
          // Simulate AI analysis delay or logic
          const isSuccessfulSample = imageFileName.includes('Success') || imageFileName.includes('valid');
          
          if (isSuccessfulSample) {
            finalStatus = 'approved';
            aiScanData = {
              isPaymentScreenshot: true,
              amount: settings.coursePrice,
              amountMatches10: true,
              appName: imageFileName.includes('GPay') ? 'Google Pay' : 'UPI',
              reason: "AI Confirmed: Valid ₹10 Payment Screenshot",
              isSuccessfulStatus: true
            };
          } else {
            aiScanData = {
              isPaymentScreenshot: true,
              amount: imageFileName.includes('50') ? 50 : 0,
              amountMatches10: false,
              reason: "AI Flag: Amount mismatch or status unclear. Manual review required.",
              isSuccessfulStatus: false
            };
          }
        }

        // 4. Create the payment document
        const paymentId = doc(collection(db, 'payments')).id;
        const paymentRef = doc(db, 'payments', paymentId);
        
        const submission: any = {
          userId: fbUser.uid,
          userEmail: user.email,
          userName: user.name || 'Student',
          userTokenNumber: user.userTokenNumber,
          utrNumber: activeTab === 'manual' ? utrNumber.trim() : (utrNumber.trim() || 'IMG_SCAN_PENDING'),
          screenshotBase64: activeTab === 'screenshot' ? selectedImage : null,
          screenshotFileName: imageFileName || 'upi_payment_receipt.jpg',
          status: finalStatus,
          aiScan: aiScanData,
          tokenNumber: nextToken,
          amount: settings.coursePrice,
          submittedAt: new Date().toISOString(),
          timestamp: serverTimestamp(),
          sessionStartTime: sessionStartTime,
        };

        transaction.set(paymentRef, submission);

        // 5. If auto-approved, update user document immediately
        if (finalStatus === 'approved') {
          const userRef = doc(db, 'users', fbUser.uid);
          transaction.update(userRef, {
            isPaid: true,
            paymentDetails: {
              transactionId: paymentId,
              utrNumber: submission.utrNumber,
              paidAt: submission.submittedAt,
              amount: submission.amount,
              paymentMethod: 'UPI (AI Auto-Verified)'
            }
          });
        }
      });

      setIsSubmitting(false);
      setSubmissionStep("");
      // Status will be updated via onSnapshot listener in useEffect
    } catch (err: any) {
      setIsSubmitting(false);
      console.error("Submission error:", err);
      
      if (err.message.includes("not initialized")) {
        setError(err.message);
      } else {
        setError("Failed to submit payment. Please try again or join the support group.");
      }
    }
  };



  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-7">
      
      {/* 1. Core Information & Affordability Banner */}
      <div className="space-y-4">
        
        {/* Affordability Highlight: ₹20,000–₹45,000 vs ₹10 */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border-2 border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shrink-0">
              ₹{settings.coursePrice}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>Affordability Revolution</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                {t.priceComparisonBadge}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-amber-500/30 text-xs font-bold text-amber-300 shrink-0">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>99.9% Savings</span>
          </div>
        </div>

        {/* 3 Core Highlights (Duration & Tools, No Age Limit, Zero Barriers) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Highlight 1: 6-Month Course & Tools */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                6-Month Course
              </div>
              <div className="text-xs font-semibold text-white mt-0.5 leading-snug">
                {t.toolsTaught}
              </div>
            </div>
          </div>

          {/* Highlight 2: No Age Limit (Kids to Adults) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Open to Everyone
              </div>
              <div className="text-xs font-semibold text-white mt-0.5 leading-snug">
                {t.noAgeLimit}
              </div>
            </div>
          </div>

          {/* Highlight 3: Zero Coding & 5 Languages */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                Zero Barrier
              </div>
              <div className="text-xs font-semibold text-white mt-0.5 leading-snug">
                {t.zeroBarrier}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Welcoming Script Card with Audio Orientation */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-7 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official {settings.courseDuration || '6-Month'} Orientation</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {settings.heroTitle || t.heroTitle1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500">
                {settings.heroHighlight || t.heroTitleHighlight}
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {user.isLoggedIn && (
              <button
                onClick={() => onPaymentSuccess({
                  transactionId: 'MEMBER-' + (user.userTokenNumber || '1001'),
                  utrNumber: '430129841234',
                  paidAt: new Date().toISOString(),
                  amount: settings.coursePrice,
                  paymentMethod: 'Instant Member Access'
                })}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Open 6-Month Course Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Voice Audio Listen Button */}
            <button
              onClick={toggleVoice}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shrink-0 ${
                isPlayingVoice
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
              }`}
            >
              {isPlayingVoice ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>{t.pauseAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.listenAudio}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Welcoming Script Text */}
        <div className="pt-4">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {settings.courseDescription || t.welcomeScriptText}
          </p>
        </div>
      </div>

      {/* 3. Payment Section: Either Pending State OR Pay & Upload State */}
      {pendingSubmission && pendingSubmission.status === 'pending' ? (
        
        /* ------------------ VIEW: PAYMENT PENDING VERIFICATION ------------------ */
        <div className="rounded-3xl bg-slate-900 border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                <Hourglass className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 mb-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>AI Verification Active</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Payment Verification in Progress
                </h2>
              </div>
            </div>
          </div>

          {/* Submission Details Card */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Screenshot preview if uploaded */}
            {pendingSubmission.screenshotBase64 && (
              <div className="flex flex-col items-center justify-center p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <img
                  src={pendingSubmission.screenshotBase64}
                  alt="Submitted receipt"
                  className="w-full max-h-52 object-contain rounded-xl shadow border border-slate-800"
                />
                <span className="text-[11px] text-slate-400 mt-2 font-medium">
                  {pendingSubmission.screenshotFileName || 'Payment Receipt Screenshot'}
                </span>
              </div>
            )}

            {/* Summary details */}
            <div className={`space-y-3 p-5 bg-slate-950 rounded-2xl border border-slate-800 ${pendingSubmission.screenshotBase64 ? 'md:col-span-2' : 'md:col-span-3'}`}>
              <div className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Our AI system is automatically verifying your ₹10 payment. This process usually takes 5-10 seconds. Once confirmed, your course access will be unlocked instantly.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">User Email:</span>
                  <div className="font-bold text-white font-mono mt-0.5">{pendingSubmission.userEmail}</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Amount Paid:</span>
                  <div className="font-bold text-amber-400 mt-0.5">₹{pendingSubmission.amount} INR</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">UPI ID Sent To:</span>
                  <div className="font-bold text-indigo-300 font-mono mt-0.5">{upiId}</div>
                  <div className="text-[11px] text-slate-400 font-medium">({payeeName})</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">UTR / Reference No:</span>
                  <div className="font-bold text-white font-mono mt-0.5">{pendingSubmission.utrNumber}</div>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>AI is matching your UTR and Screenshot with bank records. Please wait.</span>
              </div>

              {/* Action Buttons: Re-upload */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPendingSubmission(null);
                    setSelectedImage(null);
                    setError(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-upload Screenshot</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      ) : (

        /* ------------------ VIEW: SCAN UPI QR & SUBMIT SCREENSHOT ------------------ */
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Section Header & Gmail Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Step 1: Instant AI Payment Verification
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {showPaymentDetails 
                  ? "Scan the official QR code or copy the UPI ID below to pay ₹10. Our AI system will automatically unlock your access upon upload."
                  : "Click '₹10 Pay' below to dynamically reveal the official UPI QR code and payment details with 100% automatic AI verification."}
              </p>
            </div>

            {/* User Sign-In Status */}
            {user.isLoggedIn ? (
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-400">Account:</span>
                <span className="font-semibold text-white truncate max-w-[140px]">{user.email}</span>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs transition-colors shrink-0"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Sign In with Gmail First</span>
              </button>
            )}
          </div>

          {/* UPI QR Code & UPI Details (Hidden by Default until '₹10 Pay' is clicked) */}
          {!showPaymentDetails ? (
            <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="max-w-md mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Full 6 Months Access • Just ₹{settings.coursePrice} Only</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Enroll for Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500">₹{settings.coursePrice.toFixed(2)}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Click the button below to generate the official UPI QR code and payment details with an active 10-minute countdown timer.
                </p>
              </div>

              {/* '₹10 Pay' (Pay ₹10) Button */}
              <div className="flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={handleStartPaymentSession}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-slate-950 font-black text-lg sm:text-xl shadow-xl hover:shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span className="w-8 h-8 rounded-xl bg-slate-950/20 flex items-center justify-center text-sm font-black">
                    ₹{settings.coursePrice}
                  </span>
                  <span>Pay ₹{settings.coursePrice} Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Official Merchant: AMJ FILM PRODUCTION
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400/90 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  10-Minute Live Session
                </span>
                <span>•</span>
                <span>GPay, PhonePe, Paytm, BHIM</span>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {/* Active Session Status & Hide Button */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-slate-300">
                    Live Payment Session Active
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentDetails(false)}
                  className="text-xs text-slate-400 hover:text-white transition-colors underline cursor-pointer"
                >
                  Hide Details
                </button>
              </div>

              {/* Dual QR Code & UPI ID Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800">
                
                {/* QR Code Scanner Display Box */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
                  <div className="relative p-2 bg-white rounded-2xl shadow-xl max-w-[210px] w-full mx-auto">
                    <img
                      src={qrImagePath}
                      alt="AMJ FILM PRODUCTION UPI QR Code"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>

                  <span className="text-[11px] text-slate-400 mt-3 font-medium text-center">
                    Scan with Google Pay, PhonePe, Paytm, or BHIM
                  </span>
                </div>

                {/* Price & UPI ID Details */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Course Fee (Full 6 Months)</span>
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500">
                        ₹{settings.coursePrice.toFixed(2)} <span className="text-xs font-normal text-slate-400">INR</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3 text-amber-400" />
                        10-Min Session
                      </span>
                      {timeLeft > 0 ? (
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-base font-mono font-black text-amber-300">
                            {formatTimer(timeLeft)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-1 mt-0.5">
                          <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Expired (0:00)
                          </span>
                          <button
                            type="button"
                            onClick={handleStartPaymentSession}
                            className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                          >
                            <RotateCcw className="w-2.5 h-2.5" />
                            Restart 10m Timer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payee Name & Official UPI */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Official Merchant:</span>
                      <span className="font-bold text-white tracking-wide">{payeeName}</span>
                    </div>

                    {/* Copyable UPI ID */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs sm:text-sm">
                      <span className="text-slate-400 shrink-0">UPI ID:</span>
                      <span className="font-mono font-bold text-indigo-300 flex-1 truncate">{upiId}</span>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={handleCopyUPI}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-colors text-xs shadow-sm cursor-pointer"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedUpi ? "Copied" : "Copy UPI"}</span>
                        </button>
                        <a
                          href={upiDeepLink}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 font-semibold flex items-center gap-1.5 transition-colors text-xs shadow-sm"
                        >
                          <span>Pay in App</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Easy Payment Options Guide */}
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Two Easy Ways to Pay ₹{settings.coursePrice}:</span>
                    </div>
                    <p className="text-slate-400 pl-5 leading-relaxed">
                      1. Scan the QR code with any UPI app scanner.
                      <br />
                      2. Or copy the UPI ID above to pay directly inside your payment app.
                    </p>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-2 pt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Fully Automatic AI Verification • Instant Course Activation</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Submission Area */}
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
            
            {/* Tabs: Screenshot vs Manual */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 max-w-md mx-auto">
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

            {/* TAB 1: Screenshot Upload Dropzone */}
            {activeTab === 'screenshot' && (
              <div className="space-y-4">
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    selectedImage
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-slate-700 hover:border-indigo-500/60 bg-slate-950/50 hover:bg-slate-950/80'
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
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedImage}
                          alt="Selected receipt"
                          className="w-16 h-16 rounded-xl object-cover border border-emerald-500/50 shadow-md"
                        />
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="truncate max-w-[240px]">{imageFileName || 'payment_receipt.jpg'}</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Ready to submit for Admin verification
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                          setImageFileName('');
                          setError(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                      >
                        Choose Different Screenshot
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 py-3">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-white">
                        {t.uploadBoxTitle}
                      </div>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        {t.uploadBoxSubtitle}
                      </p>
                    </div>
                  )}
                </div>

                {/* Sample Receipts Chips for Easy Testing */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.trySampleReceipts}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleLoadSample('valid_10')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors"
                    >
                      ✓ Valid ₹10 GPay (Pass)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadSample('wrong_amount')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-colors"
                      title="Simulate amount mismatch rejection"
                    >
                      ⚠ Wrong ₹50 (Fails)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadSample('duplicate_utr')}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition-colors"
                      title="Simulate duplicate UTR rejection"
                    >
                      ✗ Duplicate UTR (Fails)
                    </button>
                  </div>
                </div>

                {/* Main Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isSubmitting || !selectedImage}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{submissionStep}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>Submit Screenshot for Admin Verification</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

              </div>
            )}

            {/* TAB 2: Manual UTR Input */}
            {activeTab === 'manual' && (
              <div className="space-y-3 max-w-md mx-auto">
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isSubmitting || !utrNumber}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting UTR...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Submit UTR for Verification</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Rejection / Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <div className="font-bold text-rose-300">Verification Notice</div>
                  <div className="mt-0.5 leading-relaxed">{error}</div>
                </div>
              </div>
            )}

            {/* WhatsApp Support Help Section */}
            <div className="mt-4 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">പെയ്മെന്റ് സഹായം (Payment Support)</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {settings.supportTextMl || "പെയ്മെന്റ് അല്ലെങ്കിൽ സ്ക്രീൻഷോട്ട് അപ്‌ലോഡ് വൈകുകയാണെങ്കിൽ ആദ്യം താഴെയുള്ള WhatsApp ഗ്രൂപ്പിൽ ചേരുക. പെയ്മെന്റ് സഹായം പ്രധാനമായും ഗ്രൂപ്പിലൂടെയാണ് നൽകുന്നത്."}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Primary Button: WhatsApp Group */}
                <a 
                  href={settings.whatsappGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Users className="w-4 h-4 text-indigo-300" />
                  <span>Join Payment Support WhatsApp Group</span>
                </a>

                {/* Secondary Option Note */}
                <div className="pt-2 text-center">
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    ഗ്രൂപ്പിൽ പരിഹാരം ലഭിക്കാത്ത പക്ഷം മാത്രം ഡയറക്ട് കോൺടാക്ട് ഉപയോഗിക്കുക (Emergency Only).
                  </p>
                </div>

                {/* Secondary Button: Direct Contact */}
                <a 
                  href={`https://wa.me/91${settings.emergencyContact}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Direct WhatsApp Contact (+91 {settings.emergencyContact}) [Emergency Only]</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      )}

    </div>
  );
};
