import React from 'react';
import { Navbar } from '@/components/Navbar/productNavbar';
import { ProductCategoryForm } from '@/components/Form/ProductTypeForm';
import type { ProductCategory as ProductCategoryType } from '@/services/MockCadastroDataService';

export const ProductCategoryCadastration: React.FC = () => {
  const handleSubmit = (data: ProductCategoryType) => {
    console.log('Dados do formulário:', data);
    alert('Categoria de produto salva com sucesso!');
  };

  const handleCancel = () => {
    console.log('Formulário cancelado');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-6 py-4">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Páginas / Cadastros Básicos / Categorias de Produto
          </p>
          <h1 className="text-2xl font-bold text-gray-800">Categorias de Produto</h1>
        </div>

        <ProductCategoryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};
