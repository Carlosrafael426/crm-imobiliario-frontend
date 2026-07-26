import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { UserPlus, ArrowRightLeft, CalendarCheck, FileSignature, Activity } from 'lucide-react';

const ACTIVITY_ICONS = {
  novo_lead: { icon: UserPlus, className: 'bg-primary/10 text-primary' },
  status_change: { icon: ArrowRightLeft, className: 'bg-action/10 text-action' },
  visita_agendada: { icon: CalendarCheck, className: 'bg-emerald-50 text-emerald-500' },
  proposta: { icon: FileSignature, className: 'bg-amber-50 text-amber-500' },
};

function ActivityFeedSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-2 pt-0.5">
            <div className="h-3 w-3/4 bg-gray-100 rounded" />
            <div className="h-2.5 w-16 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ActivityFeed({ activities, loading }) {
  if (loading) return <ActivityFeedSkeleton />;

  if (activities.length === 0) {
    return <p className="text-sm text-gray-400">Nenhuma atividade recente.</p>;
  }

  return (
    <ol className="relative">
      {activities.map((activity, i) => {
        const config = ACTIVITY_ICONS[activity.type] || { icon: Activity, className: 'bg-gray-100 text-gray-500' };
        const Icon = config.icon;
        const isLast = i === activities.length - 1;

        return (
          <li key={activity.id} className="relative flex items-start gap-3.5 pb-6 last:pb-0">
            {!isLast && <span className="absolute left-4 top-9 bottom-0 w-px bg-gray-100" aria-hidden="true" />}
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.className}`}>
              <Icon size={15} />
            </div>
            <div className="pt-0.5 min-w-0">
              <p className="text-sm text-gray-700 leading-snug">{activity.message}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDistanceToNow(new Date(activity.timestamp), { locale: ptBR, addSuffix: true })}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
