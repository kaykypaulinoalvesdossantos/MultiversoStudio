# Sistema de Categorias Monitoradas - Multiverso E-commerce

Este sistema monitora automaticamente a rota `/multiversostore/categories` da sua API do CRM e atualiza o navbar em tempo real.

## 🎯 **O que faz:**

- 🔄 **Monitoramento automático** da API a cada 30 segundos
- 📱 **Navbar responsivo** com categorias e subcategorias
- 🎨 **Dropdowns elegantes** para subcategorias
- 📊 **Contadores de produtos** para cada categoria
- 🚨 **Tratamento de erros** robusto
- ⚡ **Atualização em tempo real** quando o CRM muda

## 📁 **Estrutura dos Arquivos:**

```
lib/
├── hooks/
│   └── use-categories-monitor.ts    # Hook principal de monitoramento
├── contexts/
│   └── categories-context.tsx       # Contexto React global
├── components/
│   ├── categories-navbar.tsx        # Navbar com categorias
│   └── categories-debug.tsx         # Painel de debug
└── app/
    └── layout-with-categories.tsx   # Exemplo de uso
```

## 🚀 **Como Usar:**

### **1. Configurar Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
CRM_API_URL=https://sua-api-crm.com/api
```

### **2. Envolver sua Aplicação**

```tsx
// app/layout.tsx ou app/page.tsx
import { CategoriesProvider } from '@/contexts/categories-context';
import { CategoriesNavbar } from '@/components/categories-navbar';

export default function Layout({ children }) {
  return (
    <CategoriesProvider>
      <div className="min-h-screen">
        <CategoriesNavbar />
        <main>{children}</main>
      </div>
    </CategoriesProvider>
  );
}
```

### **3. Usar em Componentes**

```tsx
import { useCategories } from '@/contexts/categories-context';

function MeuComponente() {
  const { categorias, isLoading, error } = useCategories();
  
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <div>
      {categorias.map(categoria => (
        <div key={categoria.id}>{categoria.name}</div>
      ))}
    </div>
  );
}
```

## 🔧 **Configurações Disponíveis:**

### **CategoriesProvider Options:**

```tsx
<CategoriesProvider 
  pollingInterval={30000}  // 30 segundos (padrão)
  autoStart={true}         // Iniciar automaticamente
>
  {children}
</CategoriesProvider>
```

### **CategoriesNavbar Props:**

```tsx
<CategoriesNavbar 
  showProductCount={true}  // Mostrar contadores de produtos
  maxCategories={8}        // Máximo de categorias no navbar
  className="custom-nav"   // Classes CSS customizadas
