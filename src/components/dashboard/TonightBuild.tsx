import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, Moon, AlertTriangle, Pause, Play, Check, Zap, Sparkles, Terminal, Link2, FileCode2, Cpu } from 'lucide-react';
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

  const renderMissionTechnicalSchema = () => {
    const t = rawTitle.toLowerCase();
    
    if (t.includes('url') || t.includes('shortener')) {
      return (
        <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 my-3 space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between text-[#A6AAA8] text-[10px] pb-1 border-b border-[#252C2E]">
            <span className="flex items-center gap-1 text-[#69B39A]">
              <Link2 className="w-3 h-3 text-[#69B39A]" />
              TECHNICAL SCHEMATIC
            </span>
            <span className="text-[#69B39A] font-bold">SHA-256 ENCODER</span>
          </div>

          <div className="flex items-center justify-between gap-1 text-[#F1EEE7]">
            <div className="bg-[#14191B] px-2 py-1 rounded border border-[#252C2E] truncate max-w-[130px] text-[#A6AAA8]">
              https://abtalks.dev/ch/d12...
            </div>
            <div className="text-[#69B39A] font-bold flex items-center gap-0.5">
              ➔ [hash] ➔
            </div>
            <div className="bg-[#191F21] px-2 py-1 rounded border border-[#252C2E] text-[#69B39A] font-bold shrink-0">
              abt.lk/x9k8z
            </div>
          </div>
        </div>
      );
    }

    if (t.includes('readme') || t.includes('markdown')) {
      return (
        <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 my-3 space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between text-[#A6AAA8] text-[10px] pb-1 border-b border-[#252C2E]">
            <span className="flex items-center gap-1 text-[#69B39A]">
              <FileCode2 className="w-3 h-3 text-[#69B39A]" />
              PARSER SCHEMA
            </span>
            <span className="text-[#718A96] font-bold">AST GENERATOR</span>
          </div>

          <div className="flex items-center justify-between gap-1 text-[#F1EEE7]">
            <div className="bg-[#14191B] px-2 py-1 rounded border border-[#252C2E] text-[#A6AAA8]">
              # Raw Notes
            </div>
            <div className="text-[#69B39A] font-bold">➔</div>
            <div className="bg-[#191F21] px-2 py-1 rounded border border-[#252C2E] text-[#69B39A] font-bold">
              Structured README.md
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 my-3 space-y-2 font-mono text-[11px]">
        <div className="flex items-center justify-between text-[#A6AAA8] text-[10px] pb-1 border-b border-[#252C2E]">
          <span className="flex items-center gap-1 text-[#69B39A]">
            <Cpu className="w-3 h-3 text-[#69B39A]" />
            CONCEPT ARCHITECTURE
          </span>
          <span className="text-[#69B39A] font-bold">DAY {challenge.day} BUILD</span>
        </div>

        <div className="flex items-center justify-between gap-1 text-[#F1EEE7]">
          <div className="bg-[#14191B] px-2 py-1 rounded border border-[#252C2E] text-[#A6AAA8]">
            [ Core Requirements ]
          </div>
          <div className="text-[#69B39A] font-bold">➔</div>
          <div className="bg-[#191F21] px-2 py-1 rounded border border-[#252C2E] text-[#69B39A] font-bold">
            [ Shipped Artifact ]
          </div>
        </div>
      </div>
    );
  };

  // 1. FOCUS MODE ACTIVE VIEW
  if (activeInFocus) {
    return (
      <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 sm:p-5 select-none font-sans">
        {focusSuccess ? (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#6FA889]/15 border border-[#6FA889] flex items-center justify-center mx-auto text-[#6FA889]">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#6FA889] uppercase block">
                {activeFocusType === 'core' ? 'CORE SHIPPED ✓' : 'BUILD SHIPPED ✓'}
              </span>
              <h3 className="text-xl font-bold text-[#F1EEE7] font-display mt-0.5">
                Day {challenge.day} Complete
              </h3>
              <p className="text-xs text-[#A6AAA8] mt-1 max-w-xs mx-auto leading-relaxed font-sans">
                {activeFocusType === 'core' 
                  ? 'Core requirements verified. Build record and streak updated!' 
                  : 'Full build shipped to public record. Outstanding work!'}
              </p>
            </div>
            <div className="pt-2 flex gap-2 justify-center">
              <button
                onClick={handleExitFocus}
                className="px-5 py-2.5 rounded-xl bg-[#69B39A] text-[#090B0D] text-xs font-mono font-bold cursor-pointer transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#252C2E] pb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider text-[#69B39A] bg-[#191F21] border border-[#252C2E] px-2.5 py-0.5 rounded-full uppercase">
                  {activeFocusType === 'core' ? <Zap className="w-3 h-3 text-[#C58A52]" /> : <Moon className="w-3 h-3 text-[#69B39A]" />}
                  <span>{activeFocusType === 'core' ? 'BUILD RESCUE FOCUS' : 'NIGHT SHIFT FOCUS'}</span>
                </span>
              </div>
              <button
                onClick={handleExitFocus}
                className="text-xs font-mono text-[#A6AAA8] hover:text-[#F1EEE7] transition-colors cursor-pointer px-2 py-1 rounded bg-[#090B0D] border border-[#252C2E]"
              >
                Exit Focus
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-xs font-mono font-bold text-[#69B39A] block uppercase tracking-wider mb-1">
                {activeFocusType === 'core' ? 'SHIP THE CORE' : 'FOCUS TIMER'}
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-black text-[#F1EEE7] tracking-tight">
                {formatTimer(activeSeconds)}
              </div>
              <h3 className="text-base font-bold text-[#F1EEE7] font-display mt-2">
                {rawTitle}
              </h3>
            </div>

            <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 space-y-2 text-xs text-[#F1EEE7]">
              <span className="text-[10px] font-mono font-bold text-[#A6AAA8] uppercase block tracking-wider mb-1">
                {activeFocusType === 'core' ? 'Essential Rescue Requirements:' : 'Core Shipping Goal:'}
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#69B39A] shrink-0" />
                <span>Accept input &amp; generate short hash code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#69B39A] shrink-0" />
                <span>Redirect short link to destination URL</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={activeIsPaused ? handleResume : handlePause}
                className="flex-1 py-2.5 rounded-xl bg-[#191F21] border border-[#252C2E] text-[#F1EEE7] font-mono font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {!activeIsPaused ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#C58A52]" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#69B39A]" />
                    <span>Resume</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExitFocus}
                className="py-2.5 px-3 rounded-xl bg-[#191F21] border border-[#252C2E] text-[#A6AAA8] hover:text-[#F1EEE7] font-mono font-bold text-xs cursor-pointer transition-colors"
              >
                Exit
              </button>

              <button
                onClick={handleCompleteFocus}
                className="flex-[2] py-2.5 rounded-xl bg-[#69B39A] hover:bg-[#69B39A]/90 text-[#090B0D] font-mono font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
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
      <section className="bg-[#14191B] border border-[#C58A52]/60 rounded-xl p-4 sm:p-5 select-none space-y-3 font-sans">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider text-[#C58A52] uppercase bg-[#191F21] border border-[#C58A52]/40 px-2.5 py-0.5 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BUILD RESCUE</span>
            </span>
            <span className="text-[#252C2E]">•</span>
            <span className="text-[11px] font-mono text-[#A6AAA8]">Day {challenge.day}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#C58A52] bg-[#191F21] px-2.5 py-0.5 rounded-md border border-[#252C2E] font-mono font-bold">
            <span>~18 min scope</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black font-display text-[#F1EEE7] tracking-tight">
            {rawTitle}
          </h2>
          <p className="text-xs text-[#A6AAA8] mt-1 leading-relaxed font-sans">
            Limited time tonight? Don't abandon the build. Ship the core and keep your streak intact.
          </p>
        </div>

        <div className="bg-[#090B0D] border border-[#252C2E] rounded-xl p-3 space-y-1.5 font-mono">
          <span className="text-[10px] font-mono font-bold text-[#C58A52] uppercase tracking-wider block mb-1">
            RESCUE PLAN (2 ESSENTIALS)
          </span>
          <div className="flex items-center gap-2 text-xs text-[#F1EEE7]">
            <span className="text-[#C58A52] font-bold">○</span>
            <span>Accept input &amp; validate destination URL</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F1EEE7]">
            <span className="text-[#C58A52] font-bold">○</span>
            <span>Generate short code &amp; redirect endpoint</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => handleStartFocus('core')}
            className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-[#C58A52] hover:bg-[#C58A52]/90 text-[#090B0D] font-mono font-bold text-xs tracking-wide transition-all cursor-pointer"
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
      <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 sm:p-5 select-none space-y-3 font-sans">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-black tracking-wider text-[#69B39A] uppercase bg-[#191F21] border border-[#252C2E] px-2 py-0.5 rounded">
              CURRENT BUILD
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#718A96] bg-[#191F21] border border-[#252C2E] px-2 py-0.5 rounded-full uppercase">
              <Moon className="w-3 h-3 text-[#718A96]" />
              <span>NIGHT SHIFT</span>
            </span>
            <span className="text-[#252C2E]">•</span>
            <span className="text-[11px] font-mono font-bold text-[#A6AAA8]">Day {challenge.day}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#A6AAA8] bg-[#090B0D] px-2 py-0.5 rounded-md border border-[#252C2E] font-mono font-bold shrink-0">
            <Clock className="w-3 h-3 text-[#69B39A]" />
            <span>35 min focus</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black font-display text-[#F1EEE7] tracking-tight">
            {rawTitle}
          </h2>
          <p className="text-xs text-[#A6AAA8] mt-1 leading-relaxed font-sans">
            {tagline} One focused sprint tonight to ship the core.
          </p>
        </div>

        {renderMissionTechnicalSchema()}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => handleStartFocus('full')}
            className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-[#69B39A] hover:bg-[#69B39A]/90 text-[#090B0D] font-mono font-bold text-xs tracking-wide transition-all cursor-pointer"
          >
            <span>Start Focus (35 min)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <Link
            to={`/day/${challenge.day}`}
            className="px-3 py-3 rounded-xl bg-[#191F21] border border-[#252C2E] hover:border-[#69B39A] text-[#A6AAA8] hover:text-[#F1EEE7] text-xs font-mono font-bold transition-colors"
            title="View full challenge details"
          >
            Details
          </Link>
        </div>
      </section>
    );
  }

  // 4. STANDARD TONIGHT'S BUILD HERO VIEW
  return (
    <section className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 sm:p-5 select-none relative font-sans">
      {/* Top Meta Tag Bar */}
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-black tracking-[0.15em] text-[#69B39A] uppercase bg-[#191F21] border border-[#252C2E] px-2 py-0.5 rounded">
            TONIGHT'S BUILD
          </span>
          <span className="text-[#252C2E]">•</span>
          <span className="text-[11px] font-mono font-bold text-[#718A96]">
            DAY {challenge.day} · {duration} MIN · {challenge.difficulty || 'INTERMEDIATE'}
          </span>
        </div>

        {isCompleted && (
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#6FA889] bg-[#191F21] border border-[#252C2E] px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-[#6FA889]" />
            <span>SHIPPED</span>
          </div>
        )}
      </div>

      {/* Expressive Mission Title */}
      <div className="my-3 space-y-0.5">
        {titleLines.map((line, idx) => (
          <h2 
            key={idx}
            className="text-2xl sm:text-3xl font-black font-display text-[#F1EEE7] tracking-tight uppercase leading-none"
          >
            {line}
          </h2>
        ))}

        <p className="text-xs sm:text-sm text-[#A6AAA8] font-sans leading-relaxed pt-2">
          {tagline}
        </p>
      </div>

      {/* Visual Technical Schematic Box */}
      {renderMissionTechnicalSchema()}

      {/* Requirements Summary */}
      <div className="py-2.5 my-2 border-y border-[#252C2E] flex items-center justify-between text-xs font-mono font-medium text-[#A6AAA8]">
        <div className="flex items-center gap-1.5 text-[#F1EEE7]">
          <Sparkles className="w-3.5 h-3.5 text-[#69B39A]" />
          <span className="font-bold">{reqCount} REQUIREMENTS</span>
        </div>
        <span className="text-[#69B39A] font-bold">
          {shippedType === 'core' ? 'CORE SHIPPED' : 'PUBLIC PROOF'}
        </span>
      </div>

      {/* Primary Action Button */}
      <div className="pt-1">
        <Link 
          to={`/day/${challenge.day}`} 
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#69B39A] hover:bg-[#69B39A]/90 active:scale-[0.99] text-[#090B0D] font-mono font-extrabold text-xs tracking-wider uppercase transition-all cursor-pointer"
        >
          <span>{isCompleted ? "REVIEW MISSION →" : "START MISSION →"}</span>
          <ArrowRight className="w-4 h-4 text-[#090B0D]" />
        </Link>
      </div>
    </section>
  );
};

