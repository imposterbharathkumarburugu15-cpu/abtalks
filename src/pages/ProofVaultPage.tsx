import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Search, CheckCircle2 } from 'lucide-react';
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
        className="bg-[#14191B] border border-[#252C2E] rounded-xl p-5 space-y-3 relative overflow-hidden"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#69B39A] tracking-widest uppercase block">
            PUBLIC RECORD
          </span>
          <h1 className="text-xl font-black font-display text-[#F1EEE7] tracking-tight leading-tight">
            {studentNameUpper}'S BUILD LOG
          </h1>
          <p className="text-xs font-mono text-[#718A96] font-bold">
            60 BUILDS · 60 DAYS
          </p>
        </div>

        <p className="text-xs text-[#A6AAA8] italic font-sans border-t border-[#252C2E] pt-2">
          Your work, preserved.
        </p>

        {/* Big Number Editorial Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#090B0D] p-3 rounded-xl border border-[#252C2E]">
            <span className="text-3xl font-black font-display text-[#F1EEE7] block tracking-tight">
              {student.completedBuilds}
            </span>
            <span className="text-[9px] font-mono font-bold text-[#A6AAA8] uppercase tracking-wider block mt-0.5">
              BUILDS SHIPPED
            </span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#090B0D] p-3 rounded-xl border border-[#252C2E]">
            <span className="text-3xl font-black font-display text-[#C58A52] block tracking-tight">
              {student.streak}
            </span>
            <span className="text-[9px] font-mono font-bold text-[#C58A52] uppercase tracking-wider block mt-0.5">
              CURRENT RUN
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#A6AAA8] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search build log..."
          className="w-full bg-[#14191B] border border-[#252C2E] rounded-xl pl-9 pr-3 py-2 text-xs text-[#F1EEE7] focus:outline-none focus:border-[#69B39A] font-mono"
        />
      </div>

      <div className="w-full h-[1px] bg-[#252C2E] my-2" />

      {/* Build Log Entries */}
      <div className="space-y-4">
        {filteredProofs.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#A6AAA8] bg-[#14191B] border border-dashed border-[#252C2E] rounded-xl">
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
                whileHover={{ y: -2, borderColor: '#69B39A' }}
                className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-mono text-[#69B39A] uppercase tracking-wider">
                    BUILD {proof.day}
                  </span>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#191F21] border border-[#252C2E] text-[#6FA889] text-[10px] font-mono font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#6FA889]" />
                    <span>VERIFIED ✓</span>
                  </div>
                </div>

                <h3 className="text-sm font-black font-display text-[#F1EEE7] uppercase tracking-tight leading-snug">
                  {proof.title}
                </h3>

                <div className="flex items-center gap-3 pt-2 border-t border-[#252C2E]">
                  <a
                    href={proof.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#69B39A] hover:text-[#F1EEE7] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub ↗</span>
                  </a>

                  <span className="text-[#252C2E]">•</span>

                  <a
                    href={proof.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#718A96] hover:text-[#F1EEE7] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn ↗</span>
                  </a>
                </div>

                <div className="text-[10px] font-mono text-[#A6AAA8] pt-1">
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



