import { GraduationCap, Heart, Users, Clock } from 'lucide-react';
import natashaPhoto from '@/assets/natasha.jpg';
import therapyEnvironment from '@/assets/therapy-environment.jpg';
import { Description } from '@radix-ui/react-toast';

interface AboutProps {
  onNavigate: (section: string) => void;
}

const About = ({ onNavigate }: AboutProps) => {
  const approaches = [
    "Temperamentos Humanos",
    "Abordagem para o trauma: Somatic Experience",
    "Eneagrama",
    "Terapia Sistêmica",
    "Terapia de Casais",
    "Terapia de Grupo"
  ];

  const highlights = [
    {
      icon: Clock,
      title: "Sessões de 60 minutos",
      description: "Tempo adequado para um processo profundo e acolhedor"
    },
    {
      icon: Heart,
      title: "Abordagem Integrada",
      description: "Utilizo várias abordagens terapêuticas"
    },
    {
      icon: Users,
      title: "Online",
      description: "Atendimentos somente de forma Online"
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-10xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-4">
              Sobre mim
            </h2>
            <p className="text-lg text-warm-secondary max-w-2xl mx-auto">
              Conheça minha trajetória e abordagem terapêutica
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <div className="relative">
                <img
                  src={natashaPhoto}
                  alt="Natasha - Psicóloga e Terapeuta"
                  className="w-64 h-64 rounded-3xl object-cover shadow-[var(--shadow-large)] mx-auto lg:mx-0 -mt-60" /* tamanho da imagem */
                />
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-surface/50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <highlight.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm mb-1">{highlight.title}</h4>
                      <p className="text-warm-secondary text-sm">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <div className="prose prose-lg">
                <p>
                  Sou a <span className="font-semibold text-warm">Natasha Preis Ferreira</span>, terapeuta, atuando há mais de 20 anos com comportamento humano.
                  Hoje me dedico a ajudar pessoas a se conhecerem melhor e encontrarem equilíbrio e leveza emocional por meio do meu método <span className="text-primary">LeveMente</span>.
                </p>
              </div>

              <div>
                <p>
                  <span className="font-semibold text-warm">Afinal, pra quem é o <span className="text-primary">LeveMente</span>?</span>
                </p>
              </div>

              <div>
                <p>O método <span className="text-primary">LeveMente</span> nasceu da busca por equilíbrio entre os muitos papéis da vida - mãe, profissional, mulher, esposa, filha - e das necessidades
                  de viver com mais presença, leveza e consciência.
                  É um caminho terapêutico integrativo que unde sabedoria emocional e autoconecimento profundo, permitindo que cada pessoa reencontre seu propósito e viva com mais leveza, clareza e serenidade.
                </p>
              </div>

              <div>
                 <p className="text-warm-secondary leading-relaxed">
                  Acredito que cada pessoa tem dentro de si os recursos necessários para transformar
                  sua vida. Meu papel é te acompanhar nessa jornada de autoconhecimento, oferecendo
                  um espaço seguro, acolhedor e livre de julgamentos.
                </p>
              </div>

              <div>
                <p className="text-warm-secondary leading-relaxed">
                  Trabalho com processos de autoconhecimento que levam os pacientes ao amadurecimento pessoal e das relações. Sempre respeitando o ritmo e as necessidades únicas de cada pessoa. Minha abordagem
                  combina várias técnicas terapêuticas com um olhar humanizado e empático.
                </p>
              </div>

              <div>
                 <p className="text-warm-secondary leading-relaxed">
                  Atendimento online, oferecendo flexibilidade geográfica para que você
                  se sinta confortável durante todo o processo terapêutico.
                </p>
              </div>

              {/* Approaches */}
              <div className="mt-8">
                <h3 className="text-xl font-nunito font-semibold text-warm mb-4">
                  Minha abordagem terapêutica
                </h3>
                <div className="flex flex-wrap gap-2">
                  {approaches.map((approach, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {approach}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <button
                  onClick={() => onNavigate('schedule')}
                  className="btn-primary"
                >
                  Vamos conversar?
                </button>
              </div>
            </div>
          </div>

          {/* Environment Image */}
          <div className="mt-20">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-large)]">
              <img
                src={therapyEnvironment}
                alt="Ambiente terapêutico acolhedor"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-nunito font-bold mb-2">
                    Um momento pensado para você
                  </h3>
                  <p className="text-lg opacity-90">
                    Ambiente acolhedor e seguro para sua jornada em busca de uma vida mais leve
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;