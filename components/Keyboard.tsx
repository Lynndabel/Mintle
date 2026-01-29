// components/Keyboard.tsx
interface KeyboardProps {
  onKeyPress: (key: string) => void;
  results: ('correct' | 'present' | 'absent')[][];
  guesses: string[];
  targetWord: string;
}

export default function Keyboard({ onKeyPress, results, guesses, targetWord }: KeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const getKeyStatus = (key: string): 'correct' | 'present' | 'absent' | 'unused' => {
    let status: 'correct' | 'present' | 'absent' | 'unused' = 'unused';
    
    guesses.forEach((guess, guessIndex) => {
      guess.split('').forEach((letter, letterIndex) => {
        if (letter.toUpperCase() === key) {
          const currentStatus = results[guessIndex][letterIndex];
          
          // Priority: correct > present > absent
          if (currentStatus === 'correct') {
            status = 'correct';
          } else if (currentStatus === 'present' && status !== 'correct') {
            status = 'present';
          } else if (currentStatus === 'absent' && status === 'unused') {
            status = 'absent';
          }
        }
      });
    });
    
    return status;
  };

  const getKeyClassName = (key: string): string => {
    const status = getKeyStatus(key);
    const base = 'font-bold py-3 rounded-lg transition-all active:scale-95 select-none cursor-pointer ';
    
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return base + 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xs px-2 shadow-md';
    }
    
    switch (status) {
      case 'correct':
        return base + 'bg-green-500 hover:bg-green-600 text-white shadow-md';
      case 'present':
        return base + 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md';
      case 'absent':
        return base + 'bg-gray-400 hover:bg-gray-500 text-white';
      default:
        return base + 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 shadow-sm';
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-lg px-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={
                getKeyClassName(key) + 
                (key.length > 1 ? ' flex-1 max-w-[80px]' : ' w-8 sm:w-10')
              }
            >
              {key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? '↵' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}