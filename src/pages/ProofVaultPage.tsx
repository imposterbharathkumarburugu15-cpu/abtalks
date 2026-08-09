import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Github, Linkedin, Search, ExternalLink, CheckCircle2 } from 'lucide-react';
import { StudentProfile, ProofEntry } from '../types';

interface ProofVaultPageProps {
  student: StudentProfile;
}

export const ProofVaultPage: React.FC<ProofVaultPageProps> = ({ student }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const proofList = (Object.values(student.proofs) as ProofEntry[])
    .sort((a, b) => b.day - a.day);

  const filteredProofs = proofList.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `build ${p.day}`.includes(searchTerm.toLowerCase()) ||
    `day ${p.day}`.includes(searchTerm.toLowerCase())
  );

  const studentNameUpper = (student.name || "Bharath").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-24 pt-3 px-3 sm:px-4 max-w-[390px] mx-auto space-y-5 font-mono select-none"
    >
      {/* Editorial Header */}
      <motion.section
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-[#050A18] border border-[#1E293B] rounded-2xl p-5 space-y-3 relative overflow-hidden"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#38BDF8] tracking-widest uppercase block">
            PUBLIC RECORD
          </span>
          <h1 className="text-xl font-black font-display text-white tracking-tight leading-tight">
            {studentNameUpper}'S BUILD LOG
          </h1>
          <p className="text-xs font-mono text-[#A78BFA] font-bold">
            60 BUILDS · 60 DAYS
          </p>
        </div>

        <p className="text-xs text-[#94A3B8] italic font-sans border-t border-[#1E293B] pt-2">
          Your work, preserved.
        </p>

        {/* Big Number Editorial Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <motion.div whileHover={{ scale: 1.03 }} className="bg-[#0F172A] p-3 rounded-xl border border-[#1E293B]">
            <span className="text-3xl font-black font-display text-white block tracking-tight">
              {student.completedBuilds}
            </span>
            <span className="text-[9px] font-mono font-bold text-[#64748B] uppercase tracking-wider block mt-0.5">
              BUILDS SHIPPED
            </span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-[#0F172A] p-3 rounded-xl border border-[#1E293B]">
            <span className="text-3xl font-black font-display text-[#F97316] block tracking-tight">
              {student.streak}
            </span>
            <span className="text-[9px] font-mono font-bold text-[#F97316]/80 uppercase tracking-wider block mt-0.5">
              CURRENT RUN
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search build log..."
          className="w-full bg-[#050A18] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#38BDF8] font-mono"
        />
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#1E293B] to-transparent my-2" />

      {/* Build Log Entries */}
      <div className="space-y-4">
        {filteredProofs.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64748B] bg-[#050A18] border border-dashed border-[#1E293B] rounded-xl">
            No matching builds found in record.
          </div>
        ) : (
          <AnimatePresence>
            {filteredProofs.map((proof, idx) => (
              <motion.div
                key={proof.day}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                whileHover={{ y: -2, borderColor: 'rgba(139, 92, 246, 0.6)' }}
                className="bg-[#050A18] border border-[#1E293B] rounded-2xl p-4 space-y-3 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-mono text-[#38BDF8] uppercase tracking-wider">
                    BUILD {proof.day}
                  </span>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#064E3B]/40 border border-[#10B981]/50 text-[#34D399] text-[10px] font-mono font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#34D399]" />
                    <span>VERIFIED ✓</span>
                  </div>
                </div>

                <h3 className="text-sm font-black font-display text-white uppercase tracking-tight leading-snug">
                  {proof.title}
                </h3>

                <div className="flex items-center gap-3 pt-2 border-t border-[#1E293B]">
                  <a
                    href={proof.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#A78BFA] hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub ↗</span>
                  </a>

                  <span className="text-[#334155]">•</span>

                  <a
                    href={proof.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#38BDF8] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn ↗</span>
                  </a>
                </div>

                <div className="text-[10px] font-mono text-[#64748B] pt-1">
                  {proof.submittedAt}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};


