import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-4 flex flex-col items-center">
      <motion.div
        key="loading"
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-2xl">⏳ Đang tải...</div>
      </motion.div>
    </div>
  );
}
export default LoadingScreen;
