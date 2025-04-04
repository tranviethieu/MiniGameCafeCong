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
        components: {
          Modal: {
            contentBg: "rgb(17 24 39 / var(--tw-bg-opacity, 1))",
          },
          Form: {
            labelColor: "#fff",
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
