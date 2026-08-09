import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Flame,
  Code2,
  Calendar,
  CloudUpload,
  Database,
  Box,
  TrendingUp,
} from 'lucide-react';
import { StudentProfile, TrackType } from '../types';
import { TRACK_OPTIONS } from '../data/challenges';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { updateStudentName, updateStudentTrack } from '../utils/storage';
import { ABMascot } from '../components/shared/ABMascot';
import { YourBuildRecord } from '../components/shared/YourBuildRecord';

interface LandingPageProps {
  student: StudentProfile;
  onStudentUpdate: (updated: StudentProfile) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ student, onStudentUpdate }) => {
  const navigate = useNavigate();
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState(student.name || 'Bharath');
  const [selectedTrack, setSelectedTrack] = useState<TrackType>(student.track || 'AI / ML');

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateStudentName(nameInput.trim());
      const updated = updateStudentTrack(selectedTrack);
      onStudentUpdate(updated);
      setIsStartModalOpen(false);
      navigate('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#090B0D] text-[#F1EEE7] pb-28 px-3 sm:px-4 max-w-[390px] mx-auto select-none font-sans space-y-6"
    >
      
      {/* 1. HERO SECTION (REFINED TYPOGRAPHY & INCREASED BREATHING ROOM) */}
      <motion.section variants={itemVariants} className="text-center py-6 sm:py-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14191B] border border-[#252C2E] text-[#69B39A] font-mono text-[11px] font-bold">
          <Flame className="w-3.5 h-3.5 text-[#C58A52]" />
          <span>60-DAY CODING CHALLENGE</span>
        </div>

        {/* Reduced Hero Typography (~10% Smaller) */}
        <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-[#F1EEE7] uppercase leading-[1.15]">
          60 DAYS.<br />
          <span className="text-[#69B39A]">60 BUILDS.</span><br />
          PUBLIC PROOF.
        </h1>

        {/* Concise Supporting Copy */}
        <p className="text-xs text-[#A6AAA8] leading-relaxed max-w-xs mx-auto font-sans">
          Build something real every day. Prove it publicly. Create a record of what you can ship.
        </p>

        {/* Primary Teal CTA */}
        <div className="pt-2 space-y-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsStartModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#69B39A] hover:bg-[#69B39A]/90 text-[#090B0D] font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span>START YOUR 60-DAY JOURNEY →</span>
          </motion.button>

          <p className="text-[10px] font-mono text-[#6F7575]">
            No signup required · Instant demo environment
          </p>
        </div>
      </motion.section>

      {/* 2. WHY PUBLIC PROOF MATTERS (SUBTLE CARD LAYOUT) */}
      <motion.section variants={itemVariants} className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-3">
        <div className="border-b border-[#252C2E] pb-2">
          <span className="text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest block">
            THE ABTALKS METHOD
          </span>
          <h2 className="text-xs font-black font-display text-[#F1EEE7] uppercase tracking-wider">
            WHY PUBLIC PROOF MATTERS
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 font-sans">
          <div className="bg-[#090B0D] p-3 rounded-lg border border-[#252C2E]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EEE7]">
              <Calendar className="w-3.5 h-3.5 text-[#69B39A]" />
              <span>60 DAYS</span>
            </div>
            <p className="text-[10px] text-[#A6AAA8] font-mono">
              Daily shipping discipline.
            </p>
          </div>

          <div className="bg-[#090B0D] p-3 rounded-lg border border-[#252C2E]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EEE7]">
              <Code2 className="w-3.5 h-3.5 text-[#718A96]" />
              <span>60 BUILDS</span>
            </div>
            <p className="text-[10px] text-[#A6AAA8] font-mono">
              Production modules.
            </p>
          </div>

          <div className="bg-[#090B0D] p-3 rounded-lg border border-[#252C2E]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EEE7]">
              <CloudUpload className="w-3.5 h-3.5 text-[#C58A52]" />
              <span>PUBLIC PROOF</span>
            </div>
            <p className="text-[10px] text-[#A6AAA8] font-mono">
              GitHub + LinkedIn.
            </p>
          </div>

          <div className="bg-[#090B0D] p-3 rounded-lg border border-[#252C2E]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EEE7]">
              <Database className="w-3.5 h-3.5 text-[#6FA889]" />
              <span>ONE RECORD</span>
            </div>
            <p className="text-[10px] text-[#A6AAA8] font-mono">
              Immutable log.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. DAILY LOOP: BUILD → PROVE → CONTINUE (CONNECTED VERTICAL PIPELINE) */}
      <motion.section variants={itemVariants} className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-3.5">
        <div className="border-b border-[#252C2E] pb-2">
          <span className="text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest block">
            THE DAILY LOOP
          </span>
          <h2 className="text-xs font-black font-display text-[#F1EEE7] uppercase tracking-wider">
            BUILD → PROVE → CONTINUE
          </h2>
        </div>

        {/* Connected Vertical Pipeline */}
        <div className="relative pl-6 space-y-3 py-1">
          {/* Continuous Left Connecting Rail Line */}
          <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-[#252C2E]" />

          {/* 01 BUILD */}
          <div className="relative bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 flex items-center justify-between gap-2">
            {/* Left Node Marker */}
            <div className="absolute -left-6 w-3 h-3 rounded-full bg-[#69B39A] border-2 border-[#14191B]" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono font-bold text-[#69B39A] uppercase block">
                STEP 01
              </span>
              <h3 className="font-bold text-xs text-[#F1EEE7] uppercase font-display tracking-wide">
                BUILD
              </h3>
              <p className="text-[11px] text-[#A6AAA8] font-sans">
                Ship functional logic.
              </p>
            </div>
            <Box className="w-4 h-4 text-[#69B39A] shrink-0" />
          </div>

          {/* 02 PROVE */}
          <div className="relative bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 flex items-center justify-between gap-2">
            {/* Left Node Marker */}
            <div className="absolute -left-6 w-3 h-3 rounded-full bg-[#718A96] border-2 border-[#14191B]" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono font-bold text-[#718A96] uppercase block">
                STEP 02
              </span>
              <h3 className="font-bold text-xs text-[#F1EEE7] uppercase font-display tracking-wide">
                PROVE
              </h3>
              <p className="text-[11px] text-[#A6AAA8] font-sans">
                Commit & post evidence.
              </p>
            </div>
            <CloudUpload className="w-4 h-4 text-[#718A96] shrink-0" />
          </div>

          {/* 03 CONTINUE */}
          <div className="relative bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 flex items-center justify-between gap-2">
            {/* Left Node Marker */}
            <div className="absolute -left-6 w-3 h-3 rounded-full bg-[#6FA889] border-2 border-[#14191B]" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono font-bold text-[#6FA889] uppercase block">
                STEP 03
              </span>
              <h3 className="font-bold text-xs text-[#F1EEE7] uppercase font-display tracking-wide">
                CONTINUE
              </h3>
              <p className="text-[11px] text-[#A6AAA8] font-sans">
                Advance your build trail.
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-[#6FA889] shrink-0" />
          </div>
        </div>
      </motion.section>

      {/* 4. EDITORIAL BUILD RECORD */}
      <motion.section variants={itemVariants}>
        <YourBuildRecord student={student} />
      </motion.section>

      {/* 5. AB COACH COMPANION (CALM, CONTEXTUAL) */}
      <motion.div
        variants={itemVariants}
        onClick={() => window.dispatchEvent(new CustomEvent('open-abcoach'))}
        className="bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A]/60 rounded-xl p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ABMascot size={32} />
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs text-[#F1EEE7] font-display tracking-tight group-hover:text-[#69B39A] transition-colors">
                AB COACH
              </h3>
              <span className="text-[9px] font-mono text-[#69B39A] bg-[#191F21] px-1.5 py-0.2 rounded border border-[#252C2E] uppercase font-medium">
                AVAILABLE WHEN STUCK
              </span>
            </div>
            <p className="text-[11px] text-[#A6AAA8] leading-tight font-sans">
              Senior developer companion for guidance & code hints.
            </p>
          </div>
        </div>

        <div className="w-7 h-7 rounded-lg bg-[#090B0D] border border-[#252C2E] text-[#F1EEE7] flex items-center justify-center shrink-0 group-hover:border-[#69B39A] transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-[#69B39A]" />
        </div>
      </motion.div>

      {/* START JOURNEY MODAL */}
      <Modal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        title="Start Your 60-Day Challenge"
        subtitle="Set up your profile to enter your builder command center."
      >
        <form onSubmit={handleStartJourney} className="space-y-4 font-sans">
          <div>
            <label className="text-xs font-mono text-[#A6AAA8] block mb-1">Your First Name</label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Bharath"
              className="w-full bg-[#090B0D] border border-[#252C2E] rounded-xl px-3.5 py-2.5 text-xs text-[#F1EEE7] focus:outline-none focus:border-[#69B39A] font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#A6AAA8] block mb-1">Choose Your Track</label>
            <div className="space-y-2">
              {TRACK_OPTIONS.map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => setSelectedTrack(track)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-bold flex items-center justify-between cursor-pointer ${
                    selectedTrack === track
                      ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7]'
                      : 'bg-[#090B0D] border-[#252C2E] text-[#A6AAA8] hover:border-[#69B39A]/40'
                  }`}
                >
                  <span>{track}</span>
                  {selectedTrack === track && <span className="text-[#69B39A] font-mono text-[10px]">✓ SELECTED</span>}
                </button>
              ))}
            </div>
          </div>

          <Button variant="primary" size="lg" fullWidth type="submit">
            ENTER DASHBOARD →
          </Button>
        </form>
      </Modal>

    </motion.div>
  );
};
