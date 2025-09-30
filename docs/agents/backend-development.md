### **Agente de Backend (Tyaakov.dev)**

#### **1\. Objetivo**

Implementar, modificar e manter toda a lógica de backend do projeto Tyaakov.dev, que reside nas **API Routes do Next.js**. O foco obsessivo deste agente é a **segurança de acesso aos dados, a performance das queries e a manutenibilidade do código**, seguindo as diretrizes do `AGENT.md`.

#### **2\. Contexto Tecnológico \[STACK\]**

O backend do Tyaakov.dev é construído sobre a seguinte stack:

* **Ambiente de Execução**: Vercel Serverless Functions.  
* **Framework**: Next.js (App Router \- API Routes).  
* **Linguagem**: TypeScript.  
* **Banco de Dados**: PostgreSQL (hospedado no Supabase).  
* **Gerenciamento de Schema (ORM)**: **Prisma**. Esta é a única ferramenta autorizada para interagir com o banco de dados.  
* **Autenticação**: **Clerk.com**. O helper `@clerk/nextjs/server` é a única fonte da verdade para a identidade do usuário.  
* **Segurança de Dados**: Supabase Row Level Security (RLS) como camada de defesa final.

#### **3\. Diretrizes de Implementação \[REGRAS OBRIGATÓRIAS\]**

##### **3.1. O Pilar Inegociável: Segurança e Acesso a Dados**

A falha em seguir estas regras compromete a segurança dos nossos usuários.

**Regra \#1: Autenticação é a Primeira Linha de Defesa**: Toda API Route que não for explicitamente pública (como `GET /api/content`) **DEVE** iniciar com a validação da sessão do usuário. Se o usuário não estiver autenticado, a execução deve ser interrompida imediatamente com um erro 401 (Unauthorized).  
TypeScript  
// Início obrigatório de uma API Route protegida  
import { auth } from "@clerk/nextjs/server";  
import { NextResponse } from "next/server";

export async function POST(req: Request) {  
  const { userId } \= auth();

  if (\!userId) {  
    return new NextResponse("Unauthorized", { status: 401 });  
  }

  // ... resto da lógica da API  
}

*   
* **Regra \#2: O Prisma é a Única Porta para o Banco**: Toda e qualquer interação com o banco de dados Supabase **DEVE** ser feita através do Prisma Client, importado do pacote `packages/db`. Chamadas diretas ao cliente do Supabase ou a escrita de SQL cru são proibidas, exceto para a criação de políticas RLS e funções SQL em arquivos de migração.  
* **Regra \#3: O RLS é a Rede de Segurança Final**: Mesmo que nossa lógica de API já filtre os dados por usuário, o Row Level Security (RLS) no Supabase é uma camada de segurança adicional e obrigatória. Ele garante que, mesmo que um bug ocorra na nossa API, o banco de dados em si impedirá o vazamento de dados.

**Exemplo de Política RLS (Tabela `purchases`):**  
SQL  
\-- Habilitar RLS na tabela  
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

\-- Política de SELECT: Garante que um usuário só pode ver suas próprias compras.  
CREATE POLICY "users\_can\_only\_see\_their\_own\_purchases"  
  ON public.purchases FOR SELECT  
  USING (user\_id \= auth.uid()::text); \-- auth.uid() é do Supabase, que lê o JWT do Clerk

* 

##### **3.2. Gerenciamento de Schema com Prisma**

* **Fonte da Verdade**: O arquivo `packages/db/prisma/schema.prisma` é a única fonte da verdade para a estrutura do banco de dados.  
* **Fluxo de Trabalho de Migração**:  
  1. Modifique o arquivo `schema.prisma`.  
  2. Execute `pnpm db:push` para aplicar as mudanças no seu ambiente de desenvolvimento. (Para produção, usaremos um fluxo de migração mais formal com `prisma migrate`).  
* **Índices de Performance**: Ao modelar, adicione índices (`@index([...])`) em colunas que serão usadas frequentemente em cláusulas `WHERE`, especialmente `userId`, `categoryId`, etc.

##### **3.3. Lógica de Negócio em API Routes**

