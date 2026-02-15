import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqData = [
  {
    q: "A receita digital é aceita em qualquer farmácia?",
    a: "Sim. As receitas possuem QR Code e assinatura digital padrão ICP-Brasil, sendo aceitas em qualquer farmácia do território nacional por regulamentação da Anvisa.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Aceitamos PIX para aprovação imediata e Cartão de Crédito. Utilizamos processadores de pagamento seguros e criptografados.",
  },
  {
    q: "Se o médico não aprovar, recebo reembolso?",
    a: "Com certeza. Se durante a triagem ou consulta o médico identificar que não é possível renovar sua receita digitalmente, estornamos 100% do valor pago.",
  },
  {
    q: "Quanto tempo demora o atendimento?",
    a: "O processo todo leva em média 15 a 30 minutos. Após preencher seus dados, você entra em uma fila de espera curta para a validação médica.",
  },
  {
    q: "Posso renovar receita amarela ou azul?",
    a: "Não. Receitas de controle especial (Amarelas A e Azuis B) exigem o talão físico por lei e não podem ser emitidas digitalmente, apenas a Receita de Controle Especial em duas vias (branca).",
  },
  {
    q: "Preciso baixar algum aplicativo?",
    a: "Não é necessário. Todo o processo é feito pelo navegador do seu celular ou computador, e a receita chega via SMS ou WhatsApp.",
  },
  {
    q: "O atendimento funciona no fim de semana?",
    a: "Sim! Temos médicos de plantão todos os dias, incluindo sábados, domingos e feriados, das 07h às 23h.",
  },
  {
    q: "É seguro enviar meus dados?",
    a: "Totalmente. Seguimos a LGPD e utilizamos criptografia de ponta a ponta. Seus dados médicos são confidenciais e acessados apenas pelo médico responsável.",
  },
];

const FAQ = () => {
  const col1 = faqData.slice(0, 4);
  const col2 = faqData.slice(4);

  return (
    <section id="faq" className="py-24 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom mb-4">Perguntas Frequentes</h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Tire suas dúvidas sobre o processo, legalidade e funcionamento da nossa plataforma.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {[col1, col2].map((col, ci) => (
            <ScrollReveal key={ci} delay={ci * 0.15}>
              <Accordion type="single" collapsible className="space-y-4">
                {col.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${ci}-${i}`}
                    className="border border-border rounded-xl bg-card hover:border-primary/30 transition-colors px-5"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground text-sm hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all gap-2">
              <a href="https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica." target="_blank" rel="noopener noreferrer">
                Renovar Agora
                <ArrowRight className="w-[18px] h-[18px]" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
