import { message } from "antd";
import dayjs from "dayjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { taskGameDefault } from "~/constants/config/data";
import icons from "~/constants/images/icons";
import { useAuth } from "~/context/AuthProvider";
import { db } from "~/lib/firebaseConfig";
import { IUser } from "~/types/user";

const validateVietnamesePhoneNumber = (phone: string): boolean => {
  const vietnamPhoneRegex = /^(?:\+84|0)(?:\d{9}|\d{8})$/;
  return vietnamPhoneRegex.test(phone);
};

const LoginCong = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Thêm state
  const [form, setForm] = useState({ phone: "", name: "" });

  // ✅ Gọi khi submit
  const handleLogin = async (values: { phone: string; name?: string }) => {
    const { phone, name } = values;
    setLoading(true);

    if (!validateVietnamesePhoneNumber(phone)) {
      setLoading(false);
      return message.error(
        "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam."
      );
    }
    try {
      const userRef = doc(db, "users", phone);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = (userSnap.data() as IUser) || null;
        login({
          ...userData,
          id: userData?.phone as string,
        });
        setLoading(false);
        navigate("/");
        message.success(`Chào mừng bạn trở lại, ${userData.name}!`);
      } else {
        if (!name) {
          message.error(
            "Số điện thoại chưa đăng ký. Vui lòng nhập tên để tạo tài khoản mới!"
          );
          setLoading(false);
          return;
        }
        const userData: IUser = {
          phone,
          name,
          level: 0,
          location: 0,
          task: taskGameDefault,
          role: "user",
          createdAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          updatedAt: null,
          id: phone,
        };
        await setDoc(userRef, userData);
        login(userData);
        setLoading(false);
        navigate("/");
        message.success(`Chào mừng bạn ${name} đến với Cộng!`);
      }
    } catch (error: any) {
      setLoading(false);
      message.error("Lỗi khi kiểm tra dữ liệu: " + error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen relative font-sans text-[17px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${icons.anhNen})`,
      }}
    >
      {/* Ảnh dưới cùng */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 z-0 flex justify-center"
      >
        <img
          src={icons.anhCho}
          alt="ảnh nền"
          className="w-full max-w-[600px] object-contain pointer-events-none"
        />
      </motion.div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex justify-center mt-2">
          <img
            src={icons.logoCong} // ảnh nền bạn muốn ở dưới
            alt="ảnh nền"
            className="w-full max-w-[50px] object-contain"
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
            alt="ảnss"
            className="w-full max-w-[200px] object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-white rounded-xl w-full flex flex-col items-center  font-[Cousine]"
        >
          {/* ✅ Gọi handleLogin khi submit */}
          <form
            className="flex flex-col gap-2 lg:min-w-[400px] min-w-[320px] "
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(form);
            }}
          >
            {/* Tên */}
            <div className="flex flex-col">
              <label className="text-[12px] font-semibold mb-1 text-left text-[#3c4d2f]">
                <span className="text-red-500">*</span> Tên công dân:
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nhập tên của bạn"
                className="rounded-md px-4 py-[2px] text-[#3c4d2f] bg-white placeholder-[#b4b8a4] placeholder:text-sm outline-none placeholder:[font-weight:400]"
              />
            </div>

            {/* Số điện thoại */}
            <div className="flex flex-col">
              <label className="text-[12px] font-semibold mb-1 text-left text-[#3c4d2f]">
                <span className="text-red-500">*</span> Thông tin liên lạc:
              </label>

              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
                className="rounded-md px-4 py-[2px] text-[#3c4d2f] bg-white placeholder-[#b4b8a4] placeholder:text-sm outline-none placeholder:[font-weight:400]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#4d5b28] w-[210px] text-[#e7e5db] mx-auto font-[BeauLuloClean] py-3 mt-1 rounded-full text-[10px] hover:opacity-90 transition disabled:opacity-60 whitespace-pre-line leading-snug text-center"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập / Đăng ký"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginCong;
