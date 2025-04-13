import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ConfigProvider } from "antd";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryActive: "#4c5b29",
          colorPrimaryHover: "#4c5b29",
        },
        components: {
          Modal: {
            contentBg: "rgb(17 24 39 / var(--tw-bg-opacity, 1))",
          },
          Form: {
            labelColor: "#fff",
          },
          Input: {
            activeBorderColor: "rgb(107, 123, 100)",
            hoverBorderColor: "rgb(107, 123, 100)",
          },
          Button: {
            defaultActiveColor: "rgb(107, 123, 100)",
            defaultHoverColor: "rgb(107, 123, 100)",
            defaultActiveBorderColor: "rgb(107, 123, 100)",
          },
        },
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>
);
