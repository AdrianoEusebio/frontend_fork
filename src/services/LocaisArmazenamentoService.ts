import { LocalArmazenamento } from '@/services/LocaisArmazenamentoTypes';

// Chave para armazenar no localStorage
const STORAGE_KEY = 'locaisArmazenamento';

// Dados iniciais mockados
const initialData: LocalArmazenamento[] = [
  {
    id: 1,
    codigo: 'CODIGO01',
    tipoArmazenamento: 'deposito',
    ordemEdicao: '1',
    convidadoEstoqueProprio: 'sim',
    descricao: 'DESCRIÇÃO 1',
    observacao: 'OBSERVAÇÃO 1',
    dataCadastro: '2024-01-15',
    usuarioCadastro: 'João Silva',
    dataAlteracao: '2024-03-20',
    usuarioAlteracao: 'Maria Santos',
  },
  {
    id: 2,
    codigo: 'CODIGO02',
    tipoArmazenamento: 'armazem',
    ordemEdicao: '2',
    convidadoEstoqueProprio: 'nao',
    descricao: 'DESCRIÇÃO 2',
    observacao: 'OBSERVAÇÃO 2',
    dataCadastro: '2024-01-16',
    usuarioCadastro: 'Maria Santos',
    dataAlteracao: '2024-03-21',
    usuarioAlteracao: 'João Silva',
  },
  // Adicione mais dados conforme necessário
];

// Inicializa o localStorage com dados mockados se estiver vazio
const initializeData = () => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

// CRUD Operations

export const getAllStorageLocations = (): LocalArmazenamento[] => {
  initializeData();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getStorageLocationById = (id: number): LocalArmazenamento | undefined => {
  const locations = getAllStorageLocations();
  return locations.find(loc => loc.id === id);
};

export const createStorageLocation = (data: Omit<LocalArmazenamento, 'id' | 'dataCadastro' | 'usuarioCadastro' | 'dataAlteracao' | 'usuarioAlteracao'>): LocalArmazenamento => {
  const locations = getAllStorageLocations();
  const newId = locations.length > 0 ? Math.max(...locations.map(loc => loc.id)) + 1 : 1;
  
  const newLocation: LocalArmazenamento = {
    ...data,
    id: newId,
    dataCadastro: new Date().toISOString().split('T')[0],
    usuarioCadastro: 'Usuário Atual', // Em uma aplicação real, pegaria do contexto de autenticação
    dataAlteracao: new Date().toISOString().split('T')[0],
    usuarioAlteracao: 'Usuário Atual',
  };
  
  const updatedLocations = [...locations, newLocation];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocations));
  return newLocation;
};

export const createStorageLocationFromForm = (formData: {
  code: string;
  storageType: string;
  displayOrder: string;
  trackOwnStock: 'sim' | 'nao';
  description: string;
  observation: string;
}): LocalArmazenamento => {
  const locations = getAllStorageLocations();
  const newId = locations.length > 0 ? Math.max(...locations.map(loc => loc.id)) + 1 : 1;
  
  const newLocation: LocalArmazenamento = {
    id: newId,
    codigo: formData.code,
    tipoArmazenamento: formData.storageType,
    ordemEdicao: formData.displayOrder,
    convidadoEstoqueProprio: formData.trackOwnStock,
    descricao: formData.description,
    observacao: formData.observation,
    dataCadastro: new Date().toISOString().split('T')[0],
    usuarioCadastro: 'Usuário Atual', // Em produção, pegaria do contexto de autenticação
    dataAlteracao: new Date().toISOString().split('T')[0],
    usuarioAlteracao: 'Usuário Atual',
  };
  
  const updatedLocations = [...locations, newLocation];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocations));
  return newLocation;
};

export const updateStorageLocation = (id: number, data: Partial<LocalArmazenamento>): LocalArmazenamento | null => {
  const locations = getAllStorageLocations();
  const index = locations.findIndex(loc => loc.id === id);
  
  if (index === -1) return null;
  
  const updatedLocation = {
    ...locations[index],
    ...data,
    id, // Garantir que o ID não seja alterado
    dataAlteracao: new Date().toISOString().split('T')[0],
    usuarioAlteracao: 'Usuário Atual',
  };
  
  locations[index] = updatedLocation;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  return updatedLocation;
};

export const deleteStorageLocation = (id: number): boolean => {
  const locations = getAllStorageLocations();
  const filteredLocations = locations.filter(loc => loc.id !== id);
  
  if (filteredLocations.length === locations.length) {
    return false; // Nenhum item foi removido
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLocations));
  return true;
};

export const searchStorageLocations = (filters: {
  descricao?: string;
  codigo?: string;
  tipoArmazenamento?: string;
}): LocalArmazenamento[] => {
  const locations = getAllStorageLocations();
  
  return locations.filter(location => {
    if (filters.descricao && !location.descricao.toLowerCase().includes(filters.descricao.toLowerCase())) {
      return false;
    }
    if (filters.codigo && !location.codigo.toLowerCase().includes(filters.codigo.toLowerCase())) {
      return false;
    }
    if (filters.tipoArmazenamento && location.tipoArmazenamento !== filters.tipoArmazenamento) {
      return false;
    }
    return true;
  });
};