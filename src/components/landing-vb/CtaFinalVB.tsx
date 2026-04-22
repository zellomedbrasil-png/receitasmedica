import ScrollReveal from "@/components/landing/ScrollReveal";

const WA_AVULSA =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero fazer uma Consulta Avulsa - R$ 59.");
const WA_TRANQUILO =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero assinar o Plano Tranquilo - R$ 47/mês.");

const CtaFinalVB = () => {
  return (
    <section className="bg-[#0F1115] py-20 md:py-24" aria-labelledby="cta-final-titulo">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B2F4A] p-10 text-center md:p-16">
            {/* Glow accents */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-glow/15 blur-[100px]" />

            <div className="relative">
              <h2
                id="cta-final-titulo"
                className="tracking-tighter-custom mx-auto max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
              >
                Pronto para renovar sua receita?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
                Médico com CRM ativo, receita no WhatsApp em até 1 hora.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={WA_TRANQUILO}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-variant="B"
                  data-cta-id="cta-final-tranquilo"
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-emerald px-8 text-base font-semibold text-white shadow-[0_12px_40px_-8px_hsl(var(--emerald)/0.7)] transition-all hover:bg-emerald-glow sm:w-auto"
                >
                  Assinar Plano Tranquilo — R$ 47/mês
                </a>
                <a
                  href={WA_AVULSA}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-variant="B"
                  data-cta-id="cta-final-avulsa"
                  className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
                >
                  Fazer Consulta Avulsa — R$ 59
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CtaFinalVB;
