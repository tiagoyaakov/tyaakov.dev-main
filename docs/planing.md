# Plano de Refatoração com Guardrails de Risco (para execução por IA/Agentes)

> **Formato otimizado em Markdown** para leitura por modelos de IA: seções curtas, títulos consistentes, listas idempotentes, checklists e blocos de configuração “machine-friendly”.

---

## 📌 Metadados

* **versão:** `1.0.0`
* **última_atualização:** `2025-09-30`
* **projeto:** `tyaakov.dev`
* **owner:** `@Tyaakov`
* **status:** `planejado`
* **ambientes:** `dev` · `staging` · `prod`

---

## 🧭 Convenções de Leitura (IA)

* **Estrutura:** cada item segue `Objetivo → Entregáveis → Passos → Validação → Riscos & Guardrails`.
* **Checklists:** usar ✅ ao concluir; nunca apagar históricos (apenas riscar, se necessário).
* **Blocos “machine-friendly”:** YAML/JSON para *allowed paths*, *stop conditions*, *feature flags* e *gates*.
* **Termos chave:**

  * *Idempotente* = executar 2x não muda o estado além da 1ª vez.
  * *Guardrail* = regra de proteção “não negociável”.
  * *Gate* = condição de saída obrigatória antes de avançar.

---

## 📜 Histórico de Planejamentos Concluídos

### 2025-09-30 — Análise Inicial do Projeto

**Objetivo:** mapear documentação, arquitetura e lacunas.
**Achados:** forte UI; ausência de backend/integrações; necessidade de monorepo, DB, auth, APIs.

**Riscos & Guardrails**

* **Risco:** conclusões sem fonte (“alucinação”).
  **Guardrail:** toda afirmação referencia artefatos reais do repo; se faltar fonte, **parar** e abrir issue `missing-source-of-truth`.
* **Risco:** correções destrutivas antecipadas.
  **Guardrail:** **modo leitura** nesta etapa; qualquer alteração via PR atômico aprovado.

---

## 🚦 Regras Globais (Guardrails Transversais)

```yaml
execution_contract:
  allowed_paths:
    - apps/web/**
    - packages/ui/**
    - packages/db/**
    - packages/config/**
    - turbo.json
    - package.json
    - pnpm-workspace.yaml
    - tsconfig*.json
  allowed_ops: [create, edit, move]   # delete somente com soft-delete/backup
  prohibited_ops:
    - delete_without_backup
    - edit_in: [infra/**, .github/**, scripts/**]  # requer PR dedicado
  stop_conditions:
    - missing_source_of_truth
    - schema_conflict_or_migration_drop
    - risk_of_data_loss
    - failing_gate_in_previous_phase
```

**Outros Guardrails Globais**

* **Backups & rollback:** backup lógico antes de migração; plano de rollback por *migration id*.
* **Logs & PII:** logs estruturados com `correlationId`; mascarar PII; TTL definido.
* **Env:** nunca commitar `.env`; usar `env.example` + `lib/env.ts` (Zod).
* **CI obrigatório:** `typecheck` · `lint` · `test` · `a11y` · `lighthouse` · `e2e (crítico)`.

---

## 🔒 Integridade de Dados (Únicos & Idempotência)

| Domínio         | Regra Única / Idempotência                                    |
| --------------- | ------------------------------------------------------------- |
| `users`         | `clerk_user_id` UNIQUE; sync unidirecional; retry idempotente |
| `content`       | `slug` UNIQUE; publicar só do DB (sem mocks em prod)          |
| `likes`         | UNIQUE(`user_id`,`content_id`)                                |
| `products`      | `sku` UNIQUE; Stripe↔DB com `upsert`                          |
| `purchases`     | UNIQUE(`user_id`,`product_id`); liberar após webhook ok       |
| Webhooks Stripe | `event_id` UNIQUE; processamento idempotente                  |
| Checkout        | `Idempotency-Key` no request                                  |

---

## 🗺️ Roteiro Macro (Fases & Gates)

1. **Fase 1 — Fundação Técnica (Monorepo, DB, Auth, API)**
2. **Fase 2 — Learn (conteúdo, UI, admin)**
3. **Fase 3 — Skills Shop (produtos, checkout, biblioteca)**
4. **Fase 4 — Polimento & Inteligência (perf, AI proxy, testes, LGPD)**

