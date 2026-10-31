import { Language } from '../types';

export interface TranslationSchema {
  appName: string;
  tagline: string;
  badge: string;
  navCurriculum: string;
  navCommunity: string;
  navWhy10: string;
  navTestimonials: string;
  navFAQ: string;
  loginWithGmail: string;
  loginPrompt: string;
  loggedInAs: string;
  logout: string;
  enrollNow: string;
  alreadyEnrolled: string;
  unlockedClasses: string;
  lockedBadge: string;
  unlockedBadge: string;

  // Key Highlights (Affordability, Tools, Age limit)
  priceComparisonBadge: string;
  noAgeLimit: string;
  toolsTaught: string;
  zeroBarrier: string;

  // Hero & Welcome Script
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  welcomeScriptTitle: string;
  welcomeScriptText: string;
  listenAudio: string;
  pauseAudio: string;
  noCodingNeeded: string;
  allDevices: string;
  moneyBackGuarantee: string;
  studentsEnrolled: string;

  // Why ₹10
  why10Title: string;
  why10Subtitle: string;
  why10Point1Title: string;
  why10Point1Desc: string;
  why10Point2Title: string;
  why10Point2Desc: string;
  why10Point3Title: string;
  why10Point3Desc: string;

  // Curriculum & Months
  curriculumTitle: string;
  curriculumSubtitle: string;
  monthBadge: string;
  dayBadge: string;
  watchLesson: string;
  lockedLessonNotice: string;
  day1Title: string;
  day1Desc: string;
  day2Title: string;
  day2Desc: string;
  day3Title: string;
  day3Desc: string;
  day4Title: string;
  day4Desc: string;
  day5Title: string;
  day5Desc: string;
  day6Title: string;
  day6Desc: string;
  day7Title: string;
  day7Desc: string;

  // Community
  communityTitle: string;
  communitySubtitle: string;
  whatsappTitle: string;
  whatsappDesc: string;
  telegramTitle: string;
  telegramDesc: string;
  joinWhatsApp: string;
  joinTelegram: string;
  communityLockedNotice: string;
  copyLink: string;
  linkCopied: string;

  // Payment
  paymentModalTitle: string;
  paymentSubtitle: string;
  scanWithAnyUPI: string;
  amountLabel: string;
  upiIdLabel: string;
  copiedUPI: string;
  openInApp: string;
  utrInputLabel: string;
  utrPlaceholder: string;
  verifyPaymentBtn: string;
  verifyingBtn: string;
  demoInstantPay: string;
  secureGateway: string;
  paymentInstructions: string[];

  // AI Screenshot Verification
  tabUploadScreenshot: string;
  tabManualUtr: string;
  uploadBoxTitle: string;
  uploadBoxSubtitle: string;
  analyzingScreenshot: string;
  aiVerificationSuccess: string;
  aiVerificationFailed: string;
  trySampleReceipts: string;

  // Success
  paymentSuccessTitle: string;
  paymentSuccessSubtitle: string;
  congratsMessage: string;
  transactionIdLabel: string;
  accessNowBtn: string;
  getCertificateBtn: string;

  // Payment Pending Verification & Admin Approval
  paymentPendingBadge: string;
  paymentPendingTitle: string;
  paymentPendingDesc: string;
  paymentPendingNotice: string;
  checkStatusBtn: string;
  adminPortalBtn: string;
  adminPortalTitle: string;
  adminApprovalNotice: string;
  simulateApprovalBtn: string;

  // Auth Modal
  authModalTitle: string;
  authModalSubtitle: string;
  enterGmail: string;
  quickFillGmail: string;
  continueWithGoogle: string;
  authNote: string;

  // Login Gate Highlights
  loginGateTitle: string;
  loginGateAffordability: string;
  highlightAgeTitle: string;
  highlightAgeDesc: string;
  highlightNoLaptopTitle: string;
  highlightNoLaptopDesc: string;
  highlightDeliveryTitle: string;
  highlightDeliveryDesc: string;
  highlightBuildTitle: string;
  highlightBuildDesc: string;
  highlightSupportTitle: string;
  highlightSupportDesc: string;
  highlightDoubtTitle: string;
  highlightDoubtDesc: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    appName: "AppLern ₹10",
    tagline: "Build Real Mobile Apps & Websites for Just ₹10",
    badge: "Special National Tech Initiative • ₹20,000+ Courses for Just ₹10",
    navCurriculum: "6-Month Curriculum",
    navCommunity: "VIP Groups",
    navWhy10: "Why ₹10?",
    navTestimonials: "Success Stories",
    navFAQ: "FAQ",
    loginWithGmail: "Log in with Gmail",
    loginPrompt: "Please log in with your Gmail ID to proceed",
    loggedInAs: "Logged in as",
    logout: "Log out",
    enrollNow: "Enroll for ₹10 Now",
    alreadyEnrolled: "You are Enrolled!",
    unlockedClasses: "Access 6-Month Classes",
    lockedBadge: "Locked (Enroll for ₹10)",
    unlockedBadge: "Unlocked & Ready",

    priceComparisonBadge: "Market Fee: ₹20,000 - ₹45,000 • With AppLern: Just ₹10 Only",
    noAgeLimit: "No Age Limit • From School Kids to Working Adults",
    toolsTaught: "Learn No-Code Tools + Android Studio & Web",
    zeroBarrier: "Zero Coding Experience & No Language Barriers",

    heroTitle1: "Learn to Build Apps & Websites for Just",
    heroTitleHighlight: "₹10 Only",
    heroSubtitle: "A 6-month comprehensive course teaching how to build mobile apps and websites using easy no-code tools and professional Android Studio. While regular courses charge ₹20,000 to ₹45,000, AppLern ₹10 gives you full access for just ₹10. No age limits and no prior coding experience needed.",
    welcomeScriptTitle: "Welcoming Script & Orientation (6-Month Course)",
    welcomeScriptText: "Namaste & Welcome to AppLern ₹10! While typical coaching institutes and private bootcamps charge ₹20,000 to ₹45,000, our mission is to make tech education truly democratic across India for just ₹10 only. This 6-month comprehensive course teaches you how to build real mobile apps and websites using intuitive no-code tools and professional Android Studio. There are absolutely no age limits—whether you are a young school student, college learner, homemaker, or working adult—and no prior coding experience or language barriers. Anyone can learn comfortably in their preferred language. Start your transformation today for just ₹10!",
    listenAudio: "Listen to Voice Welcome",
    pauseAudio: "Pause Voice",
    noCodingNeeded: "100% Beginner Friendly",
    allDevices: "Works on Mobile & Laptop",
    moneyBackGuarantee: "Instant Access • 6-Month Lifetime Value",
    studentsEnrolled: "48,290+ Students Enrolled",

    why10Title: "Why Just ₹10 for 6 Months?",
    why10Subtitle: "High-quality software education shouldn't cost ₹20,000 to ₹45,000. Here is how we make 6 months of training accessible to every single person.",
    why10Point1Title: "A Cup of Tea vs Your Career",
    why10Point1Desc: "We kept the fee at ₹10 so money is never a barrier for 6 full months of education. It filters serious learners committed to showing up every day.",
    why10Point2Title: "No-Code & Android Studio",
    why10Point2Desc: "You learn practical creation using intuitive drag-and-drop no-code tools and real industry Android Studio.",
    why10Point3Title: "Lifetime Community Network",
    why10Point3Desc: "Gain access to exclusive WhatsApp & Telegram developer peer groups with mentors ready to solve your doubts 24/7 throughout your 6-month journey.",

    curriculumTitle: "6-Month Step-by-Step Curriculum",
    curriculumSubtitle: "From zero basics to launching your first working app and website, organized into 6 progressive months of practice.",
    monthBadge: "Month",
    dayBadge: "Day",
    watchLesson: "Open Class & Materials",
    lockedLessonNotice: "This class is currently locked. Pay ₹10 via UPI to unlock all 6 months of classes, project files, and mentorship.",
    day1Title: "Month 1: Web Architecture & HTML5",
    day1Desc: "Demystifying tech without code. Understand client-server architectures, screens, and setting up your free mobile/laptop code playground.",
    day2Title: "Month 1, Part 2: Crafting Your First Web Page",
    day2Desc: "Build your first digital identity page. Add headings, custom images, clickable buttons, and responsive layouts.",
    day3Title: "Month 2: Modern Styling & CSS3 UI",
    day3Desc: "Learn modern visual aesthetics, color palettes, dark mode, card designs, and smooth animated micro-interactions with CSS.",
    day4Title: "Month 3: JavaScript Logic & Interactivity",
    day4Desc: "Make buttons perform actions, handle user clicks, calculate budgets, and build working interactive applications.",
    day5Title: "Month 4: Mobile Apps with No-Code & PWA",
    day5Desc: "Convert your project into an installable smartphone app with home screen icons and offline capabilities using no-code builders.",
    day6Title: "Month 5: Android Studio & AI Coding Tools",
    day6Desc: "Set up Android Studio, build native layouts, and use Gemini AI prompt engineering to generate code components in seconds.",
    day7Title: "Month 6: Launching Your Project & Earning Your Certificate",
    day7Desc: "Deploy your app live on the internet, share your live link on social media, and receive your verified 6-Month AppLern Certificate.",

    communityTitle: "Exclusive VIP Community Groups",
    communitySubtitle: "Never learn alone. Join our vibrant student circles for daily challenges, doubt-clearing, and networking.",
    whatsappTitle: "Official VIP WhatsApp Community",
    whatsappDesc: "Get instant daily class reminders, source code snippets, peer discussions, and direct mentor announcements.",
    telegramTitle: "Telegram Mastermind Channel",
    telegramDesc: "Access full resource drives, downloadable cheat sheets, software tools, APK templates, and weekend live Q&A replays.",
    joinWhatsApp: "Join WhatsApp Community",
    joinTelegram: "Join Telegram Channel",
    communityLockedNotice: "VIP community invite links are locked. Verify your ₹10 payment with your Gmail to reveal direct join links.",
    copyLink: "Copy Link",
    linkCopied: "Link copied to clipboard!",

    paymentModalTitle: "Secure UPI Payment Gateway",
    paymentSubtitle: "Pay ₹10 to unlock lifetime access to the entire 6-month course, daily classes, community groups, and certificate.",
    scanWithAnyUPI: "Scan QR Code using Google Pay, PhonePe, Paytm, or BHIM",
    amountLabel: "Enrollment Fee (Full 6 Months)",
    upiIdLabel: "Official UPI ID",
    copiedUPI: "UPI ID Copied!",
    openInApp: "Open in UPI App",
    utrInputLabel: "Enter 12-Digit UPI Reference / UTR Number",
    utrPlaceholder: "e.g., 430129841234",
    verifyPaymentBtn: "Submit UTR & Verify Access",
    verifyingBtn: "Verifying with Banking Network...",
    demoInstantPay: "⚡ Instant Verify (Demo Mode)",
    secureGateway: "100% Encrypted UPI Gateway • Verified Merchant: AppLern Education",
    paymentInstructions: [
      "1. Open any UPI App (GPay, PhonePe, Paytm, BHIM).",
      "2. Scan the QR code or transfer ₹10 to the UPI ID.",
      "3. Copy the 12-digit UTR/UPI Ref number from your receipt.",
      "4. Enter it below and click Verify to immediately unlock access!"
    ],

    tabUploadScreenshot: "AI Screenshot OCR (Instant)",
    tabManualUtr: "Enter UTR Manually",
    uploadBoxTitle: "Upload UPI Payment Screenshot",
    uploadBoxSubtitle: "Take a screenshot of your successful ₹10 payment on GPay, PhonePe, Paytm or BHIM and drop it here",
    analyzingScreenshot: "AI is scanning amount (₹10), date & UTR number...",
    aiVerificationSuccess: "Payment verified successfully by AI! Unlocking 6-month course...",
    aiVerificationFailed: "Verification failed",
    trySampleReceipts: "Or try a test payment receipt:",

