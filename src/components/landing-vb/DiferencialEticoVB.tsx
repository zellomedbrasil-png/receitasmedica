import { Shield } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const DiferencialEticoVB = () => {
  return (
    <section className="border-b border-white/5 bg-[#0F1115] py-20 md:py-24" aria-labelledby="etica-titulo">
      <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-5 lg:items-center">
        <ScrollReveal className="lg:col-span-3">
          <div className="space-y-6">
            <h2
              id="etica-titulo"
              className="tracking-tighter-custom max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Médicos que prescrevem pensando em você, não na indústria
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/70">
              Nossos médicos não têm vínculo com nenhum laboratório farmacêutico. Isso significa que a prescrição é feita pelo{" "}
              <strong className="text-white">princípio ativo (DCB)</strong> — o nome genérico da substância.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-white/70">
              Na prática, você tem liberdade para escolher o medicamento mais acessível na farmácia. O mesmo tratamento, com preço justo.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} direction="left" className="lg:col-span-2">
          <div className="rounded-3xl border border-emerald/30 bg-gradient-to-br from-emerald/10 to-emerald/5 p-7 backdrop-blur-xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/20 text-emerald">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Prescrição pelo princípio ativo
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                Sem vínculo com laboratório
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                Sua liberdade de escolha na farmácia
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                Mesmo tratamento, preço justo
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DiferencialEticoVB;
