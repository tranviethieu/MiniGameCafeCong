import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";

function LoadingScreen({
  particlesInit,
}: {
  particlesInit: (engine: Engine) => Promise<void>;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#000",
      }}
    >
      <Particles
        init={particlesInit}
        options={{
          background: { color: "#000" },
          particles: {
            number: { value: 100 },
            move: { enable: true, speed: 2 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
          },
        }}
      />
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
        }}
      >
        Loading...
      </h1>
    </div>
  );
}
export default LoadingScreen;
