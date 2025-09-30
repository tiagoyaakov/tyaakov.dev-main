# **\[Nome do Projeto\] Product Requirements Document (PRD)**

**Versão:** 1.0 **Data:** 29 de setembro de 2025

### **Goals and Background Context**

#### **Goals (Metas)**

O objetivo principal deste projeto é validar um novo ecossistema de capacitação em IA para negócios. As metas primárias para o MVP são:

* **Validação de Modelo de Negócio:** Alcançar 100 vendas no Skills Shop nos primeiros 3 meses.  
* **Construção de Autoridade:** Atingir 3.000 usuários ativos no Módulo Learn nos primeiros 6 meses.  
* **Crescimento de Base:** Capturar 10.000 leads qualificados no primeiro semestre.

#### **Background Context (Contexto de Fundo)**

O mercado atual apresenta um paradoxo: apesar do enorme potencial da IA, a maioria dos empreendedores luta para aplicá-la de forma eficaz devido a cursos teóricos, ferramentas inadequadas e desinformação. A plataforma surge para resolver este problema, oferecendo um ambiente com conhecimento prático e acessível (Módulo Learn) e ferramentas de implementação premium com custo reduzido (Skills Shop). A estratégia central é gerar valor massivo de graça para construir confiança e impulsionar a monetização de forma orgânica.

### **Requirements (Requisitos)**

#### **Funcionais (FR)**

* **FR1:** O sistema deve permitir que visitantes se cadastrem na plataforma usando e-mail/senha e/ou login social, através da integração com o Clerk.  
* **FR2:** Usuários autenticados devem ter acesso a uma página de perfil básica, com opção de logout.  
* **FR3:** O sistema deve exibir uma landing page principal contendo todas as seções definidas: Hero, Estatísticas, Prova Social, Dores, Demonstração Visual, Proposta, CTA, Formulário sem Atrito e Chat A.I.  
* **FR4:** O Módulo Learn deve exibir conteúdos (vídeos, textos) de forma organizada por um sistema de categorias.  
* **FR5:** Usuários logados devem poder consumir os conteúdos gratuitos do Módulo Learn.  
* **FR6:** Usuários logados devem poder interagir com os conteúdos através de um sistema de comentários e "likes".  
* **FR7:** O sistema deve prover uma funcionalidade de busca para encontrar conteúdos no Módulo Learn.  
* **FR8:** O Skills Shop deve exibir os infoprodutos em uma vitrine de múltiplos itens, com design inspirado na Steam.  
* **FR9:** Ao interagir com um produto na vitrine, um modal de "página de venda" deve ser exibido com informações detalhadas e CTA para compra.  
* **FR10:** O sistema deve processar pagamentos de forma segura para os produtos do Skills Shop através da integração Clerk/Stripe.  
* **FR11:** Após a compra, o usuário deve ter acesso permanente ao produto adquirido em uma área pessoal chamada "Minha Biblioteca".

#### **Não-Funcionais (NFR)**

* **NFR1:** A plataforma deve ser totalmente responsiva, com uma experiência de usuário otimizada para dispositivos móveis (mobile-first).  
* **NFR2:** A aplicação deve ter alta performance, com tempos de carregamento rápidos (boas métricas de Core Web Vitals), visando uma boa experiência e otimização para SEO.  
* **NFR3:** O sistema deve ser seguro, garantindo a proteção dos dados dos usuários e a integridade das transações financeiras, alavancando os recursos de segurança do Clerk, Supabase e Stripe.  
* **NFR4:** A arquitetura deve ser escalável para suportar o crescimento inicial de usuários e tráfego, conforme as metas definidas (3.000 usuários ativos).  
* **NFR5:** O sistema deve estar em conformidade com a LGPD, solicitando o consentimento de dados de forma clara no primeiro acesso.  
* **NFR6:** A infraestrutura na Vercel deve ser otimizada para custos, mantendo-se alinhada à restrição de orçamento do projeto.

### **User Interface Design Goals**

#### **Overall UX Vision (Visão Geral de UX)**

A experiência do usuário deve ser limpa, rápida e intuitiva, mas com uma personalidade única e marcante. A interface deve transmitir profissionalismo e autoridade, ao mesmo tempo que incorpora elementos de uma estética "hacker minimalista", com animações fluidas e interações que surpreendem e engajam o usuário.

#### **Key Interaction Paradigms (Paradigmas de Interação Chave)**

