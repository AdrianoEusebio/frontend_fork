import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/Button/CompaniesEditButton';
import { Input } from '@/components/Input/CompaniesEditInput';
import { Select } from '@/components/Select/CompaniesEditSelect';
import { Navbar } from '@/components/Navbar/geralNavbar';
import { CompaniesService, CompanyFormData } from '@/services/CompaniesService';
import { Company } from '@/services/CompaniesMockData';

export const CompanyEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<CompanyFormData>({
    nome: '',
    razaoSocial: '',
    empresaPadrao: '',
    slogan: '',
    cnpj: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    cpfRepresentante: '',
    nomeRepresentante: '',
  });

  // Carrega os dados da empresa quando o componente monta
  useEffect(() => {
    if (id) {
      const existingCompany = CompaniesService.getCompanyById(id);
      if (existingCompany) {
        setCompany(existingCompany);
        setFormData({
          nome: existingCompany.name,
          razaoSocial: existingCompany.socialReason,
          empresaPadrao: 'opcao1', // Valor padrão
          slogan: '',
          cnpj: existingCompany.cnpj,
          inscricaoEstadual: '',
          inscricaoMunicipal: '',
          cpfRepresentante: '',
          nomeRepresentante: '',
        });
      } else {
        // Se não encontrar a empresa, redireciona para a lista
        navigate('/companies/list');
      }
    }
  }, [id, navigate]);

  const handleInputChange = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelar = () => {
    navigate('/companies/list');
  };

  const handleAtualizar = () => {
    if (!id || !company) return;

    const updatedCompany = CompaniesService.updateCompany(id, formData);
    if (updatedCompany) {
      alert('Empresa atualizada com sucesso!');
      navigate('/companies/list');
    } else {
      alert('Erro ao atualizar empresa');
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      <div className="p-6">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            Páginas / Cadastros Básicos / Empresas
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            Edição de Empresa - {company.name}
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Nome"
                placeholder="Informe um nome"
                value={formData.nome}
                onChange={(value) => handleInputChange('nome', value)}
                required
              />

              <Input
                label="Razão Social"
                placeholder="Informe uma Razão Social"
                value={formData.razaoSocial}
                onChange={(value) => handleInputChange('razaoSocial', value)}
                required
              />

              <Select
                label="Empresa Padrão"
                placeholder="Clique ou selecione uma das opções"
                value={formData.empresaPadrao}
                onChange={(value) => handleInputChange('empresaPadrao', value)}
                options={[
                  { value: 'opcao1', label: 'Opção 1' },
                  { value: 'opcao2', label: 'Opção 2' },
                  { value: 'opcao3', label: 'Opção 3' }
                ]}
                required
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Input
                label="Slogan"
                placeholder="Informe o slogan"
                value={formData.slogan}
                onChange={(value) => handleInputChange('slogan', value)}
              />

              <Input
                label="CNPJ"
                placeholder="Informe o CNPJ"
                value={formData.cnpj}
                onChange={(value) => handleInputChange('cnpj', value)}
                required
              />

              <Input
                label="Inscrição Estadual"
                placeholder="Informe a inscrição"
                value={formData.inscricaoEstadual}
                onChange={(value) => handleInputChange('inscricaoEstadual', value)}
              />

              <Input
                label="Inscrição Municipal"
                placeholder="Informe a inscrição"
                value={formData.inscricaoMunicipal}
                onChange={(value) => handleInputChange('inscricaoMunicipal', value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="CPF do Representante"
                placeholder="Informe o CPF"
                value={formData.cpfRepresentante}
                onChange={(value) => handleInputChange('cpfRepresentante', value)}
              />

              <Input
                label="Nome do Representante"
                placeholder="Informe o nome do Representante"
                value={formData.nomeRepresentante}
                onChange={(value) => handleInputChange('nomeRepresentante', value)}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Cadastro:
                </label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString('pt-BR')}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuário que Cadastrou:
                </label>
                <input
                  type="text"
                  value="Admin"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data da Alteração:
                </label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString('pt-BR')}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuário que Alterou:
                </label>
                <input
                  type="text"
                  value="Usuário Atual"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-6">
            <Button
              variant="secondary"
              onClick={handleCancelar}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Cancelar
            </Button>
            <Button onClick={handleAtualizar}>
              Atualizar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};