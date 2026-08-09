import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter } from 'lucide-react';
import { StudentProfile } from '../../types';
import { CHALLENGES } from '../../data/challenges';

interface BuildJourneyProps {
  student: StudentProfile; 
}

export const BuildJourney: React.FC<BuildJourneyProps> = ({ student }) => {
  const [viewMode, setViewMode] = useState<'current' | 'all'>('current');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const totalDays = 60;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const displayDays = viewMode === 'current'
    ? daysArray.slice(Math.max(0, student.currentDay - 7), Math.min(60, student.currentDay + 8))
    : daysArray;

  const isMissedDayState = student.stateMode === 'missed_day';

  return (
    <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 sm:p-5 select-none space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest block">
            BUILD TRAIL
          </span>
          <h3 className="text-xs font-black font-display text-[#F1EEE7] tracking-wider uppercase">
            YOUR 60-DAY JOURNEY
          </h3>
        </div>

        <button
          onClick={() => setViewMode(viewMode === 'current' ? 'all' : 'current')}
          className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#A6AAA8] hover:text-[#F1EEE7] bg-[#090B0D] border border-[#252C2E] px-2.5 py-1 rounded-lg transition-colors cursor-pointer uppercase"
        >
          <Filter className="w-3 h-3 text-[#69B39A]" />
          <span>{viewMode === 'current' ? 'ALL 60' : 'ACTIVE'}</span>
        </button>
      </div>

      <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center min-w-max gap-1 py-1">
          {displayDays.map((day, idx) => {
            const proof = student.proofs[day];
            const isCompleted = day < student.currentDay || !!proof?.shipped;
            const isCoreShipped = proof?.shippedType === 'core';
            const isCurrent = day === student.currentDay;
            const isMissed = isMissedDayState && day === (student.currentDay - 1) && !proof?.shipped;
            const challenge = CHALLENGES[day];

            return (
              <React.Fragment key={day}>
                {idx > 0 && (
                  <div 
                    className={`h-[2px] w-3.5 transition-colors ${
                      isCompleted 
                        ? 'bg-[#69B39A]' 
                        : isMissed
                        ? 'bg-[#C58A52]/50'
                        : isCurrent 
                        ? 'bg-[#69B39A]/50' 
                        : 'bg-[#252C2E]'
                    }`} 
                  />
                )}

                <button
                  onClick={() => setSelectedDay(day)}
                  className={`relative flex items-center justify-center transition-all cursor-pointer group active:scale-95 ${
                    isCurrent 
                      ? 'w-7 h-7 rounded-full bg-[#69B39A] text-[#090B0D] font-black text-xs ring-4 ring-[#69B39A]/30 shadow-lg' 
                      : isMissed
                      ? 'w-6 h-6 rounded-full bg-[#090B0D] border-2 border-[#C58A52] text-[#C58A52] text-[10px] font-bold'
                      : isCoreShipped
                      ? 'w-6 h-6 rounded-full bg-[#191F21] border border-[#69B39A] text-[#69B39A] text-[10px] font-bold'
                      : isCompleted
                      ? 'w-6 h-6 rounded-full bg-[#191F21] border border-[#69B39A] text-[#69B39A] text-[10px] font-bold'
                      : 'w-6 h-6 rounded-full bg-[#090B0D] border border-[#252C2E] text-[#6F7575] text-[10px] hover:border-[#69B39A]/40'
                  }`}
                  title={`Day ${day}: ${challenge?.title || 'Challenge'}`}
                >
                  {isCurrent ? (
                    <span>◉</span>
                  ) : isCoreShipped ? (
                    <span className="text-[10px]">◐</span>
                  ) : isCompleted ? (
                    <span>✓</span>
                  ) : isMissed ? (
                    <span className="text-[9px]">!</span>
                  ) : (
                    <span>○</span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="p-3 bg-[#090B0D] border border-[#252C2E] rounded-xl flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#69B39A]">DAY {selectedDay}</span>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                student.proofs[selectedDay]?.shippedType === 'core'
                  ? 'bg-[#191F21] border-[#69B39A] text-[#69B39A]'
                  : selectedDay < student.currentDay || !!student.proofs[selectedDay]?.shipped
                  ? 'bg-[#191F21] border-[#69B39A] text-[#69B39A]'
                  : selectedDay === student.currentDay
                  ? 'bg-[#69B39A] text-[#090B0D] font-bold'
                  : 'bg-[#090B0D] border-[#252C2E] text-[#6F7575]'
              }`}>
                {student.proofs[selectedDay]?.shippedType === 'core'
                  ? "CORE SHIPPED"
                  : selectedDay < student.currentDay || !!student.proofs[selectedDay]?.shipped
                  ? "FULL BUILD"
                  : selectedDay === student.currentDay
                  ? "ACTIVE TODAY"
                  : "UPCOMING"}
              </span>
            </div>
            <p className="font-bold text-xs text-[#F1EEE7] mt-1 truncate">
              {CHALLENGES[selectedDay]?.title || `Challenge #${selectedDay}`}
            </p>
          </div>

          <Link
            to={`/day/${selectedDay}`}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#69B39A] hover:bg-[#69B39A]/90 text-[#090B0D] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
};
