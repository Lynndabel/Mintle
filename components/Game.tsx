'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDailyWords, checkGuess, WordData } from '@/lib/words';
import { useContract } from '@/hooks/useContract';
import WordGrid from './WordGrid';
import Keyboard from './Keyboard';
import { Trophy, Zap, HelpCircle, RotateCcw } from 'lucide-react';

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
  const [shake, setShake] = useState(false);
  
  const { saveProgress, isPending } = useContract();

  // Load word for current difficulty
  useEffect(() => {
    const dailyWords = getDailyWords(new Date());
    const word = dailyWords[difficulty];
    setTargetWord(word);
    
    // Reset game state when difficulty changes
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
    setHintsUsed(0);
    setRevealedLetters(new Set());
    setMessage('');
  }, [difficulty]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || !targetWord) return;

      if (e.key === 'Enter') {
        submitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < targetWord.word.length) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver, targetWord]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameOver || !targetWord) return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < targetWord.word.length) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameOver, targetWord]);

  const submitGuess = async () => {
    if (!targetWord) return;
    
    if (currentGuess.length !== targetWord.word.length) {
      setMessage('Not enough letters!');
      setShake(true);
      setTimeout(() => {
        setMessage('');
        setShake(false);
      }, 600);
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
      setMessage('🎉 Brilliant! You got it!');
      
      // Save to blockchain
      try {
        await saveProgress(difficulty, newGuesses.length, hintsUsed, true, true);
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    } else if (isLastAttempt) {
      setGameOver(true);
      setMessage(`Game Over! The word was: ${targetWord.word}`);
      
      // Save to blockchain
      try {
        await saveProgress(difficulty, newGuesses.length, hintsUsed, true, false);
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    } else {
      setMessage(`${MAX_ATTEMPTS - newGuesses.length} attempts remaining`);
      setTimeout(() => setMessage(''), 2000);
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
    setMessage(`💡 Position ${randomIndex + 1}: ${targetWord.word[randomIndex]}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
    setHintsUsed(0);
    setRevealedLetters(new Set());
    setMessage('');
  };

  if (!targetWord) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-500">Loading game...</div>
      </div>
    );
  }

  const results = guesses.map(guess => checkGuess(guess, targetWord.word));

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">{MAX_ATTEMPTS - guesses.length} tries</span>
        </div>
        <div className="text-sm font-bold text-purple-600 uppercase">
          {difficulty} - {targetWord.word.length} letters
        </div>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">{MAX_HINTS - hintsUsed} hints</span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`w-full px-4 py-3 rounded-lg text-sm font-medium text-center transition-all ${
          won 
            ? 'bg-green-50 border-2 border-green-500 text-green-800' 
            : gameOver 
            ? 'bg-red-50 border-2 border-red-500 text-red-800'
            : 'bg-blue-50 border-2 border-blue-300 text-blue-800'
        } ${shake ? 'animate-shake' : ''}`}>
          {message}
        </div>
      )}

      {/* Hint Display */}
      <div className="w-full px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
        💡 <strong>Hint:</strong> {targetWord.hint}
      </div>

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
        <Keyboard 
          onKeyPress={handleKeyPress} 
          results={results} 
          guesses={guesses}
          targetWord={targetWord.word}
        />
      )}

      {/* Actions */}
      <div className="flex gap-3 w-full px-2">
        {!gameOver ? (
          <button
            onClick={useHint}
            disabled={hintsUsed >= MAX_HINTS}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg disabled:shadow-none active:scale-95"
          >
            💡 Use Hint ({MAX_HINTS - hintsUsed} left)
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        )}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className={`w-full p-6 rounded-2xl shadow-xl ${
          won 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500' 
            : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-500'
        }`}>
          <div className="text-center">
            {won ? (
              <>
                <Trophy className="w-16 h-16 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-black text-green-800 mb-2">Victory!</h3>
                <p className="text-green-700 font-medium">
                  Solved in {guesses.length}/{MAX_ATTEMPTS} attempts
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Used {hintsUsed} hint{hintsUsed !== 1 ? 's' : ''}
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl mb-3">😔</div>
                <h3 className="text-2xl font-black text-red-800 mb-2">Game Over</h3>
                <p className="text-red-700 font-medium">
                  The word was: <span className="font-black text-xl">{targetWord.word}</span>
                </p>
                <p className="text-red-600 text-sm mt-2">{targetWord.hint}</p>
              </>
            )}
          </div>
        </div>
      )}

      {isPending && (
        <div className="text-sm text-gray-500">Saving to blockchain...</div>
      )}
    </div>
  );
}