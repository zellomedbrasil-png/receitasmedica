import { useEffect, useRef, useState } from "react";
import ebookCover from "@/assets/capa-ebook.png";
import ebookHeroVideo from "@/assets/ebook-hero.mp4";
import ebookCover3D from "@/assets/capa-ebook-3d.png";
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
  CreditCard,
  Lock,
  Smartphone,
  TrendingDown,
  FileText,
  ArrowRight,
  MapPin,
  Stethoscope,
  GraduationCap,
  Award,
  Clock,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div ref={ref} className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ color: "hsl(var(--emerald))" }}>
      {prefix}{display.toLocaleString("pt-BR")}{suffix}
    </div>
  );
}

/* ─── Countdown Timer — deadline fixo de 10min ──────────────────────────── */
function CountdownTimer() {
  const KEY = "ebook_offer_deadline_v3";
  const getDeadline = () => {
    const s = localStorage.getItem(KEY);
    if (s) {
      const d = parseInt(s, 10);
      if (d > Date.now()) return d;
    }
    // Deadline fixo: 10 minutos
    const d = Date.now() + 10 * 60 * 1000;
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
    <div className={`flex flex-col items-center gap-3 ${expired ? "opacity-40" : ""}`}>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: expired ? "rgba(255,255,255,0.3)" : "hsl(var(--emerald))" }} />
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: expired ? "rgba(255,255,255,0.3)" : "hsl(var(--emerald))" }}>
          {expired ? "Oferta encerrada" : "Oferta válida por"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {[{ l: "horas", v: pad(h) }, { l: "min", v: pad(m) }, { l: "seg", v: pad(s) }].map((u, i) => (
          <div key={u.l} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-xl font-bold pb-4" style={{ color: "rgba(255,255,255,0.2)" }}>:</span>
            )}
            <div className="flex flex-col items-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <span className="text-xl font-bold tabular-nums" style={{ color: expired ? "rgba(255,255,255,0.2)" : "white" }}>
                  {u.v}
                </span>
              </div>
              <span className="text-[10px] mt-1.5 uppercase tracking-wider font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
                {u.l}
              </span>
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
    title: "O mesmo remédio tem até 3 preços diferentes no balcão",
    desc: "Genérico, Similar ou Referência — e ninguém te explica qual escolher. A diferença pode chegar a 300% sem que você perceba.",
    dark: false,
  },
  {
    Icon: AlertTriangle,
    num: "02",
    title: "O 'desconto do CPF' é uma armadilha disfarçada",
    desc: "Você acredita que está economizando. Na realidade, está entregando seu perfil de consumo para que a farmácia venda ainda mais para você.",
    dark: false,
  },
  {
    Icon: Search,
    num: "03",
    title: "Bilhões desperdiçados por pura falta de informação",
    desc: "O SUS e grandes laboratórios mantêm programas que cobrem medicamentos de alto custo. Quem não sabe como pedir, simplesmente não recebe.",
    dark: true,
  },
];

const chapters = [
  {
    Icon: MapPin,
    title: "O mapa completo das PBMs",
    desc: "Programas de Benefícios em Medicamentos: quem oferece, como acessar e quais cláusulas estão escondidas nos contratos — reveladas pela equipe do receitas.site.",
    highlight: true,
  },
  {
    Icon: Search,
    title: "Desconto real vs. ilusão de desconto",
    desc: "Como identificar na hora se o 'desconto' oferecido é genuíno ou uma estratégia de marketing da farmácia para aumentar o ticket médio.",
    highlight: false,
  },
  {
    Icon: CheckCircle2,
    title: "Benefícios esquecidos do SUS",
    desc: "Lista atualizada de medicamentos com cobertura federal gratuita e o passo a passo para ativá-la — sem burocracia, sem fila.",
    highlight: false,
  },
  {
    Icon: TrendingDown,
    title: "O checklist anti-preço-cheio",
    desc: "Um protocolo prático desenvolvido com o receitas.site para você levar na farmácia e nunca mais pagar acima do necessário.",
    highlight: false,
  },
];

