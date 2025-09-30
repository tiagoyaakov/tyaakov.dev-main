### **Unified Project Structure**

Plaintext  
/  
├── apps/                   \# Aplicações "executáveis"  
│   └── web/                \# Nossa aplicação principal Next.js (Frontend \+ Backend)  
│       ├── app/            \# O coração do App Router do Next.js  
│       │   ├── (api)/      \# Rotas de API (nosso backend)  
│       │   │   ├── admin/  
│       │   │   ├── checkout/  
│       │   │   └── ...  
│       │   ├── (auth)/     \# Rotas de autenticação (sign-in, sign-up)  
│       │   ├── (main)/     \# Rotas principais da aplicação  
│       │   │   ├── learn/  
│       │   │   ├── shop/  
│       │   │   ├── biblioteca/  
│       │   │   └── ...  
│       │   └── layout.tsx  \# Layout principal  
│       │   └── page.tsx    \# A Homepage (Landing Page)  
│       ├── components/     \# Componentes React específicos desta aplicação  
│       │   └── ui/         \# Componentes do shadcn/ui  
│       ├── lib/            \# Funções utilitárias, hooks, etc.  
│       ├── public/         \# Arquivos estáticos (imagens, fontes)  
│       ├── ...  
│       └── package.json  
│  
├── packages/               \# Pacotes de código compartilhado  
│   ├── db/                 \# Configuração do Prisma e schema do banco de dados  
│   │   └── prisma/  
│   │       └── schema.prisma  
│   ├── ui/                 \# Nosso Design System (componentes de UI compartilhados)  
│   │   └── ...  
│   └── config/             \# Configurações compartilhadas (ESLint, TypeScript)  
│       ├── eslint-preset.js  
│       └── tsconfig.json  
│  
├── docs/                   \# A documentação do nosso projeto  
│   ├── brief.md  
│   ├── prd.md  
│   └── architecture.md  
│  
├── .gitignore  
├── package.json            \# O package.json raiz do monorepo  
├── tsconfig.json           \# O tsconfig.json raiz  
└── turbo.json              \# Configuração do Turborepo

#### **Racional da Estrutura:**

* **`apps/web`**: Concentra toda a nossa aplicação Next.js. O `App Router` nos permite organizar as páginas (frontend) e as rotas de API (backend) de forma colocalizada e intuitiva.  
* **`packages/db`**: Isola nossa lógica de banco de dados. Apenas o backend (dentro de `apps/web/app/(api)`) irá depender deste pacote para acessar o `schema.prisma` e o Prisma Client.  
* **`packages/ui`**: Aqui viverá nosso Design System. Componentes como Botões e Cards definidos aqui podem ser usados por qualquer aplicação no monorepo, garantindo consistência visual.

