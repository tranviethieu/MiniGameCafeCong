import React from "react";
import { motion } from "framer-motion";
import { wordGrid } from "~/constants/config/data";
import cong3 from "~/constants/images/cong3";

type Coord = [number, number];

interface Props {
  selected: Coord[];
  foundCoords: Coord[];
  onMouseDown: (coord: Coord) => void;
  onMouseEnter: (coord: Coord) => void;
  onMouseUp: () => void;
}

const WordSearchGrid: React.FC<Props> = ({
  selected,
  foundCoords,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const isSelected = (r: number, c: number) =>
    selected.some(([sr, sc]) => sr === r && sc === c);

  const isFound = (r: number, c: number) =>
    foundCoords.some(([fr, fc]) => fr === r && fc === c);

  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        <img src={cong3.ke} className="w-5 h-6" alt="ke" />
        <strong className="my-auto text-[14px] font-[BeauLuloClean]">
          GIẢI Ô CHỮ SAU:
        </strong>
      </div>

      <div className="flex gap-1 mb-2">
        <img src={cong3.co} className="w-6" alt="co1" />
        <p className="font-bold text-[12px] font-[BeauLuloClean] underline underline-offset-4">
          Ô CHỮ
        </p>
      </div>

      <p className="italic text-xs">
        (*) Gồm 5 từ có ý nghĩa, liên quan đến đồ uống Cộng và tinh thần của
        chiến dịch.
      </p>

      <motion.img
        src={cong3.lg}
        alt="lg"
        className="w-[200px] mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div
        className="grid grid-cols-9 gap-1 p-2 bg-[#e7e5db] rounded-md shadow-xl w-max mx-auto select-none"
        onMouseUp={onMouseUp}
        onTouchEnd={onMouseUp}
        style={{ border: "2px solid #d4ad5b" }}
      >
        {wordGrid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const coord: Coord = [rowIndex, colIndex];
            const delay = (rowIndex * 9 + colIndex) * 0.03; // delay theo index

            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                data-coord={`${rowIndex}-${colIndex}`}
                className={`w-9 h-9 flex items-center justify-center border text-[20px] font-bold cursor-pointer
                  ${
                    isFound(rowIndex, colIndex)
                      ? "bg-green-300"
                      : isSelected(rowIndex, colIndex)
                      ? "bg-yellow-300"
                      : ""
                  }
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.3 }}
                onMouseDown={() => onMouseDown(coord)}
                onMouseEnter={() => onMouseEnter(coord)}
                onTouchStart={() => onMouseDown(coord)}
                onTouchMove={(e) => {
                  const target = document.elementFromPoint(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                  ) as HTMLElement;
                  if (target?.dataset?.coord) {
                    const [r, c] = target.dataset.coord.split("-").map(Number);
                    onMouseEnter([r, c]);
                  }
                }}
              >
                {letter}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WordSearchGrid;
