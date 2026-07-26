import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import KanbanBoard from '../components/KanbanBoard';
import Toast from '../components/Toast';
import { PlusCircle, Search, Inbox, RefreshCw, CheckCircle2 } from 'lucide-react';
import LeadCard from '../components/LeadCard'; // Reuse or create a mini version later
import LeadDetailsModal from '../components/LeadDetailsModal';
import NewLeadModal from '../components/NewLeadModal';
import { useStore } from '../store/useStore';

export default function Dashboard() {
  const leads = useStore(state => state.leads);
  const setLeads = useStore(state => state.setLeads);
  const selectedLead = useStore(state => state.selectedLead);
  const setSelectedLead = useStore(state => state.setSelectedLead);
  
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const lastLeadCount = useRef(0);

  const fetchLeads = async (silent = false) => {
    if (!silent) setIsSyncing(true);
    try {
      const response = await api.get('/leads');
      const data = response.data;

      if (silent && data.length > lastLeadCount.current && lastLeadCount.current > 0) {
        const newArrivals = data.length - lastLeadCount.current;
        setToastMessage(`${newArrivals} novo(s) lead(s) capturado(s) via WhatsApp!`);
      }

      setLeads(data);
      lastLeadCount.current = data.length;
    } catch (error) {
      console.error('Erro ao buscar leads', error);
      if (!silent) setToastMessage('Erro ao sincronizar leads. Verifique sua conexão.');
    } finally {
      if (!silent) setIsSyncing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // Simple polling every 15s to simulate real-time webhook ingestion
    const interval = setInterval(() => fetchLeads(true), 15000);
    return () => clearInterval(interval);
  }, []);

  const updateLeadStatus = async (leadId, newStatus) => {
    const previousLeads = leads;
    setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
    try {
      await api.put(`/leads/${leadId}`, { status: newStatus });
    } catch (error) {
      console.error('Erro ao atualizar status', error);
      setLeads(previousLeads);
      setToastMessage('Não foi possível atualizar o status do lead. Tente novamente.');
    }
  };

  const approveLead = (leadId) => {
    updateLeadStatus(leadId, 'Novo');
  };

  if (loading) return <div className="text-gray-500 p-8 flex items-center justify-center h-full">Carregando CRM...</div>;

  const term = searchTerm.trim().toLowerCase();
  const filteredLeads = term
    ? leads.filter(lead =>
        lead.nome?.toLowerCase().includes(term) ||
        lead.telefone?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term)
      )
    : leads;

  const kanbanLeads = filteredLeads.filter(l => l.status !== 'Aguardando Revisão');
  const inboxLeads = filteredLeads.filter(l => l.status === 'Aguardando Revisão');

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="flex flex-wrap gap-4 justify-between items-end mb-10 w-full border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">CRM workspace</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">Gestão ultra-clean de oportunidades e automações.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input
               type="text"
               placeholder="Buscar leads..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 w-64 text-gray-700 transition-all shadow-sm"
             />
          </div>
          <button
             onClick={() => fetchLeads()}
             className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm"
             title="Sincronizar dados"
          >
            <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
            Sync
          </button>
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm shadow-blue-600/20"
          >
            <PlusCircle size={18} />
            Novo Lead
          </button>
        </div>
      </header>

      <main className="flex-1 w-full flex gap-8 overflow-hidden h-[calc(100vh-200px)]">
        
        {/* Inbox de Automação */}
        <aside className="w-80 flex flex-col bg-gray-50/50 rounded-3xl border border-gray-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] p-5 shrink-0 overflow-y-auto scrollbar-hidden">
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <Inbox size={18} className="text-blue-500" />
              Inbox de Automação
            </h2>
            <span className="bg-white text-blue-600 text-[10px] uppercase font-bold px-2 py-1 rounded-lg border border-blue-100 shadow-sm">
              {inboxLeads.length} novos
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {inboxLeads.map(lead => (
              <div key={lead.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">{lead.nome}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{lead.telefone}</p>
                </div>
                {lead.imovelDeInteresse && (
                  <p className="text-xs text-gray-600 bg-blue-50/50 p-2 rounded-lg mb-3 line-clamp-3">
                    {lead.imovelDeInteresse}
                  </p>
                )}
                <button 
                  onClick={() => approveLead(lead.id)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-xl text-xs font-semibold transition-colors border border-blue-100"
                >
                  <CheckCircle2 size={14} />
                  Aprovar Lead
                </button>
              </div>
            ))}
            {inboxLeads.length === 0 && (
              <div className="text-center p-6 text-gray-400">
                <CheckCircle2 size={32} className="mx-auto mb-3 text-gray-300 opacity-50" />
                <p className="text-xs font-medium">Nenhum evento detectado pelo Webhook.</p>
              </div>
            )}
          </div>
        </aside>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <KanbanBoard leads={kanbanLeads} onStatusChange={updateLeadStatus} />
        </div>
      </main>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
      {isNewLeadModalOpen && (
        <NewLeadModal
          onClose={() => setIsNewLeadModalOpen(false)}
          onCreated={() => {
            setIsNewLeadModalOpen(false);
            fetchLeads();
          }}
        />
      )}
    </div>
  );
}
