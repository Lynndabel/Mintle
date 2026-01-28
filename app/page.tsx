'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import Game from '@/components/Game';
import { Trophy, Target, Flame } from 'lucide-react';
import { useContract } from '@/hooks/useContract';

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const { stats } = useContract();

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      sdk.actions.ready();
      setIsSDKLoaded(true);
    };
    
    if (sdk && !isSDKLoaded) {
      load();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="text-white text-xl">Loading Blockchain Wordle...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-2">⛓️ Blockchain Wordle</h1>
          <p className="text-white/80 text-lg">Guess blockchain words. Build your streak.</p>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                <div className="text-2xl font-bold text-white">{stats.currentStreak}</div>
                <div className="text-xs text-white/70">Streak</div>
              </div>
              <div>
                <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                <div className="text-2xl font-bold text-white">{stats.totalGamesPlayed}</div>
                <div className="text-xs text-white/70">Wins</div>
              </div>
              <div>
                <Target className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <div className="text-2xl font-bold text-white">{stats.maxStreak}</div>
                <div className="text-xs text-white/70">Best</div>
              </div>
            </div>
          </div>
        )}

        {/* Difficulty Selector */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">Choose Difficulty</h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setDifficulty('easy')}
              className={`py-4 px-6 rounded-xl font-bold transition-all ${
                difficulty === 'easy'
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty('medium')}
              className={`py-4 px-6 rounded-xl font-bold transition-all ${
                difficulty === 'medium'
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty('hard')}
              className={`py-4 px-6 rounded-xl font-bold transition-all ${
                difficulty === 'hard'
                  ? 'bg-red-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Hard
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <Game difficulty={difficulty} />
        </div>
      </div>
    </div>
  );
}