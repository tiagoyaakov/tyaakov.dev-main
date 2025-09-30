"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ProductCard, { type Product } from '@/components/shop/ProductCard';
import ProductSaleModal from '@/components/shop/ProductSaleModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Masterclass: Automação com IA',
    price: 'R$ 497',
    imageUrl: '',
    shortDescription: 'Automatize processos complexos usando GPT-4 e ferramentas de IA.',
    longDescription: 'Neste curso completo, você aprenderá a criar sistemas de automação inteligentes que economizam horas do seu dia. Desde integração com APIs até criação de agentes autônomos, você dominará as técnicas usadas pelas maiores empresas tech do mundo.',
    benefits: [
      '40+ horas de conteúdo prático em vídeo',
      'Acesso a 15 projetos reais prontos para usar',
      'Certificado de conclusão reconhecido',
      'Suporte direto no Discord',
      'Atualizações vitalícias do conteúdo',
      'Templates e scripts prontos para produção'
    ]
  },
  {
    id: '2',
    name: 'Kit Desenvolvedor Full-Stack Pro',
    price: 'R$ 997',
    imageUrl: '',
    shortDescription: 'Todo o conhecimento para se tornar um desenvolvedor completo em 2025.',
    longDescription: 'O caminho definitivo para dominar desenvolvimento moderno. React, Next.js, Node.js, bancos de dados, DevOps e muito mais. Do básico ao avançado com projetos que impressionam em qualquer portfolio.',
    benefits: [
      '100+ horas de vídeo aulas atualizadas',
      'Stack completa: Frontend + Backend + DevOps',
      '25 projetos do zero ao deploy',
      'Mentoria em grupo mensal',
      'Preparação para entrevistas técnicas',
      'Comunidade exclusiva de desenvolvedores',
      'Material de apoio em PDF',
      'Garantia de empregabilidade'
    ]
  },
  {
    id: '3',
    name: 'Consultoria: Arquitetura de Software',
    price: 'R$ 2.997',
    imageUrl: '',
    shortDescription: '4 semanas de consultoria individual para escalar seu projeto.',
    longDescription: 'Sessões individuais onde analisamos seu projeto, identificamos gargalos e criamos uma arquitetura escalável. Ideal para founders técnicos e desenvolvedores sêniores que querem levar seus projetos ao próximo nível.',
    benefits: [
      '8 sessões de 1h de consultoria ao vivo',
      'Análise completa da arquitetura atual',
      'Documentação técnica profissional',
      'Roadmap de melhorias priorizadas',
      'Code review de componentes críticos',
      'Suporte via WhatsApp por 30 dias',
      'Gravações de todas as sessões'
    ]
  },
  {
    id: '4',
    name: 'Engenharia de Prompt: Do Zero ao Expert',
    price: 'R$ 297',
    imageUrl: '',
    shortDescription: 'Domine a arte de criar prompts que geram resultados extraordinários.',
    longDescription: 'Aprenda as técnicas avançadas de engenharia de prompt usadas por empresas líderes. Desde prompts simples até sistemas complexos de multi-agentes, você entenderá como extrair o máximo potencial dos LLMs.',
    benefits: [
      '20+ horas de conteúdo especializado',
      'Biblioteca com 500+ prompts testados',
      'Acesso ao Prompt Lab (ferramenta exclusiva)',
      'Certificação em Engenharia de Prompt',
      '10 estudos de caso reais',
      'Templates para diferentes casos de uso',
      'Comunidade de praticantes'
    ]
  },
  {
    id: '5',
    name: 'Package: Bootcamp Completo AI & Development',
    price: 'R$ 3.997',
    imageUrl: '',
    shortDescription: 'Todos os cursos + mentorias + acesso vitalício. O pacote definitivo.',
    longDescription: 'A solução completa para quem quer dominar IA e desenvolvimento moderno. Inclui todos os nossos cursos, mentorias exclusivas, certificações e acesso prioritário a novos conteúdos. O investimento mais completo em sua carreira tech.',
    benefits: [
      'TODOS os cursos da plataforma (valor R$ 8.000+)',
      'Mentoria individual mensal (12 sessões/ano)',
      'Acesso prioritário a novos lançamentos',
      'Networking em eventos exclusivos',
      'Certificações profissionais',
      'Job board com vagas exclusivas',
      'Desconto em consultorias adicionais',
      'Grupo VIP no WhatsApp com o Tyaakov',
      'Material bônus e ferramentas premium'
    ]
  },
  {
    id: '6',
    name: 'Workshop: Deploy e DevOps Moderno',
    price: 'R$ 397',
    imageUrl: '',
    shortDescription: 'Aprenda a fazer deploy profissional e gerenciar infraestrutura na nuvem.',
    longDescription: 'Workshop intensivo focado em ensinar as melhores práticas de DevOps e deploy. Docker, Kubernetes, CI/CD, monitoramento e tudo que você precisa para colocar aplicações em produção com confiança.',
    benefits: [
      '15 horas de workshop ao vivo',
      'Deploy de 5 projetos reais',
      'Domínio de Docker e Kubernetes',
      'Pipelines de CI/CD automatizados',
      'Configuração de monitoramento',
      'Scripts e configs prontos para usar',
      'Acesso à gravação por 1 ano'
    ]
  }
];

