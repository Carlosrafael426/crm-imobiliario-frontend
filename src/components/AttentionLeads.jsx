import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import WhatsAppAction from './WhatsAppAction';

function AttentionLeadsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-50 rounded-xl" />
      ))}
    </div>
  );
}

export default function AttentionLeads({ leads, loading }) {
  if (loading) return <AttentionLeadsSkeleton />;

  if (leads.length === 0) {
    return (
      <div className="h-24 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 text-sm gap-1.5">
        <CheckCircle2 size={20} className="text-gray-300" />
        Nenhum lead parado. Bom trabalho!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {leads.map((lead) => (
        <div key={lead.id} className="flex items-center gap-4 bg-orange-50/60 border border-orange-100 rounded-xl p-4">
          <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
            <AlertTriangle size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm truncate">{lead.nome}</p>
            <p className="text-xs text-orange-600 font-medium mt-0.5">
              Último contato: {format(new Date(lead.ultimoContato), "dd 'de' MMMM", { locale: ptBR })} · há{' '}
              {lead.daysInactive} {lead.daysInactive === 1 ? 'dia' : 'dias'}
            </p>
          </div>
          <WhatsAppAction
            lead={lead}
            label="Entrar em contato"
            className="shrink-0 flex items-center gap-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
          />
        </div>
      ))}
    </div>
  );
}
