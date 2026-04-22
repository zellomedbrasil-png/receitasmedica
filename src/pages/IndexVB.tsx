import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ShieldCheck,
  ClipboardCheck,
  Video,
  MessageCircle,
  Bell,
  BookOpen,
  CalendarDays,
  Users,
  Wallet,
  Clock,
  Leaf,
  Menu,
  ArrowRight,
  BadgeCheck,
  Lock,
  CreditCard,
  Smartphone,
  Sparkles,
  ChevronUp,
  Pill,
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

/* ─── Constants ───────────────────────────────────────────────────── */
const WA_AVULSA =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero fazer uma Consulta Avulsa - R$ 59.");
const WA_TRANQUILO =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero assinar o Plano Tranquilo - R$ 47/mês.");
const WA_GENERIC =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero renovar minha receita médica.");

const EMERALD = "hsl(160,84%,39%)";
const BG = "#0F1115";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BORDER = "rgba(255,255,255,0.08)";
const TEXT_MUTED = "rgba(255,255,255,0.55)";
const TEXT_DIM = "rgba(255,255,255,0.32)";

/* ─── Data ────────────────────────────────────────────────────────── */
const dores = [
  {
    Icon: Clock,
    title: "Acabou no fim de semana",
    desc: "Sexta à noite e o remédio da pressão acabou. Pronto-socorro lotado e o consultório só na segunda.",
  },
  {
    Icon: CalendarDays,
    title: "45 dias de espera no convênio",
    desc: "A próxima vaga do seu médico é só daqui mais de um mês — e a receita venceu hoje.",
  },
  {
    Icon: Users,
    title: "Cuidando de quem cuidou",
    desc: "Renovar a receita dos pais idosos virou mais uma batalha na rotina de cuidador.",
  },
  {
    Icon: Wallet,
    title: "Pagando caro por hábito",
    desc: "Nome comercial na receita encarece o tratamento. Princípio ativo dá liberdade na farmácia.",
  },
];

const steps = [
  {
    num: "01",
    Icon: ClipboardCheck,
    title: "Triagem digital rápida",
    desc: "Você preenche informações sobre o medicamento que já usa e anexa sua receita anterior.",
  },
  {
    num: "02",
    Icon: Video,
    title: "Teleconsulta com médico CRM",
    desc: "Avaliação clínica individual do seu caso por médico registrado no Conselho Regional de Medicina.",
  },
  {
    num: "03",
    Icon: MessageCircle,
    title: "Receita no WhatsApp",
    desc: "Receita digital com assinatura ICP-Brasil em até 1 hora. Válida em qualquer farmácia do Brasil.",
  },
];

const renovamos = [
  "Hipertensão (pressão alta)",
  "Diabetes",
  "Hipotireoidismo (tireoide)",
  "Colesterol alto",
  "Anticoncepcional de uso contínuo",
  "Asma estável",
  "Depressão e ansiedade (uso contínuo liberado por telemedicina)",
];

const naoFazemos = [
  "Receitas amarelas (lista A) e azuis (lista B) — Portaria 344/98",
  "Atestados médicos",
  "Diagnósticos novos",
  "Atendimento de urgência ou emergência",
  "Prescrição de medicamentos novos sem histórico",
];

const avulsoItems = [
  "1 renovação de receita",
  "Médico com CRM ativo",
  "Receita digital no WhatsApp em até 1 hora",
  "Válida em qualquer farmácia do Brasil",
  "Prescrição pelo princípio ativo",
];

const tranquiloBase = [
  { Icon: Pill, text: "Renovações ilimitadas durante o mês" },
  { Icon: BadgeCheck, text: "Médico com CRM ativo sempre disponível" },
  { Icon: MessageCircle, text: "Receita digital no WhatsApp em até 1 hora" },
  { Icon: ShieldCheck, text: "Válida em qualquer farmácia do Brasil" },
  { Icon: Leaf, text: "Prescrição pelo princípio ativo" },
];

const tranquiloBonus = [
  { Icon: BookOpen, label: "Bônus 1", text: 'Guia "O Código da Farmácia" (PDF exclusivo)' },
  { Icon: Bell, label: "Bônus 2", text: "Lembrete no WhatsApp 7 dias antes da receita vencer" },
  { Icon: CalendarDays, label: "Bônus 3", text: "Atendimento também em finais de semana" },
];

