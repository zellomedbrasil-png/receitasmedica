import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-12 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2 mb-4 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center text-background">
                <Leaf className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-base tracking-tighter-custom text-foreground">receitas.site</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">Saúde digital acessível e ética.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Termos</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2025 receitas.site. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card px-3 py-1 rounded-full border border-border shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Sistema Operacional: Normal
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed max-w-2xl mx-auto">
            Disclaimer: Este serviço não substitui atendimento presencial de emergência. A renovação de receitas está sujeita à avaliação médica individual. 
            Medicamentos de controle especial (receitas amarelas e azuis) não podem ser prescritos digitalmente conforme legislação vigente. 
            Consulte sempre seu médico assistente para acompanhamento de rotina.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
