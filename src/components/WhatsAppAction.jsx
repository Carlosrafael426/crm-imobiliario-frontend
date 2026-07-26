import React, { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function WhatsAppAction({ lead, label, className }) {
  const [loading, setLoading] = useState(false);

  const handleWhatsAppClick = async () => {
    if (!lead.telefone) return;
    
    try {
      setLoading(true);
      const res = await api.get(`/whatsapp/generate-link/${lead.id}`);
      if (res.data && res.data.link) {
        window.open(res.data.link, '_blank');
      }
    } catch (err) {
      console.error('Erro ao gerar link do WhatsApp', err);
      // Fallback
      window.open(`https://wa.me/${lead.telefone.replace(/\D/g, '')}`, '_blank');
    } finally {
      setLoading(false);
    }
  };

  if (!lead.telefone) return null;

  return (
    <button
      onClick={handleWhatsAppClick}
      disabled={loading}
      className={
        className ||
        'p-2 bg-mint-50/50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-sm shadow-emerald-500/5 group border border-emerald-100'
      }
      title={label || 'Enviar mensagem no WhatsApp'}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <MessageCircle size={16} className={label ? undefined : 'group-hover:-rotate-12 transition-transform duration-300'} />
      )}
      {label && <span>{label}</span>}
    </button>
  );
}
