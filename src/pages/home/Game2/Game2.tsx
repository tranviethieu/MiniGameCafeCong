import { useState } from "react";
import icons from "~/constants/images/icons";
import { useAuth } from "~/context/AuthProvider";
import { Form, Input, message, Spin, Upload, UploadFile } from "antd";
import dayjs from "dayjs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CloseSquareOutlined } from "@ant-design/icons";
import { uploadToImgBB } from "~/common/compressImage";
import cong2 from "~/constants/images/cong2";
const Game2 = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: { linkb1: string }) => {
    if (user?.task[1].status === 2) {
      message.warning("Bạn đã hoàn thành rồi!");
      navigate("/");
      return;
    }
    const { linkb1 } = values;
    let imageUrl: any = "";
    // 🔍 Kiểm tra link phải chứa "facebook.com"
    if (!linkb1 || !linkb1.includes("facebook.com")) {
      message.warning("Vui lòng nhập link Facebook hợp lệ!");
      return;
    }
    if (!user) {
      message.warning("Tài khoản không hợp lệ!");
      return;
    }
    setLoading(true);
    if (fileList.length !== 0) {
      imageUrl = await uploadToImgBB(
        fileList[0].originFileObj as File,
        `${user?.phone.slice(0, -3) + "xxx"}-${user?.name}`
      );
      if (!imageUrl) {
        message.error("Lỗi khi upload ảnh lên!");
        setLoading(false);
        return;
      }
    }

    try {
      const userRef = doc(db, "users", user.phone as string);
      const updateUser = {
        location: 2,
        level: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
        task: user.task.map((task) => {
          if (task.id === 2) {
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
      ///update

      // ✅ Cập nhật state của user
      login({
        ...user,
        location: 2,
        level: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 2
        task: user.task.map((task) => {
          if (task.id === 2) {
            return {
              ...task,
              status: 2, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 2
              link: linkb1,
            };
          }
          return task;
        }),
        updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      });

      message.success("Nhiệm vụ đã hoàn thành! 🎉");
      navigate("/hoan-thanh-sinh-hoat-2");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      message.error("Lỗi khi cập nhật dữ liệu!");
    }
    setLoading(false);
  };

  return (
    <div
      className="bg-[#e7e5db] min-h-screen text-[#4c5b29] font-[Cousine] text-sm bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${icons.anhNen})`,
      }}
    >
      <Spin size="small" fullscreen spinning={loading} />
      {/* Header */}
      <div className="fixed inset-x-0 top-0 h-[105px] bg-[#4c5b29] z-[1000] overflow-hidden">
        <div className="max-w-[300px] h-full mx-auto flex flex-col items-center justify-center text-white">
          <img
            src={icons.logoCong}
            alt="Cộng Logo"
            className="w-12 p-1 pointer-events-none"
            style={{ backgroundColor: "#fff" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            className="mt-2 pointer-events-none"
          >
            <h1 className="font-[BeauLuloClean] text-[18px] h-[50px]">
              SINH HOẠT MỨC 2
            </h1>
          </motion.div>
          {/* Đưa dòng chữ ra giữa đáy header */}
          <div className="absolute bottom-2 left-0 right-0 text-center italic">
            {`${user?.name} bắt đầu nào!`.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="relative bg-[#e7e5db] max-w-[400px] mx-auto p-2 pt-[110px]">
        {/* Nét đứt di chuyển */}
        <motion.img
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          src={cong2.bgMan}
          alt="bgMan"
          className="w-full max-w-[400px] pointer-events-none"
        />

        {/* Bước 4 */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="px-4"
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="relative z-10">
              <Form.Item name="linkb1">
                <Input
                  placeholder="Dán link bài viết..."
                  className="w-full mt-2 px-3 py-2 rounded border text-black text-sm font-[Cousine]"
                />
              </Form.Item>
            </div>

            {/* Tải ảnh */}
            <div className="mt-2">
              <label className="block font-bold text-red-500 mb-2">
                *Tải ảnh dưới đây
              </label>

              <Form.Item valuePropName="fileList" className="w-full">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false}
                  maxCount={1}
                  showUploadList={false}
                  className="w-full"
                >
                  {fileList.length >= 1 ? (
                    <div className="relative w-[120px] text-center">
                      <img
                        src={URL.createObjectURL(
                          fileList[0].originFileObj as File
                        )}
                        alt="Preview"
                        className="w-full h-[120px] object-cover rounded shadow mb-2 mx-auto"
                      />
                      <CloseSquareOutlined
                        className="absolute top-2 right-2 bg-red-500 text-white  text-[14px] rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          setFileList([]);
                        }}
                        style={{ fontSize: 24 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full border border-dashed border-[#4c5b29] bg-[#f5f5f0] rounded p-4 text-center cursor-pointer text-[#4c5b29]"
                      style={{ width: "100% !important" }}
                    >
                      <span className="text-md font-[Cousine]">+ Tải ảnh</span>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>

            {/* Nút hoàn thành */}
            <div className="mt-4 flex">
              <button
                type="submit"
                disabled={loading}
                className="w-[300px] mb-2 font-[BeauLuloClean] bg-[#4c5b29] text-[#e7e5db] font-bold py-3 pt-2 rounded-full shadow mx-auto"
              >
                {!loading ? "Hoàn thành" : "🚀Hoàn Thành"}
              </button>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Game2;
