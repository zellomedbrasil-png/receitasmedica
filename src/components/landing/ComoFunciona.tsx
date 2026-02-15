import { ClipboardCheck, Video, MessageCircle } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Triagem Digital",
    desc: "Preencha seus dados e envie foto da receita anterior ou laudo.",
    Icon: ClipboardCheck,
    dark: false,
  },
  {
    num: "2",
    title: "Teleconsulta",
    desc: "Vídeo chamada rápida com médico para validar a continuidade.",
    Icon: Video,
    dark: false,
  },
  {
    num: "3",
    title: "Receita no WhatsApp",
    desc: "Link com assinatura digital enviado direto para seu celular.",
    Icon: MessageCircle,
    dark: true,
  },
];

const ComoFunciona = () => {
  return (
    <section id="como-funciona" className="py-20 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom">Processo Simplificado</h2>
          <p className="text-muted-foreground mt-2 font-light">Tecnologia a favor da sua saúde em 3 passos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`rounded-3xl p-8 relative overflow-hidden group transition-colors duration-300 ${
                step.dark
                  ? "bg-slate-900 border border-slate-800"
                  : "bg-secondary border border-border hover:border-primary/30"
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${
                    step.dark
                      ? "bg-white/10 border-white/10 text-white backdrop-blur-md"
                      : "bg-card border-border text-foreground"
                  }`}
                >
                  <span className="font-bold font-mono">{step.num}</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 tracking-tight ${step.dark ? "text-white" : "text-foreground"}`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed ${step.dark ? "text-slate-400" : "text-muted-foreground"}`}>
                  {step.desc}
                </p>

                {step.dark && (
                  <div className="mt-8 inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                    Entrega Imediata
                  </div>
                )}
              </div>

              {/* Decorative icon */}
              <step.Icon
                className={`absolute -bottom-4 -right-4 w-[140px] h-[140px] -rotate-[15deg] transition-colors duration-500 ${
                  step.dark
                    ? "text-white/5"
                    : "text-slate-200 group-hover:text-primary/10"
                }`}
                strokeWidth={0.5}
              />

              {step.dark && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;
