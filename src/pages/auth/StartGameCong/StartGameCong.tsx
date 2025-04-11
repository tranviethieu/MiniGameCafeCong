import { motion } from "framer-motion";
import { ArrowCircleRight2 } from "iconsax-react";
import { useState } from "react";
import LoginCong from "../LoginCong";
import icons from "~/constants/images/icons";
const StartGameCong = () => {
  const [showLogin, setShowLogin] = useState(false);
  return !showLogin ? (
    <div
      className="w-full min-h-screen font-sans text-[17px] bg-cover bg-center bg-no-repeat flex flex-col"
      style={{
        backgroundImage: `url(${icons.anhNen})`, // ảnh nền chính
      }}
    >
      <div className="flex flex-col flex-1">
        <div className="flex justify-center mt-4">
          <img
            src={icons.logoCong} // ảnh nền bạn muốn ở dưới
            alt="ảnh nền"
            className="w-full max-w-[60px] object-contain"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <img
            src={icons.vietnamtrongcong} // ảnh nền bạn muốn ở dưới
            alt="ảnh nền"
            className="w-full max-w-[600px] object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="mb-4 flex justify-center"
        >
          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#4c5b29] font-[Cousine] px-6 py-[6px] text-[#e7e5db] rounded-full flex items-center justify-center gap-2 transition"
          >
            <span>THAM GIA NGAY</span>
            <ArrowCircleRight2 className="text-sm" />
          </button>
        </motion.div>

        {/* Ảnh nằm cuối cùng, không cần absolute */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-auto flex justify-center"
        >
          <img
            src={icons.anhCho} // ảnh nền bạn muốn ở dưới
            alt="ảnh nền"
            className="w-full max-w-[600px] object-contain"
          />
        </motion.div>
      </div>
    </div>
  ) : (
    <LoginCong />
  );
};

export default StartGameCong;
