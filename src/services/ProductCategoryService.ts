export interface ProductCategory {
  id: string;
  codigo: string;
  descricao: string;
  desconto: string;
  valorDesconto: string;
  empresa: string;
  centroCusto: string;
  centroReceb: string;
  imprimirRelat: string;
  aplicarAuto: string;
  equipmentType?: string;
  description?: string;
  company?: string;
  costCenter?: string;
  revenueCenter?: string;
  printEquipmentReport?: boolean;
  generateSerialNumber?: boolean;
  registrationDate?: string;
  registeredBy?: string;
  modificationDate?: string;
  modifiedBy?: string;
}

export const equipmentTypes = [
  { value: 'ELET', label: 'ELET - Eletrônicos' },
  { value: 'MOVE', label: 'MOVE - Móveis' },
  { value: 'INSTR', label: 'INSTR - Instrumentos' },
];

export const companies = [
  { value: 'Empresa A', label: 'Empresa A' },
  { value: 'Empresa B', label: 'Empresa B' },
  { value: 'Empresa C', label: 'Empresa C' },
];

export const costCenters = [
  { value: 'Custo A', label: 'Custo A' },
  { value: 'Custo B', label: 'Custo B' },
  { value: 'Custo C', label: 'Custo C' },
];

export const revenueCenters = [
  { value: 'Receb A', label: 'Receb A' },
  { value: 'Receb B', label: 'Receb B' },
  { value: 'Receb C', label: 'Receb C' },
];

const initialData: ProductCategory[] = [
  {
    id: '1',
    codigo: 'ELET',
    descricao: 'Eletrônicos',
    desconto: '10',
    valorDesconto: '100',
    empresa: 'Empresa A',
    centroCusto: 'Custo A',
    centroReceb: 'Receb A',
    imprimirRelat: 'Sim',
    aplicarAuto: 'Sim',
    equipmentType: 'ELET',
    description: 'Eletrônicos',
    company: 'Empresa A',
    costCenter: 'Custo A',
    revenueCenter: 'Receb A',
    printEquipmentReport: true,
    generateSerialNumber: true,
    registrationDate: '2024-01-01',
    registeredBy: 'Admin',
    modificationDate: '2024-01-02',
    modifiedBy: 'Admin'
  },
  {
    id: '2',
    codigo: 'MOVE',
    descricao: 'Móveis',
    desconto: '5',
    valorDesconto: '50',
    empresa: 'Empresa B',
    centroCusto: 'Custo B',
    centroReceb: 'Receb B',
    imprimirRelat: 'Não',
    aplicarAuto: 'Sim',
    equipmentType: 'MOVE',
    description: 'Móveis',
    company: 'Empresa B',
    costCenter: 'Custo B',
    revenueCenter: 'Receb B',
    printEquipmentReport: false,
    generateSerialNumber: true,
    registrationDate: '2024-01-01',
    registeredBy: 'Admin',
    modificationDate: '2024-01-02',
    modifiedBy: 'Admin'
  }
];

const STORAGE_KEY = 'productCategories';

export const ProductCategoryService = {
  getCategories(): ProductCategory[] {
    if (typeof window === 'undefined') return initialData;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  },

  saveCategories(categories: ProductCategory[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  },

  createCategory(category: Omit<ProductCategory, 'id'>): ProductCategory {
    const categories = this.getCategories();
    const newId = categories.length > 0 ? (Math.max(...categories.map(c => parseInt(c.id))) + 1).toString() : '1';
    const newCategory = { 
      ...category, 
      id: newId,
      registrationDate: new Date().toISOString().split('T')[0],
      registeredBy: 'Usuário Atual',
      modificationDate: new Date().toISOString().split('T')[0],
      modifiedBy: 'Usuário Atual'
    };
    
    categories.push(newCategory);
    this.saveCategories(categories);
    return newCategory;
  },

  updateCategory(id: string, updatedCategory: Partial<ProductCategory>): ProductCategory | null {
    const categories = this.getCategories();
    const index = categories.findIndex(cat => cat.id === id);
    
    if (index === -1) return null;
    
    categories[index] = { 
      ...categories[index], 
      ...updatedCategory,
      modificationDate: new Date().toISOString().split('T')[0],
      modifiedBy: 'Usuário Atual'
    };
    this.saveCategories(categories);
    return categories[index];
  },

  deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const filteredCategories = categories.filter(cat => cat.id !== id);
    
    if (filteredCategories.length === categories.length) return false;
    
    this.saveCategories(filteredCategories);
    return true;
  },

  getCategoryById(id: string): ProductCategory | undefined {
    const categories = this.getCategories();
    return categories.find(cat => cat.id === id);
  }
};