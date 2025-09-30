### **External APIs**

#### **1\. Clerk.com API**

* **Propósito:** Autenticação (Login/Cadastro), gestão de usuários, controle de sessão e orquestração do fluxo de checkout.  
* **Documentação:** `https://clerk.com/docs`  
* **Integração:** Será integrado no frontend através dos componentes React (`@clerk/nextjs`) para a UI de autenticação, e no backend (API Routes) através do SDK Node.js para validar sessões e permissões de usuário (ex: "ADMIN").

#### **2\. Supabase APIs**

* **Propósito:** Prover o banco de dados PostgreSQL e o serviço de armazenamento de arquivos (Storage).  
* **Documentação:** `https://supabase.com/docs`  
* **Integração:** A interação com o banco de dados será primariamente abstraída pelo **Prisma ORM** em nosso backend. A interação com o Storage (para upload de imagens de produtos, por exemplo) será feita através do SDK do Supabase em endpoints de API específicos.

#### **3\. Stripe API**

* **Propósito:** Processamento final das transações financeiras (cartão de crédito, Pix, etc.).  
* **Documentação:** `https://stripe.com/docs`  
* **Integração:** A complexidade da integração será drasticamente reduzida, pois utilizaremos a funcionalidade de **Checkout do Clerk**, que orquestra a comunicação com o Stripe. Nosso backend será responsável por receber *webhooks* (notificações) para confirmar o sucesso do pagamento e liberar o acesso ao produto.

#### **4\. n8n.io API**

* **Propósito:** Executar o workflow de conversação do nosso Chat A.I.  
* **Documentação:** `https://docs.n8n.io/`  
* **Integração:** Nosso endpoint de backend (`/api/chat`) atuará como um proxy. Ele receberá a mensagem do usuário vinda do frontend e a encaminhará para um **Webhook Trigger** no nosso workflow do n8n. A resposta gerada pelo n8n será então retornada ao frontend.

