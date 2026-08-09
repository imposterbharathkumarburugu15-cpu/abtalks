import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Flame,
  Github,
  Linkedin,
  ShieldCheck,
  Sparkles,
  Terminal,
  Moon,
  Zap,
  CheckCircle2,
  Code2,
  Target,
  Globe,
  Trophy,
  Box,
  CloudUpload,
  TrendingUp,
  Bot
} from 'lucide-react';
import { StudentProfile, TrackType } from '../types';
import { TRACK_OPTIONS } from '../data/challenges';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { updateStudentName, updateStudentTrack } from '../utils/storage';
import { ABMascot } from '../components/shared/ABMascot';

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
    hidden: { opacity: 0, y: 16 },
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
      className="min-h-screen bg-[#050A18] text-slate-200 pb-28 pt-2 px-3 sm:px-4 max-w-[390px] mx-auto select-none font-sans space-y-5"
    >
      
      {/* HERO SECTION */}
      <motion.section variants={itemVariants} className="text-center space-y-4 pt-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] font-mono text-[11px] font-bold shadow-sm"
        >
          <Flame className="w-3.5 h-3.5 text-[#F97316] animate-bounce" />
          <span>60-DAY CODING CHALLENGE</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white uppercase leading-[1.05]"
        >
          60 DAYS.<br />
          <span className="bg-gradient-to-r from-[#38BDF8] via-[#A78BFA] to-[#F97316] bg-clip-text text-transparent">
            60 BUILDS.
          </span><br />
          PUBLIC PROOF.
        </motion.h1>

        {/* Supporting Copy */}
        <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-xs mx-auto font-sans">
          Build something real every day for 60 days.
        </p>

        {/* Primary CTA */}
        <div className="pt-1 space-y-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsStartModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#2563EB] to-[#0284C7] text-white font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#8B5CF6]/30 transition-all cursor-pointer border border-[#38BDF8]/40"
          >
            <span>START YOUR 60-DAY JOURNEY</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>

          <p className="text-[10px] font-mono text-[#64748B]">
            No signup required • Instant local demo mode
          </p>
        </div>
      </motion.section>

      {/* 4-COLUMN STATS CARD */}
      <motion.div variants={itemVariants} className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-3.5 shadow-xl">
        <div className="grid grid-cols-4 divide-x divide-[#1E293B] text-center font-sans">
          {/* Stat 1 */}
          <div className="px-1 space-y-1">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto text-[#A78BFA]">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-base font-black font-display text-white">60</div>
            <div className="text-[10px] font-mono font-bold text-[#64748B]">Days</div>
          </div>

          {/* Stat 2 */}
          <div className="px-1 space-y-1">
            <div className="w-8 h-8 rounded-xl bg-[#0284C7]/15 border border-[#38BDF8]/30 flex items-center justify-center mx-auto text-[#38BDF8]">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-base font-black font-display text-white">60</div>
            <div className="text-[10px] font-mono font-bold text-[#64748B]">Builds</div>
          </div>

          {/* Stat 3 */}
          <div className="px-1 space-y-1">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto text-[#A78BFA]">
              <Globe className="w-4 h-4" />
            </div>
            <div className="text-base font-black font-display text-white">100%</div>
            <div className="text-[10px] font-mono font-bold text-[#64748B]">Public</div>
          </div>

          {/* Stat 4 */}
          <div className="px-1 space-y-1">
            <div className="w-8 h-8 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center mx-auto text-[#F97316]">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-base font-black font-display text-white">Real</div>
            <div className="text-[10px] font-mono font-bold text-[#64748B]">Proof</div>
          </div>
        </div>
      </motion.div>

      {/* HOW ABTALKS WORKS — THE 3-STEP DAILY LOOP */}
      <motion.section variants={itemVariants} className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-4 space-y-3.5 shadow-xl">
        <div className="text-center border-b border-[#1E293B] pb-2.5">
          <span className="text-[10px] font-mono font-bold text-[#38BDF8] uppercase tracking-widest block">
            HOW ABTALKS WORKS
          </span>
          <h2 className="text-sm font-black font-display text-white mt-0.5 uppercase tracking-wider">
            THE 3-STEP DAILY LOOP
          </h2>
        </div>

        <div className="relative space-y-3 pt-1">
          {/* Vertical connecting line */}
          <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-[#10B981] z-0 opacity-40" />

          {/* Step 01 */}
          <motion.div
            whileHover={{ x: 3, borderColor: 'rgba(56, 189, 248, 0.5)' }}
            className="relative z-10 bg-[#050A18] border border-[#1E293B] rounded-xl p-3 flex items-center justify-between gap-3 transition-colors"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="font-mono text-xs font-black text-[#38BDF8] bg-[#0284C7]/20 border border-[#38BDF8]/40 px-2 py-1 rounded-lg shrink-0">
                01
              </span>
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-black text-xs text-white uppercase font-display tracking-wider flex items-center gap-1">
                  <span>BUILD</span>
                  <span className="text-[#38BDF8] font-mono text-[10px] font-bold">&gt;_</span>
                </h3>
                <p className="text-[11px] text-[#94A3B8] leading-tight">
                  Ship one real engineering project.
                </p>
              </div>
            </div>

            {/* Glowing 3D Code Box Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#0284C7]/30 border border-[#38BDF8]/40 flex items-center justify-center shrink-0 shadow-lg shadow-[#0284C7]/20">
              <Box className="w-5 h-5 text-[#38BDF8]" />
            </div>
          </motion.div>

          {/* Step 02 */}
          <motion.div
            whileHover={{ x: 3, borderColor: 'rgba(167, 139, 250, 0.5)' }}
            className="relative z-10 bg-[#050A18] border border-[#1E293B] rounded-xl p-3 flex items-center justify-between gap-3 transition-colors"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="font-mono text-xs font-black text-[#A78BFA] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-2 py-1 rounded-lg shrink-0">
                02
              </span>
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-black text-xs text-white uppercase font-display tracking-wider flex items-center gap-1">
                  <span>PROVE</span>
                  <ShieldCheck className="w-3 h-3 text-[#A78BFA]" />
                </h3>
                <p className="text-[11px] text-[#94A3B8] leading-tight">
                  Submit your GitHub commit and LinkedIn post.
                </p>
              </div>
            </div>

            {/* Glowing 3D Cloud Upload Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#8B5CF6]/30 border border-[#8B5CF6]/40 flex items-center justify-center shrink-0 shadow-lg shadow-[#8B5CF6]/20">
              <CloudUpload className="w-5 h-5 text-[#A78BFA]" />
            </div>
          </motion.div>

          {/* Step 03 */}
          <motion.div
            whileHover={{ x: 3, borderColor: 'rgba(52, 211, 153, 0.5)' }}
            className="relative z-10 bg-[#050A18] border border-[#1E293B] rounded-xl p-3 flex items-center justify-between gap-3 transition-colors"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="font-mono text-xs font-black text-[#34D399] bg-[#064E3B]/40 border border-[#10B981]/40 px-2 py-1 rounded-lg shrink-0">
                03
              </span>
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-black text-xs text-white uppercase font-display tracking-wider flex items-center gap-1">
                  <span>CONTINUE</span>
                  <CheckCircle2 className="w-3 h-3 text-[#34D399]" />
                </h3>
                <p className="text-[11px] text-[#94A3B8] leading-tight">
                  Maintain your public build record.
                </p>
              </div>
            </div>

            {/* Glowing 3D Growth Graph Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#064E3B] to-[#10B981]/30 border border-[#10B981]/40 flex items-center justify-center shrink-0 shadow-lg shadow-[#10B981]/20">
              <TrendingUp className="w-5 h-5 text-[#34D399]" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* MEET AB COACH CARD (EXACT MATCH FROM SCREENSHOT) */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        onClick={() => window.dispatchEvent(new CustomEvent('open-abcoach'))}
        className="bg-[#0B1220]/90 border border-[#8B5CF6]/40 hover:border-[#8B5CF6] rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xl cursor-pointer transition-all group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ABMascot size={46} />
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-sm text-white font-display tracking-tight group-hover:text-[#38BDF8] transition-colors">
                Meet AB Coach
              </h3>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA] uppercase">
                AI
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] leading-tight">
              Your AI coding mentor that guides, reviews and levels up your journey.
            </p>
          </div>
        </div>

        {/* Right Circle Arrow Button */}
        <div className="w-9 h-9 rounded-full bg-[#1E1B4B] border border-[#8B5CF6]/50 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:bg-[#8B5CF6] transition-all">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      {/* SECTION 2 — THE BUILD JOURNEY */}
      <motion.section variants={itemVariants} className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
          <span className="text-xs font-black font-display text-white uppercase tracking-wider">
            THE BUILD JOURNEY
          </span>
          <span className="text-[10px] font-mono text-[#38BDF8] bg-[#0284C7]/15 px-2 py-0.5 rounded border border-[#38BDF8]/30">
            60 DAYS · 60 BUILDS
          </span>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed">
          From your very first line of code to a full 60-build public portfolio.
        </p>

        {/* Visual Node Journey Track */}
        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
            <span className="text-[#38BDF8] font-bold">DAY 01</span>
            <span>DAY 15</span>
            <span className="text-[#A78BFA] font-bold">DAY 30</span>
            <span>DAY 45</span>
            <span className="text-[#34D399] font-bold">DAY 60</span>
          </div>

          {/* Node bar */}
          <div className="relative h-2 bg-[#0F172A] rounded-full overflow-hidden border border-[#1E293B]">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '42%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#34D399] rounded-full"
            />
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-[#64748B] pt-0.5">
            <span>First Build</span>
            <span>15-Day Milestone</span>
            <span>Halfway</span>
            <span>Public Master</span>
          </div>
        </div>
      </motion.section>

      {/* START MODAL */}
      <Modal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        title="Start Your 60-Day Challenge"
        subtitle="Set up your student profile to enter your builder command center."
      >
        <form onSubmit={handleStartJourney} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-[#94A3B8] block mb-1">Your First Name</label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Bharath"
              className="w-full bg-[#050A18] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#38BDF8] font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#94A3B8] block mb-1">Choose Your Track</label>
            <div className="space-y-2">
              {TRACK_OPTIONS.map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => setSelectedTrack(track)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-bold flex items-center justify-between cursor-pointer font-sans ${
                    selectedTrack === track
                      ? 'bg-[#0284C7]/20 border-[#38BDF8] text-white'
                      : 'bg-[#050A18] border-[#1E293B] text-[#94A3B8] hover:border-[#38BDF8]/40'
                  }`}
                >
                  <span>{track}</span>
                  {selectedTrack === track && <span className="text-[#38BDF8] font-mono text-[10px]">✓ SELECTED</span>}
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


