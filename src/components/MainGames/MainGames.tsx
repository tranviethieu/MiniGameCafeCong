const MainGames = () => {
  return (
    <div className="inset-0 flex flex-col items-center justify-center rounded-lg">
      <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-lg font-bold shadow-md">
        Chơi với bạn bè
      </button>
      <div className="mt-6">
        <h3 className="text-lg font-bold">Lời mời đã gửi</h3>
        <div className="mt-2 flex items-center p-3 bg-gray-800 rounded-lg shadow">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="ml-4">
            <p className="text-sm">1. Lời mời</p>
            <span className="text-xs text-gray-400">Còn 2 ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainGames;
