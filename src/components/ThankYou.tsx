import { CheckCircle, ArrowLeft, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThankYouProps {
  onBack: () => void;
}

const ThankYou = ({ onBack }: ThankYouProps) => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/553191548439?text=Olá! Acabei de enviar uma solicitação pelo site.', '_blank');
  };

  return (
    <section className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-warm">
            {/* Success Icon */}
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            
            {/* Main Message */}
            <h1 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-6">
              Solicitação enviada com sucesso!
            </h1>
            
            <p className="text-lg text-warm-secondary mb-8 leading-relaxed">
              Obrigada por confiar em mim para te acompanhar nessa jornada. 
              Retornarei o contato em até <strong>24 horas</strong> para agendar nossa primeira conversa.
            </p>

            {/* Next Steps */}
            <div className="bg-surface/40 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-nunito font-semibold text-warm mb-4 text-center">
                Próximos passos:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <p className="text-warm-secondary">Você receberá um email de confirmação em alguns minutos</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <p className="text-warm-secondary">Entrarei em contato pelo WhatsApp ou email em até 24h</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <p className="text-warm-secondary">Vamos agendar nossa primeira conversa</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                onClick={handleWhatsApp}
                className="btn-primary flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp
              </Button>
              
              <Button 
                onClick={onBack}
                variant="outline"
                className="border-2 border-surface hover:bg-surface flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Voltar ao início
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-center text-warm-muted text-sm">
              <p className="mb-2">
                <Calendar size={14} className="inline mr-1" />
                Horário de retorno: Segunda a sexta, 9h às 18h
              </p>
              <p>
                Alguma urgência? Entre em contato pelo WhatsApp que responderei assim que possível.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;