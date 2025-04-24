import { useState } from "react";
import icons from "~/constants/images/icons";
import { useAuth } from "~/context/AuthProvider";
import { Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//import Questions from "./components/Questions";
import cong3 from "~/constants/images/cong3";
//import { questions } from "~/constants/config/data";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
import dayjs from "dayjs";
import WordSearchGrid from "./components/WordSearchGrid";
import { wordGrid, wordList } from "~/constants/config/data";
type Coord = [number, number];
const Game3 = () => {
  const { user, login, logout } = useAuth();
  const [selected, setSelected] = useState<Coord[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [foundCoords, setFoundCoords] = useState<Coord[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: { game: string }) => {
    if (user?.task[2].status === 2) {
      message.warning("Bạn đã hoàn thành rồi!");
      navigate("/");
      return;
    }
    const answer = values?.game?.replace(/\s/g, "").toLowerCase();
    handleInputCheck(answer);

    if (!user) {
      logout();
      message.warning("Tài khoản không hợp lệ!");
      return;
    }
    // Nếu đúng đáp án, xử lý như cũ
    setLoading(true);

    if (foundWords?.length < 4) {
      message.success(`Bạn còn ${5 - foundWords?.length} từ nữa`);
      setLoading(false);
      form.resetFields();
      return;
    }
    try {
      const userRef = doc(db, "users", user.phone as string);
      const updateUser = {
        location: 3,
        level: 3,
        task: user.task.map((task) => {
          if (task.id === 3) {
            return {
              ...task,
              status: 2,
              link: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            };
          }
          return task;
        }),
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      };
      await updateDoc(userRef, updateUser);
      login({
        ...user,
        location: 3,
        level: 3,
        task: user.task.map((task) => {
          if (task.id === 3) {
            return {
              ...task,
              status: 2,
              link: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            };
          }
          return task;
        }),
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      });
      message.success("Nhiệm vụ đã hoàn thành! 🎉");
      navigate("/hoan-thanh-sinh-hoat-3");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      message.error("Lỗi khi cập nhật dữ liệu!");
    }
    setLoading(false);
  };
  const handleInputCheck = (inputWord: string) => {
    const word = inputWord.trim().toUpperCase();
    if (!wordList.includes(word) || foundWords.includes(word)) {
      message.warning("Câu trả lời chưa đúng vui lòng thử lại!");
      return;
    }

    const directions = [
      [0, 1], // Right
      [1, 0], // Down
      [0, -1], // Left
      [-1, 0], // Up
      [1, 1], // Diagonal Down Right
      [-1, -1], // Diagonal Up Left
      [-1, 1], // Diagonal Up Right
      [1, -1], // Diagonal Down Left
    ];

    for (let r = 0; r < wordGrid.length; r++) {
      for (let c = 0; c < wordGrid[r].length; c++) {
        for (const [dr, dc] of directions) {
          let coords: Coord[] = [];
          for (let i = 0; i < word.length; i++) {
            const nr = r + dr * i;
            const nc = c + dc * i;
            if (
              nr < 0 ||
              nc < 0 ||
              nr >= wordGrid.length ||
              nc >= wordGrid[0].length ||
              wordGrid[nr][nc] !== word[i]
            ) {
              coords = [];
              break;
            }
            coords.push([nr, nc]);
          }

          if (coords.length === word.length) {
            checkAndMarkWord(word, coords);
            return;
          }
        }
      }
    }
  };
  const checkAndMarkWord = (word: string, coords: Coord[]) => {
    if (wordList.includes(word) && !foundWords.includes(word)) {
      setFoundWords((prev) => [...prev, word]);
      setFoundCoords((prev) => [...prev, ...coords]);
    }
  };
  const handleMouseDown = (coord: Coord) => {
    setSelected([coord]);
    setIsMouseDown(true);
  };

  const handleMouseEnter = (coord: Coord) => {
    if (isMouseDown) {
      setSelected((prev) =>
        prev.find(([r, c]) => r === coord[0] && c === coord[1])
          ? prev
          : [...prev, coord]
      );
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    const word = selected
      .map(([r, c]) => wordGrid[r][c])
      .join("")
      .toUpperCase();

    if (wordList.includes(word) && !foundWords.includes(word)) {
      setFoundWords((prev) => [...prev, word]);
      setFoundCoords((prev) => [...prev, ...selected]);
    }

    setSelected([]);
  };
  return (
    <div
      className="bg-[#e7e5db] min-h-screen text-[#4c5b29] font-[Cousine] text-sm bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${icons.anhNen})`,
      }}
    >
      <Spin size="small" fullscreen spinning={loading} />
      {/* Header */}
      <div className="fixed inset-x-0 top-0 h-[105px] bg-[#4c5b29] z-[1000] overflow-hidden">
        <div className="max-w-[300px] h-full mx-auto flex flex-col items-center justify-center text-white">
          <img
            src={icons.logoCong}
            alt="Cộng Logo"
            className="w-12 p-1 pointer-events-none"
            style={{ backgroundColor: "#fff" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            className="mt-2 pointer-events-none"
          >
            <h1 className="font-[BeauLuloClean] text-[18px] h-[50px]">
              SINH HOẠT MỨC 3
            </h1>
          </motion.div>
          {/* Đưa dòng chữ ra giữa đáy header */}
          <div className="absolute bottom-2 left-0 right-0 text-center italic">
            {`${user?.name} bắt đầu nào!`.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="relative bg-[#e7e5db] max-w-[400px] mx-auto p-2 pt-[110px] overflow-y-auto ">
        {/* Câu hỏi và đáp án */}

        {/* Đáp án ô chữ */}

        <WordSearchGrid
          selected={selected}
          foundCoords={foundCoords}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />
        <div className="text-center mt-4">
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
        <div className="flex gap-1">
          <img src={cong3.ke} className="w-5 h-6" alt="ke" />
          <strong className="my-auto text-[14px] font-[BeauLuloClean]">
            GIẢI Ô CHỮ SAU:
          </strong>
        </div>

        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="px-4"
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="relative z-10">
              <Form.Item name="game">
                <Input
                  style={{ borderRadius: 8 }}
                  placeholder="Điền đáp án vào đây..."
                  className="w-full mt-2 px-3 py-2 rounded border text-black text-sm font-[Cousine]"
                />
              </Form.Item>
            </div>
            <p className="italic text-xs mt-2">(*) Lưu ý đáp án không dấu</p>
            {/* Nút hoàn thành */}
            <div className="mt-4 flex">
              <button
                type="submit"
                disabled={loading}
                className="w-[300px] mb-2 font-[BeauLuloClean] bg-[#4c5b29] text-[#e7e5db] pt-2 font-bold py-3 rounded-full shadow mx-auto"
              >
                {!loading ? "Hoàn thành" : "🚀Hoàn Thành"}
              </button>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Game3;
