import { useState, useEffect } from 'react';
import { TiposProdutoService, TipoProduto } from '@/services/ProductTypeMockDataService';

export const useTiposProduto = () => {
  const [tipos, setTipos] = useState<TipoProduto[]>([]);

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = () => {
    const data = TiposProdutoService.getTipos();
    setTipos(data);
  };

  const filterTipos = (codigo?: string, descricao?: string) => {
    const filtered = TiposProdutoService.filterTipos(codigo, descricao);
    setTipos(filtered);
  };

  const clearFilters = () => {
    loadTipos();
  };

  return {
    tipos,
    filterTipos,
    clearFilters,
  };
};
