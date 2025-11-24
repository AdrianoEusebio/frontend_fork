import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/Button/SerialListagemButton'
import { Navbar } from '@/components/Navbar/geralNavbar'
import { useNavigate } from 'react-router-dom'

export const SerialFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    produto: '',
    serial: '',
    serialFabricante: '',
    dataGarantia: '',
    valorCusto: '',
  });

  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
      navigate(path);
   };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate('/serial/list');
  };

  const handleSave = () => {
    console.log('Dados salvos:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={handleNavigate} />
            <div className="px-6 py-8">
                <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">
                    Páginas / Cadastros Básicos / Serial
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Serial</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border-2 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Cadastro de Serial
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Produto: <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        value={formData.produto}
                        onChange={(e) => handleInputChange('produto', e.target.value)}
                    >
                        <option value="">Digite ou selecione uma opção</option>
                        <option value="produto1">Produto 1</option>
                        <option value="produto2">Produto 2</option>
                        <option value="produto3">Produto 3</option>
                        <option value="produto4">Produto 4</option>
                        <option value="produto5">Produto 5</option>
                    </select>
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Serial: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Informe um Serial"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                        value={formData.serial}
                        onChange={(e) => handleInputChange('serial', e.target.value)}
                    />
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Serial do Fabricante:
                    </label>
                    <input
                        type="text"
                        placeholder="Informe um Serial"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                        value={formData.serialFabricante}
                        onChange={(e) => handleInputChange('serialFabricante', e.target.value)}
                    />
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Data da Garantia:
                    </label>
                    <div className="relative">
                        <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 w-full"
                        value={formData.dataGarantia}
                        onChange={(e) => handleInputChange('dataGarantia', e.target.value)}
                        />
                        <Calendar
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Valor Custo:
                    </label>
                    <input
                        type="text"
                        placeholder="R$ 0,00"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                        value={formData.valorCusto}
                        onChange={(e) => handleInputChange('valorCusto', e.target.value)}
                    />
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button
                    variant="danger"
                    size="md"
                    onClick={handleCancel}
                    >
                    Cancelar
                    </Button>
                    <Button
                    variant="primary"
                    size="md"
                    onClick={handleSave}
                    >
                    Salvar
                    </Button>
                </div>
                </div>
            </div>
    </div>
  );
};
