import { Eye, Edit, Trash2, Plus, FileDown } from 'lucide-react';
import { Product } from '@/services/ProductsVisualizationTypeMockData';
import { Button } from '@/components/Button/productVisualizationButton';

interface ProductTableProps {
  products: Product[];
  selectedProducts: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onCadastrar: () => void;
  onEditar: () => void;
  onVisualizar: () => void;
  onDeletar: () => void;
}

export const ProductTable = ({
  products,
  selectedProducts,
  onToggleSelect,
  onToggleSelectAll,
  onCadastrar,
  onEditar,
  onVisualizar,
  onDeletar
}: ProductTableProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Tabela de Categorias de Produto
        </h3>
        <div className="flex gap-2">
          <Button variant="primary">
            <span className="text-lg">💲</span>
            Requisita de Preço
          </Button>
          <Button variant="primary">
            <FileDown size={18} />
            Importar/Exportar
          </Button>
          <Button variant="primary" onClick={onCadastrar}>
            <Plus size={18} />
            Cadastrar
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                CÓDIGO
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                PARTNUMBER
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                MARCA
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                DESCRIÇÃO
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                UNIDADE
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                PESO
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                VALOR DE CUSTO (R$)
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                DESCRIÇÃO RESUMIDA
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                AÇÕES
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => onToggleSelect(product.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {product.status}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.codigo}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.partnumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.marca}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.descricao}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.unidade}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.peso}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.valorCusto.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {product.descricaoResumida}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors" onClick={onVisualizar}>
                      <Eye size={16} />
                    </button>
                    <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors" onClick={onEditar}>
                      <Edit size={16} />
                    </button>
                    <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors" onClick={onDeletar}>
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
  );
};
