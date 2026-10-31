import React, { useState } from 'react';
import { ClassLesson, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Play, 
  Pause, 
  CheckCircle, 
  Copy, 
  Check, 
  Download, 
  Code2, 
  BookOpen, 
  CheckSquare, 
  Sparkles,
  ArrowRight,
  Maximize2,
  Volume2
} from 'lucide-react';

interface ClassViewerModalProps {
  lesson: ClassLesson | null;
  onClose: () => void;
  currentLang: Language;
  onMarkCompleted: (dayNumber: number) => void;
  isCompleted: boolean;
}

export const ClassViewerModal: React.FC<ClassViewerModalProps> = ({
  lesson,
  onClose,
  currentLang,
  onMarkCompleted,
  isCompleted
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'task' | 'resources'>('overview');
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x'>('1x');

  if (!lesson) return null;

  const t = translations[currentLang];
  const lessonTitle = (t as any)[lesson.titleKey] || lesson.id;
  const lessonDesc = (t as any)[lesson.descriptionKey] || '';

  const handleCopyCode = () => {
    if (lesson.codeSnippet) {
      navigator.clipboard.writeText(lesson.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl text-slate-100 my-6 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-indigo-600/30 text-indigo-300 font-extrabold text-xs border border-indigo-500/40">
              {t.dayBadge} {lesson.dayNumber}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[280px] sm:max-w-md">
                {lessonTitle}
              </h3>
              <p className="text-xs text-slate-400">Duration: {lesson.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onMarkCompleted(lesson.dayNumber)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Simulated Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-video group">
            <img 
              src={lesson.videoThumbnail} 
              alt={lessonTitle}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
            />
            
            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="bg-slate-900/80 px-2.5 py-1 rounded-md font-mono border border-slate-700">
                  AppLern HD Video Class
                </span>
                <span className="bg-indigo-600/80 text-white px-2.5 py-1 rounded-md font-bold">
                  {lesson.videoDuration}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 transition-all ring-4 ring-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 fill-white ml-1" />
                  )}
                </button>
              </div>

              {/* Player Controls Bar */}
              <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-indigo-400">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-slate-400">
                    {isPlaying ? '04:12' : '00:00'} / {lesson.videoDuration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                    <span className="text-slate-400">Speed:</span>
                    {(['1x', '1.25x', '1.5x'] as const).map(speed => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-1 rounded ${playbackSpeed === speed ? 'text-indigo-300 font-bold bg-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                  <Volume2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'overview', label: 'Lesson Syllabus', icon: BookOpen },
              { id: 'code', label: 'Starter Code', icon: Code2 },
              { id: 'task', label: 'Daily Practice Task', icon: CheckSquare },
              { id: 'resources', label: 'Downloads & Assets', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {lessonDesc}
              </p>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Topics Covered in this Video:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
                  {lesson.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Copy and paste this starter snippet into your editor:</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{lesson.codeSnippet || '// No code snippet for this conceptual lesson.'}</code>
              </pre>
            </div>
          )}

          {activeTab === 'task' && (
            <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Today's Hands-on Assignment</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {lesson.practicalTask}
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                💡 <strong className="text-slate-200">Tip:</strong> Share your completed screenshot in the official VIP WhatsApp group to get feedback from instructors and earn your daily badge!
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-2.5">
              {lesson.resources.map((res, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold uppercase">
                      {res.type}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white">{res.name}</div>
                      <div className="text-[11px] text-slate-400">Free with your ₹10 enrollment</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Downloading ${res.name}... Included free with AppLern ₹10.`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
