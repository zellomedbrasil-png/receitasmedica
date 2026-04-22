import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/landing/ScrollReveal";

const faqs = [
  {
    q: "A receita digital é válida em qualquer farmácia?",
    a: "Sim. Nossas receitas são assinadas digitalmente com certificado ICP-Brasil, o mesmo padrão usado em documentos oficiais. São aceitas em todas as farmácias do Brasil conforme a Resolução CFM 2.314/2022.",
  },
  {
    q: "Preciso ter a receita antiga para renovar?",
    a: "Sim. Para renovação de uso contínuo, você precisa anexar sua receita anterior ou relatório médico comprovando o tratamento.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Na maioria dos casos, você recebe sua receita digital no WhatsApp em até 1 hora após a teleconsulta.",
  },
  {
    q: "E se o médico avaliar que não pode renovar minha receita?",
    a: "Se por critério clínico a renovação não for possível, devolvemos 100% do valor pago.",
  },
  {
    q: "Vocês renovam receita de medicamento controlado?",
    a: "Renovamos medicamentos de uso contínuo da lista C1 (receita branca de controle especial) que podem ser prescritos por telemedicina. Não renovamos receitas amarelas (lista A) nem azuis (lista B).",
  },
  {
    q: "Posso cancelar o Plano Tranquilo quando quiser?",
    a: "Sim. Sem fidelidade, sem multa. O cancelamento é feito pelo próprio portal.",
  },
  {
    q: "Os médicos têm CRM ativo?",
    a: "Sim. Todos os médicos da plataforma têm CRM ativo e registro regular junto ao Conselho Regional de Medicina. Você pode verificar o CRM do médico que te atendeu diretamente na receita emitida.",
  },
  {
    q: "Esse serviço substitui meu médico regular?",
    a: "Não. O receitas.site é um serviço de renovação de receitas para tratamentos já em curso. Recomendamos o acompanhamento médico regular com seu especialista.",
  },
];

const FaqVB = () => {
  return (
    <section
      id="faq"
      className="border-b border-white/5 bg-[#0F1115] py-20 md:py-24"
      aria-labelledby="faq-titulo"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2
            id="faq-titulo"
            className="tracking-tighter-custom mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Perguntas frequentes
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-6 backdrop-blur-xl transition-colors hover:border-emerald/30 [&[data-state=open]]:border-emerald/30"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-white hover:no-underline">
                    <span className="flex items-start gap-4">
                      <span className="text-sm font-semibold text-emerald">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-9 pr-2 text-sm leading-relaxed text-white/65">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FaqVB;
