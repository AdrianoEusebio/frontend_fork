export interface ProductCategory {
  id: string;
  equipmentType: string;
  description: string;
  company: string;
  costCenter: string;
  revenueCenter: string;
  printEquipmentReport: boolean;
  generateSerialNumber: boolean;
  registrationDate?: string;
  registeredBy?: string;
  modificationDate?: string;
  modifiedBy?: string;
}

export const equipmentTypes = [
  { id: '1', name: 'Equipamento Tipo A' },
  { id: '2', name: 'Equipamento Tipo B' },
  { id: '3', name: 'Equipamento Tipo C' },
];

export const companies = [
  { id: '1', name: 'Empresa Alpha' },
  { id: '2', name: 'Empresa Beta' },
  { id: '3', name: 'Empresa Gamma' },
];

export const costCenters = [
  { id: '1', name: 'Centro de Custo 001' },
  { id: '2', name: 'Centro de Custo 002' },
  { id: '3', name: 'Centro de Custo 003' },
];

export const revenueCenters = [
  { id: '1', name: 'Centro de Receita 001' },
  { id: '2', name: 'Centro de Receita 002' },
  { id: '3', name: 'Centro de Receita 003' },
];

export const mockProductCategory: ProductCategory = {
  id: '12 cadastrado',
  equipmentType: '1',
  description: 'Descrição informada',
  company: '1',
  costCenter: '1',
  revenueCenter: '1',
  printEquipmentReport: false,
  generateSerialNumber: true,
  registrationDate: '2024-01-15',
  registeredBy: 'João Silva',
  modificationDate: '2024-03-20',
  modifiedBy: 'Maria Santos',
};
