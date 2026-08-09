import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Check, CheckCircle2, Github, Linkedin, HelpCircle, Clock, ShieldCheck, Info, ChevronDown, ChevronUp, Sparkles, Terminal, FileCode, CheckSquare, Box } from 'lucide-react';
import { StudentProfile } from '../types';
import { CHALLENGES } from '../data/challenges';
import { shipBuild } from '../utils/storage';

interface ChallengeDayPageProps {
  student: StudentProfile;
  onStudentUpdate: (updated: StudentProfile) => void;
}

// Beginner technical term explanations dictionary
const TERM_EXPLANATIONS: Record<string, string> = {
  'Cosine Similarity': 'Mathematical measure of similarity between two non-zero vectors calculating the cosine of the angle between them.',
  'Vector Space': 'A collection of vectors that can be added together and multiplied by numbers, representing text embedded in semantic space.',
  'K-NN Retrieval': 'k-Nearest Neighbors search algorithm to retrieve top items closest in vector space to a query embedding.',
  'File I/O': 'Input/Output operations to read and write files directly on disk.',
  'Markdown AST': 'Abstract Syntax Tree parsing raw markdown text into structured code nodes.',
  'Shields.io': 'Web service providing SVG status badges for repositories.',
  'Base62 Encoding': 'Algorithm converting numbers into short alphanumeric strings (a-z, A-Z, 0-9).',
  'KV Storage': 'Key-Value database mapping short codes directly to target URLs.',
  '302 Redirects': 'HTTP protocol response code directing browsers to visit a target page.'
};

