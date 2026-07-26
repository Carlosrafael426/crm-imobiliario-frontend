import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import LeadCard from './LeadCard';

export default function KanbanColumn({ id, title, leads }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`kanban-column transition-all duration-200 ${isOver ? 'bg-blue-50/50 ring-1 ring-blue-200 shadow-inner' : 'bg-transparent'}`}
    >
      <div className="flex justify-between items-center mb-5 px-1 shrink-0">
        <h3 className="font-semibold text-gray-700 tracking-wide text-sm uppercase">{title}</h3>
        <span className="bg-white text-gray-500 text-xs px-2.5 py-0.5 rounded-full font-medium border border-gray-200 shadow-sm">
          {leads.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-hidden pb-4">
        {leads.map(lead => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
        {leads.length === 0 && (
          <div className="h-24 border-2 border-dashed border-gray-200/70 rounded-2xl flex items-center justify-center text-gray-400 text-sm font-medium bg-gray-50/30">
            Solte os leads aqui
          </div>
        )}
      </div>
    </div>
  );
}
