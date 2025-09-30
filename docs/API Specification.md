### **API Specification**

Esta especificação define os endpoints que serão construídos em `/pages/api/`.

#### **Endpoints Públicos (Acessíveis a todos)**

* **`GET /api/content`**  
  * **Descrição:** Retorna uma lista de todos os conteúdos do Módulo Learn, possivelmente agrupados por categoria. Usado para alimentar a página `/learn`.  
  * **Autenticação:** Nenhuma.  
* **`GET /api/content/[slug]`**  
  * **Descrição:** Retorna os detalhes completos de um único conteúdo, incluindo o corpo do texto/vídeo e seus comentários.  
  * **Autenticação:** Nenhuma.  
* **`GET /api/products`**  
  * **Descrição:** Retorna a lista de todos os produtos para exibição na vitrine do Skills Shop.  
  * **Autenticação:** Nenhuma.  
* **`POST /api/chat`**  
  * **Descrição:** Recebe uma mensagem do usuário e a envia para o orquestrador (n8n) para obter uma resposta do A.I. Chat.  
  * **Autenticação:** Nenhuma.

#### **Endpoints de Usuário (Requerem Login)**

* **`POST /api/content/[id]/comments`**  
  * **Descrição:** Permite que um usuário logado adicione um novo comentário a um conteúdo.  
  * **Autenticação:** Requer token de usuário (sessão do Clerk).  
* **`POST /api/content/[id]/likes`**  
  * **Descrição:** Permite que um usuário logado adicione ou remova um "like" de um conteúdo.  
  * **Autenticação:** Requer token de usuário.  
* **`POST /api/checkout`**  
  * **Descrição:** Inicia a sessão de checkout para um produto específico, comunicando-se com o Clerk/Stripe.  
  * **Autenticação:** Requer token de usuário.  
* **`GET /api/library`**  
  * **Descrição:** Retorna a lista de produtos que o usuário logado já comprou. Usado para alimentar a página `/biblioteca`.  
  * **Autenticação:** Requer token de usuário.

#### **Endpoints de Administrador (Requerem Permissão de Admin)**

* **`POST /api/admin/content`**  
  * **Descrição:** Cria um novo conteúdo no Módulo Learn.  
  * **Autenticação:** Requer permissão de "ADMIN".  
* **`PUT /api/admin/content/[id]`**  
  * **Descrição:** Atualiza um conteúdo existente.  
  * **Autenticação:** Requer permissão de "ADMIN".  
* **`DELETE /api/admin/content/[id]`**  
  * **Descrição:** Remove um conteúdo.  
  * **Autenticação:** Requer permissão de "ADMIN".

*(Endpoints similares de `POST`, `PUT`, `DELETE` existirão para `/api/admin/products` e `/api/admin/categories`)*