```yaml
gates:
  F1:
    - monorepo_build_green
    - db_migrations_dry_run_no_drop
    - rls_tests_pass
    - auth_login_signup_sync_idempotent
    - api_contracts_zod_cors_locked
  F2:
    - no_mocks_in_prod
    - unique_slugs_enforced
    - rate_limit_enabled
    - admin_soft_delete_audit_log
  F3:
    - checkout_idempotency
    - webhook_verified_and_idempotent
    - library_access_after_payment_only
  F4:
    - core_web_vitals_90_plus
    - test_coverage_critical_domains_80_plus
    - analytics_monitoring_alerts_on
    - a11y_checks_in_ci
    - lgpd_consent_versioned
```

---

## ⚙️ Fase 1 — Fundação Monorepo & Configuração Técnica

### 1.1 Monorepo (Turborepo + Workspaces)

**Objetivo:** `apps/web`, `packages/ui`, `packages/db`, `packages/config`.
**Entregáveis:** `turbo.json`, `pnpm-workspace.yaml`, `tsconfig` raíz com `paths`.

**Passos**

* Mover código para `apps/web/` via `git mv`.
* Extrair UI para `packages/ui`; presets/ESLint/Prettier para `packages/config`.
* Ajustar *build pipelines* no Turborepo.

**Validação**

* `pnpm build` e `pnpm dev` verdes; imports funcionais; lint/format centralizados.

**Riscos & Guardrails**

* **Imports quebrados por `paths`.** → Rodar `tsc --noEmit` raiz e smoke test.
* **Sobrescrita fora do escopo.** → Aplicar `execution_contract.allowed_paths`.
* **Deleção de componentes reutilizáveis.** → Não deletar; `git mv` + alias até ajuste.
* **Duplicidade de UI.** → Buscar componente por nome antes de criar (`UiXxx`).

---

### 1.2 Banco de Dados (Prisma + Supabase + RLS)

**Objetivo:** `schema.prisma`, client singleton, RLS mínimas, tipos compartilhados.
**Entregáveis:** `packages/db/prisma/schema.prisma`, `packages/db/src/index.ts`.

**Passos**

* `prisma generate` / `migrate` com **Shadow DB**.
* Definir chaves únicas e *upserts* idempotentes (seed).
* RLS: anônimo/logado/admin.

**Validação**

* Conexão ok; tipos consumíveis em FE/BE; *dry-run* sem `DROP`.

**Riscos & Guardrails**

* **Schema drift / migração destrutiva.** → `prisma migrate diff --from-empty --to-schema-datasource` em *dry-run*; **proibido `DROP`**.
* **Vazamento por RLS.** → Testes automatizados 3 perfis; queries de busca via *views* seguras.
* **ENV errado.** → `lib/env.ts` com Zod; bloquear boot sem variáveis válidas.
* **Duplicidade base.** → UNIQUE (email/providerId etc.); seeders idempotentes.

---

### 1.3 Autenticação (Clerk)

**Objetivo:** `@clerk/nextjs` + middleware + `lib/auth.ts` + sync Clerk→DB.
**Validação:** login/signup ok; rotas protegidas; `users.clerk_user_id` único.

**Riscos & Guardrails**

* **Mismatch de identidade.** → Chave única `clerk_user_id`; sync unidirecional; *retry* idempotente.
* **Rotas expostas.** → Lista canônica público/privado; middleware cobre `/(app|api)` críticos.
* **Dados sem sessão.** → Validar `auth()` em *server actions*; estados de fallback seguros.

---

### 1.4 Camada de API & Cliente

**Objetivo:** `lib/api/client.ts`, `lib/errors.ts`, `lib/env.ts`, `lib/validation.ts`, CORS estrito.

**Riscos & Guardrails**

* **Contrato instável.** → Schemas **Zod** compartilhados; testes de contrato.
* **Erros silenciosos.** → Mapa de erros padronizado + *error boundary* na UI.
* **CORS frouxo.** → Origem whitelisted por ambiente; **nunca `*` em prod**.
* **Injeção.** → Sanitização de input; *parameterized queries*; *escape* ao renderizar.

---

