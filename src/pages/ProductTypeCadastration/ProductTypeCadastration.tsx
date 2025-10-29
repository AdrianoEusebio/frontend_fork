import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/productTypeCadastrationNavbar';
import { ProductCategoryForm } from '@/components/Form/ProductTypeForm';
import { ProductCategoryService, ProductCategory } from '@/services/ProductCategoryService';

export const ProductCategoryCadastration: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (data: ProductCategory) => {
    ProductCategoryService.createCategory(data);
    navigate('/product');
  };

  const handleCancel = () => {
    navigate('/product');
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