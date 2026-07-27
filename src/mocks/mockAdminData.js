// Dados mockados da área administrativa (visão da imobiliária inteira,
// não de um corretor específico). Mesma lógica de src/mocks/mockSellerData.js:
// estrutura pensada para virar `await api.get(...)` direto quando o backend existir.

const now = Date.now();
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const hoursAgo = (h) => new Date(now - h * HOUR).toISOString();
const daysAgo = (d) => new Date(now - d * DAY).toISOString();

export const globalMetrics = {
  leadsAtivos: { value: 142, deltaPercent: 8, trend: 'up' },
  totalImoveis: { value: 86, deltaPercent: 4, trend: 'up' },
  propostasAndamento: { value: 23, deltaPercent: 15, trend: 'up' },
  taxaConversaoGeral: { value: 19, deltaPercent: -2, trend: 'down' },
  faturamentoEstimado: { value: 1850000, deltaPercent: 22, trend: 'up' },
};

export const leadsSalesSeries = [
  { mes: 'Fev', leads: 68, vendas: 9 },
  { mes: 'Mar', leads: 74, vendas: 11 },
  { mes: 'Abr', leads: 81, vendas: 10 },
  { mes: 'Mai', leads: 95, vendas: 14 },
  { mes: 'Jun', leads: 112, vendas: 16 },
  { mes: 'Jul', leads: 142, vendas: 21 },
];

// Ordenado por propostas fechadas (desc) para o ranking/pódio.
export const corretoresRanking = [
  { id: 'seller-2', nome: 'Fernanda Lopes', leadsAtribuidos: 22, propostasFechadas: 9, taxaConversao: 41 },
  { id: 'seller-1', nome: 'Bruno Ferreira', leadsAtribuidos: 18, propostasFechadas: 7, taxaConversao: 39 },
  { id: 'seller-5', nome: 'Rodrigo Faria', leadsAtribuidos: 12, propostasFechadas: 5, taxaConversao: 42 },
  { id: 'seller-4', nome: 'Juliana Prado', leadsAtribuidos: 20, propostasFechadas: 6, taxaConversao: 30 },
  { id: 'seller-3', nome: 'Marcos Andrade', leadsAtribuidos: 15, propostasFechadas: 4, taxaConversao: 27 },
];

export const mockAdminUsers = [
  {
    id: 'user-admin-1',
    nome: 'Ana Beatriz Costa',
    usuario: 'admin',
    email: 'ana.costa@crmelite.com.br',
    cargo: 'Administradora',
    role: 'admin',
    status: 'ativo',
    dataCadastro: daysAgo(400),
    leadsAtribuidos: 0,
  },
  {
    id: 'seller-1',
    nome: 'Bruno Ferreira',
    usuario: 'bruno',
    email: 'bruno.ferreira@crmelite.com.br',
    cargo: 'Corretor de Imóveis',
    role: 'corretor',
    status: 'ativo',
    dataCadastro: daysAgo(320),
    leadsAtribuidos: 18,
  },
  {
    id: 'seller-2',
    nome: 'Fernanda Lopes',
    usuario: 'fernanda',
    email: 'fernanda.lopes@crmelite.com.br',
    cargo: 'Corretora de Imóveis',
    role: 'corretor',
    status: 'ativo',
    dataCadastro: daysAgo(280),
    leadsAtribuidos: 22,
  },
  {
    id: 'seller-3',
    nome: 'Marcos Andrade',
    usuario: 'marcosa',
    email: 'marcos.andrade@crmelite.com.br',
    cargo: 'Corretor de Imóveis',
    role: 'corretor',
    status: 'inativo',
    dataCadastro: daysAgo(500),
    leadsAtribuidos: 15,
  },
  {
    id: 'seller-4',
    nome: 'Juliana Prado',
    usuario: 'juliana',
    email: 'juliana.prado@crmelite.com.br',
    cargo: 'Corretora de Imóveis',
    role: 'corretor',
    status: 'ativo',
    dataCadastro: daysAgo(150),
    leadsAtribuidos: 20,
  },
  {
    id: 'seller-5',
    nome: 'Rodrigo Faria',
    usuario: 'rodrigof',
    email: 'rodrigo.faria@crmelite.com.br',
    cargo: 'Corretor de Imóveis',
    role: 'corretor',
    status: 'ativo',
    dataCadastro: daysAgo(90),
    leadsAtribuidos: 12,
  },
];

