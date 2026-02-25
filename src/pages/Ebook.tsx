import { motion } from "framer-motion";
import {
  BadgeCheck,
  DollarSign,
  HelpCircle,
  ShieldOff,
  CheckCircle2,
  Star,
  ShieldCheck,
  BookOpen,
  User,
  CreditCard,
  Lock,
  Smartphone,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ScrollReveal = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const testimonials = [
  {
    initials: "MA",
    name: "Maria Aparecida S.",
    city: "São Paulo, SP",
    text: "Eu gastava R$ 400 por mês com meu remédio de pressão e diabetes. Depois de ler o guia, descobri que tinha direito a pegar de graça. Mudou minha vida!",
  },
  {
    initials: "CE",
    name: "Carlos Eduardo R.",
    city: "Belo Horizonte, MG",
    text: "Nunca soube que existia o programa de laboratório que zerava o custo do meu Ozempic. O guia me mostrou o passo a passo e funcionou na primeira tentativa.",
  },
  {
    initials: "AP",
    name: "Ana Paula F.",
    city: "Curitiba, PR",
    text: "Achei que o SUS era complicado demais. O e-book desmontou esse mito com linguagem simples. Hoje pego 3 medicamentos de graça todo mês.",
  },
];

const Ebook = () => {
  return (
    <div className="min-h-screen bg-white font-sans scroll-smooth">
      {/* ── 1. TRUST BADGE ───────────────────────────────────────── */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-xs flex items-center justify-center gap-2">
        <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>
          Um conteúdo exclusivo em parceria com{" "}
          <span className="font-semibold text-emerald-400">receitas.site</span>
        </span>
      </div>

      {/* ── 2. HERO ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <ScrollReveal>
            {/* Badge "Atualizado para 2026" */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              <BadgeCheck className="w-3.5 h-3.5" />
              Atualizado para 2026
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Pare de Deixar Seu{" "}
              <span className="text-[#1E3A5F]">Salário no Balcão</span> da
              Farmácia.
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Decifre o método legal e seguro para acessar seus medicamentos
              pelo SUS, Farmácia Popular e Programas de Laboratório pagando uma{" "}
              <strong>fração do preço.</strong>
            </p>

            <a
              href="#oferta"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base md:text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 animate-pulse"
            >
              QUERO DECIFRAR O CÓDIGO AGORA
            </a>

            <p className="text-xs text-gray-400 mt-4">
              🔒 Compra 100% segura · Acesso imediato após pagamento
            </p>
          </ScrollReveal>

          {/* Right — e-book mockup placeholder */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center">
              <div
                className="relative w-56 md:w-64 aspect-[3/4] rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4 p-8"
                style={{
                  background:
                    "linear-gradient(145deg, #1E3A5F 0%, #0f2340 60%, #163050 100%)",
                }}
              >
                {/* Shine overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <BookOpen className="w-14 h-14 text-emerald-400" />
                <div className="text-center">
                  <p className="text-white font-extrabold text-sm leading-tight">
                    O CÓDIGO DA FARMÁCIA
                  </p>
                  <p className="text-emerald-300 text-xs mt-1 leading-snug">
                    SUS · PBMs · Remédios Baratos
                  </p>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                  E-BOOK
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. PROBLEMA ──────────────────────────────────────────── */}
      <section className="bg-gray-100 py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
              Você sente que comprar remédios virou um{" "}
              <span className="text-red-600">aluguel mensal?</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: DollarSign,
                color: "text-red-500",
                bg: "bg-red-50",
                title: "Orçamento comprometido",
                desc: "Gasta centenas de reais todo mês e compromete o orçamento familiar com medicamentos de uso contínuo.",
              },
              {
                Icon: HelpCircle,
                color: "text-orange-500",
                bg: "bg-orange-50",
                title: "Jogo obscuro das farmácias",
                desc: "Não entende a regra do jogo entre Genérico, Similar e Referência — e acaba sempre pagando mais caro.",
              },
              {
                Icon: ShieldOff,
                color: "text-red-400",
                bg: "bg-red-50",
                title: "Medo da burocracia do SUS",
                desc: "Acha que o SUS é burocrático demais e desiste de buscar seus direitos antes mesmo de tentar.",
              },
            ].map(({ Icon, color, bg, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.12}>
                <div className="bg-white rounded-2xl p-6 shadow-md h-full">
                  <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SOLUÇÃO ───────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
              O que você vai descobrir dentro do{" "}
              <span className="text-[#1E3A5F]">Código da Farmácia:</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-5">
            {[
              "O segredo da Receita Médica e como blindar sua prescrição para não ser trocada na farmácia.",
              "A lista de ouro da Farmácia Popular — o que é 100% gratuito e o que tem copagamento.",
              "O passo a passo sem estresse para pegar medicamentos de alto custo pelo Estado.",
              "Como acessar PBMs (Programas de Laboratórios) que as farmácias 'esquecem' de te oferecer.",
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROVA SOCIAL ──────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
              Quem já aplicou o{" "}
              <span className="text-[#1E3A5F]">Código da Farmácia:</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.12}>
                <div className="bg-white rounded-2xl p-6 shadow-md h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">"{t.text}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. AUTORIDADE DO AUTOR ────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 items-center">
          <ScrollReveal>
            <div className="flex justify-center md:justify-start">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8e] flex items-center justify-center shadow-xl">
                <User className="w-16 h-16 text-white/70" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Quem está revelando esses bastidores?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Médico Especialista com foco em Medicina Baseada em Evidências e
              na defesa do paciente inteligente. Ao longo de anos de prática
              clínica, percebeu que a maioria dos pacientes paga valores
              abusivos por medicamentos que têm direito de acessar de graça —
              simplesmente por falta de informação.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Em parceria com a plataforma{" "}
              <strong className="text-[#1E3A5F]">receitas.site</strong>, decidiu
              reunir neste guia tudo o que os sistemas de saúde escondem de
              você.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#1E3A5F] text-sm font-semibold px-4 py-2 rounded-full">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              Conteúdo curado pelo receitas.site
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 7. PITCH FINAL E OFERTA ──────────────────────────────── */}
      <section
        id="oferta"
        className="py-16 md:py-24 px-6 text-white"
        style={{ background: "linear-gradient(160deg, #1E3A5F 0%, #0f2340 100%)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
              Quanto vale a sua{" "}
              <span className="text-emerald-400">tranquilidade financeira?</span>
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-10">
              Este guia vai te fazer economizar centenas de reais já na sua
              próxima ida à farmácia. É um investimento menor que um lanche,
              mas que <strong className="text-white">devolve o seu salário.</strong>
            </p>

            {/* Price */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8 border border-white/20">
              <p className="text-blue-300 text-sm mb-2">Oferta exclusiva — somente hoje</p>
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-blue-400 line-through text-xl">R$ 49,00</span>
                <span className="text-5xl font-extrabold text-white">R$ 9,90</span>
              </div>
              <p className="text-emerald-400 text-sm font-semibold">
                Você economiza R$ 39,10 agora
              </p>
            </div>

            {/* CTA button */}
            <a
              href="#"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xl py-5 px-12 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 mb-6"
            >
              COMPRAR O E-BOOK POR R$ 9,90 AGORA
            </a>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-3 text-blue-200 text-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>
                Garantia Incondicional de{" "}
                <strong className="text-white">7 Dias.</strong> Se não gostar,
                devolvemos 100% do seu dinheiro.
              </span>
            </div>
          </ScrollReveal>

          {/* Payment icons */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                { Icon: CreditCard, label: "Cartão de Crédito" },
                { Icon: Smartphone, label: "Pix" },
                { Icon: Lock, label: "Compra Segura" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-xs text-blue-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 md:py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              Perguntas Frequentes
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "Funciona para qualquer cidade do Brasil?",
                  a: "Sim! O conteúdo aborda os programas federais (SUS, Farmácia Popular, REMUME) e os PBMs que têm cobertura nacional. As regras de acesso valem para qualquer estado.",
                },
                {
                  q: "E se meu remédio não estiver no SUS?",
                  a: "O guia também ensina como acessar os PBMs dos próprios laboratórios fabricantes, que cobrem muitos medicamentos que não fazem parte do RENAME do SUS — inclusive medicamentos de alto custo e novos.",
                },
                {
                  q: "Como recebo o e-book?",
                  a: "Após a confirmação do pagamento (que é imediata para Pix e cartão), você recebe um link de download por e-mail em até 2 minutos. O arquivo é em PDF e pode ser lido no celular, tablet ou computador.",
                },
              ].map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white rounded-xl border border-gray-200 px-4 shadow-sm"
                >
                  <AccordionTrigger className="text-gray-800 font-semibold text-left hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 9. FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>

          {/* Payment badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {["Visa", "Mastercard", "Pix", "Boleto"].map((p) => (
              <span
                key={p}
                className="bg-slate-800 border border-slate-700 text-slate-400 text-xs px-3 py-1 rounded-md"
              >
                {p}
              </span>
            ))}
            <span className="bg-emerald-900/50 border border-emerald-700 text-emerald-400 text-xs px-3 py-1 rounded-md flex items-center gap-1">
              <Lock className="w-3 h-3" /> SSL Seguro
            </span>
          </div>

          {/* Copyright */}
          <p className="text-center text-slate-500 text-sm mb-6">
            © 2026 receitas.site · Todos os direitos reservados.
          </p>

          {/* Disclaimer */}
          <p className="text-center text-slate-600 text-[11px] leading-relaxed max-w-2xl mx-auto">
            Este material tem caráter informativo e educativo. Nunca interrompa
            um tratamento ou substitua medicamentos sem a avaliação e
            consentimento do seu médico. O acesso aos programas descritos depende
            de critérios clínicos e disponibilidade em cada município.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Ebook;
