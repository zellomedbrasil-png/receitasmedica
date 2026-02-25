import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  DollarSign,
  HelpCircle,
  ShieldOff,
  CheckCircle2,
  Star,
  ShieldCheck,
  BookOpen,
  User,
  CreditCard,
  Lock,
  Smartphone,
  FileText,
  TrendingDown,
  Pill,
  Stethoscope,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

/* ─── ScrollReveal ──────────────────────────────────────────────────────── */
const ScrollReveal = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── AnimatedNumber ────────────────────────────────────────────────────── */
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setDisplay(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-semibold text-foreground tracking-tighter-custom"
    >
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const painCards = [
  {
    num: "01",
    Icon: DollarSign,
    title: "Orçamento comprometido",
    desc: "Centenas de reais todo mês saindo do seu bolso para medicamentos de uso contínuo que poderiam custar muito menos.",
    dark: false,
  },
  {
    num: "02",
    Icon: HelpCircle,
    title: "O jogo obscuro das farmácias",
    desc: "Genérico, Similar ou Referência? Ninguém explica as regras — e você sempre acaba pagando o preço mais caro.",
    dark: false,
  },
  {
    num: "03",
    Icon: ShieldOff,
    title: "Medo da burocracia do SUS",
    desc: "A maioria desiste de buscar seus direitos antes mesmo de tentar. O sistema foi feito para parecer complicado.",
    dark: true,
  },
];

const solutionCards = [
  {
    highlight: true,
    Icon: BookOpen,
    title: "O Código da Farmácia",
    desc: "Um guia completo e direto ao ponto sobre tudo que o sistema de saúde esconde de você.",
  },
  {
    highlight: false,
    Icon: FileText,
    title: "Receita blindada",
    desc: "O segredo da Receita Médica e como garantir que ela não seja trocada no balcão.",
  },
  {
    highlight: false,
    Icon: Pill,
    title: "Farmácia Popular",
    desc: "A lista de ouro — o que é 100% gratuito e o que tem copagamento, sem surpresas.",
  },
  {
    highlight: false,
    Icon: TrendingDown,
    title: "PBMs e medicamentos",
    desc: "Como acessar programas de laboratórios que as farmácias 'esquecem' de te oferecer.",
  },
];

const testimonials = [
  {
    initials: "MA",
    name: "Maria Aparecida S.",
    city: "São Paulo, SP",
    rating: 5,
    text: "Eu gastava R$ 400 por mês com meu remédio de pressão e diabetes. Depois de ler o guia, descobri que tinha direito a pegar de graça. Mudou minha vida!",
  },
  {
    initials: "CE",
    name: "Carlos Eduardo R.",
    city: "Belo Horizonte, MG",
    rating: 5,
    text: "Nunca soube que existia o programa de laboratório que zerava o custo do meu Ozempic. O guia me mostrou o passo a passo e funcionou na primeira tentativa.",
  },
  {
    initials: "AP",
    name: "Ana Paula F.",
    city: "Curitiba, PR",
    rating: 5,
    text: "Achei que o SUS era complicado demais. O e-book desmontou esse mito com linguagem simples. Hoje pego 3 medicamentos de graça todo mês.",
  },
];

const stats = [
  { value: 500, label: "Leitores satisfeitos", prefix: "+", suffix: "" },
  { value: 300, label: "Economizados em média", prefix: "R$", suffix: "" },
  { value: 4, label: "Avaliação média", prefix: "", suffix: ".9 ★" },
];

const faqs = [
  {
    q: "Funciona para qualquer cidade do Brasil?",
    a: "Sim! O conteúdo aborda os programas federais (SUS, Farmácia Popular, REMUME) e os PBMs que têm cobertura nacional. As regras de acesso valem para qualquer estado.",
  },
  {
    q: "E se meu remédio não estiver no SUS?",
    a: "O guia também ensina como acessar os PBMs dos próprios laboratórios fabricantes, que cobrem muitos medicamentos que não fazem parte do RENAME do SUS — inclusive medicamentos de alto custo e novos.",
  },
  {
    q: "Como recebo o e-book?",
    a: "Após a confirmação do pagamento (imediata para Pix e cartão), você recebe um link de download por e-mail em até 2 minutos. O arquivo é em PDF e pode ser lido no celular, tablet ou computador.",
  },
];

/* ─── CountdownTimer ────────────────────────────────────────────────────── */
function CountdownTimer() {
  const STORAGE_KEY = "ebook_offer_deadline";

  const getOrCreateDeadline = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const deadline = parseInt(stored, 10);
      if (deadline > Date.now()) return deadline;
    }
    // Random between 18min and 23min 59s for urgency
    const seconds = 18 * 60 + Math.floor(Math.random() * (5 * 60 + 59));
    const deadline = Date.now() + seconds * 1000;
    localStorage.setItem(STORAGE_KEY, deadline.toString());
    return deadline;
  };

  const [deadline] = useState(() => getOrCreateDeadline());
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.floor((deadline - Date.now()) / 1000))
  );

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      const left = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [deadline, remaining]);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  const expired = remaining <= 0;

  return (
    <div className={`flex flex-col items-center gap-3 ${expired ? "opacity-60" : ""}`}>
      <p className={`text-xs font-semibold uppercase tracking-widest ${expired ? "text-background/40" : "text-primary"}`}>
        {expired ? "Oferta encerrada" : "⚡ Esta oferta expira em"}
      </p>
      <div className="flex items-center gap-2">
        {[
          { label: "horas", val: pad(h) },
          { label: "min", val: pad(m) },
          { label: "seg", val: pad(s) },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2">
            {i > 0 && (
              <span className={`text-2xl font-bold pb-4 ${expired ? "text-background/30" : "text-background/50"}`}>:</span>
            )}
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-inner transition-colors ${
                  expired
                    ? "bg-white/5 border-white/10"
                    : "bg-white/10 border-white/20"
                }`}
              >
                <span
                  className={`text-2xl font-semibold tabular-nums tracking-tighter-custom ${
                    expired ? "text-background/30" : "text-background"
                  }`}
                >
                  {unit.val}
                </span>
              </div>
              <span className="text-[10px] text-background/40 mt-1.5 uppercase tracking-wider font-medium">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
const Ebook = () => {
  return (
    <div className="min-h-screen bg-background font-sans scroll-smooth">

      {/* ── 1. TRUST BADGE ─────────────────────────────────────────── */}
      <div className="bg-foreground text-background/80 py-2 px-4 text-center text-xs flex items-center justify-center gap-2">
        <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />
        <span>
          Conteúdo exclusivo em parceria com{" "}
          <span className="font-semibold text-primary">receitas.site</span>
        </span>
      </div>

      {/* ── 2. HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute w-[700px] h-[700px] bg-[radial-gradient(circle,hsl(var(--emerald)/0.13)_0%,transparent_70%)] top-[-120px] left-1/2 -translate-x-1/2 z-0 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div className="flex flex-col">
              <ScrollReveal delay={0}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-sm mb-8 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground tracking-tight">
                    E-book · Atualizado 2026
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tighter-custom mb-6 leading-[1.1]">
                  Pare de deixar seu salário{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--emerald-glow))]">
                    no balcão da farmácia.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light">
                  Decifre o método legal e seguro para acessar seus
                  medicamentos pelo SUS, Farmácia Popular e Programas de
                  Laboratório pagando uma{" "}
                  <strong className="text-foreground font-medium">
                    fração do preço.
                  </strong>
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-base shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all gap-2 mb-4"
                >
                  <a href="#oferta">
                    <BookOpen className="w-5 h-5" />
                    Quero Decifrar o Código Agora
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  🔒 Compra 100% segura · Acesso imediato após pagamento
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="mt-10 flex flex-wrap items-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Compra Segura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">SSL Ativo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Garantia 7 Dias</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — E-book mockup */}
            <ScrollReveal delay={0.2} className="flex items-center justify-center">
              <div className="relative">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl scale-110 pointer-events-none" />
                <div className="relative w-52 md:w-64 aspect-[3/4] rounded-3xl bg-foreground border border-white/10 flex flex-col items-center justify-center gap-5 p-8 shadow-2xl overflow-hidden">
                  {/* Inner shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent pointer-events-none" />
                  {/* Glow sphere */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <BookOpen className="w-14 h-14 text-primary relative z-10" strokeWidth={1.5} />
                  <div className="text-center relative z-10">
                    <p className="text-background font-semibold text-sm leading-tight tracking-tight">
                      O CÓDIGO DA FARMÁCIA
                    </p>
                    <p className="text-primary text-xs mt-2 leading-snug font-light">
                      SUS · PBMs · Remédios Baratos
                    </p>
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                    E-BOOK
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3. PROBLEMA ────────────────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">
                Você sente que comprar remédios virou{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--emerald-glow))]">
                  um aluguel mensal?
                </span>
              </h2>
              <p className="text-muted-foreground mt-2 font-light">
                Você não está sozinho — e o problema é real.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {painCards.map((card, i) => (
              <ScrollReveal key={card.num} delay={i * 0.12}>
                <div
                  className={`rounded-3xl p-8 relative overflow-hidden group transition-colors duration-300 h-full ${
                    card.dark
                      ? "bg-slate-900 border border-slate-800"
                      : "bg-secondary border border-border hover:border-primary/30"
                  }`}
                >
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${
                        card.dark
                          ? "bg-white/10 border-white/10 text-white backdrop-blur-md"
                          : "bg-card border-border text-foreground"
                      }`}
                    >
                      <span className="font-bold font-mono text-sm">{card.num}</span>
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 tracking-tight ${
                        card.dark ? "text-white" : "text-foreground"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        card.dark ? "text-slate-400" : "text-muted-foreground"
                      }`}
                    >
                      {card.desc}
                    </p>
                    {card.dark && (
                      <div className="mt-8 inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        O mais comum entre leitores
                      </div>
                    )}
                  </div>
                  <card.Icon
                    className={`absolute -bottom-4 -right-4 w-[140px] h-[140px] -rotate-[15deg] transition-colors duration-500 ${
                      card.dark
                        ? "text-white/5"
                        : "text-slate-200 group-hover:text-primary/10"
                    }`}
                    strokeWidth={0.5}
                  />
                  {card.dark && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SOLUÇÃO ─────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">
                O que você vai descobrir dentro do{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--emerald-glow))]">
                  Código da Farmácia:
                </span>
              </h2>
              <p className="text-muted-foreground mt-2 font-light">
                Informação prática, linguagem simples — sem enrolação.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {solutionCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div
                  className={`rounded-3xl p-8 relative overflow-hidden group transition-colors duration-300 h-full ${
                    card.highlight
                      ? "bg-foreground border border-white/10"
                      : "bg-secondary border border-border hover:border-primary/30"
                  }`}
                >
                  {card.highlight && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  )}
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${
                        card.highlight
                          ? "bg-white/10 border-white/10 backdrop-blur-md"
                          : "bg-card border-border"
                      }`}
                    >
                      {card.highlight ? (
                        <card.Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 tracking-tight ${
                        card.highlight ? "text-white" : "text-foreground"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        card.highlight ? "text-slate-400" : "text-muted-foreground"
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>
                  <card.Icon
                    className={`absolute -bottom-4 -right-4 w-[140px] h-[140px] -rotate-[15deg] transition-colors duration-500 ${
                      card.highlight
                        ? "text-white/5"
                        : "text-slate-200 group-hover:text-primary/10"
                    }`}
                    strokeWidth={0.5}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROVA SOCIAL ────────────────────────────────────────── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <AnimatedNumber
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    {s.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">
                Quem já aplicou o{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--emerald-glow))]">
                  Código da Farmácia:
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.12}>
                <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background text-xs font-bold shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.city}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. AUTORIDADE DO AUTOR ─────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="rounded-3xl bg-card border border-border p-8 md:p-12 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center relative z-10">
                {/* Avatar */}
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/15 rounded-3xl blur-2xl scale-110 pointer-events-none" />
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-foreground border border-white/10 flex items-center justify-center shadow-xl overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
                      <User className="w-14 h-14 text-background/50 relative z-10" strokeWidth={1} />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tighter-custom mb-4">
                    Quem está revelando esses bastidores?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 font-light">
                    Médico Especialista com foco em Medicina Baseada em Evidências e
                    na defesa do paciente inteligente. Ao longo de anos de prática
                    clínica, percebeu que a maioria dos pacientes paga valores
                    abusivos por medicamentos que têm direito de acessar de graça —
                    simplesmente por falta de informação.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                    Em parceria com a plataforma{" "}
                    <strong className="text-foreground font-medium">receitas.site</strong>
                    , decidiu reunir neste guia tudo o que os sistemas de saúde
                    escondem de você.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-secondary border border-border text-foreground text-sm font-medium px-4 py-2 rounded-full">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                    Conteúdo curado pelo receitas.site
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 7. PITCH FINAL E OFERTA ────────────────────────────────── */}
      <section id="oferta" className="py-20 bg-foreground">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium text-background/70 tracking-tight">
                Oferta exclusiva · Somente hoje
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-semibold text-background tracking-tighter-custom mb-5 leading-tight">
              Quanto vale a sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--emerald-glow))]">
                tranquilidade financeira?
              </span>
            </h2>
            <p className="text-background/60 text-lg leading-relaxed mb-12 font-light">
              Este guia vai te fazer economizar centenas de reais já na sua
              próxima ida à farmácia. É um investimento menor que um lanche,
              mas que{" "}
              <strong className="text-background font-medium">
                devolve o seu salário.
              </strong>
            </p>
          </ScrollReveal>

          {/* Price card */}
          <ScrollReveal delay={0.15}>
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 mb-8 overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-background/50 text-sm mb-3 uppercase tracking-wider font-medium">
                  Valor do investimento
                </p>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <span className="text-background/40 line-through text-xl font-light">
                    R$ 49,00
                  </span>
                  <span className="text-6xl font-semibold text-primary tracking-tighter-custom">
                    R$ 9,90
                  </span>
                </div>
                <p className="text-primary text-sm font-medium mb-8">
                  Você economiza R$ 39,10 agora
                </p>

                {/* Countdown */}
                <div className="pt-6 border-t border-white/10">
                  <CountdownTimer />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <Button
              asChild
              size="lg"
              className="w-full rounded-full py-7 text-lg shadow-2xl shadow-primary/30 hover:-translate-y-0.5 transition-all gap-2 mb-6"
            >
              <a href="#">
                <Stethoscope className="w-5 h-5" />
                Comprar o E-book por R$ 9,90 Agora
              </a>
            </Button>

            {/* Guarantee */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-5 py-2.5 rounded-full text-sm text-background/70">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>
                Garantia Incondicional de{" "}
                <strong className="text-background font-medium">7 Dias.</strong>{" "}
                Dinheiro de volta sem perguntas.
              </span>
            </div>
          </ScrollReveal>

          {/* Payment badges */}
          <ScrollReveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {[
                { Icon: CreditCard, label: "Cartão de Crédito" },
                { Icon: Smartphone, label: "Pix" },
                { Icon: Lock, label: "SSL Seguro" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-background/50"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 8. FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">
                Perguntas Frequentes
              </h2>
              <p className="text-muted-foreground mt-2 font-light">
                Tire suas dúvidas antes de decidir.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-card rounded-2xl border border-border px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline tracking-tight">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed font-light">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 9. FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-foreground text-background/60 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Brand */}
          <div className="text-center mb-8">
            <p className="text-background font-semibold tracking-tight">receitas.site</p>
            <p className="text-background/40 text-xs mt-1">O Código da Farmácia</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
            {["Termos de Uso", "Política de Privacidade", "Contato"].map((l) => (
              <a key={l} href="#" className="hover:text-background transition-colors text-xs uppercase tracking-wider font-medium">
                {l}
              </a>
            ))}
          </div>

          {/* Payment badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {["Visa", "Mastercard", "Pix", "Boleto"].map((p) => (
              <span
                key={p}
                className="bg-white/5 border border-white/10 text-background/50 text-xs px-3 py-1 rounded-full"
              >
                {p}
              </span>
            ))}
            <span className="bg-primary/20 border border-primary/30 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" /> SSL Seguro
            </span>
          </div>

          {/* Copyright */}
          <p className="text-center text-background/30 text-sm mb-6">
            © 2026 receitas.site · Todos os direitos reservados.
          </p>

          {/* Disclaimer */}
          <p className="text-center text-background/25 text-[11px] leading-relaxed max-w-2xl mx-auto">
            Este material tem caráter informativo e educativo. Nunca interrompa
            um tratamento ou substitua medicamentos sem a avaliação e
            consentimento do seu médico. O acesso aos programas descritos depende
            de critérios clínicos e disponibilidade em cada município.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Ebook;
