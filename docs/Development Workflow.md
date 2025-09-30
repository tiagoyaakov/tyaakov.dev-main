### **Development Workflow**

#### **Local Development Setup (Configuração do Ambiente Local)**

**1\. Prerequisites (Pré-requisitos)**

* **Node.js:** Versão `~22.x.x` (LTS) ou superior.  
* **pnpm:** Usaremos o `pnpm` como nosso gerenciador de pacotes. É rápido, eficiente e ideal para monorepos (`npm install -g pnpm`).  
* **Git:** Para controle de versão.

**2\. Initial Setup (Instalação Inicial)**

Bash  
\# 1\. Clone o repositório do projeto  
git clone \[URL\_DO\_SEU\_REPOSITORIO\]  
cd \[NOME\_DO\_PROJETO\]

\# 2\. Instale todas as dependências do monorepo  
pnpm install

\# 3\. Copie o arquivo de variáveis de ambiente de exemplo  
cp .env.example .env

\# 4\. Preencha o arquivo .env com suas chaves secretas  
\# (Será necessário obter as chaves dos painéis do Supabase, Clerk e Stripe)

\# 5\. Sincronize o schema do Prisma com seu banco de dados Supabase  
pnpm db:push 

**3\. Development Commands (Comandos de Desenvolvimento)** *Graças ao Turborepo, os comandos são simples e executados da raiz do projeto.*

Bash  
\# Iniciar o servidor de desenvolvimento (para a aplicação web)  
pnpm dev

\# Criar uma build de produção de todas as aplicações e pacotes  
pnpm build

\# Rodar o linter para verificar a qualidade do código em todo o projeto  
pnpm lint

\# Executar todos os testes do projeto  
pnpm test

#### **Environment Configuration (Configuração de Ambiente)**

O arquivo `.env.example` na raiz do projeto conterá o template para as seguintes variáveis de ambiente, que são cruciais para o funcionamento da aplicação:

Bash  
\# Supabase  
DATABASE\_URL="postgresql://..."

\# Clerk  
NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY="pk\_..."  
CLERK\_SECRET\_KEY="sk\_..."

\# Stripe  
STRIPE\_SECRET\_KEY="sk\_live\_..."  
STRIPE\_WEBHOOK\_SECRET="whsec\_..."

\# URL da Aplicação (para NextAuth/Clerk)  
NEXT\_PUBLIC\_APP\_URL="http://localhost:3000"  
