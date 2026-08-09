import React, { useState } from 'react';
import { Flame, Sparkles, HelpCircle, ShieldCheck, Zap, X, ChevronRight, CheckCircle2 } from 'lucide-react';
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
    if (days >= 60) return { title: 'TITAN INFERNO', color: 'from-[#F97316] via-[#EF4444] to-[#EC4899]', glow: 'shadow-[#F97316]/50' };
    if (days >= 30) return { title: 'UNSTOPPABLE WILDFIRE', color: 'from-[#F97316] to-[#EF4444]', glow: 'shadow-[#F97316]/40' };
    if (days >= 14) return { title: 'HIGH INFERNO', color: 'from-[#F59E0B] to-[#F97316]', glow: 'shadow-[#F59E0B]/30' };
    if (days >= 7) return { title: 'IGNITED BUILDER', color: 'from-[#EAB308] to-[#F97316]', glow: 'shadow-[#EAB308]/20' };
    return { title: 'BUILD SPARK', color: 'from-[#38BDF8] to-[#F97316]', glow: 'shadow-[#38BDF8]/20' };
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
            ? 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:border-[#F97316]/40'
            : 'bg-gradient-to-r from-[#EA580C]/20 via-[#F97316]/10 to-[#8B5CF6]/15 border-[#F97316]/50 text-white shadow-lg hover:shadow-[#F97316]/30 hover:border-[#F97316]'
        }`}
        title="Click to view Streak Power & How Missed Days Work"
      >
        {/* Animated Background Pulse */}
        {!isMissedDay && (
          <span className="absolute inset-0 bg-gradient-to-r from-[#F97316]/20 to-[#8B5CF6]/20 rounded-xl animate-pulse opacity-50" />
        )}

        {/* Animated Spark Particles overlay */}
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping pointer-events-none"
            style={{ left: `${spark.x}px`, top: `${spark.y}px` }}
          />
        ))}

        {/* Flame Icon with Dynamic Flare */}
        <div className="relative z-10 flex items-center justify-center">
          <Flame
            className={`transition-transform duration-300 group-hover:scale-125 ${
              size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
            } ${
              isMissedDay
                ? 'text-[#64748B]'
                : 'text-[#F97316] filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-bounce'
            }`}
          />
          {!isMissedDay && (
            <Sparkles className="w-2.5 h-2.5 text-[#F59E0B] absolute -top-1 -right-1 animate-spin" />
          )}
        </div>

        {/* Streak Days Count Badge */}
        {showLabel && (
          <div className="relative z-10 flex items-center gap-1 font-mono">
            <span className={`font-black ${size === 'lg' ? 'text-lg' : 'text-xs'} ${isMissedDay ? 'text-[#94A3B8]' : 'text-[#F97316]'}`}>
              {isMissedDay ? 'PAUSED' : `${streak}d`}
            </span>
            <span className="text-[9px] text-[#94A3B8] group-hover:text-white uppercase font-bold transition-colors">
              STREAK
            </span>
          </div>
        )}
      </button>

      {/* INTERACTIVE STREAK & MISSED DAY EXPLANATION MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-sm w-full p-4 sm:p-5 space-y-4 shadow-2xl relative overflow-hidden font-sans">
            
            {/* Header & Close Button */}
            <div className="flex items-start justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EF4444] text-white shadow-md shadow-[#F97316]/30">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-white uppercase tracking-tight">
                    {flameTier.title}
                  </h3>
                  <p className="text-[10px] font-mono text-[#38BDF8]">
                    ABTALKS STREAK ENGINE
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-[#050A18] border border-[#1E293B] hover:border-[#38BDF8]/40 text-[#94A3B8] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TAB SELECTOR: STREAK STATS vs HOW MISSED DAYS WORK */}
            <div className="flex bg-[#050A18] p-1 rounded-xl border border-[#1E293B] text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('streak')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'streak'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                🔥 STREAK POWER
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('missed_day')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'missed_day'
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                ❓ MISSED A DAY?
              </button>
            </div>

            {/* TAB 1: STREAK POWER & STATS */}
            {activeTab === 'streak' && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 text-center space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                    CURRENT PUBLIC STREAK
                  </span>
                  <div className="text-3xl font-black font-display text-[#F97316] tracking-tight">
                    {student.streak} <span className="text-xs font-mono font-normal text-white">DAYS</span>
                  </div>
                  <p className="text-[11px] text-[#CBD5E1]">
                    {student.completedBuilds} out of 60 total builds shipped to public record.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Flame Tier:</span>
                    <span className="text-white font-bold">{flameTier.title}</span>
                  </div>
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>GitHub Proofs:</span>
                    <span className="text-[#38BDF8] font-bold">{student.githubProofs} verified</span>
                  </div>
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>LinkedIn Proofs:</span>
                    <span className="text-[#A78BFA] font-bold">{student.linkedinProofs} verified</span>
                  </div>
                </div>

                <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-xl p-2.5 text-[11px] text-[#A78BFA] leading-tight">
                  ⚡ <strong>Streak Rule:</strong> Build and post proof every day before 11:59 PM to increase your streak and public proof record.
                </div>
              </div>
            )}

            {/* TAB 2: EXPLAINING "MISSED A DAY HOW" & BUILD RESCUE */}
            {activeTab === 'missed_day' && (
              <div className="space-y-3 animate-fade-in text-xs font-sans">
                <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#F97316]">
                    <Zap className="w-4 h-4 text-[#F97316]" />
                    <span>WHAT HAPPENS WHEN YOU MISS A DAY?</span>
                  </div>

                  <p className="text-[#CBD5E1] text-[11px] leading-relaxed">
                    If real college life gets in the way and you miss a day, ABTalks <strong>never resets your entire 60-day journey to zero</strong>.
                  </p>

                  <div className="space-y-2 pt-1 font-mono text-[11px]">
                    <div className="flex items-start gap-2 text-[#CBD5E1]">
                      <span className="text-[#38BDF8] font-bold">1.</span>
                      <span><strong>Run Paused:</strong> Your previous builds remain preserved and safe in your vault.</span>
                    </div>

                    <div className="flex items-start gap-2 text-[#CBD5E1]">
                      <span className="text-[#F97316] font-bold">2.</span>
                      <span><strong>Build Rescue Triggers:</strong> The system offers an 18-minute <em>Core Scope Mission</em>.</span>
                    </div>

                    <div className="flex items-start gap-2 text-[#CBD5E1]">
                      <span className="text-[#34D399] font-bold">3.</span>
                      <span><strong>Streak Rescued:</strong> Ship the core requirement to resume your run immediately!</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#064E3B]/30 border border-[#10B981]/40 rounded-xl p-2.5 text-[11px] text-[#34D399] font-mono leading-tight flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                  <span>Your public record remains 100% truthful, noting Core Shipped while protecting your momentum.</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono font-bold text-xs cursor-pointer transition-all shadow-md shadow-[#8B5CF6]/30"
            >
              GOT IT · KEEP BUILDING
            </button>
          </div>
        </div>
      )}
    </>
  );
};
