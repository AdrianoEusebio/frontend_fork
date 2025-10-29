import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar/productTypeEditNavbar';
import { ProductCategoryForm } from '@/components/Form/ProductTypeForm';
import { useNavigate, useParams } from 'react-router-dom'
import { ProductCategoryService, ProductCategory } from '@/services/ProductCategoryService';

export const ProductCategoryEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<ProductCategory | null>(null);

  useEffect(() => {
    if (id) {
      const category = ProductCategoryService.getCategoryById(id);
      if (category) {
        setInitialData(category);
      } else {
        navigate('/product');
      }
    }
  }, [id, navigate]);

  const handleSubmit = (data: ProductCategory) => {
    if (id) {
      ProductCategoryService.updateCategory(id, data);
      navigate('/product');
    }
  };

  const handleCancel = () => {
    navigate('/product');
  };

  if (!initialData) {
    return <div>Carregando...</div>;
  }

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
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};