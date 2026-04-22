import { ClipboardList, MessageCircle, Video } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Triagem digital rápida",
    text: "Você preenche informações sobre o remédio que já usa.",
  },
  {
    n: "02",
    icon: Video,
    title: "Teleconsulta com médico CRM",
    text: "Avaliação clínica individual do seu caso.",
  },
  {
    n: "03",
    icon: MessageCircle,
    title: "Receita no WhatsApp",
    text: "Receita digital com assinatura ICP-Brasil em até 1 hora.",
  },
];

const ComoFuncionaVB = () => {
  return (
    <section
      id="como-funciona"
      className="border-b border-white/5 bg-[#0F1115] py-20 md:py-24"
      aria-labelledby="como-funciona-titulo"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2
            id="como-funciona-titulo"
            className="tracking-tighter-custom mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Em 3 passos simples
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.n} delay={idx * 0.1}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-all hover:border-emerald/30">
                  <span className="absolute right-5 top-5 text-5xl font-semibold text-white/5">
                    {s.n}
                  </span>
                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{s.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-white/40">
            Válida em qualquer farmácia do Brasil. Conforme Resolução CFM 2.314/2022.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ComoFuncionaVB;
