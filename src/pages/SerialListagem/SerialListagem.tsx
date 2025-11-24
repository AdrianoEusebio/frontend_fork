import React, { useState, useEffect } from 'react';
import { Filter, Eraser, Plus, Info, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/Button/SerialListagemButton';
import { Input } from '@/components/Input/SerialListagemInput';
import { useSerialData } from '@/hooks/useSerial';
import { Navbar } from '@/components/Navbar/geralNavbar'
import { useNavigate } from 'react-router-dom'
import { Product } from '@/services/ProductService';

export const SerialPage: React.FC = () => {
  const { data, filters, updateFilter, clearFilters, deleteSerial, getProducts } = useSerialData();
  
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productsData = getProducts();
    setProducts(productsData);
  }, [getProducts]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCadastrar = () => {
    navigate('/serial/cadastration');
  };

  const handleEditar = (id: string) => {
    navigate(`/serial/edit/${id}`);
  };

  const handleExcluir = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este serial?')) {
      deleteSerial(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={handleNavigate} />
            <div className="px-6 py-8">
                <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">
                    Páginas / Cadastros Básicos / Serial
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Serial</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Filtro</h2>
                    <div className="flex gap-3">
                    <Button
                        variant="danger"
                        size="sm"
                        icon={<Eraser size={16} />}
                        onClick={clearFilters}
                    >
                        Limpar
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        icon={<Filter size={16} />}
                    >
                        Filtrar
                    </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <Input
                    label="ID:"
                    placeholder="Informe um ID"
                    value={filters.id}
                    onChange={(e) => updateFilter('id', e.target.value)}
                    />
                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Equipamento:
                    </label>
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={filters.equipamento}
                        onChange={(e) => updateFilter('equipamento', e.target.value)}
                    >
                        <option value="">Digite ou selecione uma opção</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.descricao}>
                            {product.descricao}
                          </option>
                        ))}
                    </select>
                    </div>
                    <Input
                    label="Serial:"
                    placeholder="Informe um Serial"
                    value={filters.serial}
                    onChange={(e) => updateFilter('serial', e.target.value)}
                    />
                    <Input
                    label="Serial do Fabricante:"
                    placeholder="Informe um Serial do Fabricante"
                    value={filters.serialFabricante}
                    onChange={(e) => updateFilter('serialFabricante', e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Status:</label>
                    <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="radio"
                        name="status"
                        value="Todos"
                        checked={filters.status === 'Todos'}
                        onChange={(e) => updateFilter('status', e.target.value)}
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Todos</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="radio"
                        name="status"
                        value="Ativo"
                        checked={filters.status === 'Ativo'}
                        onChange={(e) => updateFilter('status', e.target.value)}
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Ativo</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="radio"
                        name="status"
                        value="Inativo"
                        checked={filters.status === 'Inativo'}
                        onChange={(e) => updateFilter('status', e.target.value)}
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Inativo</span>
                    </label>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Tabela de Serial</h2>
                    <Button
                    variant="primary"
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={handleCadastrar}
                    >
                    Cadastrar
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Produto
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Serial
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Serial do Fabricante
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Ações
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                            {item.id}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                            {item.produto}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                            {item.serial}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                            {item.serialFabricante}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                            {item.status}
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center justify-end gap-2">
                                <button className="p-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white transition-colors">
                                    <Info size={16} />
                                </button>
                                <button 
                                    className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors" 
                                    onClick={() => handleEditar(item.id)}
                                >
                                    <Edit size={16} />
                                </button>
                                <button 
                                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                                    onClick={() => handleExcluir(item.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
    </div>
  );
};