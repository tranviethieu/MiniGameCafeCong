import { FaGift } from "react-icons/fa";
import Header from "../../layouts/Header";
import { motion } from "framer-motion";
import { Button, Modal } from "antd";
import { useState } from "react";
import QuizCard from "../QuizCard/QuizCard";
import { taskGame } from "../../constants/config/data";
import dayjs from "dayjs";
const MainGames = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const now = dayjs(); // Lấy thời gian hiện tại
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Share Link function for Facebook Messenger
  // const shareOnMessenger = () => {
  //   const gameLink = "https://mini-game-cafe-cong.vercel.app/"; // Replace this with your actual game link
  //   const message = encodeURIComponent(
  //     `Chào bạn! Hãy tham gia trò chơi này: ${gameLink}`
  //   );
  //   const fbMessengerURL = `https://m.me/?text=${message}`;
  //   window.open(fbMessengerURL, "_blank");
  // };
  return (
    <>
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
          {taskGame.map((e, i) => {
            const startDate = dayjs(e.timeStart, "DD/MM/YYYY HH:mm:ss");
            const endDate = dayjs(e.timeEnd, "DD/MM/YYYY HH:mm:ss");
            const isOngoing = now.isAfter(startDate) && now.isBefore(endDate);

            return (
              <div
                key={i}
                className="w-32 flex-shrink-0 h-40 bg-gray-800 rounded-lg flex flex-col items-center justify-center text-white text-center shadow-lg p-4"
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
                    onClick={showModal}
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
    </>
  );
};
export default MainGames;
