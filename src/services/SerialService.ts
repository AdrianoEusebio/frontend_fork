export interface HistoryRecord {
  original: string;
  novo: string;
  data: string;
  usuario: string;
  tipo: string;
}

export interface Serial {
  id: string;
  produtoId: string;
  produto: string;
  serial: string;
  serialFabricante: string;
  dataGarantia: string;
  valorCusto: number;
  status: 'Ativo' | 'Inativo';
  dataCadastro: string;
  usuarioCadastro: string;
  dataAlteracao?: string;
  usuarioAlterou?: string;
  historico?: HistoryRecord[];
}

export interface SerialFilters {
  id: string;
  equipamento: string;
  serial: string;
  serialFabricante: string;
  status: 'Todos' | 'Ativo' | 'Inativo';
}

const STORAGE_KEY = 'seriais';

// Dados iniciais mockados
const initialData: Serial[] = [
  {
    id: '1',
    produtoId: '1',
    produto: 'PRODUTO 1',
    serial: 'SERIAL 1',
    serialFabricante: 'SERIAL DO FABRICANTE 1',
    dataGarantia: '2025-12-31',
    valorCusto: 1000.00,
    status: 'Ativo',
    dataCadastro: '2024-01-01',
    usuarioCadastro: 'Admin',
    historico: [
      {
        original: 'SERIAL ORIGINAL 1',
        novo: 'NOVO ORIGINAL 1',
        data: '2025-01-01',
        usuario: 'NOME DO USUÁRIO 1',
        tipo: 'TIPO 1',
      },
      {
        original: 'SERIAL ORIGINAL 2',
        novo: 'NOVO ORIGINAL 2',
        data: '2025-01-02',
        usuario: 'NOME DO USUÁRIO 2',
        tipo: 'TIPO 2',
      }
    ]
  },
  {
    id: '2',
    produtoId: '2',
    produto: 'PRODUTO 2',
    serial: 'SERIAL 2',
    serialFabricante: 'SERIAL DO FABRICANTE 2',
    dataGarantia: '2025-06-30',
    valorCusto: 1500.00,
    status: 'Ativo',
    dataCadastro: '2024-01-02',
    usuarioCadastro: 'Admin',
    historico: []
  }
];

export const SerialService = {
  getSeriais(): Serial[] {
    if (typeof window === 'undefined') return initialData;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  },

  saveSeriais(seriais: Serial[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seriais));
  },

  createSerial(serial: Omit<Serial, 'id'>): Serial {
    const seriais = this.getSeriais();
    const newId = seriais.length > 0 ? (Math.max(...seriais.map(s => parseInt(s.id))) + 1).toString() : '1';
    
    const newSerial: Serial = {
      ...serial,
      id: newId,
    };
    
    seriais.push(newSerial);
    this.saveSeriais(seriais);
    return newSerial;
  },

  updateSerial(id: string, updatedSerial: Partial<Serial>): Serial | null {
    const seriais = this.getSeriais();
    const index = seriais.findIndex(s => s.id === id);
    
    if (index === -1) return null;

    const serialOriginal = seriais[index];
    const historico: HistoryRecord[] = serialOriginal.historico || [];

    // Registrar alterações no histórico
    const dataAlteracao = new Date().toISOString().split('T')[0];
    const usuarioAlterou = 'Usuário Atual';

    // Verificar quais campos foram alterados e registrar no histórico
    if (updatedSerial.produto !== undefined && updatedSerial.produto !== serialOriginal.produto) {
      historico.push({
        original: serialOriginal.produto,
        novo: updatedSerial.produto,
        data: dataAlteracao,
        usuario: usuarioAlterou,
        tipo: 'Alteração de Produto'
      });
    }

    if (updatedSerial.serial !== undefined && updatedSerial.serial !== serialOriginal.serial) {
      historico.push({
        original: serialOriginal.serial,
        novo: updatedSerial.serial,
        data: dataAlteracao,
        usuario: usuarioAlterou,
        tipo: 'Alteração de Serial'
      });
    }

    if (updatedSerial.serialFabricante !== undefined && updatedSerial.serialFabricante !== serialOriginal.serialFabricante) {
      historico.push({
        original: serialOriginal.serialFabricante,
        novo: updatedSerial.serialFabricante,
        data: dataAlteracao,
        usuario: usuarioAlterou,
        tipo: 'Alteração de Serial do Fabricante'
      });
    }

    if (updatedSerial.dataGarantia !== undefined && updatedSerial.dataGarantia !== serialOriginal.dataGarantia) {
      historico.push({
        original: serialOriginal.dataGarantia,
        novo: updatedSerial.dataGarantia,
        data: dataAlteracao,
        usuario: usuarioAlterou,
        tipo: 'Alteração de Data da Garantia'
      });
    }

    if (updatedSerial.valorCusto !== undefined && updatedSerial.valorCusto !== serialOriginal.valorCusto) {
      historico.push({
        original: `R$ ${serialOriginal.valorCusto.toFixed(2)}`,
        novo: `R$ ${updatedSerial.valorCusto.toFixed(2)}`,
        data: dataAlteracao,
        usuario: usuarioAlterou,
        tipo: 'Alteração de Valor Custo'
      });
    }

    if (updatedSerial.status !== undefined && updatedSerial.status !== serialOriginal.status) {
      historico.push({
        original: serialOriginal.status,
        novo: updatedSerial.status,
        data: dataAlteracao,
        usuario: usuarioAlterou,
        tipo: 'Alteração de Status'
      });
    }

    seriais[index] = { 
      ...serialOriginal, 
      ...updatedSerial,
      dataAlteracao,
      usuarioAlterou,
      historico
    };
    this.saveSeriais(seriais);
    return seriais[index];
  },


  deleteSerial(id: string): boolean {
    const seriais = this.getSeriais();
    const filteredSeriais = seriais.filter(s => s.id !== id);
    
    if (filteredSeriais.length === seriais.length) return false;
    
    this.saveSeriais(filteredSeriais);
    return true;
  },

  getSerialById(id: string): Serial | undefined {
    const seriais = this.getSeriais();
    return seriais.find(s => s.id === id);
  },

  filterSeriais(filters: SerialFilters): Serial[] {
    let seriais = this.getSeriais();

    if (filters.id) {
      seriais = seriais.filter(s => 
        s.id.toLowerCase().includes(filters.id.toLowerCase())
      );
    }

    if (filters.equipamento) {
      seriais = seriais.filter(s => 
        s.produto.toLowerCase().includes(filters.equipamento.toLowerCase())
      );
    }

    if (filters.serial) {
      seriais = seriais.filter(s => 
        s.serial.toLowerCase().includes(filters.serial.toLowerCase())
      );
    }

    if (filters.serialFabricante) {
      seriais = seriais.filter(s => 
        s.serialFabricante.toLowerCase().includes(filters.serialFabricante.toLowerCase())
      );
    }

    if (filters.status !== 'Todos') {
      seriais = seriais.filter(s => s.status === filters.status);
    }

    return seriais;
  }
};