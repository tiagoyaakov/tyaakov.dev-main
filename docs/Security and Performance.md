### **Security and Performance**

#### **Security Requirements (Requisitos de Segurança)**

Nossa filosofia é "segurança por design". Felizmente, nossa stack (Clerk, Supabase, Vercel, Stripe) já nos fornece uma base extremamente segura. Nosso trabalho é configurar corretamente e seguir as melhores práticas em nosso próprio código.

* **Autenticação e Autorização:**  
  * **Fonte da Verdade:** O **Clerk.com** será a única fonte da verdade para a identidade e as permissões do usuário.  
  * **Proteção de API:** **Todas** as rotas de API que lidam com dados sensíveis ou ações restritas (ex: `/api/library`, `/api/admin/*`) **DEVEM** validar a sessão do usuário no backend usando o helper `auth()` do Clerk. Rotas de admin DEVEM verificar a permissão `role: "ADMIN"`.  
* **Segurança do Banco de Dados (Supabase):**  
  * **Row Level Security (RLS):** Ativaremos e configuraremos o RLS no Supabase. Isso cria uma camada de segurança no próprio banco de dados, garantindo que, por exemplo, um usuário só possa consultar ou modificar os dados que lhe pertencem (ex: suas próprias `Compras`). É a nossa principal linha de defesa para os dados.  
* **Segurança da Aplicação (Nosso Código):**  
  * **Validação de Input:** **TODA** entrada de dados vinda do cliente (corpo de requisições de API, argumentos de formulário) **DEVE** ser validada no backend antes de ser processada. Usaremos uma biblioteca como `Zod` para garantir que os dados estejam no formato esperado, prevenindo injeções e dados maliciosos.  
  * **Gerenciamento de Segredos:** Todas as chaves de API e segredos (Clerk, Supabase, Stripe) serão gerenciados exclusivamente como **Variáveis de Ambiente** no painel da Vercel. **Nenhum segredo será salvo no repositório Git**.  
* **Segurança do Frontend:**  
  * **Prevenção de XSS:** O Next.js/React já nos protege contra a maioria dos ataques de Cross-Site Scripting (XSS) por padrão. Manteremos essa prática, evitando o uso de APIs perigosas como `dangerouslySetInnerHTML`.  
  * **Content Security Policy (CSP):** Configuraremos um cabeçalho CSP para instruir o navegador a carregar recursos (scripts, fontes) apenas de fontes confiáveis que nós definirmos, mitigando o risco de ataques de injeção de scripts.

#### **Performance Optimization (Otimização de Performance)**

Nosso objetivo é uma experiência que se sinta instantânea, aproveitando ao máximo a nossa stack.

* **Performance de Frontend:**  
  * **Estratégia de Renderização:** Usaremos o poder do Next.js App Router para otimizar o carregamento. Páginas com conteúdo que muda pouco (como o Módulo Learn e o Skills Shop) podem ser geradas estaticamente (SSG) ou revalidadas incrementalmente (ISR) para serem servidas globalmente via CDN.  
  * **Otimização de Imagens:** Usaremos o componente `<Image>` nativo do Next.js para garantir que as imagens sejam sempre servidas no formato e tamanho corretos, otimizadas para cada dispositivo.  
  * **Code Splitting:** O Next.js já faz o "code splitting" por rota automaticamente, o que significa que o usuário baixa apenas o código necessário para a página que está visitando, resultando em um carregamento inicial muito mais rápido.  
* **Performance de Backend:**  
  * **Tempo de Resposta da API:** Nossas Serverless Functions na Vercel são extremamente rápidas. Nossa meta será manter um tempo de resposta médio **abaixo de 200ms** para a maioria das requisições de API.  
  * **Otimização de Banco de Dados:** Todas as consultas ao banco de dados que possam se tornar lentas com o tempo (ex: buscar compras de um usuário) serão otimizadas com a criação de **índices** apropriados no nosso schema do Prisma.  
* **Estratégia de Cache:**  
  * Aproveitaremos o cache da **Vercel Edge Network** para servir assets estáticos e respostas de API públicas que não mudam com frequência, reduzindo drasticamente a carga em nosso backend e entregando conteúdo de forma quase instantânea para o usuário.

