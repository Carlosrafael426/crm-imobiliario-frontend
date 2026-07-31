import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  PlayCircle,
  Sparkles,
  MessageSquareX,
  TrendingDown,
  Repeat,
  BotMessageSquare,
  Layers,
  Target,
  ChevronDown,
  Users,
  Kanban,
  CalendarCheck,
  Building2,
  Handshake,
  BarChart3,
  ClipboardList,
  Trophy,
  Quote,
  Star,
  Check,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NAV_LINKS = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

const PAIN_POINTS = [
  {
    icon: MessageSquareX,
    title: 'Leads perdidos no WhatsApp',
    description:
      'Conversas importantes se perdem no meio de centenas de mensagens e ninguém sabe quem já foi atendido.',
  },
  {
    icon: TrendingDown,
    title: 'Sem visão do funil de vendas',
    description:
      'Sem um pipeline claro, fica impossível saber quantos leads estão prontos para fechar ou parados há semanas.',
  },
  {
    icon: Repeat,
    title: 'Retrabalho manual',
    description:
      'Planilhas desatualizadas e informações duplicadas tomam tempo que deveria ser investido em vender.',
  },
];

const OVERVIEW_PILLARS = [
  {
    icon: Layers,
    title: 'Organiza',
    description: 'Centraliza leads, conversas e imóveis de interesse em um só painel — sem planilha e sem WhatsApp perdido.',
  },
  {
    icon: BotMessageSquare,
    title: 'Atende',
    description: 'Uma IA cuida do primeiro contato no WhatsApp 24/7, qualifica o lead e já registra tudo no CRM.',
  },
  {
    icon: Target,
    title: 'Converte',
    description: 'Um funil visual leva cada lead do primeiro contato até o fechamento, sem se perder pelo caminho.',
  },
];

const FEATURES = [
  {
    icon: BotMessageSquare,
    title: 'Atendimento por IA no WhatsApp',
    description: 'Uma IA integrada ao WhatsApp atende e qualifica seus leads 24 horas por dia, 7 dias por semana, e já registra tudo automaticamente no CRM.',
  },
  { icon: Users, title: 'Gestão de Leads', description: 'Centralize todos os contatos em um só lugar, com histórico completo de interações.' },
  { icon: Kanban, title: 'Funil de Vendas (Kanban)', description: 'Visualize cada oportunidade por etapa e arraste os leads conforme avançam na negociação.' },
  { icon: CalendarCheck, title: 'Agenda de Visitas', description: 'Organize visitas e reuniões com lembretes automáticos para você e para o cliente.' },
  { icon: Handshake, title: 'Propostas e Negociações', description: 'Acompanhe propostas em andamento e o status de cada negociação em tempo real.' },
  { icon: BarChart3, title: 'Relatórios e Métricas', description: 'Entenda a performance da sua equipe com indicadores claros de conversão.' },
];

const STEPS = [
  { number: '01', icon: ClipboardList, title: 'Cadastre seus leads', description: 'Importe ou adicione manualmente sua base de contatos em minutos.' },
  { number: '02', icon: Kanban, title: 'Acompanhe o funil de vendas', description: 'Veja cada lead avançar pelas etapas, do primeiro contato até a proposta.' },
  { number: '03', icon: Trophy, title: 'Feche negócios mais rápido', description: 'Priorize quem está pronto para comprar e reduza o tempo médio de fechamento.' },
];

const TESTIMONIALS = [
  {
    quote: 'Depois do CRM.Elite paramos de perder lead no WhatsApp. Nossa conversão subiu quase 30% em três meses.',
    name: 'Marina Alves',
    role: 'Diretora Comercial',
    company: 'Alves Imóveis',
  },
  {
    quote: 'A visão do funil de vendas mudou completamente como gerenciamos a equipe. Hoje sabemos exatamente onde cada negociação está.',
    name: 'Rodrigo Teixeira',
    role: 'Sócio-fundador',
    company: 'Teixeira Realty',
  },
  {
    quote: 'Implementação rápida e simples. Em uma semana toda a equipe já estava usando o sistema no dia a dia.',
    name: 'Camila Duarte',
    role: 'Gerente de Vendas',
    company: 'Duarte & Associados',
  },
];

