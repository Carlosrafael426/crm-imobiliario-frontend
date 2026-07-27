import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, UserPlus, Pencil, Power, Trash2 } from 'lucide-react';
import Badge from '../../../components/Badge';
import Toast from '../../../components/Toast';
import UserFormModal from '../components/UserFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { mockAdminUsers } from '../../../mocks/mockAdminData';

function TableSkeleton() {
  return (
    <div className="space-y-3 animate-pulse p-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-50 rounded-lg" />
      ))}
    </div>
  );
}

export default function AdminUsuarios() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [cargoFilter, setCargoFilter] = useState('todos');

  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // { type: 'deactivate' | 'delete', user }
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockAdminUsers);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesStatus = statusFilter === 'todos' || user.status === statusFilter;
    const matchesCargo = cargoFilter === 'todos' || user.role === cargoFilter;
    return matchesSearch && matchesStatus && matchesCargo;
  });

  const openCreateModal = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSaveUser = (userData) => {
    setUsers((prev) => {
      const exists = prev.some((user) => user.id === userData.id);
      return exists ? prev.map((user) => (user.id === userData.id ? userData : user)) : [userData, ...prev];
    });
    setIsFormOpen(false);
    setToast({ title: editingUser ? 'Usuário atualizado' : 'Usuário adicionado', message: `${userData.nome} foi salvo com sucesso.` });
  };

  const handleToggleStatus = (user) => {
    if (user.status === 'ativo') {
      // Desativar é uma ação com consequência real: pedir confirmação.
      setPendingAction({ type: 'deactivate', user });
    } else {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: 'ativo' } : u)));
      setToast({ title: 'Usuário reativado', message: `${user.nome} está ativo novamente.` });
    }
  };

  const handleDelete = (user) => {
    setPendingAction({ type: 'delete', user });
  };

  const confirmPendingAction = () => {
    if (!pendingAction) return;
    const { type, user } = pendingAction;

    setIsActionLoading(true);
    setTimeout(() => {
      if (type === 'deactivate') {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: 'inativo' } : u)));
        setToast({ title: 'Usuário desativado', message: `${user.nome} foi desativado.` });
      } else if (type === 'delete') {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        setToast({ title: 'Usuário excluído', message: `${user.nome} foi removido do sistema.` });
      }
      setIsActionLoading(false);
      setPendingAction(null);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <select
            value={cargoFilter}
            onChange={(e) => setCargoFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          >
            <option value="todos">Todos os cargos</option>
            <option value="admin">Admin</option>
            <option value="corretor">Corretor</option>
          </select>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm shadow-blue-600/20 shrink-0"
        >
          <UserPlus size={18} />
          Adicionar Usuário
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide bg-gray-50/70">
                  <th className="px-6 py-3 font-semibold">Nome</th>
                  <th className="px-6 py-3 font-semibold">Usuário / E-mail</th>
                  <th className="px-6 py-3 font-semibold">Cargo</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Cadastro</th>
                  <th className="px-6 py-3 font-semibold text-center">Leads</th>
                  <th className="px-6 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-gray-50 hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{user.nome}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div>{user.usuario}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.cargo}</td>
                    <td className="px-6 py-4">
                      <Badge variant={user.status === 'ativo' ? 'success' : 'neutral'}>
                        {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {format(new Date(user.dataCadastro), 'dd/MM/yyyy', { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">{user.leadsAtribuidos}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(user)}
                          title="Editar"
                          className="p-2 rounded-lg text-gray-400 hover:text-action hover:bg-action/10 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user)}
                          title={user.status === 'ativo' ? 'Desativar' : 'Ativar'}
                          className="p-2 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                        >
                          <Power size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          title="Excluir"
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isFormOpen && (
        <UserFormModal initialUser={editingUser} onClose={() => setIsFormOpen(false)} onSave={handleSaveUser} />
      )}

      {pendingAction && (
        <ConfirmDialog
          title={pendingAction.type === 'delete' ? 'Excluir usuário' : 'Desativar usuário'}
          message={
            pendingAction.type === 'delete'
              ? `Tem certeza que deseja excluir "${pendingAction.user.nome}"? Essa ação não pode ser desfeita e os leads deste corretor precisarão ser reatribuídos.`
              : `Ao desativar "${pendingAction.user.nome}", ele perde o acesso ao sistema e os leads atribuídos a ele precisarão ser reatribuídos para outro corretor.`
          }
          confirmLabel={pendingAction.type === 'delete' ? 'Excluir' : 'Desativar'}
          danger={pendingAction.type === 'delete'}
          isLoading={isActionLoading}
          onConfirm={confirmPendingAction}
          onCancel={() => setPendingAction(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <Toast title={toast.title} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}
