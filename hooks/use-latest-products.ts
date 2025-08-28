import { useState, useEffect } from 'react';
import { latestProductsService, LatestProductsResponse, LatestProduct } from '@/lib';

export function useLatestProducts(limit: number = 10) {
  const [products, setProducts] = useState<LatestProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchLatestProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await latestProductsService.getLatestProducts(limit);
      
      setProducts(response.products);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
      console.error('Erro ao buscar produtos em alta:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, [limit]);

  const refresh = () => {
    fetchLatestProducts();
  };

  return {
    products,
    loading,
    error,
    total,
    refresh
  };
}
