import icons from "~/constants/images/icons";
import { motion } from "framer-motion";
import man1 from "~/constants/images/man1";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthProvider";
import { Button } from "antd";
const text = "CHƠI HẾT MỨC - THI ĐUA HẾT SỨC:";
const activityLevels = [
  { level: 1, joinable: false, complete: 1, date: "11/04/2025" },
  { level: 2, joinable: false, complete: 1, date: "20/04/2025" },
  { level: 3, joinable: false, complete: 1, date: "25/04/2025" },
  { level: 4, joinable: false, complete: 1, date: "02/05/2025" },
  { level: 5, joinable: false, complete: 1, date: "10/05/2025" },
  { level: 6, joinable: false, complete: 1, date: "10/05/2025" },
];

export default function ActivityLevels() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const updatedLevels = useMemo(() => {
    const today = new Date();

    const parseDate = (str: string) => {
      const [day, month, year] = str.split("/").map(Number);
      return new Date(year, month - 1, day); // JavaScript month bắt đầu từ 0
    };

    return activityLevels.map((level, index) => {
      const levelDate = parseDate(level.date);
      const complete = user?.task[index]?.status;
      const joinable =
        today >=
        new Date(
          levelDate.getFullYear(),
          levelDate.getMonth(),
          levelDate.getDate()
        );

      return {
        ...level,
        complete,
        joinable,
      };
    });
  }, [user?.task]);

  const handleJoin = (level: number, complete: number) => {
    console.log("Joining level:", level);
    if (level === 1 && complete === 1) {
      navigate(`/cong-1`); // Navigate to the game page with the selected level
    }
    // Handle join logic here
  };
  return (
    <>
      {/* Header */}
      <div className="whitespace-pre-line text-center font-[BeauLuloClean] text-[#b62924] text-[12px] leading-snug  mb-3">
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
        <span className="text-[#b62924]">
          <span>{user?.level}</span>/5
        </span>
      </div>
      {user?.role === "admin" && (
        <Button
          type="primary"
          htmlType="button"
          className="bg-[#b62924] w-[210px] text-[#e7e5db] font-[BeauLuloClean] py-3 mb-4 rounded-full text-[10px] hover:opacity-90 transition disabled:opacity-60 whitespace-pre-line leading-snug text-center"
          onClick={() => navigate("/admin")}
        >
          Quản trị
        </Button>
      )}
      {/* Grid */}
      <div
        className="w-full"
        style={{ overflowY: "auto", height: "calc(100vh - 200px)" }}
      >
        <div className="grid grid-cols-2 gap-4 max-w-[364px] mx-auto px-4">
          {updatedLevels.map((item) =>
            item.level < 6 ? (
              <motion.div
                key={item.level}
                className="bg-[#3f5722] h-[160px] relative px-0 text-white rounded-2xl p-1 flex flex-col items-center justify-center shadow-[6px_6px_0_#d5c7a2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: item.level * 0.2 }}
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
                          ? man1.muc3
                          : item.level === 3
                          ? man1.muc2
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

                {item.complete === 2 ? (
                  <>
                    {/* <div className="h-[28px] text-center text-[10px] text-[#f5eec4]"></div> */}
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      src={man1.congHoanthanh}
                      alt="congHoanthanh"
                      className="max-w-[200px] w-[60%] object-contain absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
                    />
                  </>
                ) : item.joinable ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="bg-white text-[#3f5722] text-[11px] px-3 py-1  rounded-full font-bold shadow"
                    onClick={() =>
                      handleJoin(item.level, item.complete as number)
                    }
                  >
                    Tham gia ngay
                  </motion.button>
                ) : (
                  <>
                    <div className="h-[28px]"></div>
                    <div className="text-center text-[10px] text-[#f5eec4] absolute bottom-2">
                      <div>Bắt đầu từ</div>
                      <div>{item.date}</div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                transition={{ duration: 1.5, delay: item.level * 0.2 }}
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
              </motion.div>
            )
          )}
        </div>
      </div>
    </>
  );
}
