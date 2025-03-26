import React, { useState } from "react";
import { Flex, Modal, Button, Radio } from "antd";

const CrosswordGame: React.FC = () => {
  const crosswordGrid = [
    ["", "", "", "", "-", "-", "-", "-", "", ""],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""],
    ["", "", "", "4", "5", "6", "7", "8", "", ""],
    ["", "", "", "", "5", "6", "7", "8", "", ""],
    ["1", "2", "3", "4", "5", "", "", "", "", ""],
    ["", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ["", "", "", "4", "5", "6", "7", "8", "9", ""],
    ["", "", "3", "4", "5", "6", "", "", "", ""],
  ];

  const questions = [
    {
      question: "Câu hỏi 1?",
      options: ["abcd", "Đáp án B", "Đáp án C", "Đáp án D"],
      answer: "A",
      rowIndex: 0,
      colIndexes: [4, 5, 6, 7],
    },
    {
      question: "Câu hỏi 2?",
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      answer: "B",
      rowIndex: 1,
      colIndexes: [0, 1, 2, 3],
    },
    {
      question: "Câu hỏi 2?",
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      answer: "B",
      rowIndex: 3,
      colIndexes: [4, 5, 6, 7],
    },
  ];

  const [grid, setGrid] = useState(crosswordGrid);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  //   const handleChange = (rowIndex: number, colIndex: number, value: any) => {
  //     const newGrid = [...grid];
  //     newGrid[rowIndex][colIndex] = value.toUpperCase();
  //     setGrid(newGrid);
  //   };

  const handleOpenModal = (rowIndex: number) => {
    const question = questions.find((q) => q.rowIndex === rowIndex);
    if (question) {
      setSelectedQuestion(question);
      setIsModalOpen(true);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedQuestion && selectedAnswer) {
      const newGrid = [...grid];
      selectedQuestion.colIndexes.forEach((colIndex: any, i: any) => {
        newGrid[selectedQuestion.rowIndex][colIndex] = selectedAnswer[i] || "";
      });
      setGrid(newGrid);
      setIsModalOpen(false);
    }
  };

  return (
    <div className={"crossword-container"}>
      {grid.map((row, rowIndex) => (
        <Flex key={rowIndex} gap={10} align="center">
          <h3
            className="text-gray-600 font-bold w-6 text-center cursor-pointer"
            onClick={() => handleOpenModal(rowIndex)}
          >
            {rowIndex + 1}
          </h3>
          <div>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-center uppercase border border-gray-400 w-10 h-10 rounded-md shadow-sm hover:bg-gray-100`}
                value={cell}
                maxLength={1}
                // onChange={(e) =>
                //   handleChange(rowIndex, colIndex, e.target.value)
                // }
                disabled={!cell}
                style={{ opacity: !cell ? 0 : 1 }}
              />
            ))}
          </div>
        </Flex>
      ))}

      <Modal
        title={selectedQuestion?.question}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleAnswerSubmit}>
            Xác nhận
          </Button>,
        ]}
      >
        <Radio.Group
          onChange={(e) => setSelectedAnswer(e.target.value)}
          value={selectedAnswer}
        >
          {selectedQuestion?.options.map((option: string, index: number) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default CrosswordGame;
