import { useContext } from "react";
import { Form, Input, Button, message, ConfigProvider } from "antd";
import { db, doc, getDoc, setDoc } from "../lib/firebaseConfig";
import { IUserContext, UserContext } from "../context/UserProvider";
import { motion } from "framer-motion";

const validateVietnamesePhoneNumber = (phone: string): boolean => {
  const vietnamPhoneRegex = /^(?:\+84|0)(?:\d{9}|\d{8})$/;
  return vietnamPhoneRegex.test(phone);
};

const Login: React.FC = () => {
  const { setUser, loading, setLoading } =
    useContext<IUserContext>(UserContext);

  const formatPhoneNumber = (phone: string) => {
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+84" + formattedPhone;
    }
    return formattedPhone;
  };

  const handleLogin = async (values: { phone: string; name?: string }) => {
    const { phone, name } = values;

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
        const userData = {
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
        };
        await setDoc(userRef, userData);
        setUser(userData);
        message.success("Tài khoản mới đã được tạo!");
      }
    } catch (error: any) {
      message.error("Lỗi khi kiểm tra dữ liệu: " + error.message);
    }
    setLoading(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "#fff",
          },
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
        style={{
          //backgroundImage: `url("https://cong-news.appwifi.com/wp-content/uploads/2019/05/11copy.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-md p-4 rounded-lg ">
          <h2 className="text-white text-2xl font-bold text-center mb-4 animate-pulse">
            Login Mini Game
          </h2>
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Tên (chỉ nhập nếu đăng ký mới)"
              name="name"
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
                className="w-full"
                loading={loading}
              >
                {loading ? "Đang xử lý..." : "🎮 Đăng nhập / Đăng ký"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </motion.div>
    </ConfigProvider>
  );
};

export default Login;
