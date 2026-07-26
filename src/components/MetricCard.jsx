import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse">
      <div className="w-11 h-11 rounded-xl bg-gray-100 mb-6" />
      <div className="h-7 w-14 bg-gray-100 rounded mb-2.5" />
      <div className="h-3 w-24 bg-gray-100 rounded" />
    </div>
  );
}

export default function MetricCard({ icon, label, value, deltaPercent, trend, accent = 'primary', loading }) {
  if (loading) return <MetricCardSkeleton />;

  const Icon = icon;
  const isUp = trend === 'up';
  const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${
          accent === 'primary' ? 'bg-primary/10 text-primary' : 'bg-action/10 text-action'
        }`}
      >
        <Icon size={20} />
      </div>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      <div className="flex items-center justify-between mt-1.5 gap-2">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold shrink-0 ${
            isUp ? 'text-emerald-600' : 'text-red-500'
          }`}
          title="Variação frente ao mês anterior"
        >
          <TrendIcon size={13} />
          {Math.abs(deltaPercent)}%
        </span>
      </div>
    </div>
  );
}
