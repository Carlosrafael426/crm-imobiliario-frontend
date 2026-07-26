// Dados mockados do painel do corretor logado.
// Estrutura pensada para bater 1:1 com o formato esperado da API real
// (troca direta por `await api.get('/sellers/me/...')` quando o backend existir).

const now = Date.now();
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const hoursAgo = (h) => new Date(now - h * HOUR).toISOString();
const daysAgo = (d) => new Date(now - d * DAY).toISOString();
const hoursFromNow = (h) => new Date(now + h * HOUR).toISOString();

export const currentSeller = {
  id: 'seller-1',
  nome: 'Bruno Ferreira',
  cargo: 'Corretor de Imóveis',
};

// Deltas são a variação percentual frente ao mês anterior.
export const sellerMetrics = {
  leadsAtivos: { value: 18, deltaPercent: 12, trend: 'up' },
  visitasSemana: { value: 5, deltaPercent: -8, trend: 'down' },
  propostasAndamento: { value: 4, deltaPercent: 25, trend: 'up' },
  taxaConversao: { value: 24, deltaPercent: 3, trend: 'up' },
};

// status usa o mesmo vocabulário do funil geral (Novo, Contatado, Visita, Proposta, Fechado)
// para já nascer compatível com o restante do domínio de leads do app.
export const sellerLeads = [
  {
    id: 101,
    nome: 'Camila Dias',
    telefone: '(11) 98211-3344',
    imovelInteresse: 'Apartamento 2 quartos - Vila Mariana',
    valorEstimado: 340000,
    status: 'Novo',
    entrouNaEtapaEm: daysAgo(1),
    ultimoContato: daysAgo(1),
  },
  {
    id: 102,
    nome: 'Eduardo Lima',
    telefone: '(11) 99876-1122',
    imovelInteresse: 'Cobertura - Moema',
    valorEstimado: 890000,
    status: 'Novo',
    entrouNaEtapaEm: daysAgo(5),
    ultimoContato: daysAgo(5),
  },
  {
    id: 103,
    nome: 'Fernanda Rocha',
    telefone: '(11) 97654-3210',
    imovelInteresse: 'Casa 3 quartos - Alphaville',
    valorEstimado: 650000,
    status: 'Contatado',
    entrouNaEtapaEm: daysAgo(2),
    ultimoContato: hoursAgo(20),
  },
  {
    id: 104,
    nome: 'Diego Alves',
    telefone: '(11) 96543-2109',
    imovelInteresse: 'Sala Comercial - Centro',
    valorEstimado: 210000,
    status: 'Contatado',
    entrouNaEtapaEm: daysAgo(6),
    ultimoContato: daysAgo(6),
  },
  {
    id: 105,
    nome: 'Juliana Prado',
    telefone: '(11) 95432-1098',
    imovelInteresse: 'Apartamento 1 quarto - Pinheiros',
    valorEstimado: 410000,
    status: 'Visita',
    entrouNaEtapaEm: daysAgo(1),
    ultimoContato: hoursAgo(14),
  },
  {
    id: 106,
    nome: 'Marcos Vinícius',
    telefone: '(11) 94321-0987',
    imovelInteresse: 'Terreno - Cotia',
    valorEstimado: 180000,
    status: 'Visita',
    entrouNaEtapaEm: daysAgo(4),
    ultimoContato: daysAgo(4),
  },
  {
    id: 107,
    nome: 'Patrícia Nunes',
    telefone: '(11) 93210-9876',
    imovelInteresse: 'Apartamento 3 quartos - Brooklin',
    valorEstimado: 720000,
    status: 'Proposta',
    entrouNaEtapaEm: daysAgo(3),
    ultimoContato: hoursAgo(10),
  },
  {
    id: 108,
    nome: 'Rodrigo Faria',
    telefone: '(11) 92109-8765',
    imovelInteresse: 'Casa 4 quartos - Granja Viana',
    valorEstimado: 980000,
    status: 'Proposta',
    entrouNaEtapaEm: daysAgo(1),
    ultimoContato: hoursAgo(5),
  },
  {
    id: 109,
    nome: 'Aline Torres',
    telefone: '(11) 91098-7654',
    imovelInteresse: 'Apartamento 2 quartos - Tatuapé',
    valorEstimado: 350000,
    status: 'Fechado',
    entrouNaEtapaEm: daysAgo(10),
    ultimoContato: daysAgo(10),
  },
  {
    id: 110,
    nome: 'Vinícius Martins',
    telefone: '(11) 90987-6543',
    imovelInteresse: 'Studio - Vila Madalena',
    valorEstimado: 290000,
    status: 'Fechado',
    entrouNaEtapaEm: daysAgo(15),
    ultimoContato: daysAgo(15),
  },
];

export const upcomingVisits = [
  {
    id: 201,
    dataHora: hoursFromNow(5),
    endereco: 'Rua das Flores, 123 - Centro',
    clienteNome: 'Maria Oliveira',
    imovel: 'Apartamento 2 quartos',
    status: 'Confirmada',
  },
  {
    id: 202,
    dataHora: hoursFromNow(30),
    endereco: 'Av. Paulista, 900 - Bela Vista',
    clienteNome: 'Carlos Menezes',
    imovel: 'Sala Comercial',
    status: 'Pendente',
  },
  {
    id: 203,
    dataHora: hoursFromNow(50),
    endereco: 'Rua Harmonia, 45 - Vila Madalena',
    clienteNome: 'Juliana Prado',
    imovel: 'Apartamento 1 quarto',
    status: 'Confirmada',
  },
  {
    id: 204,
    dataHora: hoursFromNow(72),
    endereco: 'Alameda Santos, 780 - Jardins',
    clienteNome: 'Patrícia Nunes',
    imovel: 'Apartamento 3 quartos',
    status: 'Pendente',
  },
  {
    id: 205,
    dataHora: hoursFromNow(96),
    endereco: 'Rua Cotia, 210 - Cotia',
    clienteNome: 'Marcos Vinícius',
    imovel: 'Terreno',
    status: 'Confirmada',
  },
];

export const activityFeed = [
  { id: 301, type: 'novo_lead', message: 'Novo lead recebido: Camila Dias', timestamp: hoursAgo(2) },
  { id: 302, type: 'status_change', message: 'Rodrigo Faria passou para Proposta', timestamp: hoursAgo(5) },
  { id: 303, type: 'visita_agendada', message: 'Visita agendada com Maria Oliveira', timestamp: hoursAgo(9) },
  { id: 304, type: 'proposta', message: 'Proposta enviada para Patrícia Nunes', timestamp: daysAgo(1) },
  { id: 305, type: 'status_change', message: 'Fernanda Rocha passou para Em Contato', timestamp: daysAgo(2) },
  { id: 306, type: 'novo_lead', message: 'Novo lead recebido: Eduardo Lima', timestamp: daysAgo(5) },
];
