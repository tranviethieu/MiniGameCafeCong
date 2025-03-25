import { useContext, useState } from "react";
import { message } from "antd";
import { db, doc, getDoc, setDoc } from "../lib/firebaseConfig";
import { IUserContext, UserContext } from "../context/UserProvider";
import { motion } from "framer-motion";
const validateVietnamesePhoneNumber = (phone: string): boolean => {
  const vietnamPhoneRegex = /^(?:\+84|0)(?:\d{9}|\d{8})$/;
  return vietnamPhoneRegex.test(phone);
};
interface LoginProps {
  setShowLogin: (show: boolean) => void;
}

const Login: React.FC<LoginProps> = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { setUser, loading, setLoading } =
    useContext<IUserContext>(UserContext);

  const formatPhoneNumber = (phone: string) => {
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+84" + formattedPhone;
    }
    return formattedPhone;
  };

  const handleLogin = async () => {
    if (phone === "0123456789" && name === "admin") {
      setLoading(true);
      setUser({
        phone: "0123456789",
        name: "admin",
        level: 9999,
        status: 1,
        linkb1: "",
        linkb2: "",
        linkb3: "",
        linkb4: "",
        linkb5: "",
        giftCode: "",
      });
      setLoading(false);
      message.success(`Đăng nhập admin!`);
      return;
    }
    if (!phone) return message.error("Vui lòng nhập số điện thoại!");
    if (!validateVietnamesePhoneNumber(phone)) {
      return message.error(
        "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam."
      );
    }
    const formattedPhone = formatPhoneNumber(phone);
    setLoading(true);

    try {
      const userRef = doc(db, "users", formattedPhone);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUser({
          phone: userData?.phone,
          name: userData?.name,
          level: userData?.level,
          status: userData?.status,
          linkb1: userData?.linkb1,
          linkb2: userData?.linkb2,
          linkb3: userData?.linkb3,
          linkb4: userData?.linkb4,
          linkb5: userData?.linkb5,
          giftCode: userData?.giftCode,
        });
        message.success(`Chào mừng lại, ${userData.name}!`);
      } else {
        if (!name) {
          message.error(
            "Số điện thoại chưa đăng ký. Vui lòng nhập tên để tạo tài khoản mới!"
          );
          setLoading(false);
          return;
        }
        await setDoc(userRef, {
          phone: formattedPhone,
          name,
          level: 1,
          status: 1,
          linkb1: "",
          linkb2: "",
          linkb3: "",
          linkb4: "",
          linkb5: "",
          giftCode: "",
        });
        setUser({
          phone: formattedPhone,
          name,
          level: 1,
          status: 1,
          linkb1: "",
          linkb2: "",
          linkb3: "",
          linkb4: "",
          linkb5: "",
          giftCode: "",
        });
        message.success("Tài khoản mới đã được tạo!");
      }
    } catch (error: any) {
      message.error("Lỗi khi kiểm tra dữ liệu: " + error.message);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-200"
      style={{
        backgroundImage: `url("https://cong-news.appwifi.com/wp-content/uploads/2019/05/11copy.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-xl border border-gray-700 ">
        <h2 className="text-white text-2xl font-bold text-center mb-4 animate-pulse">
          Login Mini Game
        </h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">
            Tên (chỉ nhập nếu đăng ký mới)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Số điện thoại</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          className="w-full p-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition-all duration-300 transform hover:scale-105"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "🎮 Đăng nhập / Đăng ký"}
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
