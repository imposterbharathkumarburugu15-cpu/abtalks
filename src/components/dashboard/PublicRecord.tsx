import React from 'react';
import { Github, Linkedin, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { StudentProfile, ProofEntry } from '../../types';
import { Link } from 'react-router-dom';

interface PublicRecordProps {
  student: StudentProfile;
}

export const PublicRecord: React.FC<PublicRecordProps> = ({ student }) => {
  const proofEntries = (Object.values(student.proofs) as ProofEntry[])
    .sort((a, b) => b.day - a.day)
    .slice(0, 3);

  return (
    <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 sm:p-5 select-none space-y-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest block">
            PUBLIC EVIDENCE
          </span>
          <h3 className="text-xs font-black font-display text-[#F1EEE7] tracking-wider uppercase">
            PUBLIC PROOF RECORD
          </h3>
        </div>

        <Link
          to="/proofs"
          className="text-xs font-mono font-bold text-[#69B39A] hover:text-[#F1EEE7] flex items-center gap-1 transition-colors uppercase"
        >
          <span>VAULT</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Proof-of-Work Summary Evidence Markers */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#191F21] border border-[#252C2E] shrink-0 text-[#69B39A]">
            <Github className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-black font-mono text-[#F1EEE7] block leading-tight">
              {student.githubProofs} COMMITS
            </span>
            <span className="text-[10px] font-mono text-[#A6AAA8]">
              GitHub Verified
            </span>
          </div>
        </div>

        <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#191F21] border border-[#252C2E] shrink-0 text-[#718A96]">
            <Linkedin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-black font-mono text-[#F1EEE7] block leading-tight">
              {student.linkedinProofs} POSTS
            </span>
            <span className="text-[10px] font-mono text-[#A6AAA8]">
              LinkedIn Verified
            </span>
          </div>
        </div>
      </div>

      {/* Verified Proof Logs Stream */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-mono font-bold text-[#A6AAA8] uppercase tracking-wider block">
          LATEST PROOF VERIFICATIONS
        </span>

        {proofEntries.length === 0 ? (
          <div className="p-3 bg-[#090B0D] rounded-xl border border-dashed border-[#252C2E] text-center text-xs font-mono text-[#A6AAA8]">
            No public proofs recorded yet.
          </div>
        ) : (
          proofEntries.map((proof) => (
            <div
              key={proof.day}
              className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 flex items-center justify-between gap-2 hover:border-[#69B39A]/40 transition-all"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#F1EEE7] uppercase truncate">
                    {proof.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#A6AAA8] mt-0.5">
                  <span className="text-[#69B39A] font-bold">DAY {proof.day}</span>
                  <span>•</span>
                  <span>{proof.submittedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full bg-[#191F21] border border-[#252C2E] text-[#6FA889] text-[10px] font-mono font-bold">
                <CheckCircle2 className="w-3 h-3 text-[#6FA889]" />
                <span>VERIFIED ✓</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
