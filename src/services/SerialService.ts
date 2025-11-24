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
    usuarioCadastro: 'Admin'
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
    usuarioCadastro: 'Admin'
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
    
    seriais[index] = { 
      ...seriais[index], 
      ...updatedSerial,
      dataAlteracao: new Date().toISOString().split('T')[0],
      usuarioAlterou: 'Usuário Atual'
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