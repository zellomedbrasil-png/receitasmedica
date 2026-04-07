import { motion } from "framer-motion";
import { Download, Diamond, ArrowRight, ShieldCheck, BadgeCheck } from "lucide-react";

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
    <div className="min-h-screen font-sans scroll-smooth" style={{ background: "#0F1115", color: "#F0F2F5" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-[800px] h-[800px] top-[-200px] left-1/2 -translate-x-1/2"
          style={{ background: "radial-gradient(circle, hsl(var(--emerald)/0.08) 0%, transparent 65%)" }}
        />
      </div>

      {/* Header — same style as Ebook */}
      <header
        className="sticky top-0 z-50"
        style={{ background: "rgba(15,17,21,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-extrabold tracking-tight" style={{ color: "white" }}>
            receitas<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}>.site</span>
          </a>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "hsl(var(--emerald))" }} />
            <span className="text-xs font-medium tracking-tight" style={{ color: "rgba(255,255,255,0.6)" }}>
              Área Restrita · Membro
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ─── HERO ─── */}
        <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <SR>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 w-fit"
                style={{ background: "hsl(var(--emerald)/0.10)", border: "1px solid hsl(var(--emerald)/0.20)" }}
              >
                <BadgeCheck className="w-3.5 h-3.5" style={{ color: "hsl(var(--emerald))" }} />
                <span className="text-xs font-medium tracking-tight" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Acesso confirmado · Conteúdo exclusivo
                </span>
              </div>
            </SR>
            <SR delay={0.08}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.08] mb-6" style={{ color: "white" }}>
                Bem-vindo à{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}>
                  resistência.
                </span>
              </h1>
            </SR>
            <SR delay={0.16}>
              <p className="text-lg leading-relaxed max-w-[620px]" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                Você acaba de cruzar uma linha que a maioria dos brasileiros nunca cruza. A partir de agora, o jogo da farmácia tem outras regras — e elas estão a seu favor.
              </p>
            </SR>
          </div>
        </section>

        {/* ─── DOWNLOAD CARD ─── */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <SR>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-3xl p-8 md:p-9 flex flex-col md:flex-row items-center gap-7 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg, #1C2030, #14181F)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 left-0 w-60 h-60 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                style={{ background: "hsl(var(--emerald)/0.15)" }}
              />

              {/* Book icon */}
              <div
                className="flex-shrink-0 w-[70px] h-[92px] rounded-2xl relative flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
              >
                <span className="text-2xl font-bold" style={{ color: "hsl(var(--emerald))" }}>CF</span>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: "white" }}>O Código da Farmácia</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>E-book completo · PDF · 7 capítulos</p>
              </div>

              {/* Button */}
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold text-sm tracking-wide transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-95 whitespace-nowrap relative z-10"
                style={{
                  background: "hsl(var(--emerald))",
                  color: "white",
                  boxShadow: "0 0 30px hsl(var(--emerald)/0.30), 0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                <Download className="w-4 h-4" />
                Baixar E-book
              </a>
            </motion.div>
          </SR>
        </section>

        {/* ─── AULA INAUGURAL ─── */}
        <section
          className="py-20"
          style={{ background: "#14181F", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <SR>
              <div className="mb-12">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 w-fit"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(var(--emerald))" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--emerald))" }}>
                    Aula Inaugural
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: "white" }}>
                  Antes de abrir o e-book,{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}>
                    leia isto.
                  </span>
                </h2>
              </div>
            </SR>

            {/* Intro */}
            <SR delay={0.05}>
              <div className="space-y-5 text-[17px] leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
                <p>
                  Se você está aqui, é porque chegou cansado. Cansado de chegar na farmácia e ouvir um preço que dói. Cansado de sentir que existe um jogo de cartas marcadas e que você sempre é o último a saber das regras. Cansado de pagar caro por algo que deveria ser barato — ou de graça.
                </p>
                <p>Quero te dizer uma coisa antes de você abrir o PDF que está logo aí em cima:</p>
              </div>
            </SR>

            {/* Lead quote */}
            <SR delay={0.1}>
              <div
                className="rounded-3xl p-8 my-10 relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #1C2030, #14181F)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                  style={{ background: "hsl(var(--emerald)/0.12)" }}
                />
                <p className="text-xl font-semibold italic leading-snug relative z-10" style={{ color: "rgba(255,255,255,0.85)" }}>
                  "Você não está louco. Você está certo. O sistema é desenhado para que você pague mais do que precisa. E ele só funciona enquanto você não souber como ele opera por dentro."
                </p>
              </div>
            </SR>

            <SR delay={0.12}>
              <p className="text-[17px] leading-relaxed mb-14" style={{ color: "rgba(255,255,255,0.65)" }}>
                O e-book que você baixou não é mais um conteúdo motivacional sobre saúde. É um manual operacional. Um dossiê. Cada capítulo é uma engrenagem que, quando você entende, deixa de te machucar e passa a trabalhar a seu favor.
              </p>
            </SR>

            {/* ─── Como ler ─── */}
            <SR>
              <h3 className="text-2xl font-extrabold tracking-tight mb-2" style={{ color: "white" }}>
                Como ler o e-book
              </h3>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>A ordem certa faz toda a diferença no resultado.</p>
            </SR>

            <SR delay={0.05}>
              <div className="space-y-5 text-[17px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
                <p>
                  A maioria das pessoas vai abrir o PDF, ler tudo de uma vez, achar interessante e fechar. Em uma semana, esquecem 80% e voltam a pagar caro na farmácia como antes.{" "}
                  <strong style={{ color: "hsl(var(--emerald))" }}>Não faça isso.</strong>
                </p>
                <p>Eu recomendo um caminho diferente, na seguinte ordem:</p>
              </div>
            </SR>

            {/* Reading order cards */}
            <div className="space-y-4 mb-10">
              {readingOrder.map((item, i) => (
                <SR key={i} delay={i * 0.08}>
                  <div
                    className="flex gap-5 items-start p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-bold font-mono"
                      style={{ background: "hsl(var(--emerald)/0.10)", border: "1px solid hsl(var(--emerald)/0.20)", color: "hsl(var(--emerald))" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[15px] mb-1" style={{ color: "white" }}>{item.label}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                    </div>
                  </div>
                </SR>
              ))}
            </div>

            {/* Callout */}
            <SR>
              <div
                className="rounded-3xl p-6 mb-16 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-[16px] leading-relaxed relative z-10" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <strong style={{ color: "hsl(var(--emerald))" }}>Por que essa ordem?</strong> Porque eu quero que você sinta o resultado financeiro antes de mergulhar na teoria. Quando o seu primeiro desconto chegar, você vai querer ler tudo. Funciona assim.
                </p>
              </div>
            </SR>
          </div>
        </section>

        {/* ─── O que esperar de cada capítulo ─── */}
        <section className="py-20" style={{ background: "#0F1115" }}>
          <div className="max-w-3xl mx-auto px-6">
            <SR>
              <h3 className="text-2xl font-extrabold tracking-tight mb-2" style={{ color: "white" }}>
                O que esperar de cada capítulo
              </h3>
              <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.4)" }}>Cada capítulo responde a uma pergunta que custa dinheiro quando fica sem resposta.</p>
            </SR>

            <div className="space-y-0">
              {chapters.map((ch, i) => (
                <SR key={ch.num} delay={i * 0.04}>
                  <div
                    className="flex items-start gap-4 py-5"
                    style={{ borderBottom: i < chapters.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold font-mono mt-0.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "hsl(var(--emerald))" }}
                    >
                      {ch.num}
                    </div>
                    <div>
                      <span style={{ color: "white" }}>
                        <strong>{ch.title}</strong>
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.45)" }}> — {ch.desc}</span>
                    </div>
                  </div>
                </SR>
              ))}
            </div>
          </div>
        </section>

        {/* ─── O que o e-book não resolve sozinho ─── */}
        <section
          className="py-20"
          style={{ background: "#14181F", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <SR>
              <h3 className="text-2xl font-extrabold tracking-tight mb-8" style={{ color: "white" }}>
                O que o e-book{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}>
                  não resolve sozinho
                </span>
              </h3>
            </SR>

            <SR delay={0.05}>
              <div className="space-y-5 text-[17px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
                <p>
                  Vou ser honesto com você. O e-book entrega tudo que prometeu. Ele te dá o conhecimento, a tática, as palavras certas, os direitos. Mas tem uma coisa que ele não consegue resolver — e é onde a maioria das pessoas trava.
                </p>
                <p>
                  O e-book te ensina a falar a língua certa. Mas você precisa de uma{" "}
                  <strong style={{ color: "hsl(var(--emerald))" }}>receita médica atualizada</strong>, escrita do jeito certo, para colocar tudo em prática.
                </p>
                <p>
                  Sem uma receita válida, prescrita pelo princípio ativo (DCB) como o Capítulo 1 ensina, você não consegue ativar nem o Farmácia Popular, nem os descontos dos laboratórios, nem trocar pelo genérico mais barato. O conhecimento fica parado.
                </p>
                <p>É por isso que criei algo específico para os leitores deste e-book.</p>
              </div>
            </SR>
          </div>
        </section>

        {/* ─── CTA UPSELL ─── */}
        <section className="py-20 relative overflow-hidden" style={{ background: "#0F1115" }}>
          {/* Big glow */}
          <div
            className="absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--emerald)/0.08) 0%, transparent 65%)" }}
          />
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <SR>
              <div
                className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #1C2030, #14181F)", border: "1px solid hsl(var(--emerald)/0.20)" }}
              >
                {/* Inner glow */}
                <div
                  className="absolute -top-1/3 -right-[15%] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
                  style={{ background: "hsl(var(--emerald)/0.10)" }}
                />

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 w-fit relative z-10"
                  style={{ background: "rgba(248,81,73,0.10)", border: "1px solid rgba(248,81,73,0.25)" }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#f85149" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#f85149" }}>
                    Etapa Final · Ative o que você aprendeu
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] mb-5 relative z-10" style={{ color: "white" }}>
                  Sua receita é a chave que destranca{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}>
                    tudo que você acabou de aprender.
                  </span>
                </h3>

                <p className="text-[17px] max-w-[580px] mb-10 relative z-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Renove sua receita médica em minutos por telemedicina. Médicos com CRM ativo, prescrição pelo princípio ativo (DCB), receita digital válida em todo o Brasil. Sem fila, sem sair de casa, sem burocracia.
                </p>

                {/* Price cards */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
                  <div
                    className="flex-1 rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <h4 className="text-[12px] uppercase tracking-[0.15em] mb-3 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>Consulta Avulsa</h4>
                    <p className="text-4xl font-bold leading-none mb-1" style={{ color: "white" }}>R$39</p>
                    <p className="text-[13px] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Pagamento único</p>
                    <p className="text-[14px] leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>Ideal pra quem precisa renovar a receita uma vez. Uma consulta, uma receita, problema resolvido.</p>
                  </div>
                  <div
                    className="flex-1 rounded-2xl p-6 relative"
                    style={{ background: "linear-gradient(180deg, hsl(var(--emerald)/0.06), rgba(255,255,255,0.03))", border: "1px solid hsl(var(--emerald)/0.25)" }}
                  >
                    <span
                      className="absolute -top-2.5 right-4 text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase"
                      style={{ background: "hsl(var(--emerald))", color: "white" }}
                    >
                      Mais Escolhido
                    </span>
                    <h4 className="text-[12px] uppercase tracking-[0.15em] mb-3 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>Assinatura Mensal</h4>
                    <p className="text-4xl font-bold leading-none mb-1" style={{ color: "white" }}>
                      R$29<span className="text-lg font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>/mês</span>
                    </p>
                    <p className="text-[13px] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Cancele quando quiser</p>
                    <p className="text-[14px] leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>Pra quem usa medicamento contínuo. Renovação mensal sem complicação. Mais barato que a avulsa.</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="relative z-10">
                  <a
                    href="https://receitas.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold w-full sm:w-auto transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                    style={{
                      background: "hsl(var(--emerald))",
                      color: "white",
                      boxShadow: "0 0 40px hsl(var(--emerald)/0.35), 0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    Renovar Minha Receita Agora
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    ✔ Atendimento em minutos &nbsp;·&nbsp; ✔ Médicos verificados &nbsp;·&nbsp; ✔ Receita digital válida
                  </p>
                </div>
              </div>
            </SR>
          </div>
        </section>

        {/* ─── Closing ─── */}
        <section className="py-20" style={{ background: "#14181F", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-3xl mx-auto px-6">
            <SR>
              <h3 className="text-2xl font-extrabold tracking-tight mb-8" style={{ color: "white" }}>Uma última coisa</h3>
            </SR>

            <SR delay={0.05}>
              <div className="space-y-5 text-[17px] leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
                <p>
                  Eu poderia ter cobrado muito mais por este e-book. O conteúdo aqui economiza, em média, mais de R$1.500 por ano para um paciente com uso contínuo de medicamentos. Mas o preço foi proposital: eu quero que ele chegue na mão de quem precisa, não só de quem pode.
                </p>
                <p>
                  O que eu te peço em troca é simples:{" "}
                  <strong style={{ color: "hsl(var(--emerald))" }}>aplique</strong>. Não deixe esse PDF morrer na sua nuvem. Leia, marque, imprima se precisar. Leve para a próxima consulta. Use na próxima ida à farmácia. Conte para alguém que está pagando caro sem necessidade.
                </p>
              </div>
            </SR>

            <SR delay={0.1}>
              <div
                className="rounded-3xl p-8 my-10 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-xl font-semibold italic leading-snug relative z-10" style={{ color: "rgba(255,255,255,0.85)" }}>
                  "O conhecimento só vira liberdade quando vira ação."
                </p>
              </div>
            </SR>

            <SR delay={0.15}>
              <p className="text-2xl font-extrabold tracking-tight mt-10">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--emerald-glow)))" }}>
                  Bem-vindo à resistência.
                </span>
              </p>
            </SR>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center text-[13px] space-y-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          <p>
            © <a href="https://receitas.site" className="transition-colors hover:underline" style={{ color: "hsl(var(--emerald))" }}>receitas.site</a> · Área de membros exclusiva
          </p>
          <p>Conteúdo protegido. Proibida a redistribuição.</p>
        </div>
      </footer>
    </div>
  );
};

export default Membros;
