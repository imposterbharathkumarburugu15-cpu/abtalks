import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Check, CheckCircle2, Github, Linkedin, Clock, ShieldCheck, Info, ChevronDown, ChevronUp, Sparkles, Box, CheckSquare } from 'lucide-react';
import { StudentProfile } from '../types';
import { CHALLENGES } from '../data/challenges';
import { shipBuild } from '../utils/storage';

interface ChallengeDayPageProps {
  student: StudentProfile;
  onStudentUpdate: (updated: StudentProfile) => void;
}

const TERM_EXPLANATIONS: Record<string, string> = {
  'Cosine Similarity': 'Mathematical measure of similarity between two non-zero vectors calculating the cosine of the angle between them.',
  'Vector Space': 'A collection of vectors that can be added together and multiplied by numbers, representing text embedded in semantic space.',
  'K-NN Retrieval': 'k-Nearest Neighbors search algorithm to retrieve top items closest in vector space to a query embedding.',
  'Base62 Encoding': 'Algorithm converting numbers into short alphanumeric strings (a-z, A-Z, 0-9).',
  'KV Storage': 'Key-Value database mapping short codes directly to target URLs.',
  '302 Redirects': 'HTTP protocol response code directing browsers to visit a target page.'
};

export const ChallengeDayPage: React.FC<ChallengeDayPageProps> = ({ student, onStudentUpdate }) => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  const dayNumber = parseInt(dayId || '12', 10);
  const challenge = CHALLENGES[dayNumber] || CHALLENGES[12];

  const existingProof = student.proofs[dayNumber];

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [buildChecks, setBuildChecks] = useState<{ local: boolean; tested: boolean; pushed: boolean }>({
    local: false,
    tested: false,
    pushed: false,
  });

  const [githubRepoUrl, setGithubRepoUrl] = useState(
    existingProof?.githubUrl || `https://github.com/${student.name.toLowerCase() || 'bharath'}/abtalks-day${dayNumber}`
  );
  const [githubCommitUrl, setGithubCommitUrl] = useState(
    existingProof?.githubUrl ? `${existingProof.githubUrl}/commit/1a2b3c` : `https://github.com/${student.name.toLowerCase() || 'bharath'}/abtalks-day${dayNumber}/commit/1a2b3c`
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    existingProof?.linkedinUrl || `https://linkedin.com/posts/${student.name.toLowerCase() || 'bharath'}_day${dayNumber}`
  );

  const [showWhatGoodLooksLike, setShowWhatGoodLooksLike] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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
      className="min-h-screen bg-[#090B0D] text-[#F1EEE7] pb-32 pt-2 px-3 sm:px-4 max-w-[390px] mx-auto select-none font-sans space-y-3 relative"
    >
      
      {/* TOP BAR HEADER */}
      <header className="flex items-center justify-between py-2 border-b border-[#252C2E]">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#69B39A] flex items-center justify-center text-[#090B0D] text-xs font-black">
            AB
          </div>
          <span className="text-sm font-black font-display tracking-wide text-[#F1EEE7] group-hover:text-[#69B39A] transition-colors">
            ABTALKS
          </span>
        </Link>

        <div className="text-xs font-mono font-bold text-[#69B39A] bg-[#191F21] border border-[#252C2E] px-3 py-1 rounded-full">
          DAY {dayNumber} / 60
        </div>

        <Link
          to="/dashboard"
          className="text-xs font-mono text-[#A6AAA8] hover:text-[#F1EEE7] flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#69B39A]" />
          <span>Exit</span>
        </Link>
      </header>

      {/* MISSION WORKSPACE META */}
      <div className="bg-[#14191B] border border-[#252C2E] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-mono">
        <span className="text-[#69B39A] font-bold tracking-wider flex items-center gap-1.5">
          <span className="text-[#C58A52] font-mono font-bold">&gt;_</span>
          <span>MISSION WORKSPACE</span>
        </span>
        <div className="flex items-center gap-2 text-[#A6AAA8]">
          <span className={completedShipCount >= 1 ? "text-[#69B39A] font-bold" : "text-[#6F7575]"}>01</span>
          <span className="text-[#252C2E] font-light">━━━━</span>
          <span className={Object.values(buildChecks).filter(Boolean).length >= 1 ? "text-[#69B39A] font-bold" : "text-[#6F7575]"}>02</span>
          <span className="text-[#252C2E] font-light">━━━━</span>
          <span className={isProofFormValid ? "text-[#6FA889] font-bold" : "text-[#6F7575]"}>03</span>
        </div>
      </div>

      {/* ACTIVE BUILD CARD */}
      <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#A6AAA8]">
          <span className="text-[#69B39A] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C58A52]" />
            ACTIVE MISSION
          </span>
          <span className="flex items-center gap-1.5 text-[#F1EEE7] bg-[#090B0D] px-2.5 py-0.5 rounded-full border border-[#252C2E]">
            <Clock className="w-3 h-3 text-[#69B39A]" />
            {challenge.durationMinutes} MIN · {(challenge.difficulty || 'INTERMEDIATE').toUpperCase()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="space-y-1.5 min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-black font-display text-[#F1EEE7] uppercase tracking-tight leading-tight">
              {challenge.day === 12 ? "URL SHORTENER" : challenge.title}
            </h1>
            <p className="text-xs text-[#A6AAA8] leading-relaxed font-sans">
              {challenge.day === 12
                ? "Turn long URLs into short, shareable links with custom hashes and redirects."
                : challenge.description || "Ship a production module worth putting in your portfolio."}
            </p>
          </div>

          <div className="relative shrink-0 w-16 h-16 rounded-xl bg-[#090B0D] border border-[#252C2E] flex items-center justify-center">
            <Box className="w-6 h-6 text-[#69B39A]" />
          </div>
        </div>

        {/* CONCEPT HASHTAGS WITH TOOLTIPS */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#252C2E]">
          {challenge.conceptsCovered.map((concept) => (
            <div key={concept} className="relative inline-block">
              <button
                type="button"
                onClick={() => setActiveTooltip(activeTooltip === concept ? null : concept)}
                className="text-[10px] font-mono text-[#F1EEE7] bg-[#090B0D] border border-[#252C2E] hover:border-[#69B39A]/60 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>#{concept}</span>
                <Info className="w-2.5 h-2.5 text-[#69B39A]" />
              </button>

              {activeTooltip === concept && TERM_EXPLANATIONS[concept] && (
                <div className="absolute left-0 top-full mt-1 z-30 w-56 p-2.5 bg-[#090B0D] border border-[#252C2E] rounded-xl text-[10px] text-[#F1EEE7] font-mono shadow-2xl">
                  <div className="font-bold text-[#69B39A] mb-1">#{concept}</div>
                  <p className="text-[#A6AAA8] leading-tight">{TERM_EXPLANATIONS[concept]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SHIP MINIMUM CARD */}
      <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xs font-black font-display text-[#F1EEE7] tracking-wider uppercase">
              SHIP MINIMUM
            </h2>
            <span className="text-[10px] font-mono text-[#A6AAA8]">(CORE SCOPE)</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#69B39A] bg-[#090B0D] px-2.5 py-0.5 rounded-full border border-[#252C2E]">
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
                    ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7]'
                    : 'bg-[#090B0D] border-[#252C2E] text-[#A6AAA8] hover:border-[#69B39A]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-xs font-mono font-black shrink-0 px-2 py-1 rounded-lg transition-colors ${
                    isChecked
                      ? 'bg-[#14191B] text-[#69B39A] border border-[#69B39A]/50'
                      : 'bg-[#14191B] text-[#718A96] border border-[#252C2E]'
                  }`}>
                    {numLabel}
                  </span>

                  <span className="text-xs font-bold font-sans tracking-tight truncate">
                    {req}
                  </span>
                </div>

                <span className={`text-[10px] font-mono font-bold shrink-0 px-2.5 py-0.5 rounded-full transition-all ${
                  isChecked
                    ? 'text-[#6FA889] bg-[#191F21] border border-[#6FA889]/30'
                    : 'text-[#A6AAA8] bg-[#090B0D] border border-[#252C2E]'
                }`}>
                  {isChecked ? '✓ Complete' : '○ Pending'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* WHAT GOOD LOOKS LIKE */}
      <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-3.5">
        <button
          type="button"
          onClick={() => setShowWhatGoodLooksLike(!showWhatGoodLooksLike)}
          className="w-full flex items-center justify-between text-xs font-mono text-[#69B39A] hover:text-[#F1EEE7] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 font-bold">
            <span>WHAT GOOD LOOKS LIKE</span>
          </div>
          {showWhatGoodLooksLike ? (
            <ChevronUp className="w-4 h-4 text-[#A6AAA8]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#A6AAA8]" />
          )}
        </button>

        {showWhatGoodLooksLike && (
          <div className="mt-3 pt-3 border-t border-[#252C2E] text-xs text-[#F1EEE7] space-y-2 font-sans">
            <p className="text-[#A6AAA8] leading-relaxed">
              Accept input URL, validate destination structure, pass through hash generator algorithm, store in persistent lookup key-value map, and execute 302 redirect.
            </p>
          </div>
        )}
      </section>

      {/* BUILD CHECK CARD */}
      <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#69B39A]" />
            <h3 className="text-xs font-black font-display text-[#F1EEE7] uppercase tracking-wider">
              BUILD CHECK
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#A6AAA8]">
            Am I ready to submit?
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => toggleBuildCheck('local')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              buildChecks.local
                ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7]'
                : 'bg-[#090B0D] border-[#252C2E] text-[#A6AAA8] hover:border-[#69B39A]/30'
            }`}
          >
            <span>○ Works locally</span>
            {buildChecks.local && <Check className="w-4 h-4 text-[#69B39A]" />}
          </button>

          <button
            type="button"
            onClick={() => toggleBuildCheck('tested')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              buildChecks.tested
                ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7]'
                : 'bg-[#090B0D] border-[#252C2E] text-[#A6AAA8] hover:border-[#69B39A]/30'
            }`}
          >
            <span>○ Tested end-to-end</span>
            {buildChecks.tested && <Check className="w-4 h-4 text-[#69B39A]" />}
          </button>

          <button
            type="button"
            onClick={() => toggleBuildCheck('pushed')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              buildChecks.pushed
                ? 'bg-[#191F21] border-[#69B39A] text-[#F1EEE7]'
                : 'bg-[#090B0D] border-[#252C2E] text-[#A6AAA8] hover:border-[#69B39A]/30'
            }`}
          >
            <span>○ Pushed to GitHub</span>
            {buildChecks.pushed && <Check className="w-4 h-4 text-[#69B39A]" />}
          </button>
        </div>
      </section>

      {/* PROOF OF WORK FORM CARD */}
      <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 space-y-3.5">
        <div className="flex items-center justify-between border-b border-[#252C2E] pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#69B39A]" />
            <h3 className="text-xs font-black font-display text-[#F1EEE7] uppercase tracking-wider">
              PROOF OF WORK
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#69B39A] bg-[#191F21] border border-[#252C2E] px-2.5 py-0.5 rounded-full uppercase">
            PUBLIC EVIDENCE
          </span>
        </div>

        <form onSubmit={handleShipBuild} className="space-y-3.5">
          {/* GITHUB PROOF */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F1EEE7] uppercase">
              <Github className="w-3.5 h-3.5 text-[#69B39A]" />
              <span>GITHUB PROOF</span>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#A6AAA8] block mb-1">
                Repository URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={githubRepoUrl}
                  onChange={(e) => setGithubRepoUrl(e.target.value)}
                  placeholder="https://github.com/user/repository"
                  className="w-full bg-[#090B0D] border border-[#252C2E] focus:border-[#69B39A] rounded-xl px-3 py-2.5 text-xs text-[#F1EEE7] focus:outline-none font-mono transition-all pr-16"
                />
                {isRepoValid && (
                  <span className="absolute right-2.5 top-2.5 text-[9px] font-mono font-bold text-[#6FA889] bg-[#191F21] px-2 py-0.5 rounded border border-[#252C2E] flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#A6AAA8] block mb-1">
                Commit URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={githubCommitUrl}
                  onChange={(e) => setGithubCommitUrl(e.target.value)}
                  placeholder="https://github.com/user/repository/commit/xxxx"
                  className="w-full bg-[#090B0D] border border-[#252C2E] focus:border-[#69B39A] rounded-xl px-3 py-2.5 text-xs text-[#F1EEE7] focus:outline-none font-mono transition-all pr-16"
                />
                {isCommitValid && (
                  <span className="absolute right-2.5 top-2.5 text-[9px] font-mono font-bold text-[#6FA889] bg-[#191F21] px-2 py-0.5 rounded border border-[#252C2E] flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* LINKEDIN PROOF */}
          <div className="space-y-2.5 pt-2 border-t border-[#252C2E]">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F1EEE7] uppercase">
              <Linkedin className="w-3.5 h-3.5 text-[#718A96]" />
              <span>LINKEDIN PROOF</span>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#A6AAA8] block mb-1">
                Post URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/posts/xxxx"
                  className="w-full bg-[#090B0D] border border-[#252C2E] focus:border-[#69B39A] rounded-xl px-3 py-2.5 text-xs text-[#F1EEE7] focus:outline-none font-mono transition-all pr-16"
                />
                {isLinkedinValid && (
                  <span className="absolute right-2.5 top-2.5 text-[9px] font-mono font-bold text-[#6FA889] bg-[#191F21] px-2 py-0.5 rounded border border-[#252C2E] flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="pt-3 border-t border-[#252C2E]">
            {isShippedSuccess ? (
              <div className="w-full py-3.5 px-4 rounded-xl bg-[#191F21] border border-[#6FA889] text-[#F1EEE7] text-center font-mono font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6FA889]" />
                <span>✓ BUILD SHIPPED · DAY {dayNumber} COMPLETE</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={!isProofFormValid || isShipping}
                className={`w-full py-3.5 px-4 rounded-xl font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isProofFormValid && !isShipping
                    ? 'bg-[#69B39A] hover:bg-[#69B39A]/90 text-[#090B0D] active:scale-[0.99]'
                    : 'bg-[#191F21] border border-[#252C2E] text-[#6F7575] cursor-not-allowed'
                }`}
              >
                {isShipping ? (
                  <span className="flex items-center gap-2 text-[#090B0D] animate-pulse">
                    <Sparkles className="w-4 h-4 text-[#090B0D] animate-spin" />
                    SHIPPING BUILD...
                  </span>
                ) : (
                  <span>SHIP BUILD →</span>
                )}
              </button>
            )}
          </div>
        </form>
      </section>

      {/* STICKY BOTTOM SUBMIT CTA BAR */}
      <div className="fixed bottom-[52px] left-0 right-0 p-3 bg-[#090B0D]/95 backdrop-blur-md border-t border-[#252C2E] z-30 max-w-[390px] mx-auto">
        {isShippedSuccess ? (
          <div className="w-full py-3.5 px-4 rounded-xl bg-[#191F21] border border-[#6FA889] text-[#F1EEE7] text-center font-mono font-bold text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6FA889]" />
            <span>✓ BUILD SHIPPED · DAY {dayNumber} COMPLETE</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleShipBuild}
            disabled={!isProofFormValid || isShipping}
            className={`w-full py-3.5 px-4 rounded-xl font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isProofFormValid && !isShipping
                ? 'bg-[#69B39A] hover:bg-[#69B39A]/90 text-[#090B0D] active:scale-[0.99]'
                : 'bg-[#191F21] border border-[#252C2E] text-[#6F7575] cursor-not-allowed'
            }`}
          >
            {isShipping ? (
              <span className="flex items-center gap-2 text-[#090B0D] animate-pulse">
                <Sparkles className="w-4 h-4 text-[#090B0D] animate-spin" />
                SHIPPING BUILD...
              </span>
            ) : (
              <span>SHIP BUILD →</span>
            )}
          </button>
        )}
      </div>

    </motion.div>
  );
};
