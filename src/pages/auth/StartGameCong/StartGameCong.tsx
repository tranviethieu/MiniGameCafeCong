import { motion } from "framer-motion";
import { ArrowCircleRight2 } from "iconsax-react";
import { useState } from "react";
import TitleBlock from "~/components/TitleBlock";
import icons from "~/constants/images/icons";
import LoginCong from "../LoginCong";
const StartGameCong = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    // ✅ Lớp bọc background toàn màn hình trên mọi thiết bị
    <div className="relative min-h-screen w-full bg-[#e5e5db] ">
      {/* ✅ Nội dung căn giữa, giới hạn chiều rộng */}
      <div className=" flex flex-col items-center text-center p-4 w-full max-w-screen-sm mx-auto overflow-x-hidden">
        {/* Landmark image */}
        <motion.img
          src={icons.hgc}
          alt="Cộng Cà Phê Collage"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-auto object-contain z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        {/* Logo */}
        <div className="text-[#3c4d2f] font-bold text-xl mt-4">
          <img src={icons.logoCong} style={{ width: 60 }} alt="Logo Cộng" />
        </div>

        {/* Title */}
        <div className="mt-2 mb-6" style={{ height: 140 }}>
          <TitleBlock />
        </div>

        {/* Mini Game Box */}
        {!showLogin ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }} // 👈 chậm hơn
            className="relative z-[2] bg-[#4d5b28] text-white rounded-xl p-5 mt-4 w-full max-w-xs flex flex-col items-center"
            style={{
              boxShadow: "6px 6px 0 #d5c7a2",
            }}
          >
            <img
              src={icons.miniGame}
              style={{ width: "100%", maxWidth: 220 }}
              alt="Mini Game"
            />

            <button
              onClick={() => setShowLogin(true)}
              className="bg-[#d5c7a2] mt-6 px-3 py-1 bg-white text-[#3c4d2f] rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#e8e8e0] transition"
            >
              <span>Bắt đầu</span>
              <ArrowCircleRight2 className="text-sm" />
            </button>
          </motion.div>
        ) : (
          <LoginCong />
        )}
      </div>
    </div>
  );
};

export default StartGameCong;
