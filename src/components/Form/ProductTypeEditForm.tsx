import React, { useState } from 'react';
import { Input } from '../Input/productTypeEditInput';
import { Select } from '../Select/productTypeEditSelect';
import { Textarea } from '../Textarea/productTypeEditTextarea';
import { Checkbox } from '../Checkbox/productTypeEditCheckbox';
import { Button } from '../Button/productTypeEditButton';
import {
  equipmentTypes,
  companies,
  costCenters,
  revenueCenters,
  type ProductCategory
} from '@/services/MockEditarDataService';

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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {initialData ? 'Edição de Categorias de Produto' : 'Cadastro de Categorias de Produto'}
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
          value={formData.equipmentType}
          onChange={(value) => handleSelectChange('equipmentType', value)}
          options={equipmentTypes}
          placeholder="Digite ou selecione uma das opções"
          required
        />

        <div className="md:col-span-1">
          <Textarea
            label="Descrição"
            name="description"
            value={formData.description}
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
          value={formData.company}
          onChange={(value) => handleSelectChange('company', value)}
          options={companies}
          placeholder="Digite ou selecione uma das opções"
          required
        />

        <Select
          label="Centro de Custos"
          value={formData.costCenter}
          onChange={(value) => handleSelectChange('costCenter', value)}
          options={costCenters}
          placeholder="Digite ou selecione uma das opções"
          required
        />

        <Select
          label="Centro de Receitas"
          value={formData.revenueCenter}
          onChange={(value) => handleSelectChange('revenueCenter', value)}
          options={revenueCenters}
          placeholder="Digite ou selecione uma das opções"
          required
        />
      </div>

      <div className="flex gap-6 mb-6">
        <Checkbox
          label="Imprimir no relatório de equipamentos"
          checked={formData.printEquipmentReport}
          onChange={(checked) => handleCheckboxChange('printEquipmentReport', checked)}
        />

        <Checkbox
          label="Gera necessidade de número de série"
          checked={formData.generateSerialNumber}
          onChange={(checked) => handleCheckboxChange('generateSerialNumber', checked)}
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
            className="bg-gray-50"
          />

          <Input
            label="Usuário que Cadastrou"
            name="registeredBy"
            value={formData.registeredBy || ''}
            placeholder="Log do usuário"
            disabled
            className="bg-gray-50"
          />

          <Input
            label="Data da Alteração"
            name="modificationDate"
            value={formData.modificationDate || ''}
            placeholder="Log da data"
            disabled
            className="bg-gray-50"
          />

          <Input
            label="Usuário que Alterou"
            name="modifiedBy"
            value={formData.modifiedBy || ''}
            placeholder="Log do usuário"
            disabled
            className="bg-gray-50"
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
