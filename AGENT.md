# 🚀 Tyaakov.dev - Guia Mestre de Agentes (AGENT.md)

**[DIRETRIZ MESTRE]** Este documento é a fonte única e definitiva da verdade para todos os agentes de IA que operam no projeto Tyaakov.dev. Seu conteúdo é de **CUMPRIMENTO OBRIGATÓRIO**. Antes de executar qualquer tarefa, você deve validar sua abordagem contra as regras aqui estabelecidas.

## 1. Visão Geral e Filosofia do Projeto

* **Filosofia:** Construir uma plataforma de capacitação em IA de alta performance, segura e com uma experiência de usuário "premium". Nossas prioridades arquitetônicas são:
    * **Segurança e Acesso:** A gestão de identidade é centralizada no Clerk. O acesso aos dados é rigorosamente controlado no nível do banco de dados via RLS do Supabase.
    * **Performance e Escalabilidade:** A arquitetura Jamstack/Serverless na Vercel é inegociável para garantir performance global e escalabilidade sob demanda.
    * **Developer Experience (DX):** Utilizamos uma stack moderna (Next.js, TypeScript, Prisma, TailwindCSS) dentro de um monorepo para maximizar a produtividade e a qualidade do código.

* **Stack Tecnológica Principal [STACK]:**
    * **Framework:** Next.js (App Router)
    * **Hospedagem:** Vercel
    * **Banco de Dados:** Supabase (PostgreSQL) com Prisma (ORM)
    * **Autenticação:** Clerk.com
    * **Estilização:** TailwindCSS com shadcn/ui

## 2. Estrutura do Monorepo [ESTRUTURA]

**[REGRA OBRIGATÓRIA]** A estrutura de arquivos a seguir DEVE ser respeitada. Todo novo arquivo ou módulo deve ser criado no local apropriado.

```plaintext
/
├── apps/                   # Aplicações "executáveis"
│   └── web/                # Aplicação principal Next.js (Frontend + Backend)
│       ├── app/            # App Router: onde vivem as páginas e APIs
│       │   ├── (api)/      # [BACKEND] Rotas de API server-side
│       │   ├── (auth)/     # [FRONTEND] Rotas de autenticação (sign-in, etc.)
│       │   ├── (main)/     # [FRONTEND] Rotas principais da aplicação
│       │   └── ...
│       ├── components/     # [FRONTEND] Componentes React
│       └── lib/            # [SHARED] Utilitários e lógica compartilhada do app
│
├── packages/               # Pacotes de código compartilhado
│   ├── db/                 # [BACKEND] Schema e cliente do Prisma
│   │   └── prisma/
│   │       └── schema.prisma
│   ├── ui/                 # [FRONTEND] Design System (componentes de UI reutilizáveis)
│   └── config/             # Configurações compartilhadas (ESLint, TypeScript)
│
├── docs/                   # Documentação do projeto (contexto para os agentes)
│   ├── brief.md
│   ├── prd.md
│   └── ...
└── ...
```

## 3. Ciclo de Vida do Desenvolvimento (CI/CD) [WORKFLOW]

* **Comandos Locais:** Utilize os scripts do `package.json` via `pnpm`.
    * `pnpm dev`: Inicia o ambiente de desenvolvimento.
    * `pnpm build`: Executa a build de produção.
    * `pnpm lint`: Executa a verificação de qualidade de código.
    * `pnpm test`: Executa a suíte de testes.

* **Pipeline de Deploy (Vercel GitOps):**
    1.  **Push para uma branch:** A Vercel cria um **Preview Deployment** automático.
    2.  **Merge para `main`:** A Vercel cria um **Production Deployment** automático.
    3.  **Verificações Obrigatórias:** Nenhum deploy será concluído se os passos de `lint` ou `test` falharem na pipeline. A integração com **Semgrep** para análise de segurança estática será adicionada à pipeline.

