import { StudentProfile, ProofEntry, TrackType } from '../types';
import { DEFAULT_STUDENT, DEMO_PRESETS } from '../data/student';

const STORAGE_KEY = 'abtalks_student_profile_v2';

export function getStoredStudent(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STUDENT;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STUDENT, ...parsed };
  } catch (e) {
    console.error('Failed to load student profile', e);
    return DEFAULT_STUDENT;
  }
}

export function saveStoredStudent(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save student profile', e);
  }
}

export function shipBuild(
  day: number,
  title: string,
  track: TrackType,
  githubUrl: string,
  linkedinUrl: string,
  shippedType: 'full' | 'core' = 'full'
): StudentProfile {
  const current = getStoredStudent();
  const nowStr = new Date().toISOString().split('T')[0];

  const newProof: ProofEntry = {
    day,
    title,
    track,
    githubUrl: githubUrl || `https://github.com/student/abtalks-day${day}`,
    linkedinUrl: linkedinUrl || `https://linkedin.com/posts/student_abtalks_day${day}`,
    submittedAt: nowStr,
    shipped: true,
    shippedType
  };

  const updatedProofs = {
    ...current.proofs,
    [day]: newProof
  };

  const wasAlreadyShipped = !!current.proofs[day]?.shipped;
  const newCompletedBuilds = wasAlreadyShipped ? current.completedBuilds : current.completedBuilds + 1;
  const newStreak = wasAlreadyShipped ? current.streak : current.streak + 1;
  const nextDay = Math.min(60, Math.max(current.currentDay, day + 1));

  const updated: StudentProfile = {
    ...current,
    currentDay: nextDay,
    streak: newStreak,
    completedBuilds: newCompletedBuilds,
    githubProofs: current.githubProofs + (githubUrl ? 1 : 0),
    linkedinProofs: current.linkedinProofs + (linkedinUrl ? 1 : 0),
    proofs: updatedProofs,
    stateMode: 'normal'
  };

  saveStoredStudent(updated);
  return updated;
}

export function switchDemoPreset(presetId: string): StudentProfile {
  const preset = DEMO_PRESETS.find(p => p.id === presetId) || DEMO_PRESETS[0];
  saveStoredStudent(preset.profile);
  return preset.profile;
}

export function updateStudentTrack(track: TrackType): StudentProfile {
  const current = getStoredStudent();
  const updated = { ...current, track };
  saveStoredStudent(updated);
  return updated;
}

export function updateStudentName(name: string, college?: string): StudentProfile {
  const current = getStoredStudent();
  const updated = { ...current, name, college: college || current.college };
  saveStoredStudent(updated);
  return updated;
}

export function resetStudentProfile(): StudentProfile {
  saveStoredStudent(DEFAULT_STUDENT);
  return DEFAULT_STUDENT;
}
