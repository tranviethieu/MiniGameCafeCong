import MainGames from "../MainGames";
const MainApp = () => {
  // const { user } = useContext<IUserContext>(UserContext);
  // //Admin
  // if (user?.phone === "0123456789" && user?.name === "admin") {
  //   return <ExportToExcel />;
  // }

  // // Login
  // if (!!!user?.phone) {
  //   return (
  //     <main className="flex-1 p-2 flex items-center justify-center ">
  //       <motion.div
  //         className="w-full h-full flex items-center justify-center rounded-lg "
  //         initial={{ opacity: 0, x: -100 }}
  //         animate={{ opacity: 1, x: 0 }}
  //         exit={{ opacity: 0, x: 100 }}
  //         transition={{ duration: 0.5 }}
  //       >
  //         <StartGame />
  //       </motion.div>
  //     </main>
  //   );
  // }
  //return <QuizCard />;
  return <MainGames />;
};
export default MainApp;
