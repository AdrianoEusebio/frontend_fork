import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { TiposProdutoTable } from '@/components/Table/productTypeTable';
import { useTiposProduto } from '@/hooks/useProductType';
import { Navbar } from '@/components/Navbar/productTypeNavbar';
import { useNavigate} from 'react-router-dom'

export const TiposProduto: React.FC = () => {
  const navigate = useNavigate();
  const [codigoFilter, setCodigoFilter] = useState('');
  const [descricaoFilter, setDescricaoFilter] = useState('');
  const { tipos, filterTipos, clearFilters } = useTiposProduto();

  const handleFilter = () => {
    filterTipos(codigoFilter, descricaoFilter);
  };

  const handleClear = () => {
    setCodigoFilter('');
    setDescricaoFilter('');
    clearFilters();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={handleNavigate} />
            <div className="w-full px-6 py-6">
                <div className="text-sm text-gray-600 mb-2">
                Locações a Vencer / Cadastro de Produtos / <span className="font-semibold text-gray-800">Tipo de Produto</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Tipo de Produto</h1>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <h2 className="text-lg font-semibold text-gray-900">Dados</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Código</label>
                    <input
                        type="text"
                        value={codigoFilter}
                        onChange={(e) => setCodigoFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Digite o código"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                    <input
                        type="text"
                        value={descricaoFilter}
                        onChange={(e) => setDescricaoFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Digite a descrição"
                    />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium"
                    >
                    <X className="w-4 h-4" />
                    Limpar
                    </button>
                    <button
                    onClick={handleFilter}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
                    >
                    <Search className="w-4 h-4" />
                    Consultar
                    </button>
                </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <TiposProdutoTable data={tipos} />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium">
                    Consultar
                </button>
                <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm font-medium">
                    Fechar
                </button>
                </div>
            </div>
    </div>
  );
};
