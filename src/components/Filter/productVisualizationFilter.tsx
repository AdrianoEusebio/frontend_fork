import { useState } from 'react';
import { Filter, Trash2 } from 'lucide-react';
import { Input } from '@/components/Input/productVisualizationInput';
import { Button } from '@/components/Button/productVisualizationButton';
import { ProductFilters } from '@/services/ProductVisualizationFilterMockData';

interface ProductFilterProps {
  onFilter: (filters: ProductFilters) => void;
  onClear: () => void;
}

export const ProductFilter = ({ onFilter, onClear }: ProductFilterProps) => {
  const [filters, setFilters] = useState<ProductFilters>({
    codigo: '',
    partnumber: '',
    tipoProduto: '',
    marca: '',
    empresaVinculada: '',
    descontoAplicado: '',
    status: '',
    peso: '',
    comSerial: true,
    semSerial: true,
    comEstoque: true,
    sublocados: true,
    comPeso: true,
    semPeso: true,
  });

  const handleSubmit = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({
      codigo: '',
      partnumber: '',
      tipoProduto: '',
      marca: '',
      empresaVinculada: '',
      descontoAplicado: '',
      status: '',
      peso: '',
      comSerial: true,
      semSerial: true,
      comEstoque: true,
      sublocados: true,
      comPeso: true,
      semPeso: true,
    });
    onClear();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filtro</h3>
        <div className="flex gap-2">
          <Button variant="danger" onClick={handleClear}>
            <Trash2 size={18} />
            Limpar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <Filter size={18} />
            Filtrar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Input
          label="Código:"
          placeholder="Informe um código"
          value={filters.codigo}
          onChange={(e) => setFilters({ ...filters, codigo: e.target.value })}
        />
        <Input
          label="PartNumber:"
          placeholder="Informe um Path Number"
          value={filters.partnumber}
          onChange={(e) => setFilters({ ...filters, partnumber: e.target.value })}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Tipo de Produto:</label>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Digite ou selecione uma das opções</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Marca:</label>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Digite ou selecione uma das opções</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Empresa Vinculada:</label>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Digite ou selecione uma das opções</option>
          </select>
        </div>
        <Input
          label="Desconto Aplicado (%):"
          placeholder="Informe o desconto"
          value={filters.descontoAplicado}
          onChange={(e) => setFilters({ ...filters, descontoAplicado: e.target.value })}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Selecione uma das opções</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Peso:</label>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Selecione uma das opções</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Números de Série:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.comSerial}
                onChange={(e) => setFilters({ ...filters, comSerial: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Com Serial</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.semSerial}
                onChange={(e) => setFilters({ ...filters, semSerial: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Sem Serial</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.comEstoque}
                onChange={(e) => setFilters({ ...filters, comEstoque: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Com estoque</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sublocados}
                onChange={(e) => setFilters({ ...filters, sublocados: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Sublocados</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Peso:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.comPeso}
                onChange={(e) => setFilters({ ...filters, comPeso: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Com peso</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.semPeso}
                onChange={(e) => setFilters({ ...filters, semPeso: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Sem Peso</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
