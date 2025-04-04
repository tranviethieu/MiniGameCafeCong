import { useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "~/context/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { UploadFile } from "antd/es/upload/interface";
import { uploadToCloudinary } from "~/common/uploadToCloudinary";
const Game1 = () => {
  const { user, login } = useAuth();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: { linkb1: string }) => {
    const { linkb1 } = values;
    let imageUrl: any = "";
    // 🔍 Kiểm tra link phải chứa "facebook.com"
    if (!linkb1.includes("facebook.com")) {
      message.warning("Vui lòng nhập link Facebook hợp lệ!");
      return;
    }
    if (!user) {
      message.warning("Tài khoản không hợp lệ!");
      return;
    }
    if (fileList.length !== 0) {
      imageUrl = await uploadToCloudinary(fileList[0].originFileObj as File);
      if (!imageUrl) {
        message.error("Lỗi khi upload ảnh lên Cloudinary!");
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", user.phone as string);
      const updateUser = {
        location: 6,
        level: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
        task: user.task.map((task) => {
          if (task.id === 1) {
            return {
              ...task,
              status: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
              link: linkb1,
              image: imageUrl as string,
            };
          }
          return task;
        }),
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      };
      await updateDoc(userRef, updateUser);

      // ✅ Cập nhật state của user
      login({
        ...user,
        location: 6,
        level: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
        task: user.task.map((task) => {
          if (task.id === 1) {
            return {
              ...task,
              status: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
              link: linkb1,
            };
          }
          return task;
        }),
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      });

      message.success("Nhiệm vụ đã hoàn thành! 🎉");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      message.error("Lỗi khi cập nhật dữ liệu!");
    }
    setLoading(false);
  };

  return (
    <motion.div
      key="Game1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ backgroundColor: "rgba(107, 123, 80, 0.9)" }} // Màu từ ảnh
      className="h-screen w-full bg-gradient-to-b from-black flex flex-col items-center justify-center px-4 bg-cover bg-center"
    >
      <div className="max-w-md m-6 flex flex-col ">
        <h2 className="text-white text-4xl font-bold text-center mb-24 flex flex-col">
          <span className="animate-pulse ml-2 text-yellow-300 font-semibold">
            Nhiệm vụ thứ nhất của
          </span>
          {user?.name} hãy hoàn thành nào ! 🎉
        </h2>
        <h4 className="text-white text-md text-center mb-6">
          Hãy chụp ảnh check-in và chia sẻ cảm nhận về một đồ vật trong quán!
          <br /> Đăng Facebook và gửi link vào đây nhé!
        </h4>

        {/* Form Nhập Link */}
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="linkb1"
            label={
              <span className="text-white font-semibold">
                Nhập Link Facebook
              </span>
            }
            rules={[
              { required: true, message: "Vui lòng nhập link Facebook!" },
            ]}
          >
            <Input
              placeholder="Dán link Facebook bài viết..."
              className="rounded-lg p-2"
            />
          </Form.Item>

          {/* Upload Ảnh */}
          <Form.Item
            label={
              <span className="text-white font-semibold">Tải ảnh lên</span>
            }
            valuePropName="fileList"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false} // không upload tự động
              maxCount={1} // chỉ 1 ảnh
            >
              {fileList.length >= 1 ? null : (
                <button
                  className="border border-white text-white p-2 rounded-lg bg-transparent"
                  type="button"
                >
                  <PlusOutlined />
                  <div className="mt-2">Tải ảnh</div>
                </button>
              )}
            </Upload>
          </Form.Item>

          {/* Nút Gửi */}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full py-3 text-lg font-semibold rounded-lg mt-auto"
            style={{
              background:
                "linear-gradient(30deg, rgb(34, 193, 195), rgb(253, 187, 45))",
              border: "none",
            }}
          >
            {loading ? "Đang gửi..." : "🚀 Gửi Link & Hoàn Thành"}
          </Button>
        </Form>
      </div>
    </motion.div>
  );
};

export default Game1;
