import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthProvider";
import icons from "~/constants/images/icons";
import man3 from "~/constants/images/man3";
import { motion } from "framer-motion";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import cong2 from "~/constants/images/cong2";

const CongratulationPage2 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedStar, setSelectedStar] = useState(0);
  // 🌀 Scroll to top khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // ⭐ Tự động tích 1 sao sau 2s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSelectedStar(1);
    }, 1000);
    const timeout1 = setTimeout(() => {
      setSelectedStar(2);
    }, 2000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout1);
    };
  }, []);

  // 🎉 Chạy confetti khi tích sao
  useEffect(() => {
    if (selectedStar === 1) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        origin: { y: 0.6 },
        colors: ["#FFD700", "#d62828"],
      };

      const interval = setInterval(() => {
        if (Date.now() > animationEnd) {
          clearInterval(interval);
          return;
        }

        confetti({
          ...defaults,
          particleCount: 20,
          spread: 60,
          startVelocity: 25,
          ticks: 40,
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [selectedStar]);

  const renderStars = () =>
    [...Array(5)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 1.2 + index * 0.15,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < selectedStar ? "#d62828" : "none"}
          stroke="#d62828"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1
            1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976
            2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755
            1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976
            2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1
            0 00-.364-1.118L2.078 10.1c-.783-.57-.38-1.81.588-1.81h4.915a1
            1 0 00.95-.69l1.518-4.674z"
          />
        </svg>
      </motion.div>
    ));

  return (
    <div className="relative w-screen overflow-hidden bg-[#e5e5db] font-[Cousine]">
      <div className="flex flex-col items-center text-center h-full w-full max-w-screen-sm mx-auto">
        {/* Logo */}
        <div className="text-[#3c4d2f] font-bold text-xl mt-1 pointer-events-none">
          <img src={icons.logoCong} style={{ width: 50 }} alt="Logo Cộng" />
        </div>

        <div className="mb-auto mt-4">
          {/* Hoanho ảnh */}
          <motion.img
            src={man3.hoanho}
            className="w-[60%] mx-auto pointer-events-none"
            alt="#hoanho"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* ⭐ Ngôi sao đánh giá */}
          <div className="flex justify-center gap-1 mt-2">{renderStars()}</div>

          {/* Ảnh ghế */}
          <motion.img
            src={cong2.sticked}
            alt="sticked"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-[280px] mx-auto my-0 pointer-events-none"
          />

          {/* Text hiệu ứng */}
          <div className="w-full flex">
            <motion.div
              className="text-[#898e66] mx-auto ps-2 text-[18px] mb-1 font-nitti flex"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {`Bạn ${user?.name} đã`.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Ảnh hoàn thành */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="text-[#4d5b28] w-[300px] mx-auto font-bold pointer-events-none text-[23px] font-[BeauLuloClean] tracking-[-0.02em]"
          >
            HOÀN THÀNH <br /> XUẤT SẮC MỨC 2
          </motion.div>

          {/* Nút tiếp tục */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 0.8, ease: "easeOut" }}
            onClick={() => navigate("/")}
            className="bg-[#4d5b28] mx-auto mt-8 mb-2 flex items-center gap-2 text-[#e7e5db] px-8 py-2 rounded-full text-md bold shadow-md hover:bg-[#4d5b28] transition"
          >
            TIẾP TỤC
            <IoMdArrowDroprightCircle
              style={{ fontSize: 20, marginBottom: 2 }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationPage2;
