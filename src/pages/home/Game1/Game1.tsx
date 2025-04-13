import { useState } from "react";
import man2 from "~/constants/images/man2";
import icons from "~/constants/images/icons";
import { useAuth } from "~/context/AuthProvider";
import { Button, Form, Input, message, Upload, UploadFile } from "antd";
import dayjs from "dayjs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
import { uploadToCloudinary } from "~/common/uploadToCloudinary";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Game1 = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: { linkb1: string }) => {
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
        location: 1,
        level: 1, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
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
        location: 1,
        level: 1, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
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
      navigate("/hoan-thanh-sinh-hoat-1");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      message.error("Lỗi khi cập nhật dữ liệu!");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#e7e5db] min-h-screen text-[#4c5b29] font-[Cousine] text-sm">
      {/* Header */}
      <div className="text-center text-white h-[105px] w-full bg-[#4c5b29] fixed top-0 left-0 right-0 z-[1000]">
        <div className="relative max-w-[400px] mx-auto">
          <img
            src={icons.logoCong}
            alt="Cộng Logo"
            className="mx-auto w-12 p-1 mt-1"
            style={{ backgroundColor: "#fff" }}
          />
          {/* Tiêu đề hình ảnh */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.8, ease: "easeOut" }}
            src={man2.title}
            className="w-[80%] mx-auto"
          />
          {/* Đưa dòng chữ ra giữa đáy header */}
          <div className="absolute bottom-0 left-0 right-0 text-center italic">
            {`Của ${user?.name} bắt đầu nào!`.split("").map((char, index) => (
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
      <div className="relative bg-[#e7e5db] max-w-[400px] mx-auto p-4 pt-[110px]">
        {/* Nét đứt di chuyển */}
        <img
          src={man2.dashedLine}
          alt="đường đi"
          className="absolute left-0 top-[160px] w-full max-w-[400px] pointer-events-none"
        />
        <div className="flex w-full gap-4">
          {/* Bước 1 - Trái */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="w-1/2 relative z-10"
          >
            <div className="flex items-center gap-2">
              <img src={man2.flagVN} className="w-10 mb-1" />
              <p className="font-bold">Bước 1: Đến Cộng gần bạn nhất</p>
            </div>

            <img
              src={man2.congQuan}
              className="w-full max-w-[160px] rounded"
              alt="Cộng Quán"
            />
          </motion.div>

          {/* Bước 2 - Phải */}
          <motion.div className="w-1/2 relative z-10">
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0, ease: "easeOut" }}
              className="flex justify-end"
            >
              <img src={man2.xeMay} className="w-[80%] rounded" alt="Xe máy" />
            </motion.div>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <img src={man2.flagVN} className="w-10 mb-1" />
              <p className="font-bold">
                Bước 2: Chụp ảnh check-in với một đồ vật
              </p>
            </motion.div>
            <motion.p
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
              className="text-xs italic"
            >
              (khẩu hiệu, đèn, bức tranh, cốc...)
            </motion.p>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
              className="flex justify-end mt-2"
            >
              <img
                src={man2.caphecup}
                className="w-[50%] max-w-[160px] rounded"
                alt="Cộng"
              />
              <img
                src={man2.coffeeThings}
                className="w-[50%] max-w-[160px] rounded"
                alt="Cộng"
              />
            </motion.div>
          </motion.div>
        </div>
        {/* Bước 3 */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 3, ease: "easeOut" }}
          className="relative  z-10 max-w-[250px] mx-auto "
        >
          <div className="flex items-center gap-2">
            <img src={man2.flagVN} className="w-10" />
            <p className="font-bold">
              Bước 3: Đăng & Share trên facebook cá nhân
            </p>
          </div>
          <div className="flex gap-3">
            <img src={man2.facebookIcon} className="w-24" />
            <img src={man2.shareIcon} className="w-24" />
          </div>
        </motion.div>
        {/* Bước 4 */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 4, ease: "easeOut" }}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="relative mt-2 z-10">
              <div className="flex items-center gap-2">
                <img src={man2.flagVN} className="w-10 mb-1" />
                <p className="font-bold">Bước 4: Gắn link bài viết</p>
              </div>
              <Form.Item name="linkb1">
                <Input
                  placeholder="Dán link Facebook bài viết..."
                  className="w-full mt-2 px-3 py-2 rounded border text-black text-sm font-[Cousine]"
                />
              </Form.Item>
              {/* <input
              type="text"
              placeholder="Dán link facebook bài viết..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded border text-black text-sm"
            /> */}
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
                    <div className="relative w-full text-center">
                      <img
                        src={URL.createObjectURL(
                          fileList[0].originFileObj as File
                        )}
                        alt="Preview"
                        className="w-full object-cover rounded shadow mb-2 mx-auto"
                      />
                      <Button
                        htmlType="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setFileList([]);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                      >
                        Xóa
                      </Button>
                      <div className="text-[#4c5b29] text-sm">
                        {fileList[0].name}
                      </div>
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
                className="w-[300px] font-[Cousine] bg-[#4c5b29] text-white font-bold py-2 rounded-full shadow mx-auto"
              >
                {!loading ? "Hoàn thành" : "🚀 Gửi Link & Hoàn Thành"}
              </button>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Game1;
