import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Shield,
  Plus,
  Lock,
  BadgeCheck,
  FileText,
  MessageCircle,
  ClipboardCheck,
  Video,
  HeartHandshake,
  Accessibility,
  ScrollText,
  ChevronDown,
  Check,
  ArrowRight,
  Sparkles,
  PackageCheck,
  RefreshCw,
  BellRing,
  FileSignature,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/landing/ScrollReveal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// ───────────────── Constantes [PREENCHER]
const WHATSAPP = "/funil";
// (legacy WhatsApp link removed)
const PRECO = "R$ 49";
const CNPJ = "[PREENCHER: 00.000.000/0001-00]";
const ENDERECO = "[PREENCHER: ENDEREÇO COMPLETO]";

const PAGE_TITLE = "Fralda Geriátrica Gratuita pelo SUS | Laudo Médico Online por R$ 49";
const PAGE_DESC =
  "Idosos 60+ e PCDs têm direito a fralda geriátrica gratuita pela Farmácia Popular. Emitimos o laudo médico online em até 24h por R$ 49. Fale no WhatsApp.";
const CANONICAL = "https://receitas.site/fralda";
const OG_IMAGE = "https://receitas.site/og-fralda.jpg";

// ───────────────── Design tokens (dark premium — local à página)
// Não polui o tema global. Coerente com a estética de IndexVB.
const BG = "bg-[#070B12]";
const SURFACE = "bg-white/[0.03] border border-white/[0.07]";
const SURFACE_HOVER = "hover:border-sky-400/30 hover:bg-white/[0.05]";
const TEXT = "text-white";
const TEXT_MUTED = "text-white/60";
const TEXT_DIM = "text-white/40";
const EMERALD = "text-sky-400";
const RING_EMERALD = "border-sky-400/25";
const SOFT_GRADIENT =
  "bg-[radial-gradient(ellipse_at_top,hsl(210_92%_55%/0.18)_0%,transparent_55%)]";

// ───────────────── SEO
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
    upsertMeta("name", "theme-color", "#070B12");
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

    let canon = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = CANONICAL;

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
        priceRange: "R$49",
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

    return () => {
      document.documentElement.lang = "pt-BR";
    };
  }, []);
};

