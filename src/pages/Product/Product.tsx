import React, { useState } from 'react';
import { Trash2, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/Button/productButton';
import { Input } from '@/components/Input/productInput';
import { Select } from '@/components/Select/productSelect';
import { Table } from '@/components/Table/productTable';
import { Navbar } from '@/components/Navbar/productNavbar';
import { mockProductCategories, ProductCategory } from '@/services/MockDataService';
import { useNavigate } from 'react-router-dom'

export const ProductCategories: React.FC = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categories, setCategories] = useState<ProductCategory[]>(mockProductCategories);

  const handleClear = () => {
    setTipo('');
    setDescricao('');
  };

  const handleFilter = () => {
    let filtered = [...mockProductCategories];

    if (tipo) {
      filtered = filtered.filter((cat) =>
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

  const handleEdit = (id: number) => {
    navigate('/product/edit');
  };

  const handleDelete = (id: number) => {
    console.log('Delete category:', id);
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleDownload = (id: number) => {
    console.log('Download category:', id);
  };

  const handleCadastrar = () => {
    navigate('/product/form');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-6 py-6">
        <div className="text-sm text-gray-600 mb-2">
          Páginas / Cadastros Básicos / Categorias de Produto
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Categorias de Produto</h1>

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
            <h2 className="text-base font-bold text-gray-900">Tabela de Categorias de Produto</h2>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={handleCadastrar}
              className="!px-5 !py-2.5 !rounded-lg !font-semibold !shadow-sm !text-sm !bg-blue-600 hover:!bg-blue-700 flex-shrink-0"
            >
              Cadastrar
            </Button>
          </div>

          <style>{`
            .custom-table-wrapper table {
              width: 100%;
              background-color: white;
              table-layout: auto;
              min-width: 100%;
            }
            .custom-table-wrapper thead {
              background-color: rgb(249 250 251);
            }
            .custom-table-wrapper th {
              padding: 0.875rem 1.25rem;
              text-align: left;
              font-size: 0.6875rem;
              font-weight: 700;
              color: rgb(55 65 81);
              text-transform: uppercase;
              letter-spacing: 0.05em;
              white-space: nowrap;
              vertical-align: middle;
            }
            .custom-table-wrapper td {
              padding: 0.875rem 1.25rem;
              font-size: 0.8125rem;
              font-weight: 500;
              color: rgb(17 24 39);
              white-space: nowrap;
              vertical-align: middle;
            }
            .custom-table-wrapper tbody {
              border-top: 1px solid rgb(229 231 235);
            }
            .custom-table-wrapper tbody tr {
              border-bottom: 1px solid rgb(229 231 235);
            }
            .custom-table-wrapper tbody tr:hover {
              background-color: rgb(249 250 251);
              transition: background-color 0.2s;
            }
          `}</style>
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