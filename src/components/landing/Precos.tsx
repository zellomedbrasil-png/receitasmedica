import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const included = [
  "Triagem digital completa",
  "Teleconsulta com médico CRM ativo",
  "Receita digital com assinatura ICP-Brasil",
  "Envio via WhatsApp ou SMS",
  "Suporte pós-consulta",
  "QR Code de verificação",
];

const Precos = () => {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom mb-4">Transparência Total</h2>
          <p className="text-muted-foreground mb-12 font-light">Sem surpresas. Valor único que inclui tudo.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="bg-background rounded-3xl border border-border p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wide">Consulta + Receita</p>
              <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="text-sm text-muted-foreground">R$</span>
                <span className="text-6xl font-semibold text-foreground tracking-tighter-custom">39</span>
                <span className="text-sm text-muted-foreground">,00</span>
              </div>
              <ul className="space-y-3 text-left mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-full rounded-full py-6 text-base shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all">
                <a href="https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica." target="_blank" rel="noopener noreferrer">
                  Renovar minha Receita
                </a>
              </Button>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Reembolso integral se o médico não aprovar
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Precos;
