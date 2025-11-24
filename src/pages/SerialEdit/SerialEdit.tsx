import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/Button/SerialListagemButton';
import { Navbar } from '@/components/Navbar/geralNavbar'
import { useNavigate, useParams } from 'react-router-dom';
import { useSerialData } from '@/hooks/useSerial';
import { Product } from '@/services/ProductService';

export const SerialEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    produtoId: '',
    serial: '',
    serialFabricante: '',
    dataGarantia: '',
    valorCusto: '',
    status: 'Ativo' as 'Ativo' | 'Inativo'
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [metadataFields, setMetadataFields] = useState({
    dataCadastro: '',
    usuarioCadastro: '',
    dataAlteracao: '',
    usuarioAlterou: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { updateSerial, getSerial, getProducts, loadData } = useSerialData();
  const navigate = useNavigate();

  useEffect(() => {
    const productsData = getProducts();
    setProducts(productsData);

    if (id) {
      const serial = getSerial(id);
      if (serial) {
        setFormData({
          produtoId: serial.produtoId,
          serial: serial.serial,
          serialFabricante: serial.serialFabricante,
          dataGarantia: serial.dataGarantia,
          valorCusto: serial.valorCusto.toString(),
          status: serial.status
        });
        setMetadataFields({
          dataCadastro: serial.dataCadastro,
          usuarioCadastro: serial.usuarioCadastro,
          dataAlteracao: serial.dataAlteracao || '',
          usuarioAlterou: serial.usuarioAlterou || ''
        });
      }
    }
  }, [id, getSerial, getProducts]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.produtoId) {
      newErrors.produtoId = 'Produto é obrigatório';
    }

    if (!formData.serial.trim()) {
      newErrors.serial = 'Serial é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    navigate('/serial/list');
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }

    if (id) {
      const selectedProduct = products.find(p => p.id === formData.produtoId);

      const updatedSerial = {
        produtoId: formData.produtoId,
        produto: selectedProduct?.descricao || '',
        serial: formData.serial,
        serialFabricante: formData.serialFabricante,
        dataGarantia: formData.dataGarantia,
        valorCusto: formData.valorCusto ? parseFloat(formData.valorCusto) : 0,
        status: formData.status
      };

      updateSerial(id, updatedSerial);
      navigate('/serial/list');
    }
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
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                  errors.produtoId ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.produtoId}
                onChange={(e) => handleInputChange('produtoId', e.target.value)}
              >
                <option value="">Selecione um produto</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.descricao}
                  </option>
                ))}
              </select>
              {errors.produtoId && (
                <span className="text-sm text-red-500">{errors.produtoId}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Serial:
              </label>
              <input
                type="text"
                placeholder="Serial informado"
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  errors.serial ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.serial}
                onChange={(e) => handleInputChange('serial', e.target.value)}
              />
              {errors.serial && (
                <span className="text-sm text-red-500">{errors.serial}</span>
              )}
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
                type="number"
                step="0.01"
                placeholder="Informe um valor"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                value={formData.valorCusto}
                onChange={(e) => handleInputChange('valorCusto', e.target.value)}
              />
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