const faqs = [
  {
    q: "A receita digital é válida em qualquer farmácia?",
    a: "Sim. Nossas receitas são assinadas digitalmente com certificado ICP-Brasil, o mesmo padrão usado em documentos oficiais. São aceitas em todas as farmácias do Brasil conforme a Resolução CFM 2.314/2022.",
  },
  {
    q: "Preciso ter a receita antiga para renovar?",
    a: "Sim. Para renovação de uso contínuo, você precisa anexar sua receita anterior ou relatório médico comprovando o tratamento.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Na maioria dos casos, você recebe sua receita digital no WhatsApp em até 1 hora após a teleconsulta.",
  },
  {
    q: "E se o médico avaliar que não pode renovar minha receita?",
    a: "Se por critério clínico a renovação não for possível, devolvemos 100% do valor pago.",
  },
  {
    q: "Vocês renovam receita de medicamento controlado?",
    a: "Renovamos medicamentos de uso contínuo da lista C1 (receita branca de controle especial) que podem ser prescritos por telemedicina. Não renovamos receitas amarelas (lista A) nem azuis (lista B).",
  },
  {
    q: "Posso cancelar o Plano Tranquilo quando quiser?",
    a: "Sim. Sem fidelidade, sem multa. O cancelamento é feito pelo próprio portal.",
  },
  {
    q: "Os médicos têm CRM ativo?",
    a: "Sim. Todos os médicos da plataforma têm CRM ativo e registro regular junto ao Conselho Regional de Medicina. Você pode verificar o CRM do médico que te atendeu diretamente na receita emitida.",
  },
  {
    q: "Esse serviço substitui meu médico regular?",
    a: "Não. O receitas.site é um serviço de renovação de receitas para tratamentos já em curso. Recomendamos o acompanhamento médico regular com seu especialista.",
  },
];