* **Exploração via Modais:** O conteúdo detalhado (produtos no Skills Shop, "Quem Sou") será apresentado em modais ricos e imersivos.  
* **Descoberta por Cards:** A navegação no Módulo Learn será baseada em uma grade de cards visualmente atraente.  
* **Interface Conversacional:** A interação com o Chat A.I. será um ponto central da experiência na parte inferior da página.

#### **Core Screens and Views (Telas e Visões Centrais)**

* A Landing Page principal como hub central.  
* Módulo Learn (visão de categorias e visão de conteúdo individual).  
* Skills Shop (a vitrine principal).  
* Modal de Venda de Produto.  
* Área de Perfil do Usuário (incluindo "Minha Biblioteca").

#### **Accessibility (Acessibilidade)**

* **Padrão:** WCAG AA.

#### **Branding (Identidade Visual)**

* O design seguirá a identidade visual definida pelo logo e nome, com uma paleta de cores e tipografia que reforcem a estética "hacker minimalista" e "premium".

#### **Target Device and Platforms (Dispositivos e Plataformas Alvo)**

* **Plataforma:** Web Responsiva (mobile-first).

### **Technical Assumptions**

* **Repository Structure:** Monorepo.  
* **Service Architecture:** Serverless (via Vercel Functions).  
* **Testing Requirements:** Full Testing Pyramid.  
* **Stack Principal:**  
  * **Frontend:** React com Next.js (App Router), TailwindCSS, shadcn/ui, Framer Motion, Recharts.  
  * **Backend:** Node.js (via Next.js API Routes).  
  * **Autenticação:** Clerk.com.  
  * **Banco de Dados:** Supabase (PostgreSQL) com Prisma (ORM).  
  * **Storage:** Supabase Storage.  
  * **Pagamentos:** Clerk.com com integração de checkout via Stripe.  
  * **CMS:** Solução leve baseada em MDX ou headless (Sanity/Contentlayer).  
  * **Infraestrutura:** Vercel.

### **Epic List (Lista de Épicos)**

* **Épico 1:** Fundação & Acesso Inicial (O Esqueleto)  
* **Épico 2:** O Ecossistema de Aprendizado e Sua Gestão (Módulo Learn \+ Admin)  
* **Épico 3:** A Loja de Habilidades (Skills Shop)  
* **Épico 4:** Polimento & Inteligência

### **Epic Details (Detalhes dos Épicos)**

---

#### **Épico 1: Fundação & Acesso Inicial (O Esqueleto)**

**Meta:** Configurar a estrutura base do projeto, construir o "casco" da landing page, implementar o sistema de cadastro/login e a conformidade com a LGPD.

* **Estória 1.1: Configuração Inicial do Projeto**  
  * **Como** um desenvolvedor, **Eu quero** configurar um novo projeto Next.js com TypeScript e TailwindCSS, conectado a um repositório Git e deployado na Vercel, **Para que** tenhamos uma fundação de código limpa, versionada e com deploy automatizado.  
* **Estória 1.2: Integração com Supabase e Prisma**  
  * **Como** um desenvolvedor, **Eu quero** conectar a aplicação Next.js ao banco de dados Supabase usando o Prisma ORM, **Para que** a aplicação possa ler e escrever dados no banco de dados.  
* **Estória 1.3: Implementação de Cadastro, Login e Perfil com Clerk**  
  * **Como** um visitante, **Eu quero** poder me cadastrar e fazer login, **Para que** eu possa acessar o conteúdo exclusivo da plataforma.  
* **Estória 1.4: Criação do "Casco" da Landing Page (Header e Footer)**  
  * **Como** um visitante, **Eu quero** ver a estrutura de navegação principal do site (cabeçalho e rodapé), **Para que** eu possa entender a organização do site.  
* **Estória 1.5: Implementação do Banner de Consentimento (LGPD)**  
  * **Como** um visitante, **Eu quero** ser informado sobre o uso de dados e poder aceitar as políticas, **Para que** eu tenha controle sobre meus dados.

---

#### **Épico 2: O Ecossistema de Aprendizado e Sua Gestão**

**Meta:** Construir o Módulo Learn completo, incluindo uma área administrativa no frontend para gestão autônoma de conteúdos e categorias.

* **Estória 2.1: Estrutura de Dados para o Conteúdo**  
  * **Como** um desenvolvedor, **Eu quero** modelar as tabelas para `Conteudo`, `Categorias`, `Comentarios` e `Likes`, **Para que** tenhamos a estrutura para armazenar as informações do Módulo Learn.  
* **Estória 2.2: Definição de Permissões de Administrador (NOVA)**  
  * **Como** um administrador, **Eu quero** ter um nível de acesso especial ("ADMIN"), **Para que** somente eu possa acessar as áreas de gerenciamento de conteúdo.  
