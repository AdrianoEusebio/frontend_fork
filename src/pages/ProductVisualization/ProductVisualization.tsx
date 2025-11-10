import { Navbar } from '@/components/Navbar/productVisualizationNavbar';
import { ProductFilter } from '@/components/Filter/productVisualizationFilter';
import { ProductTable } from '@/components/Table/productVisualizationTable';
import { useProducts } from '@/hooks/useProducto';

export const ProductsPage = () => {
  const {
    products,
    loading,
    selectedProducts,
    toggleSelectProduct,
    toggleSelectAll,
    applyFilters,
    clearFilters,
  } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-8 py-6">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            Páginas / Cadastros Básicos / Produtos
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        </div>

        <ProductFilter onFilter={applyFilters} onClear={clearFilters} />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Carregando...</div>
          </div>
        ) : (
          <ProductTable
            products={products}
            selectedProducts={selectedProducts}
            onToggleSelect={toggleSelectProduct}
            onToggleSelectAll={toggleSelectAll}
          />
        )}
      </div>
    </div>
  );
};
