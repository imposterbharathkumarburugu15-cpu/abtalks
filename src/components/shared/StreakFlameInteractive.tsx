import React, { useState } from 'react';
import { Flame, Sparkles, Zap, X, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../../types';

interface StreakFlameInteractiveProps {
  student: StudentProfile;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const StreakFlameInteractive: React.FC<StreakFlameInteractiveProps> = ({
  student,
  size = 'md',
  showLabel = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [activeTab, setActiveTab] = useState<'streak' | 'missed_day'>('streak');

  const streak = student.streak;
  const isMissedDay = student.stateMode === 'missed_day';

  // Determine Flame Tier
  const getFlameTier = (days: number) => {
    if (days >= 60) return { title: 'TITAN INFERNO' };
    if (days >= 30) return { title: 'WILDFIRE RUN' };
    if (days >= 14) return { title: 'INFERNO BUILDER' };
    if (days >= 7) return { title: 'IGNITED RUN' };
    return { title: 'BUILD SPARK' };
  };

  const flameTier = getFlameTier(streak);

  // Trigger spark particles on click
  const handleFlameClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20)
    }));

    setSparks((prev) => [...prev, ...newSparks]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 800);

    setIsOpen(true);
  };

  return (
    <>
      {/* INTERACTIVE STREAK FLAME BUTTON */}
      <button
        type="button"
        onClick={handleFlameClick}
        className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer active:scale-95 group overflow-hidden ${
          isMissedDay
            ? 'bg-[#14191B] border-[#252C2E] text-[#A6AAA8] hover:border-[#C58A52]/40'
            : 'bg-[#191F21] border-[#C58A52]/50 text-[#F1EEE7] hover:border-[#C58A52]'
        }`}
        title="Click to view Streak Power & How Missed Days Work"
      >
        {/* Animated Spark Particles overlay */}
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#C58A52] animate-ping pointer-events-none"
            style={{ left: `${spark.x}px`, top: `${spark.y}px` }}
          />
        ))}

        {/* Flame Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Flame
            className={`transition-transform duration-300 group-hover:scale-110 ${
              size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
            } ${
              isMissedDay
                ? 'text-[#6F7575]'
                : 'text-[#C58A52]'
            }`}
          />
        </div>

        {/* Streak Days Count Badge */}
        {showLabel && (
          <div className="relative z-10 flex items-center gap-1 font-mono">
            <span className={`font-black ${size === 'lg' ? 'text-base' : 'text-xs'} ${isMissedDay ? 'text-[#A6AAA8]' : 'text-[#C58A52]'}`}>
              {isMissedDay ? 'PAUSED' : `${streak}d`}
            </span>
            <span className="text-[9px] text-[#A6AAA8] group-hover:text-[#F1EEE7] uppercase font-bold transition-colors">
              STREAK
            </span>
          </div>
        )}
      </button>

      {/* INTERACTIVE STREAK & MISSED DAY EXPLANATION MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14191B] border border-[#252C2E] rounded-2xl max-w-sm w-full p-4 sm:p-5 space-y-4 shadow-2xl relative overflow-hidden font-sans">
            
            {/* Header & Close Button */}
            <div className="flex items-start justify-between border-b border-[#252C2E] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#191F21] border border-[#C58A52]/40 text-[#C58A52]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-[#F1EEE7] uppercase tracking-tight">
                    {flameTier.title}
                  </h3>
                  <p className="text-[10px] font-mono text-[#69B39A]">
                    ABTALKS STREAK ENGINE
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-[#090B0D] border border-[#252C2E] hover:border-[#69B39A]/40 text-[#A6AAA8] hover:text-[#F1EEE7] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TAB SELECTOR: STREAK STATS vs HOW MISSED DAYS WORK */}
            <div className="flex bg-[#090B0D] p-1 rounded-xl border border-[#252C2E] text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('streak')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'streak'
                    ? 'bg-[#C58A52] text-[#090B0D]'
                    : 'text-[#A6AAA8] hover:text-[#F1EEE7]'
                }`}
              >
                STREAK POWER
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('missed_day')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'missed_day'
                    ? 'bg-[#69B39A] text-[#090B0D]'
                    : 'text-[#A6AAA8] hover:text-[#F1EEE7]'
                }`}
              >
                MISSED A DAY?
              </button>
            </div>

            {/* TAB 1: STREAK POWER & STATS */}
            {activeTab === 'streak' && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 text-center space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#6F7575] uppercase tracking-wider block">
                    CURRENT PUBLIC STREAK
                  </span>
                  <div className="text-3xl font-black font-display text-[#C58A52] tracking-tight">
                    {student.streak} <span className="text-xs font-mono font-normal text-[#F1EEE7]">DAYS</span>
                  </div>
                  <p className="text-[11px] text-[#A6AAA8]">
                    {student.completedBuilds} out of 60 total builds shipped to public record.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#A6AAA8]">
                    <span>Flame Tier:</span>
                    <span className="text-[#F1EEE7] font-bold">{flameTier.title}</span>
                  </div>
                  <div className="flex justify-between text-[#A6AAA8]">
                    <span>GitHub Proofs:</span>
                    <span className="text-[#69B39A] font-bold">{student.githubProofs} verified</span>
                  </div>
                  <div className="flex justify-between text-[#A6AAA8]">
                    <span>LinkedIn Proofs:</span>
                    <span className="text-[#718A96] font-bold">{student.linkedinProofs} verified</span>
                  </div>
                </div>

                <div className="bg-[#191F21] border border-[#252C2E] rounded-xl p-2.5 text-[11px] text-[#A6AAA8] leading-tight">
                  <strong>Streak Rule:</strong> Build and post proof every day before 11:59 PM to increase your streak and public proof record.
                </div>
              </div>
            )}

            {/* TAB 2: EXPLAINING "MISSED A DAY HOW" & BUILD RESCUE */}
            {activeTab === 'missed_day' && (
              <div className="space-y-3 animate-fade-in text-xs font-sans">
                <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#C58A52]">
                    <Zap className="w-4 h-4 text-[#C58A52]" />
                    <span>WHAT HAPPENS WHEN YOU MISS A DAY?</span>
                  </div>

                  <p className="text-[#A6AAA8] text-[11px] leading-relaxed">
                    If real college life gets in the way and you miss a day, ABTalks <strong>never resets your entire 60-day journey to zero</strong>.
                  </p>

                  <div className="space-y-2 pt-1 font-mono text-[11px]">
                    <div className="flex items-start gap-2 text-[#A6AAA8]">
                      <span className="text-[#69B39A] font-bold">1.</span>
                      <span><strong>Run Paused:</strong> Your previous builds remain preserved and safe in your vault.</span>
                    </div>

                    <div className="flex items-start gap-2 text-[#A6AAA8]">
                      <span className="text-[#C58A52] font-bold">2.</span>
                      <span><strong>Build Rescue Triggers:</strong> The system offers an 18-minute <em>Core Scope Mission</em>.</span>
                    </div>

                    <div className="flex items-start gap-2 text-[#A6AAA8]">
                      <span className="text-[#6FA889] font-bold">3.</span>
                      <span><strong>Streak Rescued:</strong> Ship the core requirement to resume your run immediately!</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#191F21] border border-[#6FA889]/30 rounded-xl p-2.5 text-[11px] text-[#6FA889] font-mono leading-tight flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6FA889] shrink-0" />
                  <span>Your public record remains 100% truthful, noting Core Shipped while protecting your momentum.</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#69B39A] hover:bg-[#69B39A]/90 text-[#090B0D] font-mono font-bold text-xs cursor-pointer transition-all shadow-sm"
            >
              GOT IT · KEEP BUILDING
            </button>
          </div>
        </div>
      )}
    </>
  );
};

