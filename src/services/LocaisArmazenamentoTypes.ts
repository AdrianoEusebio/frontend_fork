// Tipo unificado para Local de Armazenamento
export interface LocalArmazenamento {
  id: number;
  codigo: string;
  tipoArmazenamento: string;
  ordemEdicao: string;
  convidadoEstoqueProprio: 'sim' | 'nao';
  descricao: string;
  observacao: string;
  dataCadastro: string;
  usuarioCadastro: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

// Tipo para formulário (sem campos de auditoria)
export interface LocalArmazenamentoForm {
  codigo: string;
  tipoArmazenamento: string;
  ordemEdicao: string;
  convidadoEstoqueProprio: 'sim' | 'nao';
  descricao: string;
  observacao: string;
}

// Tipo para filtros
export interface StorageLocationFilters {
  descricao: string;
  codigo: string;
  tipoArmazenamento: string;
}