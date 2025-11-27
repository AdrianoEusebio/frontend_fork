import React, { useState } from 'react';
import { FileText, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/CompaniesCadastrationButton';
import { Input } from '@/components/Input/CompaniesCadastrationInput';
import { Select } from '@/components/Select/CompaniesCadastrationSelect';
import { FormSection } from '@/components/Form/CompaniesCadastrationFormSection';
import { Navbar } from '@/components/Navbar/geralNavbar'


export const CompanyFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    razaoSocial: '',
    slogan: '',
    cnpj: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    cpfRepresentante: '',
    nomeRepresentante: '',
    empresaPadrao: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVoltar = () => {
    console.log('Voltar');
  };

  const handleAvancar = () => {
    console.log('Avançar', formData);
  };

  const handleCancelar = () => {
    navigate('/companies/list');
  };

  const handleSalvar = () => {
    console.log('Salvar', formData);
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
                    Página / Cadastros Básicos / Empresas
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
                </div>

                <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-8">Cadastro de Empresa</h2>

                <div className="border-t-2 border-blue-500 pt-8">
                    <div className="grid grid-cols-2 gap-x-16">
                        <FormSection
                        title="Dados Principais"
                        icon={<FileText className="w-6 h-6 text-white" />}
                        />

                        <FormSection
                        title="Logo da Empresa"
                        icon={<Image className="w-6 h-6 text-white" />}
                        ></FormSection>
                    </div>

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
                            { value: 'empresa1', label: 'Empresa 1' },
                            { value: 'empresa2', label: 'Empresa 2' },
                            { value: 'empresa3', label: 'Empresa 3' }
                            ]}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-x-4">
                        <Input
                        label="Slogan"
                        placeholder="Informe o slogan"
                        value={formData.slogan}
                        onChange={(value) => handleInputChange('slogan', value)}
                        required
                        />

                        <Input
                        label="CNPJ"
                        placeholder="Informe o slogan"
                        value={formData.cnpj}
                        onChange={(value) => handleInputChange('cnpj', value)}
                        required
                        />

                        <Input
                        label="Inscrição Estadual"
                        placeholder="Informe o slogan"
                        value={formData.inscricaoEstadual}
                        onChange={(value) => handleInputChange('inscricaoEstadual', value)}
                        required
                        />

                        <Input
                        label="Inscrição Municipal"
                        placeholder="Informe o slogan"
                        value={formData.inscricaoMunicipal}
                        onChange={(value) => handleInputChange('inscricaoMunicipal', value)}
                        required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                        label="CPF do Representante"
                        placeholder="Informe o CPF"
                        value={formData.cpfRepresentante}
                        onChange={(value) => handleInputChange('cpfRepresentante', value)}
                        required
                        />

                        <Input
                        label="Nome do Representante"
                        placeholder="Informe o nome do Representante"
                        value={formData.nomeRepresentante}
                        onChange={(value) => handleInputChange('nomeRepresentante', value)}
                        required
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-3 mt-6">
                        <Button variant="secondary" onClick={handleVoltar}>
                        Voltar
                        </Button>
                        <Button onClick={handleAvancar}>
                        Avançar
                        </Button>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <Button variant="secondary" onClick={handleCancelar} className="bg-red-500 hover:bg-red-600 text-white">
                    Cancelar
                    </Button>
                    <Button onClick={handleSalvar}>
                    Salvar
                    </Button>
                </div>
                </div>
            </div>
    </div>
  );
};
