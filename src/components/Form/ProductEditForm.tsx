import React, { useState, useEffect } from 'react';
import { Input } from '@/components/Input/productEditInput';
import { Select } from '@/components/Select/productEditSelect';
import { Textarea } from '@/components/Textarea/productEditTextarea';
import { Button } from '@/components/Button/productEditButton';
import { Checkbox } from '@/components/Checkbox/productEditCheckbox';
import { Product, tipoProdutoOptions, marcaOptions, categoriaOptions, fornecedorOptions, unidadeOptions } from '@/services/ProductService';

interface ProductEditFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
}

export const ProductEditForm: React.FC<ProductEditFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Product>(
    initialData || {
      id: '',
      status: '',
      codigo: '',
      partnumber: '',
      marca: '',
      descricao: '',
      unidade: '',
      peso: 0,
      valorCusto: 0,
      descricaoResumida: '',
      tipoProduto: '',
      pathNumber: '',
      categoria: '',
      fornecedor: '',
      valorItem: '',
      estoqueMinimo: '',
      custoCliente: '',
      medida: '',
      validadeDesconto: '',
      voltagem: '',
      isEletrico: true,
      observacao: '',
      dataCadastro: '',
      usuarioCadastro: '',
      dataAlteracao: '',
      usuarioAlterou: ''
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChange = (field: keyof Product, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Converter campos numéricos
    const submitData: Product = {
      ...formData,
      valorCusto: parseFloat(formData.valorItem) || 0,
      peso: parseFloat(formData.medida) || 0
    };
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Edição de Dados Básicos do Produto
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Tipo de Produto"
            required
            options={tipoProdutoOptions}
            value={formData.tipoProduto}
            onChange={(e) => handleChange('tipoProduto', e.target.value)}
          />
          <Input
            label="Código"
            required
            placeholder="Código informado"
            value={formData.codigo}
            onChange={(e) => handleChange('codigo', e.target.value)}
            disabled={!!initialData}
            className={initialData ? 'bg-gray-50' : ''}
          />
          <Input
            label="PathNumber"
            required
            placeholder="Pathnumber informado"
            value={formData.pathNumber}
            onChange={(e) => handleChange('pathNumber', e.target.value)}
          />
          <Select
            label="Marca"
            required
            options={marcaOptions}
            value={formData.marca}
            onChange={(e) => handleChange('marca', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Descrição"
            required
            placeholder="Descrição informada"
            value={formData.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
          />
          <Select
            label="Categoria"
            required
            options={categoriaOptions}
            value={formData.categoria}
            onChange={(e) => handleChange('categoria', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Fornecedor"
            required
            options={fornecedorOptions}
            value={formData.fornecedor}
            onChange={(e) => handleChange('fornecedor', e.target.value)}
          />
          <Input
            label="Valor do Item"
            required
            placeholder="Valor informado"
            value={formData.valorItem}
            onChange={(e) => handleChange('valorItem', e.target.value)}
            type="number"
          />
          <Select
            label="Unidade"
            required
            options={unidadeOptions}
            value={formData.unidade}
            onChange={(e) => handleChange('unidade', e.target.value)}
          />
          <Input
            label="Estoque Mínimo"
            required
            placeholder="Valor informado"
            value={formData.estoqueMinimo}
            onChange={(e) => handleChange('estoqueMinimo', e.target.value)}
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Descrição Resumida"
            required
            placeholder="Descrição resumida informada"
            value={formData.descricaoResumida}
            onChange={(e) => handleChange('descricaoResumida', e.target.value)}
          />
          <Input
            label="Custo Cliente"
            placeholder="Informe o valor"
            value={formData.custoCliente}
            onChange={(e) => handleChange('custoCliente', e.target.value)}
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Medida"
            placeholder="Informe o valor"
            value={formData.medida}
            onChange={(e) => handleChange('medida', e.target.value)}
          />
          <Input
            label="Validade do Desconto"
            placeholder="Informe uma validade"
            value={formData.validadeDesconto}
            onChange={(e) => handleChange('validadeDesconto', e.target.value)}
          />
          <Input
            label="Voltagem"
            placeholder="Informe um valor de voltagem"
            value={formData.voltagem}
            onChange={(e) => handleChange('voltagem', e.target.value)}
          />

          <Checkbox
            label="É Equipamento Elétrico?"
            name="isEletrico"
            checked={formData.isEletrico}
            onChange={handleChangeCheckbox}
          />
        </div>

        <Textarea
          label="Observação"
          placeholder="Informe um resumo"
          value={formData.observacao}
          onChange={(e) => handleChange('observacao', e.target.value)}
        />

        {initialData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Data de Cadastro"
              placeholder="Log da data"
              disabled
              value={formData.dataCadastro || ''}
              onChange={(e) => handleChange('dataCadastro', e.target.value)}
            />
            <Input
              label="Usuário que Cadastrou"
              placeholder="Log do usuário"
              disabled
              value={formData.usuarioCadastro || ''}
              onChange={(e) => handleChange('usuarioCadastro', e.target.value)}
            />
            <Input
              label="Data de Alteração"
              placeholder=""
              disabled
              value={formData.dataAlteracao || ''}
              onChange={(e) => handleChange('dataAlteracao', e.target.value)}
            />
            <Input
              label="Usuário que Alterou"
              placeholder=""
              disabled
              value={formData.usuarioAlterou || ''}
              onChange={(e) => handleChange('usuarioAlterou', e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Atualizar
          </Button>
        </div>
      </div>
    </form>
  );
};