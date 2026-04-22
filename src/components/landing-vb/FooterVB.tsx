import logo from "@/assets/logo-receitas.png";

const WHATSAPP_URL = "https://wa.me/5585991275429";

const FooterVB = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0A0C10] py-14">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img src={logo} alt="receitas.site" className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/45">
              Renovação de receitas médicas para tratamentos contínuos.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <a href="#como-funciona" className="transition-colors hover:text-white">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#precos" className="transition-colors hover:text-white">
                  Preços
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  LGPD
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Contato
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contato@receitas.site" className="transition-colors hover:text-white">
                  contato@receitas.site
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs text-white/45">
              <span className="block font-medium text-white/60">Responsável Técnico</span>
              Dr. [Nome] — CRM [número]
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs leading-relaxed text-white/40">
            receitas.site atua conforme a Resolução CFM 2.314/2022 e demais normas regulatórias da telemedicina no Brasil. Este serviço não substitui acompanhamento médico regular.
          </p>
          <p className="mt-4 text-xs text-white/35">
            © 2026 receitas.site. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterVB;
