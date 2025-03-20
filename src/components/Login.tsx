import { useContext, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { db, doc, getDoc, setDoc } from "../lib/firebaseConfig";
import { IUserContext, UserContext } from "../context/UserProvider";

function Login() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { setUser, loading, setLoading } =
    useContext<IUserContext>(UserContext);

  // Hàm chuẩn hóa số điện thoại
  const formatPhoneNumber = (phone: string) => {
    let formattedPhone = phone.trim();

    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+84" + formattedPhone; // Thêm mã quốc gia nếu thiếu (Việt Nam)
    }

    return formattedPhone;
  };

  const handleLogin = async () => {
    if (!phone) return message.error("Vui lòng nhập số điện thoại!");

    const formattedPhone = formatPhoneNumber(phone); // Chuẩn hóa số điện thoại

    setLoading(true);

    try {
      const userRef = doc(db, "users", formattedPhone);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Người dùng đã tồn tại
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

        // Người dùng mới => Lưu vào Firestore
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
    <div style={{ maxWidth: 500, margin: "auto", padding: 10 }}>
      <h2>Đăng nhập bằng số điện thoại</h2>
      <Form layout="vertical">
        <Form.Item label="Số điện thoại">
          <Input
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Tên (chỉ cần nhập nếu đăng ký mới)">
          <Input
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Button type="primary" onClick={handleLogin} loading={loading}>
          Đăng nhập / Đăng ký
        </Button>
      </Form>
    </div>
  );
}

export default Login;
