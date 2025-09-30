**Diagramas de Autenticação de Usuário e Jornada de Compra**

**Diagrama de Sequência (Autenticação):**

Snippet de código  
sequenceDiagram  
    participant User  
    participant Frontend (Next.js)  
    participant Clerk Components  
    participant API Backend (Vercel)

    User-\>\>Frontend: Acessa a página /sign-in  
    Frontend-\>\>Clerk Components: Renderiza o componente \<SignIn /\>  
    User-\>\>Clerk Components: Insere credenciais  
    Clerk Components--\>\>Frontend: Gerencia a sessão no cliente e redireciona para a home  
      
    Note over Frontend, API Backend: O usuário agora está autenticado no frontend.  
      
    User-\>\>Frontend: Tenta acessar /biblioteca  
    Frontend-\>\>API Backend: Chama GET /api/library (com o token de sessão)  
    activate API Backend  
    API Backend-\>\>API Backend: Usa o helper \`auth()\` do Clerk para validar a sessão  
    Note right of API Backend: O SDK do Clerk valida o token\<br/\>sem uma chamada de rede externa.  
    API Backend--\>\>API Backend: Sessão validada, obtém o userId  
    API Backend-\>\>Supabase DB: Busca os produtos para o userId  
    Supabase DB--\>\>API Backend: Retorna dados  
    API Backend--\>\>Frontend: Retorna os dados da biblioteca  
    deactivate API Backend

**Diagrama de Sequência (Jornada de Compra):**

Snippet de código  
sequenceDiagram  
    participant User  
    participant Frontend (Next.js)  
    participant API Backend (Vercel)  
    participant Stripe  
    participant Supabase DB

    User-\>\>Frontend: Clica em "Comprar Agora"  
    Frontend-\>\>API Backend: Chama POST /api/checkout com productId  
    activate API Backend  
    API Backend-\>\>API Backend: Obtém userId via \`auth()\` do Clerk  
    API Backend-\>\>API Backend: Verifica/cria stripeCustomerId nos metadados do Clerk  
    API Backend-\>\>Stripe: Chama \`stripe.checkout.sessions.create()\` com os dados do produto e do cliente  
    Stripe--\>\>API Backend: Retorna a URL da sessão de checkout  
    API Backend--\>\>Frontend: Retorna a URL de checkout  
    deactivate API Backend  
      
    Frontend-\>\>User: Redireciona para a URL de checkout da Stripe  
    User-\>\>Stripe: Preenche os dados e finaliza o pagamento  
      
    Note over Stripe, Supabase DB: Processamento Assíncrono via Webhook  
      
    Stripe-\>\>API Backend: Envia Webhook "checkout.session.completed" para um endpoint dedicado (ex: /api/webhooks/stripe)  
    activate API Backend  
    API Backend-\>\>API Backend: Valida a assinatura do Webhook  
    API Backend-\>\>API Backend: Extrai dados da sessão (userId, etc.)  
    API Backend-\>\>Supabase DB: INSERT INTO "Purchases" (userId, productId)  
    Supabase DB--\>\>API Backend: Confirma a inserção do registro  
    API Backend--\>\>Stripe: Responde ao Webhook com status 200 (OK)  
    deactivate API Backend  
