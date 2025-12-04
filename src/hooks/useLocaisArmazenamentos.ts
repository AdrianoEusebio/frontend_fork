import { useState, useEffect } from 'react';
import { 
  getAllStorageLocations, 
  deleteStorageLocation, 
  searchStorageLocations 
} from '@/services/LocaisArmazenamentoService';
import { LocalArmazenamento, StorageLocationFilters } from '@/services/LocaisArmazenamentoTypes';

export const useStorageLocations = () => {
  const [storageLocations, setStorageLocations] = useState<LocalArmazenamento[]>([]);
  const [filters, setFilters] = useState<StorageLocationFilters>({
    descricao: '',
    codigo: '',
    tipoArmazenamento: '',
  });
  const [loading, setLoading] = useState(true);

  // Carregar dados iniciais
  useEffect(() => {
    loadStorageLocations();
  }, []);
  
  const loadStorageLocations = () => {
    setLoading(true);
    try {
      const data = getAllStorageLocations();
      setStorageLocations(data);
    } catch (error) {
      console.error('Erro ao carregar locais de armazenamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<StorageLocationFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      descricao: '',
      codigo: '',
      tipoArmazenamento: '',
    });
    loadStorageLocations();
  };

  const handleSearch = () => {
    setLoading(true);
    try {
      const filteredData = searchStorageLocations({
        descricao: filters.descricao,
        codigo: filters.codigo,
        tipoArmazenamento: filters.tipoArmazenamento,
      });
      setStorageLocations(filteredData);
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este local de armazenamento?')) {
      const success = deleteStorageLocation(id);
      if (success) {
        alert('Local excluído com sucesso!');
        loadStorageLocations(); // Recarregar a lista
      } else {
        alert('Erro ao excluir local de armazenamento.');
      }
    }
  };

  return {
    storageLocations,
    filters,
    loading,
    updateFilters,
    clearFilters,
    handleSearch,
    handleDelete,
    loadStorageLocations,
  };
};