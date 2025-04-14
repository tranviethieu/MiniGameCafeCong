import { useNavigate } from "react-router-dom";
import icons from "~/constants/images/icons";
import man3 from "~/constants/images/man3";
import { useAuth } from "~/context/AuthProvider";
import { motion } from "framer-motion";
import { IoMdArrowDroprightCircle } from "react-icons/io";
// import { useEffect } from "react";
// import confetti from "canvas-confetti";
const CongratulationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  // 🎉 Trigger confetti on load
  // useEffect(() => {
  //   const duration = 5 * 1000;
  //   const animationEnd = Date.now() + duration;
  //   const defaults = { origin: { y: 0.6 } };

  //   const interval: NodeJS.Timeout = setInterval(() => {
  //     const timeLeft = animationEnd - Date.now();

  //     if (timeLeft <= 0) {
  //       clearInterval(interval);
  //       return;
  //     }

  //     confetti({
  //       ...defaults,
  //       particleCount: 50,
  //       spread: 70,
  //       startVelocity: 30,
  //       ticks: 60,
  //     });
  //   }, 250);
  // }, []);
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#e5e5db] font-[Cousine]">
      <div className="flex flex-col items-center text-center h-full w-full max-w-screen-sm mx-auto">
        {/* Logo */}
        <div className="text-[#3c4d2f] font-bold text-xl mt-1">
          <img src={icons.logoCong} style={{ width: 50 }} alt="Logo Cộng" />
        </div>
        <div className="my-auto">
          {/* Tiêu đề */}
          <motion.img
            src={man3.hoanho}
            className="w-[60%] mt-2 mx-auto"
            alt="#hoanho"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            src={man3.bacham}
            className="w-[100px] mt-2 mx-auto"
            alt="bacham"
          />

          {/* Ảnh */}
          <motion.img
            src={man3.ghe}
            alt="Ghế"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-[200px] mx-auto my-4"
          />

          {/* Thông báo hoàn thành */}
          <div className="w-full flex">
            <motion.div
              className="text-[#898e66] mx-auto text-[32px] mb-2 font-[iCielBCHuskey] flex"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05, // thời gian giữa mỗi ký tự
                  },
                },
              }}
            >
              {`Bạn ${user?.name} đã`.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.img
            src={man3.hoanthanh}
            alt="hoanthanh"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="w-[260px] mx-auto"
          />

          {/* Nút tiếp tục */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
            onClick={() => {
              //setLoading(true);
              navigate("/");
            }}
            className="bg-[#4d5b28] mx-auto mt-8 mb-2 flex items-center gap-2 text-[#e7e5db] px-8 py-2 rounded-full text-md bold shadow-md hover:bg-green-800 transition"
          >
            TIẾP TỤC
            <IoMdArrowDroprightCircle
              style={{ fontSize: 20, marginBottom: 2 }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationPage;
