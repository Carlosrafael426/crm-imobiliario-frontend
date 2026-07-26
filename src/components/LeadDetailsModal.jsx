import React from 'react';
import { X, Phone, Mail, FileText, Bot, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import WhatsAppAction from './WhatsAppAction';

const LeadDetailsModal = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-salmon/10 text-[#FF8C7A] flex items-center justify-center font-bold text-xl">
              {lead.nome.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{lead.nome}</h2>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium mt-1 inline-block">
                {lead.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-3 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
              <span>{lead.telefone}</span>
            </div>
            {lead.email && (
              <div className="flex gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="truncate">{lead.email}</span>
              </div>
            )}
            <div className="flex gap-3 text-sm text-gray-600 col-span-2">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <span>Atualizado em {format(new Date(lead.updatedAt || new Date()), "dd 'de' MMM, HH:mm", { locale: ptBR })}</span>
            </div>
            {lead.imovelDeInteresse && (
              <div className="flex gap-3 text-sm text-gray-600 col-span-2 bg-gray-50 p-3 rounded-lg">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <span>{lead.imovelDeInteresse}</span>
              </div>
            )}
          </div>

          {/* AI Suggestion */}
          {lead.sugestaoResposta && (
            <div className="bg-gradient-to-r from-[#FF8C7A] to-red-400 rounded-xl p-0.5">
              <div className="bg-white rounded-[10px] p-4 h-full relative">
                <div className="flex items-center gap-2 mb-3 text-[#FF8C7A]">
                  <Bot size={18} />
                  <h3 className="font-semibold text-sm">Sugestão de Resposta da IA</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {lead.sugestaoResposta}
                </p>
                <div className="mt-4 flex justify-end">
                  <button 
                    className="text-xs text-[#FF8C7A] hover:underline font-medium"
                    onClick={() => navigator.clipboard.writeText(lead.sugestaoResposta)}
                  >
                    Copiar Sugestão
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
          <WhatsAppAction lead={lead} label="Abrir no WhatsApp" className="w-full justify-center bg-green-50 text-green-600 hover:bg-green-100 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
