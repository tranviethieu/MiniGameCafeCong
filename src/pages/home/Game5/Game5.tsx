import { useState } from "react";
import icons from "~/constants/images/icons";
import { useAuth } from "~/context/AuthProvider";
import { Form, Input, message, Spin } from "antd";
import dayjs from "dayjs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import cong45 from "~/constants/images/cong45";
import cong3 from "~/constants/images/cong3";
const Game5 = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  //const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  function removeVietnameseTones(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function checkTuoiTre(input: string): boolean {
    const normalizedInput = removeVietnameseTones(input).toLowerCase().trim();
    return normalizedInput === "tuoi tre";
  }
  const handleSubmit = async (values: { linkb1: string }) => {
    if (user?.task[4].status === 2) {
      message.warning("Bạn đã hoàn thành rồi!");
      navigate("/");
      return;
    }
    const { linkb1 } = values;

    if (!user) {
      message.warning("Tài khoản không hợp lệ!");
      return;
    }
    setLoading(true);
    if (checkTuoiTre(linkb1)) {
      try {
        const userRef = doc(db, "users", user.phone as string);
        const updateUser = {
          location: 5,
          level: 5, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 5
          task: user.task.map((task) => {
            if (task.id === 5) {
              return {
                ...task,
                status: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 5
                link: linkb1,
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
          location: 5,
          level: 5, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 2
          task: user.task.map((task) => {
            if (task.id === 5) {
              return {
                ...task,
                status: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 2
                link: linkb1,
              };
            }
            return task;
          }),
          updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        });

        message.success("Nhiệm vụ đã hoàn thành! 🎉");
        navigate("/hoan-thanh-sinh-hoat-5");
      } catch (error) {
        console.error("Lỗi khi cập nhật dữ liệu:", error);
        message.error("Lỗi khi cập nhật dữ liệu!");
      }
    } else {
      message.info("Câu trả lời chưa đúng vui lòng thử lại!");
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
              SINH HOẠT MỨC 5
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
      <div className="relative bg-[#e7e5db] max-w-[400px] mx-auto p-2 pt-[110px]">
        {/* Nét đứt di chuyển */}
        <motion.img
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          src={cong45.game50}
          alt="game50"
          className="w-full max-w-[400px] pointer-events-none"
        />
        <motion.img
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          src={cong45.game51}
          alt="game51"
          className="w-[65%] pointer-events-none mx-auto"
        />
        {/* Bước 4 */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="px-4"
        >
          <div className="flex gap-1">
            <img src={cong3.ke} className="w-3 h-5" alt="ke" />
            <strong className="my-auto text-[13px] font-[BeauLuloClean]">
              ĐÁP ÁN:
            </strong>
          </div>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="relative z-10">
              <Form.Item name="linkb1">
                <Input
                  placeholder="Điền đáp án vào đây..."
                  className="w-full mt-2 px-3 py-2 rounded border text-black text-sm font-[Cousine]"
                />
              </Form.Item>
            </div>

            <div className="mt-4 flex">
              <button
                type="submit"
                disabled={loading}
                className="w-[300px] mb-2 font-[BeauLuloClean] bg-[#4c5b29] text-[#e7e5db] font-bold py-3 pt-2 rounded-full shadow mx-auto"
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

export default Game5;
