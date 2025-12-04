import { useState } from 'react';
import { Input } from '@/components/Input/LocaisArmazenamentoRegistrationInput';
import { Select } from '@/components/Select/LocaisArmazenamentoRegistrationSelect';
import { RadioGroup } from '@/components/Radio/LocaisArmazenamentoRegistrationGroupRadio';
import { TextArea } from '@/components/Textarea/LocaisArmazenamentoRegistrationTextArea';
import { Button } from '@/components/Button/LocaisArmazenamentoRegistrationButton';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/geralNavbar';
import { createStorageLocationFromForm } from '@/services/LocaisArmazenamentoService';

// Tipos
interface StorageLocationForm {
  code: string;
  storageType: string;
  displayOrder: string;
  trackOwnStock: 'sim' | 'nao';
  description: string;
  observation: string;
}

// Opções para os selects
const storageTypeOptions = [
  { value: '', label: 'Selecione uma opção' },
  { value: 'deposito', label: 'Depósito' },
  { value: 'armazem', label: 'Armazém' },
  { value: 'armazem-geral', label: 'Armazém Geral' },
  { value: 'deposito-fechado', label: 'Depósito Fechado' },
  { value: 'area-externa', label: 'Área Externa' },
  { value: 'prateleira', label: 'Prateleira' },
  { value: 'setor', label: 'Setor' },
  { value: 'zona', label: 'Zona' },
];

const trackStockOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

export function StorageLocationRegistration() {
  const [formData, setFormData] = useState<StorageLocationForm>({
    code: '',
    storageType: '',
    displayOrder: '',
    trackOwnStock: 'sim',
    description: '',
    observation: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Código é obrigatório';
    }

    if (!formData.storageType.trim()) {
      newErrors.storageType = 'Tipo de armazenamento é obrigatório';
    }

    if (!formData.displayOrder.trim()) {
      newErrors.displayOrder = 'Ordem de exibição é obrigatória';
    } else if (isNaN(Number(formData.displayOrder))) {
      newErrors.displayOrder = 'Ordem de exibição deve ser um número';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof StorageLocationForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor, corrija os erros no formulário.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Salvar no localStorage usando o service
      createStorageLocationFromForm(formData);
      
      alert('Local de armazenamento cadastrado com sucesso!');
      
      // Redirecionar para a lista
      navigate('/storage');
      
    } catch (error) {
      console.error('Erro ao cadastrar local de armazenamento:', error);
      alert('Ocorreu um erro ao cadastrar o local de armazenamento.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = Object.values(formData).some(value => 
      value !== '' && value !== 'sim'
    );
    
    if (!hasChanges || confirm('Deseja cancelar e limpar o formulário? As alterações serão perdidas.')) {
      setFormData({
        code: '',
        storageType: '',
        displayOrder: '',
        trackOwnStock: 'sim',
        description: '',
        observation: '',
      });
      navigate('/storage');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      <div className="px-6 py-4">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Páginas / Cadastros Básicos / Locais de Armazenamento
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Locais de Armazenamento</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Cadastro de Local de Armazenamento
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Input
                  label="Código"
                  placeholder="Digite o código"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  error={errors.code}
                  required
                />
              </div>

              <div>
                <Select
                  label="Tipo de Armazenamento"
                  required
                  placeholder="Selecione uma das opções"
                  options={storageTypeOptions}
                  value={formData.storageType}
                  onChange={(e) => handleInputChange('storageType', e.target.value)}
                  error={errors.storageType}
                />
              </div>

              <div>
                <Input
                  label="Ordem de Exibição"
                  required
                  type="number"
                  placeholder="Informe um número de ordenação"
                  value={formData.displayOrder}
                  onChange={(e) => handleInputChange('displayOrder', e.target.value)}
                  error={errors.displayOrder}
                />
              </div>

              <div>
                <RadioGroup
                  label="Contabiliza Estoque Próprio"
                  required
                  name="trackOwnStock"
                  options={trackStockOptions}
                  value={formData.trackOwnStock}
                  onChange={(value) => handleInputChange('trackOwnStock', value as 'sim' | 'nao')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <TextArea
                  label="Descrição"
                  required
                  placeholder="Informe uma descrição"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  error={errors.description}
                  rows={4}
                />
              </div>

              <div>
                <TextArea
                  label="Observação"
                  placeholder="Informe uma observação"
                  value={formData.observation}
                  onChange={(e) => handleInputChange('observation', e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button 
                type="button" 
                variant="danger" 
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>

              <Button 
                type="submit" 
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}