export const mockImoveis = [
  { id: 1, titulo: 'Apartamento 2 quartos - Vila Mariana', tipo: 'Apartamento', corretor: 'Bruno Ferreira', valor: 340000, status: 'Ativo', diasSemInteracao: 2, dataCadastro: daysAgo(20) },
  { id: 2, titulo: 'Cobertura - Moema', tipo: 'Cobertura', corretor: 'Bruno Ferreira', valor: 890000, status: 'Ativo', diasSemInteracao: 18, dataCadastro: daysAgo(60) },
  { id: 3, titulo: 'Casa 3 quartos - Alphaville', tipo: 'Casa', corretor: 'Fernanda Lopes', valor: 650000, status: 'Ativo', diasSemInteracao: 5, dataCadastro: daysAgo(35) },
  { id: 4, titulo: 'Sala Comercial - Centro', tipo: 'Comercial', corretor: 'Marcos Andrade', valor: 210000, status: 'Parado', diasSemInteracao: 24, dataCadastro: daysAgo(90) },
  { id: 5, titulo: 'Apartamento 1 quarto - Pinheiros', tipo: 'Apartamento', corretor: 'Juliana Prado', valor: 410000, status: 'Ativo', diasSemInteracao: 1, dataCadastro: daysAgo(12) },
  { id: 6, titulo: 'Terreno - Cotia', tipo: 'Terreno', corretor: 'Rodrigo Faria', valor: 180000, status: 'Parado', diasSemInteracao: 31, dataCadastro: daysAgo(120) },
  { id: 7, titulo: 'Apartamento 3 quartos - Brooklin', tipo: 'Apartamento', corretor: 'Fernanda Lopes', valor: 720000, status: 'Vendido', diasSemInteracao: 0, dataCadastro: daysAgo(75) },
  { id: 8, titulo: 'Casa 4 quartos - Granja Viana', tipo: 'Casa', corretor: 'Bruno Ferreira', valor: 980000, status: 'Vendido', diasSemInteracao: 0, dataCadastro: daysAgo(100) },
  { id: 9, titulo: 'Apartamento 2 quartos - Tatuapé', tipo: 'Apartamento', corretor: 'Rodrigo Faria', valor: 350000, status: 'Alugado', diasSemInteracao: 0, dataCadastro: daysAgo(200) },
  { id: 10, titulo: 'Studio - Vila Madalena', tipo: 'Studio', corretor: 'Juliana Prado', valor: 290000, status: 'Ativo', diasSemInteracao: 9, dataCadastro: daysAgo(40) },
  { id: 11, titulo: 'Galpão - Barueri', tipo: 'Comercial', corretor: 'Marcos Andrade', valor: 1200000, status: 'Parado', diasSemInteracao: 45, dataCadastro: daysAgo(210) },
  { id: 12, titulo: 'Apartamento Garden - Perdizes', tipo: 'Apartamento', corretor: 'Fernanda Lopes', valor: 610000, status: 'Ativo', diasSemInteracao: 3, dataCadastro: daysAgo(8) },
];

export const activityLog = [
  { id: 1, usuario: 'Bruno Ferreira', tipo: 'status_change', descricao: 'moveu o lead Rodrigo Faria para Proposta', timestamp: hoursAgo(3) },
  { id: 2, usuario: 'Sistema', tipo: 'novo_lead', descricao: 'novo lead recebido via WhatsApp: Camila Dias', timestamp: hoursAgo(5) },
  { id: 3, usuario: 'Ana Beatriz Costa', tipo: 'usuario', descricao: 'criou o usuário Juliana Prado', timestamp: daysAgo(3) },
  { id: 4, usuario: 'Fernanda Lopes', tipo: 'proposta_fechada', descricao: 'fechou proposta com Patrícia Nunes (R$ 720.000)', timestamp: daysAgo(1) },
  { id: 5, usuario: 'Ana Beatriz Costa', tipo: 'usuario', descricao: 'desativou o usuário Marcos Andrade', timestamp: daysAgo(6) },
  { id: 6, usuario: 'Rodrigo Faria', tipo: 'status_change', descricao: 'moveu o lead Marcos Vinícius para Visita Agendada', timestamp: daysAgo(2) },
  { id: 7, usuario: 'Sistema', tipo: 'novo_lead', descricao: 'novo lead recebido via WhatsApp: Eduardo Lima', timestamp: daysAgo(5) },
  { id: 8, usuario: 'Juliana Prado', tipo: 'proposta_fechada', descricao: 'fechou proposta com Aline Torres (R$ 350.000)', timestamp: daysAgo(10) },
  { id: 9, usuario: 'Ana Beatriz Costa', tipo: 'usuario', descricao: 'editou os dados do usuário Rodrigo Faria', timestamp: daysAgo(12) },
  { id: 10, usuario: 'Bruno Ferreira', tipo: 'status_change', descricao: 'moveu o lead Camila Dias para Em Contato', timestamp: daysAgo(1) },
];

export const funnelStagesConfig = [
  { id: 'Novo', label: 'Novo Lead' },
  { id: 'Contatado', label: 'Em Contato' },
  { id: 'Visita', label: 'Visita Agendada' },
  { id: 'Proposta', label: 'Proposta' },
  { id: 'Fechado', label: 'Fechado' },
];

// Métricas que não dá pra derivar diretamente de mockImoveis (ex: exigiriam
// uma data de venda por imóvel, que ainda não modelamos).
export const imoveisStats = {
  tempoMedioVendaDias: 38,
};

export const agencySettings = {
  nome: 'CRM.Elite Imóveis',
  contatoEmail: 'contato@crmelite.com.br',
  contatoTelefone: '(11) 4000-0000',
  alertaLeadParadoDias: 3,
};
