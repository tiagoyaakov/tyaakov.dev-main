### **Monitoring and Observability**

Nossa estratégia de monitoramento para o MVP será focada em simplicidade e na utilização das ferramentas já integradas à nossa stack, alinhando-se ao nosso orçamento enxuto.

#### **1\. Monitoring Stack (Ferramentas de Monitoramento)**

* **Frontend (Performance & Analytics):**  
  * **`Vercel Analytics`:** Usaremos a solução nativa da Vercel. Ela nos dará, sem custo adicional, as métricas de Core Web Vitals (performance), o número de visitantes por página e de onde eles vêm, diretamente no nosso painel de deploy.  
* **Backend (Logs & Erros de API):**  
  * **`Vercel Logs`:** Todas as saídas de `console.log()` e `console.error()` em nossas API Routes são automaticamente capturadas e se tornam pesquisáveis na aba "Logs" do nosso projeto na Vercel. Nossa estratégia de tratamento de erros garantirá que todos os erros de backend sejam logados aqui para depuração.  
* **Uptime (Disponibilidade):**  
  * **`UptimeRobot` (ou similar):** Configuraremos um serviço externo gratuito para "pingar" nossa homepage a cada 5 minutos. Se o site sair do ar por qualquer motivo, receberemos um alerta imediato por e-mail.

#### **2\. Key Metrics (Métricas Chave a Observar)**

Nosso foco será monitorar a saúde técnica e a performance da aplicação.

* **Métricas de Frontend (via Vercel Analytics):**  
  * **Core Web Vitals (LCP, CLS, INP):** Para garantir que a experiência de carregamento do usuário seja rápida.  
  * **Pageviews:** Para entender quais páginas e conteúdos são mais populares.  
  * **Erros de Frontend:** Para capturar bugs que acontecem no navegador do usuário.  
* **Métricas de Backend (via Vercel Logs):**  
  * **Taxa de Erros da API (Respostas 4xx e 5xx):** O indicador mais importante da saúde do nosso backend.  
  * **Duração da Execução das Funções:** Para monitorar a performance das nossas API Routes e identificar gargalos.  
* **Métricas de Negócio (via Painéis do Clerk/Stripe/Supabase):**  
  * **Novos Cadastros / Dia:** Monitorado no painel do Clerk.  
  * **Vendas / Dia:** Monitorado no painel do Stripe.

