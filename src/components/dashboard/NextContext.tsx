import React from 'react';
import { Link } from 'react-router-dom';
import { FastForward, ChevronRight } from 'lucide-react';
import { StudentProfile } from '../../types';
import { CHALLENGES } from '../../data/challenges';

interface NextContextProps {
  student: StudentProfile;
}

export const NextContext: React.FC<NextContextProps> = ({ student }) => {
  const nextMilestoneTarget = Math.ceil((student.completedBuilds + 1) / 15) * 15 || 15;
  const buildsRemainingForMilestone = Math.max(0, nextMilestoneTarget - student.completedBuilds);

  const tomorrowDay = Math.min(60, student.currentDay + 1);
  const upcomingDay = Math.min(60, student.currentDay + 2);

  const tomorrowChallenge = CHALLENGES[tomorrowDay];
  const upcomingChallenge = CHALLENGES[upcomingDay];

  const isCompletedAll = student.completedBuilds >= 60;

  return (
    <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 sm:p-5 select-none space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
        <div className="flex items-center gap-2">
          <FastForward className="w-4 h-4 text-[#69B39A]" />
          <h3 className="text-xs font-black font-display text-[#F1EEE7] tracking-wider uppercase">
            UPCOMING SEQUENCE
          </h3>
        </div>

        <span className="text-[10px] font-mono font-bold text-[#718A96] bg-[#090B0D] px-2.5 py-0.5 rounded border border-[#252C2E]">
          FORWARD MOMENTUM
        </span>
      </div>

      <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 space-y-2 font-mono">
        {/* Tomorrow */}
        <Link 
          to={`/day/${tomorrowDay}`}
          className="flex items-center justify-between p-2 rounded-lg bg-[#191F21] border border-[#252C2E] hover:border-[#69B39A]/40 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[9px] font-bold text-[#69B39A] bg-[#14191B] border border-[#252C2E] px-1.5 py-0.5 rounded shrink-0">
              TOMORROW · DAY {tomorrowDay}
            </span>
            <span className="text-xs font-bold text-[#F1EEE7] group-hover:text-[#69B39A] transition-colors truncate">
              {tomorrowChallenge?.title || 'Markdown README Generator'}
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#A6AAA8] group-hover:text-[#F1EEE7] shrink-0" />
        </Link>

        {/* Upcoming */}
        <Link 
          to={`/day/${upcomingDay}`}
          className="flex items-center justify-between p-2 rounded-lg bg-[#191F21]/50 border border-[#252C2E]/60 hover:border-[#69B39A]/30 transition-all group opacity-80 hover:opacity-100"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[9px] font-bold text-[#A6AAA8] bg-[#090B0D] px-1.5 py-0.5 rounded shrink-0">
              UPCOMING · DAY {upcomingDay}
            </span>
            <span className="text-xs font-bold text-[#A6AAA8] group-hover:text-[#69B39A] transition-colors truncate">
              {upcomingChallenge?.title || 'REST API Mock Engine'}
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#A6AAA8] group-hover:text-[#F1EEE7] shrink-0" />
        </Link>
      </div>

      {!isCompletedAll && (
        <div className="pt-1 flex items-center justify-between text-xs font-mono">
          <span className="text-[#A6AAA8]">
            NEXT MILESTONE: <strong className="text-[#F1EEE7]">{nextMilestoneTarget} BUILDS</strong>
          </span>
          <span className="text-[#69B39A] font-bold">
            {buildsRemainingForMilestone} TO GO →
          </span>
        </div>
      )}
    </section>
  );
};
