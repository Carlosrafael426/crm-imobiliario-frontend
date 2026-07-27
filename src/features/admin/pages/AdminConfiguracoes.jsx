import React, { useState } from 'react';
import { Image, ArrowUp, ArrowDown, Bell, Save, Building } from 'lucide-react';
import Toast from '../../../components/Toast';
import { agencySettings, funnelStagesConfig } from '../../../mocks/mockAdminData';

export default function AdminConfiguracoes() {
  const [agencyForm, setAgencyForm] = useState(agencySettings);
  const [stages, setStages] = useState(funnelStagesConfig);
  const [alertaAtivo, setAlertaAtivo] = useState(true);
  const [alertaDias, setAlertaDias] = useState(agencySettings.alertaLeadParadoDias);
  const [toast, setToast] = useState(null);

  const handleAgencyChange = (field) => (e) => {
    setAgencyForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleStageLabelChange = (id, value) => {
    setStages((prev) => prev.map((stage) => (stage.id === id ? { ...stage, label: value } : stage)));
  };

  const moveStage = (index, direction) => {
    setStages((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setToast({ title: 'Configurações salvas', message: 'As alterações foram salvas com sucesso.' });
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-3xl">
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Building size={18} className="text-primary" /> Dados Gerais
        </h2>
        <p className="text-sm text-gray-500 mb-5">Informações da imobiliária exibidas no sistema.</p>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
            <Image size={24} />
          </div>
          <button
            type="button"
            disabled
            title="Upload de logo em breve"
            className="text-sm font-medium text-gray-400 border border-gray-200 rounded-xl px-4 py-2 cursor-not-allowed"
          >
            Enviar logo (em breve)
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nome da imobiliária</label>
            <input
              type="text"
              value={agencyForm.nome}
              onChange={handleAgencyChange('nome')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">E-mail de contato</label>
            <input
              type="email"
              value={agencyForm.contatoEmail}
              onChange={handleAgencyChange('contatoEmail')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Telefone de contato</label>
            <input
              type="text"
              value={agencyForm.contatoTelefone}
              onChange={handleAgencyChange('contatoTelefone')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Etapas do Funil de Vendas</h2>
        <p className="text-sm text-gray-500 mb-5">Renomeie ou reordene as colunas do Kanban para o processo da sua equipe.</p>

        <div className="flex flex-col gap-2.5">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-2.5 pl-4">
              <span className="text-xs font-semibold text-gray-400 w-6 shrink-0">{index + 1}º</span>
              <input
                type="text"
                value={stage.label}
                onChange={(e) => handleStageLabelChange(stage.id, e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveStage(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Mover para cima"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => moveStage(index, 1)}
                  disabled={index === stages.length - 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Mover para baixo"
                >
                  <ArrowDown size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Bell size={18} className="text-primary" /> Preferências de Notificação
        </h2>
        <p className="text-sm text-gray-500 mb-5">Controle quando o admin deve ser alertado.</p>

        <label className="flex items-center gap-3 cursor-pointer select-none mb-4">
          <input
            type="checkbox"
            checked={alertaAtivo}
            onChange={(e) => setAlertaAtivo(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-action focus:ring-blue-100"
          />
          <span className="text-sm text-gray-700">Alertar quando um lead ficar parado sem interação</span>
        </label>

        <div className={`flex items-center gap-2 ${!alertaAtivo ? 'opacity-40 pointer-events-none' : ''}`}>
          <span className="text-sm text-gray-500">Após</span>
          <input
            type="number"
            min={1}
            value={alertaDias}
            onChange={(e) => setAlertaDias(Number(e.target.value))}
            className="w-20 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          />
          <span className="text-sm text-gray-500">dias sem contato.</span>
        </div>
      </section>

      <div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors text-sm shadow-sm shadow-blue-600/20"
        >
          <Save size={16} />
          Salvar Alterações
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <Toast title={toast.title} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}
    </form>
  );
}
