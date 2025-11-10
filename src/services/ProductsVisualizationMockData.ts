import { Product } from '@/services/ProductsVisualizationTypeMockData';

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 300);
    });
  },

  filterProducts: async (filters: any): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 300);
    });
  },
};

const mockProducts: Product[] = [
  {
    id: '1',
    status: 'STATUS 1',
    codigo: 'COD1',
    partnumber: 'PARTNUMBER1',
    marca: 'MARCA 1',
    descricao: 'DESCRIÇÃO 1',
    unidade: '12345',
    peso: 10,
    valorCusto: 1.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 1',
  },
  {
    id: '2',
    status: 'STATUS 2',
    codigo: 'COD2',
    partnumber: 'PARTNUMBER2',
    marca: 'MARCA 2',
    descricao: 'DESCRIÇÃO 2',
    unidade: '12345',
    peso: 20,
    valorCusto: 2.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 2',
  },
  {
    id: '3',
    status: 'STATUS 3',
    codigo: 'COD3',
    partnumber: 'PARTNUMBER3',
    marca: 'MARCA 3',
    descricao: 'DESCRIÇÃO 3',
    unidade: '12345',
    peso: 30,
    valorCusto: 3.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 3',
  },
  {
    id: '4',
    status: 'STATUS 4',
    codigo: 'COD4',
    partnumber: 'PARTNUMBER4',
    marca: 'MARCA 4',
    descricao: 'DESCRIÇÃO 4',
    unidade: '12345',
    peso: 40,
    valorCusto: 4.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 4',
  },
  {
    id: '5',
    status: 'STATUS 5',
    codigo: 'COD5',
    partnumber: 'PARTNUMBER5',
    marca: 'MARCA 5',
    descricao: 'DESCRIÇÃO 5',
    unidade: '12345',
    peso: 50,
    valorCusto: 5.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 5',
  },
  {
    id: '6',
    status: 'STATUS 6',
    codigo: 'COD6',
    partnumber: 'PARTNUMBER6',
    marca: 'MARCA 6',
    descricao: 'DESCRIÇÃO 6',
    unidade: '12345',
    peso: 60,
    valorCusto: 6.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 6',
  },
  {
    id: '7',
    status: 'STATUS 7',
    codigo: 'COD7',
    partnumber: 'PARTNUMBER7',
    marca: 'MARCA 7',
    descricao: 'DESCRIÇÃO 7',
    unidade: '12345',
    peso: 70,
    valorCusto: 7.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 7',
  },
  {
    id: '8',
    status: 'STATUS 8',
    codigo: 'COD8',
    partnumber: 'PARTNUMBER8',
    marca: 'MARCA 8',
    descricao: 'DESCRIÇÃO 8',
    unidade: '12345',
    peso: 80,
    valorCusto: 8.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 8',
  },
  {
    id: '9',
    status: 'STATUS 9',
    codigo: 'COD9',
    partnumber: 'PARTNUMBER9',
    marca: 'MARCA 9',
    descricao: 'DESCRIÇÃO 9',
    unidade: '12345',
    peso: 90,
    valorCusto: 9.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 9',
  },
  {
    id: '10',
    status: 'STATUS 10',
    codigo: 'COD10',
    partnumber: 'PARTNUMBER10',
    marca: 'MARCA 10',
    descricao: 'DESCRIÇÃO 10',
    unidade: '12345',
    peso: 100,
    valorCusto: 10.0,
    descricaoResumida: 'DESCRIÇÃO RESUMIDA 10',
  },
];
