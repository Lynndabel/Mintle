// components/WordGrid.tsx
interface WordGridProps {
  guesses: string[];
  currentGuess: string;
  targetLength: number;
  maxAttempts: number;
  results: ('correct' | 'present' | 'absent')[][];
  revealedLetters: Set<number>;
  targetWord: string;
}

export default function WordGrid({
  guesses,
  currentGuess,
  targetLength,
  maxAttempts,
  results,
  revealedLetters,
  targetWord,
}: WordGridProps) {
  const emptyRows = maxAttempts - guesses.length - 1;

  return (
    <div className="flex flex-col gap-2">
      {/* Completed guesses */}
      {guesses.map((guess, i) => (
        <div key={i} className="flex gap-2">
          {guess.split('').map((letter, j) => (
            <div
              key={j}
              className={`w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg ${
                results[i][j] === 'correct'
                  ? 'bg-green-500 text-white'
                  : results[i][j] === 'present'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-400 text-white'
              }`}
            >
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
      ))}

      {/* Current guess row */}
      {guesses.length < maxAttempts && (
        <div className="flex gap-2">
          {Array.from({ length: targetLength }).map((_, i) => {
            const letter = currentGuess[i];
            const isRevealed = revealedLetters.has(i);
            
            return (
              <div
                key={i}
                className={`w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 ${
                  isRevealed
                    ? 'bg-blue-100 border-blue-500 text-blue-800'
                    : letter
                    ? 'border-gray-400 bg-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {isRevealed ? targetWord[i] : letter?.toUpperCase() || ''}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty rows */}
      {Array.from({ length: emptyRows }).map((_, i) => (
        <div key={`empty-${i}`} className="flex gap-2">
          {Array.from({ length: targetLength }).map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 border-gray-300 bg-white"
            />
          ))}
        </div>
      ))}
    </div>
  );
}