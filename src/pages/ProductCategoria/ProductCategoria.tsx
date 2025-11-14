import React, { useState, useEffect } from 'react';
import { Trash2, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/Button/productCategoriaButton';
import { Input } from '@/components/Input/productCategoriaInput';
import { Select } from '@/components/Select/productCategoriaSelect';
import { Table } from '@/components/Table/productCategoriaTable';
import { Navbar } from '@/components/Navbar/geralNavbar';
import { ProductCategoryService, ProductCategory, equipmentTypes } from '@/services/ProductCategoryService';
import { useNavigate } from 'react-router-dom'

export const ProductCategories: React.FC = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const data = ProductCategoryService.getCategories();
    setCategories(data);
  };

  const handleClear = () => {
    setTipo('');
    setDescricao('');
    loadCategories();
  };

  const handleFilter = () => {
    let filtered = ProductCategoryService.getCategories();

    if (tipo) {
      filtered = filtered.filter((cat) =>
        cat.equipmentType?.toLowerCase().includes(tipo.toLowerCase()) ||
        cat.codigo.toLowerCase().includes(tipo.toLowerCase())
      );
    }

    if (descricao) {
      filtered = filtered.filter((cat) =>
        cat.descricao.toLowerCase().includes(descricao.toLowerCase())
      );
    }

    setCategories(filtered);
  };

  const handleEdit = (id: string) => {
    navigate(`/product/categoria/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      const success = ProductCategoryService.deleteCategory(id);
      if (success) {
        loadCategories();
      } else {
        alert('Erro ao excluir categoria.');
      }
    }
  };

  const handleDownload = (id: string) => {
    console.log('Download category:', id);
  };

  const handleCadastrar = () => {
    navigate('/product/categoria/form');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Converter equipmentTypes para o formato de opções do Select
  const tipoOptions = equipmentTypes.map(type => ({
    value: type.value,
    label: type.label
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      <div className="w-full px-6 py-6">
        <div className="text-sm text-gray-600 mb-2">
          Páginas / Cadastros Básicos / Categoria de Produto
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Categoria de Produto</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-base font-bold text-gray-900">Filtro</h2>
            <div className="flex gap-3 flex-shrink-0">
              <Button
                variant="secondary"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={handleClear}
                className="!px-5 !py-2.5 !rounded-lg !font-semibold !shadow-sm !text-sm"
              >
                Limpar
              </Button>
              <Button
                variant="primary"
                icon={<Filter className="w-4 h-4" />}
                onClick={handleFilter}
                className="!px-5 !py-2.5 !rounded-lg !font-semibold !shadow-sm !text-sm !bg-blue-600 hover:!bg-blue-700"
              >
                Filtrar
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-64 flex-shrink-0">
              <label className="block text-sm font-medium text-gray-900 mb-2">Tipo:</label>
              <Select
                placeholder="Digite ou selecione uma das opções"
                value={tipo}
                onChange={setTipo}
                options={tipoOptions} // Usando as opções convertidas
                className="!py-2.5 !rounded-lg !border-gray-300 !text-sm focus:!border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 mb-2">Descrição:</label>
              <Input
                placeholder="Informe uma descrição"
                value={descricao}
                onChange={setDescricao}
                className="w-full !py-2.5 !rounded-lg !border-gray-300 !text-sm focus:!border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-base font-bold text-gray-900">Tabela de Categoria de Produto</h2>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={handleCadastrar}
              className="!px-5 !py-2.5 !rounded-lg !font-semibold !shadow-sm !text-sm !bg-blue-600 hover:!bg-blue-700 flex-shrink-0"
            >
              Cadastrar
            </Button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg custom-table-wrapper -mx-6 sm:mx-0">
            <Table
              data={categories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};