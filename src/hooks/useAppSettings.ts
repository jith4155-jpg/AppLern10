import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AppSettings {
  upiId: string;
  payeeName: string;
  qrImageUrl?: string;
  whatsappGroupLink: string;
  emergencyContact: string;
  coursePrice: number;
  supportTextMl?: string;
  // UI & Content Management
  heroTitle?: string;
  heroHighlight?: string;
  courseDuration?: string;
  courseDescription?: string;
  communityLink?: string;
  profilePlaceholder?: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  upiId: "vincentlibin487-5@okicici",
  payeeName: "AMJ FILM PRODUCTION",
  whatsappGroupLink: "https://chat.whatsapp.com/BXJL6XC7aM8LjsiOVTFpkk?s=cl&p=a&iam=2",
  emergencyContact: "6238113451",
  coursePrice: 10,
  supportTextMl: "പെയ്മെന്റ് അല്ലെങ്കിൽ സ്ക്രീൻഷോട്ട് അപ്‌ലോഡ് വൈകുകയാണെങ്കിൽ ആദ്യം താഴെയുള്ള WhatsApp ഗ്രൂപ്പിൽ ചേരുക. പെയ്മെന്റ് സഹായം പ്രധാനമായും ഗ്രൂപ്പിലൂടെയാണ് നൽകുന്നത്."
};

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'settings', 'app-config');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as AppSettings);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching app settings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { settings, loading };
}
