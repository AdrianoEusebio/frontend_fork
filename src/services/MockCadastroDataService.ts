export interface EquipmentType {
  value: string;
  label: string;
}

export interface Company {
  value: string;
  label: string;
}

export interface CostCenter {
  value: string;
  label: string;
}

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

export const equipmentTypes: EquipmentType[] = [
  { value: 'ferramentas', label: 'Ferramentas' },
  { value: 'maquinas', label: 'Máquinas' },
  { value: 'veiculos', label: 'Veículos' },
  { value: 'equipamentos-ti', label: 'Equipamentos de TI' },
  { value: 'moveis', label: 'Móveis' }
];

export const companies: Company[] = [
  { value: 'empresa-1', label: 'Empresa Principal' },
  { value: 'empresa-2', label: 'Filial São Paulo' },
  { value: 'empresa-3', label: 'Filial Rio de Janeiro' },
  { value: 'empresa-4', label: 'Filial Belo Horizonte' }
];

export const costCenters: CostCenter[] = [
  { value: 'cc-001', label: 'Administração' },
  { value: 'cc-002', label: 'Produção' },
  { value: 'cc-003', label: 'Comercial' },
  { value: 'cc-004', label: 'Logística' },
  { value: 'cc-005', label: 'TI' }
];

export const revenueCenters: CostCenter[] = [
  { value: 'rc-001', label: 'Vendas Norte' },
  { value: 'rc-002', label: 'Vendas Sul' },
  { value: 'rc-003', label: 'Vendas Leste' },
  { value: 'rc-004', label: 'Vendas Oeste' },
  { value: 'rc-005', label: 'E-commerce' }
];

export const mockProductCategories: ProductCategory[] = [
  {
    id: '1',
    equipmentType: 'ferramentas',
    description: 'Ferramentas Manuais',
    company: 'empresa-1',
    costCenter: 'cc-002',
    revenueCenter: 'rc-001',
    printEquipmentReport: false,
    generateSerialNumber: true
  },
  {
    id: '2',
    equipmentType: 'maquinas',
    description: 'Máquinas Industriais',
    company: 'empresa-1',
    costCenter: 'cc-002',
    revenueCenter: 'rc-001',
    printEquipmentReport: true,
    generateSerialNumber: true
  }
];