* **Ciclo de Tarefa Padrão:**
    1.  Receber a tarefa (ex: implementar a Estória 1.3).
    2.  Acionar os MCPs e Agentes Especialistas necessários (ex: `backend-development.md`) para executar a tarefa de codificação.
    3.  Confirmar a conclusão da tarefa de código e a passagem de todos os testes locais.
    4.  **[GATILHO OBRIGATÓRIO]** Ao final, acionar o **Agente de Sincronização de Documentação** (`docs/agents/doc-sync-agent.md`) para analisar o impacto das mudanças e atualizar toda a documentação relevante.

## 4. Hierarquia de Acesso e Segurança [SEGURANÇA]

**[REGRA CRÍTICA]** A segurança é o pilar mais importante deste projeto.

* **Fonte da Verdade de Autenticação:** **Clerk.com** é a fonte única e definitiva para identidade, autenticação e sessão do usuário.
* **Sincronização de Usuários com Supabase:** Para viabilizar as políticas RLS, os usuários do Clerk DEVEM ser sincronizados com uma tabela `public.users` no Supabase. A `id` na tabela `users` DEVE ser a mesma `id` do usuário no Clerk.
* **Papéis (Roles):** O sistema opera com dois papéis: `USER` e `ADMIN`. A `role` será armazenada nos metadados do Clerk e sincronizada para a nossa tabela `users`.
* **Política de Row Level Security (RLS) [OBRIGATÓRIO]:** RLS DEVE estar **HABILITADO** em todas as tabelas com dados de usuário. A cláusula `WITH CHECK` é **OBRIGATÓRIA** em políticas de `INSERT` e `UPDATE`.

## 5. Padrões de Código Críticos [CÓDIGO]

Consulte o documento `docs/Coding Standards.md` para a lista completa. As regras mais críticas são:
1.  **Tipos Compartilhados São Sagrados:** Use os tipos do pacote `packages/db`. Não duplique.
2.  **Variáveis de Ambiente Abstraídas:** Acesse-as através de um módulo de configuração.
3.  **Camada de API é Obrigatória:** O frontend deve usar uma camada de cliente de API (`lib/api/client.ts`).
4.  **Acesso ao Banco de Dados Apenas via Prisma:** Nenhuma query SQL crua.
5.  **Autorização Explícita no Backend:** Toda API de admin DEVE verificar a `role` do usuário.

## 6. Uso de Agentes e MCPs (Obrigatório) [MCPs]

O sistema de IA deve utilizar proativamente os seguintes MCPs:
* **server-sequential-thinking**: Obrigatório antes de iniciar tarefas complexas.
* **supabase MCP**: Ativado para todas as operações de banco de dados.
* **context7-mcp**: Usado para buscar documentações recentes na web.
* **mem0-memory-mcp**: Usado para armazenar decisões arquiteturais.
* **mcp-taskmanager**: Utilizado após o planejamento para criar tarefas.
* **desktop-commander**: Acionado para executar scripts locais (`pnpm lint`, `pnpm build`).

## 7. Catálogo de Documentos Vivos [DOCUMENTAÇÃO]

Antes de iniciar uma tarefa, consulte os documentos relevantes em `docs/` para obter o contexto completo. A lista inclui, mas não se limita a: `Project Brief.md`, `Tyaakov.dev Product Requirements Document (PRD).md`, `Component Library Design System (Baseado em n8n).md`, `High Level Architecture.md`, `Schema Prisma.md`, e os guias dos agentes em `docs/agents/`.

## 8. Guias dos Agentes Especialistas [AGENTES]

Consulte os guias específicos abaixo para obter instruções detalhadas.

* `docs/agents/frontend-development.md`: Guia para implementação de interfaces com React e shadcn/ui.
* `docs/agents/backend-development.md`: Diretrizes para gerenciar o Supabase, API Routes, Prisma e RLS.
* `docs/agents/security-compliance.md`: Protocolos para auditar a segurança do sistema.
* `docs/agents/qa-testing.md`: Estratégia e protocolos de teste.
* `docs/agents/architecture-planning.md`: Processo para planejar novas funcionalidades.
* `docs/agents/doc-sync-agent.md`: Guia para o agente que mantém a documentação sincronizada com o código.