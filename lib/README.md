# Serviço CRM - Multiverso E-commerce

Este é o serviço centralizado para gerenciar todas as conexões com a API do seu CRM.

## 📁 Estrutura dos Arquivos

```
lib/
├── crm-service.ts          # Serviço principal do CRM
├── types/
│   └── crm.ts             # Tipos TypeScript para as entidades
├── examples/
│   └── crm-usage.ts       # Exemplos de uso
└── README.md               # Este arquivo
```

## 🚀 Como Usar

### 1. Importar o Serviço

```typescript
import { crmService } from '@/lib/crm-service';
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
CRM_API_URL=https://sua-api-crm.com/api
```

**💡 Dica**: Use o arquivo `lib/env-example.txt` como referência para criar seu `.env.local`

### 3. Exemplos de Uso

#### Buscar Produtos
```typescript
// Buscar todos os produtos
const produtos = await crmService.getProdutos({
  page: 1,
  limit: 20,
  categoria: 'camisetas',
  ativo: true
});

// Buscar produto específico
const produto = await crmService.getProdutoPorId('produto-id');
```

#### Gerenciar Clientes
```typescript
// Buscar clientes
const clientes = await crmService.getClientes({
  page: 1,
  limit: 50,
  ativo: true
});

// Criar novo cliente
const novoCliente = await crmService.criarCliente({
  nome: 'João Silva',
  email: 'joao@exemplo.com',
  telefone: '(11) 99999-9999'
});
```

#### Gerenciar Pedidos
```typescript
// Buscar pedidos
const pedidos = await crmService.getPedidos({
  status: 'pendente',
  page: 1,
  limit: 20
});

// Criar novo pedido
const novoPedido = await crmService.criarPedido({
  clienteId: 'cliente-id',
  itens: [{
    produtoId: 'produto-id',
    quantidade: 2,
    precoUnitario: 89.90,
    subtotal: 179.80
  }],
  status: 'pendente',
  total: 194.80
});
```

#### Gerenciar Estoque
```typescript
// Verificar estoque
const estoque = await crmService.getEstoque('produto-id');

// Atualizar estoque
const estoqueAtualizado = await crmService.atualizarEstoque('produto-id', 50);
```

#### Relatórios
```typescript
// Relatório de vendas
const relatorioVendas = await crmService.getRelatorioVendas('2024-01-01', '2024-12-31');

// Relatório de produtos
const relatorioProdutos = await crmService.getRelatorioProdutos();
```

#### Webhooks
```typescript
// Configurar webhook
const webhook = await crmService.configurarWebhook('https://sua-loja.com/webhook', [
  'pedido.criado',
  'pedido.atualizado',
  'produto.atualizado'
]);
```

#### Utilitários
```typescript
// Verificar se a API está funcionando
const isHealthy = await crmService.healthCheck();

// Obter informações da API
const info = await crmService.getInfo();
```

## 🔧 Métodos Disponíveis

### Produtos
- `getProdutos(params?)` - Listar produtos com filtros
- `getProdutoPorId(id)` - Buscar produto por ID
- `criarProduto(dados)` - Criar novo produto
- `atualizarProduto(id, dados)` - Atualizar produto
- `deletarProduto(id)` - Deletar produto

### Categorias
- `getCategorias()` - Listar categorias
- `getCategoriaPorId(id)` - Buscar categoria por ID

### Clientes
- `getClientes(params?)` - Listar clientes com filtros
- `getClientePorId(id)` - Buscar cliente por ID
- `criarCliente(dados)` - Criar novo cliente
- `atualizarCliente(id, dados)` - Atualizar cliente

### Pedidos
- `getPedidos(params?)` - Listar pedidos com filtros
- `getPedidoPorId(id)` - Buscar pedido por ID
- `criarPedido(dados)` - Criar novo pedido
- `atualizarStatusPedido(id, status)` - Atualizar status do pedido

### Estoque
- `getEstoque(produtoId?)` - Verificar estoque
- `atualizarEstoque(produtoId, quantidade)` - Atualizar quantidade

### Relatórios
- `getRelatorioVendas(dataInicio, dataFim)` - Relatório de vendas
- `getRelatorioProdutos()` - Relatório de produtos

### Webhooks
- `configurarWebhook(url, eventos)` - Configurar webhook

### Utilitários
- `healthCheck()` - Verificar saúde da API
- `getInfo()` - Obter informações da API

## 📊 Estrutura de Resposta

Todos os métodos retornam uma resposta padronizada:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

## 🛡️ Tratamento de Erros

O serviço inclui tratamento de erros robusto:

```typescript
try {
  const response = await crmService.getProdutos();
  
  if (response.success && response.data) {
    // Sucesso - usar response.data
    console.log(response.data);
  } else {
    // Erro da API
    console.error(response.message);
  }
} catch (error) {
  // Erro de rede ou exceção
  console.error('Erro na requisição:', error);
}
```

## 🔒 Segurança

- ✅ URL da API armazenada em variáveis de ambiente
- ✅ Headers de conteúdo automáticos
- ✅ Validação de URLs e parâmetros
- ✅ Tratamento de erros de conexão

## 📝 Notas Importantes

1. **Sempre** verifique se `response.success` é `true` antes de usar `response.data`
2. **Nunca** commite o arquivo `.env.local` no Git
3. Use `Partial<T>` para dados opcionais ao criar/atualizar entidades
4. O serviço é um Singleton - use `crmService` diretamente
5. Todos os métodos são assíncronos e retornam Promises
6. **Sem autenticação**: O serviço se conecta diretamente à API sem chaves de acesso

## 🚨 Troubleshooting

### Erro: "CRM_API_URL não configurada"
- Verifique se o arquivo `.env.local` existe
- Confirme se `CRM_API_URL` está definida

### Erro de CORS
- Verifique se sua API do CRM permite requisições do domínio da sua loja
- Confirme se o servidor está configurado para aceitar requisições externas

### Erro de Conexão
- Verifique se a URL da API está correta
- Confirme se o servidor do CRM está rodando
- Teste a URL diretamente no navegador ou Postman

## 📚 Exemplos Completos

Veja o arquivo `examples/crm-usage.ts` para exemplos mais detalhados de uso.
