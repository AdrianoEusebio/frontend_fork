import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/Button/CompaniesListButton';
import { CompanyTable } from '@/components/Table/CompaniesListTable';
import { useCompanies } from '@/hooks/useCompanies';
import { Navbar } from '@/components/Navbar/geralNavbar'

export const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();

  const { companies, loading, error } = useCompanies();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCadastro = () => {
    navigate('/companies/cadastration')
  };

  const handleEdit = () => {
    navigate('/companies/edit')
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={handleNavigate} />
            <div className="p-6">
                <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">
                    Página / Cadastros Básicos / Empresas
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
                </div>

                <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Tabela de Empresas</h2>
                <Button 
                icon={<Plus className="w-4 h-4" />}
                onClick={handleCadastro}>
                    Cadastrar
                </Button>
                </div>

                <CompanyTable companies={companies} onEdit={handleEdit}/>
            </div>
    </div>
  );
};
