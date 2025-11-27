import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/CompaniesEditButton';
import { Input } from '@/components/Input/CompaniesEditInput';
import { Select } from '@/components/Select/CompaniesEditSelect';
import { Navbar } from '@/components/Navbar/geralNavbar';

export const CompanyEditPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: 'Nome informado',
    razaoSocial: 'Razão Social informada',
    empresaPadrao: 'Opção selecionada',
    slogan: 'Informe o slogan',
    cnpj: 'CNPJ informada',
    inscricaoEstadual: 'Inscrição informada',
    inscricaoMunicipal: 'Inscrição informada',
    cpfRepresentante: '12345678900',
    nomeRepresentante: 'Nome do Representante informada',
    dataCadastro: 'Log da data',
    usuarioCadastro: 'Log do usuário',
    dataAlteracao: '',
    usuarioAlteracao: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelar = () => {
    navigate('/companies/list');
  };

  const handleAtualizar = () => {
   navigate('/companies/list');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

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
                <h2 className="text-xl font-bold text-gray-900 mb-8">Edição de Empresa</h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                    <Input
                        label="Nome"
                        placeholder="Nome informado"
                        value={formData.nome}
                        onChange={(value) => handleInputChange('nome', value)}
                        required
                    />

                    <Input
                        label="Razão Social"
                        placeholder="Razão Social informada"
                        value={formData.razaoSocial}
                        onChange={(value) => handleInputChange('razaoSocial', value)}
                        required
                    />

                    <Select
                        label="Empresa Padrão"
                        placeholder="Opção selecionada"
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
                        placeholder="CNPJ informada"
                        value={formData.cnpj}
                        onChange={(value) => handleInputChange('cnpj', value)}
                        required
                    />

                    <Input
                        label="Inscrição Estadual"
                        placeholder="Inscrição informada"
                        value={formData.inscricaoEstadual}
                        onChange={(value) => handleInputChange('inscricaoEstadual', value)}
                        required
                    />

                    <Input
                        label="Inscrição Municipal"
                        placeholder="Inscrição informada"
                        value={formData.inscricaoMunicipal}
                        onChange={(value) => handleInputChange('inscricaoMunicipal', value)}
                        required
                    />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="CPF do Representante"
                        placeholder="12345678900"
                        value={formData.cpfRepresentante}
                        onChange={(value) => handleInputChange('cpfRepresentante', value)}
                        required
                    />

                    <Input
                        label="Nome do Representante"
                        placeholder="Nome do Representante informada"
                        value={formData.nomeRepresentante}
                        onChange={(value) => handleInputChange('nomeRepresentante', value)}
                        required
                    />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Cadastro:
                        </label>
                        <input
                        type="text"
                        value={formData.dataCadastro}
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
                        value={formData.usuarioCadastro}
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
                        value={formData.dataAlteracao}
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
                        value={formData.usuarioAlteracao}
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
