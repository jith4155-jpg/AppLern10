import React, { useState } from 'react';
import { Language, User, ClassLesson } from '../types';
import { translations } from '../data/translations';
import { classLessons, courseMonths } from '../data/courseData';
import { ClassViewerModal } from './ClassViewerModal';
import { CertificateModal } from './CertificateModal';
import { 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Send, 
  ExternalLink, 
  Copy, 
  Check, 
  Play, 
  Clock, 
  Award, 
  BookOpen, 
  Users, 
  Radio, 
  Unlock,
  Receipt,
  Layers,
  ChevronRight,
  Calendar
} from 'lucide-react';

import { useAppSettings } from '../hooks/useAppSettings';

interface StudentDashboardProps {
  currentLang: Language;
  user: User;
  completedDays: number[];
  onMarkCompleted: (dayNumber: number) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentLang,
  user,
  completedDays,
  onMarkCompleted
}) => {
  const { settings } = useAppSettings();
  const t = translations[currentLang];
  const [activeLesson, setActiveLesson] = useState<ClassLesson | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [copiedGroup, setCopiedGroup] = useState<string | null>(null);
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<number | 'all'>('all');

  const whatsappLink = settings.whatsappGroupLink || "https://chat.whatsapp.com/invite/applern10vip";
  const telegramLink = settings.communityLink || "https://t.me/applern10community";

  const handleCopy = (link: string, key: string) => {
    navigator.clipboard.writeText(link);
    setCopiedGroup(key);
    setTimeout(() => setCopiedGroup(null), 2000);
  };

  const progressPercentage = Math.round((completedDays.length / classLessons.length) * 100);

  const displayedMonths = selectedMonthFilter === 'all'
    ? courseMonths
    : courseMonths.filter(m => m.monthNumber === selectedMonthFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      
      {/* 1. Top Verified Celebration Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Payment Verified • 6-Month Comprehensive Course (6 മാസം)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome to Your 6-Month Dashboard, {user.name || "Student"}! 🚀
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your ₹10 payment has been verified. The complete 6-month daily class curriculum and VIP community links are permanently unlocked for your account ({user.email}).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              {user.userTokenNumber && (
                <span className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1 rounded-lg border border-indigo-500 shadow-md font-black">
                  TOKEN #{user.userTokenNumber}
                </span>
              )}
              <span className="flex items-center gap-1 bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800">
                <Receipt className="w-3.5 h-3.5 text-indigo-400" />
                Txn: {user.paymentDetails?.transactionId || 'UPI-VERIFIED'}
              </span>
              <span className="flex items-center gap-1 bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800">
                UTR: {user.paymentDetails?.utrNumber || '430129841234'}
              </span>
            </div>
          </div>

          {/* 6-Month Progress Card */}
          <div className="w-full md:w-72 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">6-Month Curriculum Progress</span>
              <span className="text-emerald-400 font-mono">{progressPercentage}%</span>
            </div>

            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{completedDays.length} of 6 Months Completed</span>
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>6M Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Unlocked VIP Community Access Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            VIP Community Channels (Unlocked)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Connect with instructors and fellow learners throughout your 6-month journey for instant doubt clearing and resource downloads.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* WhatsApp Card */}
          <div className="rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 flex flex-col justify-between shadow-xl shadow-emerald-950/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  VIP Access Active
                </span>
              </div>

              <h3 className="text-lg font-black text-white">{t.whatsappTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.whatsappDesc}</p>
              
              <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Daily live doubt-clearing audio sessions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Instructor feedback on your monthly projects</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Official WhatsApp Community</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5" />
              </a>

              <button
                onClick={() => handleCopy(whatsappLink, 'wa')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedGroup === 'wa' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy WhatsApp Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Telegram Card */}
          <div className="rounded-3xl bg-slate-900 border border-sky-500/40 p-6 flex flex-col justify-between shadow-xl shadow-sky-950/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center shadow-md">
                  <Send className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                  VIP Access Active
                </span>
              </div>

              <h3 className="text-lg font-black text-white">{t.telegramTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.telegramDesc}</p>
              
              <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Instant downloads of 6-month source code zip files</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Free PDF cheat sheets for HTML, CSS, JS & AI prompts</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4" />
                <span>Join Telegram Mastermind Channel</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5" />
              </a>

              <button
                onClick={() => handleCopy(telegramLink, 'tg')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedGroup === 'tg' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-sky-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Telegram Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Daily Classes Organised into 6 Months */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                6-Month Daily Class Curriculum (Organised into Months)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Structured progressive roadmap across 6 months. Select any month to view lessons.
            </p>
          </div>

          <button
            onClick={() => setIsCertificateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors shrink-0"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>View 6-Month Certificate</span>
          </button>
        </div>

        {/* Month Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedMonthFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedMonthFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All 6 Months
          </button>

          {courseMonths.map((m) => (
            <button
              key={m.monthNumber}
              onClick={() => setSelectedMonthFilter(m.monthNumber)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedMonthFilter === m.monthNumber
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Month {m.monthNumber}</span>
            </button>
          ))}
        </div>

        {/* Render Months and Their Classes */}
        <div className="space-y-8">
          {displayedMonths.map((month) => (
            <div 
              key={month.monthNumber}
              className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 shadow-xl"
            >
              {/* Month Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/30">
                      {t.monthBadge} 0{month.monthNumber}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {month.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {month.subtitle}
                  </p>
                </div>

                <span className="text-[11px] font-mono font-medium text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-500/30 shrink-0">
                  Focus: {month.focus}
                </span>
              </div>

              {/* Month's Daily Class Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {month.lessons.map((lesson) => {
                  const lessonTitle = (t as any)[lesson.titleKey] || lesson.id;
                  const lessonDesc = (t as any)[lesson.descriptionKey] || '';
                  const isDone = completedDays.includes(lesson.dayNumber);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className="group rounded-2xl p-4 bg-slate-950 border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-950/30 hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            Month {lesson.monthNumber} Class
                          </span>

                          {isDone ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                              <Unlock className="w-3 h-3 text-indigo-400" />
                              Unlocked
                            </span>
                          )}
                        </div>

                        {/* Thumbnail */}
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800">
                          <img
                            src={lesson.videoThumbnail}
                            alt={lessonTitle}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                            <div className="w-10 h-10 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            </div>
                          </div>

                          <div className="absolute bottom-1.5 right-1.5 bg-slate-950/90 text-slate-200 text-[10px] font-mono px-1.5 py-0.5 rounded">
                            {lesson.duration}
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {lessonTitle}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {lessonDesc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-xs">
                        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>

                        <span className="font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 text-xs">
                          <span>Open Lesson</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Viewer Modal */}
      <ClassViewerModal
        lesson={activeLesson}
        onClose={() => setActiveLesson(null)}
        currentLang={currentLang}
        onMarkCompleted={onMarkCompleted}
        isCompleted={activeLesson ? completedDays.includes(activeLesson.dayNumber) : false}
      />

      {/* 6-Month Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        user={user}
        currentLang={currentLang}
      />

    </div>
  );
};
