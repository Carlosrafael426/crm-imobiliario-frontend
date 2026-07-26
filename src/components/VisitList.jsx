import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin, CheckCircle2, CalendarClock, ArrowRight } from 'lucide-react';

function VisitListSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-50 rounded-xl" />
      ))}
    </div>
  );
}

export default function VisitList({ visits, loading, onConfirm }) {
  if (loading) return <VisitListSkeleton />;

  return (
    <div>
      <div className="flex flex-col gap-3">
        {visits.slice(0, 5).map((visit) => (
          <div
            key={visit.id}
            className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center shrink-0 leading-none">
              <span className="text-[10px] font-semibold uppercase">
                {format(new Date(visit.dataHora), 'MMM', { locale: ptBR })}
              </span>
              <span className="text-base font-bold">{format(new Date(visit.dataHora), 'dd')}</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{visit.clienteNome}</p>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                <MapPin size={12} className="text-gray-400 shrink-0" />
                <span className="truncate">{visit.endereco}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5 capitalize">
                {format(new Date(visit.dataHora), "EEEE', às' HH:mm", { locale: ptBR })}
              </p>
            </div>

            {visit.status === 'Pendente' ? (
              <button
                type="button"
                onClick={() => onConfirm(visit.id)}
                className="shrink-0 flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                <CheckCircle2 size={14} /> Confirmar
              </button>
            ) : (
              <Link
                to="/app/calendario"
                className="shrink-0 flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-100 transition-colors"
              >
                <CalendarClock size={14} /> Reagendar
              </Link>
            )}
          </div>
        ))}

        {visits.length === 0 && (
          <div className="h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Nenhuma visita agendada.
          </div>
        )}
      </div>

      <Link
        to="/app/calendario"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-action hover:underline"
      >
        Ver agenda completa <ArrowRight size={14} />
      </Link>
    </div>
  );
}
