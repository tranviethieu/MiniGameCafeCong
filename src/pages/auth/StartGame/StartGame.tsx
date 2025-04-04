import React, { useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Login from "../Login/Login";
import icons from "~/constants/images/icons";

const StartGame: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  return !showLogin ? (
    <motion.div
      key="start"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="bg-login relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white px-4 sm:px-6"
      style={{ backgroundImage: `url(${icons.bgCong})` }}
    >
      {/* Tiêu đề */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Mini Game Cafe Cộng
      </motion.h1>

      {/* Nút bấm */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          type="primary"
          shape="round"
          size="large"
          className="hover:bg-green-600 text-white flex items-center px-8 py-4 text-lg shadow-lg"
          style={{
            border: "none",
            background:
              "linear-gradient(30deg, rgb(34, 193, 195), rgb(253, 187, 45))", // Gradient màu xanh lục
          }}
          onClick={() => setShowLogin(true)}
        >
          Bắt đầu <ArrowRightOutlined className="ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  ) : (
    <Login />
  );
};

export default StartGame;
