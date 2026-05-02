import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Lock,
  BadgeCheck,
  FileText,
  MessageCircle,
  ClipboardCheck,
  Video,
  Stethoscope,
  HeartHandshake,
  Accessibility,
  ScrollText,
  ChevronDown,
  Check,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/landing/ScrollReveal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// ───────────────── Constantes [PREENCHER]
const WHATSAPP =
  "https://wa.me/5585991275429?text=Quero%20laudo%20m%C3%A9dico%20para%20fralda%20gratuita%20pela%20Farm%C3%A1cia%20Popular";
const MEDICO_NOME = "[PREENCHER: NOME DO MÉDICO RESPONSÁVEL]";
const MEDICO_CRM = "[PREENCHER: CRM/UF 000000]";
const MEDICO_ESPECIALIDADE = "[PREENCHER: ESPECIALIDADE]";
const PRECO = "[PREENCHER: R$ XX]";
const CNPJ = "[PREENCHER: 00.000.000/0001-00]";
const ENDERECO = "[PREENCHER: ENDEREÇO COMPLETO]";

const PAGE_TITLE =
  "Fralda Geriátrica Gratuita pelo SUS | Laudo Médico Online";
const PAGE_DESC =
  "Idosos 60+ e PCDs têm direito a fralda geriátrica gratuita pela Farmácia Popular. Emitimos o laudo médico online em horas. Fale com o médico no WhatsApp.";
const CANONICAL = "https://receitas.site/fralda";
const OG_IMAGE = "https://receitas.site/og-fralda.jpg"; // [PREENCHER: imagem OG]

// ───────────────── SEO injection
const useSeo = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
    document.documentElement.lang = "pt-BR";

    const upsertMeta = (
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

    upsertMeta("name", "description", PAGE_DESC);
    upsertMeta(
      "name",
      "keywords",
      "fralda geriátrica gratuita SUS, laudo médico fralda, Farmácia Popular fralda idoso, fralda geriátrica grátis, laudo fralda online",
    );
    upsertMeta("property", "og:title", PAGE_TITLE);
    upsertMeta("property", "og:description", PAGE_DESC);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", CANONICAL);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("property", "og:locale", "pt_BR");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", PAGE_TITLE);
    upsertMeta("name", "twitter:description", PAGE_DESC);
    upsertMeta("name", "twitter:image", OG_IMAGE);

    // Canonical
    let canon = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = CANONICAL;

    // JSON-LD MedicalBusiness + FAQPage
    const ldId = "ld-fralda";
    document.getElementById(ldId)?.remove();
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = ldId;
    ld.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        name: "fraldageriatrica.com",
        url: CANONICAL,
        image: OG_IMAGE,
        description: PAGE_DESC,
        medicalSpecialty: "Geriatrics",
        priceRange: PRECO,
        areaServed: "BR",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      },
    ]);
    document.head.appendChild(ld);
  }, []);
};

