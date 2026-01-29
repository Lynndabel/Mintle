// lib/daily-tracker.ts
import { getTodayString } from './utils';

export interface DailyProgress {
  easy: boolean;
  medium: boolean;
  hard: boolean;
  date: string;
}

const STORAGE_KEY = 'blockchain-wordle-daily';

export function getTodayProgress(): DailyProgress {
  if (typeof window === 'undefined') {
    return { easy: false, medium: false, hard: false, date: getTodayString() };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const today = getTodayString();

  if (!stored) {
    return { easy: false, medium: false, hard: false, date: today };
  }

  const progress: DailyProgress = JSON.parse(stored);

  // Reset if it's a new day
  if (progress.date !== today) {
    return { easy: false, medium: false, hard: false, date: today };
  }

  return progress;
}

export function markDifficultyCompleted(difficulty: 'easy' | 'medium' | 'hard'): void {
  if (typeof window === 'undefined') return;

  const progress = getTodayProgress();
  progress[difficulty] = true;
  progress.date = getTodayString();
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isDifficultyCompleted(difficulty: 'easy' | 'medium' | 'hard'): boolean {
  const progress = getTodayProgress();
  return progress[difficulty];
}

export function getCompletedCount(): number {
  const progress = getTodayProgress();
  return [progress.easy, progress.medium, progress.hard].filter(Boolean).length;
}

export function getAllCompleted(): boolean {
  const progress = getTodayProgress();
  return progress.easy && progress.medium && progress.hard;
}

export function getTimeUntilReset(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}