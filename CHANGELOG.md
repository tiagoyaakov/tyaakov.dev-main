# Changelog

## [v0.2.0] - 2025-09-30
### Added
- Migração para pnpm como gerenciador de pacotes (otimização para monorepo Turbo).
- Suporte a Next.js 15.x com App Router otimizado.

### Updated
- **Next.js**: 13.5.1 → 15.5.4 (melhorias em performance, suporte a React 19, caching automático).
- **React & React DOM**: 18.2.0 → 19.1.1 (hooks otimizados, melhor tree shaking).
- **TypeScript**: 5.2.2 → 5.9.2 (tipagem mais rigorosa, suporte a novas features do JS).
- **Tailwind CSS**: 3.3.3 → 4.1.13 (sintaxe CSS nativa, @theme para variáveis, remoção de PostCSS extras).
- **@radix-ui packages**: Todas para versões 1.x/2.x mais recentes (compatibilidade com React 19).
- **Outras dependências**: lucide-react@0.544.0, zod@4.1.11, eslint@9.36.0, eslint-config-next@15.5.4, next-themes@0.4.6, react-day-picker@9.11.0, vaul@1.1.2, e ~100 pacotes secundários (resolvendo peers).

### Fixed
- Links internos: Substituídos <a> por <Link> from next/link em páginas principais (evita full reloads).
- TypeScript errors: Ajustes em props de Recharts (chart.tsx), remoção de IconLeft inválido (calendar.tsx), e async params em dynamic routes ([slug]/page.tsx).
- Tailwind v4 migration: globals.css atualizado com @import "tailwindcss";, @theme para cores/fontes, e CSS nativo para @apply (border-color, background gradients).
- PostCSS config: Atualizado para @tailwindcss/postcss (compatibilidade v4).
- ESLint: Atualizado para v9, resolvendo warnings de peer deps.

### Migration Notes
- **Breaking Changes Resolvidas**:
  - React 19: Sem impactos em hooks existentes; peers atualizados.
  - Next.js 15: App Router compatível; build sem erros.
  - Tailwind v4: Removidas diretivas @tailwind (substituídas por @import); cores movidas para CSS vars; ring/border defaults ajustados.
- **Testes**: Lint, build, typecheck e dev server passam. App funcional em localhost:3000 (rotas /, /learn, /shop testadas).
- **Deploy**: Vercel GitOps intacto; push para main triggera production build. Recomendo testar preview deployment.

### Deprecated
- next lint: Migrado para ESLint CLI (futuro: substituir script em package.json).
- PostCSS import/autoprefixer: Removidos, pois Tailwind v4 gerencia nativamente.

Para reverter: `pnpm install` com versões pinned no CHANGELOG anterior.

---
Changelog mantido para rastrear evoluções. Contribuições bem-vindas!