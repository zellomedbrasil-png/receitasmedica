import { motion } from "framer-motion";
import { BookOpen, Download, ChevronRight, Diamond, AlertTriangle, Star, ArrowRight } from "lucide-react";

/* ─── Scroll Reveal ─── */
const SR = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Data ─── */
const chapters = [
  { num: 1, title: "A Anatomia da Receita Médica", desc: "Por que a forma como seu médico escreve a receita determina quanto você paga." },
  { num: 2, title: "Direitos Ocultos", desc: "Os benefícios que existem por lei e que ninguém te oferece." },
  { num: 3, title: "Farmácia Popular", desc: "A lista completa do que é gratuito ou tem até 90% de desconto pago pelo governo." },
  { num: 4, title: "PBMs e Descontos Privados", desc: "Como ativar os descontos dos laboratórios direto no balcão." },
  { num: 5, title: "Estratégias de Balcão", desc: "As frases exatas para nunca mais cair na empurroterapia." },
  { num: 6, title: "Riscos Reais", desc: "Como identificar remédios falsos e por que o \"barato da internet\" pode te custar a vida." },
  { num: 7, title: "Plano de Ação", desc: "O checklist final que você imprime e leva pra qualquer farmácia." },
];

const readingOrder = [
  { icon: "3", label: "Comece pelo Capítulo 3 — Farmácia Popular", desc: "É o capítulo que gera economia mais rápida. Em 10 minutos de leitura, você pode descobrir que já tem direito a remédios 100% gratuitos que está pagando hoje." },
  { icon: "4", label: "Depois leia o Capítulo 4 — PBMs e o Segredo dos Laboratórios", desc: "Esse é o capítulo que vale o e-book inteiro. Os descontos de 25% a 60% que você vai aprender a ativar pagam o investimento na primeira ida à farmácia." },
  { icon: "1–2", label: "Em seguida, leia os Capítulos 1 e 2", desc: "A Anatomia da Receita e os Direitos Ocultos. São o alicerce — sem eles, os outros capítulos perdem força." },
  { icon: "5–7", label: "Por último, Capítulos 5, 6 e 7", desc: "Táticas de balcão, riscos do mercado paralelo e o plano de ação final." },
];

