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
  { value: 'Empilhadeira', label: 'Empilhadeira', Tag: 1, Cod: 'E'},
  { value: 'Veiculo', label: 'Veiculo', Tag: 2, Cod: 'V'},
  { value: 'Pre-Moldados', label: 'Pre-Moldados', Tag: 3, Cod: 'PM'},
  { value: 'Peças', label: 'Peças', Tag: 4, Cod: 'P'},
  { value: 'Locação', label: 'Locação', Tag: 5, Cod: 'L'},
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
    codigo: '1',
    descricao: 'Empilhadeiras de Construção',
    desconto: '5',
    valorDesconto: '50',
    empresa: 'Empresa A',
    centroCusto: 'Custo A',
    centroReceb: 'Receb A',
    imprimirRelat: 'Sim',
    aplicarAuto: 'Sim',
    equipmentType: 'Empilhadeira',
    description: 'Empilhadeiras de Construção',
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
    codigo: '2',
    descricao: 'Móveis',
    desconto: '5',
    valorDesconto: '50',
    empresa: 'Empresa B',
    centroCusto: 'Custo B',
    centroReceb: 'Receb B',
    imprimirRelat: 'Não',
    aplicarAuto: 'Sim',
    equipmentType: 'Locação',
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
const CATEGORY_COUNTER_KEY = 'productCategoryCounter';

export const ProductCategoryService = {
  getCategories(): ProductCategory[] {
    if (typeof window === 'undefined') return initialData;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    this.initializeCounter();
    return initialData;
  },

  getCategoryCounter(): number {
    if (typeof window === 'undefined') return initialData.length;
    
    const stored = localStorage.getItem(CATEGORY_COUNTER_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }

    return this.initializeCounter();
  },

  initializeCounter(): number {
    const categories = this.getCategories();
    const maxId = categories.length > 0 
      ? Math.max(...categories.map(cat => parseInt(cat.id))) 
      : 0;
    
    const counter = maxId;
    localStorage.setItem(CATEGORY_COUNTER_KEY, counter.toString());
    return counter;
  },

  saveCategoryCounter(counter: number): void {
    localStorage.setItem(CATEGORY_COUNTER_KEY, counter.toString());
  },

  saveCategories(categories: ProductCategory[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  },

  createCategory(category: Omit<ProductCategory, 'id' | 'codigo'>): ProductCategory {
    const categories = this.getCategories();
    
    // Obtém e incrementa o contador
    const currentCounter = this.getCategoryCounter();
    const newCounter = currentCounter + 1;
    this.saveCategoryCounter(newCounter);
    
    // Usa o contador como ID e código
    const newId = newCounter.toString();
    
    const newCategory: ProductCategory = { 
      ...category, 
      id: newId,
      codigo: newId, // Código igual ao ID
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