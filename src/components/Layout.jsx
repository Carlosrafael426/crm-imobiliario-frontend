import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Aqui podemos colocar um Header (TopBar) para notificações no futuro */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F9FAFB] p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
