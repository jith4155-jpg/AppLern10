import { ClassLesson, CourseMonth } from '../types';

export const classLessons: ClassLesson[] = [
  {
    id: "month-1-class",
    monthNumber: 1,
    dayNumber: 1,
    titleKey: "day1Title",
    descriptionKey: "day1Desc",
    duration: "45 mins",
    videoThumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    videoDuration: "38:45",
    topics: [
      "Client vs Server Architecture for Mobile & Web Apps",
      "How Mobile Screens Render UI Pixels and Touch Events",
      "Setting up your free code playground on Mobile or Laptop",
      "HTML5 Semantics: Headings, Containers, Forms, and Media"
    ],
    codeSnippet: `// Month 1 Foundation: Understanding App Architecture
const appArchitecture = {
  courseDuration: "6 Months",
  courseFee: "₹10",
  month1Goal: "Build your first digital portfolio & mobile web layouts",
  tools: ["Mobile Code Studio", "Chrome DevTools", "HTML5"],
  status: "Active"
};

console.log("Welcome to Month 1:", appArchitecture);`,
    practicalTask: "Set up your free mobile/laptop code playground and build a personal portfolio page with image and links.",
    resources: [
      { name: "Month 1 Web Architecture Roadmap.pdf", type: "pdf", url: "#" },
      { name: "HTML5 Essential Tags Reference.pdf", type: "pdf", url: "#" },
      { name: "Portfolio Template Starter.zip", type: "zip", url: "#" }
    ]
  },
  {
    id: "month-2-class",
    monthNumber: 2,
    dayNumber: 2,
    titleKey: "day3Title",
    descriptionKey: "day3Desc",
    duration: "52 mins",
    videoThumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    videoDuration: "46:20",
    topics: [
      "Modern CSS3: Flexbox and Grid layouts made intuitive",
      "Glassmorphism, Gradients, Dark Mode, and Color Harmonies",
      "Designing responsive layouts for iPhone and Android screens",
      "Smooth CSS micro-animations and button tap effects"
    ],
    codeSnippet: `/* Silicon Valley Clean Card Styling */
.card {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 35px -5px rgba(99, 102, 241, 0.4);
}`,
    practicalTask: "Style a modern Swiggy/Instagram food delivery card with animated price tags and responsive buttons.",
    resources: [
      { name: "Month 2 Color Palettes & UI Kit.pdf", type: "pdf", url: "#" },
      { name: "CSS Flexbox Visual Cheat Sheet.pdf", type: "pdf", url: "#" }
    ]
  },
  {
    id: "month-3-class",
    monthNumber: 3,
    dayNumber: 3,
    titleKey: "day4Title",
    descriptionKey: "day4Desc",
    duration: "60 mins",
    videoThumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    videoDuration: "54:50",
    topics: [
      "JavaScript Core: Variables, Arrays, Functions, and Events",
      "State Management: Remembering user data and scores",
      "Conditional Logic: If/Else decision making and form validation",
      "Building a live working Calculator and Expense Tracker app"
    ],
    codeSnippet: `// Live Tip & Split Bill Calculator
function calculateBill(totalBill, numberOfFriends) {
  const tipPercent = 0.10; // 10%
  const grandTotal = totalBill + (totalBill * tipPercent);
  const sharePerPerson = grandTotal / numberOfFriends;
  
  return {
    grandTotal: "₹" + grandTotal.toFixed(2),
    perPerson: "₹" + sharePerPerson.toFixed(2)
  };
}

console.log(calculateBill(500, 4)); // { grandTotal: '₹550.00', perPerson: '₹137.50' }`,
    practicalTask: "Write a JavaScript function that computes total monthly savings and displays the result live on screen.",
    resources: [
      { name: "JavaScript 10 Most Common Functions.pdf", type: "pdf", url: "#" },
      { name: "Expense Tracker Starter Code.zip", type: "zip", url: "#" }
    ]
  },
  {
    id: "month-4-class",
    monthNumber: 4,
    dayNumber: 4,
    titleKey: "day5Title",
    descriptionKey: "day5Desc",
    duration: "58 mins",
    videoThumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    videoDuration: "51:30",
    topics: [
      "Progressive Web Apps (PWA) & Mobile Hybrid Apps",
      "Adding App Icons, Splash Screens, and Fullscreen Mode",
      "Offline caching: Enabling your app to work without internet",
      "Installing and testing directly on your Android or iOS device"
    ],
    codeSnippet: `// PWA Web App Manifest for mobile installation
{
  "name": "AppLern 6-Month Project",
  "short_name": "AppLern10",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#090d16",
  "theme_color": "#4f46e5",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}`,
    practicalTask: "Add a manifest.json file to your project and install your web application directly onto your personal phone.",
    resources: [
      { name: "PWA Mobile Manifest Boilerplate.zip", type: "zip", url: "#" },
      { name: "Android Testing Guide.pdf", type: "pdf", url: "#" }
    ]
  },
  {
    id: "month-5-class",
    monthNumber: 5,
    dayNumber: 5,
    titleKey: "day6Title",
    descriptionKey: "day6Desc",
    duration: "65 mins",
    videoThumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    videoDuration: "58:15",
    topics: [
      "Prompt Engineering with Gemini AI for Rapid Code Generation",
      "Generating full UI layouts and backend logic in seconds",
      "Connecting to Free REST APIs: Weather, Currency, and Stocks",
      "Debugging code and fixing errors like a senior software engineer"
    ],
    codeSnippet: `/* AI Prompt Template for Rapid Component Generation */
/*
PROMPT:
"Act as a senior frontend engineer. Create a mobile-first 
budget tracker component in Tailwind CSS. Include a circular 
progress bar for ₹10,000 monthly budget, recent transactions list, 
and an 'Add Expense' modal with smooth animations."
*/`,
    practicalTask: "Use the provided Gemini AI prompt cheat sheet to build a working Habit Tracker in under 15 minutes.",
    resources: [
      { name: "50 Golden AI Coding Prompts.pdf", type: "pdf", url: "#" },
      { name: "Gemini API Starter Key Guide.pdf", type: "pdf", url: "#" }
    ]
  },
  {
    id: "month-6-class",
    monthNumber: 6,
    dayNumber: 6,
    titleKey: "day7Title",
    descriptionKey: "day7Desc",
    duration: "70 mins",
    videoThumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    videoDuration: "62:00",
    topics: [
      "Deploying your application live to the Cloud with 1 click",
      "Custom domain linking, SSL security lock, and SEO tags",
      "Sharing your live link with employers, friends, and LinkedIn",
      "Claiming your verified 6-Month AppLern Certificate of Completion"
    ],
    codeSnippet: `// 6-Month Course Completion Verification
const graduationVerification = {
  course: "AppLern ₹10 (6-Month Comprehensive Course)",
  status: "Certified Full-Stack App & Web Developer",
  verificationCode: "AL-6M-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  certificateUrl: "https://applern10.edu/verify",
  nextStep: "Join VIP Alumni Network & Freelance Track"
};

console.log("Congratulations on 6-Month Graduation!", graduationVerification);`,
    practicalTask: "Deploy your finished portfolio and web app to a live public URL and submit your link to claim your certificate.",
    resources: [
      { name: "Free Cloud Hosting Platforms Guide.pdf", type: "pdf", url: "#" },
      { name: "LinkedIn 6-Month Certification Guide.pdf", type: "pdf", url: "#" }
    ]
  }
];

