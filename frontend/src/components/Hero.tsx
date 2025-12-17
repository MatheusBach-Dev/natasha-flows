import { Heart, MessageCircle, Calendar } from 'lucide-react';
import natashaPhoto from '@/assets/natasha.jpg';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const handleWhatsApp = () => { // texto automatico de entrar em contato 
    window.open('https://wa.me/553191548439?text=Olá! Gostaria de saber mais sobre a terapia.', '_blank');
  };

  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Image */}
          <div className="mb-8 animate-fade-up">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <img
                src={natashaPhoto}
                alt="Natasha - Terapeuta"
                className="w-full h-full rounded-full object-cover shadow-[var(--shadow-large)] animate-float"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-3 rounded-full shadow-[var(--shadow-medium)]">
                <Heart size={20} />
              </div>
            </div>
          </div>

          

          {/* Hero Content */}
          <div className="space-y-3 animate-fade-up">
            <h1 className="text-2xl md:text-5xl font-nunito font-bold text-warm leading-tight"> {/* define o tamanho do texto com text -1xl, text -2xl... 
            o md:text-5xl quer dizer que ira mudar para este tamanho em medias ou maiores*/}
              <span className="text-primary">Método LeveMente </span>
              <p>Autoconhecimento e amadurecimento com leveza para equilibrar{' '}</p>
              <span className="text-primary">mente, corpo e alma.</span>
            </h1>

            <p className="text-1xl md:text-2xl text-warm-secondary max-w-3xl mx-auto leading-relaxed">
              <span className="text-primary">LeveMente </span>
              é sobre aprender a viver sem o peso do controle, da culpa e da exigência.
              É sobre respirar, sentir e escolher a si mesma com amor e consciência.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => onNavigate('schedule')}
                className="btn-primary flex items-center gap-2 w-full sm:w-auto"
              >
                <Calendar size={20} />
                Agendar Sessão
              </button>

              <button
                onClick={handleWhatsApp}
                className="btn-secondary flex items-center gap-2 w-full sm:w-auto"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 flex flex-wrap justify-center items-center gap-8 text-warm-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Atendimento Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;