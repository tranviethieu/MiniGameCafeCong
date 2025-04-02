import React, { useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Login from "./Login"; // Import component Login

const StartGame: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false); // State để đổi component

  if (showLogin) {
    return <Login />; // Khi nhấn nút sẽ hiển thị Login
  }

  return (
    <div className="inset-0 flex flex-col items-center justify-center rounded-lg">
      <h1 className="text-white text-2xl md:text-5xl font-bold mb-6">
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
  );
};

export default StartGame;
