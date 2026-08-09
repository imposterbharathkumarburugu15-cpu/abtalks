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

  // Filter for mobile window (15 day window around current day, or all 60)
  const displayDays = viewMode === 'current'
    ? daysArray.slice(Math.max(0, student.currentDay - 7), Math.min(60, student.currentDay + 8))
    : daysArray;

  const isMissedDayState = student.stateMode === 'missed_day';

  return (
    <section className="bg-card-midnight rounded-2xl p-4 sm:p-5 select-none space-y-3">
      {/* Editorial Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-black font-display text-white tracking-tight uppercase">
            YOUR 60-DAY JOURNEY
          </h3>
          <p className="text-xs font-mono font-bold text-[#38BDF8] mt-0.5">
            {student.completedBuilds} / 60 BUILDS SHIPPED
          </p>
        </div>

        <button
          onClick={() => setViewMode(viewMode === 'current' ? 'all' : 'current')}
          className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#94A3B8] hover:text-white bg-[#050A18] border border-[#1E293B] px-2.5 py-1 rounded-lg transition-colors cursor-pointer uppercase"
        >
          <Filter className="w-3 h-3 text-[#38BDF8]" />
          <span>{viewMode === 'current' ? 'ALL 60' : 'ACTIVE'}</span>
        </button>
      </div>

      {/* Signature Connected Build Trail */}
      <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3.5 overflow-x-auto no-scrollbar shadow-inner">
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
                {/* Connecting Trail Line */}
                {idx > 0 && (
                  <div 
                    className={`h-[2px] w-3.5 transition-colors ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8]' 
                        : isMissed
                        ? 'bg-[#F97316]/50'
                        : isCurrent 
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#1E293B]' 
                        : 'bg-[#1E293B]'
                    }`} 
                  />
                )}

                {/* Node */}
                <button
                  onClick={() => setSelectedDay(day)}
                  className={`relative flex items-center justify-center transition-all cursor-pointer group active:scale-95 ${
                    isCurrent 
                      ? 'w-7 h-7 rounded-full bg-[#8B5CF6] text-white font-black text-xs ring-4 ring-[#8B5CF6]/30 shadow-lg shadow-[#8B5CF6]/40 animate-violet-pulse' 
                      : isMissed
                      ? 'w-6 h-6 rounded-full bg-[#050A18] border-2 border-[#F97316] text-[#F97316] text-[10px] font-bold'
                      : isCoreShipped
                      ? 'w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6] text-[#A78BFA] text-[10px] font-bold'
                      : isCompleted
                      ? 'w-6 h-6 rounded-full bg-[#0284C7]/20 border border-[#38BDF8] text-[#38BDF8] text-[10px] font-bold'
                      : 'w-6 h-6 rounded-full bg-[#0F172A] border border-[#1E293B] text-[#64748B] text-[10px] hover:border-[#38BDF8]/40'
                  }`}
                  title={`Day ${day}: ${challenge?.title || 'Challenge'}${isCoreShipped ? ' (Core Shipped)' : ''}${isMissed ? ' (Missed Day)' : ''}`}
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

      {/* Selected Node Quick Preview Card */}
      {selectedDay && (
        <div className="p-3 bg-[#050A18] border border-[#1E293B] rounded-xl flex items-center justify-between gap-2 animate-fade-in">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#38BDF8]">DAY {selectedDay}</span>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                student.proofs[selectedDay]?.shippedType === 'core'
                  ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/50 text-[#A78BFA]'
                  : selectedDay < student.currentDay || !!student.proofs[selectedDay]?.shipped
                  ? 'bg-[#0284C7]/20 border-[#38BDF8]/50 text-[#38BDF8]'
                  : selectedDay === student.currentDay
                  ? 'bg-[#8B5CF6]/30 border-[#8B5CF6] text-white font-bold'
                  : 'bg-[#0F172A] border-[#1E293B] text-[#64748B]'
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
            <p className="font-bold text-xs text-white mt-1 truncate">
              {CHALLENGES[selectedDay]?.title || `Challenge #${selectedDay}`}
            </p>
          </div>

          <Link
            to={`/day/${selectedDay}`}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
          >
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
};


