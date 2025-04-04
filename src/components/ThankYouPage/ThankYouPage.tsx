import React, { useRef } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import icons from "../../constants/images/icons";
import { ArrowDown } from "iconsax-react";

const ThankYouPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!pageRef.current) return;

    // Tìm nút tải xuống
    const downloadButton = document.getElementById("download-btn");
    if (downloadButton) {
      downloadButton.style.display = "none"; // Ẩn nút
    }

    try {
      const dataUrl = await toPng(pageRef.current);
      download(dataUrl, "thank-you.png");
    } catch (error) {
      console.error("Error generating image:", error);
    }

    if (downloadButton) {
      downloadButton.style.display = "block"; // Hiện lại nút sau khi tải xong
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 text-white px-6 py-10 text-center relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <img
        src={icons.quizResult}
        alt="Game illustration"
        className="w-80 h-auto mb-8 rounded-xl"
      />
      {/* Logo */}
      <img
        src={icons.logoCong}
        alt="Logo"
        className="w-32 h-32 mb-auto rounded-full shadow-lg bg-white p-2"
      />

      {/* Tiêu đề */}
      <h1 className="xl:text-5xl text-2xl mb-4 drop-shadow-md">
        🎉 Cảm ơn bạn 🎉
      </h1>
      <h2 className="text-1xl mb-auto drop-shadow-md">
        Bạn đã hoàn thành trò chơi này!
      </h2>
      {/* Mô tả */}
      <p className="text-xl mb-auto max-w-xl leading-relaxed drop-shadow">
        Chúng tôi hy vọng bạn đã có những phút giây thư giãn và thú vị. Hẹn gặp
        lại trong các trò chơi tiếp theo!
      </p>

      {/* Hình minh họa */}

      {/* Nút tải ảnh */}
      <button
        id="download-btn"
        onClick={handleDownload}
        className="fixed top-10 right-10 bg-transition text-pink-600 hover:text-white hover:bg-blue-600 transition font-semibold px-3 py-2 rounded-full shadow-xl text-lg "
      >
        <ArrowDown size="24" color="#fff" />
      </button>
    </div>
  );
};

export default ThankYouPage;
