import { Navbar } from '@/components/Navbar/productVisualizationNavbar';
import { ProductFilter } from '@/components/Filter/productVisualizationFilter';
import { ProductTable } from '@/components/Table/productVisualizationTable';
import { useProducts } from '@/hooks/useProducto';
import { useNavigate } from 'react-router-dom'

export const ProductVisualization = () => {
  const navigate = useNavigate();

  const {
    products,
    loading,
    selectedProducts,
    toggleSelectProduct,
    toggleSelectAll,
    applyFilters,
    clearFilters,
  } = useProducts();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCadastrar = () => {
    navigate('/product/cadastration');
  };

  const handleEditar = () => {
    navigate('/product/edit');
  };

  const handleVisualizar = () => {
    console.log('Visualizar Produto')
  };

  const handleDeletar = () => {
    console.log('Deletar Produto')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />

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
            onCadastrar={handleCadastrar}
            onEditar={handleEditar}
            onVisualizar={handleVisualizar}
            onDeletar={handleDeletar}
          />
        )}
      </div>
    </div>
  );
};

export const ProductsPage = ProductVisualization;