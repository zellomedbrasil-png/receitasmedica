import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const stats = [
  { value: 15000, label: "Receitas Renovadas", prefix: "+" },
  { value: 98, label: "Taxa de Aprovação", suffix: "%" },
  { value: 20, label: "Tempo Médio (min)", suffix: "min" },
];

const testimonials = [
  {
    name: "Maria Aparecida",
    city: "São Paulo, SP",
    text: "Renovei minha receita de pressão em menos de 20 minutos. Prático e seguro!",
    rating: 5,
  },
  {
    name: "Carlos Eduardo",
    city: "Belo Horizonte, MG",
    text: "Excelente atendimento. O médico foi muito atencioso na teleconsulta.",
    rating: 5,
  },
  {
    name: "Ana Paula",
    city: "Curitiba, PR",
    text: "Recebi a receita no WhatsApp e já fui direto na farmácia. Super rápido!",
    rating: 5,
  },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setDisplay(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-semibold text-foreground tracking-tighter-custom">
      {prefix}{display.toLocaleString("pt-BR")}{suffix}
    </div>
  );
}

const ProvaSocial = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
              <p className="text-sm text-muted-foreground mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvaSocial;
