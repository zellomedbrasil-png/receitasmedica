import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Plus,
  ArrowRight,
  ArrowLeft,
  Check,
  Lock,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Sparkles,
  AlertTriangle,
  Scale,
  HeartPulse,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ───────────── Config
const TOTAL = 10;
const PRECO_LAUDO = 49;
const MP_LINK = "https://mpago.la/22jiVhZ"; // [PREENCHER: link real do Mercado Pago R$ 49]
const WA_NUMBER = "5585991275429";
const WA_LINK = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// ───────────── SEO
const PAGE_TITLE =
  "Funil guiado · Solicite o laudo para fralda gratuita pelo SUS";
const PAGE_DESC =
  "Em 10 passos rápidos descubra se sua família tem direito à fralda geriátrica gratuita pelo SUS e receba o laudo médico em até 24h.";
const CANONICAL = "https://receitas.site/funil";

const useSeo = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
    document.documentElement.lang = "pt-BR";
    const upsert = (
      attr: "name" | "property",
      key: string,
      content: string,
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    upsert("name", "description", PAGE_DESC);
    upsert("property", "og:title", PAGE_TITLE);
    upsert("property", "og:description", PAGE_DESC);
    upsert("property", "og:type", "website");
    upsert("property", "og:url", CANONICAL);
    let canonical =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = CANONICAL;
  }, []);
};

// ───────────── Tokens locais (mesma estética do /fralda)
const BG = "bg-[#070B12]";
const SURFACE = "bg-white/[0.03] border border-white/[0.07]";
const SOFT_GRADIENT =
  "bg-[radial-gradient(ellipse_at_top,hsl(210_92%_55%/0.18)_0%,transparent_55%)]";

// ───────────── Helpers de máscara/validação
const onlyDigits = (s: string) => s.replace(/\D/g, "");

const formatCPF = (raw: string) => {
  const v = onlyDigits(raw).slice(0, 11);
  if (v.length > 9)
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  if (v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  if (v.length > 3) return v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  return v;
};

const validateCPF = (cpfRaw: string) => {
  const cpf = onlyDigits(cpfRaw);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
  let rem = (sum * 10) % 11;
  if (rem === 10 || rem === 11) rem = 0;
  if (rem !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
  rem = (sum * 10) % 11;
  if (rem === 10 || rem === 11) rem = 0;
  return rem === parseInt(cpf[10]);
};

const formatPhone = (raw: string) => {
  const v = onlyDigits(raw).slice(0, 11);
  if (v.length > 6)
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length > 0) return `(${v}`;
  return "";
};

// ───────────── Tipos
type Tamanho = "P" | "M" | "G" | "EG";
type Freq = "3-5" | "6-8" | "8+" | "nao-sei";

type State = {
  step: number;
  paraQuem: string;
  idade: string;
  condicao: string;
  gasto: string;
  tamanho: Tamanho | "";
  freq: Freq | "";
  nome: string;
  cpf: string;
  whatsapp: string;
};

const initial: State = {
  step: 1,
  paraQuem: "",
  idade: "",
  condicao: "",
  gasto: "",
  tamanho: "",
  freq: "",
  nome: "",
  cpf: "",
  whatsapp: "",
};

const FREQ_LABELS: Record<Freq, string> = {
  "3-5": "3 a 5 fraldas / dia",
  "6-8": "6 a 8 fraldas / dia",
  "8+": "8 ou mais fraldas / dia",
  "nao-sei": "A definir pelo médico",
};
const FREQ_ECONOMIA: Record<Freq, number> = {
  "3-5": 3600,
  "6-8": 4800,
  "8+": 6000,
  "nao-sei": 4800,
};

// ───────────── Componentes UI

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
      <Shield className="w-5 h-5" strokeWidth={2} />
      <Plus
        className="absolute w-3 h-3 text-sky-300"
        strokeWidth={3}
      />
    </div>
    <div className="leading-tight">
      <div className="text-white font-semibold tracking-tight">
        fralda<span className="text-white/50">geriátrica</span>
      </div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
        Direito ao SUS · Telemedicina
      </div>
    </div>
  </div>
);

