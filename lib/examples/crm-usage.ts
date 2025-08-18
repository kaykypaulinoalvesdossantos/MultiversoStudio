// Exemplos de como usar o serviço do CRM
import { crmService } from '../crm-service';
import { Produto, Cliente, Pedido } from '../types/crm';

// ===== EXEMPLOS DE PRODUTOS =====

// Buscar todos os produtos
export async function exemploBuscarProdutos() {
  try {
    const response = await crmService.getProdutos({
      page: 1,
      limit: 20,
      categoria: 'camisetas',
      ativo: true
    });

    if (response.success && response.data) {
      console.log('Produtos encontrados:', response.data);
      return response.data;
    } else {
      console.error('Erro ao buscar produtos:', response.message);
      return [];
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return [];
  }
}

// Buscar produto específico
export async function exemploBuscarProduto(id: string) {
  try {
    const response = await crmService.getProdutoPorId(id);
    
    if (response.success && response.data) {
      console.log('Produto encontrado:', response.data);
      return response.data;
    } else {
      console.error('Erro ao buscar produto:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Criar novo produto
export async function exemploCriarProduto() {
  const novoProduto: Partial<Produto> = {
    nome: 'Camiseta Multiverso',
    descricao: 'Camiseta exclusiva da coleção Multiverso',
    preco: 89.90,
    categoria: 'camisetas',
    subcategoria: 'geek',
    imagens: ['https://exemplo.com/imagem1.jpg'],
    estoque: 100,
    ativo: true,
    tags: ['multiverso', 'geek', 'camiseta']
  };

  try {
    const response = await crmService.criarProduto(novoProduto);
    
    if (response.success && response.data) {
      console.log('Produto criado com sucesso:', response.data);
      return response.data;
    } else {
      console.error('Erro ao criar produto:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// ===== EXEMPLOS DE CLIENTES =====

// Buscar clientes
export async function exemploBuscarClientes() {
  try {
    const response = await crmService.getClientes({
      page: 1,
      limit: 50,
      ativo: true
    });

    if (response.success && response.data) {
      console.log('Clientes encontrados:', response.data);
      return response.data;
    } else {
      console.error('Erro ao buscar clientes:', response.message);
      return [];
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return [];
  }
}

// Criar novo cliente
export async function exemploCriarCliente() {
  const novoCliente: Partial<Cliente> = {
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    telefone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    endereco: {
      cep: '01234-567',
      logradouro: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    ativo: true
  };

  try {
    const response = await crmService.criarCliente(novoCliente);
    
    if (response.success && response.data) {
      console.log('Cliente criado com sucesso:', response.data);
      return response.data;
    } else {
      console.error('Erro ao criar cliente:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// ===== EXEMPLOS DE PEDIDOS =====

// Buscar pedidos
export async function exemploBuscarPedidos() {
  try {
    const response = await crmService.getPedidos({
      page: 1,
      limit: 20,
      status: 'pendente'
    });

    if (response.success && response.data) {
      console.log('Pedidos encontrados:', response.data);
      return response.data;
    } else {
      console.error('Erro ao buscar pedidos:', response.message);
      return [];
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return [];
  }
}

// Criar novo pedido
export async function exemploCriarPedido() {
  const novoPedido: Partial<Pedido> = {
    clienteId: 'cliente-id-aqui',
    itens: [
      {
        produtoId: 'produto-id-aqui',
        quantidade: 2,
        precoUnitario: 89.90,
        subtotal: 179.80
      }
    ],
    status: 'pendente',
    subtotal: 179.80,
    frete: 15.00,
    desconto: 0,
    total: 194.80,
    formaPagamento: 'cartao',
    enderecoEntrega: {
      cep: '01234-567',
      logradouro: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP'
    }
  };

  try {
    const response = await crmService.criarPedido(novoPedido);
    
    if (response.success && response.data) {
      console.log('Pedido criado com sucesso:', response.data);
      return response.data;
    } else {
      console.error('Erro ao criar pedido:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// ===== EXEMPLOS DE ESTOQUE =====

// Verificar estoque
export async function exemploVerificarEstoque(produtoId: string) {
  try {
    const response = await crmService.getEstoque(produtoId);
    
    if (response.success && response.data) {
      console.log('Estoque atual:', response.data);
      return response.data;
    } else {
      console.error('Erro ao verificar estoque:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Atualizar estoque
export async function exemploAtualizarEstoque(produtoId: string, novaQuantidade: number) {
  try {
    const response = await crmService.atualizarEstoque(produtoId, novaQuantidade);
    
    if (response.success && response.data) {
      console.log('Estoque atualizado:', response.data);
      return response.data;
    } else {
      console.error('Erro ao atualizar estoque:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// ===== EXEMPLOS DE RELATÓRIOS =====

// Relatório de vendas
export async function exemploRelatorioVendas() {
  const dataInicio = '2024-01-01';
  const dataFim = '2024-12-31';

  try {
    const response = await crmService.getRelatorioVendas(dataInicio, dataFim);
    
    if (response.success && response.data) {
      console.log('Relatório de vendas:', response.data);
      return response.data;
    } else {
      console.error('Erro ao gerar relatório:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// ===== EXEMPLOS DE UTILIDADE =====

// Verificar se a API está funcionando
export async function exemploHealthCheck() {
  try {
    const isHealthy = await crmService.healthCheck();
    
    if (isHealthy) {
      console.log('✅ API do CRM está funcionando');
      return true;
    } else {
      console.log('❌ API do CRM não está funcionando');
      return false;
    }
  } catch (error) {
    console.error('Erro ao verificar saúde da API:', error);
    return false;
  }
}

// Obter informações da API
export async function exemploGetInfo() {
  try {
    const response = await crmService.getInfo();
    
    if (response.success && response.data) {
      console.log('Informações da API:', response.data);
      return response.data;
    } else {
      console.error('Erro ao obter informações:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}