/>
```

## 📊 **Estrutura da API Esperada:**

A API deve retornar dados neste formato:

```json
{
  "success": true,
  "data": [
    {
      "id": "categoria-1",
      "name": "Canecas",
      "level": 0,
      "productCount": 15,
      "children": [
        {
          "id": "subcategoria-1",
          "name": "Cerâmica",
          "level": 1,
          "productCount": 8,
          "children": []
        }
      ]
    }
  ],
  "total": 25,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🎛️ **Hooks Disponíveis:**

### **useCategories() - Hook Completo:**

```tsx
const {
  // Estado
  categorias,
  isLoading,
  error,
  lastUpdate,
  isMonitoring,
  
  // Funções de controle
  startMonitoring,
  stopMonitoring,
  refreshCategorias,
  updatePollingInterval,
  
  // Utilitários
  hasCategories,
  totalCategories,
  getCategoriasByLevel,
  getCategoriaById,
  
  // Funções específicas
  getCategoriasPrincipais,
  getSubcategorias,
  getCategoriaCompleta
} = useCategories();
```

### **useCategoriesData() - Apenas Dados:**

```tsx
const { categorias, isLoading, error, hasCategories } = useCategoriesData();
```

### **useCategoriesControl() - Apenas Controles:**

```tsx
const { startMonitoring, stopMonitoring, refreshCategorias } = useCategoriesControl();
```

## 🎨 **Personalização:**

### **Estilos Customizados:**

```tsx
<CategoriesNavbar 
  className="bg-blue-600 text-white"
  showProductCount={false}
  maxCategories={12}
/>
```

### **Intervalo de Polling Personalizado:**

```tsx
<CategoriesProvider pollingInterval={10000}>  {/* 10 segundos */}
  {children}
</CategoriesProvider>
```

### **Callbacks Personalizados:**

```tsx
const { startMonitoring } = useCategories();

useEffect(() => {
  startMonitoring();
}, [startMonitoring]);
```

## 🐛 **Debug e Monitoramento:**

### **Componente de Debug:**

```tsx
import { CategoriesDebug } from '@/components/categories-debug';

// Mostrar painel de debug
<CategoriesDebug show={true} />
```

### **Logs no Console:**

O sistema automaticamente loga:
- ✅ Categorias atualizadas
- ❌ Erros de conexão
- 🔄 Status de monitoramento

## 📱 **Responsividade:**

- **Desktop**: Navbar horizontal com dropdowns
- **Mobile**: Menu colapsável com subcategorias
- **Tablet**: Adaptação automática baseada no tamanho da tela

## 🚨 **Tratamento de Erros:**

- **Erro de rede**: Retry automático no próximo polling
- **Erro da API**: Exibição de mensagem de erro
- **Timeout**: Configurável via AbortController
- **Fallback**: Interface graciosa mesmo com erros

## ⚡ **Performance:**

- **Debouncing**: Evita múltiplas requisições simultâneas
- **Memoização**: Categorias são memoizadas para evitar re-renders
- **Cleanup**: Limpeza automática de intervalos e requisições
- **Lazy Loading**: Carregamento sob demanda

## 🔒 **Segurança:**

- **URLs validadas**: Verificação de URLs antes das requisições
- **Headers seguros**: Apenas headers necessários
- **AbortController**: Cancelamento de requisições pendentes
- **Rate Limiting**: Controle de frequência de requisições

## 📝 **Exemplos de Uso:**

### **Exemplo Básico:**

```tsx
import { CategoriesProvider, CategoriesNavbar } from '@/components';

function App() {
  return (
    <CategoriesProvider>
      <CategoriesNavbar />
      <main>Conteúdo da aplicação</main>
    </CategoriesProvider>
  );
}
```

### **Exemplo com Debug:**

```tsx
import { LayoutWithCategories, CategoriesExample } from '@/app/layout-with-categories';

function App() {
  return (
    <LayoutWithCategories showDebug={true} pollingInterval={15000}>
      <CategoriesExample />
    </LayoutWithCategories>
  );
}
```

### **Exemplo com Controles Personalizados:**

```tsx
import { useCategories } from '@/contexts/categories-context';

function CategoriesManager() {
  const { startMonitoring, stopMonitoring, isMonitoring } = useCategories();
  
  return (
    <div>
      <button onClick={startMonitoring} disabled={isMonitoring}>
        Iniciar Monitoramento
      </button>
      <button onClick={stopMonitoring} disabled={!isMonitoring}>
        Parar Monitoramento
      </button>
    </div>
  );
}
```

## 🎯 **Casos de Uso:**

- **E-commerce**: Navegação por categorias sempre atualizada
- **Dashboard**: Monitoramento de mudanças no CRM
- **Admin**: Controle manual do sistema de categorias
- **Desenvolvimento**: Debug e teste da integração com CRM

## 🚀 **Próximos Passos:**

1. **Configurar** o arquivo `.env.local`
2. **Implementar** o `CategoriesProvider` no layout
3. **Substituir** o navbar atual pelo `CategoriesNavbar`
4. **Testar** a integração com sua API
5. **Personalizar** estilos e comportamentos conforme necessário

---

**🎉 Agora suas categorias são atualizadas automaticamente!** 

O navbar sempre refletirá as mudanças feitas no CRM, sem necessidade de atualizar a página ou fazer deploy manual.
