import { useEffect, useState } from "react";
import { IoIosCafe } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import styles from "./Header.module.scss"; // Import the SCSS module
import { useAuth } from "../../context/AuthProvider";
const Header = () => {
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const { user } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setHeaderOpacity(window.scrollY > 0 ? 0.6 : 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        className="w-full max-w-xl lg:max-w-3xl mx-auto flex justify-between items-center p-2 bg-black/60 fixed top-0"
        style={{ opacity: headerOpacity }}
      >
        <IoIosCafe className="text-yellow-400" size={24} />
        <span className="text-lg font-bold">Mini Game Cộng</span>
        <div className="relative flex items-center bg-gray-800 px-2 py-1 rounded-full">
          <IoTicket className="text-purple-400" size={16} />
          <span className="ml-1 text-sm font-bold">{user?.level || "1"}/5</span>
        </div>
        <div className={styles["marquee-container"]}>
          <div className={styles["marquee-text"]}>
            Chào mừng bạn {user?.name} đến với trò chơi! Vui lòng chọn tham gia
            để chơi!
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