const ProgressBar = ({ step }: { step: number }) => {
  const pct = Math.round((step / TOTAL) * 100);
  return (
    <div className="w-full max-w-2xl mx-auto px-6 mt-6">
      <div className="flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.16em] text-white/45 font-mono">
        <span>
          Etapa {String(step).padStart(2, "0")}{" "}
          <span className="text-white/25">/ {TOTAL}</span>
        </span>
        <span className="text-sky-400">{pct}%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-sky-300 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

type OptionDef = { value: string; title: string; sub?: string; icon?: React.ReactNode };

const OptionList = ({
  options,
  selected,
  onSelect,
}: {
  options: OptionDef[];
  selected: string;
  onSelect: (v: string) => void;
}) => (
  <div className="grid gap-3">
    {options.map((o) => {
      const active = selected === o.value;
      return (
        <button
          key={o.value}
          type="button"
          onClick={() => onSelect(o.value)}
          className={`group relative flex items-center gap-4 text-left rounded-2xl px-5 py-4 transition-all border ${
            active
              ? "bg-sky-500/[0.08] border-sky-400/60 ring-1 ring-sky-400/40"
              : "bg-white/[0.025] border-white/[0.07] hover:border-sky-400/40 hover:bg-white/[0.05]"
          }`}
        >
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold ${
              active
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                : "bg-white/[0.04] text-white/70 border border-white/[0.07]"
            }`}
          >
            {o.icon ?? o.value}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium tracking-tight">
              {o.title}
            </div>
            {o.sub && (
              <div className="text-xs text-white/45 mt-0.5">{o.sub}</div>
            )}
          </div>
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              active
                ? "border-sky-400 bg-sky-400 text-slate-950"
                : "border-white/20"
            }`}
          >
            {active && <Check className="w-3 h-3" strokeWidth={3} />}
          </div>
        </button>
      );
    })}
  </div>
);

const StepHeader = ({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}) => (
  <div className="mb-7">
    <div className="text-[11px] uppercase tracking-[0.16em] text-sky-400/80 font-mono mb-3">
      {eyebrow}
    </div>
    <h2 className="text-2xl sm:text-3xl text-white font-semibold tracking-tighter-custom leading-tight">
      {title}
    </h2>
    {desc && (
      <p className="text-white/55 text-[15px] leading-relaxed mt-3 max-w-prose">
        {desc}
      </p>
    )}
  </div>
);

const InfoNote = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex gap-3 items-start rounded-xl bg-sky-500/[0.06] border border-sky-400/20 px-4 py-3 mb-5 text-sm text-white/70 leading-relaxed">
    <div className="text-sky-400 shrink-0 mt-0.5">{icon}</div>
    <div>{children}</div>
  </div>
);

const PrimaryBtn = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="lg"
    className="w-full mt-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold gap-2 disabled:opacity-40"
  >
    {children}
    <ArrowRight className="w-4 h-4" />
  </Button>
);

const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-3 w-full text-center text-xs text-white/40 hover:text-white/70 transition-colors py-2 inline-flex items-center justify-center gap-1.5"
  >
    <ArrowLeft className="w-3 h-3" /> Voltar
  </button>
);

