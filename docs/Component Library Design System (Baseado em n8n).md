### **Component Library / Design System (Baseado em n8n.io)**

A plataforma adotará uma identidade visual inspirada no design system do n8n, caracterizada por um tema escuro, contrastes vibrantes, gradientes e uma estética "futurista".

#### **1\. Paleta de Cores**

* **Fundo Dominante:** Tema escuro, combinando tons de `#0e0918` e `#090f20` com efeitos sutis de partículas.  
* **Cores da Marca:** O rosa (`#EA4B71`), o escuro (`#040506`) e o branco (`#FFFFFF`) serão usados conforme o guia de marca oficial da n8n.  
* **Cores Primárias e Secundárias:** Destaques em rosa/laranja e azul-violeta para CTAs e links, derivados dos tokens `p-color-primary-320` e `p-color-secondary-470`.  
* **Cores de Feedback:** Verde (`#0EAB54`) para sucesso, amarelo (`#BF941F`) para aviso, e vermelho (`#F51F32`) para erro.  
* **Texto:** Uma escala de cinzas que vai do quase preto (`--color-text-dark`) ao branco (`--color-text-xlight`) para garantir contraste e legibilidade.  
* **Gradientes:** Uso intenso de gradientes lineares (azul para violeta) e radiais coloridos para fundos e botões.

#### **2\. Tipografia**

* **Família Principal:** Geomanist, com pesos light (300), regular (400), medium (500) e bold (700).  
* **Fallback Stack:** `ui-sans-serif, system-ui, sans-serif` para garantir consistência.  
* **Uso:** Títulos em peso `medium` ou `bold`; parágrafos e textos corridos em peso `regular`.

#### **3\. Botões (Buttons)**

* **Primário (CTA):** Cor sólida vibrante (laranja-vermelho `#EE4F27`), texto branco, bordas arredondadas (`~8px`) e leve sombra interna. Escurece no `:hover`. O foco via teclado exibe um anel luminoso laranja (`#EE4F27`).  
* **Secundário:** Fundo branco ou transparente com borda e texto coloridos (rosa/cinza).  
* **Highlight (Link):** Fundo e borda transparentes, com o texto mudando de cor no `:hover`.

#### **4\. Cards**

* **Fundo:** Escuro, com gradientes sutis (roxo/azul) e efeitos de halo de luz nas bordas.  
* **Bordas:** Contorno translúcido (azul/roxo) com brilho e cantos bem arredondados (`~16px`).  
* **Sombra:** Suaves e difusas para dar profundidade.

#### **5\. Modais (Modals)**

* **Fundo:** Claro (`p-white`) para se destacar sobre o tema escuro do site.  
* **Overlay:** Fundo translúcido para bloquear a interação com o resto da página.  
* **Transições:** Entrada e saída suaves com animações de opacidade e deslocamento vertical.

### **Animation & Micro-interactions (Animação e Micro-interações)**

* **Princípios de Movimento:** As animações seguirão um princípio de suavidade e sutileza, focadas em guiar o usuário e fornecer feedback visual instantâneo, sem serem distrativas.  
* **Animações Chave:**  
  * **Modais:** Transições de entrada e saída suaves, com animação de opacidade e deslocamento vertical, conforme observado no `n8n.io`.  
  * **Botões e Links:** Efeitos de `:hover` e `:focus` que alteram sutilmente a cor ou o brilho para indicar interatividade.  
  * **Elementos da Página:** Efeitos de fade-in (`.fade-enter-active`) para seções de conteúdo que aparecem conforme o scroll do usuário.  
  * **Gráficos:** Animações de entrada nos gráficos da seção de estatísticas para dar vida aos dados.

### **Responsiveness Strategy (Estratégia de Responsividade)**

* **Abordagem:** Seguiremos uma abordagem **mobile-first**, garantindo uma experiência perfeita em telas pequenas e expandindo o layout para telas maiores.  
* **Breakpoints:** Utilizaremos os breakpoints padrão do TailwindCSS (`sm`, `md`, `lg`, `xl`, `2xl`) para controlar as mudanças de layout.  
* **Padrões de Adaptação:** A navegação do cabeçalho se converterá em um menu "hambúrguer" em dispositivos móveis. Os layouts de grade (como no Skills Shop) se adaptarão para uma única coluna em telas menores.

### **Accessibility Requirements (Requisitos de Acessibilidade)**

* **Padrão de Conformidade:** **WCAG 2.1 Nível AA**.  
* **Requisitos Chave:**  
  * Garantir contraste de cores adequado entre texto e fundo, seguindo a paleta definida.  
  * Toda a interatividade deve ser acessível via teclado.  
  * Implementar indicadores de foco claros e visíveis, como o "anel luminoso" (`--tw-ring-color`) observado no `n8n.io`.  
  * Utilizar HTML semântico e atributos ARIA quando necessário.

### **Performance Considerations (Considerações de Performance)**

* **Metas de Performance:** Visar pontuações "verdes" (90+) no Google PageSpeed Insights para as métricas de Core Web Vitals.  
* **Estratégias de Design e Implementação:**  
  * Otimização automática de imagens através do framework Next.js.  
  * Carregamento otimizado de fontes, utilizando `font-display: swap` para evitar bloqueio de renderização.  
  * Code-splitting automático por rota, uma funcionalidade nativa do Next.js.

