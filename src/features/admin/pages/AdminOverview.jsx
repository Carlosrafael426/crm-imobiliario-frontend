import React, { useState, useEffect } from 'react';
import { Users, Building2, FileSignature, Percent, DollarSign } from 'lucide-react';
import MetricCard from '../../../components/MetricCard';
import LeadsChart from '../components/LeadsChart';
import RankingCorretores from '../components/RankingCorretores';
import { globalMetrics, leadsSalesSeries, corretoresRanking } from '../../../mocks/mockAdminData';

const currencyCompact = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact',
  maximumFractionDigits: 2,
});

function SectionSkeleton({ className = 'h-64' }) {
  return <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse ${className}`} />;
}

export default function AdminOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [series, setSeries] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics(globalMetrics);
      setSeries(leadsSalesSeries);
      setRanking(corretoresRanking);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <MetricCard
          icon={Users}
          label="Leads ativos"
          value={metrics?.leadsAtivos.value ?? 0}
          deltaPercent={metrics?.leadsAtivos.deltaPercent ?? 0}
          trend={metrics?.leadsAtivos.trend}
          accent="primary"
          loading={isLoading}
        />
        <MetricCard
          icon={Building2}
          label="Total de imóveis"
          value={metrics?.totalImoveis.value ?? 0}
          deltaPercent={metrics?.totalImoveis.deltaPercent ?? 0}
          trend={metrics?.totalImoveis.trend}
          accent="action"
          loading={isLoading}
        />
        <MetricCard
          icon={FileSignature}
          label="Propostas em andamento"
          value={metrics?.propostasAndamento.value ?? 0}
          deltaPercent={metrics?.propostasAndamento.deltaPercent ?? 0}
          trend={metrics?.propostasAndamento.trend}
          accent="primary"
          loading={isLoading}
        />
        <MetricCard
          icon={Percent}
          label="Taxa de conversão geral"
          value={`${metrics?.taxaConversaoGeral.value ?? 0}%`}
          deltaPercent={metrics?.taxaConversaoGeral.deltaPercent ?? 0}
          trend={metrics?.taxaConversaoGeral.trend}
          accent="action"
          loading={isLoading}
        />
        <MetricCard
          icon={DollarSign}
          label="Faturamento estimado (mês)"
          value={metrics ? currencyCompact.format(metrics.faturamentoEstimado.value) : 'R$ 0'}
          deltaPercent={metrics?.faturamentoEstimado.deltaPercent ?? 0}
          trend={metrics?.faturamentoEstimado.trend}
          accent="primary"
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <section className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Leads e Vendas ao Longo do Tempo</h2>
          <p className="text-sm text-gray-500 mb-4">Últimos 6 meses</p>
          {isLoading ? <SectionSkeleton className="h-64" /> : <LeadsChart data={series} />}
        </section>

        <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Ranking de Corretores</h2>
          <p className="text-sm text-gray-500 mb-4">Por propostas fechadas no período</p>
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-50 rounded-lg" />
              ))}
            </div>
          ) : (
            <RankingCorretores corretores={ranking} />
          )}
        </section>
      </div>
    </div>
  );
}
