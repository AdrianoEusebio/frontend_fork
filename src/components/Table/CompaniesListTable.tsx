import React from 'react';
import { Company } from '@/services/CompaniesMockData';
import { ActionButtons } from '@/components/Button/CompaniesListActionButton';

interface CompanyTableProps {
  companies: Company[];
}

export const CompanyTable: React.FC<CompanyTableProps> = ({ companies }) => {
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
                Telefone 1
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Telefone 2
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                E-mail
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                Website
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                CNPJ
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
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
                  {company.phone1}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.phone2}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.email}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.website}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-900">
                  {company.cnpj}
                </td>
                <td className="px-3 py-3">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
