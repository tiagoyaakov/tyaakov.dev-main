### **High Level Architecture**

#### **Technical Summary**

A plataforma será uma aplicação web full-stack moderna, construída sobre os princípios da arquitetura **Jamstack** e **Serverless**. A estrutura do projeto será um **Monorepo** para otimizar o compartilhamento de código. O frontend será desenvolvido com **Next.js** e hospedado na **Vercel Edge Network**, garantindo performance global. O backend será composto por Serverless Functions (via Next.js API Routes), que se comunicarão com o **Supabase** para persistência de dados (PostgreSQL e Storage) e com o **Clerk.com** para uma gestão de autenticação robusta e segura. Esta arquitetura privilegia a velocidade de desenvolvimento, a escalabilidade automática e a segurança, delegando funcionalidades complexas a serviços gerenciados de ponta.

#### **Platform and Infrastructure Choice**

* **Plataforma:** Vercel \+ Supabase  
* **Key Services:** Vercel Edge (CDN & Functions), Supabase (PostgreSQL, Storage, Auth), Clerk (User Management & Checkout), Stripe (Payment Processing).  
* **Deployment Host and Regions:** A Vercel operará globalmente em sua Edge Network. O banco de dados do Supabase será hospedado na região mais próxima da maioria dos usuários (ex: `sa-east-1` no Brasil).

#### **Repository Structure**

* **Estrutura:** Monorepo.  
* **Racional:** Essencial para compartilhar tipos de dados (Prisma), componentes de UI e utilitários entre o frontend (`apps/web`) e o backend (`apps/api` ou rotas de API dentro do mesmo app Next.js), garantindo consistência e evitando duplicação de código.

#### **High Level Architecture Diagram**

Este diagrama ilustra a interação entre os principais componentes do sistema:

Snippet de código  
graph TD  
    subgraph "Usuário"  
        U\[Visitante / Usuário\]  
    end

    subgraph "Plataforma Vercel"  
        U \-- HTTPS \--\> Vercel\_Edge\[Vercel Edge Network / CDN\]  
        Vercel\_Edge \--\> FE\[Next.js Frontend \- React Server Components\]  
        FE \--\> API\[Next.js API Routes \- Serverless Functions\]  
    end

    subgraph "Serviços de Terceiros"  
        Clerk\[Clerk.com \- User Management\]  
        Stripe\[Stripe \- Payments\]  
        Supabase\[Supabase\]  
        N8N\[n8n.io \- Automações/AI Chat\]  
    end  
      
    subgraph "Banco de Dados Supabase"  
        DB\[(PostgreSQL)\]  
        Storage\[(Supabase Storage)\]  
    end

    FE \-- "Login / Cadastro" \--\> Clerk  
    API \-- "Validação de Sessão" \--\> Clerk  
    API \-- "Consultas / Mutações via Prisma" \--\> DB  
    API \-- "Upload / Download de Mídia" \--\> Storage  
      
    FE \-- "Inicia Checkout" \--\> Clerk  
    Clerk \-- "Processa Pagamento" \--\> Stripe

    API\_Chat\[API Route: /api/chat\] \--\> N8N  
    FE \-- "Conversa no Chat" \--\> API\_Chat

    Supabase \--- DB  
    Supabase \--- Storage

    style U fill:\#f9f,stroke:\#333,stroke-width:2px  
    style Vercel\_Edge fill:\#D6EAF8  
    style FE fill:\#D6EAF8  
    style API fill:\#D6EAF8

#### **Architectural Patterns**

* **Jamstack:** O frontend será pré-renderizado sempre que possível e servido via CDN global (Vercel Edge), com funcionalidades dinâmicas sendo fornecidas por APIs. Isso garante máxima performance, segurança e escalabilidade.  
* **Serverless:** Toda a nossa lógica de backend será executada em funções serverless, que escalam sob demanda e eliminam a necessidade de gerenciamento de servidores.  
* **Monorepo:** Manteremos todo o nosso código (frontend, backend, pacotes compartilhados) em um único repositório para simplificar o desenvolvimento e o versionamento.  
* **Backend for Frontend (BFF):** Nossas API Routes do Next.js atuarão como um BFF, criando endpoints sob medida para as necessidades exatas do nosso frontend, em vez de uma API genérica.  
* **Delegação a Serviços Gerenciados:** Em vez de construir do zero, delegaremos funcionalidades críticas como autenticação (Clerk), banco de dados (Supabase) e pagamentos (Stripe) a serviços especializados, acelerando o desenvolvimento e aumentando a robustez da aplicação.

### **Tech Stack**

#### **Technology Stack Table**

| Categoria | Tecnologia | Versão Sugerida | Propósito | Racional |
| :---- | :---- | :---- | :---- | :---- |
| **Linguagem Principal** | TypeScript | \~5.6.x | Linguagem para Frontend e Backend | Garante segurança de tipos, melhora a produtividade e a manutenibilidade do código. |
| **Runtime** | Node.js | \~22.x.x LTS | Ambiente de execução do backend | Versão LTS (Long-Term Support) garante estabilidade, performance e segurança. |
| **Framework Full-Stack** | Next.js | \~15.2.x | Framework principal da aplicação | Permite renderização no servidor (SSR/RSC) para performance/SEO e API Routes para o backend. |
| **Framework CSS** | TailwindCSS | \~4.0.x | Estilização da UI | Abordagem "utility-first" que acelera o desenvolvimento de interfaces customizadas e responsivas. |
| **UI Component Library** | shadcn/ui | latest | Base para componentes de UI | Fornece componentes acessíveis e estilizáveis, fáceis de integrar ao projeto (não é uma lib, mas um CLI). |
| **Animação** | Framer Motion | \~11.5.x | Biblioteca de animações para React | Cria animações complexas e fluidas com uma API declarativa e simples. |
| **Gráficos** | Recharts | \~2.12.x | Biblioteca de gráficos para React | Facilita a criação dos gráficos customizados e animados para a seção de estatísticas. |
| **Autenticação** | Clerk.com | Cloud Platform | Gestão de usuários e autenticação | Delega toda a complexidade de login, cadastro e segurança de sessão a um serviço especialista. |
| **Banco de Dados** | PostgreSQL (via Supabase) | v16 (Hosted) | Persistência de dados principal | Banco de dados relacional robusto, escalável e confiável, gerenciado pelo Supabase. |
| **ORM** | Prisma | \~5.16.x | Camada de acesso ao banco de dados | Facilita a interação com o banco de dados de forma segura, tipada e com autocompletar. |
| **Storage** | Supabase Storage | Cloud Platform | Armazenamento de arquivos e mídias | Solução S3-compatible integrada ao Supabase, simplificando a gestão de permissões. |
| **Pagamentos** | Stripe (via Clerk) | Cloud Platform | Processamento de transações | Líder de mercado em pagamentos, com checkout simplificado através da integração com o Clerk. |
| **CMS** | MDX (Content Collections) | N/A | Gerenciamento de conteúdo do Módulo Learn | Permite escrever conteúdo como componentes React, ideal para uma abordagem Git-based e performática. |
| **Infraestrutura** | Vercel | Cloud Platform | Hospedagem, CDN e Serverless Functions | Plataforma otimizada para Next.js, com deploy contínuo, performance global e escalabilidade. |
| **Automações (Chat)** | n8n.io | Cloud Platform | Orquestração de workflows para o Chat A.I. | Ferramenta visual para criar a lógica do chatbot sem a necessidade de um backend complexo. |

