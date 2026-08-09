import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { StudentProfile } from '../../types';
import { CHALLENGES } from '../../data/challenges';

interface RecentBuildsProps {
  student: StudentProfile;
}

export const RecentBuilds: React.FC<RecentBuildsProps> = ({ student }) => {
  const shippedDays = Object.keys(student.proofs)
    .map(Number)
    .sort((a, b) => b - a)
    .slice(0, 3);

  return (
    <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 sm:p-5 select-none space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest block">
            HISTORY
          </span>
          <h3 className="text-xs font-black font-display text-[#F1EEE7] tracking-wider uppercase">
            RECENT BUILDS
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#69B39A] bg-[#090B0D] px-2.5 py-1 rounded-lg border border-[#252C2E]">
          {student.completedBuilds} SHIPPED
        </span>
      </div>

      {shippedDays.length === 0 ? (
        <p className="text-xs font-mono text-[#A6AAA8] py-4 text-center border border-dashed border-[#252C2E] rounded-xl">
          No builds shipped yet. Enter your first mission!
        </p>
      ) : (
        <div className="divide-y divide-[#252C2E]">
          {shippedDays.map((dayNum) => {
            const challenge = CHALLENGES[dayNum];
            const isCore = student.proofs[dayNum]?.shippedType === 'core';
            return (
              <Link
                key={dayNum}
                to={`/day/${dayNum}`}
                className="py-2.5 flex items-center justify-between gap-3 group hover:bg-[#090B0D] hover:px-2 rounded-lg transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-black text-[#69B39A] bg-[#191F21] border border-[#252C2E] px-2 py-0.5 rounded shrink-0">
                    DAY {dayNum < 10 ? `0${dayNum}` : dayNum}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#F1EEE7] group-hover:text-[#69B39A] transition-colors truncate">
                      {challenge?.title || `Build #${dayNum}`}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isCore ? (
                    <span className="text-[9px] font-mono font-bold text-[#718A96] bg-[#191F21] border border-[#252C2E] px-1.5 py-0.5 rounded">
                      CORE
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-bold text-[#6FA889] bg-[#191F21] border border-[#252C2E] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" />
                      FULL
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-[#A6AAA8] group-hover:text-[#F1EEE7] transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
