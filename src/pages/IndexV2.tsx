import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ShieldCheck,
  Star,
  ClipboardCheck,
  Video,
  MessageCircle,
  Bell,
  BookOpen,
  Crown,
  BadgeCheck,
  Lock,
  CreditCard,
  Smartphone,
  ArrowRight,
  Phone,
  FileText,
  CalendarClock,
  Pill,
  Leaf,
  Menu,
  ChevronUp,
  AlertCircle,
  Building2,
  UserCheck,
  Globe,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Motion helper ───────────────────────────────────────────────── */
const SR = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Animated counter ────────────────────────────────────────────── */
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1600;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.floor(eased * value));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div
      ref={ref}
      className="text-5xl md:text-6xl font-extrabold tracking-tighter"
      style={{ color: "white" }}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </div>
  );
}

/* ─── Constants ───────────────────────────────────────────────────── */
const WA_LINK =
  "https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica.";
const WA_PLAN =
  "https://wa.me/5585991275429?text=Gostaria%20de%20assinar%20o%20plano%20mensal%20de%20renova%C3%A7%C3%A3o%20de%20receitas.";

const EMERALD = "hsl(160,84%,39%)";
const BG = "#0F1115";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BORDER = "rgba(255,255,255,0.08)";
const TEXT_MUTED = "rgba(255,255,255,0.55)";
const TEXT_DIM = "rgba(255,255,255,0.32)";

