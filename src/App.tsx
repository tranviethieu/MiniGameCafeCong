import UserProvider, {
  IUserContext,
  UserContext,
} from "./context/UserProvider";
import { motion } from "framer-motion";
import { useContext } from "react";
import ExportToExcel from "./components/ExportFirestore";
import Header from "./layouts/Header";
import StartGame from "./components/StartGame";
import GameLayout from "./layouts/GameLayout";
import MainGames from "./components/MainGames";
import { FaGift } from "react-icons/fa";

function App() {
  return (
    <UserProvider>
      <GameLayout>
        <MainApp />
      </GameLayout>
    </UserProvider>
  );
}

function MainApp() {
  const { user } = useContext<IUserContext>(UserContext);
  return user?.phone === "0123456789" && user?.name === "admin" ? (
    <ExportToExcel />
  ) : user?.phone ? (
    <>
      <Header />
      <motion.div
        className="mt-12 w-full max-w-xl mx-auto"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        {/* Missions */}
        <div className="flex overflow-x-auto space-x-4 p-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-32 flex-shrink-0 h-40 bg-gray-800 rounded-lg flex flex-col items-center justify-center text-white text-center shadow-lg p-2"
            >
              {i === 0 ? (
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <FaGift className="text-yellow-300 text-2xl" />
                </motion.div>
              ) : (
                <FaGift className="text-yellow-300 text-2xl" />
              )}
              <span className="mt-2 text-sm">Nhiệm vụ {i + 1}</span>
              <button className="mt-2 bg-purple-500 text-white px-3 py-1 rounded text-xs">
                Tham gia
              </button>
            </div>
          ))}
        </div>
        <MainGames />
      </motion.div>
    </>
  ) : (
    <main className="flex-1 p-2 flex items-center justify-center bg-gray-700 mt-10">
      <motion.div
        className="w-full h-full bg-gray-600 flex items-center justify-center rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <StartGame />
      </motion.div>
    </main>
  );
}

export default App;
