import React from 'react';
import { Check, X } from 'lucide-react';
import { TipoProduto } from '@/services/ProductTypeMockDataService';

interface TiposProdutoTableProps {
  data: TipoProduto[];
}

export const TiposProdutoTable: React.FC<TiposProdutoTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Código
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Categ. Financeira
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Locação
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Saídas
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Manutenção
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Orçamento
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Fatura
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.codigo}
              className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                index === 8 ? 'bg-blue-100' : ''
              }`}
            >
              <td className="px-4 py-3 text-sm text-gray-900 font-medium">{item.codigo}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.descricao}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.categoriaFinanceira}</td>
              <td className="px-4 py-3 text-center">
                {item.locacao ? (
                  <div className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-5 h-5">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {item.saidas ? (
                  <div className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-5 h-5">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {item.manutencao ? (
                  <div className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-5 h-5">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {item.orcamento ? (
                  <div className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-5 h-5">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {item.fatura ? (
                  <div className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-5 h-5">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
