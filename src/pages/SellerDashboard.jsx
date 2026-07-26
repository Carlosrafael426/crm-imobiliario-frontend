import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PlusCircle, Users, CalendarCheck, FileSignature, Percent, Activity as ActivityIcon } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import MiniKanban from '../components/MiniKanban';
import VisitList from '../components/VisitList';
import AttentionLeads from '../components/AttentionLeads';
import ActivityFeed from '../components/ActivityFeed';
import NewLeadModal from '../components/NewLeadModal';
import {
  currentSeller,
  sellerMetrics,
  sellerLeads,
  upcomingVisits as mockUpcomingVisits,
  activityFeed as mockActivityFeed,
} from '../mocks/mockSellerData';

const ATTENTION_THRESHOLD_DAYS = 3;

export default function SellerDashboard() {
  const [isMetricsLoading, setIsMetricsLoading] = useState(true);
  const [isLeadsLoading, setIsLeadsLoading] = useState(true);
  const [isVisitsLoading, setIsVisitsLoading] = useState(true);
  const [isActivityLoading, setIsActivityLoading] = useState(true);

  const [metrics, setMetrics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [visits, setVisits] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [now] = useState(() => Date.now());

  // Cada seção "busca" seus dados de forma independente (delays diferentes),
  // simulando chamadas de API separadas até o backend existir de verdade.
  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setMetrics(sellerMetrics);
        setIsMetricsLoading(false);
      }, 600),
      setTimeout(() => {
        setLeads(sellerLeads);
        setIsLeadsLoading(false);
      }, 900),
      setTimeout(() => {
        setVisits(mockUpcomingVisits);
        setIsVisitsLoading(false);
      }, 750),
      setTimeout(() => {
        setActivities(mockActivityFeed);
        setIsActivityLoading(false);
      }, 1100),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleConfirmVisit = (id) => {
    setVisits((prev) => prev.map((visit) => (visit.id === id ? { ...visit, status: 'Confirmada' } : visit)));
  };

  const attentionLeads = leads
    .filter((lead) => lead.status !== 'Fechado')
    .map((lead) => ({
      ...lead,
      daysInactive: Math.floor((now - new Date(lead.ultimoContato).getTime()) / (1000 * 60 * 60 * 24)),
    }))
    .filter((lead) => lead.daysInactive > ATTENTION_THRESHOLD_DAYS)
    .sort((a, b) => b.daysInactive - a.daysInactive);

  const todayLabelRaw = format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const todayLabel = todayLabelRaw.charAt(0).toUpperCase() + todayLabelRaw.slice(1);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="flex flex-wrap gap-4 justify-between items-end mb-8 w-full border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Olá, {currentSeller.nome.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">{todayLabel}</p>
        </div>
        <button
          onClick={() => setIsNewLeadModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm shadow-blue-600/20"
        >
          <PlusCircle size={18} />
          Novo Lead
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <MetricCard
          icon={Users}
          label="Leads ativos"
          value={metrics?.leadsAtivos.value ?? 0}
          deltaPercent={metrics?.leadsAtivos.deltaPercent ?? 0}
          trend={metrics?.leadsAtivos.trend}
          accent="primary"
          loading={isMetricsLoading}
        />
        <MetricCard
          icon={CalendarCheck}
          label="Visitas esta semana"
          value={metrics?.visitasSemana.value ?? 0}
          deltaPercent={metrics?.visitasSemana.deltaPercent ?? 0}
          trend={metrics?.visitasSemana.trend}
          accent="action"
          loading={isMetricsLoading}
        />
        <MetricCard
          icon={FileSignature}
          label="Propostas em andamento"
          value={metrics?.propostasAndamento.value ?? 0}
          deltaPercent={metrics?.propostasAndamento.deltaPercent ?? 0}
          trend={metrics?.propostasAndamento.trend}
          accent="primary"
          loading={isMetricsLoading}
        />
        <MetricCard
          icon={Percent}
          label="Taxa de conversão"
          value={`${metrics?.taxaConversao.value ?? 0}%`}
          deltaPercent={metrics?.taxaConversao.deltaPercent ?? 0}
          trend={metrics?.taxaConversao.trend}
          accent="action"
          loading={isMetricsLoading}
        />
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Meu Funil de Vendas</h2>
        <MiniKanban leads={leads} loading={isLeadsLoading} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-start">
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Próximas Visitas</h2>
          <VisitList visits={visits} loading={isVisitsLoading} onConfirm={handleConfirmVisit} />
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Leads que Precisam de Atenção</h2>
          <AttentionLeads leads={attentionLeads} loading={isLeadsLoading} />
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <ActivityIcon size={18} className="text-primary" />
          <h2 className="text-lg font-bold text-gray-900">Atividade Recente</h2>
        </div>
        <ActivityFeed activities={activities} loading={isActivityLoading} />
      </section>

      {isNewLeadModalOpen && (
        <NewLeadModal onClose={() => setIsNewLeadModalOpen(false)} onCreated={() => setIsNewLeadModalOpen(false)} />
      )}
    </div>
  );
}