// ───────────────── FAQ
const faqItems = [
  {
    q: "Isso é golpe? Por que preciso pagar para receber algo gratuito?",
    a: "Não é golpe. A fralda continua 100% gratuita pela Farmácia Popular do SUS. Você paga R$ 49 pelo ato médico — a teleconsulta e a emissão do laudo, que por lei (Resolução CFM 2.314/2022) só pode ser feito por médico com CRM ativo. O laudo é o documento que a farmácia exige para liberar a retirada.",
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

// ───────────────── Logo (Shield + Plus)
const Logo = ({ size = 32 }: { size?: number }) => (
  <div
    className="relative bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/25"
    style={{ width: size, height: size }}
  >
    <Shield className="text-[#070B12]" style={{ width: size * 0.62, height: size * 0.62 }} strokeWidth={2.25} />
    <Plus
      className="absolute text-[#070B12]"
      style={{ width: size * 0.32, height: size * 0.32 }}
      strokeWidth={3}
    />
  </div>
);

// ───────────────── Header
const Header = () => (
  <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#070B12]/70 border-b border-white/[0.06]">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/fralda" className="flex items-center gap-2.5 group">
        <Logo size={32} />
        <span className="font-semibold text-lg tracking-tighter-custom text-white">
          fralda<span className="text-white/40 font-normal">geriátrica</span>
        </span>
      </a>

      <div className="hidden md:flex items-center gap-5">
        <a href="#como-funciona" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Como funciona</a>
        <a href="#calculadora" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Calculadora</a>
        <a href="#faq" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Dúvidas</a>
        <Button
          asChild
          className="rounded-full bg-sky-500 hover:bg-sky-400 text-[#070B12] font-semibold gap-2"
          data-cta-id="header-whatsapp"
        >
          <a href={WHATSAPP}>
            <Sparkles className="w-4 h-4" />
            Pedir meu laudo
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>

      <Button
        asChild
        size="sm"
        className="md:hidden rounded-full bg-sky-500 hover:bg-sky-400 text-[#070B12] font-semibold gap-2"
        data-cta-id="header-whatsapp-mobile"
      >
        <a href={WHATSAPP}>
          <Sparkles className="w-4 h-4" />
          Pedir meu laudo
          <ArrowRight className="w-4 h-4" />
        </a>
      </Button>
    </div>
  </nav>
);

// ───────────────── Hero
const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
    <div className={`absolute inset-0 ${SOFT_GRADIENT} pointer-events-none`} />
    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="text-xs font-medium text-white/70 tracking-tight">
              Direito garantido pela Farmácia Popular do SUS
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tighter-custom mb-6 leading-[1.05]">
            Fralda geriátrica{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-500">
              de graça pelo SUS.
            </span>
            <br className="hidden sm:block" />
            <span className="text-white/80 font-light">A gente emite o laudo médico online.</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/65 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
            Se o seu familiar tem <span className="font-semibold text-white">60 anos ou mais</span> ou é <span className="font-semibold text-white">PCD</span>, ele tem direito por lei a retirar fralda <span className="font-semibold text-white">grátis</span> na Farmácia Popular — basta apresentar um laudo médico. A gente emite esse laudo <span className="font-semibold text-white">100% online, em até 24h úteis</span>.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base bg-sky-500 hover:bg-sky-400 text-[#070B12] font-semibold shadow-xl shadow-sky-500/25 hover:-translate-y-0.5 transition-all gap-2"
              data-cta-id="hero-primary"
            >
              <a href={WHATSAPP}>
                <Sparkles className="w-5 h-5" />
                Quero minha fralda
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base bg-white/[0.03] border-white/15 text-white hover:bg-white/[0.06] hover:text-white gap-2"
              data-cta-id="hero-secondary"
            >
              <a href="#como-funciona">
                Ver como funciona
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-white/45 text-center">
            Sem consulta presencial. Sem agendamento. Sem fila.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-sky-400" />
              Laudo em até 24h úteis
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-sky-400" />
              Economia de até R$ 7.200/ano
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-sky-400" />
              100% online, sem deslocamento
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                CRM Ativo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                Laudo ICP-Brasil
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                LGPD
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// ───────────────── Faixa legal
const FaixaLegal = () => (
  <section className="py-12 border-y border-white/[0.06]">
    <div className="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <div className={`rounded-2xl ${SURFACE} p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5`}>
          <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
            <ScrollText className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-2">
              Base legal pública
            </p>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              A entrega gratuita de fralda geriátrica pela Farmácia Popular é regulamentada pela{" "}
              <strong className="text-white">Portaria GM/MS nº 3.073/2024</strong> e pela{" "}
              <strong className="text-white">Portaria nº 937/2017</strong> do Ministério da Saúde. Qualquer cidadão pode consultar o texto integral no Diário Oficial da União.
            </p>
            <a
              href="https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-3.073-de-26-de-marco-de-2024-552107636"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-sky-400 hover:text-sky-300"
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
    num: "01",
    title: "Triagem pelo WhatsApp",
    desc: "Você envia os dados do seu familiar e a documentação básica em poucos minutos.",
    Icon: ClipboardCheck,
  },
  {
    num: "02",
    title: "Teleconsulta com médico",
    desc: "Vídeo rápido com médico de CRM ativo para avaliar a indicação clínica do uso contínuo.",
    Icon: Video,
  },
  {
    num: "03",
    title: "Laudo digital no WhatsApp",
    desc: "Você recebe o laudo assinado em ICP-Brasil e leva à Farmácia Popular para retirar a fralda.",
    Icon: MessageCircle,
    highlight: true,
  },
];

const ComoFunciona = () => (
  <section id="como-funciona" className="py-24 border-b border-white/[0.06]">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="mb-14 max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Processo
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom">
            Como funciona em 3 passos
          </h2>
          <p className="text-white/60 mt-3 font-light">
            Sem deslocamento. Sem fila. Sem burocracia.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.1}>
            <div
              className={`relative overflow-hidden rounded-3xl p-7 h-full transition-all duration-300 ${
                step.highlight
                  ? "bg-gradient-to-br from-sky-500/[0.12] to-sky-500/[0.02] border border-sky-400/25"
                  : `${SURFACE} ${SURFACE_HOVER}`
              }`}
            >
              {step.highlight && (
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-sky-500/20 rounded-full blur-3xl" />
              )}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-semibold text-white/40 tracking-widest">
                    {step.num}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      step.highlight
                        ? "bg-sky-500/20 text-sky-300"
                        : "bg-white/[0.04] text-white/70"
                    }`}
                  >
                    <step.Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {step.desc}
                </p>
                {step.highlight && (
                  <div className="mt-6 inline-flex items-center gap-2 text-sky-300 text-[10px] font-semibold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-dot" />
                    Entrega no mesmo dia
                  </div>
                )}
              </div>
              <step.Icon
                className={`absolute -bottom-8 -right-8 w-[160px] h-[160px] -rotate-12 ${
                  step.highlight ? "text-sky-400/[0.06]" : "text-white/[0.025]"
                }`}
                strokeWidth={0.5}
              />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// ───────────────── Para quem
const ParaQuem = () => (
  <section className="py-24 border-b border-white/[0.06]">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="mb-14 max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Elegibilidade
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom">
            Para quem é o laudo
          </h2>
          <p className="text-white/60 mt-3 font-light">
            Dois perfis com direito garantido em lei.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            Icon: HeartHandshake,
            title: "Idosos a partir de 60 anos",
            items: [
              "Com indicação clínica de uso contínuo da fralda.",
              "Em quadros de incontinência, mobilidade reduzida ou acamamento.",
              "Atendimento via familiar ou cuidador, 100% online.",
            ],
          },
          {
            Icon: Accessibility,
            title: "Pessoas com deficiência",
            items: [
              "Crianças, adultos e idosos PCD com necessidade comprovada.",
              "Avaliação médica considera o quadro clínico individual.",
              "Procurador legal pode acompanhar a teleconsulta.",
            ],
          },
        ].map((b, i) => (
          <ScrollReveal key={b.title} delay={i * 0.1}>
            <div className={`rounded-3xl ${SURFACE} ${SURFACE_HOVER} p-8 h-full transition-all`}>
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6">
                <b.Icon className="w-5 h-5 text-sky-400" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                {b.title}
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// ───────────────── Quanto custa
const QuantoCusta = () => (
  <section className="py-24 border-b border-white/[0.06]">
    <div className="max-w-3xl mx-auto px-6">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Transparência
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom mb-3">
            A fralda é grátis. <span className="text-white/50 font-light">Você paga só a consulta.</span>
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto">
            A lei só permite que um médico com CRM emita o laudo. Pagamento único, sem mensalidade, sem pegadinha.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.08] p-8 sm:p-10">
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-3">
              Teleconsulta + emissão do laudo
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-medium text-white/70">R$</span>
              <span className="text-6xl sm:text-7xl font-semibold text-white tracking-tighter-custom leading-none">
                49
              </span>
              <span className="text-xl text-white/50">,00</span>
              <span className="text-sm text-white/50 ml-2 self-end mb-1.5">· pagamento único</span>
            </div>
            <p className="text-sm text-white/55 mb-8 leading-relaxed">
              Você paga só pela emissão do laudo médico. <span className="text-white">A fralda continua 100% gratuita pelo SUS.</span>
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-2">
                  Sem o laudo
                </p>
                <p className="text-2xl font-semibold text-white tracking-tight line-through decoration-red-400/40">
                  R$ 300 – R$ 600
                </p>
                <p className="text-xs text-white/45 mt-1">
                  por mês com fralda paga em farmácia
                </p>
              </div>
              <div className="rounded-2xl border border-sky-400/25 bg-sky-500/[0.08] p-5">
                <p className="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-2">
                  Economia em 12 meses
                </p>
                <p className="text-2xl font-semibold text-white tracking-tight">
                  Até R$ 7.200
                </p>
                <p className="text-xs text-white/55 mt-1">
                  retirando pelo Farmácia Popular
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full rounded-full py-6 text-base bg-sky-500 hover:bg-sky-400 text-[#070B12] font-semibold shadow-xl shadow-sky-500/25 hover:-translate-y-0.5 transition-all gap-2"
              data-cta-id="pricing-primary"
            >
              <a href={WHATSAPP}>
                <Sparkles className="w-5 h-5" />
                Quero meu laudo
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <p className="mt-4 text-[11px] text-white/40 text-center">
              Disponibilidade da fralda depende da unidade da Farmácia Popular.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ───────────────── Calculadora de tamanho da fralda (por peso)
type SizeKey = "P" | "M" | "G" | "XG";
const SIZE_TABLE: { key: SizeKey; label: string; range: string; min: number; max: number; desc: string }[] = [
  { key: "P", label: "Pequeno (P)", range: "40 – 60 kg", min: 40, max: 60, desc: "Pessoas magras ou de baixa estatura." },
  { key: "M", label: "Médio (M)", range: "55 – 80 kg", min: 55, max: 80, desc: "Faixa de peso mais comum entre adultos." },
  { key: "G", label: "Grande (G)", range: "75 – 100 kg", min: 75, max: 100, desc: "Adultos de porte maior." },
  { key: "XG", label: "Extra Grande (XG)", range: "95 – 130 kg", min: 95, max: 130, desc: "Pessoas obesas ou de quadril largo." },
];

// Quando o peso cai em sobreposição entre faixas, escolhe aquela cuja média está mais próxima.
const pickSize = (kg: number) => {
  const matches = SIZE_TABLE.filter((s) => kg >= s.min && kg <= s.max);
  if (matches.length === 0) {
    if (kg < SIZE_TABLE[0].min) return SIZE_TABLE[0];
    return SIZE_TABLE[SIZE_TABLE.length - 1];
  }
  return matches.reduce((best, cur) => {
    const bMid = (best.min + best.max) / 2;
    const cMid = (cur.min + cur.max) / 2;
    return Math.abs(cMid - kg) < Math.abs(bMid - kg) ? cur : best;
  });
};

const Calculadora = () => {
  const [kg, setKg] = useState<string>("");
  const value = parseInt(kg, 10);
  const valid = !isNaN(value) && value >= 30 && value <= 200;
  const recommended = valid ? pickSize(value) : null;

  return (
    <section id="calculadora" className="py-24 border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-3">
              Ferramenta gratuita
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom mb-3">
              Descubra o tamanho certo da fralda
            </h2>
            <p className="text-white/60 font-light">
              Informe o peso aproximado do seu familiar para receber uma indicação média do tamanho ideal — útil antes de retirar na Farmácia Popular.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className={`rounded-3xl ${SURFACE} p-6 sm:p-8 grid md:grid-cols-2 gap-8`}>
            {/* Input */}
            <div>
              <label htmlFor="peso" className="block text-sm font-medium text-white/80 mb-3">
                Peso aproximado
              </label>
              <div className="relative">
                <input
                  id="peso"
                  type="number"
                  inputMode="numeric"
                  min={30}
                  max={200}
                  placeholder="Ex: 70"
                  value={kg}
                  onChange={(e) => setKg(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.10] rounded-2xl px-5 py-4 pr-16 text-2xl font-semibold text-white placeholder:text-white/25 focus:outline-none focus:border-sky-400/50 focus:bg-white/[0.06] transition-all"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-white/40">
                  kg
                </span>
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs text-white/50 leading-relaxed">
                <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Se houver muita oscilação de peso ou quadril largo desproporcional, escolha o tamanho imediatamente acima.
                </span>
              </div>
            </div>

            {/* Resultado */}
            <div className="md:border-l md:border-white/[0.06] md:pl-8">
              {!valid ? (
                <div className="h-full flex flex-col justify-center text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <Sparkles className="w-5 h-5 text-white/40" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm text-white/50">
                    Digite o peso em quilos para ver o tamanho recomendado.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-2">
                    Tamanho recomendado
                  </p>
                  <p className="text-5xl font-semibold text-white tracking-tighter-custom mb-1">
                    {recommended!.key}
                  </p>
                  <p className="text-sm text-white/70 mb-4">{recommended!.label} · {recommended!.range}</p>
                  <p className="text-sm text-white/55 leading-relaxed">{recommended!.desc}</p>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Tabela de referência */}
        <ScrollReveal delay={0.2}>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {SIZE_TABLE.map((s) => {
              const isActive = recommended?.key === s.key;
              return (
                <div
                  key={s.key}
                  className={`rounded-2xl p-4 border transition-all ${
                    isActive
                      ? "border-sky-400/40 bg-sky-500/[0.08]"
                      : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <p className={`text-xs font-semibold mb-1 ${isActive ? "text-sky-300" : "text-white/50"}`}>
                    {s.key}
                  </p>
                  <p className="text-sm text-white/80">{s.range}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-6 text-[11px] text-white/40 text-center max-w-2xl mx-auto leading-relaxed">
            Estimativa orientativa baseada na média entre fabricantes (Bigfral, Tena, Plenitud). O tamanho final dispensado pela Farmácia Popular pode variar conforme estoque e marca disponível na unidade.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ───────────────── O que você recebe
const OQueRecebe = () => {
  const items = [
    { Icon: FileSignature, title: "Laudo médico em PDF", desc: "Assinado digitalmente em ICP-Brasil, com validade jurídica." },
    { Icon: PackageCheck, title: "Modelo aceito pela Farmácia Popular", desc: "Documento no formato exigido pelo programa, pronto para retirada." },
    { Icon: RefreshCw, title: "Reemissão gratuita", desc: "Se a unidade pedir ajuste pontual, refazemos sem cobrança extra." },
    { Icon: HeadphonesIcon, title: "Orientação por WhatsApp", desc: "Equipe explica passo a passo como retirar a fralda na sua cidade." },
    { Icon: BellRing, title: "Lembrete de renovação", desc: "Avisamos antes do laudo vencer, para não interromper o benefício." },
    { Icon: ShieldCheck, title: "Conformidade CFM", desc: "Atendimento conduzido por médico com CRM ativo (Res. 2.314/2022)." },
  ];
  return (
    <section className="py-24 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-3">
              O que você recebe
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom">
              Tudo que está incluso nos R$ 49
            </h2>
            <p className="text-white/60 mt-3 font-light">
              Nada de letras miúdas. Veja exatamente o que entregamos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <ScrollReveal key={it.title} delay={i * 0.07}>
              <div className={`rounded-3xl ${SURFACE} ${SURFACE_HOVER} p-6 h-full transition-all`}>
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                  <it.Icon className="w-5 h-5 text-sky-400" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5 tracking-tight">{it.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{it.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────── FAQ
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 border-b border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 mb-3">
              Dúvidas
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom">
              Perguntas frequentes
            </h2>
            <p className="text-white/60 mt-3 font-light">
              Respostas diretas às dúvidas mais comuns dos familiares.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {faqItems.map((item, i) => (
            <Collapsible
              key={i}
              open={open === i}
              onOpenChange={(v) => setOpen(v ? i : null)}
            >
              <div
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  open === i
                    ? "border-sky-400/25 bg-white/[0.04]"
                    : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.035]"
                }`}
              >
                <CollapsibleTrigger className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className="text-sm sm:text-base font-medium text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${
                      open === i ? "rotate-180 text-sky-400" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-5 pb-5 text-sm text-white/65 leading-relaxed">
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
  <section className="py-24">
    <div className="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/[0.10] via-white/[0.02] to-transparent p-10 sm:p-14 text-center">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-300">
                Atendimento humano, hoje
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tighter-custom mb-4 max-w-xl mx-auto leading-tight">
              Tire dúvida com a equipe médica agora.
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto font-light">
              Resposta humana em poucos minutos, das 7h às 22h. Atendimento conduzido por médico
              com CRM ativo, em conformidade com a Resolução CFM 2.314/2022.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base bg-sky-500 hover:bg-sky-400 text-[#070B12] font-semibold shadow-xl shadow-sky-500/30 hover:-translate-y-0.5 transition-all gap-2"
              data-cta-id="cta-final"
            >
              <a href={WHATSAPP}>
                <Sparkles className="w-5 h-5" />
                Começar meu pedido
                <ArrowRight className="w-5 h-5" />
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
  <footer className="pt-16 pb-12 border-t border-white/[0.06]">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Logo size={24} />
            <span className="font-semibold text-base tracking-tighter-custom text-white">
              fraldageriatrica.com
            </span>
          </div>
          <p className="text-sm text-white/50 max-w-xs">
            Telemedicina ética para famílias que cuidam.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm">
          <a href="#como-funciona" className="text-white/55 hover:text-sky-400 transition-colors">Como funciona</a>
          <a href="#calculadora" className="text-white/55 hover:text-sky-400 transition-colors">Calculadora</a>
          <a href="#faq" className="text-white/55 hover:text-sky-400 transition-colors">Dúvidas</a>
          <a href="#" className="text-white/55 hover:text-sky-400 transition-colors">Privacidade (LGPD)</a>
          <a href="#" className="text-white/55 hover:text-sky-400 transition-colors">Termos</a>
        </div>
      </div>

      <div className="border-t border-white/[0.06] pt-6 text-xs text-white/45">
        <p>CNPJ: {CNPJ} · {ENDERECO}</p>
      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.06]">
        <p className="text-[10px] text-white/35 leading-relaxed max-w-3xl">
          Este serviço não substitui atendimento presencial de emergência. A
          emissão do laudo está sujeita à avaliação médica individual conforme
          a Resolução CFM 2.314/2022. A fralda geriátrica é fornecida
          gratuitamente pelo programa Farmácia Popular do SUS, conforme as
          Portarias GM/MS nº 3.073/2024 e nº 937/2017; este site não
          comercializa o produto. Disponibilidade e quantitativo dependem da
          unidade da Farmácia Popular.
        </p>
        <p className="text-[10px] text-white/30 mt-3">
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
    <div className={`min-h-screen ${BG} ${TEXT} antialiased selection:bg-sky-500/30`}>
      <Header />
      <main>
        <Hero />
        <FaixaLegal />
        <ComoFunciona />
        <ParaQuem />
        <QuantoCusta />
        <OQueRecebe />
        <Calculadora />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
};

export default Fralda;
