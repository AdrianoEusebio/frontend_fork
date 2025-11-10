import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'

interface Product {
  tipoProduto: string;
  codigo: string;
  pathNumber: string;
  marca: string;
  descricao: string;
  categoria: string;
  fornecedor: string;
  valorItem: string;
  unidade: string;
  estoqueMinimo: string;
  descricaoResumida: string;
  custoCliente: string;
  medida: string;
  validadeDesconto: string;
  voltagem: string;
  observacao: string;
  dataCadastro: string;
  usuarioCadastro: string;
  dataAlteracao: string;
  usuarioAlterou: string;
}

interface ProductContextType {
  product: Product;
  updateProduct: (field: keyof Product, value: string) => void;
  saveProduct: () => void;
  cancelEdit: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const mockProduct: Product = {
  tipoProduto: '',
  codigo: '',
  pathNumber: '',
  marca: '',
  descricao: '',
  categoria: '',
  fornecedor: '',
  valorItem: '',
  unidade: '',
  estoqueMinimo: '',
  descricaoResumida: '',
  custoCliente: '',
  medida: '',
  validadeDesconto: '',
  voltagem: '',
  observacao: '',
  dataCadastro: '',
  usuarioCadastro: '',
  dataAlteracao: '',
  usuarioAlterou: '',
};

export function ProductProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>(mockProduct);

  const updateProduct = (field: keyof Product, value: string) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const saveProduct = () => {
    console.log('Produto salvo:', product);
    navigate('/product/visualization');
  };

  const cancelEdit = () => {
    setProduct(mockProduct);
    navigate('/product/visualization');
  };

  return (
    <ProductContext.Provider value={{ product, updateProduct, saveProduct, cancelEdit }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return context;
}
