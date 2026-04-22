import { Calendar, Clock, DollarSign, Users } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const items = [
  {
    icon: Clock,
    text: "Fim de semana e acabou o remédio da pressão",
  },
  {
    icon: Calendar,
    text: "Próxima vaga do convênio: daqui 45 dias",
  },
  {
    icon: Users,
    text: "Cuidando dos pais idosos e renovar receita virou mais uma batalha",
  },
  {
    icon: DollarSign,
    text: "Pagando caro em remédio de marca por hábito da prescrição",
  },
];

const DorVB = () => {
  return (
    <section className="border-b border-white/5 bg-[#0F1115] py-20 md:py-24" aria-labelledby="dor-titulo">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2
            id="dor-titulo"
            className="tracking-tighter-custom mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Você reconhece alguma dessas situações?
          </h2>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-emerald/30 hover:bg-white/[0.04]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base leading-relaxed text-white/80">{item.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DorVB;
