export interface TipoProduto {
  codigo: string;
  descricao: string;
  categoriaFinanceira: string;
  locacao: boolean;
  saidas: boolean;
  manutencao: boolean;
  orcamento: boolean;
  fatura: boolean;
}

const mockData: TipoProduto[] = [
  {
    codigo: 'F',
    descricao: 'Frota',
    categoriaFinanceira: 'INICAR LOC. VEICULOS',
    locacao: false,
    saidas: false,
    manutencao: false,
    orcamento: false,
    fatura: false,
  },
  {
    codigo: 'I',
    descricao: 'Imóveis',
    categoriaFinanceira: 'RECEITA DE IMÓVEIS/BENS',
    locacao: true,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'L',
    descricao: 'Locação',
    categoriaFinanceira: 'ALUGUEL DE EQUIPAMENTOS',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'A',
    descricao: 'Locação Avulsa',
    categoriaFinanceira: 'ALUGUEL DE EQUIPAMENTOS',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'Z',
    descricao: 'Locações Medidas',
    categoriaFinanceira: 'ALUGUEL DE EQUIPAMENTOS',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'M',
    descricao: 'Manutenção',
    categoriaFinanceira: 'SERVIÇO MANUTENÇÃO EQUIPAMENTOS',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'X',
    descricao: 'Peças',
    categoriaFinanceira: 'SISTEMA LOCADOR - MANUTENÇÃO',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: false,
    fatura: false,
  },
  {
    codigo: 'Y',
    descricao: 'Plataformas',
    categoriaFinanceira: 'ALUGUEL DE EQUIPAMENTOS',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'P',
    descricao: 'Pré-moldados',
    categoriaFinanceira: 'RECEITA DN PRÉ-MOLDADOS',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'R',
    descricao: 'Reembolso',
    categoriaFinanceira: 'REEMBOLSO DANOS/EXTRAVIO DEMA',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'T',
    descricao: 'Serviços de Treinamento',
    categoriaFinanceira: 'ALUGUEL DE EQUIPAMENTOS',
    locacao: false,
    saidas: false,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'V',
    descricao: 'Veículos',
    categoriaFinanceira: 'INICAR LOC. VEICULOS',
    locacao: false,
    saidas: true,
    manutencao: true,
    orcamento: true,
    fatura: true,
  },
  {
    codigo: 'C',
    descricao: 'Vendas',
    categoriaFinanceira: 'VENDA DE EQUIPAMENTOS DEMA',
    locacao: false,
    saidas: false,
    manutencao: false,
    orcamento: false,
    fatura: false,
  },
];

export class TiposProdutoService {
  static getTipos(): TipoProduto[] {
    return [...mockData];
  }

  static filterTipos(codigo?: string, descricao?: string): TipoProduto[] {
    let filtered = this.getTipos();

    if (codigo) {
      filtered = filtered.filter((tipo) =>
        tipo.codigo.toLowerCase().includes(codigo.toLowerCase())
      );
    }

    if (descricao) {
      filtered = filtered.filter((tipo) =>
        tipo.descricao.toLowerCase().includes(descricao.toLowerCase())
      );
    }

    return filtered;
  }
}
