import React from 'react';
import { Company } from '@/services/CompaniesMockData';
import { ActionButtons } from '@/components/Button/CompaniesListActionButton';

interface CompanyTableProps {
  companies: Company[];
  onEdit?: (companyId: string) => void;
  onDelete?: (companyId: string) => void;
}

export const CompanyTable: React.FC<CompanyTableProps> = ({ companies, onEdit, onDelete}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Código
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Nome
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Razão Social
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Endereço
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                CNPJ
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide w-20">
                {/* Coluna de ações - largura fixa */}
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr
                key={company.id}
                className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="px-3 py-3 text-[13px] font-semibold text-gray-900">
                  {company.id}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.name}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.socialReason}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.address}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.cnpj}
                </td>
                <td className="px-3 py-3 text-right w-20">
                  <div className="flex justify-end gap-1 pr-1">
                    <ActionButtons 
                      onEdit={() => onEdit?.(company.id)}
                      onDelete={() => onDelete?.(company.id)} 
                    />
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