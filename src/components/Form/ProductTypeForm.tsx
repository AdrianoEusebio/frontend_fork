import React, { useState } from 'react';
import { Input } from '@/components/Input/productTypeCadastrationInput';
import { Select } from '@/components/Select/ProductTypeCadastrationSelect';
import { Textarea } from '@/components/Textarea/ProductTypeCadastrationTextarea';
import { Checkbox } from '@/components/Checkbox/productTypeCadastrationCheckbox';
import { Button } from '@/components/Button/productTypeCadastrationButton';
import { ProductCategory, equipmentTypes, companies, costCenters, revenueCenters } from '@/services/ProductCategoryService';

interface ProductCategoryFormProps {
  initialData?: ProductCategory;
  onSubmit: (data: ProductCategory) => void;
  onCancel: () => void;
}

export const ProductCategoryForm: React.FC<ProductCategoryFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<ProductCategory>(
    initialData || {
      id: '',
      codigo: '',
      descricao: '',
      desconto: '',
      valorDesconto: '',
      empresa: '',
      centroCusto: '',
      centroReceb: '',
      imprimirRelat: '',
      aplicarAuto: '',
      equipmentType: '',
      description: '',
      company: '',
      costCenter: '',
      revenueCenter: '',
      printEquipmentReport: false,
      generateSerialNumber: true
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Garantir que os campos principais estejam preenchidos
    const submitData: ProductCategory = {
      ...formData,
      codigo: formData.codigo || formData.equipmentType || '',
      descricao: formData.descricao || formData.description || '',
      empresa: formData.empresa || formData.company || '',
      centroCusto: formData.centroCusto || formData.costCenter || '',
      centroReceb: formData.centroReceb || formData.revenueCenter || '',
    };
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {initialData ? 'Edição de Categoria de Produto' : 'Cadastro de Categoria de Produto'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Input
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Informe um ID"
          required
          disabled={!!initialData}
          className={initialData ? 'bg-gray-50' : ''}
        />

        <Select
          label="Tipo de Equipamento"
          name="equipmentType"
          value={formData.equipmentType || ''}
          onChange={handleChange}
          options={equipmentTypes}
          placeholder="Digite ou selecione uma das opções"
          required
        />

        <div className="md:col-span-1">
          <Textarea
            label="Descrição"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Informe uma descrição"
            rows={1}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Select
          label="Empresa"
          name="company"
          value={formData.company || ''}
          onChange={handleChange}
          options={companies}
          placeholder="Digite ou selecione uma das opções"
          required
        />

        <Select
          label="Centro de Custos"
          name="costCenter"
          value={formData.costCenter || ''}
          onChange={handleChange}
          options={costCenters}
          placeholder="Digite ou selecione uma das opções"
          required
        />

        <Select
          label="Centro de Receitas"
          name="revenueCenter"
          value={formData.revenueCenter || ''}
          onChange={handleChange}
          options={revenueCenters}
          placeholder="Digite ou selecione uma das opções"
          required
        />
      </div>

      <div className="flex gap-6 mb-6">
        <Checkbox
          label="Imprimir no relatório de equipamentos"
          name="printEquipmentReport"
          checked={formData.printEquipmentReport || false}
          onChange={handleChange}
        />

        <Checkbox
          label="Gera necessidade de número de série"
          name="generateSerialNumber"
          checked={formData.generateSerialNumber !== false}
          onChange={handleChange}
        />
      </div>

      {initialData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 pt-6 border-t border-gray-200">
          <Input
            label="Data do Cadastro"
            name="registrationDate"
            value={formData.registrationDate || ''}
            placeholder="Log da data"
            disabled
          />

          <Input
            label="Usuário que Cadastrou"
            name="registeredBy"
            value={formData.registeredBy || ''}
            placeholder="Log do usuário"
            disabled
          />

          <Input
            label="Data da Alteração"
            name="modificationDate"
            value={formData.modificationDate || ''}
            placeholder="Log da data"
            disabled
          />

          <Input
            label="Usuário que Alterou"
            name="modifiedBy"
            value={formData.modifiedBy || ''}
            placeholder="Log do usuário"
            disabled
          />
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="danger" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};