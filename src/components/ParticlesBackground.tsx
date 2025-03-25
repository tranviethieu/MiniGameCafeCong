import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Dùng phiên bản nhẹ

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#fff" }, // Màu nền tối
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } }, // Số lượng bong bóng
          move: { enable: true, speed: 2, direction: "none", outModes: "out" }, // Di chuyển ngẫu nhiên
          shape: { type: "circle" }, // Hình dạng
          size: { value: 10, random: true }, // Kích thước ngẫu nhiên
          opacity: { value: 0.8, random: true }, // Độ trong suốt
          color: { value: ["#00aaff", "#ff0077", "#ffcc00"] }, // Màu sắc bong bóng
          links: { enable: false }, // Không có liên kết
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "bubble" },
            onClick: { enable: true, mode: "repulse" },
          },
          modes: {
            bubble: { distance: 150, size: 20, duration: 2, opacity: 0.5 }, // Hiệu ứng phóng to khi hover
            repulse: { distance: 200, duration: 0.4 }, // Đẩy ra khi click
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
