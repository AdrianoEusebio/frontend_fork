import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/geralNavbar';
import { ProductCategoryForm } from '@/components/Form/ProductCategoriaForm';
import { ProductCategoryService, ProductCategory } from '@/services/ProductCategoryService';

export const ProductCategoryCadastration: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (data: ProductCategory) => {
    ProductCategoryService.createCategory(data);
    navigate('/product/categoria');
  };

  const handleCancel = () => {
    navigate('/product/categoria');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      <div className="px-6 py-4">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Páginas / Cadastros Básicos / Categoria de Produto
          </p>
          <h1 className="text-2xl font-bold text-gray-800">Categoria de Produto</h1>
        </div>

        <ProductCategoryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};