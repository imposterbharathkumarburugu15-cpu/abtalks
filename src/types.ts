export type TrackType = 'AI / ML' | 'Full-Stack Web' | 'Backend Systems' | 'Mobile Apps';

export interface Requirement {
  id: string;
  text: string;
  completed: boolean;
}

export interface Challenge {
  day: number;
  title: string;
  track: TrackType;
  description: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  shipMinimum: string[];
  hint?: {
    title: string;
    content: string;
    codeSnippet?: string;
  };
  conceptsCovered: string[];
}

export interface ProofEntry {
  day: number;
  title: string;
  track: TrackType;
  githubUrl: string;
  linkedinUrl: string;
  submittedAt: string;
  shipped: boolean;
  shippedType?: 'full' | 'core';
}

export interface StudentProfile {
  name: string;
  college?: string;
  track: TrackType;
  currentDay: number;
  streak: number;
  completedBuilds: number;
  githubProofs: number;
  linkedinProofs: number;
  proofs: Record<number, ProofEntry>;
  stateMode: 'normal' | 'first_day' | 'missed_day' | 'completed';
}

export interface DemoPreset {
  id: string;
  label: string;
  description: string;
  profile: StudentProfile;
}