* **Estória 2.3: Painel de Gerenciamento de Conteúdo (NOVA)**  
  * **Como** um administrador, **Eu quero** acessar uma página protegida (`/admin/learn`) que liste todos os conteúdos, **Para que** eu possa gerenciá-los (editar, deletar, criar).  
* **Estória 2.4: Formulário de Criação e Edição de Conteúdo (NOVA)**  
  * **Como** um administrador, **Eu quero** um formulário para adicionar ou editar um conteúdo, **Para que** eu possa popular o Módulo Learn diretamente pelo site.  
* **Estória 2.5: Página Principal do Módulo Learn (Vitrine de Conteúdo)**  
  * **Como** um usuário, **Eu quero** acessar a página `/learn` que exiba todos os conteúdos em cards, **Para que** eu possa navegar e descobrir os tutoriais.  
* **Estória 2.6: Página de Visualização de Conteúdo**  
  * **Como** um usuário, **Eu quero** clicar em um card e ir para uma página dedicada, **Para que** eu possa consumir o material.  
* **Estória 2.7: Sistema de Comentários**  
  * **Como** um usuário logado, **Eu quero** poder deixar comentários em um conteúdo, **Para que** eu possa tirar dúvidas e participar da discussão.  
* **Estória 2.8: Sistema de "Likes"**  
  * **Como** um usuário logado, **Eu quero** poder "curtir" um conteúdo, **Para que** eu possa expressar meu apreço.  
* **Estória 2.9: Funcionalidade de Busca**  
  * **Como** um usuário, **Eu quero** um campo de busca no Módulo Learn, **Para que** eu possa encontrar rapidamente conteúdos sobre um tópico específico.

---

#### **Épico 3: A Loja de Habilidades (Skills Shop)**

**Meta:** Implementar a vitrine de produtos, os modais de venda, o checkout e a área "Minha Biblioteca".

* **Estória 3.1: Estrutura de Dados para Produtos e Compras**  
  * **Como** um desenvolvedor, **Eu quero** modelar as tabelas `Produtos` e `Compras`, **Para que** possamos gerenciar o inventário e as aquisições dos usuários.  
* **Estória 3.2: Painel de Gerenciamento de Produtos (Admin)**  
  * **Como** um administrador, **Eu quero** uma área em `/admin/shop` para poder gerenciar os produtos, **Para que** eu possa controlar meu inventário.  
* **Estória 3.3: Página Principal do Skills Shop (Vitrine)**  
  * **Como** um usuário, **Eu quero** acessar a página `/shop` e ver todos os produtos à venda, **Para que** eu possa descobrir os infoprodutos.  
* **Estória 3.4: Modal de Página de Venda**  
  * **Como** um usuário, **Eu quero** clicar em um produto e ver seus detalhes em um modal, **Para que** eu possa avaliar a oferta antes de comprar.  
* **Estória 3.5: Integração do Checkout de Pagamento**  
  * **Como** um usuário, **Eu quero** passar por um processo de pagamento simples e seguro, **Para que** eu possa adquirir o produto.  
* **Estória 3.6: Área "Minha Biblioteca"**  
  * **Como** um usuário logado, **Eu quero** acessar uma página `/biblioteca` que lista meus produtos comprados, **Para que** eu possa acessá-los a qualquer momento.

---

#### **Épico 4: Polimento & Inteligência**

**Meta:** Desenvolver as seções de alto impacto da landing page (Hero, Gráficos) e implementar o Chat A.I.

* **Estória 4.1: Implementação da Hero Section e Animação de Terminal**  
  * **Como** um visitante, **Eu quero** ser recebido por uma Hero Section impactante com animação de terminal, **Para que** eu seja imerso na identidade da plataforma.  
* **Estória 4.2: Implementação da Sessão de Estatísticas com Gráficos Premium**  
  * **Como** um visitante, **Eu quero** ver uma seção de estatísticas com gráficos únicos e animados, **Para que** a autoridade da plataforma seja comunicada de forma poderosa.  
* **Estória 4.3: Construção das Seções de Narrativa da Landing Page**  
  * **Como** um visitante, **Eu quero** poder ler as seções de Prova Social, Dor/Benefícios, Demos e Proposta, **Para que** eu possa seguir a jornada de convencimento.  
* **Estória 4.4: Implementação do Formulário "Sem Atrito" e Chat A.I.**  
  * **Como** um visitante, **Eu quero** poder entrar em contato via formulário e conversar com um Chat A.I., **Para que** eu possa tirar dúvidas e ter uma experiência memorável.

