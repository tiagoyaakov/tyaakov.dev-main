### **Deployment Architecture**

A nossa estratégia de deploy será baseada no fluxo de trabalho GitOps nativo da Vercel, que é robusto, automatizado e otimizado para aplicações Next.js.

#### **Deployment Strategy (Estratégia de Deploy)**

* **Infraestrutura como Código (IaC):** A configuração da nossa infraestrutura (Serverless Functions, CDN, etc.) é implicitamente definida pela estrutura do nosso projeto Next.js. Não precisaremos de scripts de IaC complexos (como Terraform) para o deploy da aplicação em si.  
* **Frontend Deployment:** A cada deploy, a Vercel fará a build do nosso frontend Next.js, pré-renderizando páginas estáticas e otimizando os assets (imagens, scripts). O resultado será distribuído globalmente através da **Vercel Edge Network (CDN)**, garantindo que os usuários ao redor do mundo tenham a menor latência possível.  
* **Backend Deployment:** As nossas API Routes (localizadas em `apps/web/app/(api)/`) serão automaticamente transformadas em **Serverless Functions** pela Vercel e deployadas em uma região de nossa escolha (ex: `gru1` \- São Paulo), prontas para escalar sob demanda.

#### **CI/CD Pipeline (Esteira de Integração e Deploy Contínuo)**

Nós utilizaremos a pipeline de CI/CD integrada da Vercel, que é acionada por eventos do Git:

1. **Push para uma Branch:** Quando um desenvolvedor envia código para uma nova branch, a Vercel automaticamente inicia uma build e cria um **Preview Deployment**.  
2. **Ambiente de Preview:** Cada Pull Request (PR) terá sua própria URL única e isolada (ex: `projeto-a1b2c3d.vercel.app`). Isso nos permite testar e revisar as mudanças em um ambiente idêntico ao de produção antes de aprová-las.  
3. **Merge para a `main`:** Após a aprovação e o merge do PR para a branch `main`, a Vercel automaticamente inicia a pipeline de **Production Deployment**.  
4. **Deploy em Produção:** O site principal é atualizado com as novas mudanças, sem downtime. A Vercel gerencia a transição de forma atômica.  
5. **Testes Automatizados:** A pipeline será configurada para rodar nossos testes (`pnpm test`) e linter (`pnpm lint`) antes de cada deploy. Se os testes falharem, o deploy é bloqueado, garantindo a qualidade do código em produção.

#### **Environments (Ambientes)**

| Ambiente | URL | Branch Git | Propósito |
| :---- | :---- | :---- | :---- |
| **Production** | `[URL_PRINCIPAL_DO_SITE]` | `main` | O site ao vivo, acessível a todos os usuários. Usa as chaves de produção do Supabase, Clerk e Stripe. |
| **Preview** | `[URL_DINAMICA].vercel.app` | `feature-branch` | Ambiente de teste para cada Pull Request. Usa chaves de "staging" ou "preview" para os serviços. |
| **Development** | `http://localhost:3000` | local | A máquina do desenvolvedor, para o desenvolvimento e testes diários. |