export const ChallengeDayPage: React.FC<ChallengeDayPageProps> = ({ student, onStudentUpdate }) => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  const dayNumber = parseInt(dayId || '14', 10);
  const challenge = CHALLENGES[dayNumber] || CHALLENGES[14];

  const existingProof = student.proofs[dayNumber];

  // 1. SHIP MINIMUM CHECKLIST STATE
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // 2. BUILD CHECK READINESS STATE
  const [buildChecks, setBuildChecks] = useState<{ local: boolean; tested: boolean; pushed: boolean }>({
    local: false,
    tested: false,
    pushed: false,
  });

  // 3. PROOF FORM INPUTS
  const [githubRepoUrl, setGithubRepoUrl] = useState(
    existingProof?.githubUrl || `https://github.com/bharath/abtalks-vector-search`
  );
  const [githubCommitUrl, setGithubCommitUrl] = useState(
    existingProof?.githubUrl ? `${existingProof.githubUrl}/commit/1a2b3c` : `https://github.com/bharath/abtalks-vector-search/commit/1a2b3c`
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    existingProof?.linkedinUrl || `https://linkedin.com/posts/bharath_vector-search-build`
  );

  // Expandable Section Toggles
  const [showWhatGoodLooksLike, setShowWhatGoodLooksLike] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Shipping & Success feedback states
  const [isShipping, setIsShipping] = useState(false);
  const [isShippedSuccess, setIsShippedSuccess] = useState(!!existingProof?.shipped);

  useEffect(() => {
    if (existingProof?.shipped) {
      const initialChecked: Record<number, boolean> = {};
      challenge.shipMinimum.forEach((_, idx) => {
        initialChecked[idx] = true;
      });
      setCheckedItems(initialChecked);
      setBuildChecks({ local: true, tested: true, pushed: true });
    }
  }, [dayNumber, existingProof]);

  // Validation helper
  const isValidUrl = (urlStr: string): boolean => {
    if (!urlStr || urlStr.trim().length < 10) return false;
    try {
      const parsed = new URL(urlStr);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const isRepoValid = isValidUrl(githubRepoUrl);
  const isCommitValid = isValidUrl(githubCommitUrl);
  const isLinkedinValid = isValidUrl(linkedinUrl);
  const isProofFormValid = isRepoValid && isCommitValid && isLinkedinValid;

  const toggleShipCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleBuildCheck = (key: 'local' | 'tested' | 'pushed') => {
    setBuildChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShipBuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isProofFormValid || isShipping) return;

    setIsShipping(true);

    setTimeout(() => {
      const updated = shipBuild(
        dayNumber,
        challenge.title,
        student.track,
        githubRepoUrl,
        linkedinUrl
      );
      onStudentUpdate(updated);
      setIsShipping(false);
      setIsShippedSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 700);
  };

  const completedShipCount = Object.values(checkedItems).filter(Boolean).length;
  const totalShipCount = challenge.shipMinimum.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-[#050A18] text-slate-200 pb-32 pt-2 px-3 sm:px-4 max-w-[390px] mx-auto select-none font-sans space-y-3 relative"
    >
      
      {/* TOP BAR HEADER */}
      <header className="flex items-center justify-between py-2 border-b border-[#1E293B]">
        {/* Left: AB Logo Badge */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-black shadow-md shadow-[#2563EB]/20">
            AB
          </div>
          <span className="text-sm font-black font-display tracking-wide text-white group-hover:text-[#38BDF8] transition-colors">
            ABTALKS
          </span>
        </Link>

        {/* Center: DAY BADGE */}
        <div className="text-xs font-mono font-bold text-[#38BDF8] bg-[#0284C7]/15 border border-[#38BDF8]/40 px-3 py-1 rounded-full shadow-sm">
          DAY {dayNumber} / 60
        </div>

        {/* Right: Exit */}
        <Link
          to="/dashboard"
          className="text-xs font-mono text-[#94A3B8] hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Exit</span>
        </Link>
      </header>

      {/* MISSION WORKSPACE PROGRESS BAR */}
      <div className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl px-3.5 py-2.5 flex items-center justify-between text-xs font-mono shadow-md">
        <span className="text-[#38BDF8] font-bold tracking-wider flex items-center gap-1.5">
          <span className="text-[#8B5CF6] font-mono font-bold">&gt;_</span>
          <span>MISSION WORKSPACE</span>
        </span>
        <div className="flex items-center gap-2 text-[#64748B]">
          <span className={completedShipCount >= 1 ? "text-[#38BDF8] font-bold" : "text-[#64748B]"}>01</span>
          <span className="text-[#1E293B] font-light">━━━━</span>
          <span className={Object.values(buildChecks).filter(Boolean).length >= 1 ? "text-[#38BDF8] font-bold" : "text-[#64748B]"}>02</span>
          <span className="text-[#1E293B] font-light">━━━━</span>
          <span className={isProofFormValid ? "text-[#34D399] font-bold" : "text-[#64748B]"}>03</span>
        </div>
      </div>

      {/* ACTIVE BUILD CARD WITH GLOWING 3D CUBE */}
      <section className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
          <span className="text-[#38BDF8] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            ACTIVE BUILD
          </span>
          <span className="flex items-center gap-1.5 text-white bg-[#050A18] px-2.5 py-0.5 rounded-full border border-[#1E293B]">
            <Clock className="w-3 h-3 text-[#38BDF8]" />
            {challenge.durationMinutes} MIN · {challenge.difficulty.toUpperCase()}
          </span>
        </div>

        {/* Title + 3D Cube Graphic Layout */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="space-y-1.5 min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight leading-tight">
              {challenge.title}
            </h1>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
              {challenge.description}
            </p>
          </div>

          {/* GLOWING 3D CODE CUBE GRAPHIC */}
          <div className="relative shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#0284C7]/30 border border-[#38BDF8]/50 flex items-center justify-center shadow-2xl shadow-[#0284C7]/30 group">
            <div className="absolute inset-0 rounded-2xl bg-[#38BDF8]/10 blur-md" />
            <div className="relative z-10 w-12 h-12 rounded-xl bg-[#050A18] border border-[#38BDF8] flex items-center justify-center text-[#38BDF8] shadow-inner">
              <Box className="w-6 h-6 text-[#38BDF8] animate-pulse" />
            </div>
            {/* Ambient Dots */}
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
            <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
          </div>
        </div>

        {/* CONCEPT HASHTAGS WITH TOOLTIPS */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E293B]">
          {challenge.conceptsCovered.map((concept) => (
            <div key={concept} className="relative inline-block">
              <button
                type="button"
                onClick={() => setActiveTooltip(activeTooltip === concept ? null : concept)}
                className="text-[10px] font-mono text-[#CBD5E1] bg-[#050A18] border border-[#1E293B] hover:border-[#38BDF8]/60 hover:text-white px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>#{concept}</span>
                <Info className="w-2.5 h-2.5 text-[#38BDF8]" />
              </button>

              {activeTooltip === concept && TERM_EXPLANATIONS[concept] && (
                <div className="absolute left-0 top-full mt-1 z-30 w-56 p-2.5 bg-[#050A18] border border-[#38BDF8]/50 rounded-xl text-[10px] text-slate-300 font-mono shadow-2xl animate-fade-in">
                  <div className="font-bold text-[#38BDF8] mb-1">#{concept}</div>
                  <p className="text-[#94A3B8] leading-tight">{TERM_EXPLANATIONS[concept]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SHIP MINIMUM (CORE SCOPE) CARD */}
      <section className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xs font-black font-display text-white tracking-wider uppercase">
              SHIP MINIMUM
            </h2>
            <span className="text-[10px] font-mono text-[#64748B]">(CORE SCOPE)</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#050A18] px-2.5 py-0.5 rounded-full border border-[#1E293B]">
            {completedShipCount} / {totalShipCount}
          </span>
        </div>

        <div className="space-y-2">
          {challenge.shipMinimum.map((req, idx) => {
            const isChecked = !!checkedItems[idx];
            const numLabel = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleShipCheck(idx)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                  isChecked
                    ? 'bg-[#0284C7]/15 border-[#38BDF8]/50 text-white'
                    : 'bg-[#050A18] border-[#1E293B] text-[#CBD5E1] hover:border-[#38BDF8]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-xs font-mono font-black shrink-0 px-2 py-1 rounded-lg transition-colors ${
                    isChecked
                      ? 'bg-[#0284C7]/30 text-[#38BDF8] border border-[#38BDF8]/50'
                      : 'bg-[#1E1B4B] text-[#A78BFA] border border-[#8B5CF6]/40'
                  }`}>
                    {numLabel}
                  </span>

                  <span className="text-xs font-bold font-sans tracking-tight truncate">
                    {req}
                  </span>
                </div>

                <span className={`text-[10px] font-mono font-bold shrink-0 px-2.5 py-0.5 rounded-full transition-all ${
                  isChecked
                    ? 'text-[#34D399] bg-[#064E3B]/50 border border-[#10B981]/50'
                    : 'text-[#64748B] bg-[#0F172A] border border-[#1E293B]'
                }`}>
                  {isChecked ? '✓ Complete' : '○ Not started'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* WHAT GOOD LOOKS LIKE */}
      <section className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-3.5 shadow-xl">
        <button
          type="button"
          onClick={() => setShowWhatGoodLooksLike(!showWhatGoodLooksLike)}
          className="w-full flex items-center justify-between text-xs font-mono text-[#38BDF8] hover:text-white transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 font-bold">
            <FileCode className="w-4 h-4 text-[#8B5CF6]" />
            <span>WHAT GOOD LOOKS LIKE</span>
          </div>
          {showWhatGoodLooksLike ? (
            <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
          )}
        </button>

        {showWhatGoodLooksLike && (
          <div className="mt-3 pt-3 border-t border-[#1E293B] text-xs text-[#CBD5E1] space-y-2 animate-fade-in font-sans">
            <p className="text-[#94A3B8] leading-relaxed">
              Top document retrieval calculating dot product over 2 vector embeddings, ordering cosine similarity ranks, and displaying top 3 query results.
            </p>
          </div>
        )}
      </section>

      {/* BUILD CHECK CARD */}
      <section className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#38BDF8]" />
            <h3 className="text-xs font-black font-display text-white uppercase tracking-wider">
              BUILD CHECK
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#94A3B8]">
            Am I ready to submit?
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => toggleBuildCheck('local')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              buildChecks.local
                ? 'bg-[#0284C7]/15 border-[#38BDF8]/40 text-white'
                : 'bg-[#050A18] border-[#1E293B] text-[#94A3B8] hover:border-[#38BDF8]/30'
            }`}
          >
            <span>○ Works locally</span>
            {buildChecks.local && <Check className="w-4 h-4 text-[#38BDF8]" />}
          </button>

          <button
            type="button"
            onClick={() => toggleBuildCheck('tested')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              buildChecks.tested
                ? 'bg-[#0284C7]/15 border-[#38BDF8]/40 text-white'
                : 'bg-[#050A18] border-[#1E293B] text-[#94A3B8] hover:border-[#38BDF8]/30'
            }`}
          >
            <span>○ Tested end-to-end</span>
            {buildChecks.tested && <Check className="w-4 h-4 text-[#38BDF8]" />}
          </button>

          <button
            type="button"
            onClick={() => toggleBuildCheck('pushed')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              buildChecks.pushed
                ? 'bg-[#0284C7]/15 border-[#38BDF8]/40 text-white'
                : 'bg-[#050A18] border-[#1E293B] text-[#94A3B8] hover:border-[#38BDF8]/30'
            }`}
          >
            <span>○ Pushed to GitHub</span>
            {buildChecks.pushed && <Check className="w-4 h-4 text-[#38BDF8]" />}
          </button>
        </div>
      </section>

      {/* PROOF OF WORK FORM CARD */}
      <section className="bg-[#0B1220]/90 border border-[#1E293B] rounded-2xl p-4 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <h3 className="text-xs font-black font-display text-white uppercase tracking-wider">
              PROOF OF WORK
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#38BDF8] bg-[#0284C7]/20 border border-[#38BDF8]/40 px-2.5 py-0.5 rounded-full uppercase">
            PUBLIC EVIDENCE
          </span>
        </div>

        <form onSubmit={handleShipBuild} className="space-y-3.5">
          {/* GITHUB PROOF */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white uppercase">
              <Github className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>GITHUB PROOF</span>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">
                Repository URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={githubRepoUrl}
                  onChange={(e) => setGithubRepoUrl(e.target.value)}
                  placeholder="https://github.com/user/repository"
                  className="w-full bg-[#050A18] border border-[#10B981]/50 focus:border-[#10B981] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-mono transition-all pr-16"
                />
                {isRepoValid && (
                  <span className="absolute right-2.5 top-2.5 text-[9px] font-mono font-bold text-[#34D399] bg-[#064E3B]/80 px-2 py-0.5 rounded border border-[#10B981]/50 flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">
                Commit URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={githubCommitUrl}
                  onChange={(e) => setGithubCommitUrl(e.target.value)}
                  placeholder="https://github.com/user/repository/commit/xxxx"
                  className="w-full bg-[#050A18] border border-[#10B981]/50 focus:border-[#10B981] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-mono transition-all pr-16"
                />
                {isCommitValid && (
                  <span className="absolute right-2.5 top-2.5 text-[9px] font-mono font-bold text-[#34D399] bg-[#064E3B]/80 px-2 py-0.5 rounded border border-[#10B981]/50 flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* LINKEDIN PROOF */}
          <div className="space-y-2.5 pt-2 border-t border-[#1E293B]">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white uppercase">
              <Linkedin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>LINKEDIN PROOF</span>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">
                Post URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/posts/xxxx"
                  className="w-full bg-[#050A18] border border-[#10B981]/50 focus:border-[#10B981] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-mono transition-all pr-16"
                />
                {isLinkedinValid && (
                  <span className="absolute right-2.5 top-2.5 text-[9px] font-mono font-bold text-[#34D399] bg-[#064E3B]/80 px-2 py-0.5 rounded border border-[#10B981]/50 flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* STICKY BOTTOM SUBMIT CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#050A18]/95 backdrop-blur-md border-t border-[#1E293B] z-40 max-w-[390px] mx-auto">
        {isShippedSuccess ? (
          <div className="w-full py-3.5 px-4 rounded-xl bg-[#064E3B] border border-[#10B981] text-white text-center font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/20 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
            <span>✓ BUILD SHIPPED · DAY {dayNumber} COMPLETE</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleShipBuild}
            disabled={!isProofFormValid || isShipping}
            className={`w-full py-3.5 px-4 rounded-xl font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isProofFormValid && !isShipping
                ? 'bg-gradient-to-r from-[#8B5CF6] via-[#2563EB] to-[#0284C7] hover:opacity-95 text-white shadow-xl shadow-[#8B5CF6]/30 active:scale-[0.99]'
                : 'bg-[#0F172A] border border-[#1E293B] text-[#64748B] cursor-not-allowed'
            }`}
          >
            {isShipping ? (
              <span className="flex items-center gap-2 text-[#38BDF8] animate-pulse">
                <Sparkles className="w-4 h-4 text-[#38BDF8] animate-spin" />
                SHIPPING BUILD...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-white">
                <span>SHIP BUILD →</span>
              </span>
            )}
          </button>
        )}
      </div>

    </motion.div>
  );
};

