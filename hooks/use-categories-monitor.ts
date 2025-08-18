import { useState, useEffect, useCallback, useRef } from 'react';
import { crmService } from '@/lib/crm-service';

// Interface específica para categorias do Multiverso Store
export interface CategoriaMultiverso {
  id: string;
  name: string;
  level: number;
  productCount: number;
  children: CategoriaMultiverso[];
}

export interface CategoriasResponse {
  success: boolean;
  data: CategoriaMultiverso[];
  total: number;
  timestamp: string;
}

interface UseCategoriesMonitorOptions {
  pollingInterval?: number; // Intervalo em milissegundos (padrão: 30 segundos)
  autoStart?: boolean; // Se deve começar a monitorar automaticamente
           onUpdate?: (categorias: CategoriaMultiverso[]) => void; // Callback quando as categorias são atualizadas
  onError?: (error: Error) => void; // Callback para erros
}

export function useCategoriesMonitor(options: UseCategoriesMonitorOptions = {}) {
  const {
    pollingInterval = 30000, // 30 segundos por padrão
    autoStart = true,
    onUpdate,
    onError
  } = options;

  const [categorias, setCategorias] = useState<CategoriaMultiverso[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Função para buscar categorias
  const fetchCategorias = useCallback(async () => {
    if (isLoading) return; // Evita múltiplas requisições simultâneas

    setIsLoading(true);
    setError(null);

    try {
      // Criar um novo AbortController para esta requisição
      abortControllerRef.current = new AbortController();
      
      // Usar o crmService para buscar categorias do Multiverso Store
      const data = await crmService.getCategoriasMultiverso();
      
      if (data.success && data.data) {
        // Fazer cast para o tipo correto
        const categoriasMultiverso = data.data as unknown as CategoriaMultiverso[];
        setCategorias(categoriasMultiverso);
        setLastUpdate(new Date());
        
        // Chamar callback de atualização se fornecido
        if (onUpdate) {
          onUpdate(categoriasMultiverso);
        }
      } else {
        throw new Error(data.message || 'Erro ao buscar categorias');
      }
    } catch (err) {
      // Ignorar erros de abort
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      
      // Chamar callback de erro se fornecido
      if (onError) {
        onError(error);
      }
      
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onUpdate, onError]);

  // Função para iniciar o monitoramento
  const startMonitoring = useCallback(() => {
    if (isMonitoring || intervalRef.current) return; // Evita múltiplas inicializações

    setIsMonitoring(true);
    
    // Fazer a primeira busca imediatamente
    fetchCategorias();
    
    // Configurar o intervalo de polling
    intervalRef.current = setInterval(() => {
      fetchCategorias();
    }, pollingInterval);
  }, [isMonitoring, fetchCategorias, pollingInterval]);

  // Função para parar o monitoramento
  const stopMonitoring = useCallback(() => {
    if (!isMonitoring) return; // Evita parar se já não estiver monitorando
    
    setIsMonitoring(false);
    
    // Limpar o intervalo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Abortar requisições em andamento
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []); // Remover isMonitoring das dependências

  // Função para forçar uma atualização manual
  const refreshCategorias = useCallback(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  // Função para alterar o intervalo de polling
  const updatePollingInterval = useCallback((newInterval: number) => {
    if (isMonitoring && newInterval !== pollingInterval) {
      stopMonitoring();
      setTimeout(() => {
        startMonitoring();
      }, 100);
    }
  }, [isMonitoring, stopMonitoring, startMonitoring, pollingInterval]);

  // Efeito para iniciar/parar o monitoramento
  useEffect(() => {
    if (autoStart) {
      console.log('🚀 Iniciando monitoramento de categorias...');
      startMonitoring();
    }

    // Cleanup ao desmontar
    return () => {
      if (isMonitoring) {
        console.log('🛑 Parando monitoramento de categorias...');
        stopMonitoring();
      }
    };
  }, [autoStart, startMonitoring, stopMonitoring]); // Remover isMonitoring das dependências

  // Efeito para limpar o intervalo quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  return {
    // Estado
    categorias,
    isLoading,
    error,
    lastUpdate,
    isMonitoring,
    
    // Funções
    startMonitoring,
    stopMonitoring,
    refreshCategorias,
    updatePollingInterval,
    
    // Utilitários
    hasCategories: categorias.length > 0,
    totalCategories: categorias.length,
    getCategoriasByLevel: (level: number) => categorias.filter(cat => cat.level === level),
         getCategoriaById: (id: string) => {
       const findCategoria = (cats: CategoriaMultiverso[]): CategoriaMultiverso | null => {
         for (const cat of cats) {
           if (cat.id === id) return cat;
           if (cat.children.length > 0) {
             const found = findCategoria(cat.children);
             if (found) return found;
           }
         }
         return null;
       };
       return findCategoria(categorias);
     }
  };
}
