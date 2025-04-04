import { motion } from "framer-motion";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { FaGift } from "react-icons/fa";
import Header from "~/layouts/Header/Header";
import { useAuth } from "~/context/AuthProvider";
import QuizCard from "~/components/QuizCard/QuizCard";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, login } = useAuth();
  const now = dayjs(); // Lấy thời gian hiện tại

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePlay = async (phone: string, location: number) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", phone as string);
      const updateUser = {
        location,
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      };
      await updateDoc(userRef, updateUser);
      login({
        ...user,
        location,
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      });
    } catch (e) {
      message.error("Lỗi khi cập nhật dữ liệu!");
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgb(107, 123, 80)" }}
      className="min-h-screen bg-gradient-to-b from-black text-white p-4 flex flex-col items-center relative"
    >
      <Header />
      <motion.div
        className="mt-12 w-full max-w-xl lg:max-w-3xl mx-auto flex flex-col"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        style={{ height: "calc(100vh - 100px)" }} // Adjust height to fit the screen
      >
        {/* Missions */}
        <div className="flex overflow-x-auto space-x-4 p-2">
          {user?.task?.map((e, i) => {
            const startDate = dayjs(e.timeStart, "DD/MM/YYYY HH:mm:ss");
            const endDate = dayjs(e.timeEnd, "DD/MM/YYYY HH:mm:ss");
            const isOngoing = now.isAfter(startDate) && now.isBefore(endDate);

            return (
              <div
                key={i}
                className="w-32 flex-shrink-0 h-40 bg-green-800 rounded-lg flex flex-col items-center justify-center text-white text-center shadow-lg p-4"
              >
                {i === 0 ? (
                  <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    <FaGift className="text-yellow-300 text-4xl" />
                  </motion.div>
                ) : (
                  <FaGift className="text-yellow-300 text-4xl" />
                )}
                <span className="mt-2 text-sm">{e.name}</span>

                {isOngoing ? (
                  <Button
                    className="mt-6 bg-purple-500 text-white px-3 py-1 rounded text-sm font-bold shadow-md hover:bg-purple-600 transition duration-200"
                    onClick={() => handlePlay(user.phone, e.id)}
                    style={{
                      background:
                        "linear-gradient(30deg, rgb(34, 193, 195), rgb(253, 187, 45))", // Gradient màu xanh lục
                      border: "none",
                    }}
                  >
                    Tham gia
                  </Button>
                ) : now < startDate ? (
                  <div className="mt-6 text-xs text-gray-300 flex flex-col">
                    Bắt đầu từ
                    <strong>{startDate.format("hh:mm DD/MM/YYYY")}</strong>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="inset-0 flex flex-col items-center justify-center rounded-lg mt-auto md:mb-(200px) lg:mb-0">
          {/* <button
            onClick={shareOnMessenger}
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-lg font-bold shadow-md"
          >
            Mời bạn bè cùng chơi
          </button> */}
        </div>
      </motion.div>
      <Modal
        centered
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <QuizCard isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Modal>
      {/* <Drawer
        //title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={handleCancel}
        open={isModalOpen}
        key="left"
        //width={300}
      >
        <QuizCard />
      </Drawer> */}
    </div>
  );
};
export default Home;
