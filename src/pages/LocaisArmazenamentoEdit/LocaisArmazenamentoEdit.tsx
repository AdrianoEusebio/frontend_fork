import { Input } from '@/components/Input/LocaisArmazenamentoEditInput';
import { Select } from '@/components/Select/LocaisArmazenamentoEditSelect';
import { Radio } from '@/components/Radio/LocaisArmazenamentoEditRadio';
import { Textarea } from '@/components/Textarea/LocaisArmazenamentoEditTextArea';
import { Button } from '@/components/Button/LocaisArmazenamentoEditButton';
import { useStorageLocation } from '@/hooks/useLocaisArmazenamentoEdit';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/geralNavbar';

const tipoArmazenamentoOptions = [
  { value: '', label: 'Opção selecionada' },
  { value: 'opcao-selecionada', label: 'Opção selecionada' },
  { value: 'armazem-geral', label: 'Armazém Geral' },
  { value: 'deposito-fechado', label: 'Depósito Fechado' },
  { value: 'area-externa', label: 'Área Externa' },
];

const convidadoOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' }
];

export const StorageLocationEdit = () => {
  const { data, loading, updateData } = useStorageLocation();

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCancel = () => {
    navigate('/storage');
  };

  const handleSave = () => {
    navigate('/storage');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
        <div className="px-6 py-4">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Páginas / Cadastros Básicos / Locais de Armazenamento
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Locais de Armazenamento</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Edição de Local de Armazenamento
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    label="Código:"
                    value={data.codigo}
                    onChange={(e) => updateData('codigo', e.target.value)}
                    placeholder="CODIGOPARNACI"
                  />
                </div>

                <div>
                  <Select
                    label="Tipo de Armazenamento"
                    required
                    value={data.tipoArmazenamento}
                    onChange={(e) => updateData('tipoArmazenamento', e.target.value)}
                    options={tipoArmazenamentoOptions}
                  />
                </div>

                <div>
                  <Input
                    label="Ordem de Edição"
                    required
                    type="number"
                    value={data.ordemEdicao}
                    onChange={(e) => updateData('ordemEdicao', e.target.value)}
                    placeholder="1"
                  />
                </div>

                <div>
                  <Radio
                    label="Convidados Estoque Próprio"
                    required
                    name="convidadoEstoqueProprio"
                    options={convidadoOptions}
                    value={data.convidadoEstoqueProprio}
                    onChange={(e) => updateData('convidadoEstoqueProprio', e.target.value as 'sim' | 'nao')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Descrição"
                    required
                    value={data.descricao}
                    onChange={(e) => updateData('descricao', e.target.value)}
                    placeholder="Descrição Informada"
                  />
                </div>

                <div>
                  <Textarea
                    label="Observação:"
                    value={data.observacao}
                    onChange={(e) => updateData('observacao', e.target.value)}
                    placeholder="Escreva sua observação"
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    label="Data de Cadastro:"
                    type="date"
                    value={data.dataCadastro}
                    onChange={(e) => updateData('dataCadastro', e.target.value)}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    label="Usuário que Cadastrou:"
                    value={data.usuarioCadastro}
                    onChange={(e) => updateData('usuarioCadastro', e.target.value)}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    label="Data de Alteração:"
                    type="date"
                    value={data.dataAlteracao}
                    onChange={(e) => updateData('dataAlteracao', e.target.value)}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    label="Usuário que Alterou:"
                    value={data.usuarioAlteracao}
                    onChange={(e) => updateData('usuarioAlteracao', e.target.value)}
                    disabled
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Button
                  variant="danger"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </Button>

                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Atualizar'}
                </Button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
