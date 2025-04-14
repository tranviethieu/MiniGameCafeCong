import { motion } from "framer-motion";
import { ArrowCircleRight2 } from "iconsax-react";
import { useEffect, useState } from "react";
import LoginCong from "../LoginCong";
import icons from "~/constants/images/icons";

const StartGameCong = () => {
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogin(true);
    }, 5000); // 3 giây

    return () => clearTimeout(timeout); // clear timeout nếu component unmount
  }, []);

  return !showLogin ? (
    <div
      style={{
        backgroundImage: `url(${icons.anhNen})`,
      }}
      className="w-full bg-cover bg-center bg-no-repeat min-h-screen font-[Cousine] text-[17px] bg-[#e4e3d9] flex flex-col"
      onClick={() => setShowLogin(true)}
    >
      <div className="flex flex-col flex-1">
        <div className="flex justify-center mt-2">
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
            className="w-full max-w-[500px] object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="mb-2 flex justify-center"
        >
          <button
            type="button"
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
          transition={{ duration: 1.5, delay: 2 }}
          className="flex justify-center my-auto"
        >
          <video
            id="videocong"
            src={icons.videocong}
            className="w-full max-w-[600px] object-contain pointer-events-none"
            autoPlay
            //loop
            muted
            playsInline
            preload="auto"
            poster={icons.anhCho} // <- ảnh hiển thị trước khi load xong hoặc fallback nếu lỗi
          />
        </motion.div>
      </div>
    </div>
  ) : (
    <LoginCong />
  );
};

export default StartGameCong;
