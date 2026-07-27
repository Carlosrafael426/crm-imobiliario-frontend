// Diretório mock de contas para login sem backend.
// Login.jsx tenta a API real primeiro; se ela não existir (ainda não existe),
// cai para esse diretório local só para permitir testar o fluxo de auth/roles.
export const mockUsers = [
  {
    id: 'user-admin-1',
    usuario: 'admin',
    password: '123456',
    nome: 'Ana Beatriz Costa',
    cargo: 'Administradora',
    role: 'admin',
  },
  {
    id: 'seller-1',
    usuario: 'bruno',
    password: '123456',
    nome: 'Bruno Ferreira',
    cargo: 'Corretor de Imóveis',
    role: 'corretor',
  },
];
