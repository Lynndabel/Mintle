'use client';

import { useContract } from '@/hooks/useContract';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const { leaderboard } = useContract();

  if (!leaderboard) return <div>Loading leaderboard...</div>;

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-500 font-bold">{index + 1}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🏆 Leaderboard</h2>
      <div className="space-y-3">
        {leaderboard.players.map((player, index) => (
          <div
            key={player}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 flex justify-center">
                {getRankIcon(index)}
              </div>
              <div>
                <div className="font-mono text-sm text-gray-600">
                  {player.slice(0, 6)}...{player.slice(-4)}
                </div>
              </div>
            </div>
            <div className="text-xl font-bold text-purple-600">
              {leaderboard.scores[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}