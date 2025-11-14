import { useState, useEffect } from 'react';
import { Filter, Trash2 } from 'lucide-react';
import { Input } from '@/components/Input/productVisualizationInput';
import { Select } from '@/components/Select/productVisualizationSelect';
import { Button } from '@/components/Button/productVisualizationButton';
import { ProductFilters } from '@/services/ProductService';
import { tipoProdutoOptions, marcaOptions } from '@/services/ProductService';

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

  // Estado para as marcas filtradas
  const [filteredMarcaOptions, setFilteredMarcaOptions] = useState<{value: string, label: string}[]>([]);

  // Efeito para filtrar marcas quando o tipo de produto muda
  useEffect(() => {
    if (filters.tipoProduto) {
      const selectedTipoProduto = tipoProdutoOptions.find(option => option.value === filters.tipoProduto);
      if (selectedTipoProduto) {
        const filteredMarcas = marcaOptions
          .filter(marca => marca.Tag === selectedTipoProduto.Tag)
          .map(marca => ({
            value: marca.value,
            label: marca.label
          }));
        setFilteredMarcaOptions(filteredMarcas);
        
        // Resetar marca selecionada se não for compatível com o novo tipo
        if (filters.marca && !filteredMarcas.some(marca => marca.value === filters.marca)) {
          setFilters(prev => ({ ...prev, marca: '' }));
        }
      }
    } else {
      setFilteredMarcaOptions([]);
      setFilters(prev => ({ ...prev, marca: '' }));
    }
  }, [filters.tipoProduto]);

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

  // Converter as opções para o formato esperado pelo Select
  const tipoProdutoSelectOptions = tipoProdutoOptions.map(option => ({
    value: option.value,
    label: option.label
  }));

  const statusOptions = [
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Inativo', label: 'Inativo' }
  ];

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
        <Select
          label="Tipo de Produto:"
          placeholder="Digite ou selecione uma das opções"
          value={filters.tipoProduto}
          onChange={(value) => setFilters({ ...filters, tipoProduto: value })}
          options={tipoProdutoSelectOptions}
        />
        <Select
          label="Marca:"
          placeholder={filters.tipoProduto ? "Selecione uma marca" : "Selecione primeiro o tipo de produto"}
          value={filters.marca}
          onChange={(value) => setFilters({ ...filters, marca: value })}
          options={filteredMarcaOptions}
          disabled={!filters.tipoProduto}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <Input
          label="Empresa Vinculada:"
          placeholder="Campo não disponível"
          value={filters.empresaVinculada}
          onChange={(e) => setFilters({ ...filters, empresaVinculada: e.target.value })}
          disabled
        />
        <Input
          label="Desconto Aplicado (%):"
          placeholder="Campo não disponível"
          value={filters.descontoAplicado}
          onChange={(e) => setFilters({ ...filters, descontoAplicado: e.target.value })}
          disabled
        />
        <Select
          label="Status:"
          placeholder="Selecione uma das opções"
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value })}
          options={statusOptions}
        />
        <Input
          label="Peso:"
          placeholder="Informe o peso"
          value={filters.peso}
          onChange={(e) => setFilters({ ...filters, peso: e.target.value })}
        />
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
                disabled
              />
              <span className="text-sm text-gray-700">Com Serial</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.semSerial}
                onChange={(e) => setFilters({ ...filters, semSerial: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                disabled
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
                disabled
              />
              <span className="text-sm text-gray-700">Com estoque</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sublocados}
                onChange={(e) => setFilters({ ...filters, sublocados: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                disabled
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
                disabled
              />
              <span className="text-sm text-gray-700">Com peso</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.semPeso}
                onChange={(e) => setFilters({ ...filters, semPeso: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <span className="text-sm text-gray-700">Sem Peso</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};