## 📚 Fase 2 — Learn (Conteúdo + UI + Admin)

### 2.1 API de Conteúdo

**Objetivo:** `/api/content` e `/api/content/[slug]`, comentários/likes, paginação, busca.

**Riscos & Guardrails**

* **Dados “fantasma” (alucinação).** → Somente DB em prod; *feature flag* para mocks em dev.
* **Duplicidade (slug/likes).** → UNIQUE em `content.slug` e `(user_id,content_id)`; *upsert*.
* **Flood/spam.** → Rate limit por IP/usuário; *slow mode*; moderação mínima.
* **RLS em busca.** → Views seguras; testes de policy em paginação.

---

### 2.2 Páginas Learn (UX + Estados)

**Objetivo:** páginas com dados reais, busca *debounced*, paginação, `loading/error` states.

**Riscos & Guardrails**

* **N+1 / UI travada.** → *Batching*, cache por chave, paginação real.
* **Dados privados no cliente.** → Minimizar campos; checar sessão; preferir SSR quando sensível.
* **SEO instável.** → SSG/ISR com `revalidate` adequado; *fallback* estável.

---

### 2.3 Admin de Conteúdo (CRUD)

**Objetivo:** rotas admin (protegidas), soft-delete, auditoria, Zod em formulários.

**Riscos & Guardrails**

* **Escalada de privilégio.** → Check de role server-side + RLS.
* **Deleção permanente.** → Soft-delete (`deleted_at`) + *undo*; `audit_logs`.
* **Edição concorrente.** → *Optimistic locking* por `version/updated_at`.

---

## 🛒 Fase 3 — Skills Shop (Produtos + Checkout + Biblioteca)

### 3.1 API de Produtos & Checkout (Stripe)

**Objetivo:** `/api/products`, `/api/checkout`, `/api/library`; webhooks Stripe; verificação de acesso.

**Riscos & Guardrails**

* **Cobrança duplicada.** → `Idempotency-Key` no checkout; webhook idempotente por `event_id` UNIQUE.
* **Entrega sem pagamento.** → Biblioteca libera acesso **somente** após `payment_intent.succeeded`.
* **SKU duplicado.** → `products.sku` UNIQUE; sincronismo Stripe↔DB com *upsert* e *source of truth* definido.

---

### 3.2 UI do Shop

**Objetivo:** vitrine, `ProductSaleModal`, páginas sucesso/erro, biblioteca do usuário.

**Riscos & Guardrails**

* **Estado inconsistente pós-checkout.** → *Polling* curto + push do webhook; toasts de status.
* **Acesso indevido à biblioteca.** → Checagem server-side de posse; RLS em `purchases`.

---

### 3.3 Admin de Produtos

**Objetivo:** CRUD, categorias, relatórios.

**Riscos & Guardrails**

* **Preço errado em prod.** → *Feature flag* `price-change` + dupla aprovação; log de alterações.
* **Relatórios com PII.** → Minimizar PII; mascaramento; política LGPD.

---

## 🧠 Fase 4 — Polimento & Inteligência

### 4.1 Performance & Build

**Objetivo:** Core Web Vitals > 90; SSG/ISR; imagens otimizadas; cache; code splitting; SW.

**Riscos & Guardrails**

* **Cache desatualizado.** → Estratégia de invalidação por tipo; evitar cache de sensíveis.
* **Service Worker interferindo em auth/checkout.** → Lista de exclusão (no-cache) para rotas críticas.

---

### 4.2 Chat AI via n8n (Proxy Seguro)

**Objetivo:** `/api/chat` → n8n; histórico no DB; auth; rate-limit; streaming.

**Riscos & Guardrails**

* **Alucinação com ações reais.** → Somente leitura/resposta textual; **sem tools destrutivas**.
* **Vazamento de segredos.** → Nunca ecoar `.env`; *redaction* em logs; *prompt-leak prevention*.
* **Abuso/DDoS.** → Rate limit por IP/usuário; *circuit breaker*; *timeout*.

---

### 4.3 Testes, Observabilidade & Alertas

**Objetivo:** Vitest (unit/integration), Playwright (E2E), React Testing Library, Analytics/Monitoring, alertas.

**Riscos & Guardrails**

