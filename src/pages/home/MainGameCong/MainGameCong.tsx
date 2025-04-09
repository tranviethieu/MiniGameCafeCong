import TitleBlock from "~/components/TitleBlock";
import icons from "~/constants/images/icons";
import ActivityLevels from "./components/ActivityLevels";

const MainGameCong = () => {
  return (
    // ✅ Lớp bọc background toàn màn hình trên mọi thiết bị
    <div className="relative min-h-screen w-full bg-[#e5e5db] ">
      {/* ✅ Nội dung căn giữa, giới hạn chiều rộng */}
      <div className=" flex flex-col items-center text-center p-4 w-full max-w-screen-sm mx-auto overflow-x-hidden">
        {/* Logo */}
        <div className="text-[#3c4d2f] font-bold text-xl mt-4">
          <img src={icons.logoCong} style={{ width: 60 }} alt="Logo Cộng" />
        </div>

        {/* Title */}
        <div className="mt-2 mb-6" style={{ height: 140 }}>
          <TitleBlock />
        </div>

        {/* Mini Game Box */}
        <ActivityLevels />
      </div>
    </div>
  );
};

export default MainGameCong;