// ───────────── Página
const Funil = () => {
  useSeo();
  const [s, setS] = useState<State>(initial);

  // Persistência leve em sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("funil-fralda");
      if (saved) setS(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem("funil-fralda", JSON.stringify(s));
    } catch {}
  }, [s]);

  const goto = (n: number) => {
    setS((p) => ({ ...p, step: Math.max(1, Math.min(TOTAL, n)) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const choose =
    (key: keyof State, nextStep: number) => (v: string) => {
      setS((p) => ({ ...p, [key]: v }));
      setTimeout(() => goto(nextStep), 320);
    };

  const cpfOk = useMemo(() => validateCPF(s.cpf), [s.cpf]);
  const nomeOk = useMemo(
    () => s.nome.trim().split(/\s+/).filter(Boolean).length >= 2,
    [s.nome],
  );
  const whatsOk = onlyDigits(s.whatsapp).length >= 10;

  const economia = s.freq ? FREQ_ECONOMIA[s.freq] : 4800;
  const orderId = useMemo(
    () => "FG-" + (Date.now() % 1000000).toString().padStart(6, "0"),
    [],
  );

  return (
    <div className={`${BG} min-h-screen text-white relative overflow-hidden`}>
      {/* Glow de topo */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[520px] ${SOFT_GRADIENT}`}
      />

      {/* Editorial band */}
      <div className="relative z-10 w-full bg-white/[0.04] border-b border-white/[0.06] py-2.5 text-center text-xs text-white/60 tracking-wide">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400" />
          </span>
          Atendimento médico online · Laudo emitido em até 24h úteis
        </span>
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-2xl mx-auto px-6 pt-7 flex items-center justify-between">
        <Logo />
        <div className="text-right text-[11px] text-white/45 leading-tight font-mono">
          <div className="text-white/70 font-semibold">CRM ativo</div>
          <div>Telemedicina · CFM 2.314/2022</div>
        </div>
      </header>

      <ProgressBar step={s.step} />

      {/* Card */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 mt-6 pb-16">
        <div
          className={`${SURFACE} rounded-3xl backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] p-7 sm:p-10`}
        >
          {/* STEP 1 */}
          {s.step === 1 && (
            <section>
              <StepHeader
                eyebrow="Etapa 01 · Elegibilidade"
                title={
                  <>
                    Você está solicitando para{" "}
                    <em className="text-sky-400 not-italic">quem?</em>
                  </>
                }
                desc="Vamos verificar se há direito ao benefício gratuito garantido pela legislação federal."
              />
              <OptionList
                selected={s.paraQuem}
                onSelect={choose("paraQuem", 2)}
                options={[
                  { value: "mae-pai", title: "Para minha mãe ou pai", sub: "O caso mais comum" },
                  { value: "avo", title: "Para meu avô ou avó", sub: "Cuidando de quem cuidou de você" },
                  { value: "familiar", title: "Para um familiar ou paciente", sub: "Outro grau de parentesco" },
                  { value: "eu", title: "Para mim mesmo(a)", sub: "Solicitação para uso próprio" },
                ]}
              />
            </section>
          )}

          {/* STEP 2 */}
          {s.step === 2 && (
            <section>
              <StepHeader
                eyebrow="Etapa 02 · Confirmando o direito"
                title={
                  <>
                    Qual a <em className="text-sky-400 not-italic">idade</em> da pessoa?
                  </>
                }
                desc="A lei federal garante fraldas gratuitas a partir dos 60 anos, ou em qualquer idade para pessoas com deficiência."
              />
              <OptionList
                selected={s.idade}
                onSelect={choose("idade", 3)}
                options={[
                  { value: "60-70", title: "60 a 70 anos" },
                  { value: "71-80", title: "71 a 80 anos" },
                  { value: "80+", title: "Mais de 80 anos" },
                  { value: "pcd", title: "Menos de 60 anos", sub: "Pessoa com deficiência" },
                ]}
              />
              <BackBtn onClick={() => goto(1)} />
            </section>
          )}

          {/* STEP 3 */}
          {s.step === 3 && (
            <section>
              <StepHeader
                eyebrow="Etapa 03 · Condição clínica"
                title={
                  <>
                    Apresenta alguma <em className="text-sky-400 not-italic">dessas condições?</em>
                  </>
                }
                desc="Estas são as condições clínicas que o laudo médico vai documentar para liberar o benefício."
              />
              <InfoNote icon={<Scale className="w-4 h-4" />}>
                Cobertas pela <strong className="text-white">Portaria GM/MS nº 3.073/2024</strong> — basta uma delas para garantir o direito.
              </InfoNote>
              <OptionList
                selected={s.condicao}
                onSelect={choose("condicao", 4)}
                options={[
                  { value: "urinaria", title: "Incontinência urinária", sub: "Perda involuntária de urina" },
                  { value: "fecal", title: "Incontinência fecal", sub: "Perda involuntária de fezes" },
                  { value: "mista", title: "Incontinência mista", sub: "Urinária e fecal" },
                  { value: "acamado", title: "Acamado(a) ou imobilizado(a)", sub: "Mobilidade reduzida" },
                ]}
              />
              <BackBtn onClick={() => goto(2)} />
            </section>
          )}

          {/* STEP 4 */}
          {s.step === 4 && (
            <section>
              <StepHeader
                eyebrow="Etapa 04 · Situação atual"
                title={
                  <>
                    Hoje, vocês já <em className="text-sky-400 not-italic">compram</em> fralda?
                  </>
                }
                desc="Queremos entender o quanto sua família está gastando — e o que você vai parar de pagar."
              />
              <OptionList
                selected={s.gasto}
                onSelect={choose("gasto", 5)}
                options={[
                  { value: "alto", title: "Sim, mais de R$ 300 por mês", sub: "Pesa bastante no orçamento" },
                  { value: "economiza", title: "Sim, tentamos economizar", sub: "Difícil, mas a gente se vira" },
                  { value: "preparando", title: "Ainda não, mas já está precisando", sub: "Estamos nos preparando" },
                  { value: "outro", title: "Conseguimos por outro meio", sub: "Burocrático e demorado" },
                ]}
              />
              <BackBtn onClick={() => goto(3)} />
            </section>
          )}

          {/* STEP 5 — Educacional */}
          {s.step === 5 && (
            <section>
              <StepHeader
                eyebrow="Etapa 05 · Antes de continuar"
                title={
                  <>
                    Uma <em className="text-sky-400 not-italic">dúvida</em> que quase todo mundo tem
                  </>
                }
                desc="Muitas famílias confundem o que é gratuito e o que é pago. Vamos deixar claro de uma vez."
              />

              <div className={`${SURFACE} rounded-2xl p-5 sm:p-6 mb-4`}>
                <div className="text-[11px] uppercase tracking-[0.16em] text-sky-400/80 font-mono mb-4">
                  Como funciona, na prática
                </div>
                <ul className="space-y-4 text-sm text-white/75 leading-relaxed">
                  <li className="flex gap-3">
                    <Check className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-white">A fralda é 100% gratuita.</strong>{" "}
                      Fornecida pelo SUS via Farmácia Popular. Você nunca paga pela fralda.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <HeartPulse className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-white">O que você paga é a consulta médica</strong>{" "}
                      — obrigatória por lei para emitir o laudo. Mesma lógica de pagar a consulta para receber receita de remédio gratuito do SUS.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>
                      A Farmácia Popular{" "}
                      <span className="text-amber-300">
                        não entrega a fralda sem o laudo
                      </span>
                      . Sem o documento, o direito fica bloqueado mesmo sendo garantido por lei.
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className={`${SURFACE} rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-sky-500/[0.06] to-transparent`}
              >
                <div className="text-[11px] uppercase tracking-[0.16em] text-sky-400/80 font-mono mb-5">
                  O que muda para sua família
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mb-1">
                      Hoje
                    </div>
                    <div className="text-2xl font-semibold text-white/80 line-through decoration-rose-400/60">
                      R$ 450
                    </div>
                    <div className="text-[11px] text-white/40 mt-1">por mês, do bolso</div>
                  </div>
                  <div className="rounded-xl bg-sky-500/[0.10] border border-sky-400/30 p-4 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-sky-400 font-mono mb-1">
                      Depois do laudo
                    </div>
                    <div className="text-2xl font-semibold text-sky-300">R$ 0</div>
                    <div className="text-[11px] text-white/55 mt-1">gratuito no SUS</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-5 text-center leading-relaxed">
                  O laudo custa{" "}
                  <strong className="text-white">R$ {PRECO_LAUDO},00</strong> — uma única vez.
                  <br />
                  <span className="text-sky-300">
                    Você recupera o investimento em poucos dias.
                  </span>
                </p>
              </div>

              <PrimaryBtn onClick={() => goto(6)}>
                Entendi · quero meu laudo
              </PrimaryBtn>
              <BackBtn onClick={() => goto(4)} />
            </section>
          )}

          {/* STEP 6 — Tamanho */}
          {s.step === 6 && (
            <section>
              <StepHeader
                eyebrow="Etapa 06 · Personalização"
                title={
                  <>
                    Qual o <em className="text-sky-400 not-italic">tamanho</em> da fralda?
                  </>
                }
                desc="Essa informação vai diretamente no laudo. O tamanho correto evita recusa na farmácia."
              />
              <InfoNote icon={<AlertTriangle className="w-4 h-4" />}>
                Em caso de dúvida ou peso oscilante, escolha o tamanho{" "}
                <strong className="text-white">imediatamente acima</strong>.
              </InfoNote>
              <OptionList
                selected={s.tamanho}
                onSelect={(v) => {
                  setS((p) => ({ ...p, tamanho: v as Tamanho }));
                  setTimeout(() => goto(7), 320);
                }}
                options={[
                  { value: "P", title: "Pequeno", sub: "40 a 60 kg · cintura 60–80 cm" },
                  { value: "M", title: "Médio", sub: "55 a 80 kg · cintura 80–110 cm" },
                  { value: "G", title: "Grande", sub: "75 a 100 kg · cintura 110–135 cm" },
                  { value: "EG", title: "Extra Grande", sub: "95 a 130 kg · cintura > 135 cm" },
                ]}
              />
              <BackBtn onClick={() => goto(5)} />
            </section>
          )}

          {/* STEP 7 — Frequência */}
          {s.step === 7 && (
            <section>
              <StepHeader
                eyebrow="Etapa 07 · Quantidade"
                title={
                  <>
                    Com que <em className="text-sky-400 not-italic">frequência</em> usa por dia?
                  </>
                }
                desc="Define a quantidade prescrita no laudo. Quanto maior a necessidade, mais a Farmácia Popular fornece."
              />
              <OptionList
                selected={s.freq}
                onSelect={(v) => {
                  setS((p) => ({ ...p, freq: v as Freq }));
                  setTimeout(() => goto(8), 320);
                }}
                options={[
                  { value: "3-5", title: "Apenas à noite", sub: "3 a 5 fraldas por dia" },
                  { value: "6-8", title: "Durante o dia também", sub: "6 a 8 fraldas por dia" },
                  { value: "8+", title: "Uso contínuo", sub: "Acamado(a) — 8 ou mais por dia" },
                  { value: "nao-sei", title: "Não sei ao certo", sub: "O médico avalia e prescreve" },
                ]}
              />
              <BackBtn onClick={() => goto(6)} />
            </section>
          )}

          {/* STEP 8 — Nome + CPF */}
          {s.step === 8 && (
            <section>
              <StepHeader
                eyebrow="Etapa 08 · Dados do paciente"
                title={
                  <>
                    Para emitir o <em className="text-sky-400 not-italic">laudo oficial</em>
                  </>
                }
                desc="Os dados do paciente precisam estar exatos no laudo para ser aceito na Farmácia Popular."
              />
              <InfoNote icon={<Lock className="w-4 h-4" />}>
                Seus dados são tratados sob <strong className="text-white">sigilo médico</strong> e protegidos pela LGPD. Nunca compartilhamos com terceiros.
              </InfoNote>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-white/45 font-mono mb-2 block">
                    Nome completo do paciente
                  </label>
                  <Input
                    value={s.nome}
                    maxLength={120}
                    onChange={(e) => setS((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Ex: Maria Aparecida Silva"
                    className="bg-white/[0.04] border-white/[0.10] text-white h-12 placeholder:text-white/30"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-white/45 font-mono mb-2 block">
                    CPF do paciente
                  </label>
                  <Input
                    value={s.cpf}
                    inputMode="numeric"
                    maxLength={14}
                    onChange={(e) =>
                      setS((p) => ({ ...p, cpf: formatCPF(e.target.value) }))
                    }
                    placeholder="000.000.000-00"
                    className={`bg-white/[0.04] border-white/[0.10] text-white h-12 placeholder:text-white/30 ${
                      s.cpf && !cpfOk ? "border-rose-400/60" : ""
                    } ${cpfOk ? "border-sky-400/60" : ""}`}
                  />
                  <div
                    className={`text-xs mt-2 ${
                      cpfOk
                        ? "text-sky-400"
                        : s.cpf
                          ? "text-rose-300"
                          : "text-white/40"
                    }`}
                  >
                    {cpfOk
                      ? "✓ CPF válido"
                      : s.cpf && onlyDigits(s.cpf).length === 11
                        ? "CPF inválido — verifique os números"
                        : "Será usado apenas no laudo médico."}
                  </div>
                </div>
              </div>

              <PrimaryBtn
                onClick={() => goto(9)}
                disabled={!(nomeOk && cpfOk)}
              >
                Continuar
              </PrimaryBtn>
              <BackBtn onClick={() => goto(7)} />
            </section>
          )}

          {/* STEP 9 — WhatsApp */}
          {s.step === 9 && (
            <section>
              <StepHeader
                eyebrow="Etapa 09 · Contato"
                title={
                  <>
                    Onde <em className="text-sky-400 not-italic">enviamos</em> o laudo?
                  </>
                }
                desc="O laudo digital chega no seu WhatsApp em até 24 horas após a confirmação do pagamento."
              />
              <div>
                <label className="text-xs uppercase tracking-[0.14em] text-white/45 font-mono mb-2 block">
                  WhatsApp para receber o laudo
                </label>
                <Input
                  value={s.whatsapp}
                  inputMode="numeric"
                  maxLength={15}
                  onChange={(e) =>
                    setS((p) => ({
                      ...p,
                      whatsapp: formatPhone(e.target.value),
                    }))
                  }
                  placeholder="(00) 00000-0000"
                  className="bg-white/[0.04] border-white/[0.10] text-white h-12 placeholder:text-white/30"
                />
                <div className="text-xs text-white/40 mt-2">
                  Use um número que você consulta com frequência.
                </div>
              </div>
              <PrimaryBtn onClick={() => goto(10)} disabled={!whatsOk}>
                Ver resumo do pedido
              </PrimaryBtn>
              <BackBtn onClick={() => goto(8)} />
            </section>
          )}

          {/* STEP 10 — Resumo + Pagamento */}
          {s.step === 10 && (
            <section>
              <div className="text-center mb-6">
                <div className="inline-flex w-14 h-14 rounded-full bg-sky-500/15 border border-sky-400/40 items-center justify-center text-sky-400 mb-4">
                  <Check className="w-7 h-7" strokeWidth={3} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-sky-400/80 font-mono mb-2">
                  Parabéns — você tem direito
                </div>
                <h2 className="text-2xl sm:text-3xl text-white font-semibold tracking-tighter-custom leading-tight">
                  Sua família tem direito às
                  <br />
                  <span className="text-sky-400">fraldas gratuitas</span>
                </h2>
                <p className="text-white/55 text-[15px] leading-relaxed mt-3">
                  Confirme os dados e finalize a consulta para receber o laudo.
                </p>
              </div>

              {/* Resumo */}
              <div className={`${SURFACE} rounded-2xl p-5 mb-4`}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/45 font-mono">
                    Resumo do pedido
                  </span>
                  <span className="text-[11px] font-mono text-white/35">#{orderId}</span>
                </div>
                <dl className="text-sm divide-y divide-white/[0.05]">
                  {[
                    ["Paciente", s.nome || "—"],
                    ["CPF", s.cpf || "—"],
                    ["Tamanho da fralda", s.tamanho ? `Tamanho ${s.tamanho}` : "—"],
                    ["Frequência de uso", s.freq ? FREQ_LABELS[s.freq] : "—"],
                    ["WhatsApp", s.whatsapp || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2.5 gap-4">
                      <dt className="text-white/45">{k}</dt>
                      <dd className="text-white text-right truncate max-w-[60%]">{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between py-2.5 gap-4">
                    <dt className="text-white/45">Entrega do laudo</dt>
                    <dd className="text-sky-400 text-right">Em até 24h após pagamento</dd>
                  </div>
                </dl>
              </div>

              {/* Economia */}
              <div className={`${SURFACE} rounded-2xl p-5 mb-4 text-center bg-gradient-to-br from-sky-500/[0.06] to-transparent`}>
                <div className="text-[11px] uppercase tracking-[0.14em] text-sky-400/80 font-mono mb-2">
                  Economia anual estimada
                </div>
                <div className="text-4xl font-semibold text-white tracking-tight">
                  R$ {economia.toLocaleString("pt-BR")}
                </div>
                <div className="text-xs text-white/45 mt-2">
                  em fraldas que passarão a ser gratuitas pelo SUS
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex gap-3 items-start rounded-xl bg-amber-400/[0.06] border border-amber-400/20 px-4 py-3 mb-5 text-xs text-white/70 leading-relaxed">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Lembrete:</strong> o valor abaixo é referente à{" "}
                  <strong className="text-white">consulta médica e emissão do laudo</strong> — serviço regulamentado pelo CFM.{" "}
                  <strong className="text-white">As fraldas continuam 100% gratuitas</strong> na Farmácia Popular após apresentação do laudo.
                </div>
              </div>

              {/* Pagamento */}
              <div className="rounded-2xl border border-sky-400/20 bg-white/[0.025] p-5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#009ee3] to-[#0070a8]" />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#009ee3] flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-white font-semibold text-sm">Mercado Pago</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">
                        Checkout seguro
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-sky-400 font-semibold inline-flex items-center gap-1">
                    <Lock className="w-3 h-3" /> SSL · LGPD
                  </span>
                </div>

                <div className="text-center py-4 border-y border-dashed border-white/[0.08] mb-4">
                  <div className="text-[10px] uppercase tracking-wider text-white/45 font-mono mb-1">
                    Consulta médica · Laudo
                  </div>
                  <div className="text-white">
                    <span className="text-base text-white/50 align-top mr-1">R$</span>
                    <span className="text-5xl font-semibold tracking-tight">
                      {PRECO_LAUDO}
                    </span>
                    <span className="text-base text-white/50 ml-1">,00</span>
                  </div>
                  <div className="text-xs text-white/45 mt-1 italic">
                    pagamento único · sem mensalidade
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {["Pix", "Crédito", "Débito", "Antifraude"].map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-white/65 bg-white/[0.04] border border-white/[0.08] font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <a
                  href={MP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl py-4 font-semibold text-white bg-gradient-to-b from-[#009ee3] to-[#0070a8] shadow-[0_8px_24px_rgba(0,158,227,0.30)] hover:translate-y-[-1px] transition-transform"
                >
                  <Wallet className="w-4 h-4" />
                  Pagar consulta · receber laudo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-3 my-5 text-[10px] uppercase tracking-[0.16em] text-white/35 font-mono">
                <div className="flex-1 h-px bg-white/[0.08]" />
                após confirmar o pagamento
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>

              <a
                href={WA_LINK(
                  `Olá! Acabei de pagar o laudo. Pedido #${orderId}. Paciente: ${s.nome}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3.5 font-semibold text-white bg-[#25D366] hover:bg-[#1ea954] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar comprovante no WhatsApp
              </a>

              <p className="text-center text-[11px] text-white/40 mt-5 leading-relaxed">
                <strong className="text-white/60">Pagamento processado pelo Mercado Pago</strong>{" "}
                · LGPD · CFM
                <br />
                Laudo emitido por médico habilitado conforme Resolução CFM 2.314/2022
              </p>

              <BackBtn onClick={() => goto(9)} />
            </section>
          )}
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-8">
          {[
            { icon: <ShieldCheck className="w-3 h-3" />, label: "LGPD compliant" },
            { icon: <ShieldCheck className="w-3 h-3" />, label: "CFM regulamentado" },
            { icon: <Scale className="w-3 h-3" />, label: "Portaria 3.073/2024" },
            { icon: <Sparkles className="w-3 h-3" />, label: "100% online" },
          ].map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-1.5 text-[11px] text-white/40 font-medium"
            >
              <span className="text-sky-400">{t.icon}</span>
              {t.label}
            </span>
          ))}
        </div>

        <div className="text-center text-[11px] text-white/30 mt-6 italic">
          fraldageriatrica.com · serviço de telemedicina regulamentado
        </div>
      </main>
    </div>
  );
};

export default Funil;
