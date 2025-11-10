import { MessageCircle, Calendar, Heart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Primeiro Contato",
      description: "Entre em contato através do WhatsApp ou formulário. Vamos conversar sobre suas necessidades e expectativas."
    },
    {
      icon: Calendar,
      title: "Nosso Encontro",
      description: "Agendamos a primeira sessão no horário que funciona melhor para você de forma online."
    },
    {
      icon: Heart,
      title: "Acompanhamento",
      description: "Construímos juntos um processo terapêutico personalizado, respeitando seu ritmo e objetivos."
    }
  ];

  return (
    <section className="py-20 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-4">
            Como funciona?
          </h2>
          <p className="text-lg text-warm-secondary mb-16 max-w-2xl mx-auto">
            Um processo simples e acolhedor para você começar sua jornada de autoconhecimento
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card-warm text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-nunito font-semibold text-warm mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-warm-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/40 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;