import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  BadgeCheck,
  DollarSign,
  AlertTriangle,
  Search,
  BookOpen,
  CheckCircle2,
  Star,
  ShieldCheck,
  User,
  CreditCard,
  Lock,
  Smartphone,
  TrendingDown,
  Pill,
  FileText,
  Share2,
  ArrowRight,
  Zap,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

/* ─── Helpers ───────────────────────────────────────────────────────────── */
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
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

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
          const dur = 1400;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setDisplay(Math.floor(p * value));
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
    <div ref={ref} className="text-4xl md:text-5xl font-semibold tracking-tighter-custom" style={{ color: "hsl(var(--emerald))" }}>
      {prefix}{display.toLocaleString("pt-BR")}{suffix}
    </div>
  );
}

function CountdownTimer() {
  const KEY = "ebook_offer_deadline_v2";
  const getDeadline = () => {
    const s = localStorage.getItem(KEY);
    if (s) { const d = parseInt(s, 10); if (d > Date.now()) return d; }
    const sec = 18 * 60 + Math.floor(Math.random() * (5 * 60 + 59));
    const d = Date.now() + sec * 1000;
    localStorage.setItem(KEY, d.toString());
    return d;
  };
  const [deadline] = useState(getDeadline);
  const [rem, setRem] = useState(() => Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
  useEffect(() => {
    if (rem <= 0) return;
    const id = setInterval(() => {
      const left = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setRem(left);
      if (left <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [deadline, rem]);
  const pad = (n: number) => String(n).padStart(2, "0");
  const h = Math.floor(rem / 3600);
  const m = Math.floor((rem % 3600) / 60);
  const s = rem % 60;
  const expired = rem <= 0;
  return (
    <div className={`flex flex-col items-center gap-3 ${expired ? "opacity-50" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: expired ? "rgba(255,255,255,0.3)" : "hsl(var(--emerald))" }}>
        {expired ? "Oferta encerrada" : "⚡ Esta oferta expira em"}
      </p>
      <div className="flex items-center gap-2">
        {[{ l: "h", v: pad(h) }, { l: "min", v: pad(m) }, { l: "seg", v: pad(s) }].map((u, i) => (
          <div key={u.l} className="flex items-center gap-2">
            {i > 0 && <span className="text-2xl font-bold pb-4" style={{ color: "rgba(255,255,255,0.25)" }}>:</span>}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
                <span className="text-2xl font-semibold tabular-nums tracking-tighter-custom" style={{ color: expired ? "rgba(255,255,255,0.2)" : "white" }}>{u.v}</span>
              </div>
              <span className="text-[10px] mt-1.5 uppercase tracking-wider font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{u.l}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const painPoints = [
  {
    Icon: DollarSign,
    num: "01",
    title: "O mesmo remédio tem 3 preços diferentes",
    desc: "Genérico, Similar, Referência — e ninguém no balcão te explica qual comprar. A diferença pode ser de 300% no seu bolso.",
    dark: false,
  },
  {
    Icon: AlertTriangle,
    num: "02",
    title: "O 'desconto do CPF' esconde armadilhas",
    desc: "Você dá seu CPF achando que vai economizar. Na prática, está cadastrando seu perfil de consumo para a farmácia vender mais para você.",
    dark: false,
  },
  {
    Icon: Search,
    num: "03",
    title: "Bilhões desperdiçados por falta de informação",
    desc: "O SUS e os laboratórios têm programas que PAGAM por medicamentos de alto custo. Mas quem não sabe pedir, não recebe.",
    dark: true,
  },
];

const chapters = [
  {
    Icon: MapPin,
    title: "O mapa completo das PBMs",
    desc: "Programas de Benefícios em Medicamentos: quem oferece, como acessar e quais são os truques escondidos no contrato.",
    highlight: true,
  },
  {
    Icon: Search,
    title: "Desconto real vs. ilusão de desconto",
    desc: "Como identificar se o 'desconto' que a farmácia oferece é genuíno ou uma armadilha de marketing disfarçada.",
    highlight: false,
  },
  {
    Icon: CheckCircle2,
    title: "Benefícios esquecidos do SUS",
    desc: "Lista atualizada de medicamentos com cobertura federal e o passo a passo para ativá-la sem burocracia.",
    highlight: false,
  },
  {
    Icon: TrendingDown,
    title: "O checklist anti-preço-cheio",
    desc: "Uma lista prática para levar na farmácia e nunca mais pagar mais do que deveria por qualquer medicamento.",
    highlight: false,
  },
];

const testimonials = [
  {
    initials: "MA",
    name: "Maria Aparecida S.",
    city: "São Paulo, SP",
    rating: 5,
    text: "Abriu meus olhos. Economizei R$ 45 na primeira compra depois de ler. Nunca soube que o laboratório tinha programa gratuito.",
  },
  {
    initials: "CE",
    name: "Carlos Eduardo R.",
    city: "Belo Horizonte, MG",
    rating: 5,
    text: "Finalmente entendi para que pedem meu CPF. E aprendi como usar isso a meu favor. Vale cada centavo.",
  },
  {
    initials: "AP",
    name: "Ana Paula F.",
    city: "Curitiba, PR",
    rating: 5,
    text: "Paguei R$ 0,00 no meu Ozempic esse mês. O guia me mostrou o passo a passo do programa do laboratório.",
  },
  {
    initials: "JR",
    name: "João Ricardo M.",
    city: "Recife, PE",
    rating: 5,
    text: "Minha mãe gastava R$ 380/mês em remédios. Hoje paga R$ 60. Enviei o e-book para toda a família.",
  },
  {
    initials: "LS",
    name: "Luciana S.",
    city: "Porto Alegre, RS",
    rating: 5,
    text: "Linguagem simples, sem enrolação. Leitora de 20 minutos que me economizou R$ 300 só no primeiro mês.",
  },
  {
    initials: "RT",
    name: "Roberto T.",
    city: "Goiânia, GO",
    rating: 5,
    text: "Ler isso deveria ser obrigatório antes de qualquer consulta médica. Informação de verdade, sem paternalismo.",
  },
];

const faqs = [
  {
    q: "Isso é legal?",
    a: "100%. O guia não ensina a burlar nenhum sistema — ensina a usar o que já existe. Os programas do SUS, Farmácia Popular e PBMs são regulamentados pelo Ministério da Saúde e pela Anvisa. Você apenas aprende a acessá-los corretamente.",
  },
  {
    q: "Serve para mim que compro pouco na farmácia?",
    a: "Sim! Mesmo quem compra apenas 1 medicamento por mês pode economizar entre R$ 20 e R$ 200 se souber usar as ferramentas certas. O guia é útil para qualquer pessoa que pague alguma coisa na farmácia.",
  },
  {
    q: "É complexo de ler?",
    a: "Não. Foi escrito especialmente para quem não tem formação na área da saúde. Linguagem direta, exemplos práticos e um checklist no final para você usar na próxima compra.",
  },
  {
    q: "E se meu remédio não estiver no SUS?",
    a: "O guia cobre tanto os programas do SUS quanto os PBMs dos laboratórios privados (Roche, Novo Nordisk, AstraZeneca, etc.) — que cobrem medicamentos que o SUS não fornece, incluindo os de alto custo.",
  },
  {
    q: "Como recebo o e-book?",
    a: "Após o pagamento (aprovação imediata para Pix e cartão), você recebe um link de download por e-mail em até 2 minutos. Arquivo PDF compatível com celular, tablet e computador.",
  },
  {
    q: "E se eu não gostar?",
    a: "Garantia total de 7 dias. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro — sem burocracia, sem perguntas.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */
const Ebook = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      setShowFloating(heroRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen font-sans scroll-smooth"
      style={{ background: "#0F1115", color: "#F0F2F5" }}
    >
      {/* ── FLOATING CTA ───────────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={showFloating ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        style={{ pointerEvents: showFloating ? "auto" : "none" }}
      >
        <a
          href="#oferta"
          className="flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{
            background: "hsl(var(--emerald))",
            color: "white",
            boxShadow: "0 8px 32px hsl(var(--emerald)/0.4)",
          }}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          Comprar por <span className="font-bold">R$ 29</span>
          <span
            className="ml-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            Oferta
          </span>
        </a>
      </motion.div>

      {/* ── 1. TRUST BAR ───────────────────────────────────────────── */}
      <div
        className="py-2 px-4 text-center text-xs flex items-center justify-center gap-2"
        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <BadgeCheck className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--emerald))" }} />
        <span style={{ color: "rgba(255,255,255,0.55)" }}>
          Conteúdo oficial em parceria com{" "}
          <span className="font-semibold" style={{ color: "hsl(var(--emerald))" }}>receitas.site</span>
          {" "}· Mais de <strong style={{ color: "rgba(255,255,255,0.8)" }}>500 leitores</strong> em 2026
        </span>
      </div>

      {/* ── 2. HERO ────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Radial glow bg */}
        <div
          className="absolute w-[900px] h-[900px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--emerald)/0.10) 0%, transparent 65%)" }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* Left copy */}
            <div className="flex flex-col">
              {/* Eyebrow badge */}
              <SR delay={0}>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 w-fit"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <Eye className="w-3.5 h-3.5" style={{ color: "hsl(var(--emerald))" }} />
                  <span className="text-xs font-medium tracking-tight" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Informação que deveria ser pública.
                  </span>
                </div>
              </SR>

              <SR delay={0.08}>
                <h1
                  className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tighter-custom leading-[1.08] mb-6"
                  style={{ color: "white" }}
                >
                  Você está pagando mais caro por remédios…{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
                  >
                    e não é por acaso.
                  </span>
                </h1>
              </SR>

              <SR delay={0.16}>
                <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                  Existe um sistema invisível por trás do SUS, das PBMs e das farmácias que dita o seu gasto mensal.{" "}
                  <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                    Descubra como ele funciona — e como hackear esse jogo a seu favor.
                  </strong>
                </p>
              </SR>

              <SR delay={0.22}>
                <a
                  href="#oferta"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-bold w-full sm:w-auto transition-all hover:-translate-y-0.5 mb-4"
                  style={{
                    background: "hsl(var(--emerald))",
                    color: "white",
                    boxShadow: "0 0 40px hsl(var(--emerald)/0.35), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <Lock className="w-4 h-4" />
                  Quero Acessar o Código Agora
                </a>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  ✔ Acesso imediato no e-mail &nbsp;·&nbsp; ✔ Garantia de 7 dias &nbsp;·&nbsp; ⭐ 4.9/5 Avaliações
                </p>
              </SR>

              <SR delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  {[
                    { Icon: ShieldCheck, label: "Compra Segura" },
                    { Icon: Lock, label: "SSL Ativo" },
                    { Icon: BadgeCheck, label: "Garantia 7 Dias" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity">
                      <Icon className="w-3.5 h-3.5" style={{ color: "hsl(var(--emerald))" }} />
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </SR>
            </div>

            {/* Right — book mockup */}
            <SR delay={0.18} className="flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl scale-110 pointer-events-none"
                  style={{ background: "hsl(var(--emerald)/0.18)" }}
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-52 md:w-64 aspect-[3/4] rounded-3xl flex flex-col items-center justify-center gap-5 p-8 shadow-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, #1a1e27, #0F1115)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {/* Inner shine */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)" }}
                  />
                  {/* Top glow sphere */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                    style={{ background: "hsl(var(--emerald)/0.25)" }}
                  />
                  <BookOpen
                    className="w-14 h-14 relative z-10"
                    style={{ color: "hsl(var(--emerald))" }}
                    strokeWidth={1.5}
                  />
                  <div className="text-center relative z-10 px-2">
                    <p className="font-bold text-sm leading-tight tracking-tight uppercase" style={{ color: "white" }}>
                      O Código da Farmácia
                    </p>
                    <p className="text-xs mt-2 leading-snug font-light" style={{ color: "hsl(var(--emerald))" }}>
                      SUS · PBMs · Remédios Baratos
                    </p>
                  </div>
                  {/* Price badge */}
                  <div
                    className="absolute bottom-4 right-4 text-[11px] font-bold px-3 py-1.5 rounded-full z-10"
                    style={{ background: "hsl(var(--emerald))", color: "white" }}
                  >
                    R$ 29
                  </div>
                  {/* Strikethrough */}
                  <div
                    className="absolute bottom-4 left-4 text-[11px] font-medium line-through z-10"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    R$ 97
                  </div>
                </motion.div>
              </div>
            </SR>
          </div>
        </div>
      </section>

      {/* ── 3. DOR INVISÍVEL ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#14181F", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SR>
            <div className="mb-16">
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tighter-custom mb-3"
                style={{ color: "white" }}
              >
                O balcão da farmácia{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
                >
                  não é transparente.
                </span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
                E o consumidor comum perde dinheiro sem perceber — todo mês.
              </p>
            </div>
          </SR>

          <div className="grid md:grid-cols-3 gap-5">
            {painPoints.map((card, i) => (
              <SR key={card.num} delay={i * 0.1}>
                <div
                  className="rounded-3xl p-8 relative overflow-hidden h-full transition-all duration-300 group"
                  style={
                    card.dark
                      ? { background: "linear-gradient(145deg, #1C2030, #14181F)", border: "1px solid rgba(255,255,255,0.08)" }
                      : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }
                  }
                >
                  {card.dark && (
                    <div
                      className="absolute top-0 right-0 w-60 h-60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                      style={{ background: "hsl(var(--emerald)/0.18)" }}
                    />
                  )}
                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 text-xs font-bold font-mono"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}
                    >
                      {card.num}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ color: "white" }}>
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {card.desc}
                    </p>
                    {card.dark && (
                      <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--emerald))" }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(var(--emerald))" }} />
                        O mais relatado pelos leitores
                      </div>
                    )}
                  </div>
                  <card.Icon
                    className="absolute -bottom-5 -right-5 w-[140px] h-[140px] -rotate-[15deg] transition-opacity duration-500 pointer-events-none"
                    strokeWidth={0.5}
                    style={{ color: card.dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.04)" }}
                  />
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. REVELAÇÃO ───────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F1115" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SR>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter-custom mb-3" style={{ color: "white" }}>
                O que você vai descobrir{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
                >
                  nas próximas páginas:
                </span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>Informação prática, sem jargão — só o que funciona.</p>
            </div>
          </SR>

          <div className="grid md:grid-cols-2 gap-5">
            {chapters.map((c, i) => (
              <SR key={c.title} delay={i * 0.09}>
                <div
                  className="rounded-3xl p-8 relative overflow-hidden h-full transition-all duration-300 group"
                  style={
                    c.highlight
                      ? { background: "linear-gradient(145deg, #1a2535, #0F1520)", border: "1px solid rgba(255,255,255,0.09)" }
                      : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }
                  }
                >
                  {c.highlight && (
                    <div
                      className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                      style={{ background: "hsl(var(--emerald)/0.15)" }}
                    />
                  )}
                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                    >
                      {c.highlight
                        ? <BookOpen className="w-5 h-5" style={{ color: "hsl(var(--emerald))" }} strokeWidth={1.5} />
                        : <CheckCircle2 className="w-5 h-5" style={{ color: "hsl(var(--emerald))" }} />
                      }
                    </div>
                    <h3 className="text-lg font-semibold mb-2 tracking-tight" style={{ color: "white" }}>{c.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{c.desc}</p>
                  </div>
                  <c.Icon
                    className="absolute -bottom-5 -right-5 w-[130px] h-[130px] -rotate-[15deg] pointer-events-none"
                    strokeWidth={0.4}
                    style={{ color: "rgba(255,255,255,0.04)" }}
                  />
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ANCORAGEM DE VALOR ──────────────────────────────────── */}
      <section className="py-20" style={{ background: "#14181F", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <SR>
            <div
              className="rounded-3xl p-8 md:p-12 relative overflow-hidden text-center"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, hsl(var(--emerald)/0.10), transparent 60%)" }}
              />
              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
                  style={{ background: "hsl(var(--emerald)/0.15)", border: "1px solid hsl(var(--emerald)/0.3)", color: "hsl(var(--emerald))" }}
                >
                  <Zap className="w-3.5 h-3.5" /> Faça a conta
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter-custom mb-6" style={{ color: "white" }}>
                  Se você gasta R$ 200/mês na farmácia,<br />
                  <span style={{ color: "hsl(var(--emerald))" }}>não saber essas regras te custa R$ 2.400 por ano.</span>
                </h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
                  O acesso a esse conhecimento custa{" "}
                  <strong style={{ color: "white", fontWeight: 600 }}>menos que um xarope.</strong>{" "}
                  Um único desconto descoberto já paga o guia — e sobra troco.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Custo do guia", value: "R$ 29", sub: "pagamento único" },
                    { label: "Economia média/mês", value: "R$ 120", sub: "relatada por leitores" },
                    { label: "ROI médio", value: "413%", sub: "só no 1º mês" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl p-5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <p className="text-2xl font-bold tracking-tight mb-1" style={{ color: "hsl(var(--emerald))" }}>{item.value}</p>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>{item.label}</p>
                      <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SR>
        </div>
      </section>

      {/* ── 6. SOCIAL PROOF ────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0F1115" }}>
        <div className="max-w-5xl mx-auto px-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-8 mb-20">
            {[
              { value: 500, label: "Leitores satisfeitos", prefix: "+", suffix: "" },
              { value: 300, label: "Economizados em média/mês", prefix: "R$ ", suffix: "" },
              { value: 4, label: "Avaliação média", prefix: "", suffix: ".9 ★" },
            ].map((s, i) => (
              <SR key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  <p className="text-sm font-medium mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                </div>
              </SR>
            ))}
          </div>

          <SR>
            <h2 className="text-3xl font-extrabold tracking-tighter-custom mb-12" style={{ color: "white" }}>
              Quem já aplicou o{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
              >
                Código da Farmácia:
              </span>
            </h2>
          </SR>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <SR key={t.name} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-6 flex flex-col h-full transition-all duration-300 hover:border-opacity-20"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4" style={{ fill: "hsl(var(--emerald))", color: "hsl(var(--emerald))" }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ background: "hsl(var(--emerald)/0.2)", color: "hsl(var(--emerald))", border: "1px solid hsl(var(--emerald)/0.3)" }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.city}</p>
                    </div>
                  </div>
                </div>
              </SR>
            ))}
          </div>

          {/* Share trigger */}
          <SR delay={0.3}>
            <div
              className="mt-16 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(var(--emerald)/0.15)", border: "1px solid hsl(var(--emerald)/0.25)" }}
              >
                <Share2 className="w-5 h-5" style={{ color: "hsl(var(--emerald))" }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-0.5" style={{ color: "white" }}>
                  Conhece alguém que gasta muito na farmácia?
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Envie este link para familiares e amigos — você pode ajudar a economizar centenas de reais por mês.
                </p>
              </div>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Achei esse guia incrível sobre como economizar na farmácia usando SUS e PBMs: https://receitasmedica.lovable.app/ebook")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shrink-0 transition-all hover:opacity-90"
                style={{ background: "hsl(var(--emerald))", color: "white" }}
              >
                <MessageCircle className="w-4 h-4" />
                Compartilhar no WhatsApp
              </a>
            </div>
          </SR>
        </div>
      </section>

      {/* ── 7. AUTORIDADE ──────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#14181F", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <SR>
            <div
              className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/4"
                style={{ background: "hsl(var(--emerald)/0.07)" }}
              />
              <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center relative z-10">
                {/* Avatar */}
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl blur-2xl scale-110 pointer-events-none" style={{ background: "hsl(var(--emerald)/0.12)" }} />
                    <div
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center overflow-hidden"
                      style={{ background: "linear-gradient(145deg, #1a2535, #0F1115)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl" style={{ background: "hsl(var(--emerald)/0.2)" }} />
                      <User className="w-14 h-14 relative z-10" style={{ color: "rgba(255,255,255,0.25)" }} strokeWidth={1} />
                    </div>
                  </div>
                </div>
                {/* Text */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter-custom mb-4" style={{ color: "white" }}>
                    Quem está revelando esses bastidores?
                  </h2>
                  <p className="leading-relaxed mb-4 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Médico Especialista com foco em Medicina Baseada em Evidências e na defesa do paciente inteligente. Após anos de prática clínica, percebeu que a maioria dos pacientes paga valores abusivos por medicamentos que tem direito de acessar de graça — simplesmente por falta de informação.
                  </p>
                  <p className="leading-relaxed mb-6 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Em parceria com a plataforma{" "}
                    <strong style={{ color: "white", fontWeight: 500 }}>receitas.site</strong>
                    , reuniu neste guia tudo o que os sistemas de saúde escondem de você.
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.6)" }}
                  >
                    <BadgeCheck className="w-4 h-4" style={{ color: "hsl(var(--emerald))" }} />
                    Conteúdo curado pelo receitas.site
                  </div>
                </div>
              </div>
            </div>
          </SR>
        </div>
      </section>

      {/* ── 8. PITCH FINAL / OFERTA ────────────────────────────────── */}
      <section id="oferta" className="py-24 relative overflow-hidden" style={{ background: "#070A0D" }}>
        {/* Big glow bg */}
        <div
          className="absolute w-[900px] h-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--emerald)/0.08) 0%, transparent 60%)" }}
        />

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <SR>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(var(--emerald))" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(var(--emerald))" }} />
              </span>
              <span className="text-xs font-medium tracking-tight" style={{ color: "rgba(255,255,255,0.55)" }}>
                Oferta exclusiva · Somente hoje
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter-custom mb-5 leading-tight" style={{ color: "white" }}>
              Quanto vale a sua{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
              >
                tranquilidade financeira?
              </span>
            </h2>
            <p className="text-lg leading-relaxed mb-12 font-light" style={{ color: "rgba(255,255,255,0.45)" }}>
              Este guia vai te fazer economizar centenas de reais já na sua próxima ida à farmácia. É um investimento menor que um lanche, mas que{" "}
              <strong style={{ color: "white", fontWeight: 500 }}>devolve o seu salário.</strong>
            </p>
          </SR>

          {/* Price card */}
          <SR delay={0.15}>
            <div
              className="rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                style={{ background: "hsl(var(--emerald)/0.18)" }}
              />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Valor do investimento
                </p>
                <div className="flex items-center justify-center gap-5 mb-3">
                  <span className="text-xl font-light line-through" style={{ color: "rgba(255,255,255,0.3)" }}>R$ 97,00</span>
                  <span
                    className="text-6xl font-extrabold tracking-tighter-custom"
                    style={{ color: "hsl(var(--emerald))" }}
                  >
                    R$ 29
                  </span>
                </div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-8"
                  style={{ background: "hsl(var(--emerald)/0.15)", color: "hsl(var(--emerald))" }}
                >
                  Você economiza R$ 68 agora
                </div>
                <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <CountdownTimer />
                </div>
              </div>
            </div>
          </SR>

          {/* CTA button */}
          <SR delay={0.2}>
            <a
              href="#"
              className="flex items-center justify-center gap-3 w-full rounded-full py-5 text-lg font-bold transition-all hover:-translate-y-0.5 mb-6"
              style={{
                background: "hsl(var(--emerald))",
                color: "white",
                boxShadow: "0 0 50px hsl(var(--emerald)/0.4), 0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              <BookOpen className="w-5 h-5" />
              Comprar o E-book por R$ 29 Agora
              <ArrowRight className="w-5 h-5" />
            </a>

            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--emerald))" }} />
              <span>
                Garantia Incondicional de{" "}
                <strong style={{ color: "white", fontWeight: 500 }}>7 Dias.</strong>{" "}
                Dinheiro de volta sem perguntas.
              </span>
            </div>
          </SR>

          {/* Payment methods */}
          <SR delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {[
                { Icon: CreditCard, label: "Cartão de Crédito" },
                { Icon: Smartphone, label: "Pix" },
                { Icon: Lock, label: "SSL Seguro" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </SR>
        </div>
      </section>

      {/* ── 9. FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F1115" }}>
        <div className="max-w-2xl mx-auto px-6">
          <SR>
            <h2 className="text-3xl font-extrabold tracking-tighter-custom mb-3" style={{ color: "white" }}>
              Perguntas Frequentes
            </h2>
            <p className="mb-12 font-light" style={{ color: "rgba(255,255,255,0.4)" }}>Tire suas dúvidas antes de decidir.</p>
          </SR>

          <SR delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-2xl px-6"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <AccordionTrigger
                    className="text-left font-semibold hover:no-underline tracking-tight"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="leading-relaxed font-light"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SR>

          <SR delay={0.2}>
            <div className="mt-12 text-center">
              <a
                href="#oferta"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-all hover:-translate-y-0.5"
                style={{
                  background: "hsl(var(--emerald))",
                  color: "white",
                  boxShadow: "0 0 30px hsl(var(--emerald)/0.3)",
                }}
              >
                Quero o E-book Agora
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </SR>
        </div>
      </section>

      {/* ── 10. FOOTER ─────────────────────────────────────────────── */}
      <footer className="py-14 px-6" style={{ background: "#070A0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-semibold tracking-tight" style={{ color: "white" }}>receitas.site</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>O Código da Farmácia</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {["Termos de Uso", "Política de Privacidade", "Contato"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs uppercase tracking-wider font-medium hover:opacity-80 transition-opacity"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {l}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {["Visa", "Mastercard", "Pix", "Boleto"].map((p) => (
              <span
                key={p}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
              >
                {p}
              </span>
            ))}
            <span
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full"
              style={{ background: "hsl(var(--emerald)/0.12)", border: "1px solid hsl(var(--emerald)/0.25)", color: "hsl(var(--emerald))" }}
            >
              <Lock className="w-3 h-3" /> SSL Seguro
            </span>
          </div>
          <p className="text-center mb-4" style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>
            © 2026 receitas.site · Todos os direitos reservados.
          </p>
          <p
            className="text-center leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.18)", fontSize: "11px" }}
          >
            Este produto não garante resultados financeiros específicos e não substitui orientação médica. O conteúdo é estritamente informativo e educativo. Nunca interrompa um tratamento ou substitua medicamentos sem avaliação do seu médico. O acesso aos programas descritos depende de critérios clínicos e disponibilidade em cada município.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Ebook;
