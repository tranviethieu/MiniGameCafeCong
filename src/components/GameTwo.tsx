import { useContext } from "react";
import { IUserContext, UserContext } from "../context/UserProvider";
import { Form, Input, Button, message } from "antd";
import { db, doc, updateDoc } from "../lib/firebaseConfig";

const GameTwo = () => {
  const { user, setUser, loading, setLoading } =
    useContext<IUserContext>(UserContext);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { linkb2: string }) => {
    const { linkb2 } = values;

    // 🔍 Kiểm tra link phải chứa "facebook.com"
    if (!linkb2.includes("facebook.com")) {
      message.warning("Vui lòng nhập link Facebook hợp lệ!");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", user.phone);
      await updateDoc(userRef, {
        linkb2,
        status: 3,
        level: 3, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
      });

      // ✅ Cập nhật state của user
      setUser({ ...user, linkb2, status: 3, level: 3 });

      message.success("Nhiệm vụ đã hoàn thành! 🎉");
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
      <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
        <h2 style={{ color: "#ccc" }}>
          Welcome {user?.name} to My Game Cafe Cộng 🎮 nhiệm vụ thứ 2
        </h2>
        <h2 style={{ color: "#000" }}>Level {user?.level}</h2>
        <h4 style={{ color: "#000" }}>
          Bạn sử dụng đồ uống nhóm cốt dừa Tại CH Công chia sẻ và cảm nhận, tặng
          1 mã mua hàng trên website.
          <br /> Chia sẻ lên Facebook và gửi link vào đây nhé!
        </h4>

        {/* Form Nhập Link */}
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="linkb2"
            label="Nhập Link Facebook"
            rules={[
              { required: true, message: "Vui lòng nhập link Facebook!" },
            ]}
          >
            <Input placeholder="Dán link Facebook bài viết..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Gửi Link & Hoàn Thành
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default GameTwo;
