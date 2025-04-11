import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import icons from "~/constants/images/icons";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // tăng mỗi 30ms

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-[#e8e4db] flex flex-col justify-center items-center text-[#40501e] font-[BeauLuloClean] text-center relative overflow-hidden">
      {/* Logo */}
      <div className="flex justify-center mt-4">
        <img
          src={icons.logoCong} // ảnh nền bạn muốn ở dưới
          alt="ảnh nền"
          className="w-full max-w-[60px] object-contain"
        />
      </div>

      {/* Tiêu đề */}
      <div className="mb-auto">
        <img
          src={icons.vietnamtrongcong} // ảnh nền bạn muốn ở dưới
          alt="ảnh nền"
          className="w-full max-w-[600px] object-contain"
        />
      </div>

      {/* Hình ảnh */}
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.1 }}
        src={icons.xemay}
        alt="loading"
        className="max-w-[300px] w-[80%] my-6"
      />

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="lg:text-[18px] text-[14px] font-bold mb-auto"
      >
        CHỜ CỘNG XIU NHA...{progress}%
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
