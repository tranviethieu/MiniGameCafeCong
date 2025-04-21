import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { questions } from "~/constants/config/data";
import { message } from "antd";

interface propCrossword {
  crosswordMatrix: string[][];
  currentIndex: number;
  selectedAnswers: { [key: number]: number };
  setCurrentIndex: (data: number) => void;
}
const Crossword: React.FC<propCrossword> = ({
  crosswordMatrix,
  currentIndex,
  setCurrentIndex,
  selectedAnswers,
}) => {
  const isAllCorrect = questions.every(
    (q) => selectedAnswers[q.id] === q.correctIndex
  );
  useEffect(() => {
    if (isAllCorrect)
      message.success("CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH XUẤT SẮC TẤT CẢ CÂU HỎI!");
  }, [isAllCorrect]);
  return (
    <div className="mx-auto">
      <div
        className="flex flex-col gap-[1px] w-fit mx-auto"
        style={{ borderCollapse: "collapse" }}
      >
        {crosswordMatrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex ">
            {/* Số thứ tự */}
            <motion.div
              className="w-6 h-6 me-2 text-white font-bold flex items-center justify-center rounded-full mt-[4px]"
              animate={{
                backgroundColor:
                  rowIndex === currentIndex ? "#4c5b29" : "#ded6be",
                opacity: rowIndex === currentIndex ? 1 : 0.5,
                scale: rowIndex === currentIndex ? 1.1 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={rowIndex}
              onClick={() => {
                setCurrentIndex(rowIndex);
              }}
            >
              {rowIndex + 1}
            </motion.div>

            {/* Ô chữ */}
            <div className="flex gap-[1px]">
              {row.map((cell, colIndex) => {
                const isTransparent = cell === "*";
                const isEmpty = cell === "";
                const hasLetter = !isTransparent && cell !== "";

                if (isTransparent) {
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="w-8 h-8"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    />
                  );
                }

                const bgColor =
                  colIndex === 7 && isAllCorrect
                    ? "bg-[#ded6be]"
                    : isEmpty
                    ? ""
                    : "bg-[#f5f3e7]";

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-8 h-8 text-center flex items-center justify-center font-bold ${bgColor} border border-[#4c5b29]`}
                    style={{ boxSizing: "border-box" }}
                  >
                    {hasLetter ? cell : ""}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Crossword;
