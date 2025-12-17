import { useState } from 'react';
import { CheckCircle, ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveTestResult } from '@/services/scheduleService';
import { useToast } from '@/hooks/use-toast';

interface QuickTestProps {
  onNavigate: (section: string) => void;
}

const QuickTest = ({ onNavigate }: QuickTestProps) => {
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      text: "Com que frequência pensamentos acelerados atrapalham seu sono?",
      options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
    },
    {
      text: "Você sente dificuldade em regular suas emoções no dia a dia?",
      options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
    },
    {
      text: "Como você se sente em relação ao autoconhecimento?",
      options: ["Muito satisfeito", "Satisfeito", "Neutro", "Insatisfeito", "Muito insatisfeito"]
    },
    {
      text: "Seus relacionamentos te trazem satisfação?",
      options: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"]
    },
    {
      text: "Você consegue lidar bem com situações estressantes?",
      options: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"]
    },
    {
      text: "Sente que precisa de apoio para entender melhor suas emoções?",
      options: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowUserForm(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getResult = () => {
    const score = calculateScore();
    if (score <= 8) {
      return {
        title: "Você está em um bom momento!",
        message: "Talvez uma conversa inicial já possa te ajudar a manter esse equilíbrio.",
        color: "text-primary",
        category: "baixo"
      };
    } else if (score <= 18) {
      return {
        title: "Uma consulta pode te ajudar",
        message: "Alguns temas podem se beneficiar de ferramentas terapêuticas práticas.",
        color: "text-accent-foreground",
        category: "medio"
      };
    } else {
      return {
        title: "Recomendado iniciar acompanhamento",
        message: "A terapia pode ser um grande apoio para você neste momento.",
        color: "text-primary",
        category: "alto"
      };
    }
  };

  const handleSaveResult = async () => {
    if (!userData.name || !userData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome e email.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const result = getResult();
      await saveTestResult(userData.email, userData.name, {
        answers,
        score: calculateScore(),
        result: result.category
      });
      
      setShowUserForm(false);
      setShowResult(true);
      
      toast({
        title: "Resultado salvo!",
        description: "Seu teste foi registrado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (showUserForm) {
    return (
      <section className="py-20 bg-surface/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="card-warm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-nunito font-bold text-warm mb-4 text-center">
                Teste concluído!
              </h3>
              
              <p className="text-warm-secondary text-center mb-8">
                Para ver seu resultado e salvar o teste, preencha seus dados:
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-warm-secondary mb-2 font-medium">
                    Nome completo *
                  </label>
                  <Input
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome completo"
                    className="border-2 border-surface focus:border-primary rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-warm-secondary mb-2 font-medium">
                    E-mail *
                  </label>
                  <Input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com"
                    className="border-2 border-surface focus:border-primary rounded-xl"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleSaveResult}
                  disabled={isSaving}
                  className="btn-primary"
                >
                  {isSaving ? 'Salvando...' : 'Ver Resultado'}
                </Button>
                <Button 
                  onClick={() => {
                    setShowTest(false);
                    setShowUserForm(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                  }}
                  variant="outline"
                  className="border-2 border-surface hover:bg-surface"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showResult) {
    const result = getResult();
    return (
      <section className="py-20 bg-surface/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card-warm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className={`text-2xl font-nunito font-bold mb-4 ${result.color}`}>
                {result.title}
              </h3>
              
              <p className="text-warm-secondary text-lg mb-8 leading-relaxed">
                {result.message}
              </p>
              
              <p className="text-warm-muted mb-8">
                Lembre-se: buscar ajuda é um ato de coragem e autocuidado. 
                Estou aqui para te acompanhar nessa jornada.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => onNavigate('schedule')}
                  className="btn-primary"
                >
                  Agendar Sessão
                </Button>
                <Button 
                  onClick={() => {
                    setShowTest(false);
                    setShowResult(false);
                    setShowUserForm(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setUserData({ name: '', email: '' });
                  }}
                  variant="outline"
                  className="border-2 border-surface hover:bg-surface"
                >
                  Refazer Teste
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showTest) {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <section className="py-20 bg-surface/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="card-warm">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-warm-muted">
                    Pergunta {currentQuestion + 1} de {questions.length}
                  </span>
                  <span className="text-warm-muted">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <h3 className="text-xl font-nunito font-semibold text-warm mb-8 leading-relaxed">
                {question.text}
              </h3>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left border-2 border-surface rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 text-warm-secondary hover:text-warm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-surface/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-warm">
            <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-accent-foreground" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-nunito font-bold text-warm mb-4">
              Descubra se é o momento de buscar terapia
            </h2>
            
            <p className="text-lg text-warm-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Um teste rápido e acolhedor para te ajudar a entender melhor suas necessidades emocionais.
            </p>
            
            <button 
              onClick={() => setShowTest(true)}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              Começar Teste
              <ArrowRight size={20} />
            </button>
            
            <p className="text-warm-muted mt-4 text-sm">
              ⏱ Leva apenas 2 minutos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickTest;