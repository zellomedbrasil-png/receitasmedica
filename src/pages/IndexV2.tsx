import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  ShieldCheck,
  Star,
  ClipboardCheck,
  Video,
  MessageCircle,
  Zap,
  Bell,
  BookOpen,
  HistoryIcon,
  HeartPulse,
  Crown,
  BadgeCheck,
  ChevronDown,
  Lock,
  CreditCard,
  Smartphone,
  AlertTriangle,
  ArrowRight,
  Phone,
  FileText,
  CalendarClock,
  Pill,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Motion helper ───────────────────────────────────────────── */
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
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Animated counter ─────────────────────────────────────────── */
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
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
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="text-5xl font-extrabold tracking-tighter" style={{ color: "white" }}>
      {prefix}{display.toLocaleString("pt-BR")}{suffix}
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────── */
const WA_LINK = "https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica.";
const WA_PLAN = "https://wa.me/5585991275429?text=Gostaria%20de%20assinar%20o%20plano%20mensal%20de%20renova%C3%A7%C3%A3o%20de%20receitas.";

const steps = [
  { num: "01", Icon: ClipboardCheck, title: "Triagem Digital", desc: "Preencha seus dados e envie foto da receita anterior ou laudo médico." },
  { num: "02", Icon: Video, title: "Teleconsulta", desc: "Vídeo chamada rápida com médico CRM ativo para validar a continuidade." },
  { num: "03", Icon: MessageCircle, title: "Receita no WhatsApp", desc: "Link com assinatura digital ICP-Brasil enviado direto para seu celular." },
];

const stats = [
  { value: 15000, label: "Receitas Renovadas", prefix: "+" },
  { value: 98, label: "Taxa de Aprovação", suffix: "%" },
  { value: 7, label: "Tempo Médio", suffix: "min" },
];

const testimonials = [
  { name: "Maria Aparecida", city: "São Paulo, SP", text: "Renovei minha receita de pressão em menos de 20 minutos. Prático, seguro e chegou no WhatsApp na hora!", rating: 5 },
  { name: "Carlos Eduardo", city: "Belo Horizonte, MG", text: "O médico foi muito atencioso. Teleconsulta rápida e a receita já veio com QR Code de verificação.", rating: 5 },
  { name: "Ana Paula", city: "Curitiba, PR", text: "Assino o plano mensal e não me preocupo mais com vencimento de receita. Vale muito a pena!", rating: 5 },
];

const renovamos = [
  "Hipertensão arterial",
  "Diabetes tipo 2",
  "Hipotireoidismo",
  "Depressão / ansiedade",
  "Colesterol alto",
  "Anticoncepcional",
  "Asma / DPOC estável",
  "Insônia crônica",
];

const naoRenovamos = [
  "Receitas de uso único",
  "Opioides e substâncias controladas especiais",
  "1ª consulta sem diagnóstico prévio",
  "Emergências médicas",
];

const avulsoItems = [
  "1 teleconsulta com médico CRM ativo",
  "Receita digital assinada ICP-Brasil",
  "Envio via WhatsApp ou e-mail",
  "QR Code de verificação",
  "Suporte pós-consulta",
];

const assinaturaItems = [
  { icon: CalendarClock, text: "Renovações mensais de receitas incluídas" },
  { icon: Bell, text: "Alertas automáticos de vencimento de receita" },
  { icon: Pill, text: "Atualizações sobre interações e novas medicações" },
  { icon: HistoryIcon, text: "Histórico digital de todas as suas receitas" },
  { icon: HeartPulse, text: "Relatório mensal de saúde preventiva" },
  { icon: BookOpen, text: "E-book 'O Código da Farmácia' (grátis)" },
  { icon: Phone, text: "Suporte prioritário via WhatsApp" },
  { icon: FileText, text: "Sem taxa de adesão · Cancele quando quiser" },
];

