import { Shield } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const GarantiaVB = () => {
  return (
    <section
      className="border-b border-white/5 bg-[#0F1115] py-20 md:py-24"
      aria-labelledby="garantia-titulo"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2
            id="garantia-titulo"
            className="tracking-tighter-custom mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Sua segurança é nosso compromisso
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-emerald/30 bg-gradient-to-br from-emerald/10 to-emerald/5 p-8 text-center backdrop-blur-xl md:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/20 text-emerald">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-white">Garantia de Reembolso</h3>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-white/75">
              Se após a teleconsulta o médico avaliar que não é possível renovar sua receita com segurança clínica, devolvemos <strong className="text-white">100% do valor pago</strong>. Simples assim, sem letras miúdas.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GarantiaVB;
