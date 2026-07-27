import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Building2, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import Badge from '../../../components/Badge';
import MetricCard from '../../../components/MetricCard';
import { mockImoveis, imoveisStats } from '../../../mocks/mockAdminData';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const STATUS_VARIANT = {
  Ativo: 'action',
  Vendido: 'success',
  Alugado: 'success',
  Parado: 'warning',
};

const PARADO_THRESHOLD_DAYS = 15;

function TableSkeleton() {
  return (
    <div className="space-y-3 animate-pulse p-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-50 rounded-lg" />
      ))}
    </div>
  );
}

export default function AdminImoveis() {
  const [isLoading, setIsLoading] = useState(true);
  const [imoveis, setImoveis] = useState([]);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [corretorFilter, setCorretorFilter] = useState('todos');

  useEffect(() => {
    const timer = setTimeout(() => {
      setImoveis(mockImoveis);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const corretores = useMemo(
    () => Array.from(new Set(mockImoveis.map((imovel) => imovel.corretor))).sort(),
    []
  );

  const filteredImoveis = imoveis.filter((imovel) => {
    const matchesStatus = statusFilter === 'todos' || imovel.status === statusFilter;
    const matchesCorretor = corretorFilter === 'todos' || imovel.corretor === corretorFilter;
    return matchesStatus && matchesCorretor;
  });

  const totalAtivos = imoveis.filter((imovel) => imovel.status === 'Ativo').length;
  const vendidosAlugadosMes = imoveis.filter((imovel) => imovel.status === 'Vendido' || imovel.status === 'Alugado').length;
  const parados = imoveis.filter((imovel) => imovel.diasSemInteracao > PARADO_THRESHOLD_DAYS).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard icon={Building2} label="Imóveis ativos" value={totalAtivos} deltaPercent={0} trend="up" accent="primary" loading={isLoading} />
        <MetricCard icon={CheckCircle2} label="Vendidos/alugados no mês" value={vendidosAlugadosMes} deltaPercent={0} trend="up" accent="action" loading={isLoading} />
        <MetricCard icon={Clock} label="Tempo médio até a venda" value={`${imoveisStats.tempoMedioVendaDias} dias`} deltaPercent={0} trend="down" accent="primary" loading={isLoading} />
        <MetricCard icon={AlertTriangle} label={`Parados há +${PARADO_THRESHOLD_DAYS} dias`} value={parados} deltaPercent={0} trend="down" accent="action" loading={isLoading} />
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        >
          <option value="todos">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="Vendido">Vendido</option>
          <option value="Alugado">Alugado</option>
          <option value="Parado">Parado</option>
        </select>
        <select
          value={corretorFilter}
          onChange={(e) => setCorretorFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        >
          <option value="todos">Todos os corretores</option>
          {corretores.map((corretor) => (
            <option key={corretor} value={corretor}>
              {corretor}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide bg-gray-50/70">
                  <th className="px-6 py-3 font-semibold">Imóvel</th>
                  <th className="px-6 py-3 font-semibold">Corretor</th>
                  <th className="px-6 py-3 font-semibold text-right">Valor</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-center">Sem interação</th>
                  <th className="px-6 py-3 font-semibold">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {filteredImoveis.map((imovel) => (
                  <tr key={imovel.id} className="border-t border-gray-50 hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{imovel.titulo}</p>
                      <p className="text-xs text-gray-400">{imovel.tipo}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{imovel.corretor}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-700">{currencyFormatter.format(imovel.valor)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={STATUS_VARIANT[imovel.status] || 'neutral'}>{imovel.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {imovel.diasSemInteracao > 0 ? `${imovel.diasSemInteracao} dias` : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {format(new Date(imovel.dataCadastro), 'dd/MM/yyyy', { locale: ptBR })}
                    </td>
                  </tr>
                ))}

                {filteredImoveis.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">
                      Nenhum imóvel encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