    paymentSuccessTitle: "Payment Successful! 🎉",
    paymentSuccessSubtitle: "Welcome to AppLern ₹10! Your 6-month enrollment has been verified.",
    congratsMessage: "Your 6-month daily class curriculum and VIP community links are now permanently unlocked on your account.",
    transactionIdLabel: "Transaction Reference",
    accessNowBtn: "Open 6-Month Dashboard",
    getCertificateBtn: "View Certificate Portal",

    // Payment Pending Verification & Admin Approval
    paymentPendingBadge: "Verification Pending",
    paymentPendingTitle: "Payment Pending Verification",
    paymentPendingDesc: "Your ₹10 payment has been submitted and is currently undergoing verification. Once approved by the admin, your 6-month course modules, WhatsApp community, and Telegram channel links will unlock automatically.",
    paymentPendingNotice: "Awaiting Admin Approval • Auto-refreshes every few seconds",
    checkStatusBtn: "Check Status Now",
    adminPortalBtn: "Admin Portal",
    adminPortalTitle: "Admin Payment Verification",
    adminApprovalNotice: "Admin reviewing payment receipt...",
    simulateApprovalBtn: "Instant Admin Approval (Test)",

    authModalTitle: "Log In with Gmail",
    authModalSubtitle: "Sign in with your Google account to tie your ₹10 6-month enrollment and class progress to your email.",
    enterGmail: "Enter your Gmail address",
    quickFillGmail: "One-Click Demo Gmail",
    continueWithGoogle: "Continue with Google Account",
    authNote: "Your email is strictly used for course access, receipts, and issuing your verified 6-month certificate.",
    loginGateTitle: "Start Your Coding Journey for ₹10 Only",
    loginGateAffordability: "(Affordability Revolution: Learn Apps & Web Development for just ₹10 instead of expensive courses costing ₹20,000–₹45,000)",
    highlightAgeTitle: "No Age Limit",
    highlightAgeDesc: "Open to everyone, from young children to adults. Anyone who knows how to use a mobile phone can learn easily without wasting time.",
    highlightNoLaptopTitle: "No Laptop Needed",
    highlightNoLaptopDesc: "Learn comfortably using your smartphone with intuitive no-code tools and professional Android Studio.",
    highlightDeliveryTitle: "Recorded Classes & Flexible Delivery",
    highlightDeliveryDesc: "Classes are provided as recorded video lessons via WhatsApp and Telegram, allowing you to learn at your own pace anytime.",
    highlightBuildTitle: "Build Anything You Want",
    highlightBuildDesc: "Learn to build custom mobile applications and websites of your own choice completely from scratch.",
    highlightSupportTitle: "Extended Support",
    highlightSupportDesc: "Take as much time as you need (even 1 year or more) to finish learning and successfully build your app.",
    highlightDoubtTitle: "Doubt Clearance",
    highlightDoubtDesc: "Ask questions anytime and get complete, dedicated mentor support."
  },

  ml: {
    appName: "AppLern ₹10",
    tagline: "വെറും ₹10 ന് മൊബൈൽ ആപ്പുകളും വെബ്‌സൈറ്റുകളും നിർമ്മിക്കാൻ പഠിക്കൂ",
    badge: "പ്രത്യേക ദേശീയ സംരംഭം • ₹20,000+ കോഴ്സ് വെറും ₹10 ന്",
    navCurriculum: "6 മാസത്തെ സിലബസ്",
    navCommunity: "വിഐപി ഗ്രൂപ്പുകൾ",
    navWhy10: "എന്തുകൊണ്ട് ₹10?",
    navTestimonials: "വിജയഗാഥകൾ",
    navFAQ: "സംശയങ്ങൾ",
    loginWithGmail: "Gmail വഴി ലോഗിൻ ചെയ്യുക",
    loginPrompt: "തുടരാൻ നിങ്ങളുടെ Gmail ഐഡി ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക",
    loggedInAs: "ലോഗിൻ ചെയ്തിരിക്കുന്നു:",
    logout: "ലോഗ് ഔട്ട്",
    enrollNow: "₹10 ന് ഇപ്പോൾ ചേരൂ",
    alreadyEnrolled: "നിങ്ങൾ എൻറോൾ ചെയ്തിട്ടുണ്ട്!",
    unlockedClasses: "എന്റെ 6 മാസത്തെ ക്ലാസുകൾ",
    lockedBadge: "ലോക്ക് ചെയ്തു (₹10 ന് അൺലോക്ക് ചെയ്യുക)",
    unlockedBadge: "തുറന്നിരിക്കുന്നു",

    priceComparisonBadge: "മറ്റ് കോഴ്സുകൾ: ₹20,000 - ₹45,000 • AppLern-ൽ വെറും ₹10 മാത്രം!",
    noAgeLimit: "പ്രായപരിധിയില്ല • കൊച്ചുകുട്ടികൾ മുതൽ മുതിർന്നവർ വരെ",
    toolsTaught: "നോ-കോഡ് ടൂളുകളും Android Studio-യും ഉപയോഗിച്ച് ആപ്പുകളും വെബ്സൈറ്റുകളും നിർമ്മിക്കാം",
    zeroBarrier: "മുൻകാല കോഡിംഗ് അറിവോ ഭാഷാ തടസ്സങ്ങളോ ആവശ്യമില്ല",

    heroTitle1: "ആപ്പുകളും വെബ്‌സൈറ്റുകളും ഉണ്ടാക്കാൻ പഠിക്കൂ വെറും",
    heroTitleHighlight: "₹10 ന് മാത്രം",
    heroSubtitle: "മറ്റ് ഇൻസ്റ്റിറ്റ്യൂട്ടുകൾ ₹20,000 മുതൽ ₹45,000 വരെ ഈടാക്കുമ്പോൾ, വെറും ₹10 ന് നോ-കോഡ് ടൂളുകളും Android Studio-യും ഉപയോഗിച്ച് മൊബൈൽ ആപ്പുകളും വെബ്‌സൈറ്റുകളും നിർമ്മിക്കാൻ പഠിപ്പിക്കുന്ന 6 മാസത്തെ സമഗ്ര കോഴ്സ് (6 Months Course). പ്രായപരിധിയില്ല, തുടക്കക്കാർക്കും അനുയോജ്യം.",
    welcomeScriptTitle: "സ്വാഗത സന്ദേശവും വിവരങ്ങളും (6 മാസത്തെ കോഴ്സ്)",
    welcomeScriptText: "AppLern ₹10 ലേക്ക് സ്വാഗതം! സ്വകാര്യ ഇൻസ്റ്റിറ്റ്യൂട്ടുകളിൽ ₹20,000 മുതൽ ₹45,000 വരെ ഈടാക്കുന്ന സോഫ്റ്റ്‌വെയർ കോഴ്സുകൾ വെറും ₹10 ന് സാധാരണക്കാരിലേക്ക് എത്തിക്കുകയാണ് ഞങ്ങളുടെ ലക്ഷ്യം. ഈ 6 മാസത്തെ സമഗ്ര കോഴ്സിലൂടെ നോ-കോഡ് (No-Code) ടൂളുകളും Android Studio-യും ഉപയോഗിച്ച് മൊബൈൽ ആപ്പുകളും വെബ്സൈറ്റുകളും വളരെ എളുപ്പത്തിൽ നിർമ്മിക്കാൻ നിങ്ങൾ പഠിക്കും. ഇതിന് യാതൊരു പ്രായപരിധിയുമില്ല—സ്കൂൾ കുട്ടികൾ മുതൽ മുതിർന്നവർക്കും വീട്ടമ്മമാർക്കും വരെ സ്വന്തം മാതൃഭാഷയിൽ ലളിതമായി പഠിക്കാം. മുൻകാല കോഡിംഗ് അറിവോ ഇംഗ്ലീഷ് പ്രാവീണ്യമോ ആവശ്യമില്ല. വെറും ₹10 അടച്ച് ഇന്ന് തന്നെ ആരംഭിക്കൂ!",
    listenAudio: "ശബ്ദ സന്ദേശം കേൾക്കുക",
    pauseAudio: "ശബ്ദം നിർത്തുക",
    noCodingNeeded: "100% തുടക്കക്കാർക്ക് അനുയോജ്യം",
    allDevices: "ഫോണിലും ലാപ്ടോപ്പിലും ഉപയോഗിക്കാം",
    moneyBackGuarantee: "ഉടൻ പ്രവേശനം • 6 മാസത്തെ ലൈഫ് ടൈം വാല്യൂ",
    studentsEnrolled: "48,290+ വിദ്യാർത്ഥികൾ ചേർന്നു",

    why10Title: "എന്തുകൊണ്ടാണ് 6 മാസത്തേക്ക് വെറും ₹10?",
    why10Subtitle: "ഉന്നത നിലവാരമുള്ള സോഫ്റ്റ്‌വെയർ വിദ്യാഭ്യാസം ലക്ഷങ്ങൾ ചെലവഴിക്കേണ്ടതില്ല. എല്ലാവരിലും എത്തിക്കാനാണ് ഈ നിരക്ക്.",
    why10Point1Title: "ഒരു ചായയുടെ വിലയിൽ കരിയർ",
    why10Point1Desc: "സാമ്പത്തിക ബുദ്ധിമുട്ട് ആർക്കും തടസ്സമാകരുത് എന്നതിനാലാണ് 6 മാസത്തേക്ക് ₹10 ആക്കിയത്. താല്പര്യമുള്ളവരെ കണ്ടെത്താനും ഇത് സഹായിക്കുന്നു.",
    why10Point2Title: "നോ-കോഡ് & Android Studio",
    why10Point2Desc: "മടുപ്പിക്കുന്ന പുസ്തക തിയറികളില്ല. നോ-കോഡ് ടൂളുകളും Android Studio-യും ഉപയോഗിച്ച് നേരിട്ട് ആപ്പുകൾ നിർമ്മിച്ചു പഠിക്കുന്നു.",
    why10Point3Title: "സജീവ കമ്മ്യൂണിറ്റി സഹായം",
    why10Point3Desc: "വാട്ട്‌സ്ആപ്പ്, ടെലിഗ്രാം ഗ്രൂപ്പുകളിലൂടെ സംശയങ്ങൾ തീർക്കാനും സഹപാഠികളുമായി ചർച്ച ചെയ്യാനും 6 മാസവും അവസരം.",

    curriculumTitle: "6 മാസത്തെ സമഗ്ര സിലബസ് (6 Months Course)",
    curriculumSubtitle: "പൂജ്യത്തിൽ നിന്ന് ആരംഭിച്ച് 6 മാസങ്ങളിലായി നിങ്ങളുടെ സ്വന്തം ആപ്പുകളും വെബ്‌സൈറ്റുകളും വികസിപ്പിക്കുക.",
    monthBadge: "മാസം",
    dayBadge: "ദിവസം",
    watchLesson: "ക്ലാസ് കാണുക",
    lockedLessonNotice: "ഈ ക്ലാസ് ഇപ്പോൾ ലോക്ക് ചെയ്തിരിക്കുന്നു. 6 മാസത്തെ ക്ലാസുകളും പ്രോജക്ട് ഫയലുകളും ലഭിക്കാൻ ₹10 UPI വഴി അടയ്ക്കുക.",
    day1Title: "മാസം 1: ആപ്പുകളുടെയും വെബിന്റെയും അടിസ്ഥാനം",
    day1Desc: "കോഡിംഗ് ഇല്ലാതെ ആപ്പുകളുടെ അടിസ്ഥാന തത്വം മനസ്സിലാക്കുക. സെർവറുകൾ, സ്ക്രീനുകൾ, API-കൾ എന്നിവ.",
    day2Title: "മാസം 1, ഭാഗം 2: നിങ്ങളുടെ ആദ്യ വെബ് പേജ്",
    day2Desc: "HTML5 ഉപയോഗിച്ച് ആദ്യ വെബ് പേജ്. ചിത്രങ്ങൾ, ബട്ടണുകൾ, തലക്കെട്ടുകൾ എന്നിവ ചേർക്കുക.",
    day3Title: "മാസം 2: മനോഹരമായ ആപ്പ് ഡിസൈനിംഗ് (CSS)",
    day3Desc: "മോഡേൺ കളർ തീമുകൾ, ഡാർക്ക് മോഡ്, കാർഡ് ഡിസൈനുകൾ, ബട്ടൺ ആനിമേഷനുകൾ എന്നിവ പഠിക്കുക.",
    day4Title: "മാസം 3: ബട്ടണുകൾക്കും ആക്ഷനുകൾക്കും ജീവൻ നൽകുക (JS)",
    day4Desc: "ക്ലിക്ക് ചെയ്യുമ്പോൾ പ്രവർത്തിക്കുന്ന ലോജിക് നിർമ്മിക്കുക. ഒരു ടിപ്പ് കാൽക്കുലേറ്റർ ആപ്പ് വികസിപ്പിക്കുക.",
    day5Title: "മാസം 4: നോ-കോഡ് ഉപയോഗിച്ച് മൊബൈൽ ആപ്പ്",
    day5Desc: "നിങ്ങളുടെ പ്രോജക്റ്റിനെ ആൻഡ്രോയിഡ് ഫോണുകളിൽ ഇൻസ്റ്റാൾ ചെയ്യാവുന്ന ആപ്പ് (PWA/APK) ആക്കി മാറ്റുക.",
    day6Title: "മാസം 5: Android Studio & AI കോഡിംഗ്",
    day6Desc: "Android Studio അടിസ്ഥാനങ്ങളും Gemini AI സഹായത്തോടെ വലിയ കോഡുകൾ നിമിഷങ്ങൾക്കുള്ളിൽ എഴുതിപ്പഠിക്കലും.",
    day7Title: "മാസം 6: ആപ്പ് ഇന്റർനെറ്റിൽ ലോഞ്ച് ചെയ്യലും സർട്ടിഫിക്കറ്റും",
    day7Desc: "നിങ്ങളുടെ ആപ്പ് ലൈവ് ആക്കുക, സുഹൃത്തുക്കളുമായി പങ്കിടുക, ഒപ്പം ഔദ്യോഗിക 6 മാസത്തെ സർട്ടിഫിക്കറ്റ് സ്വന്തമാക്കുക.",

    communityTitle: "വിഐപി കമ്മ്യൂണിറ്റി ഗ്രൂപ്പുകൾ",
    communitySubtitle: "ഒറ്റയ്ക്ക് പഠിക്കേണ്ടതില്ല. ആയിരക്കണക്കിന് വിദ്യാർത്ഥികളോടൊപ്പം ചർച്ച ചെയ്യാം.",
    whatsappTitle: "ഔദ്യോഗിക WhatsApp കമ്മ്യൂണിറ്റി",
    whatsappDesc: "ദിവസേനയുള്ള ഓർമ്മപ്പെടുത്തലുകൾ, പ്രോജക്റ്റ് കോഡുകൾ, ചോദ്യോത്തരങ്ങൾ എന്നിവ WhatsApp-ൽ.",
    telegramTitle: "ടെലിഗ്രാം റിസോഴ്സ് ചാനൽ",
    telegramDesc: "സൗജന്യ പുസ്തകങ്ങൾ, സോഫ്റ്റ്‌വെയർ ടൂളുകൾ, വീഡിയോ റീപ്ലേകൾ എന്നിവ ടെലിഗ്രാമിൽ ലഭ്യമാണ്.",
    joinWhatsApp: "WhatsApp ഗ്രൂപ്പിൽ ചേരുക",
    joinTelegram: "Telegram ചാനലിൽ ചേരുക",
    communityLockedNotice: "വിഐപി ഗ്രൂപ്പ് ലിങ്കുകൾ ലോക്ക് ചെയ്തിരിക്കുന്നു. ₹10 ഫീസ് നൽകിയ ശേഷം ലിങ്കുകൾ ലഭിക്കും.",
    copyLink: "ലിങ്ക് കോപ്പി ചെയ്യുക",
    linkCopied: "ലിങ്ക് കോപ്പി ചെയ്തു!",

    paymentModalTitle: "സുരക്ഷിത UPI പേയ്‌മെന്റ്",
    paymentSubtitle: "മുഴുവൻ 6 മാസത്തെ ക്ലാസുകളും ഗ്രൂപ്പുകളും ലഭിക്കാൻ ₹10 അടയ്ക്കുക.",
    scanWithAnyUPI: "GPay, PhonePe, Paytm, അല്ലെങ്കിൽ BHIM വഴി QR കോഡ് സ്കാൻ ചെയ്യുക",
    amountLabel: "എൻറോൾമെന്റ് ഫീസ് (6 മാസത്തെ പ്രവേശനം)",
    upiIdLabel: "ഔദ്യോഗിക UPI ഐഡി",
    copiedUPI: "UPI ഐഡി കോപ്പി ചെയ്തു!",
    openInApp: "UPI ആപ്പിൽ തുറക്കുക",
    utrInputLabel: "12 അക്ക UPI റഫറൻസ് / UTR നമ്പർ രേഖപ്പെടുത്തുക",
    utrPlaceholder: "ഉദാ: 430129841234",
    verifyPaymentBtn: "UTR സമർപ്പിച്ച് അൺലോക്ക് ചെയ്യുക",
    verifyingBtn: "പരിശോധിച്ചുകൊണ്ടിരിക്കുന്നു...",
    demoInstantPay: "⚡ ഉടൻ പരിശോധിക്കുക (ഡെമോ മോഡ്)",
    secureGateway: "100% സുരക്ഷിത UPI ഗേറ്റ്‌വേ • അംഗീകൃത വ്യാപാരി: AppLern",
    paymentInstructions: [
      "1. ഏതെങ്കിലും UPI ആപ്പ് തുറക്കുക (GPay, PhonePe, Paytm, BHIM).",
      "2. QR കോഡ് സ്കാൻ ചെയ്യുക അല്ലെങ്കിൽ UPI ഐഡിയിലേക്ക് ₹10 അയക്കുക.",
      "3. ലഭിച്ച രസീതിലെ 12 അക്ക UTR നമ്പർ കോപ്പി ചെയ്യുക.",
      "4. താഴെ നമ്പർ രേഖപ്പെടുത്തി Verify ബട്ടൺ ക്ലിക്ക് ചെയ്യുക!"
    ],

    tabUploadScreenshot: "AI സ്ക്രീൻഷോട്ട് പരിശോധന (ഉടൻ)",
    tabManualUtr: "UTR നേരിട്ട് നൽകുക",
    uploadBoxTitle: "UPI പേയ്‌മെന്റ് സ്ക്രീൻഷോട്ട് അപ്‌ലോഡ് ചെയ്യുക",
    uploadBoxSubtitle: "GPay, PhonePe, Paytm എന്നിവയിൽ ₹10 അയച്ച സ്ക്രീൻഷോട്ട് ഇവിടെ നൽകുക",
    analyzingScreenshot: "AI തുക (₹10), തീയതി, UTR നമ്പർ എന്നിവ പരിശോധിക്കുന്നു...",
    aiVerificationSuccess: "AI പേയ്‌മെന്റ് വിജയകരമായി പരിശോധിച്ചു! 6 മാസത്തെ കോഴ്സ് അൺലോക്ക് ചെയ്യുന്നു...",
    aiVerificationFailed: "പരിശോധന പരാജയപ്പെട്ടു",
    trySampleReceipts: "അല്ലെങ്കിൽ ഒരു ടെസ്റ്റ് രസീത് പരീക്ഷിക്കുക:",

    paymentSuccessTitle: "പേയ്‌മെന്റ് വിജയകരം! 🎉",
    paymentSuccessSubtitle: "AppLern ₹10 ലേക്ക് സ്വാഗതം! നിങ്ങളുടെ 6 മാസത്തെ പ്രവേശനം സ്ഥിരീകരിച്ചു.",
    congratsMessage: "നിങ്ങളുടെ 6 മാസത്തെ ക്ലാസുകളും വിഐപി കമ്മ്യൂണിറ്റി ലിങ്കുകളും അൺലോക്ക് ചെയ്തിരിക്കുന്നു.",
    transactionIdLabel: "ട്രാൻസാക്ഷൻ നമ്പർ",
    accessNowBtn: "6 മാസത്തെ ഡാഷ്‌ബോർഡ് കാണുക",
    getCertificateBtn: "സർട്ടിഫിക്കറ്റ് പോർട്ടൽ",

    // Payment Pending Verification & Admin Approval
    paymentPendingBadge: "പരിശോധനയിലാണ്",
    paymentPendingTitle: "പേയ്‌മെന്റ് പരിശോധനയിലാണ്",
    paymentPendingDesc: "നിങ്ങളുടെ ₹10 പേയ്‌മെന്റ് വിവരങ്ങൾ സമർപ്പിച്ചു. അഡ്മിൻ പരിശോധന പൂർത്തിയാക്കിയ ഉടൻ നിങ്ങളുടെ 6 മാസത്തെ ക്ലാസുകളും വാട്സാപ്പ്/ടെലിഗ്രാം കമ്മ്യൂണിറ്റി ലിങ്കുകളും തനിയെ അൺലോക്ക് ചെയ്യപ്പെടും.",
    paymentPendingNotice: "അഡ്മിൻ അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു • വിവരങ്ങൾ സ്വയം പുതുക്കപ്പെടുന്നു",
    checkStatusBtn: "സ്റ്റാറ്റസ് പരിശോധിക്കുക",
    adminPortalBtn: "അഡ്മിൻ പോർട്ടൽ",
    adminPortalTitle: "അഡ്മിൻ പേയ്‌മെന്റ് അംഗീകാരം",
    adminApprovalNotice: "അഡ്മിൻ രസീത് പരിശോധിക്കുകയാണ്...",
    simulateApprovalBtn: "തൽക്ഷണ അംഗീകാരം പരീക്ഷിക്കുക",

    authModalTitle: "Gmail വഴി ലോഗിൻ ചെയ്യുക",
    authModalSubtitle: "6 മാസത്തെ കോഴ്സ് പുരോഗതിയും സർട്ടിഫിക്കറ്റും നിങ്ങളുടെ ഈമെയിലുമായി ബന്ധിപ്പിക്കാൻ ലോഗിൻ ചെയ്യുക.",
    enterGmail: "നിങ്ങളുടെ Gmail വിലാസം നൽകുക",
    quickFillGmail: "ഡെമോ Gmail തിരഞ്ഞെടുക്കുക",
    continueWithGoogle: "Google അക്കൗണ്ട് വഴി തുടരുക",
    authNote: "നിങ്ങളുടെ ഈമെയിൽ സുരക്ഷിതമായിരിക്കും. സർട്ടിഫിക്കറ്റ് നൽകാൻ മാത്രമാണ് ഇത് ഉപയോഗിക്കുന്നത്.",
    loginGateTitle: "കോഡിംഗ് പഠനം വെറും ₹10-ന് ആരംഭിക്കൂ",
    loginGateAffordability: "(സാമ്പത്തിക വിപ്ലവം: ₹20,000–₹45,000 ചിലവ് വരുന്ന കോഴ്സുകൾ വെറും ₹10-ന് പഠിക്കാം)",
    highlightAgeTitle: "പ്രായപരിധിയില്ല",
    highlightAgeDesc: "കൊച്ചു കുട്ടികൾ മുതൽ മുതിർന്നവർ വരെ എല്ലാവർക്കും സ്വാഗതം. മൊബൈൽ ഫോൺ ഉപയോഗിക്കാൻ അറിയാവുന്ന ആർക്കും സമയം പാഴാക്കാതെ എളുപ്പത്തിൽ പഠിക്കാം.",
    highlightNoLaptopTitle: "ലാപ്ടോപ്പ് ആവശ്യമില്ല",
    highlightNoLaptopDesc: "നിങ്ങളുടെ സ്മാർട്ട്‌ഫോൺ ഉപയോഗിച്ച് നോ-കോഡ് ടൂളുകളും പ്രൊഫഷണൽ ആൻഡ്രോയിഡ് സ്റ്റുഡിയോയും പഠിക്കാം.",
    highlightDeliveryTitle: "റെക്കോർഡ് ചെയ്ത ക്ലാസുകൾ & ഫ്ലെക്സിബിൾ ഡെലിവറി",
    highlightDeliveryDesc: "ക്ലാസുകൾ വാട്ട്‌സ്ആപ്പ്, ടെലിഗ്രാം വഴിയാണ് നൽകുന്നത്, അതിനാൽ നിങ്ങൾക്ക് സൗകര്യപ്രദമായ സമയത്ത് പഠിക്കാം.",
    highlightBuildTitle: "എന്ത് വേണമെങ്കിലും നിർമ്മിക്കാം",
    highlightBuildDesc: "നിങ്ങൾക്ക് ഇഷ്ടമുള്ള രീതിയിലുള്ള മൊബൈൽ ആപ്പുകളും വെബ്‌സൈറ്റുകളും പൂജ്യത്തിൽ നിന്ന് നിർമ്മിക്കാൻ പഠിക്കാം.",
    highlightSupportTitle: "ദീർഘിപ്പിച്ച സഹായം",
    highlightSupportDesc: "കോഴ്സ് പൂർത്തിയാക്കാനും ആപ്പ് നിർമ്മിക്കാനും നിങ്ങൾക്ക് എത്ര സമയം വേണമെങ്കിലും (1 വർഷമോ അതിൽ കൂടുതലോ) എടുക്കാം.",
    highlightDoubtTitle: "സംശയനിവാരണം",
    highlightDoubtDesc: "എപ്പോൾ വേണമെങ്കിലും ചോദ്യങ്ങൾ ചോദിക്കാം, മെന്ററുടെ പൂർണ്ണ പിന്തുണ ലഭിക്കും."
  },

  ta: {
    appName: "AppLern ₹10",
    tagline: "வெறும் ₹10-க்கு மொபைல் ஆப்ஸ் மற்றும் இணையதளங்களை உருவாக்க கற்றுக்கொள்ளுங்கள்",
    badge: "சிறப்பு தேசிய திட்டம் • ₹20,000+ மதிப்புள்ள பயிற்சி வெறும் ₹10-க்கு",
    navCurriculum: "6 மாத பாடத்திட்டம்",
    navCommunity: "விஐபி குழுக்கள்",
    navWhy10: "ஏன் ₹10 மட்டும்?",
    navTestimonials: "வெற்றி கதைகள்",
    navFAQ: "கேள்விகள்",
    loginWithGmail: "Gmail மூலம் உள்நுழைக",
    loginPrompt: "தொடர உங்கள் Gmail ஐடியைப் பயன்படுத்தி உள்நுழையவும்",
    loggedInAs: "உள்நுழைந்துள்ளவர்:",
    logout: "வெளியேறு",
    enrollNow: "இப்போது ₹10-க்கு சேரவும்",
    alreadyEnrolled: "நீங்கள் இணைந்துள்ளீர்கள்!",
    unlockedClasses: "என் 6 மாத வகுப்புகள்",
    lockedBadge: "பூட்டப்பட்டுள்ளது (₹10-க்கு திறக்கவும்)",
    unlockedBadge: "திறக்கப்பட்டது",

    priceComparisonBadge: "பிற நிறுவன கட்டணம்: ₹20,000 - ₹45,000 • AppLern-ல் வெறும் ₹10 மட்டுமே!",
    noAgeLimit: "வயது வரம்பு இல்லை • பள்ளி குழந்தைகள் முதல் பெரியவர்கள் வரை",
    toolsTaught: "நோ-கோட் (No-Code) மற்றும் Android Studio மூலம் ஆப்ஸ் & வலைத்தளங்கள்",
    zeroBarrier: "முந்தைய கோடிங் அறிவோ மொழி தடையோ தேவையில்லை",

    heroTitle1: "ஆப்ஸ் மற்றும் இணையதளங்களை உருவாக்க கற்றுக்கொள்ளுங்கள் வெறும்",
    heroTitleHighlight: "₹10-க்கு மட்டும்",
    heroSubtitle: "தனியார் நிறுவனங்கள் ₹20,000 முதல் ₹45,000 வரை கட்டணம் வசூலிக்கும் நிலையில், வெறும் ₹10-க்கு நோ-கோட் கருவிகள் மற்றும் Android Studio மூலம் மொபைல் ஆப்ஸ் மற்றும் வலைத்தளங்களை உருவாக்க கற்றுத்தரும் 6 மாத விரிவான பயிற்சி. வயது வரம்பு இல்லை, ஆரம்பநிலையாளர்களுக்கும் ஏற்றது.",
    welcomeScriptTitle: "வரவேற்பு செய்தி & வழிகாட்டுதல் (6 மாத பயிற்சி)",
    welcomeScriptText: "AppLern ₹10-க்கு உங்களை அன்புடன் வரவேற்கிறோம்! தனியார் பயிற்சி மையங்கள் ₹20,000 முதல் ₹45,000 வரை வசூலிக்கும் தொழில்நுட்பக் கல்வியை, வெறும் ₹10 மட்டுமே கட்டணத்தில் அனைவருக்கும் வழங்குவதே எங்கள் நோக்கம். இந்த 6 மாத விரிவான பயிற்சியில் நோ-கோட் (No-Code) கருவிகள் மற்றும் Android Studio கொண்டு முழுமையான மொபைல் ஆப்ஸ் மற்றும் இணையதளங்களை உருவாக்க கற்றுக்கொள்வீர்கள். இதற்கு எந்த வயது வரம்பும் இல்லை—பள்ளி மாணவர்கள் முதல் பெரியவர்கள் வரை அனைவரும் தங்கள் தாய்மொழியிலேயே எளிதாகக் கற்கலாம். முந்தைய கோடிங் அனுபவமோ ஆங்கிலப் புலமையோ தேவையில்லை. இன்றே ₹10 செலுத்தி உங்கள் பயணத்தைத் தொடங்குங்கள்!",
    listenAudio: "குரல் செய்தியைக் கேட்கவும்",
    pauseAudio: "குரலை நிறுத்தவும்",
    noCodingNeeded: "100% தொடக்கநிலையாளர்களுக்கு ஏற்றது",
    allDevices: "மொபைல் & லேப்டாப்பில் செயல்படும்",
    moneyBackGuarantee: "உடனடி அனுமதி • 6 மாத மதிப்பு",
    studentsEnrolled: "48,290+ மாணவர்கள் இணைந்துள்ளனர்",

    why10Title: "6 மாதங்களுக்கு ஏன் வெறும் ₹10?",
    why10Subtitle: "உயர்தர மென்பொருள் கல்வி ₹20,000 முதல் ₹45,000 வரை செலவாக வேண்டியதில்லை. அனைவருக்கும் கிடைக்கச் செய்வதே எங்கள் இலக்கு.",
    why10Point1Title: "ஒரு டீ விலையில் பிரகாசமான எதிர்காலம்",
    why10Point1Desc: "பணம் எவருக்கும் தடையாக இருக்கக்கூடாது என்பதற்காகவே 6 மாதங்களுக்கும் ₹10 கட்டணம் மட்டுமே.",
    why10Point2Title: "நோ-கோட் & Android Studio",
    why10Point2Desc: "சலிப்பான புத்தகக் கோட்பாடுகள் இல்லை. நோ-கோட் கருவிகள் மற்றும் Android Studio மூலம் நீங்களே தொட்டுப் பார்க்கும் ஆப்ஸ்களை உருவாக்குகிறீர்கள்.",
    why10Point3Title: "வாழ்நாள் விஐபி சமூகம்",
    why10Point3Desc: "வாட்ஸ்அப் மற்றும் டெலிகிராம் குழுக்கள் மூலம் 6 மாத காலமும் ஆசிரியர்களின் ஆலோசனைகளைப் பெறலாம்.",

    curriculumTitle: "6 மாத படிமுறைப் பாடத்திட்டம் (6 Months Course)",
    curriculumSubtitle: "அடிப்படையில் இருந்து 6 மாதங்களில் உங்கள் சொந்த ஆப்-ஐ வெளியிடுவது வரை.",
    monthBadge: "மாதம்",
    dayBadge: "நாள்",
    watchLesson: "வகுப்பைப் பார்க்கவும்",
    lockedLessonNotice: "இந்த வகுப்பு பூட்டப்பட்டுள்ளது. 6 மாத வகுப்புகள் மற்றும் திட்டக் கோப்புகளைப் பெற ₹10 UPI மூலம் செலுத்தவும்.",
    day1Title: "மாதம் 1: ஆப்ஸ் & இணையதள அடிப்படைகள்",
    day1Desc: "கோடிங் இல்லாமல் மென்பொருளின் அடிப்படைகளைப் புரிந்து கொள்ளுங்கள். சர்வர்கள், ஏபிஐகள் மற்றும் செயலிகள்.",
    day2Title: "மாதம் 1, பகுதி 2: முதல் வலைப்பக்கம்",
    day2Desc: "உங்கள் சொந்த வலைப்பக்கம். படங்கள், தலைப்புகள் மற்றும் பொத்தான்களைச் சேர்க்கவும்.",
    day3Title: "மாதம் 2: நவீன வடிவமைப்பு & ஸ்டைலிங் (CSS)",
    day3Desc: "சிலிக்கான் வேலி தரத்தில் வண்ணங்கள், டார்க் மோட், அனிமேஷன்கள் மற்றும் கார்டு வடிவமைப்பு.",
    day4Title: "மாதம் 3: ஜாவாஸ்கிரிப்ட் மூலம் உயிரூட்டுதல்",
    day4Desc: "கிளிக் செய்யும்போது செயல்படும் லாஜிக் உருவாக்குதல். ஒரு பயன்பாட்டு கால்குலேட்டரை உருவாக்குங்கள்.",
    day5Title: "மாதம் 4: நோ-கோட் மூலம் மொபைல் ஆப்",
    day5Desc: "உங்கள் திட்டத்தை ஆண்ட்ராய்டு மொபைலில் இன்ஸ்டால் செய்யும் ஆப்-ஆக (PWA/APK) மாற்றுங்கள்.",
    day6Title: "மாதம் 5: Android Studio & AI கருவிகள்",
    day6Desc: "Android Studio மற்றும் Gemini AI உதவியுடன் நொடிகளில் கோடிங் பாகங்களை உருவாக்குங்கள்.",
    day7Title: "மாதம் 6: பயன்பாட்டை வெளியிடுதல் & சான்றிதழ் பெறுதல்",
    day7Desc: "உங்கள் ஆப்-ஐ இணையத்தில் நேரலையில் ஏற்றி, 6 மாத சான்றிதழைப் பெற்று நண்பர்களுடன் பகிருங்கள்.",

    communityTitle: "பிரத்யேக விஐபி சமூகக் குழுக்கள்",
    communitySubtitle: "தனியாகப் பயிலாதீர்கள். பல்லாயிரக்கணக்கான மாணவர்களுடன் இணைந்து சந்தேகங்களைத் தீருங்கள்.",
    whatsappTitle: "அதிகாரப்பூர்வ வாட்ஸ்அப் சமூகம்",
    whatsappDesc: "தினசரி நினைவூட்டல்கள், மூல குறியீடுகள் மற்றும் சந்தேக நிவர்த்தி.",
    telegramTitle: "டெலிகிராம் ரிசோர்ஸ் தளம்",
    telegramDesc: "இலவச புத்தகங்கள், வீடியோக்கள் மற்றும் ஆப் டெம்ப்ளேட்கள்.",
    joinWhatsApp: "WhatsApp-ல் இணையுங்கள்",
    joinTelegram: "Telegram-ல் இணையுங்கள்",
    communityLockedNotice: "விஐபி குழு இணைப்புகள் பூட்டப்பட்டுள்ளன. ₹10 கட்டணத்தை உறுதி செய்து இணைப்புகளைப் பெறுங்கள்.",
    copyLink: "இணைப்பை நகலெடு",
    linkCopied: "இணைப்பு நகலெடுக்கப்பட்டது!",

    paymentModalTitle: "பாதுகாப்பான UPI கட்டணம்",
    paymentSubtitle: "முழு 6 மாத வகுப்புகளையும் குழுக்களையும் திறக்க ₹10 செலுத்தவும்.",
    scanWithAnyUPI: "GPay, PhonePe, Paytm அல்லது BHIM மூலம் QR குறியீட்டை ஸ்கேன் செய்யவும்",
    amountLabel: "சேர்க்கை கட்டணம் (6 மாத அனுமதி)",
    upiIdLabel: "அதிகாரப்பூர்வ UPI ஐடி",
    copiedUPI: "UPI ID நகலெடுக்கப்பட்டது!",
    openInApp: "UPI செயலியில் திறக்கவும்",
    utrInputLabel: "12 இலக்க UPI குறிப்பு / UTR எண்ணை உள்ளிடவும்",
    utrPlaceholder: "எ.கா: 430129841234",
    verifyPaymentBtn: "UTR சமர்ப்பித்து சரிபார்க்கவும்",
    verifyingBtn: "சரிபார்க்கப்படுகிறது...",
    demoInstantPay: "⚡ உடனடி சரிபார்ப்பு (டெமோ முறை)",
    secureGateway: "100% பாதுகாப்பான UPI கட்டணம் • வணிகர்: AppLern",
    paymentInstructions: [
      "1. உங்கள் UPI செயலியைத் திறக்கவும் (GPay, PhonePe, Paytm, BHIM).",
      "2. QR குறியீட்டை ஸ்கேன் செய்து அல்லது UPI ஐடிக்கு ₹10 அனுப்பவும்.",
      "3. ரசீதில் உள்ள 12 இலக்க UTR எண்ணை நகலெடுக்கவும்.",
      "4. கீழே எண்ணை உள்ளிட்டு சரிபார் பொத்தானை அழுத்தவும்!"
    ],

    tabUploadScreenshot: "AI ஸ்கிரீன்ஷாட் சரிபார்ப்பு (உடனடி)",
    tabManualUtr: "UTR எண்ணை உள்ளிடவும்",
    uploadBoxTitle: "UPI கட்டண ஸ்கிரீன்ஷாட்டை பதிவேற்றவும்",
    uploadBoxSubtitle: "GPay, PhonePe, Paytm-ல் ₹10 செலுத்திய ஸ்கிரீன்ஷாட்டை இங்கே பதிவேற்றவும்",
    analyzingScreenshot: "AI தொகை (₹10), தேதி மற்றும் UTR எண்ணை ஸ்கேன் செய்கிறது...",
    aiVerificationSuccess: "கட்டணம் AI மூலம் வெற்றிகரமாக சரிபார்க்கப்பட்டது! 6 மாத பயிற்சி திறக்கப்படுகிறது...",
    aiVerificationFailed: "சரிபார்ப்பு தோல்வியடைந்தது",
    trySampleReceipts: "மாதிரி ரசீதை முயற்சிக்கவும்:",

    paymentSuccessTitle: "கட்டணம் வெற்றிகரமாக முடிந்தது! 🎉",
    paymentSuccessSubtitle: "AppLern ₹10-க்கு நல்வரவு! உங்கள் 6 மாத சேர்க்கை உறுதி செய்யப்பட்டது.",
    congratsMessage: "உங்கள் 6 மாத வகுப்புகள் மற்றும் விஐபி குழு இணைப்புகள் நிரந்தரமாகத் திறக்கப்பட்டுள்ளன.",
    transactionIdLabel: "பரிவர்த்தனை எண்",
    accessNowBtn: "6 மாத டேஷ்போர்டைப் பார்க்கவும்",
    getCertificateBtn: "சான்றிதழ் தளம்",

    // Payment Pending Verification & Admin Approval
    paymentPendingBadge: "சரிபார்ப்பு நிலுவையில் உள்ளது",
    paymentPendingTitle: "கட்டணம் சரிபார்ப்பில் உள்ளது",
    paymentPendingDesc: "உங்கள் ₹10 கட்டண விவரங்கள் சமர்ப்பிக்கப்பட்டது. நிர்வாகி (Admin) சரிபார்த்தவுடன், உங்கள் 6 மாத வகுப்புகள் மற்றும் WhatsApp/Telegram குழு இணைப்புகள் தானாகவே திறக்கப்படும்.",
    paymentPendingNotice: "நிர்வாகி ஒப்புதலுக்காக காத்திருக்கிறது • தானாகவே புதுப்பிக்கப்படும்",
    checkStatusBtn: "நிலையைச் சரிபார்க்கவும்",
    adminPortalBtn: "நிர்வாக போர்டல்",
    adminPortalTitle: "நிர்வாக கட்டண ஒப்புதல்",
    adminApprovalNotice: "ரசீதை நிர்வாகி சரிபார்க்கிறார்...",
    simulateApprovalBtn: "உடனடி ஒப்புதல் (டெமோ)",

    authModalTitle: "Gmail மூலம் உள்நுழைக",
    authModalSubtitle: "உங்கள் 6 மாத கற்றல் முன்னேற்றத்தையும் சான்றிதழையும் பதிவு செய்ய Google கணக்கில் உள்நுழையவும்.",
    enterGmail: "உங்கள் Gmail முகவரியை உள்ளிடவும்",
    quickFillGmail: "மாதிரி Gmail ஐ தேர்வு செய்யவும்",
    continueWithGoogle: "Google கணக்குடன் தொடரவும்",
    authNote: "உங்கள் மின்னஞ்சல் முற்றிலும் பாதுகாப்பானது. சான்றிதழ் வழங்க மட்டுமே பயன்படுத்தப்படும்.",
    loginGateTitle: "Start Your Coding Journey for ₹10 Only",
    loginGateAffordability: "(Affordability Revolution: Learn Apps & Web Development for just ₹10 instead of expensive courses costing ₹20,000–₹45,000)",
    highlightAgeTitle: "No Age Limit",
    highlightAgeDesc: "Open to everyone, from young children to adults. Anyone who knows how to use a mobile phone can learn easily without wasting time.",
    highlightNoLaptopTitle: "No Laptop Needed",
    highlightNoLaptopDesc: "Learn comfortably using your smartphone with intuitive no-code tools and professional Android Studio.",
    highlightDeliveryTitle: "Recorded Classes & Flexible Delivery",
    highlightDeliveryDesc: "Classes are provided as recorded video lessons via WhatsApp and Telegram, allowing you to learn at your own pace anytime.",
    highlightBuildTitle: "Build Anything You Want",
    highlightBuildDesc: "Learn to build custom mobile applications and websites of your own choice completely from scratch.",
    highlightSupportTitle: "Extended Support",
    highlightSupportDesc: "Take as much time as you need (even 1 year or more) to finish learning and successfully build your app.",
    highlightDoubtTitle: "Doubt Clearance",
    highlightDoubtDesc: "Ask questions anytime and get complete, dedicated mentor support."
  },

  kn: {
    appName: "AppLern ₹10",
    tagline: "ಕೇವಲ ₹10 ಕ್ಕೆ ಮೊಬೈಲ್ ಆಪ್‌ಗಳು ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ರಚಿಸಲು ಕಲಿಯಿರಿ",
    badge: "ವಿಶೇಷ ರಾಷ್ಟ್ರೀಯ ಉಪಕ್ರಮ • ₹20,000+ ಮೌಲ್ಯದ ಕೋರ್ಸ್ ಕೇವಲ ₹10 ಕ್ಕೆ",
    navCurriculum: "6 ತಿಂಗಳ ಪಠ್ಯಕ್ರಮ",
    navCommunity: "ವಿಐಪಿ ಗುಂಪುಗಳು",
    navWhy10: "ಏಕೆ ₹10 ಮಾತ್ರ?",
    navTestimonials: "ಯಶೋಗಾಥೆಗಳು",
    navFAQ: "ಪ್ರಶ್ನೋತ್ತರ",
    loginWithGmail: "Gmail ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ",
    loginPrompt: "ಮುಂದುವರಿಯಲು ನಿಮ್ಮ Gmail ID ಯೊಂದಿಗೆ ಲಾಗಿನ್ ಆಗಿ",
    loggedInAs: "ಲಾಗಿನ್ ಆಗಿರುವವರು:",
    logout: "ಲಾಗ್ ಔಟ್",
    enrollNow: "ಈಗಲೇ ₹10 ಕ್ಕೆ ಸೇರಿ",
    alreadyEnrolled: "ನೀವು ನೋಂದಾಯಿಸಿಕೊಂಡಿದ್ದೀರಿ!",
    unlockedClasses: "ನನ್ನ 6 ತಿಂಗಳ ತರಗತಿಗಳು",
    lockedBadge: "ಲಾಕ್ ಆಗಿದೆ (₹10 ಪಾವತಿಸಿ ತೆರೆಯಿರಿ)",
    unlockedBadge: "ತೆರೆಯಲಾಗಿದೆ",

    priceComparisonBadge: "ಇತರ ಕೋರ್ಸ್ ಶುಲ್ಕ: ₹20,000 - ₹45,000 • AppLern ನಲ್ಲಿ ಕೇವಲ ₹10 ಮಾತ್ರ!",
    noAgeLimit: "ಯಾವುದೇ ವಯಸ್ಸಿನ ಮಿತಿಯಿಲ್ಲ • ಶಾಲಾ ಮಕ್ಕಳಿಂದ ಹಿಡಿದು ಹಿರಿಯರವರೆಗೆ",
    toolsTaught: "ನೋ-ಕೋಡ್ (No-Code) ಮತ್ತು Android Studio ಬಳಸಿ ಆಪ್ಸ್ ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳ ನಿರ್ಮಾಣ",
    zeroBarrier: "ಯಾವುದೇ ಕೋಡಿಂಗ್ ಜ್ಞಾನ ಅಥವಾ ಭಾಷೆಯ ಅಡೆತಡೆಯಿಲ್ಲ",

    heroTitle1: "ಆಪ್‌ಗಳು ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಲು ಕಲಿಯಿರಿ ಕೇವಲ",
    heroTitleHighlight: "₹10 ಮಾತ್ರಕ್ಕೆ",
    heroSubtitle: "ಖಾಸಗಿ ಸಂಸ್ಥೆಗಳು ₹20,000 ದಿಂದ ₹45,000 ಶುಲ್ಕ ಪಡೆಯುವಾಗ, ಕೇವಲ ₹10 ಕ್ಕೆ ನೋ-ಕೋಡ್ ಟೂಲ್ಸ್ ಮತ್ತು Android Studio ಮೂಲಕ ಮೊಬೈಲ್ ಆಪ್‌ಗಳು ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ಕಲಿಸುವ 6 ತಿಂಗಳ ಸಂಪೂರ್ಣ ಕೋರ್ಸ್ (6 Months Course). ವಯಸ್ಸಿನ ಮಿತಿಯಿಲ್ಲ, ಆರಂಭಿಕರಿಗೂ ಸುಲಭ.",
    welcomeScriptTitle: "ಸ್ವಾಗತ ಸಂದೇಶ ಮತ್ತು ವಿವರಗಳು (6 ತಿಂಗಳ ಕೋರ್ಸ್)",
    welcomeScriptText: "AppLern ₹10 ಗೆ ಆತ್ಮೀಯ ಸ್ವಾಗತ! ಸಾಮಾನ್ಯ ತರಬೇತಿ ಸಂಸ್ಥೆಗಳು ₹20,000 ದಿಂದ ₹45,000 ವರೆಗೆ ಶುಲ್ಕ ವಿಧಿಸುವ ತಂತ್ರಜ್ಞಾನ ಶಿಕ್ಷಣವನ್ನು ಕೇವಲ ₹10 ಕ್ಕೆ ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯನಿಗೂ ತಲುಪಿಸುವುದೇ ನಮ್ಮ ಗುರಿ. ಈ 6 ತಿಂಗಳ ಸಮಗ್ರ ಕೋರ್ಸ್‌ನಲ್ಲಿ ಸುಲಭವಾದ ನೋ-ಕೋಡ್ (No-Code) ಪರಿಕರಗಳು ಮತ್ತು Android Studio ಬಳಸಿ ಮೊಬೈಲ್ ಆಪ್‌ಗಳು ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಲು ಕಲಿಯುವಿರಿ. ಇದಕ್ಕೆ ಯಾವುದೇ ವಯಸ್ಸಿನ ಮಿತಿಯಿಲ್ಲ—ಶಾಲಾ ಮಕ್ಕಳಿಂದ ಹಿಡಿದು ಗೃಹಿಣಿಯರು ಮತ್ತು ಉದ್ಯೋಗಸ್ಥರವರೆಗೆ ಎಲ್ಲರೂ ತಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲೇ ಕಲಿಯಬಹುದು. ಯಾವುದೇ ಹಿಂದಿನ ಕೋಡಿಂಗ್ ಅನುಭವದ ಅಗತ್ಯವಿಲ್ಲ. ಕೇವಲ ₹10 ಪಾವತಿಸಿ ಇಂದೇ ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ!",
    listenAudio: "ಧ್ವನಿ ಸಂದೇಶ ಆಲಿಸಿ",
    pauseAudio: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    noCodingNeeded: "100% ಆರಂಭಿಕರಿಗೆ ಸುಲಭ",
    allDevices: "ಮೊಬೈಲ್ ಮತ್ತು ಲ್ಯಾಪ್‌ಟಾಪ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    moneyBackGuarantee: "ತಕ್ಷಣ ಪ್ರವೇಶ • 6 ತಿಂಗಳ ಮೌಲ್ಯ",
    studentsEnrolled: "48,290+ ವಿದ್ಯಾರ್ಥಿಗಳು ನೋಂದಾಯಿಸಿಕೊಂಡಿದ್ದಾರೆ",

    why10Title: "6 ತಿಂಗಳಿಗೆ ಕೇವಲ ₹10 ಏಕೆ?",
    why10Subtitle: "ಗುಣಮಟ್ಟದ ಸಾಫ್ಟ್‌ವೇರ್ ಶಿಕ್ಷಣಕ್ಕೆ ₹20,000 ದಿಂದ ₹45,000 ಖರ್ಚು ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ. ಎಲ್ಲರಿಗೂ ತಲುಪಿಸಲು ಇದು ನಮ್ಮ ಪ್ರಯತ್ನ.",
    why10Point1Title: "ಒಂದು ಕಪ್ ಚಹಾ vs ನಿಮ್ಮ ಭವಿಷ್ಯ",
    why10Point1Desc: "ಹಣವು ಯಾರಿಗೂ ಅಡ್ಡಿಯಾಗಬಾರದು ಎಂದು ನಾವು 6 ತಿಂಗಳಿಗೂ ₹10 ಶುಲ್ಕ ಇರಿಸಿದ್ದೇವೆ. ಇದು ಗಂಭೀರ ಕಲಿಯುವವರನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತದೆ.",
    why10Point2Title: "ನೋ-ಕೋಡ್ & Android Studio",
    why10Point2Desc: "ಯಾವುದೇ ಬೋರ್ ಪುಸ್ತಕ ಸಿದ್ಧಾಂತವಿಲ್ಲ. ನೋ-ಕೋಡ್ ಪರಿಕರಗಳು ಮತ್ತು Android Studio ಮೂಲಕ ನೈಜ ಆಪ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೀರಿ.",
    why10Point3Title: "ಲೈಫ್‌ಟೈಮ್ ವಿಐಪಿ ಕಮ್ಯುನಿಟಿ",
    why10Point3Desc: "ವಾಟ್ಸಾಪ್ ಮತ್ತು ಟೆಲಿಗ್ರಾಮ್ ಗುಂಪುಗಳ ಮೂಲಕ ಶಿಕ್ಷಕರೊಂದಿಗೆ 6 ತಿಂಗಳ ಕಾಲವೂ ಸಂಶಯಗಳನ್ನು ಪರಿಹರಿಸಿಕೊಳ್ಳಿ.",

    curriculumTitle: "6 ತಿಂಗಳ ಸಂಪೂರ್ಣ ಪಠ್ಯಕ್ರಮ (6 Months Course)",
    curriculumSubtitle: "ಶೂನ್ಯದಿಂದ 6 ತಿಂಗಳುಗಳಲ್ಲಿ ನಿಮ್ಮ ಮೊದಲ ಆಪ್ ಬಿಡುಗಡೆ ಮಾಡುವವರೆಗೆ.",
    monthBadge: "ತಿಂಗಳು",
    dayBadge: "ದಿನ",
    watchLesson: "ತರಗತಿಯನ್ನು ವೀಕ್ಷಿಸಿ",
    lockedLessonNotice: "ಈ ತರಗತಿಯು ಪ್ರಸ್ತುತ ಲಾಕ್ ಆಗಿದೆ. ಎಲ್ಲಾ 6 ತಿಂಗಳ ತರಗತಿಗಳನ್ನು ಪಡೆಯಲು ₹10 UPI ಮೂಲಕ ಪಾವತಿಸಿ.",
    day1Title: "ತಿಂಗಳು 1: ಆಪ್‌ಗಳು ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳ ಮೂಲಗಳು",
    day1Desc: "ಕೋಡಿಂಗ್ ಇಲ್ಲದೆ ತಂತ್ರಜ್ಞಾನದ ರಹಸ್ಯಗಳನ್ನು ಅರಿಯಿರಿ. ಸರ್ವರ್‌ಗಳು, ಸ್ಕ್ರೀನ್‌ಗಳು ಮತ್ತು API ಗಳು.",
    day2Title: "ತಿಂಗಳು 1, ಭಾಗ 2: ಮೊದಲ ವೆಬ್ ಪುಟ",
    day2Desc: "ಚಿತ್ರಗಳು, ಬಟನ್‌ಗಳು ಮತ್ತು ಹೆಡ್ಡಿಂಗ್‌ಗಳೊಂದಿಗೆ ನಿಮ್ಮದೇ ಆದ ಮೊದಲ ವೆಬ್ ಪುಟವನ್ನು ರಚಿಸಿ.",
    day3Title: "ತಿಂಗಳು 2: ಆಧುನಿಕ ವಿನ್ಯಾಸ ಮತ್ತು ಶೈಲಿ (CSS)",
    day3Desc: "ಆಕರ್ಷಕ ಬಣ್ಣಗಳು, ಡಾರ್ಕ್ ಮೋಡ್ ಮತ್ತು ಸುಂದರವಾದ ಕಾರ್ಡ್ ವಿನ್ಯಾಸಗಳನ್ನು ಕಲಿಯಿರಿ.",
    day4Title: "ತಿಂಗಳು 3: ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಲಾಜಿಕ್ ಮತ್ತು ಬಟನ್ ಆಕ್ಷನ್ (JS)",
    day4Desc: "ಕ್ಲಿಕ್ ಮಾಡಿದಾಗ ಕೆಲಸ ಮಾಡುವ ಲಾಜಿಕ್ ರಚಿಸಿ. ಒಂದು ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಆಪ್ ನಿರ್ಮಿಸಿ.",
    day5Title: "ತಿಂಗಳು 4: ನೋ-ಕೋಡ್ ಮೂಲಕ ಮೊಬೈಲ್ ಆಪ್",
    day5Desc: "ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ಅನ್ನು ಮೊಬೈಲ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬಹುದಾದ ಆಪ್ (PWA/APK) ಆಗಿ ಬದಲಾಯಿಸಿ.",
    day6Title: "ತಿಂಗಳು 5: Android Studio & AI ಕೋಡಿಂಗ್",
    day6Desc: "Android Studio ಮತ್ತು Gemini AI ಸಹಾಯದಿಂದ ನಿಮಿಷಗಳಲ್ಲಿ ಸಂಕೀರ್ಣ ಕೋಡ್ ರಚಿಸಲು ಕಲಿಯಿರಿ.",
    day7Title: "ತಿಂಗಳು 6: ನಿಮ್ಮ ಆಪ್ ಲಾಂಚ್ ಮಾಡಿ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ",
    day7Desc: "ನಿಮ್ಮ ಆಪ್ ಅನ್ನು ಇಂಟರ್ನೆಟ್‌ನಲ್ಲಿ ಲೈವ್ ಮಾಡಿ ಮತ್ತು ಅಧಿಕೃತ 6 ತಿಂಗಳ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.",

    communityTitle: "ವಿಶೇಷ ವಿಐಪಿ ಸಮುದಾಯ ಗುಂಪುಗಳು",
    communitySubtitle: "ಏಕಾಂಗಿಯಾಗಿ ಕಲಿಯಬೇಡಿ. ಸಾವಿರಾರು ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಚರ್ಚಿಸಿ ಕಲಿಯಿರಿ.",
    whatsappTitle: "ಅಧಿಕೃತ WhatsApp ಸಮುದಾಯ",
    whatsappDesc: "ದೈನಂದಿನ ನೆನಪಿಸುವಿಕೆಗಳು, ಪ್ರಾಜೆಕ್ಟ್ ಕೋಡ್‌ಗಳು ಮತ್ತು ಚರ್ಚೆಗಳು.",
    telegramTitle: "ಟೆಲಿಗ್ರಾಮ್ ರಿಸೋರ್ಸ್ ಚಾನೆಲ್",
    telegramDesc: "ಉಚಿತ ಇ-ಪುಸ್ತಕಗಳು, ಟೂಲ್‌ಗಳು ಮತ್ತು ವೀಡಿಯೊ ಮರುಪ್ರಸಾರಗಳು.",
    joinWhatsApp: "WhatsApp ಗುಂಪಿಗೆ ಸೇರಿ",
    joinTelegram: "Telegram ಚಾನಲ್‌ಗೆ ಸೇರಿ",
    communityLockedNotice: "ವಿಐಪಿ ಗುಂಪು ಲಿಂಕ್‌ಗಳನ್ನು ಲಾಕ್ ಮಾಡಲಾಗಿದೆ. ಲಿಂಕ್‌ಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ₹10 ಪಾವತಿಯನ್ನು ದೃಢೀಕರಿಸಿ.",
    copyLink: "ಲಿಂಕ್ ನಕಲಿಸಿ",
    linkCopied: "ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!",

    paymentModalTitle: "ಸುರಕ್ಷಿತ UPI ಪಾವತಿ",
    paymentSubtitle: "ಸಂಪೂರ್ಣ 6 ತಿಂಗಳ ತರಗತಿಗಳು ಮತ್ತು ಗುಂಪುಗಳನ್ನು ತೆರೆಯಲು ₹10 ಪಾವತಿಸಿ.",
    scanWithAnyUPI: "GPay, PhonePe, Paytm ಅಥವಾ BHIM ಬಳಸಿ QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    amountLabel: "ನೋಂದಣಿ ಶುಲ್ಕ (6 ತಿಂಗಳ ಪ್ರವೇಶ)",
    upiIdLabel: "ಅಧಿಕೃತ UPI ID",
    copiedUPI: "UPI ID ನಕಲಿಸಲಾಗಿದೆ!",
    openInApp: "UPI ಆಪ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ",
    utrInputLabel: "12 ಅಂಕಿಯ UPI ರೆಫರೆನ್ಸ್ / UTR ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
    utrPlaceholder: "ಉದಾ: 430129841234",
    verifyPaymentBtn: "UTR ಸಲ್ಲಿಸಿ ಮತ್ತು ಪ್ರವೇಶ ಪಡೆಯಿರಿ",
    verifyingBtn: "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    demoInstantPay: "⚡ ತಕ್ಷಣ ಪರಿಶೀಲಿಸಿ (ಡೆಮೊ ಮೋಡ್)",
    secureGateway: "100% ಸುರಕ್ಷಿತ UPI ಗೇಟ್‌ವೇ • ಅಧಿಕೃತ: AppLern",
    paymentInstructions: [
      "1. ಯಾವುದೇ UPI ಆಪ್ ತೆರೆಯಿರಿ (GPay, PhonePe, Paytm, BHIM).",
      "2. QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ UPI ID ಗೆ ₹10 ಕಳುಹಿಸಿ.",
      "3. ರಶೀದಿಯಲ್ಲಿರುವ 12 ಅಂಕಿಯ UTR ಸಂಖ್ಯೆಯನ್ನು ನಕಲಿಸಿ.",
      "4. ಕೆಳಗೆ ನಮೂದಿಸಿ Verify ಬಟನ್ ಒತ್ತಿರಿ!"
    ],

    tabUploadScreenshot: "AI ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಪರಿಶೀಲನೆ (ತಕ್ಷಣ)",
    tabManualUtr: "UTR ಹಸ್ತಚಾಲಿತವಾಗಿ ನಮೂದಿಸಿ",
    uploadBoxTitle: "UPI ಪಾವತಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadBoxSubtitle: "GPay, PhonePe, Paytm ನಲ್ಲಿ ₹10 ಪಾವತಿಸಿದ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಇಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    analyzingScreenshot: "AI ಮೊತ್ತ (₹10), ದಿನಾಂಕ ಮತ್ತು UTR ಸಂಖ್ಯೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದೆ...",
    aiVerificationSuccess: "ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿದೆ! 6 ತಿಂಗಳ ಕೋರ್ಸ್ ಅನ್‌ಲಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    aiVerificationFailed: "ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ",
    trySampleReceipts: "ಪರೀಕ್ಷಾರ್ಥ ರಶೀದಿಯನ್ನು ಪ್ರಯತ್ನಿಸಿ:",

    paymentSuccessTitle: "ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ! 🎉",
    paymentSuccessSubtitle: "AppLern ₹10 ಗೆ ಸ್ವಾಗತ! ನಿಮ್ಮ 6 ತಿಂಗಳ ಪ್ರವೇಶ ದೃಢಪಟ್ಟಿದೆ.",
    congratsMessage: "ನಿಮ್ಮ 6 ತಿಂಗಳ ತರಗತಿಗಳು ಮತ್ತು ವಿಐಪಿ ಸಮುದಾಯ ಲಿಂಕ್‌ಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅನ್‌ಲಾಕ್ ಮಾಡಲಾಗಿದೆ.",
    transactionIdLabel: "ವಹಿವಾಟು ಸಂಖ್ಯೆ",
    accessNowBtn: "6 ತಿಂಗಳ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ",
    getCertificateBtn: "ಪ್ರಮಾಣಪತ್ರ ಪೋರ್ಟಲ್",

    // Payment Pending Verification & Admin Approval
    paymentPendingBadge: "ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ",
    paymentPendingTitle: "ಪಾವತಿ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ",
    paymentPendingDesc: "ನಿಮ್ಮ ₹10 ಪಾವತಿಯ ವಿವರಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ಅಡ್ಮಿನ್ ಪರಿಶೀಲಿಸಿದ ತಕ್ಷಣ, ನಿಮ್ಮ 6 ತಿಂಗಳ ತರಗತಿಗಳು ಮತ್ತು ವಾಟ್ಸಾಪ್/ಟೆಲಿಗ್ರಾಮ್ ಕಮ್ಯುನಿಟಿ ಲಿಂಕ್‌ಗಳು ತಂತಾನೇ ತೆರೆಯಲ್ಪಡುತ್ತವೆ.",
    paymentPendingNotice: "ಅಡ್ಮಿನ್ ಅನುಮೋದನೆಗೆ ಕಾಯಲಾಗುತ್ತಿದೆ • ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನವೀಕರಣಗೊಳ್ಳುತ್ತದೆ",
    checkStatusBtn: "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
    adminPortalBtn: "ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್",
    adminPortalTitle: "ಅಡ್ಮಿನ್ ಪಾವತಿ ಪರಿಶೀಲನೆ",
    adminApprovalNotice: "ಅಡ್ಮಿನ್ ರಶೀದಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದಾರೆ...",
    simulateApprovalBtn: "ತಕ್ಷಣದ ಅನುಮೋದನೆ (ಟೆಸ್ಟ್)",

    authModalTitle: "Gmail ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ",
    authModalSubtitle: "ನಿಮ್ಮ 6 ತಿಂಗಳ ತರಗತಿ ಪ್ರಗತಿ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರವನ್ನು ರಕ್ಷಿಸಲು Google ಖಾತೆಯಿಂದ ಲಾಗಿನ್ ಆಗಿ.",
    enterGmail: "ನಿಮ್ಮ Gmail ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ",
    quickFillGmail: "ಡೆಮೊ Gmail ಆಯ್ಕೆಮಾಡಿ",
    continueWithGoogle: "Google ಖಾತೆಯೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
    authNote: "ನಿಮ್ಮ ಇಮೇಲ್ ಸುರಕ್ಷಿತವಾಗಿದೆ. ಪ್ರಮಾಣಪತ್ರ ನೀಡಲು ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ.",
    loginGateTitle: "Start Your Coding Journey for ₹10 Only",
    loginGateAffordability: "(Affordability Revolution: Learn Apps & Web Development for just ₹10 instead of expensive courses costing ₹20,000–₹45,000)",
    highlightAgeTitle: "No Age Limit",
    highlightAgeDesc: "Open to everyone, from young children to adults. Anyone who knows how to use a mobile phone can learn easily without wasting time.",
    highlightNoLaptopTitle: "No Laptop Needed",
    highlightNoLaptopDesc: "Learn comfortably using your smartphone with intuitive no-code tools and professional Android Studio.",
    highlightDeliveryTitle: "Recorded Classes & Flexible Delivery",
    highlightDeliveryDesc: "Classes are provided as recorded video lessons via WhatsApp and Telegram, allowing you to learn at your own pace anytime.",
    highlightBuildTitle: "Build Anything You Want",
    highlightBuildDesc: "Learn to build custom mobile applications and websites of your own choice completely from scratch.",
    highlightSupportTitle: "Extended Support",
    highlightSupportDesc: "Take as much time as you need (even 1 year or more) to finish learning and successfully build your app.",
    highlightDoubtTitle: "Doubt Clearance",
    highlightDoubtDesc: "Ask questions anytime and get complete, dedicated mentor support."
  },

  hi: {
    appName: "AppLern ₹10",
    tagline: "मात्र ₹10 में मोबाइल ऐप्स और वेबसाइट बनाना सीखें",
    badge: "विशेष राष्ट्रीय पहल • ₹20,000+ का कोर्स मात्र ₹10 में",
    navCurriculum: "6 महीने का पाठ्यक्रम",
    navCommunity: "VIP ग्रुप्स",
    navWhy10: "सिर्फ ₹10 क्यों?",
    navTestimonials: "सफलता की कहानियां",
    navFAQ: "अक्सर पूछे जाने वाले सवाल",
    loginWithGmail: "Gmail से लॉगिन करें",
    loginPrompt: "आगे बढ़ने के लिए कृपया अपनी Gmail ID से लॉगिन करें",
    loggedInAs: "लॉगिन किया गया:",
    logout: "लॉग आउट",
    enrollNow: "अभी ₹10 में एनरोल करें",
    alreadyEnrolled: "आप नामांकित हैं!",
    unlockedClasses: "मेरी 6 महीने की कक्षाएं",
    lockedBadge: "लॉक्ড (₹10 में अनलॉक करें)",
    unlockedBadge: "अनलॉक एवं सक्रिय",

    priceComparisonBadge: "बाज़ार में फीस: ₹20,000 - ₹45,000 • AppLern में केवल ₹10 मात्र!",
    noAgeLimit: "कोई आयु सीमा नहीं • छोटे बच्चों से लेकर बड़ों तक सभी के लिए",
    toolsTaught: "नो-कोड (No-Code) टूल्स और Android Studio से मोबाइल ऐप्स और वेबसाइट्स",
    zeroBarrier: "शून्य कोडिंग अनुभव • किसी भाषा की रुकावट नहीं",

    heroTitle1: "ऐप्स और वेबसाइट बनाना सीखें केवल",
    heroTitleHighlight: "मात्र ₹10 में",
    heroSubtitle: "जहाँ अन्य संस्थान ₹20,000 से ₹45,000 वसूलते हैं, वहीं AppLern मात्र ₹10 में नो-कोड टूल्स और Android Studio द्वारा मोबाइल ऐप्स व वेबसाइट्स सिखाने वाला 6 महीने का संपूर्ण कोर्स (6 Months Course) प्रदान करता है। कोई आयु सीमा नहीं और बिना कोडिंग अनुभव के भी पूरी तरह आसान।",
    welcomeScriptTitle: "स्वागत संदेश एवं मार्गदर्शन (6 महीने का कोर्स)",
    welcomeScriptText: "AppLern ₹10 में आपका हार्दिक स्वागत है! जहाँ बाज़ार के बड़े संस्थान ₹20,000 से ₹45,000 तक की भारी फीस लेते हैं, हमारा संकल्प है कि हर भारतीय को मात्र ₹10 में उच्च स्तरीय तकनीक शिक्षा मिले। इस 6 महीने के संपूर्ण कोर्स में आप नो-कोड (No-Code) टूल्स और Android Studio का उपयोग करके मोबाइल ऐप्स और वेबसाइट्स बनाना सीखेंगे। इसमें कोई भी आयु सीमा नहीं है—स्कूली बच्चों से लेकर गृहणियों व नौकरीपेशा वयस्कों तक कोई भी अपनी मातृभाषा में सीख सकता है। पहले से किसी कोडिंग अनुभव की कोई आवश्यकता नहीं है। आज ही मात्र ₹10 का भुगतान कर अपनी शिक्षा शुरू करें!",
    listenAudio: "वॉइस संदेश सुनें",
    pauseAudio: "वॉइस रोकें",
    noCodingNeeded: "100% शुरुआती लोगों के लिए अनुकूल",
    allDevices: "मोबाइल और लैपटॉप दोनों पर कार्य करता है",
    moneyBackGuarantee: "तत्काल पहुंच • 6 महीने की आजीवन मान्यता",
    studentsEnrolled: "48,290+ विद्यार्थी नामांकित",

    why10Title: "6 महीने के लिए सिर्फ ₹10 क्यों?",
    why10Subtitle: "उच्च गुणवत्ता वाली सॉफ्टवेयर शिक्षा के लिए ₹20,000 से ₹45,000 खर्च करने की जरूरत नहीं। 6 महीने का प्रशिक्षण हर भारतीय तक पहुंचाना हमारा संकल्प है।",
    why10Point1Title: "एक कप चाय बनाम आपका भविष्य",
    why10Point1Desc: "हमने पूरे 6 महीने की फीस केवल ₹10 रखी है ताकि पैसा कभी बाधा न बने। यह सिर्फ सीखने के प्रति गंभीर लोगों को जोड़ने के लिए है।",
    why10Point2Title: "नो-कोड & Android Studio",
    why10Point2Desc: "किताबी रटने की कोई जरूरत नहीं। नो-कोड टूल्स और Android Studio द्वारा आप खुद अपने हाथों से ऐसे ऐप्स बनाएंगे जिन्हें आप फोन में चला सकें।",
    why10Point3Title: "आजीवन VIP कम्युनिटी सपोर्ट",
    why10Point3Desc: "व्हाट्सएप और टेलीग्राम ग्रुप्स में मेंटर्स के साथ 6 महीने लगातार 24 घंटे अपने डाउट्स क्लियर करें।",

    curriculumTitle: "6-महीने का संपूर्ण पाठ्यक्रम (6 Months Course)",
    curriculumSubtitle: "शुरुआत से लेकर 6 महीनों में अपना पहला लाइव ऐप और वेबसाइट लॉन्च करने तक।",
    monthBadge: "महीना",
    dayBadge: "दिन",
    watchLesson: "कक्षा और सामग्री देखें",
    lockedLessonNotice: "यह कक्षा अभी लॉक्ड है। सभी 6 महीने की कक्षाओं और प्रोजेक्ट कोड को अनलॉक करने के लिए ₹10 UPI द्वारा भुगतान करें।",
    day1Title: "महीना 1: ऐप्स और वेब की बुनियाद",
    day1Desc: "बिना कोडिंग के तकनीक के रहस्यों को समझें। सर्वर्स, मोबाइल स्क्रीन, API और ऐप्स की कार्यप्रणाली।",
    day2Title: "महीना 1, भाग 2: पहला वेब पेज",
    day2Desc: "हेडिंग्स, कस्टम इमेजिस और क्लिक करने योग्य बटन्स के साथ अपना पहला डिजिटल वेब पेज बनाएं।",
    day3Title: "महीना 2: सिलीकॉन वैली स्टाइल में डिजाइनिंग (CSS)",
    day3Desc: "शानदार कलर्स, डार्क मोड, कार्ड लेआउट और आकर्षक एनिमेशन बनाना सीखें।",
    day4Title: "महीना 3: बटन्स और इंटरएक्टिविटी में जान डालें (JS)",
    day4Desc: "क्लिक पर एक्शन लेने वाला लॉजिक बनाएं और एक उपयोगी टिप कैलकुलेटर ऐप तैयार करें।",
    day5Title: "महीना 4: नो-कोड से मोबाइल ऐप बनाएं",
    day5Desc: "अपने प्रोजेक्ट को स्मार्टफोन में इंस्टॉल होने वाले ऐप (PWA/APK) में आसानी से कन्वर्ट करें।",
    day6Title: "महीना 5: Android Studio & AI टूल्स",
    day6Desc: "Android Studio और Gemini AI की मदद से सेकंडों में पूरा कोड जनरेट करना सीखें।",
    day7Title: "महीना 6: अपना ऐप इंटरनेट पर लॉन्च करें और सर्टिफिकेट पाएं",
    day7Desc: "अपने ऐप को दुनिया के सामने लाइव करें, दोस्तों के साथ लिंक शेयर करें और प्रमाणित 6-महीने का सर्टिफिकेट प्राप्त करें।",

    communityTitle: "विशेष VIP कम्युनिटी ग्रुप्स",
    communitySubtitle: "अकेले मत सीखिए। हजारों उत्साही छात्रों के साथ जुड़ें और मिलकर आगे बढ़ें।",
    whatsappTitle: "आधिकारिक VIP WhatsApp ग्रुप",
    whatsappDesc: "दैनिक कक्षा रिमाइंडर, कोड फाइल्स, प्रोजेक्ट्स और मेंटर घोषणाएं सीधे व्हाट्सएप पर।",
    telegramTitle: "टेलीग्राम रिसोर्स चैनल",
    telegramDesc: "मुफ्त ई-बुक्स, सॉफ्टवेयर टूल्स, APK टेम्प्लेट्स और लाइव रिकॉर्डिंग्स प्राप्त करें।",
    joinWhatsApp: "WhatsApp कम्युनिटी से जुड़ें",
    joinTelegram: "Telegram चैनल से जुड़ें",
    communityLockedNotice: "VIP कम्युनिटी लिंक अभी लॉक्ड हैं। डायरेक्ट लिंक देखने के लिए अपना ₹10 UPI पेमेंट वेरीफाई करें।",
    copyLink: "लिंक कॉपी करें",
    linkCopied: "लिंक कॉपी हो गया!",

    paymentModalTitle: "सुरक्षित UPI पेमेंट गेटवे",
    paymentSubtitle: "पूरे 6 महीने की कक्षाओं, कम्युनिटी ग्रुप्स और सर्टिफिकेट के लिए मात्र ₹10 का भुगतान करें।",
    scanWithAnyUPI: "GPay, PhonePe, Paytm या BHIM से QR कोड स्कैन करें",
    amountLabel: "नामांकन शुल्क (6 महीने की पहुंच)",
    upiIdLabel: "आधिकारिक UPI ID",
    copiedUPI: "UPI ID कॉपी हो गई!",
    openInApp: "UPI ऐप में खोलें",
    utrInputLabel: "12-अंकों का UPI संदर्भ / UTR नंबर दर्ज करें",
    utrPlaceholder: "उदा: 430129841234",
    verifyPaymentBtn: "UTR दर्ज करें और अनलॉक करें",
    verifyingBtn: "सत्यापन किया जा रहा है...",
    demoInstantPay: "⚡ तुरंत सत्यापित करें (डेमो मोड)",
    secureGateway: "100% सुरक्षित UPI गेटवे • सत्यापित मर्चेंट: AppLern Education",
    paymentInstructions: [
      "1. कोई भी UPI ऐप खोलें (Google Pay, PhonePe, Paytm, BHIM)।",
      "2. QR कोड स्कैन करें या UPI ID पर ₹10 ट्रांसफर करें।",
      "3. पेमेंट रसीद से 12-अंकों का UTR / UPI Ref नंबर कॉपी करें।",
      "4. नीचे नंबर दर्ज करें और तुरंत एक्सेस पाने के लिए Verify पर क्लिक करें!"
    ],

    tabUploadScreenshot: "AI स्क्रीनशॉट जांच (तुरंत)",
    tabManualUtr: "UTR मैनुअल दर्ज करें",
    uploadBoxTitle: "UPI पेमेंट स्क्रीनशॉट अपलोड करें",
    uploadBoxSubtitle: "GPay, PhonePe, Paytm या BHIM में ₹10 भुगतान का स्क्रीनशॉट यहाँ अपलोड करें",
    analyzingScreenshot: "AI राशि (₹10), दिनांक और UTR नंबर की जांच कर रहा है...",
    aiVerificationSuccess: "AI द्वारा भुगतान सफलतापूर्वक सत्यापित हुआ! 6 महीने का कोर्स अनलॉक हो रहा है...",
    aiVerificationFailed: "सत्यापन विफल रहा",
    trySampleReceipts: "या टेस्ट पेमेंट रसीद आज़माएँ:",

    paymentSuccessTitle: "भुगतान सफल रहा! 🎉",
    paymentSuccessSubtitle: "AppLern ₹10 में आपका स्वागत है! आपका 6 महीने का नामांकन सत्यापित हो गया है।",
    congratsMessage: "आपकी 6 महीने की दैनिक कक्षाएं और VIP कम्युनिटी लिंक्स आपके अकाउंट पर स्थायी रूप से अनलॉक हो गए हैं।",
    transactionIdLabel: "ट्रांजैक्शन संदर्भ",
    accessNowBtn: "6-महीने का डैशबोर्ड देखें",
    getCertificateBtn: "सर्टिफिकेट पोर्टल देखें",

    // Payment Pending Verification & Admin Approval
    paymentPendingBadge: "सत्यापन प्रक्रियाधीन",
    paymentPendingTitle: "भुगतान सत्यापन प्रक्रिया में है",
    paymentPendingDesc: "आपका ₹10 का भुगतान विवरण प्राप्त हो गया है। एडमिन द्वारा सत्यापन होते ही, आपकी 6 महीने की कक्षाएं, WhatsApp कम्युनिटी और Telegram चैनल लिंक्स स्वतः अनलॉक हो जाएंगे।",
    paymentPendingNotice: "एडमिन अप्रूवल की प्रतीक्षा • कुछ ही सेकंड में स्वतः अपडेट",
    checkStatusBtn: "स्टेटस चेक करें",
    adminPortalBtn: "एडमिन पोर्टल",
    adminPortalTitle: "एडमिन पेमेंट सत्यापन",
    adminApprovalNotice: "एडमिन रसीद की समीक्षा कर रहे हैं...",
    simulateApprovalBtn: "त्वरित एडमिन अप्रूवल (टेस्ट)",

    authModalTitle: "Gmail से लॉगिन करें",
    authModalSubtitle: "अपनी 6 महीने की कक्षा प्रगति और सर्टिफिकेट को सुरक्षित रखने के लिए अपने Google अकाउंट से लॉगिन करें।",
    enterGmail: "अपना Gmail एड्रेस दर्ज करें",
    quickFillGmail: "एक-क्लिक डेमो Gmail",
    continueWithGoogle: "Google अकाउंट से आगे बढ़ें",
    authNote: "आपका ईमेल पूरी तरह सुरक्षित है और केवल कोर्स एक्सेस व सर्टिफिकेट के लिए उपयोग किया जाता है।",
    loginGateTitle: "Start Your Coding Journey for ₹10 Only",
    loginGateAffordability: "(Affordability Revolution: Learn Apps & Web Development for just ₹10 instead of expensive courses costing ₹20,000–₹45,000)",
    highlightAgeTitle: "No Age Limit",
    highlightAgeDesc: "Open to everyone, from young children to adults. Anyone who knows how to use a mobile phone can learn easily without wasting time.",
    highlightNoLaptopTitle: "No Laptop Needed",
    highlightNoLaptopDesc: "Learn comfortably using your smartphone with intuitive no-code tools and professional Android Studio.",
    highlightDeliveryTitle: "Recorded Classes & Flexible Delivery",
    highlightDeliveryDesc: "Classes are provided as recorded video lessons via WhatsApp and Telegram, allowing you to learn at your own pace anytime.",
    highlightBuildTitle: "Build Anything You Want",
    highlightBuildDesc: "Learn to build custom mobile applications and websites of your own choice completely from scratch.",
    highlightSupportTitle: "Extended Support",
    highlightSupportDesc: "Take as much time as you need (even 1 year or more) to finish learning and successfully build your app.",
    highlightDoubtTitle: "Doubt Clearance",
    highlightDoubtDesc: "Ask questions anytime and get complete, dedicated mentor support."
  }
};