* **Validação de Input \[OBRIGATÓRIO\]**: Toda API Route que recebe dados (ex: `POST`, `PUT`) **DEVE** validar o corpo da requisição (`req.json()`) usando `Zod`. Isso previne dados malformados e ataques de injeção.  
* **Tratamento de Erros**: Utilize blocos `try/catch`. Em caso de erro, logue o erro completo no servidor (`console.error(error)`) e retorne uma resposta padronizada e segura para o cliente, conforme definido no `Error Handling Strategy.md`.  
* **Separação de Lógica**: Para lógicas de negócio complexas, crie funções de serviço em `apps/web/lib/services` e chame-as a partir da API Route. Mantenha os arquivos de rota o mais enxutos possível, focados em orquestração e validação.

#### **4\. Qualidade e Segurança**

* **Testes de Integração**: Todo novo endpoint de API deve ser acompanhado por um teste de integração (`Vitest`) que verifica:  
  1. Se a rota nega acesso a usuários não autenticados.  
  2. Se a rota nega acesso a usuários sem a permissão correta (se aplicável).  
  3. Se a rota executa a lógica de negócio corretamente e retorna o status e os dados esperados em caso de sucesso.  
* **Análise de Segurança**: O código passará pela análise do **Semgrep** na pipeline de CI/CD para detectar vulnerabilidades comuns.

#### **5\. Exemplo Prático: Implementar a Funcionalidade de "Favoritar Conteúdo"**

**1\. Modificação do Schema (`schema.prisma`)**

Snippet de código  
// Em packages/db/prisma/schema.prisma

// ... (modelos existentes)

model Favorite {  
  id        Int      @id @default(autoincrement())  
    
  user      User     @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  userId    String

  content   Content  @relation(fields: \[contentId\], references: \[id\], onDelete: Cascade)  
  contentId Int

  createdAt DateTime @default(now())

  @@unique(\[userId, contentId\]) // Usuário só pode favoritar um conteúdo uma vez  
}

// Adicionar a relação inversa nos modelos User e Content  
model User {  
  // ...  
  favorites Favorite\[\]  
}

model Content {  
  // ...  
  favorites Favorite\[\]  
}

*Após salvar, execute `pnpm db:push`.*

**2\. Criação da Política RLS (em um novo arquivo de migração SQL)**

SQL  
\-- Habilitar RLS  
ALTER TABLE public."Favorite" ENABLE ROW LEVEL SECURITY;

\-- Políticas de acesso  
CREATE POLICY "users\_can\_see\_and\_manage\_their\_own\_favorites"  
  ON public."Favorite" FOR ALL  
  USING (user\_id \= auth.uid()::text)  
  WITH CHECK (user\_id \= auth.uid()::text);

**3\. Criação da API Route (`apps/web/app/(api)/content/[contentId]/favorite/route.ts`)**

TypeScript  
import { auth } from "@clerk/nextjs/server";  
import { NextResponse } from "next/server";  
import { db } from "@/packages/db"; // Nosso Prisma client exportado

// Rota para FAVORITAR um conteúdo (POST)  
export async function POST(  
  req: Request,  
  { params }: { params: { contentId: string } }  
) {  
  try {  
    const { userId } \= auth();  
    if (\!userId) {  
      return new NextResponse("Unauthorized", { status: 401 });  
    }

    const contentId \= parseInt(params.contentId, 10);  
      
    // Verificar se o conteúdo existe (opcional, mas boa prática)  
    const contentExists \= await db.content.findUnique({ where: { id: contentId } });  
    if (\!contentExists) {  
        return new NextResponse("Content not found", { status: 404 });  
    }

    // Criar o registro de favorito  
    const newFavorite \= await db.favorite.create({  
      data: {  
        userId: userId,  
        contentId: contentId,  
      },  
    });

    return NextResponse.json(newFavorite);  
  } catch (error) {  
    // Prisma lança um erro com código P2002 se o favorito já existir (devido ao @@unique)  
    if (error.code \=== 'P2002') {  
        return new NextResponse("Content already favorited", { status: 409 });  
    }  
      
    console.error("\[FAVORITE\_POST\]", error);  
    return new NextResponse("Internal Server Error", { status: 500 });  
  }  
}

// (Uma função DELETE seguiria uma lógica similar para desfavoritar)  
