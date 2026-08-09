import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { StudentProfile } from '../types';
import { CHALLENGES } from '../data/challenges';
import { shipBuild } from '../utils/storage';
import { BuilderStatus } from '../components/dashboard/BuilderStatus';
import { TonightBuild } from '../components/dashboard/TonightBuild';
import { BuildJourney } from '../components/dashboard/BuildJourney';
import { PublicRecord } from '../components/dashboard/PublicRecord';
import { RecentBuilds } from '../components/dashboard/RecentBuilds';
import { NextContext } from '../components/dashboard/NextContext';
import { Sliders } from 'lucide-react';
import { useNightShift } from '../hooks/useNightShift';

interface DashboardPageProps {
  student: StudentProfile;
  onStudentUpdate: (updated: StudentProfile) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ student, onStudentUpdate }) => {
  // Auto time check via hook (Night Shift active automatically between 9:00 PM and 5:00 AM)
  const isNightByTime = useNightShift();

  // Demo override state for hackathon judges
  const [demoState, setDemoState] = useState<'auto' | 'normal' | 'night_shift' | 'build_rescue' | 'missed_day' | 'completed'>('auto');
  const [showDemoBar, setShowDemoBar] = useState(false);

  // Focus Mode state logic inside DashboardPage
  const [inFocusMode, setInFocusMode] = useState(false);
  const [focusSeconds, setFocusSeconds] = useState(35 * 60);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [focusModeType, setFocusModeType] = useState<'full' | 'core'>('full');

  // Focus Mode Countdown Timer Interval
  useEffect(() => {
    let interval: any = null;
    if (inFocusMode && !isFocusPaused && focusSeconds > 0) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0 && inFocusMode) {
      setIsFocusPaused(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inFocusMode, isFocusPaused, focusSeconds]);

  const handleStartFocus = (type: 'full' | 'core' = 'full') => {
    setFocusModeType(type);
    setFocusSeconds(type === 'core' ? 18 * 60 : 35 * 60);
    setInFocusMode(true);
    setIsFocusPaused(false);
  };

  const handlePauseFocus = () => {
    setIsFocusPaused(true);
  };

  const handleResumeFocus = () => {
    setIsFocusPaused(false);
  };

  const handleExitFocus = () => {
    setInFocusMode(false);
    setIsFocusPaused(false);
  };

  // Derive active conditions
  const isNightShift = demoState === 'night_shift' || (demoState === 'auto' && isNightByTime);
  const isRescueMode = demoState === 'build_rescue';

  // Compute active student profile based on demo state override
  const activeStudent: StudentProfile = React.useMemo(() => {
    if (demoState === 'missed_day') {
      return {
        ...student,
        currentDay: 12,
        streak: 0,
        completedBuilds: 11,
        stateMode: 'missed_day'
      };
    }
    if (demoState === 'completed') {
      return {
        ...student,
        currentDay: 60,
        streak: 60,
        completedBuilds: 60,
        stateMode: 'completed'
      };
    }
    if (demoState === 'normal') {
      return {
        ...student,
        stateMode: 'normal'
      };
    }
    return student;
  }, [student, demoState]);

  const currentDay = activeStudent.currentDay || 12;
  const currentChallenge = CHALLENGES[currentDay] || CHALLENGES[12];
  const isCurrentDayShipped = !!activeStudent.proofs[currentDay]?.shipped;

  const handleShipBuildFromDashboard = (shippedType: 'full' | 'core') => {
    const updated = shipBuild(
      currentDay,
      currentChallenge.title,
      activeStudent.track,
      `https://github.com/${activeStudent.name.toLowerCase()}/day${currentDay}-${shippedType}`,
      `https://linkedin.com/posts/${activeStudent.name.toLowerCase()}_day${currentDay}`,
      shippedType
    );
    onStudentUpdate(updated);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-28 pt-3 px-3 sm:px-4 max-w-md mx-auto space-y-4 relative"
    >
      {/* MODULE 01: Builder Status + Build Run */}
      <motion.div variants={itemVariants}>
        <BuilderStatus
          student={activeStudent}
          onStudentUpdate={onStudentUpdate}
          isNightShift={isNightShift}
        />
      </motion.div>

      {/* MODULE 02: Tonight's Build (HERO MODULE with Focus Mode & Build Rescue) */}
      <motion.div variants={itemVariants}>
        <TonightBuild
          challenge={currentChallenge}
          isCompleted={isCurrentDayShipped}
          shippedType={activeStudent.proofs[currentDay]?.shippedType || 'full'}
          isNightShift={isNightShift}
          isRescueMode={isRescueMode}
          onShipBuild={handleShipBuildFromDashboard}
          inFocusMode={inFocusMode}
          focusSeconds={focusSeconds}
          isFocusPaused={isFocusPaused}
          focusModeType={focusModeType}
          onStartFocus={handleStartFocus}
          onPauseFocus={handlePauseFocus}
          onResumeFocus={handleResumeFocus}
          onExitFocus={handleExitFocus}
        />
      </motion.div>

      {/* MODULE 03: Build Journey (Signature 60-day Trail) */}
      <motion.div variants={itemVariants}>
        <BuildJourney student={activeStudent} />
      </motion.div>

      {/* MODULE 04: Public Record / Proof of Work */}
      <motion.div variants={itemVariants}>
        <PublicRecord student={activeStudent} />
      </motion.div>

      {/* MODULE 05: Recent Builds */}
      <motion.div variants={itemVariants}>
        <RecentBuilds student={activeStudent} />
      </motion.div>

      {/* MODULE 06: Next / Context (Adapts based on student condition) */}
      <motion.div variants={itemVariants}>
        <NextContext student={activeStudent} />
      </motion.div>

      {/* DISCREET DEMO STATE CONTROLLER FOR HACKATHON EVALUATION */}
      <motion.div variants={itemVariants} className="pt-2">
        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-2.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-2 font-mono">
            <div className="flex items-center gap-1.5 font-bold text-white uppercase">
              <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Demo State Switcher</span>
            </div>
            <button
              onClick={() => setShowDemoBar(!showDemoBar)}
              className="text-[10px] text-[#38BDF8] hover:text-white underline cursor-pointer uppercase"
            >
              {showDemoBar ? 'Hide' : 'Test states'}
            </button>
          </div>

          {showDemoBar && (
            <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] font-mono">
              <button
                onClick={() => setDemoState('normal')}
                className={`px-2 py-1.5 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                  demoState === 'normal'
                    ? 'bg-[#8B5CF6]/30 border-[#8B5CF6] text-white shadow-sm'
                    : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white'
                }`}
              >
                Normal
              </button>

              <button
                onClick={() => setDemoState('night_shift')}
                className={`px-2 py-1.5 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                  demoState === 'night_shift'
                    ? 'bg-[#8B5CF6]/30 border-[#8B5CF6] text-white shadow-sm'
                    : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white'
                }`}
              >
                Night Shift
              </button>

              <button
                onClick={() => setDemoState('build_rescue')}
                className={`px-2 py-1.5 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                  demoState === 'build_rescue'
                    ? 'bg-[#F97316]/30 border-[#F97316] text-[#F97316] shadow-sm'
                    : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white'
                }`}
              >
                Rescue
              </button>

              <button
                onClick={() => setDemoState('missed_day')}
                className={`px-2 py-1.5 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                  demoState === 'missed_day'
                    ? 'bg-[#F97316]/30 border-[#F97316] text-[#F97316] shadow-sm'
                    : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white'
                }`}
              >
                Missed Day
              </button>

              <button
                onClick={() => setDemoState('completed')}
                className={`px-2 py-1.5 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                  demoState === 'completed'
                    ? 'bg-[#8B5CF6]/30 border-[#8B5CF6] text-white shadow-sm'
                    : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-white'
                }`}
              >
                Legend 60
              </button>

              <button
                onClick={() => setDemoState('auto')}
                className={`px-2 py-1.5 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                  demoState === 'auto'
                    ? 'bg-[#0284C7]/30 border-[#38BDF8] text-white shadow-sm'
                    : 'bg-[#0F172A] border-[#1E293B] text-[#64748B]'
                }`}
              >
                Auto (Time)
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