// ───────────────── FAQ data
const faqItems = [
  {
    q: "Isso é golpe? Por que preciso pagar para receber algo gratuito?",
    a: "Não é golpe. A fralda continua 100% gratuita pela Farmácia Popular do SUS. O que você paga é o ato médico — a teleconsulta e a emissão do laudo, que por lei (Resolução CFM 2.314/2022) só pode ser feito por médico com CRM ativo. O laudo é o documento que a farmácia exige para liberar a retirada.",
  },
  {
    q: "Qual a base legal desse direito?",
    a: "A entrega gratuita de fralda geriátrica é regulamentada pela Portaria GM/MS nº 3.073/2024 e pela Portaria nº 937/2017 do Ministério da Saúde, dentro do programa Farmácia Popular. O direito é garantido a idosos com 60 anos ou mais e a pessoas com deficiência que necessitem do produto.",
  },
  {
    q: "E se a Farmácia Popular não aceitar o laudo?",
    a: "O laudo é emitido seguindo exatamente o modelo exigido pelo programa Farmácia Popular. Caso a unidade solicite ajustes pontuais, a equipe médica readequa o documento sem cobrança adicional.",
  },
  {
    q: "Meu pai/minha mãe não sai de casa. Como funciona?",
    a: "O atendimento é 100% online. A teleconsulta pode ser feita por vídeo do próprio celular do familiar ou cuidador. Em casos de impossibilidade total do paciente, é permitida a presença de procurador legal durante a consulta.",
  },
  {
    q: "Quantas fraldas o SUS entrega por mês?",
    a: "O quantitativo segue a avaliação médica documentada no laudo e os limites definidos pelo programa Farmácia Popular para cada unidade. Em geral, a entrega é mensal e renovável mediante laudo válido.",
  },
  {
    q: "O laudo tem validade? Precisa renovar?",
    a: "Sim. O laudo médico para retirada de fralda pela Farmácia Popular tem validade definida em portaria e precisa ser renovado periodicamente. A equipe avisa o familiar quando estiver próximo do vencimento.",
  },
  {
    q: "Quanto tempo leva para receber o laudo?",
    a: "Após a teleconsulta e o envio dos documentos do paciente, o laudo digital com assinatura ICP-Brasil é enviado pelo WhatsApp em até poucas horas no mesmo dia útil.",
  },
  {
    q: "Quais documentos são necessários?",
    a: "Documento de identidade do paciente, CPF, comprovante de residência e, quando houver, relatório médico anterior ou indicação clínica que justifique o uso contínuo da fralda.",
  },
];

// ───────────────── Header
const Header = () => (
  <nav className="fixed top-0 w-full z-50 glass-header">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/fralda" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <Leaf className="w-[18px] h-[18px]" />
        </div>
        <span className="font-semibold text-lg tracking-tighter-custom text-foreground">
          fralda<span className="text-slate-400 font-normal">geriátrica</span>
        </span>
      </a>

      <div className="hidden md:flex items-center gap-5">
        <span className="text-xs font-medium text-muted-foreground">
          Resp. técnico: <span className="text-foreground">{MEDICO_CRM}</span>
        </span>
        <Button
          asChild
          className="rounded-full bg-slate-900 hover:bg-foreground text-white gap-2"
        >
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </Button>
      </div>

      <Button
        asChild
        size="sm"
        className="md:hidden rounded-full bg-slate-900 hover:bg-foreground text-white gap-2"
      >
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </Button>
    </div>
  </nav>
);

