export interface Product {
  id: string;
  // Campos para visualização
  status: string;
  codigo: string;
  partnumber: string;
  marca: string;
  familiaProdutos: string;
  descricao: string;
  unidade: string;
  peso: number;
  valorCusto: number;
  isEletrico: boolean;
  descricaoResumida: string;
  
  // Campos para formulários
  tipoProduto: string;
  pathNumber: string;
  categoria: string;
  fornecedor: string;
  valorItem: string;
  pesoItem: string
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

export interface ProductCounters {
  [tipoProduto: string]: number;
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
    codigo: 'E1',
    partnumber: 'PN-001',
    marca: 'Toyota',
    familiaProdutos: 'Equipamentos de movimentacao de carga',
    descricao: 'Empilhadeira Elétrica',
    unidade: 'UN',
    peso: 1500,
    valorCusto: 25000.00,
    isEletrico: true,
    descricaoResumida: 'Empilhadeira elétrica Toyota',
    tipoProduto: 'Empilhadeira',
    pathNumber: 'PN-001',
    categoria: 'Empilhadeiras eletricas',
    fornecedor: 'Fornecedor A',
    valorItem: '25000.00',
    pesoItem: '1500',
    estoqueMinimo: '2',
    custoCliente: '28000.00',
    medida: 'N/A',
    validadeDesconto: '2025-12-31',
    voltagem: '220V',
    observacao: 'Produto novo em estoque',
    dataCadastro: '2024-01-15',
    usuarioCadastro: 'João Silva',
    dataAlteracao: '2024-03-20',
    usuarioAlterou: 'Maria Santos'
  }
];

const STORAGE_KEY = 'products';
const COUNTERS_STORAGE_KEY = 'product-counters';

// Contadores iniciais
const initialCounters: ProductCounters = {
  'Empilhadeira': 1,
  'Veiculo': 0,
  'Pre-Moldados': 0,
  'Peças': 0,
  'Locação': 0
};

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

  getCounters(): ProductCounters {
    if (typeof window === 'undefined') return initialCounters;
    
    const stored = localStorage.getItem(COUNTERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    localStorage.setItem(COUNTERS_STORAGE_KEY, JSON.stringify(initialCounters));
    return initialCounters;
  },

  saveCounters(counters: ProductCounters): void {
    localStorage.setItem(COUNTERS_STORAGE_KEY, JSON.stringify(counters));
  },

  generateProductCode(tipoProduto: string): string {
    const counters = this.getCounters();
    const tipoProdutoOption = tipoProdutoOptions.find(option => option.value === tipoProduto);
    
    if (!tipoProdutoOption) {
      return 'UNK1'; // Fallback caso não encontre o tipo
    }

    // Incrementa o contador para este tipo de produto
    const currentCount = counters[tipoProduto] || 0;
    const newCount = currentCount + 1;
    
    // Atualiza os contadores
    counters[tipoProduto] = newCount;
    this.saveCounters(counters);
    
    // Gera o código: Cod + número incrementado
    return `${tipoProdutoOption.Cod}${newCount}`;
  },

  saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  createProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newId = products.length > 0 ? (Math.max(...products.map(p => parseInt(p.id))) + 1).toString() : '1';
    
    // Gera o código automaticamente baseado no tipo de produto
    const codigo = this.generateProductCode(product.tipoProduto);
    
    const newProduct = { 
      ...product, 
      id: newId,
      codigo: codigo, // Usa o código gerado automaticamente
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

// Opções para os selects (mantém as mesmas)
export const tipoProdutoOptions = [
  { value: 'Empilhadeira', label: 'Empilhadeira', Tag: 1, Cod: 'E'},
  { value: 'Veiculo', label: 'Veiculo', Tag: 2, Cod: 'V'},
  { value: 'Pre-Moldados', label: 'Pre-Moldados', Tag: 3, Cod: 'PM'},
  { value: 'Peças', label: 'Peças', Tag: 4, Cod: 'P'},
  { value: 'Locação', label: 'Locação', Tag: 5, Cod: 'L'},
];

export const marcaOptions = [
  { value: 'Toyota', label: 'Toyota', Tag: 1 },
  { value: 'KION', label: 'KION', Tag: 1 },
  { value: 'Crown', label: 'Crown', Tag: 1 },
  { value: 'HONDA', label: 'HONDA', Tag: 2 },
  { value: 'FIAT', label: 'FIAT', Tag: 2 },
  { value: 'VW', label: 'VW', Tag: 2 },
  { value: 'Cassol', label: 'Cassol', Tag: 3 },
  { value: 'Incopre', label: 'Iassol', Tag: 3 },
  { value: 'Protendit', label: 'Protendit', Tag: 3 },
  { value: 'SKF', label: 'SKF', Tag: 4 },
  { value: 'GATES', label: 'GATES', Tag: 4 },
  { value: 'DAYCO', label: 'DAYCO', Tag: 4 },
  { value: 'Veículos', label: 'Veículos', Tag: 5 },
  { value: 'Imóveis', label: 'Imóveis', Tag: 5 },
  { value: 'Maquinário', label: 'Maquinário', Tag: 5 },
];

export const familiaProduto = [
  { value: 'Equipamentos de movimentacao de carga ', label: 'Equipamentos de movimentacao de carga ', Tag: 1 },
  { value: 'GASOLINA', label: 'GASOLINA', Tag: 2 },
  { value: 'DIESEL', label: 'DIESEL', Tag: 2 },
  { value: 'Estrutural', label: 'Estrutural', Tag: 3 },
  { value: 'Lajes', label: 'Lajes', Tag: 3 },
  { value: 'Vedação', label: 'Vedação', Tag: 3 },
  { value: 'COMPONENTES', label: 'COMPONENTES', Tag: 4 },
  { value: 'SUPRIMENTOS', label: 'SUPRIMENTOS', Tag: 4 },
  { value: 'HIDRAULICAS', label: 'HIDRAULICAS', Tag: 4 },
  { value: 'LOCAÇÃO DE ALGUEL', label: 'LOCAÇÃO DE ALGUEL', Tag: 5 },
  { value: 'ARRENDAMENTO', label: 'ARRENDAMENTO', Tag: 5 },
]

export const categoriaOptions = [
  { value: 'Empilhadeiras eletricas', label: 'Empilhadeiras eletricas', Tag: 1 },
  { value: 'VEICULO PICAPE', label: 'VEICULO PICAPE', Tag: 2 },
  { value: 'VEICULO COMERCIAL', label: 'VEICULO COMERCIAL', Tag: 2 },
  { value: 'Estrtuturais', label: 'Estrtuturais', Tag: 3 },
  { value: 'Infraestrtutura', label: 'Infraestrtutura', Tag: 3 },
  { value: 'Paredes', label: 'Paredes', Tag: 3 },
  { value: 'Fachadas', label: 'Fachadas', Tag: 3 },
  { value: 'MAQUINAS PESADAS', label: 'MAQUINAS PESADAS', Tag: 4 },
  { value: 'INDUSTRIAIS', label: 'INDUSTRIAIS', Tag: 4 },
  { value: 'LOCAÇÃO DE EQUIPAMENTOS', label: 'LOCAÇÃO DE EQUIPAMENTOS', Tag: 5 },
  { value: 'VEICULOS', label: 'VEICULOS', Tag: 5 },
  { value: 'IMOVEIS', label: 'IMOVEIS', Tag: 5 },
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