const PLANS = [
  {
    name: 'Starter',
    description: 'Para imobiliárias pequenas dando os primeiros passos na gestão de leads.',
    features: [
      'Até 3 corretores',
      'Gestão de leads e funil Kanban',
      'Atendimento por IA no WhatsApp 24/7',
      'Agenda de visitas',
      'Suporte por e-mail',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'Para equipes em crescimento que precisam de mais controle e automação.',
    features: [
      'Até 15 corretores',
      'Tudo do plano Starter',
      'IA no WhatsApp com respostas personalizadas',
      'Relatórios e métricas avançadas',
      'Suporte prioritário',
    ],
    highlighted: true,
    badge: 'Mais Popular',
  },
  {
    name: 'Enterprise',
    description: 'Para imobiliárias grandes com necessidades personalizadas.',
    features: [
      'Corretores ilimitados',
      'Tudo do plano Professional',
      'Integrações personalizadas',
      'Gerente de conta dedicado',
      'SLA de suporte garantido',
    ],
    highlighted: false,
  },
];

const CORRETORES_OPTIONS = ['1 a 5', '6 a 15', '16 a 30', '31 a 50', 'Mais de 50'];

// Scroll-reveal: IntersectionObserver toggles a class once, no external animation lib.
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SocialIconButton({ label, href = '#', className = '', children }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      {children}
    </a>
  );
}

function StarRating() {
  return (
    <div className="flex gap-0.5 text-primary" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <a href="#top" className="text-2xl font-bold text-primary tracking-tight shrink-0">
          CRM.Elite
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-2 bg-action hover:bg-action/90 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-action/25"
        >
          Agendar Demonstração
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-5 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-gray-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setIsMenuOpen(false)}
            className="block text-center bg-action text-white text-sm font-medium px-5 py-3 rounded-xl"
          >
            Agendar Demonstração
          </a>
        </div>
      )}
    </header>
  );
}

