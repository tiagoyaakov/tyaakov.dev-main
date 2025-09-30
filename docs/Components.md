### **Components**

Dividiremos nossos componentes em quatro categorias principais:

#### **1\. Frontend Components (Camada de Apresentação)**

*Estes são os componentes React que o usuário vê e com os quais interage no navegador.*

* **`LandingPageShell`:** O componente principal que compõe todas as seções da página inicial (Hero, Stats, etc.) e gerencia o layout geral.  
* **`LearnModule`:** O conjunto de componentes responsáveis por exibir a vitrine de conteúdos, a página de um conteúdo específico, os comentários e os likes.  
* **`SkillsShopModule`:** O conjunto de componentes que gerencia a vitrine de produtos, o modal de página de venda e o início do fluxo de checkout.  
* **`UserDashboard`:** A área logada que contém a "Minha Biblioteca" e a página de perfil.  
* **`AdminPanel`:** A área protegida e separada, acessível apenas por administradores, para gerenciar os conteúdos e produtos.  
* **`GlobalUI`:** Componentes globais como o `Header`, `Footer` e o `Banner LGPD`.

#### **2\. Backend Components (Camada de API/Serviços)**

*Estes são os nossos endpoints de API, que rodam como Serverless Functions na Vercel.*

* **`ContentAPI`:** Responsável por fornecer os dados públicos do Módulo Learn (lista de conteúdos, conteúdo individual).  
* **`ProductAPI`:** Responsável por fornecer os dados públicos dos produtos do Skills Shop.  
* **`InteractionAPI`:** Lida com as ações de usuários logados, como postar comentários e dar "likes".  
* **`CheckoutAPI`:** Orquestra o início do processo de pagamento seguro com o Clerk/Stripe.  
* **`UserAPI`:** Fornece dados privados do usuário, como a lista de produtos comprados para a "Minha Biblioteca".  
* **`AdminAPI`:** Expõe os endpoints seguros para criar, editar e deletar conteúdos e produtos, garantindo que apenas usuários com permissão "ADMIN" possam acessá-los.  
* **`ChatAPI`:** Atua como um proxy seguro entre o nosso frontend e o serviço do n8n que contém a lógica do chatbot.

#### **3\. Shared Components (Camada de Lógica Compartilhada)**

*Estes são os pacotes e lógicas que serão compartilhados entre diferentes partes da aplicação no nosso monorepo.*

* **`PrismaClient`:** A instância centralizada do nosso cliente Prisma, usada por todos os componentes de Backend para acessar o banco de dados.  
* **`DesignSystem`:** A coleção de componentes de UI reutilizáveis (Botões, Cards, Modais) baseados no `shadcn/ui` e na identidade visual que definimos.  
* **`SharedTypes`:** Um pacote contendo as interfaces TypeScript geradas pelo Prisma e outras definições de tipos, garantindo consistência entre o frontend e o backend.

#### **Diagrama de Interação de Componentes**

Snippet de código  
graph TD  
    subgraph "Browser"  
        User(Usuário)  
        FE\[Frontend Components\]  
    end  
      
    subgraph "Vercel"  
        API\[Backend Components \- API Routes\]  
    end

    subgraph "Nuvem / Serviços"  
        Shared\[Shared Components\]  
        Clerk\[Serviço Clerk\]  
        Supabase\[Serviço Supabase\]  
        N8N\[Serviço n8n\]  
    end

    User \-- Interage com \--\> FE  
    FE \-- Chama \--\> API  
    API \-- Usa \--\> Shared  
    API \-- Acessa \--\> Supabase  
    API \-- Valida com \--\> Clerk  
    API \-- Conversa com \--\> N8N  