* **Cobertura enganosa.** → ≥80% nos domínios críticos (auth, RLS, checkout) + testes de mutação mínimos.
* **Logs sensíveis.** → Mascarar PII; acesso restrito; retenção com TTL.

---

### 4.4 LGPD & Acessibilidade

**Objetivo:** consentimento versionado; política; ARIA; teclado; contraste; foco visível.

**Riscos & Guardrails**

* **Consentimento inconsistente.** → Versão de consentimento + audit trail + opt-out simples.
* **Regressões de A11y.** → Verificação automatizada (axe/lighthouse) no CI como *gate*.

---

## ✅ Checklists Operacionais

### CI (por PR)

* [ ] Typecheck sem erros
* [ ] Lint/Format ok
* [ ] Testes unitários e integração verdes
* [ ] E2E críticos (auth/RLS/checkout) verdes
* [ ] Lighthouse ≥ 90 nas páginas chave
* [ ] A11y (axe) sem violações bloqueadoras
* [ ] Review de segurança (CORS, headers, ENV)
* [ ] Revisar chaves UNIQUE e idempotência

### Migrações de Banco

* [ ] Backup lógico antes
* [ ] *Dry-run* sem `DROP`
* [ ] Plano de rollback por *migration id*
* [ ] Testes de RLS (anônimo/logado/admin)

### Releases

* [ ] Gates da fase atual cumpridos
* [ ] *Feature flags* definidas por ambiente
* [ ] Alertas/monitoramento ativos
* [ ] Notas de versão + plano de rollback

---

## 🧩 Apêndice A — Feature Flags (exemplos)

```yaml
feature_flags:
  allow_mocks_in_dev: true
  price_change_requires_dual_approval: true
  chat_ai_tools_enabled: false         # somente leitura/respostas textuais
  service_worker_cache_critical_routes: false
```

---

## 🧩 Apêndice B — Tabela de Gaps Comuns & Mitigações

| Gap comum                  | Mitigação direta                                    |
| -------------------------- | --------------------------------------------------- |
| Duplicidade de registros   | UNIQUE + *upsert* idempotente + testes de conflito  |
| “Alucinar” estados/schemas | Validar contra *source of truth*; parar se ausência |
| Deleção indevida           | Soft-delete + backup + auditoria + *undo*           |
| CORS aberto                | Whitelist por ambiente; sem `*` em prod             |
| Entrega sem pagamento      | Gate via webhook verificado e idempotente           |
| RLS vazada                 | Tests 3 perfis; views seguras para busca            |
| Env inválido               | `lib/env.ts` (Zod) bloqueando boot                  |
| Cache desatualizado        | Política de invalidação/TTL por tipo de página      |
| Edição concorrente         | *Optimistic locking*                                |

---

## 🧩 Apêndice C — Glossário Rápido

* **Gate:** condição mínima para avançar de fase.
* **Guardrail:** regra de proteção obrigatória.
* **Idempotência:** mesma operação repetida não causa efeitos adicionais.
* **RLS:** Row-Level Security (políticas por linha na base).
* **SSR/SSG/ISR:** estratégias de renderização e cache em produção.

---

## 🗓️ Próximos Passos (com Gates)

1. **Hoje — F1.1 Monorepo**

   * Criar estrutura e mover com `git mv`.
   * **Gate:** `monorepo_build_green`.

2. **Amanhã — F1.2 DB**

   * Shadow DB + *dry-run*; chaves UNIQUE; RLS de base.
   * **Gate:** `db_migrations_dry_run_no_drop` & `rls_tests_pass`.

3. **Esta Semana — F1.3/1.4**

   * Clerk + camada de API (Zod, errors, CORS).
   * **Gate:** `auth_login_signup_sync_idempotent` & `api_contracts_zod_cors_locked`.

4. **Próxima Semana — F2 Learn**

   * API de conteúdo + páginas reais + admin com soft-delete.
   * **Gate:** `no_mocks_in_prod` & `unique_slugs_enforced` & `rate_limit_enabled`.

---

> **Observação final:** este arquivo é **vivo**. Ao concluir cada sub-tarefa, marque as checklists, registre o *gate* cumprido e **não apague histórico**, apenas resuma totalmente o que foi feito — preserve rastreabilidade para agentes de IA e humanos.
