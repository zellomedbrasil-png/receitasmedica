import { CheckCircle, XCircle, Pill } from "lucide-react";

const CriteriosAtendimento = () => {
  return (
    <section id="medicamentos" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-foreground tracking-tighter-custom mb-6">Critérios de Atendimento</h2>
            <p className="text-muted-foreground mb-8 font-light">
              Seguimos protocolos rigorosos para garantir sua segurança. Nem todo medicamento pode ser prescrito via telemedicina sem exame físico prévio.
            </p>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-light text-primary p-1.5 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground tracking-tight">O que renovamos</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Uso contínuo (Pressão, Diabetes, Tireoide)",
                  "Antidepressivos (Receita Branca 2 vias)",
                  "Antibióticos (Avaliação específica)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Pill className="mt-0.5 w-4 h-4 text-slate-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent rounded-[2rem] transform rotate-3 scale-95 opacity-50" />
            <div className="relative bg-card p-8 rounded-[2rem] border border-border shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-destructive/10 text-destructive p-1.5 rounded-lg">
                  <XCircle className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground tracking-tight">Não atendemos</span>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Receitas Amarelas/Azuis", tag: "LEI" },
                  { label: "Emergências Médicas", tag: "PS" },
                  { label: "Laudos para afastamento", tag: "INSS" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded">{item.tag}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">Em caso de dúvida, devolvemos seu dinheiro integralmente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CriteriosAtendimento;
