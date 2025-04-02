import { useState, useEffect } from "react";
import { motion } from "framer-motion";
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderOpacity(window.scrollY > 0 ? 0.6 : 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      {/* Header */}
      <header
        className="p-2 bg-gray-800 text-center text-lg font-bold fixed w-full top-0 transition-opacity duration-300"
        style={{ opacity: headerOpacity }}
      >
        Mini Game Cộng
      </header>

      {/* Game Area */}
      <main className="flex-1 flex items-center justify-center bg-gray-700 mt-10">
        <motion.div
          className="w-5/6 h-5/6 bg-gray-600 flex items-center justify-center rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Controls */}
      {/* <footer className="p-4 bg-gray-800 flex justify-around">
        <button className="bg-blue-500 p-4 rounded-full">⬅️</button>
        <button className="bg-red-500 p-4 rounded-full">🔥</button>
        <button className="bg-blue-500 p-4 rounded-full">➡️</button>
      </footer> */}
    </div>
  );
}
