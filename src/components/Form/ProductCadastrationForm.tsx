import React, { useState } from 'react';
import { FileText, Receipt } from 'lucide-react';
import { Input } from '@/components/Input/productCadastrationSelect';
import { Select } from '@/components/Select/productCadastratioSelect';
import { TextArea } from '@/components/Textarea/productCadastrationTextarea';
import { Button } from '@/components/Button/productCadastrationButton';

interface ProductFormData {
  tipoProduto: string;
  codigo: string;
  pathNumber: string;
  marca: string;
  descricao: string;
  categoria: string;
  fornecedor: string;
  valorItem: string;
  unidade: string;
  estoqueMinimo: string;
  descricaoResumida: string;
  custoCliente: string;
  medida: string;
  validadeDesconto: string;
  voltagem: string;
  observacao: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<'initial' | 'dadosBasicos' | 'informacoesContabeis'>('initial');
  const [formData, setFormData] = useState<ProductFormData>({
    tipoProduto: '',
    codigo: '',
    pathNumber: '',
    marca: '',
    descricao: '',
    categoria: '',
    fornecedor: '',
    valorItem: '',
    unidade: '',
    estoqueMinimo: '',
    descricaoResumida: '',
    custoCliente: '',
    medida: '',
    validadeDesconto: '',
    voltagem: '',
    observacao: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const tipoProdutoOptions = [
    { value: 'Eletrônico', label: 'Eletrônico' },
    { value: 'Eletrodoméstico', label: 'Eletrodoméstico' },
    { value: 'Móveis', label: 'Móveis' },
    { value: 'Informática', label: 'Informática' }
  ];

  const marcaOptions = [
    { value: 'Samsung', label: 'Samsung' },
    { value: 'LG', label: 'LG' },
    { value: 'Sony', label: 'Sony' },
    { value: 'Apple', label: 'Apple' }
  ];

  const categoriaOptions = [
    { value: 'Celulares', label: 'Celulares' },
    { value: 'Televisores', label: 'Televisores' },
    { value: 'Computadores', label: 'Computadores' },
    { value: 'Acessórios', label: 'Acessórios' }
  ];

  const fornecedorOptions = [
    { value: 'Fornecedor A', label: 'Fornecedor A' },
    { value: 'Fornecedor B', label: 'Fornecedor B' },
    { value: 'Fornecedor C', label: 'Fornecedor C' }
  ];

  const unidadeOptions = [
    { value: 'UN', label: 'Unidade' },
    { value: 'CX', label: 'Caixa' },
    { value: 'PC', label: 'Peça' },
    { value: 'KG', label: 'Quilograma' }
  ];

  if (currentStep === 'initial') {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="relative flex items-center justify-center mb-16 mt-8">
          <div className="absolute top-[52px] left-1/2 w-64 h-0.5 bg-blue-500 -translate-x-1/2"></div>

          <div className="flex items-center justify-center gap-32">
            <button
              onClick={() => setCurrentStep('dadosBasicos')}
              className="flex flex-col items-center gap-4 group relative z-10"
            >
              <div className="bg-blue-500 rounded-full p-6 group-hover:bg-blue-600 transition-colors">
                <FileText className="text-white" size={32} />
              </div>
              <span className="text-base font-medium text-gray-900">Dados Básicos</span>
            </button>

            <button
              onClick={() => setCurrentStep('informacoesContabeis')}
              className="flex flex-col items-center gap-4 group relative z-10"
            >
              <div className="bg-white border-4 border-blue-500 rounded-full p-6 group-hover:bg-blue-50 transition-colors">
                <Receipt className="text-blue-500" size={32} />
              </div>
              <span className="text-base font-medium text-gray-900">Informações Contábeis</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" type="button">
              Voltar
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => setCurrentStep('dadosBasicos')}
            >
              Avançar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'dadosBasicos') {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        setCurrentStep('informacoesContabeis');
      }} className="bg-white rounded-lg shadow-sm p-8 relative">
        <div className="flex items-center justify-center gap-16 mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute top-1/2 left-[1px] w-48 h-0.5 bg-blue-500 -translate-y-1/2"></div>
              <div className="bg-blue-500 rounded-full p-6 relative z-10">
                <FileText className="text-white" size={32} />
              </div>
            </div>
            <span className="text-base font-medium text-gray-900">Dados Básicos</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="bg-white border-4 border-gray-300 rounded-full p-6">
              <Receipt className="text-gray-400" size={32} />
            </div>
            <span className="text-base font-medium text-gray-500">Informações Contábeis</span>
          </div>
        </div>

