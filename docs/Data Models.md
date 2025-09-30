### **Data Models**

#### **Modelo: `User`**

* **Propósito:** Representa um usuário na nossa plataforma. As informações básicas (id, email, nome) serão sincronizadas a partir do Clerk.  
* **Atributos Chave:**  
  * `id`: `String` (ID único vindo do Clerk)  
  * `email`: `String`  
  * `name`: `String` (Opcional)  
  * `profileImageUrl`: `String` (Opcional)  
  * `role`: `String` (ex: "USER" ou "ADMIN")  
* **Relacionamentos:**  
  * Um `User` pode ter muitas `Compras`.  
  * Um `User` pode ter muitos `Comentários`.  
  * Um `User` pode ter muitos `Likes`.

---

#### **Modelo: `Category`**

* **Propósito:** Organiza os conteúdos dentro do Módulo Learn.  
* **Atributos Chave:**  
  * `id`: `Int` (Autoincremento)  
  * `name`: `String` (ex: "Engenharia de Prompt")  
  * `slug`: `String` (ex: "engenharia-de-prompt")  
* **Relacionamentos:**  
  * Uma `Category` pode ter muitos `Conteudos`.

---

#### **Modelo: `Content`**

* **Propósito:** Representa uma unidade de conteúdo educacional (artigo ou vídeo) no Módulo Learn.  
* **Atributos Chave:**  
  * `id`: `Int` (Autoincremento)  
  * `title`: `String`  
  * `slug`: `String`  
  * `contentBody`: `String` (O conteúdo em formato MDX)  
  * `videoUrl`: `String` (Opcional)  
  * `publishedAt`: `DateTime`  
  * `categoryId`: `Int`  
* **Relacionamentos:**  
  * Um `Content` pertence a uma `Category`.  
  * Um `Content` pode ter muitos `Comentarios`.  
  * Um `Content` pode ter muitos `Likes`.

---

#### **Modelo: `Product`**

* **Propósito:** Representa um infoproduto à venda no Skills Shop.  
* **Atributos Chave:**  
  * `id`: `Int` (Autoincremento)  
  * `name`: `String`  
  * `description`: `String`  
  * `priceInCents`: `Int`  
  * `imageUrl`: `String`  
  * `fileUrl`: `String` (Link para o arquivo do produto no Supabase Storage)  
* **Relacionamentos:**  
  * Um `Product` pode estar em muitas `Compras`.

---

#### **Modelo: `Purchase`**

* **Propósito:** Registra a transação de um `User` comprando um `Product`.  
* **Atributos Chave:**  
  * `id`: `Int` (Autoincremento)  
  * `userId`: `String`  
  * `productId`: `Int`  
  * `purchasedAt`: `DateTime`  
* **Relacionamentos:**  
  * Um `Purchase` pertence a um `User`.  
  * Um `Purchase` pertence a um `Product`.

