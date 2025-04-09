import { motion } from "framer-motion";

const letterAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Tăng thời gian trễ giữa các chữ cái
      duration: 0.8, // Tăng thời gian chạy hiệu ứng
      repeat: Infinity,
      repeatDelay: 3, // Tăng thời gian chờ giữa các lần lặp lại
    },
  }),
};

const renderText = (text: string, className: string, delayOffset = 0) =>
  text.split("").map((char, i) => (
    <motion.span
      key={`${char}-${i}-${delayOffset}`}
      custom={i + delayOffset}
      initial="hidden"
      animate="visible"
      variants={letterAnimation}
      className={`${className} inline-block`}
    >
      {char}
    </motion.span>
  ));

const TitleBlock = () => {
  return (
    <div className="text-center mt-10">
      <div className="text-[40px] md:text-[48px] font-extrabold text-[#3c4d2f] font-beVietnam leading-[1.1] tracking-[0.1em]">
        {renderText("VIỆT NAM", "text-[#3c4d2f] font-beVietnam")}
      </div>

      <div className="text-[32px] md:text-[32px] italic text-[#6d7b54] font-pacifico -mt-1 leading-none tracking-[0.08em]">
        {renderText("trong", "text-[#6d7b54] font-pacifico", 10)}
      </div>

      <div className="flex justify-center items-center gap-2 mt-[-4px] leading-none">
        <div className="text-[40px] md:text-[48px] font-extrabold text-[#3c4d2f] font-beVietnam tracking-[0.1em]">
          {renderText("CỘNG", "text-[#3c4d2f] font-beVietnam", 20)}
        </div>
        <div className="text-[32px] md:text-[32px] italic text-[#6d7b54] font-pacifico tracking-[0.08em]">
          {renderText("là...", "text-[#6d7b54] font-pacifico", 30)}
        </div>
      </div>
    </div>
  );
};

export default TitleBlock;
