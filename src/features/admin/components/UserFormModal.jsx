import React, { useState } from 'react';
import Modal from '../../../components/Modal';

export default function UserFormModal({ initialUser, onClose, onSave }) {
  const isEditing = Boolean(initialUser);

  const [form, setForm] = useState({
    nome: initialUser?.nome || '',
    usuario: initialUser?.usuario || '',
    email: initialUser?.email || '',
    password: '',
    role: initialUser?.role || 'corretor',
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.nome.trim()) next.nome = 'Informe o nome.';
    if (!form.usuario.trim()) next.usuario = 'Informe o usuário.';
    if (!form.email.trim()) next.email = 'Informe o e-mail.';
    if (!isEditing && form.password.length < 6) next.password = 'A senha temporária deve ter no mínimo 6 caracteres.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    // Simula chamada de API; troque pelo POST/PUT real quando o backend existir.
    setTimeout(() => {
      onSave({
        id: initialUser?.id ?? `user-${Date.now()}`,
        nome: form.nome,
        usuario: form.usuario,
        email: form.email,
        role: form.role,
        cargo: form.role === 'admin' ? 'Administrador' : 'Corretor de Imóveis',
        status: initialUser?.status ?? 'ativo',
        dataCadastro: initialUser?.dataCadastro ?? new Date().toISOString(),
        leadsAtribuidos: initialUser?.leadsAtribuidos ?? 0,
      });
      setIsSaving(false);
    }, 500);
  };

  return (
    <Modal title={isEditing ? 'Editar Usuário' : 'Adicionar Usuário'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nome *</label>
          <input
            type="text"
            value={form.nome}
            onChange={handleChange('nome')}
            className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
              errors.nome ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
            }`}
            autoFocus
          />
          {errors.nome && <p className="text-xs text-red-500 mt-1.5">{errors.nome}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Usuário *</label>
          <input
            type="text"
            value={form.usuario}
            onChange={handleChange('usuario')}
            disabled={isEditing}
            className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 disabled:opacity-60 ${
              errors.usuario ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
            }`}
          />
          {errors.usuario && <p className="text-xs text-red-500 mt-1.5">{errors.usuario}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">E-mail *</label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
        </div>

        {!isEditing && (
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Senha temporária *</label>
            <input
              type="text"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="Mínimo 6 caracteres"
              className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
              }`}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Cargo</label>
          <select
            value={form.role}
            onChange={handleChange('role')}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          >
            <option value="corretor">Corretor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-action hover:bg-action/90 text-white shadow-sm shadow-action/20 disabled:opacity-60 transition-colors"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
