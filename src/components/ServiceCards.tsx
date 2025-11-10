import { Brain, Users, Lightbulb } from 'lucide-react';

const ServiceCards = () => {
  const services = [
    {
      icon: Brain,
      title: "Autocontrole",
      description: "Técnicas simples e práticas para lidar com pensamentos acelerados e preocupações excessivas.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Lightbulb,
      title: "Autoconhecimento",
      description: "Jornada de descoberta pessoal para entender seus padrões, emoções e desenvolver uma relação mais saudável consigo mesmo.",
      color: "bg-accent/20 text-accent-foreground"
    },
    {
      icon: Users,
      title: "Relacionamentos",
      description: "Melhore sua comunicação, estabeleça limites saudáveis e construa relacionamentos mais autênticos e satisfatórios.",
      color: "bg-surface text-surface-foreground"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-4">
              Como posso te ajudar?
            </h2>
            <p className="text-lg text-warm-secondary max-w-2xl mx-auto">
              Cada pessoa é única, e minha abordagem é personalizada para suas necessidades específicas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="card-warm group hover:scale-105 transition-all duration-300 hover:shadow-[var(--shadow-large)]"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color} transition-transform group-hover:scale-110`}>
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-nunito font-semibold text-warm mb-4">
                  {service.title}
                </h3>
                
                <p className="text-warm-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;