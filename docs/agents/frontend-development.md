### **Agente de Frontend (Tyaakov.dev)**

#### **1\. Objetivo**

Implementar, modificar e manter interfaces de usuário (UI) e componentes no projeto Tyaakov.dev, utilizando a stack tecnológica definida para garantir uma aplicação reativa, segura, performática e com uma experiência de usuário "premium".

#### **2\. Contexto Tecnológico \[STACK\]**

O frontend do Tyaakov.dev é uma aplicação web moderna construída com Next.js. O conhecimento profundo das seguintes tecnologias é mandatório:

* **Framework Principal**: **Next.js 15+ (App Router)**.  
* **Build Tool**: Next.js CLI (com Turbopack/Webpack).  
* **Biblioteca Principal**: React 19+.  
* **Linguagem**: TypeScript.  
* **Estilização**: Tailwind CSS (utility-first).  
* **Componentes UI**: A base de componentes é **shadcn/ui**, que utiliza primitivas do **Radix UI**.  
* **Cliente Backend**: Uma **camada de cliente de API customizada** (`lib/api/client.ts`) que consome as API Routes do nosso próprio projeto.  
* **Roteamento**: **Next.js App Router** (baseado em sistema de arquivos).  
* **Formulários**: Validação e gerenciamento de estado de formulários são feitos com **`react-hook-form`** e **`zod`**.  
* **Gráficos**: Visualização de dados é realizada com **`Recharts`**.  
* **Ícones**: Utilizar a biblioteca **`lucide-react`** para iconografia.  
* **Animação**: Utilizar a biblioteca **`framer-motion`**.  
* **Autenticação**: Gerenciada pelo **`@clerk/nextjs`**.

#### **3\. Diretrizes de Implementação \[REGRAS OBRIGATÓRIAS\]**

##### **3.1. Estrutura de Arquivos (Monorepo)**

Siga rigorosamente a estrutura de diretórios definida no `AGENT.md`.

* `apps/web/app/`: Onde vivem todas as rotas e páginas. Use a convenção do App Router (pastas para rotas, `page.tsx`, `layout.tsx`).  
* `apps/web/components/`: Componentes React específicos da aplicação.  
  * `ui/`: Componentes de base, gerados pelo `shadcn/ui` (Button, Input, Card, etc.).  
  * `learn/`, `shop/`, `admin/`: Componentes complexos e específicos de cada funcionalidade.  
* `apps/web/lib/`: Funções utilitárias, hooks e configurações.  
  * `api/client.ts`: **\[CRÍTICO\]** A camada de serviço para todas as chamadas de API do lado do cliente.  
* `packages/ui/`: Componentes de UI genéricos e reutilizáveis (nosso Design System).

##### **3.2. Padrões de Componentes e Data Fetching (Next.js App Router)**

* **Server Components por Padrão**: Por padrão, todos os componentes no App Router são Server Components. Use-os para buscar dados diretamente do servidor na primeira renderização. Isso é mais performático e seguro.  
* **Client Components com Intenção**: Adicione a diretiva `"use client";` no topo de um arquivo **APENAS** se ele precisar de interatividade no navegador (ex: `useState`, `useEffect`, `onClick`).  
* **Acesso a Dados em Server Components**: Em um Server Component, você pode chamar funções de serviço do backend *diretamente*, sem precisar de uma API Route. Isso é ideal para o carregamento inicial de dados da página.  
* **Acesso a Dados em Client Components**: Em um Client Component, toda a comunicação com o backend **DEVE** passar pela camada de serviço (`lib/api/client.ts`) que chama as API Routes.

##### **3.3. Acesso e Manipulação de Dados (A Camada de Cliente de API)**

Esta é a diretriz mais crítica para a integridade do projeto.

* **Proibido `fetch` Direto**: Componentes React **NUNCA** devem conter chamadas `fetch` diretas para nossas API Routes. Esta lógica viola a separação de camadas.  
* **Camada de Serviço (`apps/web/lib/api/client.ts`)**: Toda a interação com a API deve ser encapsulada em funções dentro deste arquivo. Por exemplo:  
  * `src/lib/api/client.ts` conteria funções como `createComment(contentId, text)`, `favoriteContent(contentId)`.  
* **Hooks para Consumo de Dados (`apps/web/lib/hooks/`)**: Para Client Components que precisam buscar ou modificar dados, crie hooks customizados que utilizam a camada de serviço (`client.ts`). Isso permite que a lógica seja reutilizada e desacoplada dos componentes de UI.

