import { Form, Input, Button, message } from "antd";
import { db, doc, getDoc, setDoc } from "../../../lib/firebaseConfig";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthProvider";
import { IUser } from "../../../types/user";
import dayjs from "dayjs";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { taskGameDefault } from "../../../constants/config/data";
import { useNavigate } from "react-router-dom";

const validateVietnamesePhoneNumber = (phone: string): boolean => {
  const vietnamPhoneRegex = /^(?:\+84|0)(?:\d{9}|\d{8})$/;
  return vietnamPhoneRegex.test(phone);
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (values: { phone: string; name?: string }) => {
    const { phone, name } = values;
    setLoading(true);
    if (!validateVietnamesePhoneNumber(phone)) {
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
    <div className="bg-login relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white px-5">
      <motion.div
        key="login"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="max-w-xl p-6 rounded-lg shadow-lg w-full "
        style={{ backgroundColor: "rgba(118, 136, 88, 0.5)" }}
      >
        <h2 className="text-white text-2xl font-bold text-center mb-4 animate-pulse">
          Login Mini Game
        </h2>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Tên (chỉ nhập nếu đăng ký mới)"
            name="name"
            tooltip={{
              title: "chỉ nhập nếu đăng ký mới",
              icon: <InfoCircleOutlined />,
            }}
            style={{ fontWeight: 600 }}
          >
            <Input placeholder="Nhập tên của bạn" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
            style={{ fontWeight: 600 }}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 text-md font-semibold"
              loading={loading}
              style={{
                background:
                  "linear-gradient(30deg, rgb(34, 193, 195), rgb(253, 187, 45))", // Gradient màu xanh lục
                border: "none",
              }}
            >
              {loading ? "Đang xử lý..." : "🎮 Đăng nhập / Đăng ký"}
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
};

export default Login;
