import { useState } from "react";
import { Menu, X, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-header transition-all duration-300">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-95 transition-transform duration-300">
            <Leaf className="w-[18px] h-[18px]" />
          </div>
          <span className="font-semibold text-lg tracking-tighter-custom text-foreground group-hover:text-primary transition-colors">
            receitas<span className="text-slate-400 font-normal">.site</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
          <a href="#medicamentos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Medicamentos</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dúvidas</a>
          <Button asChild className="rounded-full shadow-lg shadow-slate-900/10 bg-slate-900 hover:bg-foreground text-white gap-2">
            <a href="https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica." target="_blank" rel="noopener noreferrer">
              Renovar Agora
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 space-y-3 animate-fade-in-up">
          <a href="#como-funciona" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Como funciona</a>
          <a href="#medicamentos" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Medicamentos</a>
          <a href="#faq" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Dúvidas</a>
          <Button asChild className="w-full rounded-full bg-slate-900 hover:bg-foreground text-white gap-2 mt-2">
            <a href="https://wa.me/5585991275429?text=Gostaria%20de%20renovar%20minha%20receita%20m%C3%A9dica." target="_blank" rel="noopener noreferrer">
              Renovar Agora <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
