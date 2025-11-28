import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/Button/CompaniesListButton';
import { CompanyTable } from '@/components/Table/CompaniesListTable';
import { useCompanies } from '@/hooks/useCompanies';
import { Navbar } from '@/components/Navbar/geralNavbar'
import { CompaniesService } from '@/services/CompaniesService';

export const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const { companies, loading, error, refreshCompanies } = useCompanies();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCadastro = () => {
    navigate('/companies/cadastration')
  };

  const handleEdit = (companyId: string) => {
    navigate(`/companies/edit/${companyId}`) // Agora passa o ID na URL
  };

  const handleDelete = (companyId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      const success = CompaniesService.deleteCompany(companyId);
      if (success) {
        alert('Empresa excluída com sucesso!');
        refreshCompanies(); // Atualiza a lista após exclusão
      } else {
        alert('Erro ao excluir empresa');
      }
    }
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

        <CompanyTable companies={companies} onEdit={handleEdit} onDelete={handleDelete}/>
      </div>
    </div>
  );
};