"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  Layers, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Target,
  Shield,
  Zap,
  Heart,
  Star,
  Send,
  Menu,
  X,
  Code,
  Database,
  Server,
  Smartphone,
  Globe,
  Brain
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';

const terminalLines = [
  "$ whoami",
  "> Desenvolvedor Full-Stack & AI Specialist",
  "$ ls skills/",
  "> frontend/ backend/ ai/ automation/",
  "$ cat mission.txt",
  "> Transformar conhecimento em valor real",
  "$ ./build_future.sh",
  "> Executando... ████████████████ 100%",
  "> Futuro construído com sucesso! 🚀"
];

const lineChartData = [
  { month: 'Jan', students: 100 },
  { month: 'Fev', students: 150 },
  { month: 'Mar', students: 250 },
  { month: 'Abr', students: 400 },
  { month: 'Mai', students: 650 },
  { month: 'Jun', students: 1000 }
];

const barChartData = [
  { skill: 'React', level: 95 },
  { skill: 'Node.js', level: 88 },
  { skill: 'Python', level: 92 },
  { skill: 'AI/ML', level: 85 },
  { skill: 'DevOps', level: 78 }
];

const radialData = [
  { name: 'Satisfação', value: 98, fill: '#EE4F27' },
  { name: 'Aprovação', value: 96, fill: '#8b5cf6' },
  { name: 'Retenção', value: 94, fill: '#06b6d4' }
];

