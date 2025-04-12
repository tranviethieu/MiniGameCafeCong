import icons from "~/constants/images/icons";
import ActivityLevels from "./components/ActivityLevels";
import { motion } from "framer-motion";
const MainGameCong = () => {
  return (
    // ✅ Lớp bọc background toàn màn hình trên mọi thiết bị
    <div className="relative h-screen w-screen overflow-hidden bg-[#e5e5db] font-[Cousine]">
      {/* ✅ Nội dung căn giữa, giới hạn chiều rộng */}
      <div className="flex flex-col items-center text-center h-full w-full max-w-screen-sm mx-auto">
        {/* Logo */}
        <div className="text-[#3c4d2f] font-bold text-xl mt-1">
          <img src={icons.logoCong} style={{ width: 50 }} alt="Logo Cộng" />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <img
            src={icons.vietnamtrongcong} // ảnh nền bạn muốn ở dưới
            alt="ảnss"
            className="w-full max-w-[200px] object-contain"
          />
        </motion.div>

        {/* Mini Game Box */}
        <ActivityLevels />
      </div>
    </div>
  );
};

export default MainGameCong;
