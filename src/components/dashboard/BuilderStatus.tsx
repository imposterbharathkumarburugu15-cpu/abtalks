import React, { useState } from 'react';
import { StudentProfile, TrackType } from '../../types';
import { getTimeGreeting } from '../../utils/timeGreeting';
import { TRACK_OPTIONS } from '../../data/challenges';
import { updateStudentTrack, updateStudentName } from '../../utils/storage';
import { Edit3, Moon } from 'lucide-react';
import { StreakFlameInteractive } from '../shared/StreakFlameInteractive';
import { ABMascot } from '../shared/ABMascot';

interface BuilderStatusProps {
  student: StudentProfile;
  onStudentUpdate: (updated: StudentProfile) => void;
  isNightShift?: boolean;
}

export const BuilderStatus: React.FC<BuilderStatusProps> = ({ student, onStudentUpdate, isNightShift }) => {
  const { greeting } = getTimeGreeting();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState(student.name);

  const handleTrackChange = (track: TrackType) => {
    const updated = updateStudentTrack(track);
    onStudentUpdate(updated);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      const updated = updateStudentName(nameInput.trim());
      onStudentUpdate(updated);
      setIsEditModalOpen(false);
    }
  };

  const isMissedDay = student.stateMode === 'missed_day';

  return (
    <section className="pt-2 pb-4 border-b border-[#1E293B] select-none relative">
      {/* Editorial Greeting Header with Mascot on Right */}
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#38BDF8] uppercase">
              BUILDER STATUS
            </span>
            {isNightShift && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-[#A78BFA] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-2 py-0.5 rounded-full">
                <Moon className="w-3 h-3 text-[#A78BFA]" />
                <span>NIGHT SHIFT</span>
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight leading-none">
            {isNightShift ? "ONE MORE BUILD," : greeting.toUpperCase() + ","} <span className="text-[#38BDF8]">{student.name.toUpperCase()}</span>.
          </h1>

          <div className="flex items-center gap-2 text-xs pt-0.5">
            <span className="font-mono text-[11px] font-bold text-[#A78BFA] bg-[#8B5CF6]/10 px-2 py-0.5 rounded border border-[#8B5CF6]/30 uppercase">
              {student.track}
            </span>
            <span className="text-[#475569]">•</span>
            <span className="text-[#94A3B8] font-medium">{student.college || 'IIT Madras'}</span>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1 rounded-lg bg-[#0F172A] border border-[#1E293B] hover:border-[#38BDF8]/50 text-[#94A3B8] hover:text-white transition-colors cursor-pointer ml-1"
              title="Edit Profile or Track"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 3D AB Mascot Graphic */}
        <div className="relative shrink-0">
          <ABMascot size={72} className="shadow-2xl shadow-[#8B5CF6]/30" />
        </div>
      </div>

      {/* Editorial Metric Banner (Asymmetric layout, high impact numbers) */}
      <div className="mt-3.5 pt-3.5 border-t border-[#1E293B]/70 flex items-stretch gap-4">
        {/* DAY NUMBER HIGHLIGHT */}
        <div className="flex-1 space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
            CHALLENGE PROGRESS
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight animate-number-entrance">
              DAY {student.currentDay}
            </span>
            <span className="text-xs font-mono font-bold text-[#64748B]">
              / 60
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#0F172A] rounded-full overflow-hidden border border-[#1E293B] mt-1">
            <div 
              className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#0284C7] rounded-full"
              style={{ width: `${(student.currentDay / 60) * 100}%` }}
            />
          </div>
        </div>

        {/* Thin Vertical Accent Divider */}
        <div className="w-[1px] bg-gradient-to-b from-[#1E293B] via-[#8B5CF6]/40 to-[#1E293B]" />

        {/* BUILD STREAK / RUN STATUS (INTERACTIVE FLAME LOGO & MISSED DAY INFO) */}
        <div className="flex-1 space-y-1 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
              {isMissedDay ? 'BUILD STATUS' : 'PUBLIC BUILD RUN'}
            </span>
            <span className="text-[9px] font-mono text-[#38BDF8] underline cursor-pointer">
              INFO
            </span>
          </div>

          <div className="flex items-center gap-2">
            <StreakFlameInteractive student={student} size="lg" showLabel={true} />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-white text-base">Edit Builder Profile</h3>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs text-[#94A3B8] font-mono block mb-1">Student Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#050A18] border border-[#1E293B] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="text-xs text-[#94A3B8] font-mono block mb-1">Select Track</label>
                <div className="grid grid-cols-2 gap-2">
                  {TRACK_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTrackChange(t)}
                      className={`p-2 rounded-xl text-xs font-medium border text-left transition-colors cursor-pointer ${
                        student.track === t
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white font-bold'
                          : 'bg-[#050A18] border-[#1E293B] text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl border border-[#8B5CF6] shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};


