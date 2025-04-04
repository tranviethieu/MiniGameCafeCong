// import GameLayout from "./layouts/GameLayout";
// import MainApp from "./components/MainApp";
import UserProvider from "./context/UserProvider";
import { ConfigProvider } from "antd";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "rgb(17 24 39 / var(--tw-bg-opacity, 1))",
          },
        },
      }}
    >
      <UserProvider>
        {/* <GameLayout>
          <MainApp />
         
        </GameLayout> */}
        <ThankYouPage />
      </UserProvider>
    </ConfigProvider>
  );
}

export default App;
