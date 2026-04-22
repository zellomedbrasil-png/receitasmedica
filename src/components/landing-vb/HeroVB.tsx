import { ArrowDown, FileCheck2, ShieldCheck, Stethoscope } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const WHATSAPP_URL =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero renovar minha receita médica.");

const HeroVB = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#0F1115]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-emerald/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-emerald-glow/10 blur-[120px]" />
      </div>

      <div className="container relative mx-auto grid gap-16 px-4 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-12">
        <ScrollReveal>
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 text-xs font-medium text-emerald">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              Telemedicina • Resolução CFM 2.314/2022
            </div>

            <h1 className="tracking-tighter-custom text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Renove sua receita médica em até{" "}
              <span className="text-emerald">1 hora</span>, sem sair de casa
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-white/65">
              Médicos com CRM ativo, prescrição pelo princípio ativo, receita digital válida em qualquer farmácia do Brasil.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-variant="B"
                data-cta-id="hero-primary"
                className="inline-flex h-14 items-center justify-center rounded-full bg-emerald px-8 text-base font-semibold text-white shadow-[0_8px_32px_-8px_hsl(var(--emerald)/0.7)] transition-all hover:bg-emerald-glow hover:shadow-[0_12px_40px_-8px_hsl(var(--emerald)/0.8)]"
              >
                Renovar Minha Receita
              </a>
              <a
                href="#como-funciona"
                data-variant="B"
                data-cta-id="hero-secondary"
                className="group inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Ver como funciona
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>

            <p className="text-xs text-white/40">
              Receitas renovadas com segurança e ética desde 2024.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} direction="left">
          <div className="relative mx-auto w-full max-w-md">
            {/* Mockup card */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl shadow-[0_24px_80px_-20px_rgba(16,185,129,0.25)]">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald/15">
                    <Stethoscope className="h-4 w-4 text-emerald" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Receita Digital</p>
                    <p className="text-[10px] text-white/50">ICP-Brasil válida</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald/15 px-2.5 py-1 text-[10px] font-medium text-emerald">
                  <ShieldCheck className="h-3 w-3" />
                  Assinada
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Paciente</p>
                  <p className="text-sm font-medium text-white/90">Maria S.</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Princípio ativo</p>
                  <p className="text-sm font-medium text-white/90">Losartana 50mg</p>
                  <p className="mt-1 text-xs text-white/50">1 comp. ao dia • uso contínuo</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-emerald/20 bg-emerald/5 p-3">
                  <FileCheck2 className="h-4 w-4 shrink-0 text-emerald" />
                  <p className="text-xs text-white/80">
                    Válida em qualquer farmácia do Brasil
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-white/40">
                <span>Dr. Médico • CRM ativo</span>
                <span>Emitida hoje</span>
              </div>
            </div>

            {/* Floating glow */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-emerald/30 blur-3xl" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroVB;
