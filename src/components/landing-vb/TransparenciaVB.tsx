import { Check, X } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const renovamos = [
  "Hipertensão (pressão alta)",
  "Diabetes",
  "Hipotireoidismo (tireoide)",
  "Colesterol alto",
  "Anticoncepcional de uso contínuo",
  "Asma estável",
  "Depressão e ansiedade (medicamentos de uso contínuo liberados por telemedicina)",
];

const naoFazemos = [
  "Receitas amarelas (lista A) e azuis (lista B) — Portaria 344/98",
  "Atestados médicos",
  "Diagnósticos novos",
  "Atendimento de urgência ou emergência",
  "Prescrição de medicamentos novos sem histórico",
];

const TransparenciaVB = () => {
  return (
    <section
      className="border-b border-white/5 bg-[#0F1115] py-20 md:py-24"
      aria-labelledby="transparencia-titulo"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2
            id="transparencia-titulo"
            className="tracking-tighter-custom mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Transparência total: o que fazemos e o que não fazemos
          </h2>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-3xl border border-emerald/30 bg-gradient-to-br from-emerald/10 to-emerald/5 p-7 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald/20 text-emerald">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">O que renovamos</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/80">
                {renovamos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-3xl border border-[hsl(0_72%_51%)]/30 bg-gradient-to-br from-[hsl(0_72%_51%)]/[0.08] to-white/[0.02] p-7 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(0_72%_51%)]/15 text-[hsl(0_85%_70%)]">
                  <X className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">O que NÃO fazemos</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/80">
                {naoFazemos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(0_85%_70%)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-white/60">
            Essas regras existem para sua segurança. O receitas.site não substitui o acompanhamento médico regular com seu especialista — somos o elo que garante que seu tratamento contínuo não pare entre uma consulta e outra.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TransparenciaVB;
