'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import Game from '@/components/Game';

export const metadata = {
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://eldrow-ecru.vercel.app/og-image.png',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://eldrow-ecru.vercel.app',
  }
};
import Leaderboard from '@/components/Leaderboard';
import { Trophy, Target, Flame, Crown } from 'lucide-react';
import { useContract } from '@/hooks/useContract';

type DifficultyType = 'easy' | 'medium' | 'hard';
type ViewType = 'difficulty' | 'game' | 'leaderboard';

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyType>('easy');
  const [view, setView] = useState<ViewType>('difficulty');
  const { stats } = useContract();

  useEffect(() => {
    const load = async () => {
      try {
        const context = await sdk.context;
        if (context) {
          setIsSDKLoaded(true);
        }
        await sdk.actions.ready();
        setIsSDKLoaded(true);
      } catch (error) {
        console.log('Running outside Farcaster, continuing anyway');
        setIsSDKLoaded(true);
      }
    };
    
    if (sdk && !isSDKLoaded) {
      load();
    }
  }, [isSDKLoaded]);

  const startGame = (selectedDifficulty: DifficultyType) => {
    setDifficulty(selectedDifficulty);
    setView('game');
  };

  const backToDifficulty = () => {
    setView('difficulty');
  };

  if (!isSDKLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="text-white text-xl font-bold animate-pulse">
          Loading Blockchain Wordle...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
            ⛓️ Blockchain Wordle
          </h1>
          <p className="text-white/90 text-base sm:text-lg font-medium">
            Guess blockchain words. Build your streak.
          </p>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-4 shadow-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Flame className="w-5 h-5 text-orange-400 mb-1" />
                <div className="text-2xl font-black text-white">{stats.currentStreak}</div>
                <div className="text-xs text-white/80 font-medium">Streak</div>
              </div>
              <div className="flex flex-col items-center">
                <Trophy className="w-5 h-5 text-yellow-400 mb-1" />
                <div className="text-2xl font-black text-white">{stats.totalGamesPlayed}</div>
                <div className="text-xs text-white/80 font-medium">Wins</div>
              </div>
              <div className="flex flex-col items-center">
                <Target className="w-5 h-5 text-green-400 mb-1" />
                <div className="text-2xl font-black text-white">{stats.maxStreak}</div>
                <div className="text-xs text-white/80 font-medium">Best</div>
              </div>
            </div>
          </div>
        )}

        {/* View Toggle - Only show on difficulty/leaderboard views */}
        {view !== 'game' && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setView('difficulty')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                view === 'difficulty'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              🎮 Play
            </button>
            <button
              onClick={() => setView('leaderboard')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                view === 'leaderboard'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              👑 Leaderboard
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8">
          {view === 'leaderboard' ? (
            <Leaderboard />
          ) : view === 'difficulty' ? (
            /* Difficulty Selector */
            <div>
              <h2 className="text-gray-800 font-black text-xl sm:text-2xl mb-6 text-center">
                Choose Your Challenge
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => startGame('easy')}
                  className="w-full py-6 px-6 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-br from-green-400 to-green-600 text-white shadow-xl"
                >
                  <div className="text-3xl mb-2">🟢</div>
                  <div className="text-xl mb-1">Easy</div>
                  <div className="text-sm opacity-90">4-5 letter words</div>
                </button>
                
                <button
                  onClick={() => startGame('medium')}
                  className="w-full py-6 px-6 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xl"
                >
                  <div className="text-3xl mb-2">🟡</div>
                  <div className="text-xl mb-1">Medium</div>
                  <div className="text-sm opacity-90">6-8 letter words</div>
                </button>
                
                <button
                  onClick={() => startGame('hard')}
                  className="w-full py-6 px-6 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-xl"
                >
                  <div className="text-3xl mb-2">🔴</div>
                  <div className="text-xl mb-1">Hard</div>
                  <div className="text-sm opacity-90">9+ letter words</div>
                </button>
              </div>
            </div>
          ) : (
            /* Game View */
            <Game 
              key={difficulty}
              difficulty={difficulty} 
              onBackToDifficulty={backToDifficulty}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          <p>Built on Base • Powered by Farcaster</p>
        </div>
      </div>
    </div>
  );
}