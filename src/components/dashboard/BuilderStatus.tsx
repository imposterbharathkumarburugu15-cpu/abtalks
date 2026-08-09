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
    <section className="pt-2 pb-4 border-b border-[#252C2E] select-none relative font-sans">
      {/* Editorial Greeting Header with Mascot on Right */}
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#69B39A] uppercase">
              BUILDER STATUS
            </span>
            {isNightShift && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-[#718A96] bg-[#191F21] border border-[#252C2E] px-2 py-0.5 rounded-full">
                <Moon className="w-3 h-3 text-[#718A96]" />
                <span>NIGHT SHIFT</span>
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-black font-display text-[#F1EEE7] uppercase tracking-tight leading-none">
            {isNightShift ? "ONE MORE BUILD," : greeting.toUpperCase() + ","} <span className="text-[#69B39A]">{student.name.toUpperCase()}</span>.
          </h1>

          <div className="flex items-center gap-2 text-xs pt-0.5">
            <span className="font-mono text-[11px] font-bold text-[#69B39A] bg-[#191F21] px-2 py-0.5 rounded border border-[#252C2E] uppercase">
              {student.track}
            </span>
            <span className="text-[#252C2E]">•</span>
            <span className="text-[#A6AAA8] font-medium">{student.college || 'IIT Madras'}</span>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1 rounded-lg bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A]/50 text-[#A6AAA8] hover:text-[#F1EEE7] transition-colors cursor-pointer ml-1"
              title="Edit Profile or Track"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* AB Mascot */}
        <div className="relative shrink-0">
          <ABMascot size={64} />
        </div>
      </div>

      {/* Editorial Metric Banner */}
      <div className="mt-3.5 pt-3.5 border-t border-[#252C2E] flex items-stretch gap-4">
        {/* DAY NUMBER HIGHLIGHT */}
        <div className="flex-1 space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#A6AAA8] uppercase tracking-wider block">
            CHALLENGE PROGRESS
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black font-display text-[#F1EEE7] tracking-tight">
              DAY {student.currentDay}
            </span>
            <span className="text-xs font-mono font-bold text-[#6F7575]">
              / 60
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#090B0D] rounded-full overflow-hidden border border-[#252C2E] mt-1">
            <div 
              className="h-full bg-[#69B39A] rounded-full"
              style={{ width: `${(student.currentDay / 60) * 100}%` }}
            />
          </div>
        </div>

        {/* Thin Vertical Accent Divider */}
        <div className="w-[1px] bg-[#252C2E]" />

        {/* BUILD STREAK / RUN STATUS */}
        <div className="flex-1 space-y-1 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-mono font-bold text-[#A6AAA8] uppercase tracking-wider">
              {isMissedDay ? 'BUILD STATUS' : 'PUBLIC BUILD RUN'}
            </span>
            <span className="text-[9px] font-mono text-[#69B39A] underline cursor-pointer">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090B0D]/90 backdrop-blur-xs">
          <div className="bg-[#14191B] border border-[#252C2E] rounded-xl p-5 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="font-display font-bold text-[#F1EEE7] text-base">Edit Builder Profile</h3>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs text-[#A6AAA8] font-mono block mb-1">Student Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#090B0D] border border-[#252C2E] rounded-xl px-3 py-2 text-sm text-[#F1EEE7] focus:outline-none focus:border-[#69B39A]"
                />
              </div>

              <div>
                <label className="text-xs text-[#A6AAA8] font-mono block mb-1">Select Track</label>
                <div className="grid grid-cols-2 gap-2">
                  {TRACK_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTrackChange(t)}
                      className={`p-2 rounded-xl text-xs font-medium border text-left transition-colors cursor-pointer ${
                        student.track === t
                          ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7] font-bold'
                          : 'bg-[#090B0D] border-[#252C2E] text-[#A6AAA8] hover:text-[#F1EEE7]'
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
                  className="px-4 py-2 text-xs font-mono font-bold text-[#090B0D] bg-[#69B39A] hover:bg-[#69B39A]/90 rounded-xl cursor-pointer"
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



