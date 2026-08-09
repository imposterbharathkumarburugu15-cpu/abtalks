import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StudentProfile, Challenge } from '../../types';
import { CHALLENGES } from '../../data/challenges';
import { useNightShift } from '../../hooks/useNightShift';
import { 
  Sparkles as SparklesIcon, 
  X as XIcon, 
  Send as SendIcon, 
  Zap as ZapIcon, 
  Clock, 
  Lightbulb, 
  AlertTriangle, 
  Target, 
  Code2, 
  Star, 
  ChevronRight, 
  FileText
} from 'lucide-react';
import { ABMascot } from './ABMascot';

interface ABCoachProps {
  student: StudentProfile;
  onStudentUpdate?: (updated: StudentProfile) => void;
  isNightShift?: boolean;
  isRescueMode?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'coach' | 'student';
  text: string;
  timestamp: string;
  actions?: { label: string; action: string; variant?: 'primary' | 'secondary' }[];
  hintLevel?: number;
}

export const ABCoach: React.FC<ABCoachProps> = ({
  student,
  onStudentUpdate,
  isNightShift: isNightShiftProp,
  isRescueMode = false
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const autoNightShift = useNightShift();
  const isNightShift = isNightShiftProp !== undefined ? isNightShiftProp : autoNightShift;

  const dayMatch = location.pathname.match(/\/day\/(\d+)/);
  const routeDay = dayMatch ? parseInt(dayMatch[1], 10) : student.currentDay || 12;
  const challenge: Challenge = CHALLENGES[routeDay] || CHALLENGES[12];
  const isShipped = !!student.proofs[routeDay]?.shipped;

  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dismissedStateKeys, setDismissedStateKeys] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('abtalks_coach_dismissed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hintStep, setHintStep] = useState(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const getProactiveContext = () => {
    const isMissedDay = student.stateMode === 'missed_day';

    if (isShipped) {
      return {
        key: `day_${routeDay}_shipped`,
        title: 'BUILD SHIPPED',
        text: `Day ${routeDay} is officially on your record. ${student.completedBuilds} builds shipped. Keep going.`,
        badge: 'RECORD UPDATED',
        primaryBtn: { label: 'VIEW PROOF VAULT', onClick: () => navigate('/proofs') }
      };
    }

    if (isMissedDay) {
      return {
        key: `day_${routeDay}_missed`,
        title: 'STREAK RESCUE',
        text: `Yesterday didn't happen. That's okay. Your previous ${student.completedBuilds} builds are safe. Let's get today's one shipped.`,
        badge: 'RESCUE MODE',
        primaryBtn: { label: 'GET BACK IN →', onClick: () => setIsDrawerOpen(true) }
      };
    }

    if (isRescueMode) {
      return {
        key: `day_${routeDay}_rescue`,
        title: 'LIMITED TIME',
        text: `You've got less time tonight. I'd switch to Build Rescue. Ship the two core requirements instead of forcing the full build.`,
        badge: 'BUILD RESCUE',
        primaryBtn: { label: 'USE RESCUE', onClick: () => navigate(`/day/${routeDay}`) }
      };
    }

    if (isNightShift) {
      return {
        key: `day_${routeDay}_nightshift`,
        title: 'NIGHT SHIFT ACTIVE',
        text: `Late night? Don't try to overbuild this one. Ship the core requirements and call it a win.`,
        badge: 'NIGHT SHIFT',
        primaryBtn: { label: 'START FOCUS', onClick: () => navigate(`/day/${routeDay}`) }
      };
    }

    if (location.pathname === '/dashboard') {
      return {
        key: `day_${routeDay}_dashboard`,
        title: `DAY ${routeDay} OPEN`,
        text: `Hey ${student.name || 'Builder'} 👋\n\nYou're on Day ${routeDay}. ${student.completedBuilds} builds shipped already. Tonight's build takes about 35 minutes.\n\nReady to ship one more?`,
        badge: 'CURRENT MISSION',
        primaryBtn: { label: "LET'S BUILD →", onClick: () => navigate(`/day/${routeDay}`) },
        secondaryBtn: { label: 'NOT YET', onClick: () => dismissBubble(`day_${routeDay}_dashboard`) }
      };
    }

    if (location.pathname.startsWith('/day/')) {
      return {
        key: `day_${routeDay}_workspace`,
        title: challenge.title,
        text: `You're working on ${challenge.title}. Need a quick architectural breakdown or hint to ship faster?`,
        badge: 'BUILD ASSISTANT',
        primaryBtn: { label: 'ASK COACH', onClick: () => setIsDrawerOpen(true) }
      };
    }

    return null;
  };

  const proactiveContext = getProactiveContext();

  useEffect(() => {
    const handleOpen = () => {
      setIsDrawerOpen(true);
      setIsBubbleVisible(false);
    };
    window.addEventListener('open-abcoach', handleOpen);
    return () => window.removeEventListener('open-abcoach', handleOpen);
  }, []);

  useEffect(() => {
    if (!proactiveContext) return;
    const { key } = proactiveContext;

    if (!dismissedStateKeys[key]) {
      const timer = setTimeout(() => {
        setIsBubbleVisible(true);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setIsBubbleVisible(false);
    }
  }, [location.pathname, routeDay, isNightShift, isRescueMode, student.stateMode, isShipped]);

  useEffect(() => {
    if (isDrawerOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isDrawerOpen]);

  const dismissBubble = (key: string) => {
    setIsBubbleVisible(false);
    const updated = { ...dismissedStateKeys, [key]: true };
    setDismissedStateKeys(updated);
    try {
      localStorage.setItem('abtalks_coach_dismissed', JSON.stringify(updated));
    } catch (e) {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    if (isDrawerOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome_1',
          sender: 'coach',
          text: `Hey ${student.name || 'Builder'}, I'm AB Coach. I'm tracking your Day ${routeDay} build (${challenge.title}).\n\nHow can I help you get this shipped tonight?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { label: "Explain today's task", action: 'explain_task' },
            { label: 'Give me a hint', action: 'give_hint' },
            { label: "I'm stuck", action: 'im_stuck' },
            { label: 'Check my approach', action: 'check_approach' }
          ]
        }
      ]);
    }
  }, [isDrawerOpen]);

  const handleSendMessage = (customText?: string, actionKey?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend && !actionKey) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'student',
      text: textToSend || actionKey || '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      let replyText = '';
      let replyActions: { label: string; action: string; variant?: 'primary' | 'secondary' }[] = [];

      const query = (textToSend || actionKey || '').toLowerCase();

      if (actionKey === 'explain_task' || query.includes('explain') || query.includes('task')) {
        replyText = `You're building: ${challenge.title}.\n\nCore Goals:\n1. ${challenge.shipMinimum[0] || 'Implement main core function'}\n2. ${challenge.shipMinimum[1] || 'Handle edge cases cleanly'}\n3. ${challenge.shipMinimum[2] || 'Prepare repository for public proof'}\n\nKeep it simple. You don't need unnecessary features tonight — just ship the core requirements.`;
        replyActions = [
          { label: 'Give me a hint', action: 'give_hint' },
          { label: "I'm stuck", action: 'im_stuck' }
        ];
      } else if (actionKey === 'give_hint' || query.includes('hint')) {
        if (hintStep === 0) {
          setHintStep(1);
          replyText = `Hint 1/2 for ${challenge.title}:\n\n${challenge.hint?.title || 'Core Data Structure'}:\nThink about the core relationship between your input and output. What simple data structure maps key -> value cleanly in memory?`;
          replyActions = [
            { label: '⚡ STRONGER HINT', action: 'stronger_hint', variant: 'primary' },
            { label: 'Check my approach', action: 'check_approach' }
          ];
        } else {
          replyText = `Hint 2/2:\n\n${challenge.hint?.content || 'Try using a HashMap or Object where short code is key and target URL is value. For hashes, a standard 6-character Base62 string works reliably.'}`;
          replyActions = [
            { label: "I'm stuck", action: 'im_stuck' },
            { label: 'What should I do next?', action: 'what_next' }
          ];
        }
      } else if (actionKey === 'stronger_hint') {
        setHintStep(2);
        replyText = `Stronger Hint for ${challenge.title}:\n\n${challenge.hint?.content || 'Use an object store: const db = new Map(); map.set(shortId, longUrl). On request, if (db.has(id)) return db.get(id).'}\n\nSnippet concept:\n${challenge.hint?.codeSnippet || 'const shortCode = Math.random().toString(36).substring(2, 8);'}`;
        replyActions = [
          { label: 'Got it, let us build', action: 'lets_build' },
          { label: 'Check my approach', action: 'check_approach' }
        ];
      } else if (actionKey === 'im_stuck' || query.includes('stuck')) {
        replyText = `Common places builders get stuck on Day ${routeDay}:\n\n1. Over-engineering setup: Don't spend 30 minutes on CSS styling before functional logic works.\n2. URL validation: Use standard 'new URL(str)' parsing.\n3. Base encoding: Random 6-char strings are fine for Day ${routeDay}.\n\nWhich requirement are you currently on?`;
        replyActions = [
          { label: 'Requirement 1', action: 'req_1' },
          { label: 'Requirement 2', action: 'req_2' },
          { label: 'Give me code hint', action: 'give_hint' }
        ];
      } else if (actionKey === 'check_approach' || query.includes('approach') || query.includes('how to')) {
        replyText = `When structuring ${challenge.title}, verify these 2 things:\n\n1. How will you guarantee keys/IDs are retrieved without collision?\n2. How will you verify invalid inputs won't crash your engine?\n\nIf those 2 pieces work, your architecture is solid. Describe your idea and I'll review it!`;
        replyActions = [
          { label: 'What should I do next?', action: 'what_next' }
        ];
      } else if (actionKey === 'what_next' || query.includes('next')) {
        replyText = `Your immediate next step:\n\n1. Verify core logic runs locally.\n2. Check off all items in the Ship Minimum checklist.\n3. Push to GitHub and post your proof on LinkedIn!`;
        replyActions = [
          { label: 'Go to Proof Submission', action: 'go_proof', variant: 'primary' }
        ];
      } else if (actionKey === 'go_proof') {
        navigate(`/day/${routeDay}`);
        setIsDrawerOpen(false);
        return;
      } else if (actionKey === 'lets_build') {
        navigate(`/day/${routeDay}`);
        setIsDrawerOpen(false);
        return;
      } else {
        replyText = `I hear you. For Day ${routeDay} (${challenge.title}), focus on getting the minimum working prototype. Ship the core requirement first, then test it locally.`;
        replyActions = [
          { label: 'Give me a hint', action: 'give_hint' },
          { label: 'What should I do next?', action: 'what_next' }
        ];
      }

      const coachResponse: ChatMessage = {
        id: `cch_${Date.now()}`,
        sender: 'coach',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: replyActions
      };

      setMessages((prev) => [...prev, coachResponse]);
    }, 400);
  };

  return (
    <>
      {/* 1. PROACTIVE SPEECH BUBBLE OVERLAY */}
      {isBubbleVisible && proactiveContext && !isDrawerOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-3 left-3 sm:left-auto sm:right-4 sm:max-w-xs z-40 font-sans">
          <div className="bg-[#14191B] border border-[#252C2E] rounded-xl p-3.5 relative overflow-hidden backdrop-blur-md">
            
            {/* Top Bar with Coach Badge & Dismiss X */}
            <div className="flex items-center justify-between border-b border-[#252C2E] pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-[#69B39A] flex items-center justify-center text-[#090B0D] text-[10px] font-black">
                  ✦
                </span>
                <span className="text-[11px] font-black font-display text-[#F1EEE7] tracking-wider">
                  AB COACH
                </span>
                <span className="text-[9px] font-mono text-[#69B39A] bg-[#191F21] px-1.5 py-0.5 rounded border border-[#252C2E] font-bold uppercase">
                  {proactiveContext.badge}
                </span>
              </div>

              <button
                type="button"
                onClick={() => dismissBubble(proactiveContext.key)}
                className="p-1 rounded-lg text-[#A6AAA8] hover:text-[#F1EEE7] transition-colors cursor-pointer"
                title="Dismiss message"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Message Body */}
            <p className="text-xs text-[#F1EEE7] leading-relaxed font-sans whitespace-pre-line mb-3">
              {proactiveContext.text}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1 font-mono">
              <button
                type="button"
                onClick={() => {
                  dismissBubble(proactiveContext.key);
                  proactiveContext.primaryBtn.onClick();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#69B39A] text-[#090B0D] font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <span>{proactiveContext.primaryBtn.label}</span>
              </button>

              {proactiveContext.secondaryBtn && (
                <button
                  type="button"
                  onClick={proactiveContext.secondaryBtn.onClick}
                  className="py-2 px-2.5 rounded-xl bg-[#090B0D] border border-[#252C2E] text-[#A6AAA8] hover:text-[#F1EEE7] font-bold text-[10px] uppercase cursor-pointer"
                >
                  {proactiveContext.secondaryBtn.label}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING TRIGGER PILL */}
      {!isDrawerOpen && (
        <button
          type="button"
          onClick={() => {
            setIsBubbleVisible(false);
            setIsDrawerOpen(true);
          }}
          className="fixed bottom-16 sm:bottom-20 right-3 z-40 bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A] text-[#F1EEE7] px-3.5 py-2 rounded-full flex items-center gap-2 group transition-all duration-300 cursor-pointer active:scale-95 font-sans"
          title="Open AB Coach"
        >
          <div className="w-5 h-5 rounded-full bg-[#69B39A] flex items-center justify-center text-[#090B0D] text-[10px] font-black">
            ✦
          </div>
          <span className="text-xs font-bold font-mono tracking-wide text-[#F1EEE7] group-hover:text-[#69B39A]">
            AB COACH
          </span>
          <span className="w-2 h-2 rounded-full bg-[#6FA889]" />
        </button>
      )}

      {/* 3. COMPACT BOTTOM-SHEET CHAT DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#090B0D]/80 backdrop-blur-sm font-sans">
          <div className="bg-[#090B0D] border-t border-x border-[#252C2E] rounded-t-xl w-full max-w-[390px] h-[82vh] flex flex-col relative overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-3 bg-[#111A22] border-b border-[#252C2E] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#14191B] border border-[#252C2E] flex items-center justify-center text-[#69B39A]">
                  <SparklesIcon className="w-4 h-4 text-[#69B39A]" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-display text-[#F1EEE7] uppercase tracking-wider flex items-center gap-2">
                    <span>AB COACH</span>
                    <span className="text-[10px] font-mono text-[#6FA889] bg-[#191F21] border border-[#252C2E] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-xs text-[#A6AAA8] font-mono">
                    Your build companion • Day {routeDay}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A] text-[#A6AAA8] hover:text-[#F1EEE7] flex items-center justify-center cursor-pointer transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-4 font-sans text-xs scrollbar-none">
              
              {/* HERO COACH CARD WITH MASCOT */}
              <div className="bg-[#14191B] border border-[#252C2E] rounded-xl p-4 relative overflow-hidden flex items-center justify-between gap-3">
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#69B39A]">
                    <SparklesIcon className="w-3.5 h-3.5 text-[#69B39A]" />
                    <span>AB COACH</span>
                  </div>
                  <p className="text-xs text-[#F1EEE7] leading-relaxed font-sans font-medium">
                    Hey <span className="font-bold text-[#F1EEE7]">{student.name || 'Bharath'}</span>, I'm AB Coach. I'm tracking your Day {routeDay} build ({challenge.title}).
                  </p>
                  <p className="text-xs text-[#A6AAA8] font-sans">
                    How can I help you get this shipped tonight?
                  </p>
                </div>

                <div className="shrink-0 relative">
                  <ABMascot size={64} />
                </div>
              </div>

              {/* SUGGESTED ACTIONS SECTION */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest">
                  <span className="shrink-0">SUGGESTED ACTIONS</span>
                  <span className="h-px bg-[#252C2E] flex-1" />
                </div>

                {/* 2x2 Grid of Actions */}
                <div className="grid grid-cols-2 gap-2 font-sans">
                  <button
                    type="button"
                    onClick={() => handleSendMessage('', 'explain_task')}
                    className="p-3 rounded-xl bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A] text-left transition-all cursor-pointer group space-y-1.5 active:scale-95"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#111A22] border border-[#252C2E] flex items-center justify-center text-[#69B39A]">
                      <Lightbulb className="w-4 h-4 text-[#69B39A]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F1EEE7] group-hover:text-[#69B39A] transition-colors leading-tight">
                        Explain today's task
                      </div>
                      <div className="text-[10px] text-[#A6AAA8] font-sans">
                        Break it down
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage('', 'give_hint')}
                    className="p-3 rounded-xl bg-[#14191B] border border-[#252C2E] hover:border-[#C58A52] text-left transition-all cursor-pointer group space-y-1.5 active:scale-95"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#111A22] border border-[#252C2E] flex items-center justify-center text-[#C58A52]">
                      <ZapIcon className="w-4 h-4 text-[#C58A52]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F1EEE7] group-hover:text-[#C58A52] transition-colors leading-tight">
                        Give me a hint
                      </div>
                      <div className="text-[10px] text-[#A6AAA8] font-sans">
                        Nudge in right direction
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage('', 'im_stuck')}
                    className="p-3 rounded-xl bg-[#14191B] border border-[#252C2E] hover:border-[#C58A52] text-left transition-all cursor-pointer group space-y-1.5 active:scale-95"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#111A22] border border-[#252C2E] flex items-center justify-center text-[#C58A52]">
                      <AlertTriangle className="w-4 h-4 text-[#C58A52]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F1EEE7] group-hover:text-[#C58A52] transition-colors leading-tight">
                        I'm stuck
                      </div>
                      <div className="text-[10px] text-[#A6AAA8] font-sans">
                        Help me unblock
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage('', 'check_approach')}
                    className="p-3 rounded-xl bg-[#14191B] border border-[#252C2E] hover:border-[#718A96] text-left transition-all cursor-pointer group space-y-1.5 active:scale-95"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#111A22] border border-[#252C2E] flex items-center justify-center text-[#718A96]">
                      <Target className="w-4 h-4 text-[#718A96]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F1EEE7] group-hover:text-[#718A96] transition-colors leading-tight">
                        Check my approach
                      </div>
                      <div className="text-[10px] text-[#A6AAA8] font-sans">
                        Review my plan
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* TODAY'S CONTEXT SECTION */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#69B39A] uppercase tracking-widest">
                  <span className="shrink-0">TODAY'S CONTEXT</span>
                  <span className="h-px bg-[#252C2E] flex-1" />
                </div>

                <div className="bg-[#14191B] border border-[#252C2E] rounded-xl p-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#111A22] border border-[#252C2E] flex items-center justify-center text-[#69B39A]">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#A6AAA8]">Current Build</div>
                      <div className="font-bold text-[#F1EEE7]">{challenge.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#111A22] border border-[#252C2E] flex items-center justify-center text-[#718A96]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#A6AAA8]">Time Focus</div>
                      <div className="font-bold text-[#F1EEE7]">{challenge.durationMinutes || 35} min session</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#14191B] border border-[#252C2E] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#F1EEE7] font-mono">Day {routeDay} Progress</span>
                    <span className="text-[10px] font-mono text-[#A6AAA8]">2 / 3 tasks completed</span>
                    <span className="font-mono font-bold text-[#69B39A]">66%</span>
                  </div>

                  <div className="w-full h-2 bg-[#090B0D] rounded-full overflow-hidden border border-[#252C2E]">
                    <div className="h-full bg-[#69B39A] rounded-full w-[66%]" />
                  </div>
                </div>

                <div className="bg-[#14191B] border border-[#252C2E] rounded-xl p-3 flex items-center justify-between gap-3 hover:border-[#69B39A] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#111A22] border border-[#252C2E] flex items-center justify-center text-[#C58A52] shrink-0">
                      <Star className="w-4 h-4 text-[#C58A52] fill-[#C58A52]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#C58A52] uppercase">PRO TIP</div>
                      <div className="text-xs text-[#F1EEE7] font-sans">
                        Focus on implementing core routing first. It's the core of today's build.
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A6AAA8] group-hover:text-[#F1EEE7] shrink-0 transition-colors" />
                </div>
              </div>

              {/* CHAT MESSAGES IF ANY */}
              {messages.length > 1 && (
                <div className="space-y-3 pt-2 border-t border-[#252C2E]">
                  {messages.slice(1).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div
                        className={`p-3 rounded-xl max-w-[88%] leading-relaxed ${
                          msg.sender === 'student'
                            ? 'bg-[#69B39A] text-[#090B0D] font-semibold font-sans'
                            : 'bg-[#14191B] border border-[#252C2E] text-[#F1EEE7] font-sans whitespace-pre-line'
                        }`}
                      >
                        {msg.sender === 'coach' && (
                          <div className="text-[9px] font-mono font-bold text-[#69B39A] uppercase mb-1 flex items-center gap-1">
                            <span>✦ AB COACH</span>
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>

                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1 max-w-[90%] font-mono">
                          {msg.actions.map((act) => (
                            <button
                              key={act.action}
                              type="button"
                              onClick={() => handleSendMessage('', act.action)}
                              className={`text-[10px] font-bold px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                                act.variant === 'primary'
                                  ? 'bg-[#69B39A] text-[#090B0D] border-[#69B39A]'
                                  : 'bg-[#111A22] border-[#252C2E] text-[#F1EEE7] hover:border-[#69B39A]'
                              }`}
                            >
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}

                      <span className="text-[8px] font-mono text-[#A6AAA8] px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* QUICK ACTION BUTTONS BAR */}
            <div className="p-2 bg-[#111A22] border-t border-[#252C2E] overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none font-mono">
              <button
                type="button"
                onClick={() => handleSendMessage('', 'explain_task')}
                className="text-[10px] font-bold text-[#F1EEE7] bg-[#14191B] border border-[#252C2E] hover:border-[#69B39A] px-3 py-1.5 rounded-xl shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-[#69B39A]" />
                <span>Explain task</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('', 'give_hint')}
                className="text-[10px] font-bold text-[#F1EEE7] bg-[#14191B] border border-[#252C2E] hover:border-[#C58A52] px-3 py-1.5 rounded-xl shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <ZapIcon className="w-3 h-3 text-[#C58A52]" />
                <span>Hint</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('', 'im_stuck')}
                className="text-[10px] font-bold text-[#F1EEE7] bg-[#14191B] border border-[#252C2E] hover:border-[#C58A52] px-3 py-1.5 rounded-xl shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3 h-3 text-[#C58A52]" />
                <span>I'm stuck</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('', 'check_approach')}
                className="text-[10px] font-bold text-[#F1EEE7] bg-[#14191B] border border-[#252C2E] hover:border-[#718A96] px-3 py-1.5 rounded-xl shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Target className="w-3 h-3 text-[#718A96]" />
                <span>Check</span>
              </button>
            </div>

            {/* Chat Input Field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#090B0D] border-t border-[#252C2E] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask AB Coach about Day ${routeDay}...`}
                className="flex-1 bg-[#111A22] border border-[#252C2E] focus:border-[#69B39A] rounded-xl px-3.5 py-2.5 text-xs text-[#F1EEE7] placeholder-[#A6AAA8] focus:outline-none font-mono"
              />

              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#69B39A] flex items-center justify-center text-[#090B0D] cursor-pointer hover:bg-[#69B39A]/90 shrink-0 transition-transform active:scale-95"
              >
                <SendIcon className="w-4 h-4 text-[#090B0D]" />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

