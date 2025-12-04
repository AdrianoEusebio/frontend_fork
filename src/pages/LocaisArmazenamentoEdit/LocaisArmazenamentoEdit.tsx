import { Input } from '@/components/Input/LocaisArmazenamentoEditInput';
import { Select } from '@/components/Select/LocaisArmazenamentoEditSelect';
import { Radio } from '@/components/Radio/LocaisArmazenamentoEditRadio';
import { Textarea } from '@/components/Textarea/LocaisArmazenamentoEditTextArea';
import { Button } from '@/components/Button/LocaisArmazenamentoEditButton';
import { useStorageLocation } from '@/hooks/useLocaisArmazenamentoEdit';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/geralNavbar';

const tipoArmazenamentoOptions = [
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

const convidadoOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' }
];

export const StorageLocationEdit = () => {
  const { id } = useParams<{ id: string }>();
  const locationId = id ? parseInt(id) : undefined;
  
  const { 
    data, 
    formData, 
    loading, 
    isLoading, 
    isEditing, 
    updateFormData, 
    handleSave, 
    handleCancel 
  } = useStorageLocation(locationId);

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const onSave = async () => {
    const result = await handleSave();
    if (result) {
      navigate('/storage');
    }
  };

  const onCancel = () => {
    handleCancel();
    navigate('/storage');
  };

  // Se estiver carregando no modo de edição, mostrar loading
  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={handleNavigate} />
        <div className="px-6 py-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando dados...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      <div className="px-6 py-4">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Páginas / Cadastros Básicos / Locais de Armazenamento
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edição de Local de Armazenamento' : 'Cadastro de Local de Armazenamento'}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            {isEditing ? 'Edição de Local de Armazenamento' : 'Cadastro de Local de Armazenamento'}
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  label="Código:"
                  value={formData.codigo}
                  onChange={(e) => updateFormData('codigo', e.target.value)}
                  placeholder="Digite o código"
                  required
                />
              </div>

              <div>
                <Select
                  label="Tipo de Armazenamento"
                  required
                  value={formData.tipoArmazenamento}
                  onChange={(e) => updateFormData('tipoArmazenamento', e.target.value)}
                  options={tipoArmazenamentoOptions}
                  placeholder="Selecione uma opção"
                />
              </div>

              <div>
                <Input
                  label="Ordem de Edição"
                  required
                  type="number"
                  value={formData.ordemEdicao}
                  onChange={(e) => updateFormData('ordemEdicao', e.target.value)}
                  placeholder="Informe um número de ordenação"
                />
              </div>

              <div>
                <Radio
                  label="Contabiliza Estoque Próprio"
                  required
                  name="convidadoEstoqueProprio"
                  options={convidadoOptions}
                  value={formData.convidadoEstoqueProprio}
                  onChange={(e) => updateFormData('convidadoEstoqueProprio', e.target.value as 'sim' | 'nao')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Descrição"
                  required
                  value={formData.descricao}
                  onChange={(e) => updateFormData('descricao', e.target.value)}
                  placeholder="Informe uma descrição"
                />
              </div>

              <div>
                <Textarea
                  label="Observação:"
                  value={formData.observacao}
                  onChange={(e) => updateFormData('observacao', e.target.value)}
                  placeholder="Informe uma observação"
                  rows={3}
                />
              </div>
            </div>

            {/* Mostrar campos de auditoria apenas no modo de edição */}
            {isEditing && data && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    label="Data de Cadastro:"
                    type="date"
                    value={data.dataCadastro}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    label="Usuário que Cadastrou:"
                    value={data.usuarioCadastro}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    label="Data de Alteração:"
                    type="date"
                    value={data.dataAlteracao}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    label="Usuário que Alterou:"
                    value={data.usuarioAlteracao}
                    disabled
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button
                variant="danger"
                onClick={onCancel}
                disabled={loading}
              >
                Cancelar
              </Button>

              <Button
                variant="primary"
                onClick={onSave}
                disabled={loading}
              >
                {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Salvar')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};