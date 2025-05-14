import icons from "~/constants/images/icons";
import { motion } from "framer-motion";
import man1 from "~/constants/images/man1";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthProvider";
import { Button, message } from "antd";
import { saveAs } from "file-saver";
import fontkit from "@pdf-lib/fontkit";
import { MdOutlineFileDownload } from "react-icons/md";
const text = "CHƠI HẾT MỨC - THI ĐUA HẾT SỨC:";
import { PDFDocument, rgb } from "pdf-lib";
const activityLevels = [
  { level: 1, joinable: false, complete: 1, date: "11/04/2025" },
  { level: 2, joinable: false, complete: 1, date: "20/04/2025" },
  { level: 3, joinable: false, complete: 1, date: "25/04/2025" },
  { level: 4, joinable: false, complete: 1, date: "25/04/2025" },
  { level: 5, joinable: false, complete: 1, date: "25/04/2025" },
  { level: 6, joinable: false, complete: 1, date: "25/04/2025" },
];

export default function ActivityLevels() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const updatedLevels = useMemo(() => {
    const today = new Date();

    const parseDate = (str: string) => {
      const [day, month, year] = str.split("/").map(Number);
      return new Date(year, month - 1, day);
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
    if (level === 1 && complete === 1 && user?.level === 0) {
      navigate(`/cong-1`); // Navigate to the game page with the selected level
    } else if (level === 2 && complete === 1 && user?.level === 1) {
      navigate(`/cong-2`);
    } else if (level === 3 && complete === 1 && user?.level === 2) {
      navigate(`/cong-3`);
    } else if (level === 4 && complete === 1 && user?.level === 3) {
      navigate(`/cong-4`);
    } else if (level === 5 && complete === 1 && user?.level === 4) {
      navigate(`/cong-5`);
    } else {
      message.warning(
        `Bạn ${user?.name} vui lòng hoàn thành sinh hoạt mức ${
          user?.level ? user?.level + 1 : 1
        }`
      );
    }
    // Handle join logic here
  };
  const handleGenerate = async () => {
    if (user?.level && user?.level < 5) {
      return;
    }
    const existingPdfBytes = await fetch("/static/giay-khen.pdf").then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.create(); // 👈 KHỞI TẠO TRƯỚC
    pdfDoc.registerFontkit(fontkit); // ✅ ĐĂNG KÝ fontkit TRƯỚC

    const loadedPdf = await PDFDocument.load(existingPdfBytes);
    const [templatePage] = await pdfDoc.copyPages(loadedPdf, [0]); // 👈 copy trang
    pdfDoc.addPage(templatePage);

    const firstPage = pdfDoc.getPage(0);
    const { width, height } = firstPage.getSize();

    // 👉 Load font từ Google Fonts CDN
    const fontBytes = await fetch("/static/fonts/iCielBCHuskey-Roman.otf").then(
      (res) => res.arrayBuffer()
    );

    const customFont = await pdfDoc.embedFont(fontBytes);

    const fontSize = 24;
    const text = user?.name;
    if (!text) return;

    const textWidth = customFont.widthOfTextAtSize(text, fontSize);
    const x = (width - textWidth) / 2;
    const y = height / 2 - 29;

    firstPage.drawText(text, {
      x,
      y,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, `Giay-Khen-${user?.name}.pdf`);
  };

  return (
    <>
      {/* Header */}
      <div className="whitespace-pre-line text-center font-[BeauLuloClean] text-[#b62924] text-[12px] leading-snug mb-3">
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
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 max-w-[364px] mx-auto px-4">
          {updatedLevels.map((item) =>
            item.level < 6 ? (
              <motion.div
                key={item.level}
                className="bg-[#3f5722] h-[160px] relative px-0 text-white rounded-2xl p-1 flex flex-col items-center justify-center shadow-[6px_6px_0_#d5c7a2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: item.level * 0.3 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: item.level * 0.3 }}
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
                {user?.level === 5 && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation(); // không kích hoạt div cha
                      handleGenerate();
                    }}
                    animate={{
                      y: [0, -10, 0], // 👈 hiệu ứng lên-xuống
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    className="absolute z-50 top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 b hover:bg-opacity-40 rounded-full p-3"
                    title="Tải giấy khen"
                  >
                    <MdOutlineFileDownload className="w-6 h-6 text-white" />
                  </motion.button>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>
    </>
  );
}
