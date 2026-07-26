import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText } from 'lucide-react';

const STAGES = [
  { id: 'Novo', title: 'Novo Lead' },
  { id: 'Contatado', title: 'Em Contato' },
  { id: 'Visita', title: 'Visita Agendada' },
  { id: 'Proposta', title: 'Proposta' },
  { id: 'Fechado', title: 'Fechado' },
];

// Notação compacta (ex: "R$ 340 mil") para caber nos cards estreitos do funil.
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact',
  maximumFractionDigits: 1,
});

function StageLeadCard({ lead }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm hover:shadow-md transition-shadow">
      <p className="font-semibold text-gray-800 text-sm truncate">{lead.nome}</p>
      <p className="text-xs text-gray-500 mt-1.5 flex items-start gap-1.5 leading-snug">
        <FileText size={12} className="text-gray-400 shrink-0 mt-0.5" />
        <span className="line-clamp-2">{lead.imovelInteresse}</span>
      </p>
      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-gray-50">
        <span className="text-xs font-bold text-gray-700">{currencyFormatter.format(lead.valorEstimado)}</span>
        <span className="text-[10px] text-gray-400 shrink-0">
          {formatDistanceToNow(new Date(lead.entrouNaEtapaEm), { locale: ptBR, addSuffix: true })}
        </span>
      </div>
    </div>
  );
}

function MiniKanbanSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-20 bg-white rounded-xl border border-gray-100" />
          <div className="h-20 bg-white rounded-xl border border-gray-100" />
        </div>
      ))}
    </div>
  );
}

export default function MiniKanban({ leads, loading }) {
  const [activeStage, setActiveStage] = useState(STAGES[0].id);

  if (loading) return <MiniKanbanSkeleton />;

  const leadsByStage = (stageId) => leads.filter((lead) => lead.status === stageId);

  return (
    <div>
      {/* Mobile: funil vira abas por etapa */}
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hidden">
          {STAGES.map((stage) => {
            const count = leadsByStage(stage.id).length;
            const isActive = stage.id === activeStage;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(stage.id)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                    : 'bg-gray-50 text-gray-500 border border-gray-100'
                }`}
              >
                {stage.title} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {leadsByStage(activeStage).length === 0 ? (
            <div className="h-20 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Nenhum lead nesta etapa
            </div>
          ) : (
            leadsByStage(activeStage).map((lead) => <StageLeadCard key={lead.id} lead={lead} />)
          )}
        </div>
      </div>

      {/* Desktop: colunas lado a lado */}
      <div className="hidden lg:grid grid-cols-5 gap-4 items-start">
        {STAGES.map((stage) => {
          const stageLeads = leadsByStage(stage.id);
          return (
            <div key={stage.id} className="bg-gray-50/70 rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-3 px-0.5">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{stage.title}</span>
                <span className="bg-white text-gray-500 text-[10px] px-2 py-0.5 rounded-full border border-gray-200 font-medium">
                  {stageLeads.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {stageLeads.length === 0 ? (
                  <div className="h-16 border-2 border-dashed border-gray-200/70 rounded-xl flex items-center justify-center text-gray-400 text-[11px]">
                    Vazio
                  </div>
                ) : (
                  stageLeads.map((lead) => <StageLeadCard key={lead.id} lead={lead} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
