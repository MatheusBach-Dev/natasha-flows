import { Mail, Instagram, MapPin, Shield, FileText } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface/50 border-t border-surface"> {/* entender esse CSS com tailwind */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-3"> {/* ??? ele mexe em toda a footer (rodapé) */}
            <h3 className="text-primary">
              LeveMente
            </h3>
            <p className="text-warm-secondary leading-relaxed mb-6 max-w-md">
             Autoconhecimento e amadurecimento com leveza para equilibrar mente, corpo e alma.
            </p>
            <div className="flex items-center gap-2 text-warm-muted">
              <Shield size={16} />
              <span className="text-sm">Todos os dados protegidos</span>
            </div>
          </div>

          <div>
            <h4 className="font-nunito font-semibold text-warm mb-2">
              Contato
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:natashapreis@gmail.com" 
                className="flex items-center gap-2 text-warm-secondary hover:text-primary transition-colors"
              >
                <Mail size={16} />
                natashapreis@gmail.com
              </a>
              <a 
                href="https://instagram.com/natashapreis" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-warm-secondary hover:text-primary transition-colors"
              >
                <Instagram size={16} />
                @natashapreis
              </a>
              <div className="flex items-start gap-2 text-warm-secondary">
                <MapPin size={16} className="mt-0.5" />
                <div>
                  <div>Atendimento Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-warm-muted text-sm">
              © {currentYear} LeveMente. Todos os direitos reservados.
            </div>
            <div className="text-warm-muted text-sm text-center md:text-right">
              <p>Este site utiliza cookies para melhorar sua experiência.</p>
              <p>Ao continuar navegando, você concorda com nossa política de privacidade.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;