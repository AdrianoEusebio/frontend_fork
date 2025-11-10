import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/services/ProductsVisualizationTypeMockData';
import { productService } from '@/services/ProductsVisualizationMockData';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (filters: ProductFilters) => {
    setLoading(true);
    try {
      const data = await productService.filterProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const clearFilters = () => {
    loadProducts();
  };

  return {
    products,
    loading,
    selectedProducts,
    toggleSelectProduct,
    toggleSelectAll,
    applyFilters,
    clearFilters,
  };
};
