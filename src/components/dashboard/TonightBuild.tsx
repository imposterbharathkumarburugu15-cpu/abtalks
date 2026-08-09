import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, Moon, AlertTriangle, Pause, Play, Check, Zap, Sparkles, Terminal, Code2, Link2, FileCode2, Cpu, Globe } from 'lucide-react';
import { Challenge } from '../../types';

interface TonightBuildProps {
  challenge: Challenge;
  isCompleted?: boolean;
  shippedType?: 'full' | 'core';
  isNightShift?: boolean;
  isRescueMode?: boolean;
  onShipBuild?: (shippedType: 'full' | 'core') => void;
  // Focus Mode state logic props from DashboardPage
  inFocusMode?: boolean;
  focusSeconds?: number;
  isFocusPaused?: boolean;
  focusModeType?: 'full' | 'core';
  onStartFocus?: (type?: 'full' | 'core') => void;
  onPauseFocus?: () => void;
  onResumeFocus?: () => void;
  onExitFocus?: () => void;
}

export const TonightBuild: React.FC<TonightBuildProps> = ({
  challenge,
  isCompleted = false,
  shippedType = 'full',
  isNightShift = false,
  isRescueMode = false,
  onShipBuild,
  inFocusMode: inFocusModeProp,
  focusSeconds: focusSecondsProp,
  isFocusPaused: isFocusPausedProp,
  focusModeType: focusModeTypeProp,
  onStartFocus,
  onPauseFocus,
  onResumeFocus,
  onExitFocus
}) => {
  const reqCount = challenge.shipMinimum?.length || 3;
  const duration = challenge.durationMinutes || 45;

  const rawTitle = challenge.day === 12 ? "URL Shortener" : challenge.title;
  const tagline = challenge.day === 12
    ? "Turn long URLs into short, shareable links."
    : challenge.description || `Build a ${rawTitle.toLowerCase()} worth shipping.`;

  // Internal state fallbacks
  const [internalInFocus, setInternalInFocus] = useState(false);
  const [internalSeconds, setInternalSeconds] = useState(35 * 60);
  const [internalIsPaused, setInternalIsPaused] = useState(true);
  const [internalFocusType, setInternalFocusType] = useState<'full' | 'core'>('full');
  const [focusSuccess, setFocusSuccess] = useState(false);

  // Derived active focus variables
  const activeInFocus = inFocusModeProp !== undefined ? inFocusModeProp : internalInFocus;
  const activeSeconds = focusSecondsProp !== undefined ? focusSecondsProp : internalSeconds;
  const activeIsPaused = isFocusPausedProp !== undefined ? isFocusPausedProp : internalIsPaused;
  const activeFocusType = focusModeTypeProp || internalFocusType;

  // Internal timer fallback if props not driving interval
  useEffect(() => {
    let interval: any = null;
    if (inFocusModeProp === undefined && internalInFocus && !internalIsPaused && internalSeconds > 0) {
      interval = setInterval(() => {
        setInternalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (internalSeconds === 0 && internalInFocus) {
      setInternalIsPaused(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inFocusModeProp, internalInFocus, internalIsPaused, internalSeconds]);

  const handleStartFocus = (type: 'full' | 'core' = 'full') => {
    setFocusSuccess(false);
    if (onStartFocus) {
      onStartFocus(type);
    } else {
      setInternalFocusType(type);
      setInternalSeconds(type === 'core' ? 18 * 60 : 35 * 60);
      setInternalInFocus(true);
      setInternalIsPaused(false);
    }
  };

  const handlePause = () => {
    if (onPauseFocus) {
      onPauseFocus();
    } else {
      setInternalIsPaused(true);
    }
  };

  const handleResume = () => {
    if (onResumeFocus) {
      onResumeFocus();
    } else {
      setInternalIsPaused(false);
    }
  };

  const handleExitFocus = () => {
    if (onExitFocus) {
      onExitFocus();
    }
    setInternalInFocus(false);
    setInternalIsPaused(true);
  };

  const handleCompleteFocus = () => {
    setFocusSuccess(true);
    if (onExitFocus) onExitFocus();
    setInternalInFocus(false);
    if (onShipBuild) {
      onShipBuild(activeFocusType);
    }
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Title formatting with deliberate line breaks for high impact typography
  const getTitleLines = (titleStr: string): string[] => {
    if (titleStr.toLowerCase().includes('url shortener')) {
      return ['URL', 'SHORTENER'];
    }
    if (titleStr.toLowerCase().includes('readme')) {
      return ['MARKDOWN', 'README GENERATOR'];
    }
    if (titleStr.toLowerCase().includes('api')) {
      return ['REST API', 'MOCK ENGINE'];
    }
    const words = titleStr.split(' ');
    if (words.length >= 2) {
      const mid = Math.ceil(words.length / 2);
      return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
    }
    return [titleStr];
  };

  const titleLines = getTitleLines(rawTitle);

  // Helper renderer for challenge technical schematic preview
  const renderMissionTechnicalSchema = () => {
    const t = rawTitle.toLowerCase();
    
    if (t.includes('url') || t.includes('shortener')) {
      return (
        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 my-3 space-y-2 relative overflow-hidden font-mono text-[11px]">
          <div className="flex items-center justify-between text-[#64748B] text-[10px] pb-1 border-b border-[#1E293B]">
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <Link2 className="w-3 h-3 text-[#38BDF8]" />
              TECHNICAL SCHEMATIC
            </span>
            <span className="text-[#38BDF8] font-bold">SHA-256 ENCODER</span>
          </div>

          <div className="flex items-center justify-between gap-1 text-slate-300">
            <div className="bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B] truncate max-w-[130px] text-[#94A3B8]">
              https://abtalks.dev/ch/d12...
            </div>
            <div className="text-[#8B5CF6] font-bold flex items-center gap-0.5 animate-pulse">
              ➔ [hash] ➔
            </div>
            <div className="bg-[#1E1B4B] px-2 py-1 rounded border border-[#8B5CF6]/50 text-[#38BDF8] font-bold shrink-0">
              abt.lk/x9k8z
            </div>
          </div>
        </div>
      );
    }

    if (t.includes('readme') || t.includes('markdown')) {
      return (
        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 my-3 space-y-2 relative overflow-hidden font-mono text-[11px]">
          <div className="flex items-center justify-between text-[#64748B] text-[10px] pb-1 border-b border-[#1E293B]">
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <FileCode2 className="w-3 h-3 text-[#38BDF8]" />
              PARSER SCHEMA
            </span>
            <span className="text-[#8B5CF6] font-bold">AST GENERATOR</span>
          </div>

          <div className="flex items-center justify-between gap-1 text-slate-300">
            <div className="bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B] text-[#94A3B8]">
              # Raw Notes
            </div>
            <div className="text-[#8B5CF6] font-bold">➔</div>
            <div className="bg-[#1E1B4B] px-2 py-1 rounded border border-[#8B5CF6]/50 text-[#38BDF8] font-bold">
              Structured README.md
            </div>
          </div>
        </div>
      );
    }

    if (t.includes('api') || t.includes('mock') || t.includes('server')) {
      return (
        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 my-3 space-y-2 relative overflow-hidden font-mono text-[11px]">
          <div className="flex items-center justify-between text-[#64748B] text-[10px] pb-1 border-b border-[#1E293B]">
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <Terminal className="w-3 h-3 text-[#38BDF8]" />
              ENDPOINT ROUTER
            </span>
            <span className="text-[#10B981] font-bold">200 OK</span>
          </div>

          <div className="flex items-center justify-between gap-1 text-slate-300">
            <div className="bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B] text-[#38BDF8]">
              GET /api/v1/mock
            </div>
            <div className="text-[#8B5CF6] font-bold">➔</div>
            <div className="bg-[#064E3B]/40 px-2 py-1 rounded border border-[#10B981]/50 text-[#34D399]">
              {'{ status: 200 }'}
            </div>
          </div>
        </div>
      );
    }

    // Default concept visualization
    return (
      <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 my-3 space-y-2 relative overflow-hidden font-mono text-[11px]">
        <div className="flex items-center justify-between text-[#64748B] text-[10px] pb-1 border-b border-[#1E293B]">
          <span className="flex items-center gap-1 text-[#38BDF8]">
            <Cpu className="w-3 h-3 text-[#38BDF8]" />
            CONCEPT ARCHITECTURE
          </span>
          <span className="text-[#38BDF8] font-bold">DAY {challenge.day} BUILD</span>
        </div>

        <div className="flex items-center justify-between gap-1 text-slate-300">
          <div className="bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B] text-[#94A3B8]">
            [ Core Requirements ]
          </div>
          <div className="text-[#8B5CF6] font-bold">➔</div>
          <div className="bg-[#1E1B4B] px-2 py-1 rounded border border-[#8B5CF6]/50 text-[#38BDF8] font-bold">
            [ Shipped Artifact ]
          </div>
        </div>
      </div>
    );
  };

  // 1. FOCUS MODE ACTIVE VIEW
  if (activeInFocus) {
    return (
      <section className="bg-card-hero rounded-2xl p-4 sm:p-5 transition-all select-none relative overflow-hidden">
        {focusSuccess ? (
          /* Completion State */
          <div className="py-4 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6] flex items-center justify-center mx-auto text-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/30">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-[#38BDF8] uppercase block">
                {activeFocusType === 'core' ? 'CORE SHIPPED ✓' : 'BUILD SHIPPED ✓'}
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-0.5">
                Day {challenge.day} Complete
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-xs mx-auto leading-relaxed">
                {activeFocusType === 'core' 
                  ? 'Core requirements verified. Build record and streak updated!' 
                  : 'Full build shipped to public record. Outstanding work!'}
              </p>
            </div>
            <div className="pt-2 flex gap-2 justify-center">
              <button
                onClick={handleExitFocus}
                className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold cursor-pointer transition-all shadow-md shadow-[#8B5CF6]/30"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Active Focus Countdown */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#A78BFA] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-2.5 py-0.5 rounded-full uppercase">
                  {activeFocusType === 'core' ? <Zap className="w-3 h-3 text-[#F97316]" /> : <Moon className="w-3 h-3 text-[#A78BFA]" />}
                  <span>{activeFocusType === 'core' ? 'BUILD RESCUE FOCUS' : 'NIGHT SHIFT FOCUS'}</span>
                </span>
              </div>
              <button
                onClick={handleExitFocus}
                className="text-xs font-mono text-[#64748B] hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-[#050A18] border border-[#1E293B]"
              >
                Exit Focus
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-xs font-mono font-bold text-[#38BDF8] block uppercase tracking-wider mb-1">
                {activeFocusType === 'core' ? 'SHIP THE CORE' : 'FOCUS TIMER'}
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight text-shadow-glow">
                {formatTimer(activeSeconds)}
              </div>
              <h3 className="text-base font-bold text-white font-display mt-2">
                {rawTitle}
              </h3>
            </div>

            {/* Core checklist */}
            <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 space-y-2 text-xs text-[#CBD5E1]">
              <span className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase block tracking-wider mb-1">
                {activeFocusType === 'core' ? 'Essential Rescue Requirements:' : 'Core Shipping Goal:'}
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>Accept input & generate short hash code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>Redirect short link to destination URL</span>
              </div>
            </div>

            {/* Controls: Pause, Resume, Exit, Ship */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={activeIsPaused ? handleResume : handlePause}
                className="flex-1 py-2.5 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-[#38BDF8]/40 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {!activeIsPaused ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Resume</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExitFocus}
                className="py-2.5 px-3 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-red-500/40 text-[#94A3B8] hover:text-white font-mono font-bold text-xs cursor-pointer transition-colors"
              >
                Exit
              </button>

              <button
                onClick={handleCompleteFocus}
                className="flex-[2] py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md shadow-[#8B5CF6]/30"
              >
                <Check className="w-4 h-4" />
                <span>{activeFocusType === 'core' ? 'Mark Core Shipped' : 'Ship Build'}</span>
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }

  // 2. BUILD RESCUE VIEW
  if (isRescueMode && !isCompleted) {
    return (
      <section className="bg-[#0F172A] border border-[#F97316]/50 rounded-2xl p-4 sm:p-5 transition-all select-none space-y-3 shadow-lg shadow-[#F97316]/10">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider text-[#F97316] uppercase bg-[#F97316]/15 border border-[#F97316]/30 px-2.5 py-0.5 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BUILD RESCUE</span>
            </span>
            <span className="text-[#334155]">•</span>
            <span className="text-[11px] font-mono text-[#94A3B8]">Day {challenge.day}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#F97316] bg-[#EA580C]/10 px-2.5 py-0.5 rounded-md border border-[#F97316]/30 font-mono font-bold">
            <span>~18 min scope</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black font-display text-white tracking-tight">
            {rawTitle}
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
            Limited time tonight? Don't abandon the build. Ship the core and keep your streak intact.
          </p>
        </div>

        <div className="bg-[#050A18] border border-[#1E293B] rounded-xl p-3 space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-[#F97316] uppercase tracking-wider block mb-1">
            RESCUE PLAN (2 ESSENTIALS)
          </span>
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
            <span className="text-[#F97316] font-bold">○</span>
            <span>Accept input & validate destination URL</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
            <span className="text-[#F97316] font-bold">○</span>
            <span>Generate short code & redirect endpoint</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => handleStartFocus('core')}
            className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-mono font-bold text-xs tracking-wide transition-all shadow-md shadow-[#F97316]/30 cursor-pointer"
          >
            <span>Start Rescue (~18 min)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    );
  }

  // 3. NIGHT SHIFT ADAPTIVE VIEW
  if (isNightShift && !isCompleted) {
    return (
      <section className="bg-card-hero rounded-2xl p-4 sm:p-5 transition-all select-none space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-black tracking-wider text-[#38BDF8] uppercase bg-[#0284C7]/15 border border-[#38BDF8]/30 px-2 py-0.5 rounded">
              CURRENT BUILD
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#A78BFA] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-2 py-0.5 rounded-full uppercase">
              <Moon className="w-3 h-3 text-[#A78BFA]" />
              <span>NIGHT SHIFT</span>
            </span>
            <span className="text-[#334155]">•</span>
            <span className="text-[11px] font-mono font-bold text-[#94A3B8]">Day {challenge.day}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#94A3B8] bg-[#050A18] px-2 py-0.5 rounded-md border border-[#1E293B] font-mono font-bold shrink-0">
            <Clock className="w-3 h-3 text-[#38BDF8]" />
            <span>35 min focus</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black font-display text-white tracking-tight">
            {rawTitle}
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
            {tagline} One focused sprint tonight to ship the core.
          </p>
        </div>

        {/* Visual Schematic */}
        {renderMissionTechnicalSchema()}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => handleStartFocus('full')}
            className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono font-bold text-xs tracking-wide transition-all shadow-md shadow-[#8B5CF6]/30 cursor-pointer"
          >
            <span>Start Focus (35 min)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <Link
            to={`/day/${challenge.day}`}
            className="px-3 py-3 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-[#38BDF8]/40 text-[#94A3B8] hover:text-white text-xs font-mono font-bold transition-colors"
            title="View full challenge details"
          >
            Details
          </Link>
        </div>
      </section>
    );
  }

  // 4. STANDARD TONIGHT'S BUILD HERO VIEW (MISSION POSTER FORMAT)
  return (
    <section className="bg-card-hero rounded-2xl p-4 sm:p-5 transition-all select-none relative overflow-hidden group">
      {/* Top Meta Tag Bar */}
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-black tracking-[0.15em] text-[#38BDF8] uppercase bg-[#0284C7]/15 border border-[#38BDF8]/30 px-2 py-0.5 rounded">
            TONIGHT'S BUILD
          </span>
          <span className="text-[#334155]">•</span>
          <span className="text-[11px] font-mono font-bold text-[#A78BFA]">
            DAY {challenge.day} · {duration} MIN · {challenge.difficulty || 'INTERMEDIATE'}
          </span>
        </div>

        {isCompleted && (
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#34D399] bg-[#064E3B]/40 border border-[#10B981]/50 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>SHIPPED</span>
          </div>
        )}
      </div>

      {/* Expressive Mission Title (Poster Format) */}
      <div className="my-3 space-y-0.5">
        {titleLines.map((line, idx) => (
          <h2 
            key={idx}
            className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight uppercase leading-none drop-shadow-sm"
          >
            {line}
          </h2>
        ))}

        <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed pt-2">
          {tagline}
        </p>
      </div>

      {/* Visual Technical Schematic Box */}
      {renderMissionTechnicalSchema()}

      {/* Requirements Summary */}
      <div className="py-2.5 my-2 border-y border-[#1E293B] flex items-center justify-between text-xs font-mono font-medium text-[#94A3B8]">
        <div className="flex items-center gap-1.5 text-white">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span className="font-bold">{reqCount} REQUIREMENTS</span>
        </div>
        <span className="text-[#38BDF8] font-bold">
          {shippedType === 'core' ? 'CORE SHIPPED' : 'PUBLIC PROOF'}
        </span>
      </div>

      {/* Primary Action Button */}
      <div className="pt-1">
        <Link 
          to={`/day/${challenge.day}`} 
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#0284C7] hover:opacity-95 active:scale-[0.99] text-white font-mono font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#8B5CF6]/25 cursor-pointer"
        >
          <span>{isCompleted ? "REVIEW MISSION →" : "START MISSION →"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
