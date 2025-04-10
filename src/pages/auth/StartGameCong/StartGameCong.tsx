import { motion } from "framer-motion";
import { ArrowCircleRight2 } from "iconsax-react";
import { useState } from "react";
import LoginCong from "../LoginCong";
const StartGameCong = () => {
  const [showLogin, setShowLogin] = useState(false);
  return !showLogin ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 5 }} // 👈 chậm hơn
      className="mb-12"
    >
      <button
        onClick={() => setShowLogin(true)}
        className="bg-[#4c5b29] font-[Cousine] px-6 py-[6px] mx-auto text-[#e7e5db] rounded-full flex items-center justify-center gap-2 transition"
      >
        <span>THAM GIA NGAY</span>
        <ArrowCircleRight2 className="text-sm" />
      </button>
    </motion.div>
  ) : (
    <LoginCong />
  );
};

export default StartGameCong;