/* ════════════════════════════════════════════════════════════════════ */
export default function IndexVB() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* SEO + A/B variant marker */
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Renove sua receita médica em até 1 hora | receitas.site";

    const created: HTMLElement[] = [];
    const ensure = (selector: string, build: () => HTMLElement) => {
      let el = document.head.querySelector<HTMLElement>(selector);
      if (!el) {
        el = build();
        document.head.appendChild(el);
        created.push(el);
      }
      return el;
    };

    const ab = ensure('meta[name="ab-variant"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "ab-variant");
      return m;
    });
    ab.setAttribute("content", "B");

    const desc = ensure('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    const prevDesc = desc.getAttribute("content");
    desc.setAttribute(
      "content",
      "Médicos com CRM ativo, prescrição pelo princípio ativo e receita digital ICP-Brasil válida em qualquer farmácia. Plano Tranquilo R$ 47/mês ou Avulsa R$ 59."
    );

    return () => {
      document.title = prevTitle;
      if (prevDesc) desc.setAttribute("content", prevDesc);
      created.forEach((el) => el.remove());
    };
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const bizSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "receitas.site",
    description:
      "Renovação de receitas médicas de uso contínuo via telemedicina. Plano Tranquilo R$ 47/mês ou Consulta Avulsa R$ 59.",
    url: "https://receitas.site/v-b",
    medicalSpecialty: "Telemedicina",
    priceRange: "R$ 47 - R$ 59",
  };

  return (
    <>
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
            <a
              href="/v-b"
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
              <span className="font-bold text-lg tracking-tight" style={{ color: "white" }}>
                receitas<span style={{ color: EMERALD }}>.site</span>
              </span>
            </a>

            <nav
              className="hidden md:flex items-center gap-7 text-sm font-medium"
              style={{ color: TEXT_MUTED }}
            >
              <a href="#como-funciona" className="hover:text-white transition-colors">
                Como funciona
              </a>
              <a href="#precos" className="hover:text-white transition-colors">
                Preços
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
              <a
                href={WA_GENERIC}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Entrar
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={WA_TRANQUILO}
                target="_blank"
                rel="noopener noreferrer"
                data-variant="B"
                data-cta-id="header-renovar"
                className="hidden md:inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: EMERALD, color: "#0F1115" }}
              >
                Renovar Agora
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
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
                    ["#precos", "Preços"],
                    ["#faq", "FAQ"],
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
                    href={WA_TRANQUILO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold mt-2"
                    style={{ background: EMERALD, color: "#0F1115" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Renovar Agora
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
                Receita digital em até 1 hora · CFM 2.314/2022
              </div>
            </SR>

            <SR delay={0.08}>
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6"
                style={{ color: "white" }}
              >
                Renove sua receita médica{" "}
                <br className="hidden sm:block" />
                <span style={{ color: EMERALD }}>sem sair de casa.</span>
              </h1>
            </SR>

            <SR delay={0.15}>
              <p
                className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ color: TEXT_MUTED }}
              >
                Médicos com CRM ativo, prescrição pelo princípio ativo e receita digital com
                assinatura ICP-Brasil. Aceita em qualquer farmácia do Brasil.
              </p>
            </SR>

            <SR delay={0.22}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <a
                  href={WA_TRANQUILO}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-variant="B"
                  data-cta-id="hero-primary"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: EMERALD,
                    color: "#0F1115",
                    boxShadow: "0 12px 40px -10px rgba(16,185,129,0.55)",
                  }}
                >
                  Renovar Minha Receita
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#como-funciona"
                  data-variant="B"
                  data-cta-id="hero-secondary"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: TEXT_MUTED }}
                >
                  Ver como funciona
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    ↓
                  </motion.span>
                </a>
              </div>
            </SR>

            <SR delay={0.28}>
              <p className="text-xs mb-6" style={{ color: TEXT_DIM }}>
                Receitas renovadas com segurança e ética desde 2024.
              </p>
            </SR>

            <SR delay={0.32}>
              <div className="flex flex-wrap gap-3 justify-center" aria-label="Selos de segurança">
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
                    <Icon className="w-3.5 h-3.5" style={{ color: EMERALD }} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </SR>
          </div>
        </section>

        {/* ── A Dor (4 cards) ─────────────────────────────────────── */}
        <section
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="dor-heading"
        >
          <div className="max-w-6xl mx-auto">
            <SR>
              <div className="mb-14 max-w-2xl">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                >
                  Identificação
                </p>
                <h2
                  id="dor-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  Você reconhece alguma{" "}
                  <span style={{ color: EMERALD }}>dessas situações?</span>
                </h2>
              </div>
            </SR>

            <div className="grid sm:grid-cols-2 gap-5">
              {dores.map((d, i) => (
                <SR key={d.title} delay={i * 0.08}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="relative h-full rounded-3xl p-7 overflow-hidden"
                    style={{
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.25)",
                      }}
                    >
                      <d.Icon className="w-5 h-5" style={{ color: EMERALD }} aria-hidden="true" />
                    </div>
                    <h3
                      className="text-lg font-semibold mb-2 tracking-tight"
                      style={{ color: "white" }}
                    >
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                      {d.desc}
                    </p>
                    <d.Icon
                      className="absolute -bottom-4 -right-4 w-[120px] h-[120px] -rotate-[15deg] pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.04)" }}
                      strokeWidth={0.5}
                      aria-hidden="true"
                    />
                  </motion.article>
                </SR>
              ))}
            </div>
          </div>
        </section>

        {/* ── Como Funciona ───────────────────────────────────────── */}
        <section
          id="como-funciona"
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="como-funciona-heading"
        >
          <div className="max-w-6xl mx-auto">
            <SR>
              <div className="mb-16">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                >
                  Em 3 passos simples
                </p>
                <h2
                  id="como-funciona-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  Do celular à farmácia.
                </h2>
                <p className="mt-3 text-base max-w-xl" style={{ color: TEXT_MUTED }}>
                  Sem filas, sem deslocamento. Do preenchimento à receita na palma da mão.
                </p>
                <div
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(16,185,129,0.10)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    color: EMERALD,
                  }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Conforme Resolução CFM 2.314/2022
                </div>
              </div>
            </SR>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <SR key={s.num} delay={i * 0.15}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative rounded-3xl overflow-hidden h-full"
                    style={{
                      background: i === 2 ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.06)",
                      border: `1px solid ${i === 2 ? "rgba(16,185,129,0.30)" : "rgba(255,255,255,0.14)"}`,
                    }}
                  >
                    <div
                      className="h-[3px] w-full"
                      style={{
                        background: `linear-gradient(90deg, ${EMERALD}, rgba(16,185,129,0.3))`,
                      }}
                      aria-hidden="true"
                    />

                    <div className="p-8 relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
                          style={{ background: "rgba(16,185,129,0.15)", color: EMERALD }}
                        >
                          {s.num}
                        </div>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.25)",
                          }}
                        >
                          <s.Icon className="w-5 h-5" style={{ color: EMERALD }} />
                        </div>
                      </div>

                      <h3
                        className="text-xl font-semibold mb-2 tracking-tight"
                        style={{ color: "white" }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                        {s.desc}
                      </p>

                      {i === 2 && (
                        <div className="mt-6">
                          <span
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                            style={{ color: EMERALD }}
                          >
                            <span
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ background: EMERALD }}
                              aria-hidden="true"
                            />
                            Entrega imediata
                          </span>
                        </div>
                      )}
                    </div>

                    {i === 2 && (
                      <div
                        className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                        style={{ background: "rgba(16,185,129,0.15)" }}
                        aria-hidden="true"
                      />
                    )}

                    <s.Icon
                      className="absolute -bottom-4 -right-4 w-[140px] h-[140px] -rotate-[15deg] pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.05)" }}
                      strokeWidth={0.5}
                      aria-hidden="true"
                    />
                  </motion.article>
                </SR>
              ))}
            </div>
          </div>
        </section>

        {/* ── Diferencial Ético ───────────────────────────────────── */}
        <section
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="etica-heading"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
            <SR className="lg:col-span-3">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: EMERALD }}
              >
                O diferencial ético
              </p>
              <h2
                id="etica-heading"
                className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-6"
                style={{ color: "white" }}
              >
                Médicos que prescrevem pensando em você,{" "}
                <span style={{ color: EMERALD }}>não na indústria.</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: TEXT_MUTED }}
              >
                Nossos médicos não têm vínculo com nenhum laboratório farmacêutico. Isso significa
                que a prescrição é feita pelo{" "}
                <strong style={{ color: "white" }}>princípio ativo (DCB)</strong> — o nome
                genérico da substância.
              </p>
              <p className="text-base leading-relaxed" style={{ color: TEXT_MUTED }}>
                Na prática, você tem liberdade para escolher o medicamento mais acessível na
                farmácia. O mesmo tratamento, com preço justo.
              </p>
            </SR>

            <SR delay={0.15} className="lg:col-span-2">
              <div
                className="relative rounded-3xl p-7 overflow-hidden"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.30)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(16,185,129,0.18)",
                    border: "1px solid rgba(16,185,129,0.35)",
                  }}
                >
                  <ShieldCheck className="w-6 h-6" style={{ color: EMERALD }} />
                </div>
                <h3
                  className="text-lg font-semibold mb-4 tracking-tight"
                  style={{ color: "white" }}
                >
                  Prescrição pelo princípio ativo
                </h3>
                <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.78)" }}>
                  {[
                    "Sem vínculo com laboratório",
                    "Sua liberdade de escolha na farmácia",
                    "Mesmo tratamento, preço justo",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: EMERALD }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "rgba(16,185,129,0.20)" }}
                  aria-hidden="true"
                />
              </div>
            </SR>
          </div>
        </section>

        {/* ── Preços ──────────────────────────────────────────────── */}
        <section
          id="precos"
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="precos-heading"
        >
          <div className="max-w-6xl mx-auto">
            <SR>
              <div className="text-center mb-14">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                >
                  Planos e Preços
                </p>
                <h2
                  id="precos-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  Escolha o plano <span style={{ color: EMERALD }}>ideal para você.</span>
                </h2>
                <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: TEXT_MUTED }}>
                  Sem letras miúdas. Sem fidelidade. Você decide quando e como usar.
                </p>
              </div>
            </SR>

            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Plano Tranquilo (DESTAQUE — primeiro no mobile) */}
              <SR delay={0.1} className="order-1 lg:order-2">
                <article
                  className="relative h-full rounded-3xl p-8 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0.04) 100%)",
                    border: "2px solid rgba(16,185,129,0.55)",
                    boxShadow: "0 24px 60px -20px rgba(16,185,129,0.40)",
                  }}
                >
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-b-xl text-[10px] font-bold uppercase tracking-widest"
                      style={{ background: EMERALD, color: "#0F1115" }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Mais escolhido
                    </span>
                  </div>

                  <div className="mb-6 mt-3">
                    <h3
                      className="text-xl font-bold mb-2 tracking-tight"
                      style={{ color: "white" }}
                    >
                      Plano Tranquilo
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-5xl font-extrabold tracking-tighter"
                        style={{ color: "white" }}
                      >
                        R$ 47
                      </span>
                      <span className="text-sm" style={{ color: TEXT_MUTED }}>
                        /mês
                      </span>
                    </div>
                    <p className="mt-2 text-xs" style={{ color: TEXT_MUTED }}>
                      Menos de R$ 1,60 por dia
                    </p>
                  </div>

                  <ul className="space-y-3 mb-5">
                    {tranquiloBase.map((item) => (
                      <li key={item.text} className="flex items-start gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-px"
                          style={{ background: "rgba(16,185,129,0.15)" }}
                        >
                          <item.Icon className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                        </div>
                        <span
                          className="text-sm leading-relaxed pt-1"
                          style={{ color: "rgba(255,255,255,0.82)" }}
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="space-y-3 mb-7 rounded-2xl p-4"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.25)",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: EMERALD }}
                    >
                      + 3 Bônus exclusivos
                    </p>
                    {tranquiloBonus.map((b) => (
                      <div key={b.label} className="flex items-start gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-px"
                          style={{ background: "rgba(16,185,129,0.20)" }}
                        >
                          <b.Icon className="w-3.5 h-3.5" style={{ color: EMERALD }} />
                        </div>
                        <div className="flex-1">
                          <span
                            className="inline-block text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded mr-2"
                            style={{ background: "rgba(16,185,129,0.20)", color: EMERALD }}
                          >
                            {b.label}
                          </span>
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {b.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={WA_TRANQUILO}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-variant="B"
                    data-cta-id="precos-tranquilo"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: EMERALD,
                      color: "#0F1115",
                      boxShadow: "0 12px 32px -8px rgba(16,185,129,0.55)",
                    }}
                  >
                    Assinar o Plano Tranquilo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="mt-3 text-center text-xs" style={{ color: TEXT_DIM }}>
                    Cancele quando quiser. Sem fidelidade.
                  </p>

                  <div
                    className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "rgba(16,185,129,0.18)" }}
                    aria-hidden="true"
                  />
                </article>
              </SR>

              {/* Avulsa */}
              <SR className="order-2 lg:order-1">
                <article
                  className="h-full rounded-3xl p-8"
                  style={{
                    background: CARD_BG,
                    border: `1px solid ${CARD_BORDER}`,
                  }}
                >
                  <div className="mb-6">
                    <h3
                      className="text-xl font-bold mb-2 tracking-tight"
                      style={{ color: "white" }}
                    >
                      Consulta Avulsa
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-5xl font-extrabold tracking-tighter"
                        style={{ color: "white" }}
                      >
                        R$ 59
                      </span>
                    </div>
                    <p className="mt-2 text-xs" style={{ color: TEXT_MUTED }}>
                      Pagamento único · Uma renovação
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {avulsoItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: EMERALD }}
                        />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.78)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={WA_AVULSA}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-variant="B"
                    data-cta-id="precos-avulsa"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: "transparent",
                      border: `1.5px solid ${EMERALD}`,
                      color: EMERALD,
                    }}
                  >
                    Renovar Agora
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </article>
              </SR>
            </div>
          </div>
        </section>

        {/* ── Transparência ───────────────────────────────────────── */}
        <section
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="transp-heading"
        >
          <div className="max-w-6xl mx-auto">
            <SR>
              <div className="text-center mb-14 max-w-3xl mx-auto">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                >
                  Transparência total
                </p>
                <h2
                  id="transp-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  O que fazemos e <span style={{ color: EMERALD }}>o que não fazemos.</span>
                </h2>
              </div>
            </SR>

            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              <SR>
                <article
                  className="h-full rounded-3xl p-7"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.30)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(16,185,129,0.18)",
                        border: "1px solid rgba(16,185,129,0.35)",
                      }}
                    >
                      <Check className="w-5 h-5" style={{ color: EMERALD }} />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight" style={{ color: "white" }}>
                      O que renovamos
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {renovamos.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: EMERALD }}
                        />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.82)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </SR>

              <SR delay={0.1}>
                <article
                  className="h-full rounded-3xl p-7"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.25)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.30)",
                      }}
                    >
                      <X className="w-5 h-5" style={{ color: "rgb(248,113,113)" }} />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight" style={{ color: "white" }}>
                      O que NÃO fazemos
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {naoFazemos.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <X
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: "rgb(248,113,113)" }}
                        />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.82)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </SR>
            </div>

            <SR delay={0.2}>
              <p
                className="mt-10 text-center text-sm leading-relaxed max-w-3xl mx-auto"
                style={{ color: TEXT_MUTED }}
              >
                Essas regras existem para sua segurança. O receitas.site não substitui o
                acompanhamento médico regular com seu especialista — somos o elo que garante que
                seu tratamento contínuo não pare entre uma consulta e outra.
              </p>
            </SR>
          </div>
        </section>

        {/* ── Garantia ────────────────────────────────────────────── */}
        <section
          className="py-24 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="garantia-heading"
        >
          <div className="max-w-3xl mx-auto text-center">
            <SR>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: EMERALD }}
              >
                Garantia
              </p>
              <h2
                id="garantia-heading"
                className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-10"
                style={{ color: "white" }}
              >
                Sua segurança é <span style={{ color: EMERALD }}>nosso compromisso.</span>
              </h2>
            </SR>

            <SR delay={0.1}>
              <div
                className="relative rounded-3xl p-10 overflow-hidden"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.30)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: "rgba(16,185,129,0.20)",
                    border: "1px solid rgba(16,185,129,0.40)",
                  }}
                >
                  <ShieldCheck className="w-8 h-8" style={{ color: EMERALD }} />
                </div>
                <h3
                  className="text-2xl font-bold tracking-tight mb-4"
                  style={{ color: "white" }}
                >
                  Garantia de Reembolso
                </h3>
                <p
                  className="text-base leading-relaxed max-w-xl mx-auto"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  Se após a teleconsulta o médico avaliar que não é possível renovar sua receita
                  com segurança clínica, devolvemos{" "}
                  <strong style={{ color: "white" }}>100% do valor pago</strong>. Simples assim,
                  sem letras miúdas.
                </p>

                <div
                  className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "rgba(16,185,129,0.18)" }}
                  aria-hidden="true"
                />
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
              <div className="text-center mb-12">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: EMERALD }}
                >
                  Dúvidas
                </p>
                <h2
                  id="faq-heading"
                  className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                  style={{ color: "white" }}
                >
                  Perguntas <span style={{ color: EMERALD }}>frequentes.</span>
                </h2>
              </div>
            </SR>

            <SR delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="rounded-2xl px-6 border-0 overflow-hidden"
                    style={{
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline text-white">
                      <span className="flex items-start gap-4 pr-4">
                        <span
                          className="text-sm font-mono font-bold shrink-0 mt-0.5"
                          style={{ color: EMERALD }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{faq.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent
                      className="pb-5 pl-9 pr-2 text-sm leading-relaxed"
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

        {/* ── CTA Final ───────────────────────────────────────────── */}
        <section
          className="py-20 px-5 md:px-8"
          style={{ borderTop: `1px solid ${CARD_BORDER}` }}
          aria-labelledby="cta-final-title"
        >
          <div className="max-w-3xl mx-auto">
            <SR>
              <div
                className="relative rounded-[1.75rem] p-8 md:p-12 overflow-hidden"
                style={{
                  background: "#0B1014",
                  border: "1px solid rgba(16,185,129,0.20)",
                }}
              >
                <div
                  className="absolute -top-24 -right-20 w-72 h-72 rounded-full blur-[110px] pointer-events-none"
                  style={{ background: "rgba(16,185,129,0.18)" }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4"
                    style={{ color: EMERALD }}
                  >
                    Economia real · Ética médica
                  </p>

                  <h2
                    id="cta-final-title"
                    className="text-2xl md:text-[2rem] font-extrabold tracking-tighter leading-[1.15] mb-4"
                    style={{ color: "white" }}
                  >
                    Seu tratamento pode custar{" "}
                    <span style={{ color: EMERALD }}>até 70% menos</span>.
                  </h2>

                  <p
                    className="text-sm md:text-[0.95rem] leading-relaxed mb-7 max-w-xl"
                    style={{ color: TEXT_MUTED }}
                  >
                    Nossos médicos prescrevem pelo princípio ativo — sem
                    incentivo de laboratório. Você sai com a mesma fórmula da
                    receita azul, livre para escolher o genérico mais barato.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={WA_TRANQUILO}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-variant="B"
                      data-cta-id="cta-final-tranquilo"
                      className="inline-flex items-center justify-center gap-2 flex-1 px-6 py-3.5 rounded-full text-sm md:text-base font-bold transition-all hover:-translate-y-0.5"
                      style={{
                        background: EMERALD,
                        color: "#0F1115",
                        boxShadow: "0 12px 32px -12px rgba(16,185,129,0.55)",
                      }}
                    >
                      Plano Tranquilo · R$ 47/mês
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={WA_AVULSA}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-variant="B"
                      data-cta-id="cta-final-avulsa"
                      className="inline-flex items-center justify-center gap-2 flex-1 px-6 py-3.5 rounded-full text-sm md:text-base font-semibold transition-all hover:-translate-y-0.5"
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.22)",
                        color: "white",
                      }}
                    >
                      Avulsa · R$ 59
                    </a>
                  </div>

                  <p
                    className="text-[11px] md:text-xs mt-5"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    CRM ativo · ICP-Brasil · CFM 2.314/2022 · Reembolso se
                    inviável clinicamente
                  </p>
                </div>
              </div>
            </SR>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer
          className="py-14 px-5 md:px-8"
          style={{
            background: "#0A0C10",
            borderTop: `1px solid ${CARD_BORDER}`,
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10">
              <div>
                <a href="/v-b" className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: EMERALD }}
                  >
                    <Leaf className="w-4 h-4" style={{ color: "#0F1115" }} />
                  </div>
                  <span className="font-bold text-lg tracking-tight text-white">
                    receitas<span style={{ color: EMERALD }}>.site</span>
                  </span>
                </a>
                <p className="text-xs leading-relaxed max-w-xs" style={{ color: TEXT_DIM }}>
                  Renovação de receitas médicas para tratamentos contínuos.
                </p>
              </div>

              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: TEXT_MUTED }}
                >
                  Navegação
                </h4>
                <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <li>
                    <a href="#como-funciona" className="hover:text-white transition-colors">
                      Como Funciona
                    </a>
                  </li>
                  <li>
                    <a href="#precos" className="hover:text-white transition-colors">
                      Preços
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: TEXT_MUTED }}
                >
                  Legal
                </h4>
                <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Termos de Uso
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      LGPD
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: TEXT_MUTED }}
                >
                  Contato
                </h4>
                <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <li>
                    <a
                      href={WA_GENERIC}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contato@receitas.site"
                      className="hover:text-white transition-colors"
                    >
                      contato@receitas.site
                    </a>
                  </li>
                </ul>
                <p className="mt-5 text-xs" style={{ color: TEXT_DIM }}>
                  <span className="block font-semibold mb-0.5" style={{ color: TEXT_MUTED }}>
                    Responsável Técnico
                  </span>
                  Dr. [Nome] — CRM [número]
                </p>
              </div>
            </div>

            <div
              className="mt-12 pt-8"
              style={{ borderTop: `1px solid ${CARD_BORDER}` }}
            >
              <p className="text-xs leading-relaxed" style={{ color: TEXT_DIM }}>
                receitas.site atua conforme a Resolução CFM 2.314/2022 e demais normas
                regulatórias da telemedicina no Brasil. Este serviço não substitui acompanhamento
                médico regular.
              </p>
              <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                © 2026 receitas.site. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>

        {/* ── Scroll to top ───────────────────────────────────────── */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: EMERALD,
                color: "#0F1115",
                boxShadow: "0 12px 30px -8px rgba(16,185,129,0.55)",
              }}
              aria-label="Voltar ao topo"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
