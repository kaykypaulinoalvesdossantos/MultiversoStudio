// Tipos para as entidades do CRM

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoPromocional?: number;
  categoria: string;
  subcategoria?: string;
  imagens: string[];
  estoque: number;
  ativo: boolean;
  tags?: string[];
  peso?: number;
  dimensoes?: {
    comprimento: number;
    largura: number;
    altura: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
  slug: string;
  imagem?: string;
  ativa: boolean;
  ordem?: number;
  categoriaPai?: string;
  subcategorias?: Categoria[];
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  dataNascimento?: string;
  endereco?: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pedido {
  id: string;
  numero: string;
  clienteId: string;
  cliente?: Cliente;
  itens: PedidoItem[];
  status: 'pendente' | 'confirmado' | 'preparando' | 'enviado' | 'entregue' | 'cancelado';
  subtotal: number;
  frete: number;
  desconto: number;
  total: number;
  formaPagamento: string;
  enderecoEntrega: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PedidoItem {
  produtoId: string;
  produto?: Produto;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Estoque {
  produtoId: string;
  quantidade: number;
  quantidadeMinima: number;
  ultimaAtualizacao: string;
}

export interface RelatorioVendas {
  periodo: {
    inicio: string;
    fim: string;
  };
  totalVendas: number;
  totalPedidos: number;
  mediaTicket: number;
  produtosMaisVendidos: Array<{
    produtoId: string;
    nome: string;
    quantidade: number;
    total: number;
  }>;
  vendasPorDia: Array<{
    data: string;
    vendas: number;
    pedidos: number;
  }>;
}

export interface RelatorioProdutos {
  totalProdutos: number;
  produtosAtivos: number;
  produtosInativos: number;
  produtosSemEstoque: number;
  categorias: Array<{
    nome: string;
    quantidade: number;
  }>;
}

export interface Webhook {
  id: string;
  url: string;
  eventos: string[];
  ativo: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
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

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FiltrosProduto extends PaginationParams {
  categoria?: string;
  subcategoria?: string;
  precoMin?: number;
  precoMax?: number;
  ativo?: boolean;
  busca?: string;
}

export interface FiltrosPedido extends PaginationParams {
  status?: string;
  clienteId?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface FiltrosCliente extends PaginationParams {
  nome?: string;
  email?: string;
  telefone?: string;
  ativo?: boolean;
}
