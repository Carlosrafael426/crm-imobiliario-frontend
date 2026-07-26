import React, { useState } from 'react';
import { DndContext, closestCorners, DragOverlay } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import LeadCard from './LeadCard';

const COLUMNS = [
  { id: 'Novo', title: 'Novos Leads' },
  { id: 'Contatado', title: 'Em Contato' },
  { id: 'Visita', title: 'Visita Agendada' },
  { id: 'Proposta', title: 'Em Negociação' },
  { id: 'Fechado', title: 'Fechados / Ganhos' }
];

export default function KanbanBoard({ leads, onStatusChange }) {
  const [activeLead, setActiveLead] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const lead = leads.find(l => l.id === active.id);
    setActiveLead(lead);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveLead(null);
    
    if (over && active.id && over.id) {
      const draggedLead = leads.find(l => l.id === active.id);
      if (draggedLead && draggedLead.status !== over.id) {
        onStatusChange(active.id, over.id);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full items-stretch">
        {COLUMNS.map(col => {
          const colLeads = leads.filter(lead => lead.status === col.id);
          return (
            <KanbanColumn key={col.id} id={col.id} title={col.title} leads={colLeads} />
          );
        })}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeLead ? <LeadCard lead={activeLead} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
