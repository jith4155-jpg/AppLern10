export type Language = 'en' | 'ml' | 'ta' | 'kn' | 'hi';

export type PaymentStatus = 'none' | 'pending' | 'verified' | 'rejected';

export interface PaymentSubmission {
  id: string;
  userId?: string;
  tokenNumber?: number; // Enrollment ID (10001+)
  userTokenNumber?: number; // Registration Token (1001+)
  userEmail: string;
  userName: string;
  amount: number;
  utrNumber: string;
  screenshotBase64?: string;
  screenshotFileName?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  aiScan?: {
    isPaymentScreenshot: boolean;
    amount: number;
    amountMatches10: boolean;
    utrNumber?: string;
    transactionDate?: string;
    isRecent?: boolean;
    isSuccessfulStatus?: boolean;
    appName?: string;
    reason: string;
  };
}

export interface User {
  email: string;
  name: string;
  avatar?: string;
  isLoggedIn: boolean;
  isPaid: boolean;
  userTokenNumber?: number;
  paymentStatus?: PaymentStatus;
  pendingSubmission?: PaymentSubmission;
  paymentDetails?: {
    transactionId: string;
    utrNumber: string;
    paidAt: string;
    amount: number;
    paymentMethod: string;
  };
}

export interface ClassLesson {
  id: string;
  monthNumber: number;
  dayNumber: number;
  titleKey: string;
  duration: string;
  descriptionKey: string;
  topics: string[];
  videoThumbnail: string;
  videoDuration: string;
  codeSnippet?: string;
  practicalTask: string;
  resources: { name: string; type: 'pdf' | 'zip' | 'code' | 'link'; url: string }[];
}

export interface CourseMonth {
  monthNumber: number;
  title: string;
  subtitle: string;
  focus: string;
  lessons: ClassLesson[];
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatar: string;
  storyKey: string;
  builtApp: string;
}
