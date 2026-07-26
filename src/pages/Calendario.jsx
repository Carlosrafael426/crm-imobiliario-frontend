import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

// Estilos customizados para o DayPicker
const css = `
  .rdp {
    --rdp-color-accent-salmon: #FF8C7A;
    --rdp-accent-color: var(--rdp-color-accent-salmon);
    --rdp-background-color: #fff1ef;
    margin: 0;
  }
  .rdp-day_selected {
    background-color: var(--rdp-color-accent-salmon) !important;
    color: white !important;
  }
`;

const Calendario = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Mock de agendamentos para o MVP
  const [agendamentos] = useState([
    {
      id: 1,
      date: new Date(),
      leadName: 'João Silva',
      time: '14:30',
      imovel: 'Apartamento Centro',
      status: 'Confirmado'
    },
    {
      id: 2,
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      leadName: 'Maria Oliveira',
      time: '10:00',
      imovel: 'Casa Condominio Sul',
      status: 'Pendente'
    }
  ]);

  const selectedAgendamentos = agendamentos.filter(ag => isSameDay(ag.date, selectedDay));

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <style>{css}</style>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Calendário de Visitas</h1>
        <p className="text-gray-500 mt-2">Acompanhe seus agendamentos e compromissos</p>
      </div>

      <div className="flex gap-8 flex-col lg:flex-row flex-1">
        
        {/* Painel do Calendário */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 self-start w-full lg:w-auto flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            locale={ptBR}
            className="p-4"
            modifiers={{
              booked: agendamentos.map(a => a.date)
            }}
            modifiersStyles={{
              booked: { border: '2px solid #FF8C7A' }
            }}
          />
        </div>

        {/* Lista de Visitas do Dia Selecionado */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-between">
            Compromissos
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {format(selectedDay, "dd 'de' MMMM", { locale: ptBR })}
            </span>
          </h2>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
            {selectedAgendamentos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <span className="text-2xl mb-2">📅</span>
                <p>Nenhuma visita agendada para este dia.</p>
              </div>
            ) : (
              selectedAgendamentos.map(agend => (
                <div key={agend.id} className="group relative flex flex-col gap-2 p-5 bg-white border border-gray-100 rounded-xl hover:border-salmon/30 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-salmon/10 text-[--color-accent-salmon] rounded-full flex items-center justify-center font-bold text-lg">
                        {agend.time.split(':')[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{agend.leadName}</h3>
                        <p className="text-sm text-gray-500">{agend.imovel}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      agend.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {agend.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Calendario;