export default function Homepage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: 'Olá! Sou a IA do Tyaakov.dev. Como posso ajudar você hoje?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [
      ...prev,
      { role: 'user', content: chatInput },
      { role: 'ai', content: 'Interessante pergunta! Estou processando sua solicitação...' }
    ]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 backdrop-blur-sm bg-gray-900/80 border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Tyaakov.dev</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#main" className="text-gray-300 hover:text-white transition-colors">Main</a>
              <a href="#learn" className="text-gray-300 hover:text-white transition-colors">Learn</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills Shop</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">Quem Sou</a>
              <a href="#chat" className="text-gray-300 hover:text-white transition-colors">Chat A.I.</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Fale Comigo</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-violet-500 text-violet-400 hover:bg-violet-500/10">
                Login
              </Button>
              <Button size="sm" className="bg-[#EE4F27] hover:bg-[#EE4F27]/90">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stack Preview Button */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-center">
          <Collapsible open={isStackOpen} onOpenChange={setIsStackOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <Layers className="w-4 h-4" />
                <span>View Stack</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card className="bg-slate-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-300">React/Next.js</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Server className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">Node.js</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-gray-300">MongoDB</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-gray-300">OpenAI</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Hero Section */}
      <section id="main" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-bold tracking-tight text-4xl lg:text-5xl xl:text-6xl text-white mb-6">
              Não é sobre nós, é sobre o que podemos 
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> construir!</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Resolvi desenvolver este ambiente para torná-lo um ponto de encontro de mentes sedentas de conhecimento e resultado, 
              que possuem um propósito único e forte sobre seus negócios: Gerar Valor real na vida das pessoas e ser bem pago por isso.
            </p>
            <Button size="lg" className="bg-[#EE4F27] hover:bg-[#EE4F27]/90 text-white px-8 py-3">
              Comece a hackear o seu aprendizado
            </Button>
          </div>
          
          <div>
            <Card className="bg-gray-900/80 border-gray-700">
              <CardContent className="p-6">
                <div className="terminal-text text-green-400 space-y-2">
                  {terminalLines.slice(0, currentLine).map((line, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-sm font-mono">
                        {line}
                        {index === currentLine - 1 && (
                          <span className="inline-block w-2 h-4 bg-[#EE4F27] ml-1 animate-blink"></span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Crescimento dos Estudantes</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart width={300} height={200} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Line type="monotone" dataKey="students" stroke="#EE4F27" strokeWidth={2} />
              </LineChart>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Níveis de Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={300} height={200} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="skill" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Bar dataKey="level" fill="#8b5cf6" />
              </BarChart>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Métricas de Sucesso</CardTitle>
            </CardHeader>
            <CardContent>
              <RadialBarChart width={300} height={200} data={radialData}>
                <RadialBar dataKey="value" cornerRadius={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
              </RadialBarChart>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: Users, label: "1000+ Estudantes", value: "1K+" },
            { icon: Award, label: "50+ Certificações", value: "50+" },
            { icon: BookOpen, label: "200+ Projetos", value: "200+" },
            { icon: TrendingUp, label: "98% Satisfação", value: "98%" },
            { icon: Target, label: "500+ Horas", value: "500h" },
            { icon: Heart, label: "95% Retenção", value: "95%" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#EE4F27]" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          O que dizem nossos estudantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "O Tyaakov.dev transformou completamente minha carreira. Aprendi mais em 3 meses do que em anos autodidaticamente.",
              name: "Maria Silva",
              role: "Frontend Developer",
              avatar: "MS"
            },
            {
              quote: "A abordagem prática e o foco em projetos reais fez toda a diferença. Hoje sou dev sênior graças ao curso.",
              name: "João Santos",
              role: "Full-Stack Developer",
              avatar: "JS"
            },
            {
              quote: "Metodologia incrível! O suporte da comunidade e do Tyaakov é excepcional. Recomendo a todos.",
              name: "Ana Costa",
              role: "Tech Lead",
              avatar: "AC"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-[#EE4F27] text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pain/Problem/Benefits Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          Por que escolher o Tyaakov.dev?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <Shield className="w-12 h-12 text-[#EE4F27] mb-4" />
              <CardTitle className="text-white">Metodologia Comprovada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Sistema de aprendizado testado e aprovado por centenas de desenvolvedores que hoje trabalham em grandes empresas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <Zap className="w-12 h-12 text-[#EE4F27] mb-4" />
              <CardTitle className="text-white">Resultados Rápidos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Projetos práticos desde o primeiro dia. Você sai do curso com um portfólio robusto e pronto para o mercado.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-gray-700">
            <CardHeader>
              <Heart className="w-12 h-12 text-[#EE4F27] mb-4" />
              <CardTitle className="text-white">Comunidade Ativa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Faça parte de uma comunidade engajada de desenvolvedores que se ajudam mutuamente e compartilham oportunidades.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Photos Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          Projetos em Ação
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-gray-700 overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Smartphone className="w-16 h-16 text-white" />
              </div>
            </AspectRatio>
            <CardContent className="p-4">
              <h3 className="font-semibold text-white mb-2">App Mobile Completo</h3>
              <p className="text-sm text-gray-400">React Native com backend Node.js</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-gray-700 overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
                <Globe className="w-16 h-16 text-white" />
              </div>
            </AspectRatio>
            <CardContent className="p-4">
              <h3 className="font-semibold text-white mb-2">Plataforma Web</h3>
              <p className="text-sm text-gray-400">Next.js com integração de IA</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Irresistible Proposal Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Transforme sua Carreira em 
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> 90 Dias</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Não é apenas mais um curso de programação. É um sistema completo de transformação profissional 
            que te leva do zero ao mercado de trabalho com projetos reais no portfólio e networking de alta qualidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EE4F27] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">30</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Primeiros 30 dias</h3>
              <p className="text-gray-400">Fundamentos sólidos e primeiro projeto</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EE4F27] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">60</span>
              </div>
              <h3 className="font-semibold text-white mb-2">60 dias</h3>
              <p className="text-gray-400">Projetos avançados e especialização</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EE4F27] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">90</span>
              </div>
              <h3 className="font-semibold text-white mb-2">90 dias</h3>
              <p className="text-gray-400">Pronto para o mercado!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency/Scarcity Section */}
      <section className="w-full bg-slate-900/50 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Últimas Vagas da Turma de Janeiro 2025
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Restam apenas <span className="text-[#EE4F27] font-bold">7 vagas</span> para garantir seu lugar na próxima turma. 
              O mercado está aquecido e as empresas estão contratando. Não perca essa oportunidade única.
            </p>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#EE4F27]">7</div>
                <div className="text-sm text-gray-400">Vagas Restantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#EE4F27]">15</div>
                <div className="text-sm text-gray-400">Dias para Iniciar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#EE4F27]">100%</div>
                <div className="text-sm text-gray-400">Taxa de Empregabilidade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-gradient-radial from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Desbloqueie seu Potencial Agora
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se aos desenvolvedores que já transformaram suas carreiras e estão construindo o futuro da tecnologia.
            </p>
            <Button size="lg" className="bg-[#EE4F27] hover:bg-[#EE4F27]/90 text-white px-12 py-4 text-lg">
              Garantir Minha Vaga Agora
            </Button>
            <p className="text-sm text-gray-400 mt-4">30 dias de garantia ou seu dinheiro de volta</p>
          </div>
        </div>
      </section>

      {/* Frictionless Form Section */}
      <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Fale Comigo</h2>
            <p className="text-lg text-gray-300 mb-8">
              Tem alguma dúvida sobre os cursos ou quer saber mais sobre como posso ajudar na sua jornada? 
              Mande uma mensagem e vamos conversar!
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#EE4F27] rounded-full"></div>
                <span className="text-gray-300">Resposta em até 24h</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#EE4F27] rounded-full"></div>
                <span className="text-gray-300">Consultoria gratuita de 30min</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#EE4F27] rounded-full"></div>
                <span className="text-gray-300">Plano personalizado</span>
              </div>
            </div>
          </div>
          
          <Card className="bg-slate-800/50 border-gray-700">
            <CardContent className="p-6">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Seu E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Conte-me sobre seus objetivos e como posso ajudar..."
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#EE4F27] hover:bg-[#EE4F27]/90">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="chat" className="w-full bg-slate-900 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-800/80 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#EE4F27] text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-white">Chat A.I.</CardTitle>
                  <p className="text-sm text-gray-400">Assistente inteligente do Tyaakov.dev</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#EE4F27] text-white'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <form onSubmit={handleChatSubmit} className="flex w-full space-x-2">
                <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 min-h-[2.5rem] max-h-[10rem] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="text-[#EE4F27] hover:bg-[#EE4F27]/10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">Tyaakov.dev</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformando desenvolvedores em profissionais de alta performance através de metodologia prática e projetos reais.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Cursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Frontend</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Backend</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Full-Stack</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">IA & Machine Learning</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Documentação</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Projetos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Comunidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-5 h-5 bg-blue-600 rounded"></div>
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <div className="w-5 h-5 bg-gray-600 rounded"></div>
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <div className="w-5 h-5 bg-red-600 rounded"></div>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Tyaakov.dev. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}