const mockProductTopics = [
  {
    name: 'E-books',
    subtopics: ['Engenharia de Prompt', 'Workflows de Automação', 'Modelos Open Source', 'DevOps']
  },
  {
    name: 'Cursos Online',
    subtopics: ['Desenvolvimento Full-Stack', 'Automação com IA', 'Segurança', 'Cloud Computing']
  },
  {
    name: 'Workshops',
    subtopics: ['Deploy e DevOps', 'Arquitetura de Software', 'Performance', 'Testing']
  },
  {
    name: 'Consultoria',
    subtopics: ['Arquitetura', 'Code Review', 'Mentoria Individual', 'Planejamento Técnico']
  },
  {
    name: 'Pacotes',
    subtopics: ['Bootcamp Completo', 'Bundle Premium', 'Acesso Vitalício', 'Corporativo']
  }
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('bestseller');

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const getProductTopic = (product: Product): string => {
    const name = product.name.toLowerCase();
    if (name.includes('e-book') || name.includes('engenharia de prompt')) return 'E-books';
    if (name.includes('masterclass') || name.includes('kit') || name.includes('curso')) return 'Cursos Online';
    if (name.includes('workshop')) return 'Workshops';
    if (name.includes('consultoria')) return 'Consultoria';
    if (name.includes('package') || name.includes('bootcamp')) return 'Pacotes';
    return 'Cursos Online';
  };

  const extractPrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
  };

  const filteredProducts = mockProducts
    .filter(product => {
      const matchesTopic = selectedTopic === 'Todos' || getProductTopic(product) === selectedTopic;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTopic && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'bestseller') {
        return a.id.localeCompare(b.id);
      } else if (sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      } else if (sortBy === 'price-low') {
        return extractPrice(a.price) - extractPrice(b.price);
      } else if (sortBy === 'price-high') {
        return extractPrice(b.price) - extractPrice(a.price);
      }
      return 0;
    });

  const sidebar = (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Tópicos de Produtos</h2>
      
      <div className="space-y-2">
        <button
          onClick={() => setSelectedTopic('Todos')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedTopic === 'Todos'
              ? 'bg-[#EE4F27] text-white'
              : 'text-gray-300 hover:bg-slate-800'
          }`}
        >
          Todos os Produtos
        </button>

        {mockProductTopics.map((topic) => (
          <Collapsible key={topic.name}>
            <CollapsibleTrigger
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                selectedTopic === topic.name
                  ? 'bg-[#EE4F27] text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
              onClick={() => setSelectedTopic(topic.name)}
            >
              <span>{topic.name}</span>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 ml-4 space-y-1">
              {topic.subtopics.map((sub) => (
                <button
                  key={sub}
                  className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {sub}
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <header className="sticky top-0 backdrop-blur-sm bg-gray-900/80 border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="font-bold text-xl text-white">Tyaakov.dev</span>
              </a>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Main</a>
              <a href="/learn" className="text-gray-300 hover:text-white transition-colors">Learn</a>
              <a href="/shop" className="text-white font-semibold">Skills Shop</a>
            </nav>
          </div>
        </div>
      </header>

      <AppLayout sidebar={sidebar}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Skills Shop
            </h1>
            <p className="text-xl text-gray-300">
              As ferramentas e o conhecimento que você precisa para escalar. Sem ruído, apenas resultados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] bg-slate-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-gray-700">
                <SelectItem value="bestseller" className="text-white">Mais Vendidos</SelectItem>
                <SelectItem value="newest" className="text-white">Novidades</SelectItem>
                <SelectItem value="price-low" className="text-white">Menor Preço</SelectItem>
                <SelectItem value="price-high" className="text-white">Maior Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </AppLayout>

      <ProductSaleModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
      />
    </div>
  );
}