const faqs = [
  { q: "A receita é aceita em qualquer farmácia?", a: "Sim. A receita digital com assinatura ICP-Brasil tem validade jurídica em todo o território nacional e é aceita em todas as farmácias, incluindo redes como Droga Raia, Drogasil, Pague Menos e farmácias independentes." },
  { q: "Qual o prazo para receber a receita?", a: "Em média 7 minutos após a teleconsulta. O link da receita digital é enviado via WhatsApp ou e-mail assim que o médico finaliza a assinatura eletrônica." },
  { q: "O plano de assinatura renova automaticamente?", a: "Sim. Você é cobrado mensalmente e pode cancelar a qualquer momento sem multa ou burocracia, direto pelo WhatsApp ou por e-mail." },
  { q: "Como funciona a garantia de reembolso?", a: "Se o médico não aprovar a renovação por qualquer motivo clínico, você recebe reembolso integral em até 3 dias úteis. Sem perguntas." },
  { q: "Posso renovar receitas de psiquiatra?", a: "Renovamos receitas de antidepressivos, ansiolíticos e medicamentos de uso contínuo de baixo potencial de abuso. Receitas de substâncias de alto potencial de abuso (como benzodiazepínicos em doses elevadas) precisam de avaliação caso a caso." },
  { q: "O que é a assinatura ICP-Brasil?", a: "É o padrão de assinatura digital reconhecido pelo governo brasileiro. Garante autenticidade, integridade e validade jurídica do documento. Todas as nossas receitas incluem QR Code de verificação." },
];

