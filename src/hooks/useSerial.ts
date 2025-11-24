import { useState, useMemo, useEffect } from 'react';
import { Serial, SerialFilters, SerialService } from '@/services/SerialService';
import { ProductService } from '@/services/ProductService';

export const useSerialData = () => {
  const [data, setData] = useState<Serial[]>([]);
  const [filters, setFilters] = useState<SerialFilters>({
    id: '',
    equipamento: '',
    serial: '',
    serialFabricante: '',
    status: 'Todos',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const seriais = SerialService.getSeriais();
    setData(seriais);
  };

  const filteredData = useMemo(() => {
    return SerialService.filterSeriais(filters);
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

  const createSerial = (serialData: Omit<Serial, 'id'>) => {
    const newSerial = SerialService.createSerial(serialData);
    loadData();
    return newSerial;
  };

  const updateSerial = (id: string, serialData: Partial<Serial>) => {
    const updatedSerial = SerialService.updateSerial(id, serialData);
    if (updatedSerial) {
      loadData();
    }
    return updatedSerial;
  };

  const deleteSerial = (id: string) => {
    const success = SerialService.deleteSerial(id);
    if (success) {
      loadData();
    }
    return success;
  };

  const getSerial = (id: string) => {
    return SerialService.getSerialById(id);
  };

  const getProducts = () => {
    return ProductService.getProducts();
  };

  return {
    data: filteredData,
    filters,
    updateFilter,
    clearFilters,
    createSerial,
    updateSerial,
    deleteSerial,
    getSerial,
    getProducts,
    loadData
  };
};