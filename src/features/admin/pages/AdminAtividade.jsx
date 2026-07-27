import React, { useState, useEffect, useMemo } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRightLeft, UserPlus, FileSignature, UserCog, Activity } from 'lucide-react';
import { activityLog } from '../../../mocks/mockAdminData';

const TYPE_CONFIG = {
  status_change: { label: 'Mudança de status', icon: ArrowRightLeft, className: 'bg-action/10 text-action' },
  novo_lead: { label: 'Novo lead', icon: UserPlus, className: 'bg-primary/10 text-primary' },
  proposta_fechada: { label: 'Proposta fechada', icon: FileSignature, className: 'bg-emerald-50 text-emerald-500' },
  usuario: { label: 'Usuários', icon: UserCog, className: 'bg-amber-50 text-amber-500' },
};

function ListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 bg-gray-50 rounded-lg" />
      ))}
    </div>
  );
}

export default function AdminAtividade() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [typeFilter, setTypeFilter] = useState('todos');
  const [userFilter, setUserFilter] = useState('todos');

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivities(activityLog);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const usuarios = useMemo(() => Array.from(new Set(activityLog.map((item) => item.usuario))).sort(), []);

  const filteredActivities = activities.filter((activity) => {
    const matchesType = typeFilter === 'todos' || activity.tipo === typeFilter;
    const matchesUser = userFilter === 'todos' || activity.usuario === userFilter;
    return matchesType && matchesUser;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        >
          <option value="todos">Todos os tipos</option>
          {Object.entries(TYPE_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        >
          <option value="todos">Todos os usuários</option>
          {usuarios.map((usuario) => (
            <option key={usuario} value={usuario}>
              {usuario}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {isLoading ? (
          <ListSkeleton />
        ) : filteredActivities.length === 0 ? (
          <p className="text-sm text-gray-400 p-10 text-center">Nenhuma atividade encontrada.</p>
        ) : (
          <ol className="divide-y divide-gray-50">
            {filteredActivities.map((activity) => {
              const config = TYPE_CONFIG[activity.tipo] || { label: activity.tipo, icon: Activity, className: 'bg-gray-100 text-gray-500' };
              const Icon = config.icon;
              return (
                <li key={activity.id} className="flex items-start gap-4 p-5">
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${config.className}`}>
                    <Icon size={16} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">{activity.usuario}</span> {activity.descricao}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(activity.timestamp), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} ·{' '}
                      {formatDistanceToNow(new Date(activity.timestamp), { locale: ptBR, addSuffix: true })}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 shrink-0 hidden sm:block">{config.label}</span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
