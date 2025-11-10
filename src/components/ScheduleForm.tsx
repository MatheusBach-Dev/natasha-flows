import { useState } from 'react';
import { Calendar, MessageCircle, User, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { saveScheduleRequest } from '@/services/scheduleService';

interface ScheduleFormProps {
  onSuccess: () => void;
}

const ScheduleForm = ({ onSuccess }: ScheduleFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredMode: 'online',
    preferredTimes: [] as string[],
    message: ''
  });

  const timeSlots = [
    'Manhã (8h-12h)',
    'Tarde (13h-17h)', 
    'Noite (18h-21h)'
  ];

  const handleTimeSlotChange = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(timeSlot)
        ? prev.preferredTimes.filter(t => t !== timeSlot)
        : [...prev.preferredTimes, timeSlot]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, email e telefone.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await saveScheduleRequest(formData);
      
      toast({
        title: "Solicitação enviada!",
        description: "Retornarei o contato em até 24 horas. Obrigada!",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-4">
              Lista de espera para Atendimentos
            </h2>
            <p className="text-lg text-warm-secondary max-w-2xl mx-auto">
              Preencha seus dados e retornarei o quanto antes para agendar nossa sessão de cortesia. Nessa sessão gratuita, eu tiro todas as suas dúvidas sobre o 
              Método LeveMente e escuto quais são suas queixas para alinharmos o processo terapêutico personalizado para você.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="card-warm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-nunito font-semibold text-warm mb-4 flex items-center gap-2">
                    <User size={20} />
                    Seus dados
                  </h3>
                  
                  <div>
                    <label className="block text-warm-secondary mb-2 font-medium">
                      Nome completo *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Seu nome completo"
                      className="border-2 border-surface focus:border-primary rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-warm-secondary mb-2 font-medium">
                        E-mail *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        className="border-2 border-surface focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-warm-secondary mb-2 font-medium">
                        WhatsApp *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 11) {
                            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                            if (value.length <= 10) {
                              value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                            }
                            setFormData(prev => ({ ...prev, phone: value }));
                          }
                        }}
                        placeholder="(31) 9154-8439"
                        className="border-2 border-surface focus:border-primary rounded-xl"
                        maxLength={15}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-warm-secondary mb-2 font-medium">
                    Mensagem (opcional)
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Conte um pouco sobre o que te trouxe até aqui ou alguma dúvida específica"
                    className="border-2 border-surface focus:border-primary rounded-xl min-h-[100px]"
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={20} />
                      Enviar solicitação
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="card-warm bg-surface/30">
                <h3 className="text-xl font-nunito font-semibold text-warm mb-4">
                  Próximos passos
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-warm">Envio da solicitação</p>
                      <p className="text-warm-secondary text-sm">Você receberá uma confirmação por e-mail</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">2</span>
                    </div>
                   <div>
                      <p className="font-medium text-warm">Sessão de Cortesia</p>
                      <p className="text-warm-secondary text-sm">Conhecer suas necessidades e expectativas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">3</span>
                    </div>
                     <div>
                      <p className="font-medium text-warm">Retorno </p>
                      <p className="text-warm-secondary text-sm">Entrarei em contato para agendar nossa sessão de cortesia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-warm bg-accent/10">
                <h3 className="text-lg font-nunito font-semibold text-warm mb-3 flex items-center gap-2">
                  <MessageCircle size={20} />
                  Prefere WhatsApp?
                </h3>
                <p className="text-warm-secondary mb-4">
                  Você também pode entrar em contato diretamente pelo WhatsApp para tirar dúvidas ou agendar.
                </p>
                <Button 
                  onClick={() => window.open('https://wa.me/553191548439?text=Olá! Gostaria de agendar uma sessão de terapia.', '_blank')}
                  className="btn-accent w-full"
                >
                  Chamar no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleForm;