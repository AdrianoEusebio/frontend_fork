import { useState, useEffect } from 'react';
import { Product, ProductFilters, ProductService } from '@/services/ProductService';
 
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    try {
      const data = ProductService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filters: ProductFilters) => {
    setLoading(true);
    try {
      const data = ProductService.filterProducts(filters);
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

  const deleteSelectedProducts = () => {
    if (selectedProducts.length > 0) {
      const success = ProductService.deleteMultipleProducts(selectedProducts);
      if (success) {
        setSelectedProducts([]);
        loadProducts();
      }
    }
  };

  return {
    products,
    loading,
    selectedProducts,
    toggleSelectProduct,
    toggleSelectAll,
    applyFilters,
    clearFilters,
    deleteSelectedProducts,
    loadProducts
  };
};