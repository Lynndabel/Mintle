// hooks/useContract.ts
import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { parseAbiItem } from 'viem';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

const CONTRACT_ABI = [
  parseAbiItem('function saveProgress(string difficulty, uint8 attemptsUsed, uint8 hintsUsed, bool completed, bool won) external'),
  parseAbiItem('function getPlayerStats(address player) external view returns (uint256, uint256, uint256, uint256, uint256, uint256)'),
  parseAbiItem('function getLeaderboard(uint256 limit) external view returns (address[], uint256[])'),
  parseAbiItem('function getCurrentDay() external view returns (uint256)'),
] as const;

export function useContract() {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const saveProgress = async (
    difficulty: 'easy' | 'medium' | 'hard',
    attemptsUsed: number,
    hintsUsed: number,
    completed: boolean,
    won: boolean
  ) => {
    if (!address) return;
    
    await writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'saveProgress',
      args: [difficulty, attemptsUsed, hintsUsed, completed, won],
    });
  };

  const { data: statsData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerStats',
    args: address ? [address] : undefined,
  });

  const { data: leaderboardData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getLeaderboard',
    args: [BigInt(10)],
  });

  return {
    saveProgress,
    isPending,
    stats: statsData ? {
      easyWins: Number(statsData[0]),
      mediumWins: Number(statsData[1]),
      hardWins: Number(statsData[2]),
      currentStreak: Number(statsData[3]),
      maxStreak: Number(statsData[4]),
      totalGamesPlayed: Number(statsData[5]),
    } : null,
    leaderboard: leaderboardData ? {
      players: leaderboardData[0],
      scores: leaderboardData[1].map(s => Number(s)),
    } : null,
  };
}