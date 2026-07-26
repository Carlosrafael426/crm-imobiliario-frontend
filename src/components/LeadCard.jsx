import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Phone, Calendar, Mail, FileText } from 'lucide-react';
import WhatsAppAction from './WhatsAppAction';
import { useStore } from '../store/useStore';

export default function LeadCard({ lead, isOverlay }) {
  const setSelectedLead = useStore(state => state.setSelectedLead);
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: lead,
    disabled: isOverlay
  });

  const style = transform && !isOverlay ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 50,
  } : undefined;

  // Feedback for older leads
  const lastContact = new Date(lead.ultimoContato);
  const daysInactive = Math.floor((new Date() - lastContact) / (1000 * 60 * 60 * 24));
  const needsAttention = daysInactive > 3 && lead.status !== 'Fechado' && lead.status !== 'Aguardando Revisão';

  return (
    <div
      ref={!isOverlay ? setNodeRef : null}
      style={style}
      {...(!isOverlay ? listeners : {})}
      {...(!isOverlay ? attributes : {})}
      onClick={() => !isDragging && setSelectedLead(lead)}
      className={`bg-white p-5 rounded-2xl relative group border border-gray-100 shadow-sm
        ${isOverlay ? 'cursor-grabbing shadow-2xl ring-2 ring-[--color-accent-salmon] scale-105 rotate-2' : 'cursor-grab'}
        ${isDragging && !isOverlay ? 'opacity-30' : 'hover:bg-gray-50 transition-all duration-200'}
        ${needsAttention && !isDragging && !isOverlay ? 'ring-1 ring-red-100' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">{lead.nome}</h4>
          {lead.source === 'WhatsApp Auto' && (
            <span className="inline-block mt-1 bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
              Via Auto-WhatsApp
            </span>
          )}
        </div>
        {needsAttention && (
          <span className="flex h-2.5 w-2.5 relative mt-1" title={`Sem contato há ${daysInactive} dias`}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400"></span>
          </span>
        )}
      </div>
      
      {lead.imovelDeInteresse && (
        <p className="text-xs text-gray-500 mb-2 flex items-start gap-2 font-medium bg-gray-50 p-2 rounded-lg leading-relaxed">
          <FileText size={13} className="text-gray-400 shrink-0 mt-0.5" /> 
          <span className="line-clamp-2">{lead.imovelDeInteresse}</span>
        </p>
      )}

      {lead.email && (
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
          <Mail size={13} className="text-gray-300" />
          <span className="truncate">{lead.email}</span>
        </p>
      )}

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-gray-500 font-medium">
          <Phone size={13} className="text-gray-400" />
          <span className="text-xs tracking-wide">{lead.telefone || 'Sem telefone'}</span>
        </div>
        
        <div onPointerDown={(e) => e.stopPropagation()}>
           <WhatsAppAction lead={lead} />
        </div>
      </div>
    </div>
  );
}
