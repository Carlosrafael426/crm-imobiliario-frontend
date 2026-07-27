import React from 'react';
import { Crown, Medal, Award } from 'lucide-react';

const PODIUM = [
  { icon: Crown, className: 'text-amber-500 bg-amber-50' },
  { icon: Medal, className: 'text-gray-400 bg-gray-100' },
  { icon: Award, className: 'text-orange-400 bg-orange-50' },
];

export default function RankingCorretores({ corretores }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className="text-left text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
            <th className="pb-3 font-semibold">Corretor</th>
            <th className="pb-3 font-semibold text-center">Leads</th>
            <th className="pb-3 font-semibold text-center">Propostas Fechadas</th>
            <th className="pb-3 font-semibold text-right">Conversão</th>
          </tr>
        </thead>
        <tbody>
          {corretores.map((corretor, i) => {
            const podium = PODIUM[i];
            return (
              <tr key={corretor.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    {podium ? (
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${podium.className}`}>
                        <podium.icon size={14} />
                      </span>
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-gray-50 text-gray-400 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                    )}
                    <span className="font-semibold text-gray-800">{corretor.nome}</span>
                  </div>
                </td>
                <td className="py-3.5 text-center text-gray-600">{corretor.leadsAtribuidos}</td>
                <td className="py-3.5 text-center text-gray-600">{corretor.propostasFechadas}</td>
                <td className="py-3.5 text-right font-semibold text-emerald-600">{corretor.taxaConversao}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
