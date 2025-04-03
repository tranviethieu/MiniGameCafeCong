import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "iconsax-react"; // Import icon
interface IQuestion {
  isModalOpen: boolean;
  setIsModalOpen: (data: boolean) => void;
}
const QuizCard: React.FC<IQuestion> = ({ setIsModalOpen, isModalOpen }) => {
  //const navigate = useNavigate(); // Hook để điều hướng
  const question = {
    text: "Tác phẩm nào của Lương Xuân Nhị là tác phẩm họa sĩ không chịu bán cho đến cuối đời?",
    options: [
      "Phụ Nữ Thủ Đô",
      "Thiếu Nữ Bên Hoa Sen",
      "Phố Cổ Nara",
      "Thiếu Nữ Áo Lam", // Đáp án đúng
    ],
    correctAnswer: "Thiếu Nữ Áo Lam",
  };

  const [selected, setSelected] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isModalOpen) {
      setProgress(0); // Reset progress khi mở modal
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 400);
    }
    console.log(isModalOpen);
    return () => clearInterval(interval); // Clear interval khi modal đóng
  }, [isModalOpen]);

  const handleSelect = (option: string) => {
    if (option === question.correctAnswer) {
      setSelected(option);
      setError(null);
    } else {
      setError("❌ Sai rồi! Vui lòng chọn lại.");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-auto">
      {/* Nút quay lại */}
      <button
        className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={() => setIsModalOpen(false)}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-md bg-gray-900 text-white py-12 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold text-center">{question.text}</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`py-3 px-2 rounded-lg text-center text-sm font-medium transition 
                ${
                  selected === question.correctAnswer
                    ? option === question.correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-gray-700"
                    : selected === option
                    ? "bg-red-500 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              onClick={() => handleSelect(option)}
              disabled={selected === question.correctAnswer}
            >
              {option}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-4 text-center text-sm text-red-400">{error}</div>
        )}
      </div>

      <div className="absolute bottom-0 w-full max-w-md">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
