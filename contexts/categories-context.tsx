'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCategoriesMonitor, Categoria } from '@/hooks/use-categories-monitor';

interface CategoriesContextType {
  // Estado das categorias
  categorias: Categoria[];
  isLoading: boolean;
  error: Error | null;
  lastUpdate: Date | null;
  isMonitoring: boolean;
  
  // Funções de controle
  startMonitoring: () => void;
  stopMonitoring: () => void;
  refreshCategorias: () => void;
  updatePollingInterval: (newInterval: number) => void;
  
  // Utilitários
  hasCategories: boolean;
  totalCategories: number;
  getCategoriasByLevel: (level: number) => Categoria[];
  getCategoriaById: (id: string) => Categoria | null;
  
  // Funções específicas para o navbar
  getCategoriasPrincipais: () => Categoria[];
  getSubcategorias: (categoriaId: string) => Categoria[];
  getCategoriaCompleta: (categoriaId: string) => Categoria | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

interface CategoriesProviderProps {
  children: ReactNode;
  pollingInterval?: number;
  autoStart?: boolean;
}

export function CategoriesProvider({ 
  children, 
  pollingInterval = 30000, // 30 segundos por padrão
  autoStart = true 
}: CategoriesProviderProps) {
  const {
    categorias,
    isLoading,
    error,
    lastUpdate,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    refreshCategorias,
    updatePollingInterval,
    hasCategories,
    totalCategories,
    getCategoriasByLevel,
    getCategoriaById
  } = useCategoriesMonitor({
    pollingInterval,
    autoStart,
    onUpdate: (categorias) => {
      console.log('🔄 Categorias atualizadas:', categorias.length, 'categorias encontradas');
    },
    onError: (error) => {
      console.error('❌ Erro ao buscar categorias:', error.message);
    }
  });

  // Função para obter apenas as categorias principais (level 0)
  const getCategoriasPrincipais = () => {
    return getCategoriasByLevel(0);
  };

  // Função para obter subcategorias de uma categoria específica
  const getSubcategorias = (categoriaId: string) => {
    const categoria = getCategoriaById(categoriaId);
    return categoria ? categoria.children : [];
  };

  // Função para obter uma categoria completa com todas as suas subcategorias
  const getCategoriaCompleta = (categoriaId: string) => {
    return getCategoriaById(categoriaId);
  };

  const value: CategoriesContextType = {
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
    
    // Funções específicas para o navbar
    getCategoriasPrincipais,
    getSubcategorias,
    getCategoriaCompleta
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useCategories() {
  const context = useContext(CategoriesContext);
  
  if (context === undefined) {
    throw new Error('useCategories deve ser usado dentro de um CategoriesProvider');
  }
  
  return context;
}

// Hook para usar apenas as categorias (sem as funções de controle)
export function useCategoriesData() {
  const { categorias, isLoading, error, hasCategories } = useCategories();
  return { categorias, isLoading, error, hasCategories };
}

// Hook para usar apenas as funções de controle
export function useCategoriesControl() {
  const { 
    startMonitoring, 
    stopMonitoring, 
    refreshCategorias, 
    updatePollingInterval,
    isMonitoring 
  } = useCategories();
  
  return { 
    startMonitoring, 
    stopMonitoring, 
    refreshCategorias, 
    updatePollingInterval,
    isMonitoring 
  };
}
