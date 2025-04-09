import { Star1 } from "iconsax-react";
import icons from "~/constants/images/icons";
import { motion } from "framer-motion";
const text =
  "Chào mừng bạn đến với trò chơi !\nVui lòng chọn để tham gia trò chơi:";
const activityLevels = [
  { level: 1, joinable: true },
  { level: 2, joinable: true },
  { level: 3, joinable: true },
  { level: 4, joinable: false, time: "10:00", date: "05/05/2025" },
  { level: 5, joinable: false, time: "12:00", date: "05/05/2025" },
];

export default function ActivityLevels() {
  return (
    <div className="mt-3">
      {/* Header */}
      <div className="whitespace-pre-line text-center font-mono text-red-500 text-sm leading-snug italic mb-3">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-3 text-[#4d5b28] text-xl font-bold border border-[#e5dbc2] rounded-full px-4 py-1 bg-[#e1d9ca] w-fit mx-auto shadow-sm">
        <img src={icons.muiten} alt="Target icon" className="w-6 h-6" />
        <span className="text-red-500">
          <span>0</span>/5
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
        {activityLevels.map((item) => (
          <div
            key={item.level}
            className={`bg-[#3f5722] text-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-[6px_6px_0_#d5c7a2] ${
              item.level === 5 ? "col-span-2" : ""
            }`}
          >
            <Star1 className="text-[#f5eec4] w-6 h-6 mb-2" fill="#f5eec4" />
            <div className="text-center font-bold text-lg leading-tight mb-2">
              SINH HOẠT
              <br />
              MỨC {item.level}
            </div>

            {item.joinable ? (
              <button className="bg-white text-[#3f5722] text-sm px-4 py-1 mt-4 rounded-full font-semibold shadow">
                Tham gia ngay
              </button>
            ) : (
              <div className="text-center text-[10px] text-[#f5eec4] font-medium">
                <div>Bắt đầu từ</div>
                <div className="font-bold">{item.time}</div>
                <div>{item.date}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