/* ─── Data ────────────────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    Icon: ClipboardCheck,
    title: "Triagem Digital",
    desc: "Preencha seus dados e envie uma foto da receita anterior ou laudo médico. Todo o processo acontece pelo navegador.",
  },
  {
    num: "02",
    Icon: Video,
    title: "Teleconsulta Médica",
    desc: "Videochamada rápida com médico registrado no CRM para avaliação individual da continuidade do tratamento.",
  },
  {
    num: "03",
    Icon: MessageCircle,
    title: "Receita no WhatsApp",
    desc: "Receita digital com assinatura ICP-Brasil e QR Code de verificação, enviada para o seu celular em minutos.",
  },
];


const testimonials = [
  {
    name: "Maria Aparecida S.",
    city: "São Paulo, SP",
    text: "Renovei a receita de pressão em menos de 20 minutos. Processo simples, seguro e a receita chegou pelo WhatsApp.",
    rating: 5,
  },
  {
    name: "Carlos Eduardo M.",
    city: "Belo Horizonte, MG",
    text: "O médico foi atencioso e explicou tudo. A teleconsulta foi rápida e a receita já veio com QR Code de verificação.",
    rating: 5,
  },
  {
    name: "Ana Paula R.",
    city: "Curitiba, PR",
    text: "Assino o plano mensal há seis meses. Não me preocupo mais com o vencimento da receita do tratamento contínuo.",
    rating: 5,
  },
];

const renovamos = [
  { label: "Hipertensão arterial", category: "Cardiovascular" },
  { label: "Diabetes tipo 2", category: "Metabólica" },
  { label: "Hipotireoidismo", category: "Endócrina" },
  { label: "Depressão / ansiedade (uso contínuo)", category: "Saúde Mental" },
  { label: "Colesterol elevado", category: "Cardiovascular" },
  { label: "Anticoncepcional oral", category: "Saúde da Mulher" },
  { label: "Asma / DPOC em fase estável", category: "Respiratória" },
  { label: "Insônia crônica tratada", category: "Neurologia" },
];

const naoRenovamos = [
  "Receitas de uso único ou tratamento pontual",
  "Substâncias de controle especial (Portaria 344/98)",
  "Receitas amarelas (A) e azuis (B)",
  "Primeira consulta sem diagnóstico prévio",
  "Situações de urgência ou emergência médica",
  "Atestados, laudos e relatórios médicos",
];

const avulsoItems = [
  "1 teleconsulta com médico CRM ativo",
  "Receita digital assinada ICP-Brasil",
  "Envio via WhatsApp ou e-mail",
  "QR Code de verificação de autenticidade",
  "Suporte pós-consulta pelo WhatsApp",
];

const assinaturaItems = [
  { icon: CalendarClock, text: "Renovações mensais de receitas incluídas" },
  { icon: Bell, text: "Alertas automáticos de vencimento de receita" },
  { icon: Pill, text: "Atualizações sobre interações e novas medicações" },
  { icon: BookOpen, text: "E-book gratuito 'O Código da Farmácia'" },
  { icon: Phone, text: "Suporte prioritário via WhatsApp" },
  { icon: FileText, text: "Sem taxa de adesão · Cancele quando quiser" },
];

const securityItems = [
  {
    Icon: Lock,
    title: "Sigilo Médico Absoluto",
    desc: "Todos os dados clínicos são criptografados e acessados exclusivamente pelo médico responsável pelo atendimento.",
  },
  {
    Icon: ShieldCheck,
    title: "Assinatura ICP-Brasil",
    desc: "Padrão oficial do governo brasileiro. Garante autenticidade, integridade jurídica e rastreabilidade de cada receita emitida.",
  },
  {
    Icon: Globe,
    title: "Conformidade com a LGPD",
    desc: "Tratamos seus dados pessoais e de saúde em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).",
  },
  {
    Icon: UserCheck,
    title: "Médicos CRM Ativo",
    desc: "Todos os profissionais são verificados no Conselho Regional de Medicina antes de iniciar o atendimento na plataforma.",
  },
  {
    Icon: Building2,
    title: "Regulamentado pelo CFM",
    desc: "Operamos em conformidade com a Resolução CFM nº 2.314/2022, que regulamenta os serviços de telemedicina no Brasil.",
  },
  {
    Icon: BadgeCheck,
    title: "Verificação em Farmácias",
    desc: "O QR Code presente na receita permite que qualquer farmacêutico confirme a autenticidade do documento em tempo real.",
  },
];

const faqs = [
  {
    q: "A receita digital é aceita em qualquer farmácia?",
    a: "Sim. A receita com assinatura digital ICP-Brasil tem validade jurídica em todo o território nacional, conforme regulamentação da Anvisa e do CFM (Res. 2.314/2022). É aceita em todas as farmácias, incluindo redes como Droga Raia, Drogasil, Pague Menos e farmácias independentes.",
  },
  {
    q: "Qual o prazo para receber a receita?",
    a: "Em média 7 minutos após a teleconsulta. O link da receita digital é enviado via WhatsApp ou e-mail assim que o médico finaliza a assinatura eletrônica. O processo completo de triagem até recebimento leva entre 15 e 30 minutos.",
  },
  {
    q: "O serviço substitui o acompanhamento médico regular?",
    a: "Não. O receitas.site é exclusivo para a renovação de receitas de tratamentos contínuos já estabelecidos. Não substituímos consultas de rotina, novos diagnósticos ou acompanhamento especializado. Sempre mantenha vínculo com seu médico assistente.",
  },
  {
    q: "Quais medicamentos podem ter a receita renovada?",
    a: "Renovamos receitas de uso contínuo para condições estáveis já diagnosticadas, como hipertensão, diabetes, hipotireoidismo, dislipidemia, depressão e ansiedade (sem substâncias de alto potencial de abuso), anticoncepcionais e asma/DPOC em fase estável, entre outros. A avaliação é individual e cabe ao médico a decisão final.",
  },
  {
    q: "O que são receitas de controle especial? Posso renovar?",
    a: "Não. Receitas amarelas (A) e azuis (B) — como as de benzodiazepínicos de alta potência, opioides e anfetaminas — são de controle especial pela Portaria SVS/MS 344/98 e exigem o talão físico numerado. Esses documentos não podem ser emitidos digitalmente conforme a legislação vigente.",
  },
  {
    q: "Como funciona o reembolso?",
    a: "Se durante a triagem ou a teleconsulta o médico identificar que não é possível renovar sua receita digitalmente, você recebe reembolso integral do valor pago em até 3 dias úteis, sem questionamentos.",
  },
  {
    q: "O plano de assinatura renova automaticamente?",
    a: "Sim, a assinatura é renovada mensalmente. Você pode cancelar a qualquer momento, sem multa e sem burocracia, diretamente pelo WhatsApp ou por e-mail.",
  },
  {
    q: "Como meus dados de saúde são protegidos?",
    a: "Seus dados são tratados com criptografia de ponta a ponta e armazenados em servidores seguros. Seguimos rigorosamente a LGPD (Lei 13.709/2018). Suas informações clínicas são confidenciais e acessadas somente pelo médico responsável pelo seu atendimento.",
  },
];

/* ════════════════════════════════════════════════════════════════════ */
export default function IndexV2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 600);
      setStickyVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* JSON-LD FAQPage schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  /* JSON-LD MedicalBusiness */
  const bizSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "receitas.site",
    description:
      "Serviço de renovação de receitas médicas de uso contínuo via telemedicina, com receita digital válida em todo o Brasil.",
    url: "https://receitas.site",
    medicalSpecialty: "Telemedicina",
    availableService: {
      "@type": "MedicalProcedure",
      name: "Renovação de Receita Médica Digital",
      description:
        "Teleconsulta para renovação de receitas de uso contínuo com emissão de receita digital assinada com certificado ICP-Brasil.",
    },
    areaServed: { "@type": "Country", name: "Brasil" },
  };

  return (
    <>
      {/* ── Schema.org ────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bizSchema) }}
      />

      <div
        style={{ background: BG, color: "white" }}
        className="min-h-screen overflow-x-hidden font-sans"
      >
        {/* ── Trust Bar ───────────────────────────────────────────── */}
        <div
          className="py-3 text-center text-xs font-semibold tracking-wide"
          style={{
            background: "rgba(16,185,129,0.10)",
            borderBottom: "1px solid rgba(16,185,129,0.20)",
          }}
          role="banner"
          aria-label="Informações do serviço"
        >
          <span
            className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4"
            style={{ color: EMERALD }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ background: EMERALD }}
                aria-hidden="true"
              />
              Médicos disponíveis agora
            </span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span className="hidden sm:inline">CRM ativo verificado</span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span className="hidden sm:inline">Receita válida em todo o Brasil</span>
          </span>
        </div>

        {/* ── Header ──────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: "rgba(15,17,21,0.90)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
          role="navigation"
          aria-label="Navegação principal"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <a
              href="/v2"
              className="flex items-center gap-2.5 group"
              aria-label="receitas.site — página inicial"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-95"
                style={{ background: EMERALD }}
                aria-hidden="true"
              >
                <Leaf className="w-4 h-4" style={{ color: "#0F1115" }} />
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ color: "white" }}
              >
                receitas<span style={{ color: EMERALD }}>.site</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-7 text-sm font-medium"
              style={{ color: TEXT_MUTED }}
            >
              <a href="#como-funciona" className="hover:text-white transition-colors">
                Como funciona
              </a>
              <a href="#seguranca" className="hover:text-white transition-colors">
                Segurança
              </a>
              <a href="#precos" className="hover:text-white transition-colors">
                Preços
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                Dúvidas
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: EMERALD, color: "#0F1115" }}
              >
                Renovar minha Receita
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: "white", background: CARD_BG }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                className="md:hidden overflow-hidden"
              >
                <nav
                  className="px-5 py-4 space-y-3 text-sm font-medium"
                  style={{ color: TEXT_MUTED }}
                >
                  {[
                    ["#como-funciona", "Como funciona"],
                    ["#seguranca", "Segurança"],
                    ["#precos", "Preços"],
                    ["#faq", "Dúvidas"],
                  ].map(([href, label]) => (
                    <a
                      key={href}
                      href={href}
                      className="block py-2 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold mt-2"
                    style={{ background: EMERALD, color: "#0F1115" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Renovar minha Receita
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section
          className="relative pt-20 pb-28 px-5 md:px-8 text-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(16,185,129,0.14), transparent)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-48 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full blur-3xl pointer-events-none opacity-60"
            style={{ background: "rgba(16,185,129,0.07)" }}
            aria-hidden="true"
          />

          <div className="relative max-w-4xl mx-auto">
            <SR>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.28)",
                  color: EMERALD,
                }}
              >
                <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                Telemedicina regulamentada pelo CFM · Res. 2.314/2022
              </div>
            </SR>

            <SR delay={0.08}>
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6"
                style={{ color: "white" }}
              >
                Renovação Segura de{" "}
                <br className="hidden sm:block" />
                <span style={{ color: EMERALD }}>
                  Receitas Médicas Online.
                </span>
              </h1>
            </SR>

            <SR delay={0.15}>
              <p
                className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ color: TEXT_MUTED }}
              >
                Serviço exclusivo para renovação de receitas de medicamentos de
                uso contínuo. Teleconsulta com médico CRM ativo. Receita digital
                com assinatura ICP-Brasil. Aceita em qualquer farmácia do Brasil.
              </p>
            </SR>

            <SR delay={0.22}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-1"
                  style={{
                    background: EMERALD,
                    color: "#0F1115",
                    boxShadow: "0 8px 36px rgba(16,185,129,0.35)",
                  }}
                  aria-label="Renovar receita médica agora pelo WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Renovar minha Receita Agora
                </a>
                <a
                  href={WA_PLAN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:-translate-y-1"
                  style={{
                    background: CARD_BG,
                    border: `1px solid ${CARD_BORDER}`,
                    color: "white",
                    backdropFilter: "blur(12px)",
                  }}
                  aria-label="Assinar plano mensal de renovação"
                >
                  Assinar por R$&nbsp;29/mês
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </SR>

            <SR delay={0.28}>
              <div
                className="flex flex-wrap gap-3 justify-center"
                aria-label="Certificações e selos de segurança"
              >
                {[
                  { Icon: ShieldCheck, label: "ICP-Brasil" },
                  { Icon: BadgeCheck, label: "CRM Ativo" },
                  { Icon: Lock, label: "LGPD" },
                  { Icon: CreditCard, label: "Pagamento Seguro" },
                  { Icon: Smartphone, label: "WhatsApp" },
                ].map(({ Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: TEXT_MUTED,
                    }}
                  >
                    <Icon
                      className="w-3.5 h-3.5"
                      style={{ color: EMERALD }}
                      aria-hidden="true"
                    />
                    {label}
                  </span>
                ))}
              </div>
            </SR>
          </div>
        </section>

        {/* ── Como Funciona ───────────────────────────────────────── */}
        <section
          id="como-funciona"
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="como-funciona-heading"
        >
          <div className="max-w-5xl mx-auto">
            <SR>
              <div className="mb-16">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                  aria-hidden="true"
                >
                  Processo
                </p>
                <h2
                  id="como-funciona-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  Como funciona em 3 passos.
                </h2>
                <p
                  className="mt-3 text-base max-w-xl"
                  style={{ color: TEXT_MUTED }}
                >
                  Processo simples e seguro, projetado para o conforto de
                  pacientes crônicos.
                </p>
              </div>
            </SR>

            <div className="grid md:grid-cols-3 gap-5">
              {steps.map((s, i) => (
                <SR key={s.num} delay={i * 0.12}>
                  <article
                    className="relative rounded-3xl p-8 h-full overflow-hidden transition-all hover:-translate-y-1"
                    style={{
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    {i === 2 && (
                      <div
                        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                        style={{ background: "rgba(16,185,129,0.14)" }}
                        aria-hidden="true"
                      />
                    )}
                    <p
                      className="text-xs font-bold tracking-widest mb-6"
                      style={{ color: EMERALD }}
                      aria-hidden="true"
                    >
                      {s.num}
                    </p>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.22)",
                      }}
                      aria-hidden="true"
                    >
                      <s.Icon
                        className="w-5 h-5"
                        style={{ color: EMERALD }}
                      />
                    </div>
                    <h3
                      className="text-lg font-bold mb-3 tracking-tight"
                      style={{ color: "white" }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: TEXT_MUTED }}
                    >
                      {s.desc}
                    </p>
                    {i === 2 && (
                      <div
                        className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                        style={{ color: EMERALD }}
                      >
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ background: EMERALD }}
                          aria-hidden="true"
                        />
                        Entrega imediata
                      </div>
                    )}
                  </article>
                </SR>
              ))}
            </div>
          </div>
        </section>

        {/* ── Prova Social ────────────────────────────────────────── */}
        <section
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-label="Resultados e depoimentos de pacientes"
        >
          <div className="max-w-5xl mx-auto">
            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <SR key={t.name} delay={i * 0.1}>
                  <article
                    className="rounded-2xl p-6 h-full"
                    style={{
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                    }}
                    aria-label={`Depoimento de ${t.name}`}
                  >
                    <div
                      className="flex gap-1 mb-4"
                      aria-label={`${t.rating} estrelas`}
                    >
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 fill-current"
                          style={{ color: EMERALD }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote>
                      <p
                        className="text-sm leading-relaxed mb-5"
                        style={{ color: TEXT_MUTED }}
                      >
                        "{t.text}"
                      </p>
                    </blockquote>
                    <footer>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "white" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: TEXT_DIM }}>
                        {t.city}
                      </p>
                    </footer>
                  </article>
                </SR>
              ))}
            </div>
          </div>
        </section>

        {/* ── Critérios ───────────────────────────────────────────── */}
        <section
          id="medicamentos"
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="criterios-heading"
        >
          <div className="max-w-5xl mx-auto">
            <SR>
              <div className="mb-14">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                  aria-hidden="true"
                >
                  Critérios de Atendimento
                </p>
                <h2
                  id="criterios-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  O que renovamos e o que não renovamos.
                </h2>
                <p
                  className="mt-3 text-base max-w-xl"
                  style={{ color: TEXT_MUTED }}
                >
                  Transparência total. Exclusivo para tratamentos contínuos já
                  estabelecidos, sujeitos à avaliação médica individual.
                </p>
              </div>
            </SR>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Renovamos */}
              <SR delay={0.1}>
                <div
                  className="rounded-3xl p-8 h-full"
                  style={{
                    background: "rgba(16,185,129,0.04)",
                    border: "1px solid rgba(16,185,129,0.18)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(16,185,129,0.15)" }}
                      aria-hidden="true"
                    >
                      <Check
                        className="w-4 h-4"
                        style={{ color: EMERALD }}
                      />
                    </div>
                    <h3
                      className="font-bold text-lg"
                      style={{ color: "white" }}
                    >
                      Renovamos
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {renovamos.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-start gap-3"
                      >
                        <Check
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: EMERALD }}
                          aria-hidden="true"
                        />
                        <div>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="ml-2 text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(16,185,129,0.12)",
                              color: EMERALD,
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </SR>

              {/* Não renovamos */}
              <SR delay={0.18}>
                <div
                  className="rounded-3xl p-8 h-full"
                  style={{
                    background: "rgba(239,68,68,0.04)",
                    border: "1px solid rgba(239,68,68,0.14)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(239,68,68,0.12)" }}
                      aria-hidden="true"
                    >
                      <AlertCircle
                        className="w-4 h-4"
                        style={{ color: "#f87171" }}
                      />
                    </div>
                    <h3
                      className="font-bold text-lg"
                      style={{ color: "white" }}
                    >
                      Não renovamos
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {naoRenovamos.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: TEXT_MUTED }}
                      >
                        <X
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: "#f87171" }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="mt-8 p-4 rounded-2xl text-xs leading-relaxed"
                    style={{
                      background: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.12)",
                      color: "rgba(248,113,113,0.8)",
                    }}
                  >
                    <strong style={{ color: "#f87171" }}>
                      Aviso legal:
                    </strong>{" "}
                    Medicamentos de controle especial (Receitas Amarelas A e
                    Azuis B) são regulamentados pela Portaria SVS/MS 344/98 e
                    não podem ser prescritos por meio digital.
                  </div>
                </div>
              </SR>
            </div>
          </div>
        </section>

        {/* ── Segurança & LGPD ────────────────────────────────────── */}
        <section
          id="seguranca"
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="seguranca-heading"
        >
          <div className="max-w-5xl mx-auto">
            <SR>
              <div className="mb-16 max-w-2xl">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                  aria-hidden="true"
                >
                  Segurança & Conformidade
                </p>
                <h2
                  id="seguranca-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  Sigilo médico, tecnologia e ética na mesma plataforma.
                </h2>
                <p
                  className="mt-3 text-base"
                  style={{ color: TEXT_MUTED }}
                >
                  Operamos em conformidade com o CFM, a LGPD e os padrões
                  técnicos ICP-Brasil para garantir a segurança dos seus dados
                  e a validade jurídica das receitas.
                </p>
              </div>
            </SR>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {securityItems.map((item, i) => (
                <SR key={item.title} delay={i * 0.08}>
                  <article
                    className="rounded-2xl p-6 h-full"
                    style={{
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: "rgba(16,185,129,0.10)",
                        border: "1px solid rgba(16,185,129,0.18)",
                      }}
                      aria-hidden="true"
                    >
                      <item.Icon
                        className="w-5 h-5"
                        style={{ color: EMERALD }}
                      />
                    </div>
                    <h3
                      className="text-base font-bold mb-2 tracking-tight"
                      style={{ color: "white" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: TEXT_MUTED }}
                    >
                      {item.desc}
                    </p>
                  </article>
                </SR>
              ))}
            </div>

            {/* CFM notice */}
            <SR delay={0.3}>
              <div
                className="mt-8 flex items-start gap-4 p-6 rounded-2xl"
                style={{
                  background: "rgba(16,185,129,0.05)",
                  border: "1px solid rgba(16,185,129,0.14)",
                }}
                role="note"
                aria-label="Nota de conformidade com o CFM"
              >
                <ShieldCheck
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: EMERALD }}
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                  <strong style={{ color: "rgba(255,255,255,0.80)" }}>
                    Conformidade CFM:{" "}
                  </strong>
                  Este serviço opera em estrita conformidade com a Resolução CFM
                  nº 2.314/2022, que regulamenta a telemedicina no Brasil. O
                  atendimento é exclusivo para renovação de tratamentos contínuos
                  já estabelecidos e não substitui consultas presenciais para
                  novos diagnósticos ou acompanhamento de rotina.
                </p>
              </div>
            </SR>
          </div>
        </section>

        {/* ── Preços ──────────────────────────────────────────────── */}
        <section
          id="precos"
          className="py-28 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="precos-heading"
        >
          <div className="max-w-5xl mx-auto">
            <SR>
              <div className="text-center mb-16">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                  aria-hidden="true"
                >
                  Valores
                </p>
                <h2
                  id="precos-heading"
                  className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4"
                  style={{ color: "white" }}
                >
                  Transparência total.
                </h2>
                <p
                  className="text-base max-w-xl mx-auto"
                  style={{ color: TEXT_MUTED }}
                >
                  Sem taxas ocultas. Escolha o formato mais adequado para o
                  seu tratamento.
                </p>
              </div>
            </SR>

            <div className="grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
              {/* Avulso */}
              <SR delay={0.1}>
                <article
                  className="rounded-3xl p-8 h-full"
                  style={{
                    background: CARD_BG,
                    border: `1px solid ${CARD_BORDER}`,
                  }}
                  aria-label="Plano Consulta Avulsa — R$ 39,00"
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: TEXT_MUTED }}
                  >
                    Consulta Avulsa
                  </p>
                  <div className="flex items-baseline gap-1 mt-4 mb-8">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: TEXT_MUTED }}
                    >
                      R$
                    </span>
                    <span
                      className="text-6xl font-extrabold tracking-tighter"
                      style={{ color: "white" }}
                    >
                      39
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: TEXT_MUTED }}
                    >
                      ,00
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8" role="list">
                    {avulsoItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm"
                        style={{ color: TEXT_MUTED }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(16,185,129,0.12)" }}
                          aria-hidden="true"
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: EMERALD }}
                          />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: "white",
                    }}
                  >
                    Contratar Consulta Avulsa
                    <ArrowRight
                      className="w-4 h-4"
                      aria-hidden="true"
                    />
                  </a>
                  <p
                    className="text-center text-xs mt-4"
                    style={{ color: TEXT_DIM }}
                  >
                    Pagamento único · Sem compromisso mensal
                  </p>
                </article>
              </SR>

              {/* Assinatura */}
              <SR delay={0.18}>
                <article
                  className="relative rounded-3xl p-8 overflow-hidden"
                  style={{
                    background: "rgba(16,185,129,0.06)",
                    border: "1px solid rgba(16,185,129,0.32)",
                  }}
                  aria-label="Plano Assinatura Mensal — R$ 29,00 por mês"
                >
                  <div
                    className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-60"
                    style={{ background: "rgba(16,185,129,0.10)" }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: EMERALD, color: "#0F1115" }}
                      >
                        <Crown
                          className="w-3 h-3"
                          aria-hidden="true"
                        />
                        Recomendado
                      </div>
                    </div>

                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: EMERALD }}
                    >
                      Assinatura Mensal
                    </p>
                    <div className="flex items-baseline gap-1 mt-4 mb-2">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: TEXT_MUTED }}
                      >
                        R$
                      </span>
                      <span
                        className="text-6xl font-extrabold tracking-tighter"
                        style={{ color: "white" }}
                      >
                        29
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: TEXT_MUTED }}
                      >
                        /mês
                      </span>
                    </div>
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        color: EMERALD,
                      }}
                    >
                      Economia de R$&nbsp;120/ano em relação à consulta avulsa
                    </div>

                    <ul className="space-y-4 mb-8" role="list">
                      {assinaturaItems.map(({ icon: Icon, text }) => (
                        <li
                          key={text}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div
                            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              background: "rgba(16,185,129,0.12)",
                              border: "1px solid rgba(16,185,129,0.22)",
                            }}
                            aria-hidden="true"
                          >
                            <Icon
                              className="w-3.5 h-3.5"
                              style={{ color: EMERALD }}
                            />
                          </div>
                          <span
                            style={{ color: "rgba(255,255,255,0.82)" }}
                          >
                            {text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={WA_PLAN}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all hover:-translate-y-1"
                      style={{
                        background: EMERALD,
                        color: "#0F1115",
                        boxShadow: "0 8px 32px rgba(16,185,129,0.42)",
                      }}
                    >
                      Assinar Agora — R$&nbsp;29/mês
                      <ArrowRight
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </a>
                    <div
                      className="flex items-center justify-center gap-2 mt-5 text-xs"
                      style={{ color: TEXT_DIM }}
                    >
                      <ShieldCheck
                        className="w-3.5 h-3.5"
                        style={{ color: EMERALD }}
                        aria-hidden="true"
                      />
                      Cancele a qualquer momento · Sem multa
                    </div>
                  </div>
                </article>
              </SR>
            </div>

            {/* Reembolso strip */}
            <SR delay={0.25}>
              <div
                className="mt-8 flex items-center justify-center gap-3 py-5 px-6 rounded-2xl text-sm max-w-3xl mx-auto"
                style={{
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                }}
                role="note"
              >
                <ShieldCheck
                  className="w-5 h-5 shrink-0"
                  style={{ color: EMERALD }}
                  aria-hidden="true"
                />
                <span style={{ color: TEXT_MUTED }}>
                  <strong style={{ color: "white" }}>
                    Reembolso integral
                  </strong>{" "}
                  garantido caso o médico não possa renovar sua receita. Sem
                  perguntas.
                </span>
              </div>
            </SR>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section
          id="faq"
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="faq-heading"
        >
          <div className="max-w-3xl mx-auto">
            <SR>
              <div className="text-center mb-14">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                  aria-hidden="true"
                >
                  Dúvidas
                </p>
                <h2
                  id="faq-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  Perguntas Frequentes
                </h2>
                <p
                  className="mt-3 text-base"
                  style={{ color: TEXT_MUTED }}
                >
                  Informações claras e transparentes sobre o serviço.
                </p>
              </div>
            </SR>
            <SR delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    style={{
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                    className="border-none"
                  >
                    <AccordionTrigger
                      className="px-6 py-5 text-sm md:text-base font-semibold text-left hover:no-underline hover:bg-white/5 transition-colors"
                      style={{ color: "white" }}
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="px-6 pb-5 text-sm md:text-base leading-relaxed"
                      style={{ color: TEXT_MUTED }}
                    >
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SR>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────── */}
        <section
          className="py-28 px-5 md:px-8 text-center relative overflow-hidden"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-label="Chamada para ação final"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(16,185,129,0.11), transparent)",
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-2xl mx-auto">
            <SR>
              <h2
                className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-5"
                style={{ color: "white" }}
              >
                O tratamento não pode esperar.
              </h2>
              <p
                className="text-base mb-10 leading-relaxed"
                style={{ color: TEXT_MUTED }}
              >
                Médico disponível para avaliação agora. Receita digital emitida
                em minutos e aceita em qualquer farmácia do Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-1"
                  style={{
                    background: EMERALD,
                    color: "#0F1115",
                    boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
                  }}
                >
                  Renovar minha Receita
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={WA_PLAN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:-translate-y-1"
                  style={{
                    background: CARD_BG,
                    border: `1px solid ${CARD_BORDER}`,
                    color: "white",
                  }}
                >
                  Assinar por R$&nbsp;29/mês
                </a>
              </div>
            </SR>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer
          className="py-14 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          role="contentinfo"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              {/* Brand */}
              <div>
                <a
                  href="/v2"
                  className="flex items-center gap-2.5 mb-4"
                  aria-label="receitas.site"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: EMERALD }}
                    aria-hidden="true"
                  >
                    <Leaf
                      className="w-4 h-4"
                      style={{ color: "#0F1115" }}
                    />
                  </div>
                  <span
                    className="font-bold text-lg tracking-tight"
                    style={{ color: "white" }}
                  >
                    receitas<span style={{ color: EMERALD }}>.site</span>
                  </span>
                </a>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: TEXT_DIM }}
                >
                  Renovação de receitas médicas de uso contínuo via
                  telemedicina. Serviço regulamentado pelo CFM.
                </p>
              </div>

              {/* Links */}
              <nav aria-label="Links do rodapé">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: TEXT_DIM }}
                >
                  Navegação
                </p>
                <ul className="space-y-2.5 text-sm">
                  {[
                    ["#como-funciona", "Como funciona"],
                    ["#seguranca", "Segurança & LGPD"],
                    ["#precos", "Preços"],
                    ["#faq", "Perguntas Frequentes"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="transition-colors hover:text-white"
                        style={{ color: TEXT_DIM }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Legal */}
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: TEXT_DIM }}
                >
                  Legal & Contato
                </p>
                <ul className="space-y-2.5 text-sm">
                  {[
                    ["#", "Política de Privacidade"],
                    ["#", "Termos de Uso"],
                    ["#", "Política de Reembolso"],
                  ].map(([href, label]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="transition-colors hover:text-white"
                        style={{ color: TEXT_DIM }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: EMERALD }}
                >
                  <Phone
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>

            <div
              className="border-t pt-8 space-y-4"
              style={{ borderColor: CARD_BORDER }}
            >
              {/* CFM compliance block — obrigatório */}
              <div
                className="rounded-2xl p-5 text-xs leading-relaxed space-y-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: TEXT_DIM,
                }}
                role="note"
                aria-label="Informações de conformidade médica e regulatória"
              >
                <p>
                  Atendimento regulamentado pela{" "}
                  <strong style={{ color: "rgba(255,255,255,0.40)" }}>
                    Resolução CFM nº 2.314/2022
                  </strong>
                  . Este serviço é{" "}
                  <strong style={{ color: "rgba(255,255,255,0.40)" }}>
                    exclusivo para renovação de receitas de uso contínuo já
                    estabelecidas
                  </strong>{" "}
                  e não substitui consultas presenciais para novos
                  diagnósticos, acompanhamento especializado ou situações de
                  urgência e emergência.
                </p>
                <p>
                  Medicamentos de controle especial (Receitas Amarelas A e
                  Azuis B — Portaria SVS/MS 344/98) não podem ser prescritos
                  digitalmente. Dados pessoais tratados em conformidade com a{" "}
                  <strong style={{ color: "rgba(255,255,255,0.40)" }}>
                    LGPD (Lei 13.709/2018)
                  </strong>
                  .
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p
                  className="text-xs text-center md:text-left"
                  style={{ color: TEXT_DIM }}
                >
                  © 2025 receitas.site · Todos os direitos reservados
                </p>
                <div
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.16)",
                    color: EMERALD,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: EMERALD }}
                    aria-hidden="true"
                  />
                  Sistema operacional: Normal
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* ── Sticky mobile CTA ───────────────────────────────────── */}
        <AnimatePresence>
          {stickyVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-3"
              style={{ background: "linear-gradient(to top, rgba(15,17,21,0.98) 70%, transparent)" }}
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold"
                style={{
                  background: EMERALD,
                  color: "#0F1115",
                  boxShadow: "0 8px 32px rgba(16,185,129,0.40)",
                }}
              >
                Renovar minha Receita
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scroll to top ────────────────────────────────────────── */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full hidden md:flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                backdropFilter: "blur(12px)",
              }}
              aria-label="Voltar ao topo"
            >
              <ChevronUp
                className="w-5 h-5"
                style={{ color: "white" }}
                aria-hidden="true"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