export const courseMonths: CourseMonth[] = [
  {
    monthNumber: 1,
    title: "Month 1: Web Architecture & HTML5",
    subtitle: "Understanding clients, servers, and crafting semantic web structures",
    focus: "HTML5, Browser Layouts, Mobile Screen Rendering",
    lessons: [classLessons[0]]
  },
  {
    monthNumber: 2,
    title: "Month 2: Modern Styling & CSS3 UI",
    subtitle: "Designing Silicon Valley grade responsive interfaces and animations",
    focus: "Flexbox, Grid, Glassmorphism, Dark Mode, Animations",
    lessons: [classLessons[1]]
  },
  {
    monthNumber: 3,
    title: "Month 3: JavaScript Logic & Interactivity",
    subtitle: "Adding life, click events, state, and building dynamic calculations",
    focus: "ES6+ JavaScript, Event Listeners, State Management",
    lessons: [classLessons[2]]
  },
  {
    monthNumber: 4,
    title: "Month 4: Mobile Apps & Progressive Web Apps",
    subtitle: "Turning web code into installable mobile apps with offline support",
    focus: "PWA, Web Manifest, Touch Events, Home Screen App",
    lessons: [classLessons[3]]
  },
  {
    monthNumber: 5,
    title: "Month 5: AI Prompt Engineering & Backend APIs",
    subtitle: "Supercharging software creation using Gemini AI coding assistants",
    focus: "Gemini AI, Prompt Engineering, REST APIs, JSON Data",
    lessons: [classLessons[4]]
  },
  {
    monthNumber: 6,
    title: "Month 6: Cloud Deployment & Graduation",
    subtitle: "Launching your apps live to the world and earning your 6-Month Certificate",
    focus: "Cloud Hosting, Custom Domains, Production Launch, Certificate",
    lessons: [classLessons[5]]
  }
];
