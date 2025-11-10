import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marina S.",
      text: "A Natasha me ajudou a entender melhor meus padrões de ansiedade. Hoje me sinto mais segura para enfrentar os desafios do dia a dia.",
      rating: 5
    },
    {
      name: "Carlos M.",
      text: "Processo terapêutico muito acolhedor. Senti que podia ser eu mesmo desde a primeira sessão. Recomendo demais!",
      rating: 5
    },
    {
      name: "Ana P.",
      text: "Comecei a terapia em um momento muito difícil. A Natasha foi fundamental para me ajudar a encontrar meu equilíbrio novamente.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-surface/40 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-4">
              O que dizem sobre a terapia
            </h2>
            <p className="text-lg text-warm-secondary">
              Depoimentos de pessoas que encontraram seu caminho
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="card-warm relative group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-accent/40" />
                </div>
                
                <p className="text-warm-secondary leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="font-medium text-warm">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;