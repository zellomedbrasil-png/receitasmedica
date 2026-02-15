import { CheckCircle, XCircle, Heart, Brain, User, Pill, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const categoriasVerdes = [
  {
    icon: Heart,
    title: "Saúde Cardiovascular e Metabólica",
    desc: "Uso contínuo para hipertensão, diabetes, colesterol e ácido úrico.",
    exemplos: "Losartana, Metformina, Glifage, Rosuvastatina",
  },
  {
    icon: Brain,
    title: "Saúde Mental — Receita Branca 2 Vias",
    desc: "Antidepressivos, ansiolíticos leves e estabilizadores de humor.",
    exemplos: "Sertralina, Fluoxetina, Escitalopram, Amitriptilina",
  },
  {
    icon: User,
    title: "Saúde da Mulher & Endócrina",
    desc: "Anticoncepcionais, reposição hormonal e tratamento de tireoide.",
    exemplos: "Puran T4, pílulas anticoncepcionais",
  },
  {
    icon: Pill,
    title: "Outros Tratamentos Contínuos",
    desc: "Asma, alergias crônicas, dermatologia básica e antibióticos.",
    exemplos: "Sujeito à avaliação médica",
  },
];

const categoriasVermelhas = [
  {
    tag: "LEI",
    title: "Receitas Amarelas e Azuis",
    desc: "Restrição da Anvisa (Notificação A e B).",
    exemplos: "Ritalina, Venvanse, Roacutan, Sibutramina, Clonazepam",
  },
  {
    tag: "PS",
    title: "Emergências Médicas",
    desc: "Dores agudas, febre alta, falta de ar.",
    exemplos: "Busque o Pronto Socorro",
  },
  {
    tag: "INSS",
    title: "Atestados para Afastamento",
    desc: "Não emitimos atestados médicos ou laudos para INSS/Trabalho neste serviço.",
    exemplos: "",
  },
];

const WA_LINK = "https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica.";

const CriteriosAtendimento = () => {
  return (
    <section id="medicamentos" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom mb-4">
              Critérios de Atendimento
            </h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">
              Seguimos protocolos rigorosos para garantir sua segurança. Veja abaixo o que podemos renovar por telemedicina.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Coluna Verde */}
          <ScrollReveal direction="left">
            <div className="p-8 rounded-2xl bg-[hsl(var(--emerald-light)/0.5)] border border-primary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground tracking-tight text-lg">O que renovamos</span>
              </div>
              <div className="space-y-5">
                {categoriasVerdes.map((cat) => (
                  <div key={cat.title} className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-1.5 rounded-lg mt-0.5 shrink-0">
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{cat.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.desc}</p>
                      <p className="text-xs text-primary/80 mt-0.5 italic">Ex: {cat.exemplos}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Coluna Vermelha */}
          <ScrollReveal direction="right">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-destructive/10 text-destructive p-1.5 rounded-lg">
                  <XCircle className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground tracking-tight text-lg">Não atendemos</span>
              </div>
              <div className="space-y-4">
                {categoriasVermelhas.map((item) => (
                  <div key={item.tag} className="p-4 rounded-xl bg-secondary border border-border">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{item.title}</span>
                      <span className="text-[10px] font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    {item.exemplos && (
                      <p className="text-xs text-muted-foreground/70 mt-1 italic">Ex: {item.exemplos}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA de Resgate */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center p-8 rounded-2xl bg-[hsl(var(--emerald-light)/0.3)] border border-primary/10">
            <p className="text-foreground font-medium mb-1">
              Não encontrou o seu medicamento na lista ou está na dúvida?
            </p>
            <p className="text-xs text-muted-foreground mb-5">
              Não encontrou seu medicamento? Fale com a nossa triagem no WhatsApp e tire sua dúvida na hora, sem compromisso.
            </p>
            <Button asChild size="lg" className="gap-2">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Falar com a Triagem Agora
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CriteriosAtendimento;
