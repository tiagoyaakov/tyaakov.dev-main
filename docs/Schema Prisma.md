// This is your Prisma schema file,  
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {  
  provider \= "prisma-client-js"  
}

datasource db {  
  provider \= "postgresql"  
  url      \= env("DATABASE\_URL")  
}

enum Role {  
  USER  
  ADMIN  
}

// Modelo para nosso usuário local, sincronizado com o Clerk.  
// Usado para estabelecer relacionamentos com outros dados na aplicação.  
model User {  
  id              String    @id // ID vindo do Clerk  
  email           String    @unique  
  name            String?  
  profileImageUrl String?  
  role            Role      @default(USER)  
  purchases       Purchase\[\]  
  comments        Comment\[\]  
  likes           Like\[\]  
  createdAt       DateTime  @default(now())  
  updatedAt       DateTime  @updatedAt  
}

model Category {  
  id        Int       @id @default(autoincrement())  
  name      String    @unique  
  slug      String    @unique  
  contents  Content\[\]  
}

model Content {  
  id          Int        @id @default(autoincrement())  
  title       String  
  slug        String     @unique  
  contentBody String  
  videoUrl    String?  
  publishedAt DateTime   @default(now())  
    
  category    Category   @relation(fields: \[categoryId\], references: \[id\])  
  categoryId  Int

  comments    Comment\[\]  
  likes       Like\[\]

  createdAt   DateTime   @default(now())  
  updatedAt   DateTime   @updatedAt  
}

model Comment {  
  id        Int      @id @default(autoincrement())  
  text      String  
    
  author    User     @relation(fields: \[authorId\], references: \[id\], onDelete: Cascade)  
  authorId  String

  content   Content  @relation(fields: \[contentId\], references: \[id\], onDelete: Cascade)  
  contentId Int

  createdAt DateTime @default(now())  
}

model Like {  
  id        Int      @id @default(autoincrement())

  user      User     @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  userId    String

  content   Content  @relation(fields: \[contentId\], references: \[id\], onDelete: Cascade)  
  contentId Int

  createdAt DateTime @default(now())

  @@unique(\[userId, contentId\]) // Garante que um usuário só pode curtir um conteúdo uma vez  
}

model Product {  
  id            Int        @id @default(autoincrement())  
  name          String  
  description   String  
  priceInCents  Int  
  imageUrl      String  
  fileUrl       String  
    
  purchases     Purchase\[\]  
    
  createdAt     DateTime   @default(now())  
  updatedAt     DateTime   @updatedAt  
}

model Purchase {  
  id          Int      @id @default(autoincrement())  
    
  user        User     @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  userId      String

  product     Product  @relation(fields: \[productId\], references: \[id\], onDelete: Cascade)  
  productId   Int

  purchasedAt DateTime @default(now())

  @@unique(\[userId, productId\]) // Opcional: impede comprar o mesmo produto duas vezes  
}  
