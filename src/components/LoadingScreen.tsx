import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // Tăng 1% mỗi 20ms
      });
    }, 20); // tốc độ loading có thể chỉnh tùy ý

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{ backgroundColor: "rgb(107, 123, 80)" }}
      className="min-h-screen bg-gradient-to-b   text-white p-4 flex flex-col items-center"
    >
      <motion.div
        key="loading"
        className="flex justify-center items-center m-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-2xl">⏳ Đang tải... {progress}%</div>
      </motion.div>
    </div>
  );
}
export default LoadingScreen;
