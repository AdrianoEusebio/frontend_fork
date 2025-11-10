export interface Product {
  id: string;
  // Campos para visualização
  status: string;
  codigo: string;
  partnumber: string;
  marca: string;
  descricao: string;
  unidade: string;
  peso: number;
  valorCusto: number;
  descricaoResumida: string;
  
  // Campos para formulários
  tipoProduto: string;
  pathNumber: string;
  categoria: string;
  fornecedor: string;
  valorItem: string;
  estoqueMinimo: string;
  custoCliente: string;
  medida: string;
  validadeDesconto: string;
  voltagem: string;
  observacao: string;
  dataCadastro?: string;
  usuarioCadastro?: string;
  dataAlteracao?: string;
  usuarioAlterou?: string;
}

export interface ProductFilters {
  codigo?: string;
  partnumber?: string;
  tipoProduto?: string;
  marca?: string;
  empresaVinculada?: string;
  descontoAplicado?: string;
  status?: string;
  peso?: string;
  comSerial: boolean;
  semSerial: boolean;
  comEstoque: boolean;
  sublocados: boolean;
  comPeso: boolean;
  semPeso: boolean;
}

// Dados iniciais
const initialData: Product[] = [
  {
    id: '1',
    status: 'Ativo',
    codigo: 'PROD001',
    partnumber: 'PN-001',
    marca: 'Samsung',
    descricao: 'Smartphone Galaxy S21',
    unidade: 'UN',
    peso: 0.2,
    valorCusto: 2500.00,
    descricaoResumida: 'Smartphone de última geração',
    tipoProduto: 'Eletrônico',
    pathNumber: 'PN-001',
    categoria: 'Celulares',
    fornecedor: 'Fornecedor A',
    valorItem: '2500.00',
    estoqueMinimo: '10',
    custoCliente: '2800.00',
    medida: 'N/A',
    validadeDesconto: '2025-12-31',
    voltagem: 'N/A',
    observacao: 'Produto em promoção',
    dataCadastro: '2024-01-15',
    usuarioCadastro: 'João Silva',
    dataAlteracao: '2024-03-20',
    usuarioAlterou: 'Maria Santos'
  },
  {
    id: '2',
    status: 'Ativo',
    codigo: 'PROD002',
    partnumber: 'PN-002',
    marca: 'LG',
    descricao: 'Smart TV 55" 4K',
    unidade: 'UN',
    peso: 15.5,
    valorCusto: 3200.00,
    descricaoResumida: 'Smart TV LED 4K',
    tipoProduto: 'Eletrônico',
    pathNumber: 'PN-002',
    categoria: 'Televisores',
    fornecedor: 'Fornecedor B',
    valorItem: '3200.00',
    estoqueMinimo: '5',
    custoCliente: '3500.00',
    medida: '55 polegadas',
    validadeDesconto: '2024-06-30',
    voltagem: '110V/220V',
    observacao: '',
    dataCadastro: '2024-02-10',
    usuarioCadastro: 'Maria Santos',
    dataAlteracao: '2024-03-15',
    usuarioAlterou: 'João Silva'
  }
];

const STORAGE_KEY = 'products';

export const ProductService = {
  getProducts(): Product[] {
    if (typeof window === 'undefined') return initialData;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  },

  saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  createProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newId = products.length > 0 ? (Math.max(...products.map(p => parseInt(p.id))) + 1).toString() : '1';
    const newProduct = { 
      ...product, 
      id: newId,
      dataCadastro: new Date().toISOString().split('T')[0],
      usuarioCadastro: 'Usuário Atual',
      dataAlteracao: new Date().toISOString().split('T')[0],
      usuarioAlterou: 'Usuário Atual'
    };
    
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  },

  updateProduct(id: string, updatedProduct: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = { 
      ...products[index], 
      ...updatedProduct,
      dataAlteracao: new Date().toISOString().split('T')[0],
      usuarioAlterou: 'Usuário Atual'
    };
    this.saveProducts(products);
    return products[index];
  },

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) return false;
    
    this.saveProducts(filteredProducts);
    return true;
  },

  deleteMultipleProducts(ids: string[]): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => !ids.includes(p.id));
    
    if (filteredProducts.length === products.length) return false;
    
    this.saveProducts(filteredProducts);
    return true;
  },

  getProductById(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  },

  filterProducts(filters: ProductFilters): Product[] {
    let products = this.getProducts();

    if (filters.codigo) {
      products = products.filter(p => 
        p.codigo.toLowerCase().includes(filters.codigo!.toLowerCase())
      );
    }

    if (filters.partnumber) {
      products = products.filter(p => 
        p.partnumber.toLowerCase().includes(filters.partnumber!.toLowerCase())
      );
    }

    if (filters.marca) {
      products = products.filter(p => 
        p.marca.toLowerCase().includes(filters.marca!.toLowerCase())
      );
    }

    if (filters.status) {
      products = products.filter(p => 
        p.status.toLowerCase().includes(filters.status!.toLowerCase())
      );
    }

    return products;
  }
};

// Opções para os selects
export const tipoProdutoOptions = [
  { value: 'Eletrônico', label: 'Eletrônico' },
  { value: 'Eletrodoméstico', label: 'Eletrodoméstico' },
  { value: 'Móveis', label: 'Móveis' },
  { value: 'Informática', label: 'Informática' }
];

export const marcaOptions = [
  { value: 'Samsung', label: 'Samsung' },
  { value: 'LG', label: 'LG' },
  { value: 'Sony', label: 'Sony' },
  { value: 'Apple', label: 'Apple' }
];

export const categoriaOptions = [
  { value: 'Celulares', label: 'Celulares' },
  { value: 'Televisores', label: 'Televisores' },
  { value: 'Computadores', label: 'Computadores' },
  { value: 'Acessórios', label: 'Acessórios' }
];

export const fornecedorOptions = [
  { value: 'Fornecedor A', label: 'Fornecedor A' },
  { value: 'Fornecedor B', label: 'Fornecedor B' },
  { value: 'Fornecedor C', label: 'Fornecedor C' }
];

export const unidadeOptions = [
  { value: 'UN', label: 'Unidade' },
  { value: 'CX', label: 'Caixa' },
  { value: 'PC', label: 'Peça' },
  { value: 'KG', label: 'Quilograma' }
];