        <div className="space-y-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Tipo de Produto"
              value={formData.tipoProduto}
              onChange={(value) => updateField('tipoProduto', value)}
              options={tipoProdutoOptions}
              placeholder="Digite ou selecione uma das opções"
              required
            />

            <Input
              label="Código"
              value={formData.codigo}
              onChange={(value) => updateField('codigo', value)}
              placeholder="Informe um código"
              required
            />

            <Input
              label="Path Number"
              value={formData.pathNumber}
              onChange={(value) => updateField('pathNumber', value)}
              placeholder="Informe um Path Number"
              required
            />

            <Select
              label="Marca"
              value={formData.marca}
              onChange={(value) => updateField('marca', value)}
              options={marcaOptions}
              placeholder="Digite ou selecione uma das opções"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Descrição"
              value={formData.descricao}
              onChange={(value) => updateField('descricao', value)}
              placeholder="Informe uma descrição"
              required
            />

            <Select
              label="Categoria"
              value={formData.categoria}
              onChange={(value) => updateField('categoria', value)}
              options={categoriaOptions}
              placeholder="Selecione uma das opções"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Fornecedor"
              value={formData.fornecedor}
              onChange={(value) => updateField('fornecedor', value)}
              options={fornecedorOptions}
              placeholder="Digite ou selecione uma das opções"
              required
            />

            <Input
              label="Valor do Item"
              value={formData.valorItem}
              onChange={(value) => updateField('valorItem', value)}
              placeholder="Informe o valor"
              required
              type="number"
            />

            <Select
              label="Unidade"
              value={formData.unidade}
              onChange={(value) => updateField('unidade', value)}
              options={unidadeOptions}
              placeholder="Digite ou selecione uma das opções"
              required
            />

            <Input
              label="Estoque Mínimo"
              value={formData.estoqueMinimo}
              onChange={(value) => updateField('estoqueMinimo', value)}
              placeholder="Informe o valor"
              required
              type="number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <TextArea
                label="Descrição Resumida"
                value={formData.descricaoResumida}
                onChange={(value) => updateField('descricaoResumida', value)}
                placeholder="Informe uma descrição"
                required
              />
            </div>

            <Input
              label="Custo Cliente"
              value={formData.custoCliente}
              onChange={(value) => updateField('custoCliente', value)}
              placeholder="Informe o valor"
              type="number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Custo Cliente"
              value={formData.custoCliente}
              onChange={(value) => updateField('custoCliente', value)}
              placeholder="Informe o valor"
              type="number"
            />

            <Input
              label="Medida"
              value={formData.medida}
              onChange={(value) => updateField('medida', value)}
              placeholder="Informe o valor"
            />

            <Input
              label="Validade do Desconto"
              value={formData.validadeDesconto}
              onChange={(value) => updateField('validadeDesconto', value)}
              placeholder="Informe uma validade"
            />

            <Input
              label="Voltagem"
              value={formData.voltagem}
              onChange={(value) => updateField('voltagem', value)}
              placeholder="Informe um valor de voltagem"
            />
          </div>

          <TextArea
            label="Observação"
            value={formData.observacao}
            onChange={(value) => updateField('observacao', value)}
            placeholder="Informe um resumo"
          />
        </div>

        <div className="flex justify-center items-center gap-3 pt-6">
          <Button variant="secondary" type="button" onClick={() => setCurrentStep('initial')}>
            Voltar
          </Button>
          <Button variant="primary" type="submit">
            Avançar
          </Button>
        </div>

        <div className="absolute bottom-8 left-8">
          <Button variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 relative">
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute top-[52px] left-1/2 w-64 h-0.5 bg-blue-500 -translate-x-1/2"></div>

        <div className="flex items-center justify-center gap-32">
          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="bg-white border-4 border-gray-300 rounded-full p-6">
              <FileText className="text-gray-400" size={32} />
            </div>
            <span className="text-base font-medium text-gray-500">Dados Básicos</span>
          </div>

          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="bg-blue-500 rounded-full p-6">
              <Receipt className="text-white" size={32} />
            </div>
            <span className="text-base font-medium text-gray-900">Informações Contábeis</span>
          </div>
        </div>
      </div>

      <div className="text-center py-32 text-gray-500">
        <p>Conteúdo da página de Informações Contábeis</p>
      </div>

      <div className="flex justify-center items-center gap-3 pt-6">
        <Button variant="secondary" type="button" onClick={() => setCurrentStep('dadosBasicos')}>
          Voltar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>

      <div className="absolute bottom-8 left-8">
        <Button variant="danger" onClick={onCancel}>
          Cancelar
        </Button>
      </div>

      <div className="absolute bottom-8 right-8">
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};

