import React from 'react';
import { Download, Edit, Trash2 } from 'lucide-react';
import { ProductCategory } from '@/services/ProductCategoryService';

interface TableProps {
  data: ProductCategory[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
}

export const Table: React.FC<TableProps> = ({ data, onEdit, onDelete, onDownload }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Código
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Desconto (%)
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Valor do Desconto
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Empresa
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Centro de Custo
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Centro de Receb
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{item.codigo}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.descricao}</td>
              <td className="px-4 py-3 text-sm text-gray-900">5</td>
              <td className="px-4 py-3 text-sm text-gray-900">50</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.empresa}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.centroCusto}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.centroReceb}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDownload(item.id)}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(item.id)}
                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};