const testimonials = [
  {
    initials: "MA",
    name: "Maria Aparecida S.",
    city: "São Paulo, SP",
    rating: 5,
    text: "Abriu meus olhos. Economizei R$ 45 já na primeira compra. Nunca soube que o laboratório tinha um programa gratuito — o receitas.site deveria divulgar isso mais.",
  },
  {
    initials: "JR",
    name: "João Ricardo M.",
    city: "Recife, PE",
    rating: 5,
    text: "Minha mãe gastava R$ 380/mês em remédios. Hoje paga R$ 60. Enviei para toda a família. O receitas.site fez um trabalho investigativo sério aqui.",
  },
  {
    initials: "LS",
    name: "Luciana S.",
    city: "Porto Alegre, RS",
    rating: 5,
    text: "Linguagem direta, sem enrolação. Uma leitura de 20 minutos que me economizou mais de R$ 300 só no primeiro mês. Impressionante.",
  },
];

const faqs = [
  {
    category: "Sobre o conteúdo",
    q: "O conteúdo é baseado em fontes oficiais?",
    a: "Sim. Tudo que está no guia é extraído de portarias do Ministério da Saúde, regulamentos da Anvisa e dos próprios sites dos laboratórios. Não há nada especulativo — são caminhos que existem, são públicos, mas que ninguém te ensina a usar.",
  },
  {
    category: "Sobre o conteúdo",
    q: "Serve para qualquer tipo de medicamento?",
    a: "O guia cobre desde medicamentos de uso contínuo (hipertensão, diabetes, colesterol) até os de alto custo fora da lista do SUS — incluindo programas de PBMs de laboratórios como Roche, Novo Nordisk e AstraZeneca. Se você paga algo na farmácia, há algo para você aqui.",
  },
  {
    category: "Sobre o conteúdo",
    q: "Precisa ter formação em saúde para entender?",
    a: "Não. O guia foi escrito com linguagem direta e exemplos práticos. Há um checklist ao final para você usar na próxima compra — sem precisar decifrar nada.",
  },
  {
    category: "Compra e acesso",
    q: "Como recebo o e-book depois que comprar?",
    a: "O acesso é imediato. Após a confirmação do pagamento — via Pix (aprovação em segundos) ou cartão — você recebe o link de download no e-mail em até 2 minutos. Formato PDF, compatível com celular, tablet e computador.",
  },
  {
    category: "Compra e acesso",
    q: "E se eu não ficar satisfeito?",
    a: "Garantia incondicional de 7 dias. Se por qualquer motivo o material não atender às suas expectativas, devolvemos 100% do valor pago — sem burocracia, sem perguntas, sem processo complicado.",
  },
  {
    category: "Parceria",
    q: "O que é o receitas.site e qual a relação com este e-book?",
    a: "O receitas.site é uma plataforma de saúde digital com mais de 500 mil usuários mensais, especializada em renovação de receitas e acesso a serviços médicos online. Este e-book é uma publicação oficial em parceria com a plataforma — todo o conteúdo foi desenvolvido pela equipe editorial e revisado por profissionais de saúde cadastrados.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */
const Ebook = () => {
  return (
    <div
      className="min-h-screen font-sans scroll-smooth"
      style={{ background: "#0F1115", color: "#F0F2F5" }}
    >

      {/* ── 1. TRUST BAR ─────────────────────────────────────────────────── */}
      <div
        className="py-2.5 px-4 text-center text-xs flex items-center justify-center gap-2 flex-wrap"
        style={{ background: "hsl(var(--emerald)/0.10)", borderBottom: "1px solid hsl(var(--emerald)/0.20)" }}
      >
        <BadgeCheck className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--emerald))" }} />
        <span style={{ color: "rgba(255,255,255,0.65)" }}>
          Conteúdo oficial em parceria com{" "}
          <span className="font-semibold" style={{ color: "hsl(var(--emerald))" }}>receitas.site</span>
        </span>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
        <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.55)" }}>
          <Star className="w-3 h-3" style={{ fill: "hsl(var(--emerald))", color: "hsl(var(--emerald))" }} />
          <strong style={{ color: "white" }}>4.9</strong> de 5
        </span>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
        <span className="flex items-center gap-1 font-medium" style={{ color: "rgba(255, 200, 100, 0.80)" }}>
          <AlertTriangle className="w-3 h-3 shrink-0" />
          Disponibilidade limitada — pode ser removido a qualquer momento
        </span>
      </div>

      {/* ── 2. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
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
                    Publicação oficial receitas.site — conteúdo que pode sair do ar.
                  </span>
                </div>
              </SR>

              <SR delay={0.08}>
                <h1
                  className="text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.08] mb-6"
                  style={{ color: "white" }}
                >
                  Você paga mais caro por remédios do que deveria…{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
                  >
                    e o sistema conta com isso.
                  </span>
                </h1>
              </SR>

              <SR delay={0.16}>
                <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                  A equipe do receitas.site mapeou um sistema invisível por trás do SUS, das PBMs e das farmácias — e ele está ditando quanto você gasta todo mês.{" "}
                  <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                    Descubra como funciona e como virar esse jogo a seu favor.
                  </strong>
                </p>
              </SR>

              <SR delay={0.22}>
                <a
                  href="#oferta"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold w-full sm:w-auto transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-95 mb-4"
                  style={{
                    background: "hsl(var(--emerald))",
                    color: "white",
                    boxShadow: "0 0 40px hsl(var(--emerald)/0.35), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  Quero Acessar o Código Agora
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  ✔ Acesso imediato no e-mail &nbsp;·&nbsp; ✔ Garantia de 7 dias &nbsp;·&nbsp; ⭐ 4.9/5
                </p>
              </SR>

              <SR delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  {[
                    { Icon: ShieldCheck, label: "Compra Segura" },
                    { Icon: Lock, label: "SSL Ativo" },
                    { Icon: BadgeCheck, label: "Garantia 7 Dias" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 opacity-40 hover:opacity-70 transition-opacity">
                      <Icon className="w-3.5 h-3.5" style={{ color: "hsl(var(--emerald))" }} />
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </SR>
            </div>

            {/* Right — book cover */}
            <SR delay={0.18} className="flex items-center justify-center">
              <div className="relative">
                {/* Ambient glow behind cover */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl scale-125 pointer-events-none"
                  style={{ background: "hsl(var(--emerald)/0.20)" }}
                />
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(16,185,129,0.25)) drop-shadow(0 8px 24px rgba(0,0,0,0.7))" }}
                >
                  <video
                    src={ebookHeroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-52 md:w-72 rounded-2xl object-cover"
                    style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                  />
                  {/* Shine overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)" }}
                  />
                </motion.div>
              </div>
            </SR>
          </div>
        </div>
      </section>

      {/* ── 3. DOR INVISÍVEL ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#14181F", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SR>
            <div className="mb-16">
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
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
                A pesquisa do receitas.site revela: o brasileiro médio perde dinheiro sem perceber — todo mês.
              </p>
            </div>
          </SR>

          <div className="grid md:grid-cols-3 gap-5">
            {painPoints.map((card, i) => (
              <SR key={card.num} delay={i * 0.1}>
                <div
                  className="rounded-3xl p-8 relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
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
                    className="absolute -bottom-5 -right-5 w-[140px] h-[140px] -rotate-[15deg] pointer-events-none"
                    strokeWidth={0.5}
                    style={{ color: "rgba(255,255,255,0.04)" }}
                  />
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. REVELAÇÃO ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F1115" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SR>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: "white" }}>
                O que o receitas.site{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
                >
                  vai revelar para você:
                </span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>Informação apurada, sem jargão — só o que realmente funciona na prática.</p>
            </div>
          </SR>

          <div className="grid md:grid-cols-2 gap-5">
            {chapters.map((c, i) => (
              <SR key={c.title} delay={i * 0.09}>
                <div
                  className="rounded-3xl p-8 relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
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


      {/* ── 6. SOCIAL PROOF ──────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0F1115" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SR>
            <h2 className="text-3xl font-extrabold tracking-tight mb-12" style={{ color: "white" }}>
              O que leitores do receitas.site{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
              >
                estão economizando:
              </span>
            </h2>
          </SR>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <SR key={t.name} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
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
        </div>
      </section>

      {/* ── 7. AUTORIDADE ────────────────────────────────────────────────── */}
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
              <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start relative z-10">
                {/* Credentials column */}
                <div className="flex flex-col items-center md:items-start gap-4 min-w-[180px]">
                  {/* Avatar */}
                  <div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center"
                    style={{ background: "linear-gradient(145deg, hsl(var(--emerald)/0.2), hsl(var(--emerald)/0.05))", border: "1px solid hsl(var(--emerald)/0.25)" }}
                  >
                    <Stethoscope className="w-10 h-10 md:w-14 md:h-14" style={{ color: "hsl(var(--emerald))" }} strokeWidth={1.5} />
                  </div>
                  {/* Credential badges */}
                  <div className="flex flex-col gap-2 w-full">
                    {[
                      { Icon: GraduationCap, label: "Medicina Baseada em Evidências" },
                      { Icon: Award, label: "Especialista em Saúde Pública" },
                      { Icon: FileText, label: "receitas.site — Fundador" },
                    ].map(({ Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--emerald))" }} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: "hsl(var(--emerald))" }}
                  >
                    A investigação por trás do receitas.site
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4" style={{ color: "white" }}>
                    Médico. Investigador. Do seu lado.
                  </h2>
                  <p className="leading-relaxed mb-4 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Após anos de prática clínica, ficou evidente que a maioria dos pacientes paga valores abusivos por medicamentos aos quais têm direito gratuito — simplesmente porque ninguém conta essa informação.
                  </p>
                   <p className="leading-relaxed mb-6 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Em parceria com o{" "}
                    <strong style={{ color: "white", fontWeight: 500 }}>receitas.site</strong>
                    {" "}— plataforma de saúde digital especializada em acesso a serviços médicos online —, reuniu neste guia tudo o que farmácias, laboratórios e operadoras preferem que você não saiba.
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.6)" }}
                  >
                    <BadgeCheck className="w-4 h-4" style={{ color: "hsl(var(--emerald))" }} />
                    Publicação oficial · Parceria receitas.site
                  </div>
                </div>
              </div>
            </div>
          </SR>
        </div>
      </section>

      {/* ── CROSS-PROMOTION receitas.site ────────────────────────────────── */}
      <section className="py-10 relative overflow-hidden" style={{ background: "#0E1117" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 120px hsl(var(--emerald)/0.04)" }}
        />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SR>
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-7"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 60px hsl(var(--emerald)/0.06)",
              }}
            >
              {/* Left zone */}
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(var(--emerald)/0.12)", border: "1px solid hsl(var(--emerald)/0.25)" }}
                >
                  <FileText className="w-5 h-5" style={{ color: "hsl(var(--emerald))" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "hsl(var(--emerald))" }}>
                    receitas.site
                  </p>
                  <p className="text-base font-bold text-white leading-snug">
                    Precisa renovar uma receita médica?
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Teleconsulta em até 30 minutos. Receita digital válida em todo o Brasil.
                  </p>
                </div>
              </div>

              {/* Right zone — CTA */}
              <a
                href="https://receitas.site"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "hsl(var(--emerald)/0.15)",
                  border: "1px solid hsl(var(--emerald)/0.4)",
                  color: "hsl(var(--emerald))",
                }}
              >
                Renovar minha Receita
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </SR>
        </div>
      </section>

      {/* ── 8. PITCH FINAL / OFERTA ──────────────────────────────────────── */}
      <section id="oferta" className="py-24 relative overflow-hidden" style={{ background: "#070A0D" }}>
        {/* Big glow bg */}
        <div
          className="absolute w-[900px] h-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--emerald)/0.08) 0%, transparent 60%)" }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Section header — centered above grid */}
          <SR className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(var(--emerald))" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(var(--emerald))" }} />
              </span>
              <span className="text-xs font-medium tracking-tight" style={{ color: "rgba(255,255,255,0.55)" }}>
                Oferta com desconto · Acesso imediato
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight" style={{ color: "white" }}>
              Quanto vale a sua{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}
              >
                tranquilidade financeira?
              </span>
            </h2>
            <p className="text-lg leading-relaxed font-light max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              A equipe do receitas.site compilou em poucas páginas o que pode te economizar centenas de reais já na próxima ida à farmácia. Menor que um lanche —{" "}
              <strong style={{ color: "white", fontWeight: 500 }}>mas que devolve o seu dinheiro na primeira aplicação.</strong>
            </p>
          </SR>

          {/* 2-column grid: book 3D | price card */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — 3D book mockup */}
            <SR delay={0.08} className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Deep radial glow — matches the teal/emerald bg of the book image */}
                <div
                  className="absolute w-[110%] h-[110%] rounded-full blur-3xl pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 70%, rgba(6,50,35,0.95) 0%, rgba(7,10,13,0.0) 70%)",
                    zIndex: 0,
                  }}
                />
                {/* Outer ambient glow */}
                <div
                  className="absolute w-[85%] h-[85%] rounded-full blur-2xl pointer-events-none"
                  style={{ background: "hsl(var(--emerald)/0.12)", zIndex: 0 }}
                />
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                  style={{
                    filter: "drop-shadow(0 50px 90px rgba(4,30,20,0.98)) drop-shadow(0 8px 32px rgba(16,185,129,0.18))",
                  }}
                >
                  <img
                    src={ebookCover3D}
                    alt="Mockup 3D do E-book: O Código da Farmácia"
                    className="w-64 md:w-80 lg:w-[22rem] object-contain select-none"
                    style={{ mixBlendMode: "normal" }}
                    draggable={false}
                  />
                </motion.div>
              </div>
            </SR>

            {/* Right — price card + CTA */}
            <div className="flex flex-col gap-5">
              {/* Price card */}
              <SR delay={0.14}>
                <div
                  className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
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
                    <div className="flex items-center gap-5 mb-3">
                      <span className="text-xl font-light line-through" style={{ color: "rgba(255,255,255,0.3)" }}>R$ 97,00</span>
                      <span
                        className="text-6xl font-extrabold tracking-tight"
                        style={{ color: "hsl(var(--emerald))" }}
                      >
                        R$ 29
                      </span>
                    </div>
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5"
                      style={{ background: "hsl(var(--emerald)/0.15)", color: "hsl(var(--emerald))" }}
                    >
                      Você economiza R$ 68 agora
                    </div>

                    {/* Aviso de disponibilidade */}
                    <div
                      className="flex items-start gap-2.5 rounded-2xl px-4 py-3 mb-6 text-left"
                      style={{ background: "rgba(220, 50, 50, 0.08)", border: "1px solid rgba(220, 50, 50, 0.25)" }}
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgba(255, 90, 90, 0.90)" }} />
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255, 110, 110, 0.80)" }}>
                        <strong style={{ color: "rgba(255, 130, 130, 1)", fontWeight: 600 }}>Não sabemos até quando este material ficará disponível.</strong>{" "}
                        Farmácias e operadoras de saúde exercem pressão para que informações como essas não circulem livremente.
                      </p>
                    </div>

                    {/* Countdown */}
                    <div
                      className="pt-6 mt-2"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <CountdownTimer />
                    </div>
                  </div>
                </div>
              </SR>

              {/* CTA button */}
              <SR delay={0.20}>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 w-full rounded-2xl py-5 text-lg font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]"
                  style={{
                    background: "hsl(var(--emerald))",
                    color: "white",
                    boxShadow: "0 0 50px hsl(var(--emerald)/0.4), 0 4px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <BookOpen className="w-5 h-5 shrink-0" />
                  Comprar o E-book por R$ 29 Agora
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </a>
              </SR>

              <SR delay={0.24}>
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm w-full justify-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--emerald))" }} />
                  <span>
                    Garantia Incondicional de{" "}
                    <strong style={{ color: "white", fontWeight: 500 }}>7 Dias.</strong>{" "}
                    Dinheiro de volta sem perguntas.
                  </span>
                </div>

                {/* Payment methods */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
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
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0F1115" }}>
        <div className="max-w-3xl mx-auto px-6">
          <SR>
            <div className="mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(var(--emerald))" }}>Dúvidas</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "white" }}>
                Perguntas frequentes
              </h2>
            </div>
          </SR>

          <SR delay={0.1}>
            <div className="space-y-1">
              {faqs.map(({ q, a, category }, i) => (
                <div key={i}>
                  {/* Category label — show only when changes */}
                  {(i === 0 || faqs[i - 1].category !== category) && (
                    <p className="text-[10px] uppercase tracking-widest font-semibold pt-6 pb-2 first:pt-0" style={{ color: "rgba(255,255,255,0.22)" }}>
                      {category}
                    </p>
                  )}
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value={`faq-${i}`}
                      className="border-0"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <AccordionTrigger
                        className="text-left font-medium text-sm hover:no-underline py-5 gap-4"
                        style={{ color: "rgba(255,255,255,0.80)" }}
                      >
                        {q}
                      </AccordionTrigger>
                      <AccordionContent
                        className="text-sm leading-relaxed pb-5"
                        style={{ color: "rgba(255,255,255,0.42)" }}
                      >
                        {a}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </SR>

        </div>
      </section>

      {/* ── 10. FOOTER ───────────────────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ background: "#070A0D", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-3xl mx-auto">

          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <p className="font-semibold text-sm tracking-tight" style={{ color: "rgba(255,255,255,0.85)" }}>receitas.site</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>O Código da Farmácia · Publicação oficial</p>
            </div>
            <div className="flex items-center gap-5">
              {["Termos de Uso", "Privacidade", "Contato"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs hover:opacity-60 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} className="mb-8" />

          {/* Payment + security */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {["Visa", "Mastercard", "Pix"].map((p) => (
              <span
                key={p}
                className="text-[11px] px-2.5 py-1 rounded-md"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.30)" }}
              >
                {p}
              </span>
            ))}
            <span
              className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md"
              style={{ background: "hsl(var(--emerald)/0.08)", border: "1px solid hsl(var(--emerald)/0.18)", color: "hsl(var(--emerald))" }}
            >
              <Lock className="w-2.5 h-2.5" /> Ambiente seguro · SSL
            </span>
            <span className="text-[11px] ml-auto" style={{ color: "rgba(255,255,255,0.18)" }}>
              © 2026 receitas.site
            </span>
          </div>

          {/* Disclaimer jurídico */}
          <p
            className="leading-relaxed"
            style={{ color: "rgba(255,255,255,0.15)", fontSize: "10.5px" }}
          >
            <strong style={{ color: "rgba(255,255,255,0.22)", fontWeight: 600 }}>Aviso Legal:</strong> Este material tem finalidade exclusivamente informativa e educativa, nos termos do art. 5º, XIV da Constituição Federal. Não constitui prescrição médica, orientação terapêutica individualizada nem promessa de resultado financeiro. As informações sobre programas governamentais e benefícios de laboratórios são públicas e baseadas em regulamentações vigentes do Ministério da Saúde e da Anvisa. O acesso aos programas citados está sujeito a critérios clínicos e disponibilidade por município. <strong style={{ color: "rgba(255,255,255,0.22)", fontWeight: 600 }}>Nunca interrompa um tratamento ou substitua medicamentos sem avaliação do seu médico.</strong> Em caso de dúvida, consulte um profissional de saúde habilitado. O produto é protegido pela Lei nº 9.610/1998 (Lei de Direitos Autorais). Proibida reprodução total ou parcial sem autorização expressa. Compra sujeita ao Código de Defesa do Consumidor (Lei nº 8.078/1990) — direito de arrependimento em até 7 dias corridos.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Ebook;
