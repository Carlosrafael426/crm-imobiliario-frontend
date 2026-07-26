import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, MessageSquare, PlusCircle, LayoutDashboard, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Meu Painel', path: '/app/painel', icon: <LayoutDashboard size={20} /> },
    { name: 'Dashboard', path: '/app', icon: <Home size={20} /> },
    { name: 'Novos Leads', path: '/app/novos', icon: <PlusCircle size={20} /> },
    { name: 'Visitas', path: '/app/visitas', icon: <Calendar size={20} /> },
    { name: 'Propostas', path: '/app/propostas', icon: <MessageSquare size={20} /> },
    { name: 'Calendário', path: '/app/calendario', icon: <Calendar size={20} /> }, // Usando o icone de calendario novamente ou similar, ajustaremos conforme necessario.
  ];

  return (
    <>
      {/* Barra superior mobile: sidebar vira menu off-canvas abaixo de lg */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 shadow-sm">
        <span className="text-xl font-bold text-primary">CRM.Elite</span>
        <button type="button" onClick={() => setIsOpen(true)} className="text-gray-600" aria-label="Abrir menu">
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`w-64 h-screen bg-white border-r border-gray-100 flex flex-col items-center py-6 shadow-sm
        fixed lg:static top-0 left-0 z-50 transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="mb-10 w-full px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF8C7A] to-red-400">
            CRM.Elite
          </h1>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col w-full px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-[#FF8C7A] text-white font-medium shadow-md shadow-[#FF8C7A]/30'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
