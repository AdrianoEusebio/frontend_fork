import { Navbar } from '@/components/Navbar/geralNavbar';
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
    deleteSelectedProducts
  } = useProducts();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCadastrar = () => {
    navigate('/product/cadastration');
  };

  const handleEditar = (id?: string) => {
    if (id) {
      navigate(`/product/edit/${id}`);
    } else if (selectedProducts.length === 1) {
      navigate(`/product/edit/${selectedProducts[0]}`);
    } else {
      alert('Selecione um produto para editar');
    }
  };

  const handleVisualizar = (id?: string) => {
    if (id) {
      navigate(`/product/view/${id}`);
    } else if (selectedProducts.length === 1) {
      navigate(`/product/view/${selectedProducts[0]}`);
    } else {
      alert('Selecione um produto para visualizar');
    }
  };

  const handleDeletar = (id?: string) => {
    if (id || selectedProducts.length > 0) {
      const idsToDelete = id ? [id] : selectedProducts;
      const message = idsToDelete.length === 1 
        ? 'Tem certeza que deseja excluir este produto?' 
        : `Tem certeza que deseja excluir ${idsToDelete.length} produtos?`;
      
      if (window.confirm(message)) {
        if (id) {
          // Delete single product
          // You'll need to implement this in the service
        } else {
          deleteSelectedProducts();
        }
      }
    } else {
      alert('Selecione pelo menos um produto para excluir');
    }
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
            onEditar={() => handleEditar()}
            onVisualizar={() => handleVisualizar()}
            onDeletar={() => handleDeletar()}
          />
        )}
      </div>
    </div>
  );
};

export const ProductsPage = ProductVisualization;