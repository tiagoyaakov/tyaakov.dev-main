### **Error Handling Strategy**

#### **1\. Error Response Format (Contrato de Erro da API)**

Toda vez que nosso backend (API Routes) encontrar um erro, ele **NÃO** enviará o erro técnico completo para o frontend. Em vez disso, ele responderá com um objeto JSON padronizado e seguro:

TypeScript  
// Interface para o formato de erro da nossa API  
interface ApiError {  
  error: {  
    code: string;       // Um código de erro único (ex: 'unauthorized', 'validation\_failed')  
    message: string;    // Uma mensagem amigável para o usuário  
    timestamp: string;  // Quando o erro ocorreu  
    requestId?: string; // ID da requisição para rastreamento (gerado pela Vercel)  
  };  
}

#### **2\. Backend Error Handling**

* **Middleware Centralizado:** Criaremos um middleware de erro para nossas rotas de API. Qualquer erro lançado em nossos endpoints será capturado por este middleware.  
* **Função do Middleware:**  
  1. **Log do Erro Completo:** O erro original, com toda a sua informação técnica (`stack trace`), será logado em nosso sistema de monitoramento (que definiremos na próxima seção). **Isso é apenas para os desenvolvedores**.  
  2. **Formatação da Resposta:** O middleware irá então criar um objeto `ApiError` (conforme o contrato acima) com uma mensagem segura e o enviará para o frontend com o código de status HTTP apropriado (ex: 400, 401, 500).

#### **3\. Frontend Error Handling**

* **Camada de Cliente de API:** Nossa camada de cliente de API (definida nos Coding Standards) será responsável por interceptar as respostas de erro da API.  
* **Notificações "Toast":** Para a maioria dos erros (ex: "Falha ao salvar comentário", "Produto não encontrado"), usaremos uma biblioteca como `react-hot-toast` para exibir uma notificação "toast" não-intrusiva no canto da tela, com a `message` vinda da `ApiError`.  
* **Modais para Erros Críticos:** Para erros que impedem uma ação crítica (ex: falha no início do checkout), exibiremos um modal mais proeminente com a mensagem de erro e possíveis ações.  
* **Error Boundaries:** Implementaremos "Error Boundaries" em React em torno das seções principais da nossa aplicação para evitar que um erro em um componente pequeno (ex: um gráfico que falha ao carregar) quebre a página inteira.

#### **4\. Error Flow Diagram (Diagrama do Fluxo de Erro)**

Snippet de código  
sequenceDiagram  
    participant User  
    participant Frontend (Next.js)  
    participant API Backend (Vercel)  
    participant Monitoring Service

    User-\>\>Frontend: Executa uma ação (ex: salvar comentário)  
    Frontend-\>\>API Backend: Chama POST /api/content/\[id\]/comments  
    activate API Backend  
    API Backend-\>\>API Backend: Ocorre um erro (ex: falha de validação)  
    API Backend-\>\>Monitoring Service: Loga o erro técnico completo (stack trace)  
    API Backend--\>\>Frontend: Retorna resposta com status 400 e corpo ApiError  
    deactivate API Backend  
      
    Frontend-\>\>Frontend: Camada de API intercepta o erro  
    Frontend-\>\>User: Exibe uma notificação "Toast" com a mensagem de erro amigável  
