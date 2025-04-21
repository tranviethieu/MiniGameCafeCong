import { useState } from "react";
import icons from "~/constants/images/icons";
import { useAuth } from "~/context/AuthProvider";
import { Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Questions from "./components/Questions";
import cong3 from "~/constants/images/cong3";
import { questions, STORAGE_KEY } from "~/constants/config/data";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
import dayjs from "dayjs";
const Game3 = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: { game: string }) => {
    if (user?.task[2].status === 2) {
      message.warning("Bạn đã hoàn thành rồi!");
      navigate("/");
      return;
    }
    setLoading(true);
    if (!user) {
      setLoading(false);
      message.warning("Tài khoản không hợp lệ!");
      logout();
      return;
    }
    if (!values?.game) {
      message.warning("Bạn vui lòng nhập đáp án!");
      setLoading(false);
      return;
    }
    const isCompleted = Object.keys(selectedAnswers).length === 7;
    if (!isCompleted) {
      message.warning("Bạn vui lòng hoàn thành 7 câu hỏi!");
      setLoading(false);
      return;
    }
    // Kiểm tra từng câu phải đúng đáp án
    const isAllCorrect = questions.every(
      (q) => selectedAnswers[q.id] === q.correctIndex
    );
    if (!isAllCorrect) {
      message.warning("Bạn cần trả lời đúng tất cả 7 câu hỏi để hoàn thành!");
      setLoading(false);
      return;
    }
    const answer = values?.game?.replace(/\s/g, "").toLowerCase();
    if (!(answer === "yêunước" || answer === "yeunuoc")) {
      message.error("Đáp án chưa chính xác, hãy thử lại nhé!");
      setLoading(false);
      return;
    }
    try {
      const userRef = doc(db, "users", user.phone as string);
      const updateUser = {
        location: 3,
        level: 3, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
        task: user.task.map((task) => {
          if (task.id === 3) {
            return {
              ...task,
              status: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
              link: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            };
          }
          return task;
        }),
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      };
      await updateDoc(userRef, updateUser);
      ///update

      // ✅ Cập nhật state của user
      login({
        ...user,
        location: 3,
        level: 3, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
        task: user.task.map((task) => {
          if (task.id === 3) {
            return {
              ...task,
              status: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
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
        <Questions
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
        />

        {/* Đáp án ô chữ */}
        <div className="flex gap-1 mt-4">
          <img src={cong3.ke} className="w-5 h-6" alt="ke" />
          <strong className="my-auto text-[14px] font-[BeauLuloClean]">
            ĐÁP ÁN Ô CHỮ:
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
                  placeholder="Điền đáp án vào đây..."
                  className="w-full mt-2 px-3 py-2 rounded border text-black text-sm font-[Cousine]"
                />
              </Form.Item>
            </div>
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
