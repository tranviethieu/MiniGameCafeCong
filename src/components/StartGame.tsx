import React, { useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Login from "./Login"; // Import component Login

const StartGame: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false); // State để đổi component

  if (showLogin) {
    return <Login setShowLogin={setShowLogin} />; // Khi nhấn nút sẽ hiển thị Login
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage: `url("https://cong-news.appwifi.com/wp-content/uploads/2019/05/11copy.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-2xl w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Mini game Cafe Cộng
          </h1>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 2 }}
          >
            <Button
              type="primary"
              shape="round"
              size="large"
              className="hover:bg-blue-600 text-white flex items-center px-6 py-3"
              style={{
                border: "none",
                background:
                  "linear-gradient(30deg, rgb(0, 199, 230), rgb(0, 4, 230))",
              }}
              onClick={() => setShowLogin(true)} // Đổi sang trang Login
            >
              Bắt đầu <ArrowRightOutlined className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StartGame;
