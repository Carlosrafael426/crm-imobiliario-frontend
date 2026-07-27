import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Activity, Settings, ShieldCheck } from 'lucide-react';

const TABS = [
  { path: '/app/admin', label: 'Visão Geral', icon: LayoutDashboard },
  { path: '/app/admin/usuarios', label: 'Usuários', icon: Users },
  { path: '/app/admin/imoveis', label: 'Imóveis', icon: Building2 },
  { path: '/app/admin/atividade', label: 'Atividade', icon: Activity },
  { path: '/app/admin/configuracoes', label: 'Configurações', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Administração</h1>
            <p className="text-gray-500 text-sm">Visão completa da operação da imobiliária</p>
          </div>
        </div>

        <nav className="flex items-center gap-1.5 mt-6 border-b border-gray-100 overflow-x-auto scrollbar-hidden">
          {TABS.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-1.5 shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'
                }`}
              >
                <tab.icon size={15} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  );
}
