'use client';

import { useState, useEffect } from 'react';
import { getDailyWords, checkGuess, WordData } from '@/lib/words';
import { useContract } from '@/hooks/useContract';
import WordGrid from './WordGrid';
import Keyboard from './Keyboard';
import { Trophy, Zap, HelpCircle } from 'lucide-react';

interface GameProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

const MAX_ATTEMPTS = 6;
const MAX_HINTS = 3;

export default function Game({ difficulty }: GameProps) {
  const [targetWord, setTargetWord] = useState<WordData | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState('');
  
  const { saveProgress, isPending } = useContract();

  useEffect(() => {
    const dailyWords = getDailyWords(new Date());
    setTargetWord(dailyWords[difficulty]);
  }, [difficulty]);

  const handleKeyPress = (key: string) => {
    if (gameOver) return;
    if (!targetWord) return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < targetWord.word.length) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const submitGuess = async () => {
    if (!targetWord) return;
    if (currentGuess.length !== targetWord.word.length) {
      setMessage('Not enough letters');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    const isCorrect = currentGuess.toUpperCase() === targetWord.word;
    const isLastAttempt = newGuesses.length >= MAX_ATTEMPTS;

    if (isCorrect) {
      setWon(true);
      setGameOver(true);
      setMessage('🎉 Excellent!');
      
      // Save to blockchain
      await saveProgress(difficulty, newGuesses.length, hintsUsed, true, true);
    } else if (isLastAttempt) {
      setGameOver(true);
      setMessage(`The word was: ${targetWord.word}`);
      
      // Save to blockchain
      await saveProgress(difficulty, newGuesses.length, hintsUsed, true, false);
    }
  };

  const useHint = () => {
    if (!targetWord || hintsUsed >= MAX_HINTS || gameOver) return;
    
    const availableIndices = Array.from({ length: targetWord.word.length }, (_, i) => i)
      .filter(i => !revealedLetters.has(i));
    
    if (availableIndices.length === 0) return;
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setRevealedLetters(prev => new Set([...prev, randomIndex]));
    setHintsUsed(prev => prev + 1);
    setMessage(`Hint: Letter ${randomIndex + 1} is ${targetWord.word[randomIndex]}`);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!targetWord) return <div>Loading...</div>;

  const results = guesses.map(guess => checkGuess(guess, targetWord.word));

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">{MAX_ATTEMPTS - guesses.length} tries left</span>
        </div>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <span className="font-medium">{MAX_HINTS - hintsUsed} hints left</span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm font-medium text-blue-800">
          {message}
        </div>
      )}

      {/* Hint Display */}
      {targetWord.hint && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-900">
          💡 <strong>Hint:</strong> {targetWord.hint}
        </div>
      )}

      {/* Word Grid */}
      <WordGrid
        guesses={guesses}
        currentGuess={currentGuess}
        targetLength={targetWord.word.length}
        maxAttempts={MAX_ATTEMPTS}
        results={results}
        revealedLetters={revealedLetters}
        targetWord={targetWord.word}
      />

      {/* Keyboard */}
      {!gameOver && (
        <Keyboard onKeyPress={handleKeyPress} results={results} guesses={guesses} />
      )}

      {/* Actions */}
      <div className="flex gap-3 w-full">
        <button
          onClick={useHint}
          disabled={hintsUsed >= MAX_HINTS || gameOver}
          className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Use Hint ({MAX_HINTS - hintsUsed} left)
        </button>
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className={`w-full p-6 rounded-lg ${won ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
          <div className="text-center">
            {won ? (
              <>
                <Trophy className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Victory!</h3>
                <p className="text-green-700">You solved it in {guesses.length} attempts</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-red-800 mb-2">Game Over</h3>
                <p className="text-red-700">The word was: <strong>{targetWord.word}</strong></p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}