import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/Button/SerialListagemButton';
import { Navbar } from '@/components/Navbar/geralNavbar'
import { useNavigate } from 'react-router-dom';

interface HistoryRecord {
  original: string;
  novo: string;
  data: string;
  usuario: string;
  tipo: string;
}

const mockHistoryData: HistoryRecord[] = [
  {
    original: 'SERIAL ORIGINAL 1',
    novo: 'NOVO ORIGINAL 1',
    data: '01/01/2025',
    usuario: 'NOME DO USUÁRIO 1',
    tipo: 'TIPO 1',
  },
  {
    original: 'SERIAL ORIGINAL 2',
    novo: 'NOVO ORIGINAL 2',
    data: '02/01/2025',
    usuario: 'NOME DO USUÁRIO 2',
    tipo: 'TIPO 2',
  },
  {
    original: 'SERIAL ORIGINAL 3',
    novo: 'NOVO ORIGINAL 3',
    data: '03/01/2025',
    usuario: 'NOME DO USUÁRIO 3',
    tipo: 'TIPO 3',
  },
  {
    original: 'SERIAL ORIGINAL 4',
    novo: 'NOVO ORIGINAL 4',
    data: '04/01/2025',
    usuario: 'NOME DO USUÁRIO 4',
    tipo: 'TIPO 4',
  },
  {
    original: 'SERIAL ORIGINAL 5',
    novo: 'NOVO ORIGINAL 5',
    data: '05/01/2025 5',
    usuario: 'NOME DO USUÁRIO 5',
    tipo: 'TIPO 5',
  },
];

export const SerialEditPage: React.FC = () => {
  const [formData, setFormData] = useState({
    produto: 'Opção selecionada',
    serial: 'Serial informado',
    serialFabricante: '',
    dataGarantia: '',
    valorCusto: '',
  });

  const [metadataFields, setMetadataFields] = useState({
    dataCadastro: 'Log da data',
    usuarioCadastro: 'Log do usuário',
    dataAlteracao: '',
    usuarioAlterou: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate('/serial/list');
  };

  const handleUpdate = () => {
    console.log('Atualizar serial:', formData);
  };

  const handleNavigate = (path: string) => {
      navigate(path);
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

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Edição de Serial
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Produto:
                    </label>
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        value={formData.produto}
                        onChange={(e) => handleInputChange('produto', e.target.value)}
                    >
                        <option value="Opção selecionada">Opção selecionada</option>
                        <option value="produto1">Produto 1</option>
                        <option value="produto2">Produto 2</option>
                        <option value="produto3">Produto 3</option>
                    </select>
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Serial:
                    </label>
                    <input
                        type="text"
                        placeholder="Serial informado"
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
                        type="text"
                        placeholder="dd/mm/aaaa"
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
                        placeholder="Informe um valor"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                        value={formData.valorCusto}
                        onChange={(e) => handleInputChange('valorCusto', e.target.value)}
                    />
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Histórico
                    </h3>

                    <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Original
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Novo
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Data
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Usuário
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Tipo
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {mockHistoryData.map((record, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                {record.original}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                                {record.novo}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                                {record.data}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                                {record.usuario}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                                {record.tipo}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Data de Cadastro:
                    </label>
                    <input
                        type="text"
                        placeholder="Log da data"
                        disabled
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        value={metadataFields.dataCadastro}
                    />
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Usuário que Cadastrou:
                    </label>
                    <input
                        type="text"
                        placeholder="Log do usuário"
                        disabled
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        value={metadataFields.usuarioCadastro}
                    />
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Data da Alteração:
                    </label>
                    <input
                        type="text"
                        disabled
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        value={metadataFields.dataAlteracao}
                    />
                    </div>

                    <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Usuário que Alterou:
                    </label>
                    <input
                        type="text"
                        disabled
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        value={metadataFields.usuarioAlterou}
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
                    onClick={handleUpdate}
                    >
                    Atualizar
                    </Button>
                </div>
                </div>
            </div>
    </div>
  );
};
