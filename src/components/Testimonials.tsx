import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [nome, setNome] = useState('');
  const [texto, setTexto] = useState('');
  const [rating, setRating] = useState(5);
  
  const comentariosIniciais = [
    {
      name: "F.P",
      text: "Foi uma experiência muito boa! Ajudou-me bastante — me senti leve, tranquila e consegui ser eu mesma. Meu dia rendeu de uma forma que há muito tempo não acontecia.",
      rating: 5
    },
    {
      name: "J.G",
      text: "Nos últimos meses percebi uma grande evolução em mim. As sessões com a Natasha me ajudaram a entender melhor meus sentimentos e a lidar com eles de forma mais leve e consciente.",
      rating: 5
    },
    {
      name: "D.P",
      text: "Na minha última sessão, a Natasha me desafiou a reconectar com minha energia feminina. Percebi que, depois que nos tornamos mães, às vezes esquecemos que ser mãe e expressar nossa energia feminina são coisas diferentes — e isso fez toda a diferença pra mim.",
      rating: 5
    }
  ];
  
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : comentariosIniciais;
  });
  
  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome && texto) {
      const novoTestimonial = {
        name: nome,
        text: texto,
        rating: rating
      };
      setTestimonials([...testimonials, novoTestimonial]);
    }
    console.log('Comentario enviado:', { nome, texto, rating });
    setNome('');
    setTexto('');
    setRating(5);
  };

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

      <div className='flex justify-center mt-20 px-4'>
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-5">
            Adicione um comentário <span className="text-primary">LeveMente</span>
          </h2>

          <div className="relative">
            <p className="absolute top-[-8px] left-4 md:left-[120px] mt-1">Nome</p>
          </div>

          <div className=" flex justify-center">
            <input className="mx-auto card-warm p-5 w-full md:w-96 mb-4 text-warm placeholder-warm-secondary/60 h-16 mt-9"
              placeholder="Digite o seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="relative">
            <p className="absolute top-[-8px] left-4 md:left-[120px] mt-2">Adicionar um comentário</p>
          </div>

          <div className="flex justify-center">
            <textarea className="flex justify-center card-warm p-5 w-full md:w-96 mb-4 text-warm placeholder-warm-secondary/60 h-16 mt-10"
              placeholder="Adicione um comentário"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-6 cursor-pointer ${star <= rating ? 'fill-accent text-accent' : 'text-gray-300'} mb-6`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn-primary bg-[rgb(108,167,138)] text-white p-6 rounded-2x1 hover:bg-[rgb(98,157,128)] h-16">Enviar Comentário</button>
          </div>
        </form>
      </div>
    </section>

  );
};

export default Testimonials;