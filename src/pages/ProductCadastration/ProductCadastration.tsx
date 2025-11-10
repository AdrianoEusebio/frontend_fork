import React from 'react';
import { Navbar } from '@/components/Navbar/productCadastrationNavbar';
import { ProductForm } from '@/components/Form/ProductCadastrationForm';
import { useNavigate } from 'react-router-dom'

interface ProductFormData {
  tipoProduto: string;
  codigo: string;
  pathNumber: string;
  marca: string;
  descricao: string;
  categoria: string;
  fornecedor: string;
  valorItem: string;
  unidade: string;
  estoqueMinimo: string;
  descricaoResumida: string;
  custoCliente: string;
  medida: string;
  validadeDesconto: string;
  voltagem: string;
  observacao: string;
}

export const ProductCadastrion: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = (data: ProductFormData) => {
    console.log('Produto cadastrado:', data);
    alert('Produto cadastrado com sucesso!');
    navigate(`/product/visualization}`);
  };

  const handleCancel = () => {
    navigate(`/product/visualization}`);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onNavigate={handleNavigate} />

      <div className="mx-auto px-6 py-8">
        <div className="mb-6 px-2">
          <p className="text-sm text-gray-600 mb-2">
            Páginas / Cadastros Básicos / Produtos
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Cadastro de Produtos
          </h2>
        </div>

        <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};
