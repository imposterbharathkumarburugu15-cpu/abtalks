import { StudentProfile, DemoPreset } from '../types';

export const INITIAL_PROOF_HISTORY: StudentProfile['proofs'] = {
  1: {
    day: 1,
    title: "CLI Personal Portfolio",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/cli-portfolio-abtalks",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day1-ship",
    submittedAt: "2026-07-28",
    shipped: true
  },
  2: {
    day: 2,
    title: "Markdown README Generator",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/readme-gen",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day2-ship",
    submittedAt: "2026-07-29",
    shipped: true
  },
  3: {
    day: 3,
    title: "JSON Data Cleaner Script",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/json-cleaner",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day3-ship",
    submittedAt: "2026-07-30",
    shipped: true
  },
  4: {
    day: 4,
    title: "GitHub Profile Analyzer",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/github-analyzer",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day4-ship",
    submittedAt: "2026-07-31",
    shipped: true
  },
  5: {
    day: 5,
    title: "Simple Web Scraper & Alert",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/price-scraper",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day5-ship",
    submittedAt: "2026-08-01",
    shipped: true
  },
  6: {
    day: 6,
    title: "SQLite Fast Notes Engine",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/sqlite-notes",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day6-ship",
    submittedAt: "2026-08-02",
    shipped: true
  },
  7: {
    day: 7,
    title: "JWT Token Authenticator",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/jwt-auth",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day7-ship",
    submittedAt: "2026-08-03",
    shipped: true
  },
  8: {
    day: 8,
    title: "CSV Matrix Math Engine",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/matrix-math",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day8-ship",
    submittedAt: "2026-08-04",
    shipped: true
  },
  9: {
    day: 9,
    title: "Interactive SQL Explorer",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/sql-explorer",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day9-ship",
    submittedAt: "2026-08-05",
    shipped: true
  },
  10: {
    day: 10,
    title: "React Developer Dashboard",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/react-dashboard-v1",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day10-ship",
    submittedAt: "2026-08-06",
    shipped: true
  },
  11: {
    day: 11,
    title: "RESTful API Mock Engine",
    track: "AI / ML",
    githubUrl: "https://github.com/bharath-dev/rest-api-engine",
    linkedinUrl: "https://linkedin.com/posts/bharath-dev_abtalks-day11-ship",
    submittedAt: "2026-08-07",
    shipped: true
  }
};

export const DEFAULT_STUDENT: StudentProfile = {
  name: "Bharath",
  college: "IIT Madras",
  track: "AI / ML",
  currentDay: 14,
  streak: 13,
  completedBuilds: 13,
  githubProofs: 13,
  linkedinProofs: 12,
  proofs: INITIAL_PROOF_HISTORY,
  stateMode: 'normal'
};

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'normal',
    label: 'Standard Streak (Day 12)',
    description: '11 builds shipped in a row. Ready to ship Day 12 URL Shortener.',
    profile: DEFAULT_STUDENT
  },
  {
    id: 'first_day',
    label: 'Day 1 (New Student)',
    description: 'Fresh start on Day 1. Welcome state with first mission prompt.',
    profile: {
      name: "Bharath",
      college: "IIT Madras",
      track: "AI / ML",
      currentDay: 1,
      streak: 0,
      completedBuilds: 0,
      githubProofs: 0,
      linkedinProofs: 0,
      proofs: {},
      stateMode: 'first_day'
    }
  },
  {
    id: 'missed_day',
    label: 'Missed Day / Paused',
    description: 'Student missed yesterday. Gentle resume state with zero judgment.',
    profile: {
      name: "Bharath",
      college: "IIT Madras",
      track: "AI / ML",
      currentDay: 14,
      streak: 0,
      completedBuilds: 12,
      githubProofs: 12,
      linkedinProofs: 11,
      proofs: INITIAL_PROOF_HISTORY,
      stateMode: 'missed_day'
    }
  },
  {
    id: 'completed',
    label: 'Completed (Day 60)',
    description: 'All 60 builds shipped! Full streak legend status.',
    profile: {
      name: "Bharath",
      college: "IIT Madras",
      track: "AI / ML",
      currentDay: 60,
      streak: 60,
      completedBuilds: 60,
      githubProofs: 60,
      linkedinProofs: 60,
      proofs: INITIAL_PROOF_HISTORY,
      stateMode: 'completed'
    }
  }
];
