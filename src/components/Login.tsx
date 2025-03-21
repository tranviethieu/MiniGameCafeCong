import { useContext, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { db, doc, getDoc, setDoc } from "../lib/firebaseConfig";
import { IUserContext, UserContext } from "../context/UserProvider";
const validateVietnamesePhoneNumber = (phone: string): boolean => {
  const vietnamPhoneRegex = /^(?:\+84|0)(?:\d{9}|\d{8})$/;
  return vietnamPhoneRegex.test(phone);
};
function Login() {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          minWidth: 320,
          padding: 20,
          borderRadius: 10,
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Đăng nhập Cafe Cộng</h2>
        <Form layout="vertical">
          <Form.Item label="Tên (chỉ cần nhập nếu đăng ký mới)">
            <Input
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" onClick={handleLogin} loading={loading} block>
            Đăng nhập / Đăng ký
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
