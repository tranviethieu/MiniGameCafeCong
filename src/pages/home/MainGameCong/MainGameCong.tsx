import icons from "~/constants/images/icons";
import ActivityLevels from "./components/ActivityLevels";
import { motion } from "framer-motion";
const MainGameCong = () => {
  return (
    // ✅ Lớp bọc background toàn màn hình trên mọi thiết bị
    <div className="relative min-h-screen w-full bg-[#e5e5db] ">
      {/* ✅ Nội dung căn giữa, giới hạn chiều rộng */}
      <div className=" flex flex-col items-center text-center p-4 w-full max-w-screen-sm mx-auto overflow-x-hidden">
        {/* Logo */}
        <div className="text-[#3c4d2f] font-bold text-xl mt-2">
          <img src={icons.logoCong} style={{ width: 60 }} alt="Logo Cộng" />
        </div>

        {/* Title */}
        <div className="mt-2 mb-2" style={{ height: 140 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="flex justify-center"
          >
            <img
              src={icons.vietnamtrongcong} // ảnh nền bạn muốn ở dưới
              alt="ảnh nền"
              className="w-full max-w-[600px] object-contain"
            />
          </motion.div>
        </div>

        {/* Mini Game Box */}
        <ActivityLevels />
      </div>
    </div>
  );
};

export default MainGameCong;
