export interface Product {
  id: string;
  tipoProduto: string;
  codigo: string;
  pathNumber: string;
  marca: string;
  descricao: string;
  categoria: string;
  fornecedor: string;
  valorItem: number;
  unidade: string;
  estoqueMinimo: number;
  descricaoResumida: string;
  custoCliente: number;
  medida: string;
  validadeDesconto: string;
  voltagem: string;
  observacao: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    tipoProduto: 'Eletrônico',
    codigo: 'PROD001',
    pathNumber: 'PN-001',
    marca: 'Samsung',
    descricao: 'Smartphone Galaxy S21',
    categoria: 'Celulares',
    fornecedor: 'Fornecedor A',
    valorItem: 2500.00,
    unidade: 'UN',
    estoqueMinimo: 10,
    descricaoResumida: 'Smartphone de última geração',
    custoCliente: 2800.00,
    medida: 'N/A',
    validadeDesconto: '2025-12-31',
    voltagem: 'N/A',
    observacao: 'Produto em promoção'
  }
];

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts), 500);
    });
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          ...product,
          id: Math.random().toString(36).substr(2, 9)
        };
        mockProducts.push(newProduct);
        resolve(newProduct);
      }, 500);
    });
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          mockProducts[index] = { ...mockProducts[index], ...product };
          resolve(mockProducts[index]);
        } else {
          reject(new Error('Produto não encontrado'));
        }
      }, 500);
    });
  }
};