##### **3.4. Gerenciamento de Estado e Autorização**

* **Estado do Servidor**: O estado vindo do backend deve ser gerenciado pelos padrões de data fetching do Next.js (Server Components para load inicial, hooks para interações no cliente).  
* **Estado de Autenticação**: O estado do usuário (sessão, perfil, role) **DEVE** ser obtido através dos hooks e componentes do `@clerk/nextjs` (ex: `useUser`, `<SignedIn>`, `<SignedOut>`).  
* **Renderização Condicional por Role**: Use o helper `auth()` do Clerk no backend e o hook `useAuth()` no frontend para obter a `role` do usuário. A UI deve se adaptar a essa permissão (ex: exibir o botão "Admin Panel" apenas para usuários com `role: 'ADMIN'`).

#### **4\. Qualidade e Testes**

* **Linting e Formatação**: O código deve estar 100% em conformidade com as regras do ESLint e Prettier.  
* **Tipagem**: Nenhum erro de TypeScript é aceitável.  
* **Build de Produção**: Antes de finalizar uma tarefa, sempre verifique se o projeto compila sem erros com `pnpm build`.

#### **5\. Exemplo Prático: Exibir um Conteúdo e Adicionar um Comentário**

**1\. Busca de Dados (Server Component \- `apps/web/app/(main)/learn/[slug]/page.tsx`)**

TypeScript  
import { db } from "@/packages/db"; // Acesso direto ao DB, pois é um Server Component\!  
import { notFound } from "next/navigation";  
import { CommentSection } from "@/components/learn/CommentSection";

// Função para buscar os dados no servidor  
async function getContent(slug: string) {  
  const content \= await db.content.findUnique({  
    where: { slug },  
    include: { comments: { include: { author: true } } },  
  });  
  return content;  
}

// O componente da página é um Server Component por padrão  
export default async function ContentPage({ params }: { params: { slug: string } }) {  
  const content \= await getContent(params.slug);

  if (\!content) {  
    notFound();  
  }

  return (  
    \<div\>  
      \<h1\>{content.title}\</h1\>  
      \<article\>{/\* Renderiza o content.contentBody aqui \*/}\</article\>  
        
      {/\* A seção de comentários pode ser um Client Component \*/}  
      \<CommentSection contentId={content.id} initialComments={content.comments} /\>  
    \</div\>  
  );  
}

**2\. Função na Camada de Serviço (`apps/web/lib/api/client.ts`)**

TypeScript  
// Esta função será chamada por um Client Component para criar um novo comentário  
export async function createComment(contentId: number, text: string) {  
  const response \= await fetch(\`/api/content/${contentId}/comments\`, {  
    method: 'POST',  
    headers: { 'Content-Type': 'application/json' },  
    body: JSON.stringify({ text }),  
  });

  if (\!response.ok) {  
    const errorData \= await response.json();  
    throw new Error(errorData.error.message || 'Falha ao criar comentário.');  
  }

  return response.json();  
}

**3\. Componente de Interação (`apps/web/components/learn/CommentForm.tsx`)**

TypeScript  
"use client"; // Este componente precisa de interatividade\!

import { useForm } from 'react-hook-form';  
import { zodResolver } from '@hookform/resolvers/zod';  
import { z } from 'zod';  
import { createComment } from '@/lib/api/client';  
import { Button } from '@/components/ui/button';  
import { Textarea } from '@/components/ui/textarea';  
import { toast } from 'sonner';

const commentSchema \= z.object({  
  text: z.string().min(1, "O comentário não pode estar vazio."),  
});

type CommentFormData \= z.infer\<typeof commentSchema\>;

export function CommentForm({ contentId }: { contentId: number }) {  
  const form \= useForm\<CommentFormData\>({ resolver: zodResolver(commentSchema) });

  async function onSubmit(values: CommentFormData) {  
    try {  
      await createComment(contentId, values.text);  
      toast.success('Comentário adicionado\!');  
      form.reset();  
      // Aqui, idealmente, teríamos uma lógica para recarregar a lista de comentários  
    } catch (error) {  
      toast.error(error.message);  
    }  
  }

  return (  
    \<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"\>  
      \<Textarea {...form.register('text')} placeholder="Deixe seu comentário..." /\>  
      \<Button type="submit" disabled={form.formState.isSubmitting}\>  
        {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Comentário'}  
      \</Button\>  
    \</form\>  
  );  
}  
