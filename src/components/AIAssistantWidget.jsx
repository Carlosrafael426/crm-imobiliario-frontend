import React, { useState } from 'react';
import { Bot, X, Send, Network } from 'lucide-react';
import api from '../services/api';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Olá! Sou o ClearFlow Core. Como posso agilizar as coisas para você hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!command.trim()) return;

    const userMessage = { type: 'user', text: command };
    setMessages(prev => [...prev, userMessage]);
    setCommand('');
    setIsLoading(true);

    try {
      const response = await api.post('/ai/command', { command: userMessage.text });
      setMessages(prev => [...prev, { type: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { type: 'bot', text: 'Desculpe, ocorreu um erro de conexão com meu Core Engine.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#FF8C7A] hover:bg-opacity-90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#FF8C7A]/40 transition-transform hover:scale-105 active:scale-95"
        >
          <Network size={28} />
        </button>
      )}

      {/* Janela de Chat do AI Engine */}
      {isOpen && (
        <div className="bg-white w-80 rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all animate-fade-in origin-bottom-left">
          
          {/* Header */}
          <div className="bg-[#FF8C7A] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold text-sm">ClearFlow AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 min-h-[300px] max-h-[400px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex max-w-[85%] ${msg.type === 'user' ? 'self-end' : 'self-start'}`}>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-[#FF8C7A] text-white rounded-tr-none shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="self-start max-w-[85%]">
                 <div className="bg-white border border-gray-200 text-gray-500 rounded-2xl rounded-tl-none p-3 shadow-sm text-sm flex gap-1">
                    <span className="animate-bounce">.</span><span className="animate-bounce" style={{animationDelay: '0.2s'}}>.</span><span className="animate-bounce" style={{animationDelay: '0.4s'}}>.</span>
                 </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form className="border-t border-gray-100 p-3 bg-white" onSubmit={handleSend}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={command}
                onChange={e => setCommand(e.target.value)}
                placeholder="Ex: Cadastra o João do sobrado..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#FF8C7A] focus:ring-1 focus:ring-[#FF8C7A] transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !command.trim()}
                className="absolute right-2 p-1.5 bg-[#FF8C7A] text-white rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </form>

        </div>
      )}
    </div>
  );
}
