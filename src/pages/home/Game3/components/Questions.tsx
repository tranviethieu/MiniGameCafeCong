import { questions, STORAGE_KEY } from "~/constants/config/data";
import Crossword from "./Crossword";
import { useEffect, useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import cong3 from "~/constants/images/cong3";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  selectedAnswers: { [key: number]: number };
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
};

const Questions = ({ selectedAnswers, setSelectedAnswers }: Props) => {
  const [crosswordMatrix, setCrosswordMatrix] = useState<string[][]>([
    ["*", "*", "", "", "", "", "", "", "*"],
    ["", "", "", "", "", "", "", "", ""],
    ["*", "*", "*", "", "", "", "", "", ""],
    ["*", "*", "*", "*", "", "", "", "", "*"],
    ["*", "*", "", "", "", "", "", "", "*"],
    ["*", "*", "*", "", "", "", "", "", ""],
    ["*", "*", "", "", "", "", "", "", "*"],
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const currentQuestion = questions[currentIndex];

  // Helper: remove Vietnamese diacritics
  const removeDiacritics = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const handleSelect = (answerIndex: number) => {
    // Prepare answer: remove spaces, remove diacritics, uppercase, split
    const selectedAnswer = removeDiacritics(
      currentQuestion.options[answerIndex].replace(/\s/g, "")
    )
      .toUpperCase()
      .split("");

    setSelectedAnswers((prev) => {
      const updated = {
        ...prev,
        [currentQuestion.id]: answerIndex,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    // Fill crossword matrix for current row
    const newMatrix = crosswordMatrix.map((row) => [...row]);
    const rowIndex = currentIndex;
    let letterIndex = 0;
    for (let col = 0; col < newMatrix[rowIndex].length; col++) {
      if (newMatrix[rowIndex][col] !== "*") {
        if (letterIndex < selectedAnswer.length) {
          newMatrix[rowIndex][col] = selectedAnswer[letterIndex];
          letterIndex++;
        } else {
          newMatrix[rowIndex][col] = "";
        }
      }
    }
    setCrosswordMatrix(newMatrix);
  };

  const isSelected = (index: number) =>
    selectedAnswers[currentQuestion.id] === index;
  const shouldHighlight = (index: number) => isSelected(index);

  // On mount: restore saved answers into matrix
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedAnswers: { [key: number]: number } = JSON.parse(saved);
      const newMatrix = crosswordMatrix.map((row) => [...row]);
      Object.entries(savedAnswers).forEach(([questionId, answerIndex]) => {
        const question = questions.find((q) => q.id === Number(questionId));
        if (!question) return;
        const answerStr = removeDiacritics(
          question.options[answerIndex].replace(/\s/g, "")
        ).toUpperCase();
        const letters = answerStr.split("");
        const rowIdx = questions.findIndex((q) => q.id === Number(questionId));
        let letterIdx = 0;
        for (let col = 0; col < newMatrix[rowIdx].length; col++) {
          if (newMatrix[rowIdx][col] !== "*") {
            if (letterIdx < letters.length) {
              newMatrix[rowIdx][col] = letters[letterIdx];
              letterIdx++;
            } else {
              newMatrix[rowIdx][col] = "";
            }
          }
        }
      });
      setCrosswordMatrix(newMatrix);
    }
  }, []);

  return (
    <div className="text-[#4c5b29] font-[Cousine] text-sm space-y-3 flex flex-col">
      <div className="flex gap-1">
        <img src={cong3.ke} className="w-5 h-6" alt="ke" />
        <strong className="my-auto text-[14px] font-[BeauLuloClean]">
          GIẢI Ô CHỮ SAU:
        </strong>
      </div>

      <div>
        <div className="flex gap-1 mb-2">
          <img src={cong3.co} className="w-6" alt="co1" />
          <p className="font-bold text-[12px] font-[BeauLuloClean] underline underline-offset-4">
            CÂU HỎI
          </p>
        </div>
        <div className="h-full mx-auto min-h-[150px] flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.id}
              initial={{ x: direction === "right" ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === "right" ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-grow space-y-4"
            >
              <p className="text-sm font-medium">{currentQuestion.text}</p>
              <div className="flex gap-4 flex-wrap justify-around my-auto">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      // 1. Highlight ngay
                      handleSelect(index);

                      // 2. Delay 2s rồi mới set direction + chuyển câu
                      setTimeout(() => {
                        setDirection("left");
                        setCurrentIndex((prev) =>
                          Math.min(prev + 1, questions.length - 1)
                        );
                      }, 1500);
                    }}
                    className="cursor-pointer transition"
                  >
                    <strong
                      className={`inline-flex items-center justify-center w-6 h-6 ps-1 mr-1 border text-center rounded-full
                ${shouldHighlight(index) ? " ring-2 ring-[#b62924]" : ""}`}
                    >
                      {String.fromCharCode(65 + index)}.
                    </strong>
                    {option}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end mt-auto">
            <div className="flex items-center gap-1 bg-[#4c5b29] text-[#e7e5db] px-3 py-1 rounded-full text-sm font-bold">
              <button
                onClick={() => {
                  setDirection("right");
                  setCurrentIndex((prev) => Math.max(prev - 1, 0));
                }}
                disabled={currentIndex === 0}
                className="disabled:opacity-50"
              >
                <ArrowLeft2 size={16} />
              </button>
              <span>
                {currentIndex + 1}/{questions.length}
              </span>
              <button
                onClick={() => {
                  setDirection("left");
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, questions.length - 1)
                  );
                }}
                disabled={currentIndex === questions.length - 1}
                className="disabled:opacity-50"
              >
                <ArrowRight2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 mb-2">
        <img src={cong3.co} className="w-6" alt="co1" />
        <p className="font-bold text-[12px] font-[BeauLuloClean] underline underline-offset-4">
          Ô CHỮ
        </p>
      </div>
      <p className="italic text-xs">(*) Lưu ý đáp án không dấu</p>
      <Crossword
        crosswordMatrix={crosswordMatrix}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        selectedAnswers={selectedAnswers}
      />
    </div>
  );
};

export default Questions;
