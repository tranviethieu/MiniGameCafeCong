import icons from "~/constants/images/icons";
import { motion } from "framer-motion";
import man1 from "~/constants/images/man1";
import { useMemo } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const text = "CHƠI HẾT MÚC - THI ĐUA HẾT SỨC:";
const activityLevels = [
  { level: 1, joinable: false, time: "00:00", date: "11/04/2025" },
  { level: 2, joinable: false, time: "00:00", date: "20/04/2025" },
  { level: 3, joinable: false, time: "00:00", date: "25/04/2025" },
  { level: 4, joinable: false, time: "00:00", date: "30/04/2025" },
  { level: 5, joinable: false, time: "00:00", date: "05/05/2025" },
  { level: 6, joinable: false, time: "00:00", date: "05/05/2025" },
];

export default function ActivityLevels() {
  const navigate = useNavigate();
  const updatedLevels = useMemo(() => {
    const today = dayjs();
    return activityLevels.map((level) => {
      const levelDate = dayjs(level.date, "DD/MM/YYYY");
      return {
        ...level,
        joinable: today.isAfter(levelDate) || today.isSame(levelDate, "day"),
      };
    });
  }, []);
  const handleJoin = (level: number) => {
    console.log("Joining level:", level);
    navigate(`/?level=${level}`); // Navigate to the game page with the selected level
    // Handle join logic here
  };
  return (
    <div>
      {/* Header */}
      <div className="whitespace-pre-line text-center font-[BeauLuloClean] text-red-500 text-[12px] leading-snug  mb-3">
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
      <div className="flex items-center gap-2 mb-2 text-[#4d5b28] text-md font-bold border border-[#e5dbc2] rounded-full px-4 py-1 bg-[#e1d9ca] w-fit mx-auto shadow-sm">
        <img src={icons.muiten} alt="Target icon" className="w-5 h-5" />
        <span className="text-red-500">
          <span>0</span>/5
        </span>
      </div>

      {/* Grid */}
      <div style={{ overflowY: "auto", height: "calc(100vh - 200px)" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto ">
          {updatedLevels.map((item) =>
            item.level < 6 ? (
              <div
                key={item.level}
                className={`bg-[#3f5722] h-[160px] relative text-white rounded-2xl p-1 flex flex-col items-center justify-center shadow-[6px_6px_0_#d5c7a2]`}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="flex justify-center absolute top-2"
                >
                  <img
                    src={man1.sao}
                    alt={`SAO${item.level}`}
                    className="w-[80px] object-contain "
                  />
                </motion.div>
                <div className="text-center font-bold text-lg leading-tight mt-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="flex justify-center"
                  >
                    <img
                      src={
                        item.level === 1
                          ? man1.muc1
                          : item.level === 2
                          ? man1.muc2
                          : item.level === 3
                          ? man1.muc3
                          : item.level === 4
                          ? man1.muc4
                          : item.level === 5
                          ? man1.muc5
                          : ""
                      }
                      alt={`man1.muc${item.level}`}
                      className="w-full max-w-[160px] h-[76px] object-contain pointer-events-none"
                    />
                  </motion.div>
                </div>

                {item.joinable ? (
                  <button
                    className="bg-white text-[#3f5722] text-[12px] px-4 py-1  rounded-full font-bold shadow"
                    onClick={() => handleJoin(item.level)}
                  >
                    Tham gia ngay
                  </button>
                ) : (
                  <>
                    <div className="h-[28px]"></div>
                    <div className="text-center text-[10px] text-[#f5eec4] absolute bottom-2">
                      <div>Bắt đầu từ</div>
                      <div>{item.date}</div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div
                key={item.level}
                className="bg-[#3f5722] h-[160px] relative rounded-2xl flex flex-col items-center justify-center shadow-[6px_6px_0_#d5c7a2] text-white"
              >
                {/* Cờ Việt Nam */}
                <div className="absolute top-4">
                  <img
                    src={man1.co}
                    alt="flag"
                    className="w-[100px] rounded-sm"
                  />
                </div>

                {/* Nội dung */}
                <div className="text-center mt-10 leading-tight z-[10]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="flex justify-center"
                  >
                    <img
                      src={man1.muc6}
                      alt={`man1.muc${item.level}`}
                      className="w-full max-w-[160px] object-contain pointer-events-none"
                    />
                  </motion.div>
                </div>

                {/* Con dấu nằm trên cùng */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="flex justify-center z-[50] absolute bottom-[-10px] right-[-20px] pointer-events-none"
                >
                  <img
                    src={man1.dauco}
                    alt="seal"
                    className="w-full max-w-[140px] object-contain"
                  />
                </motion.div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
