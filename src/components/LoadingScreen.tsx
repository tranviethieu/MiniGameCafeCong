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
      <div className="m-auto w-full flex flex-col justify-center">
        <div className="flex justify-center mt-2">
          <img
            src={icons.logoCong} // ảnh nền bạn muốn ở dưới
            alt="ảnh nền"
            className="w-full max-w-[60px] object-contain mx-auto"
          />
        </div>

        {/* Tiêu đề */}
        <div className=" mx-auto">
          <img
            src={icons.vietnamtrongcong} // ảnh nền bạn muốn ở dưới
            alt="ảnh nền"
            className="w-full max-w-[500px] object-contain"
          />
        </div>

        {/* Hình ảnh */}
        <motion.img
          initial={{ opacity: 0, x: -200 }} // chạy từ trái sang
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 2, ease: "easeOut" }}
          src={icons.xemay}
          alt="loading"
          className="max-w-[200px] w-[80%] my-6 "
          style={{ marginLeft: "auto" }}
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
    </div>
  );
};

export default LoadingScreen;
