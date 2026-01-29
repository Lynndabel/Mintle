import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function getWordKey(difficulty: 'easy' | 'medium' | 'hard'): string {
  return `wordle-${difficulty}-${getTodayString()}`;
}

export function saveGameState(difficulty: 'easy' | 'medium' | 'hard', state: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(getWordKey(difficulty), JSON.stringify(state));
  }
}

export function loadGameState(difficulty: 'easy' | 'medium' | 'hard') {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(getWordKey(difficulty));
    return saved ? JSON.parse(saved) : null;
  }
  return null;
}

export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}