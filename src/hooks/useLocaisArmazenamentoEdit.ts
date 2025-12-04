import { useState } from 'react';

export interface StorageLocation {
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

const mockData: StorageLocation = {
  codigo: 'CODIGOPARNACI',
  tipoArmazenamento: 'opcao-selecionada',
  ordemEdicao: '1',
  convidadoEstoqueProprio: 'sim',
  descricao: 'Descrição Informada',
  observacao: '',
  dataCadastro: '2024-01-15',
  usuarioCadastro: 'João Silva',
  dataAlteracao: '2024-03-20',
  usuarioAlteracao: 'Maria Santos',
};

export const useStorageLocation = () => {
  const [data, setData] = useState<StorageLocation>(mockData);
  const [loading, setLoading] = useState(false);

  const updateData = (field: keyof StorageLocation, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Dados salvos:', data);
    setLoading(false);
    alert('Dados atualizados com sucesso!');
  };

  const handleCancel = () => {
    setData(mockData);
    alert('Alterações canceladas!');
  };

  return {
    data,
    loading,
    updateData,
    handleSave,
    handleCancel
  };
};
