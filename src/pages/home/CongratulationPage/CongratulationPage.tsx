import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthProvider";

const CongratulationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f3f0e7] flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <div className="text-[#a60000] font-bold text-lg uppercase mb-2 tracking-widest">
        CỘNG
      </div>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-extrabold text-green-800 mb-1">HOAN HÔ!!</h1>
      <div className="text-green-800 text-xl mb-4">...</div>

      {/* Ảnh */}
      <div className="relative my-4">
        <img
          src="/chair.png" // thay bằng đường dẫn ảnh bạn đã upload
          alt="Ghế"
          className="w-[200px] mx-auto"
        />
        <div className="absolute top-[-20px] left-[30px] rotate-[-10deg] bg-white px-3 py-2 shadow-lg text-sm font-semibold text-green-900 border border-gray-300">
          BẠN LÀ GHẾ <br /> VÌ BẠN <br /> KHÔNG PHẢI BẠN!
        </div>
      </div>

      {/* Thông báo hoàn thành */}
      <div className="text-gray-700 italic text-lg mb-2">
        Bạn {user?.name} đã
      </div>
      <div className="text-green-900 font-extrabold text-2xl mb-6">
        HOÀN THÀNH
        <br /> XUẤT SẮC MỨC 1
      </div>

      {/* Nút tiếp tục */}
      <button
        onClick={() => {
          navigate("/");
        }}
        className="bg-green-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-green-800 transition"
      >
        TIẾP TỤC ▶
      </button>
    </div>
  );
};

export default CongratulationPage;