/* ════════════════════════════════════════════════════════════════ */
export default function IndexV2() {
  const bg = "#0F1115";
  const emerald = "hsl(var(--emerald))";
  const cardBg = "rgba(255,255,255,0.04)";
  const cardBorder = "rgba(255,255,255,0.08)";
  const textMuted = "rgba(255,255,255,0.55)";

  return (
    <div style={{ background: bg, color: "white", fontFamily: "Inter, sans-serif" }} className="min-h-screen overflow-x-hidden">

      {/* ── Trust Bar ─────────────────────────────────────────────── */}
      <div style={{ background: "rgba(16,185,129,0.10)", borderBottom: "1px solid rgba(16,185,129,0.20)" }} className="py-2.5 text-center text-xs font-semibold tracking-wide">
        <span className="inline-flex items-center gap-2" style={{ color: emerald }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: emerald }} />
          Atendimento 100% Online · Médicos com CRM ativo · Receita válida em todo o Brasil
        </span>
      </div>

      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4" style={{ background: "rgba(15,17,21,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold" style={{ background: emerald, color: "#0F1115" }}>R</span>
          <span className="font-bold tracking-tight" style={{ color: "white" }}>receitas<span style={{ color: emerald }}>.site</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: textMuted }}>
          <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#precos" className="hover:text-white transition-colors">Preços</a>
          <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
        </nav>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold px-5 py-2 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: emerald, color: "#0F1115" }}>
          Renovar Agora
        </a>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-32 px-6 text-center overflow-hidden">
        {/* glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.13), transparent)" }} />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(16,185,129,0.07)" }} />

        <div className="relative max-w-4xl mx-auto">
          <SR>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: emerald }}>
              <BadgeCheck className="w-3.5 h-3.5" />
              Renovação de receitas em até 7 minutos
            </div>
          </SR>

          <SR delay={0.08}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6" style={{ color: "white" }}>
              Renove sua receita{" "}
              <span style={{ color: emerald }}>sem sair de casa,</span>
              {" "}sem fila, sem espera.
            </h1>
          </SR>

          <SR delay={0.16}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: textMuted }}>
              Teleconsulta com médico CRM ativo. Receita digital com assinatura ICP-Brasil. Enviada direto no seu WhatsApp em minutos.
            </p>
          </SR>

          <SR delay={0.22}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold shadow-2xl transition-all hover:-translate-y-1 hover:shadow-emerald-500/30" style={{ background: emerald, color: "#0F1115", boxShadow: "0 8px 32px rgba(16,185,129,0.35)" }}>
                Renovar Consulta Avulsa — R$ 39
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href={WA_PLAN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:-translate-y-1" style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: "white", backdropFilter: "blur(12px)" }}>
                Ver Plano Mensal — R$ 29/mês
              </a>
            </div>
          </SR>

          <SR delay={0.28}>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { icon: ShieldCheck, label: "ICP-Brasil" },
                { icon: BadgeCheck, label: "CRM Ativo" },
                { icon: Lock, label: "LGPD" },
                { icon: CreditCard, label: "Pagamento Seguro" },
                { icon: Smartphone, label: "Receita no WhatsApp" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: textMuted }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: emerald }} />
                  {label}
                </span>
              ))}
            </div>
          </SR>
        </div>
      </section>

      {/* ── Como Funciona ─────────────────────────────────────────── */}
      <section id="como-funciona" className="py-24 px-6" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-5xl mx-auto">
          <SR>
            <div className="mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: emerald }}>Processo</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter" style={{ color: "white" }}>3 passos simples.</h2>
              <p className="mt-2 text-base" style={{ color: textMuted }}>Tecnologia médica a favor da sua saúde.</p>
            </div>
          </SR>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <SR key={s.num} delay={i * 0.12}>
                <div className="relative rounded-3xl p-8 h-full overflow-hidden group transition-all hover:-translate-y-1" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: i === 2 ? "rgba(16,185,129,0.12)" : "transparent" }} />
                  <p className="text-xs font-bold tracking-widest mb-6" style={{ color: emerald }}>{s.num}</p>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.20)" }}>
                    <s.Icon className="w-5 h-5" style={{ color: emerald }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: "white" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{s.desc}</p>
                  {i === 2 && (
                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: emerald }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: emerald }} />
                      Entrega Imediata
                    </div>
                  )}
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prova Social ──────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20 text-center">
            {stats.map((s, i) => (
              <SR key={s.label} delay={i * 0.1}>
                <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                <p className="text-sm mt-2 font-medium" style={{ color: textMuted }}>{s.label}</p>
              </SR>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <SR key={t.name} delay={i * 0.1}>
                <div className="rounded-2xl p-6 h-full" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" style={{ color: emerald }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: textMuted }}>"{t.text}"</p>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "white" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.city}</p>
                  </div>
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* ── Critérios ─────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-5xl mx-auto">
          <SR>
            <div className="mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: emerald }}>Critérios</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter" style={{ color: "white" }}>O que renovamos.</h2>
              <p className="mt-2 text-base" style={{ color: textMuted }}>Transparência total antes de você começar.</p>
            </div>
          </SR>
          <div className="grid md:grid-cols-2 gap-6">
            <SR delay={0.1}>
              <div className="rounded-3xl p-8" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)" }}>
                    <Check className="w-4 h-4" style={{ color: emerald }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "white" }}>Renovamos</h3>
                </div>
                <ul className="space-y-3">
                  {renovamos.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: textMuted }}>
                      <Check className="w-4 h-4 shrink-0" style={{ color: emerald }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SR>
            <SR delay={0.18}>
              <div className="rounded-3xl p-8" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)" }}>
                    <X className="w-4 h-4" style={{ color: "#f87171" }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "white" }}>Não renovamos</h3>
                </div>
                <ul className="space-y-3">
                  {naoRenovamos.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: textMuted }}>
                      <X className="w-4 h-4 shrink-0" style={{ color: "#f87171" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SR>
          </div>
        </div>
      </section>

      {/* ── Preços ────────────────────────────────────────────────── */}
      <section id="precos" className="py-28 px-6" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-5xl mx-auto">
          <SR>
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: emerald }}>Preços</p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4" style={{ color: "white" }}>Transparência Total.</h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>Sem surpresas. Escolha o formato que faz mais sentido pra você.</p>
            </div>
          </SR>

          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* ── Avulso ── */}
            <SR delay={0.1}>
              <div className="rounded-3xl p-8 h-full" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: textMuted }}>Consulta Avulsa</p>
                <div className="flex items-baseline gap-1 mt-3 mb-8">
                  <span className="text-sm" style={{ color: textMuted }}>R$</span>
                  <span className="text-6xl font-extrabold tracking-tighter" style={{ color: "white" }}>39</span>
                  <span className="text-sm" style={{ color: textMuted }}>,00</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {avulsoItems.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: textMuted }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.12)" }}>
                        <Check className="w-3 h-3" style={{ color: emerald }} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}>
                  Contratar Consulta Avulsa
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>Pagamento único · Sem compromisso</p>
              </div>
            </SR>

            {/* ── Assinatura ── */}
            <SR delay={0.18}>
              <div className="relative rounded-3xl p-8 overflow-hidden" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.30)" }}>
                {/* glow */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(16,185,129,0.10)" }} />

                {/* badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5" style={{ background: emerald, color: "#0F1115" }}>
                  <Crown className="w-3 h-3" />
                  Recomendado
                </div>

                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: emerald }}>Assinatura Mensal</p>
                <div className="flex items-baseline gap-1 mt-3 mb-1">
                  <span className="text-sm" style={{ color: textMuted }}>R$</span>
                  <span className="text-6xl font-extrabold tracking-tighter" style={{ color: "white" }}>29</span>
                  <span className="text-sm" style={{ color: textMuted }}>/mês</span>
                </div>
                <p className="text-xs font-semibold mb-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: emerald }}>
                  Economize R$ 120/ano em relação à consulta avulsa
                </p>

                <ul className="space-y-4 mb-8 relative z-10">
                  {assinaturaItems.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm">
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.20)" }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: emerald }} />
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.80)" }}>{text}</span>
                    </li>
                  ))}
                </ul>

                <a href={WA_PLAN} target="_blank" rel="noopener noreferrer" className="relative z-10 w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all hover:-translate-y-1 shadow-2xl" style={{ background: emerald, color: "#0F1115", boxShadow: "0 8px 32px rgba(16,185,129,0.40)" }}>
                  Assinar Agora — R$ 29/mês
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="relative z-10 flex items-center justify-center gap-2 mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: emerald }} />
                  Cancele a qualquer momento · Sem multa
                </div>
              </div>
            </SR>
          </div>

          {/* Guarantee strip */}
          <SR delay={0.25}>
            <div className="mt-8 flex items-center justify-center gap-3 py-5 rounded-2xl text-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
              <ShieldCheck className="w-5 h-5 shrink-0" style={{ color: emerald }} />
              <span style={{ color: textMuted }}>
                <strong style={{ color: "white" }}>Garantia de reembolso integral</strong> se o médico não aprovar a renovação.
              </span>
            </div>
          </SR>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-3xl mx-auto">
          <SR>
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: emerald }}>Dúvidas</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter" style={{ color: "white" }}>Perguntas Frequentes</h2>
            </div>
          </SR>
          <SR delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "1rem", overflow: "hidden" }}
                  className="border-none"
                >
                  <AccordionTrigger className="px-6 py-5 text-sm font-semibold text-left hover:no-underline hover:bg-white/5 transition-colors" style={{ color: "white" }}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm leading-relaxed" style={{ color: textMuted }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SR>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="py-28 px-6 text-center relative overflow-hidden" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(16,185,129,0.10), transparent)" }} />
        <div className="relative max-w-2xl mx-auto">
          <SR>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-5" style={{ color: "white" }}>
              Sua saúde não pode esperar.
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: textMuted }}>
              Médico disponível agora. Receita em minutos. Aceita em qualquer farmácia do Brasil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-1" style={{ background: emerald, color: "#0F1115", boxShadow: "0 8px 32px rgba(16,185,129,0.35)" }}>
                Renovar Agora — R$ 39
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href={WA_PLAN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:-translate-y-1" style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: "white" }}>
                Assinar por R$ 29/mês
              </a>
            </div>
          </SR>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold" style={{ background: emerald, color: "#0F1115" }}>R</span>
            <span className="font-bold tracking-tight" style={{ color: "white" }}>receitas<span style={{ color: emerald }}>.site</span></span>
          </div>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2025 receitas.site · Atendimento médico online conforme CFM Res. 2.314/2022 · Receitas com assinatura ICP-Brasil
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
