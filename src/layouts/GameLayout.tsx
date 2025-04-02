export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-4 flex flex-col items-center">
      {children}
    </div>
  );
}