const Membros = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans antialiased relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,165,116,0.04)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,165,116,0.03)_0%,transparent_60%)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#30363d] bg-[#0d1117]/85 backdrop-blur-xl">
        <div className="max-w-[820px] mx-auto px-6 py-5 flex justify-between items-center">
          <a href="/" className="font-serif text-xl font-bold tracking-tight">
            receitas<span className="text-[#d4a574]">.site</span>
          </a>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#8b949e] border border-[#30363d] px-3 py-1.5 rounded">
            Área Restrita · Membro
          </span>
        </div>
      </header>

      <main className="relative z-10">
        {/* ─── HERO ─── */}
        <section className="max-w-[820px] mx-auto px-6 pt-20 pb-16 border-b border-[#30363d]">
          <SR>
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-[#d4a574] border border-[#d4a574] px-3.5 py-1.5 font-medium mb-8">
              ◆ Confidencial · Acesso Liberado
            </span>
          </SR>
          <SR delay={0.1}>
            <h1 className="font-serif text-[clamp(38px,6vw,58px)] leading-[1.05] font-black tracking-tight mb-6">
              Bem-vindo à{" "}
              <em className="italic font-normal text-[#d4a574]">resistência.</em>
            </h1>
          </SR>
          <SR delay={0.2}>
            <p className="text-[19px] text-[#8b949e] max-w-[620px] font-light leading-relaxed">
              Você acaba de cruzar uma linha que a maioria dos brasileiros nunca cruza. A partir de agora, o jogo da farmácia tem outras regras — e elas estão a seu favor.
            </p>
          </SR>
        </section>

        {/* ─── DOWNLOAD CARD ─── */}
        <section className="max-w-[820px] mx-auto px-6 py-12">
          <SR>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative bg-gradient-to-br from-[#1c2128] to-[#161b22] border border-[#30363d] rounded-xl p-8 md:p-9 flex flex-col md:flex-row items-center gap-7 overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 w-1 h-full bg-[#d4a574] rounded-l-xl" />

              {/* Book icon */}
              <div className="flex-shrink-0 w-[70px] h-[92px] bg-gradient-to-br from-[#2c3e50] to-[#1a252f] rounded-sm rounded-r-lg relative flex items-center justify-center shadow-[4px_4px_16px_rgba(0,0,0,0.4)]">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-black/40 to-transparent" />
                <span className="font-serif text-3xl text-[#d4a574] font-bold">CF</span>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-serif text-[22px] font-semibold mb-1">O Código da Farmácia</h3>
                <p className="text-[#8b949e] text-sm">E-book completo · PDF · 7 capítulos</p>
              </div>

              {/* Button */}
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#d4a574] hover:bg-[#f0c896] text-[#0d1117] px-6 py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Baixar E-book
              </a>
            </motion.div>
          </SR>
        </section>

        {/* ─── AULA INAUGURAL ─── */}
        <section className="max-w-[820px] mx-auto px-6 pb-20">
          <SR>
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#d4a574] font-semibold block mb-4">
              Aula Inaugural · Leia antes de tudo
            </span>
            <h2 className="font-serif text-[clamp(30px,4.5vw,42px)] leading-[1.1] tracking-tight font-bold mb-10">
              Antes de abrir o e-book, leia isto.
            </h2>
          </SR>

          {/* Intro paragraphs */}
          <SR delay={0.05}>
            <div className="space-y-5 text-[17px] leading-relaxed mb-10">
              <p>
                Se você está aqui, é porque chegou cansado. Cansado de chegar na farmácia e ouvir um preço que dói. Cansado de sentir que existe um jogo de cartas marcadas e que você sempre é o último a saber das regras. Cansado de pagar caro por algo que deveria ser barato — ou de graça.
              </p>
              <p>Quero te dizer uma coisa antes de você abrir o PDF que está logo aí em cima:</p>
            </div>
          </SR>

          {/* Lead quote */}
          <SR delay={0.1}>
            <blockquote className="font-serif text-[21px] italic text-[#f0c896] border-l-[3px] border-[#d4a574] pl-6 my-8 leading-snug">
              Você não está louco. Você está certo. O sistema é desenhado para que você pague mais do que precisa. E ele só funciona enquanto você não souber como ele opera por dentro.
            </blockquote>
          </SR>

          <SR delay={0.12}>
            <p className="text-[17px] leading-relaxed mb-12">
              O e-book que você baixou não é mais um conteúdo motivacional sobre saúde. É um manual operacional. Um dossiê. Cada capítulo é uma engrenagem que, quando você entende, deixa de te machucar e passa a trabalhar a seu favor.
            </p>
          </SR>

          {/* ─── Como ler ─── */}
          <SR>
            <h3 className="font-serif text-[26px] font-bold tracking-tight mb-6 flex items-center gap-3">
              <span className="text-[#d4a574] font-serif italic font-normal text-lg">01 /</span>
              Como ler o e-book
            </h3>
          </SR>

          <SR delay={0.05}>
            <p className="text-[17px] leading-relaxed mb-5">
              A maioria das pessoas vai abrir o PDF, ler tudo de uma vez, achar interessante e fechar. Em uma semana, esquecem 80% e voltam a pagar caro na farmácia como antes. <strong className="text-[#f0c896]">Não faça isso.</strong>
            </p>
            <p className="text-[17px] leading-relaxed mb-8">Eu recomendo um caminho diferente, na seguinte ordem:</p>
          </SR>

          {/* Reading order cards */}
          <div className="space-y-4 mb-10">
            {readingOrder.map((item, i) => (
              <SR key={i} delay={i * 0.08}>
                <div className="flex gap-5 items-start p-5 rounded-lg border border-[#30363d] bg-[#161b22]/60 hover:border-[#d4a574]/30 transition-colors">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#d4a574]/10 text-[#d4a574] font-serif font-bold text-sm flex items-center justify-center">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-[15px] mb-1">{item.label}</p>
                    <p className="text-[#8b949e] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </SR>
            ))}
          </div>

          {/* Callout */}
          <SR>
            <div className="bg-[#161b22] border border-[#30363d] border-l-[3px] border-l-[#d4a574] p-6 rounded-r-lg mb-14">
              <p className="text-[#8b949e] text-[16px] leading-relaxed">
                <strong className="text-[#d4a574]">Por que essa ordem?</strong> Porque eu quero que você sinta o resultado financeiro antes de mergulhar na teoria. Quando o seu primeiro desconto chegar, você vai querer ler tudo. Funciona assim.
              </p>
            </div>
          </SR>

          {/* ─── O que esperar de cada capítulo ─── */}
          <SR>
            <h3 className="font-serif text-[26px] font-bold tracking-tight mb-6 flex items-center gap-3">
              <span className="text-[#d4a574] font-serif italic font-normal text-lg">02 /</span>
              O que esperar de cada capítulo
            </h3>
          </SR>

          <div className="space-y-0 mb-14">
            {chapters.map((ch, i) => (
              <SR key={ch.num} delay={i * 0.04}>
                <div className="flex items-start gap-4 py-4 border-b border-dashed border-[#30363d] last:border-b-0">
                  <Diamond className="w-3.5 h-3.5 text-[#d4a574] mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#e6edf3] text-[16px]">
                      <strong>Capítulo {ch.num} — {ch.title}:</strong>{" "}
                      <span className="text-[#8b949e]">{ch.desc}</span>
                    </span>
                  </div>
                </div>
              </SR>
            ))}
          </div>

          {/* ─── O que o e-book não resolve sozinho ─── */}
          <SR>
            <h3 className="font-serif text-[26px] font-bold tracking-tight mb-6 flex items-center gap-3">
              <span className="text-[#d4a574] font-serif italic font-normal text-lg">03 /</span>
              O que o e-book não resolve sozinho
            </h3>
          </SR>

          <SR delay={0.05}>
            <div className="space-y-5 text-[17px] leading-relaxed mb-6">
              <p>
                Vou ser honesto com você. O e-book entrega tudo que prometeu. Ele te dá o conhecimento, a tática, as palavras certas, os direitos. Mas tem uma coisa que ele não consegue resolver — e é onde a maioria das pessoas trava.
              </p>
              <p>
                O e-book te ensina a falar a língua certa. Mas você precisa de uma <strong className="text-[#f0c896]">receita médica atualizada</strong>, escrita do jeito certo, para colocar tudo em prática.
              </p>
              <p>
                Sem uma receita válida, prescrita pelo princípio ativo (DCB) como o Capítulo 1 ensina, você não consegue ativar nem o Farmácia Popular, nem os descontos dos laboratórios, nem trocar pelo genérico mais barato. O conhecimento fica parado.
              </p>
              <p>É por isso que criei algo específico para os leitores deste e-book.</p>
            </div>
          </SR>

          {/* ─── CTA UPSELL ─── */}
          <SR>
            <div className="relative bg-gradient-to-br from-[#1a1410] to-[#0d1117] border border-[#d4a574] rounded-2xl p-10 md:p-14 mt-16 mb-10 overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-1/2 -right-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,165,116,0.08)_0%,transparent_60%)] pointer-events-none" />

              <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-red-400 border border-red-400/60 px-3.5 py-1.5 font-semibold mb-6 relative z-10">
                ⚠ Etapa Final · Ative o que você aprendeu
              </span>

              <h3 className="font-serif text-[clamp(28px,4vw,38px)] leading-[1.15] font-extrabold tracking-tight mb-5 relative z-10">
                Sua receita é a chave que destranca{" "}
                <em className="text-[#d4a574] italic font-normal">tudo que você acabou de aprender.</em>
              </h3>

              <p className="text-[17px] text-[#8b949e] max-w-[580px] mb-8 relative z-10 leading-relaxed">
                Renove sua receita médica em minutos por telemedicina. Médicos com CRM ativo, prescrição pelo princípio ativo (DCB), receita digital válida em todo o Brasil. Sem fila, sem sair de casa, sem burocracia.
              </p>

              {/* Price cards */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
                <div className="flex-1 bg-[#1c2128] border border-[#30363d] rounded-lg p-6">
                  <h4 className="text-[12px] uppercase tracking-[0.15em] text-[#8b949e] mb-3 font-medium">Consulta Avulsa</h4>
                  <p className="font-serif text-[38px] font-bold leading-none mb-1">R$39</p>
                  <p className="text-[13px] text-[#8b949e] mb-4">Pagamento único</p>
                  <p className="text-[14px] leading-snug">Ideal pra quem precisa renovar a receita uma vez. Uma consulta, uma receita, problema resolvido.</p>
                </div>
                <div className="flex-1 bg-gradient-to-b from-[rgba(212,165,116,0.06)] to-[#1c2128] border border-[#d4a574] rounded-lg p-6 relative">
                  <span className="absolute -top-2.5 right-4 bg-[#d4a574] text-[#0d1117] text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full uppercase">
                    Mais Escolhido
                  </span>
                  <h4 className="text-[12px] uppercase tracking-[0.15em] text-[#8b949e] mb-3 font-medium">Assinatura Mensal</h4>
                  <p className="font-serif text-[38px] font-bold leading-none mb-1">R$29<span className="text-lg font-normal text-[#8b949e]">/mês</span></p>
                  <p className="text-[13px] text-[#8b949e] mb-4">Cancele quando quiser</p>
                  <p className="text-[14px] leading-snug">Pra quem usa medicamento contínuo. Renovação mensal sem complicação. Mais barato que a avulsa.</p>
                </div>
              </div>

              {/* CTA */}
              <div className="relative z-10">
                <a
                  href="https://receitas.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#d4a574] hover:bg-[#f0c896] text-[#0d1117] px-9 py-4.5 rounded-lg font-bold text-[16px] tracking-wide transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(212,165,116,0.2)] hover:shadow-[0_12px_32px_rgba(212,165,116,0.3)]"
                >
                  Renovar Minha Receita Agora
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="block mt-4 text-[13px] text-[#8b949e] italic">
                  Atendimento em minutos. Médicos verificados. Receita digital válida.
                </span>
              </div>
            </div>
          </SR>

          {/* ─── Closing text ─── */}
          <SR>
            <h3 className="font-serif text-[26px] font-bold tracking-tight mb-6 flex items-center gap-3">
              <span className="text-[#d4a574] font-serif italic font-normal text-lg">04 /</span>
              Uma última coisa
            </h3>
          </SR>

          <SR delay={0.05}>
            <div className="space-y-5 text-[17px] leading-relaxed mb-10">
              <p>
                Eu poderia ter cobrado muito mais por este e-book. O conteúdo aqui economiza, em média, mais de R$1.500 por ano para um paciente com uso contínuo de medicamentos. Mas o preço foi proposital: eu quero que ele chegue na mão de quem precisa, não só de quem pode.
              </p>
              <p>
                O que eu te peço em troca é simples: <strong className="text-[#f0c896]">aplique</strong>. Não deixe esse PDF morrer na sua nuvem. Leia, marque, imprima se precisar. Leve para a próxima consulta. Use na próxima ida à farmácia. Conte para alguém que está pagando caro sem necessidade.
              </p>
            </div>
          </SR>

          <SR delay={0.1}>
            <blockquote className="font-serif text-[21px] italic text-[#f0c896] border-l-[3px] border-[#d4a574] pl-6 my-8 leading-snug">
              O conhecimento só vira liberdade quando vira ação.
            </blockquote>
          </SR>

          <SR delay={0.15}>
            <p className="font-serif text-[22px] font-bold text-[#d4a574] mt-10">
              Bem-vindo à resistência.
            </p>
          </SR>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d] py-10 mt-16 relative z-10">
        <div className="max-w-[820px] mx-auto px-6 text-center text-[#8b949e] text-[13px] space-y-2">
          <p>
            © <a href="https://receitas.site" className="text-[#d4a574] hover:underline">receitas.site</a> · Área de membros exclusiva
          </p>
          <p>Conteúdo protegido. Proibida a redistribuição.</p>
        </div>
      </footer>
    </div>
  );
};

export default Membros;
