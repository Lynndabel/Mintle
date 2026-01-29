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
  const emptyRows = Math.max(0, maxAttempts - guesses.length - 1);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Completed guesses */}
      {guesses.map((guess, rowIndex) => (
        <div key={`guess-${rowIndex}`} className="flex gap-1.5 justify-center">
          {guess.split('').map((letter, colIndex) => {
            const status = results[rowIndex][colIndex];
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 
                  flex items-center justify-center 
                  text-xl sm:text-2xl font-black 
                  rounded-lg 
                  transition-all duration-300
                  ${status === 'correct' 
                    ? 'bg-green-500 text-white scale-105 shadow-lg' 
                    : status === 'present' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-400 text-white'
                  }
                `}
                style={{
                  animationDelay: `${colIndex * 100}ms`,
                }}
              >
                {letter.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}

      {/* Current guess row (active input) */}
      {guesses.length < maxAttempts && (
        <div className="flex gap-1.5 justify-center">
          {Array.from({ length: targetLength }).map((_, colIndex) => {
            const letter = currentGuess[colIndex];
            const isRevealed = revealedLetters.has(colIndex);
            
            return (
              <div
                key={`current-${colIndex}`}
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 
                  flex items-center justify-center 
                  text-xl sm:text-2xl font-black 
                  rounded-lg 
                  border-2 
                  transition-all duration-200
                  ${isRevealed
                    ? 'bg-blue-100 border-blue-500 text-blue-800 shadow-md' 
                    : letter
                    ? 'border-purple-500 bg-purple-50 text-purple-900 scale-105'
                    : 'border-gray-300 bg-white text-gray-400'
                  }
                  ${letter && !isRevealed ? 'animate-pop' : ''}
                `}
              >
                {isRevealed ? targetWord[colIndex] : letter?.toUpperCase() || ''}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty rows */}
      {Array.from({ length: emptyRows }).map((_, rowIndex) => (
        <div key={`empty-${rowIndex}`} className="flex gap-1.5 justify-center">
          {Array.from({ length: targetLength }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50"
            />
          ))}
        </div>
      ))}
    </div>
  );
}