import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { StudentProfile } from '../../types';
import { CHALLENGES } from '../../data/challenges';

interface RecentBuildsProps {
  student: StudentProfile;
}

export const RecentBuilds: React.FC<RecentBuildsProps> = ({ student }) => {
  // Get recent 3 completed days
  const shippedDays = Object.keys(student.proofs)
    .map(Number)
    .sort((a, b) => b - a)
    .slice(0, 3);

  return (
    <section className="bg-card-midnight rounded-2xl p-4 sm:p-5 select-none space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-black font-display text-white tracking-tight uppercase">
            RECENT BUILDS
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Your most recently shipped projects
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#38BDF8] bg-[#050A18] px-2.5 py-1 rounded-lg border border-[#1E293B]">
          {student.completedBuilds} SHIPPED
        </span>
      </div>

      {shippedDays.length === 0 ? (
        <p className="text-xs font-mono text-[#64748B] py-4 text-center border border-dashed border-[#1E293B] rounded-xl">
          No builds shipped yet. Enter your first mission!
        </p>
      ) : (
        <div className="divide-y divide-[#1E293B]">
          {shippedDays.map((dayNum) => {
            const challenge = CHALLENGES[dayNum];
            const isCore = student.proofs[dayNum]?.shippedType === 'core';
            return (
              <Link
                key={dayNum}
                to={`/day/${dayNum}`}
                className="py-2.5 flex items-center justify-between gap-3 group hover:bg-[#050A18] hover:px-2 rounded-lg transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-black text-[#38BDF8] bg-[#0284C7]/15 border border-[#38BDF8]/30 px-2 py-0.5 rounded shrink-0">
                    DAY {dayNum < 10 ? `0${dayNum}` : dayNum}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#38BDF8] transition-colors truncate">
                      {challenge?.title || `Build #${dayNum}`}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isCore ? (
                    <span className="text-[9px] font-mono font-bold text-[#A78BFA] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-1.5 py-0.5 rounded">
                      CORE
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-bold text-[#34D399] bg-[#064E3B]/40 border border-[#10B981]/50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" />
                      FULL
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};


