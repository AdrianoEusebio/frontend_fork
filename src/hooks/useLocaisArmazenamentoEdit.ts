import { useState, useEffect } from 'react';
import { 
  getStorageLocationById, 
  updateStorageLocation,
  createStorageLocation 
} from '@/services/LocaisArmazenamentoService';
import { LocalArmazenamento, LocalArmazenamentoForm } from '@/services/LocaisArmazenamentoTypes';
import { useNavigate, useParams } from 'react-router-dom';

// Estado inicial para criação
const initialFormData: Omit<LocalArmazenamento, 'id' | 'dataCadastro' | 'usuarioCadastro' | 'dataAlteracao' | 'usuarioAlteracao'> = {
  codigo: '',
  tipoArmazenamento: '',
  ordemEdicao: '',
  convidadoEstoqueProprio: 'sim',
  descricao: '',
  observacao: '',
};

export const useStorageLocation = (id?: number) => {
  const [data, setData] = useState<LocalArmazenamento | null>(null);
  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados se for edição
  useEffect(() => {
    if (id) {
      loadData(id);
      setIsEditing(true);
    } else {
      // Modo de criação - não carregar dados
      setIsEditing(false);
      setIsLoading(false);
    }
  }, [id]);

  const navigate = useNavigate();

  const loadData = async (locationId: number) => {
    setIsLoading(true);
    try {
      const locationData = getStorageLocationById(locationId);
      if (locationData) {
        setData(locationData);
        // Também preenche o formData com os dados carregados
        setFormData({
          codigo: locationData.codigo,
          tipoArmazenamento: locationData.tipoArmazenamento,
          ordemEdicao: locationData.ordemEdicao,
          convidadoEstoqueProprio: locationData.convidadoEstoqueProprio,
          descricao: locationData.descricao,
          observacao: locationData.observacao,
        });
      } else {
        console.error('Local de armazenamento não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (): Promise<LocalArmazenamento | null> => {
    setLoading(true);
    try {
      if (isEditing && id) {
        // Atualizar existente
        const updatedData = updateStorageLocation(id, {
          codigo: formData.codigo,
          tipoArmazenamento: formData.tipoArmazenamento,
          ordemEdicao: formData.ordemEdicao,
          convidadoEstoqueProprio: formData.convidadoEstoqueProprio,
          descricao: formData.descricao,
          observacao: formData.observacao,
        });
        
        if (updatedData) {
          setData(updatedData);
          alert('Dados atualizados com sucesso!');
          return updatedData;
        }
      } else {
        // Criar novo
        const newLocation = createStorageLocation(formData);
        alert('Local de armazenamento criado com sucesso!');
        return newLocation;
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados.');
    } finally {
      setLoading(false);
      navigate('/storage');
    }
    return null;
  };

  const handleCancel = () => {
    if (isEditing && id) {
      loadData(id); // Recarregar dados originais
    } else {
      // Limpar formulário de criação
      setFormData(initialFormData);
    }
    alert('Alterações canceladas!');
    navigate('/storage');
  };

  return {
    data,              // Dados completos (somente no modo edição)
    formData,          // Dados do formulário (usado em ambos os modos)
    loading,           // Estado de carregamento durante save
    isLoading,         // Estado de carregamento inicial
    isEditing,         // Modo edição ou criação
    updateFormData,    // Atualizar formData
    handleSave,
    handleCancel
  };
};