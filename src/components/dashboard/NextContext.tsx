import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, AlertCircle, Rocket, FastForward, ChevronRight } from 'lucide-react';
import { StudentProfile } from '../../types';
import { CHALLENGES } from '../../data/challenges';

interface NextContextProps {
  student: StudentProfile;
}

export const NextContext: React.FC<NextContextProps> = ({ student }) => {
  // Calculate next milestone (e.g. 15, 30, 45, 60)
  const nextMilestoneTarget = Math.ceil((student.completedBuilds + 1) / 15) * 15 || 15;
  const buildsRemainingForMilestone = Math.max(0, nextMilestoneTarget - student.completedBuilds);

  // Determine upcoming days
  const tomorrowDay = Math.min(60, student.currentDay + 1);
  const upcomingDay = Math.min(60, student.currentDay + 2);

  const tomorrowChallenge = CHALLENGES[tomorrowDay];
  const upcomingChallenge = CHALLENGES[upcomingDay];

  // Determine state
  const isFirstDay = student.currentDay === 1 && student.completedBuilds === 0;
  const isMissedDay = student.stateMode === 'missed_day' || (student.streak === 0 && student.completedBuilds > 0);
  const isCompletedAll = student.completedBuilds >= 60;

  return (
    <section className="bg-card-midnight rounded-2xl p-4 sm:p-5 select-none space-y-3">
      {/* Editorial Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FastForward className="w-4 h-4 text-[#38BDF8]" />
          <h3 className="text-sm sm:text-base font-black font-display text-white tracking-tight uppercase">
            UPCOMING SEQUENCE
          </h3>
        </div>

        <span className="text-[10px] font-mono font-bold text-[#A78BFA] bg-[#050A18] px-2.5 py-0.5 rounded border border-[#1E293B]">
          FORWARD MOMENTUM
        </span>
      </div>

      {/* Continuous Build Sequence Timeline */}
      <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 space-y-2 font-mono">
        {/* Tomorrow */}
        <Link 
          to={`/day/${tomorrowDay}`}
          className="flex items-center justify-between p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[9px] font-bold text-[#38BDF8] bg-[#0284C7]/20 border border-[#38BDF8]/40 px-1.5 py-0.5 rounded shrink-0">
              TOMORROW · DAY {tomorrowDay}
            </span>
            <span className="text-xs font-bold text-white group-hover:text-[#38BDF8] transition-colors truncate">
              {tomorrowChallenge?.title || 'Markdown README Generator'}
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white shrink-0" />
        </Link>

        {/* Upcoming */}
        <Link 
          to={`/day/${upcomingDay}`}
          className="flex items-center justify-between p-2 rounded-lg bg-[#0F172A]/50 border border-[#1E293B]/60 hover:border-[#38BDF8]/30 transition-all group opacity-80 hover:opacity-100"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[9px] font-bold text-[#94A3B8] bg-[#1E293B] px-1.5 py-0.5 rounded shrink-0">
              UPCOMING · DAY {upcomingDay}
            </span>
            <span className="text-xs font-bold text-[#CBD5E1] group-hover:text-[#38BDF8] transition-colors truncate">
              {upcomingChallenge?.title || 'REST API Mock Engine'}
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white shrink-0" />
        </Link>
      </div>

      {/* Milestone Footer */}
      {!isCompletedAll && (
        <div className="pt-1 flex items-center justify-between text-xs font-mono">
          <span className="text-[#94A3B8]">
            NEXT MILESTONE: <strong className="text-white">{nextMilestoneTarget} BUILDS</strong>
          </span>
          <span className="text-[#38BDF8] font-bold">
            {buildsRemainingForMilestone} TO GO →
          </span>
        </div>
      )}
    </section>
  );
};


