### **Coding Standards**

#### **1\. Ferramentas de Qualidade (Linting & Formatting)**

A maior parte dos nossos padrões de estilo será garantida de forma automática.

* **ESLint:** Será configurado para analisar nosso código TypeScript/React e apontar problemas de lógica, bugs potenciais e desvios de boas práticas.  
* **Prettier:** Será usado para formatar o código automaticamente ao salvar, garantindo um estilo visual 100% consistente em todo o projeto (espaçamento, quebra de linha, etc.).  
* **Configuração Centralizada:** As configurações do ESLint e do Prettier viverão no pacote `packages/config` do nosso monorepo, forçando as mesmas regras para todos.

#### **2\. Regras Críticas (As Leis do Projeto)**

Estas são as diretrizes de arquitetura que DEVEM ser seguidas em todos os momentos:

1. **Tipos Compartilhados São Sagrados:** Tipos de dados (interfaces TypeScript) que são usados tanto no frontend quanto no backend DEVEM ser definidos no pacote `packages/db` (se vierem do Prisma) ou em um futuro pacote `packages/shared`. **Nunca** duplique tipos entre o frontend e o backend.  
2. **Variáveis de Ambiente Abstraídas:** Nunca acesse `process.env` diretamente nos componentes ou páginas. Crie um arquivo central (ex: `lib/env.ts`) que valide e exporte as variáveis de ambiente de forma tipada. Isso evita erros e centraliza a configuração.  
3. **Camada de API é Obrigatória:** O frontend **NUNCA** deve fazer chamadas `fetch` diretamente para nossas próprias rotas de API. Todas as chamadas devem ser encapsuladas em funções dentro de uma camada de cliente de API (ex: `lib/api/client.ts`). Isso centraliza a lógica de comunicação, tratamento de erros e tipagem.  
4. **Acesso ao Banco de Dados Apenas via Prisma:** Toda e qualquer interação com o banco de dados Supabase **DEVE** ser feita através do Prisma Client. Nenhuma query SQL crua será escrita, a não ser em casos extremos e documentados.  
5. **Componentes Pequenos, Hooks Inteligentes:** Componentes React devem ser mantidos pequenos e com uma única responsabilidade (UI). Lógica de estado complexa, chamadas de API ou efeitos colaterais devem ser extraídos para hooks customizados (ex: `lib/hooks/useContent.ts`).  
6. **Autorização Explícita no Backend:** **TODA** rota de API dentro de `app/(api)/admin/` **DEVE**, sem exceção, iniciar com uma verificação da permissão de "ADMIN" do usuário.

#### **3\. Naming Conventions (Convenções de Nomenclatura)**

| Elemento | Convenção | Exemplo |
| :---- | :---- | :---- |
| **Componentes React** | `PascalCase` | `UserProfile.tsx` |
| **Hooks React** | `camelCase` com prefixo `use` | `useAuth.ts` |
| **Arquivos de Página/Rota** | `kebab-case` ou `layout/page.tsx` | `/app/(main)/user-profile/page.tsx` |
| **Modelos (Prisma)** | `PascalCase` | `model UserProfile { ... }` |
| **Variáveis e Funções** | `camelCase` | `const userName = '...'` |