function DashboardMockup() {
  const columns = [
    { label: 'Novo', count: 4, accent: 'bg-primary/60' },
    { label: 'Contatado', count: 6, accent: 'bg-action/60' },
    { label: 'Proposta', count: 2, accent: 'bg-emerald-300' },
  ];
  const stats = [
    { label: 'Leads ativos', value: '128', icon: Users },
    { label: 'Taxa de conversão', value: '32%', icon: BarChart3 },
    { label: 'Visitas na semana', value: '14', icon: CalendarCheck },
  ];

  return (
    <div className="relative">
      <div className="absolute -top-10 -right-8 w-64 h-64 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-8 w-64 h-64 sm:w-72 sm:h-72 bg-action/20 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-300/40 border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center gap-1.5 mb-5 px-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-200" />
          <span className="ml-3 text-xs font-medium text-gray-400 truncate">CRM.Elite — Funil de Vendas</span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {columns.map((col) => (
            <div key={col.label} className="bg-gray-50 rounded-2xl p-2 sm:p-2.5">
              <div className="flex items-center justify-between mb-2 px-0.5">
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-wide truncate">
                  {col.label}
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 bg-white rounded-full px-1.5 border border-gray-100 shrink-0">
                  {col.count}
                </span>
              </div>
              <div className="space-y-2">
                {[0, 1].map((row) => (
                  <div key={row} className="bg-white rounded-xl border border-gray-100 p-2 shadow-sm">
                    <div className={`h-1.5 w-7 rounded-full mb-1.5 ${col.accent}`} />
                    <div className="h-1.5 w-full rounded-full bg-gray-100 mb-1" />
                    <div className="h-1.5 w-2/3 rounded-full bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-2.5 sm:p-3">
              <stat.icon size={14} className="text-primary mb-1.5" />
              <p className="text-sm font-bold text-gray-900">{stat.value}</p>
              <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-app-bg/60 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] bg-action/15 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Sparkles size={13} /> Feito para imobiliárias
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-gray-900 leading-[1.08] tracking-tight">
            Organize leads, feche mais vendas, <span className="text-primary">sem planilhas</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">
            O CRM.Elite reúne leads, funil de vendas e agenda de visitas em um só lugar, com uma
            IA que atende seus leads no WhatsApp 24 horas por dia — para sua imobiliária vender
            mais com menos retrabalho.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-action/40 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" aria-hidden="true" />
              <a
                href="#contato"
                className="relative inline-flex items-center justify-center gap-2 bg-action hover:bg-action/90 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-xl shadow-action/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Agendar Demonstração Gratuita <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              <PlayCircle size={18} className="text-primary" /> Ver como funciona
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['bg-primary', 'bg-action', 'bg-emerald-400', 'bg-amber-400'].map((color, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full ${color} border-2 border-white shadow-sm flex items-center justify-center text-white text-[11px] font-bold`}
                >
                  {['MA', 'RT', 'CD', '+'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Imobiliárias já vendem mais com o CRM.Elite
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <DashboardMockup />
        </Reveal>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section id="solucao" className="bg-app-bg py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Sua imobiliária ainda perde vendas por falta de organização?
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Esses são os problemas mais comuns que vemos em equipes que ainda não têm um CRM.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="h-full bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                  <item.icon className="text-red-400" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemOverview() {
  return (
    <section id="visao-geral" className="bg-white py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">O que o CRM.Elite faz</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Um sistema que organiza, atende e vende por você
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Nada de dez ferramentas soltas. O CRM.Elite reúne todo o processo comercial da sua
            imobiliária em um só lugar, do primeiro contato ao fechamento.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {OVERVIEW_PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 120}>
              <div className="h-full text-center md:text-left bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 mx-auto md:mx-0">
                  <pillar.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{pillar.title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14 flex flex-col items-center gap-2 text-center">
          <a
            href="#funcionalidades"
            className="flex flex-col items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
          >
            Veja cada funcionalidade em detalhes
            <ChevronDown size={18} className="animate-bounce" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="funcionalidades" className="bg-app-bg py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">Funcionalidades</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Tudo que sua equipe precisa em um só lugar
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 120}>
              <div className="h-full bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-transparent transition-all duration-300">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-md ${
                    i % 2 === 0 ? 'bg-primary shadow-primary/30' : 'bg-action shadow-action/30'
                  }`}
                >
                  <feature.icon className="text-white" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">Como funciona</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Em três passos você já está vendendo mais
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div
            className="hidden md:block absolute top-7 left-[14%] right-[14%] h-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <div className="md:hidden absolute left-7 top-2 bottom-2 w-0.5 bg-gray-200" aria-hidden="true" />

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 150}>
                <div className="flex md:flex-col items-start md:items-center gap-4 md:text-center">
                  <div className="relative z-10 shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-primary flex items-center justify-center shadow-sm">
                    <step.icon className="text-primary" size={26} />
                  </div>
                  <div className="md:mt-4">
                    <span className="text-xs font-bold tracking-widest text-primary">PASSO {step.number}</span>
                    <h3 className="mt-1 md:mt-2 text-lg font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-1 md:mt-2 text-sm text-gray-500 md:max-w-[240px] md:mx-auto leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="bg-app-bg py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">Depoimentos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Imobiliárias que já venderam mais com o CRM.Elite
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="h-full bg-white rounded-2xl border border-gray-100 border-l-4 border-l-primary p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <Quote className="text-primary/30" size={32} />
                <StarRating />
                <p className="mt-4 text-gray-700 text-sm leading-relaxed flex-1">“{t.quote}”</p>
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section id="planos" className="bg-white py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">Planos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Um plano para cada tamanho de imobiliária
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Sem taxas escondidas. Fale com nosso time e monte a proposta ideal para sua equipe.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120} className="h-full">
              <div className="relative h-full">
                {plan.highlighted && (
                  <div
                    className="hidden lg:block absolute -inset-2 bg-gradient-to-br from-primary/40 to-action/30 rounded-[2rem] blur-2xl opacity-70"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`relative h-full flex flex-col bg-white rounded-2xl p-8 transition-all duration-300 ${
                    plan.highlighted
                      ? 'border-2 border-primary shadow-2xl shadow-primary/20 lg:scale-105'
                      : 'border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      <Sparkles size={12} /> {plan.badge}
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{plan.description}</p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contato"
                    className={`mt-8 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-colors ${
                      plan.highlighted
                        ? 'bg-action hover:bg-action/90 text-white shadow-sm shadow-action/20'
                        : 'border border-gray-200 text-gray-700 hover:border-action hover:text-action'
                    }`}
                  >
                    Fale Conosco
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-[#fb6f56] to-action py-16">
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />

      <Reveal className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Pronto para vender mais e nunca mais perder um lead?
        </h2>
        <p className="mt-3 text-white/80 max-w-xl mx-auto">
          Agende uma demonstração gratuita e veja o CRM.Elite organizando sua operação em minutos.
        </p>
        <a
          href="#contato"
          className="mt-7 inline-flex items-center justify-center gap-2 bg-white text-primary hover:scale-105 px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-black/10 transition-all duration-300"
        >
          Agendar Demonstração Gratuita <ArrowRight size={18} />
        </a>
      </Reveal>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    imobiliaria: '',
    corretores: '',
    mensagem: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.nome.trim()) next.nome = 'Informe seu nome.';
    if (!form.email.trim()) next.email = 'Informe seu e-mail.';
    else if (!EMAIL_REGEX.test(form.email)) next.email = 'Informe um e-mail válido.';
    if (!form.telefone.trim()) next.telefone = 'Informe um telefone ou WhatsApp.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contato" className="bg-primary/5 py-24 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">Contato</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Agende uma demonstração gratuita
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Preencha o formulário e nossa equipe entra em contato para apresentar o CRM.Elite na prática.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-10">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="text-emerald-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Solicitação enviada!</h3>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                  Recebemos seus dados. Nossa equipe vai entrar em contato em breve para agendar sua
                  demonstração.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nome" className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Nome
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="nome"
                      type="text"
                      value={form.nome}
                      onChange={handleChange('nome')}
                      placeholder="Seu nome"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 ${
                        errors.nome
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-300'
                          : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
                      }`}
                    />
                  </div>
                  {errors.nome && <p className="text-xs text-red-500 mt-1.5">{errors.nome}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-1.5">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="voce@empresa.com"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-300'
                          : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Telefone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="telefone"
                      type="tel"
                      value={form.telefone}
                      onChange={handleChange('telefone')}
                      placeholder="(11) 99999-9999"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 ${
                        errors.telefone
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-300'
                          : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
                      }`}
                    />
                  </div>
                  {errors.telefone && <p className="text-xs text-red-500 mt-1.5">{errors.telefone}</p>}
                </div>

                <div>
                  <label htmlFor="imobiliaria" className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Nome da imobiliária
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="imobiliaria"
                      type="text"
                      value={form.imobiliaria}
                      onChange={handleChange('imobiliaria')}
                      placeholder="Nome da sua imobiliária"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="corretores" className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Quantidade de corretores
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      id="corretores"
                      value={form.corretores}
                      onChange={handleChange('corretores')}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    >
                      <option value="">Selecione uma faixa</option>
                      {CORRETORES_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="mensagem" className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Mensagem <span className="text-gray-400 font-normal">(opcional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <textarea
                      id="mensagem"
                      rows={3}
                      value={form.mensagem}
                      onChange={handleChange('mensagem')}
                      placeholder="Conte um pouco sobre sua operação..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-action hover:bg-action/90 text-white py-3.5 rounded-xl font-medium transition-colors shadow-sm shadow-action/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Solicitar Demonstração
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <p className="text-2xl font-bold text-primary tracking-tight">CRM.Elite</p>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-sm">
              O CRM feito para imobiliárias organizarem leads, funil de vendas e visitas em um só
              lugar — sem planilhas e sem retrabalho.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <SocialIconButton
                label="Instagram"
                href="https://instagram.com"
                className="bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 hover:shadow-pink-500/40"
              >
                <FaInstagram size={18} />
              </SocialIconButton>
              <SocialIconButton label="Facebook" href="https://facebook.com" className="bg-[#1877F2] hover:shadow-[#1877F2]/40">
                <FaFacebookF size={16} />
              </SocialIconButton>
              <SocialIconButton label="LinkedIn" href="https://linkedin.com" className="bg-[#0A66C2] hover:shadow-[#0A66C2]/40">
                <FaLinkedinIn size={16} />
              </SocialIconButton>
              <SocialIconButton label="WhatsApp" href="https://wa.me/5511400000000" className="bg-[#25D366] hover:shadow-[#25D366]/40">
                <FaWhatsapp size={18} />
              </SocialIconButton>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">Links rápidos</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">Contato</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <Mail size={15} className="text-gray-400 shrink-0" />
                contato@crmelite.com.br
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <Phone size={15} className="text-gray-400 shrink-0" />
                (11) 4000-0000
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CRM.Elite. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div id="top" className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProblemSolution />
      <SystemOverview />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Plans />
      <CtaBanner />
      <ContactForm />
      <Footer />
    </div>
  );
}
