import { useState } from 'react';
import { Input } from '@/components/Input/LocaisArmazenamentoRegistrationInput';
import { Select } from '@/components/Select/LocaisArmazenamentoRegistrationSelect';
import { RadioGroup } from '@/components/RadioGroup/LocaisArmazenamentoRegistrationGroupRadio';
import { TextArea } from '@/components/Textarea/LocaisArmazenamentoRegistrationTextArea';
import { Button } from '@/components/Button/LocaisArmazenamentoRegistrationButton';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/geralNavbar';

interface StorageLocationForm {
  code: string;
  storageType: string;
  displayOrder: string;
  trackOwnStock: string;
  description: string;
  observation: string;
}

const storageTypeOptions = [
  { value: 'deposito', label: 'Depósito' },
  { value: 'armazem', label: 'Armazém' },
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

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleInputChange = (field: keyof StorageLocationForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Local de armazenamento salvo com sucesso!');
    navigate('/storage');
  };

  const handleCancel = () => {
    if (confirm('Deseja cancelar e limpar o formulário?')) {
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Páginas / Cadastros Básicos / Locais de Armazenamento
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Locais de Armazenamento</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Cadastro de Local de Armazenamento
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Input
                  label="Código"
                  placeholder="Digite o código"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                />

                <Select
                  label="Tipo de Armazenamento"
                  required
                  placeholder="Selecione uma das opções"
                  options={storageTypeOptions}
                  value={formData.storageType}
                  onChange={(e) => handleInputChange('storageType', e.target.value)}
                />

                <Input
                  label="Ordem de Exibição"
                  required
                  type="number"
                  placeholder="Informe um número de ordenação"
                  value={formData.displayOrder}
                  onChange={(e) => handleInputChange('displayOrder', e.target.value)}
                />

                <RadioGroup
                  label="Contabiliza Estoque Próprio"
                  required
                  name="trackOwnStock"
                  options={trackStockOptions}
                  value={formData.trackOwnStock}
                  onChange={(value) => handleInputChange('trackOwnStock', value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <TextArea
                  label="Descrição"
                  required
                  placeholder="Informe uma descrição"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />

                <TextArea
                  label="Observação"
                  placeholder="Informe uma observação"
                  value={formData.observation}
                  onChange={(e) => handleInputChange('observation', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Button type="button" variant="danger" onClick={handleCancel}>
                  Cancelar
                </Button>

                <Button type="submit" variant="primary">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}
