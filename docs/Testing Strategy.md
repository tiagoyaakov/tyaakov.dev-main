### **Testing Strategy**

#### **1\. The Testing Pyramid (A Pirâmide de Testes)**

Nossa abordagem será dividida em três camadas:

* **Base: Testes Unitários (Muitos e Rápidos)**  
  * **Foco:** Testar a menor parte possível do código em isolamento (uma função, um componente React).  
  * **Exemplo:** "O componente `Button` exibe o texto correto?"  
* **Meio: Testes de Integração (Menos, um pouco mais lentos)**  
  * **Foco:** Testar como duas ou mais partes do sistema trabalham juntas.  
  * **Exemplo:** "A nossa rota de API `/api/content` consegue se conectar ao banco de dados e retornar os dados no formato correto?"  
* **Topo: Testes End-to-End (E2E) (Poucos e mais lentos)**  
  * **Foco:** Simular a jornada completa de um usuário real no navegador.  
  * **Exemplo:** "Um usuário consegue acessar a página, fazer login, navegar até o Skills Shop e abrir o modal de um produto?"

#### **2\. Test Organization & Tooling (Organização e Ferramentas)**

* **Ferramentas de Teste (Unitário e Integração):**  
  * **`Vitest`:** Um executor de testes moderno e extremamente rápido, que substituirá o tradicional Jest.  
  * **`React Testing Library`:** A biblioteca padrão para testar componentes React de uma forma que simula como o usuário os utiliza.  
* **Ferramenta de Teste (End-to-End):**  
  * **`Playwright`:** Uma ferramenta de automação de navegador moderna e poderosa para nossos testes E2E.  
* **Organização dos Arquivos de Teste:**  
  * **Testes de Frontend:** Cada arquivo de teste ficará ao lado do componente que ele testa (ex: `Button.tsx` e `Button.test.tsx`).  
  * **Testes de Backend (API Routes):** Os testes para nossas rotas de API ficarão em uma pasta `__tests__` dentro da estrutura da API.  
  * **Testes E2E:** Ficarão em uma pasta separada na raiz do projeto, chamada `e2e/`.

#### **3\. Test Examples (Exemplos de Testes)**

* **Exemplo de Teste Unitário (Frontend):**  
  * Testaremos um componente `<Card />` para garantir que ele renderiza corretamente o título e a descrição que passamos para ele.  
* **Exemplo de Teste de Integração (Backend):**  
  * Testaremos o endpoint `POST /api/content/[id]/comments`. O teste fará uma chamada de API real para este endpoint (em um ambiente de teste) e verificará se um novo comentário foi de fato criado no nosso banco de dados de teste.  
* **Exemplo de Teste End-to-End (E2E):**  
  * Criaremos um teste com Playwright que simula a jornada completa de login de um usuário:  
    1. Abre o navegador na nossa página.  
    2. Clica no botão "Login".  
    3. Preenche o e-mail e a senha nos campos do Clerk.  
    4. Clica em "Entrar".  
    5. Verifica se o ícone de perfil do usuário apareceu no cabeçalho.

