import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Box, Flag, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../../types';
import { CHALLENGES } from '../../data/challenges';

interface YourBuildRecordProps {
  student: StudentProfile;
  compact?: boolean;
}

export const YourBuildRecord: React.FC<YourBuildRecordProps> = ({ student, compact = false }) => {
  const currentDay = student.currentDay || 12;
  const completedBuilds = student.completedBuilds || 11;
  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  const [activePhase, setActivePhase] = useState<number>(1); // Phase 1-4

  const selectedChallenge = CHALLENGES[selectedDay] || CHALLENGES[12];
  const isSelectedShipped = selectedDay <= completedBuilds;
  const isSelectedCurrent = selectedDay === currentDay;

  const progressPercent = Math.round((completedBuilds / 60) * 100);

  // 4 Engineering Phases
  const phases = [
    { id: 1, title: 'CORE MECHANICS', range: [1, 15], desc: 'Fundamentals, logic engines, local persistence' },
    { id: 2, title: 'APIS & MICROSERVICES', range: [16, 30], desc: 'REST, HTTP protocols, middleware & storage' },
    { id: 3, title: 'AI & VECTOR ENGINES', range: [31, 45], desc: 'Embeddings, similarity search, prompt pipelines' },
    { id: 4, title: 'DISTRIBUTED SYSTEMS', range: [46, 60], desc: 'Event streams, concurrency, edge architecture' }
  ];

  const currentPhaseConfig = phases.find(p => p.id === activePhase) || phases[0];
  const [startDay, endDay] = currentPhaseConfig.range;
  const phaseDays = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);

  return (
    <div className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-4 font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest block">
            BUILD TRAIL
          </span>
          <h2 className="text-xs font-black font-display text-[#F1EEE7] uppercase tracking-wider">
            YOUR BUILD RECORD
          </h2>
        </div>
        <div className="text-right font-mono">
          <span className="text-xs font-black text-[#69B39A]">{completedBuilds} / 60</span>
          <span className="text-[10px] text-[#A6AAA8] block uppercase">SHIPPED ({progressPercent}%)</span>
        </div>
      </div>

      {/* Engineering Progression Track Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#A6AAA8]">
          <span>START (DAY 01)</span>
          <span className="text-[#69B39A] font-bold">ACTIVE: DAY {currentDay}</span>
          <span>MILESTONE (DAY 60)</span>
        </div>

        {/* Continuous Progression Rail */}
        <div className="relative h-2 bg-[#090B0D] rounded-full overflow-hidden border border-[#252C2E]">
          <div
            className="h-full bg-[#69B39A] transition-all duration-500 rounded-full"
            style={{ width: `${(completedBuilds / 60) * 100}%` }}
          />
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-4 gap-1 pt-1 font-mono text-[10px]">
        {phases.map((p) => {
          const isPhaseActive = activePhase === p.id;
          const isPhaseCurrent = currentDay >= p.range[0] && currentDay <= p.range[1];
          const phaseShipped = Math.max(0, Math.min(15, completedBuilds - (p.range[0] - 1)));

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setActivePhase(p.id);
                setSelectedDay(Math.min(currentDay, p.range[1]));
              }}
              className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isPhaseActive
                  ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7]'
                  : 'bg-[#090B0D] border-[#252C2E] text-[#A6AAA8] hover:border-[#69B39A]/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9px] text-[#69B39A]">P0{p.id}</span>
                {isPhaseCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#C58A52]" />}
              </div>
              <span className="text-[9px] truncate font-sans font-medium mt-1">
                Days {p.range[0]}-{p.range[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Phase Log Timeline Trail */}
      <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#252C2E] pb-2">
          <span className="font-bold text-[#F1EEE7] uppercase">{currentPhaseConfig.title}</span>
          <span className="text-[#A6AAA8]">{currentPhaseConfig.desc}</span>
        </div>

        {/* Timeline Trail Nodes */}
        <div className="space-y-1.5 pt-1">
          {phaseDays.map((dayNum) => {
            const isShipped = dayNum <= completedBuilds;
            const isCurrent = dayNum === currentDay;
            const isSelected = dayNum === selectedDay;
            const challenge = CHALLENGES[dayNum];

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => setSelectedDay(dayNum)}
                className={`w-full text-left p-2 rounded-lg transition-all cursor-pointer flex items-center justify-between gap-2.5 font-mono text-xs ${
                  isSelected
                    ? 'bg-[#191F21] border border-[#69B39A] text-[#F1EEE7]'
                    : 'bg-[#090B0D] hover:bg-[#14191B] border border-transparent hover:border-[#252C2E] text-[#A6AAA8]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {/* Status Indicator Node */}
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isShipped
                        ? 'bg-[#14191B] border border-[#69B39A]/60 text-[#69B39A]'
                        : isCurrent
                        ? 'bg-[#191F21] border border-[#C58A52] text-[#C58A52]'
                        : 'bg-[#14191B] border border-[#252C2E] text-[#6F7575]'
                    }`}
                  >
                    {isShipped ? '✓' : isCurrent ? '◉' : dayNum}
                  </span>

                  <span className="text-[11px] font-sans font-bold text-[#F1EEE7] truncate">
                    {challenge?.title || `Build #${dayNum}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-[10px]">
                  {isShipped && (
                    <span className="text-[#6FA889] bg-[#14191B] px-2 py-0.5 rounded border border-[#252C2E] font-bold">
                      SHIPPED
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[#C58A52] bg-[#191F21] px-2 py-0.5 rounded border border-[#C58A52]/40 font-bold">
                      MISSION
                    </span>
                  )}
                  {!isShipped && !isCurrent && (
                    <span className="text-[#6F7575]">LOCKED</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Inspector Box */}
      {selectedChallenge && (
        <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 flex items-center justify-between gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#14191B] border border-[#252C2E] text-[#69B39A]">
                DAY {selectedDay}
              </span>
              {isSelectedShipped && (
                <span className="text-[9px] font-mono font-bold text-[#6FA889] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#6FA889]" />
                  SHIPPED ✓
                </span>
              )}
              {isSelectedCurrent && (
                <span className="text-[9px] font-mono font-bold text-[#C58A52] uppercase">
                  ● TONIGHT'S MISSION
                </span>
              )}
            </div>
            <h3 className="text-xs font-bold text-[#F1EEE7] font-display uppercase tracking-wide truncate">
              {selectedChallenge.title}
            </h3>
          </div>

          <Link
            to={`/day/${selectedDay}`}
            className="px-3 py-1.5 rounded-lg bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A] text-[#F1EEE7] text-xs font-mono font-bold flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>INSPECT</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#69B39A]" />
          </Link>
        </div>
      )}
    </div>
  );
};
