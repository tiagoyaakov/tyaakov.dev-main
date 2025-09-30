"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { ContentCard } from '@/components/learn/ContentCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface Content {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  slug: string;
}

const mockContents: Content[] = [
  {
    id: '1',
    title: 'Introdução à Engenharia de Prompt',
    description: 'Aprenda as técnicas fundamentais para criar prompts eficazes e obter os melhores resultados de modelos de IA.',
    imageUrl: '',
    category: 'Engenharia de Prompt',
    slug: 'introducao-engenharia-prompt'
  },
  {
    id: '2',
    title: 'Automação de Processos com IA',
    description: 'Descubra como automatizar tarefas repetitivas usando ferramentas de inteligência artificial e aumentar sua produtividade.',
    imageUrl: '',
    category: 'Automação com IA',
    slug: 'automacao-processos-ia'
  },
  {
    id: '3',
    title: 'LLaMA 2: Guia Completo',
    description: 'Tutorial completo sobre como usar e configurar o modelo LLaMA 2 da Meta em seus projetos.',
    imageUrl: '',
    category: 'Modelos Open Source',
    slug: 'llama-2-guia-completo'
  },
  {
    id: '4',
    title: 'Segurança em Aplicações com IA',
    description: 'Melhores práticas para proteger suas aplicações de IA contra vulnerabilidades e ataques comuns.',
    imageUrl: '',
    category: 'Segurança em IA',
    slug: 'seguranca-aplicacoes-ia'
  },
  {
    id: '5',
    title: 'Prompts Avançados para ChatGPT',
    description: 'Técnicas avançadas de prompt engineering para extrair o máximo potencial do ChatGPT em diferentes contextos.',
    imageUrl: '',
    category: 'Engenharia de Prompt',
    slug: 'prompts-avancados-chatgpt'
  },
  {
    id: '6',
    title: 'Criando Workflows de IA com n8n',
    description: 'Aprenda a criar automações poderosas conectando diferentes ferramentas de IA usando o n8n.',
    imageUrl: '',
    category: 'Automação com IA',
    slug: 'workflows-ia-n8n'
  },
  {
    id: '7',
    title: 'Stable Diffusion: Do Zero ao Avançado',
    description: 'Curso completo sobre geração de imagens com Stable Diffusion, desde a instalação até técnicas avançadas.',
    imageUrl: '',
    category: 'Modelos Open Source',
    slug: 'stable-diffusion-zero-avancado'
  },
  {
    id: '8',
    title: 'Proteção de Dados em Modelos de IA',
    description: 'Como garantir a privacidade e proteção de dados sensíveis ao trabalhar com modelos de linguagem.',
    imageUrl: '',
    category: 'Segurança em IA',
    slug: 'protecao-dados-modelos-ia'
  },
  {
    id: '9',
    title: 'Fine-tuning de Modelos Open Source',
    description: 'Guia prático para fazer fine-tuning de modelos open source para suas necessidades específicas.',
    imageUrl: '',
    category: 'Modelos Open Source',
    slug: 'fine-tuning-modelos-open-source'
  }
];

const mockCategories = [
  {
    name: 'Engenharia de Prompt',
    subcategories: ['Fundamentos', 'ChatGPT', 'Claude', 'Técnicas Avançadas']
  },
  {
    name: 'Automação com IA',
    subcategories: ['n8n', 'Make', 'Zapier', 'APIs']
  },
  {
    name: 'Modelos Open Source',
    subcategories: ['LLaMA', 'Stable Diffusion', 'Mistral', 'Fine-tuning']
  },
  {
    name: 'Segurança em IA',
    subcategories: ['Proteção de Dados', 'Vulnerabilidades', 'Boas Práticas', 'Compliance']
  }
];

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recent');

  const filteredContents = mockContents
    .filter(content => {
      const matchesCategory = selectedCategory === 'Todos' || content.category === selectedCategory;
      const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           content.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return b.id.localeCompare(a.id);
      } else if (sortBy === 'popular') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const sidebar = (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Categorias</h2>
      
      <div className="space-y-2">
        <button
          onClick={() => setSelectedCategory('Todos')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === 'Todos'
              ? 'bg-[#EE4F27] text-white'
              : 'text-gray-300 hover:bg-slate-800'
          }`}
        >
          Todos
        </button>

        {mockCategories.map((category) => (
          <Collapsible key={category.name}>
            <CollapsibleTrigger
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.name
                  ? 'bg-[#EE4F27] text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <span>{category.name}</span>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 ml-4 space-y-1">
              {category.subcategories.map((sub) => (
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
              <a href="/learn" className="text-white font-semibold">Learn</a>
              <a href="/shop" className="text-gray-300 hover:text-white transition-colors">Skills Shop</a>
            </nav>
          </div>
        </div>
      </header>

      <AppLayout sidebar={sidebar}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Módulo Learn
            </h1>
            <p className="text-lg text-gray-300">
              Bem-vindo ao centro de conhecimento da plataforma. Aqui você encontra tutoriais completos,
              aulas práticas e conteúdos aprofundados sobre IA, automação e desenvolvimento.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar por palavra-chave..."
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
                <SelectItem value="recent" className="text-white">Mais Recentes</SelectItem>
                <SelectItem value="popular" className="text-white">Mais Populares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((content) => (
              <ContentCard
                key={content.id}
                title={content.title}
                description={content.description}
                imageUrl={content.imageUrl}
                category={content.category}
                slug={content.slug}
              />
            ))}
          </div>

          {filteredContents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Nenhum conteúdo encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </AppLayout>
    </div>
  );
}
