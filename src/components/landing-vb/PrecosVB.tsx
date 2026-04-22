import { Check, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const WA_AVULSA =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero fazer uma Consulta Avulsa - R$ 59.");
const WA_TRANQUILO =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero assinar o Plano Tranquilo - R$ 47/mês.");

const avulsaItems = [
  "1 renovação de receita",
  "Médico com CRM ativo",
  "Receita digital no WhatsApp em até 1 hora",
  "Válida em qualquer farmácia do Brasil",
  "Prescrição pelo princípio ativo",
];

const tranquiloBase = [
  "Renovações ilimitadas durante o mês",
  "Médico com CRM ativo sempre disponível",
  "Receita digital no WhatsApp em até 1 hora",
  "Válida em qualquer farmácia do Brasil",
  "Prescrição pelo princípio ativo",
];

const tranquiloBonus = [
  { label: "Bônus 1", text: "Guia \"O Código da Farmácia\" (PDF exclusivo)" },
  { label: "Bônus 2", text: "Lembrete no WhatsApp 7 dias antes da receita vencer" },
  { label: "Bônus 3", text: "Atendimento também em finais de semana" },
];

const PrecosVB = () => {
  return (
    <section
      id="precos"
      className="border-b border-white/5 bg-[#0F1115] py-20 md:py-28"
      aria-labelledby="precos-titulo"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2
            id="precos-titulo"
            className="tracking-tighter-custom mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Escolha o plano ideal para você
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-white/55">
            Sem letras miúdas. Sem fidelidade. Você decide quando e como usar.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Plano Tranquilo (DESTAQUE) — primeiro no mobile */}
          <ScrollReveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative h-full rounded-3xl border-2 border-emerald bg-gradient-to-br from-emerald/[0.08] to-white/[0.02] p-8 shadow-[0_24px_80px_-20px_hsl(var(--emerald)/0.35)] backdrop-blur-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-[0_8px_24px_-6px_hsl(var(--emerald)/0.7)]">
                  <Sparkles className="h-3 w-3" />
                  Mais escolhido
                </span>
              </div>

              <div className="mb-6">
                <h3 className="mb-1 text-xl font-semibold text-white">Plano Tranquilo</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-semibold tracking-tight text-white">R$ 47</span>
                  <span className="text-sm text-white/55">/mês</span>
                </div>
                <p className="mt-2 text-xs text-white/55">Menos de R$ 1,60 por dia</p>
              </div>

              <ul className="mb-5 space-y-3 text-sm text-white/80">
                {tranquiloBase.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6 space-y-3 rounded-2xl border border-emerald/20 bg-emerald/5 p-4">
                {tranquiloBonus.map((b) => (
                  <div key={b.label} className="flex items-start gap-3 text-sm">
                    <span className="rounded-md bg-emerald/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald">
                      {b.label}
                    </span>
                    <span className="text-white/85">{b.text}</span>
                  </div>
                ))}
              </div>

              <a
                href={WA_TRANQUILO}
                target="_blank"
                rel="noopener noreferrer"
                data-variant="B"
                data-cta-id="precos-tranquilo"
                className="inline-flex h-13 w-full items-center justify-center rounded-full bg-emerald py-4 text-base font-semibold text-white shadow-[0_8px_28px_-8px_hsl(var(--emerald)/0.7)] transition-all hover:bg-emerald-glow"
              >
                Assinar o Plano Tranquilo
              </a>
              <p className="mt-3 text-center text-xs text-white/45">
                Cancele quando quiser. Sem fidelidade.
              </p>
            </div>
          </ScrollReveal>

          {/* Avulsa */}
          <ScrollReveal className="order-2 lg:order-1">
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
              <div className="mb-6">
                <h3 className="mb-1 text-xl font-semibold text-white">Consulta Avulsa</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-semibold tracking-tight text-white">R$ 59</span>
                </div>
                <p className="mt-2 text-xs text-white/55">Pagamento único • Uma renovação</p>
              </div>

              <ul className="mb-8 space-y-3 text-sm text-white/80">
                {avulsaItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WA_AVULSA}
                target="_blank"
                rel="noopener noreferrer"
                data-variant="B"
                data-cta-id="precos-avulsa"
                className="inline-flex h-13 w-full items-center justify-center rounded-full border border-emerald/60 bg-transparent py-4 text-base font-semibold text-emerald transition-all hover:bg-emerald/10"
              >
                Renovar Agora
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PrecosVB;
