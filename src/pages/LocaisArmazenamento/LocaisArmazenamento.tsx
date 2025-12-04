import React from 'react';
import { Plus, Pencil, Trash2, Filter, X } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb/LocaisArmazenamentoBreadCrumb';
import { Button } from '@/components/Button/LocaisArmazenamentoButton';
import { IconButton } from '@/components/Button/LocaisArmazenamentoIconButton';
import { Input } from '@/components/Input/LocaisArmazenamentoInput';
import { Table } from '@/components/Table/LocaisArmazenamentoTable';
import { useStorageLocations } from '@/hooks/useLocaisArmazenamentos';
import { StorageLocation } from '@/services/LocaisArmazenamentoMockData';

export const StorageLocations: React.FC = () => {
  const {
    storageLocations,
    filters,
    updateFilters,
    clearFilters,
    handleEdit,
    handleDelete,
    handleCreate,
  } = useStorageLocations();

  const breadcrumbItems = [
    { label: 'Páginas', href: '#' },
    { label: 'Cadastros Básicos', href: '#' },
    { label: 'Locais de Armazenamento' },
  ];

  const columns = [
    {
      key: 'ordem',
      header: 'ORDEM',
      render: (item: StorageLocation) => item.id,
      width: '80px',
    },
    {
      key: 'code',
      header: 'CÓDIGO',
      render: (item: StorageLocation) => (
        <span className="font-medium">{item.code}</span>
      ),
      width: '150px',
    },
    {
      key: 'description',
      header: 'DESCRIÇÃO',
      render: (item: StorageLocation) => item.description,
    },
    {
      key: 'storageType',
      header: 'TIPO DE ARMAZENAMENTO',
      render: (item: StorageLocation) => (
        <span className={`font-medium ${
          item.storageType === 'INTERNO' ? 'text-blue-600' : 'text-green-600'
        }`}>
          {item.storageType}
        </span>
      ),
      width: '220px',
    },
    {
      key: 'observation',
      header: 'OBSERVAÇÃO',
      render: (item: StorageLocation) => item.observation,
    },
    {
      key: 'accountsOwnStock',
      header: 'CONTABILIZA ESTOQUE PRÓPRIO',
      render: (item: StorageLocation) => (
        <span className={`font-medium ${
          item.accountsOwnStock ? 'text-green-600' : 'text-gray-500'
        }`}>
          {item.accountsOwnStock ? 'SIM' : 'NÃO'}
        </span>
      ),
      width: '240px',
    },
    {
      key: 'actions',
      header: '',
      render: (item: StorageLocation) => (
        <div className="flex items-center space-x-2">
          <IconButton
            icon={Pencil}
            onClick={() => handleEdit(item.id)}
            variant="warning"
            ariaLabel="Editar"
          />
          <IconButton
            icon={Trash2}
            onClick={() => handleDelete(item.id)}
            variant="danger"
            ariaLabel="Excluir"
          />
        </div>
      ),
      width: '120px',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Locais de Armazenamento
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filtro</h2>
            <div className="flex items-center space-x-3">
              <Button
                onClick={clearFilters}
                variant="danger"
                icon={X}
                size="sm"
              >
                Limpar
              </Button>
              <Button
                onClick={() => {}}
                variant="primary"
                icon={Filter}
                size="sm"
              >
                Filtrar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Descrição:"
              placeholder="Informe uma descrição"
              value={filters.description}
              onChange={(value) => updateFilters({ description: value })}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Tabela de Locais de Armazenamento
            </h2>
            <Button
              onClick={handleCreate}
              variant="primary"
              icon={Plus}
              size="sm"
            >
              Cadastrar
            </Button>
          </div>

          <div className="overflow-hidden">
            <Table data={storageLocations} columns={columns} />
          </div>
        </div>

        {storageLocations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum local de armazenamento encontrado
          </div>
        )}
      </div>
    </div>
  );
};
