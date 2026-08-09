import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SlidersHorizontal, Menu, X, Home, Zap, Compass, User, Sparkles } from 'lucide-react';
import { StudentProfile } from '../../types';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { DEMO_PRESETS } from '../../data/student';
import { switchDemoPreset } from '../../utils/storage';
import { ABMascot } from './ABMascot';
import { StreakFlameInteractive } from './StreakFlameInteractive';

interface HeaderProps {
  student: StudentProfile;
  onStudentUpdate: (updated: StudentProfile) => void;
}

export const Header: React.FC<HeaderProps> = ({ student, onStudentUpdate }) => {
  const location = useLocation();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectPreset = (presetId: string) => {
    const updated = switchDemoPreset(presetId);
    onStudentUpdate(updated);
    setIsDemoModalOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#090B0D]/95 backdrop-blur-md border-b border-[#252C2E] px-3.5 py-2.5">
        <div className="max-w-[390px] mx-auto flex items-center justify-between">
          {/* Logo with Mascot */}
          <Link to="/" className="flex items-center gap-2 group">
            <ABMascot size={32} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-sm tracking-tight text-[#F1EEE7] group-hover:text-[#69B39A] transition-colors">
                  ABTALKS
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#191F21] border border-[#252C2E] text-[#69B39A] uppercase">
                  PRO
                </span>
              </div>
              <span className="block text-[9px] font-mono text-[#718A96] font-bold tracking-widest -mt-0.5 uppercase">
                60 Days · 60 Builds
              </span>
            </div>
          </Link>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Streak Quick Indicator if on Dashboard */}
            {location.pathname === '/dashboard' && (
              <StreakFlameInteractive student={student} size="sm" showLabel={true} />
            )}

            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A]/40 text-[#A6AAA8] hover:text-[#F1EEE7] transition-all cursor-pointer active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-4 h-4 text-[#69B39A]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#090B0D]/95 backdrop-blur-md flex flex-col justify-between p-4 max-w-[390px] mx-auto animate-fade-in font-sans">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#252C2E]">
              <div className="flex items-center gap-2">
                <ABMascot size={32} />
                <div>
                  <span className="text-sm font-black text-[#F1EEE7] font-display">ABTALKS PRO</span>
                  <span className="block text-[10px] font-mono text-[#718A96]">BUILD COMMAND CENTER</span>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl bg-[#14191B] border border-[#252C2E] text-[#A6AAA8] hover:text-[#F1EEE7]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2 font-mono">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#14191B] border border-[#252C2E] text-[#F1EEE7] hover:border-[#69B39A]/50"
              >
                <Home className="w-4 h-4 text-[#69B39A]" />
                <span className="text-xs font-bold uppercase">Home Landing</span>
              </Link>

              <Link
                to={`/day/${student.currentDay || 12}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#14191B] border border-[#252C2E] text-[#F1EEE7] hover:border-[#C58A52]/50"
              >
                <Zap className="w-4 h-4 text-[#C58A52]" />
                <span className="text-xs font-bold uppercase">Today's Build (Day {student.currentDay || 12})</span>
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#14191B] border border-[#252C2E] text-[#F1EEE7] hover:border-[#6FA889]/50"
              >
                <Compass className="w-4 h-4 text-[#6FA889]" />
                <span className="text-xs font-bold uppercase">Build Journey</span>
              </Link>

              <Link
                to="/proofs"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#14191B] border border-[#252C2E] text-[#F1EEE7] hover:border-[#718A96]/50"
              >
                <User className="w-4 h-4 text-[#718A96]" />
                <span className="text-xs font-bold uppercase">Public Record Vault</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-[#252C2E]">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#191F21] border border-[#252C2E] text-[#A6AAA8] hover:text-[#F1EEE7] font-mono text-xs font-bold cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#69B39A]" />
                  <span>DEMO STATE EVALUATOR</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-[#C58A52]" />
              </button>
            </div>
          </div>

          <div className="text-center font-mono text-[10px] text-[#6F7575]">
            ABTALKS PRO · 60 DAYS · 60 BUILDS
          </div>
        </div>
      )}

      {/* Demo State Switcher Modal */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Hackathon Demo Evaluator"
        subtitle="Switch student states instantly to test all 6 modules in action."
      >
        <div className="space-y-3">
          <p className="text-xs text-[#A6AAA8] leading-relaxed">
            Select a state to see how the dashboard, streak, and contextual modules dynamically adapt for different student journey phases:
          </p>

          <div className="space-y-2">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  student.stateMode === preset.profile.stateMode
                    ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7] shadow-sm'
                    : 'bg-[#14191B] hover:bg-[#191F21] border-[#252C2E] text-[#A6AAA8]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#F1EEE7]">{preset.label}</span>
                    {student.stateMode === preset.profile.stateMode && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#69B39A]/15 text-[#69B39A] border border-[#69B39A]/30">ACTIVE</span>
                    )}
                  </div>
                  <p className="text-xs text-[#A6AAA8] mt-1">{preset.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#252C2E] flex justify-end">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#A6AAA8] hover:text-[#F1EEE7]"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};


