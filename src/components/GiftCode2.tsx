import { useContext } from "react";
import { IUserContext, UserContext } from "../context/UserProvider";
import { Form, Button, message } from "antd";
import { db, doc, updateDoc } from "../lib/firebaseConfig";

const GiftCode2 = () => {
  const { user, setUser, loading, setLoading } =
    useContext<IUserContext>(UserContext);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.phone);
      await updateDoc(userRef, {
        status: 1,
        level: 3,
      });

      setUser({ ...user, status: 1, level: 3 });
      message.success(`Chúc mừng! Mã giảm giá của bạn là: ${user.giftCode}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      message.error("Lỗi khi cập nhật dữ liệu!");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 800, margin: "auto", padding: 10 }}>
        <h4 style={{ color: "#000" }}>
          Bạn sử dụng đồ uống nhóm cốt dừa tại CH Công, chia sẻ cảm nhận trên
          Facebook và nhận mã giảm giá!
        </h4>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Button type="primary" htmlType="submit" loading={loading}>
            Làm tiếp nhiệm vụ tiếp theo!
          </Button>
        </Form>
        {user?.giftCode && (
          <div style={{ marginTop: 20, color: "green", fontSize: 18 }}>
            🎁 Mã giảm giá của bạn: <strong>{user.giftCode}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCode2;
