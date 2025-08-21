# 🎨 Implementação das Fontes Gotham - Multiverso Estúdio

## 📋 Visão Geral

Este projeto foi completamente configurado para usar a família de fontes **Gotham** em todo o sistema. A fonte Gotham é uma tipografia moderna e elegante que transmite profissionalismo e sofisticação, perfeita para a identidade visual do Multiverso Estúdio.

## 🚀 Como Usar

### 1. **Classes CSS Nativas (Recomendado)**

```css
/* Pesos de fonte disponíveis */
font-thin        /* 100 - Gotham Thin */
font-extralight  /* 200 - Gotham ExtraLight */
font-light       /* 300 - Gotham Light */
font-normal      /* 400 - Gotham Book */
font-medium      /* 500 - Gotham Medium */
font-semibold    /* 600 - Gotham SemiBold (fallback) */
font-bold        /* 700 - Gotham Bold */
font-extrabold   /* 800 - Gotham Ultra */
font-black       /* 900 - Gotham Black */
```

### 2. **Classes Utilitárias Personalizadas**

```css
/* Classes específicas para Gotham */
.font-gotham
.font-gotham-light
.font-gotham-book
.font-gotham-medium
.font-gotham-bold
.font-gotham-black
```

### 3. **Exemplos de Uso**

```tsx
// Títulos principais
<h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black">
  TÍTULO PRINCIPAL
</h1>

// Subtítulos
<h2 className="text-2xl font-bold text-gray-800">
  Subtítulo em Gotham Bold
</h2>

// Texto do corpo
<p className="text-base font-normal leading-7 text-gray-700">
  Texto do corpo em Gotham Book
</p>

// Texto destacado
<span className="font-medium text-black">
  Texto destacado em Gotham Medium
</span>

// Texto fino
<p className="text-sm font-light text-gray-500">
  Texto fino em Gotham Light
</p>
```

## 🔧 Configuração Técnica

### **Arquivos de Fonte**

As fontes estão localizadas em `/public/font/` e incluem:

- **Gotham-Book.otf** - Peso normal (400)
- **Gotham-Medium.otf** - Peso médio (500)
- **Gotham-Bold.otf** - Peso negrito (700)
- **Gotham-Black.otf** - Peso extra negrito (900)
- **Gotham-Light.otf** - Peso leve (300)
- **Gotham-Ultra.otf** - Peso ultra (800)
- **Gotham-ExtraLight.otf** - Peso extra leve (200)
- **Gotham-Thin.otf** - Peso fino (100)

### **Variações Adicionais**

- **Gotham Rounded** - Versões arredondadas
- **Gotham Extra Narrow** - Versões extra estreitas
- **Gotham Narrow** - Versões estreitas

### **Configuração do Tailwind**

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['Gotham', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  gotham: ['Gotham', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
}
```

### **CSS Global**

```css
/* app/globals.css */
@font-face {
  font-family: "Gotham";
  src: url("/font/Gotham-Book.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Fallback automático */
body {
  font-family: "Gotham", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

## 📱 Responsividade

### **Tamanhos de Fonte**

```tsx
// Sistema de tamanhos responsivos
text-xs      /* 12px */
text-sm      /* 14px */
text-base    /* 16px */
text-lg      /* 18px */
text-xl      /* 20px */
text-2xl     /* 24px */
text-3xl     /* 30px */
text-4xl     /* 36px */
text-5xl     /* 48px */
text-6xl     /* 60px */
```

### **Espaçamento de Letras**

```tsx
tracking-tighter  /* -0.05em */
tracking-tight    /* -0.025em */
tracking-normal   /* 0em */
tracking-wide     /* 0.025em */
tracking-wider    /* 0.05em */
tracking-widest   /* 0.1em */
```

## 🎯 Casos de Uso Recomendados

### **Títulos e Cabeçalhos**
- **H1**: `font-black` (900) - Títulos principais
- **H2**: `font-bold` (700) - Subtítulos
- **H3**: `font-semibold` (600) - Seções

### **Texto do Corpo**
- **Parágrafos**: `font-normal` (400) - Texto principal
- **Destaques**: `font-medium` (500) - Informações importantes
- **Legendas**: `font-light` (300) - Texto secundário

### **Elementos de Interface**
- **Botões**: `font-medium` (500) ou `font-bold` (700)
- **Links**: `font-medium` (500)
- **Labels**: `font-medium` (500)

## 🧪 Páginas de Teste

### **1. Teste de Fontes**
- **URL**: `/teste-fontes`
- **Propósito**: Visualizar todas as variações da fonte Gotham

### **2. Verificação de Fontes**
- **URL**: `/verificacao-fontes`
- **Propósito**: Verificar se todas as fontes estão carregando corretamente

## 🔍 Solução de Problemas

### **Fonte não está carregando?**

1. **Verifique os arquivos**: Confirme se os arquivos estão em `/public/font/`
2. **Verifique os caminhos**: Confirme se os caminhos no CSS estão corretos
3. **Cache do navegador**: Limpe o cache ou use modo incógnito
4. **Console do navegador**: Verifique se há erros de carregamento

### **Fonte não está aplicando?**

1. **Classes CSS**: Use as classes corretas (`font-bold`, `font-medium`, etc.)
2. **Especificidade**: Verifique se não há CSS sobrescrevendo
3. **Tailwind**: Confirme se o Tailwind está compilando corretamente

### **Performance**

- **font-display: swap** - Carregamento otimizado
- **Fallbacks** - Fontes do sistema como backup
- **Lazy loading** - Fontes carregadas sob demanda

## 📚 Recursos Adicionais

### **Documentação Oficial**
- [Gotham Font Family](https://www.typography.com/fonts/gotham/overview)
- [Font Loading Best Practices](https://web.dev/font-display/)

### **Ferramentas de Teste**
- [Font Squirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)
- [Google Fonts](https://fonts.google.com/) (para comparação)

## 🎨 Paleta de Cores Recomendada

### **Texto Principal**
- **Preto**: `text-black` - Títulos e texto importante
- **Cinza Escuro**: `text-gray-800` - Subtítulos
- **Cinza Médio**: `text-gray-600` - Texto do corpo
- **Cinza Claro**: `text-gray-400` - Texto secundário

### **Contraste**
- **Fundo Branco**: `bg-white` com `text-black`
- **Fundo Preto**: `bg-black` com `text-white`
- **Fundo Cinza**: `bg-gray-50` com `text-gray-800`

## ✨ Dicas de Design

1. **Hierarquia Visual**: Use diferentes pesos para criar hierarquia
2. **Legibilidade**: Mantenha contraste adequado entre texto e fundo
3. **Consistência**: Use os mesmos pesos para elementos similares
4. **Espaçamento**: Combine com `leading-` para melhor legibilidade

---

**Desenvolvido para o Multiverso Estúdio** 🚀
*Sistema de fontes completo e otimizado para uma experiência visual excepcional.*
