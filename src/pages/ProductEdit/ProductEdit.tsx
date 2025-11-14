import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/geralNavbar';
import { ProductEditForm } from '@/components/Form/ProductEditForm';
import { ProductService, Product } from '@/services/ProductService';

export const ProductEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const product = ProductService.getProductById(id);
      if (product) {
        setInitialData(product);
      } else {
        navigate('/product/visualization');
      }
    }
  }, [id, navigate]);

  const handleSubmit = (data: Product) => {
    if (id) {
      ProductService.updateProduct(id, data);
      alert('Produto atualizado com sucesso!');
      navigate('/product/visualization');
    }
  };

  const handleCancel = () => {
    navigate('/product/visualization');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (!initialData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Páginas / Cadastros Básicos / Produtos
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        </div>

        <ProductEditForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};