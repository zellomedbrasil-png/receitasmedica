import { Link } from "react-router-dom";
import logo from "@/assets/logo-receitas.png";

const WHATSAPP_URL =
  "https://wa.me/5585991275429?text=" +
  encodeURIComponent("Olá! Quero renovar minha receita médica.");

const HeaderVB = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0F1115]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/v-b" className="flex items-center" aria-label="receitas.site">
          <img src={logo} alt="receitas.site" className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#como-funciona" className="transition-colors hover:text-white">
            Como Funciona
          </a>
          <a href="#precos" className="transition-colors hover:text-white">
            Preços
          </a>
          <a href="#faq" className="transition-colors hover:text-white">
            FAQ
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Entrar
          </a>
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-variant="B"
          data-cta-id="header-renovar"
          className="inline-flex h-10 items-center justify-center rounded-full bg-emerald px-5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_hsl(var(--emerald)/0.6)] transition-all hover:bg-emerald-glow"
        >
          Renovar Agora
        </a>
      </div>
    </header>
  );
};

export default HeaderVB;
