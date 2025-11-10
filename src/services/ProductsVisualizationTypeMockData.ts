export interface Product {
  id: string;
  status: string;
  codigo: string;
  partnumber: string;
  marca: string;
  descricao: string;
  unidade: string;
  peso: number;
  valorCusto: number;
  descricaoResumida: string;
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
