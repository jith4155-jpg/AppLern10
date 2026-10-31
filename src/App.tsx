import React, { useState, useEffect } from 'react';
import { Language, User } from './types';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { HomeLanding } from './components/HomeLanding';
import { StudentDashboard } from './components/StudentDashboard';
import { AuthModal } from './components/AuthModal';
import { LoginGate } from './components/LoginGate';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { AdminPortal } from './components/AdminPortal';
import { Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { doc, setDoc, updateDoc, onSnapshot, runTransaction } from 'firebase/firestore';
import { db } from './lib/firebase';

const STORAGE_KEY_LANG = 'applern10_lang';

export default function App() {
  const { user: fbUser, logout, loading: authLoading } = useAuth();
  
  // Multilingual state (defaults to English or saved preference)
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved as Language) || 'en';
  });

  // User Profile from Firestore
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([1]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Sync state to local storage for language
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, currentLang);
  }, [currentLang]);

  // Fetch or initialize user profile in Firestore
  useEffect(() => {
    if (!fbUser) {
      setUserProfile(null);
      setCompletedDays([1]);
      setProfileLoading(false);
      return;
    }

    const isAdmin = fbUser.email === 'libinvincent89@gmail.com';

    // Set immediate default profile so user is NEVER trapped on LoginGate
    setUserProfile(prev => prev || {
      email: fbUser.email || '',
      name: fbUser.displayName || 'Learner',
      avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
      isLoggedIn: true,
      isPaid: isAdmin,
      userTokenNumber: 1001
    });

    setProfileLoading(true);
    const userDocRef = doc(db, 'users', fbUser.uid);

    // Fetch or initialize user profile in Firestore
    const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile({
          email: fbUser.email || data.email || '',
          name: data.name || fbUser.displayName || 'Learner',
          avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
          isLoggedIn: true,
          isPaid: data.isPaid || isAdmin,
          userTokenNumber: data.userTokenNumber || 1001,
          paymentStatus: (data.isPaid || isAdmin) ? 'verified' : undefined,
          paymentDetails: data.paymentDetails
        });
        setCompletedDays(data.completedDays || [1]);
      } else {
        // Initialize new user profile with sequential Token Number
        try {
          const runProfileInit = async () => {
            const result = await runTransaction(db, async (transaction) => {
              const counterRef = doc(db, 'counters', 'user-token-counter');
              const counterSnap = await transaction.get(counterRef);
              
              let nextToken = 1001;
              if (counterSnap.exists()) {
                nextToken = counterSnap.data().currentValue + 1;
                transaction.update(counterRef, { currentValue: nextToken });
              } else {
                // Initialize if not exists (first user)
                transaction.set(counterRef, { currentValue: 1001 });
              }

              const initialProfile = {
                email: fbUser.email || '',
                name: fbUser.displayName || 'Learner',
                isPaid: isAdmin,
                completedDays: [1],
                userTokenNumber: nextToken,
                createdAt: new Date().toISOString()
              };
              
              transaction.set(userDocRef, initialProfile);
              return nextToken;
            });
            return result;
          };

          const assignedToken = await runProfileInit();

          setUserProfile({
            email: fbUser.email || '',
            name: fbUser.displayName || 'Learner',
            avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
            isLoggedIn: true,
            isPaid: isAdmin,
            userTokenNumber: assignedToken
          });
          setCompletedDays([1]);
        } catch (err) {
          console.warn("Failed to initialize user with transaction, using fallback setDoc:", err);
          const fallbackProfile = {
            email: fbUser.email || '',
            name: fbUser.displayName || 'Learner',
            isPaid: isAdmin,
            completedDays: [1],
            userTokenNumber: 1001,
            createdAt: new Date().toISOString()
          };
          await setDoc(userDocRef, fallbackProfile, { merge: true }).catch(() => {});
          setUserProfile({
            email: fbUser.email || '',
            name: fbUser.displayName || 'Learner',
            avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
            isLoggedIn: true,
            isPaid: isAdmin,
            userTokenNumber: 1001
          });
          setCompletedDays([1]);
        }
      }
      setProfileLoading(false);
    }, (error) => {
      console.warn("Error fetching user profile snapshot, using active auth session profile:", error);
      setUserProfile(prev => prev || {
        email: fbUser.email || '',
        name: fbUser.displayName || 'Learner',
        avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
        isLoggedIn: true,
        isPaid: isAdmin,
        userTokenNumber: 1001
      });
      setProfileLoading(false);
    });

    return () => unsubscribe();
  }, [fbUser]);

  const isAdminUser = fbUser && (
    fbUser.email === 'libinvincent89@gmail.com'
  );

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleLogout = async () => {
    await logout();
    setIsAdminOpen(false);
  };

  // When payment is verified successfully (via Admin approval or direct OCR)
  const handlePaymentSuccess = async (paymentDetails: {
    transactionId: string;
    utrNumber: string;
    paidAt: string;
    amount: number;
    paymentMethod: string;
  }) => {
    if (!fbUser) return;
    
    try {
      const userDocRef = doc(db, 'users', fbUser.uid);
      await updateDoc(userDocRef, {
        isPaid: true,
        paymentDetails
      });
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  // Handler when admin approves an item (usually this happens in the admin's view)
  const handleAdminApproved = async (approvedEmail: string) => {
    // In a real app, this would update another user's document
  };

  const handleMarkDone = async (dayNumber: number) => {
    if (!fbUser) return;

    const newDays = completedDays.includes(dayNumber)
      ? completedDays.filter(d => d !== dayNumber)
      : [...completedDays, dayNumber];

    try {
      const userDocRef = doc(db, 'users', fbUser.uid);
      await updateDoc(userDocRef, {
        completedDays: newDays
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Map user profile or default mock
  const activeUser: User = userProfile || {
    email: '',
    name: '',
    isLoggedIn: false,
    isPaid: false
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Clean Top Navigation Bar */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        user={activeUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenAdminPortal={() => setIsAdminOpen(true)}
      />

      {/* Main App Content - Protected by LoginGate */}
      <main className="flex-1 pb-12">
        {!activeUser.isLoggedIn ? (
          /* STEP 0: Authentication Wall */
          <LoginGate 
            currentLang={currentLang} 
            onOpenAuth={() => setIsAuthOpen(true)} 
          />
        ) : !activeUser.isPaid ? (
          /* STEP 1: Payment & Onboarding (Direct access after login) */
          <HomeLanding
            currentLang={currentLang}
            user={activeUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onPaymentSuccess={handlePaymentSuccess}
            onOpenAdminPortal={() => setIsAdminOpen(true)}
          />
        ) : (
          /* STEP 2: Protected Student Dashboard Page */
          <StudentDashboard
            currentLang={currentLang}
            user={activeUser}
            completedDays={completedDays}
            onMarkCompleted={handleMarkDone}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-3">
          <p>© {new Date().getFullYear()} AppLern ₹10 Education • AMJ FILM PRODUCTION</p>
          {isAdminUser && (
            <>
              <span>•</span>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-slate-400 hover:text-amber-400 underline transition-colors"
              >
                Admin Management
              </button>
            </>
          )}
        </div>
      </footer>

      {/* Gmail Login Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentLang={currentLang}
      />

      {/* Payment Success Celebration Dialog */}
      <PaymentSuccessModal
        isOpen={isPaymentSuccessOpen}
        onClose={() => setIsPaymentSuccessOpen(false)}
        currentLang={currentLang}
        user={activeUser}
        onGoToClasses={() => setIsPaymentSuccessOpen(false)}
        onGoToCommunity={() => setIsPaymentSuccessOpen(false)}
      />

      {/* Admin Settings Dashboard */}
      {isAdminOpen && (
        <AdminPortal 
          userEmail={activeUser.email!}
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

      {isAdminUser && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
            title="Open Admin Dashboard (Settings)"
          >
            <SettingsIcon className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      )}

    </div>
  );
}
