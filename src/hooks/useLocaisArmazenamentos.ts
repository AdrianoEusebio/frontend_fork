import { useState, useMemo } from 'react';
import { StorageLocation, StorageLocationFilters } from '@/services/LocaisArmazenamentoMockData';

const mockData: StorageLocation[] = [
  { id: 1, code: 'CÓDIGO01', description: 'DESCRIÇÃO 1', storageType: 'INTERNO', observation: 'OBSERVAÇÃO 1', accountsOwnStock: true },
  { id: 2, code: 'CÓDIGO02', description: 'DESCRIÇÃO 2', storageType: 'EXTERNO', observation: 'OBSERVAÇÃO 2', accountsOwnStock: false },
  { id: 3, code: 'CÓDIGO03', description: 'DESCRIÇÃO 3', storageType: 'INTERNO', observation: 'OBSERVAÇÃO 3', accountsOwnStock: true },
  { id: 4, code: 'CÓDIGO04', description: 'DESCRIÇÃO 4', storageType: 'EXTERNO', observation: 'OBSERVAÇÃO 4', accountsOwnStock: false },
  { id: 5, code: 'CÓDIGO05', description: 'DESCRIÇÃO 5', storageType: 'INTERNO', observation: 'OBSERVAÇÃO 5', accountsOwnStock: true },
  { id: 6, code: 'CÓDIGO06', description: 'DESCRIÇÃO 6', storageType: 'EXTERNO', observation: 'OBSERVAÇÃO 6', accountsOwnStock: false },
  { id: 7, code: 'CÓDIGO07', description: 'DESCRIÇÃO 7', storageType: 'INTERNO', observation: 'OBSERVAÇÃO 7', accountsOwnStock: true },
  { id: 8, code: 'CÓDIGO08', description: 'DESCRIÇÃO 8', storageType: 'EXTERNO', observation: 'OBSERVAÇÃO 8', accountsOwnStock: false },
  { id: 9, code: 'CÓDIGO09', description: 'DESCRIÇÃO 9', storageType: 'INTERNO', observation: 'OBSERVAÇÃO 9', accountsOwnStock: true },
  { id: 10, code: 'CÓDIGO10', description: 'DESCRIÇÃO 10', storageType: 'EXTERNO', observation: 'OBSERVAÇÃO 10', accountsOwnStock: false },
];

export const useStorageLocations = () => {
  const [storageLocations] = useState<StorageLocation[]>(mockData);
  const [filters, setFilters] = useState<StorageLocationFilters>({
    description: '',
  });

  const filteredLocations = useMemo(() => {
    return storageLocations.filter((location) => {
      const matchesDescription = filters.description
        ? location.description.toLowerCase().includes(filters.description.toLowerCase())
        : true;

      return matchesDescription;
    });
  }, [storageLocations, filters]);

  const updateFilters = (newFilters: Partial<StorageLocationFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({ description: '' });
  };

  const handleDelete = (id: number) => {
    console.log('Delete location:', id);
  };

  return {
    storageLocations: filteredLocations,
    filters,
    updateFilters,
    clearFilters,
    handleDelete,
  };
};
