// Serviço centralizado para conexões com a API do CRM
import { 
  Produto, 
  Categoria, 
  Cliente, 
  Pedido, 
  Estoque, 
  RelatorioVendas, 
  RelatorioProdutos, 
  Webhook,
  ApiResponse,
  FiltrosProduto,
  FiltrosPedido,
  FiltrosCliente
} from './types/crm';

class CRMService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.CRM_API_URL || 'http://localhost:5010';
    
    if (!this.baseURL) {
      console.warn('CRM_API_URL não configurada no arquivo .env');
    }
  }

  // Headers padrão para todas as requisições
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // Método genérico para fazer requisições
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.baseURL) {
      throw new Error('CRM_API_URL não configurada');
    }

    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição para o CRM:', error);
      throw error;
    }
  }

  // ===== MÉTODOS PARA PRODUTOS =====
  
  // ✅ NOVA ROTA: Produtos em alta da sua API externa
  async getLatestProducts(limit: number = 10): Promise<ApiResponse<any>> {
    return this.request<any>(`/api/products/latest/latest-products?limit=${limit}`);
  }
  
  // Buscar todos os produtos
  async getProdutos(params?: FiltrosProduto): Promise<ApiResponse<Produto[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.categoria) queryParams.append('categoria', params.categoria);
    if (params?.subcategoria) queryParams.append('subcategoria', params.subcategoria);
    if (params?.precoMin) queryParams.append('precoMin', params.precoMin.toString());
    if (params?.precoMax) queryParams.append('precoMax', params.precoMax.toString());
    if (params?.ativo !== undefined) queryParams.append('ativo', params.ativo.toString());
    if (params?.busca) queryParams.append('busca', params.busca);
    
    const query = queryParams.toString();
    const endpoint = `/produtos${query ? `?${query}` : ''}`;
    
    return this.request<ApiResponse<Produto[]>>(endpoint);
  }

  // Buscar produto por ID
  async getProdutoPorId(id: string): Promise<ApiResponse<Produto>> {
    return this.request<ApiResponse<Produto>>(`/produtos/${id}`);
  }

  // Criar novo produto
  async criarProduto(dados: Partial<Produto>): Promise<ApiResponse<Produto>> {
    return this.request<ApiResponse<Produto>>('/produtos', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }

  // Atualizar produto
  async atualizarProduto(id: string, dados: Partial<Produto>): Promise<ApiResponse<Produto>> {
    return this.request<ApiResponse<Produto>>(`/produtos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  }

  // Deletar produto
  async deletarProduto(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/produtos/${id}`, {
      method: 'DELETE',
    });
  }

  // ===== MÉTODOS PARA CATEGORIAS =====
  
  async getCategorias(): Promise<ApiResponse<Categoria[]>> {
    return this.request<ApiResponse<Categoria[]>>('/categorias');
  }

  async getCategoriaPorId(id: string): Promise<ApiResponse<Categoria>> {
    return this.request<ApiResponse<Categoria>>(`/categorias/${id}`);
  }

  // Método específico para o Multiverso Store
  async getCategoriasMultiverso(): Promise<ApiResponse<Categoria[]>> {
    return this.request<ApiResponse<Categoria[]>>('/multiversostore/categories');
  }

  // ===== MÉTODOS PARA PEDIDOS =====
  
  async getPedidos(params?: FiltrosPedido): Promise<ApiResponse<Pedido[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.clienteId) queryParams.append('clienteId', params.clienteId);
    if (params?.dataInicio) queryParams.append('dataInicio', params.dataInicio);
    if (params?.dataFim) queryParams.append('dataFim', params.dataFim);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    const endpoint = `/pedidos${query ? `?${query}` : ''}`;
    
    return this.request<ApiResponse<Pedido[]>>(endpoint);
  }

  async getPedidoPorId(id: string): Promise<ApiResponse<Pedido>> {
    return this.request<ApiResponse<Pedido>>(`/pedidos/${id}`);
  }

  async criarPedido(dados: Partial<Pedido>): Promise<ApiResponse<Pedido>> {
    return this.request<ApiResponse<Pedido>>('/pedidos', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }

  async atualizarStatusPedido(id: string, status: Pedido['status']): Promise<ApiResponse<Pedido>> {
    return this.request<ApiResponse<Pedido>>(`/pedidos/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // ===== MÉTODOS PARA CLIENTES =====
  
  async getClientes(params?: FiltrosCliente): Promise<ApiResponse<Cliente[]>> {
    const queryParams = new URLSearchParams();
    if (params?.email) queryParams.append('email', params.email);
    if (params?.telefone) queryParams.append('telefone', params.telefone);
    if (params?.nome) queryParams.append('nome', params.nome);
    if (params?.ativo !== undefined) queryParams.append('ativo', params.ativo.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    const endpoint = `/clientes${query ? `?${query}` : ''}`;
    
    return this.request<ApiResponse<Cliente[]>>(endpoint);
  }

  async getClientePorId(id: string): Promise<ApiResponse<Cliente>> {
    return this.request<ApiResponse<Cliente>>(`/clientes/${id}`);
  }

  async criarCliente(dados: Partial<Cliente>): Promise<ApiResponse<Cliente>> {
    return this.request<ApiResponse<Cliente>>('/clientes', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  }

  async atualizarCliente(id: string, dados: Partial<Cliente>): Promise<ApiResponse<Cliente>> {
    return this.request<ApiResponse<Cliente>>(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  }

  // ===== MÉTODOS PARA ESTOQUE =====
  
  async getEstoque(produtoId?: string): Promise<ApiResponse<Estoque | Estoque[]>> {
    const endpoint = produtoId ? `/estoque/${produtoId}` : '/estoque';
    return this.request<ApiResponse<Estoque | Estoque[]>>(endpoint);
  }

  async atualizarEstoque(produtoId: string, quantidade: number): Promise<ApiResponse<Estoque>> {
    return this.request<ApiResponse<Estoque>>(`/estoque/${produtoId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantidade }),
    });
  }

  // ===== MÉTODOS PARA RELATÓRIOS =====
  
  async getRelatorioVendas(dataInicio: string, dataFim: string): Promise<ApiResponse<RelatorioVendas>> {
    return this.request<ApiResponse<RelatorioVendas>>(`/relatorios/vendas?dataInicio=${dataInicio}&dataFim=${dataFim}`);
  }

  async getRelatorioProdutos(): Promise<ApiResponse<RelatorioProdutos>> {
    return this.request<ApiResponse<RelatorioProdutos>>('/relatorios/produtos');
  }

  // ===== MÉTODOS PARA WEBHOOKS =====
  
  async configurarWebhook(url: string, eventos: string[]): Promise<ApiResponse<Webhook>> {
    return this.request<ApiResponse<Webhook>>('/webhooks', {
      method: 'POST',
      body: JSON.stringify({ url, eventos }),
    });
  }

  // ===== MÉTODOS DE UTILIDADE =====
  
  // Verificar se a API está funcionando
  async healthCheck(): Promise<boolean> {
    try {
      await this.request('/health');
      return true;
    } catch {
      return false;
    }
  }

  // Obter informações da API
  async getInfo(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/info');
  }
}

// Exportar uma instância única (Singleton)
export const crmService = new CRMService();

// Exportar a classe também para casos onde você queira criar múltiplas instâncias
export default CRMService;
