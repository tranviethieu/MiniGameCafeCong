import React, { useRef } from "react";
import icons from "~/constants/images/icons";
interface LayoutGameProps {
  children: React.ReactNode;
}
const LayoutGame = ({ children }: LayoutGameProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-[17px] bg-[#e6e5db]">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="fixed inset-0  object-cover z-0 lg:w-[24%] h-[90%]  left-1/2 -translate-x-1/2 "
      >
        <source src={icons.bgVideo} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>

      {/* Content overlay */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] text-[#f1f1f1] p-5 z-10 text-center">
        {children}
      </div>
    </div>
  );
};

export default LayoutGame;
