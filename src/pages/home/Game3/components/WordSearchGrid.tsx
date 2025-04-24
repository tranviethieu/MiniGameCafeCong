// components/WordSearchGrid.tsx

import React, { useState } from "react";

const wordGrid = [
  ["N", "C", "O", "T", "D", "U", "A", "R", "N"],
  ["C", "U", "C", "A", "P", "H", "E", "G", "D"],
  ["O", "E", "A", "H", "A", "H", "B", "D", "B"],
  ["C", "B", "Y", "E", "U", "N", "U", "O", "C"],
  ["X", "N", "B", "M", "A", "P", "W", "D", "A"],
  ["A", "F", "N", "K", "O", "A", "Z", "N", "Z"],
  ["N", "X", "Z", "S", "U", "D", "D", "I", "O"],
  ["H", "C", "A", "B", "F", "E", "Q", "W", "H"],
  ["N", "E", "S", "B", "A", "C", "X", "I", "U"],
];
const wordList = ["COCXANH", "COTDUA", "YEUNUOC", "CAPHE", "BACXIU"]; // Tuỳ chỉnh

type Coord = [number, number];

const WordSearchGrid: React.FC = () => {
  const [selected, setSelected] = useState<Coord[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCoords, setFoundCoords] = useState<Coord[]>([]);

  const handleMouseDown = (coord: Coord) => {
    setSelected([coord]);
    setIsMouseDown(true);
  };

  const handleMouseEnter = (coord: Coord) => {
    if (isMouseDown) {
      setSelected((prev) => {
        if (!prev.find(([r, c]) => r === coord[0] && c === coord[1])) {
          return [...prev, coord];
        }
        return prev;
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);

    const selectedWord = selected
      .map(([r, c]) => wordGrid[r][c])
      .join("")
      .toUpperCase();
    const reversedWord = selectedWord.split("").reverse().join("");

    if (wordList.includes(selectedWord)) {
      setFoundWords((prev) =>
        [...prev, selectedWord].filter((v, i, a) => a.indexOf(v) === i)
      );
      setFoundCoords((prev) => [...prev, ...selected]);
    } else if (wordList.includes(reversedWord)) {
      setFoundWords((prev) =>
        [...prev, reversedWord].filter((v, i, a) => a.indexOf(v) === i)
      );
      setFoundCoords((prev) => [...prev, ...[...selected].reverse()]);
    }

    setSelected([]);
  };

  const isSelected = (r: number, c: number) =>
    selected.some(([sr, sc]) => sr === r && sc === c);

  const isFound = (r: number, c: number) =>
    foundCoords.some(([fr, fc]) => fr === r && fc === c);

  return (
    <div
      className="grid grid-cols-9 gap-1 p-4 bg-neutral-100 rounded-md shadow-md w-max mx-auto select-none mt-4"
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      {wordGrid.map((row, rowIndex) =>
        row.map((letter, colIndex) => {
          const coord: Coord = [rowIndex, colIndex];
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              data-coord={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 flex items-center justify-center border text-lg font-bold bg-white cursor-pointer
                ${isSelected(rowIndex, colIndex) ? "bg-yellow-300" : ""}
                ${isFound(rowIndex, colIndex) ? "bg-green-300" : ""}
              `}
              onMouseDown={() => handleMouseDown(coord)}
              onMouseEnter={() => handleMouseEnter(coord)}
              onTouchStart={() => handleMouseDown(coord)}
              onTouchMove={(e) => {
                const target = document.elementFromPoint(
                  e.touches[0].clientX,
                  e.touches[0].clientY
                ) as HTMLElement;
                if (target?.dataset?.coord) {
                  const [r, c] = target.dataset.coord.split("-").map(Number);
                  handleMouseEnter([r, c]);
                }
              }}
            >
              {letter}
            </div>
          );
        })
      )}

      <div className="col-span-9 mt-4 text-center">
        <p className="font-semibold">Đã tìm:</p>
        {foundWords.length === 0 ? (
          <p className="text-gray-500 italic">Chưa có từ nào</p>
        ) : (
          <ul className="flex justify-center gap-4 mt-2 flex-wrap">
            {foundWords.map((word, idx) => (
              <li key={idx} className="text-green-600 font-bold">
                {word}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WordSearchGrid;
