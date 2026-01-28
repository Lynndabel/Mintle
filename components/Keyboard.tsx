// components/Keyboard.tsx
interface KeyboardProps {
  onKeyPress: (key: string) => void;
  results: ('correct' | 'present' | 'absent')[][];
  guesses: string[];
}

export default function Keyboard({ onKeyPress, results, guesses }: KeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const getKeyStatus = (key: string): string => {
    let status = 'unused';
    
    guesses.forEach((guess, guessIndex) => {
      guess.split('').forEach((letter, letterIndex) => {
        if (letter.toUpperCase() === key) {
          if (results[guessIndex][letterIndex] === 'correct') {
            status = 'correct';
          } else if (results[guessIndex][letterIndex] === 'present' && status !== 'correct') {
            status = 'present';
          } else if (status === 'unused') {
            status = 'absent';
          }
        }
      });
    });
    
    return status;
  };

  const getKeyClassName = (key: string): string => {
    const status = getKeyStatus(key);
    const base = 'font-bold py-4 px-2 rounded-lg transition-all active:scale-95 ';
    
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return base + 'bg-blue-500 hover:bg-blue-600 text-white text-xs';
    }
    
    switch (status) {
      case 'correct':
        return base + 'bg-green-500 text-white';
      case 'present':
        return base + 'bg-yellow-500 text-white';
      case 'absent':
        return base + 'bg-gray-400 text-white';
      default:
        return base + 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyClassName(key) + (key.length > 1 ? ' flex-grow' : ' w-10')}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}