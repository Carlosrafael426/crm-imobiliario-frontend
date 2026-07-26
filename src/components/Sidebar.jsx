import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, MessageSquare, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Novos Leads', path: '/novos', icon: <PlusCircle size={20} /> },
    { name: 'Visitas', path: '/visitas', icon: <Calendar size={20} /> },
    { name: 'Propostas', path: '/propostas', icon: <MessageSquare size={20} /> },
    { name: 'Calendário', path: '/calendario', icon: <Calendar size={20} /> }, // Usando o icone de calendario novamente ou similar, ajustaremos conforme necessario.
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col items-center py-6 shadow-sm">
      <div className="mb-10 w-full px-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF8C7A] to-red-400">
          CRM.Elite
        </h1>
      </div>
      
      <div className="flex flex-col w-full px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
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
  );
};

export default Sidebar;
