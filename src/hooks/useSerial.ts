import { useState, useMemo } from 'react';

export interface Serial {
  id: string;
  produto: string;
  serial: string;
  serialFabricante: string;
  status: 'Ativo' | 'Inativo';
}

const mockSerialData: Serial[] = [
  { id: 'REGISTRO 1', produto: 'PRODUTO 1', serial: 'SERIAL 1', serialFabricante: 'SERIAL DO FABRICANTE 1', status: 'Ativo' },
  { id: 'REGISTRO 2', produto: 'PRODUTO 2', serial: 'SERIAL 2', serialFabricante: 'SERIAL DO FABRICANTE 2', status: 'Ativo' },
  { id: 'REGISTRO 3', produto: 'PRODUTO 3', serial: 'SERIAL 3', serialFabricante: 'SERIAL DO FABRICANTE 3', status: 'Inativo' },
  { id: 'REGISTRO 4', produto: 'PRODUTO 4', serial: 'SERIAL 4', serialFabricante: 'SERIAL DO FABRICANTE 4', status: 'Ativo' },
  { id: 'REGISTRO 5', produto: 'PRODUTO 5', serial: 'SERIAL 5', serialFabricante: 'SERIAL DO FABRICANTE 5', status: 'Ativo' },
  { id: 'REGISTRO 6', produto: 'PRODUTO 6', serial: 'SERIAL 6', serialFabricante: 'SERIAL DO FABRICANTE 6', status: 'Inativo' },
  { id: 'REGISTRO 7', produto: 'PRODUTO 7', serial: 'SERIAL 7', serialFabricante: 'SERIAL DO FABRICANTE 7', status: 'Ativo' },
  { id: 'REGISTRO 8', produto: 'PRODUTO 8', serial: 'SERIAL 8', serialFabricante: 'SERIAL DO FABRICANTE 8', status: 'Ativo' },
  { id: 'REGISTRO 9', produto: 'PRODUTO 9', serial: 'SERIAL 9', serialFabricante: 'SERIAL DO FABRICANTE 9', status: 'Inativo' },
  { id: 'REGISTRO 10', produto: 'PRODUTO 10', serial: 'SERIAL 10', serialFabricante: 'SERIAL DO FABRICANTE 10', status: 'Ativo' },
];

export interface SerialFilters {
  id: string;
  equipamento: string;
  serial: string;
  serialFabricante: string;
  status: 'Todos' | 'Ativo' | 'Inativo';
}

export const useSerialData = () => {
  const [data] = useState<Serial[]>(mockSerialData);
  const [filters, setFilters] = useState<SerialFilters>({
    id: '',
    equipamento: '',
    serial: '',
    serialFabricante: '',
    status: 'Todos',
  });

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (filters.id && !item.id.toLowerCase().includes(filters.id.toLowerCase())) {
        return false;
      }
      if (filters.equipamento && !item.produto.toLowerCase().includes(filters.equipamento.toLowerCase())) {
        return false;
      }
      if (filters.serial && !item.serial.toLowerCase().includes(filters.serial.toLowerCase())) {
        return false;
      }
      if (filters.serialFabricante && !item.serialFabricante.toLowerCase().includes(filters.serialFabricante.toLowerCase())) {
        return false;
      }
      if (filters.status !== 'Todos' && item.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [data, filters]);

  const clearFilters = () => {
    setFilters({
      id: '',
      equipamento: '',
      serial: '',
      serialFabricante: '',
      status: 'Todos',
    });
  };

  const updateFilter = (key: keyof SerialFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    data: filteredData,
    filters,
    updateFilter,
    clearFilters,
  };
};
