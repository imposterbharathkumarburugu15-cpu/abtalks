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
    .slice(0, 3); // Show top 3 recent public proofs

  return (
    <section className="bg-card-midnight rounded-2xl p-4 sm:p-5 select-none space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <h3 className="text-sm sm:text-base font-black font-display text-white tracking-tight uppercase">
              PROOF OF WORK
            </h3>
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Public evidence submitted on GitHub & LinkedIn
          </p>
        </div>

        <Link
          to="/proofs"
          className="text-xs font-mono font-bold text-[#38BDF8] hover:text-white flex items-center gap-1 transition-colors uppercase"
        >
          <span>VAULT</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Proof-of-Work Summary Evidence Markers */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
          <div className="p-2 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 shrink-0">
            <Github className="w-4 h-4 text-[#A78BFA]" />
          </div>
          <div>
            <span className="text-sm font-black font-mono text-white block leading-tight">
              {student.githubProofs} COMMITS
            </span>
            <span className="text-[10px] font-mono text-[#94A3B8]">
              GitHub Verified
            </span>
          </div>
        </div>

        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
          <div className="p-2 rounded-lg bg-[#0284C7]/15 border border-[#38BDF8]/30 shrink-0">
            <Linkedin className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div>
            <span className="text-sm font-black font-mono text-white block leading-tight">
              {student.linkedinProofs} POSTS
            </span>
            <span className="text-[10px] font-mono text-[#94A3B8]">
              LinkedIn Verified
            </span>
          </div>
        </div>
      </div>

      {/* Verified Proof Logs Stream */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
          LATEST PROOF VERIFICATIONS
        </span>

        {proofEntries.length === 0 ? (
          <div className="p-3 bg-[#050A18] rounded-xl border border-dashed border-[#1E293B] text-center text-xs font-mono text-[#64748B]">
            No public proofs recorded yet.
          </div>
        ) : (
          proofEntries.map((proof) => (
            <div
              key={proof.day}
              className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 flex items-center justify-between gap-2 hover:border-[#38BDF8]/40 transition-all"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white uppercase truncate">
                    {proof.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8] mt-0.5">
                  <span className="text-[#38BDF8] font-bold">DAY {proof.day}</span>
                  <span>•</span>
                  <span>{proof.submittedAt}</span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full bg-[#064E3B]/40 border border-[#10B981]/50 text-[#34D399] text-[10px] font-mono font-bold shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-[#34D399]" />
                <span>VERIFIED ✓</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};