// ───────────────── Hero
const Hero = () => (
  <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
    <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--emerald)/0.15)_0%,transparent_70%)] top-[-100px] left-1/2 -translate-x-1/2 z-0 pointer-events-none" />
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium text-muted-foreground tracking-tight">
              Direito garantido pela Farmácia Popular do SUS
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tighter-custom mb-6 leading-[1.1]">
            Fralda geriátrica{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-glow">
              gratuita pelo SUS
            </span>
            <br className="hidden sm:block" />— sem fila, com laudo médico online.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light max-w-2xl mx-auto">
            Idosos com 60 anos ou mais e pessoas com deficiência têm direito à
            fralda geriátrica <span className="font-semibold text-foreground">gratuita</span>{" "}
            pela Farmácia Popular (Portaria GM/MS nº 3.073/2024). Emitimos o
            laudo médico digital exigido pela farmácia em poucas horas, sem o
            seu familiar precisar sair de casa.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all gap-2"
            >
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Falar com o médico no WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base bg-card hover:bg-secondary gap-2"
            >
              <a href="#como-funciona">Ver como funciona em 3 passos</a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-8 opacity-70">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                CRM Ativo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Laudo ICP-Brasil
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                LGPD
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// ───────────────── Faixa de prova legal
const FaixaLegal = () => (
  <section className="py-12 bg-card border-y border-border">
    <div className="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-light border border-border flex items-center justify-center shrink-0">
            <ScrollText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
              Base legal pública
            </p>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              A entrega gratuita de fralda geriátrica pela Farmácia Popular é
              regulamentada pela{" "}
              <strong>Portaria GM/MS nº 3.073/2024</strong> e pela{" "}
              <strong>Portaria nº 937/2017</strong> do Ministério da Saúde.
              Qualquer cidadão pode consultar o texto integral no Diário
              Oficial da União.
            </p>
            <a
              href="https://www.in.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:underline"
            >
              Consultar Portarias no DOU →
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ───────────────── Como funciona
const steps = [
  {
    num: "1",
    title: "Triagem pelo WhatsApp",
    desc: "Você envia os dados do seu familiar e a documentação básica em poucos minutos.",
    Icon: ClipboardCheck,
    dark: false,
  },
  {
    num: "2",
    title: "Teleconsulta com médico",
    desc: "Vídeo rápido com médico de CRM ativo para avaliar a indicação clínica do uso contínuo.",
    Icon: Video,
    dark: false,
  },
  {
    num: "3",
    title: "Laudo digital no WhatsApp",
    desc: "Você recebe o laudo assinado em ICP-Brasil e leva à Farmácia Popular para retirar a fralda.",
    Icon: MessageCircle,
    dark: true,
  },
];

const ComoFunciona = () => (
  <section
    id="como-funciona"
    className="py-20 bg-background border-y border-border"
  >
    <div className="max-w-5xl mx-auto px-6">
      <ScrollReveal>
        <div className="mb-14">
          <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">
            Como funciona em 3 passos
          </h2>
          <p className="text-muted-foreground mt-2 font-light">
            Sem deslocamento. Sem fila. Sem burocracia.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.15}>
            <div
              className={`rounded-3xl p-8 relative overflow-hidden group transition-colors duration-300 h-full ${
                step.dark
                  ? "bg-slate-900 border border-slate-800"
                  : "bg-card border border-border hover:border-primary/30"
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${
                    step.dark
                      ? "bg-white/10 border-white/10 text-white backdrop-blur-md"
                      : "bg-secondary border-border text-foreground"
                  }`}
                >
                  <span className="font-bold font-mono">{step.num}</span>
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 tracking-tight ${
                    step.dark ? "text-white" : "text-foreground"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    step.dark ? "text-slate-400" : "text-muted-foreground"
                  }`}
                >
                  {step.desc}
                </p>
              </div>
              <step.Icon
                className={`absolute -bottom-4 -right-4 w-[140px] h-[140px] -rotate-[15deg] ${
                  step.dark ? "text-white/5" : "text-slate-200"
                }`}
                strokeWidth={0.5}
              />
              {step.dark && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// ───────────────── Para quem é
const ParaQuem = () => (
  <section className="py-20 bg-card border-b border-border">
    <div className="max-w-5xl mx-auto px-6">
      <ScrollReveal>
        <div className="mb-14">
          <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">
            Para quem é o laudo
          </h2>
          <p className="text-muted-foreground mt-2 font-light">
            Dois perfis com direito garantido em lei.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        <ScrollReveal>
          <div className="bg-background rounded-3xl border border-border p-8 h-full">
            <div className="w-12 h-12 rounded-2xl bg-emerald-light border border-border flex items-center justify-center mb-5">
              <HeartHandshake className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
              Idosos a partir de 60 anos
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Com indicação clínica de uso contínuo da fralda.
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Em quadros de incontinência, mobilidade reduzida ou
                acamamento.
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Atendimento via familiar ou cuidador, 100% online.
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-background rounded-3xl border border-border p-8 h-full">
            <div className="w-12 h-12 rounded-2xl bg-emerald-light border border-border flex items-center justify-center mb-5">
              <Accessibility className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
              Pessoas com deficiência
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Crianças, adultos e idosos PCD com necessidade comprovada.
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Avaliação médica considera o quadro clínico individual.
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Procurador legal pode acompanhar a teleconsulta.
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// ───────────────── Quanto custa
const QuantoCusta = () => (
  <section className="py-24 bg-background border-b border-border">
    <div className="max-w-3xl mx-auto px-6">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom mb-3">
            Transparência radical
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            A fralda continua gratuita pelo SUS. Você paga apenas o ato
            médico — exigência legal para emissão do laudo.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">
              Teleconsulta + laudo digital
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl sm:text-6xl font-semibold text-foreground tracking-tighter-custom">
                {PRECO}
              </span>
              <span className="text-sm text-muted-foreground">
                pagamento único
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-border bg-secondary/50 p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
                  Gasto médio sem o laudo
                </p>
                <p className="text-2xl font-semibold text-foreground tracking-tight">
                  R$ 300 a R$ 600
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  por mês com fralda paga em farmácia comum
                </p>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-emerald-light p-5">
                <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-1">
                  Economia possível em 12 meses
                </p>
                <p className="text-2xl font-semibold text-foreground tracking-tight">
                  Até R$ 7.200
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  retirando pelo Farmácia Popular do SUS
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full rounded-full py-6 text-base shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all gap-2"
            >
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Iniciar laudo pelo WhatsApp
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Valores e disponibilidade da fralda dependem da unidade da
              Farmácia Popular. [REVISAR COM MÉDICO RESPONSÁVEL]
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ───────────────── Médico responsável
const Medico = () => (
  <section className="py-20 bg-card border-b border-border">
    <div className="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <div className="bg-background rounded-3xl border border-border p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-28 h-28 rounded-3xl bg-secondary border border-border flex items-center justify-center shrink-0">
            <Stethoscope className="w-10 h-10 text-primary" />
            {/* [PREENCHER: foto real do médico, alt="Foto de {MEDICO_NOME}, médico responsável"] */}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">
              Médico responsável
            </p>
            <h2 className="text-2xl font-semibold text-foreground tracking-tighter-custom mb-1">
              {MEDICO_NOME}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {MEDICO_ESPECIALIDADE} · {MEDICO_CRM}
            </p>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              [PREENCHER: frase pessoal do médico — por que decidiu dedicar
              parte da prática a ajudar famílias a acessarem esse direito.
              Linguagem sóbria, sem promessa de resultado.]
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ───────────────── FAQ
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 bg-background border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">
              Perguntas frequentes
            </h2>
            <p className="text-muted-foreground mt-2 font-light">
              Respostas diretas às dúvidas mais comuns dos familiares.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <Collapsible
              key={i}
              open={open === i}
              onOpenChange={(v) => setOpen(v ? i : null)}
            >
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <CollapsibleTrigger className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/50 transition-colors">
                  <span className="text-sm sm:text-base font-medium text-foreground">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────── CTA final
const CtaFinal = () => (
  <section className="py-24 bg-card">
    <div className="max-w-3xl mx-auto px-6">
      <ScrollReveal>
        <div className="bg-slate-900 rounded-3xl p-10 sm:p-14 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--emerald)/0.25)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <FileText className="w-10 h-10 text-primary mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom mb-4">
              Tire dúvida com a equipe médica agora.
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Resposta humana pelo WhatsApp. Atendimento conduzido por médico
              com CRM ativo, em conformidade com a Resolução CFM 2.314/2022.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all gap-2"
            >
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Tirar dúvida com a equipe médica
              </a>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ───────────────── Footer
const Footer = () => (
  <footer className="bg-secondary pt-16 pb-12 border-t border-border">
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center text-background">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-base tracking-tighter-custom text-foreground">
              fraldageriatrica.com
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Telemedicina ética para famílias que cuidam.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm">
          <a
            href="/blog"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </a>
          <a
            href="/como-funciona"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Como funciona
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Política de Privacidade (LGPD)
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Termos de uso
          </a>
        </div>
      </div>

      <div className="border-t border-border pt-6 grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
        <p>
          CNPJ: {CNPJ} · {ENDERECO}
        </p>
        <p className="sm:text-right">
          Responsável técnico: {MEDICO_NOME} — {MEDICO_CRM}
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-[10px] text-muted-foreground/70 leading-relaxed max-w-3xl">
          Este serviço não substitui atendimento presencial de emergência. A
          emissão do laudo está sujeita à avaliação médica individual conforme
          a Resolução CFM 2.314/2022. A fralda geriátrica é fornecida
          gratuitamente pelo programa Farmácia Popular do SUS, conforme as
          Portarias GM/MS nº 3.073/2024 e nº 937/2017; este site não
          comercializa o produto. Disponibilidade e quantitativo dependem da
          unidade da Farmácia Popular.
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-3">
          © 2026 fraldageriatrica.com. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

// ───────────────── Page
const Fralda = () => {
  useSeo();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <FaixaLegal />
        <ComoFunciona />
        <ParaQuem />
        <QuantoCusta />
        <Medico />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
};

export default Fralda;
