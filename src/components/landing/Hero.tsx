import { ShieldCheck, Lock, BadgeCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--emerald)/0.15)_0%,transparent_70%)] top-[-100px] left-1/2 -translate-x-1/2 z-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium text-muted-foreground tracking-tight">Plantão Médico Online Agora</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-foreground tracking-tighter-custom mb-6 leading-[1.1]">
              Renove sua receita{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-glow">
                sem sair de casa.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light max-w-xl mx-auto">
              Telemedicina focada na continuidade do seu tratamento. Avaliação rápida, segura e receita digital válida em todo o Brasil.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-base shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all gap-2">
                <FileText className="w-5 h-5" />
                Solicitar Receita
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-base bg-card hover:bg-secondary gap-2">
                Verificar medicamentos
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">ICP-Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dados Seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">CRM Ativo</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
