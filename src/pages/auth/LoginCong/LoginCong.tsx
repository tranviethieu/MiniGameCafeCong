import { message } from "antd";
import dayjs from "dayjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { taskGameDefault } from "~/constants/config/data";
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
        message.success(`Chào mừng lại, ${userData.name}!`);
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
          level: 1,
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
        message.success("Tài khoản mới đã được tạo!");
      }
    } catch (error: any) {
      setLoading(false);
      message.error("Lỗi khi kiểm tra dữ liệu: " + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="z-[2] text-white rounded-xl w-full flex flex-col items-center mt-20 font-[Cousine]"
    >
      {/* ✅ Gọi handleLogin khi submit */}
      <form
        className="flex flex-col gap-3 lg:min-w-[400px] min-w-[360px] "
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(form);
        }}
      >
        {/* Tên */}
        <div className="flex flex-col">
          <label className="text-[14px] mb-1 text-left text-[#3c4d2f] font-weight-500">
            <span className="text-red-500">*</span> Tên công dân:
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nhập tên của bạn"
            className="rounded-md px-4 py-[6px] text-[#3c4d2f] bg-white placeholder-[#b4b8a4] placeholder:text-sm outline-none placeholder:[font-weight:400]"
          />
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col">
          <label className="text-[14px] mb-1 text-left text-[#3c4d2f] font-weight-500">
            <span className="text-red-500">*</span> Thông tin liên lạc:
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Nhập số điện thoại"
            className="rounded-md px-4 py-[6px] text-[#3c4d2f] bg-white placeholder-[#b4b8a4] placeholder:text-sm outline-none placeholder:[font-weight:400]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#4d5b28] text-white font-[BeauLuloClean] py-2 mt-2 rounded-full text-[13px] hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập / Đăng ký"}
        </button>
      </form>
    </motion.div>
  );
};

export default LoginCong;
